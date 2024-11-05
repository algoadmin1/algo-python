<?php
// ver 4.3
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
    <!-- <title>algoz Sign Up</title> -->
    <title><?php echo $webName; ?> Sign Up</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <style>
        /* Basic styling for the form and button */
        .form-group {
            position: relative; /* Position relative to contain the eye icon */
            width: 100%; /* 260px;  Set a width for the form group */
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
        document.getElementById('sys-vars').innerText = getScreenSize()+"|"+ detectDeviceType() +"|"+ detectOS()  +"|"+ detectBrowser();
</script> 




    <div class="container">


        <div style="text-align: center;">

            <div class="logo1">
                <img src="logo.jpg" alt="Logo">
                </div>
            </div>


        <?php
            date_default_timezone_set('America/New_York');

            $today0 = date('l F j, Y g:ia');

            // $msg=1;
            $msg=0;
            $projectname=$projectName;   // $projectname="algoz";
            $br="<br />";


            require_once "encrypt.php";
            require_once "gethttp.php";


            $user_ip     = $_SERVER['REMOTE_ADDR'];   // 2600:8801:3500:7160:51b5:f0eb:bc22:728c
            $user_ip1    = htmlspecialchars($user_ip);

            if($msg==1) echo "<br />] ip,ip2=".  $user_ip  . " ". $user_ip1;




        // IPaddy to loc

            $geoip= "http://ip-api.com/php/";    //2600:8801:3500:7160:51b5:f0eb:bc22:728c
            $geoip.=$user_ip;                    
            $response = getJsonFromUrl( $geoip );   // get the deseriazlized
            $response1 = FixLonLat( $response );

        // data to insert to mysql
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
            $loc0="nil";


            if($msg==1) echo "<br />] GEO jsonResponse1= ". $response1 ;
            $result1 = ReturnQuotedFields( $response1 );
            if($msg==1)  print_r($result1);
            foreach ($result1 as $key => $value) {
                if($msg==1) echo "<br />". "$key ]   $value"; 
                // $key1 = (string)$key;
                // $key1 = strtolower($key1);

                if($key=="3") $country=$value;
                if($key=="5") $countrycode=$value;
                if($key=="7") $regioncode=$value;
                if($key=="9") $region=$value;
                if($key=="11") $city=$value;
                if($key=="13") $zip=$value;
                if($key=="15") $lat=$value;
                if($key=="17") $lon=$value;
                if($key=="19") $timezone=$value;
                if($key=="21") $isp=$value;

                /*
                        0 ] status
                        1 ] success
                        2 ] country
                        3 ] United States
                        4 ] countryCode
                        5 ] US
                        6 ] region
                        7 ] NV
                        8 ] regionName
                        9 ] Nevada
                        10 ] city
                        11 ] Las Vegas
                        12 ] zip
                        13 ] 89108
                        14 ] lat
                        15 ] 36.2038
                        16 ] lon
                        17 ] -115.2255
                        18 ] timezone
                        19 ] America/Los_Angeles
                        20 ] isp
                        21 ] Cox Communications Inc.
                        22 ] org
                        23 ] Cox Communications Inc
                        24 ] as
                        25 ] AS22773 Cox Communications Inc.
                        26 ] query
                        27 ] 2600:8801:3500:7160:3ddb:1575:1a1f:6177
                        isp==Las Vegas|Nevada|United States|89108 ( 36.2038 , -115.2255 )
                        timezone(cc)==America/Los_Angeles( US )
                        isp==Cox Communications Inc.
                                        
                */
            }// foreach

            $loc0= $city." ".$region." ".$country." ".$zip;
            $location= $city."|".$region."|".$country."|".$zip;
            if($msg==1) {
                echo $br. 'loc==' .$location. " ( $lat , $lon )";
                echo $br. 'timezone(cc)==' .$timezone. "( $countrycode )";
                echo $br. 'isp==' .$isp ;
                }

            $password_len=5;    // password_len_min use from database.php

            if($msg==1)  echo                                   "ver 3.2";

        if (isset($_POST["submit"])) {
           /// FIX !!!!
           $fullName = $_POST["fullname"];
           /// FIX !!!!
           $phonenum = $fullName;
           $email    = $_POST["email"];
           $password = $_POST["password"];


           $sysvars  = $_POST["string1"];
           if($msg==1) echo "<br />***sys-vars =". $sysvars . "***<br />" ;


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
            }  //        $passwordHash = sha1($password); 


        //    if ($password!==$passwordRepeat) {
        //     array_push($errors,"Password does not match");
        //    }







        //    echo $br. "] Pre req'once...";
        // require_once "database.php";
        //    echo $br. "] POST req'once." ;

        if($msg==1)  echo $br. $hostName." . $dbName . ". $dbUser." . $tblname . ". $dbUserOrig ; //." ". $dbPassword. " ";
        if($msg==1) echo $br." **". $servername." . $dbname . ". $username." . $tblname . ". $dbUserOrig ." ". $passwordHash. " ";
           


            // ATTEMPT DB ACCESS
            try{
                
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
                            // SELECT * FROM `users` WHERE `email` LIKE 'mitcrapsteam@gmail.com'
                    $query  = "SELECT * FROM ". $tblname. " WHERE email = :email";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
                    $dbproj = "nil" ; //$result["project"];

                    $insertdb=0;
                    if ($result){   // if there is a user == found

                        // ====================================================================================
                        // added for projectName != algoz   ...
                        //
                        //

                        //  database.php-->$projectName 
                        // here  we check $result["project"]==  $projectName 
                        $dbproj = $result["project"];
    //echo "<br /> ]  ⚠️ THIS_SERVERdatabasePHP_projectName=". $projectName. ", dbProject = ". $dbproj;


                        // i.e.
                        // if 'algoz' !=   'boxing'  [this server  databasePHP.$projectName]
                        if( $dbproj    !=   $projectName ){

                            $insertdb=1;  // same emails found, but diff proj names;  users.project != $projectName 
    //   echo "<br /> ]😉INSERTing New user, projectName!=dbproj: >>>". $projectName. "!=". $dbproj. "<<<";

                            }else{
                                $insertdb=0;
                                // if($msg==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
                                if($msg==1) echo "] insertdb = $insertdb , NOT INSERTing ; $email  found in user table ";           //   print_r($result, true);
                                }//else
                        
                        //
                        //        
                        // ====================================================================================



//      old...
                                // $insertdb=0;
                                // // if($msg==1) echo "<br />] insertdb = $insertdb , NOT INSERTing RawTrade found for tradeHash $tradeHashToQuery , result=  <pre>" . print_r($result, true) . "</pre>";
                                // if($msg==1) echo "] insertdb = $insertdb , NOT INSERTing ; $email  found in user table ";
//      old...





                    } else {
                            $insertdb=1;
                            if($msg==1) echo "] NO USER found for tradeHash $tradeHashToQuery.  insertdb= $insertdb ;  INSERTing to db.trades ...<br />";
                            }
            



//              RE-TEST THE FLAG TO MAKE SURE   ======================

                    if($insertdb==1){

                        $insertQuery02 = "INSERT INTO ". $tblname ;  

                            // INSERT INTO `users` (`userId`, `userInitTimestamp`, `phonenum`, `fullName`, `password`, `email`, `aux1`, `lastDateTime`, `lastDate`, `lastTime`, `lastDay`, `brokerId`, `initIPaddr`, `lastIPaddr`, `lastSymbol`, `mostSymbols`, `tradeRawId`, `tradeSize`, `traderAUM`, `lastPrice`, `optionStrategy`) 
                            // VALUES (NULL, current_timestamp(), '9175556666', 'ned snarkin', 'abcdefghij', 'threaldjgiannib@gmail.com', NULL, NULL, '', '', '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, '');

                            //     initIPaddr      numvisits
                        
                        $numvisits=1;

                        
                        $insertQuery4a = " ( userId, userInitTimestamp, phonenum,     fullName,      password,     email ,    pwdhash ,  initIPaddr,  sysvarsinit,     numvisits,  lat, lon,       project ,       country,     countrycode ,  region, regioncode,  city  , zip , tzone, isp, loc)   VALUES ";      
                        $insertQuery4b = " ( NULL, CURRENT_TIMESTAMP, '$phonenum', 'new user',  '$password',  '$email' , '$passwordHash', '$user_ip', '$sysvars', '$numvisits', '$lat' ,'$lon,', '$projectname', '$country', '$countrycode' , '$region', '$regioncode'  ,'$city' , '$zip', '$timezone', '$isp' , '$location') ";    
                        
                        $insertQuery2 = $insertQuery02. $insertQuery4a. $insertQuery4b ;


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
                        $errorUserFound= "⚠️ User $email exists in this project: $dbproj ...";
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

                    $_SESSION["userId"] = $lastInsertedId;   //$userID0;    //   from indxmenu.php $userID0=$_SESSION["userId"];
                    $_SESSION["numvisits"] = 1;
                    $_SESSION["userIP"] = $user_ip;
                    
                    $_SESSION["user_loc"] = $loc0;
                    
                    $_SESSION["user_lastDateTime"] = $today0; //$user_lastDateTime;
                    $_SESSION["user_lastDay"] = " "; //$user_lastDay ;

                    // header("Location: lastdateTest.php?sym=aapl");
                    // header("Location: indexmenu.php");
                    header("Location: ../index.php");
                    // header("Location: lastdateTest.php");
                    die();

            }

        }

   
        ?>


        <form action="registration.php" method="post"   onsubmit="passStringToPHP()">
        <!-- <form action="registration.php" method="post"> -->
               

        <div style="text-align: center;">
        <!-- <h1>Welcome to <strong>algoz.ai</strong> !</h1> -->
        <h1> <strong>Sign Up</strong> </h1>
        </div>
        <!-- <div><h1>Sign up for <strong>algoz.ai</strong></h1></div> -->

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
                <input type="hidden" id="hiddenInput" name="string1">
                <!-- <input type="submit" class="btn btn-primary" value="   Register   " name="submit"> -->
                <input type="submit" class="btn btn-primary" value="    Sign Up    " name="submit">
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