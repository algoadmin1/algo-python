<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: ../index.php");
}
  
require_once "database.php";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <title>algoz Password Recovery</title>   projectName -->
    <title><?php echo $projectName; ?> Password Recovery</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <style>
 
        /* Basic styling for the form and button */
        .form-group {
            position: relative; /* Position relative to contain the eye icon */
           /* width: 260px;   Set a width for the form group */
            width: 100%; /* Set a width for the form group */
            margin-bottom: 15px; /* Spacing at the bottom of the input field */
 
            text-align: left;

        }

        .form-control {
            width: 100%; /* Make the input full width within the form group */
            padding-right: 40px; /* Add padding on the right to avoid overlap with the eye icon */
        }

        .logo1 {
            position: relative;
            width: 100%;
        }

    </style>

</head>
<body>
    <div class="container">

        <div style="text-align: center;">

            <div class="logo1">
            <!-- <img src="logoalgoz.jpg" alt="Logo"> -->
            <img src="logo.jpg" alt="Logo">
            </div>
            </div>      

        <?php
            require_once "sendemail.php";
            // require_once "database.php";
            // $linkLogin="https://algoz.ai/login";
            // $linkResetPwd="https://algoz.ai/login/forgotpwdreset.php";
          

            $msg=0;
            $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
            $user_ip    = $user_ipRaw ;     //  $user_ip    = htmlspecialchars($user_ip);
            if($msg==1) echo "UserIP=". $user_ip;


// from registration.php
//
        // if (isset($_POST["submit"])) {
            /// FIX !!!!
            // $fullName = $_POST["fullname"];
            // /// FIX !!!!
            // $phonenum = $fullName;
            // $email    = $_POST["email"];
            // $password = $_POST["password"];
 
            // $sysvars  = $_POST["string1"];
            // if($msg==1) echo "<br />***sys-vars =". $sysvars . "***<br />" ;
 

        if (isset($_POST["forgot"])) {

            // echo "got PAST FORGOT....";
            // echo "<br />Please check your inbox and spam folder.<br /><br />";
            $email    = $_POST["email"];
            //    $password = $_POST["password"];

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
                                    // pwd match does NOT matter only email & project
                                    // if($key=="pwdhash" || $key=="password"){
                                    //     if($msg==1) echo "password-type field:   ";
                                    //     if($msg==1) echo $j.") ".$key . ": " . $value . "<br />";
                                    // }
                                    if( $key=="project" ){
                                        if($msg==10 ) {
                                            echo "project-type field:   ";
                                            echo $j.") ".$key . ": " . $value . "<br />";
                                        }
                                        //loop in case multiple projects
                                        if($value==$projectName)  $projectmatch=true ;
                                    }
                                    if($msg==1)  echo $j.") ".$key . ": " . $value . "<br />";
                                    $j++;
                                }//foreach
                        }//if


        // assume no email found ie result==null  and chk   $projectmatch==true 
                        $insertdb=0;
                        if ( $result &&  $projectmatch==true ){  
                                                             
                            $insertdb=1;
                            // if($msg==1) echo "] $email found in user table! ". $user["password"]. " ". $user["userId"];      
                            if($msg==1) echo "] $email found in user table! ". $result["password"]. " ". $result["passwordHash"]. " ". $result["userId"];      

                            SendAndHandleForgotEmail( $email );

                            // die();

                            // to start a sess
                            // session_start();
                            // $_SESSION["user"] =$email ; 
                            // header("Location: index.php");
                            // die();    

                        } else {
                                $insertdb=0; $tstr=" ";
                                if($projectmatch==false){ // email found but
                                    $tstr="in $projectName project";

                                }
                                // if($msg==1) echo "] NO USER found with that email.<br />";
                                $errorUserNotFound= $email. " not found $tstr ; try again or Login/SignUp below.";
                                echo "<div class='alert alert-danger'>$errorUserNotFound </div>";
                                }

                    } catch (PDOException $e) {
                        $insertdb=-10;
                        if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
                        die();
                    }
                    $conn = null;    if($msg==1) echo $br. " * PDO conn Closed. *";


        }// if (isset($_POST["submit"])) {

        if($insertdb==1) die();



/*
                userId: 2
                userInitTimestamp: 2024-08-29 04:50:22
                phonenum: 6175551212
                fullName: craps team
                password: abcdefgh
                email: mitcrapsteam@gmail.com
                pwdhash:
                lastDateTime:
                lastDate:
                lastTime:
                lastDay:
                brokerId:
                initIPaddr:
                lastIPaddr:
                lastSymbol:
                mostSymbols:
                tradeRawId: 0
                tradeSize:
                traderAUM:
                lastPrice: 0
                optionStrategy:
                ] mitcrapsteam@gmail.com found in user table! abcdefgh 2 * PDO conn Closed. *
*/

    ?>
        





        <!-- <form action="login.php" method="post"> -->
        <form action="forgotpwd.php" method="post">

        <div style="text-align: center;">
        <!-- <h1>Welcome to <strong>algoz.ai</strong> !</h1> -->
        <h1> <strong>Forgot Password</strong> </h1>
        </div>

      <!-- <div><h1>Welcome to <strong>algoz.ai</strong> !</h1></div> -->
      <!-- <div><h1>Enter your email for algoz.ai</h1></div> -->
      <!-- <div><h1>Enter your email</h1></div> -->
      <div></div>
      <div>
      <p>We will send you a link to your email.</p>
      </div>
  
        <div class="form-group">
            <input type="email" placeholder="Email:" name="email" class="form-control">
        </div>
        <!-- <div class="form-group">
            <input type="password" placeholder="Password:" name="password" class="form-control">
        </div> -->
        <div class="form-btn">
            <input type="submit" value="Email me a password link" name="forgot" class="btn btn-primary">
        </div>

      </form>
      <div> </div>
      <div> </div>

      <div style="text-align: center;">
      
      <!-- <div><p>Already Registered? <a href="login.php">Login here</a></p></div> -->
      <div><p> <a href="login.php">Login or SignUp here</a></p></div>
      <!-- <p><a href="'.$linkLogin .'">Click to Login or SignUp</a></p> -->
      </div>

      <!-- <div><p>Not registered yet? <a href="registration.php">Sign up here</a></p></div>
      <div></div>
      <div><p id="forgotpwd" style="font-size: 10px;">Forgot Password? <a href="forgotpwd.php">Click here</a></p></div> -->
      </div>
</body>
</html>