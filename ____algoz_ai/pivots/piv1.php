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


 

function DecodeAlphavantageJson($json0, $num, $datastr) {
    global $msg;
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




    if($msg==1) echo "] decoding...  $datastr  (last $num items) <br />";

    $i=0;   
    // Loop through the $result array
    foreach ($result as $date => $data) {
        // Print the date
        if($msg==1) echo "<br />";
        if($msg==1) echo $date . "[OHLCV]: ";
        // echo $date . "[OLHC adjC V]: ";

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
            // echo "<br />";
            echo "<br />";
            echo "$date :   [i]= $i     h,l,c= $". $hi. " $". $lo. " $". $cl;
            echo "<br />";
        }

        if($i==1){
            ComputePivots( $hi, $lo, $cl, $datastr, $date );
        }


        $i++;

        /*
        ] sym = AMD
] decoding... Monthly Time Series (last 3 items)

2024-08-22[OLHCV]: 145.0000, 162.0400, 121.8250, 151.7000, 876437465
2024-07-31[OLHCV]: 161.2500, 187.2800, 134.0500, 144.4800, 1243473153
2024-06-28[OLHCV]: 170.8200, 171.0800, 153.3400, 162.2100, 959732843
grabbing weekly

] decoding... Weekly Time Series (last 3 items)

2024-08-22[OLHCV]: 148.4300, 162.0400, 147.7200, 151.7000, 226146515
2024-08-16[OLHCV]: 134.4400, 149.3693, 133.2300, 148.5600, 192155110
2024-08-09[OLHCV]: 122.1600, 139.1400, 121.8250, 134.2700, 284841912
        */


    }

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
    echo $gPeriod . " Price Levels <br />computed as of: ". $lastdate . " for symbol $sym close=$". $cl0;
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

 
$query_daily =      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" . $sym. $paddy ; 
$query_daily_adj =  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" . $sym. $paddy ; 

$query_weekly =     "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" . $sym. $paddy ; 
$query_weekly_adj=  "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=" . $sym. $paddy ; 

$query_monthly =    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" . $sym. $paddy ; 
$query_monthly_adj= "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=" . $sym. $paddy ; 


// $freq="monthly";
// $d1  ="***";  
// $d1  =DetermineLastDate( $freq ) ;
// echo "] date = ". $d1 .", freq=". $freq ;

 

if($msg==1) echo "<br />";

$gPeriod="Weekly";
$json = file_get_contents( $query_weekly  );
$result = DecodeAlphavantageJson($json, 3,  $tf_weekly );



if($msg==1) echo "<br />";

$gPeriod="Monthly";
// $json = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo');
$json = file_get_contents( $query_monthly );
// Decode the JSON and get the first 2 entries from the "Weekly Time Series"
// $result = DecodeAlphavantageJson($json, 8, "Weekly Time Series");
$result = DecodeAlphavantageJson($json, 3,  $tf_monthly );
// print_r($result);




// echo "<br />";
// $json = file_get_contents( $query_daily   );
// $result = DecodeAlphavantageJson($json, 45,  $tf_daily  );













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