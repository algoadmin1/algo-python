<?php
//
// Aug 28 2024
//
// Sep 8 2024 : to add another project:
//
//                  0.  copy thi \login folder to ..\newproj , for example
//                  1.  change algoz refs + $projectName in this file
//                  2.  change imgs: favicon.ico & logo.jpg at 256x144
//                  3.  in forgotpwd./forgotpwdreset/index./indexmenu/login/registration.php chng <title>algoz Password Recovery</title>
//                  4.  change index.html
//                  5.  change the Menu in: indexmenu.php
//                  6. 
//                  7. 
//                  8. 
//
//  KNOWN BUGS / MODS-2-DO:
//
//                  1.  
//          
//
//
// hit this link for full tutorial
$youtubeUrl="https://youtu.be/9_kQ2bjqSzk?si=vLISSejcsXVqQNVc";

$servername= "localhost" ; 
$hostName  = "localhost" ;  

$prefix=    "u184668114"; 

$username="u184668114_algozai";      
$dbUser  ="u184668114_algozai";

$dbname = "u184668114_users";
$dbName = "u184668114_users";

$dbUserOrig = "root";
$dbPassword = "Vegas202";
$dbPassword.="4"."!";
//$tblname ="users";
$tblname ="usersboxing";
$happy1=$dbPassword;

// $webName="=*=algoz.ai=*=";
$webName="Fighting FasterClass";
// $fromEmail="algoinvestorr@gmail.com";
$fromEmail="blackopsvr@gmail.com";
//
//   project links
//
$website="https://algoz.ai/boxing";
// $website="https://algoz.ai";

// $projectName="algoz";   
$projectName="boxing"; 

$linkLogin="https://algoz.ai/boxing/index.php";
$linkResetPwd="https://algoz.ai/boxing/login/forgotpwdreset.php";
          
$password_len_min=5;









// // Function to hash a password string
// function encryptPassword($password) {
//     // Use bcrypt or Argon2 for hashing
//     $hash = password_hash($password, PASSWORD_DEFAULT); // PASSWORD_DEFAULT will use bcrypt or Argon2 based on the PHP version
//     return $hash;
// }

// // Function to verify a password against a stored hash
// function verifyPassword($password, $hash) {
//     // Verify that the given password matches the stored hash
//     return password_verify($password, $hash);
// }

//         // // Example usage
//         // $password = "abcdefg";
        
//         // // Hash the password
//         // $hashedPassword = encryptPassword($password);
//         // echo "Hashed Password: " . $hashedPassword . "\n";
        
//         // // Verify the password
//         // $isPasswordCorrect = verifyPassword($password, $hashedPassword);
//         // echo $isPasswordCorrect ? "Password is correct!" : "Password is incorrect!";
        
        



// from recPortfolioTrade.php
// $servername = "localhost"; // Replace with your server name
// $username = "u151710353_roguequant1";
// $happy1.= GetEntryNums();
// $dbname = "u151710353_algotrades";
// $tblname ="positions";


// $conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
// if (!$conn) {
//     die("Something went wrong;");
// }

/*

INSERT INTO `users` (`userId`, `userInitTimestamp`, `phonenum`, `fullName`, `password`, `email`, `aux1`, `lastDateTime`, `lastDate`, `lastTime`, `lastDay`, `brokerId`, `initIPaddr`, `lastIPaddr`, `lastSymbol`, `mostSymbols`, `   traderType`, `tradeRawId`, `tradeSize`, `traderAUM`, `lastPrice`, `lastPrDate`, `optionStrategy`) VALUES (NULL, current_timestamp(), '7025551212', 'test user', 'ABCDEFG', 'roguequant1@gmail.com', NULL, NULL, '', '', '', NULL, NULL, NULL, '', '', '', '', NULL, NULL, '', '', ''), (NULL, current_timestamp(), NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, '', '', 'abc', '', NULL, NULL, '', '', '')
*/

?>