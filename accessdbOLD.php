<?php
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
//

*/

//
//
////////////// *************************************************
////////////// *************************************************
////////////// *************************************************  accessdb.php Copyright (c) 2023-2026 by Algo Investor Inc
////////////// **                                                   written by John Botti
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
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 
                                                      $vers = "1.03";

$todaysdate = date('Y-m-d');
echo "\n\n] accessdb.php $vers is running, Time in NYC = $todaysdate \n";

//exit("bye");

/*



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



$prgname="accessdb.php";

$servername = "localhost"; // Replace with your server name
$username = "roguequant1";
$happy1 = "Vegas2024!";
$password1 = "Egw2B4f*q@z_$";
$dbname = "u151710353_algotrades";
$tblname ="trades";

echo "*****************\n";
echo "*****************\n";

//echo "] **** Greetings, Creator. We are currently running:   $prgname   $servername :  $username / $password1  $dbname $tblname  ...  ********\n";

echo "*****************\n";
echo "*****************\n";

echo "\n*\n] Accessing https://algoinvestorr.com/*_". $dbname. "[". $username"]_". $tblname. "\n*\n*\n*\n";
echo "*****************\n";
echo "*****************\n";
echo "*****************\n";


exit("\n] ".  $prgname. ": Script execution terminated.\n\n");

/*

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);

    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert a sample trade into the 'trades' table
    $insertQuery = "INSERT INTO trades (tradeDateTime, userId, accountId, tradeType, tradeSize, tradePrice) 
                    VALUES ('2023-12-31 23:59:59', 'sampleUser', 'sampleAccount', 'Buy', 100, 50.25)";
    $conn->exec($insertQuery);
    $lastInsertedId = $conn->lastInsertId();

    echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";

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
?>
