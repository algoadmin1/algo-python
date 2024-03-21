<!DOCTYPE html>
<html>
    <!-- <title>iTraderPro</title> -->
    <title>algoInvestor v77</title>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="i.css">
        <link rel="stylesheet" href="stylesania.css">
<!--         <link rel="stylesheet" href="button1.css">
 -->        <link rel="shortcut icon" type="image/png"  href="/favicon.ico" />

<style>
body {
    background-color: black;
}

.btn-group button {
  background-color: #4450AF; /* Green background */
  border: 1px solid green; /* Green border */
  color: white; /* White text */
  padding: 6px 8px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #8888dd;
}
.button {
  font: bold 11px Arial;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
}

</style>

    </head>
    



<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
//date_default_timezone_set('America/New_York');


 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "SPY";
    }
   $sym = strtoupper($sym);

   // echo "] sym = ". $sym ;

 if(isset( $_GET['uname'] )){
        $uname = $_GET['uname'] ;
    }else{
        $uname = "Guest";
    }

 if(isset( $_GET['intrv'] )){
        $intrv = $_GET['intrv'] ;
    }else{
        $intrv = "day";
    }


?>

    
    
<script type="text/javascript">
        function zoom() {
          ;
            // document.body.style.zoom = "50%" 
            // document.body.style.zoom = "75%" 
        }
</script>

<!--body style="background-color:powderblue;" onload="zoom()"-->
<body style="background-color:black;" onload="zoom()">
 
    <!-- <body> -->
     
     
    
        <div id="result"></div>
<!-- 
        <div id="aitraderctr">
            <p><a href="https://nytrader.wordpress.com/sniper-trading/">MTWTF</a>   <a href="https://cnbc.com">CNBC.com</a>   <a href="https://stockcharts.com">STOCKCHARTS.com</a>  <a href="https://finance.yahoo.com">YAHOO FINANCE</a> </p>


        </div> -->

           <!--  <p><a href="https://money.cnn.com/data/dow30/">Dow Jones 30 Components</a>  <a href="https://en.wikipedia.org/wiki/List_of_S%26P_500_companies">S&P 500 Components</a> </p>

  -->
<!--    MTWTF

//	ctx.fillStyle = "#66ff33";   // arrowgreenColor ;
     //   ctx.font = "80px Arial";
      //  ctx.fillText( ( "==>"+gGET_SymbolStr+"<=="+rnd00.toString() ) , XendOfCandles*0.575,  175  );


        <div id="dow30">
            <p><a href="https://money.cnn.com/data/dow30/">Dow Jones 30 Components</a></p>
        </div>

        <div id="snp500">
            <p><a href="https://en.wikipedia.org/wiki/List_of_S%26P_500_companies">S&P 500 Components</a></p>
        </div>


      <p>Click Button for NEXT STOCK.</p>
        <button onclick="myFunction()">Next Chart</button>
        <p id="demo"></p>
-->
        
<!--        <p><a href="http://avattiresandbox.com/1/map/canvas-gauges-master/examples/radial-bar.html">Check out Radial Guages...</a></p>   -->


<div id="datasym" >
    <?php
        $sym = str_replace( " ", "", $sym);
        echo  "+".$sym."~".$uname ;       ?>
</div>


<div id="datefri" >
    <?php 
          $dateNextFri =   date("ymd", strtotime("third friday of this month"));  
         $dateNextMonthFri =   date("ymd", strtotime("third friday of next month"));  
         echo  $dateNextFri. "+".  $dateNextMonthFri."~"  ;   
    ?>
</div>
 

 

 

<div>
<form action="candlesticks.php">
  <h1 style="text-align:center;font-family:Helvetica;color:green;font-size:64px;">algoInvestor</h1>
<!-- font-family:verdana; tahoma; Garamond; -->
<input  style="font-size:64px; text-transform: uppercase;" type="text" id="bigText"  placeholder="i.e. GS" name="sym" value="" style="width: 74; height: 80px;"><br>
<!--         <input type="text" class="bigText"  name=" item" align="left" />
-->
<!--             Time-per: <input type="text" name="timeper" value="Daily"><br>
-->


<input  class="buttonblue1"  type="submit" value="   GET AI CHART   ">
<!-- <input   class="question-box"  type="submit" value="   GET AI CHART   "> -->

<!--  
  
  <label for="stday">Start Date:</label>
  <input style="font-size:36px;"  type="date" id="stday" name="sdate">
 --> 

 
<!--
   <label for="endday">Final Date:</label>
  <input style="font-size:36px;"  type="date" id="endday" name="fdate">

     -->
</form>
</div>
<!-- 
<div> 

  <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BTC.png"
         width="80" height="80">
       
 <a href="https://itraderpro.co/candlesticks.php?sym=ETHE"> <img alt="itr" src="https://itraderpro.co/img/crypto/ETH.png"
         width="80" height="80">   
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/ADA.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/DOGE.png"
         width="80" height="80">  

         
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/LTC.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/CVC.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/CNX.png"
         width="80" height="80"> 
  <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BCC.png"
         width="80" height="80">
       
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BCN.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/GNO.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/NXS.png"
         width="80" height="80">  



</div>
 -->
<!-- 
<div class="btn-group">

  <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BTC.png"
         width="80" height="80">
       
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/ETH.png"
         width="80" height="80">   
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/ADA.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/DOGE.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/LTC.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/CVC.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/CNX.png"
         width="80" height="80"> 
  <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BCC.png"
         width="80" height="80">
       
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/BCN.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/GNO.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/NXS.png"
         width="80" height="80">  
      
 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/ZEN.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/STEEM.png"
         width="80" height="80">  

 <a href="https://itraderpro.co/candlesticks.php?sym=GBTC"> <img alt="itr" src="https://itraderpro.co/img/crypto/POT.png"
         width="80" height="80">   
  
</div>

-->


<!-- OLD
<div class="social-menu">
  <ul>
    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
    

   <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/BTC.png"
         width="60" height="60">
      </a> <br>Bitcoin
      </li>

    <li><a href="https://itraderpro.co/candlesticks.php?sym=ETHE">
         <img alt="itr" src="https://itraderpro.co/img/crypto/ETH.png"
         width="60" height="60">
      </a> <br>Ethereum
      </li>
 
     <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/LTC.png"
         width="60" height="60">
      </a> <br>Litecoin
      </li>

      <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/ADA.png"
         width="60" height="60">
      </a> <br>CARDANO
      </li>

     <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/DOGE.png"
         width="60" height="60">
      </a> <br>Dogecoin
      </li>

     
  </ul>
<div>



  <br>

<div class="social-menu">
  <ul>

 
      <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/BCH.png"
         width="60" height="60">
      </a> <br>BitcoinCash
      </li>

     <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/XLM.png"
         width="60" height="60">
      </a> </img><br>XLM
      </li>

      <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/BNB.png"
         width="60" height="60">
      </a> <br>BNB
      </li>

     <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/USDT.png"
         width="60" height="60">
      </a> <br>USDT
      </li>

      <li><a href="https://itraderpro.co/candlesticks.php?sym=GBTC">
         <img alt="itr" src="https://itraderpro.co/img/crypto/XRP.png"
         width="60" height="60">
      </a> <br>Ripple
      </li>
 

  </ul>
</div>
 -->

<!-- 
<div>
<form action="/action_page.php">

</form>

<p>  </p>

</div>
 -->



<!-- <button class="buttongreen" onclick="scrollWin()">Scroll RIGHT ➡</button><br><br> -->



   <!--     <canvas id="myCanvas" width="8096" height="2048" style="border:1px solid #FFA500;"> 
        <canvas id="myCanvas" width="4096" height="2048" style="border:1px solid #FFA500;"> 
          
        <canvas id="myCanvas" width="6144" height="2048" style="border:1px solid #FFA500;">  -->
        <canvas id="myCanvas" width="6144" height="2048" style="border:1px solid #1133FF;"> 
             Your browser does not support the HTML5 canvas tag.</canvas>
       



 
<script>
// global0 variable, before candleglobals.js
  var g0LastCandlestickXdrawn ;


function scrollWin() {

  //window.scrollTo(500, 0);
  //window.scrollTo(g0LastCandlestickXdrawn, 0);

  window.scrollTo({
  left: 4800,
  //top: 400,  
  // left: g0LastCandlestickXdrawn,  
  behavior: 'smooth',
  });

}
</script>



<!-- Or in Div based method  
<script>
    var inner = document.getElementById("datasym");
    var gGET_SymbolStr = div.innerContent;
</script>
-->

       <script>
 
            var gGET_SymbolStr  =  document.getElementById("datasym").innerHTML;  

            var nx0 = gGET_SymbolStr.indexOf("+");
            var ny0 = gGET_SymbolStr.indexOf("~");

            if(gGET_SymbolStr == "+~"){

                gGET_SymbolStr="NIL*";
                gGET_uname = "Guest";
            }else{       
                gGET_uname     = gGET_SymbolStr.substring( ny0+1  );;
                gGET_SymbolStr = gGET_SymbolStr.substring( nx0+1, ny0 );

            }

           var gNextFridayStr = document.getElementById("datefri").innerHTML; 
            //var gNextMonthFridayStr = document.getElementById("datenextmonthfri").innerHTML; 

       </script>
 


 
       <script src="candleglobals.js"></script>

      <script src="datearrayserial.js"></script>
       <script src="stocknames.js"></script>
   
       <script src="gaugejb.js"></script>

       <script src="uiux.js"></script>


           
         <script src="candlesticks.js"></script>
        


          <script>
       	    var cdef007 = 10;
       	 	// var c007 = document.getElementById("myCanvas");
          //   var ctx007 = c007.getContext("2d");
			 
			     // ctx007.fillStyle = "#128866";    
        //     ctx007.font = "120px Arial";
        //     ctx007.fillText(  "<- php (6000,160)"  , 6000,  160  );


       </script>
    </body>
</html>


