<?php
// ver 3.3
session_start();
if (isset($_SESSION["user"])) {
   header("Location: index.php");
}
require_once "database.php";
/*
    WHERE public_html/ == YOUR ROOT OF YOUR WEBSITE i.e. https://algoz.ai/<here>

    public_html/index.php
    public_html/logo.jpg
    public_html/favicon.ico
    public_html/style.css
    public_html/styleboe.css
    
    public_html/login/database.php
    public_html/login/login.php
    public_html/login/registration.php
    public_html/login/forgotpwd.php
    public_html/login/forgotpwdreset.php

    public_html/login/encrypt.php
    public_html/login/gethttp.php
    public_html/login/sendemail.php

    public_html/userstats.html
    public_html/userstats.js
    

*/


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <title>algoz Login</title> -->
    <title><?php echo $webName; ?> Login</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">

    <style>
        /* Basic styling for the form and button */
        .form-group {
            position: relative; /* Position relative to contain the eye icon */
            width: 260px; /* Set a width for the form group */
            margin-bottom: 15px; /* Spacing at the bottom of the input field */
        }

        .form-control {
            width: 100%; /* Make the input full width within the form group */
            padding-right: 40px; /* Add padding on the right to avoid overlap with the eye icon */
        }

        .toggle-password {
            position: absolute; /* Position absolute to place it over the input */
            top: 50%; /* Center vertically */
            right: 10px; /* Position it near the right edge */
            transform: translateY(-50%); /* Center it vertically within the input field */
            cursor: pointer; /* Show pointer cursor on hover */
        }
    </style>


    <script>
        function passStringToPHP() {
            // Get the content of the div
            const divContent = document.getElementById('sys-vars').innerText;
            // Set the content into a hidden input field
            document.getElementById('hiddenInput').value = divContent;
        }
    </script>

</head>



<body>



<!--
        5 steps to integrate sys-vars from js to html to php to mysql:

        1. include src=userstats.js plus 6 lines below
        2. place these 2 lines under 'if (isset($_POST...' :   $sysvar$ = $_POST["str1ng1"];  // to get the POST'd hidden str1ng1
        3. place  hidden1nput, ref'in str1ng1 one line above submit
        4. at top of php's html, before </head> place:  'function passStr1ngToPHP() {...'
        5. add        <form action="login.php" method="post" onsubmit="passStr1ngToPHP()">

    -->
<script src="userstats.js"></script>
<div id="sys-vars" style="display: none;">userdataTmp</div>
<!-- <div id="sys-vars">userdataTmp</div> -->
<script>
        // document.getElementById('user-data').innerText = getScreenSize()+"|"+ detectDeviceType() +"|"+ detectOS()  +"|"+ detectBrowser();
        document.getElementById('sys-vars').innerText = getScreenSize()+"|"+ detectDeviceType() +"|"+ detectOS()  +"|"+ detectBrowser();
</script> 




    <div class="container">

        <div style="text-align: center;">

            <div class="logo1">
            <!-- <img src="logoalgoz.jpg" alt="Logo"> -->
            <img src="logo.jpg" alt="Logo">
            </div>
            </div>


      <?php
        date_default_timezone_set('America/New_York');
       
        require_once "encrypt.php";
        // require_once "database.php";

        // $projec tname="algoz";   // projec tName
        $projectMatch=0;
        $passwordMatch=0;
        $passwordHashMatch=0;
        $user_loc="nowhere";
        $user_lastDateTime="notrecent";
        $user_lastDay="noday";

         $pwdOn=0;  // pwd-related pwdHASH debugging
         $msg=0;    // general msgs

         $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
        //  $user_ip    = htmlspecialchars($user_ip);
         $user_ip    = $user_ipRaw ;
         if($msg==1) echo "UserIP=". $user_ip;


        // Get the current date and time
        $lastDateTime = date('Y-m-d H:i:s');    // Format: YYYY-MM-DD HH:MM:SS
        $lastDate = substr($lastDateTime, 0, 10 );
        $lastTime = substr($lastDateTime, -8);
        $lastDay = date('l');     // 'l' (lowercase 'L') for full textual representation of the day
        if($msg==1)  echo "  Current Date and Time in NYC: " . $lastDateTime. ",  $lastDay  $lastDate  time= $lastTime   <br />";



    if (isset($_POST["login"])) {
        $email    = $_POST["email"];
        $password = $_POST["password"];

        $sysvars  = $_POST["string1"];
        if($msg==1) echo "<br />***sys-vars =". $sysvars . "***<br />" ;

        $userID0= "0";
        $numvisits=0;




        //  uneeded...
        //
        // UPDATE `users` SET `lastIPaddr` = '2600:8801:3500:7160:51b5:f0eb:bc22:728c' WHERE `users`.`userId` = 12;
        $queryUpdateIP       = "UPDATE ". $tblname. " SET lastIPaddr   = '$user_ip' WHERE userId = :userId";
        $queryUpdateDateTime = "UPDATE ". $tblname. " SET lastDateTime = '$lastDateTime' WHERE userId = :userId";
        $queryUpdateSysVars  = "UPDATE ". $tblname. " SET sysvars      = '$sysvars' WHERE userId = :userId";

        // echo "<br />". $queryUpdateIP;
        // echo "<br />". $queryUpdateDateTime;
        // echo "<br />". $queryUpdateSysVars;
        // echo "<br />";
        

        // retr from dbase
    //    $passwordHash = encryptPassword($password);
        $passwordHash = sha1($password); 
        //    if (sha1($str) == "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0")

        if($msg==1) echo "<br />pwd / hash =". $password ."  /  " . $passwordHash ."<br />" ;

        // require_once "database.php";

        try{

            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
                $query  = "SELECT * FROM ". $tblname. " WHERE email = :email";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                // echo "<br />result==";
                //  print_r( $result) ;
                $i=0;
                foreach ($result as $key => $value) {
                    if($key=="userId"){
                        $userID0=$value;

                          if($msg==1)   echo "userID0== $userID0 <br />";
                    }

                    if($key=="numvisits"){
                        $numvisits=$value;
                        $numvisits++;
                         if($msg==1)   echo "<br />numvisits== $numvisits <br />";
                    }




                    // user loc  
                    if($key=="loc"){
                        $user_loc=$value;
                        $user_loc = str_replace('|', ' ', $user_loc);

                         if($msg==1)   echo "<br />user_loc== $user_loc <br />";
                    }

                    //   user_ lastDateTime
                    if($key=="lastDateTime"){
                        $user_lastDateTime=$value;
                    }

                    //   user _lastDay
                    if($key=="lastDay"){
                        $user_lastDay=$value;
                    }

                  


                    // pwds
                    if($key=="pwdhash" || $key=="password"){
                        if($msg==1) echo "<br />password-type field:   ";

                            // EVENTUALLY ELIM
                            if( $key=="password" ){
                                if($value== $password){
                                    if($msg==1) echo "Regular PASSWORD  MATCHES!";
                                    $passwordMatch=1;
                                }else  if($msg==1)  echo "Regular PASSWORD NO Match!";
                            }

                            if( $key=="pwdhash" ){
                                if($value== $passwordHash){
                                    if($msg==1) echo "encryptedPASSWORD  MATCHES!";
                                      $passwordHashMatch=1;    // $passwordMatch=1;

                                }else  if($msg==1)  echo "encryptedPASSWORD NO Match!";
                            }
                    }


                    if( $key=="project" ){
                        if($value== $projectName){
                            // if($msg==1) echo "PROJECT NAME =  $projectName  ";
                            if($msg==1)  echo "PROJECT NAME =  $projectName  ";
                            $projectMatch=1;     // $passwordHashMatch=1;    // $passwordMatch=1;

                        // }else   if($msg==1) echo "PROJECT NAME DOES NOT Match.";
                    }else  echo "PROJECT NAME DOES NOT Match.";
                }
                    if($msg==1) echo "<br />". $i.") ". $key . ": " . $value ;
                    $i++;

                }


            $insertdb=0;
            if ($result){    
            // if($result   &&   $projectMatch==1   &&  $passwordHashMatch==1   && $passwordMatch==1 ){

             if($pwdOn==1) echo "<br />] ALERT CHECK IF [ PASSWORD HASH ]  ACTUALLY MATCHES !!! + pwdhash + IF projectNAME  matches *** !!";

            $insertdb=0;
                    // if($msg==1) echo "<br />] $email found in user table! ". $result["password"]. " ". $result["userId"];      
                    if($pwdOn==1)  echo "<br />] $email found in user table! UPDATING!!!!  ". $result["password"]. " ". $result["userId"]. " UPDATING lastTstamp";
                
                    if($pwdOn==1) echo "<br />  proj,Hash,pwd MATCH = $projectMatch  ,   $passwordHashMatch  ,  $passwordMatch <br />";

                        // UPDATES HERE
                        //  UPDATE `users` SET `lastDateTime` = '2024-09-01 07:00:00', `sysvars` = 'xyzabcsysVar', `lastIPaddr` = '2600:8801:3500:7160:51b5:f0eb:bc22:9000' WHERE `users`.`userId` = 12;
                        $queryUpdateUser = "UPDATE ". $tblname. " SET lastDateTime = '$lastDateTime', lastDay = '$lastDay', lastDate = '$lastDate', lastTime = '$lastTime', sysvars = '$sysvars', lastIPaddr = '$user_ip', numvisits = '$numvisits'  WHERE userId = :userId";
                        if($msg==1) echo "<br />] queryUpdateUser==". $queryUpdateUser;
                        $stmt = $conn->prepare($queryUpdateUser);
                        $stmt->bindParam(':userId', $userID0);
                        $stmt->execute();
        

                    // close sess & assign $_SESSION["user"] 
                    // if(   $projectMatch==1   &&  $passwordHashMatch==1   && $passwordMatch==1 ){
                        if(   $projectMatch==1     &&   $passwordMatch==1  /* &&  $passwordHashMatch==1 */ ){
                                     $conn = null;
                                        session_start();
                                        $_SESSION["user"]  = $email ; 
                                        $_SESSION["userId"] = $userID0;    //   from indxmenu.php $userID0=$_SESSION["userId"];
                                        $_SESSION["numvisits"] = $numvisits;
                                        $_SESSION["userIP"] = $user_ip;
                                        $_SESSION["user_loc"] = $user_loc;
                                        
                                        $_SESSION["user_lastDateTime"] = $user_lastDateTime;
                                        $_SESSION["user_lastDay"] = $user_lastDay ;
                 

                                        // header("Location: indexmenu.php");
                                        header("Location: ../index.php");
                                        die();    
                   }


            } else {   
                        $insertdb=1;
                        // if($msg==1) echo "] NO USER found with that email.<br />";
                        $errorUserNotFound= $email. " not found; try again or Sign Up below.";
                        echo "<div class='alert alert-danger'>$errorUserNotFound</div>";

                        }


                
            } catch (PDOException $e) {
                $insertdb=-10;
                if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
            }
            $conn = null;        // Close the PDO connection
            if($msg==1) echo $br. " * PDO conn Closed. *";




            // close sess & assign $_SESSION["user"]  if all matches
            // if(   $projectMatch==1   &&  $passwordHashMatch==1   && $passwordMatch==1 ){
        //    if(       $passwordHashMatch==1   && $passwordMatch==1 ){
        //             session_start();
        //         $_SESSION["user"] =$email ; 
        //         $_SESSION["userId"] = $userID0;    //   from indxmenu.php $userID0=$_SESSION["userId"];

        //         header("Location: indexmenu.php");
        //         die();    

        // if(   $projectMatch==1   &&  $passwordHashMatch==1   && $passwordMatch==1 ){
            if(  $passwordMatch!=1 ){
                    $errorUserNotFound="Bad Password for project: $projectName, try again.";
                        echo "<div class='alert alert-danger'>$errorUserNotFound</div>";
                //  
            }
        //     }else {
        //         $errorUserNotFound="Bad Password for project: $projectName, try again.";
        //         echo "<div class='alert alert-danger'>$errorUserNotFound</div>";
        //     }


        }// if  (isset($_POST["login"])) {

        ?>


      <form action="login.php" method="post" onsubmit="passStringToPHP()">
        
        <div style="text-align: center;">
        <!-- <h1>Welcome to <strong>algoz.ai</strong> !</h1> -->
        <h1> <strong>Welcome!</strong> </h1>
        </div>
  
        <div class="form-group" >
            <input type="email" placeholder="Email:" name="email" class="form-control">
        </div>


<!--   old pwd
        <div class="form-group">
            <input type="password" placeholder="Password:" name="password" class="form-control">
        </div> -->
         

        <div class="form-group" >
             <input type="password" placeholder="Password:" name="password" class="form-control" id="password">
             <!-- Eye icon for toggling password visibility -->
              <i class="toggle-password" onclick="togglePasswordVisibility()">👁️</i>
        </div>

        <div class="form-btn">
            <input type="hidden" id="hiddenInput" name="string1">
            <input type="submit" value="    Login    " name="login" class="btn btn-primary">
        </div>
      </form>

      <div></div>




      <div style="text-align: center;">
        <p>Not registered? <a href="registration.php">Sign up here</a></p>
      </div>
      <div></div>

      <!-- <div><p id="forgotpwd" style="font-size: 10px;">Forgot Password? <a href="forgotpwd.php">Click here</a></p></div> -->
      <div style="text-align: center;">
        <p id="forgotpwd" style="font-size: 12px;"> <a href="forgotpwd.php">Forgot Password?</a></p>
      </div>
    
     </div>


    <script>
        // JavaScript function to toggle password visibility
        function togglePasswordVisibility() {
            var passwordInput = document.getElementById("password");
            // Toggle between password and text input types
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        }
    </script>

</body>
</html>