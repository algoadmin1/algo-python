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
                                                      $vers = "4.21";
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
$FincialDisclaimerStr1= "Financial Disclaimer: Not Financial Advice. ";
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
 
$timeNYC =  date("Y-m-d\TH:i:s");
$happy1.= GetEntryNums();
 
///// *************************************************************************************************


// SET Default data to test / read in txt file from this date:
$tradedatestr = "2023-12-20";

$datestr = $udate0 ; // User date string chk

$tof9=false;
$tof9=CheckDate0($datestr);

if($tof9==true) $tradedatestr=$datestr;  



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
                
                $humanReadableTradeStr = $date0str." ".  $dayofwk. " ". $date1str." ". $timeofday. $ampmStr.  "  ". $elements[ 5 ]. "  ". $elements[ 6 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".$CurrencyStr  .  $elements[ 9 ]. " duration DAY (off a ". $elements[ 3 ]. " chart with a ". $buySellSigCount. " of ". $elements[ 12 ]. ") ".  $pctNearS1R1. " or ". $CurrencyStr. $aboveBelowAmtStr." ". $aboveBelowStr. " ".  $SRstr ." of ".$CurrencyStr  . $SuppResisStr ; 
                
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
                        
                        // $humanReadableTradeShortStr.= $tradeType." ".$symbol. " at ". $tradeprice. " ".  $date1str." ". $timeofday. " ;  ";
                        $humanReadableTradeShortStr.= $tradeType." ".$symbol. " at ". $tradeprice ." ". $timeofday. " ";
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
            $pstr99="<br />End of Algo Trades; INSERTED $inserted0 out of $c RawTrades found at " .date("Y-m-d\TH:i:s"). " NYC Time.<br /><br /><br />". $humanReadableTradeShortStr." ";  
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


if($inserted0>0  || $msg0==5 ){

        $errorString = SendEmailTo($receiverEmail, $senderEmail, $subject0, $message0 );
        echo "<br/><br/> Email SystemReturnedMessage: ". $errorString. "<br/><br/>";  

        echo "<br/> To: $receiverEmail , From: $senderEmail";
        echo "<br/> Time: $timeNYC";

        echo "<br/> Email Subject: ". $subject0;  
        echo "<br/> Email Body: ". $message0;  


}

/*

JB: the php function you wrote to send an email, SendEmailTo( ) is not working consistently. Please re-write the php function to make sure it works with current web standards.




Certainly! The mail() function may not always work consistently due to server configurations or restrictions. An alternative is using a library like PHPMailer, which provides more features and better compatibility. Here's an example using PHPMailer to send emails:

Firstly, you need to include the PHPMailer library. You can install it using Composer or download it from GitHub.

Here's an example of using PHPMailer:





// Include PHPMailer autoload file
require 'vendor/autoload.php'; // Replace with the path to PHPMailer autoload file

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function SendEmailTo($receiverEmail, $senderEmail, $subject, $msg) {
    $mail = new PHPMailer(true); // Create a PHPMailer instance

    try {
        // Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.example.com'; // Your SMTP server address
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'your_email@example.com'; // SMTP username
        $mail->Password = 'your_password'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        // Sender and recipient
        $mail->setFrom($senderEmail);
        $mail->addAddress($receiverEmail);

        // Email content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body = $msg;

        // Send email
        $mail->send();
        return "Email sent successfully!";
    } catch (Exception $e) {
        return "Failed to send email. Error: {$mail->ErrorInfo}";
    }
}

// Example usage
$receiverEmail = "receiver@example.com";
$senderEmail = "sender@example.com";
$subject = "Test Email";
$message = "This is a test email message.";

$errorString = SendEmailTo($receiverEmail, $senderEmail, $subject, $message);
echo $errorString; // Outputs success or error message



Replace 'smtp.example.com', 'your_email@example.com', and 'your_password' with your SMTP server settings. Also, adjust the $receiverEmail, $senderEmail, $subject, and $message variables as needed for your use case.

Ensure you have PHPMailer installed and correctly configured with the necessary SMTP settings to send emails. This method tends to be more reliable and flexible for sending emails from PHP applications.


*/



?>  