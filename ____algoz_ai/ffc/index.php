<?php
session_start();                                // vers 4.0
if (!isset($_SESSION["user"])) {
   header("Location: ../login/login.php");
}

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
	<div class="container">
		<div class="main-video-container">
			<video src="https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453178/vid01-01a.mov" loop controls class="main-video"></video>
			<h3 class="main-vid-title">Level 1: The Jab</h3>
		</div>
		<div class="video-list-container" id="videosList"></div>
	</div>

	<script src="Videoplaylist.js"></script>

</body>
</html>