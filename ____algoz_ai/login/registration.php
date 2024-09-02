<?php
// ver 2.1
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
    <title>algoz Sign Up</title>
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
        <?php
            date_default_timezone_set('America/New_York');

            // $msg=1;
            $msg=0;
            $projectname="algoz";
            $br="<br />";


            require_once "encrypt.php";
            require_once "gethttp.php";


            $user_ip     = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
            $user_ip1    = htmlspecialchars($user_ip);

            if($msg==1) echo "<br />] ip,ip2=".  $user_ip  . " ". $user_ip1;


            $geoip= "http://ip-api.com/php/";    //2600:8801:3500:7160:51b5:f0eb:bc22:728c
            $geoip.=$user_ip;                    
            $response = getJsonFromUrl( $geoip );   // get the deseriazlized
            $response1 = FixLonLat( $response );

            $lon=0; $lat=0; $alt=0;
            $country="USdefault";
            $countrycode="US";
            $region   ="NYdefault";
            $regioncode  ="NYdefault";
            $city   ="NYCdefault";
            $zipcode="nil";
            $timezome="NYCdefault";
            $isp ="nil";

            $location ="nil";   // combo str for las vegas|Nevada|United States

            if($msg==1) echo "<br />] GEO jsonResponse1= ". $response1 ;
            $result1 = ReturnQuotedFields( $response1 );
            if($msg==1)  print_r($result1);
            foreach ($result1 as $key => $value) {
                echo "<br />";
                echo "$key ]   $value"; 
                // $key1 = (string)$key;
                // $key1 = strtolower($key1);

                if($key=="3") $country=$value;
                if($key=="5") $countrycode=$value;
                if($key=="9") $region=$value;
                if($key=="11") $city=$value;
                if($key=="13") $zip=$value;
                if($key=="15") $lat=$value;
                if($key=="17") $lon=$value;
                if($key=="19") $timezone=$value;
                if($key=="21") $isp=$value;

                
            }// foreach

            $location= $city."|".$region."|".$country."|".$zip;
            echo $br. 'isp==' .$location. " ( $lat , $lon )";
            echo $br. 'timezone(cc)==' .$timezone. "( $countrycode )";
            echo $br. 'isp==' .$isp ;


            $password_len=5;
            if($msg==1)  echo                                   "ver 2.2";

        if (isset($_POST["submit"])) {
           $fullName = $_POST["fullname"];

           /// FIX !!!!
           $phonenum = $fullName;
           $email    = $_POST["email"];
           $password = $_POST["password"];
        //    $passwordRepeat = $_POST["repeat_password"];
           
        //    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        // $passwordHash = encryptPassword($password);

        $passwordHash = sha1($password); 
        //    if (sha1($str) == "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0")

        // $user_ipRaw = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
        // //  $user_ip    = htmlspecialchars($user_ip);
        // $user_ip    = $user_ipRaw ;

           $errors = array();
           
        //    if (empty($fullName) OR empty($email) OR empty($password) OR empty($passwordRepeat)) {
           if (empty($fullName) OR empty($email) OR empty($password)  ) {
                array_push($errors,"All fields are required");
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                array_push($errors, "Email is not valid");
            }
            if (strlen($password)<$password_len) {
                array_push($errors,"Password must be at least $password_len charactes long");
            }

        //    if ($password!==$passwordRepeat) {
        //     array_push($errors,"Password does not match");
        //    }







        //    echo $br. "] Pre req'once...";
        require_once "database.php";
        //    echo $br. "] POST req'once." ;

        if($msg==1)  echo $br. $hostName." . $dbName . ". $dbUser." . $tblname . ". $dbUserOrig ; //." ". $dbPassword. " ";
        if($msg==1) echo $br." **". $servername." . $dbname . ". $username." . $tblname . ". $dbUserOrig ." ". $passwordHash. " ";
           


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

                            //     initIPaddr      numvisits
                        
                        $numvisits=1;

                        // good
                        // $insertQuery2a = " ( userId, userInitTimestamp, phonenum,     fullName,      password,     email ,    pwdhash ,  initIPaddr,     numvisits,    project )   VALUES ";      
                        // $insertQuery2b = " ( NULL, CURRENT_TIMESTAMP, '$phonenum', 'new user',  '$password',  '$email' , '$passwordHash', '$user_ip', '$numvisits',  '$projectname') ";    
                        
                        $insertQuery2a = " ( userId, userInitTimestamp, phonenum,     fullName,      password,     email ,    pwdhash ,  initIPaddr,     numvisits,    project )   VALUES ";      
                        $insertQuery2b = " ( NULL, CURRENT_TIMESTAMP, '$phonenum', 'new user',  '$password',  '$email' , '$passwordHash', '$user_ip', '$numvisits',  '$projectname') ";    
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

           if($insertdb==1){
                    // new start sess if user reg's clean
                    session_start();
                    $_SESSION["user"] = $email;  
                    // header("Location: lastdateTest.php?sym=aapl");
                    header("Location: indexmenu.php");
                    // header("Location: lastdateTest.php");
                    die();

            }

        }

   
        ?>



        <form action="registration.php" method="post">
            <div><h1>Sign up for <strong>algoz.ai</strong></h1></div>

            <!-- <div class="form-group">
                <input type="text" class="form-control" name="fullname" placeholder="Full Name:">
            </div> -->
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email:">
            </div>

<!-- 
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Password:">
            </div> -->

            <div class="form-group">
                <input type="password" placeholder="Password:" name="password" class="form-control" id="password">
                <!-- Eye icon for toggling password visibility -->
                <i class="toggle-password" onclick="togglePasswordVisibility()">👁️</i>
            </div>



            <div class="form-group">
                <input type="text" class="form-control" name="fullname" placeholder="Phone #:">
            </div>
<!--             
            2600:8801:3500:7160:51b5:f0eb:bc22:728c
            3b4e0ac754b524 = ipinfo.io

            <div class="form-group">
                <input type="password" class="form-control" name="repeat_password" placeholder="Repeat Password:">
            </div> -->

            <div class="form-btn">
                <input type="submit" class="btn btn-primary" value="   Register   " name="submit">
            </div>
        </form>
     
        <div></div>

        <div>
        <div><p>Already Registered? <a href="login.php">Login here</a></p></div>
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