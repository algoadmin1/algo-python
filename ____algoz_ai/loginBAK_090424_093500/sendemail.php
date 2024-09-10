<?php


    function SendEmailToUser($email, $subject, $message, $from) {
        // Set the "From" email address
        // $from = 'no-reply@example.com'; // Replace with your desired "From" address
        $headers = 'From: ' . $from . "\r\n" .
                'Reply-To: ' . $from . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

        // Use the mail function to send the email
        if (mail($email, $subject, $message, $headers)) {
            echo "Email sent successfully to $email";
            return true;
        } else {
            echo "Failed to send email to $email";
            return false;
        }
    }



    function SendAndHandleForgotEmail( $email1 ){
        global $linkLogin, $linkResetPwd, $msg ;

        $subject="algoz.ai - RESET PASSWORD LINK";
        $message="Please click the link to Reset your password: ".  $linkResetPwd."?em=".$email1 ;
        $from="algoinvestorr@gmail.com";
        $emailSuccess = SendEmailToUser($email1, $subject, $message, $from);
        echo "<br />";
        if($emailSuccess==true)   echo "<div class='alert alert-success'>Check your inbox at: $email1 </div>";
        else   echo "<div class='alert alert-danger'>FAILED to send email. Try again.</div>";
        echo "<br />";
        echo "<br />";
        echo '<div style="text-align: center;"><p><a href="'.$linkLogin .'">Click to Login</a></p></div>';

    }//fn


?>