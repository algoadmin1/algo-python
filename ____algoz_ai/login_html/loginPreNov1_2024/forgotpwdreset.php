<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: ../index.php");
}
//  .php?em=abc@yahoo.com
if(isset( $_GET['em'] )){
    $emailPwdReset = $_GET['em'] ;
}else{
    $emailPwdReset = "nil";
}
if(! (isset(  $_SESSION["pwd2reset"] )) ){
    $_SESSION["pwd2reset"]=$emailPwdReset;
}
    $emailPwdReset1=$_SESSION["pwd2reset"];

require_once "database.php";

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <title>algoz Password Recovery</title> -->
    <title><?php echo $projectName; ?> Password Recovery</title>
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

</head>
<body>
    <div class="container">
        <div style="text-align: center;">
            <div class="logo1">
                <img src="logo.jpg" alt="Logo">
                </div>
            </div>      

    <?php
        require_once "sendemail.php";
        // require_once "database.php";

        $msg=0;
        $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
        $user_ip    = $user_ipRaw ;
        if($msg==1) echo "UserIP=". $user_ip;
        // $password_len=5;
        $pwd_ok=false;


if(isset($_POST["resetpwd"])) {

    $newpassword = $_POST["password"];
    $passwordHash = sha1($password); 

    if($msg==1) echo "] rec'ving pwd to $newpassword, $passwordHash <br />";  // if($msg==1)

    if (strlen($newpassword)<$password_len_min) {
        $errorUserFound="Password must be at least $password_len_min charactes long, try again.";
        echo "<div class='alert alert-danger'>$errorUserFound</div>";
        $pwd_ok=false;
    }else{
        $pwd_ok=true;
    }


    if($pwd_ok==true){ 
                $email    =  $emailPwdReset1;

                try{

                        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
                            $query  = "SELECT * FROM ". $tblname. " WHERE email = :email";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':email', $email);
                            $stmt->execute();

                            $result = $stmt->fetch(PDO::FETCH_ASSOC);     // print_r( $result) ;
                            $j=0;
                            $projectmatch=false;

                            if( $result ){
                                    foreach ($result as $key => $value) {
                                        if( $key=="project" ){
                                            if($msg==1 ) {
                                                echo "project-type field:   ";
                                                echo $j.") ".$key . ": " . $value . "<br />";
                                            }
                                            //loop in case multiple projects
                                            if($value==$projectName)  $projectmatch=true ;
                                        }
                                        if($msg==1)  echo $j.") ".$key . ": " . $value . "<br />";
                                        //  echo $j.") ".$key . ": " . $value . "<br />";
                                        $j++;
                                    }//foreach
                            }//if
                            $prm="projectmatch==false";
                            if($projectmatch==true) $prm="projectmatch==true";

                                $insertdb=0;     // assume no email found ie result==null  and chk   $projectmatch==true 
                                if ( $result &&  $projectmatch==true ){  
                                                                    
                                    $insertdb=1;
                                    $userId1=$result["userId"];

                                    // echo "] $email found in user table, userId== #". $userId1 .  ' pr==='. $projectName. "=== true/false==". $prm ;      
                                    // echo "almost UPDATING here ~~~~~~---==+ ".  $emailPwdReset1. " to NEW: ".  $newpassword ." and ".  $passwordHash. "<br />";

                                    $insertdb=2;

                                } else {
                                        $insertdb=0; $tstr=" ";
                                        if($projectmatch==false){ // email found but
                                            $tstr="in $projectName project";
                                        }
                                        $errorUserNotFound= $email. " not found $tstr ; try again or Login/SignUp below.";
                                        echo "<div class='alert alert-danger'>$errorUserNotFound </div>";
                                        }

                        } catch (PDOException $e) {
                            $insertdb=-10;
                            if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
                            die();
                        }
                        $conn = null;    if($msg==1) echo $br. " * PDO conn Closed. *";




            if($insertdb==2){

                try{
                        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors


                        // echo "]UPDATE $email found in user table, userId== #". $userId1 .  ' pr==='. $projectName. "=== true/false==". $prm ;      
                        // echo "]UPDATE almost UPDATING here ~~~~~~---==+ ".  $emailPwdReset1. " to NEW: ".  $newpassword ." and ".  $passwordHash. "<br />";


             // UPDATES HERE
                        //     //  UPDATE `users` SET `password` = '$newpassword', `passwordHash` = '$passwordHash' WHERE `users`.`userId` = $userId;
                        $queryUpdateUser = "UPDATE ". $tblname. " SET password = '$newpassword', pwdHash = '$passwordHash'   WHERE userId = :userId";
                        if($msg==1) echo "<br />] queryUpdateUser==". $queryUpdateUser;
                        $stmt = $conn->prepare($queryUpdateUser);
                        $stmt->bindParam(':userId', $userId1);
                        $stmt->execute();
                                
                }catch (PDOException $e) {
                    $insertdb=-10;
                    if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
                    die();
                }

                $conn = null;    if($msg==1) echo $br. " * PDO conn Closed. *";

                $insertdb=3;

            }


            if($insertdb==3){
                // echo "<div class='alert alert-success'>Password Reset !</div>";
                // echo "<div class='alert alert-success'>Password Reset !!! to $newpassword , $passwordHash </div>";
                echo "<div class='alert alert-success'>Password Reset !  </div>";
                echo '<div style="text-align: center;"><p><a href="'.$linkLogin .'">Click to Login</a></p></div>';

                die();
            }else if($insertdb==1) {
                echo "<div class='alert alert-danger'>DBase UPDATE did not work.</div>";
            }

    }// if pwdok==true


}// if (isset($_POST["submit"])) {

    ?>
        

        <form action="forgotpwdreset.php" method="post">
        <!-- <form action="login.php" method="post" onsubmit="passStringToPHP()"> -->

        <div style="text-align: center;">
        <!-- <h1>Welcome to <strong>algoz.ai</strong> !</h1> -->
        <h1> <strong>RESET Password</strong> </h1>

        <p><?php echo "for: ". $emailPwdReset1 ." "; ?></p>
        </div>

      <div></div>
      <div>
          <p>Enter your new password.</p>
      </div>
  
        <div class="form-group" >
             <input type="password" placeholder="New Password:" name="password" class="form-control" id="password">
             <!-- Eye icon for toggling password visibility -->
              <i class="toggle-password" onclick="togglePasswordVisibility()">👁️</i>
        </div>

        <div class="form-btn">
            <input type="submit" value="Reset My Password" name="resetpwd" class="btn btn-primary">
        </div>
      </form>
</div> <!-- container -->


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