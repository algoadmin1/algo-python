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
        } else {
            echo "Failed to send email to $email";
        }
    }


?>