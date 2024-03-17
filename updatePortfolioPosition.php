<?php
// jb    updatePortfolioPosition.php derived from    updatePortfolioTrade.php by John Botti 
//                                                                      Copyright (c) 2020-2025 by Algo Investor Inc. All Rights Reserved.
//
// Setting up Error Reporting Level
//
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 

include 'standardfunctions.php';

                                                      $vers = "1.1";
                                                       
$minstrlen = 32; 
$dirPrefix="rawtrades/";
$happy1 = "Vega"; 
$happy2="jb";
$CurrencyStr="$";
$todaysdate = date('Y-m-d');
$prgname= "updatePortfolioPosition.php";
$brokerage="rhood";
// $filename0 = "trades_ini.txt"; 

// //echo "\n\n] recpost1.php $vers is running, Time in NYC = $todaysdate \n";
// // ******************************************************************** INITAL VARS
$msg  =0;
$msg00=0;
// // Get the values from the URL parameters
$udate0 = isset($_GET['d']) ? $_GET['d'] : $todaysdate ;
$utime0 = isset($_GET['t']) ? $_GET['t'] : '0930';

$symbol0 = isset($_GET['sym']) ? $_GET['sym'] : 'AAPL';

// $uuser0 = isset($_GET['u']) ? $_GET['u'] : 'creator';
$msg    = isset($_GET['msg']) ? $_GET['msg'] : $msg00 ;


$uname0 = isset($_GET['name']) ? $_GET['name'] : 'Creator';
$acct0  = isset($_GET['acct']) ? $_GET['acct'] : '12345354911';

$unhappy ="nil";
$happy1.= "s";  


$servername = "localhost"; // Replace with your server name
$username = "u151710353_roguequant1";
$happy1.= GetEntryNums();
$dbname = "u151710353_algotrades";
$tblname ="positions";


// Function to print array of strings
function printArray($arrStrs, $msgStr) {
    echo "] $msgStr  : Array of Strings:\n";
    // echo "<br />";

    foreach ($arrStrs as $index => $str) {
        echo "$index: $str\n";
        // echo "<br />";
    }
}
 


// // INITIAL ACK / NAK
// if($uuser0=="err"){
//   echo "ERRU"; 
// }else{
//   echo "ACKU"; 
// }

$dummy0=1;
// $res0 = GetEntryNums();
// echo "354MOOSE] Attempting RECEIVE data: [ prg vers= $vers ]  ...... res0==". $res0 ;
// if($msg==1){
if($dummy0==1){
    echo "354MOOSE] Attempting RECEIVE data: [ prg= $prgname vers= $vers ]  ...... " ;
    echo "] $prgname : $vers is running, Time in NYC = ". $todaysdate. "    ____________-->" ;
}

$searchQuery="";
if (isset($_POST['data'])) {
    $searchQuery = $_POST['data'];

     echo "] Search query: $searchQuery ";
    // if($msg==1) echo "Search query: $searchQuery ";
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
 
if($msg==1) echo "] fn= $filePath , reading searchQuery... \n";  //= $searchQuery \n";

$splitChars = ",";
//$afterAdrsee = strpbrk($searchQuery,$splitChars);
//$avName      =  strtok($searchQuery,$splitChars);    // us erName trying to sign in, above, pwd




  //
  if (empty($searchQuery)) {
    echo "ERROR: searchQuery is empty, exiting.\n";
    exit(" *.php execution terminated.\n\n");

  } else {
    // if($msg==1) echo " searchQuery, len=". strlen($searchQuery). " - _POST msg rec'd OK!\n";
    echo " searchQuery, len=". strlen($searchQuery). " - _POST msg rec'd OK!\n";

  }

$i=0;
$params = explode (",", $searchQuery);
$paramstr = "] _POST params = " ; //. $params[0]. ", ". $params[1]. ", ". $params[2]. ",| ".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
// if($msg==1) echo "\n _POST params = ". $params[0]. ", ". $params[1]. ", ". $params[2]. ",| ".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
$cnt=count($params);

$jj=0;
for( $jj=0; $jj<$cnt ;$jj++ ){
  $paramstr.= "[".$jj."]". $params[$jj]. " ";
}
echo "] paramstr = $paramstr";

// _POST params = [0]getpositions [1]tradeDay [2]= [3]fri [4]EOL [5]nil [6]nil [7]nil [8] 
// Found 9 params[] (all lines)...

// default to aux for UPDAT3
$fieldname ="tradeAux";
$fieldsrch = $udate0;   // user input'd ?d="" or auto-gen'd YYYY-MM-DD

if( $params[2]=="="){
  // we have a tradeDay = fri  -or-
  //         a symbol = AAPL 
  $fieldname=$params[1];
  $fieldsrch=$params[3];
}

$queryMaster  = "SELECT * FROM ".  $tblname.  " WHERE ".  $fieldname. " = :". $fieldname ;
$bindMaster   = ':'.  $fieldname ;    //  for this :   $stmt->bindParam($bindMaster, $tradeHashToQuery);


// $hastr0="creatorNIL";  // not in positions.tradeHash
$hastr0="creatorHash";
$inserted0=0;
$insertdb=0;

$queryU  = "UPDATE ". $tblname. " SET ". $fieldname. " = ". $fieldsrch.  " WHERE positionId = :positionId";
echo "] queryU = $queryU ";

// if($msg==1) echo "\nFound $cnt params[] (all lines)...\n  hastr0== $hastr0";
 echo "]  bindMaster= $bindMaster , = $fieldsrch ?  |  queryMaster = $queryMaster  |  Found $cnt params[] (all lines)...";  //\n  hastr0== $hastr0";




// NEW...
// $ii=0;
// $newstr="";
// $statusStr = $params[0]; 
// $statusStr = strtolower($statusStr);

// $inistr = "";
// $iniSt = 3;
// $iniEnd= 16;

// if( $statusStr=='unsent' || $statusStr=='sending' || $statusStr=='sent' ){
    
//     //skip [0] ==statusstr
//     for($ii=1; $ii<$cnt; $ii++){
//       $newstr.= $params[$ii];
//       if($ii != ($cnt-1) ){
//         $newstr.= ",";
//       }// add , iff not last one

//       if(  $ii > $iniSt    &&    $ii < $iniEnd  ){
//         $inistr.= $params[$ii]. "|";
//       }
//     }
    
//     // now hash it   if($msg==1)
//      echo "]  newstr ==    ======>". $newstr. "<=======";
//     $newstrHash = HashIt($newstr);
//       echo "]  newstr# ==   ###===>". $newstrHash. "<====###";
    
//     // BUY QQQ BELOW S1

//     // d8e19e3d8bfa1d8070d7853a479ce639a6f8348b4ec4bf72e80e158f423d7f87

//     /*
    
//     INSERT INTO `positions` (`positionId`, `tradeRecTimestamp`, `tradeDateTime`, `tradeDate`, `tradeTime`, `tradeDay`, `tradeBar`, `userId`, `accountId`, `tradeType`, `symbol`, `tradeRAW`, `tradeRawId`, `tradeSize`, `tradePrice`, `lastPrice`, `lastPrDate`, `costBasis`, `optionStock`, `tradePrFilled`, `tradeCond`, `tradeDur`, `tradeStopMkt`, `tradeLimitExit`, `optionStrategy`, `daySRs`, `wkSRs`, `moSRs`, `leg1`, `leg2`, `leg3`, `leg4`, `buySellCnt`, `buySellPct`, `buySellDist`, `tradeSpec`, `tradeSig`, `tradeGapPct`, `tradeStatus`, `tradeAux1`, `iniStr`, `tradeHash`) VALUES (NULL, current_timestamp(), '2024-03-08T150000', '2024-03-08', '1500', 'fri', '30min', 'jb', '12354911', 'BUY', 'QQQ', '', '3302', '1', '440.35', '440.35', '2024-03-08', '', 'stock', NULL, 'limit', 'gfd', '', '', '', 'd', 'w', 'm', '', '', '', '', '5', '', '', NULL, NULL, NULL, 'unsent', NULL, 'a,b,c', 'd992dbcf8ff2823b137e128162bbd0b97a11f1b53a760353cf2c1db160485b43'), (NULL, current_timestamp(), NULL, '', '', '', '', NULL, NULL, NULL, '', '', '', NULL, NULL, '', '', '', '', NULL, NULL, NULL, '', '', '', 'a', 'b', '', '', '', '', '', '', '', '', NULL, NULL, NULL, 'unsent', NULL, 'a,b,c', '123');
    
//     newstr ==    ======>[1]portfolioTrade,LIVE,ini,QQQ,BUY,BELOW,S1,LONG_STOCK,COUNT,5,1,0,LIVE,19,nil,
//                         [16]portfolioTrade,[17]2024-03-08,1500,BUY,[20]10,[21]QQQ,atLimit,440.35,[24]3302,[25]6,below,S1,-1.67,-0.3785%,[30]1,
//                         [31]525|505|370|350,nil,nil,2024-03-08T150000,[35]fri,[36]30min,Creator,[38]12345354911,raw14,0,
//                         [41]100,0,gfd,264.21,1100.88,IronCondor1.15,R3R2R1_P_P3_S1S2S3=|452.58|450.23|447.87|444.37|440.23|442.01|438.51|436.15|,wkR2R1P_442.18_S1S2=|454.46|450.07|437.79|429.90|,moR3R2R1PS1S2S3=|459.55|452.76|445.96|433.80|427.00|414.84|408.04|,nil,BUY,0,1,2,3,nilHash<=======


//     */
//     // d992dbcf8ff2823b137e128162bbd0b97a11f1b53a760353cf2c1db160485b43
//     // UPDATE `positions` SET `tradeHash` = 'd992dbcf8ff2823b137e128162bbd0b97a11f1b53a760353cf2c1db160485b43' WHERE `positions`.`positionId` = 1;
// }






// echo "<p>Copyright &copy; 1999-" . date("Y") . " Algo Investor Inc.</p>";

// $hastr0 = $newstrHash;

// $servername = "localhost"; // Replace with your server name
// $username = "u151710353_roguequant1";
// $happy1.= GetEntryNums();
// $dbname = "u151710353_algotrades";
// $tblname ="positions";




///  #########################################################  

// echo '] before ATTEMPTing DB ACCESS...';
exit( '] Exiting before ATTEMPTing DB ACCESS...');

///  #########################################################  
 


// ATTEMPT DB ACCESS
try{
  // Connect to MySQL using PDO
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);
  // Set PDO to throw exceptions for errors
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// // ######################################################### Start code HERE

        // $tradeHashToQuery = $hastr0 ;
        
  //    UPDATE `positions` SET `userId` = 'Creator' WHERE `positions`.`positionId` = 7;

        $queryU  = "UPDATE ". $tblname. " SET ". $fieldname. " = ". $fieldsrch.  " WHERE positionId = :positionId";

        //   UPDATE `positions` SET `userId` = 'john', `tradeAux1` = 'testAux' WHERE `positions`.`positionId` = 4;
        $query  =  $queryMaster ;  
        // $query  = "SELECT * FROM ". $tblname. " WHERE tradeDay = :tradeDay";
        // $query = "SELECT * FROM positions WHERE tradeHash = :tradeHash";
        $stmt = $conn->prepare($query);

        $stmt->bindParam( $bindMaster,  $fieldsrch  );
        // $stmt->bindParam(':tradeHash', $tradeHashToQuery);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // assume no result
        $resultValid = 0;

         if ($result) {  
            echo "] print_r result=" ;
            print_r($result);

            $resultValid=1;
            $resultstr = arr2str($result);
            echo "] result=". $resultstr ;      //]  resultValid= $resultValid , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
          } else {
              $resultValid=0;
              echo "] NO position found for $fieldname = $fieldsrch.  resultValid= $resultValid  ";    //  INSERTing to db.trades ...<br />";
        }

        
        
        
        //depricate
        $insertdb=0;

        // if ($result) {  // if there is a hash == found
        //     $insertdb=0;
        //     // if($msg==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
        //     // echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
        //     // echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  ".    print_r($result, true); // . "</pre>";
        //     echo "] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery "; //, result=  ".    print_r($result, true); // . "</pre>";
        //   } else {
        //     $insertdb=1;
        //       echo "] NO RawTrade found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
        // }


        if($insertdb==1){
//           // newstr ==    ======>portfolioTrade,LIVE,ini,QQQ,BUY,BELOW,S1,LONG_STOCK,COUNT,5,1,0,LIVE,19,nil,portfolioTrade,2024-03-08,1500,BUY,10,QQQ,atLimit,440.35,3302,6,below,S1,-1.67,-0.3785%,1,525|505|370|350,nil,nil,2024-03-08T150000,fri,30min,Creator,12345354911,raw14,0,100,0,gfd,264.21,1100.88,IronCondor1.15,R3R2R1_P_P3_S1S2S3=|452.58|450.23|447.87|444.37|440.23|442.01|438.51|436.15|,wkR2R1P_442.18_S1S2=|454.46|450.07|437.79|429.90|,moR3R2R1PS1S2S3=|459.55|452.76|445.96|433.80|427.00|414.84|408.04|,nil,BUY,0,1,2,3,nilHash<=======

//           $tradeDateTime0 = $params[17]."T".$params[18];
//           $tradeDate0=$params[17];
//           $tradeTime0=$params[18];
//           $tradeDay  =$params[35];
//           $tradeBar  =$params[36];
//           // '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', '$tradeRawId', '$tradeSize', '$tradeprice', '$secType',  '$tradeHashToQuery' 
//           $userId    =$uname0; 
//           $acctId    =$acct0. "_". $brokerage; 

//           $tradeType    =$params[19];
//           $symbol       =$params[21];
//           $rawstr       ="pos"; 
//           $tradeRawId   =$params[24];
//           // $tradeSize    =$params[20];   // take tradesize from ini
//           $tradeSize    =$params[11];

//           $tradeprice   =$params[23];
//           $secType      =$params[8] ;
//           $tradePrFilled=$params[23];
//           $tradeCond    =$params[22];
//           $tradeDur     ="gfd";

//           $tradeStop    = "0.0" ;
//           $tradeLimit   = "0.0" ;
//           $opStrat      = $params[8];
//           $buySellCnt   = $params[25];  
//           $tradeStatus  = "unsent";
//           $tradeAux1    = "nil";

          
//           $leg1  = "0.0";
//           $leg2  = "0.0";
//           $leg3  = "0.0";
//           $leg4   = "0.0";

//           //$inistr           =
//           //$tradeHashToQuery =

// /*  //mysql0
//     newstr ==    ======>[1]portfolioTrade,LIVE,ini,QQQ,BUY,BELOW,S1,[8]LONG_STOCK,COUNT,5,1,0,LIVE,19,nil,
//                         [16]portfolioTrade,[17]2024-03-08,1500,[19]BUY,[20]10,[21]QQQ,atLimit,[23]440.35,[24]3302,[25]6,below,S1,-1.67,-0.3785%,[30]1,
//                         [31]525|505|370|350,nil,nil,2024-03-08T150000,[35]fri,[36]30min,Creator,[38]12345354911,raw14,0,
//                         [41]100,0,gfd,264.21,1100.88,IronCondor1.15,R3R2R1_P_P3_S1S2S3=|452.58|450.23|447.87|444.37|440.23|442.01|438.51|436.15|,wkR2R1P_442.18_S1S2=|454.46|450.07|437.79|429.90|,moR3R2R1PS1S2S3=|459.55|452.76|445.96|433.80|427.00|414.84|408.04|,nil,BUY,0,1,2,3,nilHash<=======


// insertQuery0 = INSERT INTO positions ( tradeRecTimestamp,  tradeDateTime,      tradeDate,   tradeTime,      tradeDay,   tradeBar, userId, accountId,           tradeType, symbol, tradeRAW,      tradeRawId,  tradeSize,     tradePrice, securityType, tradePrFilled,     tradeCond, tradeDur,    tradeStopMkt, tradeLimitExit, optionStrategy,  buySellCnt,     tradeStatus,    tradeAux1,      iniStr,         tradeHash) VALUES 
//                                    ( CURRENT_TIMESTAMP,  '2024-03-08T1500', '2024-03-08', '1500', 'fri', '30min', 'Creator_rhood', '12345354911', 'BUY', 'QQQ', 'pos', '3302',                                '10',         '440.35', 'LONG_STOCK',   '440.35,            'atLimit', 'gfd',    '0', '0',                         'LONG_STOCK',    '6',              'unsent', 'nil' ,    'QQQ|BUY|BELOW|S1|LONG_STOCK|COUNT|5|1|0|LIVE|19|nil|',   'd8e19e3d8bfa1d8070d7853a479ce639a6f8348b4ec4bf72e80e158f423d7f87'  )

//                         */


//           // $insertQuery0 = "INSERT INTO trades ( tradeRecTimestamp, tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId, tradeSize, tradePrice, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit,                 optionStrategy,                       leg1, leg2, leg3, leg4, buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, tradeAux2, tradeHash) VALUES ( CURRENT_TIMESTAMP, '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', 0, '$tradeSize', '$tradeprice', 0.0, '$tradeCond', 'day', '$tradeStop', '$tradeLimit', '$opStrat',                                        '$leg1', '$leg2', '$leg3', '$leg4', '$buySellCnt', '$buySellPctStr', '$buySellDist', 'nil', '$tradeType', 0.0 ,       'cued', '$humanTrade', '$timeNYC', '$tradeHashToQuery' )";
//           $insertQuery00 = "INSERT INTO ". $tblname ;  
//           // $insertQuery0a = "( tradeRecTimestamp,  tradeDateTime,      tradeDate,   tradeTime,      tradeDay,   tradeBar, userId, accountId,           tradeType, symbol, tradeRAW,      tradeRawId,  tradeSize,     tradePrice, securityType, tradePrFilled,     tradeCond, tradeDur,    tradeStopMkt, tradeLimitExit, optionStrategy, *** daySRs, wkSRs, moSRs,  leg1, leg2, leg3, leg4, **** buySellCnt, buySellPct, buySellDist, tradeSpec, tradeSig, tradeGapPct, tradeStatus, tradeAux1, iniStr, tradeHash) VALUES ";
      


//           // $insertQuery0a = " ( tradeRecTimestamp,  tradeDateTime,      tradeDate,   tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol, tradeRAW, tradeRawId,  tradeSize, tradePrice, securityType, tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,   leg1,leg2,leg3,leg4 ,              buySellCnt, tradeStatus,    tradeAux1,      iniStr,      tradeHash) VALUES ";
//           // $insertQuery0b = " ( CURRENT_TIMESTAMP,  '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', '$tradeRawId', '$tradeSize', '$tradeprice', '$secType', '$tradePrFilled, '$tradeCond', '$tradeDur', '$tradeStop', '$tradeLimit', '$opStrat',  '$leg1', '$leg2', '$leg3', '$leg4',  '$buySellCnt',   '$tradeStatus', '$tradeAux1' ,  '$inistr',   '$tradeHashToQuery'  )";
      
//           $insertQuery0a = " ( tradeRecTimestamp,  tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol,  tradeRAW, tradeRawId,  tradeSize, tradePrice, securityType, tradeStatus, tradeHash  ) VALUES ";     // "tradePrFilled, tradeCond, tradeDur, tradeStopMkt, tradeLimitExit, optionStrategy,   leg1,leg2,leg3,leg4 ,              buySellCnt, tradeStatus,    tradeAux1,      iniStr,      tradeHash) VALUES ";
//           $insertQuery0b = " ( CURRENT_TIMESTAMP,  '$tradeDateTime0', '$tradeDate0', '$tradeTime0', '$tradeDay', '$tradeBar', '$userId', '$acctId', '$tradeType', '$symbol', '$rawstr', '$tradeRawId', '$tradeSize', '$tradeprice', '$secType', '$tradeStatus', '$tradeHashToQuery'  )";    //     //  "    '$tradePrFilled, '$tradeCond', '$tradeDur', '$tradeStop', '$tradeLimit', '$opStrat',  '$leg1', '$leg2', '$leg3', '$leg4',  '$buySellCnt',   '$tradeStatus', '$tradeAux1' ,  '$inistr',   '$tradeHashToQuery'  )";
//           $insertQuery0 = $insertQuery00. $insertQuery0a. $insertQuery0b ;

//           echo "*************************]  INSERT  ins3rtQuery0(sub)     var ==". $insertQuery0 ;


// // INSERT  var ==INSERT INTO positions ( tradeRecTimestamp,  tradeDateTime,      tradeDate,   tradeTime,      tradeDay,   tradeBar, userId, accountId,           tradeType, symbol, tradeRAW,      tradeRawId,  tradeSize,     tradePrice, securityType, tradePrFilled,     tradeCond, tradeDur,    tradeStopMkt, tradeLimitExit, optionStrategy,   leg1,leg2,leg3,leg4 ,              buySellCnt, tradeStatus,    tradeAux1,      iniStr,      tradeHash) VALUES  ( CURRENT_TIMESTAMP,  '2024-03-12T1000', '2024-03-12', '1000', 'tue', '15min', 'Creator_rhood', '12345354911', 'BUY', 'META', 'pos', '3372', '10', '489.07', 'LONG_STOCK', '489.07, 'atLimit', 'gfd', '0.0', '0.0', 'LONG_STOCK',  '0.0', '0.0', '0.0', '0.0',  '5',   'unsent', 'nil' ,  'META|BUY|ABOVE|S1|LONG_STOCK|COUNT|5|1|0|LIVE|19|nil|',   '60905cf4eb28ca28f0bcce7e2794b0df08dc5cd8dcd18ba6d85397f9d34f7e5e'  )<br />ERROR:  Connection failed: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'atLimit', 'gfd', '0.0', '0.0', 'LONG_STOCK',  '0.0', '0.0', '0.0', '0.0',  '5...' at line 10123456789NOGO


// /*
// *************************]  INSERT  ins3rtQuery0(sub)     var ==INSERT INTO positions ( tradeRecTimestamp,  tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol,  tradeRAW, tradeRawId,  tradeSize, tradePrice, securityType, tradeHash  ) VALUES  ( CURRENT_TIMESTAMP,  '2024-03-13T1130', '2024-03-13', '1130', 'wed', '15min', 'Creator_rhood', '12345354911', 'BUY', 'TSLA', 'pos', '3429', '10', '171.74', 'LONG_STOCK',  '5c73b28f4362dcddeccc2dd29bd5705092a43ef8737e710ef621e2d3eb49e0a8'  )<br />] Sample trade inserted. Last inserted ID: 6 <br />] Sample  trade [almost]  * inserted  , insertQuery0 = INSERT INTO positions ( tradeRecTimestamp,  tradeDateTime, tradeDate, tradeTime, tradeDay, tradeBar, userId, accountId, tradeType, symbol,  tradeRAW, tradeRawId,  tradeSize, tradePrice, securityType, tradeHash  ) VALUES  ( CURRENT_TIMESTAMP,  '2024-03-13T1130', '2024-03-13', '1130', 'wed', '15min', 'Creator_rhood', '12345354911', 'BUY', 'TSLA', 'pos', '3429', '10', '171.74', 'LONG_STOCK',  '5c73b28f4362dcddeccc2dd29bd5705092a43ef8737e710ef621e2d3eb49e0a8'  ) 0123456789OKGO


// Success: Data successfully sent
// ] ***>> AFTER SEND POST! ;   result ==
// OKGOSearch query: unsent,portfolioTrade,LIVE,ini,TSLA,BUY,BELOW,S1,LONG_STOCK,COUNT,4,2,0,LIVE,19,nil,portfolioTrade,2024-03-13,1130,BUY,10,TSLA,atLimit,171.74,3429,10,below,S1,-1.74,-1.0131%,1,205|195|145|135,nil,nil,2024-03-13T113000,wed,15min,Creator,12345354911,raw17,0,100,0,gfd,103.044,429.35,IronCondor1.15,R3R2R1_P_P3_S1S2S3=|186.45|183.48|180.50|176.46|177.85|173.48|169.44|166.46|,wkR2R1P_182.93_S1S2=|208.98|192.16|166.11|156.88|,moR3R2R1PS1S2S3=|212.15|208.69|205.24|201.84|198.39|194.99|191.54|,nil,BUY,0,1,2,3,nilHash  searchQuery, len=513 - _POST msg rec'd OK!
// */


//           $conn->exec($insertQuery0);
//           $lastInsertedId = $conn->lastInsertId();
//           $pstr2= "<br />] Sample trade inserted. Last inserted ID: $lastInsertedId ";
//           echo $pstr2  ;
//           // echoColor($pstr2,"green");
           


//           // $pstr3= "<br />] Sample trade inserted; insertQuery0a = $insertQuery0a ";
//           $pstr3= "<br />] Sample  trade [almost]  * inserted  , insertQuery0 = $insertQuery0 ";
//           echo $pstr3 ;
//           // echoColor($pstr3,"blue");


        //NOP Statements for now
         $dummy2=0;
          ;

        }else if($insertdb==0){
          // echo "<br />] insertdb = $insertdb  ___ NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery "; 
          ;
        }


} catch (PDOException $e) {
  $insertdb=-10;
  $resultValid=-10;
  echo "<br />ERROR:  Connection failed: " . $e->getMessage();
}

// Close the PDO connection
$conn = null;
 


$numpostions = -1;

// resultValid=1 == result found and echo'd
// INITIAL ACK / NAK
// if( $uuser0=="err"  ||  $resultValid<1 ){   // ==0 or == -10
if(   $resultValid<1 ){   // ==0 or == -10
    echo "0123456789_NOGO"; 
}else if( $resultValid==1 ){
  echo "9876543210_". $numpostions. "_". "OKGO" ;
  // echo "0123456789OKGO"; 
}


?>
