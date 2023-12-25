<?php
////////////// **************************************  recpost1.php Copyright (c) 2023-2026 by Algo Investor Inc
////////////// **                                                   written by John Botti
//
//
//
//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York"); 
                                                      $vers = "1.55";
$minstrlen = 32; 
$happy1 = "Vega";
$todaysdate = date('Y-m-d');

//echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// ******************************************************************** INITAL VARS

// Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
$utime0 = isset($_GET['t']) ? $_GET['t'] : '2500';

//$udate0 = isset($_GET['date']) ? $_GET['date'] : $todaysdate ;
//$utime0 = isset($_GET['time']) ? $_GET['time'] : '2600';

$uname0 = isset($_GET['name']) ? $_GET['name'] : 'creator';
$acct0  = isset($_GET['acct']) ? $_GET['acct'] : 'crtracct';
$msg0   = isset($_GET['msg']) ? $_GET['msg'] : 'nil';
//$msg0=0;

$prgname="recpost1.php";
$happy1.="s";
$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$password1 = "Egw2B4f*q@z_$";
$dbname = "u151710353_algotrades";
$tblname ="trades";

$timeNYC =  date("Y-m-d\TH:i:s");

// ******************************************************************** INITAL VARS



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
function GetDBSafe_NYCTimeNOW(){
  //$timeNYCnow =  date("Y-m-d\TH:i:s");
  $timeNYCnow =  date("Y-m-d\TH_i_s");
  return( $timeNYCnow );
}
function GetNYDateTime(){
  $timeNYC0 =  date("Y-m-d\TH:i:s");
  return $timeNYC0;
}
function echoColor($printstr, $colorstr){   // colorstr = " red blue  green black white yellow purple orange gray"
  echo '<p style="color: '. $colorstr. ';">'. $printstr. '</p>';
 // echo '<p style="color: green;">The file '. $fname. ' exists.</p>';
}

//
//
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
// ********************************************************************* MAIN CODE
//
//

echo "<br />  $prgname   $vers is running, Time in NYC =   $timeNYC  ... <br />";

echo "<br /><br />";

echo "*****************<br />";

echo "<br />] **** Greetings, Creator. We are currently running:   $prgname  : $servername :  $username / $password1 | $dbname : $tblname  ...  ********<br />";

//echo "*****************\n";

//echo "\n*\n] Accessing https://algoinvestorr.com/*_". $dbname. "[". $username"]_". $tblname. "\n*\n*\n*\n";
echo "*****************<br />";

PrintUserInputs( $udate0, $utime0, $uname0, $acct0 , $msg0 );

echo "<br />******** ATTEMPTING DB ACCESS *********<br />";


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



// Close the PDO connection
$conn = null;


///// *************************************************************************************************
///// *************************************************************************************************


// data to test / read in txt file from this date:
$tradedatestr = "2023-12-20";


//turn this into a fn
$datestr = $udate0 ; // User date string chk

$dateck = DateTime::createFromFormat('Y-m-d', $datestr);
//if( strlen($udate0==10) )  $tradedatestr = $udate0 ;
if ($dateck !== false && $dateck->format('Y-m-d') === $datestr) {
    echo "<br /> ] Valid date in 'YYYY-MM-DD' format: $datestr , strlen()==". strlen($datestr);
    $tradedatestr=$datestr;  // override date to read/write

} else {
    echo "<br /> ] Invalid date or not in 'YYYY-MM-DD' format: $datestr";

}








$fname = "intradaytradesServer_". $tradedatestr. ".txt"; // Replace with your file name

$pstr= "<br />] After MySQL access, date verify.  <br /><br />] Attempting file read of: ". $fname. "<br />";
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
}



if($fexist==1){

    // Read the file line by line
    if (($handle = fopen($fname, "r")) !== false) {
        while (($data = fgetcsv($handle, 0, ",")) !== false) {

            // Check each line against $arrstrs before appending
            $line = implode(",", $data); // Convert line array to a string
            $linelen= strlen($line);
       //     echo "<br /><br /> ] $i  :  $line  ,  LINE LEN== $linelen  <br />";
            $numcsv = NumCSVs($line)  ;
            $h0= HashIt($line);
            $line = $line.",". $h0;

            echo "<br /><br /> ] $i  :  $line  ,  LINE LEN== $linelen  <br />";

            // Check if the line exists in $arrstrs
            if (!in_array($line, $arrstrs) &&  ( $linelen > $minstrlen ) ) {
                echo " [ Appended into array] ". "__Orig(re-hash)_numCSVs==". $numcsv. "  "; //. $h0;     

                $arrstrs[] = $line ; // Append the line to $arrstrs if it doesn't exist
                $j++;
            }else echo " [ NOT Inserted into array ]  <#noHash#>";

            $i++;

        }
        fclose($handle);
    }//if

}//if fexist==1


$arrname = "arrstrs";
// $arrstrs[] should have only unique RAW trades at this point...
if($msg0==1) PrintArray( $arrstrs , $arrname );
 
 




$ftimeout = GetDBSafe_NYCTimeNOW();   
$fnameout = "rawtrades_". $ftimeout. ".txt";     //$fnameout = "rawtrades_". $tradedatestr. ".txt";  

$pstr= "<br /><br /><br />] FOUND $j unique RAW trades, and inserted them into ". $arrname. "[] writing to $fnameout ... <br />";
echoColor( $pstr, "orange");


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
    echoColor( $pstr, "green");
} else {
    $pstr= "<br />Unable to open file!<br />";
    echoColor( $pstr, "red");
}



//
//
//  
// ********** Loop thru and insert into MySQL
//
//
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************
// **************************************************************************************************

// //
// //
// // Loop through $arrstrs and separate CSV elements into $csvelems
// //
$csvelems = [];
$c=0;
foreach ($arrstrs as $string) {
    echo "<br /><br /> ] arrstrs[ $c ]=". $string;

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
    // 2023-12-21,945,thu,15min,1.1383%,BUY,100,AMZN,atLimit,152.28,Pday,buysigcnt,8,R3R2R1_P_P3_S1S2S3=,159.70,157.16,154.61,153.09,152.08,150.54,149.02,146.47,p-S1=,1.73,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,154.90,152.30,145.37,141.04,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL,70ac488fa3488b4669d178ad1011265f69378daa0244605f2fcc890c912a0dd3

    $aboveBelowStr="around";
    $ampmStr="am";

    $t0str = $elements[ 1 ];      // ie 945, 1115 am
    $intValue = intval($t0str);
    if($intValue>=1200) $ampmStr="pm";

    $pstr=  $elements[ 0 ]. " ".  $elements[ 1 ]. $ampmStr. " ".  $elements[ 2 ]. " ". $elements[ 5 ].   " ".  $elements[ 7 ]. " ".  $elements[ 8 ]. " ".  $elements[ 9 ]. " duration: DAY, off a ". $elements[ 3 ]. " chart, & a ". $elements[ 11 ]. "'s Strengh= ". $elements[ 12 ].  $elements[ 4 ]. "% ". $aboveBelowStr.  $elements[ 9 ] ."<br />"; 

    echoColor($pstr, "purple");

    print_r($elements);
    $c++;

    }//foreach($arrstrs
 



/*************************************************************************************************


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