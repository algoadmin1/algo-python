<?php
                                                        $ver=  "17.5";
// 
//                                                                              /algoz.ai/d2/index.php
//
date_default_timezone_set('America/New_York');

$emailName="Guest";

session_start();
if(! (isset($_SESSION["user"])) ) {
   header("Location: ../login/login.php");
}else{
        $email1=$_SESSION["user"];

        $emailName0   =$email1; // "johnnie1385@gmail.com";
        // Remove everything to the right of '@', including '@'
        $emailName = strstr($emailName0 , '@', true);
        
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

 



$BuyCall30minTest ="https://buy.stripe.com/aEU3f42UYbIG4pO8wW";
$BuyCall30min ="https://buy.stripe.com/28o5ncbru14209yaEP";

$buySellSignals="https://algoinvestorr.com/algoz0/";
$ccc = "https://algoinvestorr.com/ccc/";
$pivots = "https://algoinvestorr.com/pivots/";

$fintechfc = "https://algoz.ai/FFC.pdf";

$newsletter="https://algoinvestorr.com/newsletter.pdf";
$blueprint="https://algoz.ai/blueprint.pdf";

$bmi       = "https://algoz.ai/bmi";
$fitnessfc = "https://algoz.ai/ffc/";  // https://algoz.ai/ffc/

$chatai="https://chatgpt.com/";

$logout0= "https://algoz.ai/login/logout.php";
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
/algoz.ai/d2/jsonget.php

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
    <link rel="stylesheet" href="style_d2.css">
    <link rel="stylesheet" href="style_digital.css">
    <title>algoz.ai</title>


    <script src="eventstable.js"></script>
    
    <script>

                    // Function to get panel data - sample data for illustration
                    function GetPanelData() {
                        return [
                            { stock: 'AAPL', date: '10-08-24', status: 'Trending UP', comment: 'completed' },
                            { stock: 'NVDA', date: '10-08-24', status: 'Consolidating', comment: 'pending' },
                            { stock: 'NFLX', date: '10-08-24', status: 'Trending DOWN', comment: 'process' },
                            { stock: 'QQQ', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                            { stock: 'KO', date: '10-08-24', status: 'Trending UP', comment: 'process' },
                            { stock: 'MSFT', date: '12-09-24', status: 'Trending DOWN', comment: 'process' },
                            { stock: 'META', date: '12-10-24', status: 'Trending DOWN', comment: 'process' },
                            { stock: 'AMZN', date: '12-10-24', status: 'Trending DOWN', comment: 'pending' },

                            { stock: 'GS', date: '12-10-24', status: 'Trending UP', comment: 'completed' }
                        ];
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
                                <td><span class="status ${item.comment}">${item.status}</span></td>
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
            <!-- <li><a href="#"><i class='bx bx-store-alt'></i>Price Levels</a></li> -->
            <li><a href="<?php echo $pivots; ?>"><i class='bx bx-vertical-bottom'></i>Price Levels</a></li>
            <!-- <li class="active"><a href="<?php echo $ccc; ?>"><i class='bx bx-math'></i>Covered Call Calc</a></li> -->
            <li><a href="<?php echo $ccc; ?>"><i class='bx bx-math'></i>Covered Call Calc</a></li>
            <!-- <li><a href="#"><i class='bx bx-analyse'></i>BuySell Signals</a></li> -->
            <li><a href="<?php echo $buySellSignals; ?>"><i class='bx bx-line-chart'></i>BuySell Signals</a></li>

          

            <!-- <li><a href="#"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li> -->
            <li><a href="https://algoz.ai/d2/jsonget.php?sym=spy"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li>
<!-- 
            <li><a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li> -->

            <!-- <li><a href="#"><i class='bx bx-mail-send'></i>Newsletter</a></li> -->
            <!-- <script>
                document.getElementById('chartBtn').addEventListener('click', function() {
                    window.location.href = 'https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0';  
                });
            </script> -->

            <li><a href="<?php echo $newsletter; ?>"><i class='bx bx-news'></i>Newsletter</a></li>
            <li><a href="<?php echo $fintechfc; ?>"><i class='bx bx-fast-forward-circle'></i>FasterClass.finance</a></li>

            <li><a href="<?php echo $chatai; ?>"><i class='bx bx-search'></i>ai Search...</a></li>
            <li><a href="<?php echo $blueprint; ?>"><i class='bx bx-map-alt'></i>ai Roadmap</a></li>  
            <li><a href="<?php echo $BuyCall30min; ?>"><i class='bx bx-phone-outgoing'></i>Book Call</a></li>

            <li><a href="<?php echo $bmi; ?>"><i class='bx bx-health'></i>BMI Calc</a></li>
            <li><a href="<?php echo $fitnessfc; ?>"><i class='bx bx-heart'></i>Fitness Fasterclass</a></li>  

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
                    <a href="https://algoz.ai/d2/jsonget.php?sym=spy&sch=1" target="_blank">
                        <button class="search-btn" type="button"><i class='bx bx-search'></i></button>
                    </a>
                </div>
            </form> -->


            <!--
             <form action="#" id="search-form">
                <div class="form-input">
                    <input id="symbol-input" type="search" placeholder="symbol..." />
                    <a id="search-link" href="https://algoz.ai/d2/jsonget.php?sym=spy&sch=1" target="_blank">
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
                    <a id="search-link" href="https://algoz.ai/d2/jsonget.php?sym=spy&sch=1" target="_blank">
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
                                    searchBarStrHttp = "https://algoz.ai/d2/jsonget.php?sym=" + encodeURIComponent(searchBarStr);
                                } else {    // Case 3: Default case
                                    searchBarStrHttp = "https://algoz.ai/d2/jsonget.php?sym=" + encodeURIComponent(searchBarStr);
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










                // Attach event listener to the form
                document.getElementById('search-form').addEventListener('submit', function(event) {
                        event.preventDefault(); // Prevent the default form submission behavior

                        // Get the value entered by the user
                        const userInput = document.getElementById('symbol-input').value;
                        
                        // Construct the new URL
                        const newUrl = `https://algoz.ai/d2/jsonget.php?sym=${encodeURIComponent(userInput)}&sch=0`;
                        
                        // Redirect to the new URL
                        window.open(newUrl, '_blank');
                    });


                function updateLink() {
                    // Get the value entered by the user
                    const userInput = document.getElementById('symbol-input').value;
                    
                    // Construct the new URL
                    const newUrl = `https://algoz.ai/d2/jsonget.php?sym=${encodeURIComponent(userInput)}&sch=0`;
                    
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
                    <a href="#" class="report">
                    <i class='bx bx-user-voice'></i>
                    <!-- <i class='bx bx-cloud-download'></i> -->
                    <span>Jr Trader</span>
                    </a> 
                 </div>



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
                        <i class='bx bx-receipt'></i>
                        <h3><?php echo $emailName ; ?>'s Activity</h3>
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
                        <i class='bx bx-note'></i>
                        <h3>Upcoming Events</h3>
                        <!-- <i class='bx bx-filter'></i> -->
                        <!-- <i class='bx bx-plus'></i> -->
                    </div>
                    <ul class="task-list">


                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Nov 28th Thanksgiving</p>
                            </div>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Dec 18th FMOC Meeting</p>
                            </div>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Jan 20th MLK Jr Day</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Feb 17th Pres Day</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="not-completed">
                            <div class="task-title">
                                <i class='bx bx-x-circle'></i>
                                <p>Mar 15th '25 Go Long</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>

                    </ul>
                </div>

                <!-- End of Reminders-->






            <!-- Insights -->
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
                <!-- <li><i class='bx bx-dollar-circle'></i> -->
                    <span class="info">
                        <h3>
                            $406.2k
                        </h3>
                        <p>Member PnL</p>
                    </span>
                </li>
            </ul>
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

    <!-- <script src="charting.js"></script> -->
    <script src="clock.js"></script>
    <script src="index_d2.js"></script>
</body>

</html>