<?php
////////////// **************************************  recpost1db.php Copyright (c) 2023-2026 by Algo Investor Inc
////////////// **                                                   written by John Botti
//
//
//
//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York"); 
                                                      $vers = "3.64";
$minstrlen = 32; 
$dirPrefix="rawtrades/";
$happy1 = "Vega"; 
$CurrencyStr="$";
$todaysdate = date('Y-m-d');

//echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// ******************************************************************** INITAL VARS

// Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
$utime0 = isset($_GET['t']) ? $_GET['t'] : '2500';

//$udate0 = isset($_GET['date']) ? $_GET['date'] : $todaysdate ;
//$utime0 = isset($_GET['time']) ? $_GET['time'] : '2600';

$uname0 = isset($_GET['name']) ? $_GET['name'] : 'Creator';
$acct0  = isset($_GET['acct']) ? $_GET['acct'] : '12345354911';
$msg0=0;
$msg0   = isset($_GET['msg']) ? $_GET['msg'] : 'nil';


$prgname="recpost1db.php";
$happy1.="s";
$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$password1 = "Egw2B4f*q@z_$";
$dbname = "u151710353_algotrades";
$tblname ="trades";

$timeNYC =  date("Y-m-d\TH:i:s");

// ******************************************************************** INITAL VARS





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

// ********************************************************************  
//
// ********************************************************************   END OF Functions
//
// ********************************************************************  

/*
echo '<b>This text will be bold.</b>';
echo '<strong>This text will also be bold.</strong>';
// Example usage
$string = "abcdefgh";
$position = 3;
$result = RemoveRightCharacter($string, $position);
echo $result; // Output: abcdefh (removed character 'g' at position 3 from the right)

// Example usage
$string = "hello world";
$charToDetect = "o";
$position = 4;
$result = DetectCharacter($string, $charToDetect, $position);
echo $result ? "Character found at position $position" : "Character not found at position $position";

// Example usage
$string = "abcdefgh";
$stringToInsert = "123";
$position = 4;
$result = LeftInsertString($string, $stringToInsert, $position);
echo $result; // Output: abcd123efgh

*/
//
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
//
//
$FincialDisclaimerStr= "Financial Disclaimer: Not Financial Advice. This content and any and all trade and investment information, positions, entry and exit points, buy or sell signals, fundamental or technical information is not financial advice and is for information and educational purposes only. Seek a licensed professional investment advisor to handle your investments and trades. Any algos or algorithms presented herein are for informational purposes only. Algo Investor, Algoz, OptionsHunter, Roi, APM and WatchDog SaaS Programs Copyright (c) by Algo Investor Inc.  All Rights Reserved.<br /><br />Algo Investor Inc. <br />6543 S. Las Vegas Blvd<br />Las Vegas, NV 89119";

$pstr8= "<br />  $prgname   $vers is running, Time in NYC =   $timeNYC  ... <br />";
echoColor($pstr8,"red");

echo "<br /><br />";

// echo "*****************<br /><br />";

// echo "<br />] **** Greetings, Creator. We are currently running:   $prgname  : $servername :  $username / $password1 | $dbname : $tblname  ...  ********<br />";
$pstr00= "] **** Greetings, Creator. We are currently running:   $prgname  : $servername :  $username / $password1 | $dbname : $tblname  ...  ********<br />";
echoColor( $pstr00, "red" );
echoColor( $pstr00, "orange" );
echoColor( $pstr00, "yellow" );
echoColor( $pstr00, "green" );
echoColor( $pstr00, "blue" );
echoColor( $pstr00, "purple" );
echoColor( $pstr00, "black" );
echoColor( $pstr00, "gray" ); 


//echo "*****************\n";

//echo "\n*\n] Accessing https://algoinvestorr.com/*_". $dbname. "[". $username"]_". $tblname. "\n*\n*\n*\n";
echo "*****************<br />";

PrintUserInputs( $udate0, $utime0, $uname0, $acct0 , $msg0 );

// echo "<br />******** ATTEMPTING DB ACCESS HERE in $prgname *********<br />";


//$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");

// $con = mysqli_connect( $servername,  $username,           $happy1,      $dbname);
// if (!$con) die('Could not connect: ' . mysqli_error($con));
// mysqli_select_db($con, $username ) or die ("DB select failed - " . mysqli_error($con));

// w3schools mysqli

// $servername = "localhost";
// $username = "username";
// $password = "password";

// // Create connection
// $conn = new mysqli($servername, $username, $password);

// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully";


// echo "<br />******** GOT PAST DB CONNECT OK ! *********<br />";


// exit("\n] ".  $prgname. ": Script execution terminated.\n\n");


$timeNYC =  date("Y-m-d\TH:i:s");
$happy1.= GetEntryNums();

// $insertdb = 0;
// // SHOW CREATE TABLE table_name;
// try {
//     // Connect to MySQL using PDO
//     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);

//     // Set PDO to throw exceptions for errors
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//   if($insertdb!=0){
//     // Insert a sample trade into the 'trades' table
//     $insertQuery = "INSERT INTO trades (tradeDTstamp, tradeDateTime, userId, accountId,   tradeType, tradeSize, tradePrice) 
//                     VALUES (CURRENT_TIMESTAMP ,'$timeNYC',       'superuser', 'testaccount', 'sell', 100, 50.25)";
//     $conn->exec($insertQuery);
//     $lastInsertedId = $conn->lastInsertId();

//     echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";
//   }

//     // Query the table for a specific tradeId
//     $tradeIdToQuery = 1; // Replace with the desired tradeId to query
//     $query = "SELECT * FROM trades WHERE tradeId = :tradeId";
//     $stmt = $conn->prepare($query);
//     $stmt->bindParam(':tradeId', $tradeIdToQuery);
//     $stmt->execute();
//     $result = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($result) {
//         echo "Trade found for tradeId $tradeIdToQuery: <pre>" . print_r($result, true) . "</pre>";
//     } else {
//         echo "No trade found for tradeId $tradeIdToQuery";
//     }
// } catch (PDOException $e) {
//     echo "Connection failed: " . $e->getMessage();
// }

// // Close the PDO connection
// $conn = null;


///// *************************************************************************************************
///// *************************************************************************************************


// SET Default data to test / read in txt file from this date:
$tradedatestr = "2023-12-20";

$datestr = $udate0 ; // User date string chk

$tof9=false;
$tof9=CheckDate0($datestr);

if($tof9==true) $tradedatestr=$datestr;  

// turned this into a fn
// $dateck = DateTime::createFromFormat('Y-m-d', $datestr);
// //if( strlen($udate0==10) )  $tradedatestr = $udate0 ;
// if ($dateck !== false && $dateck->format('Y-m-d') === $datestr) {
//     echo "<br /> ] Valid date in 'YYYY-MM-DD' format: $datestr , strlen()==". strlen($datestr);
//     $tradedatestr=$datestr;  // override date to read/write

// } else {
//     echo "<br /> ] Invalid date or not in 'YYYY-MM-DD' format: $datestr";

// }








$fname = "intradaytradesServer_". $tradedatestr. ".txt"; // Replace with your file name

$pstr= "<br />] After date verify.  <br /><br />] Attempting file read of: ". $fname. "<br />";
echoColor( $pstr, "orange");

//$fname = "intradaytradesServer_2023-12-20.txt"; // Replace with your file name
// Array to store strings
$arrstrs = array();
$i=0;
$j=0;
$fexist=0;
   
//$fname = 'path/to/your/file.txt'; // Replace this with the path to your file

if (file_exists($fname)) {
    echo '<p style="color: green;">The file '. $fname. ' exists.</p>';
    $fexist=1;
} else {
  //echo '<p style="color: red;">This text will be displayed in red.</p>';

    echo '<p style="color: red;">The file '. $fname. ' does not exist.  Use the ?d=YYYY-MM-DD parameter.</p>';
    exit();
}

// set flag for dates MUST BE identical
$tof=false;
$badlines=0;
if($fexist==1){
    // Read the file line by line
    if (($handle = fopen($fname, "r")) !== false) {
        while (($data = fgetcsv($handle, 0, ",")) !== false) {
            if($msg0=="1")  echo "<br /> data[0]=====>>". $data[0]. "<<=====<br />";
            
            $tof=false;
            if( $data[0] == $tradedatestr) $tof=true;
              else{
                $badlines++;
                $pstr88a=" ...  <br />";
                if( strlen($data[0])==10  ) $pstr88a =" $data[0] $data[1] $data[2] $data[3]  ...  <br />";
                    else if( strlen($data[0])<3  ) $pstr88a=" 0-length uDate found.   <br />";
                $pstr88="<br />* ] $i )   DATE: ". $data[0]. " != NOT EQUAL TO RawTradeDate: ". $tradedatestr. " ... Skipping Append on Older-dated RawTrade ". $pstr88a; 
                if($msg0=="1")  echoColor($pstr88, "blue");
              }//else

            // Check each line against $arrstrs before appending
            $line = implode(",", $data); // Convert line array to a string
            $linelen= strlen($line);
       //     echo "<br /><br /> ] $i  :  $line  ,  LINE LEN== $linelen  <br />";
            $numcsv = NumCSVs($line)  ;
            $h0= HashIt($line);
            $line = $line.",". $h0;

            if($msg0=="1") echo "<br /><br /> ] $i  : "; 
            $pstr0= " $line  ,  LINE LEN== $linelen  <br />";
            if($msg0=="1")  echoColor($pstr0,"blue");
            // Check if the line exists in $arrstrs
            if (!in_array($line, $arrstrs) &&  ( $linelen > $minstrlen ) && $tof==true ) {
                if($msg0=="1")  echo " [ Appended into array] ". "__Orig(re-hash)_numCSVs==". $numcsv. "  "; //. $h0;     

                $arrstrs[] = $line ; // Append the line to $arrstrs if it doesn't exist
                $j++;
            }else if($msg0=="1")  echo " [ NOT Inserted into array ]  <#noHash#>";

            $i++;

        }
        fclose($handle);
    }//if

}//if fexist==1


$arrname = "arrstrs";
// $arrstrs[] should have only unique RAW trades at this point...
if($msg0==1) PrintArray( $arrstrs , $arrname );
 
 


$ftimeout0 = GetDBSafe_NYCTimeNOW(0);   
$ftimeout = GetDBSafe_NYCTimeNOW(1);   
$fnameout = $dirPrefix. "rawtrades_". $tradedatestr . "_recv_". $ftimeout. ".txt";     //$fnameout = "rawtrades_". $tradedatestr. ".txt";  

$pstr= "<br /><br /><br />] FOUND $j unique RAW trades ( generated on $tradedatestr ), and inserted them into ". $arrname. "[] writing to $fnameout  at $ftimeout0 ... <br />";
$pstrRej="<br />] FOUND $badlines BAD 'csv-lines' and ignored them. <br />";
echoColor( $pstr, "blue");
echoColor( $pstrRej, "red");


//$arrstrs = array(/* your array content here */); // Replace this with your array

// Open the file for writing
$fileout = fopen($fnameout, "w");

// Write each element of the array to the file
if ($fileout) {
    foreach ($arrstrs as $line0) {
        fwrite($fileout, $line0 . PHP_EOL); // Write each line and add a newline
    }
    fclose($fileout);

    $pstr= "<br />Array content written to $fnameout successfully.<br /><br /><br />";
    $pstr = BoldString($pstr);
    echoColor( $pstr, "green");
} else {
    $pstr= "<br />Unable to open file!<br />";
    echoColor( $pstr, "red");
    exit();
}







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////   code moved...////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// //
// //
// // Loop through $arrstrs and separate CSV elements into $csvelems
// //

// $csvelems = [];
// $c=0;

//         foreach ($arrstrs as $string) {
//             if($msg0=="1") echo "<br /><br /> ] arrstrs[ $c ]=". $string;

//         // Explode the CSV string into an array using str_getcsv()
//             $csvelems = str_getcsv($string);
//             echo "<br />"; 
//             $elements = [];

//             foreach ($csvelems as $element) {
//               // echo $element . "<br />"; 
//               $elements[]=$element;
//             }

//             //echo $elements[ 0 ]. " ".  $elements[ 1 ]. " ".  $elements[ 2 ]. " ". $elements[ 5 ]. " ".  $elements[ 3 ]. " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".  $elements[ 9 ]. " DAY ".  "<br />"; 
            
//             // ] arrstrs[ 0 ]= 
//             // [ 0..10 ]     2023-12-21,945,thu,15min,1.1383%,    BUY, 100,AMZN,atLimit,152.28,Pday,
//             // [ 11..21 ]       buysigcnt,8, [13]R3R2R1_P_P3_S1S2S3=, 159.70,157.16,[16]154.61, 153.09,152.08,  [19]150.54, 149.02, [21]146.47, 
//             //  ...               [22]p-S1=,1.73,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,154.90,152.30,145.37,141.04,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,70ac488fa3488b4669d178ad1011265f69378daa0244605f2fcc890c912a0dd3

//             $buySellstr = $elements[ 5 ];   // BUY or SELL ?

//             $buySellSigCnt=$elements[ 12 ];
//             $buySellSigCnt0 = intval($buySellSigCnt);

//             $buySellSigCount=$elements[ 11 ];
//             if($buySellstr=="BUY"){
//               $buySellSigCount=RaiseCharacter($buySellSigCount,0);
//               $buySellSigCount=RaiseCharacter($buySellSigCount,3);
//               $buySellSigCount=RaiseCharacter($buySellSigCount,6);
//             }else if($buySellstr=="SELL"){
//               $buySellSigCount=RaiseCharacter($buySellSigCount,0);
//               $buySellSigCount=RaiseCharacter($buySellSigCount,4);
//               $buySellSigCount=RaiseCharacter($buySellSigCount,7);
//             }

//             $dayofwk = $elements[ 2 ];
//             $dayofwk=RaiseCharacter($dayofwk,0);


//             $aboveBelowStr="aboveOrBelow ";
//             $aboveBelowAmtStr =$elements[ 23 ];
//             $ampmStr="am";

//             $SRstr="Daily ";
//             $S1str="Support(S1)";
//             $R1str="Resistance(R1)";
//             $S1numstr =  $elements[ 19 ];
//             $R1numstr =  $elements[ 16 ];
//             $SuppResisStr ="suppOrResist=nil";

//             $col007="black";
//             //$buySellstr = $elements[ 5 ];
//             if($buySellstr=="BUY"){
//                $SRstr.=  $S1str;   //if buy, x % near S1 else R1
//                $SuppResisStr= $S1numstr ;
//                $col007="green";
//             } else{
//                 $SRstr.=  $R1str; 
//                 $SuppResisStr= $R1numstr;
//                 $col007="red";
//             }

//             $t0str = $elements[ 1 ];      // ie 945, 1115 am
//             $intValue = intval($t0str);
//             if($intValue>=1200) $ampmStr="pm";
//             $timeofday = $elements[1];
//             $timeofday=RightInsertString($timeofday, ":", 2);

//             $pctNearS1R1 = $elements[4];
//             if(DetectCharacter($pctNearS1R1, "-", 0)==true) $aboveBelowStr="Below";
//               else $aboveBelowStr="Above";
//             //$pctNearS1R1=RemoveRightCharacter($pctNearS1R1,0);  // remove % "1.23%" ==> "1.23"

//             $pstr= "AlgoGeneratedRawTrade". "[ $c ]: ";   //"<br />";
//             $hastr=$elements[ 42 ];
//             $hastr="[ ".$hastr." ]";

//             $date0str = $elements[ 0 ];
//             $date1str=  ReadableDate($datestr,"nil"); 

//             $humanReadableTradeStr = $date0str." ".  $dayofwk. " ". $date1str." ". $timeofday. $ampmStr.  "  ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".$CurrencyStr  .  $elements[ 9 ]. " duration DAY (off a ". $elements[ 3 ]. " chart with a ". $buySellSigCount. " of ". $elements[ 12 ]. ") ".  $pctNearS1R1. " or ". $CurrencyStr. $aboveBelowAmtStr." ". $aboveBelowStr. " ".  $SRstr ." of ".$CurrencyStr  . $SuppResisStr ; 
            
//             $trstr= "        --------->     ". $humanReadableTradeStr."<br />";

//             // reassign EOL to human readable str for mysql insertion
//             $eolstr=$elements[ 41 ];
//          // echoColor($eolstr."[41]", "gray");
//             $elements[ 41 ]=$humanReadableTradeStr ;
//             $eolstr=$elements[ 41 ];
//           //echoColor($eolstr, "blue");

//             echoColor($pstr.$hastr, "purple");
//             //if($buySellSigCnt0>7) $trstr = BoldString($trstr);            // NEEDs better filtering of above/below R1,S1 etc
//             echoColor($trstr, $col007);

//             if($msg0=="1") print_r($elements);
//             $c++;

//         }//foreach($arrstrs

// $maxTradesToInsert=$c;
// $pstr9="End of $c Algo Trades at " .date("Y-m-d\TH:i:s"). "NYC Time.<br /><br /><br />";
// echoColor($pstr9,"blue");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 






/*

AlgoGeneratedRawTrade[ 24 ]: [ c019234a0065376bdee4a3b45b4c5aa91ef400e339f98f54fb6360d89df0adf7 ]

---------> 2023-12-21 Thu December 21st 12:30pm SELL NVDA atLimit $487.66 duration DAY (off a 15min chart with a SellSigCnt of 4) -1.2454% or $-6.07 Below Daily Resistance(R1) of $493.73


AlgoGeneratedRawTrade[ 25 ]: [ 6abcc6cff6e497b6e7240c963f644b79289bf9d5ffc7f8eb53d36311a71d81ce ]

---------> 2023-12-21 Thu December 21st 13:30pm BUY SPY atLimit $469.74 duration DAY (off a 15min chart with a BuySigCnt of 5) 0.9580% or $4.50 Above Daily Support(S1) of $465.24



from 2023-12-27

[35] => 2023-12-27,1300,wed,15min,-2.9118%,SELL,100,ALB,atLimit,149.66,P3day,sellsigcnt,5,R3R2R1_P_P3_S1S2S3=,157.07,155.54,154.02,151.56,146.63,150.04,147.58,146.06,p3-R1=,-4.36,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,160.27,155.23,143.46,136.73,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,7475bf6f706cb7a0cd92840c7d0dbe8de9579f39ec04db3ded7b470617e25d51 

[36] => 2023-12-27,1315,wed,15min,-2.3832%,SELL,100,ROKU,atLimit,94.22,P3day,sellsigcnt,4,R3R2R1_P_P3_S1S2S3=,99.63,98.05,96.47,93.82,91.35,92.24,89.59,88.01,p3-R1=,-2.25,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,99.84,95.58,87.89,84.46,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,afa7e92597ddfd8bee34378261f71beee36f8d26deb92f2def4ab7322fc53000 

    
FIRST. check HASH:

SELECT * FROM `trades` WHERE tradeHash='7475bf6f706cb7a0cd92840c7d0dbe8de9579f39ec04db3ded7b470617e25d51';


THEN INSERT: 

INSERT INTO `trades` (`tradeId`, `tradeRecTimestamp`, `tradeDateTime`, `tradeDate`, `tradeTime`, `tradeDay`, `tradeBar`, `userId`, `accountId`, `tradeType`, `symbol`, `tradeRAW`, `tradeRawId`, `tradeSize`, `tradePrice`, `tradePrFilled`, `tradeCond`, `tradeDur`, `tradeStopMkt`, `tradeLimitExit`, `optionStrategy`, `leg1`, `leg2`, `leg3`, `leg4`, `buySellCnt`, `buySellPct`, `buySellDist`, `tradeSpec`, `tradeSig`, `tradeGapPct`, `tradeStatus`, `tradeAux1`, `tradeAux2`, `tradeHash`) VALUES (NULL, current_timestamp(), '2023-12-27', '2023-12-27T130000', '1300', 'wed', '15min', 'creator', '12345354', 'SELL', 'ALB', 'YES', '0', '100', '149.66', '0.0', 'atLimit', 'Day', '0.0', '0.0', 'noOptions', '0.0', '0.0', '0.0', '0.0', '5', '-2.9118%', '-4.36', 'nil', 'sell', '0.0', 'cued', 'nil', 'nil', '7475bf6f706cb7a0cd92840c7d0dbe8de9579f39ec04db3ded7b470617e25d51');

*/


$pstr9= "<br />******** ATTEMPTING DB ACCESS HERE in $prgname *********<br />";
echoColor($pstr9,"orange");

$pstr9= "<br />******** WILL ATTEMPT to LOOP and INSERT( )to MySQL DB <br />";
echoColor($pstr9,"blue");


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

//  ############  OLDr    
                  // if($insertdb!=0){
                  //   // Insert a sample trade into the 'trades' table
                  //   $insertQuery = "INSERT INTO trades (tradeDTstamp, tradeDateTime, userId, accountId,   tradeType, tradeSize, tradePrice) 
                  //                   VALUES (CURRENT_TIMESTAMP ,'$timeNYC',       'superuser', 'testaccount', 'sell', 100, 50.25)";
                  //   $conn->exec($insertQuery);
                  //   $lastInsertedId = $conn->lastInsertId();

                  //   echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";
                  // }

                // Query the table for a specific tradeId
                // $tradeIdToQuery = 1; // Replace with the desired tradeId to query
                // $query = "SELECT * FROM trades WHERE tradeId = :tradeId";
                // $stmt = $conn->prepare($query);
                // $stmt->bindParam(':tradeId', $tradeIdToQuery);
                // $stmt->execute();
                // $result = $stmt->fetch(PDO::FETCH_ASSOC);
                


// ######################################################### Start LOOP HERE
// ######################################################### Start LOOP HERE
// ######################################################### Start LOOP HERE


// $csvelems = [];
// $c=0;

        foreach ($arrstrs as $string) {
                if($msg0=="1") echo "<br /><br /> ] arrstrs[ $c ]=". $string;

            // Explode the CSV string into an array using str_getcsv()
                $csvelems = str_getcsv($string);
                echo "<br />"; 
                $elements = [];

                foreach ($csvelems as $element) {
                  // echo $element . "<br />"; 
                  $elements[]=$element;
                }

                //echo $elements[ 0 ]. " ".  $elements[ 1 ]. " ".  $elements[ 2 ]. " ". $elements[ 5 ]. " ".  $elements[ 3 ]. " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".  $elements[ 9 ]. " DAY ".  "<br />"; 
                
                // ] arrstrs[ 0 ]= 
                // [ 0..10 ]     2023-12-21,945,thu,15min,1.1383%,    BUY, 100,AMZN,atLimit,152.28,Pday,
                // [ 11..21 ]       buysigcnt,8, [13]R3R2R1_P_P3_S1S2S3=, 159.70,157.16,[16]154.61, 153.09,152.08,  [19]150.54, 149.02, [21]146.47, 
                //  ...               [22]p-S1=,1.73,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,154.90,152.30,145.37,141.04,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,70ac488fa3488b4669d178ad1011265f69378daa0244605f2fcc890c912a0dd3

                $buySellstr = $elements[ 5 ];   // BUY or SELL ?

                $buySellSigCnt=$elements[ 12 ];
                $buySellSigCnt0 = intval($buySellSigCnt);

                $buySellSigCount=$elements[ 11 ];
                if($buySellstr=="BUY"){
                  $buySellSigCount=RaiseCharacter($buySellSigCount,0);
                  $buySellSigCount=RaiseCharacter($buySellSigCount,3);
                  $buySellSigCount=RaiseCharacter($buySellSigCount,6);
                }else if($buySellstr=="SELL"){
                  $buySellSigCount=RaiseCharacter($buySellSigCount,0);
                  $buySellSigCount=RaiseCharacter($buySellSigCount,4);
                  $buySellSigCount=RaiseCharacter($buySellSigCount,7);
                }

                $dayofwk = $elements[ 2 ];
                $dayofwk0 = $elements[ 2 ];
                $dayofwk=RaiseCharacter($dayofwk,0);


                $aboveBelowStr="aboveOrBelow ";
                $aboveBelowAmtStr =$elements[ 23 ];
                $ampmStr="am";

                $SRstr="Daily ";
                $S1str="Support(S1)";
                $R1str="Resistance(R1)";
                $S1numstr =  $elements[ 19 ];
                $R1numstr =  $elements[ 16 ];
                $SuppResisStr ="suppOrResist=nil";

                $col007="black";
                //$buySellstr = $elements[ 5 ];
                if($buySellstr=="BUY"){
                   $SRstr.=  $S1str;   //if buy, x % near S1 else R1
                   $SuppResisStr= $S1numstr ;
                   $col007="green";
                } else{
                    $SRstr.=  $R1str; 
                    $SuppResisStr= $R1numstr;
                    $col007="red";
                }

                $t0str = $elements[ 1 ];      // ie 945, 1115 am
                $intValue = intval($t0str);
                if($intValue>=1200) $ampmStr="pm";
                $timeofday = $elements[1];
                $timeofday=RightInsertString($timeofday, ":", 2);

                $pctNearS1R1 = $elements[4];
                if(DetectCharacter($pctNearS1R1, "-", 0)==true) $aboveBelowStr="Below";
                  else $aboveBelowStr="Above";
                //$pctNearS1R1=RemoveRightCharacter($pctNearS1R1,0);  // remove % "1.23%" ==> "1.23"

                $pstr= "AlgoGeneratedRawTrade". "[ $c ]: ";   //"<br />";
                $hastr=$elements[ 42 ];
                $hastr0=$elements[ 42 ];
                $hastr="[ ".$hastr." ]";

                $date0str = $elements[ 0 ];
                $date1str=  ReadableDate($datestr,"nil"); 

                 // $humanReadableTradeShortStr = $dayofwk. " ". $date1str." ". $timeofday.  "  ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".$CurrencyStr  .  $elements[ 9 ]. "<br/>";
                
                $humanReadableTradeStr = $date0str." ".  $dayofwk. " ". $date1str." ". $timeofday. $ampmStr.  "  ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".$CurrencyStr  .  $elements[ 9 ]. " duration DAY (off a ". $elements[ 3 ]. " chart with a ". $buySellSigCount. " of ". $elements[ 12 ]. ") ".  $pctNearS1R1. " or ". $CurrencyStr. $aboveBelowAmtStr." ". $aboveBelowStr. " ".  $SRstr ." of ".$CurrencyStr  . $SuppResisStr ; 
                
                $trstr= "        --------->     ". $humanReadableTradeStr."<br />";

                // reassign EOL to human readable str for mysql insertion
                $eolstr=$elements[ 41 ];
                $elements[ 41 ]=$humanReadableTradeStr ;
                $eolstr=$elements[ 41 ];
                //             echoColor($pstr.$hastr, "purple");
                //             //if($buySellSigCnt0>7) $trstr = BoldString($trstr);            // NEEDs better filtering of above/below R1,S1 etc
                //             echoColor($trstr, $col007);
                //             if($msg0=="1") print_r($elements);
                //             $c++;
                //         }//foreach($arrstrs
                // $maxTradesToInsert=$c;
                // $pstr9="End of $c Algo Trades at " .date("Y-m-d\TH:i:s"). "NYC Time.<br /><br /><br />";
                // echoColor($pstr9,"blue");



                $tradeHashToQuery = $hastr0 ;

                $query = "SELECT * FROM trades WHERE tradeHash = :tradeHash";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':tradeHash', $tradeHashToQuery);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
              

                $insertdb=0;
                if ($result) {
                    $insertdb=0;
                    echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
                } else {
                    $insertdb=1;
                    echo "<br />] NO RawTrade found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
                }



                if($insertdb==1){

                       // ORIGINal
                       // $insertQuery0 = "INSERT INTO trades (tradeId, tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES (NULL, current_timestamp(), '2023-12-27', '2023-12-27T130000', '1300', 'wed', '15min', 'creator', '12345354', 'SELL', 'ALB', 'YES', '0', '100', '149.66', '0.0', 'atLimit', 'Day', '0.0', '0.0', 'noOptions', '0.0', '0.0', '0.0', '0.0', '5', '-2.9118%', '-4.36', 'nil', 'sell', '0.0', 'cued', 'nil', 'nil', '7475bf6f706cb7a0cd92840c7d0dbe8de9579f39ec04db3ded7b470617e25d51')";

                        // ] arrstrs[ 0 ]= 
                        // [ 0..10 ]     2023-12-21,945,thu,15min,1.1383%,    BUY, 100,AMZN,atLimit,152.28,Pday,
                        // [ 11..21 ]       buysigcnt,8, [13]R3R2R1_P_P3_S1S2S3=, 159.70,157.16,[16]154.61, 153.09,152.08,  [19]150.54, 149.02, [21]146.47, 
                        //  ...               [22]p-S1=,1.73,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,154.90,152.30,145.37,141.04,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,70ac488fa3488b4669d178ad1011265f69378daa0244605f2fcc890c912a0dd3


                        $tradeprice =   floatval( $elements[ 9 ] );         // 493.26 ;
                        $leg1 =  FloorIt( $tradeprice  *  1.20 , 5);        // Call Credit spread buy
                        $leg2 =  FloorIt( $tradeprice  *  1.15 , 5);        // Call Credit spread sell
                        $leg3 =  FloorIt( $tradeprice  *  0.85 , 5);        //  Put Credit spread sell
                        $leg4 =  FloorIt( $tradeprice  *  0.80 , 5);        //  Put Credit spread buy


                        $tradeDate0 =     $date0str ;    //$elements[ 0 ];    //'2023-12-27';
                        $tradeTime0 =     $t0str;            //'930';
                        if(strlen($tradeTime0)==3) $tradeTime0= "0". $tradeTime0;   // 945==>0945
                        $tradeDateTime0 =  $tradeDate0. "T". $tradeTime0. "00";     //'2023-12-27 T 0945 00'  ==> '2023-12-27T094500';  

                        $tradeDay   =     $dayofwk0;          //'wed';
                        $tradeBar   =     $elements[ 3 ];    // '15min';
                        $userId     =      $uname0;
                        $acctId     =      $acct0 ;

                        $tradeType  =      $buySellstr;         //"SELL";
                        $tradeSize  =      intval(  $elements[ 6 ] );     //100;

                        $buySellCnt =      $buySellSigCnt0;      // 7;
                        $buySellPctStr =   $pctNearS1R1;        // '-2.1923%';
                        $buySellDist =     floatval($elements[ 23 ] );   // -4.36;

                        $humanTrade =      $humanReadableTradeStr; //'nilHumanReadableTrade';
                        $symbol     =       $elements[ 7 ];   //'NVDA';
                        $opStrat    =       'IronCondor1.15';
                        $rawstr     =       'raw'. $c ;
                        $tradeCond  =        $elements[ 8 ] ;       //atLimit
                        $tradeStop  =         $tradeprice * 0.60;
                        $tradeLimit =        $tradeprice * 2.50;

                        $insertQuery0 = "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat', '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0, 'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";

                                           
                            // ] insertQuery0 = INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '2023-12-27T093000', '2023-12-27', '0930', 'wed', '15min', 'Creator', '12345354911', 'SELL', 'NVDA', 'raw', 0, '100', '493.26', 0.0, 'atLimit', 'day', 0.0, 0.0, 'IronCondor', '590', '565', '415', '390', '7', '-2.1923%', '-4.36', 'nil', 'sell', 0.0, 'cued', 'nilHumanReadableTrade', '2023-12-28T06:48:26', '5bf6f706cb7a0cd92840c7d0dbe9118de9579f39ec04db3ded7b470617e25d51' )


                        $conn->exec($insertQuery0);
                        $lastInsertedId = $conn->lastInsertId();
                        $inserted0++;


                        // $emailMes sageStr.= "<br /><br />]  [". $lastInsertedId.  "]  ". $humanReadableTradeStr. "  [ $leg1 | $leg2  :  $leg3 | $leg4 ] ";
                        //$emailMessageStr.= "  ". $humanReadableTradeShortStr; //. "  [ $leg1 | $leg2  :  $leg3 | $leg4 ] ";

                        // $humanReadableTradeShortStr .= $dayofwk. " ". $date1str." ". $timeofday.  "  ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".$CurrencyStr  .  $elements[ 9 ].  "with a ". $buySellSigCount. " of ". $elements[ 12 ]. ") ".  $pctNearS1R1. " or ". $CurrencyStr. $aboveBelowAmtStr." ". $aboveBelowStr. " ".  $SRstr ." of ".$CurrencyStr  . $SuppResisStr. "<br />";
                        
                        $humanReadableTradeShortStr.= $tradeType." ".$symbol. " at ". $tradeprice. " ";
                        // $humanReadableTradeShortStr.= " ".$dayofwk. " ". $date1str." ". $timeofday.  "  ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ". $CurrencyStr.  $elements[ 9 ] . "<br />";
               

                        $pstr2= "<br />] Sample trade inserted. Last inserted ID: $lastInsertedId ";
                        echoColor($pstr2,"green");
                        $pstr3= "<br />]  insertQuery0 = $insertQuery0 ";
                        echoColor($pstr3,"purple");

                }//if insertdb==1


                echoColor($pstr.$hastr, "purple");
                //if($buySellSigCnt0>7) $trstr = BoldString($trstr);            // NEEDs better filtering of above/below R1,S1 etc
                echoColor($trstr, $col007);

                if($msg0=="1") print_r($elements);
                $c++;

            }//foreach($arrstrs



            $maxTradesToInsert=$c;
            $pstr99="<br />End of Algo Trades; INSERTED $inserted0 out of $c RawTrades found at " .date("Y-m-d\TH:i:s"). "NYC Time.<br /><br /><br />". $humanReadableTradeShortStr." ";  
            echoColor($pstr99,"blue");








} catch (PDOException $e) {
    echo "<br />] Connection failed: " . $e->getMessage();
}

// Close the PDO connection
$conn = null;



$pstr9= "<br />******** CLOSING DB ACCESS HERE in $prgname *********<br />";
echoColor($pstr9,"red");



$emailSubjectStr        = $uname0. ", ". $inserted0. " Trade Alerts at ". $timeNYC. " New York Time"; 


// Email alert to Client

$receiverEmail  = "roguequant1@gmail.com";
$senderEmail    = "algoinvestorr@gmail.com";
$subject0       =  $emailSubjectStr ;
// $message0       =  $emailMessageStr. " <br /><br /><br />] ". $pstr99. " <br /><br /><br /><br /><br /><br /> ". $FincialDisclaimerStr  ;                    
$message0       =   "   ". $pstr99. "   ". $FincialDisclaimerStr  ;                    
// $message0       =  $emailMessageStr. "   ". $pstr99. "   ". $FincialDisclaimerStr  ;                    
// $message0       =    "   ". $pstr99. "   ". $FincialDisclaimerStr  ;                    


// if($inserted0>0){

        $errorString = SendEmailTo($receiverEmail, $senderEmail, $subject0, $message0 );
        echo "<br/><br/> Email SystemReturnedMessage: ". $errorString. "<br/><br/>";  

        echo "<br/> To: $receiverEmail , From: $senderEmail";
        echo "<br/> Time: $timeNYC";

        echo "<br/> Email Subject: ". $subject0;  
        echo "<br/> Email Body: ". $message0;  


// }


/*

To: roguequant1@gmail.com , From: algoinvestorr@gmail.com
Time: 2023-12-29T08:44:36
Email Subject: Rogue, 5 Trade Alerts at 2023-12-29T08:44:36 New York Time
Email Body:

] [245] :2023-12-28 Thu December 28th 10:30am SELL ROKU atLimit $94.17 duration DAY (off a 15min chart with a SellSigCnt of 9) -1.9221% or $-1.81 Below Daily Resistance(R1) of $95.98 [ 110 / 105 : 80 / 75 ]

] [246] :2023-12-28 Thu December 28th 11:00am BUY INTC atLimit $50.50 duration DAY (off a 15min chart with a BuySigCnt of 4) 0.5479% or $0.28 Above Daily Support(S1) of $50.22 [ 60 / 55 : 40 / 40 ]

] [247] :2023-12-28 Thu December 28th 11:45am SELL GS atLimit $386.59 duration DAY (off a 15min chart with a SellSigCnt of 8) -0.0445% or $-0.17 Below Daily Resistance(R1) of $386.76 [ 460 / 440 : 325 / 305 ]

] [248] :2023-12-28 Thu December 28th 14:00pm BUY ROKU atLimit $93.91 duration DAY (off a 15min chart with a BuySigCnt of 6) 1.4517% or $1.36 Above Daily Support(S1) of $92.55 [ 110 / 105 : 75 / 75 ]

] [249] :2023-12-28 Thu December 28th 16:00pm BUY NVDA atLimit $496.43 duration DAY (off a 15min chart with a BuySigCnt of 10) 1.0723% or $5.32 Above Daily Support(S1) of $491.11 [ 595 / 570 : 420 / 395 ]


]
******** CLOSING DB ACCESS HERE in recpost1db.php *********

*/







/*

//
// email Prompt:
// write  a php function SendEmailTo( $receiverEmail, $senderEmail, $subject, $msg)  which takes  4 strings as arguments:   $receiverEmail the email of the recipient,  $senderEmail the email of the sender,  $subject the string which appears in the Subject Line of the email and  $msg the  string containing  the message for the body of the email , and sends this email, returning $errStr a string containing any system messages or errors after sending the email.


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

// Example usage
$receiverEmail = "receiver@example.com";
$senderEmail = "sender@example.com";
$subject = "Test Email";
$message = "This is a test email message.";

$errorString = SendEmailTo($receiverEmail, $senderEmail, $subject, $message);
echo $errorString; // Outputs success or error message














*/


/*

******** ATTEMPTING DB ACCESS HERE in recpost1db.php *********


******** WILL ATTEMPT to LOOP and INSERT( )to MySQL DB


] NO RawTrade found for tradeHash 5bf6f706cb7a0cd92840c7d0dbe9118de9579f39ec04db3ded7b470617e25d51. insertdb= 1 ; INSERTing to db.trades ...

] Sample trade inserted. Last inserted ID: 19


] insertQuery0 = INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy, leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '2023-12-27T093000', '2023-12-27', '0930', 'wed', '15min', 'Creator', '12345354911', 'SELL', 'NVDA', 'raw', 0, '100', '493.26', 0.0, 'atLimit', 'day', 0.0, 0.0, 'IronCondor', '590', '565', '415', '390', '7', '-2.1923%', '-4.36', 'nil', 'sell', 0.0, 'cued', 'nilHumanReadableTrade', '2023-12-28T06:48:26', '5bf6f706cb7a0cd92840c7d0dbe9118de9579f39ec04db3ded7b470617e25d51' )


******** CLOSING DB ACCESS HERE in recpost1db.php *********





//////////////. comm'd code

function RaiseCharacter($str, $num) {
    if ($num >= 0 && $num < strlen($str)) {
        $str[$num] = strtoupper($str[$num]);
        return $str;
    } else {
        return "Invalid position or string length exceeded";
    }
}

// Example usage
$string = "hello world";
$position = 3;
$result = RaiseCharacter($string, $position);
echo $result; // Output: helLo world








$insertdb = 1;

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($insertdb==1){
         
        $csvelems = [];
        $c=0;
        //
        // Loop through $arrstrs and separate CSV elements into $csvelems
        //
        foreach ($arrstrs as $string) {
            echo "<br /><br /> ] arrstrs[ $c ]=". $string. "<br />";

            // Explode the CSV string into an array using str_getcsv()
            $csvelems = str_getcsv($string);
            echo "<br />"; 
            $elements = [];
            foreach ($csvelems as $element) {
              // echo $element . "<br />";        // append
              $elements[]=$element;
            }

              //          2023-12-21 1000 thu                                       BUY                   15min                 ROKU                  atLimit                   90.42
            echo $elements[ 0 ]. " ".  $elements[ 1 ]. " ".  $elements[ 2 ]. " ". $elements[ 5 ]. " ".  $elements[ 3 ]. " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".  $elements[ 9 ]. " DAY ".  "<br />"; 

            print_r($elements);

            $timeNYC = GetNYDateTime();



            // Insert a sample trade into the 'trades' table
            //$insertQuery = "INSERT INTO trades (tradeDTstamp, tradeRedDateTime,  tradeDate, tradeTime,     tradeDay,          userId,     accountId,       tradeType,  tradeSize, tradePrice , tradeAux1) 
            $insertQuery = "INSERT INTO trades (tradeDTstamp, tradeDateTime, tradeTime,     tradeDay,          userId,     accountId,       tradeType,  tradeSize, tradePrice , tradeAux1) 
                            VALUES         (CURRENT_TIMESTAMP ,'$timeNYC',  '$elements[1]',  '$elements[2]',    , '$uname0',   '$acct0', '$elements[5]',  100,    '$elements[9]' , '$elements[7]' )";
            $conn->exec($insertQuery);
            $lastInsertedId = $conn->lastInsertId();

            echo "<br /> ] *** Sample trade inserted: $insertQuery <br /> ] Last inserted ID: $lastInsertedId <br />";





            // < > Query the table  HERE for a specific tradeId
          
            $c++;

          }//foreach($arrstrs
 

    }// if insert == TRUE


} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
*/

// **************************************************************************************************


/*
// sample data

arrstrs[ 7 ]=2023-12-21,1000,thu,15min,3.5795%,BUY,100,ROKU,atLimit,90.42,Pday,buysigcnt,7,R3R2R1_P_P3_S1S2S3=,99.25,95.85,92.46,90.58,95.46,87.19,85.31,81.92,p-S1=,3.24,GAP=0.0125,0.0188,89.06,90.73,wkR2R1S1S2=,113.40,104.65,91.35,86.80,moR3R2R1PS1S2S3=,123.32,116.93,110.55,102.01,95.63,87.09,80.71,EOL,0c6c5ca47e34f3774932106c19dbf67ca1ecf1e591a3ad230eae5c4db7b030c2

2023-12-21 1000 thu BUY 15min ROKU atLimit 90.42

Array ( [0] => 2023-12-21 [1] => 1000 [2] => thu [3] => 15min [4] => 3.5795% [5] => BUY [6] => 100 [7] => ROKU [8] => atLimit [9] => 90.42 [10] => Pday [11] => buysigcnt [12] => 7 [13] => R3R2R1_P_P3_S1S2S3= [14] => 99.25 [15] => 95.85 [16] => 92.46 [17] => 90.58 [18] => 95.46 [19] => 87.19 [20] => 85.31 [21] => 81.92 [22] => p-S1= [23] => 3.24 [24] => GAP=0.0125 [25] => 0.0188 [26] => 89.06 [27] => 90.73 [28] => wkR2R1S1S2= [29] => 113.40 [30] => 104.65 [31] => 91.35 [32] => 86.80 [33] => moR3R2R1PS1S2S3= [34] => 123.32 [35] => 116.93 [36] => 110.55 [37] => 102.01 [38] => 95.63 [39] => 87.09 [40] => 80.71 [41] => EOL [42] => 0c6c5ca47e34f3774932106c19dbf67ca1ecf1e591a3ad230eae5c4db7b030c2 )

*/



/*

  colors
 echo '<p style="color: red;">This text will be displayed in red.</p>';


Red: color: red;
Blue: color: blue;
Green: color: green;
Black: color: black;
White: color: white;
Yellow: color: yellow;
Purple: color: purple;
Orange: color: orange;
Gray: color: gray;

Hexadecimal: color: #FF0000; (Red)
RGB: color: rgb(255, 0, 0); (Red)








$insertdb = 0;

// SHOW CREATE TABLE table_name;
try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);

    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($insertdb!=0){



          // Insert a sample trade into the 'trades' table
          $insertQuery = "INSERT INTO trades (tradeDTstamp, tradeDateTime, userId, accountId,   tradeType, tradeSize, tradePrice) 
                          VALUES (CURRENT_TIMESTAMP ,'$timeNYC',       'superuser', 'testaccount', 'sell', 100, 50.25)";
          $conn->exec($insertQuery);
          $lastInsertedId = $conn->lastInsertId();

          echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";




    }

    // Query the table for a specific tradeId
    $tradeIdToQuery = 1; // Replace with the desired tradeId to query
    $query = "SELECT * FROM trades WHERE tradeId = :tradeId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':tradeId', $tradeIdToQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo "Trade found for tradeId $tradeIdToQuery: <pre>" . print_r($result, true) . "</pre>";
    } else {
        echo "No trade found for tradeId $tradeIdToQuery";
    }

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

*/








// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************








/*
$string = "1,apple,banana,orange";

// Explode the CSV string into an array using str_getcsv()
$csvelems = str_getcsv($string);

print_r($csvelems);

// Loop through $csvelems[] and print each element
foreach ($csvelems as $element) {
    echo $element . "\n"; // Print each element
}



*/




// Loop through $csvelems and print each element
/*
foreach ($csvelems as $elems) {
    foreach ($elems as $element) {
        echo $element . "<br />"; // Print each element
    }
    echo "-----\n"; // Separator between strings
}
*/



/*


$insertdb = 0;

// SHOW CREATE TABLE table_name;
try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);

    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if($insertdb!=0){



          // Insert a sample trade into the 'trades' table
          $insertQuery = "INSERT INTO trades (tradeDTstamp, tradeDateTime, userId, accountId,   tradeType, tradeSize, tradePrice) 
                          VALUES (CURRENT_TIMESTAMP ,'$timeNYC',       'superuser', 'testaccount', 'sell', 100, 50.25)";
          $conn->exec($insertQuery);
          $lastInsertedId = $conn->lastInsertId();

          echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";




  }

    // Query the table for a specific tradeId
    $tradeIdToQuery = 1; // Replace with the desired tradeId to query
    $query = "SELECT * FROM trades WHERE tradeId = :tradeId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':tradeId', $tradeIdToQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo "Trade found for tradeId $tradeIdToQuery: <pre>" . print_r($result, true) . "</pre>";
    } else {
        echo "No trade found for tradeId $tradeIdToQuery";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

*/









/*

 // SAMPLE DATA note: [140] not NULL but found a copy


] 131 : 2023-12-19,1500,tue,15min,1.3584%,BUY,100,HBAN,atLimit,12.76,Pday,buysigcnt,5,R3R2R1_P_P3_S1S2S3=,13.32,13.11,12.91,12.79,12.72,12.59,12.47,12.27,p-S1=,0.17,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,14.09,13.48,12.02,11.17,moR3R2R1PS1S2S3=,13.20,12.56,11.91,10.72,10.07,8.88,8.23,EOL,fd010db3cdc87032dc6dad09f72e9db66e4bc427752abfacdebedb7674100655 , LINE LEN== 277
[INSERTED] __Orig(re-hash)_numCSVs==42

] 132 : ,e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 , LINE LEN== 0
[ NOT Inserted ] <#noHash#>

] 133 : 2023-12-19,1300,tue,15min,2.0143%,BUY,100,YUM,atLimit,131.23,Pday,buysigcnt,5,R3R2R1_P_P3_S1S2S3=,133.76,132.66,131.55,129.69,130.02,128.58,126.72,125.61,p-S1=,2.64,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,135.81,132.20,124.70,120.81,moR3R2R1PS1S2S3=,134.26,131.33,128.41,126.43,123.51,121.53,118.61,EOL,883601a0f8c15e819fc5624171005204a87790b6bd4f1a4587136788bb989fcc , LINE LEN== 298
[INSERTED] __Orig(re-hash)_numCSVs==42

] 134 : 2023-12-19,1600,tue,15min,1.4486%,BUY,100,YUM,atLimit,130.47,Pday,buysigcnt,10,R3R2R1_P_P3_S1S2S3=,133.76,132.66,131.55,129.69,130.02,128.58,126.72,125.61,p-S1=,1.89,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,135.81,132.20,124.70,120.81,moR3R2R1PS1S2S3=,134.26,131.33,128.41,126.43,123.51,121.53,118.61,EOL,64db985a4948d600ab0e06a769b4c9d54298e48298337f2c8f3f2580490f4cfc , LINE LEN== 299
[INSERTED] __Orig(re-hash)_numCSVs==42

] 135 : ,e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 , LINE LEN== 0
[ NOT Inserted ] <#noHash#>

] 136 : 2023-12-19,1100,tue,15min,-0.3087%,SELL,100,AAL,atLimit,14.40,P3day,sellsigcnt,8,R3R2R1_P_P3_S1S2S3=,14.82,14.63,14.44,14.25,14.33,14.06,13.87,13.68,p3-R1=,-0.04,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,15.32,14.91,13.85,13.20,moR3R2R1PS1S2S3=,13.59,13.21,12.83,12.39,12.01,11.57,11.19,EOL,1aee5df6f24f0dd854e55856fb63b38fe70c6330f4ad0c1a4dc93e4b5f29587d , LINE LEN== 284
[INSERTED] __Orig(re-hash)_numCSVs==42

] 137 : 2023-12-19,1300,tue,15min,2.0437%,BUY,100,AAL,atLimit,14.35,Pday,buysigcnt,8,R3R2R1_P_P3_S1S2S3=,14.82,14.63,14.44,14.25,14.33,14.06,13.87,13.68,p-S1=,0.29,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,15.32,14.91,13.85,13.20,moR3R2R1PS1S2S3=,13.59,13.21,12.83,12.39,12.01,11.57,11.19,EOL,2467f9f75a1c477d36c2b9033c990ea13dd3b4d1f6c5d4d48c99a6ff592b1f7a , LINE LEN== 278
[INSERTED] __Orig(re-hash)_numCSVs==42

] 138 : 2023-12-19,1200,tue,15min,-0.6436%,SELL,100,DAL,atLimit,41.61,P3day,sellsigcnt,8,R3R2R1_P_P3_S1S2S3=,43.26,42.57,41.87,41.49,41.80,40.79,40.41,39.71,p3-R1=,-0.27,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,44.31,43.32,40.73,39.13,moR3R2R1PS1S2S3=,39.00,38.31,37.63,36.54,35.86,34.77,34.09,EOL,08f259ed7db065e9ae7397a660fc0aabd9c9969893f4f7571d85a2843936bf74 , LINE LEN== 284
[INSERTED] __Orig(re-hash)_numCSVs==42

] 139 : 2023-12-19,1300,tue,15min,1.5605%,BUY,100,DAL,atLimit,41.44,Pday,buysigcnt,4,R3R2R1_P_P3_S1S2S3=,43.26,42.57,41.87,41.49,41.80,40.79,40.41,39.71,p-S1=,0.65,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,44.31,43.32,40.73,39.13,moR3R2R1PS1S2S3=,39.00,38.31,37.63,36.54,35.86,34.77,34.09,EOL,d7b8cd60206e86d59d9b7ccf0cba09f4a7c740f5732fc4e8ee5dbbb224898973 , LINE LEN== 278
[INSERTED] __Orig(re-hash)_numCSVs==42

] 140 : 2023-12-19,1300,tue,15min,1.5605%,BUY,100,DAL,atLimit,41.44,Pday,buysigcnt,4,R3R2R1_P_P3_S1S2S3=,43.26,42.57,41.87,41.49,41.80,40.79,40.41,39.71,p-S1=,0.65,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,44.31,43.32,40.73,39.13,moR3R2R1PS1S2S3=,39.00,38.31,37.63,36.54,35.86,34.77,34.09,EOL,d7b8cd60206e86d59d9b7ccf0cba09f4a7c740f5732fc4e8ee5dbbb224898973 , LINE LEN== 278
[ NOT Inserted ] <#noHash#>

] 141 : ,e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 , LINE LEN== 0
[ NOT Inserted ] <#noHash#>


] FOUND 115 unique RAW trades, and inserted them into arrstrs[] writing to rawtrades_2023-12-21T22_14_59.txt ...
Array content written to rawtrades_2023-12-21T22_14_59.txt successfully.




*/





/* 

//............ OOP

class MyClass {
    public function myMethod() {
        // Method logic
    }
}

// Create an object of MyClass
$obj = new MyClass();
$obj->myMethod(); // Call the method

//............ OOP



//$searchQuery = $_POST["post_query"];
$searchQuery = $_POST["data"];

$filePath="";
$filePath1 = "intradaytradesServer"; 
//$todaysdate = date('Y-m-d');
$filePath.= $filePath1."_". $todaysdate. ".txt";


//$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
//	if (!$con) die('Could not connect: ' . mysqli_error($con));
//	mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));



echo "] fn= $filePath , reading searchQuery... \n";  //= $searchQuery \n";

$splitChars = ",";
//$afterAdrsee = strpbrk($searchQuery,$splitChars);
//$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd




  //
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
*/

//for($i=0;$i<$cnt;$i++){
//    if($i%50==0) echo $i. ") ". $params[$i]."\n";
//}

//echo "  userNewsignin.php:   avName = $avName,  afterAdrsee = $afterAdrsee\n";

//$password = $afterAdrsee;
/*
$params = explode (",", $afterAdrsee);
$password= $params[1];
$passwordSHA1 = sha1( $password );
$lastIP  = $params[2];


$name = $searchQuery;
// chatGPT's version...
//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//  $name = $_POST['fname'];

  //
  if (empty($name)) {
    echo "Name is empty\n";
  } else {
    echo $name. "\n\n msg rec'd OK!\n";
  }



//}



echo "\n\n] Writing/appending  searchQuery  to file: ". $filePath. "\n";

// Check if the searchQuery is set and not empty
if (isset($searchQuery) && !empty($searchQuery)) {
    // File path
   // $filePath = "todaystrades.txt";

    // Open the file in append mode
    $file = fopen($filePath, "a");

    // Append the searchQuery to the file
    fwrite($file, $searchQuery. PHP_EOL); // Appends the query and adds a new line

    // Close the file
    fclose($file);

    echo "\n] Search  searchQuery  has been successfully appended to ". $filePath." ...\n\n";
} else {
    echo "\nNo valid search query provided.";
}

*/


/*


//
//   Database connection parameters
//
//        Schema  
//
// plug this into PHP Admin
//
//
//
CREATE TABLE u151710353_algotrades.trades (
    tradeId INT AUTO_INCREMENT PRIMARY KEY,
    tradeDTstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tradeDateTime VARCHAR(32),
    userId VARCHAR(128),
    accountId VARCHAR(256),
    tradeType VARCHAR(128),
    tradeSize INT,
    tradePrice FLOAT,
    tradePrExec FLOAT,
    tradeCond VARCHAR(32),
    tradeDur VARCHAR(128),
    tradeSpec VARCHAR(512),
    tradeSig VARCHAR(512),
    tradeDistPct VARCHAR(32),
    tradeGapPct VARCHAR(32),
    tradeStatus VARCHAR(128),
    tradeAux1 VARCHAR(1024),
    tradeAux2 VARCHAR(1024),
    tradeAux3 VARCHAR(1024)
);

//**** NEW DEC 21 2023
Array
(
    [tradeId] => 1
    [tradeDTstamp] => 2023-12-21 06:33:26
    [tradeDateTime] => 2023-12-21T06:33:26
    [tradeTime] => 
    [tradeDay] => 
    [tradeBar] => 
    [userId] => superuser
    [accountId] => testaccount
    [tradeType] => buy
    [tradeRAW] => 
    [tradeSize] => 100
    [tradePrice] => 50.25
    [tradePrFilled] => 
    [tradeCond] => 
    [tradeDur] => 
    [tradeStopMkt] => 0
    [tradeLimitExit] => 0
    [optionStrategy] => 
    [leg1] => 0
    [leg2] => 0
    [leg3] => 0
    [leg4] => 0
    [buySellCnt] => 0
    [buySellPct] => 
    [tradeSpec] => 
    [tradeSig] => 
    [tradeGapPct] => 
    [tradeStatus] => 
    [tradeAux1] => 
    [tradeAux2] => 
    [tradeHash] => 
)



mysqldump -u username -p --no-data databasename > schema.sql



//

INSERT INTO `trades`(`tradeId`, `tradeDTstamp`, `tradeDateTime`, `userId`, `accountId`, `tradeType`, `tradeSize`, `tradePrice`, `tradePrExec`, `tradeCond`, `tradeDur`, `tradeSpec`, `tradeSig`, `tradeDistPct`, `tradeGapPct`, 
`tradeStatus`, `tradeAux1`, `tradeAux2`, `tradeAux3`) VALUES 
('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]',
'[value-11]','[value-12]','[value-13]','[value-14]','[value-15]','[value-16]','[value-17]','[value-18]','[value-19]')



////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************

//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

$searchQuery = $_POST["post_query"];

// DOS 05.21.15
$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
  if (!$con) die('Could not connect: ' . mysqli_error($con));
  mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));
 //echo "] Connected to MySQL-i...<br />";
// DOS 05.21.15

//echo "searchQuery = $searchQuery \n";

$splitChars = ",";

$afterAdrsee = strpbrk($searchQuery,$splitChars);
$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd

//echo "  userNewsignin.php:   avName = $avName,  afterAdrsee = $afterAdrsee\n";

//$password = $afterAdrsee;

$params = explode (",", $afterAdrsee);

$password= $params[1];
$passwordSHA1 = sha1( $password );
$lastIP  = $params[2];


$toUserName = $avName;

$toUserNamesCheck = $avName;

$toUserNamesCheck1 = strtolower($toUserNamesCheck);

//echo "      lowerCase ==$toUserNamesCheck1";

  
$query5 = "SELECT * FROM users      WHERE    userName LIKE '$toUserNamesCheck1'";

 // DOS 05.21.15
 $result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 

$j = 0;
$id=-1;
$pwd="";

    $data_sizeShoes=0;
    $sizeShoes=0;

 // DOS 05.21.15    
while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd               = $row['pwd'];
    $data_timeStamp          = $row['timeStamp'];
    
    $data_sizeShoes          = $row['sizeShoes'];
    
    if($j==0)
    {
        $id = $data_id;
        //$pwd = ",".$data_pwd;
        $pwd =  $data_pwd;
        $tStamp = $data_timeStamp;
        $sizeShoes = $data_sizeShoes;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while


//  PASSWORD MATCH !   userName: john,  id=3, pwd= ,sosinator1314==,sosinator1314

if($id>0)
{
    // for release
    //if(       ($pwd == $passwordSHA1 )  )
    if(  ($pwd == $password )    ||    ($pwd == $passwordSHA1 )  )
    {
    //      echo "  PASSWORD MATCH !   userName: $toUserNamesCheck1,  id=$id, pwd= $pwd==$password\n\n";
        echo "~OK#".$id."- ^".  $sizeShoes. ">  Enter Avattire!_$lastIP";
       // echo "~OK- Enter Avattire!_$lastIP";
        
         $updateStr = "UPDATE  users  SET lastIP = '$lastIP', timeStamp = CURRENT_TIMESTAMP  WHERE id LIKE '$id'";
         
          // DOS 05.21.15
        $resultJB0 = mysqli_query($con, $updateStr); // or die("Query failed ($updateStr) - " . mysql_error());

// DOS 05.21.15 // closing connection asap
 mysqli_close($con);
 unset($con );
    

    }else
    {
      //  echo "NO PASSWORD MATCH !   userName: $toUserNamesCheck1,  id=$id, pwd= $pwd==$password\n\n";
        echo "!Password INVALID._"."$lastIP"."===>"."$password<====";

    }

}else{
  //  echo "  No User Found - Inserting";
    echo "?CREATE USER";
    
}


////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////// FROM AVATTIRE userSignin1.php CODE *****************************
////////////////////////////////////////////  
////////////////////////////////////////////       *** END OF COMMENTS ***
////////////////////////////////////////////  
////////////////////////////////////////////  
*/

//
//
////////////// *************************************************
////////////// *************************************************
////////////// **
////////////// **
////////////// **
////////////// **
////////////// **               * CODE BELOW THESE COMMENTS
////////////// **
////////////// *************************************************  accessdb.php END TOP //'s
//
//
//
////////////// ******************************************************* TOP of CODE...............
//
//Setting up Error Reporting Level
//
//ini_set('display_errors', 1);
//error_reporting(E_ALL);
//date_default_timezone_set("America/New_York"); 
 //                                                     $vers = "1.03";

//$todaysdate = date('Y-m-d');
//echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";

//exit("bye");

/*



//$searchQuery = $_POST["post_query"];
$searchQuery = $_POST["data"];

$filePath="";
$filePath1 = "intradaytradesServer"; 
//$todaysdate = date('Y-m-d');
$filePath.= $filePath1."_". $todaysdate. ".txt";


//$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
//  if (!$con) die('Could not connect: ' . mysqli_error($con));
//  mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));
 
echo "] fn= $filePath , reading searchQuery... \n";  //= $searchQuery \n";

$splitChars = ",";
//$afterAdrsee = strpbrk($searchQuery,$splitChars);
//$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd




  //
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
*/
//for($i=0;$i<$cnt;$i++){
//    if($i%50==0) echo $i. ") ". $params[$i]."\n";
//}


?>