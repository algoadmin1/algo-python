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
                                                      $vers = "1.5375";
$minstrlen = 32;
$todaysdate = date('Y-m-d');

//echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// ******************************************************************** INITAL VARS

// Get the values from the URL parameters
$udate0 = isset($_GET['date']) ? $_GET['date'] : $todaysdate ;
$utime0 = isset($_GET['t']) ? $_GET['t'] : '2500';
$uname0 = isset($_GET['uname']) ? $_GET['uname'] : 'creator';
$acct0  = isset($_GET['acct']) ? $_GET['acct'] : 'crtracct';
$msg0   = isset($_GET['msg']) ? $_GET['msg'] : 'nil';
//$msg0=0;

$prgname="recpost1.php";

$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$happy1 = "Vegas2024!";
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

function GetDBSafe_NYCTimeNOW(){
  //$timeNYC0 =  date("Y-m-d\TH:i:s");
  $timeNYCnow =  date("Y-m-d\TH:i:s");
  return( $timeNYCnow );
}


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

PrintUserInputs( $udate0, $utime0, $uname0, $acct0 );

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
$insertdb = 0;

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

echo "<br />] After MySQL access, date verify.  <br /><br />] Attempting file read of: ". $fname. "<br />";

//$fname = "intradaytradesServer_2023-12-20.txt"; // Replace with your file name
// Array to store strings
$arrstrs = array();
$i=0;
$j=0;
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
            echo " [INSERTED] ". "__Orig(re-hash)_numCSVs==". $numcsv. "  "; //. $h0;     

            $arrstrs[] = $line ; // Append the line to $arrstrs if it doesn't exist
            $j++;
        }else echo " [ NOT Inserted ]  <#noHash#>";

        $i++;

    }
    fclose($handle);
}

$arrname = "arrstrs";
// $arrstrs[] should have only unique RAW trades at this point...
if($msg0==1) PrintArray( $arrstrs , $arrname );
 
 




$ftimeout = GetDBSafe_NYCTimeNOW();
//$fnameout = "rawtrades_". $tradedatestr. ".txt";  
$fnameout = "rawtrades_". $ftimeout. ".txt";  

echo "<br /><br /><br />] FOUND $j unique RAW trades, and inserted them into ". $arrname. "[] writing to $fnameout ... <br />";


//$arrstrs = array(/* your array content here */); // Replace this with your array

// Open the file for writing
$fileout = fopen($fnameout, "w");

// Write each element of the array to the file
if ($fileout) {
    foreach ($arrstrs as $line0) {
        fwrite($fileout, $line0 . PHP_EOL); // Write each line and add a newline
    }
    fclose($fileout);
    echo "Array content written to $fnameout successfully.";
} else {
    echo "Unable to open file!";
}


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