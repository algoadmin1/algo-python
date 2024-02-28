<?php
// jb      recPortfolioTrade.php by John Botti Copyright (c) 2020-2025 by Algo Investor Inc. All Rights Reserved.
//
// Setting up Error Reporting Level
//
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 
                                                      $vers = "4.19";
                                                      // from  gettrades.php, recpost1db.php
$minstrlen = 32; 
$dirPrefix="rawtrades/";
$happy1 = "Vega"; 
$happy2="jb";
$CurrencyStr="$";
$todaysdate = date('Y-m-d');
$prgname= "recPortfolioTrade.php";
// $filename0 = "trades_ini.txt"; 

// //echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// // ******************************************************************** INITAL VARS

// // Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
$utime0 = isset($_GET['t']) ? $_GET['t'] : '2359';
$uuser0 = isset($_GET['u']) ? $_GET['u'] : 'baduser';

$uname0 = isset($_GET['name']) ? $_GET['name'] : 'Creator';
$acct0  = isset($_GET['acct']) ? $_GET['acct'] : '12345354911';
$msg0=0;
$msg0   = isset($_GET['msg']) ? $_GET['msg'] : '0';




// ******************************************************************** INITAL VARS
//
$prgname="recpost1db.php";
$happy1.="s";
$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$password1 = "Egw2B4f*q@z_$";
$dbname = "u151710353_algotrades";
// $tblname ="trades";
$tblname ="positions";

$timeNYC =  date("Y-m-d\TH:i:s");



// ******************************************************************** Functions
//
// include 'functions.php'; // Include the file containing functions
function PrintUserInputs($udate0, $utime0, $uname0, $acct0, $msg0){
  // Use the values as needed
  echo "Input msg: $msg0 , ";
  echo "Input Date: $udate0 , ";
  echo "Input Time: $utime0 , ";
  echo "Input Username: $uname0 , ";
  echo "Input Acct#: $acct0 <br>";  
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

function CheckDate0($datestr0){
    $dateck = DateTime::createFromFormat('Y-m-d', $datestr0);
    //if( strlen($udate0==10) )  $tradedatestr = $udate0 ;
    $tof0=false;
    if ($dateck !== false && $dateck->format('Y-m-d') === $datestr0 &&  strlen($datestr0)==10  ) {
        echo "<br /> ] CheckDate0(): Valid date OK in 'YYYY-MM-DD' format: $datestr0 , strlen()==". strlen($datestr0);
        // $tradedatestr=$datestr;  // override date to read/write
        $tof0= true;
    } else {
        echo "<br /> ] CheckDate0(): Invalid date or not in 'YYYY-MM-DD' format: $datestr ";
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




// Function to print array of strings
function printArray($arrStrs, $msgStr) {
    echo "] $msgStr  : Array of Strings:\n";
    // echo "<br />";

    foreach ($arrStrs as $index => $str) {
        echo "$index: $str\n";
        // echo "<br />";
    }
}
 


// INITIAL ACK / NAK
if($uuser0=="err"){
  echo "NOGO"; 
}else{
  echo "OKGO"; 
}

echo "354MOOSE] Attempting RECEIVE data: [ prg vers= $vers ]  ......";
echo "] recpost.php $vers is running, Time in NYC = ". $todaysdate."    ____________-->" ;

$happy1.= GetEntryNums();

echo "happy1 == ". $happy1 ;

//$searchQuery = $_POST["post_query"];
// $searchQuery = $_POST["data"];#
$searchQuery="";
// Check if 'data' key is defined in $_POST
if (isset($_POST['data'])) {
    $searchQuery = $_POST['data'];

    echo "Search query: $searchQuery ";
} else {
    echo "Error: 'data' key is not defined in the POST request............";
}

$filePath="";
$filePath1 = "portfoliotradelog"; 
//$todaysdate = date('Y-m-d');
$filePath.= $filePath1."_". $todaysdate. ".txt";


//$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
//	if (!$con) die('Could not connect: ' . mysqli_error($con));
//	mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));
 
echo "] fn= $filePath , reading searchQuery... \n";  //= $searchQuery \n";

$splitChars = ",";
//$afterAdrsee = strpbrk($searchQuery,$splitChars);
//$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd


if (empty($searchQuery)) {
    echo "searchQuery is empty, exiting.\n";
    exit("recpost.php execution terminated.\n\n");

  } else {
    echo " searchQuery, len=". strlen($searchQuery). " - _POST msg rec'd OK!\n";
  }

$i=0;

$params = explode (",", $searchQuery);
echo "\n params = ". $params[0]. "|". $params[1]. "|". $params[2]. "|".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
$cnt=count($params);
echo "\nFound $cnt params[] (all lines)...\n";


// $hastr0="creatorNIL";  // not in positions.tradeHash
$hastr0="creatorHash";
$inserted0=0;
$insertdb=0;

// ATTEMPT ACCESS
try {
  // Connect to MySQL using PDO
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
  // Set PDO to throw exceptions for errors
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// ######################################################### Start code HERE

        $tradeHashToQuery = $hastr0 ;

        // $query = "SELECT * FROM trades WHERE tradeHash = :tradeHash";
        // $query = "SELECT * FROM ". $tblname. " WHERE tradeHash = :tradeHash";
        $query = "SELECT * FROM positions WHERE tradeHash = :tradeHash";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':tradeHash', $tradeHashToQuery);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $insertdb=0;
        if ($result) {  // if there is a hash == found
            $insertdb=0;
            if($msg0==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
        } else {
            $insertdb=1;
            if($msg0==1) echo "<br />] NO RawTrade found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
        }

        if($insertdb==1){
          // $insertQuery0 = "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
          $insertQuery0 = "INSERT INTO positions ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
          
          // $conn->exec($insertQuery0a);
          // $lastInsertedId = $conn->lastInsertId();
          // $inserted0++;
          // $pstr2= "<br />] Sample trade inserted. Last inserted ID: $lastInsertedId ";
          // echoColor($pstr2,"green");


          // $pstr3= "<br />] Sample trade inserted; insertQuery0a = $insertQuery0a ";
          $pstr3= "<br />] Sample  trade NOT   inserted but insertQuery0a = $insertQuery0a ";
          echoColor($pstr3,"blue");

        }else{

         echo "<br />] insertdb = $insertdb  ___ NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery "; 
          
          
        }

    } catch (PDOException $e) {
        echo "<br />] Connection failed: " . $e->getMessage();
    }
    // Close the PDO connection
    $conn = null;
 

// INITIAL ACK / NAK
if( $uuser0=="err"  ||  $insertdb==0 ){
  echo "NOGO"; 
}else if( $insertdb==1 ){
  echo "OKGO"; 
}
 
 
?>
