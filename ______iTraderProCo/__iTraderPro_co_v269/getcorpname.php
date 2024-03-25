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



//   https://itraderpro.co/av/getdailydata.php?sym=dis&ds=2020-07-14&de=2016-12-13&num=112&msgs=1


//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York");
$nyTime = date("h:i:sa"). " on ".  date("Y-m-d") ;
date_default_timezone_set("America/Los_Angeles");
ob_implicit_flush(1);

set_time_limit(0);

$msgs =1;

$sym="";
$dstart="";
$dend="";

$msgs=0;
$numCandlesReq = 200;  


 if(isset( $_GET['msgs'] )){
        $msgs = $_GET['msgs'] ;
    }else{
        $msgs =0 ;
    }
   if($msgs==1)  echo "<br />] msgs= $msgs <br />";



 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "QQQ";
    }
   $sym = strtoupper($sym);

   if($msgs==1) {
echo "] sym = ". $sym ;
echo "<br />";
}
 
$verNo="8.6 getcorpname !";
$last_id ="";
$MIN_CANDLE_COUNT = 5;

// ########################################################################################
// 1 == go do Mysql SELECT to see if it exists IFnot THEN INSERT
// 0 == no insert
                     //   $MASTER_INSERT_FLAG = 0;
                        $MASTER_INSERT_FLAG = 1;
//
//
// ########################################################################################

  
   if($msgs==1) {
    echo "] Reached Server... vers. $verNo <br />] The Time in New York is $nyTime, this system is running on PST. <br />";

    echo "<br />] ticker == $sym ...";
    echo "<br />] Connecting...";

}
  

 
$symboljb =  $sym ;    

   if($msgs==1) {
     echo "<br /><br />] ATTEMPTING TO CONTACT the ITRADERPRO  JH_MySql server...<br />] PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;

    echo "<br />########################################################################################";
     echo "<br />";
    }


    $con = mysqli_connect("localhost", "itraderp_jb_jackabeejohn", "jackabee66", "itraderp_jb_jackabee_Users1");
    if (!$con) die('Could not connect to itraderp***kabee_Users1: ' . mysqli_error($con));
    mysqli_select_db($con, "itraderp_jb_jackabee_Users1") or die ("DB select failed - " . mysqli_error($con));


   if($msgs==1) {
    echo "<br />] MySql Connection Good!  <br />"; 
    echo "<br />";

    echo "<br />########################################################################################";

    echo "<br />";
    echo "<br />";
    }


 
	$symboljbUpper = strtoupper( $symboljb ); 
    $tickerFound = 0;

    $query5  = "SELECT * FROM tickerNames   WHERE  ticker LIKE '$symboljbUpper' limit 1";
    $result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());  

          $j = 0;
          $id=-1;
          while($row = mysqli_fetch_array($result5))
          {
              $data_corpname = $row['corpname'];
             // if($j==0){
                $id  =  1; 
                $tickerFound = 1;
               //}
              $j++; 
          }//while

  
 
            if($id>0){ // we found at least 1 w/ same userName
                    echo "[". $data_corpname . "]<br />";
             }else{ 

                  if($msgs==1) echo "[". $symboljbUpper . "] DOES NOT EXISTS.";
                    echo "!NoCorpNameInDataBase". "\n";
                 }


  
 if($msgs==1) echo "<br />"; 

 
   if($msgs==1)  echo "******************  EXITING... ******************************  <br />] PDT = ". date("h:i:sa"). " on ".  date("Y-m-d") ."<br />";

	if($msgs==1) echo "<br />] Closing MySql DB... ";

    mysqli_close($con);
    unset($con );
 

	if($msgs==1){
        echo "<br /><br />] END RUNTIME== PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;
        echo "<br />] DB Closed Successfully. Bye for now JB.<br /><br />EOF.";
    }
 

///*************** EOcode

function f4( $fvar ){
                 return   ( number_format((float)$fvar, 4, '.', '')   );  // Outputs -> 105.00

}

?>

