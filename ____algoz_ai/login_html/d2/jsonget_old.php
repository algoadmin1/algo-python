
<?php                       
                                                              $ver=  "298.1";

date_default_timezone_set('America/New_York');
require_once "../login/database.php";

$gCmpChars = "0123456789@/- ._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
$CreatorEmailName="roguequant1";



function MakeStringFromArray($watchlistArr1, $insertChar) {
    // Ensure the input is a valid array
    if (!is_array($watchlistArr1)) {
        echo "Invalid input: watchlistArr must be an array.";
        return "";
    }

    // Use implode to join array elements with the insertChar
    return implode($insertChar, $watchlistArr1);
}
// // Example usage
// $watchlistArr = ["AAPL", "SPY", "QQQ", "NFLX", "TSLA"];
// $insertChar = ",";
// $result = Make StringFromArray($watchlistArr, $insertChar);
// echo $result; // Output: "AAPL,SPY,QQQ,NFLX,TSLA"

function GetSymbols($fname, $currencyStr) {
    global $gCmpChars,  $watchlistArrVALiD;
    // Initialize variables
    $symbolStrArr = [];
    $aiFlag = false;
    $cmpChars =  $gCmpChars;   //  = "0123456789@/- ._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    $symbols1 = [
                "QQQ",
                "SPY",
                "AAPL",
                "BRK.B",
                "GS",
                "MSFT",
                "VXX",
                "SQQQ",
                "TQQQ",
                "AMZN",
                "AMD",
                "KO",
                "BTC-USD",
                "HAL",
                "MSTR",
                "SOL-USD",
                "V"
            ];

    // Check if the file exists
    if (!file_exists($fname)) {
        return $symbols1;
        // return []; // Return an empty array if the file doesn't exist
    }

    // Read the file into an array of lines
    $lines = file($fname, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Loop through each line in the file
    foreach ($lines as $line) {
        $line = trim($line); // Remove leading and trailing whitespace

        // if (strlen($line) < 3) {
        //     continue; // Skip invalid or too short lines
        // }
        if (strlen($line) >= 3) {
            
            if (substr($line, 0, 3) === '/ai') {
                $symbolStrAI = $line;
                $symbolStrArr[] = $symbolStrAI;
                $aiFlag = true;
            }

        }

        // Check if the line starts with '/ai'
        if ($aiFlag == false){

            // Process symbols that don't start with '/ai'
            $symbolStr = strtoupper($line); // Convert to uppercase
            $symbolStr = str_replace("\r", "", $symbolStr); // Remove carriage returns

            // Ensure $symbolStr only contains valid characters
            $validStr = "";
            for ($i = 0; $i < strlen($symbolStr); $i++) {
                if (strpos($cmpChars, $symbolStr[$i]) !== false) {
                    $validStr .= $symbolStr[$i];
                }
            }
            $symbolStr = rtrim($validStr); // Remove trailing spaces

            // If $symbolStr ends with '-', append the currency string
            if (substr($symbolStr, -1) === '-') {
                $symbolStr .= $currencyStr;
            }

            // Add to the array
            $symbolStrArr[] = $symbolStr;
        }
        $aiFlag = false;   // reset the flag each loop
    }//for


    $symbolStrArr = array_unique($symbolStrArr);
    $symbolStrArr = array_reverse($symbolStrArr);

    // Return the array
    return $symbolStrArr;
}
// init it with a few stocks
$watchlistArr = [
    "QQQ",
    "SPY",
    "DIA",
    "AAPL",
    "BRK.B",
    "GS",
    "TSLA",
    "MSFT",
    "VXX",
    "SQQQ",
    "TQQQ"
];


session_start();
if (!(isset($_SESSION["user"])) ) {
   header("Location: ../login/login.php");
}else{
        $email1         = $_SESSION["user"] ;
        $emailName1      = strstr($email1 , '@', true) ;

        $userID1        = $_SESSION["userId"] ;  
        $numvisits1     = $_SESSION["numvisits"] ;
        $user_ip1       = $_SESSION["userIP"] ;
        $user_loc1      = $_SESSION["user_loc"] ;
        
        $user_lastDateTime1   = $_SESSION["user_lastDateTime"] ;
        $user_lastDay1        = $_SESSION["user_lastDay"] ;

        $productstr1  = $_SESSION["user_productstr"]  ;
        $appSecret1  =  $_SESSION["appsecret"] ;

        if (!(isset($_SESSION["watchlistArray"])) ) {
                    
                        // if the watchlist array is not set, then  get the  current watchlist
                        $fname = "symbols.txt";
                        $currencyStr = "USD";
                        $watchlistArr =  GetSymbols($fname, $currencyStr);

                        // if(isset($watchlistArr)){
                        //     $watchlistArrVALiD=1;
                        // }else  $watchlistArrVALiD=0;

                        $_SESSION["watchlistArray"]= $watchlistArr ;
                        // print_r($watchli stArr);

                        // $watchlistArrJson = json_encode($watchlistArr);
                        $watchlistArrStr= MakeStringFromArray($watchlistArr, ",");

                }else{
                    $watchlistArr  =  $_SESSION["watchlistArray"];

                    $watchlistArrStr= MakeStringFromArray($watchlistArr, ",");
                    // DAL,AAL,CPM,SNOW,NVDA,AMD,L,MGM,C,JPM,WFC,BAC,AXP,WYNN,PFE,NKE,BRK.B,GS,F,RTX,AVAV,GD,BA,SQQQ,TQQQ,AMZN,TSLA,X,JNJ,KO,COP,HAL,MSFT,MSTR,SOL-USD,V,BTC-USD,NFLX,VXX,QQQ,SPY,AAPL

                }




        // $_SESSION['crawlTime']=  t ;
        // $_SESSION['crawlstr']=  str ;

        // from login
        // $_SESSION["user"]  = $email ; 
        // $_SESSION["userId"] = $userID0;    //   from indxmenu.php $userID0=$_SESSION["userId"];
        // $_SESSION["numvisits"] = $numvisits;
        // $_SESSION["userIP"] = $user_ip;
        // $_SESSION["user_loc"] = $user_loc;
        
        // $_SESSION["user_lastDateTime"] = $user_lastDateTime;
        // $_SESSION["user_lastDay"] = $user_lastDay ;

        // $_SESSION["user_productstr"] = $productstr ;
        // $_SESSION["appsecret"] = $appSecret ;


}


require_once 'cryptoslist.php';  // gen'd by formatcsv.php <-- takes digital_currency_list.csv



$apikey ="M3LB7MG3JF83E3";
$intradaystrs = [ "notIntraday", "intraday"];
$periods = [ "daily", "weekly", "monthly", "1min" , "5min", "15min" , "30min", "60min" ];
$months  = [ "zero", "jan", "feb", "mar" , "apr", "may" , "jun", "jul", "aug", "sep" , "oct", "nov", "dec" ];
// $msg=1 ;
$msg=0;

//globals for js    // global $ChartHigh , $ChartHighIdx , $ChartHighDate , $ChartLow , $ChartLowIdx , $ChartLowDate ;
$ChartHigh  = 0;
$ChartHighIdx = 0;
$ChartHighDate = 0; //"nil";   // =0;

$ChartLow   = 1000000;
$ChartLowIdx = 0;
$ChartLowDate = 0; //"nil";  // =0;

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

$button1name = "Chart";
$button2name = "Buy Sell";
$button3name = "Sup Res";
$button4name = "Gaps" ;              //; "Gaps Detection";
$button5name = "Time";
$button6name = "Fib";
$button7name = "Fin's";
$button8name = "Color";

$button9name = "Aux Button 9";
$button10name= "Aux Button 10";

$adjustedCloseFlag = 0 ;
$gCryptoCurrency_default="usd";
$gDataSeriesTypeStr="daily";
$compareCharStringMASTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@_-";

function CheckSymbolValidity( $symstr ){
    $tf = true;
    return($tf);
}

function CheckValidString($targetStr, $compareCharString) {
    // Loop through each character in the target string
    for ($i = 0; $i < strlen($targetStr); $i++) {
        // Check if the character is not in the compare character string
        if (strpos($compareCharString, $targetStr[$i]) === false) {
            return false; // Invalid character found, return false
        }
    }
    return true; // All characters are valid
}

// // Example usage
// $compareCharString = "abcdefghijklmnopqrstuvwxyz0123456789";
// $targetStr = "hello123";
// $result = CheckValidString($targetStr, $compareCharString);
// echo $result ? "Valid string" : "Invalid string"; // Outputs: "Valid string"

// $targetStr = "hello&world";
// $result = CheckValidString($targetStr, $compareCharString);
// echo $result ? "Valid string" : "Invalid string"; // Outputs: "Invalid string"


function CheckStringArray($arr, $str) {
    // Use in_array to check if the string exists in the array
    return in_array($str, $arr);
}

//https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=USD&interval=15min&apikey=
function TestAndGetWellFormedCryptoSymbol($sym) {
    global $gCryptoSymbol, $gCryptoCurrency, $gCryptoName;

    // Check if the symbol contains a "-"
    if (strpos($sym, '-') === false) {
        return "nil";
    } else {
        // Split $sym at the "-" character
        list($symcrypto, $currency) = explode('-', $sym, 2);

        // Define $astr and $bstr as specified
        $astr = "&symbol=";
        $bstr = "&market=";

        $gCryptoSymbol  = $symcrypto;
        $gCryptoCurrency= $currency;

        // $gCryptoName = ReturnCryptoName($cryptos_allowed, $gCryptoSymbol );   
        $gCryptoName = ReturnCryptoName(  $gCryptoSymbol );   
        // if($gCryptoName=="nil")  return "nil";
        if($gCryptoName=="nil"){
            $gCryptoSymbol  = "BTC"; //$symcrypto;
            $gCryptoCurrency= "USD"; //  $currency;
            $gCryptoName= "Bitcoin";
        }

        // Create the new string
        $newstr = $astr . $symcrypto . $bstr . $currency;

        return $newstr;
    }
}


function TestEndOfString($str, $char) {
    // Check if the last character of $str matches $char  ie BTC- or SOL-
    return substr($str, -1) === $char;
}

function ReturnArrayItem($arr, $idx) {
    // Ensure the input is a valid array and index is within bounds
    if (is_array($arr) && $idx >= 0 && $idx < count($arr)) {
        return $arr[$idx]; // Return the item at the specified index
    } else {
        return null; // Return null if index is out of bounds or $arr is not an array
    }
}
// $wwatchlistArr0 = ["AAPL", "SPY", "QQQ", "NFLX", "TSLA"; $idx = 2;
// $result = ReturnArrayItem($watchlistArr, $idx); // Output: The item at index 2 is: QQQ



// here we assume the SIX 6 SESS vars are SET !!!!!!
// here we assume the SIX 6 SESS vars are SET !!!!!!
// here we assume the SIX 6 SESS vars are SET !!!!!!
function GetNextSymbolFromWatchlist(){
    global $g_watchlistLoopThru_cnt, $watchlistRUNNING,  $gWatchListSymStr;    
    $sym0="QQQ";  // default

    $g_watchlistLoopThru_cnt     = $_SESSION["watchlistLoopThruCount"] ;
    $gWatchListSymStr            = ReturnArrayItem( $_SESSION["watchlistArray"],  $g_watchlistLoopThru_cnt);
// here should test  if ==""
    $_SESSION["watchlistLoopThru_currentSymbol"]   = $gWatchListSymStr ;
    $sym0 = $gWatchListSymStr ;

    $_SESSION["watchlistLoopThruCount"]++;
    if( $_SESSION["watchlistLoopThruCount"] >= $_SESSION["watchlistLoopThruMax"]  ){

        $_SESSION["watchlistLoopThru_running"]  = 0;
        $watchlistRUNNING   = 0;

    }

    return ( $sym0 );
}



// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE
// ######################################## >>>>>>>>>>> NEW sym CODE START HERE


// ASSUME  WE didn't START a watchlist loop=1 ,  AND  WE'RE NOT IN WATCHLIST LOOP
$startWatchlistLoop  = 0;       // =1 from user == start loop
$watchlistRUNNING    = 0;       // =1 , == watchlist loop running

$gWatchListSymStr="nil";
$g_watchlistLoopThru_cnt=0;



if( (!isset( $_SESSION["watchlistLoopThru_running"] ) )){
    $watchlistRUNNING  = 0;

}else   if( $_SESSION["watchlistLoopThru_running"]  == 1 ){
            $watchlistRUNNING  = 1;
        }



// TEST IF WE JUST STARTED WATCHLIST LOOP WITH loop=1
if( $watchlistRUNNING  == 0 ){

        // really &loop=1 outside initialization for watchlist countdown
        if( isset( $_GET['loop'] )){
                    $startWatchlistLoop     = $_GET['loop'] ;

                    if( $startWatchlistLoop != 1){
                        $startWatchlistLoop = 0;
                    }else if( $startWatchlistLoop == 1){    // *** FIRST TIME THRU but must be logged in as creator
                            if(   ( isset($_SESSION["watchlistArray"]) )     &&      $emailName1  == $CreatorEmailName    ) {
                                    // here we know it is jb and we've gone in once & gotten the current watchlist from symbols.txt
                                    $startWatchlistLoop                       = 1;  // re-assign, forced, unecessry
                                    $_SESSION["watchlistLoopThruMax"]         = count( $_SESSION["watchlistArray"] ) ;
                                    $_SESSION["watchlistLoopThruCount"]       = 0;                    // start cnt

                                    // turn it on...
                                    $watchlistRUNNING                           = 1;
                                    $_SESSION["watchlistLoopThru_running"]      = $watchlistRUNNING;
                                  

                                // here, watchlistRUNNING==1 so below we should re-route the ?sym= code to grab from G3tNextSymbolFromWatchlist();
                                }else{
                                    $startWatchlistLoop = 0;
                                }
                    }
        }else{
            $startWatchlistLoop = 0;
        }



}// if( $w@tchlistRUNNING  == 0 ){

// here we drop out and  $w@tchlistRUNNING  = 0  or  =1, if loop=1 started...



$sym = "SPY";
if( $watchlistRUNNING  == 1 ){

        $sym = GetNextSymbolFromWatchlist();

}else if( $watchlistRUNNING  == 0 ){

// get $sym from ?sym=AAPL                  // ###################### orig  ?sym=GS code...

        if(isset( $_GET['sym'] )){

            $sym = $_GET['sym'] ;

            if($sym=="&"  || $sym=="" ){   
                $sym = "DIA";
            }else  if(CheckValidString($sym, $compareCharStringMASTER)==false){
                $sym = "QQQ";
            }

        }else{
            $sym = "SPY";
        }
        $sym = strtoupper($sym);

}


// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE
// ######################################## >>>>>>>>>>> NEW sym CODE   **END** HERE





















//   crypto
$gDigitalCurrency= 0;
$gCryptoCurrency="USD";
$gCryptoSymbol="BTC";
$gCryptoName="Bitcoin";

$symCryptoTest = TestEndOfString($sym, "-" );
if( $symCryptoTest == true ){
    $sym=$sym.$gCryptoCurrency;
}

$gSymCrypto = TestAndGetWellFormedCryptoSymbol($sym);  // test for "BTC-USD",  Output: &symbol=BTC&market=USD
if($gSymCrypto != "nil"){
    $gDigitalCurrency= 1;
    $sym = $gCryptoSymbol;  // updated inside T3stAndGet...().
}else{
    $gDigitalCurrency= 0;
}
if($msg==1 &&  $gDigitalCurrency== 1){
    echo "] CRYPTO FOUND!!!!   ;  gSymCrypto= $gSymCrypto , sym==". $sym. " currency==".$gCryptoCurrency ;
}



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
    if($per0=='1')  $per0="1min";
    if($per0=='5')  $per0="5min";
    if($per0=='15') $per0="15min";
    if($per0=='30') $per0="30min";
    if($per0=='60') $per0="60min";

    if($per0=='d' || $per0=='D' || $per0=='DAILY' || $per0=='Daily' || $per0=='day' || $per0=='Day')   $per0="daily";
    if($per0=='w' || $per0=='W' || $per0=='WEEKLY' || $per0=='Weekly')  $per0="weekly";
    if($per0=='m' || $per0=='M' || $per0=='MONTHLY' || $per0=='Monthly') $per0="monthly";

    if(CheckStringArray($periods, $per0)) $per=$per0;
    if($per=="daily" || $per=="weekly" || $per=="monthly" ) $per=ucfirst($per);  // Daily <== daily
}else{
    $per = "Daily";
}



$intraday=0;   // assume intraday false
if($per!="Daily" && $per!="Weekly" && $per!="Monthly" ){
    // if( $per=="1min" ||    ||  ){ }
     $intraday=1;
     $gDataSeriesTypeStr= $per;
    }else{
    $gDataSeriesTypeStr=strtolower($per);   // ie weekly
}
$timeseriesStr = "Time Series (". $per. ")";

$gGlobalPER = $per;

$barlen='daily';
if($per=="1min") $barlen="1";
if($per=="5min") $barlen="5";
if($per=="15min") $barlen="15";
if($per=="30min") $barlen="30";
if($per=="60min") $barlen="60";

if($per=="Daily")   $barlen=$gDataSeriesTypeStr;
if($per=="Weekly")  $barlen=$gDataSeriesTypeStr;   // ie weekly
if($per=="Monthly") $barlen=$gDataSeriesTypeStr;


// if($ms g==1){
//     echo " ** PER =". $per;
//     echo "  ** intraday =". $intradaystrs[$intraday];
//     echo " tser = ". $timeseriesStr;
// }

$gAdjCloseThreshold=0.975;

function GetJsonData($url, $maxCandles, $strkey) {
    global $adjustedCloseFlag ,  $gDataSeriesTypeStr, $gDigitalCurrency, $gGlobalPER , $barlen, $gAdjCloseThreshold;
    $flag0=0;
    $flag1=1;
    $abs_cl=0.0;
    $ohlc_adjusted =0;
    $ohlc_adjusted_ratio=1.0;


    try {
        $json = file_get_contents($url);    // Fetch the JSON data from the URL
        $data = json_decode($json, true);     // Decode the JSON data into a PHP array
                    
                    // Check if the "Time Series (Daily)" key exists
                    // if (!isset($data["Time Series (Daily)"])) {
                    if (!isset($data[ $strkey ])) {
                            throw new Exception("Invalid JSON structure or missing Time Series data.");
                    }

        // Extract the daily time series data
    // if(isset($data[ $strkey ])){;}     //BUG!!! // $timeSeries = $data["Time Series (Daily)"];  
        $timeSeries = $data[ $strkey ]; 
        $result = [];           // Initialize an empty array to hold the result





    $timestr = "";

    // Loop through the time series data and collect the required information
    foreach ($timeSeries as $date => $values) {



        $timestr = "16:00:00";
        if(strlen($date) > 10) {   // ie there is a time component  "2024-11-01 04:00:00.324"
             $timestr = GetRestOfDateTimeStr($date);   // ret's "04:00:00.324"
        }


        if($adjustedCloseFlag == 0  ||  $gDigitalCurrency==1 ){      //  for stocks non-AdjClose, & ALL Crypto 

            if( $intraday==0 ){     // old daily, weekly monthly stocks **** NO SPLIT DATAs
                    $result[$date] = [
                        "dateOrig" => $date  ,
                        "timeOrig" => $timestr  ,

                        "openOrig" => $values["1. open"],
                        "highOrig" => $values["2. high"],
                        "lowOrig" =>  $values["3. low"],
                        "closeOrig" => $values["4. close"],
                        "ohlc_adjusted" => $ohlc_adjusted, 
                        "ohlc_adjusted_ratio" => $ohlc_adjusted_ratio, 

                        "open" => $values["1. open"],
                        "high" => $values["2. high"],
                        "low" =>  $values["3. low"],
                        "close" => $values["4. close"],

                        "volume" => $values["5. volume"],

                        "adjustedcloseflag" => $flag0,    // ie no adjusted close here...
                        "seriestype" => $gDataSeriesTypeStr,
                        "seriescrypto" => $gDigitalCurrency,
                        "barlen"  => $barlen,
                        "globalper" =>  $gGlobalPER
                    ];

            }else if( $intraday==1    &&   $gDigitalCurrency==0 ){    // ie. stocks intraday $adjstedCloseFlag == 0
                    //  $numstr = $gDataSeriesTypeStr."_".$gPeriod ;
                        $result[$date] = [
                            "dateOrig" => $date  ,
                            "timeOrig" => $timestr  ,

                            "openOrig" => $values["1. open"],
                            "highOrig" => $values["2. high"],
                            "lowOrig" =>  $values["3. low"],
                            "closeOrig" => $values["4. close"],
                            "ohlc_adjusted" => $ohlc_adjusted,
                            "ohlc_adjusted_ratio" => $ohlc_adjusted_ratio, 

                            "open" => $values["1. open"],
                            "high" => $values["2. high"],
                            "low"   => $values["3. low"],
                            "close" => $values["4. close"],

                            "volume" => $values["5. volume"],

                            "adjustedcloseflag" => $flag0,    // ie no adjusted close on INTRADAY...
                            "seriestype" => $gDataSeriesTypeStr,
                            "seriescrypto" => $gDigitalCurrency,
                            "barlen"  => $barlen,
                            "globalper" =>  $gGlobalPER           
                        ];

                }//if








        }else if($adjustedCloseFlag == 1 ){  
            // adj close for stocks only (splits/divs), DAILY != wk/mon , ie daily has splitcoefficient


                                        if( $gDataSeriesTypeStr=="daily" ){    // *NEW*  iff daily adjusted, THIS HAS 8. split coefficient
                                        //  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129
                                        
                                                        $op        = floatVal( $values["1. open"] );
                                                        $hi        = floatVal( $values["2. high"] );
                                                        $lo        = floatVal( $values["3. low"] );
                                                        $cl        = floatVal( $values["4. close"] );

                                                        $adjcl     = floatVal( $values["5. adjusted close"]);
                                                                    
                                                        $new_ratio = $adjcl / $cl;     // ie 10-1 split cl =1500, adjCl =150 150/1500 = .10 = n3wRatio
                                                        $abs_cl = abs( $adjcl - $cl  );  // if > 0.95


                                                        if(  $ohlc_adjusted==1  ){            
                                                                            $op = $op * $ohlc_adjusted_ratio;
                                                                            $hi = $hi * $ohlc_adjusted_ratio;
                                                                            $lo = $lo * $ohlc_adjusted_ratio;
                                                                            $cl = $cl * $ohlc_adjusted_ratio;   // ie.  $1500 * 0.10 == $150
                                                            }else   if($abs_cl  > $gAdjCloseThreshold ){
                                                                
                                                                            $ohlc_adjusted_ratio = $new_ratio;     // reset the ratio
                                                                            $op = $op * $ohlc_adjusted_ratio;
                                                                            $hi = $hi * $ohlc_adjusted_ratio;
                                                                            $lo = $lo * $ohlc_adjusted_ratio;
                                                                            $cl = $cl * $ohlc_adjusted_ratio;   // ie.  $1500 * 0.10 == $150
                                                                            $ohlc_adjusted=1;
                                                         }



                                                    $result[$date] = [
                                                            "dateOrig" => $date  ,
                                                            "timeOrig" => $timestr  ,

                                                            "openOrig" =>  $values["1. open"],
                                                            "highOrig" =>  $values["2. high"],
                                                            "lowOrig" =>   $values["3. low"],
                                                            "closeOrig" => $values["4. close"],
                                                            "ohlc_adjusted" => $ohlc_adjusted,
                                                            "ohlc_adjusted_ratio" => $ohlc_adjusted_ratio, 

                                                            "open" => $op,
                                                            "high" => $hi,
                                                            "low" =>  $lo,
                                                            "close" => $cl,
                                                            // "open" => $values["1. open"],
                                                            // "high" => $values["2. high"],
                                                            // "low" =>  $values["3. low"],
                                                            // "close" => $values["4. close"],


                                                            "adjustedclose" => $values["5. adjusted close"],
                                                            "volume" => $values["6. volume"],
                                                            "dividendamount" => $values["7. dividend amount"],
                                                            "splitcoefficient" => $values["8. split coefficient"],  //  *** only on daily data

                                                            "adjustedcloseflag" => $flag1, 
                                                            "seriestype" => $gDataSeriesTypeStr,
                                                            "seriescrypto" => $gDigitalCurrency,
                                                            "barlen"  => $barlen,

                                                            "globalper" =>  $gGlobalPER
                                                    ];





                                        }else  if(    $gDataSeriesTypeStr=="weekly"     ||    $gDataSeriesTypeStr=="monthly"    ){ 
                                                // SHOULD TRY to  GET THERE, and detect cl vs adjClose diff, like daily 

                                                // https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129
                                                // https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129
                                                        $result[$date] = [
                                                            "dateOrig" => $date  ,
                                                            "timeOrig" => $timestr  ,

                                                            "openOrig" => $values["1. open"],
                                                            "highOrig" => $values["2. high"],
                                                            "lowOrig" =>  $values["3. low"],
                                                            "closeOrig" => $values["4. close"],
                                                            "ohlc_adjusted" => $ohlc_adjusted,
                                                            "ohlc_adjusted_ratio" => $ohlc_adjusted_ratio, 


                                                            "open" => $values["1. open"],
                                                            "high" => $values["2. high"],
                                                            "low" =>  $values["3. low"],
                                                            "close" => $values["4. close"],

                                                            "adjustedclose" => $values["5. adjusted close"],
                                                            "volume" => $values["6. volume"],
                                                            "dividendamount" => $values["7. dividend amount"],
                                                            // "splitcoefficient" => $values["8. split coefficient"]

                                                            "adjustedcloseflag" => $flag1, 
                                                            "seriestype" => $gDataSeriesTypeStr,
                                                            "seriescrypto" => $gDigitalCurrency,
                                                            "barlen"  => $barlen,

                                                            "globalper" =>  $gGlobalPER         
                                                        ];       

                                            } //    $gDataSeriesTypeStr=="weekly"     ||    $gDataSeriesTypeStr=="monthly"    ){ 

            }//  else if($adjustedCloseFlag == 1 ){  

            // Stop adding if we've reached the maximum number of candles
            if (count($result) >= $maxCandles) {
                break;
            }


        }// forea



        $result = array_reverse($result);        // Reverse the array so the data is in ascending order
        return $result;

    } catch (Exception $e) {
        // Handle any exceptions by returning an empty array or logging an error
        error_log("Error fetching or processing data: " . $e->getMessage());
        return [];
    }
}//fn

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

    $MonthOpen  = 0;  // i=0 month0pen not accuracte...
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


    $gapClosed_date = "nil";
    $gapOpenIdx  = 0;
    $gapClosed_x = 0;


    $BuySignal  = 0;
    $SellSignal = 0;

    $pivot = 0;
    $P=0; $P3= 0;

    $h0=0; $l0= 0; $c0= 0; $o0= 0;
    $s1 = 0;  $s2=0; $s3=0; $s4=0;
    $r1 = 0;  $r2=0; $r3=0; $r4=0;

    $i=0;
    $monthdays=0;

    // HA = Heikin Ashi
    $HA_open = 0;
    $HA_high = 0;
    $HA_low  = 0;
    $HA_close= 0;
    


    foreach ($data as $date => &$value) {    // Loop through each element of the array
        
            $high  = floatval($value['high']);     // this candle's h,l,c,o [0]
            $low   = floatval($value['low']);
            $close = floatval($value['close']);
            $open  = floatval($value['open']);


// start pivot get stuff
        $h0=0;    $l0= 0; $c0= 0; $o0= 0;
        $s1 = 0;  $s2=0; $s3=0; $s4=0;
        $r1 = 0;  $r2=0; $r3=0; $r4=0;


    if($i==0){ 
            $MonthOpen = $open;

            // Heikin Ashi 1st [0] data piece
            $HA_close = ($open + $high + $low + $close )/4;
            $HA_open  = ($open + $close )/2;
            $HA_high = $high;
            $HA_low  = $low;

            $value['HA_close']  =   $HA_close;
            $value['HA_open']   =   $HA_open;
            $value['HA_high']   =   $HA_high;
            $value['HA_low']    =   $HA_low;
        }

// first do i>0 stuff like HA and 
    if($i>0){  // for Pivots & HA, proces [1] and up
                //  get the O,H,L,C prices from YESTERDAY 
                $h0= array_values($data)[$i-1]['high'];
                $l0= array_values($data)[$i-1]['low'];
                $c0= array_values($data)[$i-1]['close'];
                $o0= array_values($data)[$i-1]['open'];
                


                // Heikin Ashi  data piece
                $HA_close = ($open + $high + $low + $close )/4;
                $HA_open  =   ($o0 + $c0 )/2;
                $HA_high  =  max( $high, $HA_open , $HA_close );
                $HA_low   =  min( $low,  $HA_open , $HA_close );

                $value['HA_close']  =   $HA_close;
                $value['HA_open']   =   $HA_open;
                $value['HA_high']   =   $HA_high;
                $value['HA_low']    =   $HA_low;    



                // pivots  // Calculate "P" as the average of yesterday's : "high", "low", and "close"
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
                        
                        $gapPriceThresh =   floatval( $cl0  * $gapPctThreshold );   //   yesterday's close  * 0.05

                        $priceDiff_GapUpTest     =    floatval($low - $h0 );     //  today's low  -  yesterday's high     variant: ($close - $h0 ); 
                        // $priceDiffabs         = abs($low - $h0 );
                        $priceDiff_GapDnTest     =    floatval( $l0 - $high  );    //   yesterday's low  -today's high       variant: ($close - $l0 ); 



                // TEST for GAPs  
                        // test for 1st gap UP, then 2nd gap DOWN...
                        if( $priceDiff_GapUpTest > $gapPriceThresh  &&   $low > $h0 ){   //  todayLOW < yestHIGH , GAP UP  Detected
                            $gapDir = 1;    
                            $gapDirStr      = "up" ;
                            $gapStart_date  = $date;
                            $gapEnd_date    = "nil" ;
                            
                            $gapStart_price = $h0;
                            $gapEnd_price   = $low;
                        }
                        if( $priceDiff_GapDnTest > $gapPriceThresh  &&  $l0 > $high){   // yestLOW > todayHIGH ,  GAP DOWN  Detected
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

                        // *NEW*
                        $value['gapclosed_date']   =  $gapClosed_date  ;
                        $value['gapclosed_x']      =    $gapClosed_x ;
                        $value['gapopen_idx']      =    $gapOpenIdx  ;
                    
                    
                        

    }else{  // if i<=0 we're at start of data candles RESET vars

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

        // on every loop, set eow to zero, regardless of  i
        $value['endOfWeek'] = 0;
        // intraday...
        $value['endOfMorning'] = 0;
        $value['endOfHour'] = 0;


    $thisMonth       = substr( $date, 0, 7 );   // '2024-10'     from  '2024-10-23' ;   
    $thisMonthMMstr  = substr( $thisMonth, 5, 2 );   // '10'     from  '2024-10' ;   
    
        if( $thisMonth != $LastMonth ){    // ie '2024-10' vs '2024-09'
            // here we have NOT set $MonthHigh, Low or Close  or Last so 
            //  we have a NEW MONTH HERE, LETS GET LAST MONTH'S #'S
            
            $value['monthOpen']     = $MonthOpen;  //  really last monht's open; except first time it will be zero until new monht
            $MonthOpen              =  $open ;     // since we are on a new month, set it for next != monts

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


            $value['endOfMonth'] = 1;       // *** KEY THIS IS A New month like Jul 01  or Apr 02(mon)



            // check if  NEW mon = jan apr jul oct
            if( $thisMonthMMstr=="01" || $thisMonthMMstr=="04" || $thisMonthMMstr=="07" || $thisMonthMMstr=="10" ){
                $value['endOfQtr'] = 1;
            }else $value['endOfQtr'] = 0;

            // check if  NEW mon = jan     $value['endOf Year'] = 1;
            if($thisMonthMMstr=="01" ){
                $value['endOfYear'] = 1;
            }else    $value['endOfYear'] = 0;




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
            $value['monthOpen'] = 0;
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
        $value['endOfQtr']   = 0;  // if not eom, then NOT eoq, eoy...
        $value['endOfYear']  = 0;

        }// if month == lastM0nth

        // ##########################################################  END OF monthly


        // Add other fields and set them to 0 initially
        $value['weekOpen'] = 0;
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


        $value['qtrOpen']  = 0;
        $value['qtrHigh']  = 0;
        $value['qtrLow']   = 0;
        $value['qtrClose'] = 0;
        $value['qtrLastDate'] = "nil";
        $value['qtrDaysCnt'] = 0 ;


        $value['R4qtr'] = 0;
        $value['R3qtr'] = 0;
        $value['R2qtr'] = 0;
        $value['R1qtr'] = 0;
        $value['Pqtr'] = 0;
        $value['P3qtr'] = 0;
        $value['S1qtr'] = 0;
        $value['S2qtr'] = 0;
        $value['S3qtr'] = 0;
        $value['S4qtr'] = 0;

        $value['X1qtr'] = 0;
        $value['Y1qtr'] = 0;
        $value['X2qtr'] = 0;
        $value['Y2qtr'] = 0;

        // ##########################################################  END OF quarterly


        $value['yearOpen']  = 0;
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

        // ##########################################################  END OF yearly




        $value['datefull'] = $date;
        $value['date'] = substr($date, 0, 10);


        // *NEW*
        $value['split_detected']  = 0;
        $value['split_date']      = "na";
        $value['split_coeff']     = 1.0;

        


        $mn = substr($date, 5, 2);      // 'YYYY-MM-DD' ==> 'MM'  ==> 09


        //  ** NEW **
        $udate00 = substr($date, 0, 10);      // 'YYYY-MM-DD HH:MM:SS.mmm' ==> 'YYYY-MM-DD'   ==> 09
        $monthNameLong = ReturnMonthName( $udate00 , 0 );
        $monthNameShort= ReturnMonthName( $udate00 , 1 );

        // 'DEL'
        //  $mnInt = (int)$mn;              // ==> 9  XXX DEPR ???

        $value['monthNum'] =  $mn ;    //substr($date, 5, 2);   OK 

        // $mm = $value['monthNum'];
        // $mm1=intval($mm);
        // $value['monthName'] = $months[ $mm1 ];  
        $value['monthName'] =       $monthNameLong ;  
        $value['monthNameShort'] =  $monthNameShort;    //  *NEW

        // $timestamp = strtotime($date);  //  use only 10char udate
        $timestamp = strtotime($udate00);   
        $dow = strtolower(date('D', $timestamp));      // Format the timestamp to return the three-letter day abbreviation (e.g., Mon, Tue, Sat)
        $value['dayOfWeek']  = $dow;                   // 0 Sun - 6 Sat normal php

        $dayOfWeekNum1 =date('w', $timestamp);
        $dayOfWeekNum = (int)$dayOfWeekNum1;
        $value['dayOfWeekInt']  =  $dayOfWeekNum;   // 0...6==sat

        $monthNumberInt = date("n", $timestamp);
        $monthNumberInt1 = (int)$monthNumberInt;
        $value['monthInt'] =  $monthNumberInt1 ;   

        $doq = getDayOfQuarterFromDate( $udate00 );
        $value['dayOfQtrInt']  =  $doq;
        $doy = getDayOfYearFromDate( $udate00 );
        $value['dayOfYearInt'] =  $doy;


        $value['endOfDay'] = 0;   // for intraday
        $value['endOfWeek'] = 0;



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


   
    // 2ndLoop find year H L  C
    // 2ndLoop find year H L  C
    // 2ndLoop find year H L  C
    // 2ndLoop find year H L  C
    $ii=0;
    foreach ($data as $date => &$value) {    // Loop through each element of the array
        $eoy  =     intval($value['endOfYear']); 
        $eoq  =     intval($value['endOfQtr']); 
        $gPer = strtolower($value['globalper']);                 //  "Monthly"  ==> monthly


        if( $gPer=="monthly" ){

            if($eoy==1  && $ii>=12 ){   // only compute HLC pivots for  0..11 --> [12]

                // if we get here it is JAN and we have a whole year behind us
                    $yearClose = (float)(array_values($data)[$ii-1]['close']);   // dec close
                    $yearOpen  = (float)(array_values($data)[$ii-12]['open']);   // jan open
                    $value['yearClose'] =  $yearClose;
                    $value['yearOpen']  =  $yearOpen;
                 
                    
                    $hi12 = (float)(array_values($data)[$ii-1]['high']); // dec 
                    $hi11 = (float)(array_values($data)[$ii-2]['high']); 
                    $hi10 = (float)(array_values($data)[$ii-3]['high']); 
                    $hi09 = (float)(array_values($data)[$ii-4]['high']); 
                    $hi08 = (float)(array_values($data)[$ii-5]['high']); 
                    $hi07 = (float)(array_values($data)[$ii-6]['high']); 

                    $hi06 = (float)(array_values($data)[$ii-7]['high']); 
                    $hi05 = (float)(array_values($data)[$ii-8]['high']); 
                    $hi04 = (float)(array_values($data)[$ii-9]['high']); 
                    $hi03 = (float)(array_values($data)[$ii-10]['high']); 
                    $hi02 = (float)(array_values($data)[$ii-11]['high']); 
                    $hi01 = (float)(array_values($data)[$ii-12]['high']); // jan

                    $yearHigh = max( $hi12, $hi11, $hi10, $hi09 , $hi08 , $hi07 , $hi06 , $hi05 , $hi04 , $hi03 , $hi02 , $hi01 );
                    $value['yearHigh'] =  $yearHigh;
    

                    $lo12 = (float)(array_values($data)[$ii-1]['low']); // dec 
                    $lo11 = (float)(array_values($data)[$ii-2]['low']); 
                    $lo10 = (float)(array_values($data)[$ii-3]['low']); 
                    $lo09 = (float)(array_values($data)[$ii-4]['low']); 
                    $lo08 = (float)(array_values($data)[$ii-5]['low']); 
                    $lo07 = (float)(array_values($data)[$ii-6]['low']); 

                    $lo06 = (float)(array_values($data)[$ii-7]['low']); 
                    $lo05 = (float)(array_values($data)[$ii-8]['low']); 
                    $lo04 = (float)(array_values($data)[$ii-9]['low']); 
                    $lo03 = (float)(array_values($data)[$ii-10]['low']); 
                    $lo02 = (float)(array_values($data)[$ii-11]['low']); 
                    $lo01 = (float)(array_values($data)[$ii-12]['low']); // jan

                    $yearLow  = min( $lo12, $lo11, $lo10, $lo09 , $lo08 , $lo07 , $lo06 , $lo05 , $lo04 , $lo03 , $lo02 , $lo01 );
                    $value['yearLow'] =  $yearLow;

// here compute YearlyPivots
 
                            // COMPUTE yearLY PIVOTS SRs, BASED on LAST YEAR's OHLC, computed / stored above  ie  $value['yearHigh'] =  $yearHigh;
                            $Pyear = ( $yearHigh+ $yearLow + $yearClose ) / 3;

                            $R1year =  ($Pyear *2 ) - $yearLow;      //  R1day = (Pday *2)-Low;
                            $S1year =  ($Pyear *2 ) - $yearHigh;     //  S1day = (Pday *2)-High;

                            $S2year =  $Pyear - $yearHigh + $yearLow ;  //  S2day = Pday – High + Low;
                            $R2year =  $Pyear + $yearHigh - $yearLow ;   // R2day = Pday + High – Low;

                            $S3year =  $Pyear -   ( $R2year - $S1year ) ;   // S3day = Pday – (R2day-S1day);
                            $R3year =( $Pyear - $S1year ) +   $R2year ;     // R3day = (Pday-S1day) + R2day;

                            $S4year =  $yearLow - 3*( $yearHigh - $Pyear); // s4day = Low- 3*(High-Pday) ; 
                            $R4year =  $yearHigh+ 3*( $Pyear - $yearLow );  //  R4day = High+ 3*(Pday-Low) ;

                            // here we should CALC Based on these above
                            $value['R4year'] = $R4year;
                            $value['R3year'] = $R3year;
                            $value['R2year'] = $R2year;
                            $value['R1year'] = $R1year;
                            $value['Pyear'] =  $Pyear;     
                            $value['P3year'] = 0.0;
                            $value['S1year'] = $S1year;
                            $value['S2year'] = $S2year;
                            $value['S3year'] = $S3year;
                            $value['S4year'] = $S4year;


                }// if eoy VALID

        }// if m0nthly


            // if( $gPer=="weekly" ){
            //     if($eoq==1  && $ii>=4 ){   // only compute HLC pivots for 
            //         // $o0= array_values($data)[$i-1]['open'];
            //         $dum=1;
            //         }
            // }
         



        $ii++;
     }//for


    return $data;    // Return the modified array

}//fn
 
function GetRestOfDateTimeStr($udatetime) {
    $nilstr="";
    if (strlen($udatetime) > 10) {
        // Return the substring from the 12th character to the end
        $tstr = substr($udatetime, 11);
        if(isset($tstr)) return  $tstr ; 
        else return $nilstr;
    } else {
        // Return an empty string if the length is not greater than 10
        return $nilstr;
    }
}


function GetMonthNumber($udate) {
    $timestamp== strtotime($udate);
    // Get the month as a zero-indexed number (1-12)
    $monthNumber = date("n", $timestamp) ;
    return $monthNumber;
}

function GetDayOfYearFromDate($udate) {
    // Convert the Unix date string to a timestamp
    $timestamp = strtotime($udate);
    
    // Format the timestamp to get the day of the year
    $dayOfYear = date("z", $timestamp) + 1; // "z" gives 0-365, so add 1 for 1-366
    
    return $dayOfYear;
}


function getDayOfQuarterFromDate($udate) {
    // Convert the Unix date string to a timestamp
    $timestamp = strtotime($udate);
    
    // Extract year and month from the timestamp
    $year = date('Y', $timestamp);
    $month = date('n', $timestamp);
    
    // Determine the start of the quarter
    if ($month <= 3) {
        $quarterStart = strtotime("$year-01-01"); // Q1
    } elseif ($month <= 6) {
        $quarterStart = strtotime("$year-04-01"); // Q2
    } elseif ($month <= 9) {
        $quarterStart = strtotime("$year-07-01"); // Q3
    } else {
        $quarterStart = strtotime("$year-10-01"); // Q4
    }
    
    // Calculate the difference in days
    $dayOfQuarter = floor(($timestamp - $quarterStart) / (60 * 60 * 24));
    
    return $dayOfQuarter;
}
// // Example usage
// $udate = "2024-10-31";
// echo getDayOfQuarterFromDate($udate); // Outputs the day of the quarter for the given date

function ReturnMonthName($udate, $abbreviateFlag) {
    // Convert the string date to a timestamp
    $timestamp = strtotime($udate);
    
    // Choose format based on $abbreviateFlag
    if ($abbreviateFlag == 1) {
        // Lowercase, 3-letter abbreviation
        return strtolower(date('M', $timestamp));
    } else {
        // Full month name
        return date('F', $timestamp);
    }
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



let lastday0 = -1;
// MAIN AI FUNCTION
function scanCandlesticksForAI( candleArray ){
    
    var i=0, j=0, idx=0, idx_1=0, idx_2=0, idx_3=0, price0=0, p1dayAgo=0, p2dayAgo=0, p3dayAgo=0   ;
    var voltmp=0;

            gCorpName = "{Corp Name Here}";

            BuySignal = 0;
            SellSignal = 0;
            
            BuySigCnt = 0;
            SellSigCnt =0;

            longShort = 0; // -1 for short, 1 for long, 0 n/a
            longShortPrior = 0; // to keep track of previous state
    
   // nov 23rd 2018
   // june 30th 2019  jmb clear globals like gHCD_candleNum =-1; ...
            Clear_gIndicators();
    
    
// HERE WE REDEFINE THE GLOBAL VAR candlesLen
            candlesLen = candleArray.length / candlesOffset ;
//JMB011023
            //candlesLen = ClampCandlesLen(candleArray);

          // console.log("] scnCandlesticksForAI() -  before split hndlr" ); 



  // ************************************************************************************ SPLIT_HANDLER
  // ************************************************************************************ SPLIT HANDLER
  // ****
  // ****     SPLIT HANDLER
  // ****
  // ************************************************************************************ SPLIT HANDLER
  // ************************************************************************************ SPLIT HANDLER
  //
  // JMB 2020-10-09
  // handle  if(gSpl itDetected==1);
    	var spl=0;
    	var tmpj=0;
    	var splitDivideFactor=1.0 ;

   // console.log("] scnCandlesticksForAI() -  start of split hndlr" ); 


		if(gSplitDetected==1){

   // console.log("] scnCandlesticksForAI() -  INSIDE of split hndlr gSpl1itDetected==1" ); 



			for(i=(candlesLen-1); i>=0; i--){  // reverse
		        	   idx= i * candlesOffset;  

                    let splitstr = candleArray[ idx + SPLIT_COEF ]; 

		             spl = Number( candleArray[ idx + SPLIT_COEF ] );
		             if(spl!=1.0){

            cl( "] SPLIT HANDLER [SPLIT_COEF]==  ==>"+ splitstr +"<==" );

                      // console.log("] **   SPLIT FOUND,  Num( spl )==" , spl );   
                      //  console.log( candleArray[ idx + SPLIT_COEF ] );


                            splitDivideFactor *= spl;   // handled multiple splits in same array
            console.log("]  splitDivideFactor == " ,splitDivideFactor );

    		             	// console.log("i=="+i+") splitDivideFactor="+splitDivideFactor+" starting split on next candle...");
		             }else{
      		             		// ie if we encounter splitcoeff in Avantage data, then don't split that line.
      	 		             tmpj =   Number(candleArray[ idx + O ]) / splitDivideFactor   ;
      			             candleArray[ idx + O ] = ( tmpj.toFixed(4) ).toString() ;
            						 
            						 tmpj =   Number(candleArray[ idx + H ]) / splitDivideFactor   ;
            			             candleArray[ idx + H ] = ( tmpj.toFixed(4) ).toString() ;
            						 
            						 tmpj =   Number(candleArray[ idx + L ]) / splitDivideFactor   ;
            			             candleArray[ idx + L ] = ( tmpj.toFixed(4) ).toString() ;
            						 
            						 tmpj =   Number(candleArray[ idx + C ]) / splitDivideFactor   ;
            			             candleArray[ idx + C ] = ( tmpj.toFixed(4) ).toString() ;
            			         
            			         // volume * split factor
            						 tmpj =   Number(candleArray[ idx + V ]) * splitDivideFactor   ;
            			             candleArray[ idx + V ] = ( tmpj.toFixed(4) ).toString() ;
			         }//else
		             	 

		        }// for 

                // clear       if(gSplitDetected==1){
        

        //reset it so we don't keep splitting upon redraw...
        // gSplitDetected=2;  // ?
        gSplitDetected=0;


		}//if
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER



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
             "high: " . $value['high'] . ", " .
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
}//fn


//  ################################################## LIVE CODE
//  ################################################## LIVE CODE
//  ################################################## LIVE CODE



$sym0= $sym;
$maxCandles = 95;  // just over 1 qtr
$sym0str = $sym0." ".$per." Chart";
$printjson=0;

 // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=15min&entitlement=realtime&apikey=91M7LB7MG3JHY129

$url1min = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".$sym0. "&interval=1min&entitlement=realtime&apikey=91M7LB7MG3JHY129";
$urlday = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$sym0."&outputsize=full&apikey=91M7LB7MG3JHY129&outputsize=compact"; // Replace with the actual URL

$urlweekly="https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo";
$urlmonthly="https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo";

// adjusted prep SAMPLES ONLY
$url_adjusted_close_daily = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129";
$url_adjusted_close_weekly = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129";
$url_adjusted_close_monthly = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSTR&outputsize=compact&apikey=91M7LB7MG3JHY129";


$url_crypto_intraday ="https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=USD&interval=15min&apikey=91M7LB7MG3JHY129";
$url_crypto_daily    ="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=SOL&market=USD&apikey=91M7LB7MG3JHY129";
$url_crypto_weekly   ="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=SOL&market=USD&apikey=91M7LB7MG3JHY129";
$url_crypto_monthly  ="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=SOL&market=USD&apikey=91M7LB7MG3JHY129";

$url_vwap ="https://www.alphavantage.co/query?function=VWAP&symbol=IBM&interval=15min&apikey=demo";

$strkey_1min  ="Time Series (1min)";
$strkey_15min = "Time Series (15min)";
$strkey_daily="Time Series (Daily)";

$strkey= $strkey_daily ;   
$url = $urlday ;
// $strkey= $strkey_1min ;    $url = $url1min ;

$strkey = $timeseriesStr;  // ie. "Time Series (Daily)"  or  "Time Series (1min)" or "Weekly Time Series"
$strkeyAux = $strkey;  // this is for string-stripping only to insert (Daily) into per in json
$APIkey ="91M7LB7MG3JHY129";













// THIS CODEBLOCK SETS adjcloseflag

    if( $gDigitalCurrency == 0 ){

            if($per=="Daily"){
                    $gDataSeriesTypeStr="daily";
                    
                    // FORCE IT on daily
                    $adjustedCloseFlag  =  1;   

                // NORMAL ==    "Time Series (Daily)": {   SAMED ***  // ADJUSTD  ==  "Time Series (Daily)": {
                    $strkey =  "Time Series (Daily)";  // this is the format for both daily and adjDaily
                    $url =     "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$sym0."&outputsize=compact&apikey=". $APIkey ;
                    if( $adjustedCloseFlag==1) {
                        $strkey =  "Time Series (Daily)";  // same for adj
                        $url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=".$sym0."&outputsize=compact&apikey=". $APIkey ;
                    }


            }else if($per=="Weekly"){  // defaults to 20yrs
                // NORMAL == "Weekly Time Series": {  // ADJ    ==  "Weekly Adjusted Time Series": {
                    $gDataSeriesTypeStr="weekly";
                    $adjustedCloseFlag  =  0;   

                    $strkey =  "Weekly Time Series";  
                    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=".$sym0."&outputsize=compact&apikey=". $APIkey ;
                    if( $adjustedCloseFlag==1) {
                        $strkey =  "Weekly Adjusted Time Series";  
                        $url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=".$sym0."&outputsize=compact&apikey". $APIkey ;
                    }


            }else if($per=="Monthly"){   // defaults to 20yrs
            //  NORMAL  == "Monthly Time Series": {  //  ADJ     == "Monthly Adjusted Time Series": {
                        $gDataSeriesTypeStr="monthly";
                        $adjustedCloseFlag  =  0;   

                        $strkey =  "Monthly Time Series";   
                        $url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=".$sym0."&outputsize=compact&apikey=". $APIkey ;
                        if( $adjustedCloseFlag==1) {
                            $strkey =  "Monthly Adjusted Time Series";  
                            $url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=".$sym0."&outputsize=compact&apikey". $APIkey ;
                        }

            }else{
                if($intraday==1){
                    $adjustedCloseFlag=0;
                    $gDataSeriesTypeStr="intraday";
                    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".$sym0. "&interval=" .$per ."&entitlement=realtime&apikey=". $APIkey ;
                }
            }


    }else if( $gDigitalCurrency == 1 ){
        $adjustedCloseFlag  =  0;   

        if($per=="Daily"){
                $gDataSeriesTypeStr="daily";

                $strkey =  "Time Series (Digital Currency Daily)";   
                $url =    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY". $gSymCrypto ."&apikey=". $APIkey ;
                // $url =    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY". '&symbol=BTC&market=USD' ."&apikey=". $APIkey ;

        }else if($per=="Weekly"){ 
                $gDataSeriesTypeStr="weekly";

                $strkey =  "Time Series (Digital Currency Weekly)";   
                $url =    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY". $gSymCrypto ."&apikey=". $APIkey ;
               
        }else if($per=="Monthly"){ 
                $gDataSeriesTypeStr="monthly";

                $strkey =  "Time Series (Digital Currency Monthly)";   
                $url =    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY". $gSymCrypto ."&apikey=". $APIkey ;
               
        }else{
            $dumdum=1; 
            // chk intraday here
            // check intraday    //"Time Series Crypto (5min)": {
            // check intraday    //"Time Series Crypto (15min)": {
        }

    }// if crpto

$strRemove="Time Series ";
$intervalStr = removeString($strkeyAux, $strRemove);   // leave only "(Monthly)" or "(15min)"
if($msg==1){
    echo  "] AdjCloseFlag==". $adjustedCloseFlag .", per= $per,   gDataSeriesTypeStr==". $gDataSeriesTypeStr ;
}


$data = GetJsonData($url, $maxCandles, $strkey);

$dataProcessed = ProcessCandles($data, $sym0, $intervalStr);
if($printjson==1) PrintJsonData($dataProcessed, $sym0, $strkey , $maxCandles );

// Convert $processedData to JSON
$processedDataJson = json_encode($dataProcessed);


// Output the data
// print_r($dataProcessed);

/*

{
    "Meta Data": {
        "1. Information": "Intraday (1min) open, high, low, close prices and volume",
        "2. Symbol": "AAPL",
        "3. Last Refreshed": "2024-10-30 19:59:00",
        "4. Interval": "1min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (1min)": {
        "2024-10-30 19:59:00": {
            "1. open": "230.7000",
            "2. high": "230.8000",
            "3. low": "230.7000",
            "4. close": "230.7000",
            "5. volume": "1209"
        },
        "2024-10-30 19:58:00": {
            "1. open": "230.7100",
            "2. high": "230.8000",
            "3. low": "230.7000",
            "4. close": "230.7500",
            "5. volume": "1106"
        },


{
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "AAPL",
        "3. Last Refreshed": "2024-10-30 19:55:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2024-10-30 19:55:00": {
            "1. open": "230.6650",
            "2. high": "230.8000",
            "3. low": "230.6000",
            "4. close": "230.7000",
            "5. volume": "6106"
        },
        "2024-10-30 19:50:00": {
            "1. open": "230.6000",
            "2. high": "230.7800",
            "3. low": "230.6000",
            "4. close": "230.6700",
            "5. volume": "4430"
        },


        {
    "Meta Data": {
        "1. Information": "Intraday (15min) open, high, low, close prices and volume",
        "2. Symbol": "AAPL",
        "3. Last Refreshed": "2024-10-30 19:45:00",
        "4. Interval": "15min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (15min)": {
        "2024-10-30 19:45:00": {
            "1. open": "230.7300",
            "2. high": "230.8000",
            "3. low": "230.6000",
            "4. close": "230.7000",
            "5. volume": "15707"
        },
        "2024-10-30 19:30:00": {
            "1. open": "230.3300",
            "2. high": "230.8800",
            "3. low": "230.3300",
            "4. close": "230.7100",
            "5. volume": "18414"
        },





     // ################################## crypto


        {
    "Meta Data": {
        "1. Information": "Crypto Intraday (15min) Time Series",
        "2. Digital Currency Code": "BTC",
        "3. Digital Currency Name": "Bitcoin",
        "4. Market Code": "USD",
        "5. Market Name": "United States Dollar",
        "6. Last Refreshed": "2024-10-31 21:45:00",
        "7. Interval": "15min",
        "8. Output Size": "Compact",
        "9. Time Zone": "UTC"
    },
    "Time Series Crypto (15min)": {
        "2024-10-31 21:45:00": {
            "1. open": "70224.66000",
            "2. high": "70434.69000",
            "3. low": "70220.27000",
            "4. close": "70350.10000",
            "5. volume": 89
        },
        "2024-10-31 21:30:00": {
            "1. open": "70213.54000",
            "2. high": "70299.99000",
            "3. low": "70135.69000",
            "4. close": "70224.74000",
            "5. volume": 72
        },


        {
    "Meta Data": {
        "1. Information": "Daily Prices and Volumes for Digital Currency",
        "2. Digital Currency Code": "SOL",
        "3. Digital Currency Name": "Solana",
        "4. Market Code": "USD",
        "5. Market Name": "United States Dollar",
        "6. Last Refreshed": "2024-10-31 00:00:00",
        "7. Time Zone": "UTC"
    },
    "Time Series (Digital Currency Daily)": {
        "2024-10-31": {
            "1. open": "174.82000000",
            "2. high": "175.43000000",
            "3. low": "174.82000000",
            "4. close": "175.22000000",
            "5. volume": "7661.89401551"
        },
        "2024-10-30": {
            "1. open": "179.35000000",
            "2. high": "181.20000000",
            "3. low": "173.11000000",
            "4. close": "174.85000000",
            "5. volume": "678648.76800693"
        },


        {
    "Meta Data": {
        "1. Information": "Weekly Prices and Volumes for Digital Currency",
        "2. Digital Currency Code": "SOL",
        "3. Digital Currency Name": "Solana",
        "4. Market Code": "USD",
        "5. Market Name": "United States Dollar",
        "6. Last Refreshed": "2024-10-31 00:00:00",
        "7. Time Zone": "UTC"
    },
    "Time Series (Digital Currency Weekly)": {
        "2024-10-31": {
            "1. open": "176.43000000",
            "2. high": "183.30000000",
            "3. low": "172.27000000",
            "4. close": "175.22000000",
            "5. volume": "2603796.43788426"
        },
        "2024-10-27": {
            "1. open": "167.34000000",
            "2. high": "179.12000000",
            "3. low": "159.05000000",
            "4. close": "176.44000000",
            "5. volume": "5812226.50432464"
        },

{
    "Meta Data": {
        "1. Information": "Monthly Prices and Volumes for Digital Currency",
        "2. Digital Currency Code": "SOL",
        "3. Digital Currency Name": "Solana",
        "4. Market Code": "USD",
        "5. Market Name": "United States Dollar",
        "6. Last Refreshed": "2024-10-31 00:00:00",
        "7. Time Zone": "UTC"
    },
    "Time Series (Digital Currency Monthly)": {   
        "2024-10-31": {
            "1. open": "152.50000000",
            "2. high": "183.30000000",
            "3. low": "133.10000000",
            "4. close": "175.22000000",
            "5. volume": "21744629.69876191"
        },
        "2024-09-30": {
            "1. open": "135.33000000",
            "2. high": "161.80000000",
            "3. low": "120.51000000",
            "4. close": "152.50000000",
            "5. volume": "20308859.38673487"
        },



 */


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

            /* Smooth transition for hover and active */
            transition: background-color 0.2s ease; 
        }

        .buttons-container button:hover {
            background-color: #5A5FBF;  
        }

        .buttons-container button:active {
            background-color: #3E4290;  
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
        var gChartHighDate  = <?php echo '"'. $ChartHighDate. '"'; ?>;

        var gChartLow      = <?php echo $ChartLow; ?>;
        var gChartLowIdx   = <?php echo $ChartLowIdx; ?>;
        var gChartLowDate  = <?php echo '"'. $ChartLowDate. '"'; ?>;

        console.log("] still inside php: Chart HI,idx,date / LOs = ",gChartHigh,gChartHighIdx, gChartHighDate, "  Lows=",gChartLow, gChartLowIdx, gChartLowDate ); 
        
        var gDigitalCurrency= <?php echo $gDigitalCurrency; ?>; 
        var gCryptoSymbol   = <?php echo '"'. $gCryptoSymbol. '"'; ?>;
        var gCryptoCurrency = <?php echo '"'. $gCryptoCurrency. '"'; ?>;
        var gCryptoName     = <?php echo '"'. $gCryptoName. '"'; ?>;
        // global $gCryptoSymbol, $gCryptoCurrency, $gCryptoName;

        var watchlistArrStr             =  <?php echo '"'. $watchlistArrStr. '"'; ?>;

        var g_watchlistLoopThru_sym     =  <?php echo '"'. $gWatchListSymStr. '"'; ?>;
        var g_watchlistRUNNING          =  <?php echo $watchlistRUNNING; ?>;
        var g_watchlistLoopThru_cnt     =  <?php echo $g_watchlistLoopThru_cnt; ?>;

        console.log("] still inside php: INSIDE .js: watchlstLoopThru_sym, running, cnt ==", g_watchlistLoopThru_sym, g_watchlistRUNNING, g_watchlistLoopThru_cnt );
        console.log("] still inside php: INSIDE .js: watchlstArrStr=**=", watchlistArrStr );  





        var gColSchemeNum = <?php echo $sch; ?>;
        var processedData = <?php echo $processedDataJson; ?>;

        


        // $email1         = $_SESSION["user"] ;
        // $emailName1      = strstr($email1 , '@', true) ;

        // $userID1        = $_SESSION["userId"] ;  
        // $numvisits1     = $_SESSION["numvisits"] ;
        // $user_ip1       = $_SESSION["userIP"] ;
        // $user_loc1      = $_SESSION["user_loc"] ;
        
        // $user_lastDateTime1   = $_SESSION["user_lastDateTime"] ;
        // $user_lastDay1        = $_SESSION["user_lastDay"] ;

        // $productstr1  = $_SESSION["user_productstr"]  ;
        // $appSecret1  =  $_SESSION["appsecret"] ;

        var g_email1                 = <?php echo '"'. $email1. '"'; ?>;
        var g_emailName1             = <?php echo '"'. $emailName1. '"'; ?>;
        var g_userID1                = <?php echo '"'. $userID1. '"'; ?>;
        var g_numvisits1             = <?php echo '"'. $numvisits1. '"'; ?>;
        var g_user_ip1               = <?php echo '"'. $user_ip1. '"'; ?>;
        var g_user_loc1              = <?php echo '"'. $user_loc1. '"'; ?>;
        var g_user_lastDateTime1     = <?php echo '"'. $user_lastDateTime1. '"'; ?>;
        var g_user_lastDay1          = <?php echo '"'. $user_lastDay1. '"'; ?>;
        var g_productstr1            = <?php echo '"'. $productstr1. '"'; ?>;
        var g_appSecret1             = <?php echo '"'. $appSecret1. '"'; ?>;



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
 */
    </script>

    <!-- Link to your external JavaScript file -->
    <!-- <script src="canvas0.js"></script> -->
    <script src="canvas100.js"></script>
    <!-- <script src="drawchart.js"></script> -->
</body>
</html>




