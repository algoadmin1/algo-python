<?php
require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('your_stripe_secret_key');

// You can find your endpoint's secret in your webhook settings
$endpoint_secret = 'your_webhook_secret';

// Retrieve the request's body and parse it as JSON
$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$event = null;

try {
    $event = \Stripe\Webhook::constructEvent(
        $payload, $sig_header, $endpoint_secret
    );
} catch(\UnexpectedValueException $e) {
    // Invalid payload
    http_response_code(400);
    exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    http_response_code(400);
    exit();
}

// Handle the event
switch ($event->type) {
    case 'payment_intent.succeeded':
        $paymentIntent = $event->data->object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded($paymentIntent);
        break;
    // ... handle other event types
    default:
        echo 'Received unknown event type ' . $event->type;
}

http_response_code(200);
?>
