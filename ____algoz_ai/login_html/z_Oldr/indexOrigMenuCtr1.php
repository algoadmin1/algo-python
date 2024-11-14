<?php
session_start();
if (!isset($_SESSION["user"])) {
   header("Location: ./login/login.php");
}else{
    $email1=$_SESSION["user"];
    $numvisits1=$_SESSION["numvisits"];
    $userIP=$_SESSION["userIP"];
    $userId=$_SESSION["userId"];
    $user_loc=$_SESSION["user_loc"];
    $user_lastDateTime  = $_SESSION["user_lastDateTime"] ;
    $user_lastDay = $_SESSION["user_lastDay"]  ;

                 
 }
require_once "./login/database.php";
/*

 KNOWN BUGS:

    1  UPON login, check PWD_hash as it is not matching
    2  UPON login, an incorrect pwd spits out debug 'echo' strings
    3  
    4  WE NEED SaaS SERVICE LEVELS Included OR EXCLUDED from a USER'S MENU
    5  
    6  
    7  THE style.css is wrong for input fields; check /BMI inputs
    8  
    9  


    FILES:

        _candlesticks.php
        _dbase0.php
        _recPortfolioTrade.php
        algozDatabaseMySQL.png
        algozUserTable.png
        algozUserTableOld.png
        database.php
        encrypt.php
        favicon.ico
        forgotpwd.php
        forgotpwdreset.php
        gethttp.php
        index.html
        index.php
        indexmenu.php
        lastdateTest.php
        login.php
        loginfiles.txt
        logo.jpg
        logoalgoz.jpg
        logoalgoz.png
        logoalgozMaster.png
        logout.php
        passstr.php
        passstring.html
        pwdeye.html
        registration.php
        sampleinput.php
        sendemail.php
        sidebarai.php
        style.css
        testdiv.html
        user_ip.txt
        userstats.html
        userstats.js




*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <!-- <title><?php echo $webName; ?> Dashboard</title> -->
    <title> <?php echo $webName; ?> </title>
</head>
<body>
    <div class="container">
        <div style="text-align: center;">
            <div class="logo1">
                <img src="logo.jpg" alt="Logo">
            </div>
        </div>

        <!-- <h1 style="color: green;">Welcome to the <?php echo $webName; ?> Dashboard</h1> -->
        <h1 style="color: green;">Welcome to <?php echo $webName; ?>. </h1>

        <h2 style="color: blue;"> 😊 <?php echo $email1. "[". $userId ."] here ". $numvisits1 ."x, last visit: ". $user_lastDay." ". $user_lastDateTime; ?> 😊 </h2>
        <h3 style="color: yellow;">  <?php echo "IP=". $userIP ; ?>  </h3>
        <h3 style="color: orange;">  <?php echo " ". $user_loc ; ?>  </h3>

        <div class="div">...</div>
        <a href="https://algoinvestorr.com/algoz0/" class="neon_btn2">Buy Sell Signals</a>
        <a href="https://algoinvestorr.com/pivots/" class="neon_btn2">Price Levels</a>
        <a href="https://algoz.ai/ld/piv.php?sym=spy" class="neon_btn2">Week/Month/Yr Price Levels</a>
        <a href="https://algoinvestorr.com/ccc/" class="neon_btn2">Covered Call Calculator</a>
        <a href="https://algoinvestorr.com/newsletter.pdf" class="neon_btn2">Newsletter</a>
        <a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0" class="neon_btn2">Charting</a>
        <a href="https://algoz.ai/bmi/index.html" class="neon_btn2">BMI Calc</a>
        <a href="https://buy.stripe.com/fZedTI1QU8wuaOc9AR" class="neon_btn2">Buy Coin Stripe Test</a>
        <a href="https://algoz.ai/dj.pdf" class="neon_btn2">DJ Gianni B Albums</a>

        <a href="./login/logout.php" class="btn btn-warning">Logout</a>
    </div>
</body>
</html>