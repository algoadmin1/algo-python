<?php
// jb      recPortfolioTrade.php by John Botti Copyright (c) 2020-2025 by Algo Investor Inc. All Rights Reserved.
//
// Setting up Error Reporting Level
//
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 
                                                      $vers = "3.54";
                                                      // from  gettrades.php
$minstrlen = 32; 
$dirPrefix="rawtrades/";
$happy1 = "ega"; 
$happy2="jb";
$CurrencyStr="$";
$todaysdate = date('Y-m-d');
$prgname= "recPortfolioTrade.php";
// $filename0 = "trades_ini.txt"; 

// //echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// // ******************************************************************** INITAL VARS

// // Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
// $utime0 = isset($_GET['t']) ? $_GET['t'] : '2500';
$uuser0 = isset($_GET['u']) ? $_GET['u'] : 'baduser';


// //$udate0 = isset($_GET['date']) ? $_GET['date'] : $todaysdate ;
// //$utime0 = isset($_GET['time']) ? $_GET['time'] : '2600';

// $uname0 = isset($_GET['name']) ? $_GET['name'] : 'Creator';
// $acct0  = isset($_GET['acct']) ? $_GET['acct'] : '12345354911';
// $msg0=0;
// $msg0   = isset($_GET['msg']) ? $_GET['msg'] : 'nil';


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




  //
  if (empty($searchQuery)) {
    echo "searchQuery is empty, exiting.\n";
    exit("recPortfolioTrade.php execution terminated.\n\n");

  } else {
    echo " searchQuery, len=". strlen($searchQuery). " - _POST msg rec'd OK!\n";
  }

$i=0;

$params = explode (",", $searchQuery);
echo "\n params = ". $params[0]. "|". $params[1]. "|". $params[2]. "|".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
$cnt=count($params);
echo "\nFound $cnt params[] (all lines)...\n";


echo "<p>Copyright &copy; 1999-" . date("Y") . " Algo Investor Inc.</p>";



 
// $retstr0 ="] returning from ". $prgname. " ...";
// return  ( $retstr0);


?>
