<?php
//                                  ver 6.92
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
$tblname ="users";
$happy1=$dbPassword;

// $webName="=*=algoz.ai=*=";
$webName="algoz.ai";
$fromEmail="algoinvestorr@gmail.com";
//
//   project links
//
$website="https://algoz.ai";

$projectName="algoz";    // $projectName="boxing";
// $linkLogin="https://algoz.ai/login";
$linkLogin="https://algoz.ai/index.php";
$linkResetPwd="https://algoz.ai/login/forgotpwdreset.php";
          
$password_len_min=5;



 // ###################################### Functions
 
function StringContains($instr, $masterstr) {
    // Use substr_count to count occurrences of $instr in $masterstr
    return substr_count($masterstr, $instr);
}
function RemoveChars($str, $char) {
    // Use str_replace to remove all occurrences of $char from $str
    return str_replace($char, '', $str);
}

function AddDaysToDate($numdays, $udate) {
    // Create a DateTime object from the provided date string in 'YYYY-MM-DD' format
    $date = DateTime::createFromFormat('Y-m-d', $udate);

    if (!$date) {
        // If the date format is invalid, return false or handle the error as needed
        return false;
    }

    // Add or subtract the number of days
    $date->modify("$numdays days");

    // Return the modified date in 'YYYY-MM-DD' format
    return $date->format('Y-m-d');
}

// returns -1 if A<B, 0 A==B, +1 if A>B
function CompareDates( $udateA, $udateB ) : int {
    $retcode=-99;
    if( strlen($udateA)!=10 || strlen($udateB)!=10  ){  // check for udate format YYYY-MM-DD , len=10
            return($retcode);  // error code -99
    }
    $udateA0 =  RemoveChars(  $udateA , '-' );       //  YYYY-MM-DD   ==> YYYYMMDD ie 20241009 an int
    $udateB0 =  RemoveChars(  $udateB , '-' );
    
    $a= (int)$udateA0 ;
    $b= (int)$udateB0 ;
    
    $retcode=0;
    if($a==$b)  return($retcode);

    $retcode=1;  // a!=b, assume b>a  ret +1
    if($a < $b)  $retcode = -1;

    return($retcode);

}



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