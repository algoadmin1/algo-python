<?php
                                                                                        $ver = "1.3";

date_default_timezone_set('America/New_York');


$prompt1 = "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
$prompt2 = "Testing. Just say hi and then tell us about the recent rise in the stock market indicies, and how Elon Musk helped Trump win the  US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
$promptInit = "Say something nice to me and tell me how the NASDAQ and S&P did today, noting a few stocks that moved a lot, and tell me why they moved.";

if(isset( $_GET['prompt'] )){
    $prompt0 = $_GET['prompt'] ;
}else{
    $prompt0 = $promptInit ; //"Say something nice to me and tell me how the NASDAQ and S&P did today, noting a few stocks that moved a lot.";
}

if(isset( $_GET['pr'] )){
    $prompt0 = $_GET['pr'] ;
}else{
    $prompt0 = $promptInit ; //"Say something nice to me and tell me how the NASDAQ and S&P did today, noting a few stocks that moved a lot.";
}
// $sym = strtoupper($sym);



$prompt = $prompt0;


// Xai api stuff API URL
$url = 'https://api.x.ai/v1/chat/completions';

// API headers
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer xai-1VGGpgIiYFd9SsiVyQHeN6Qu6FUVldB2gUgfkOC9Godyxthn3QKfXZjLqJEqz7zYOuBSTT86DcSTjSX6'
];

// JSON payload for the request
$data = [
    "messages" => [
        [
            "role" => "system",
            "content" => "You are a test assistant."
        ],
        [
            "role" => "user",
            // "content" => "Testing. Just say hi and hello world and nothing else."
            "content" => $prompt  
            // "content" => "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically."
        ]
    ],
    "model" => "grok-beta",
    "stream" => false,
    "temperature" => 0
];




function DecodeResponse($response, $verbose) {
    // Decode the JSON response
    $data = json_decode($response, true);

    // Initialize content string
    $contentString = '';

    // Check if JSON decoding was successful
    if (json_last_error() === JSON_ERROR_NONE) {
        // Access the 'choices' array where the assistant's content is located
        if (isset($data['choices'][0]['message']['content'])) {
            $contentString = $data['choices'][0]['message']['content'];
        }

        // Output based on verbosity level
        if ($verbose == 0) {
            // Pretty print the "content" only
            echo "<pre>" . htmlentities($contentString) . "</pre>";
        } else {
            // Pretty print the entire response payload
            echo "<pre>" . htmlentities(json_encode($data, JSON_PRETTY_PRINT)) . "</pre>";
        }
    } else {
        echo "Invalid JSON response";
    }

    // Return content string regardless of verbosity
    return $contentString;
}



//  ############################################ END OF FUNCTIONS

echo "<br /> ";
echo "<br />] One moment, connecting to the Xai Brain... ";


// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute the request and store the response
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    // Print the response from the API
    echo "<br /> Xai Response: ". $response;
    echo "<br /> ";
    echo "<br /> ";
    $verbose = 1;
    $replyStr = DecodeResponse($response, $verbose);
    echo "<br /> ] replyStr == ". $replyStr;

}


// Close the cURL session
curl_close($ch);
?>
