<?php

/*
 *
 * Determines the last trading date based on the given frequency.
 *
 * @param string $frequency The frequency: "yearly", "weekly", "quarterly", "monthly", or "daily".
 * @return string|false The last trading date in "YYYY-MM-DD" format, or false if invalid frequency.
 *
 
Write a php function DetermineLastDate( $frequency , $udate) which takes  variables $udate (a unix YYY-MM-DD date string) and  $frequency which can be one of three values: "yearly" , "weekly" , "quarterly" or "monthly" . This function should return the date of the last trading day (normally Friday except during holidays) in unix  format "YYY-MM-DD" for the previous period.  For example, if $frequency == "monthly" the function should return the last trading day of the previous month. If $frequency == "yearly" the function should return the last Friday of the previous year. If $frequency == "weekly" the function should return the last Friday of the previous week.  If $frequency == "quarterly" the function should return the last Friday of the previous 3-month standard business quarter. Please comment the function and also check to see if the input is valid after making $frequency lower case.

 * 
 * 
 * 
 * BUGS:
 * 
 *      FRI MKT CLOSED, BUT CHK FOR SAT/ SUN, ALSO 08-23 FRI CASE LOOKING ON SAT
 * 
 *      CHECK NVDA SPLIT ADJUSTED DATA 2023
 * 
 * */


ini_set('display_errors', 1);
error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
date_default_timezone_set('America/New_York');

// include 'standardfunctions.php';

if(isset( $_GET['msg'] )){
    $msg = $_GET['msg'] ;
}else{
    $msg = 0;
}


if(isset( $_GET['sym'] )){
       $sym = $_GET['sym'] ;
   }else{
       $sym = "SPY";
   }
$sym = strtoupper($sym);
if($msg==1) echo "] sym = ". $sym ;

$dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



//  functions =======================================

function DetermineLastDate($frequency) {
    // Convert frequency to lowercase for case-insensitive comparison
    $frequency = strtolower($frequency);

    // Check if the input is valid
    $validFrequencies = ['yearly', 'weekly', 'quarterly', 'monthly', 'daily'];
    if (!in_array($frequency, $validFrequencies)) {
        return false;
    }

    // Get the current date
    // $currentDate = new DateTime();
    $currentDate = date('Y-m-d');
    echo "] currentDate = ". $currentDate ;


    switch ($frequency) {
        case 'yearly':
            // Set to December 31st of the previous year
            $lastDate = $currentDate->modify('last day of december last year');
            break;
        
        case 'weekly':
            // Set to the previous Friday
            $lastDate = $currentDate->modify('last friday');
            break;
        
        case 'quarterly':
            // Determine the last day of the previous quarter
            $currentMonth = (int)$currentDate->format('n');
            $lastQuarterEnd = $currentMonth - ($currentMonth % 3) - 1;
            if ($lastQuarterEnd <= 0) {
                $lastQuarterEnd = 12 + $lastQuarterEnd;
                $currentDate->modify('-1 year');
            }
            $lastDate = $currentDate->setDate($currentDate->format('Y'), $lastQuarterEnd, 1)->modify('last day of this month');
            break;
        
        case 'monthly':
            // Set to the last day of the previous month
            $lastDate = $currentDate->modify('last day of last month');
            break;

        case 'daily':
            // Set to the previous day
            $lastDate = $currentDate->modify('-1 day');
            // If it's a weekend, move to the previous Friday
            while (in_array($lastDate->format('N'), [6, 7])) {
                $lastDate->modify('-1 day');
            }
            return $lastDate->format('Y-m-d');
    }

    // For non-daily frequencies, adjust to the last Friday if not already a Friday
    if ($frequency !== 'daily') {
        while ($lastDate->format('N') != 5) {
            $lastDate->modify('-1 day');
        }
    }

    // Return the date in YYYY-MM-DD format
    return $lastDate->format('Y-m-d');
}


 function CheckAndUpdatePrevYear( $high0, $low0 ){
    global $msg, $prevYearHigh , $prevYearLow  , $prevYearClose   ;


    if($msg==1) echo "<br />] CheckAndUpdatePrevYear() called with hi lo ==  $high0, $low0 ...";

    if($high0 > $prevYearHigh)  $prevYearHigh= $high0;
    if( $low0 < $prevYearLow )  $prevYearLow = $low0;


    if($msg==1) echo "<br />] prevYearHigh, prevYearLow, prevYearClose == $prevYearHigh, $prevYearLow, $prevYearClose  ...";
 

 }



function DecodeAlphavantageJson($json0, $num, $datastr) {
    global $msg, $isFriday, $isWeekend,  $todayDate0, $todayTime0, $isAfterMarket , $gPeriod, $prevYearStr, $prevYearClose, $prevYearCloseDate ;
    // Decode the JSON string into a PHP associative array
    $data = json_decode($json0, true);

    // Check if the data is properly decoded
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON data.");
    }

    // Check if the provided $datastr exists in the JSON data
    if (!isset($data[$datastr])) {
        throw new Exception("The key '$datastr' does not exist in the JSON data.");
    }

    // Extract the specified data series
    $timeSeries = $data[$datastr];

    // Initialize an empty array to store the results
    $result = [];

    // Iterate over the time series, stopping at $num items
    $count = 0;
    foreach ($timeSeries as $date => $values) {
        $result[$date] = $values;
        $count++;

        // Break the loop once we have collected $num items
        if ($count >= $num) {
            break;
        }
    }


    // $thisYear= substr($todayDate0, 0, 4);
    // $prevYear = (int)$thisYear;
    // $prevYear--;
    // $prevYearStr=(string)$prevYear;

    // if($msg==1)   echo "<br />] * thisYear=". $thisYear. ", prevYear=". $prevYear. ", prevYearStr=". $prevYearStr.  "<br />";



    $isFriday=  CheckIfFridayOnly( $todayDate0 );
    if($msg==1) echo "Friday = ". $isFriday;



    if($msg==1) echo "<br /><br />] decoding...  $datastr  (last $num items) <br />";

    $i=0;  
    $computed=0;    // pivots computed =0 false
  
    // Loop through the $result array
    foreach ($result as $date => $data) {
        // Print the date
        if($msg==1) echo "<br />";
        if($msg==1) echo $date . "[OHLCV]: ";
        // echo $date . "[OLHC adjC V]: ";

        $dateYearStr=  substr($date, 0, 4);   // "2023-12-09"  ===> "2023"
        $dateMonthStr= substr($date, 5, 2);   // "2023-12-09"  ===> "12"

      
        // Loop through the data for the specific date and concatenate it into a string
        $dataString = [];

        $hi=0;
        $lo=0;
        $cl=0;
        $j=0;
        foreach ($data as $key => $value) {
            // $dataString[] = "$key: $value ";
            $dataString[] = " $value";
            //     adjustedClose 0,1,2,3,4,5,6  == o,h,l,c,adjC,v,div
            // non-adjustedClose 0,1,2,3,4   == o,h,l,c,v
            if($j==1){   
                $hi=$value;
            }
            if($j==2){   
                $lo=$value;
            }
            if($j==3){   
                $cl=$value;
            }
            $j++;
        }

        if($msg==1) {
            // Join the data string with commas and print it
            echo implode(", ", $dataString) ; 
            echo "<br />";
            echo "$date :   [i]= $i     h,l,c= $". $hi. " $". $lo. " $". $cl;
            echo "<br />";
            echo " [date],  today's date,  gPeriod: ".  $date .",  ". $todayDate0  .",  ". $gPeriod;
        }

        $gPeriod0 =  strtolower($gPeriod) ;


        if(  $i==0  &&  $gPeriod0=="weekly"  &&  $isFriday==true  &&  $date==$todayDate0  && $isAfterMarket==true  &&  $computed==0 ){
            ComputePivots( $hi, $lo, $cl, $datastr, $date );
            $computed=1;
        // chk weekend case
        }else   if(  $i==0  &&  $gPeriod0=="weekly"  &&  $isWeekend==true  &&  $computed==0 ){
            ComputePivots( $hi, $lo, $cl, $datastr, $date );
            $computed=1;
        // normally last week is [1] in the sequence
        }else if( $i==1  &&  $computed==0){
            ComputePivots( $hi, $lo, $cl, $datastr, $date );
            $computed=1;
        }



        // use monthly data to compute yr pivots
        if($gPeriod0=="monthly" && $dateYearStr==$prevYearStr){
            if($dateMonthStr=="12"){
                $prevYearClose= $cl ;
                $prevYearCloseDate=$date;
                if($msg==1) echo "<br />] dateMonthStr= $dateMonthStr ===> prevYrClose= $prevYearClose  on $prevYearCloseDate,  $cl <br />";
                CheckAndUpdatePrevYear( $hi, $lo );

            }else if($gPeriod0=="monthly"){
                CheckAndUpdatePrevYear( $hi, $lo );
            }

        }


        if($msg==1) {
            echo "<br />] i= $i <br />";
        }

        $i++;


    }//for






    // Return the resulting array
    return $result;
}

// // Example usage:
// $json0 = '{ "Meta Data": { "1. Information": "Weekly Prices (open, high, low, close) and Volumes", "2. Symbol": "IBM", "3. Last Refreshed": "2024-08-22", "4. Time Zone": "US/Eastern" }, "Weekly Time Series": { "2024-08-22": { "1. open": "193.8400", "2. high": "197.9200", "3. low": "193.7150", "4. close": "195.9600", "5. volume": "8700588" }, "2024-08-16": { "1. open": "191.2500", "2. high": "194.3500", "3. low": "189.0001", "4. close": "193.7800", "5. volume": "11330854" }, "2024-08-09": { "1. open": "184.5500", "2. high": "192.8800", "3. low": "181.8100", "4. close": "191.4500", "5. volume": "18895865" } } }';

// // Decode the JSON and get the first 2 entries from the "Weekly Time Series"
// $result = DecodeJson($json0, 2, "Weekly Time Series");
// print_r($result);
 
/**
 * Determines if the given date is a Friday.
 *
 * @param string $datestr The date in "YYYY-MM-DD" format.
 * @return bool True if the date is a Friday, false otherwise.
 */
function isFriday($datestr) {
    // Create a DateTime object from the input string
    $date = DateTime::createFromFormat('Y-m-d', $datestr);

    // Check if the date is valid
    if (!$date) {
        return false;
    }

    // Get the day of the week (1 = Monday, 5 = Friday, 7 = Sunday)
    $dayOfWeek = $date->format('N');

    // Return true if it's Friday (5), false otherwise
    return $dayOfWeek == 5;
}


function ComputePivots( $hi, $low, $cl, $datastr, $lastdate) {
    global $sym, $gPeriod;

    $piv  = ($hi + $low + $cl )/3 ;

    $r4 = $hi+ 3*($piv-$low) ;
    // $r3 = ($piv-$s1) + $r2;
    $r2 = $piv + $hi - $low;
    $r1 = ($piv *2)-$low;

    $s1 = ($piv *2)-$hi;
    $s2 = $piv - $hi + $low;
    $s3 = $piv - ($r2-$s1);
    $s4 = $low- 3*($hi-$piv) ;

    $r3 = ($piv-$s1) + $r2;

// 2 dec places 
$r4= number_format($r4, 2);
$r3= number_format($r3, 2);
$r2= number_format($r2, 2);
$r1= number_format($r1, 2);

$piv=number_format($piv, 2);

$s4= number_format($s4, 2);
$s3= number_format($s3, 2);
$s2= number_format($s2, 2);
$s1= number_format($s1, 2);

$cl0 =  number_format($cl, 2);


    echo '<br />';
    echo $gPeriod . " Price Levels <br />as of: ". $lastdate . " for $sym closed at $". $cl0;
    echo '<br />';

    echo "R4 = $ $r4". "<br />" ;
    echo "R3 = $ $r3". "<br />";
    echo "R2 = $ $r2". "<br />";
    echo "R1 = $ $r1". "<br />";

    echo "Piv= $ $piv". "<br />";

    echo "S1 = $ $s1". "<br />";
    echo "S2 = $ $s2". "<br />";
    echo "S3 = $ $s3". "<br />";
    echo "S4 = $ $s4". "<br />";


    // in case you need to compute p3
    return( $piv );


}


function CheckIfFridayOnly($udate) {
    // Convert the $udate string to a timestamp
    $timestamp = strtotime($udate);

    // Get the day of the week for the given date (0 for Sunday, 6 for Saturday)
    $dayOfWeek = date('w', $timestamp);

    // Check if the date is a Friday (5 represents Friday)
    if ($dayOfWeek != 5) {
        return false;
    }else  return true;
 
    return false;
}

function CheckIfWeekend($udate) {
        global $dates, $gDayOfWeek;
        // Convert the $udate string to a timestamp
        $timestamp = strtotime($udate);

        // Get the day of the week for the given date (0 for Sunday, 6 for Saturday)
        $dayOfWeek = date('w', $timestamp);
    
        $gDayOfWeek= $dates[ $dayOfWeek ];


        // Check if the date is a Friday (6 represents Sat, 0=Sun)
        if ($dayOfWeek == 6  || $dayOfWeek == 0) {    // == SAT OR SUN
            return  true;
        }else  return false ;
     
        // return false;
}


function CheckIfFridayAfterMarket($udate) {
    // Convert the $udate string to a timestamp
    $timestamp = strtotime($udate);

    // Get the day of the week for the given date (0 for Sunday, 6 for Saturday)
    $dayOfWeek = date('w', $timestamp);

    // Check if the date is a Friday (5 represents Friday)
    if ($dayOfWeek != 5) {
        return false;
    }else  return true;
 
    // // Get the current time in New York (EST)
    // $now = new DateTime("now", new DateTimeZone('America/New_York'));

    // // Create a DateTime object for the market close time on the given date
    // $marketCloseTime = new DateTime($udate . ' 16:20:00', new DateTimeZone('America/New_York'));

    // // Check if the current time is after 4:20 PM on the given date
    // if ($now > $marketCloseTime) {
    //     return true;
    // }

    return false;
}

/**
 * Determines if the given date is the last Friday of its month.
 *
 * @param string $udate The date in "YYYY-MM-DD" format.
 * @return bool True if the date is the last Friday of the month, false otherwise.
 */
/*
function isLastFridayOfMonth($udate) {
    // Create a DateTime object from the input string
    $date = DateTime::createFromFormat('Y-m-d', $udate);

    // Check if the date is valid
    if (!$date) {
        return false;
    }

    // Check if it's a Friday
    if ($date->format('N') != 5) {
        return false;
    }

    // Clone the date and move to the next Friday
    $nextFriday = clone $date;
    $nextFriday->modify('next Friday');

    // If the next Friday is in a different month, this was the last Friday
    return $nextFriday->format('m') != $date->format('m');
}

// Example usage:
$testDate = "2024-08-23";  // This is the last Friday of August 2024

if (isLastFridayOfMonth($testDate)) {
    echo "$testDate is the last Friday of the month\n";
} else {
    echo "$testDate is not the last Friday of the month\n";
}
*/



$baddy1="5B4L3BMV41G6BCDH" ;
$baddy="B4L3BMV41G6BCDH" ;
$paddy="&apikey=". "5".  $baddy ;


// TIMEFRAMES
$tf_daily=      "Time Series (Daily)" ;
$tf_daily_adj=  "Time Series (Daily)";

$tf_weekly=     "Weekly Time Series";
$tf_weekly_adj=  "Weekly Adjusted Time Series";

$tf_monthly=    "Monthly Time Series" ;
$tf_monthly_adj="Monthly Adjusted Time Series";

$tf_yearly=    "Yearly Time Series" ;

 
$query_daily =      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" . $sym. $paddy ; 
$query_daily_adj =  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" . $sym. $paddy ; 

$query_weekly =     "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" . $sym. $paddy ; 
$query_weekly_adj=  "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=" . $sym. $paddy ; 

$query_monthly =    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" . $sym. $paddy ; 
$query_monthly_adj= "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=" . $sym. $paddy ; 


$prevYearHigh = -10000000.0;
$prevYearLow  =  10000000.0;   // any low will be < 10M
$prevYearClose    = "1999-12-31";
$prevYearCloseDate= -1.00;


$todayDate0 = date("Y-m-d");
$thisYear= substr($todayDate0, 0, 4);
$prevYear = (int)$thisYear;
$prevYear--;
$prevYearStr=(string)$prevYear;

if($msg==1)   echo "<br />] ** thisYear=". $thisYear. ", prevYear=". $prevYear. ", prevYearStr=". $prevYearStr.  "<br />";


$todayTime0 = date("h:i:sa") ;
$todayAmPm0 = substr( $todayTime0, -2);
$todayAmPm  = strtolower($todayAmPm0);    // ie "pm"

// $todayDate3  = strtotime($todayDate0);
// $todayDate2= date_format($todayDate3,"l, F jS Y");

$dayOfWeek =7;
$gDayOfWeek="nil";
$isWeekend=  CheckIfWeekend( $todayDate0 );  // this sets $gDayOfWeek


echo  "Today is $gDayOfWeek, " . $todayDate0 .", ";
echo "NY time is " .  $todayTime0.  ".<br />";
// Today is 2024-08-23, the time in NY is 09:02:53pm
$hour_part = substr($todayTime0, 0, 2);    // 09
$mins_part = substr($todayTime0, 3, 2);   // 09:02:53pm  ==> 02
$hr_num = (int)$hour_part;
$mi_num = (int)$mins_part;

$udate      =  $todayDate0;      //"2024-08-23"; // Example date string
$isFriday   =  CheckIfFridayOnly($udate);
// check for after mkt hours
$isAfterMarket= false;
if( $todayAmPm=="am"){
    $isAfterMarket= false;
}else if( $todayAmPm =="pm"){
    if($hr_num < 4 )  $isAfterMarket=false; 
        else if($hr_num ==4 && $mi_num<16)  $isAfterMarket=false; 
            else   $isAfterMarket=true;
}

// $dayOfWeek =7;
// $gDayOfWeek="nil";
// $isWeekend=  CheckIfWeekend( $todayDate0 );
if($isWeekend==true) $isAfterMarket=true;


if($isAfterMarket==true) echo "The US Stock Market is closed.<br />";

if($msg==1){

    echo  "<br />============ FRIDAY?[". $isFriday;
    echo  "]=== isAfterMarket= $isAfterMarket == hrs min= $hour_part $mins_part == $hr_num + $mi_num=". ($hr_num+$mi_num)  ." == todayAmPm= $todayAmPm == =======";

}



if($msg==1) echo "<br />";

$gPeriod="Weekly";
$json = file_get_contents( $query_weekly  );
$result = DecodeAlphavantageJson($json, 3,  $tf_weekly );



if($msg==1) echo "<br />";

echo "<br />";
$gPeriod="Monthly";
$json = file_get_contents( $query_monthly );
// Decode the JSON and get the first 2 entries from the "Weekly Time Series"
// $result = Dec odeAlphavantageJson($json, 8, "Weekly Time Series");
$result = DecodeAlphavantageJson($json, 26,  $tf_monthly );
// print_r($result);

 

echo "<br />";
$gPeriod="Yearly";
$prevYearHigh= number_format($prevYearHigh, 2);
$prevYearLow=  number_format($prevYearLow, 2);
$prevYearClose= number_format($prevYearClose, 2);

ComputePivots( $prevYearHigh, $prevYearLow, $prevYearClose, $tf_yearly, $prevYearCloseDate );
$pryr4=substr( $prevYearCloseDate,0,4 );
echo "<br />*** Note: Previous Year's ($pryr4) High, Low= $". $prevYearHigh. ", $". $prevYearLow. ", and $sym closed at $". "$prevYearClose on $prevYearCloseDate".". <br />";
echo "<br />algoz.ai and iTraderPro Copyright (c) 2011-2025 by Algo Investor Inc. All Rights Reserved.";
echo "<br />";
echo "<br />";



// echo "<br />";
// $json = file_get_contents( $query_daily   );
// $result = Dec odeAlphavantageJson($json, 45,  $tf_daily  );













/*


 "Time Series (Daily)": {
        "2024-08-22": {
            "1. open": "197.25",
            "2. high": "197.92",
            "3. low": "195.57",
            "4. close": "195.96",
            "5. adjusted close": "195.96",
            "6. volume": "1969496",
            "7. dividend amount": "0.0000",
            "8. split coefficient": "1.0"
        },
        "2024-08-21": {
            "1. open": "195.97",
            "2. high": "197.33",
            "3. low": "194.115",
            "4. close": "197.21",
            "5. adjusted close": "197.21",
            "6. volume": "2579343",
            "7. dividend amount": "0.0000",
            "8. split coefficient": "1.0"
        },


 
"Weekly Adjusted Time Series"

 "Weekly Adjusted Time Series": {
        "2024-08-22": {
            "1. open": "193.8400",
            "2. high": "197.9200",
            "3. low": "193.7150",
            "4. close": "195.9600",
            "5. adjusted close": "195.9600",
            "6. volume": "8700588",
            "7. dividend amount": "0.0000"
        },
        "2024-08-16": {
            "1. open": "191.2500",
            "2. high": "194.3500",
            "3. low": "189.0001",
            "4. close": "193.7800",
            "5. adjusted close": "193.7800",
            "6. volume": "11330854",
            "7. dividend amount": "0.0000"
        },
        "2024-08-09": {
            "1. open": "184.5500",
            "2. high": "192.8800",
            "3. low": "181.8100",
            "4. close": "191.4500",
            "5. adjusted close": "191.4500",
            "6. volume": "18895865",
            "7. dividend amount": "1.6700"


"Monthly Adjusted Time Series": {
        "2024-08-22": {
            "1. open": "192.8100",
            "2. high": "197.9200",
            "3. low": "181.8100",
            "4. close": "195.9600",
            "5. adjusted close": "195.9600",
            "6. volume": "47561485",
            "7. dividend amount": "1.6700"
        },
        "2024-07-31": {
            "1. open": "173.4500",
            "2. high": "196.2600",
            "3. low": "173.3800",
            "4. close": "192.1400",
            "5. adjusted close": "190.4785",
            "6. volume": "81258646",
            "7. dividend amount": "0.0000"

*/




?>