
<!DOCTYPE html>
<html>
    <title>Algo Investor</title>
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

#left { width:700px; }
#left80 { width:80px; }
#right { float:  right;}
#container {width:1600;}
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

 if(isset( $_GET['email'] )){
        $email = $_GET['email'] ;
    }else{
        $email = "support@algoinvestor.club";
    }

 if(isset( $_GET['key'] )){
        $key = $_GET['key'] ;
    }else{
        $key = "nil";
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
        // echo  "+".$sym."~".$uname."~".$email."~".$key."~".$intrv ;  
        echo  "+".$sym."~".$email."~".$key."~".$uname."~".$intrv ;      
    
     ?>
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
    <!--
  <h1 style="text-align:center;font-family:fantasy;color:white;font-size:64px;">Algo Investor</h1>
-->
  <h1 style="text-align:center;font-family:fantasy;color:cyan;font-size:64px;">Algo Investor<sup style="font-family:Helvetica;color:cyan;font-size:24px;">TM</sup></h1>
  <!-- <p style="text-align:center;font-family:fantasy;color:white;font-size:64px;">Algo Investor<sup>TM superscript</sup> today...</p> -->

<!-- font-family:verdana; tahoma; Garamond; -->
<input  style="font-size:64px; text-transform: uppercase;" type="text" id="bigText"  placeholder="i.e. MSFT" name="sym" value="" style="width: 74; height: 80px;"><br>
<!--         <input type="text" class="bigText"  name=" item" align="left" />
-->
<!--             Time-per: <input type="text" name="timeper" value="Daily"><br>
-->

<!-- <div> -->
<div id="left80">
        <input  class="buttonblue1"  type="submit" value="   GET CHART   ">
</div>
<!-- <div id="startdate" > -->
<!-- 
<label for="stday">Start Date:</label>
<input style="font-size:42px;"  type="date" id="stday" name="sdate">
 -->



<div id="right">

<!-- UNCOMMENT THIS -->
<!-- 
<label for="start">Start date:</label>
<input style="font-size:42px;"   type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="1999-01-01" max="3000-12-31">
        -->
<!-- UNCOMMENT THIS -->

</div>




<!--
var result = getMMDD(document.getElementById("dateinput").valueAsDate);


  const dateControl = document.querySelector('input[type="date"]');
dateControl.value = '2017-06-01';
console.log(dateControl.value); // prints "2017-06-01"
console.log(dateControl.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

-->

<!-- </div> -->


<!-- </div> -->

<!-- <input   class="question-box"  type="submit" value="   GET AI CHART   "> -->
<!--
   <label for="endday">Final Date:</label>
  <input style="font-size:36px;"  type="date" id="endday" name="fdate">

     -->
</form>
</div>

<!-- <button class="buttongreen" onclick="scrollWin()">Scroll RIGHT ➡</button><br><br> -->

   <!--     <canvas id="myCanvas" width="8096" height="2048" style="border:1px solid #FFA500;"> 
        <canvas id="myCanvas" width="4096" height="2048" style="border:1px solid #FFA500;"> 
          
        <canvas id="myCanvas" width="6144" height="2048" style="border:1px solid #FFA500;">  -->


        <!-- <canvas id="myCanvas" width="8192" height="2048" style="border:1px solid #1133FF;">  -->
        <!-- <canvas id="myCanvas" width="4196" height="2048" style="border:1px solid #1133FF;">  -->

        <!-- if(gRESIZE_TEST==1){ } -->

        <canvas id="myCanvas" width="6144" height="2048" style="border:1px solid #11FF33;"> 
        <!-- <canvas id="myCanvas">  -->
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
    var inner = document.getElementById("d atasym");
    var gGET_SymbolStr = div.innerContent;
</script>
-->

       <script>
 
            var gGET_SymbolStr  =  document.getElementById("datasym").innerHTML; 

            var nx0 = gGET_SymbolStr.indexOf("+");
            var ny0 = gGET_SymbolStr.indexOf("~");

            if(gGET_SymbolStr == "+~"){

                gGET_SymbolStr="COP";
                // gGET_SymbolStr="NIL*";
                gGET_uname = "Guest";
            }else{       
                gGET_uname     = gGET_SymbolStr.substring( ny0+1  );
                gGET_SymbolStr = gGET_SymbolStr.substring( nx0+1, ny0 );

            }

           var gNextFridayStr = document.getElementById("datefri").innerHTML; 
            //var gNextMonthFridayStr = document.getElementById("datenextmonthfri").innerHTML; 


           var gGET_DateStr ="2000-12-31";  // = dateControl.value;

// <!-- UNCOMMENT THIS -->

          // // var gGET_DateStr  =  document.getElementById("startdate").innerHTML;  
          // const dateControl = document.querySelector('input[type="date"]');
          // // dateControl.value = '2017-06-01';
          // // var gGET_DateStr = dateControl.value;
          //   gGET_DateStr = dateControl.value;

          // console.log("] pre .js Load aiKernel : dateControl.value , gGET_DateStr==");    
          // console.log(dateControl.value , gGET_DateStr);   // prints "2017-06-01"
          // // console.log(dateControl.valueAsNumber);       // prints 1496275200000, a JavaScript timestamp (ms)

          // const input0 = document.querySelector('input[type="date"]') ;   // 'input');
          // input0.onchange = (e0) => {
          //   console.log('input[type="date"] == ' );
          //   console.log(e0.target.value);
          //   gGET_DateStr= e0.target.value;
            
          // }
//<!-- UNCOMMENT THIS -->

       </script>
 


 
       <script src="candleglobals.js"></script>
       <script src="datearrayserial.js"></script>
       <script src="gaugejb.js"></script>
       <script src="uiux.js"></script>
        <script src="candlesticks.js"></script>
        
<!-- 
          <script>
       	    var cdef007 = 10;
       	 	// var c007 = document.getElementById("myCanvas");
          //   var ctx007 = c007.getContext("2d");
			 
			     // ctx007.fillStyle = "#128866";    
        //     ctx007.font = "120px Arial";
        //     ctx007.fillText(  "<- php (6000,160)"  , 6000,  160  );

// Trebuchet MS
       </script> -->

<div>
    <!-- 
      <h2 style="text-align:center;font-family:Veranda;color:gray;font-size:34px;">Algo Investor<sup style="font-family:Veranda;color:gray;font-size:18px;">TM</sup> Copyright (c) 2010-2023 by Algo Investor Inc. All Rights Reserved.</h2>
 -->
      <h2 style="text-align:center;font-family:Trebuchet;color:gray;font-size:34px;">Algo Investor<sup style="font-family:Trebuchet;color:gray;font-size:18px;">TM</sup> Copyright (c) 2010-2023 by Algo Investor Inc. All Rights Reserved.</h2>

</div>

    </body>
</html>

