<?php


/**
 
 
 //                         DAVID PLEASE USE  // DOS 05.21.15  AS YOUR COMMENT BLOCK HEADER (WHEREEVER YOU CHANGE CODE)
 //                                 THIS WAY WE CAN QUICKLY SEARCH THE FILES...
 //
    by John Botti    07/31/13 ..8/27/13
 //
 //
 //
 avatarSend3insert.php             Version _____________2.2
 
 * .php - Unity to SQL Database Connection
 */

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


 

?>



