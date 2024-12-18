<?php
                                                        $ver=  "25.3";  // jsonget100.php
// 
//                                                                              /algoz.ai/d2/index.php
//
date_default_timezone_set('America/New_York');

$emailName="Guest";
$gProductString_Session="";

session_start();
if(! (isset($_SESSION["user"])) ) {
   header("Location: ../login/login.php");
}else{
        $email1=$_SESSION["user"];

        $emailName0   =$email1; // "johnnie1385@gmail.com";
        // Remove everything to the right of '@', including '@'
        $emailName = strstr($emailName0 , '@', true);
        
        // added 11-19
        $emailName1      = strstr($email1 , '@', true) ;

        $userID1        = $_SESSION["userId"] ;  
        $numvisits1     = $_SESSION["numvisits"] ;
        $user_ip1       = $_SESSION["userIP"] ;
        $user_loc1      = $_SESSION["user_loc"] ;
        
        $user_lastDateTime1   = $_SESSION["user_lastDateTime"] ;
        $user_lastDay1        = $_SESSION["user_lastDay"] ;

        $productstr1            = $_SESSION["user_productstr"]  ;
        $gProductString_Session = $productstr1;

        $appSecret1  =  $_SESSION["appsecret"] ;




        // echo $result; // Output: "johnnie1385"
        

        // $_SESSION['crawlTime']=  t ;
        // $_SESSION['crawlstr']=  str ;
        // from login
        // $_SESSION["user"]  = $email ; 
        // $_SESSION["userId"] = $userID0;    //   from indxmenu.php $userID0=$_SESSION["userId"];
        // $_SESSION["numvisits"] = $numvisits;
        // $_SESSION["userIP"] = $user_ip;
        // $_SESSION["user_loc"] = $user_loc;
        
        // $_SESSION["user_lastDateTime"] = $user_lastDateTime;
        // $_SESSION["user_lastDay"] = $user_lastDay ;
        
        // $_SESSION["user_productstr"] = $productstr ;

        
        // $_SESSION["appsecret"] = $appSecret ;

    }

// require_once '../login/events.php';
require      '../d2/eventcycle.php';
require_once '../login/database.php';

 

$refresh_url =   "https://algoz.ai/index.php";


$BuyCall30minTest ="https://buy.stripe.com/aEU3f42UYbIG4pO8wW";
$BuyCall30min ="https://buy.stripe.com/28o5ncbru14209yaEP";

$buySellSignals="https://algoinvestorr.com/algoz0/";
$scans="https://algoz.ai/scans/scans.pdf";

$ccc = "https://algoinvestorr.com/ccc/";
$pcc1 = "https://algoinvestorr.com/pcc/";
$pcc ="https://algoinvestorr.com/pcc/index1.php?sym=spy";
$craps0 = "https://algoz.ai/craps";
$craps = "https://itraderpro.co/craps";
$pivots = "https://algoinvestorr.com/pivots/";

$fintechfc = "https://algoz.ai/FFC.pdf";

$newsletter="https://algoinvestorr.com/newsletter.pdf";
$blueprint="https://algoz.ai/blueprint.pdf";

$boc       = "https://algoz.ai/boc";


$bmi       = "https://algoz.ai/bmi";
$fitnessfc = "https://algoz.ai/ffc/";  // https://algoz.ai/ffc/

$chatai="https://chatgpt.com/";

$logout0= "https://algoz.ai/login/logout.php";


$superuser = false ;
$creator   = false ;

if(     $email1=="algoinvestorr@gmail.com"   ||
        //  $email1=="roguequant1@gmail.com"     ||
        $email1=="johnbotti2013@gmail.com"   ||
        $email1=="geneoss@yahoo.com"         ||
        $email1=="johnbotti9000@gmail.com"   ){
         
        $superuser = true ;

        if( $email1!="geneoss@yahoo.com"     )  $creator = true ;

}



 

$g_ProductString_Live = ""; 

$g_ProductString_Live = GetLiveProductString($email1);


$newsletter_link      = "https://algoinvestorr.com/newsletter.pdf";
$newsletter_link      = GetProductUrl(  $email1, $g_ProductString_Live, $superuser , "newsletter_sub"); 


$ffc_fitness_link      = "https://fasterclass.pro/store/index.html";
$ffc_fitness_link      = GetProductUrl(  $email1, $g_ProductString_Live, $superuser , "tp_FightingFFC_Champ"); 


 

// if( $superuser == false  ){
//         $fintechfc = "https://fasterclass.finance/store/index.html";
//         $fitnessfc =  "https://fasterclass.pro/store/index.html";
// }

$j=0;


// Get the current date and time
$now = new DateTime();
$prettyDateTime1= $now->format('D M jS');
$prettyDateTime = $now->format('D M jS g:ia');
$prettyDateTime.= " EDT";
// Example output: Thurs Oct 10th 1:49pm
// echo $prettyDateTime;


// Format the date and time as 'D M jS g:ia'
$todays_udate  = date('Y-m-d');  // 'YYYY-MM-DD'











/*

/algoz.ai/index.php                 [ this file - unconditional jump to /login/login.php  ]
/algoz.ai/favicon.ico

/algoz.ai/d2/index.php              [  main dashboard  ]
/algoz.ai/d2/jsonget.php []
/algoz.ai/d2/jsonget100.php

/algoz.ai/d2/favicon.ico
/algoz.ai/d2/style_d2.css
/algoz.ai/d2/style_digital.css
/algoz.ai/d2/eventcycle.php
/algoz.ai/d2/events.php

/algoz.ai/d2/images/...
/algoz.ai/d2/digital_7/...

/algoz.ai/login/login.php
/algoz.ai/login/registration.php
/algoz.ai/login/logout.php
/algoz.ai/login/forgotpwd.php
/algoz.ai/login/forgotpwdreset.php
/algoz.ai/login/database.php
/algoz.ai/login/productsTable.php
/algoz.ai/login/encrypt.php
/algoz.ai/login/gethttp.php

/algoz.ai/login/.php
/algoz.ai/login/.php
/algoz.ai/login/.php

 */


// https://algoz.ai/products.pdf


//  $content = file_get_contents('https://algoz.ai/rtq/rtq.php?sym=meta');  echo content; 
// 
// if(isset( $_GET['sym'] )){
//     $sym = $_GET['sym'] ;
// }else{
//     $sym = "SPY";
// }
// $sym = strtoupper($sym);
// echo "] sym = ". $sym ;








function ReadSignalsFile($fname) {
    // Define the list of keys
    $keys = [
        "symbol", "udate", "utime", "per", "sigstr", 
        "signum1", "signum2", "symprice", "status", "aux1", "aux2"
    ];
    
    $result = [];

    // Open the file for reading
    if (($handle = fopen($fname, "r")) !== false) {
        // Read each line in the file
        while (($line = fgets($handle)) !== false) {
            // Remove any trailing whitespace
            $line = trim($line);

            // Skip empty lines
            if (empty($line)) {
                continue;
            }

            // Split the line by commas
            $values = explode(",", $line);

            // Create an associative array using the keys
            $entry = array_combine($keys, $values);

            // Add the entry to the result array
            if ($entry) {
                $result[] = $entry;
            }
        }

        // Close the file
        fclose($handle);

        // Sort the array by 'udate' in descending order
        usort($result, function ($a, $b) {
            return strtotime($b['udate']) - strtotime($a['udate']);
        });

        return $result;
    } else {
        throw new Exception("Could not open file: $fname");
    }
}

// // Example usage
// try {
//     $sortedArray = ReadSignalsFile("./auto/signals.txt");
//     print_r($sortedArray);
// } catch (Exception $e) {
//     echo "Error: " . $e->getMessage();
// }


function PrettyDate1($udate) {
    // Create a DateTime object from the string
    $date = new DateTime($udate);

    // Format the date to "M jS" (Month abbreviation and day with ordinal suffix)
    return $date->format('M jS');
}

function PrettyDate($udate) {
    // Create a DateTime object from the string
    $date = new DateTime($udate);

    // Get the day with the ordinal suffix (1st, 2nd, 3rd, etc.)
    $day = $date->format('j');
    $daySuffix = date('S', strtotime($udate));

    // Format the date as "D M j" (Day abbreviation, month abbreviation, and day with suffix)
    return $date->format('D M ') . $day . $daySuffix;
}

function DaysAway($udate_today, $udate) {
    // Create DateTime objects for both dates
    $today = new DateTime($udate_today);
    $date = new DateTime($udate);

    // Calculate the difference between the two dates
    $interval = $today->diff($date);

    // Determine the number of days
    $daysAway = $interval->days;

    // If $udate is before $udate_today, make $daysAway negative
    if ($date < $today) {
        $daysAway = -$daysAway;
    }

    return $daysAway;
}

function prettyOrNot( $test_udate ){
        global $todays_udate;

        $yellow_days = 8;  // less than 8 days
        $orange_days = 4;  // 3 or less days

        $green          = "completed";
        $red            = "not-completed";          // red date == udate
        $orange         = "soon1-completed";        // orange  date <=3
        $yellow         = "soon-completed";         // yellow date <=7
        $assume     = $green;

        // if(strlen($test_udate!=10))  return($assume); 
 
        $daysaway0 = DaysAway( $todays_udate, $test_udate );   // ie 4 days away
        if( $daysaway0 < $yellow_days ){
            $assume     = $yellow;
        }

        if( $daysaway0 < $orange_days ){
            $assume     = $orange;
        }

        if( $todays_udate  == $test_udate )   $assume = $red;

        return($assume);


}

// checks to see if var udate is set then checks if date behind us...
function IsAvailable( $udate ){
    global $todays_udate;

    $tf = false; 

    // isset($eventsTable[$j])  &&  DaysAway( $todays_udate , $eventsTable[$j] ) >=
    if(!( isset( $udate ) ) ) return ($tf);   

    if( DaysAway( $todays_udate , $udate ) < 0 )  return ($tf); 


    $tf=true;
    return ($tf); 

}
 

function prettyPrintArray($sortedArray) {
    foreach ($sortedArray as $index => $entry) {
        echo "Entry " . ($index + 1) . ":\n";
        foreach ($entry as $key => $value) {
            echo "  $key: $value\n";
        }
        echo str_repeat("-", 30) . "\n"; // Separator between entries
    }
}

// // Example usage with the sorted array
// try {
//     $sortedArray = ReadSignalsFile("signals.txt");
//     prettyPrintArray($sortedArray);
// } catch (Exception $e) {
//     echo "Error: " . $e->getMessage();
// }




// ############################# END OF FUNCTIONS, CALL CODE HERE...


// Example usage
try {
    $sortedSignalsArray       = ReadSignalsFile("./auto/signals.txt");
    $processedSignalsDataJson = json_encode($sortedSignalsArray);    // prep for .js

    // prettyPrintArray($sortedSignalsArray);
    // echo "<br />";
    // print_r($sortedSignalsArray);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}




/* 
if (isset($eventsTable[0])) {
}

<?php if (isset($eventsTable[0])): ?>
<?php endif; ?>

<?php if ($gChart > 0): ?>

            <li class="items" id="chartBtn">
            <i class="fa-solid fa-line-chart"></i>
            <p class="para">Charting</p>
            </li>
            <script>
                document.getElementById('chartBtn').addEventListener('click', function() {
                    window.location.href = 'https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0';  
                });
            </script>
<?php endif; ?>
      

  <div class="div">...</div>
        <!-- <a href="#" class="neon_btn1">BlackOps.com</a> -->
        <a href="https://algoinvestorr.com/algoz0/" class="neon_btn1">Buy Sell Signals</a>
        <a href="https://algoinvestorr.com/pivots/" class="neon_btn1">Price Levels</a>
        <a href="https://algoz.ai/ld/piv.php?sym=spy" class="neon_btn1">Week/Month/Yr SPY Price Levels</a>
        <a href="https://algoz.ai/ld/piv.php?sym=qqq" class="neon_btn1">Week/Month/Yr QQQ Price Levels</a>
        <a href="https://algoinvestorr.com/ccc/" class="neon_btn1">Covered Call Calculator</a>
        <a href="https://algoinvestorr.com/newsletter.pdf" class="neon_btn1">Newsletter</a>
        <a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0" class="neon_btn1">Charting</a>
        <a href="https://algoz.ai/bmi/index.html" class="neon_btn1">BMI Calc</a>
        <a href="https://buy.stripe.com/fZedTI1QU8wuaOc9AR" class="neon_btn2">Buy Jacks Coin TEST</a>

        <a href="logout.php" class="neon_btn1">LOGOUT</a>
        <!-- <a href="https://algoz.ai/bmi/index.html" class="neon_btn1">Logout</a> -->

<!-- 
        <a href="https://buy.stripe.com/8wMbKN8V65asgzmeUV?sym=&sdate=" class="neon_btn2">Buy Premium Club 1 Month</a>
        <a href="https://buy.stripe.com/bIYdTI1QUeUS5tSfZ5" class="neon_btn2">Buy Newsletter (1mo)</a>
        <a href="https://buy.stripe.com/bIYdTI1QUeUS5tSfZ5" class="neon_btn2">Buy Newsletter (1yr)</a>
        <a href="https://buy.stripe.com/28o5ncbru14209yaEP" class="neon_btn2">Buy Pro's Consultation (30mins)</a>
        <a href="https://buy.stripe.com/dR6eXMgLO286aOc28i" class="neon_btn2">Buy Pro's Consultation (60mins)</a>
        <a href= "https://buy.stripe.com/00g8zogLO286bSgaEM" class="neon_btn2">Buy Annual Gold Access 1-time Fee</a>
        <a href= "https://buy.stripe.com/3cseXM0MQ9Ay6xWeV3" class="neon_btn2">Buy Annual Gold Access Subscription</a>
       
        <a href="https://buy.stripe.com/8wM4j8anq5kicWk5kA" class="neon_btn2">Buy Market Maxims MasterClass: 54 Playing Cards</a>
      
        <a href="https://buy.stripe.com/7sI9Ds0MQh303lK7sE" class="neon_btn2">Buy MasterClass 1: Stock/Crypto Algoz Basics</a>
        <a href="https://buy.stripe.com/fZe9Ds2UY286bSg7sF" class="neon_btn2">Buy MasterClass 2: Bonds/Futures</a>
        <a href="https://buy.stripe.com/00g4j8bru7sq9K84gu" class="neon_btn2">Buy MasterClass 3: Options</a>
        <a href="https://buy.stripe.com/dR616WbrubIG5tS4gv" class="neon_btn2">Buy MasterClass 4: Advanced</a>
        <a href="https://buy.stripe.com/dR616WbrubIG5tS4gv" class="neon_btn2">Buy MasterClass 5: Advanced Business Secrets</a>
        
        <a href="https://open.spotify.com/album/3lG9TKLuevE9pznP3Y1Jg1?si=-bahmqlQSFyKqjJYxbOHdw" class="neon_btn2">DJ Gianni B Wall Street</a>
        <a href="https://open.spotify.com/album/0HT1P1xEkxRswDBqnAb6gJ?si=TWzzfy-gRbODmmj_uZ__lA" class="neon_btn2">DJ Gianni B Knockout</a>
        <a href="https://open.spotify.com/album/3nm4jHVVpG4BBGnyX107LG?si=rPE8u1hwSaKxfzjrsf88-Q" class="neon_btn2">DJ Gianni B AGI Dreams</a>
        <a href="https://open.spotify.com/album/0oKBEtBlzjKQtpd1BalotT?si=sx4DZy9aRMeJxmIQL1aqZQ" class="neon_btn2">DJ Gianni B The Midnight</a>
        <a href="https://itraderpro.co/fire" class="neon_btn2">ai art prompts</a>
 -->



        <!-- <a href="https://blackops.com/timer130/" class="neon_btn2">boxing timer</a> -->

        </div>
*/


?>















<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style_d2a.css">
    <link rel="stylesheet" href="style_digital.css">
    <title>algoz.ai</title>


    <script src="eventstable.js"></script>
    
    <script>

                 var gProductString_Live = <?php echo '"'. $g_ProductString_Live. '"'; ?>;
                 console.log("] ***>> INSIDE <script> index.php, gPr0ductString_Live ==",gProductString_Live);

                 var gProductString_Session = <?php echo '"'. $gProductString_Session. '"'; ?>;
                 console.log("] ***>> INSIDE <script> index.php, gPr0ductString_Session ==",gProductString_Session);

                //$prcessedSignalsDataJson = json_encode($sortedSignalsArray);    // prep for .js
                var processedSignalsDataOrig = <?php echo $processedSignalsDataJson; ?>;
                console.log("] ***>> INSIDE <script> index.php, processedSignalsDataOrig ==",processedSignalsDataOrig);


// DEPR TEST...
                // The gEventsTable
                 let gEventsTable9 = [
                    // "2024-11-20", "NVDA Earnings",
                    // "2024-12-18", "FOMC Meeting",
                    // "2024-12-24", "Christmas Eve",
                    // "2024-12-25", "Christmas Day",
                    // "2024-12-31", "New Year's Eve",
                    // "2025-01-01", "New Year's Day",
                    // "2025-01-06", "Inauguration Day",
                    // "2025-01-20", "MLK Jr Day",
                    // "2025-01-20", "Inauguration Day",
                    // "2025-02-17", "President's Day"

                    // "2024-11-20","NVDA Earnings",
                                    

                    "2024-11-30","END of DEV",
                    "2024-12-01","LAST month 2024",
                    "2024-12-02","dec 2nd TEST  ",

                    // "2024-12-07","6 days out...",
                    // "2024-12-08","7 days out...",
                    // "2024-12-09","8 days out...",
                    "2024-12-11","CPI 8:30am EDT",
                    "2024-12-13","FRI 13th",
                    "2024-12-18","FOMC Meeting",

                    "2024-12-24","Christmas Eve",
                    "2024-12-25","Christmas Day",

                    "2024-12-31","New Year's Eve",

                    "2025-01-01","New Year's Day",
                    "2025-01-20","MLK Day: High IV",
                    "2025-01-20","Inauguration Day",

                    "2025-01-15","GS Earnings",
                    "2025-01-15","JPM Earnings",
                    "2025-01-16","BAC Earnings",
                    "2025-01-22","JNJ Earnings",
                    "2025-01-22","TSLA Earnings",
                    "2025-01-24","AXP Earnings",
                    "2025-01-25","NFLX Earnings",
                    "2025-01-28","AMD Earnings",
                    "2025-01-29","AAPL Earnings",
                    "2025-01-29","AMZN Earnings",

                    "2025-02-03","MSTR Earnings",
                    "2025-02-03","PLTR Earnings",
                    "2025-02-04","PFE Earnings",
                    "2025-02-04","RDDT Earnings",
                    "2025-02-04","GOOG Earnings",
                    "2025-02-06","META Earnings",


                    "2025-02-13","ROKU Earnings",
                    "2025-02-17","President's Day",
                    "2025-02-26","CRM Earnings",
                    "2025-02-26","NVDA Earnings",
                    "2025-03-01","S&P500 LONG SEASON",

                    "2025-04-22","MSFT Earnings",


                    "2025-12-31","NEW YEAR'S EVE"
                ];











// The DaysAway function (from earlier)
// function DaysAway(dateString) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const inputDate = new Date(dateString);
//     inputDate.setHours(0, 0, 0, 0);
//     const differenceInMilliseconds = inputDate - today;
//     return Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
// }

function DaysAway(dateString) {
                    // Get today's date and set time to 00:00:00 for accurate day calculation
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // Convert the input dateString to a Date object and set time to 00:00:00
                    const inputDate = new Date(dateString);
                    inputDate.setHours(0, 0, 0, 0);

                    // Calculate the difference in milliseconds
                    const differenceInMilliseconds = inputDate - today;

                    // Convert the difference to days
                    const daysAway = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

                    // Return the result
                    return daysAway;
                }

                // // Example usage
                // console.log(DaysAway("2024-12-02")); // Output: 2
                // console.log(DaysAway("2024-12-01")); // Output: 1
                // console.log(DaysAway("2024-11-25")); // Output: -5
                // console.log(DaysAway("2024-11-30")); // Output: 0




                // is let strNew = form atUnixDateOptions("2024-11-30", "suffix", "-");   //  Nov-30th
                 function formatUnixDateOptions(str1, suffix0, spaceChar) {
                    let monthAbbreviations2 = ["Nil", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let suffixes2 = [ "0th", "st", "nd", "rd", "th", "th",    "th", "th", "th", "th", "th",     "th", "th", "th", "th", "th",    "th", "th", "th", "th", "th",     "st", "nd","rd", "th", "th",    "th", "th", "th", "th",  "th",    "st", "32nd"  ];
                      
                    if(suffix0 == "suffix"  ||  suffix0 == "1"){
                            return  formatUnixDateWithSuffix(str1,spaceChar);
                        }else if(suffix0 == "unix" ){
                            return str1;
                        }else if(suffix0 == "suffix2"   ||  suffix0 == "suffix3"  ){
                            let str1a    = str1.substring(5);  // "11-30"
                            let str1_mon = str1a.substring(0,2);  // "11"
                            let str1_day = str1a.substring(3);  // "30"
                            let   dayInt = parseInt(str1_day);
                            let str1_dayStr = dayInt.toString();
                            let monthInt = parseInt(str1_mon);
                            let newStr = monthAbbreviations2[monthInt] +" "+ str1_dayStr  ;   // suffix2 == no  1st or 2nd just 1 or 2
                            if(suffix0 == "suffix3" ) newStr  = monthAbbreviations2[monthInt] +" "+ str1_dayStr + suffixes2[ dayInt];
                            return  newStr;

                        } else return  formatUnixDate(str1, spaceChar);
                         
                 }

                 function formatUnixDate(str1, spaceChar) {
                    // Create a Date object from the string
                    const date = new Date(str1);

                    // Array of month abbreviations
                    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    // Format the date as 'MMMDD'
                    const month = monthAbbreviations[date.getMonth()];
                    const day = date.getDate();

                    // Return the formatted string
                    
                    return `${month}${spaceChar}${day}`;
                    // return `${month} ${day}`;
                }

                // Example usage
                // const str1 = "2024-11-30";
                // const str2 = fo rmatUnixDate(str1);
                // console.log(str2); // Output: "Nov30"

                function formatUnixDateWithSuffix(str1, spaceChar) {
                    // Create a Date object from the string
                    const date = new Date(str1);

                    // Array of month abbreviations
                    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    // Format the date as 'MMMDDth/st/nd/rd'
                    const month = monthAbbreviations[date.getMonth()];
                    const day = date.getDate();

                    // Determine the suffix for the day
                    let suffix = "th";
                    if (day % 10 === 1 && day !== 11) {
                        suffix = "st";
                    } else if (day % 10 === 2 && day !== 12) {
                        suffix = "nd";
                    } else if (day % 10 === 3 && day !== 13) {
                        suffix = "rd";
                    }

                    // Return the formatted string
                    return `${month}${spaceChar}${day}${suffix}`;
                }

                // // Example usage
                // const str1 = "2024-11-30";
                // const str2 = for matUnixDateWithSuffix(str1);
                // console.log(str2); // Output: "Nov30th"






                 function ConvertSignalsData( processedSignalsData, daysBack) {
                        // Initialize an array to hold the filtered and transformed data
                        const resultArray = [];
                        
                        // Get today's date and calculate the cutoff date
                        const today = new Date();
                        const cutoffDate = new Date();
                        cutoffDate.setDate(today.getDate() - daysBack);
                        
                        // Loop through the processedSignalsData
                        processedSignalsData.forEach(entry => {
                            // Parse the 'udate' field into a Date object
                            const entryDate = new Date(entry.udate);

                            // Check if the entry date is within the 'daysBack' range
                            if (entryDate >= cutoffDate) {
                                // Transform the entry into the new format and push it to resultArray
                                let dstr = entry.udate;
                                // let dstr1 = formatUnixDate(dstr," ");
                                let dstr1 = formatUnixDateOptions(dstr,"suffix2"," ");
                                 
                                resultArray.push({
                                    stock: entry.symbol,
                                    date: `${dstr1}`,
                                    status: `${entry.sigstr}=${entry.signum1}: $ ${entry.symprice}`,
                                    css_style: entry.sigstr,
                                    comment: entry.status
                                });
                            }
                        });

                        // Return the new abbreviated array
                        return resultArray;


                        /**
                         * 

                                [
                                    {
                                        stock: "BTC-USD",
                                        date: "2024-11-30",
                                        status: "Above_R3month_88386.06: 96765.44",
                                        comment: "pending"
                                    }
                                ]
                         */

                    }
                    // // Example usage
                    // const daysBack = 10; // Example: Filter for the last 10 days
                    // const abbreviatedArray = Co nvertSignalsData(processedSignalsData, daysBack);
                    // console.log(abbreviatedArray);




                    // Function to get panel data - sample data for illustration
                    function GetPanelData() {

                            // Example usage
                            const daysBack = 12; // Example: Filter for the last 10 days
                            let abbreviatedArray = ConvertSignalsData( processedSignalsDataOrig, daysBack );
                            console.log("] inside G3tPanelData():  abbreviatedArray[]==", abbreviatedArray);


                            // let dummyArr = [
                            //         { stock: 'AAPL', date: '10-08-24', status: 'Trending UP', comment: 'completed' },
                            //         { stock: 'NVDA', date: '10-08-24', status: 'Consolidating', comment: 'pending' },
                            //         { stock: 'NFLX', date: '10-08-24', status: 'Trending DOWN', comment: 'process' },
                            //         { stock: 'QQQ', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                            //         { stock: 'KO', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                            //         { stock: 'MSFT', date: '12-09-24', status: 'Trending DOWN', comment: 'process' },
                            //         { stock: 'META', date: '12-10-24', status: 'Consolidating', comment: 'process' },
                            //         { stock: 'AMZN', date: '12-10-24', status: 'Trending DOWN', comment: 'pending' },
                            //         { stock: 'WBA', date: '12-10-24', status: 'Trending DOWN', comment: 'process' },
                            //         { stock: 'SPY', date: '12-11-24', status: 'Trending UP', comment: 'process' },
                            //         { stock: 'MSTR', date: '12-15-24', status: 'Trending DOWN', comment: 'process' },
                            //         { stock: 'PLTR', date: '12-15-24', status: 'Trending SIDEW', comment: 'process' },
                            //         { stock: 'MGM', date: '12-15-24', status: 'Trending DOWN', comment: 'process' },
                            //         { stock: 'AMD', date: '12-15-24', status: 'Trending DOWN', comment: 'process' },

                            //         { stock: 'GS', date: '12-10-24', status: 'Trending UP', comment: 'completed' }

                            //          ];

                            // console.log("] inside G3tPanelData():  dummyArr[]==", dummyArr);
                            // return dummyArr;  


                            return abbreviatedArray;  

                        // return [
                        //     { stock: 'AAPL', date: '10-08-24', status: 'Trending UP', comment: 'completed' },
                        //     { stock: 'NVDA', date: '10-08-24', status: 'Consolidating', comment: 'pending' },
                        //     { stock: 'NFLX', date: '10-08-24', status: 'Trending DOWN', comment: 'process' },
                        //     { stock: 'QQQ', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                        //     { stock: 'KO', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                        //     { stock: 'MSFT', date: '12-09-24', status: 'Trending DOWN', comment: 'process' },
                        //     { stock: 'META', date: '12-10-24', status: 'Trending DOWN', comment: 'process' },
                        //     { stock: 'AMZN', date: '12-10-24', status: 'Trending DOWN', comment: 'pending' },

                        //     { stock: 'GS', date: '12-10-24', status: 'Trending UP', comment: 'completed' }
                        // ];


                    }

                    // Function to render the table rows based on data returned from GetPanelData
                    function populateTable() {
                        const data = GetPanelData();
                        const tbody = document.querySelector('.orders table tbody');
                        tbody.innerHTML = ''; // Clear existing rows

                        data.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>
                                    <img src="../img/${item.stock.toLowerCase()}.png">
                                    <p>${item.stock}</p>
                                </td>
                                <td>${item.date}</td>
                                <td><span class="status ${item.css_style}">${item.status}</span></td>
                            `;  
                            tbody.appendChild(row);
                        });
                    }

                    // Call the populateTable function when the page loads
                    document.addEventListener('DOMContentLoaded', populateTable);








        </script>
</head>

<body>

    <!-- Sidebar     https://blade-ui-kit.com/blade-icons/gameicon-chess-knight                     ver 4.1 -->
    <div class="sidebar">
        <a href="#" class="logo">
            <i class='bx bx-analyse'></i>
            <div class="logo-name"><span>algoz</span>.ai</div>
        </a>
        <ul class="side-menu">
            <li class="active"><a href="#"><i class='bx bxs-dashboard'></i>Dashboard</a></li>
            <!-- <li><a href="#"><i class='bx bx-store-alt'></i>Price Levels</a></li>   bx-vertical-bottom -->
            <li><a href="<?php echo $pivots; ?>"><i class='bx bx-line-chart'></i>Price Levels</a></li>
            <!-- <li class="active"><a href="<?php echo $ccc; ?>"><i class='bx bx-math'></i>Covered Call Calc</a></li> -->
            <li><a href="<?php echo $boc; ?>"><i class='bx bx-calculator'></i>Option Price Calc</a></li>

            <li><a href="<?php echo $ccc; ?>"><i class='bx bx-math'></i>Covered Call Calc</a></li>
            <li><a href="<?php echo $pcc; ?>"><i class='bx bx-math'></i>Short Put Calc</a></li>
            <!-- <li><a href="#"><i class='bx bx-analyse'></i>BuySell Signals</a></li> -->
            <!-- <li><a href=" < ? php echo $buySellSignals; ?>"><i class='bx bx-line-chart'></i>BuySell Signals</a></li> -->

          

            <!-- <li><a href="#"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li> -->
            <li><a href="https://algoz.ai/d2/jsonget100.php?sym=spy"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li>
<!-- 
            <li><a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li> -->

            <!-- <li><a href="#"><i class='bx bx-mail-send'></i>Newsletter</a></li> -->
            <!-- <script>
                document.getElementById('chartBtn').addEventListener('click', function() {
                    window.location.href = 'https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0';  
                });
            </script> -->

            <li><a href="<?php echo $newsletter_link; ?>"><i class='bx bx-news'></i>Newsletter</a></li>
            <li><a href="<?php echo $fintechfc; ?>"><i class='bx bx-fast-forward-circle'></i>FasterClass Finance</a></li>

            <li><a href="<?php echo $scans; ?>"><i class='bx bx-radar'></i>Market Scans</a></li>
            <li><a href="<?php echo $blueprint; ?>"><i class='bx bx-map-alt'></i>ai Roadmap</a></li>  
            <li><a href="<?php echo $BuyCall30min; ?>"><i class='bx bx-phone-outgoing'></i>Book Call</a></li>

            <li><a href="<?php echo $bmi; ?>"><i class='bx bx-health'></i>BMI Calc</a></li>
            <li><a href="<?php echo $ffc_fitness_link; ?>"><i class='bx bx-heart'></i>FasterClass Fitness</a></li>  
          
            <li><a href="<?php echo $refresh_url; ?>"><i class='bx bx-analyse'></i>Refresh</a></li>  
            <li><a href="<?php echo $craps; ?>"><i class='bx bx-dice-6'></i>Craps</a></li>  
            <!-- <use href="#bx--dice-6" /> -->
            <!-- <li><a href="#"><i class='bx bx-group'></i>Users</a></li> -->
            <!-- <li><a href="#"><i class='bx bx-cog'></i>Settings</a></li> -->
        </ul>
        <ul class="side-menu">
            <li>
                <a href="<?php echo $logout0; ?>" class="logout">
                    <i class='bx bx-log-out-circle'></i>
                    Logout
                </a>
            </li>
        </ul>
    </div>
    <!-- End of Sidebar -->

    <!-- Main Content -->
    <div class="content">
        <!-- Navbar -->
        <nav>
            <i class='bx bx-menu'></i>


<!--                                                                     <button class="search-btn" type="submit"><i class='bx bx-search'></i></button>
                  
            <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="symbol...">
                    <a href="https://algoz.ai/d2/jsonget100.php?sym=spy&sch=1" target="_blank">
                        <button class="search-btn" type="button"><i class='bx bx-search'></i></button>
                    </a>
                </div>
            </form> -->


            <!--
             <form action="#" id="search-form">
                <div class="form-input">
                    <input id="symbol-input" type="search" placeholder="symbol..." />
                    <a id="search-link" href="https://algoz.ai/d2/jsonget100.php?sym=spy&sch=1" target="_blank">
                        <button class="search-btn" type="submit">
                           <i class='bx bx-search'></i>
                        </button>
                    </a>
                </div>
            </form> 
            -->






            <!-- <form action="#" id="search-form">
                <div class="form-input">
                    <input id="symbol-input" type="search" placeholder="symbol..." />
                    <a id="search-link" href="https://algoz.ai/d2/jsonget100.php?sym=spy&sch=1" target="_blank">
                        <button class="search-btn" type="submit">
                        <i class='bx bx-search'></i>
                        </button>
                    </a>
                </div>
            </form> -->


            <form action="#" id="search-form" onsubmit="event.preventDefault(); handleSearch();">
                <div class="form-input">
                    <input id="symbol-input" type="search" placeholder="NVDA, BTC-, SOL-, /ai <prompt> ..." />
                    <button class="search-btn" type="submit">
                        <i class='bx bx-search'></i>
                    </button>
                </div>
            </form>
                             
<!--             
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="text" id="search-bar" placeholder="Search..." style="padding: 5px; width: 300px;" />
                <button id="info-button" style="background-color: #f0f0f0; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px; font-weight: bold;">
                    i
                </button>
            </div> -->










            <script>



                    function handleSearch() {
                        let searchBarStr = document.getElementById("symbol-input").value.trim();
                        const testCharsStr = "0123456789@/- ._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        
                        // // Validate input contains only allowed characters
                        // for (let char of searchBarStr) {
                        //     if (!testCharsStr.includes(char)) {
                        //         alert("Invalid input. Only letters, numbers, or specific symbols (@/- .) are allowed.");
                        //         return;
                        //     }
                        // }

                        let searchBarStrHttp = "";
                        let ai=false;


                        // Case 1: If starts with "/ai"
                        if (searchBarStr.startsWith("/ai")) {
                            ai=true;

                            const gRemainingChars = searchBarStr.slice(3); // After "/ai"
                            searchBarStrHttp = "https://algoz.ai/ai/xai.php?prompt=" +  encodeURIComponent(gRemainingChars);
                            ai=true;
                        }


                        if( ai== false){        
                                // Validate input contains only allowed characters
                                for (let char of searchBarStr) {
                                    if (!testCharsStr.includes(char)) {
                                        alert("Invalid input. Only letters, numbers, or specific symbols (@/- .) are allowed.");
                                        return;
                                    }
                                }
                            

                                // Case 2: If ends with "-"
                                if (searchBarStr.endsWith("-")) {
                                    searchBarStr += "USD"; // Add "USD" to the string
                                    searchBarStrHttp = "https://algoz.ai/d2/jsonget100.php?sym=" + encodeURIComponent(searchBarStr);
                                } else {    // Case 3: Default case
                                    searchBarStrHttp = "https://algoz.ai/d2/jsonget100.php?sym=" + encodeURIComponent(searchBarStr);
                                }

                        }


                        // Open popup  SAME window ==    window.location.href = "https://example.com";
                        window.location.href = searchBarStrHttp;
                        // openPopup(searchBarStrHttp);
                    }



                    
                    function openPopup(url) {
                        const popupWindow = window.open(
                            url,
                            "_blank",
                            "width=400,height=600,scrollbars=yes,resizable=yes"
                        );

                        // Add a close button to the popup (this assumes the popup page supports JS customization)
                            // <button class="close-btn" onclick="window.close()">X</button>

                        popupWindow.document.write(`
                            <style>
                                body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                                .close-btn { 
                                    position: fixed; 
                                    top: 10px; 
                                    left: 10px; 
                                    background: red; 
                                    color: white; 
                                    border: none; 
                                    border-radius: 50%; 
                                    width: 30px; 
                                    height: 30px; 
                                    font-size: 18px; 
                                    cursor: pointer; 
                                    z-index: 1000; 
                                }
                            </style>
                            <iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>
                        `);
                    }










                // // Attach event listener to the form
                // document.getElementById('search-form').addEventListener('submit', function(event) {
                //         event.preventDefault(); // Prevent the default form submission behavior

                //         // Get the value entered by the user
                //         const userInput = document.getElementById('symbol-input').value;
                        
                //         // Construct the new URL
                //         const newUrl = `https://algoz.ai/d2/jsonget100.php?sym=${encodeURIComponent(userInput)}&sch=0`;
                        
                //         // Redirect to the new URL
                //         window.open(newUrl, '_blank');
                //     });


                function updateLink() {
                    // Get the value entered by the user
                    const userInput = document.getElementById('symbol-input').value;
                    
                    // Construct the new URL
                    const newUrl = `https://algoz.ai/d2/jsonget100.php?sym=${encodeURIComponent(userInput)}&sch=0`;
                    
                    // Update the href attribute of the link
                    document.getElementById('search-link').href = newUrl;
                }
            </script>






            <input type="checkbox" id="theme-toggle" hidden>
            <label for="theme-toggle" class="theme-toggle"></label>

<!--
            <a href="#" class="notif">
                <i class='bx bx-bell'></i>
                <span class="count">12</span>
            </a>
             -->

<!--              here icon to the right



             <div class="info1">
                <p><b>Rogue</b></p>
                <small class="text-muted">Creator</small>
            </div>
            <a href="#" class="profile">
                <img src="images/logo_d2.png">
            </a> -->




        </nav>

        <!-- End of Navbar -->

        <main>
            <div class="header">
                <div class="left">
                    <!-- <h1>Your Dashboard</h1> -->
                    <h1><div class="textdig" id="time"></div></h1>

                     <!-- <div class="wrapper"> 
                        <div class="display">
                            <div id="time"></div>
                        </div>
                        -->
                       <!--  <span></span>

                        <span></span>
                    </div>
 -->
<!--                     
                    <ul class="breadcrumb">
                        <li><a href="#">
                                Analytics
                            </a></li>
                        /
                        <li><a href="#" class="active">Shop</a></li>
                    </ul> -->




                </div>
                <a href="https://algoz.ai/d2/tutorial/index.html" class="report">
                <i class='bx bx-user-voice'></i>
                        <span>Quick Ref</span>
                    </a> 
                </div>

                
<!-- 
                <div>
                        <audio id="quickRefAudio" preload="auto">
                            <source src="tutorial.mp3" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>

                        <a href="#" class="report" id="quickRefButton">
                            <i class='bx bx-user-voice'></i>
                            <span>Quick Ref</span>
                        </a>
                </div> -->


                <script>
                        // Get the audio element
                        // const audio = document.getElementById('quickRefAudio');

                        // // Add an event listener to the button
                        // document.getElementById('quickRefButton').addEventListener('click', (event) => {
                        //     event.preventDefault(); // Prevent the default link action
                        //     audio.play(); // Play the audio
                        // });
                </script>







<!-- 
                </div>
                    <a href="#" class="report">
                    <i class='bx bx-user-voice'></i>
                    <span>Quick Ref</span>
                    </a> 
                 </div> -->



                <!-- Insights -->
<!-- 
                <ul class="insights">
                    <li>
                        <span class="info">
                            <h3>
                                $487.52
                            </h3>
                            <p>QQQ</p>
                        </span>
                    </li>
                    
                    <li><i class='bx bxl-apple'></i>
                        <span class="info">
                            <h3>
                                $224.50
                            </h3>
                            <p>AAPL</p>
                        </span>
                    </li>
                        <li><i class='bx bxl-meta'></i>
                            <span class="info">
                            <h3>
                                $589.45
                            </h3>
                            <p>META</p>
                        </span>
                    </li>
                    <li><i class='bx bx-line-chart'></i>
                        <span class="info">
                            <h3>
                                $130.87
                            </h3>
                            <p>NVDA</p>
                        </span>
                    </li>
                </ul>
                 -->
                <!-- End of Insights -->

<!-- new -->

            <div class="bottom-data">


                             <!-- <tr>
                                <td>
                                    <img src="images/profile-1.jpg">
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr> -->


                <div class="orders">
                    <div class="header">
                        <!-- <i class='bx bx-line-chart'></i>. -->
                        <i class='bx bxs-traffic'></i>
                        <h3><?php echo $emailName ; ?>'s Signals</h3>
                        <!-- <h3>Recent Activity</h3> -->
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <!-- Rows will be populated dynamically by JavaScript -->
                        </tbody>
                    </table>

                </div>
                
            <!-- </div> -->





                <!-- Reminders -->
                <div class="reminders">
                    <div class="header">
                        <i class='bx bx-calendar'></i>
                        <h3>Upcoming Events</h3>
                        <!-- <i class='bx bx-filter'></i> -->
                        <!-- <i class='bx bx-plus'></i> -->
                    </div>
                    <ul class="task-list">


                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Dec 18th FMOC Meeting</p>
                            </div>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Dec 25th Christmas</p>
                            </div>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Jan 20th MLK Jr Day</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Feb 17th Pres Day</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                        <li class="not-completed">
                            <div class="task-title">
                                <i class='bx bx-x-circle'></i>
                                <p>Mar 15th '25 Go Long</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>

                    </ul>
                </div>

                <!-- End of Reminders-->






            <!-- Insights -->
<!-- 
            <ul class="insights">
                <li>
                    <i class='bx bx-calendar-check'></i>
                    <span class="info">
                        <h3>
                            8,074
                        </h3>
                        <p>Trained</p>
                    </span>
                </li>
                <li><i class='bx bx-show-alt'></i>
                    <span class="info">
                        <h3>
                            43.9B
                        </h3>
                        <p>Data Points</p>
                    </span>
                </li>
                <li><i class='bx bx-line-chart'></i>
                    <span class="info">
                        <h3>
                            $17,954
                        </h3>
                        <p>ai PnL</p>
                    </span>
                </li>
                <li><i class='bx bx-line-chart'></i>
                    <span class="info">
                        <h3>
                            $406.2k
                        </h3>
                        <p>Member PnL</p>
                    </span>
                </li>
            </ul>
             -->
            <!-- End of Insights -->






<!-- 

                <div class="chartjb">
                    <h3>chart</h3>

                    <div class="chartsjb">
                        <canvas id="myCanvas"></canvas>
                    </div>
                     
                </div>
 -->

                <!-- end of canvas attempt -->

                

                
            </div>

        </main>

    </div>



<script>


// ###############################################################################################  NEW li
// ###############################################################################################  NEW li
//
// ############################ EVENTS
//
// Get the task list container
                    const taskList = document.querySelector(".task-list");

                    // Clear existing tasks (if any)
                    taskList.innerHTML = "";

                    // Loop through the gEventsTable9
                    for (let i = 0; i < gEventsTable9.length; i += 2) {
                        let dateString = gEventsTable9[i];
                        let descriptionString = gEventsTable9[i + 1];
                        let daysAway0 = DaysAway(dateString);

                        // Skip if the event is in the past
                        if (daysAway0 < -1) continue;
                        // if (daysAway0 < 0) continue;

                        // Initialize variables
                        let li_string = "completed";  // assume green
                        let bx_string = "bx bx-check-circle";

                        // Determine the styles based on the date proximity
                        if (daysAway0 === 0  || daysAway0 == -1) {
                            li_string = "not-completed";
                            bx_string = "bx bx-x-circle";

                        }else if (daysAway0 < 4) {
                            li_string = "soon1-completed";

                        }else if (daysAway0 < 8) {
                                li_string = "soon-completed";

                        }

                        

                        // Format the date string to "MMMDDth/st/nd/rd" format
                        let formattedDate = formatUnixDateOptions(dateString,"suffix2"," ");
                        // const formattedDate = formatUnixDateWithSuffix(dateString, " ");
                        // Create the <li> element dynamically
                        const liElement = document.createElement("li");
                        liElement.className = li_string;
                        liElement.innerHTML = `
                            <div class="task-title">
                                <i class='${bx_string}'></i>
                                <p>${formattedDate} ${descriptionString}</p>
                            </div>
                        `;

                        // Append the <li> to the task list
                        taskList.appendChild(liElement);
                    }


// ###############################################################################################  NEW li
// ###############################################################################################  NEW li


    </script>


    <!-- <script src="charting.js"></script> -->
    <script src="clock.js"></script>
    <script src="index_d2.js"></script>
</body>

</html>