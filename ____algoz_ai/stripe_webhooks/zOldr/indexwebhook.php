<?php 
 

/*

//stripe publishable key
pk_test_51NRqA2EJfZ5xbPiBMkTD3XspH8G7NNmpSnGNlEY5Oro4dUMwwd5jzOCLlHeoWDEHtsuMRcLmf85kXENQsIQypK7J00b0xHoXvF


//stripe test key
sk_test_51NRqA2EJfZ5xbPiBTrS8vIap45s8j8R8I2AcUkdl3CnoboX94rylI3zIWkUwEITEI0Rwf7tdubrGR7KiNFuWL2fH00M51C8NIp

// make -gen'd stripe webhook (generated inside make)
https://hook.us1.make.com/xdnc2j6fuif595ubrujitiz6119keahs

// test jack coin $0.99 cents 
https://buy.stripe.com/test_fZeg0Bc55ejH4bCbII

// webhook id
we_1PxUuTEJfZ5xbPiBx6qeORJk

// signing secret for webhook
whsec_SGptRO2C3JqynHfg8wxNd1Hqi8nTxj0f

// stripe docs
https://docs.stripe.com/get-started/development-environment?lang=php#install-sdk



// actual JACKS COIN GREETING IMG
https://buy.stripe.com/fZedTI1QU8wuaOc9AR

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


$sampleActual_charge_succeeded = '{
  "id": "evt_3PxV2qEJfZ5xbPiB1Hftko1T",
  "object": "event",
  "api_version": "2022-11-15",
  "created": 1725978474,
  "data": {
    "object": {
      "id": "ch_3PxV2qEJfZ5xbPiB1U2yeAHT",
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
      "created": 1725978473,
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
      "payment_intent": "pi_3PxV2qEJfZ5xbPiB1m2JbZxF",
      "payment_method": "pm_1PxV2qEJfZ5xbPiB67fe6XrF",
      "payment_method_details": {
        "card": {
          "amount_authorized": 99,
          "authorization_code": "82061W",
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
      "receipt_email": null,
      "receipt_number": null,
      "receipt_url": "https://pay.stripe.com/receipts/payment/CAcQARoXChVhY2N0XzFOUnFBMkVKZlo1eGJQaUIo6q6BtwYyBuJhKin3sTosFhIHqb9JU2m17EPCIP0tdjubOb-pg2ModVl1FJNSo-u4g3buAADms3wvlFY",
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
    "id": "req_wLPD2JEgDuZar2",
    "idempotency_key": "12280544-8650-4127-8ba7-66825dc90da2"
  },
  "type": "charge.succeeded"
}';


?>