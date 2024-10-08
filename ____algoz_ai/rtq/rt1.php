<?php
// rt ver 1.0
date_default_timezone_set('America/New_York');

require_once 'stockslist.php';

$stockMaxPerMin = 139 ;  // max 140 / min from src
$apiKey = '91M7LB7MG3JHY129';
$url0='https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';
$url1='&interval=1min&entitlement=realtime&apikey='. $apiKey ;  



$stockMax       = count($stockslist);
if($stockMax > $stockMaxPerMin) $stockMax = $stockMaxPerMin ;

$i=0;
$numloops=0;
while ($i< ($stockMax+2)){

    $stockstr = $stockslist[$i];
    $urlstr= $url0. $stockstr. $url1 ;

    $datetime = date('Y-m-d H:i:s');
    echo "<br />] ". $numloops. ") $datetime $stockstr  ". $urlstr;
    if($i % 3 == 0)    usleep(330000);   // 0.3 sec


    $i++;
    // if($i==$stockMax ) $i=0;
    $numloops++;
}


?>