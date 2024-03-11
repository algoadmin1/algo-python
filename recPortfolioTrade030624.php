<?php
// jb      recPortfolioTrade.php by John Botti Copyright (c) 2020-2025 by Algo Investor Inc. All Rights Reserved.
//
// Setting up Error Reporting Level
//
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 

include 'standardfunctions.php';
                                                      $vers = "4.9";
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

// $res0 = GetEntryNums();
// echo "354MOOSE] Attempting RECEIVE data: [ prg vers= $vers ]  ...... res0==". $res0 ;

echo "354MOOSE] Attempting RECEIVE data: [ prg vers= $vers ]  ...... " ;
echo "] recpost.php $vers is running, Time in NYC = ". $todaysdate. "    ____________-->" ;



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
echo "\n params = ". $params[0]. ", ". $params[1]. ", ". $params[2]. ",| ".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
$cnt=count($params);


// $hastr0="creatorNIL";  // not in positions.tradeHash
$hastr0="creatorHash";
$inserted0=0;
$insertdb=0;

echo "\nFound $cnt params[] (all lines)...\n  hastr0== $hastr0";


// NEW...
$ii=0;
$newstr="";
$statusStr = $params[0]; 
$statusStr = strtolower($statusStr);

if( $statusStr=='unsent' || $statusStr=='sending' || $statusStr=='sent' ){
    
    //skip [0] ==statusstr
    for($ii=1; $ii<$cnt; $ii++){
      $newstr.= $params[$ii];
      if($ii != ($cnt-1) ){
        $newstr.= ",";
      }// add , iff not last one
    }

    // now hash it
    echo "]  newstr ==    ======>". $newstr. "<=======";
    $newstrHash = HashIt($newstr);
    echo "]  newstr# ==   ###===>". $newstrHash. "<====###";
    
/*
======>portfolioTrade,LIVE,ini,M,BUY,ABOVE,S1,LONG_STOCK,COUNT,5,1,0,LIVE,19,nil,portfolioTrade,2024-03-06,1515,BUY,10,M,atLimit,20.1,3251,11,above,S1,0.3,1.5091%,0,20|20|15|15,2024-03-06T184834,2024-03-06T200011,2024-03-06T151500,wed,15min,Creator,12345354911,raw45,0,100,0,gfd,12.06,50.25,IronCondor1.15,R3R2R1_P_P3_S1S2S3=|21.77|21.27|20.78|20.29|18.70|19.80|19.31|18.82|,wkR2R1P_18.63_S1S2=|22.28|20.15|16.50|14.98|,moR3R2R1PS1S2S3=|24.41|22.08|19.74|18.43|16.09|14.78|12.44|,nil,BUY,0,1,2,3,nilHash<=======
]  newstr# ==   ###===>bf207fe05fcf847920c80ae1f6f2edeb18e9657987531e30cfcc0079d389c1ef<====
 */





    

// ATTEMPT ACCESS
// try {
//   // Connect to MySQL using PDO
//   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
//   // Set PDO to throw exceptions for errors
//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// ######################################################### Start code HERE

 //                             // $query = "SELECT * FROM ". $tblname. " WHERE tradeHash = :tradeHash";
//         $query = "SELECT * FROM positions WHERE tradeHash = :tradeHash";
//         $stmt = $conn->prepare($query);
//         $stmt->bindParam(':tradeHash', $tradeHashToQuery);
//         $stmt->execute();
//         $result = $stmt->fetch(PDO::FETCH_ASSOC);

//         $insertdb=0;
//         if ($result) {  // if there is a hash == found
//             $insertdb=0;
//             if($msg0==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
//         } else {
//             $insertdb=1;
//             if($msg0==1) echo "<br />] NO RawTrade found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
//         }

//         if($insertdb==1){
//                     // $insertQuery0 = "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
//           $insertQuery0 = "INSERT INTO positions ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
          
//           // $conn->exec($insertQuery0a);
//           // $lastInsertedId = $conn->lastInsertId();
//           // $inserted0++;
//           // $pstr2= "<br />] Sample trade inserted. Last inserted ID: $lastInsertedId ";
//           // echoColor($pstr2,"green");


//           // $pstr3= "<br />] Sample trade inserted; insertQuery0a = $insertQuery0a ";
//           $pstr3= "<br />] Sample  trade NOT   inserted but insertQuery0a = $insertQuery0a ";
//           echoColor($pstr3,"blue");

//         }else{

//          echo "<br />] insertdb = $insertdb  ___ NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery "; 
          
          
//         }

//     } catch (PDOException $e) {
//         echo "<br />] Connection failed: " . $e->getMessage();
//     }
//     // Close the PDO connection
//     $conn = null;



}

// echo "<p>Copyright &copy; 1999-" . date("Y") . " Algo Investor Inc.</p>";





// ATTEMPT ACCESS
// try {
//   // Connect to MySQL using PDO
//   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
//   // Set PDO to throw exceptions for errors
//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// // ######################################################### Start code HERE

//         $tradeHashToQuery = $hastr0 ;

//         // $query = "SELECT * FROM trades WHERE tradeHash = :tradeHash";
//         // $query = "SELECT * FROM ". $tblname. " WHERE tradeHash = :tradeHash";
//         $query = "SELECT * FROM positions WHERE tradeHash = :tradeHash";
//         $stmt = $conn->prepare($query);
//         $stmt->bindParam(':tradeHash', $tradeHashToQuery);
//         $stmt->execute();
//         $result = $stmt->fetch(PDO::FETCH_ASSOC);

//         $insertdb=0;
//         if ($result) {  // if there is a hash == found
//             $insertdb=0;
//             if($msg0==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
//         } else {
//             $insertdb=1;
//             if($msg0==1) echo "<br />] NO RawTrade found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
//         }

//         if($insertdb==1){
//           // $insertQuery0 = "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
//           $insertQuery0 = "INSERT INTO positions ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
          
//           // $conn->exec($insertQuery0a);
//           // $lastInsertedId = $conn->lastInsertId();
//           // $inserted0++;
//           // $pstr2= "<br />] Sample trade inserted. Last inserted ID: $lastInsertedId ";
//           // echoColor($pstr2,"green");


//           // $pstr3= "<br />] Sample trade inserted; insertQuery0a = $insertQuery0a ";
//           $pstr3= "<br />] Sample  trade NOT   inserted but insertQuery0a = $insertQuery0a ";
//           echoColor($pstr3,"blue");

//         }else{

//          echo "<br />] insertdb = $insertdb  ___ NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery "; 
          
          
//         }

//     } catch (PDOException $e) {
//         echo "<br />] Connection failed: " . $e->getMessage();
//     }
//     // Close the PDO connection
//     $conn = null;
 




// INITIAL ACK / NAK
if( $uuser0=="err"  ||  $insertdb==0 ){
  echo "NOGO"; 
}else if( $insertdb==1 ){
  echo "OKGO"; 
}
 
 
// $retstr0 ="] returning from ". $prgname. " ...";
// return  ( $retstr0);


?>
