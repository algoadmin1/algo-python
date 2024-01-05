<?php
//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set("America/New_York"); 
                                                      $vers = "1.10";
 
$CurrencyStr="$";
$todaysdate = date('Y-m-d');

$msg0 = "nilMsg";
$subj0= "nilSubject";

$to_email_address0 ="roguequant1@gmail.com";
$from_email_address0="algoinvestorr@gmail.com";
$toemail=$to_email_address0;

$to_email_address0 = isset($_GET['to']) ? $_GET['to'] : $toemail ;
$subject1 = isset($_GET['subj']) ? $_GET['subj'] : $subj0 ;
$message1 = isset($_GET['msg']) ? $_GET['msg'] : $msg0 ;

$to_email_address   =$to_email_address0; 
$subject0           =$subject1;
$message0           =$message1;
// [$headers],[$parameters]);
// From is required - update with your sender
$headers = 'From: <algoinvestorr@gmail.com>' . "\r\n";

// The content type is required when sending HTML Based emails.
// $headers  = "Content-type:text/html;charset=UTF-8" . "\r\n";
// $headers = "MIME-Version: 1.0" . "\r\n";

// calling the mail function to send the mail using the hosted web server.
// mail($to_email_address,$subject0,$message0,$headers);
if(mail($to_email_address,$subject0,$message0,$headers)) {
    echo 'Email sent successfully to '. $to_email_address;
} else {
    echo 'Failed to send email.';
}
//   mail($to_email_address,$subject0,$message0,[$headers],[$parameters]);


/*


The function shown above is the PHP mail function. As you can see, it accepts five parameters. But you can send an email using the four parameters discussed below.

$to_email_address: The recipient of the email. This address must be compliant with the RFC-2822 Standards.
$subject: The subject of the email.
$message: The email body (Text/ HTML). Each line in the email must not exceed 70 characters, and a line must be separated using a new line token (\n).
$headers: The headers of the email. The "from" header is mandatory, and the "Content-Type" header is only compulsory when sending a templated email.




//Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Create an instance of PHPMailer
$mail = new PHPMailer(true); // pass true to enable debugging and handle errors

try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; // enable debugging    

    $mail->isSMTP(); // use smtp connection to send email                                       

    $mail->Host = 'smtp.gmail.com'; //set up the gmail SMTP host name                     

    $mail->SMTPAuth = true; // use SMTP Authentication to allow your account to authenticate                                 $mail->Username = '<YOUR-GMAIL-EMAIL-ADDRESS>';                     $mail->Password = '<YOUR-ACCOUNT-PASSWORD>';                               $mail->Port = 587; // set the SMTP port in Gmail

    $mail->SMTPSecure = "tls"; // use TLS when sending the email                             

    $mail->setFrom('<YOUR-GMAIL-EMAIL>', 'OPTIONAL NAME'); //defining the sender

    $mail->addAddress('<YOUR-RECIPIENT>', 'John Doe');

    // define the HTML Body. (you can refer this from an HTML file too)
    $mail->Body = '<h1>Hello World!</h1> <p>This is my first email!</p>';

    $mail->send(); //send the emailecho 'The email has been sent';
} catch (Exception $e) {
    echo "We ran into an error while sending the email: {$mail->ErrorInfo}";
}


*/

?>