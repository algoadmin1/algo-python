<?php
// require_once '../vendor/autoload.php';
require_once './stripe-php/init.php';
require_once './secrets.php';

require_once '../login/database.php';
require_once '../login/sendemail.php';




function RandomString($int0) {
    // Check if $int0 is greater than 0
    if ($int0 <= 0) {
        return "Error: Length must be greater than 0.";
    }

    // Characters to use in the random string (A-Z, a-z, 0-9)
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Get the length of the character set
    $charactersLength = strlen($characters);
    $randomString = '';

    // Generate the random string
    for ($i = 0; $i < $int0; $i++) {
        // Append a random character from the $characters set
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    return $randomString;
}


function ValidateEmail($em){
    // Validate the email address
    if (filter_var($em, FILTER_VALIDATE_EMAIL)) {
      // echo "The email address is valid.";
      return  true; 
    } else {
      return false;
    }
}



function SendAndHandleIntroEmail( $email1 , $key0, $recpt ){
  global $fromEmail, $webName ;

  $linkIntro ="https://itraderpro.co/candlesticks.php?sym=nvda&uname=Guest&email=". $email1 ."&key=". $key0 ;  //8a2b18a0";

  $subject="WELCOME to ". $webName;  // "algoz.ai ";
  // $message="Please click the link to access your product: ".  $linkResetPwd."?em=".$email1 ;
  $message="Please click the link to access your product: ".  $linkIntro."?em=". $email1 . "   \nHere is your receipt: ". $recpt;
  $from= $fromEmail ; //"algoinvestorr@gmail.com";
  $from="algoinvestorr@gmail.com";
  $emailSuccess = SendEmailToUser($email1, $subject, $message, $from);
  
  
  // echo "<br />";
  // if($emailSuccess==true)   echo "<div class='alert alert-success'>Check your inbox at: $email1 </div>";
  // else   echo "<div class='alert alert-danger'>FAILED to send email. Try again.</div>";
  // echo "<br />";
  // echo "<br />";
  // echo '<div style="text-align: center;"><p><a href="'.$linkLogin .'">Click to Login</a></p></div>';

  return( $emailSuccess );

}//fn


function WriteJson($payload, $fnamePrefix, $extraStr) {
    // Get the current date and time in the desired format
    $todaysDate = date('Y-m-d'); // YYYY-MM-DD format
    $timeNow = date('His');    // HH:MM:SS format

    // Construct the file name
    $filename = $fnamePrefix . '_' . $todaysDate . 'T' . $timeNow . '.txt';

    // Write the JSON payload to the file
    file_put_contents($filename, $payload);



    $matchStr="nil";
    if (substr($extraStr, 0, 3) === $matchStr) {    // =='nil'
          $datastr = "\n// ". $extraStr. "\n// ] EOF\n";  
      } else {   // No match to 'nil' so let's append file 

          $datastr ="\n// ". $extraStr. "\n// ] New Transaction Entry.  EOF\n";
          
          // Append the string to the file
          // file_put_contents($filename, $datastr, FILE_APPEND);
          
      }

      file_put_contents($filename, $datastr, FILE_APPEND);

    // Return the file name (optional)
    return $filename;
}

\Stripe\Stripe::setApiKey($stripeSecretKey);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks

// whsec_SGptRO2C3JqynHfg8wxNd1Hqi8nTxj0f old 1st whook
$endpoint_secret = 'whsec_ckISfj36EIJ3tlECdadiv4XqZzdVCSlr';   //new

$payload = @file_get_contents('php://input');
$payload0=$payload;

$event = null;

// echo $endpoint_secret;

try {
  $event = \Stripe\Event::constructFrom(
    json_decode($payload, true)
  );
} catch(\UnexpectedValueException $e) {
  // Invalid payload
  echo '⚠️  Webhook error while parsing basic request.';
  http_response_code(400);
  exit();
}
if ($endpoint_secret) {
  // Only verify the event if there is an endpoint secret defined
  // Otherwise use the basic decoded event
  $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
  try {
    $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
    );
  } catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    echo '⚠️  Webhook error while validating signature.';
    http_response_code(400);
    exit();
  }
}


//    STEPS:
//      
//           [ X ] 1. Receive healthy WEBHOOK, check stripe signature above
//
//           [ X ]  2. Create unique code 
//           [ X ]  2a.  Write transaction log file to server dir /logs + $event->data->object-> etc
//
//            3. create date+time of INSERT to table .transactions 
//
//            4. Write info to database table .transactions = 3-4 key items [ id, email, csz, name, amt ], then JSON
//
//           [ X ]  5. Send email with link to product to user.
//
//
//
//

// $argstr="nil";
$argstr="";

$type0  = $event->type;
$id     = $event->data->object->id;
$amt    = $event->data->object->amount;
$email0 = $event->data->object->billing_details->email;
$name0  = $event->data->object->billing_details->name;
$phone0 = $event->data->object->billing_details->phone;
$addy0  = $event->data->object->billing_details->address->line1. "|". 
          $event->data->object->billing_details->address->line2. "|". 
          $event->data->object->billing_details->address->city. "|". 
          $event->data->object->billing_details->address->state. "|". 
          $event->data->object->billing_details->address->postal_code. "|". 
          $event->data->object->billing_details->address->country. "|". 
          $event->data->object->currency   ;

$receipturl0 = $event->data->object->receipt_url;

$argstr0=   "|". $id. "|".  $amt.  "|".  $email0.  "|".  $name0.  "|".  $phone0.  "|". $addy0.  "|". $receipturl0. "|"  ;


$argstr.= $argstr0;



$fnamePrefix="./transactions/chargesuc";

$paymentIntent="nil";
$insertdb=0;

// Handle the event
switch ($event->type) {
  case 'charge.succeeded':
    $paymentIntent = $event->data->object; 
        // handlePaymentIntentSucceeded($paymentIntent);
    $insertdb=1;
    break;

    case 'payment_intent.succeeded':
      $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
    // Then define and call a method to handle the successful payment intent.
    // handlePaymentIntentSucceeded($paymentIntent);
    break;
  case 'payment_method.attached':
    $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
    // Then define and call a method to handle the successful attachment of a PaymentMethod.
    // handlePaymentMethodAttached($paymentMethod);
    break;
  default:
    // Unexpected event type
    error_log('Received unknown event type');
}

// MUST DETERMINE CUSTOMER LEVEL
$levelCustomer = 10;

$key0=RandomString( $levelCustomer );
$argstr= $argstr. $key0. "|"  ;

// WriteJson( $payload0, $fnamePrefix, $argstr );

// found charge.succeeded
if($insertdb==1){
  // HERE insert to mysql db :  
  // write JSON:  $paymentIntent = $event->data->object; 
  WriteJson( $payload0, $fnamePrefix, $argstr );

  $email00="roguequant1@gmail.com";
  // and lastly, send welcome email
  $success0= SendAndHandleIntroEmail( $email00 , $key0, $receipturl0 );

}

http_response_code(200);



/*
  Sample RT Json payload from actual stripe purchase vai Apple 

  {
  "id": "evt_3Q2pmTEJfZ5xbPiB0vRG04Fp",
  "object": "event",
  "api_version": "2024-06-20",
  "created": 1727249823,
  "data": {
    "object": {
      "id": "ch_3Q2pmTEJfZ5xbPiB0sPwBdcF",
      "object": "charge",
      "amount": 99,
      "amount_captured": 99,
      "amount_refunded": 0,
      "application": null,
      "application_fee": null,
      "application_fee_amount": null,
      "balance_transaction": null,
      "billing_details": {
        "address": {
          "city": "Santa Monica",
          "country": "US",
          "line1": "1127 20th Street",
          "line2": "Suite 2",
          "postal_code": "90403-5688",
          "state": "CA"
        },
        "email": "avattire.inc@gmail.com",
        "name": "John Botti",
        "phone": null
      },
      "calculated_statement_descriptor": "ALGOINVESTORR.COM",
      "captured": true,
      "created": 1727249821,
      "currency": "usd",
      "customer": null,
      "description": null,
      "destination": null,
      "dispute": null,
      "disputed": false,
      "failure_balance_transaction": null,
      "failure_code": null,
      "failure_message": null,
      "fraud_details": {
      },
      "invoice": null,
      "livemode": true,
      "metadata": {
      },
      "on_behalf_of": null,
      "order": null,
      "outcome": {
        "network_status": "approved_by_network",
        "reason": null,
        "risk_level": "normal",
        "seller_message": "Payment complete.",
        "type": "authorized"
      },
      "paid": true,
      "payment_intent": "pi_3Q2pmTEJfZ5xbPiB06tlTLgd",
      "payment_method": "pm_1Q2pmSEJfZ5xbPiBMqHkItAF",
      "payment_method_details": {
        "card": {
          "amount_authorized": 99,
          "authorization_code": "53323W",
          "brand": "mastercard",
          "checks": {
            "address_line1_check": "pass",
            "address_postal_code_check": "pass",
            "cvc_check": null
          },
          "country": "US",
          "exp_month": 9,
          "exp_year": 2027,
          "extended_authorization": {
            "status": "disabled"
          },
          "fingerprint": "PklbcfX4fiYXELnn",
          "funding": "credit",
          "incremental_authorization": {
            "status": "unavailable"
          },
          "installments": null,
          "last4": "8749",
          "mandate": null,
          "multicapture": {
            "status": "unavailable"
          },
          "network": "mastercard",
          "network_token": {
            "used": false
          },
          "overcapture": {
            "maximum_amount_capturable": 99,
            "status": "unavailable"
          },
          "three_d_secure": null,
          "wallet": {
            "apple_pay": {
              "type": "apple_pay"
            },
            "dynamic_last4": "8749",
            "type": "apple_pay"
          }
        },
        "type": "card"
      },
      "radar_options": {
      },
      "receipt_email": null,
      "receipt_number": null,
      "receipt_url": "https://pay.stripe.com/receipts/payment/CAcQARoXChVhY2N0XzFOUnFBMkVKZlo1eGJQaUIon_vOtwYyBr4J-G7KrDosFtKVBq67cq7LJLnlvCItD8_4RVJ3-lueDETM_O7fj41XR6GR-xgbAl_o24o",
      "refunded": false,
      "review": null,
      "shipping": null,
      "source": null,
      "source_transfer": null,
      "statement_descriptor": null,
      "statement_descriptor_suffix": null,
      "status": "succeeded",
      "transfer_data": null,
      "transfer_group": null
    }
  },
  "livemode": true,
  "pending_webhooks": 1,
  "request": {
    "id": "req_2dz3EsLVxNFHKm",
    "idempotency_key": "37ea72c0-51b9-40a9-818a-a5e3f6d44ff6"
  },
  "type": "charge.succeeded"
}



  Installing Composer...

    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

    php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

    php composer-setup.php
    
    php -r "unlink('composer-setup.php');"


      Then, assuming:
      Installer verified
      mac2021@Johns-MacBook-Pro-2 stripe-sample-code % php composer-setup.php
      All settings correct for using Composer
      Downloading...

      Composer (version 2.7.9) successfully installed to: /Users/mac2021/Desktop/_dev/Projects/algo-python/____algoz_ai/stripe_webhooks/stripe-sample-code/composer.phar
      Use it: php composer.phar

    composer require /stripe/stripe-php
     php composer.phar require /stripe/stripe-php


*/

