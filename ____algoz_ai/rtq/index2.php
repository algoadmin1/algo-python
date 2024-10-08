<?php
// rt ver 1.0
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



function GetJsonPayloadRT($urlstring, $symbol, $mins, $prefix ) {
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
    $ohlcv1 = "$close,$symbol,$firstDatetime,$open,$high,$low,$close,$volume";

    // Create the filename using the symbol and write the string to the file
    $fname =$prefix. $symbol . '.txt';
    file_put_contents($fname, $ohlcv);

    // Return the formatted OHLCV string
    return $ohlcv1;
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
        $datetime1 = date('YmdHis');

        $mins = $timeframe;  //'1min';
        $ohlcv = GetJsonPayloadRT( $urlstr, $stockstr, $mins, $prefixstr );  // ie write to stocks/AAPL.txt
        echo   $datetime1." ". $ohlcv;




// while ($i< ($stockMax+2)){  //??

//     if(isset($stockslist[$i])){

//         $stockstr = $stockslist[$i];
//         // if($stockstr!=""){

//         $stockstr = strtoupper($stockstr);
//         $urlstr   = $url0. $stockstr. $url1 ;

//         $datetime = date('Y-m-d H:i:s');
//         echo "<br />] ". $numloops. ") $datetime $stockstr  ". $urlstr;
//         // if($i % 3 == 0)    usleep(330000);   // 0.3 sec


//         // $symbol = $stockstr; //'TSLA';
//         $mins = $timeframe;  //'1min';
//         $ohlcv = GetJsonPayloadRT( $urlstr, $stockstr, $mins, $prefixstr );  // ie write to stocks/AAPL.txt
//         echo "*****> ". $ohlcv;

//     }



//     $i++;
//     // if($i==$stockMax ) $i=0;
//     $numloops++;
// }


?>