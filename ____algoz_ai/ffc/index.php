<?php
session_start();       		   // vers 5.6   fitness ffc index
$user_email="";                      
$user_loc="";                      
if (!isset($_SESSION["user"])) {
   header("Location: ../login/login.php");
}else{
	$user_email=$_SESSION["user"];
	$user_loc=$_SESSION["user_loc"];

	$levelName= "Level 1: The Jab";

	$emailParts = explode('@', $user_email); // Split the string at '@'
    $emailname = $emailParts[0];

    // $email1=$_SESSION["user"];
    // $numvisits1=$_SESSION["numvisits"];
    // $userIP=$_SESSION["userIP"];
    // $userId=$_SESSION["userId"];
    // $user_loc=$_SESSION["user_loc"];
    // $user_lastDateTime  = $_SESSION["user_lastDateTime"] ;
    // $user_lastDay = $_SESSION["user_lastDay"]  ;
                 
    // // /Users/mac2021/Desktop/_dev/Projects/algo-python/____algoz_ai/login_html/login0/index.php

    // // $products=$_SESSION["products"];  // =="coin|newsletter|charts|ccc|"
  
    // if($user_loc!=""){
    //     $emailname.= " from ". $user_loc. "!";
    // }
    // $email1a= strtolower($email1);
    // $gChart= 0;
    // if($email1a=="roguequant1@gmail.com"){
    //     $gChart= 1;
    // }

 }
// require_once "./login/database.php";


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Fighting FasterClass</title>
    <link rel="shortcut icon" type="image/png"  href="favicon.ico" />

	<link rel="stylesheet" href="Videoplaylist.css">

</head>
<body>
 	<div style="text-align: center;">
                <div class="logo1">
                <img src="logo256x144.jpg" alt="Logo">
                </div>
    </div>


   <div class="input-group">
             <select id="lang" name="lang" required>
                 <option value="">--Select Language--</option>
                 <option value="0">English</option>
                 <option value="1">Spanish</option>
                 <option value="2">French</option>
                 <option value="3">German</option>
                 <option value="4">Portuguese</option>
                 <option value="5">Italian</option>
                 <option value="6">Japanese</option>
                 <option value="7">Mandarin</option>
                 <option value="8">Korean</option>
                 <option value="9">Russian </option>
                 <option value="9">Arabic </option>
             </select>
    </div>


	<div class="container">
		<div class="main-video-container">
			<video src="https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453178/vid01-01a.mov" loop controls class="main-video"></video>
			<!-- <h3 class="main-vid-title">Level 1: The Jab</h3> -->
			<h3 class="main-vid-title"><?php echo $levelName. " - for ". $emailname; ?></h3>

		</div>
		<div class="video-list-container" id="videosList"></div>
	</div>


          

 	<div style="text-align: center;">
   	<button class="nxt-btn" id="nextBtn">   Next Level   </button>
	</div>
	<script>
	    document.getElementById('nextBtn').addEventListener('click', function() {
	        window.location.href = 'https://algoz.ai/ffc/index_ffclvl2.php';
	    });
	</script>




<!-- 
	<div style="text-align: center;">
   	    <button class="prv-btn" id="prevBtn">  Previous Level   </button>
   	    <button class="nxt-btn" id="nextBtn">   Next Level   </button>
	</div>

	<script>
	    document.getElementById('prevBtn').addEventListener('click', function() {
	        window.location.href = 'https://algoz.ai/ffc';
	    });
	    document.getElementById('nextBtn').addEventListener('click', function() {
	        window.location.href = 'https://algoz.ai/ffc3';
	    });
	</script>
 -->
<!-- 
<script>
document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const feet = parseInt(document.getElementById('feet').value);
    const inches = parseInt(document.getElementById('inches').value);
    const weight = parseFloat(document.getElementById('weight').value);   // lbs

    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value ;
    const actlevel = parseInt(document.getElementById('actlevel').value) ;
 }
	</script>
 -->

	<script src="Videoplaylist.js"></script>

</body>
</html>