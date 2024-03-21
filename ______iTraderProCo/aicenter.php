<!DOCTYPE html>
<html>
<title>aiDeepTrader</title>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" type="image/png"  href="/favicon.png" />

<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="i.css">
</head>
<style>
h1 {text-align: center;}
.paragraph {text-align: center;}
h2 {text-align: left;color: blue;}
b {text-align: center;color: blue;}
h1 .hadiyah {text-align:left;}


.logo {text-align: center;}
.header {text-align: center;}

p1 { text-align: center; font-size: 150%; }

</style>
<body>



<div class="header">
<div class="w3-container w3-black">
<!--
<img src="ai-logo.png" class="logo" alt="logo"/>
-->
</div>



<div class="rnd">
<img src="https://avattiresandbox.com/1/map/candles.png" alt=" " width="300px" height="70px">
</div>


<div class="login1">
<input class="buttonred" type="button" value="Login" onclick="window.location.href='https://avattiresandbox.com/1/map/login_aitrader.html'" />
</div>


<div class="w3-container">
 
<!-- <p1 style="color:black;">Is it Time To Trade?</p1> -->

<h1 style="color:blue;">aiDeepTrader.me</h1>


<script type="text/javascript">
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
    var d=new Date();
    var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
    var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;
    
    if(nhour==0){ap=" AM";nhour=12;}
    else if(nhour<12){ap=" AM";}
    else if(nhour==12){ap=" PM";}
    else if(nhour>12){ap=" PM";nhour-=12;}
    
    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;
    
    document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

window.onload=function(){
    GetClock();
    setInterval(GetClock,1000);
}
</script>
<div id="clockbox"></div>





</div>



<div class="paragraph">




<form>









 



<div class="button1">
<input class="buttongreen" type="button" value="Candlestick Charts BLACK" onclick="window.location.href='https://itraderpro.co/candlesticks.php'" />
</div>

<div class="button1">
<input class="buttonblue1" type="button" value="Candlestick Charts WHITE" onclick="window.location.href='https://itraderpro.co/candlestickswhite.php'" />
</div>


<div class="paragraph">

<input class="buttonblue1" type="button" value="Landing Page" onclick="window.location.href='https://itraderpro.co'" />

</div>

<!-- 
<div class="button1">
<input class="buttonblue1" type="button" value="Candlestick Charts BETA" onclick="window.location.href='http://avattiresandbox.com/1/map/candlestickswhite1.php'" />
</div>
 -->


<!-- 
<div class="button1">
<input class="buttonblue1" type="button" value="Plan The Trade" onclick="window.location.href='http://avattiresandbox.com/1/map/algoTrades.pdf'" />
</div>


<div>
<input class="buttonblue1" type="button" value="Earnings" onclick="window.location.href='http://avattiresandbox.com/1/map/2018-Q3-Earnings.pdf'" />
</div>

<div>
<input class="buttonblue1" type="button" value="News Scrape" onclick="window.location.href='http://104.236.93.47/dr.php'" />
</div>



<div class="paragraph">

<input class="buttonblue1" type="button" value="Scan Market" onclick="window.location.href='http://avattiresandbox.com/1/map/scanMarket.pdf'" />

</div>
 -->


<div class="paragraph">
<input class="buttonblue1" type="button" value="Sniper Trading MTWTF" onclick="window.location.href='https://nytrader.wordpress.com/sniper-trading/'" />
</div>
<!-- 
<div class="paragraph">
<input class="buttonblue1" type="button" value="Trader's Almanac" onclick="window.location.href='http://104.236.93.47/aitrader.html'" />
</div>

 -->

<!-- 

<div class="cyanbar">
<img src="https://avattiresandbox.com/1/map/bluebar.png" alt=" " width="256px" height="4px">
</div> -->


<div class="paragraph">
<input class="buttonblue1" type="button" value="Candlestick Basics" onclick="window.location.href='https://youtu.be/q-EYp_BZVAM'" />
</div>


<div class="paragraph">
<input class="buttonblue1" type="button" value="Top 10 Trading Sins" onclick="window.location.href='https://youtu.be/8BoH_UNNv6w'" />
</div>





<!-- 

<div class="cyanbar">
<img src="https://avattiresandbox.com/1/map/bluebar.png" alt=" " width="256px" height="4px">
</div>
 -->

<!--
<div class="paragraph">
<input class="buttonblue" type="button" value="Refresh Map" onclick="window.location.href='http://104.236.93.47/delivs.php'" />

<input class="buttonblue" type="button" value="Map Refreshed" onclick="window.location.href='http://104.236.93.47/1/map/delivpts.html'" />
</div>
 


-->







<!--
<div class="paragraph">
-->


<!-- 


<div class="paragraph">
<input class="buttonlightblue" type="button" value="PDF pgs Sample" onclick="window.location.href='http://avattiresandbox.com/tutorial/asmpdf.php'" />
<input class="buttonlightblue" type="button" value="Dashboard Sample" onclick="window.location.href='http://avattiresandbox.com/1/map/dashboard.png'" />
</div>


<div class="paragraph">
<input class="buttonlightblue" type="button" value="Path Finding Example" onclick="window.location.href='http://avattiresandbox.com/1/map/directions.html'" />
<input class="buttonlightblue" type="button" value="Info Window Example" onclick="window.location.href='http://avattiresandbox.com/1/map/infowindow.html'" />
</div>

 

<div class="paragraph">

<input class="buttonlightblue" type="button" value="YouTube Tutorial" onclick="window.location.href='https://youtu.be/VivitnBEkIM'" />
<input class="buttonlightblue" type="button" value="Polylines Example" onclick="window.location.href='http://avattiresandbox.com/1/map/polylines.html'" />
<input class="buttonlightblue" type="button" value="Mobile & AR aiTrader Design PDF" onclick="window.location.href='http://avattiresandbox.com/1/map/aitraderdesign.pdf'" />
</div>

<div class="cyanbar">
<img src="https://avattiresandbox.com/1/map/bluebar.png" alt=" " width="256px" height="4px">
</div>
-->



</form>





</body>
</html> 




<?php
    
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/Los_Angeles');
    
    // include $_SERVER["DOCUMENT_ROOT"]."/connect.php";
    //
  //  require 'customOrderText.php';
    
    
    
    
    
    
    if(isset($_GET['lang']))
    {
        $language = $_GET['lang'];
    }else $language = "en";
    
    
    if(isset($_GET['userID']))
    {
        $userID = $_GET['userID'];
    }else $userID="-1";
    
    
    if(isset($_GET['orderID']))
    {
        $orderID = $_GET['orderID'];
    }else $orderID="-1";
    
    
    
    
    $true = 1;
    if($true == 1){
        //if(isset($_POST['Submit'])){
        
        // $gEMAIL	=	$_POST['gEMAIL'];
        
        
        
        
        ///    echo "<br />] WELCOME IMANI !!<br /><br /><br />] Good Day, Creator.  gDATE== $gDATE <br />";
//        echo  "<br />";
//        echo  "<br />";
//
//        $item ="FUTURE FEATURES";
//        $item1="================================";
//        $item2="PDF REPORTS<br />YOUTUBE TUTORIAL<br />MAP MARKER INFO WINDOW<br />.fastq GENETIC INTEGRATION";
//        $item3="GOOGLE MAP PATH FINDING";
//        echo $item. "<br />";
//        echo $item1. "<br /><br />";
//        echo $item2. "<br />";
//        echo $item3. "<br />";
//       // PrintLocalizedText( $item, $language );
        
        
        ///    echo "<br />] WELCOME IMANI !!<br /><br /><br />] Good Day, Creator.  gDATE== $gDATE <br />";

    
    
    /*
			john's comments:

			good work - not bad for just a few hours

			mods:

			1. can we have a small left-hand border or space like leaflink
			2. can the top banner be fixed in place so everything scrolls underneath like leaflink.com?
			3. can the top banner be a jpg?
			4. let's set up a folder under http://avattireSandbox.com/imani/resources  for images and things to load
			5. in this #4 resources folder we can store images that are low KB (size)


    */
    
    
    
}   // if(isset($_POST['Submit'])){
?>
