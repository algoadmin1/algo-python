<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>algoz Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">

    <style>
        /* Basic styling for the form and button */
        .form-group {
            position: relative; /* Position relative to contain the eye icon */
            width: 320px; /* Set a width for the form group */
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

<script src="userstats.js"></script>

<div id="sys-vars" style="display: none;">userdataTmp</div>
<!-- <div id="sys-vars">userdataTmp</div> -->

<script>
        // document.getElementById('user-data').innerText = getScreenSize()+"|"+ detectDeviceType() +"|"+ detectOS()  +"|"+ detectBrowser();
        document.getElementById('sys-vars').innerText = getScreenSize()+"|"+ detectDeviceType() +"|"+ detectOS()  +"|"+ detectBrowser();
</script> 





    <div class="container">
      <?php
        date_default_timezone_set('America/New_York');
       
        require_once "encrypt.php";

        $projectname="algoz";
        $projectMatch=0;
        $passwordMatch=0;
        $passwordHashMatch=0;

        //  $msg=1;
         $msg=0;
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

        require_once "database.php";

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
                        // if($msg==1) 
                        echo "userID0== $userID0 <br />";
                    }

                    if($key=="numvisits"){
                        $numvisits=$value;
                        $numvisits++;
                        // if($msg==1) 
                        echo "<br />numvisits== $numvisits <br />";
                    }


                    // pwds
                    if($key=="pwdhash" || $key=="password"){
                        if($msg==1) echo "<br />password-type field:   ";

                            if( $key=="password" ){
                                if($value== $password){
                                    if($msg==1) echo "Regular PASSWORD  MATCHES!";
                                    $passwordMatch=1;
                                }else  if($msg==1)  echo "Regular PASSWORD NO Match!";
                            }

                            if( $key=="pwdhash" ){
                                if($value== $passwordHash){
                                    if($msg==1) echo "encryptedPASSWORD  MATCHES!";
                                $passwordHashMatch=1;
                                }else  if($msg==1)  echo "encryptedPASSWORD NO Match!";
                            }
                    }



                    if( $key=="project" ){
                        if($value== $projectname){
                            if($msg==1) echo "PROJECT NAME =  $projectname  ";
                           $projectMatch=1;
                        }else   if($msg==1) echo "PROJECT NAME DOES NOT Match.";
                    }
 
                    echo "<br />". $i.") ". $key . ": " . $value ;
                    $i++;

                }


                $insertdb=0;
                if ($result){    
                    
                    echo "<br />here check for pwd + hash +project match********* !!";


                    $insertdb=0;
                    if($msg==1) echo "<br />] $email found in user table! ". $result["password"]. " ". $result["userId"];      


                        // UPDATES HERE
                        //  UPDATE `users` SET `lastDateTime` = '2024-09-01 07:00:00', `sysvars` = 'xyzabcsysVar', `lastIPaddr` = '2600:8801:3500:7160:51b5:f0eb:bc22:9000' WHERE `users`.`userId` = 12;
                        $queryUpdateUser = "UPDATE ". $tblname. " SET lastDateTime = '$lastDateTime', lastDay = '$lastDay', lastDate = '$lastDate', lastTime = '$lastTime', sysvars = '$sysvars', lastIPaddr = '$user_ip', numvisits = '$numvisits'  WHERE userId = :userId";
                        if($msg==1) echo "<br />] queryUpdateUser==". $queryUpdateUser;
                        $stmt = $conn->prepare($queryUpdateUser);
                        $stmt->bindParam(':userId', $userID0);
                        $stmt->execute();
        
                        // $resultQ1 = $stmt->fetch(PDO::FETCH_ASSOC);
                        // echo "<br />resultQ1==";
                        // print_r( $resultQ1 ) ;



                    // close sess & assign $_SESSION["user"] 

                    // session_start();
                    // $_SESSION["user"] =$email ; 
                    // header("Location: index.php");
                    // die();    

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



        }// if  (isset($_POST["login"])) {

        ?>


      <form action="login.php" method="post" onsubmit="passStringToPHP()">
        
        <div style="text-align: center;">
           <h1>Welcome to <strong>algoz.ai</strong> !</h1>
        </div>
  
        <div class="form-group">
            <input type="email" placeholder="Email:" name="email" class="form-control">
        </div>


<!--   old pwd
        <div class="form-group">
            <input type="password" placeholder="Password:" name="password" class="form-control">
        </div> -->

        <div class="form-group">
             <input type="password" placeholder="Password:" name="password" class="form-control" id="password">
             <!-- Eye icon for toggling password visibility -->
              <i class="toggle-password" onclick="togglePasswordVisibility()">👁️</i>
        </div>

        <div class="form-btn">
            <input type="hidden" id="hiddenInput" name="string1">
            <input type="submit" value="Login" name="login" class="btn btn-primary">
        </div>
      </form>






      <div style="text-align: center;">
        <p>Not registered yet? <a href="registration.php">Sign up here</a></p>
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