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

</head>



<body>
    <div class="container">
        <?php
        
        require_once "encrypt.php";

        $projectname="algoz";

        //  $msg=1;
         $msg=0;
         $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
        //  $user_ip    = htmlspecialchars($user_ip);
         $user_ip    = $user_ipRaw ;

         echo "UserIP=". $user_ip;



        if (isset($_POST["login"])) {
           $email    = $_POST["email"];
           $password = $_POST["password"];

           // retr from dbase
        //    $passwordHash = encryptPassword($password);
           $passwordHash = sha1($password); 
           //    if (sha1($str) == "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0")
   
            echo "<br />pwd / hash =". $password ."  /  " . $passwordHash ."<br />" ;

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

                // echo "<br />result==";
                //  print_r( $result) ;

                foreach ($result as $key => $value) {
                    if($key=="pwdhash" || $key=="password"){
                        echo "password-type field:   ";

                       if( $key=="password" ){
                         if($value== $password){
                            echo "Regular PASSWORD  MATCHES!";
                         }else  echo "Regular PASSWORD NO Match!";
                       }

                       if( $key=="pwdhash" ){
                        if($value== $passwordHash){
                           echo "encryptedPASSWORD  MATCHES!";
                        }else  echo "encryptedPASSWORD NO Match!";
                      }

                      if( $key=="project" ){
                       if($value== $projectname){
                          echo "PROJECT NAME =  $projectname  !";
                       }else  echo "PROJECT NAME DOES NOT Match!";
                     }

                    }
                    echo $key . ": " . $value . "<br />";

                }



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


                            
            // //   from OLD   
            // if ($user) {
            //         // if (password_verify($password, $user["password"])) {
            //         if (password_verify($password, $user["pwdhash"])) {
            //             session_start();
            //                 $_SESSION["user"] =$email ; 
            //                 header("Location: index.php");
            //                 die();
            //             }else{
            //                 echo "<div class='alert alert-danger'>Password does not match!</div>";
            //             }
            //         }else{
            //             echo "<div class='alert alert-danger'>Email does not match</div>";
            //         }
            // //   from OLD   



            
        } catch (PDOException $e) {
            $insertdb=-10;
            if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
        }
        $conn = null;        // Close the PDO connection
       if($msg==1) echo $br. " * PDO conn Closed. *";




/*

            // ATTEMPT DB ACCESS
            try{
                
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
                            // SELECT * FROM `users` WHERE `email` LIKE 'mitcrapsteam@gmail.com'
                    $query  = "SELECT * FROM ". $tblname. " WHERE email = :email";
                                                                                                         // $query = "SELECT * FROM positions WHERE tradeHash = :tradeHash";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
            

                    $insertdb=0;
                    if ($result){                                   // if there is a user == found
                        $insertdb=0;
                        // if($msg==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
                        if($msg==1) echo "] insertdb = $insertdb , NOT INSERTing ; $email  found in user table ";           //   print_r($result, true);
                    } else {
                            $insertdb=1;
                            if($msg==1) echo "] NO USER found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
                            }
            
                    if($insertdb==1){

                        $insertQuery02 = "INSERT INTO ". $tblname ;  

                            // INSERT INTO `users` (`userId`, `userInitTimestamp`, `phonenum`, `fullName`, `password`, `email`, `aux1`, `lastDateTime`, `lastDate`, `lastTime`, `lastDay`, `brokerId`, `initIPaddr`, `lastIPaddr`, `lastSymbol`, `mostSymbols`, `tradeRawId`, `tradeSize`, `traderAUM`, `lastPrice`, `optionStrategy`) 
                            // VALUES (NULL, current_timestamp(), '9175556666', 'ned snarkin', 'abcdefghij', 'threaldjgiannib@gmail.com', NULL, NULL, '', '', '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, '');

                        $insertQuery2a = " ( userId, userInitTimestamp, phonenum,     fullName,      password,     email ,    pwdhash )   VALUES ";      
                        $insertQuery2b = " ( NULL, CURRENT_TIMESTAMP, '$phonenum', 'new user',  '$password',  '$email' , '$passwordHash') ";    
                        $insertQuery2 = $insertQuery02. $insertQuery2a. $insertQuery2b ;


                        $conn->exec($insertQuery2);
                        $lastInsertedId = $conn->lastInsertId();
                        $pstr2= "<br />] User inserted. Last inserted ID: $lastInsertedId ";
                        if($msg==1) echo $pstr2  ;
                        // echoColor($pstr2,"green");
            
                        $pstr3= "<br />] New User $email  INSERTed :   insertQuery2 = $insertQuery2 ";
                        if($msg==1) echo $pstr3 ;
                        // echoColor($pstr3,"blue");
            
                        echo "<div class='alert alert-success'>NewUser: $email [$lastInsertedId] ok.</div>";

                    }else if($insertdb==0){
                        $errorUserFound= "User exists: $email";
                        echo "<div class='alert alert-danger'>$errorUserFound</div>";

                        if($msg==1)  echo "<br />] insertdb = $insertdb  ___ NOT INSERTing RECORD..."; 
                    }
            
            } catch (PDOException $e) {
                $insertdb=-10;
                if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
            }
            // Close the PDO connection
            $conn = null;
            
           if($msg==1) echo $br. " * PDO conn Closed. *";



*/















        }
        ?>
      <form action="login.php" method="post">
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
        <p id="forgotpwd" style="font-size: 10px;"> <a href="forgotpwd.php">Forgot Password?</a></p>
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