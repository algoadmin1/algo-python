
<?php                       
                                                              $ver=  "275.3";

date_default_timezone_set('America/New_York');
$intradaystrs = [ "notIntraday", "intraday"];
$periods = [ "daily", "weekly", "monthly", "1min" , "5min", "15min" , "30min", "60min" ];
$months  = [ "zero", "jan", "feb", "mar" , "apr", "may" , "jun", "jul", "aug", "sep" , "oct", "nov", "dec" ];
$msg=0 ;

//globals for js    // global $ChartHigh , $ChartHighIdx , $ChartHighDate , $ChartLow , $ChartLowIdx , $ChartLowDate ;
$ChartHigh  = 0;
$ChartHighIdx = 0;
$ChartHighDate = "nil";
$ChartLow   = 1000000;
$ChartLowIdx = 0;
$ChartLowDate = "nil";

$button1 = 0;
$button2 = 0;
$button3 = 0;
$button4 = 0;
$button5 = 0;
$button6 = 0;
$button7 = 0;
$button8 = 0;
$button9 = 0;
$button10 = 0;

$button1name = "Type";
$button2name = "Buy Sell";
$button3name = "Sup Res";
$button4name = "Gaps" ;              //; "Gaps Detection";
$button5name = "PivP3";
$button6name = "Fib";
$button7name = "Fin's";
$button8name = "col";

$button9name = "Aux Button 9";
$button10name= "Aux Button 10";


function CheckStringArray($arr, $str) {
    // Use in_array to check if the string exists in the array
    return in_array($str, $arr);
}

if(isset( $_GET['sym'] )){
    $sym = $_GET['sym'] ;
}else{
    $sym = "SPY";
}
$sym = strtoupper($sym);

$gMaxColSchemes=100;
$sch=0;
if(isset( $_GET['sch'] )){
    $sch0 = $_GET['sch'] ;
    if( $sch0>0  &&  $sch0<($gMaxColSchemes+1)  ) $sch = $sch0;
}else{
    $sch = 0;
}


if(isset( $_GET['per'] )){
    $per0 = $_GET['per'] ;
    $per="daily";
    if($per0=='1') $per0="1min";
    if($per0=='5') $per0="5min";
    if($per0=='15') $per0="15min";
    if($per0=='30') $per0="30min";
    if($per0=='60') $per0="60min";
    if(CheckStringArray($periods, $per0)) $per=$per0;
    if($per=="daily" || $per=="weekly" || $per=="monthly" ) $per=ucfirst($per);  // Daily <== daily
}else{
    $per = "Daily";
}
$intraday=0;   // ie false
if($per!="Daily" && $per!="Weekly" && $per!="Monthly" ) $intraday=1;
$timeseriesStr = "Time Series (". $per. ")";


if($msg==1){
    echo " ** PER =". $per;
    echo "  ** intraday =". $intradaystrs[$intraday];
    echo " tser = ". $timeseriesStr;
}

function GetJsonData($url, $maxCandles, $strkey) {
    try {
        // Fetch the JSON data from the URL
        $json = file_get_contents($url);

        // Decode the JSON data into a PHP array
        $data = json_decode($json, true);

        
        // Check if the "Time Series (Daily)" key exists
        // if (!isset($data["Time Series (Daily)"])) {
        if (!isset($data[ $strkey ])) {
                throw new Exception("Invalid JSON structure or missing Time Series data.");
        }

        // Extract the daily time series data
        // $timeSeries = $data["Time Series (Daily)"];  
        $timeSeries = $data[ $strkey ]; 
        
        // Initialize an empty array to hold the result
        $result = [];

        // Loop through the time series data and collect the required information
        foreach ($timeSeries as $date => $values) {
            // Format the required fields
            $result[$date] = [
                "open" => $values["1. open"],
                "high" => $values["2. high"],
                "low" => $values["3. low"],
                "close" => $values["4. close"],
                "volume" => $values["5. volume"]
            ];

            // Stop adding if we've reached the maximum number of candles
            if (count($result) >= $maxCandles) {
                break;
            }
        }

        // Reverse the array so the data is in ascending order
        $result = array_reverse($result);

        // Return the final array
        return $result;
    } catch (Exception $e) {
        // Handle any exceptions by returning an empty array or logging an error
        error_log("Error fetching or processing data: " . $e->getMessage());
        return [];
    }
}

/*
R4day = High+ 3*(Pday-Low) ;
R3day = (Pday-S1day) + R2day;
R2day = Pday + High – Low;
R1day = (Pday *2)-Low;
Pday  = (High + Low + Close )/3 ;
S1day = (Pday *2)-High;
S2day = Pday – High + Low;
S3day = Pday – (R2day-S1day);
s4day = Low- 3*(High-Pday) ;
*/
function ProcessCandles($data,  $sym0, $intervalStr) {

    global $ChartHigh , $ChartHighIdx , $ChartHighDate , $ChartLow , $ChartLowIdx , $ChartLowDate ;
    global $BuyThreshold , $BuyThreshold2 ,  $SellThreshold , $SellThreshold2  ;

    $BuySignal = 0;
    $SellSignal = 0;
    

    // init vars
    $thisMonth = 'nil';    
    $LastMonthDate = 'nil'; //'1900-12-31';
    $LastMonth = 'nil';

    $MonthHigh  = 0;
    $MonthLow   = 1000000;
    $MonthClose = 0;


    $WeekHigh  = 0;
    $WeekLow   = 1000000;
    $WeekClose = 0;


    $ChartHigh  = 0;
    $ChartHighIdx = 0;
    $ChartHighDate = "nil";

    $ChartLow   = 1000000;
    $ChartLowIdx = 0;
    $ChartLowDate = "nil";

// NEW_P3  
    $gapPctThreshold  = 0.05;
    //loop vars
    $gapStart_price  = 0;
    $gapEnd_price    = 0;
    $gapStart_date   = "nil" ;
    $gapEnd_date     = "nil" ;
    $gapDir = 0;  // -1= down, 1=up,  0==noGAP



    $BuySignal  = 0;
    $SellSignal = 0;

    $pivot = 0;
    $P=0; $P3= 0;

    $h0=0; $l0= 0; $c0= 0;
    $s1 = 0;  $s2=0; $s3=0; $s4=0;
    $r1 = 0;  $r2=0; $r3=0; $r4=0;

    $i=0;
    $monthdays=0;

    foreach ($data as $date => &$value) {    // Loop through each element of the array

        // this candle's h,l,c [0]
        $high  = floatval($value['high']);
        $low   = floatval($value['low']);
        $close = floatval($value['close']);

// start pivot get stuff
        $h0=0;    $l0= 0; $c0= 0;
        $s1 = 0;  $s2=0; $s3=0; $s4=0;
        $r1 = 0;  $r2=0; $r3=0; $r4=0;

        if($i>0){  // for Pivots, proces [1] and up
                // Calculate "P" as the average of yesterday's : "high", "low", and "close"
                $h0= array_values($data)[$i-1]['high'];
                $l0= array_values($data)[$i-1]['low'];
                $c0= array_values($data)[$i-1]['close'];
                $pivot = FormatToNDecimals( (( $h0 + $l0 + $c0 ) / 3) , 2 );
                $P= $pivot;

                $s1 = FormatToNDecimals( (($pivot * 2) - $h0 ) ,  2 );     // S1day = (Pday *2)-High;
                $r1 = FormatToNDecimals( (($pivot * 2) - $l0  ) , 2 );     // R1day = (Pday *2)-Low;

                $s2 = FormatToNDecimals( ( $pivot - $h0 + $l0 ) , 2 );    //  S2day = Pday – High + Low;
                $r2 = FormatToNDecimals( ( $pivot + $h0 - $l0 ) , 2 );    //  R2day = Pday + High – Low;

                $s3 = FormatToNDecimals( ( $pivot - ($r2  - $s1 ) ) , 2 );     // S3day = Pday – (R2day-S1day);
                $r3 = FormatToNDecimals( (($pivot - $s1 ) + $r2   ) , 2 );     // R3day = (Pday-S1day) + R2day;

                $s4 = FormatToNDecimals( ( $l0  -  3 * ($h0 - $pivot ) ) , 2 );     // s4day = Low- 3*(High-Pday) ;
                $r4 = FormatToNDecimals( ( $h0 +  3 * ($pivot - $l0  ) ) , 2 );     // R4day = High+ 3*(Pday-Low) ;
                
                if($i<4){            
                        $P3=$close;  // make it non-zero
                    }else{
                        $a0= array_values($data)[$i-4]['P'];
                        $a1= array_values($data)[$i-3]['P'];
                        $a2= array_values($data)[$i-2]['P'];

                        $P3  = FormatToNDecimals( (($a0 + $a1 + $a2) / 3) , 2 );
                        // echo "  [". $i. "] P3=".$value['P3']. " (". $a0. " + ". $a1. " + ". $a2. ")/3 ";
                    }
      

//
// #######################################################   Test for  GAPS
// #######################################################   Test for  GAPS
// #######################################################   Test for  GAPS
//

                // INIT GAP   within-loop vars
                        $gapStart_price  = 0;  
                        $gapEnd_price    = 0;

                        $gapStart_date   = "nil" ;
                        $gapEnd_date     = "nil" ;

                        $gapDir          = 0;                // -1= down, 1=up,  0==noGAP
                        $gapDirStr       = "noGap" ;
                        
                        $gapPriceThresh =   $cl0  * $gapPctThreshold ;   //   yesterday's close  * 0.05

                        $priceDiff_GapUpTest     =    ($low - $h0 );     //  today's low  -  yesterday's high     variant: ($close - $h0 ); 
                        // $priceDiffabs         = abs($low - $h0 );
                        $priceDiff_GapDnTest     =    ( $l0 -$high  );    //   yesterday's low  -today's high       variant: ($close - $l0 ); 



                // TEST for GAPs  
                        // test for 1st gap UP, then 2nd gap DOWN...
                        if( $priceDiff_GapUpTest > $gapPriceThresh ){            // GAP UP  Detected
                            $gapDir = 1;    
                            $gapDirStr      = "up" ;
                            $gapStart_date  = $date;
                            $gapEnd_date    = "nil" ;
                            
                            $gapStart_price = $h0;
                            $gapEnd_price   = $low;
                        }
                        if( $priceDiff_GapDnTest > $gapPriceThresh ){            // GAP DOWN  Detected
                            $gapDir = -1;    
                            $gapDirStr      = "down" ;
                            $gapStart_date  = $date;
                            $gapEnd_date     = "nil" ;
                             
                            $gapStart_price = $l0 ;
                            $gapEnd_price   = $high ;
                        }
                        
                        $value['gapstart_price'] = $gapStart_price ;
                        $value['gapend_price']   = $gapEnd_price ;

                        $value['gapstart_date']  = $gapStart_date ;
                        $value['gapend_date']    = $gapEnd_date ;

                        $value['gapdir']         = $gapDir ;
                        $value['gapdir_str']     = $gapDirStr;

                        

            }else{  // if i==0 we're at start of data candles RESET vars

                $h0=0; $l0= 0; $c0= 0;
                $s1 = 0;  $s2=0; $s3=0; $s4=0;
                $r1 = 0;  $r2=0; $r3=0; $r4=0;
                // $P=0; $P3=0;
                $P=$close; 
                $P3=$close;   // get non-zero vals
            }

            // after local vars set, assign arr vals
            $value['P']  = $P;
            $value['P3'] = $P3;

            $value['S1'] = $s1; 
            $value['R1'] = $r1;
            $value['S2'] = $s2; 
            $value['R2'] = $r2;
            $value['S3'] = $s3;   
            $value['R3'] = $r3;
            $value['S4'] = $s4;
            $value['R4'] = $r4;




        //track chart allTimeHigh allTimeLow
        if( $high > $ChartHigh ){
            $ChartHigh = $high  ;
            $ChartHighIdx = $i ;
            $ChartHighDate = $date;
        } 
        if( $low < $ChartLow ){
            $ChartLow = $low  ;
            $ChartLowIdx = $i ;
            $ChartLowDate = $date;
        }


//
//    NEW ######################  ck Month to store data
//
        $thisMonth = substr( $date, 0, 7 );   // '2024-10';   

        if( $thisMonth != $LastMonth ){
            // here we have NOT set $MonthHigh, Low or Close  or Last so 
            //  we have a NEW MONTH HERE, LETS GET LAST MONTH'S #'S
            
            $value['monthHigh']     = $MonthHigh;
            $value['monthLow']      = $MonthLow;
            $value['monthClose']    = $MonthClose;
            $value['monthLast']     = $LastMonth;               //  = '2024-10'; 
            $value['monthLastDate'] = $LastMonthDate;          //  = '2024-10-23'; 
            $value['monthDaysCnt']  = $monthdays ;

            // COMPUTE MONTHLY PIVOTS SRs
            $Pmonth = ( $MonthHigh+ $MonthLow + $MonthClose ) /3;

            $R1month =  ($Pmonth *2 ) - $MonthLow;      //  R1day = (Pday *2)-Low;
            $S1month =  ($Pmonth *2 ) - $MonthHigh;     //  S1day = (Pday *2)-High;

            $S2month =  $Pmonth - $MonthHigh + $MonthLow ;  //  S2day = Pday – High + Low;
            $R2month =  $Pmonth + $MonthHigh - $MonthLow ;   // R2day = Pday + High – Low;

            $S3month =  $Pmonth -   ( $R2month - $S1month ) ;   // S3day = Pday – (R2day-S1day);
            $R3month =( $Pmonth - $S1month ) +   $R2month ;     // R3day = (Pday-S1day) + R2day;

            $S4month =  $MonthLow - 3*( $MonthHigh - $Pmonth); // s4day = Low- 3*(High-Pday) ; 
            $R4month =  $MonthHigh+ 3*( $Pmonth - $MonthLow );  //  R4day = High+ 3*(Pday-Low) ;

            // here we should CALC Based on these above
            $value['R4month'] = $R4month;
            $value['R3month'] = $R3month;
            $value['R2month'] = $R2month;
            $value['R1month'] = $R1month;
            $value['Pmonth'] =  $Pmonth;     
            $value['P3month'] = 0;
            $value['S1month'] = $S1month;
            $value['S2month'] = $S2month;
            $value['S3month'] = $S3month;
            $value['S4month'] = $S4month;

            $value['X1month'] = 0;          // for drawing in js
            $value['Y1month'] = 0;
            $value['X2month'] = 0;
            $value['Y2month'] = 0;

        $value['endOfMonth'] = 1;

            // reset monthly cnting vars
            $LastMonth  = $thisMonth ;
            $LastMonthDate= 'nil';
            $monthdays  = 0;
            $MonthHigh  = 0;
            $MonthLow   = 1000000;
            $MonthClose = 0;  //not needed

        }else{   // we are looping in same month

            // capture month H L C
            if( $high > $MonthHigh ){
                $MonthHigh = $high  ;
            }
            if( $low < $MonthLow ){
                $MonthLow = $low  ;
            }
            $MonthClose    = $close;
            $LastMonthDate = $date;

            // Zero out everything
            $value['monthHigh'] = 0;
            $value['monthLow'] =  0; 
            $value['monthClose'] =0;  
            $value['monthLast'] = "nil";
            $value['monthLastDate'] = "nil";
            $value['monthDaysCnt']     = 0 ;

            // here we should CALC Based on these above
            $value['R4month'] = 0;
            $value['R3month'] = 0;
            $value['R2month'] = 0;
            $value['R1month'] = 0;
            $value['Pmonth']  = 0;
            $value['P3month'] = 0;
            $value['S1month'] = 0;
            $value['S2month'] = 0;
            $value['S3month'] = 0;
            $value['S4month'] = 0;

            $value['X1month'] = 0;
            $value['Y1month'] = 0;
            $value['X2month'] = 0;
            $value['Y2month'] = 0;

        $value['endOfMonth'] = 0;

        }

        // ##########################################################  END OF monthly


        // Add other fields and set them to 0 initially
        $value['weekHigh'] = 0;
        $value['weekLow'] = 0;
        $value['weekClose'] = 0;
        $value['weekLastDate'] = "nil";
        $value['weekDaysCnt']     = 0 ;

        $value['R4week'] = 0;
        $value['R3week'] = 0;
        $value['R2week'] = 0;
        $value['R1week'] = 0;
        $value['Pweek'] = 0;
        $value['P3week'] = 0;
        $value['S1week'] = 0;
        $value['S2week'] = 0;
        $value['S3week'] = 0;
        $value['S4week'] = 0;

        $value['X1week'] = 0;
        $value['Y1week'] = 0;
        $value['X2week'] = 0;
        $value['Y2week'] = 0;

        // ##########################################################  END OF weekly



        $value['yearHigh']  = 0;
        $value['yearLow']   = 0;
        $value['yearClose'] = 0;
        $value['yearLastDate'] = "nil";
        $value['yearDaysCnt'] = 0 ;


        $value['R4year'] = 0;
        $value['R3year'] = 0;
        $value['R2year'] = 0;
        $value['R1year'] = 0;
        $value['Pyear'] = 0;
        $value['P3year'] = 0;
        $value['S1year'] = 0;
        $value['S2year'] = 0;
        $value['S3year'] = 0;
        $value['S4year'] = 0;

        $value['X1year'] = 0;
        $value['Y1year'] = 0;
        $value['X2year'] = 0;
        $value['Y2year'] = 0;

        // ##########################################################  END OF weekly




        $value['datefull'] = $date;
        $value['date'] = substr($date, 0, 10);




        $mn = substr($date, 5, 2);      // 'YYYY-MM-DD' ==> 'MM'  ==> 09

        // 'DEL
 $mnInt = (int)$mn;              // ==> 9  XXX DEPR ???
        


        $value['monthNum'] =  $mn ;    //substr($date, 5, 2);

        $mm = $value['monthNum'];
        $mm1=intval($mm);
        $value['monthName'] = $months[ $mm1 ];  

        $timestamp = strtotime($date);
        $dow= strtolower(date('D', $timestamp));     // Format the timestamp to return the three-letter day abbreviation (e.g., Mon, Tue, Sat)
        $value['dayOfWeek']  = $dow;  // 0 Sun - 6 Sat normal php


        $value['endOfDay'] = 0;
        $value['endOfWeek'] = 0;
        // $value['endOfMonth'] = 0;
        $value['endOfYear'] = 0;

      


        $value['buySignalCnt'] = 0;
        $value['sellSignalCnt'] = 0;

        $value['buySignal'] = 0;
        $value['sellSignal'] = 0;

        $value['buySignalPrice'] = 0;
        $value['sellSignalPrice'] = 0;

        $value['candleX'] = 0;
        $value['candleY'] = 0;


        $value['sym'] = $sym0;
        $value['per'] = $intervalStr;

// ################################ END OF values store





        // ##############################  SELL signal?
            if($P3 > $P){   // if($PtrailingAvg > $Pday){
                if( $BuySignal>=0 ){ 
                    $SellSignal=$SellSignal+1;

                    if($SellSignal==1){   // first time crossover P3 > P
                        if($BuySignal > $BuyThreshold){     // strong sell
                                $value['sellSignal']        = 1;
                                $value['sellSignalCnt']     = $BuySignal;
                                $value['sellSignalPrice']   = $P3; 
                        }
                    }// if($SellSignal==1){
                    $BuySignal=0;  //zero  counter

                }// if( $BuySignal>=0 ){ 
            }// if($P3 > $P){


        // ##################################* BUY signal?
            if( $P3 < $P ){     //  if($PtrailingAvg < $Pday){ 
                if ($SellSignal>=0){  
                    $BuySignal=$BuySignal+1;

                    if ($BuySignal==1){     // first time crossover P > P3
                        if($SellSignal > $SellThreshold ){     // strong buy
                            $value['buySignal']         = 1;
                            $value['buySignalCnt']      = $SellSignal;
                            $value['buySignalPrice']    = $P3; 
                        }
                    }// if($BuySignal==1){
                    $SellSignal=0;      //zero  counter

                }// if( $SellSignal>=0 ){ 
            }// if($P3 < $P){


        // EQUAL CASE
        if( $P3 == $P ){
            $BuySignal=0;
            $SellSignal=0;

            $value['buySignalCnt'] = 0;
            $value['sellSignalCnt'] = 0;

            $value['buySignal'] = 0;
            $value['sellSignal'] = 0;

            $value['buySignalPrice'] = 0;
            $value['sellSignalPrice'] = 0;
        }
        


// ############################################   END OF LOOP
// ############################################   END OF LOOP
// ############################################   END OF LOOP

        $i++;
        $monthdays++;
    }// foreach loop

    return $data;    // Return the modified array

}//fn
 






function FormatToNDecimals($valfloat, $decplaces) {
    // Format the float to 3 decimal places
    return number_format($valfloat,  $decplaces, '.', '');
}

  

function removeString($masterStr, $strRemove) {
    // Use str_replace to remove the substring
    $newStr = str_replace($strRemove, '', $masterStr);
    
    // Return the modified string
    return $newStr;
}

//DEPR
function MonthEnd($udate) {
    // Convert the given date string to a timestamp
    $timestamp = strtotime($udate);
    
    // Get the last day of the month for the given date
    $lastDayOfMonth = date('Y-m-t', $timestamp);
    
    // Check if the given date is the same as the last day of the month
    return $udate === $lastDayOfMonth;
}


// EL Code !!PivotsPython_MTWTF, !!Pivots_MonthlySR
$BuyThreshold  = 3;
$BuyThreshold2 = 4;
$SellThreshold = 3;
$SellThreshold2= 4;
$lastSellStr =  "nil";
$currSellStr =  "nil";

function ProcessData_BuySellSignals( ){
    global $BuyThreshold , $BuyThreshold2 ,  $SellThreshold , $SellThreshold2  ;

    // before LOOP ENTRY !
    $SellSignal  = 0;
    $BuySignal   = 0;
    $Pday        = 0;   // ['P']
    $PtrailingAvg= 0;   // ['P3']






/******************************************************************************



    // SetPlotColor(1, JBColorMvgAvg );  // yello
    // SetPlotColor(2, JBColorPivot );  // cyan
    
    
    // ########################  SELL signal?
    // ######################## SELL signal?
    if($PtrailingAvg > $Pday){
        if( $BuySignal>=0 ){ 
            $SellSignal=$SellSignal+1;
            if($SellSignal==1){
                if($BuySignal > $BuyThreshold){ 
                        // DEL THESE
                        // SetPlotWidth(1, JBplotW);     // strong sell
                        //    JBString0 = NumToStr(BuySignal,0);  // print # of candles
                        // Value67 = Text_New(Date, Time,PtrailingAvg , JBString0 );
                        // Text_SetColor(Value67, yellow);
                        // Text_SetLocation(Value67, Date, Time, (PtrailingAvg +(PtrailingAvg/250) ));
                    // currSellStr= JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusR1pctstr   + ",SELL,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";
                    // SELL 100 Shares SYMBOL at LIMIT $PtrailingAvg+.01 time = timstr , IFF SHORTing = ON;
                    // If ( BuySignal>= BuyThreshold2   and  ( currSellStr <>  lastSellStr ) and processBar=1  ) then
                                // Begin
                                //   FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine +  currSellStr );  //NewLine +JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+  "intraday,sell,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+weeklyPivotsStr+"," );
                                // // FileAppend("c:\_dev\DayTrades.txt", NewLine+"|::   SELL 100 Shares  of "+Symbol+" at LIMIT " +"$"+NumtoStr( PtrailingAvg ,2) +"   ::|    "+LeftStr(ELDateToString(Date), 10) +"  "+NumtoStr(Time,0) +"   = "+JBString0 );
                                // lastSellStr = currSellStr ;
                                // end;
                //end else
                        // begin
                        //     SetPlotWidth(1,JBplotWsm);
                        //     SetPlotColor(1,JBColorMvgAvg);    // rev 5.0
                        // end;
                $BuySignal=0;
                //SetPlotWidth(2, JBplotWsm);  //Plot2 = buy line, reset it
                } //end;
            }
        }
    }
     


// ##################################* BUY signal?

if($PtrailingAvg < $Pday){ // then begin

 if ($SellSignal>=0){ //} then begin
    $BuySignal=$BuySignal+1;

    if ($BuySignal==1){ //} then begin
        if($SellSignal > $SellThreshold ){ //then begin
                        // SetPlotWidth(2, JBplotW);  
                        // JBString0 = NumToStr(SellSignal,0);
                    ;
                        // Value66 = Text_New(Date, Time,Pday , JBString0 );
                        //  Text_SetColor(Value66, cyan);
                        //  Text_SetLocation(Value66, Date, Time, (Pday -(Pday/250) ));

                        //test
                        // str1=  JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,BUY**,100,"+Symbol;
                        // str2=  lastBuyStr ;


                        // if( currBuyStr <> lastBuyStr ) then str3="notEqual";
                        // if( currBuyStr = lastBuyStr ) then  str3="yesEqual";
                        // currBuyStr=   JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusS1pctstr +",BUY,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+ ","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";




                        //If ( SellSignal>=SellThreshold2      and ( currBuyStr <>  lastBuyStr )    and processBar=1 ) then
                        //begin
                        //   FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine + currBuyStr); // +NewLine + "1>"+currBuyStr +NewLine + "2>"+lastBuyStr +NewLine +"]"+str3 );  // NewLine + JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,buy,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+","+weeklyPivotsStr+"," );
                        // lastBuyStr =  currBuyStr ;
                        // end;

                                    // if HardS1>0 and Pday<HardS1 then   // final check for trendline support S1 broken
                                    //    SetPlotColor(2, magenta)
                                    //    else SetPlotColor(2, cyan);    
                                    // end else
                                    //  begin
                                    //   SetPlotWidth(2, JBplotW-2);    
                                    //   SetPlotColor(2, cyan);    // weak buy
                                                //  end;
            }else {  //end else
            //begin
            // DRAW BUY
            ;
                //  SetPlotWidth(2,JBplotWsm);
                //  SetPlotColor(2,JBColorPivot);
            }// end;
            
  $SellSignal=0;  
  //SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
}//end;


}//end;



// EQUAL CASE
if( $PtrailingAvg == $Pday ){
  $BuySignal=0;
  $SellSignal=0;
//   SetPlotWidth(2, JBplotWsm);   //Plot2 = buy line, reset it
//   SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
}
 
*****************************************************************************

*/


 $dummy1 ='hello';
}//eo fn








/******************************************************************************
 * *****************************************************************************
 * *****************************************************************************
 * 
 * 
 * 
 * 
SetPlotColor(1, JBColorMvgAvg );  // yello
SetPlotColor(2, JBColorPivot );  // cyan
// sell signal?
if PtrailingAvg > Pday then begin
 if BuySignal>=0 then begin
 
  SellSignal=SellSignal+1;
  if SellSignal=1 then begin
   if BuySignal > BuyThreshold then begin
    SetPlotWidth(1, JBplotW);     // strong sell

    JBString0 = NumToStr(BuySignal,0);  // print # of candles
   
Value67 = Text_New(Date, Time,PtrailingAvg , JBString0 );
  Text_SetColor(Value67, yellow);
  Text_SetLocation(Value67, Date, Time, (PtrailingAvg +(PtrailingAvg/250) ));
// Text_SetLocation(Value67, Date, Time, (PtrailingAvg +(PtrailingAvg/100) ));


currSellStr= JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusR1pctstr   + ",SELL,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";
//currSellStr= JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+  "intraday,SELL,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+weeklyPivotsStr+",";

// SELL 100 Shares SYMBOL at LIMIT $PtrailingAvg+.01 time = timstr , IFF SHORTing = ON;


If ( BuySignal>= BuyThreshold2   and  ( currSellStr <>  lastSellStr ) and processBar=1  ) then
Begin
  FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine +  currSellStr );  //NewLine +JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+  "intraday,sell,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+weeklyPivotsStr+"," );
// FileAppend("c:\_dev\DayTrades.txt", NewLine+"|::   SELL 100 Shares  of "+Symbol+" at LIMIT " +"$"+NumtoStr( PtrailingAvg ,2) +"   ::|    "+LeftStr(ELDateToString(Date), 10) +"  "+NumtoStr(Time,0) +"   = "+JBString0 );
lastSellStr = currSellStr ;
end;

    if HardR1>0 and Pday>HardR1 then   // final check for trendline resistance R1 broken
        SetPlotColor(1, white)
       else SetPlotColor(1, yellow);
    end else
     begin
      SetPlotWidth(1, JBplotW-2);  // weak sell  
      SetPlotColor(1, yellow);
     end;
  end else
   begin
     SetPlotWidth(1,JBplotWsm);
//     SetPlotColor(1,red);
  SetPlotColor(1,JBColorMvgAvg);    // rev 5.0
   end;
  BuySignal=0;
  SetPlotWidth(2, JBplotWsm);  //Plot2 = buy line, reset it
 end;
end;
 
 

//********************************************************************************************************************* buy signal?  
if PtrailingAvg < Pday then begin

 if SellSignal>=0 then begin
  BuySignal=BuySignal+1;

  if BuySignal=1 then begin
   if SellSignal > SellThreshold then begin
    SetPlotWidth(2, JBplotW);  
    JBString0 = NumToStr(SellSignal,0);
   
Value66 = Text_New(Date, Time,Pday , JBString0 );
  Text_SetColor(Value66, cyan);
  Text_SetLocation(Value66, Date, Time, (Pday -(Pday/250) ));

//test
str1=  JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,BUY**,100,"+Symbol;
str2=  lastBuyStr ;

//if( str1 <> str2 ) then str3="notEqual";
//if( str1 = str2 ) then  str3="yesEqual";

if( currBuyStr <> lastBuyStr ) then str3="notEqual";
if( currBuyStr = lastBuyStr ) then  str3="yesEqual";

currBuyStr=   JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusS1pctstr +",BUY,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+ ","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";




If ( SellSignal>=SellThreshold2      and ( currBuyStr <>  lastBuyStr )    and processBar=1 ) then
//If ( SellSignal>=SellThreshold2      and ( str3="notEqual" )  ) then
begin
  FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine + currBuyStr); // +NewLine + "1>"+currBuyStr +NewLine + "2>"+lastBuyStr +NewLine +"]"+str3 );  // NewLine + JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,buy,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+","+weeklyPivotsStr+"," );
//FileAppend("c:\_dev\DayTrades.txt", NewLine+"|::   BUY  100 Shares of "+Symbol+" at LIMIT " +"$"+NumtoStr( Pday ,2) +"   ::|    "+LeftStr(ELDateToString(Date), 10) +"  "+NumtoStr(Time,0) +"   = "+JBString0);
lastBuyStr =  currBuyStr ;
end;

    if HardS1>0 and Pday<HardS1 then   // final check for trendline support S1 broken
       SetPlotColor(2, magenta)
       else SetPlotColor(2, cyan);    
    end else
     begin
      SetPlotWidth(2, JBplotW-2);    
      SetPlotColor(2, cyan);    // weak buy
     end;
  end else
   begin
     SetPlotWidth(2,JBplotWsm);
     SetPlotColor(2,JBColorPivot);
   end;
 
  SellSignal=0;  
  SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
 end;


end;




if PtrailingAvg = Pday then begin
  BuySignal=0;
  SellSignal=0;
  SetPlotWidth(2, JBplotWsm);   //Plot2 = buy line, reset it
  SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
end;
 

//SetPlotColor(1, red );
//SELL Plot1 red line  
Plot1(PtrailingAvg,"PtrailingAvg");    //SELL this is John Person's red-3 past days Pivot Avg/3  
//BUY  Plot2 blue line
//SetPlotColor(2, darkblue );
Plot2(Pday,"Pday");         //BUY this is John Person's blue-the next day's Pivot based on today

*****************************************************************************
*****************************************************************************
*****************************************************************************

*/





function PrintJsonData($arr, $sym, $timeper, $maxcandles ) {
    // Loop through the array using foreach
    $cnt=count($arr);
    echo $sym." ". $timeper. "( ". $maxcandles. " max, cnt=". $cnt. " ): <br /><br />";

    foreach ($arr as $date => $value) {
        // Echo the date and the corresponding values
        echo $date . " | " .
             "Open: " . $value['open'] . ", " .
             "High: " . $value['high'] . ", " .
             "Low: " . $value['low'] . ", " .
             "Close: " . $value['close'] . ", " .
             "Volume: " . $value['volume'] . ", " .
             "Pivot: " . $value['P'] . ", " .
             "P3: " . $value['P3'] . ", " .

             "R1: " . $value['R1'] . ", " .
             "S1: " . $value['S1'] . ", ". 

             "R2: " . $value['R2'] . ", " .
             "S2: " . $value['S2'] . ", " .

             "R3: " . $value['R3'] . ", " .
             "S3: " . $value['S3'] . ", " .

             "R4: " . $value['R4'] . ", " .
             "S4: " . $value['S4'] .  ", " .
             
             "date: " .$value['date']. ", ".  
             "dateTime: " .$value['datefull']. ", ".  
             "day: " .$value['dayOfWeek']. ", ".  
             "eom: " .$value['endOfMonth']. ", ".  
             "sym: " .$value['sym']. ", ".  
             "per: " .$value['per'].    
              
             "<br />";
    }
}

// $sym0="NVDA";
$sym0= $sym;
$maxCandles = 95;  // just over 1 qtr
$sym0str = $sym0." ".$per." Chart";
$printjson=0;

 // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=15min&entitlement=realtime&apikey=91M7LB7MG3JHY129

$url1min = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".$sym0. "&interval=1min&entitlement=realtime&apikey=91M7LB7MG3JHY129";
$urlday = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$sym0."&outputsize=full&apikey=91M7LB7MG3JHY129&outputsize=compact"; // Replace with the actual URL

$urlweekly="https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo";
$urlmonthly="https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo";


$strkey_1min  ="Time Series (1min)";
$strkey_15min = "Time Series (15min)";
$strkey_daily="Time Series (Daily)";

$strkey= $strkey_daily ;   
$url = $urlday ;
// $strkey= $strkey_1min ;    $url = $url1min ;

$strkey = $timeseriesStr;  // ie. "Time Series (Daily)"  or  "Time Series (1min)" or "Weekly Time Series"
$strkeyAux = $strkey;  // this is for string-stripping only to insert (Daily) into per in json

if($per=="Daily"){
    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$sym0."&outputsize=compact&apikey=91M7LB7MG3JHY129";

}else if($per=="Weekly"){
    $strkey =  "Weekly Time Series";
    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=".$sym0."&outputsize=compact&apikey=91M7LB7MG3JHY129";

}else if($per=="Monthly"){
    $strkey =  "Monthly Time Series";
    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=".$sym0."&outputsize=compact&apikey=91M7LB7MG3JHY129";

}else{
    if($intraday==1){
        $url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".$sym0. "&interval=" .$per ."&entitlement=realtime&apikey=91M7LB7MG3JHY129";

    }
}

$strRemove="Time Series ";
$intervalStr = removeString($strkeyAux, $strRemove);   // leave only "(Monthly)" or "(15min)"

$data = GetJsonData($url, $maxCandles, $strkey);

$dataProcessed = ProcessCandles($data, $sym0, $intervalStr);
if($printjson==1) PrintJsonData($dataProcessed, $sym0, $strkey , $maxCandles );

// Convert $processedData to JSON
$processedDataJson = json_encode($dataProcessed);


// Output the data
// print_r($dataProcessed);

?>
 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $sym0str ; ?></title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }

        .chartjb {
            width: 100%;
            height: 100vh; 
            display: flex;
               flex-direction: column;  /*  *NEW*   */
            justify-content: center;
            align-items: center;
            background-color: #f0f0f0;
        }

        canvas {
            width:  100%;
            height: 100%;   /*  *NEW*     height: 100%; */
        }

        .buttons-container {   /*  *NEW*   */
            display: flex;
            justify-content: space-evenly;
            width: 100%;
        }
        .buttons-container button {
            flex-grow: 1;
            padding: 10px;
            font-size: 16px;

            background-color: #4C50AF; /* BTN background */
            color: white; /* White text */

            border: none; 
            border-radius: 10px;  

        }



    </style>
</head>
<body>

<!-- <audio id="audio" src="tutorial.mp3"></audio> -->

 <!--####################  Add buttons in a flex container  ###############################  *NEW_BUTTONS* -->
 <div class="buttons-container">
        <!-- <button id="play-button">Tutorial</button> -->

        <button id="button1" onclick="toggleButton(1)"><?php echo $button1name; ?></button>
        <button id="button2" onclick="toggleButton(2)"><?php echo $button2name; ?></button>
        <button id="button3" onclick="toggleButton(3)"><?php echo $button3name; ?></button>
        <button id="button4" onclick="toggleButton(4)"><?php echo $button4name; ?></button>
        <button id="button5" onclick="toggleButton(5)"><?php echo $button5name; ?></button>
        <button id="button6" onclick="toggleButton(6)"><?php echo $button6name; ?></button>
        <button id="button7" onclick="toggleButton(7)"><?php echo $button7name; ?></button>
        <button id="button8" onclick="toggleButton(8)"><?php echo $button8name; ?></button>
    <!--
         <button id="button9" onclick="toggleButton(9)"><?php echo $button9name; ?></button>
         <button id="button10" onclick="toggleButton(10)"><?php echo $button10name; ?></button>
    -->
    </div>

    <div class="chartjb">
        <canvas id="myCanvas"></canvas>
    </div>

    <!-- <p>algoz.ai Copyright (c) 2023-2025 by Algo Investor Inc.</p> -->




    <!-- Embed the PHP-generated JSON into the page using a script tag -->
    <script>
        // Store the PHP data/vars in a JavaScript variables

        var gVerPHP         = <?php echo $ver; ?>;
        var gChartHigh      = <?php echo $ChartHigh; ?>;
        var gChartHighIdx   = <?php echo $ChartHighIdx; ?>;
        var gChartHighDate  = <?php echo $ChartHighDate; ?>;

        var gChartLow      = <?php echo $ChartLow; ?>;
        var gChartLowIdx   = <?php echo $ChartLowIdx; ?>;
        var gChartLowDate  = <?php echo $ChartLowDate; ?>;

        console.log("] still inside php: Chart HI,idx,date / LOs = ",gChartHigh,gChartHighIdx, gChartHighDate, "  Lows=",gChartLow, gChartLowIdx, gChartLowDate ); 
        
        var gColSchemeNum = <?php echo $sch; ?>;
        var processedData = <?php echo $processedDataJson; ?>;
        console.log("] still inside php:  processedData==", processedData); // You can access the PHP data in JS now

//  ##############################################################  *NEW_BUTTONS* 
        //  Initialize button states from PHP   should be gButton1..10
        var button1 = <?php echo $button1; ?>;
        var button2 = <?php echo $button2; ?>;
        var button3 = <?php echo $button3; ?>;
        var button4 = <?php echo $button4; ?>;
        var button5 = <?php echo $button5; ?>;
        var button6 = <?php echo $button6; ?>;
        var button7 = <?php echo $button7; ?>;
        var button8 = <?php echo $button8; ?>;
        var button9 = <?php echo $button9; ?>;
        var button10 =<?php echo $button10; ?>;
//  ##############################################################  *NEW_BUTTONS* 

/**
 * 
 * 
 * 
 * 
 * 
 */
    </script>

    <!-- Link to your external JavaScript file -->
    <script src="canvas0.js"></script>
    <!-- <script src="drawchart.js"></script> -->
</body>
</html>




