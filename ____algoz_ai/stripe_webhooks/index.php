<?php 
 

/*

//stripe publishable key
pk_test_51NRqA2EJfZ5xbPiBMkTD3XspH8G7NNmpSnGNlEY5Oro4dUMwwd5jzOCLlHeoWDEHtsuMRcLmf85kXENQsIQypK7J00b0xHoXvF


//stripe test key
sk_test_51NRqA2EJfZ5xbPiBTrS8vIap45s8j8R8I2AcUkdl3CnoboX94rylI3zIWkUwEITEI0Rwf7tdubrGR7KiNFuWL2fH00M51C8NIp

*/
$payload = @file_get_contents('php://input');
$event = null;

try {
    $event = \Stripe\Event::constructFrom(
        json_decode($payload, true)
    );
} catch(\UnexpectedValueException $e) {
    // Invalid payload
    http_response_code(400);
    exit();
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
    // ... handle other event types
    default:
        echo 'Received unknown event type ' . $event->type;
}

http_response_code(200);


?>