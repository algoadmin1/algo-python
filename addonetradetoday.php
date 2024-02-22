<?php
////////////// ****  addonetradetoday.php derived from gettrades.php Copyright (c) 2023-2026 by Algo Investor Inc
////////////// **                                                       written by John Botti 02-21-24
//
//
//
//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York"); 
                                                      $vers = "7.88";
$minstrlen = 32; 
$dirPrefix="rawtrades/";
$happy1 = "Vega"; 
$happy2="jb";
$CurrencyStr="$";
$todaysdate = date('Y-m-d');
$filename0 = "trades_ini.txt"; 

//echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// ******************************************************************** INITAL VARS

// Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
$type0 = isset($_GET['type']) ? $_GET['type'] : '2500';
$sym0  = isset($_GET['sym']) ? $_GET['sym'] : 'nil';
$qty0  = isset($_GET['qty']) ? $_GET['qty'] : '0';
$uuser0="j";
// if($msg0==1) PrintUserInputs( $udate0, $type0, $sym0, $qty0 , $msg0 );


// $uname0 = isset($_GET['name']) ? $_GET['name'] : 'Creator';
// $acct0  = isset($_GET['acct']) ? $_GET['acct'] : '12345354911';
$msg0=0;
$msg0   = isset($_GET['msg']) ? $_GET['msg'] : 'nil';


$prgname="addonetradetoday.php";
$happy1.="s";
$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$password1 = "Egw2B4f*q@z_$";
$dbname = "u151710353_algotrades";
$tblname ="trades";

$timeNYC =  date("Y-m-d\TH:i:s");
$tradeCsvHeaders  =  "tradeDate,tradeTime,tradeType,tradeSize,symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,timestamp";

$tradeCsvHeaders0 =  "tradeDate,tradeTime,tradeType,tradeSize,symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,timestamp";
$tradeCsvHeaders2 =  ",tradeRecTimestamp,tradeDateTime,tradeDay,tradeBar,userId,accountId,tradeRAW,tradeRawId,tradeSize1,tradePrFilled,";
$tradeCsvHeaders2.=  "tradeDur,tradeStopMke,tradeLimitExit,optionStrategy,daySRs,wkSRs,moSRs,tradeSpec,tradeSig,tradeGapPct,";
$tradeCsvHeaders2.=  "tradeStatus,tradeAux1,tradeAux2,tradeHash";

$tradeCsvHeadersALL=  $tradeCsvHeaders0. $tradeCsvHeaders2;

// ******************************************************************** INITAL VARS
// from gettrades.py
//

if($uuser0=="j" ) $uuser0=$happy2;

$currstr= $CurrencyStr;


 $numoptionslegGlobal=0; 
 $tradestr1GlobalStr="";   
 $tradestr2GlobalStr="";   
 $tradestr3GlobalStr="";   
 $tradestr4GlobalStr=""; 

$colorGreen ="green";
$colorBlue  ="blue";
$colorCyan  ="cyan";
$colorOrange  ="orange";

$colorRed  ="red";
$colorMagenta  ="magenta";
$colorYellow  ="yellow";
$colorDarkGreen  ="darkgreen";
$colorDarkRed  ="darkred";
$colorPurple  ="purple";
$colorBrown  ="brown";

$colorWhite  ="white";
$colorLimeGreen  ="green";
$colorAqua  ="aqua";
$colorGray  ="gray";

 
// ******************************************************************** Functions

// include 'functions.php'; // Include the file containing functions
function PrintUserInputs($udate0, $type0, $sym0, $qty0, $msg0){
  // Use the values as needed
  echo "Input msg: $msg0 , ";
  echo "Input Date: $udate0 , ";
  echo "TRADE TYPE: $type0 , ";
  echo "TRADE SYMBOL: $sym0 , ";
  echo "TRADE QTY: $qty0 <br />";  
}

function RightString($str0, $numchars) {
    $right_part = substr($str0, -$numchars);
    return $right_part;
}
function LeftString($str0, $numchars) {
    $left_part = substr($str0, 0, $numchars);
    return $left_part;
}
function ConCat($str1, $str2) {
    $concatenated_string = $str1. $str2;
    return $concatenated_string;
}
function NumCSVs( $csvstring ){
  //$csvstring0 = "2,w,3,aal,googl,8,citi,xom"; // Your CSV string
  // Parse the CSV string into an array
  $values_array = str_getcsv($csvstring);
  // Count the number of values
  $num_values = count($values_array);
  //echo "Number of CSV values: $num_values"; // Output the count
  return $num_values;
}
function HashIt($str0){
  //$str0 = "Your string here"; // Replace this with your string
  // Generate SHA-256 hash
  $hashstr = hash('sha256', $str0);
  /*echo "  >>>>Original String: ";
  echo LeftString($str0,32) ."...<<<<  ";
  echo "SHA-256 Hash: >>>$hashstr<<<  ";
  */
  return $hashstr;
}
function PrintArray( $arrstrs , $arrstrs0 ){
  // Print the resulting array
  echo "<br /><br /><br />] resulting array = ". $arrstrs0. "[] == <br />";
  print_r($arrstrs);
}
function GetEntryNums(){
  $aa=10+11-1;
  $bb=3*8;
  return $aa. $bb. "!";
}
function GetDBSafe_NYCTimeNOW($num0){
      $timeNYCnow0 =  date("Y-m-d\TH:i:s");
      $timeNYCnow1 =  date("Y-m-d\THis");    
      $timeNYCnow  =  date("Y-m-d\TH_i_s");
  if($num0==1) return( $timeNYCnow1 ); 
    else if($num0==0) return( $timeNYCnow0);
    else  return( $timeNYCnow ); 
}
function GetNYDateTime(){
  $timeNYC0 =  date("Y-m-d\TH:i:s");
  return $timeNYC0;
}

function print_colored($printstr, $colorstr){   // colorstr = " red blue  green black white yellow purple orange gray"
    echo '<p style="color: '. $colorstr. ';">'. $printstr. '</p>';
  }
function echoColor($printstr, $colorstr){   // colorstr = " red blue  green black white yellow purple orange gray"
    echo '<p style="color: '. $colorstr. ';">'. $printstr. '</p>';
   // echo '<p style="color: green;">The file '. $fname. ' exists.</p>';
  }
  
function RaiseCharacter($str, $num) {
    if ($num >= 0 && $num < strlen($str)) {
        $str[$num] = strtoupper($str[$num]);
        return $str;
    } else {
        return "Invalid position $num  or string length exceeded in: $str at $num .";
    }
}
function LeftInsertString($str0, $strToInsert, $num) {
    if ($num >= 0 && $num <= strlen($str0)) {
        $leftPart = substr($str0, 0, $num);
        $rightPart = substr($str0, $num);
        return $leftPart . $strToInsert . $rightPart;
    } else {
        return "Invalid position $num  or string length exceeded in: $str0 at $num .";
    }
}
function RightInsertString($str0, $strToInsert, $num) {
    if ($num >= 0 && $num <= strlen($str0)) {
        $leftPart = substr($str0, 0, -$num);
        $rightPart = substr($str0, -$num);
        return $leftPart . $strToInsert . $rightPart;
    } else {
        return "Invalid position $num  or string length exceeded in: $str0 at $num .";
    }
}
function DetectCharacter($str0, $char0, $num) {
    if ($num >= 0 && $num < strlen($str0)) {
        return $str0[$num] === $char0;
    } else {
        return false;
    }
}

function replaceChars($str, $charstr, $replacestr) {
    $result = str_replace(str_split($charstr), str_split($replacestr), $str);
    return $result;
}
function removeChars($str, $charstr) {
    $result = str_replace(str_split($charstr), '', $str);
    return $result;
}
function noNilStrings($arr, $replacestr) {
    foreach ($arr as &$value) {
        if ($value === null || $value === "") {
            $value = $replacestr;
        }
    }
    return $arr;
}


function RemoveRightCharacter($str0, $num) {
    if ($num >= 0 && $num < strlen($str0)) {
        return substr($str0, 0, -$num - 1) . substr($str0, -$num);
    } else {
        return "Invalid position or string length exceeded";
    }
}
function ReadableDate($datestr,$yrStr) { // returns "December 25th 2023  w/ or w/out the year"
    $timestamp = strtotime($datestr);
    if($yrStr=="year"){
      return date("F jS Y", $timestamp);
    }    else    return date("F jS", $timestamp);

}
function BoldString($str2){
  $str1='<strong>';
  $str3='</strong>';
  return $str1.$str2.$str3;
}

function CheckDate0($datestr0, $msg0){
    $dateck = DateTime::createFromFormat('Y-m-d', $datestr0);
    //if( strlen($udate0==10) )  $tradedatestr = $udate0 ;
    $tof0=false;
    if ($dateck !== false && $dateck->format('Y-m-d') === $datestr0 &&  strlen($datestr0)==10  ) {
        if($msg0==1) echo "<br /> ] CheckDate0(): Valid date OK in 'YYYY-MM-DD' format: $datestr0 , strlen()==". strlen($datestr0);
        // $tradedatestr=$datestr;  // override date to read/write
        $tof0= true;
    } else {
        if($msg0==1) echo "<br /> ] CheckDate0(): Invalid date or not in 'YYYY-MM-DD' format: $datestr0 ";
        $tof0= false;
    }
    return $tof0;
}

function FloorIt($num, $modulo) {
    return floor($num / $modulo) * $modulo;
}

function SendEmailTo($receiverEmail, $senderEmail, $subject, $msg) {
    $headers = "From: $senderEmail\r\n";
    $headers .= "Reply-To: $senderEmail\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Send the email
    if (mail($receiverEmail, $subject, $msg, $headers)) {
        return "Email sent successfully!";
    } else {
        return "Failed to send email. Check your server's configuration or try again later.";
    }
}

function ReadArrayFile($fname) {
    $strarr = []; // Initialize an empty array to store lines from the file

    // Open the file for reading
    $file = fopen($fname, "r");

    // Check if the file was opened successfully
    if ($file) {
        // Read the file line by line until the end of the file
        while (($line = fgets($file)) !== false) {
            // Add each line to the array
            $strarr[] = $line;
        }

        // Close the file handle
        fclose($file);
    } else {
        // If the file couldn't be opened, handle the error (you can modify this according to your needs)
        echo "Unable to open file: $fname";
    }

    // Return the array containing lines from the file
    return $strarr;
}
 

function writeArrayToCSV($arr, $fname) {
    $file = fopen($fname, 'w');

    // Loop through each line in the array
    foreach ($arr as $line) {
        // Write the line to the CSV file
        fputcsv($file, explode(',', $line));
    }

    // Close the file handle
    fclose($file);
}
/*
// Example usage:
$linesArray = ["a,b,c", "d,e,f", "h,i,j"];
$fnameout1 = "csvtrades.csv";

writeArrayToCSV($linesArray, $fnameout1);




// Example usage:
$arr0 = "a,b,c";
$fnameout1 = "csvtrades.csv";

writeArrayToCSV($arr0, $fnameout1);





$fp = fopen('data.csv', 'r');
$headers = fgetcsv($fp); // Get column headers

$data = array();
while (($row = fgetcsv($fp)) !== false) {
    $data[] = array_combine($headers, $row);
}
fclose($fp);

$json = json_encode($data, JSON_PRETTY_PRINT);

$output_filename = 'data.json';
file_put_contents($output_filename, $json);

*/

// ********************************************************************   END OF Functions
// ********************************************************************  
 



// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
//
//
$FincialDisclaimerStr1= "Financial Disclaimer: Not Financial Advice. ";
$FincialDisclaimerStr= "Financial Disclaimer: Not Financial Advice. This content and any and all trade and investment information, positions, entry and exit points, buy or sell signals, fundamental or technical information is not financial advice and is for information and educational purposes only. Seek a licensed professional investment advisor to handle your investments and trades. Any algos or algorithms presented herein are for informational purposes only. Algo Investor, Algoz, OptionsHunter, Roi, APM and WatchDog SaaS Programs Copyright (c) by Algo Investor Inc.  All Rights Reserved.<br /><br />Algo Investor Inc. <br />6543 S. Las Vegas Blvd<br />Las Vegas, NV 89119";

$pstr8= "<br />  $prgname   $vers is running, Time in NYC =   $timeNYC  ... <br />";
if($msg0==1) echoColor($pstr8,"red");

if($msg0==1) echo "<br /><br />";

// echo "*****************<br /><br />";

// echo "<br />] **** Greetings, Creator. We are currently running:   $prgname  : $servername :  $username / $password1 | $dbname : $tblname  ...  ********<br />";
$pstr00= "] **** Greetings, Creator. We are currently running:   $prgname  : $servername :  $username / $password1 | $dbname : $tblname  ...  ********<br />";
// echoColor( $pstr00, "green" );
// echoColor( $pstr00, "blue" );
if($msg0==1) echoColor( $pstr00, "purple" );



//echo "\n*\n] Accessing https://algoinvestorr.com/*_". $dbname. "[". $username"]_". $tblname. "\n*\n*\n*\n";
// echo "*****************<br />";

if($msg0==1) PrintUserInputs( $udate0, $type0, $sym0, $qty0 , $msg0 );
 
$timeNYC =  date("Y-m-d\TH:i:s");
$happy1.= GetEntryNums();
 
///// *************************************************************************************************


// SET Default data to test / read in txt file from this date:
$tradedatestr = "2023-12-20";
$datestr = $udate0 ; // User date string chk
$tof9=false;
$tof9=CheckDate0($datestr, $msg0);
if($tof9==true) $tradedatestr=$datestr;  


$inserted0=0;

$pstr9aa= "<br />******** ATTEMPTING DB ACCESS HERE in $prgname   , exiting for now.<br />";
echo $pstr9aa;

exit(" PRG OK. Exiting...");






// $insertQuery0a= "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, daySRs, wkSRs, moSRs,   leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', '$tradeDur', '$tradeStop', '$tradeLimit', '$opStrat',   '$daySRs', '$wkSRs', '$moSRs',    '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', '$gapPct',  'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
                        
// $conn->exec($insertQuery0a);
// $lastInsertedId = $conn->lastInsertId();
// $inserted0++;


// $query1 = "SELECT * FROM trades WHERE tradeDate = :tradeDate ORDER BY tradeTime DESC";

// $pstr9aa= "<br />******** ATTEMPTING DB ACCESS HERE in $prgname  using :<br />] $query1 ";
// // echoColor($pstr9aa,"orange");
// $pstr9= "<br />******** WILL ATTEMPT to SELECT * from trades from MySQL DB <br />";
// if($msg0==1){
//     echoColor($pstr9,"blue");
//     echoColor($pstr9aa,"purple");
// }

// init necessary arr's
$csvelems = [];
$c=0;
$inserted0=0;
$insertdb = 0;


$emailSubjectStr = " ";
$emailMessageStr = " ";
$humanReadableTradeShortStr=" ";

// ATTEMPT ACCESS
try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
 


        // SELECT * FROM `trades` WHERE tradeDate='2024-01-03' order by tradeRecTimestamp DESC

                $fieldToQuery  =  $tradedatestr;     

                // $query = "SELECT * FROM trades WHERE tradeDate = :tradeDate ORDER BY tradeRecTimestamp DESC";
                $query = "SELECT * FROM trades WHERE tradeDate = :tradeDate ORDER BY tradeTime DESC";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':tradeDate', $fieldToQuery);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
              
                $rawtrades = [];

                // Display the results
                foreach ($result as $trade) {
                    if($msg0==1){
                        echo "Trade ID:   " . $trade['tradeId'] . "<br />";
                        echo "Trade Date: " . $trade['tradeDate'] . "<br />";
                        echo "Trade Time: " . $trade['tradeTime'] . "<br />";
                        echo "Trade Type: " . $trade['tradeType'] . "<br />";
                        echo "Trade SYMB: " . $trade['symbol'] . "<br />";
                        echo "Trade Cond: " . $trade['tradeCond'] . "<br />";
                        echo "TradePrice: " . $CurrencyStr.$trade['tradePrice'] . "<br />";
                        echo "BuySellCnt: " . $trade['buySellCnt'] . "<br />";
                        echo "BuySellPct: " . $trade['buySellPct'] . "<br />";
                        echo "BuySellDst: " . $trade['buySellDist'] . "<br />";
                        echo "IronCondor: " . $trade['leg1'] . " | ". $trade['leg2'] . "   _/\_   ". $trade['leg3'] . " | ". $trade['leg4'] .   "<br />";
                    }

                      echo "<br />";
                    //echo "\n";



                    // used by gettrades.py
                    //
                    echo "RAWTRADE,";
                    echo  $trade['tradeId'] . ",";
                    echo  $trade['tradeDate'] . ",";
                    echo  $trade['tradeTime'] . ",";
                    echo  $trade['tradeType'] . ",";
                    echo  $trade['symbol'] . ",";
                    echo  $trade['tradeCond'] . ",";
                    echo  $trade['tradePrice'] . ",";
                    echo  $trade['buySellCnt'] . ",";
                    echo  $trade['buySellPct'] . ",";
                    echo  $trade['buySellDist'] . ",";
                    echo  $trade['leg1'] . "|". $trade['leg2'] . "|". $trade['leg3'] . "|". $trade['leg4'] .",";

                    $rawtradestr = "RAWTRADE,".
                       $trade['tradeId'] . ",".
                       $trade['tradeDate'] . ",".
                       $trade['tradeTime'] . ",".
                       $trade['tradeType'] . ",".
                       $trade['symbol'] . ",".
                       $trade['tradeCond'] . ",".
                       $trade['tradePrice'] . ",".
                       $trade['buySellCnt'] . ",".
                       $trade['buySellPct'] . ",".
                       $trade['buySellDist'] . ",".
                       $trade['leg1'] . "|". $trade['leg2'] . "|". $trade['leg3'] . "|". $trade['leg4'] .",";

//    $tradeCsvHeaders0 = "tradeDate,tradeTime,tradeType,tradeSize,symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,timestamp";
//    $tradeCsvHeaders2 =  ",tradeRecTimestamp,tradeDateTime,tradeDay,tradeBar     ,userId,accountId,tradeRAW,tradeRawId,tradeSize1,   tradePrFilled,";
//    $tradeCsvHeaders2.=  "tradeDur,tradeStopMkt,tradeLimitExit,        optionStrategy,daySRs,wkSRs,moSRs, tradeSpec,tradeSig,tradeGapPct,";
//    $tradeCsvHeaders2.=  "tradeStatus,tradeAux1,tradeAux2,tradeHash";

//    $trade CsvHeadersALL=  $tradeCsvHeaders0. $tradeCsvHeaders2;
                            
                        $rawtradestr2 = $trade['tradeRecTimestamp']. ",". $trade['tradeDateTime']. ",". $trade['tradeDay']. ",". $trade['tradeBar']. ",";
                        $rawtradestr2.= $trade['userId']. ",". $trade['accountId']. ",". $trade['tradeRAW']. ",". $trade['tradeRawId']. ",". $trade['tradeSize']. ",";
                        $rawtradestr2.= $trade['tradePrFilled']. ",". $trade['tradeDur']. ",". $trade['tradeStopMkt']. ",". $trade['tradeLimitExit']. ",";
                        $rawtradestr2.= $trade['optionStrategy']. ",". $trade['daySRs']. ",". $trade['wkSRs']. ",". $trade['moSRs']. ",";
                        $rawtradestr2.= $trade['tradeSpec']. ",". $trade['tradeSig']. ",". $trade['tradeGapPct']. ",". $trade['tradeStatus']. ",";
                        $rawtradestr2.= $trade['tradeAux1']. ",". $trade['tradeAux2']. ",". $trade['tradeHash']. ",";

                       $rawtradestr.= $rawtradestr2;


/*

    //[RAWTRADE,tradeId], tradeDate,tradeTime,tradeType,tradeSize,              symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,   priceDist,pricePct,tradeStrong,tradeLeg,timestamp
    //  0      ,   1    ,      2   ,    3    ,    4
    $tradestr0=          $arr[2].",". $arr[3].",". $arr[4].",". $tradesize0.",". $arr[5].",". $arr[6].",". $arr[7].",". $arr[1].",". $arr[8].",". $aboveBelowstr. ",". $S1R1str. ",". $arr[10]. ",". $arr[9]. ",". $tradestrong.",". $tradeLeg.",". $timestampnow  ;

{
        "tradeDate": "2024-02-02",
        "tradeTime": "1530",
        "tradeType": "SELL",
        "tradeSize": "10",
        "symbol": "TSLA",
        "tradeCond": "atLimit",
        "tradePrice": "187.83",
        "rawtradeId": "1758",
        "tradeCnt": "9",
        "tradeAboveBelow": "below",
        "tradePivot": "R1",
        "priceDist": "-3.19",
        "pricePct": "-1.7001%",
        "tradeStrong": "0",
        "tradeLeg": "1",
        "timestamp": "2024-02-04T202402"
    },
*/
//      current:
//    $tra deCsvHeaders = "tradeDate,tradeTime,tradeType,tradeSize,symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,timestamp";
                       
// ORIGINAL
// "INSERT INTO trades (tradeId, tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) 
//               VALUES (NULL, current_timestamp(), '2023-12-27', '2023-12-27T130000', '1300', 'wed', '15min', 'creator', '12345354', 'SELL', 'ALB', 'YES', '0', '100', '149.66', '0.0', 'atLimit', 'Day', '0.0', '0.0', 'noOptions', '0.0', '0.0', '0.0', '0.0', '5', '-2.9118%', '-4.36', 'nil', 'sell', '0.0', 'cued', 'nil', 'nil', '7475bf6f706cb7a0cd92840c7d0dbe8de9579f39ec04db3ded7b470617e25d51')";


                    // append
                    $rawtrades[]= $rawtradestr;

                    // echo "<br />";
                    //echo "\n";

                }


                // Count the number of records
                $numberOfTrades = count($result);

                // Display the count
                // echo "Number of trades: " . $numberOfTrades;

                 if ($result  &&  $msg0==1) {
                    // echo "<br />] FOUND $numberOfTrades trades for tradeDate = $fieldToQuery , result=  $query   <pre>" . print_r($result, true) . "</pre>";
                    echo "<br />] FOUND $numberOfTrades trades for tradeDate = $fieldToQuery , result=  $query  <br />"; // <pre>" . print_r($result, true) . "</pre>";
                } else if($msg0==1) {
                     echo "<br />] NO TRADES FOUND.<br />";
                }







            $pstr99="<br />End of SELECT * from trades, at " .date("Y-m-d\TH:i:s"). " NYC Time.<br /><br /><br />" ;  
            if($msg0==1)  echoColor($pstr99,"blue");








} catch (PDOException $e) {
    echo "<br />] Connection failed: " . $e->getMessage();
}

// Close the PDO connection
$conn = null;

$pstr9= "<br />******** CLOSING DB ACCESS HERE in $prgname *********<br />";
if($msg0==1) echoColor($pstr9,"red");

$tf66=0;
if($rawtrades ){
// if($rawtrades && $msg0==1){
        echoColor("]   RAWTRADES !!!!!   concat'd   *** rawtrades strings[] ==<br />","blue");
    if($tf66==1)    print_r($rawtrades);
        else echo "]        rawtrad3s[] exist. Not printing for brevity.";
}


echoColor("] Reading INI File $filename0 <br />","red");
$arrINIcsvfile = ReadArrayFile( $filename0 );
$ii=0;
foreach ($arrINIcsvfile as $line) {
        if ($line[0] === '#'  ) {
        ; // do nil
    }else {
        // echo  "<br />____".  $line ."    == ";  
        echo  "<br />____" ;  
        $linecsv = str_getcsv($line);
        foreach ($linecsv as $csvelems) {
            if($ii==0){ 
                echo $csvelems. "_|_";
            }else echo $csvelems. " | ";
        }
    }
    $ii++;
}



echo "<br />";
echoColor("] INI file read.<br />","red");

$tradestrGlobalArr=[];
$arrcsv=[];

//  new
$tradeCsvHeaders= $tradeCsvHeadersALL;
echoColor( $tradeCsvHeaders, "blue" );
$arrcsv[]=$tradeCsvHeaders;

// here $line is just a string not arr
$idx=0;
foreach ($rawtrades as $line) {
        if ($line[0] === '#'  ) {
        ; // do nil
    }else {
        if($msg0==1){
            echo " $idx ]";
            print_r($line);
        }
        $lineArray = explode(",", $line);
        
        // $tradestrGlobalArr=[];
        $arrcsv[]= GenerateTrade($lineArray ,$idx, $arrINIcsvfile);

        //add aux trades
        if($numoptionslegGlobal>=1 && strlen($tradestr1GlobalStr)> $minstrlen )  $arrcsv[]= $tradestr1GlobalStr;   

        // if($numoptionslegGlobal>=2 && strlen($tradestr2GlobalStr)> $minstrlen )  $arrcsv[]= $tradestr2GlobalStr;   
        // if($numoptionslegGlobal>=3 && strlen($tradestr3GlobalStr)> $minstrlen )  $arrcsv[]= $tradestr3GlobalStr;   
        // if($numoptionslegGlobal==4 && strlen($tradestr4GlobalStr)> $minstrlen )  $arrcsv[]= $tradestr4GlobalStr;   
 
        // print_r($arrcsv);
    }
    $idx++;
}

// tradeDate,tradeTime,tradeType,tradeSize,symbol,      tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,
// tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,  timestamp,tradeRecTimestamp,tradeDateTime,tradeDay,tradeBar,
//  userId,accountId,tradeRAW,tradeRawId,tradeSize1,    tradePrFilled,tradeDur,tradeStopMke,tradeLimitExit,optionStrategy,
//  daySRs,wkSRs,moSRs,tradeSpec,tradeSig,              tradeGapPct,tradeStatus,tradeAux1,tradeAux2,tradeHash

// 2024-02-06,1600,SELL,10,TSLA,         atLimit,184.79,1879,4,below, 
// R1,-0.68,-0.3674%,0,220|210|155|145,  2024-02-07T025501,"2024-02-06 20:45:06", 2024-02-06T160000,tue,15min,
// Creator,12345354911,raw67,0,100,      0,day,110.874,461.975,IronCondor1.15,
// a,b,c,nil,SELL,                       0,1,2,3,nil





$ftimeout    = GetDBSafe_NYCTimeNOW(1);   

$fnameout        = $dirPrefix. "cuedtrades_". $tradedatestr . "_recv_". $ftimeout. ".csv";     
$fnameoutjson    = $dirPrefix. "cuedtrades_". $tradedatestr . "_recv_". $ftimeout. ".json";  

$fnameoutUdate      = $dirPrefix. "cuedtrades_". $tradedatestr  . ".csv";     
$fnameoutjsonUdate  = $dirPrefix. "cuedtrades_". $tradedatestr .  ".json";     

$fnameoutcsv     = $dirPrefix. "cuedtrades.csv";     
$fnameoutcsvjson = $dirPrefix. "cuedtrades.json";  

echoColor("<br />] END OF GenrateTrades().  Writing server files... ","blue"); // #$fnameoutcsv and $fnameout (log) containing  tra deCsvHeaders==","blue");
if($msg0==1) print_r($arrcsv);

// tradeDate,tradeTime,tradeType,tradeSize,symbol,tradeCond,tradePrice,rawtradeId,tradeCnt,tradeAboveBelow,tradePivot,priceDist,pricePct,tradeStrong,tradeLeg,timestamp,tradeRecTimestamp,tradeDateTime,tradeDay,tradeBar,userId,accountId,tradeRAW,tradeRawId,tradeSize1,tradePrFilled,tradeDur,tradeStopMke,tradeLimitExit,optionStrategy,daySRs,wkSRs,moSRs,tradeSpec,tradeSig,tradeGapPct,tradeStatus,tradeAux1,tradeAux2,tradeHash

writeArrayToCSV($arrcsv, $fnameoutcsv);
// writeArrayToCSV($arrcsv, $fnameout   );
writeArrayToCSV($arrcsv, $fnameoutUdate   );

   
// echoColor("<br />] WROTE CSV (w/ Header) FILES: $fnameoutUdate , $fnameoutcsv and $fnameout ","purple");
echoColor("<br />] WROTE CSV (w/ Header) FILES: $fnameoutUdate    $fnameoutcsv   ","purple");


//make function here reads csv back in converts to json
$fp = fopen($fnameoutcsv, 'r');
$headers = fgetcsv($fp); // Get column headers

$data = array();
while (($row = fgetcsv($fp)) !== false) {
    $data[] = array_combine($headers, $row);
}
fclose($fp);

$json = json_encode($data, JSON_PRETTY_PRINT);

file_put_contents($fnameoutcsvjson, $json);
// file_put_contents($fnameoutjson, $json);
file_put_contents($fnameoutjsonUdate, $json);

// echoColor("<br />] WROTE JSON FILES: $fnameoutjsonUdate  , $fnameoutcsvjson and $fnameoutjson ","purple");
echoColor("<br />] WROTE JSON FILES: $fnameoutjsonUdate   $fnameoutcsvjson   ","purple");

$u=0;
$col0="blue";
foreach ($arrcsv as $line0) {
    $col0="blue";
    $startrade="     ";

    $arr0 = explode(",", $line0);
    if($arr0[2]=="BUY" || $arr0[2]=="buyToOpen_PUT_sellToOpen_PUT"  ||  $arr0[2]=="buyToOpen_CALL_" ){
        // $col0="darkgreen";    
        $col0="gray";    
        if($arr0[13]=="1"){
              $col0="green"; 
              $startrade="^***^";
        }
    }
    
    if( $arr0[2]=="SELL" || $arr0[2]=="buyToOpen_CALL_sellToOpen_CALL"  ||  $arr0[2]=="buyToOpen_PUT_"  ) {
        // $col0="darkred";  
        $col0="gray";    
  
        if($arr0[13]=="1") {
             $col0="red"; 
             $startrade="v***v";
        }
        
    }


    // echoColor($u. ")  ". $line0. "<br/ >", "blue");
    echoColor($u. ")  ". $startrade. " " . $line0. "<br/ >", $col0);
    $u++;

}//foreach


if($msg0==1) echo $json;

 



?>  