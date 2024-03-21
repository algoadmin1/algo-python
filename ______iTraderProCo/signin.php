<?php

/** 
                    by John Botti 08.20.2020,   10/14/13, 02.07.15
       aiDTregister.php - adapted from: userNewsignup.php    Version __________    - w/ NEW geobytes.com ___                   ver 5.4
//                                                                                 - with returning unique user ID #
* .php - Unity to SQL Database Connection
**/

//date_default_timezone_set("America/New_York");
//$nyTime == date("h:i:sa"). " on ".  date("Y-m-d") ;

//date_default_timezone_set("America/LosAngeles");

//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York");
$nyTime = date("h:i:sa"). " on ".  date("Y-m-d") ;
date_default_timezone_set("America/Los_Angeles");

$verNo="2.0";
$last_id ="";

$msgs=0;

$searchQuery0 = $_POST["useremail"];
$searchQuery1 = $_POST["pwd"];

    
if($msgs==1){
    echo "] Reached Server... vers. $verNo <br />] The Time in New York is $nyTime, this system is running on PST. <br />";
    echo "] ATTEMPTING TO CONTACT the iTraderPro JH server...<br />". date("h:i:sa"). " on ".  date("Y-m-d") ;
}
/*

//whether ip is from share internet
if (!empty($_SERVER['HTTP_CLIENT_IP']))   
  {
    $ip_address = $_SERVER['HTTP_CLIENT_IP'];
  }
//whether ip is from proxy
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
  {
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
  }
//whether ip is from remote address
else
  {
    $ip_address = $_SERVER['REMOTE_ADDR'];
  }
echo $ip_address;

*/


/*

aideeptr_jb_jackabee_Users1   //18.69 KB    
aideeptr_jb_aideeptrader    
aideeptr_jb_jackabeejohn    

*/

 // DOS 05.21.15  OPEN mySqli database
 //   $con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
    $con = mysqli_connect("localhost", "itraderp_jb_jackabeejohn", "jackabee66", "itraderp_jb_jackabee_Users1");
    if (!$con) die('Could not connect to itraderp_***kabee_Users1: ' . mysqli_error($con));
    mysqli_select_db($con, "itraderp_jb_jackabee_Users1") or die ("DB select failed - " . mysqli_error($con));
     // DOS 05.21.15


if($msgs==1){
    echo "] CONNECTED TO DATABASE...we're in and Live ON HTTPS:// !!!<br />";
echo "] _POST[useremail] = $searchQuery0 <br />";
echo "] _POST[pwd]] = $searchQuery1 <br /> <br />";
echo "] Welcome oh, great Creator to iTraderPro !<br />";
}


$userValid=0;     // 0= email no match, 1= email match, 2= password invalid

$passwordSHA1 = sha1($searchQuery1);
$lowerEmail = strtolower($searchQuery0);

$username0  =" ";
$username0  = strtok($lowerEmail, "@");          // $username0 = jbotti   from jbotti@laskdj.com

$email0 = $lowerEmail;          // $toUserNamesCheck1


if($msgs==1) echo "pwd==". $passwordSHA1. " ". $lowerEmail. " ,  username0==". $username0. ", ". date("h:i:sa"). " on ".  date("Y-m-d"). ".<br />";


// | aiemail       | varchar(256) | NO   |     | NULL              |                |

$query5 = "SELECT * FROM users      WHERE    aiemail LIKE '$lowerEmail'";


// DOS 05.21.15
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 
$j = 0;
$id=-1;
$pwd="";
$tStamp="";
$last_id ="nil";

while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd                  = $row['pwd'];
    $data_timeStamp            = $row['timeStamp'];
    $data_aiUsername           = $row['aiUsername'];
    
    if($j==0)
    {
        $id = $data_id;
        $pwd = $data_pwd;  // careful here - unused?  clean up
        $tStamp = $data_timeStamp;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while

 //  PASSWORD MATCH !   userName: john,  id=3, pwd= ,so1314==,so1314
if($id>0)  // we found at least 1 w/ same userName
{
    



    if($msgs==1) echo "&Username Exists! $id, $pwd, $tStamp <br /> <br />] Checking Password MATCH... <br /><br /><br />";

    if ($pwd == $passwordSHA1 ){
            $userValid=1;

           
    if($msgs==1)  echo "] Password DOES MATCH!!<br />$pwd<br />$passwordSHA1<br /><br />] WELCOME to aiDeepTrader, $data_aiUsername !!<br />";
    }else{

     //echo "] Password DOES NOT MATCH, Please click here to try again:<br />";
            $userValid=2;

           // echo '<h1 style="color:Tomato;">Password invalid.</h1>';

           //  $href02 = '"https://itraderpro.co/"';

           // echo "<h1>Please try to Sign In again: <a href=$href02>iTraderPro Sign In</a></h1>";

}

   
    if($msgs==1) echo "] Getting Session ID for Secure Access, $username0...<br />] Exiting... {54} <br />";
    $last_id ="userID== $id, no data inserted... ";
  
}else{
     // echo "  No User Found - We DO NOT MATCH THAT USER EMAIL [ $lowerEmail ]!!!  - Aborting -   <br />";
    
    if($msgs==1) echo " DID NOT INSERT. Exiting...<br />";

// for now use NO USE EXIST LOGIN --> === REGISTER TEST USERS *****
 // $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, aiemail, timeStamp)   VALUES  ('NULL' ,     '$username0' ,'$passwordSHA1',   '$email0',   '$email0',     CURRENT_TIMESTAMP)";

 //   		// DOS 05.21.15
 //        $resultJB1 = mysqli_query($con, $insertStr); 
 //        $last_id = mysqli_insert_id($con);


// from avattire
 // $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, IPaddress, lon, lat, alt, instagram_id, city, state, country, gender, device, signupTime, timeStamp )  VALUES ( 'NULL' ,  '$username0' ,  '$passwordSHA1',   '$email0', '$IPaddress', '$IPlong', '$IPlat', '$altInit', '$instagramName', '$city', '$state', '$country',  '$gender',  '$device',  '$signupTime',    CURRENT_TIMESTAMP )";
      

 }//else


/*

$passwordSHA1 = sha1($searchQuery1); 
$toUserNamesCheck1 = strtolower($searchQuery0);


$username0 = $toUserNamesCheck1;

$query5 = "SELECT * FROM users      WHERE    userName LIKE '$toUserNamesCheck1'";

// DOS 05.21.15
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 
$j = 0;
$id=-1;
$pwd="";

while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd               = $row['pwd'];
    $data_timeStamp          = $row['timeStamp'];
    
    if($j==0)
    {
        $id = $data_id;
        $pwd = $data_pwd;  // careful here - unused?  clean up
        $tStamp = $data_timeStamp;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while

 //  PASSWORD MATCH !   userName: john,  id=3, pwd= ,so1314==,so1314
 if($id>0)  // we found at least 1 w/ same userName
{
    echo "&Username Exists! $username0, $password0, $email0\n";
  
}else{
  //  echo "  No User Found - Inserting";
 
        $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, IPaddress, lon, lat, alt, instagram_id, city, state, country, gender, device, signupTime, timeStamp )  VALUES ( 'NULL' ,  '$username0' ,  '$passwordSHA1',   '$email0', '$IPaddress', '$IPlong', '$IPlat', '$altInit', '$instagramName', '$city', '$state', '$country',  '$gender',  '$device',  '$signupTime',    CURRENT_TIMESTAMP )";
        
        
        $subjectStr = "$username0 from $city, $state, $country, IP==[$IPaddress] at $signupTime,  - '$email0','$gender','$device'...";
           
        // DOS 05.21.15
        $resultJB1 = mysqli_query($con, $insertStr); 
        $last_id = mysqli_insert_id($con);

        mysqli_close($con);
        unset($con );
        // DOS 05.21.15
        
 }





//************************************************************
<html>
<body>

<form action="welcome.php" method="post">
Name: <input type="text" name="name"><br>
E-mail: <input type="text" name="email"><br>
<input type="submit">
</form>

</body>
</html>

// *******************************************************************
// welcome.php

<html>
<body>

Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?>

</body>
</html>





<?php
//whether ip is from share internet
if (!empty($_SERVER['HTTP_CLIENT_IP']))   
  {
    $ip_address = $_SERVER['HTTP_CLIENT_IP'];
  }
//whether ip is from proxy
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
  {
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
  }
//whether ip is from remote address
else
  {
    $ip_address = $_SERVER['REMOTE_ADDR'];
  }
echo $ip_address;
?>







//-********************************************************************************************************************
//    $splitChars = " ,";
    $splitChars = ",";

$afterAdrsee = strpbrk($searchQuery,$splitChars);
$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd

$userLoginData = explode(",", $afterAdrsee); 

//$username0 = $avName;
$password0     = $userLoginData[1];
$email0        = $userLoginData[2];
$gender        = $userLoginData[3];
$signupTime    = $userLoginData[4];
$IPaddress     = $userLoginData[5];
$device        = $userLoginData[6];
$language      = $userLoginData[9];             // case of device not being cleaned
$language1      = $userLoginData[10];
if( $language=="4321" )     // ||  $language1=="6" ||  $language1=="5"  ||  $language1=="4" ||  $language1=="3" ||  $language1=="2" || $language1=="1" )
{
        $language= $language1;              // if device== 'iPhone5,2' then 3,4321,language = 8,9,10  vs 7,8,9  Lang is last one
}

 
$passwordSHA1 = sha1($password0);
$password = $afterAdrsee;
$toUserName = $avName;
$toUserNamesCheck = $avName;
$toUserNamesCheck1 = strtolower($toUserNamesCheck);
$username0 = $toUserNamesCheck1;

$query5 = "SELECT * FROM users      WHERE    userName LIKE '$toUserNamesCheck1'";

// DOS 05.21.15
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 
$j = 0;
$id=-1;
$pwd="";

while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd               = $row['pwd'];
    $data_timeStamp          = $row['timeStamp'];
    
    if($j==0)
    {
        $id = $data_id;
        $pwd = $data_pwd;  // careful here - unused?  clean up
        $tStamp = $data_timeStamp;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while

 //  PASSWORD MATCH !   userName: john,  id=3, pwd= ,so1314==,so1314
 if($id>0)  // we found at least 1 w/ same userName
{
    echo "&Username Exists! $username0, $password0, $email0\n";
  
}else{
  //  echo "  No User Found - Inserting";
 
        $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, IPaddress, lon, lat, alt, instagram_id, city, state, country, gender, device, signupTime, timeStamp )  VALUES ( 'NULL' ,  '$username0' ,  '$passwordSHA1',   '$email0', '$IPaddress', '$IPlong', '$IPlat', '$altInit', '$instagramName', '$city', '$state', '$country',  '$gender',  '$device',  '$signupTime',    CURRENT_TIMESTAMP )";
        
        
        $subjectStr = "$username0 from $city, $state, $country, IP==[$IPaddress] at $signupTime,  - '$email0','$gender','$device'...";
           
        // DOS 05.21.15
        $resultJB1 = mysqli_query($con, $insertStr); 
        $last_id = mysqli_insert_id($con);

        mysqli_close($con);
        unset($con );
        // DOS 05.21.15
        
 }
//-********************************************************************************************************************

date_default_timezone_set("America/New_York");
echo "The time is " . date("h:i:sa");

*/
 //EOF PHP script...

 	
if($msgs==1)	echo "<br />] Closing MySql DB... ";

        mysqli_close($con);
        unset($con );


if($msgs==1)      echo "] last_id = $last_id ; Connection unset.  DataBase Closed at ". date("h:i:sa"). " on ".  date("Y-m-d") ;


echo "<br /><br /><br />";

if($userValid==1){
    $href00= '"https://itraderpro.co/candlesticks.php?sym=spy&uname='. $data_aiUsername. '"';
    echo "<h1>Welcome $data_aiUsername to <a href=$href00>iTraderPro</a></h1>";
}else if($userValid==0){

       echo "<br /><br /><br />";

       echo "<h1>EMAIL: $lowerEmail </h1>";
       echo "<br />";

       echo '<h1 style="color:Tomato;">No User found for this email!</h1>';

       $href01 = '"https://itraderpro.co/"';

       echo "<h1>Please try to Sign In again: <a href=$href01>iTraderPro Sign In</a></h1>";

}else if($userValid==2){

           echo '<h1 style="color:Tomato;">Password invalid.</h1>';

            $href02 = '"https://itraderpro.co/"';

           echo "<h1>Please try to Sign In again: <a href=$href02>iTraderPro Sign In</a></h1>";

}
// echo "<p>CLICK for Private Access: <a href=$href00>aiDeepTrader</a></p>";
if($msgs==1) echo "<br /><br /><br />EOF.";

?>
