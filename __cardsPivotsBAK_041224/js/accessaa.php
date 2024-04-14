<?php
// acessaa.php

ini_set('display_errors', 1);
error_reporting(E_ALL);
//date_default_timezone_set('America/Los_Angeles');
date_default_timezone_set('America/New_York');

 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "SPY";
    }
   $sym = strtoupper($sym);
   echo "] sym = ". $sym ;


 if(isset( $_GET['uname'] )){
        $uname = $_GET['uname'] ;
    }else{
        $uname = "Guest";
    }

 if(isset( $_GET['intrv'] )){
        $intrv = $_GET['intrv'] ;
    }else{
        $intrv = "day";
    }

 if(isset( $_GET['email'] )){
        $email = $_GET['email'] ;
    }else{
        $email = "support@algoinvestorr.com";
    }

//  if(isset( $_GET['key'] )){
//         $key = $_GET['key'] ;
//     }else{
//         $key = "nil";
//     }

$reps0=[];

function GetJsonObj($url_json) {
    global $resp0;
    // Check if input string is null or empty
    if (empty($url_json) || is_null($url_json)) {
        return "Error: Input URL is null or empty.";
    }

    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url_json);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session
    $response = curl_exec($ch);

    // Check for cURL errors
    if(curl_error($ch)) {
        return "Error: " . curl_error($ch);
    }

    // Close cURL session
    curl_close($ch);

    // Decode JSON data
    $resp0=$response;
    $json_obj = json_decode($response);

    // Check if JSON decoding was successful
    if ($json_obj === null) {
        return "Error: Failed to decode JSON data.";
    }

    return $json_obj;
}

//  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=YUM&outputsize=compact&datatype=json&apikey=5B4L3BMV41G6BCDH

$gTestString0="1G63EDD"; 
$gTestString ="1G6BCDH"; 
$gTestString1="1G255FA"; 
$gLastUDate  ="2092-12-13";

$apikeyStrPremium   = '&apikey=' . '5B4L3BMV2' . $gTestString;  
$apikeyStr   = '&apikey=' . '5B4L3BMV4'. $gTestString;  
$llavestr = $apikeyStr;  

$url_aa_stocks0="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
$url_aa_stocks2="&outputsize=compact&datatype=json". $llavestr ;  
$url0 =  $url_aa_stocks0. $sym.  $url_aa_stocks2;


$json_data = GetJsonObj($url0);

// Check if JSON data retrieval was successful
if (is_string($json_data)) {
    echo $json_data; // Output error message
} else {
    // echo $json_data['Time Series (Daily)'];
    ;
   

    // // Convert the object to an associative array
    // $array = get_object_vars($json_data);

    // // Get the keys of the array
    // $keys = array_keys($array);

    // // Access the first element
    // $first_key = $keys[0];
    // $first_value = $array[$first_key];

    // // Print the first element
    // echo "First element in the stdClass Object:<br>";
    // echo "$first_key: $first_value";


// Loop through the stdClass object
    // foreach ($json_data as $key => $value) {
    //     echo "Object Property: $key <br>";
    //     //echo "v a l u e == $value <br>";


    //     // Check if the value is another stdClass object
    //     if (is_object($value)) {
    //         // If yes, loop through its properties and values
    //         foreach ($value as $sub_key => $sub_value) {
    //             echo "&nbsp;&nbsp;&nbsp;&nbsp;$sub_key: $sub_value <br>";
    //         }
    //     } else {
    //         echo "&nbsp;&nbsp;&nbsp;&nbsp;Value: $value <br>";
    //     }


    // }

    print_r($json_data); // Output decoded JSON object
    // $len0 = count($json_data);
    // echo "cnt=". $len0;

    // foreach ($json_data as $key => $value) {
    //     echo $json_data[$key] ;     //: $value <br>";
    // }
}


    // echo "leaving php...";

/*
// from candlesticks.php
<div id="datasym" >
<?php
    $sym = str_replace( " ", "", $sym);
    echo  "+".$sym."~".$email."~".$key."~".$uname."~".$intrv ;      

?>
</div>
*/



?>


<!-- <script class="accessaa.js"></script> -->


