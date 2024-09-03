<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: indexmenu.php");
}

//  .php?em=abc@yahoo.com
if(isset( $_GET['em'] )){
    $emailPwdReset = $_GET['em'] ;
}else{
    $emailPwdReset = "nil";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>algoz Password Recovery</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">


        <div style="text-align: center;">

            <div class="logo1">
                <img src="logoalgoz.jpg" alt="Logo">
                </div>
            </div>      

        <?php
        require_once "sendemail.php";

        $linkLogin="https://algoz.ai/login";
        //  $msg=1;
         $msg=0;
         $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
        //  $user_ip    = htmlspecialchars($user_ip);
         $user_ip    = $user_ipRaw ;

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
 


        if (isset($_POST["resetpwd"])) {

            // echo "got PAST FORGOT....";
            // echo "<br />Please check your inbox and spam folder.<br /><br />";
            $email    = $_POST["email"];
            //    $password = $_POST["password"];

            $subject="algoz.ai - RESET PASSWORD LINK";
            $message="Please click the link below to enter a new password.<br />". '<div style="text-align: center;"><p><a href="'.$linkLogin .'">Click to Login</a></p></div>"';
            $from="algoinvestorr@gmail.com";
           // SendEmailToUser($email, $subject, $message, $from);



            // $email1 = substr($email, 0, 3 );   check your inbox and spam folder
            // echo "<div class='alert alert-success'>Check your inbox at: $email </div>";


            echo "<div class='alert alert-success'>Password Reset.</div>";

            // echo "<br />Click for Login: ";
            /*
                  <p><a href="https://nytrader.wordpress.com/sniper-trading/">MTWTF</a>   <a href="https://cnbc.com">CNBC.com</a>   <a href="https://stockcharts.com">STOCKCHARTS.com</a>  <a href="https://finance.yahoo.com">YAHOO FINANCE</a> </p>
            */
            // $linkLogin="https://algoz.ai/login";
            // <div style="text-align: center;">

            echo '<div style="text-align: center;"><p><a href="'.$linkLogin .'">Click to Login</a></p></div>';
            // echo '<a href="' . htmlspecialchars($link9) . '" style="color: blue;">' . htmlspecialchars($link) . '</a>';

            die();


        require_once "database.php";

     // new
        try{

            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
                $query  = "SELECT * FROM ". $tblname. " WHERE email = :email";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->execute();


                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                // echo "...";
                // print_r( $result) ;
                foreach ($result as $key => $value) {
                    if($key=="pwdhash" || $key=="password"){
                        echo "password-type field:   ";
                    }
                    echo $key . ": " . $value . "<br />";

                }

/*
                ...
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


                $insertdb=0;
                if ($result){                                   
                    $insertdb=0;
                    // if($msg==1) echo "] $email found in user table! ". $user["password"]. " ". $user["userId"];      
                    if($msg==1) echo "] $email found in user table! ". $result["password"]. " ". $result["userId"];      
                   
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


        }// if (isset($_POST["submit"])) {
         

    ?>
        

        <!-- <form action="login.php" method="post"> -->
        <form action="forgotpwdreset.php" method="post">

        <div style="text-align: center;">
        <!-- <h1>Welcome to <strong>algoz.ai</strong> !</h1> -->
        <h1> <strong>RESET Password</strong> </h1>
        <p><?php echo "for: ". $emailPwdReset ." "; ?></p>
        </div>

      <!-- <div><h1>Welcome to <strong>algoz.ai</strong> !</h1></div> -->
      <!-- <div><h1>Enter your email for algoz.ai</h1></div> -->
      <!-- <div><h1>Enter your email</h1></div> -->
      <div></div>
      <div>
          <p>Enter your new password.</p>
          <p>   *** DEV: UPDATE PWD/HASH to Dbase ***</p>

      </div>
  
        <div class="form-group">
            <!-- <input type="password" placeholder="Email:" name="email" class="form-control"> -->
            <input type="email" placeholder="New Password:" name="password" class="form-control">
        </div>
        <!-- <div class="form-group">
            <input type="password" placeholder="Email:" name="email" class="form-control">
        </div> -->
        <div class="form-btn">
            <input type="submit" value="Reset My Password" name="resetpwd" class="btn btn-primary">
        </div>
      </form>
      <!-- <div><p>Not registered yet? <a href="registration.php">Sign up here</a></p></div>
      <div></div>
      <div><p id="forgotpwd" style="font-size: 10px;">Forgot Password? <a href="forgotpwd.php">Click here</a></p></div> -->
      </div>
</body>
</html>