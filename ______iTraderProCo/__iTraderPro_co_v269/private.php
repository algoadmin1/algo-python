<?php

	//session_start();
	require_once('session.php');


 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Private Page</title>
	<meta name="viewport" content="width=device-width">
	<style></style>
</head>
<body>
	<header>
		<h1>Private Page</h1>
	</header>
	<main>
		<p>you can only see this page if you have a valid php session on our web server.</p>
		<p><a href="logout.php">LOGOUT</a></p>

	<!-- <p><?php
			// here we display the current status of the user
			//   signed IN or NOT
			//echo $_SESSION['john'];
		?></p> 
	-->

		
	</main>
</body>
</html>