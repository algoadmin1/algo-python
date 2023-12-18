<?php

/// PHP version: 7.3.6
//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);
//date_default_timezone_set('America/Los_Angeles');
date_default_timezone_set('America/New_York');

// $searchQuery = $_POST["post_query"];
$searchQueryID = $_POST["id"];
$uname =  "Ted";
$uname =  $_POST["un"];
$searchQuery = $_POST["astr"];

  $splitChars = ",";

$cs = ", ";  
$br ="<br />";

 // $con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
	// if (!$con) die('Could not connect: ' . mysqli_error($con));
	// mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));
 // //echo "] Connected to MySQL-i...<br />";

	$datestr =  date("Y-m-d") ;
 	$timestr =   date("h:i:sa"). " EST";
 	$dateElab =   date("l jS \of F Y h:i:s A"). " EST" ;
 	echo "=!datapost reached at $timestr on $datestr ...\n=[id] == $searchQueryID \n";
 
 	echo "searchQuery = $searchQuery \n";


  $params = explode (",", $searchQuery);
  $cntp = count($params);

  $message1="";
  $strsend="[datapost ". $dateElab  . "]\n\n";
  for($p=0;$p<$cntp;$p++){
  	$strsend .= $p.")".  $params[ $p ]. " \n\n";

  	  $paramsFields = explode ("|", $params[ $p ] );    //  $params[ $p ]=   |AAPL|sdjkhfa|asdf| etc
		$ssym = $paramsFields[ 1];
   

  $messageSym = '<p><a href="https://itraderpro.co/candlesticks.php?sym='. $ssym .'&uname='. $uname .'">'.$ssym .'</a></p>';
  $messageSym = '<h2><a href="https://itraderpro.co/candlesticks.php?sym='. $ssym .'&uname='. $uname .'">'.$ssym .'</a></h2>';

   // <a href="https://www.w3schools.com">Visit W3Schools.com!</a>



  	// $msg0 = wordwrap($msg,70);
		if( ($p % 2)== 1){
		  	$message1 .= $messageSym .'<p style="color:#22f;font-size:18px;"> ' . $params[ $p ] .'</p>';

		}else{  
		  	$message1 .= $messageSym .'<p style="color:#22a;font-size:18px;"> ' . $params[ $p ] .'</p>';

		}
  }//for
  echo $strsend;

//mail(to,subject,message,headers,parameters); 
// the message
$msg = $strsend ; //"First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);
$subjectstr = "iTraderPro.co AlgoRun: ". $timestr ." on ". $datestr;

$emailstr1 = "johnbotti2013@gmail.com";
$emailstr2 = "roguequant1@gmail.com";
$emailstr3 = "blackopsentertainment@gmail.com"; //"ted_larkin@alum.mit.edu";
$emailstr4 = "johnbotti9000@gmail.com";
$emailstr5 = "jackabee.inc@gmail.com";
$emailstr6 = "willbotti@gmail.com,ted_larkin@alum.mit.edu,mdss17@gmail.com";

$support_email="support@itraderpro.co";

// $msg0 = "<!DOCTYPE html>". $br. "<html><br /><head><br /><title>". $msg . "</title><br /></head><br /></html><br />";

$emailstr0 = $emailstr1. $cs. $emailstr2. $cs. $emailstr3. $cs. $emailstr4. $cs. $emailstr5 ; // .  $cs. $emailstr6;
$rn  = "\r\n";
// send email
// mail($emailstr0,$subjectstr,$msg );

/*
https://itraderpro.co/candlesticks.php?sym=spy&uname=john

<p>
<a href="https://itraderpro.co/candlesticks.php?sym=qqq&uname=john">
<img border="0" alt="iTraderPro.co" src="itraderpro.co/itraderprologo.png" width="256" height="256">
</a>
</p>


<p><a href="https://itraderpro.co/candlesticks.php?sym=qqq&uname=john"><img border="0" alt="iTraderPro.co" src="itraderpro.co/itraderprologo.png" width="256" height="256"></a></p>


<a href="https://www.w3schools.com">Visit W3Schools.com!</a>


*/

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";   // $rn 
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$support_email. "\r\n".
    'Reply-To: '. $support_email."\r\n" .
    'X-Mailer: PHP/' . phpversion();  //PHP version: 7.3.6 on 2020-11-24
 
// Compose a simple HTML email message
$message = '<html><body>';
$message .= '<p><a href="https://itraderpro.co/candlesticks.php?sym=qqq&uname='. $uname .'"><img border="0" alt="iTraderPro.co" src="itraderpro.co/itraderprologo.png" width="128" height="127"></a></p>';
$message .= '<h1 style="color:#f40;">Hi '. $uname .'!</h1>';
$message .= '<h2 style="color:#830;">Your iTraderPro.co Algo Run is complete.</h2>';
$message .= '<p style="color:#080;font-size:24px;">' . $dateElab .'</p>';
$message .= $message1;
// $message .= '<p style="color:#00a;font-size:16px;"> ' . $message1 .'</p>';
$message .= '</body></html>';
 

// Sending email
//   mail($emailstr0,$subjectstr,$msg );

if(mail($emailstr0, $subjectstr, $message, $headers)){
    echo 'Your mail has been sent successfully.';
} else{
    echo 'Unable to send email. Please try again.';
}




/*


<?php

$to = 'maryjane@email.com';
$subject = 'Marriage Proposal';
$from = 'peterparker@email.com';
 
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$user_email."\r\n".
    'Reply-To: '.$user_email."\r\n" .
    'X-Mailer: PHP/' . phpversion();  //PHP version: 7.3.6
 
// Compose a simple HTML email message
$message = '<html><body>';
$message .= '<h1 style="color:#f40;">Hi Jane!</h1>';
$message .= '<p style="color:#080;font-size:18px;">Will you marry me?</p>';
$message .= '</body></html>';
 

// Sending email
if(mail($to, $subject, $message, $headers)){
    echo 'Your mail has been sent successfully.';
} else{
    echo 'Unable to send email. Please try again.';
}
?>





<!DOCTYPE html> 
<html> 
    <head> 
        <title>Header Tag</title> 
    </head> 
    <body> 
        <article> 
            <header> 
                <h1>This is the heading.</h1> 
                <h4>This is the sub-heading.</h4> 
                <p>This is the metadata.</p> 
            </header> 
        </article> 
    </body> 
</html>     
*/


// $splitChars = ",";
// $afterAdrsee = strpbrk($searchQuery,$splitChars);
// $avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd

// $params = explode (",", $afterAdrsee);

// // $password= $params[1];
// // $passwordSHA1 = sha1( $password );
// // $lastIP  = $params[2];
// $toUserName = $avName;
// $toUserNamesCheck = $avName;
// $toUserNamesCheck1 = strtolower($toUserNamesCheck);
 
 

?>



