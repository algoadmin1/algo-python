<?php

	session_start();
	
	// this kills a php session
	//  
	//  session_id();
	//  session_regenerate_id();
	  session_unset();
	  session_destroy();  // del file

  		header('Location: public.php');
 
	
 ?>