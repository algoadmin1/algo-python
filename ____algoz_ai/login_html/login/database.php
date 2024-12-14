<?php
                                                   $db_ver =  "8.3";

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
$appSecret ="lagboslaxlasjfk10023";
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



/*  ######################   NEW
new format:   <productName>|<expiryDate>|<amt>|<transactions.id>|,
=tp_FightingFFC_Amateur|9999-12-31|53|12|,tp_SaaSFintechTool_Level_3|2026-12-31|63|13|,tp_SaaSFintechTool_Pivots_090days|2025-01-07|61|14|,
tp_SaaSFintechTool_Pivots_365days|2025-10-09|63|15|,tp_FightingFFC_Beginner|9999-12-31|53|16|,tp_AlgoInvestorNewsletter_090days|2025-01-07|58|17|,
tp_Cashflow_Business|9999-12-31|57|18|,tp_SaaSFintechTool_Pivots_365days|2025-10-09|63|19|,
*/
//

//test
//    $productstr="tp_newsletter_sub|2025-01-01|5000|9|,tp_charting_sub|2025-03-31|30000|12|,";
// assumes valid session active 
//
function GetLiveProductString( $email0 ){
    global $servername, $dbname, $username, $happy1;

    $email08    = $email0;             
    $msgprod    = false;   
    $br         = "<br />";
    $amt08      ="";
    $id08       ="";
    $product08  ="";
   $expiration08="";


   $dateFormat = date("Y-m-d");
   $productstr="tp_header_str|".  $dateFormat ."|00|0|,";


   // Convert the date to a Unix timestamp
//    $udate = strtotime($dateFormat);
//    echo "Formatted date: " . $dateFormat . "<br>";   // YYYY-MM-DD
//    echo "Unix timestamp: " . $udate;   // timestamp


            try{
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $happy1);           // Connect to MySQL using PDO
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                         // Set PDO to throw exceptions for errors

                $tableTrans = "transactions";
                $queryTransactions  = "SELECT * FROM ". $tableTrans. " WHERE email = :email";
                $stmt = $conn->prepare($queryTransactions);
                $stmt->bindParam(':email', $email08);
                $stmt->execute();
                $resultTransactions = $stmt->fetchAll(PDO::FETCH_ASSOC);        // get products
                $itemcount = count($resultTransactions);                        // Assign the number of items returned to $itemcount
                                    // Iterate through each row and print key/value pairs
                                    // foreach ($resultTransactions as $row) {
                                    //     foreach ($row as $key => $value) {
                                    //         echo "Key: $key; Value: $value<br>";
                                    //     }
                                    // }
                if($msgprod)   echo "<br />resultTransaction(CNT= $itemcount )==";
                if($msgprod)   print_r( $resultTransactions) ;
                
                $k=0;
                foreach ($resultTransactions as $row) {
                    // print_r( $row ) ;
                    foreach ($row as $key => $value) {
                            if(  $key!="payload" ) $value0=$value;
                                else $value0="";  // exclude json pl
                            if($msgprod)  echo "row". $k. "[". $key. "]=". $value0. "|" ;

                            // in the array returned from mysql, the order is transactionId, product, expiration
                            if(  $key=="transactionId" )  $id08 = (string)$value;
                            if(  $key=="product" )        $product08= $value;
                            if(  $key=="amt" )            $amt08=     $value;
                            if(  $key=="expiration" ){
                                    $expiration08= $value;   // ie YYYY-MM-DD
                                    // if(strlen($expiration08!=10)) $expiration08="9999-12-31";     // if bad format expiry= never
                                    $productstr.= $product08."|". $expiration08."|". $amt08. "|". $id08."|,";
                                    
                                    // clear id & expiry vars
                                    $id08 ="";
                                    $amt08 ="";
                                    $expiration08 ="";
                                }
                        }//forea1
                    $k++;
                }//forea0

                if($msgprod)   echo "<br />productstr = ". $productstr ;
                $conn = null;       // close DBase

                    //  pre Dec 12  2024
                    //      THIS SHOULD BE  CONSTRUCTED  at login time so everything funnels through login.php,
                    //              where this $_SESSION["user_productstr"] = BuildSessionProducts(), located in database.php
                    //
                    // $_SESSION["user_productstr"] = $productstr ;
                    // note create subscription
                    // note on these:  tp_AlgoInvestorNewsletter_3Month END DATE MUST BE STORED      
                    //
        
            } catch (PDOException $e) {
                if($msgprod) echo "<br />ERROR:  Connection failed: " . $e->getMessage();
                $productstr="error_dbConnFailed|1900-12-31|0|-1|,";
            }
            $conn = null;        // Close the PDO connection
            if($msgprod) echo $br. " * PDO conn Closed. *";





    return $productstr;


}//fn

//
function CheckExpiryDate( $udate ){
    $tf_date = false;
    $todaydate0=date("Y-m-d");
    if(isset($udate)){
//                         returns -1 if A<B, 0 A==B, +1 if A>B
        $numcmp = CompareDates( $todaydate0, $udate );
        if($numcmp <1)        $tf_date = true;      // if todaysDate <= expiryDate , then true
    }
    return $tf_date;

}

//      pr0ducttype0 = "newsletter_sub"
//
//
function HasProduct(  $email0, $g_ProductString_Live0, $superuser0 , $producttype0 ){
    $tf=false;

    //    $productstr="tp_newsletter_sub|2025-01-01|5000|9|,
    //                 tp_charting_sub|2025-03-31|30000|12|, ";

    if(isset($g_ProductString_Live0)  &&  $g_ProductString_Live0 !="" ){
            

            $charstr =",";
            $arrayRows = explode($charstr, $g_ProductString_Live0);
            foreach ($arrayRows as $elementStr) {                     //  el3mentStr =  //  "tp_newsletter_sub|2025-01-01|5000|9|,

                $charstr ="|";
                $arrayColumns = explode($charstr, $elementStr);     

                if($arrayColumns[0]==$producttype0){            //   tp_newsletter_sub   | 
                    // check date
                    $date_to_test = $arrayColumns[1];           //   2025-01-01          |
                    $tf=CheckExpiryDate( $date_to_test );  
                    // $tf=true;

                }
                $dummy=0;
                // echo $element . "<br>"; // Echo each element followed by a line break
            }//for



    }// if isset


    if( $superuser0 == true ) return $tf= true;

    return  $tf;
}


function GetProductUrl(  $email0, $g_ProductString_Live0, $superuser0 , $producttype0 ){
        $urllink="https://algoz.ai/";


    if($producttype0      == "newsletter_sub"){
        if (  HasProduct(  $email0, $g_ProductString_Live0, $superuser0 , $producttype0 )  ==  true ){ 
            $urllink="https://algoinvestorr.com/newsletter.pdf";
        }else{
            $urllink="https://fasterclass.finance";
        }
    }

    if($producttype0      == "tp_FightingFFC_Champ"){
        if (  HasProduct(  $email0, $g_ProductString_Live0, $superuser0 , $producttype0 )  ==  true ){ 
            $urllink="https://algoz.ai/ffc/";
        }else{
            $urllink="https://fasterclass.pro/store/index.html";
        }

    }




     if($producttype0=="optionscalc_sub"){
        ;
    }


     if($producttype0=="charting_sub"){
        ;
    }
    

    if($producttype0=="pricelevels_sub"){
        ;
    }
    

    if($producttype0=="scans_sub"){
        ;
    }


    

    return  $urllink;

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