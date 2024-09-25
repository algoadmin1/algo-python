<?php
// require_once '../vendor/autoload.php';
require_once '../stripe-php/init.php';
require_once '../secrets.php';

/*
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
\Stripe\Stripe::setApiKey($stripeSecretKey);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
$endpoint_secret = 'whsec_SGptRO2C3JqynHfg8wxNd1Hqi8nTxj0f';

$payload = @file_get_contents('php://input');
$event = null;
print_r($payload);
echo "] ====> got past payload, trying...<br />";


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

// Handle the event
switch ($event->type) {
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

http_response_code(200);