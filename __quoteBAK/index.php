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
    $intr = "1m";
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
/*
 global $sym;
    global $intr;
    global $json0;
    global $msg0;
    global $padr;
    global $asstype;
    global $idx;
    global $backbars;
    global $numelems;
*/

$numelems =  15;
// this is the nth index into the array
$idx    = 0;
$idxMax = 29;

if(isset( $_GET['idx'] )){
    $idx = $_GET['idx'] ;
}else{
    $idx = 0;
}

// if($idx>$idxMax){
//     $idx = $idxMax;
//}

$backbars=0;
if(isset( $_GET['barsback'] )){
    $backbars = $_GET['barsback'] ;
}else{
    $backbars = 0;
} 

$help0=0;
if(isset( $_GET['help'] )){
    $help0 = $_GET['help'] ;
}else{
    $help0 = 0;
} 

$timespanstr =" 1m 2m 3m 4m 5m 10m 15m 20m 30m 45m 1h 2h 3h 4h 8h 12h 1d 1w 1mo 2mo 3mo 4mo";

if($help0==1){

    $brstr  =  "<br /><br />";

    echo $brstr;
    echo "    USAGE: ". $brstr;
    echo "           where 'https://algoz.ai/' = base URL". $brstr;
    echo "           ". $brstr;
    echo "           ". $brstr;
    echo "           https://algoz.ai/quote?sym=nflx&intr=1m&json=0". $brstr.  "    where &intr= ". $timespanstr. $brstr ;
    echo "           https://algoz.ai/quote?sym=nflx&intr=1d&json=0&idx=0&barsback=5&csvpad=,". $brstr;
    echo "           https://algoz.ai/quote?sym=nflx&intr=1d&json=0&idx=1&barsback=20&csvpad=|". $brstr;
    echo "           https://algoz.ai/quote?sym=nflx&intr=1d&json=0&idx=1&barsback=2". $brstr;
    echo "           https://itraderpro.co/quote/index.php?sym=BTC&intr=1m&json=0&crypto=1&csvpad=,". $brstr;
    echo "           https://itraderpro.co/quote/?sym=xrp&crypto=1&intr=5m&json=1". $brstr;
    echo "           https://algoz.ai/quote?sym=aapl&intr=15m&json=1". $brstr;
    echo "           https://algoz.ai/quote?sym=amzn&intr=1w&json=1". $brstr;
    echo "           https://algoz.ai/quote?sym=btc&intr=15m&crypto=1". $brstr;
    echo "           https://algoz.ai/quote?sym=sol&intr=1w&crypto=1&json=1". $brstr;
    echo "           https://algoz.ai/quote?sym=eth&intr=1d&crypto=1&json=1". $brstr;
    echo "           https://algoz.ai/quote?sym=msft&msg=1". $brstr. $brstr;
    echo "           https://algoz.ai/quote?help=1". $brstr;

    exit('Exiting quote endpoint.');



}




/*




// https://algoinvestorr.com/quote/?sym=wynn&crypto=0&csvpad=,&intr=15m&json=1

{"data":[{"t":1712778300,"o":104.04,"h":104.4,"l":104,"c":104.24,"v":406591},{"t":1712777400,"o":104.265,"h":104.265,"l":103.84,"c":104.05,"v":63046},{"t":1712776500,"o":104.13,"h":104.41,"l":104.0216,"c":104.2899,"v":44061},{"t":1712775600,"o":103.59,"h":104.11,"l":103.57,"c":104.11,"v":51619},{"t":1712774700,"o":104.16,"h":104.17,"l":103.53,"c":103.645,"v":254105},{"t":1712773800,"o":104.25,"h":104.25,"l":104.09,"c":104.1481,"v":22704},{"t":1712772900,"o":104.66,"h":104.68,"l":104.3,"c":104.33,"v":12026},{"t":1712772000,"o":104.85,"h":104.89,"l":104.56,"c":104.575,"v":12089},{"t":1712771100,"o":104.325,"h":104.875,"l":104.325,"c":104.8025,"v":20056},{"t":1712770200,"o":104.705,"h":104.705,"l":104.22,"c":104.35,"v":20784},{"t":1712769300,"o":104.13,"h":104.84,"l":104.03,"c":104.73,"v":25377},{"t":1712768400,"o":104.495,"h":104.495,"l":103.98,"c":104.17,"v":35286},{"t":1712767500,"o":104.57,"h":104.5899,"l":104.35,"c":104.49,"v":21908},{"t":1712766600,"o":104.57,"h":104.77,"l":104.51,"c":104.627,"v":37423},{"t":1712765700,"o":104.7,"h":104.72,"l":104.5,"c":104.57,"v":24002},{"t":1712764800,"o":105,"h":105,"l":104.66,"c":104.68,"v":19154},{"t":1712763900,"o":104.7704,"h":105.07,"l":104.7704,"c":104.97,"v":20882},{"t":1712763000,"o":104.85,"h":104.99,"l":104.77,"c":104.78,"v":31453},{"t":1712762100,"o":105.1,"h":105.14,"l":104.77,"c":104.92,"v":23331},{"t":1712761200,"o":104.885,"h":105.1,"l":104.885,"c":105.0277,"v":15208},{"t":1712760300,"o":105.14,"h":105.14,"l":104.8,"c":104.91,"v":16833},{"t":1712759400,"o":105.03,"h":105.38,"l":104.9,"c":105.2,"v":31992},{"t":1712758500,"o":105.25,"h":105.35,"l":105.07,"c":105.08,"v":26549},{"t":1712757600,"o":105.13,"h":105.21,"l":104.82,"c":105.155,"v":17110},{"t":1712756700,"o":104.91,"h":105.19,"l":104.4792,"c":105.145,"v":27414},{"t":1712755800,"o":104.78,"h":105.1568,"l":104.33,"c":104.97,"v":47714},{"t":1712691900,"o":106.3,"h":106.53,"l":106.26,"c":106.49,"v":221759},{"t":1712691000,"o":106.71,"h":106.735,"l":106.265,"c":106.31,"v":46066},{"t":1712690100,"o":106.15,"h":106.695,"l":106.15,"c":106.695,"v":33507},{"t":1712689200,"o":106.06,"h":106.12,"l":105.9,"c":106.08,"v":25430}]}
*/






// ########### Functions....  see include

function processJson1($jsonstr) {
    // Decode the JSON string
    global $sym;
    global $intr;
    global $json0;
    global $msg0;
    global $padr;
    global $asstype;
    global $idx;
    global $backbars;
    global $numelems;
    
    $data = json_decode($jsonstr, true);
    // $padr = "_";

    // Check if decoding was successful and if data array exists
    if ($data && isset($data['data']) && count($data['data']) > 0) {
        
        // echo "idx start = ". $idx;

        $cnt =count($data['data']) ;
        if($idx > ($cnt-1)) $idx = $cnt-1;

        // echo "count = ". $cnt;
        // echo "idx fin = ". $idx. "   ";

        $idxstr = "[".$idx. "]";

        // Extract the first record

        // $firstRecord = $data['data'][0];
        $firstRecord = $data['data'][$idx];

        // Extract values for 't' and 'c' keys
        $tseconds = $firstRecord['t'];
        $closeprice = $firstRecord['c'];
        $openprice = $firstRecord['o'];

        $highprice = $firstRecord['h'];
        $lowprice = $firstRecord['l'];
        $volume0 = $firstRecord['v'];
        $pivot = (  $closeprice +  $highprice + $lowprice  ) /3;
        // $pivotstr = number_format($pivot,    4) ; 
        $pivotstr =$pivot;

        // Convert tseconds to Unix timestamp in EDT
        date_default_timezone_set('America/New_York');
        $datetime = date('Y-m-d H:i:s', $tseconds);

        $onestr= $closeprice. $padr.    $datetime. $padr.     $sym. $padr.    $intr. $padr. $tseconds. $padr. "PivOHLV=". $padr. $pivotstr.  $padr.  $openprice. $padr.  $highprice. $padr. $lowprice. $padr. $volume0. $padr. $asstype. $padr. $idxstr. $padr. $numelems. $padr.  "EOL". $padr;
        // $onestr= $closeprice. $padr.    $datetime. $padr.     $sym. $padr.    $intr. $padr. "PivOHLV=". $padr. $pivotstr.  $padr.  $openprice. $padr.  $highprice. $padr. $lowprice. $padr. $volume0. $padr. $asstype. $padr. $idxstr. $padr. "EOL";
        if( $json0==0 ) echo $onestr. "<br />";


        //check for backbars req
        if($backbars>0 && $json0==0 ){
            if($backbars > ($cnt-1)) $backbars = $cnt-1;

            $idx0=$idx;
            $i=0;
            for($i= $idx0+1; $i<($idx0+$backbars); $i++){
                $idx=$i;
                $idxstr = "[".$idx. "]";
                // echo  "<br />";
                // Extract the nth record
                // $firstRecord = $data['data'][0];
                $firstRecord = $data['data'][$idx];
                // Extract values for 't' and 'c' keys
                $tseconds = $firstRecord['t'];
                $closeprice = $firstRecord['c'];
                $openprice = $firstRecord['o'];

                $highprice = $firstRecord['h'];
                $lowprice = $firstRecord['l'];
                $volume0 = $firstRecord['v'];
                $pivot = (  $closeprice +  $highprice + $lowprice  ) /3;
                // $pivotstr = number_format($pivot, 4) ; 
                $pivotstr =$pivot;

                // Convert tseconds to Unix timestamp in EDT
                date_default_timezone_set('America/New_York');
                $datetime = date('Y-m-d H:i:s', $tseconds);

                $onestr= $closeprice. $padr.    $datetime. $padr.     $sym. $padr.    $intr. $padr. $tseconds. $padr. "PivOHLV=". $padr. $pivotstr.  $padr.  $openprice. $padr.  $highprice. $padr. $lowprice. $padr. $volume0. $padr. $asstype. $padr. $idxstr. $padr. $numelems. $padr. "EOL". $padr;
                echo $onestr;
                echo   "<br />";

            }//for
        }//if


        // Output the results
        if($msg0==1  && $json0==0 ) {
             echo "Unix Datetime Timestamp (EDT): $datetime\n";
             echo "Close Price: $closeprice\n";
        }

    } else {
        echo "ERR". $padr. "Error: Invalid JSON format or empty data array.". $padr. "EOL";
    }
}



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
