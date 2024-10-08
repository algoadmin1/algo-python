<?php
//                                                      rtq ver 2.1 - only ret' price  ie $502.15

date_default_timezone_set('America/New_York');
if(isset( $_GET['sym'] )){
    $sym = $_GET['sym'] ;
}else{
    $sym = "SPY";
}
$sym = strtoupper($sym);

require_once 'stockslist.php';

$stockMaxPerMin = 139 ;  // max 140 / min from src
// ie  https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&entitlement=realtime&apikey=91M7LB7MG3JHY129

$apiKey = '91M7LB7MG3JHY129';
$timeframe ="1min";
$url0='https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';
$url1='&interval='. $timeframe. '&entitlement=realtime&apikey='. $apiKey ;  

$prefixstr="stocks/";



function GetJsonPayloadRT($urlstring, $symbol, $mins, $prefix, $datetimeNosecs ) {
    // Get JSON content from the provided URL
    $jsonContent = file_get_contents($urlstring);
    
    // Decode the JSON content into a PHP array
    $data = json_decode($jsonContent, true);

    // Check if the JSON was parsed successfully and has the necessary data
    if (!isset($data["Time Series ($mins)"])) {
        return "!Error: Time Series data not found.";
    }

    // Get the first record from the "Time Series (1min)"
    $firstRecord = reset($data["Time Series ($mins)"]);
    $firstDatetime = key($data["Time Series ($mins)"]);

    // Extract the OHLCV values
    $open = $firstRecord["1. open"];
    $high = $firstRecord["2. high"];
    $low = $firstRecord["3. low"];
    $close = $firstRecord["4. close"];
    $volume = $firstRecord["5. volume"];

    // Format the OHLCV string
    $ohlcv = "$symbol,$firstDatetime,$open,$high,$low,$close,$volume";
    $ohlcv2 = "$close,$symbol,$firstDatetime,$open,$high,$low,$close,$volume";

    $closeFormatted = number_format($close, 2);


//  $firstDatetime = '2024-10-08 04:45:00'
    $timeonly = substr($firstDatetime, 11);   // ==> '04:45:00'
    $timeonly1= substr($timeonly, 0, 5 ); 
    // $date0 = new DateTime($udate);
    $date0   =  substr($firstDatetime, 0, 10);   //  '2024-10-08 04:45:00' ==>  '2024-10-08'
    // Format the date to "M jS" (Month abbreviation and day with ordinal suffix)
    // $udate_pretty = $date0->format('M jS');
    $date1 = new DateTime($date0);
    $udate_pretty = $date1->format('M jS');

    // $ohlcv1a = "$". $closeFormatted ;  
    $ohlcv1  = "$". $closeFormatted. " as of ". $udate_pretty. " $timeonly1 EDT";  
    $ohlcv1b  = "$". $closeFormatted;  //. " as of ". $udate_pretty. " $timeonly1 EDT";  

    // Create the filename using the symbol and write the string to the file
    // $fname =$prefix. $symbol."_".  $datetimeNosecs. '.txt';
    
    $fname =$prefix. $symbol. '.txt';
    // file_put_contents($fname, $ohlcv);   // dont write file

    // Return the formatted OHLCV string
    return $ohlcv1b;  // include close as first data piece
}



function RemoveChars($str, $char) {
    // Use str_replace to remove all occurrences of $char from $str
    return str_replace($char, '', $str);
}

// // Example usage
// $str = "hello world";
// $char = "o";
// $result = RemoveChars($str, $char);
// echo $result;  // Output: hell wrld







$stockMax       = count($stockslist);
if($stockMax > $stockMaxPerMin) $stockMax = $stockMaxPerMin ;

$i=0;
$numloops=0;

        $stockstr = $sym ;
        $urlstr   = $url0. $stockstr. $url1 ;
        $datetime = date('Y-m-d H:i:s');
        $datetime1 = date('YmdHi');  // ie YYYYMMDDHHMM no secs req'd

        $mins = $timeframe;  //'1min';
        $ohlcv = GetJsonPayloadRT( $urlstr, $stockstr, $mins, $prefixstr, $datetime1 );  // ie write to stocks/AAPL.txt
        // echo   $datetime1."00 :  ". $ohlcv;
        echo     $ohlcv;



 


?>