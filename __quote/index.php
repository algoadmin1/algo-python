<!DOCTYPE html>
<!-- https://www.youtube.com/watch?v=qOO6lVMhmGc&t=1059s 
 https://www.fiverr.com/prakashahi
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote</title>
    <!-- <link rel="stylesheet" href="styles.css"> -->
    <!-- <link rel="stylesheet" href="css/swiper-bundle.min.css"> -->
    <link rel="shortcut icon" type="image/png"  href="favicon.ico" />

    <!-- https://fonts.google.com/icons?icon.query=arrow -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />



</head>

<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
//date_default_timezone_set('America/New_York');

// include 'standardfunctions.php';


if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "SPY";
    }
$sym = strtoupper($sym);
// echo "] sym = ". $sym ;

if(isset( $_GET['intr'] )){
    $intr = $_GET['intr'] ;
}else{
    $intr = "1";
}

$msg0 = 0;
if(isset( $_GET['msg'] )){
    $msg0 = $_GET['msg'] ;
}else{
    $msg0 = 0;
}

$crypto0 = 0;
if(isset( $_GET['crypto'] )){
    $crypto0 = $_GET['crypto'] ;   // ie =1  for BTC%2FUSDT
}else{
    $crypto0 = 0;
}

$json0 = 0;
if(isset( $_GET['json'] )){
    $json0 = $_GET['json'] ;
}else{
    $json0 = 0;
}

$padr = "_";
if(isset( $_GET['csvpad'] )){
    $padr = $_GET['csvpad'] ;
}else{
    $padr = "_";
}


function processJson1($jsonstr) {
    // Decode the JSON string
    global $sym;
    global $intr;
    global $json0;
    global $msg0;
    global $padr;
    global $asstype;

    $data = json_decode($jsonstr, true);
    // $padr = "_";

    // Check if decoding was successful and if data array exists
    if ($data && isset($data['data']) && count($data['data']) > 0) {
        // Extract the first record
        $firstRecord = $data['data'][0];

        // Extract values for 't' and 'c' keys
        $tseconds = $firstRecord['t'];
        $closeprice = $firstRecord['c'];

        // Convert tseconds to Unix timestamp in EDT
        date_default_timezone_set('America/New_York');
        $datetime = date('Y-m-d H:i:s', $tseconds);

        if($json0==0 ) echo $closeprice. $padr.    $datetime. $padr.     $sym. $padr.    $intr.  $padr. $asstype. $padr. "EOL";

        // Output the results
        if($msg0==1  && $json0==0 ) {
             echo "Unix Datetime Timestamp (EDT): $datetime\n";
             echo "Close Price: $closeprice\n";
        }

    } else {
        echo "ERR". $padr. "Error: Invalid JSON format or empty data array.". $padr. "EOL";
    }
}

// if( $crypto0 ==1 )

$asstype = "stocks";

$symcrypto = $sym. "%2FUSDT";
$urlquotecrypto ="https://api.finazon.io/latest/crypto/time_series?dataset=sip_non_pro&ticker=". $symcrypto. "&interval=". $intr. "&apikey=d4e31787de7446b9aaf281437a981748am";
//               https://api.finazon.io/latest/crypto/time_series?dataset=sip_non_pro&ticker=BTC%2FUSDT&interval=1m&apikey=d4e31787de7446b9aaf281437a981748am

$urlquotestocks ="https://api.finazon.io/latest/time_series?dataset=sip_non_pro&ticker=". $sym. "&interval=". $intr. "&apikey=d4e31787de7446b9aaf281437a981748am";

$urlquote= $urlquotestocks;
if( $crypto0 ==1 ){
    $urlquote= $urlquotecrypto;
    $asstype = "crypto";
}
if($msg0==1)  echo $urlquote;


// get the json data from REST API
$content = file_get_contents($urlquote);

// Output the content
if($msg0==1  || $json0==1 ) echo $content;

// JSON payload string
// $jsonstr ='{"data":[{"t":1712778300,"o":13.365,"h":13.45,"l":13.36,"c":13.41,"v":6263205},{"t":1712777400,"o":13.3779,"h":13.3779,"l":13.3,"c":13.36,"v":2060922},{"t":1712776500,"o":13.38,"h":13.41,"l":13.37,"c":13.375,"v":1470124},{"t":1712775600,"o":13.3522,"h":13.39,"l":13.32,"c":13.39,"v":1573179},{"t":1712774700,"o":13.395,"h":13.41,"l":13.35,"c":13.3533,"v":1137884},{"t":1712773800,"o":13.34,"h":13.425,"l":13.33,"c":13.395,"v":1023061},{"t":1712772900,"o":13.3932,"h":13.41,"l":13.32,"c":13.335,"v":1389481},{"t":1712772000,"o":13.48,"h":13.5,"l":13.385,"c":13.395,"v":2176960},{"t":1712771100,"o":13.435,"h":13.48,"l":13.41,"c":13.475,"v":1706864},{"t":1712770200,"o":13.61,"h":13.6199,"l":13.43,"c":13.44,"v":2513639},{"t":1712769300,"o":13.6299,"h":13.66,"l":13.6,"c":13.615,"v":1161248},{"t":1712768400,"o":13.7006,"h":13.7099,"l":13.615,"c":13.625,"v":1010664}]';

// Process the JSON string
// processJson1($jsonstr);
processJson1($content);


/*
write a php function to take a json payload string i.e. $jsonstr ='{"data":[{"t":1712778300,"o":13.365,"h":13.45,"l":13.36,"c":13.41,"v":6263205},{"t":1712777400,"o":13.3779,"h":13.3779,"l":13.3,"c":13.36,"v":2060922},{"t":1712776500,"o":13.38,"h":13.41,"l":13.37,"c":13.375,"v":1470124},{"t":1712775600,"o":13.3522,"h":13.39,"l":13.32,"c":13.39,"v":1573179},{"t":1712774700,"o":13.395,"h":13.41,"l":13.35,"c":13.3533,"v":1137884},{"t":1712773800,"o":13.34,"h":13.425,"l":13.33,"c":13.395,"v":1023061},{"t":1712772900,"o":13.3932,"h":13.41,"l":13.32,"c":13.335,"v":1389481},{"t":1712772000,"o":13.48,"h":13.5,"l":13.385,"c":13.395,"v":2176960},{"t":1712771100,"o":13.435,"h":13.48,"l":13.41,"c":13.475,"v":1706864},{"t":1712770200,"o":13.61,"h":13.6199,"l":13.43,"c":13.44,"v":2513639},{"t":1712769300,"o":13.6299,"h":13.66,"l":13.6,"c":13.615,"v":1161248},{"t":1712768400,"o":13.7006,"h":13.7099,"l":13.615,"c":13.625,"v":1010664}' and returns the very first record in the json array. assign a variable $tseconds to "t": key and $closeprice to "c": key of the first record in the json array. then echo  $tseconds in a unix datetime timestamp in East Coast Daylight Time (EDT), and echo $closeprice


interval

string
REQUIRED
Interval between two consecutive points in time series
Values: 1m 2m 3m 4m 5m 10m 15m 20m 30m 45m 1h 2h 3h 4h 8h 12h 1d 1w 1mo 2mo 3mo 4mo

// stocks

https://api.finazon.io/latest/time_series?dataset=sip_non_pro&ticker=AAL&interval=15m&apikey=d4e31787de7446b9aaf281437a981748am


iTraderpro.co/quote/index.php?sym=m&intr=30m

//crypto
https://api.finazon.io/latest/crypto/time_series?dataset=sip_non_pro&ticker=BTC%2FUSDT&interval=1m&apikey=d4e31787de7446b9aaf281437a981748am
https://api.finazon.io/latest/crypto/time_series?dataset=sip_non_pro&ticker=BTC%2FUSDT&interval=1m&apikey=d4e31787de7446b9aaf281437a981748am





' \
  --header 'Authorization: apikey d4e31787de7446b9aaf281437a981748am



*/
?>

<body>
 
    <div id="datasym" >
        <?php
            $sym = str_replace( " ", "", $sym);
            //echo  $sym ;      
        ?>
    </div> 


 
    </body>



 
</html>
