<?php 
session_start();
if (!isset($_SESSION["user"])) {
   header("Location: login.php");
}else{
    // there should be isset here... !!!!   FIX !!!!
    $email1=$_SESSION["user"];
    $userId=$_SESSION["userId"];
    // echo "<br />Logged in as: $email1";
 }
?>
<!-- page1.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styleboe.css">
    <link rel="shortcut icon" type="image/png"  href="/favicon.ico" />

    <title>algoz.ai</title>

</head>
<body>
    <div class="container">

    <div style="text-align: center;">

        <div class="logo1">
            <!-- <img src="bg.gif" alt="Logo"> -->
            <!-- <img src="logoalgoz.png" alt="Logo"> -->
            <img src="logoalgoz.jpg" alt="Logo">
            </div>
    </div>

        <div class="div">...</div>
        <!-- <a href="#" class="neon_btn1">BlackOps.com</a> -->
        <a href="https://algoinvestorr.com/algoz0/" class="neon_btn1">Buy Sell Signals</a>
        <a href="https://algoinvestorr.com/pivots/" class="neon_btn1">Price Levels</a>
        <a href="https://algoz.ai/ld/piv.php?sym=spy" class="neon_btn1">Week/Month/Yr Price Levels</a>
        <a href="https://algoinvestorr.com/ccc/" class="neon_btn1">Covered Call Calculator</a>
        <a href="https://algoinvestorr.com/newsletter.pdf" class="neon_btn1">Newsletter</a>
        <a href="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0" class="neon_btn1">Charting</a>
        <a href="https://algoz.ai/bmi/index.html" class="neon_btn1">BMI Calc</a>
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

</body>
</html>