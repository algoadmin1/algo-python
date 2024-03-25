<?php
// yt vid : https://www.youtube.com/watch?v=i89a4Zbzy20&t=7s

	session_start();

// $_SESSION['john'] = "johns variable";
//  unset($_SESSION['john']);

?>	
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Public-Facing Page</title>
	<meta name="viewport" content="width=device-width">
	<style></style>
</head>
<body>
	<header>
		<h1>Public Facing Pg</h1>
	</header>
	<main>
		<p>anyone can see this page</p>

		<p><a href="login.php">Login</a></p>

		<?php
			// here we display the current status of the user
			//   signed IN or NOT
			if( isset($_SESSION['user_id']) ){
				 //echo $_SESSION['user_id'];
				?>

		<p>Go to the <a href="private.php">PRIVATE PAGE</a>.</p>
		<?php		
			}
		?>


	</main>
</body>
</html>