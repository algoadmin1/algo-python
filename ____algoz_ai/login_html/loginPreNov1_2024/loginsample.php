<?php 
// login sample. php

    $tableTrans = "transactions";
    $amt08 ="";
    $product08="nil";
    $email08="";

// transactions table
try{

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors
    
    $queryTransactions  = "SELECT * FROM ". $tableTrans. " WHERE email = :email";
    $stmt = $conn->prepare($queryTransactions);
        $stmt->bindParam(':email', $email08);
        $stmt->execute();
        $resultTransactions = $stmt->fetch(PDO::FETCH_ASSOC);

        echo "<br />resultTransactions==";
        print_r( $resultTransactions) ;

        $k=0;
        foreach ($resultTransactions as $key => $value) {
            if($key=="product"){
                $product08=$value;
                if($msg==1)   echo "userID0== $userID0 <br />";
            } 

            $k++;
        }//forea


















        $i=0;
        foreach ($result as $key => $value) {
            if($key=="product"){
                $product0=$value;
                  if($msg==1)   echo "userID0== $userID0 <br />";
            }  
            if($key=="amt"){
                $amt0=$value;
                  if($msg==1)   echo "userID0== $userID0 <br />";
            }
        }


} catch (PDOException $e) {
    $insertdb=-10;
    if($msg==1) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
}
$conn = null;        // Close the PDO connection
if($msg==1) echo $br. " * PDO conn Closed. *";






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

            ?>