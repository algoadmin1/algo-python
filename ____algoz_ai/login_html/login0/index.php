<?php
session_start();                                // vers 4.0
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

<!-- 
            <li class="items">
                <i class="fa-solid fa-house"></i>
                <p class="para">Home</p>
            </li> -->
<!-- 
            <li class="items">
                <i class="fa-solid fa-search"></i>
                <p class="para">ai Prompt</p>
            </li>  -->
<!-- 
            <li class="items">
                <i class="fa-solid fa-search"></i>
                <p class="para">Search</p>
            </li>  -->
            <!--  
            
             'https://algoinvestorr.com/pivots/'    'https://algoinvestorr.com/ccc/'  
            
            <li class="items">
                <i class="fa-solid fa-user"></i>
                <p class="para">Account</p>
            </li> -->
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>algoz.ai</title>
    <link rel="stylesheet" href="style_navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="shortcut icon" type="image/png"  href="favicon.ico" />
    <!-- https://fontawesome.com/v4/icons/ -->
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <div class="logo items">
                <!-- <img src="img/a1.png" alt=""> -->
                <img src="logo_navbar.png" alt="">
                <span class="mainHead para">
                    <!-- <h5>algo</h5> -->
                    <!-- <h4>Investor<sup>TM</sup></h4> -->
                    <h4>algoz.ai<sup style="font-size: 50%;">TM</sup></h4>
                    <!-- <h4>Investor</h4> -->
                </span>
            </div>


            <li class="items" id="pricelevelsBtn">
                <i class="fas fa-money-bill"></i>
                <!-- <i class="fa-solid fa-list-alt"></i> -->
                <p class="para">Price Levels</p>
            </li> 
            <script>
                document.getElementById('pricelevelsBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoinvestorr.com/pivots/'; // Redirect to the logout page
                });
            </script>
            
            <li class="items" id="cccBtn">
                <i class="fa-solid fa-calendar-days"></i>
                <p class="para">Covered Call Calc</p>
            </li>
            <script>
                document.getElementById('cccBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoinvestorr.com/ccc/'; // Redirect to the logout page
                });
            </script>



            <li class="items" id="buysellBtn">
                <!-- <a href="https://algoinvestorr.com/algoz0"> -->
                <!-- <i class="fa-solid fa-line-chart"></i> -->
                <i class="fa-solid fa-traffic-light"></i>
                    
                    <!-- <p class="para style=font-size: 90%;">Buy Signals</p> -->
                    <!-- <p class="para style=font-size: 100%;">⬆️ ⬇️Signals</p> -->
                    <!-- <p class="para style=font-size: 100%;">Buy⬆Sell⬇ Signals</p> -->
                    <p class="para style=font-size: 100%;">BuySell Signals</p>
                    <!-- <p class="para style=font-size: 100%;">Buy Signals</p> -->
                <!-- </a> -->
            </li> 
            <script>
                document.getElementById('buysellBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoinvestorr.com/algoz0/'; // Redirect to the logout page
                });
            </script>




            <!-- <li class="items">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p class="para">Notification</p>
            </li> -->
            

            <!-- <li class="items">
                <i class="fa-solid fa fa-film"></i>
                <p class="para">Webinar</p>
            </li> -->

       
            <!-- <li class="items">
                <i class="fa-solid fa-calendar-days"></i>
                <p class="para">Events</p>
            </li> -->
           
            <!--    
            <li class="items">
                <i class="fa-solid fa-envelope"></i>
                <p class="para">Messages</p>
            </li> -->
            
          

            <li class="items" id="chartBtn">
            <i class="fa-solid fa-line-chart"></i>
            <p class="para">Charting</p>
            </li>
            <script>
                document.getElementById('chartBtn').addEventListener('click', function() {
                    window.location.href = 'https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=algoinvestorr@gmail.com&key=8a2b18a0';  
                });
            </script>
            

            <li class="items" id="aiBtn">
            <i class="fa-solid fa-search"></i>
            <!-- <i class="fa-solid fa-microchip-ai"></i> -->
            <p class="para">ai Prompt</p>
            </li> 
            <script>
                document.getElementById('aiBtn').addEventListener('click', function() {
                    window.location.href = 'https://chatgpt.com/';  
                });
            </script>

            <li class="items"  id="newsletterBtn">
                <i class="fa fa-newspaper"></i>
                <!-- <i class="fa fa-newspaper-o"></i> -->
                <p class="para">Newsletter</p>
            </li>
            <script>
                document.getElementById('newsletterBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoinvestorr.com/newsletter.pdf'; // Redirect to the logout page
                });
            </script>
            
            <li class="items" id="bookcallBtn">
                <i class="fa-solid fa-phone"></i>
                <p class="para">Book Call</p>
            </li>  
            <script>
                document.getElementById('bookcallBtn').addEventListener('click', function() {
                    window.location.href = 'https://buy.stripe.com/28o5ncbru14209yaEP'; // Redirect to the logout page
                });
            </script>


            <li class="items" id="bmiBtn">
                <i class="fa-solid fa-weight-scale"></i>
                <p class="para">BMI Caloric Calc</p>
            </li>
            <script>
                document.getElementById('bmiBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoz.ai/bmi';  
                });
            </script>


            <li class="items" id="ffcBtn">
                <i class="fa-solid fa-heart"></i>
                <p class="para">Get Fit</p>
            </li>
            <script>
                document.getElementById('ffcBtn').addEventListener('click', function() {
                    window.location.href = 'https://algoz.ai/ffc';  
                });
            </script>



            <!--   <i class="fa-solid fa-microchip-ai"></i> -->
            
            <!--
            <li class="items">
                <i class="fa-solid fa-gear"></i>
                <p class="para">Settings</p>
            </li>
             -->


<!--             
            <li class="items" id="settings-item">
                <i class="fa-solid fa-gear"></i>
                <p class="para">Settings</p>
            </li> -->
    
            <!-- <a href="./login/logout.php" class="btn btn-warning">Logout</a> -->
            <li class="items logout-btn" id="logoutBtn">
                <i class="fa-solid fa-right-from-bracket"></i>
                <p class="para">Logout</p>
            </li>
            <!-- <style>   didn't work
                .pressed {
                    background-color: #ffcc00; /* Yellow color when pressed */
                    color: #fff; /* White text */
                }
            </style> -->

            <!-- JavaScript to handle logout button click -->
            <script>
                document.getElementById('logoutBtn').addEventListener('click', function() {
                    window.location.href = './login/logout.php'; // Redirect to the logout page
                });
            </script>

        </div>

        <div class="toggler">
            <i class="fa-solid fa-bars" id="toggle-bars"></i>
            <i class="fa-solid fa-xmark" id="toggle-cross"></i>
        </div>

    </div>


 <!--  ADDED...   -->

    <div class="content">
        <div class="canvas-container">
            <!-- <canvas id="myCanvas"></canvas>   -->
            <canvas id="myCanvas" width="500" height="400"></canvas> <!-- Canvas added here -->
        </div>
    </div>
    
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Handle click event for Settings
            document.querySelector("#settings-item .para").addEventListener("click", function () {
                // Draw on the canvas when "Settings" is clicked
                drawRectangles();
                // Redirect to settings.php
                //   window.location.href = "settings.php";
            });
    
            // Function to draw two vertical rectangles on the canvas
            function drawRectangles() {
                var canvas = document.getElementById("myCanvas");
                if (canvas.getContext) {
                    var ctx = canvas.getContext("2d");
    
                    // Clear the canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                    // Canvas dimensions
                    var canvasWidth = canvas.width;
                    var canvasHeight = canvas.height;
    
                    // Rectangle dimensions
                    var rectWidth = 16;
                    var rectHeight = 280;
                    var offset = 8;
    
                    // Calculate the x-coordinates to center the rectangles and apply offset
                    var centerX = (canvasWidth / 2);
                    var redRectX = centerX - (rectWidth + offset / 2);  // Left of the center
                    var greenRectX = centerX + (offset / 2);  // Right of the center
    
                    // Y-coordinate to center the rectangles vertically
                    var centerY = (canvasHeight - rectHeight) / 2;
    
                    // Draw the red rectangle
                    ctx.fillStyle = "red";
                    ctx.fillRect(redRectX, centerY, rectWidth, rectHeight);
    
                    // Draw the green rectangle
                    ctx.fillStyle = "green";
                    ctx.fillRect(greenRectX, centerY, rectWidth, rectHeight);
                }
            }
        });
    </script>






    <script src="script_navbar.js"></script>
</body>
</html>