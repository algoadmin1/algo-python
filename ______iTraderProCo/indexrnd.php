<?php

/** 
                    by John Botti 08.20.2020,   10/14/13, 02.07.15
       aiDTregister.php - adapted from: userNewsignup.php    Version __________    - w/ NEW geobytes.com ___                   ver 5.4
//                                                                                 - with returning unique user ID #
* .php - Unity to SQL Database Connection
**/

//date_default_timezone_set("America/New_York");
//$nyTime == date("h:i:sa"). " on ".  date("Y-m-d") ;

//date_default_timezone_set("America/LosAngeles");

//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York");
$nyTime = date("h:i:sa"). " on ".  date("Y-m-d") ;
date_default_timezone_set("America/Los_Angeles");
ob_implicit_flush(1);

 $sym111 =111;

 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym =   $sym111 ;  // 111; //"QQQ";
    }
    // $sym = strtoupper($sym);

   // echo "] sym = ". $sym ;


$verNo="0.1";
$last_id ="";
$MIN_CANDLE_COUNT = 5;



function rndstring($slen) {

$bytes = random_bytes($slen);
echo "'". bin2hex($bytes) . "',";
    // echo "<br />";

 
}



// ########################################################################################
// 1 == go do Mysql SELECT to see if it exists IFnot THEN INSERT
// 0 == no insert
                     //   $MASTER_INSERT_FLAG = 0;
                        $MASTER_INSERT_FLAG = 1;
//
//
// ########################################################################################

  
    echo "] Reached pt 1... vers. $verNo <br />] The Time in New York is $nyTime, this system is running on PST. <br />";

    echo "<br />] len (ie  &sym=120) == $sym ;";
    echo "<br />] Randomizing Passwords...<br />";


// JMB's
// $stocksListWATCHLIST = array('0','1','2,'FCX' ); 


// $bytes = random_bytes(20);
// var_dump(bin2hex($bytes));
//     echo "<br />]";
//     echo "<br />]";

$i=0;

for($i=0;$i<40;$i++){
	if($sym==$sym111) $r = 8; //rand(8,128);
    else $r = $sym /2;

	rndstring($r);
 	echo "<br />";

}
 	echo "<br />]";
 	echo "<br />]";
 	echo "<br />]";


	echo "<br />] rndpwd ran successfully. Bye for now JB.<br /><br />EOF.";



?>

