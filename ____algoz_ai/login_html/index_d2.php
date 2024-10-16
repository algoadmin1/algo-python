<?php
//                                                  ver  11.53
date_default_timezone_set('America/New_York');
require_once '../login/events.php';
require_once '../login/database.php';



$BuyCall30minTest ="https://buy.stripe.com/aEU3f42UYbIG4pO8wW";
$BuyCall30min ="https://buy.stripe.com/28o5ncbru14209yaEP";

$buySellSignals="https://algoinvestorr.com/algoz0/";
$ccc = "https://algoinvestorr.com/ccc/";
$pivots = "https://algoinvestorr.com/pivots/";

$fintechfc = "https://algoz.ai/FFC.pdf";

$newsletter="https://algoinvestorr.com/newsletter.pdf";

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
    <title>algoz dashboard</title>
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
            <li><a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0"><i class='bx bx-candles' id="chartBtn"></i>Charting</a></li>
            <!-- <li><a href="#"><i class='bx bx-mail-send'></i>Newsletter</a></li> -->
            <!-- <script>
                document.getElementById('chartBtn').addEventListener('click', function() {
                    window.location.href = 'https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0';  
                });
            </script> -->

            <li><a href="<?php echo $newsletter; ?>"><i class='bx bx-news'></i>Newsletter</a></li>
            <li><a href="<?php echo $fintechfc; ?>"><i class='bx bx-fast-forward-circle'></i>Fintech FasterClass</a></li>

            <li><a href="<?php echo $chatai; ?>"><i class='bx bx-search'></i>ai Search...</a></li>
            <li><a href="<?php echo $BuyCall30min; ?>"><i class='bx bx-phone-outgoing'></i>Book Call</a></li>

            <!-- <li><a href="#"><i class='bx bx-group'></i>Users</a></li> -->
            <li><a href="<?php echo $bmi; ?>"><i class='bx bx-health'></i>BMI Calc</a></li>
            <li><a href="<?php echo $fitnessfc; ?>"><i class='bx bx-heart'></i>Fitness Fasterclass</a></li>
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


            <form action="#" id="search-form">
                <div class="form-input">
                    <input id="symbol-input" type="search" placeholder="symbol..." />
                    <a id="search-link" href="https://algoz.ai/d2/jsonget.php?sym=spy&sch=1" target="_blank">
                        <button class="search-btn" type="button" onclick="updateLink()"><i class='bx bx-search'></i></button>
                    </a>
                </div>
            </form>

            <script>
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
             <div class="info1">
                <p><b>Rogue</b></p>
                <small class="text-muted">Creator</small>
            </div>
            <a href="#" class="profile">
                <img src="images/logo_d2.png">
            </a>
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
                    <i class='bx bx-cloud-download'></i>
                    <span>Download Guide</span>
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


            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Recent Quotes</h3>
                        <!-- <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i> -->
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
                            <tr>
                                <td>
                                    <img src="../img/aapl.png">
                                    <p>AAPL</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status completed">Trending UP</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../img/nvda.png">
                                    <p>NVDA</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status pending">Consolidating</span></td>
                            </tr> <tr>
                                <td>
                                    <img src="../img/meta.png">
                                    <p>META</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status process">Trending DOWN</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../img/gs.png">
                                    <p>GS</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status completed">Trending UP</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Reminders -->
                <div class="reminders">
                    <div class="header">
                        <i class='bx bx-note'></i>
                        <h3>Upcoming Events</h3>
                        <!-- <i class='bx bx-filter'></i> -->
                        <!-- <i class='bx bx-plus'></i> -->
                    </div>
                    <ul class="task-list">



                    <?php  $j=0;  if( isset($eventsTable[$j])  &&  DaysAway( $todays_udate , $eventsTable[$j] ) >=0 ):  
                           $color0=prettyOrNot( $eventsTable[$j] );  
                           ?>
                       
                        <!-- <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>"> -->
                        <?php  if($color0=="soon1-completed") : ?>
                                 <li class="soon1-completed">
                        <?php endif; ?> 
                        <?php  if($color0=="soon-completed") : ?>
                                 <li class="soon-completed">
                        <?php endif; ?>
                        <?php  if($color0=="completed") : ?>
                                 <li class="completed">
                        <?php endif; ?>
                        <?php  if($color0=="not-completed") : ?>
                                 <li class="not-completed">
                        <?php endif; ?> 

                   <!-- <li class="not-completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if ( IsAvailable($eventsTable[$j]) ): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                            <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo  PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): ?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>


                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): // #22 here or 11th?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>



                    <?php $j+=2; if (IsAvailable($eventsTable[$j])): // #24 here or 12th?>
                        <li class="<?php echo prettyOrNot( $eventsTable[$j] ); ?>">
                        <!-- <li class="completed"> -->
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> <?php echo PrettyDate($eventsTable[$j]).":  ".$eventsTable[$j+1]  ;   ?></p>
                            </div>
                        </li>
                    <?php endif; ?>




<!-- 
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> Nov 7th FMOC Meeting</p>
                            </div>
                        </li>
                        <li class="completed">
                                <div class="task-title">
                                    <i class='bx bx-check-circle'></i>
                                    <p>Dec 18th FMOC Meeting</p>
                            </div>
                        </li> -->




                    </ul>
                </div>

                <!-- End of Reminders-->







                <div class="orders">
                    <h3>chart</h3>

                    <div class="chartsjb">
                        <canvas id="myCanvas"></canvas>
                    </div>
                     
                </div>


                <!-- end of canvas attempt -->

                

                
            </div>

        </main>

    </div>

    <script src="charting.js"></script>
    <script src="clock.js"></script>
    <script src="index_d2.js"></script>
</body>

</html>