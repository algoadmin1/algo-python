
<?php                       
//                                                  ver  7.2

date_default_timezone_set('America/New_York');
$intradaystrs = [ "notIntraday", "intraday"];
$periods = [ "daily", "weekly", "monthly", "1min" , "5min", "15min" , "30min", "60min" ];
$months  = [ "zero", "jan", "feb", "mar" , "apr", "may" , "jun", "jul", "aug", "sep" , "oct", "nov", "dec" ];
$msg=0 ;

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

$gMaxColSchemes=16;
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
    // Loop through each element of the array
    $i=0;
    foreach ($data as $date => &$value) {
        // Calculate "P" as the average of "high", "low", and "close"
        $high = floatval($value['high']);
        $low = floatval($value['low']);
        $close = floatval($value['close']);

        $value['P'] = FormatToNDecimals( (($high + $low + $close) / 3) , 2 );
        $pivot = $value['P'];


        $s1 = FormatToNDecimals( (($pivot * 2) - $high ) , 2 );     // S1day = (Pday *2)-High;
        $r1 = FormatToNDecimals( (($pivot * 2) - $low  ) , 2 );     // R1day = (Pday *2)-Low;
        $value['S1'] = $s1; 
        $value['R1'] = $r1;


        $s2 = FormatToNDecimals( ( $pivot - $high + $low ) , 2 );    //  S2day = Pday – High + Low;
        $r2 = FormatToNDecimals( ( $pivot + $high - $low ) , 2 );    //  R2day = Pday + High – Low;
        $value['S2'] = $s2; 
        $value['R2'] = $r2;


        $s3 = FormatToNDecimals( ( $pivot - ($r2  - $s1 ) ) , 2 );     // S3day = Pday – (R2day-S1day);
        $r3 = FormatToNDecimals( (($pivot - $s1 ) + $r2   ) , 2 );     // R3day = (Pday-S1day) + R2day;

        $value['S3'] = $s3;   
        $value['R3'] = $r3; 


        $s4 = FormatToNDecimals( ( $low  -  3 * ($high - $pivot ) ) , 2 );     // s4day = Low- 3*(High-Pday) ;
        $r4 = FormatToNDecimals( ( $high +  3 * ($pivot - $low  ) ) , 2 );     // R4day = High+ 3*(Pday-Low) ;

        $value['S4'] = $s4;
        $value['R4'] = $r4;




        // P3 calc...
        if($i<3){
             $value['P3'] = 0;
        }else{

            $a0= array_values($data)[$i-3]['P'];
            $a1= array_values($data)[$i-2]['P'];
            $a2= array_values($data)[$i-1]['P'];
            $value['P3'] = FormatToNDecimals( (($a0 + $a1 + $a2) / 3) , 2 );
            // echo "  [". $i. "] P3=".$value['P3']. " (". $a0. " + ". $a1. " + ". $a2. ")/3 ";
        }

        // Add other fields and set them to 0 initially

        $value['R3week'] = 0;
        $value['R2week'] = 0;
        $value['R1week'] = 0;
        $value['Pweek'] = 0;
        $value['P3week'] = 0;
        $value['S1week'] = 0;
        $value['S2week'] = 0;
        $value['S3week'] = 0;

        $value['R3month'] = 0;
        $value['R2month'] = 0;
        $value['R1month'] = 0;
        $value['Pmonth'] = 0;
        $value['P3month'] = 0;
        $value['S1month'] = 0;
        $value['S2month'] = 0;
        $value['S3month'] = 0;

        $value['R3year'] = 0;
        $value['R2year'] = 0;
        $value['R1year'] = 0;
        $value['Pyear'] = 0;
        $value['P3year'] = 0;
        $value['S1year'] = 0;
        $value['S2year'] = 0;
        $value['S3year'] = 0;

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
        $value['endOfMonth'] = 0;
        $value['endOfYear'] = 0;

        $value['gapstart'] = 0;
        $value['gapend'] = 0;

        $value['buysigcnt'] = 0;
        $value['sellsigcnt'] = 0;

        $value['buySignal'] = 0;
        $value['sellSignal'] = 0;

        $value['candleX'] = 0;
        $value['candleY'] = 0;




        $value['sym'] = $sym0;
        $value['per'] = $intervalStr;

        $i++;
    }

    // Return the modified array
    return $data;
}

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
            height: 100vh; /* Full viewport height */
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f0f0f0;
        }

        canvas {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>

    <div class="chartjb">
        <canvas id="myCanvas"></canvas>
    </div>

    <!-- Embed the PHP-generated JSON into the page using a script tag -->
    <script>
        // Store the PHP data/vars in a JavaScript variables
        
        var gColSchemeNum = <?php echo $sch; ?>;
        var processedData = <?php echo $processedDataJson; ?>;
        console.log("] still inside php:  processedData==", processedData); // You can access the PHP data in JS now
    </script>

    <!-- Link to your external JavaScript file -->
    <script src="canvas0.js"></script>
    <!-- <script src="drawchart.js"></script> -->
</body>
</html>




