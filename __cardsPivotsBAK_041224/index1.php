<!DOCTYPE html>
<!-- https://www.youtube.com/watch?v=qOO6lVMhmGc&t=1059s 
 https://www.fiverr.com/prakashahi
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pivots</title>
    <link rel="stylesheet" href="css/styles.css">
    <!-- <link rel="stylesheet" href="css/swiper-bundle.min.css"> -->
    <link rel="shortcut icon" type="image/png"  href="img/favicon.ico" />

    <!-- https://fonts.google.com/icons?icon.query=arrow -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />



</head>

<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
//date_default_timezone_set('America/New_York');

include 'standardfunctions.php';

 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "SPY";
    }
$sym = strtoupper($sym);
// echo "] sym = ". $sym ;

?>

<body>

    <div id="datasym" >
        <?php
            $sym = str_replace( " ", "", $sym);
            echo  $sym ;      
        ?>
    </div>



    <!-- <div class="slide-container swiper"> -->
    <div class="slide-container ">
        <div class="slide-content">

            <!-- <div class="card-wrapper swiper-wrapper"> -->
            <div class="card-wrapper">

<!--                
                    <div class="card">   
                        <div class="image-content">
                            <span class="overlay"></span>
                            <div class="card-image">
                                <img src="img/nvda.png" alt="" class="card-img">
                            </div>
                        </div>
                        <div class="card-content">
                            <h2 class="name">NVDA</h2>
                            <p class="description">Corporate Info. BUY SIGNAL 5 mins ago...Pivots = S1, P, R1 012345678901234567890123456789</p>
                            <button class="button">Get Chart</button>
                            <button class="button" onclick="window.open('https://algoinvestorr.com/fire')">Get Chart</button>

                        </div>
                    </div>   -->

            </div>
        </div>

<!-- 
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div> -->


<!-- 
        <form id="frm1" action="/action_page.php">
            First name: <input type="text" name="fname"><br>
            Last name: <input type="text" name="lname"><br><br>
            <input type="button" onclick="myFunction()" value="Submit">
          </form>
           -->



    <!-- <div class="jb-empty">_s</div> -->

    <!-- <form  action="https://itraderpro.co/candlesticks.php?sym=msft&uname=guest&email=johnbotti9000@gmail.com&key=8a2b18a0"> -->
        <!-- <form id="frm1"  action="js/accessaa.php"> -->
        <form id="frm1"  action="index1.php">
        <!-- <form  action="js/accessaa.php?sym=jwn&uname=jb"> -->
        <div class="search">
            <span class="search-icon material-symbols-outlined">search</span>
            <!-- <input class="search-input" type="search" placeholder="search"> -->
            <!-- <input class="search-input" style="font-size:24px; text-transform: uppercase;" type="search" name="sym" placeholder="ie aapl zm tsla btc- sol- eth-"> -->
            <input class="search-input" style="font-size:24px; text-transform: uppercase;" type="search" name="sym" placeholder="ie aapl tsla btc- sol- ">

        </div>
        <!-- <input type="button" onclick="myFunction1()" value="Submit"> -->

    </form>




    <script>
    
        let gGET_SymbolStr  =  document.getElementById("datasym").innerHTML; 

    </script>



    <script>
        async function readJsonUrl9(jsonUrl) {
            try {
                // Fetch JSON data from the provided URL
                const response = await fetch(jsonUrl);

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Parse JSON data
                const jsonData = await response.json();

                // Convert JSON data to the proper JavaScript format
                const convertedData = jsonData.map(trade => {
                    // Remove double quotes around each field
                    const convertedTrade = {};
                    for (const key in trade) {
                        const trimmedKey = key.trim();
                        const value = trade[key].trim();
                        convertedTrade[trimmedKey] = value;
                    }
                    return convertedTrade;
                });

                // Return the converted JSON array
                return convertedData;
            } catch (error) {
                console.error('Error fetching JSON data:', error);
                return null;
            }
        }

        // // Example usage
        // const jsonUrl = 'https://algoinvestorr.com/trades/rawtrades/cuedtrades.json';
        // readJsonUrl(jsonUrl)
        //     .then(data => {
        //         console.log(data); // Output the converted JSON array
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        
        // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AA&outputsize=compact&datatype=json&apikey=5B4L3BMV41G6BCDH

        // const url9= "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=YUM&outputsize=compact&datatype=json&apikey=5B4L3BMV41G6BCDH";
        

        function RemoveChars(string0, charstr) {
            let result = '';
            for (let i = 0; i < string0.length; i++) {
                if (charstr.includes(string0[i])) {
                    result += string0[i];
                }
            }
            return result;
        }

    // Example usage:
    // let originalString = "Hello, World!";
    // let allowedCharacters = "abcdefghijklmnopqrstuvwxyz ";
    // let modifiedString = RemoveChars(originalString, allowedCharacters);
    // console.log(modifiedString); // Output will be "Hello World"

        let url7a="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=";
        let url7b="&market=USD&apikey=5B4L3BMV41G6BCDH";


        let url9a= "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
        let url9b= "&outputsize=compact&datatype=json&apikey=5B4L3BMV41G6BCDH";
        gGET_SymbolStr1=gGET_SymbolStr.toUpperCase();
        let gGET_SymbolStr2 =  RemoveChars(gGET_SymbolStr1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ-@");

        let url9 = url9a+ gGET_SymbolStr2 + url9b;
        let urlStocks=url9;

        let url7 = url7a+ gGET_SymbolStr2 + url7b;
        let urlCrypto=url7;

        // function getData0(urlstr) {
        //     result = readJsonUrl9(urlstr);
        //     console.log("result=",result);
        // }

        function myFunction1() {
            console.log("CALLING getData0()");
          //getData0(url9);

          document.getElementById("frm1").submit();
        }
    </script>


    </div>



<!--
    var gGET_SymbolStr  =  document.getElementById("datasym").innerHTML; 
<input  style="font-size:64px; text-transform: uppercase;" type="text" id="bigText"  placeholder="i.e. MSFT" name="sym" value="" style="width: 74; height: 80px;"><br>
-->



    </body>




     <script src="js/cuedtrades.js"></script>
     <!-- <script src="js/swiper-bundle.min.js"></script> -->
     <!-- <script src="https://algoinvestorr.com/trades/rawtrades/cuedtrades0.js"></script> -->
     <!-- <script src="https://algoinvestorr.com/trades/rawtrades/cuedtrades.js"></script> -->
     <script src="https://algoinvestorr.com/pivots/js/singlecard.js"></script>
     <script src="js/imgfiles.js"></script>
     <script src="js/script24.js"></script>
     <!-- <script src="js/accessaa.js"></script> -->

</html>
