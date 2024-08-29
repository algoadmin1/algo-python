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
    <title>algoz Sign Up</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <?php
            // $msg=1;
            $msg=0;
            $br="<br />";
            $password_len=4;
            if($msg==1)  echo                                   "ver 2.2";

        if (isset($_POST["submit"])) {
           $fullName = $_POST["fullname"];
           $phonenum = $fullName;
           $email    = $_POST["email"];
           $password = $_POST["password"];
        //    $passwordRepeat = $_POST["repeat_password"];
           
           $passwordHash = password_hash($password, PASSWORD_DEFAULT);

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

           if($insertdb==1){
                    // new start sess if user reg's clean
                    session_start();
                    $_SESSION["user"] = $email; //"yes";
                    header("Location: lastdateTest.php?sym=aapl");
                    // header("Location: lastdateTest.php");
                    die();

            }


        }


                        // OLD FORMAT FROM yt
                        // $sql = "SELECT * FROM users WHERE email = '$email'";
                        // $result = mysqli_query($conn, $sql);
                        // $rowCount = mysqli_num_rows($result);
                        // if ($rowCount>0) {
                        //         array_push($errors,"Email already exists!");
                        //     }
                        //     if (count($errors)>0) {
                        //         foreach ($errors as  $error) {
                        //             echo "<div class='alert alert-danger'>$error</div>";
                        //         }
                        //     }else{
                        //     $sql = "INSERT INTO users (full_name, email, password) VALUES ( ?, ?, ? )";
                        //     $stmt = mysqli_stmt_init($conn);
                        //     $prepareStmt = mysqli_stmt_prepare($stmt,$sql);
                        //         if ($prepareStmt) {
                        //             mysqli_stmt_bind_param($stmt,"sss",$fullName, $email, $passwordHash);
                        //             mysqli_stmt_execute($stmt);
                        //             echo "<div class='alert alert-success'>You are registered successfully.</div>";
                        //         }else{
                        //             die("Something went wrong");
                        //         }
                        //     }
                        // }//EO_  if (isset($_POST["submit"])) {
                        



   
        ?>
        <form action="registration.php" method="post">
            <div><h1>Sign up for <strong>algoz.ai</strong></h1></div>

            <!-- <div class="form-group">
                <input type="text" class="form-control" name="fullname" placeholder="Full Name:">
            </div> -->
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email:">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Password:">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="fullname" placeholder="Phone #:">
            </div>
<!--             
            <div class="form-group">
                <input type="password" class="form-control" name="repeat_password" placeholder="Repeat Password:">
            </div> -->

            <div class="form-btn">
                <input type="submit" class="btn btn-primary" value="Register" name="submit">
            </div>
        </form>
        <div>
        <div><p>Already Registered? <a href="login.php">Login here</a></p></div>
      </div>
    </div>
</body>
</html>