<?php
// use this pg to login, just create a sess for anyone w/ right value in querystring = not really secure
	session_start();

	$_SESSION['user_id'] = 65169513146849; //s"O3N45V7D8YT8TFHVTRG3L3BF";

	header('Location: public.php');


?>