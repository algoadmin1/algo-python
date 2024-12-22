<?php
                                                                                        $ver = "1.2";
// API URL
$url = 'https://api.x.ai/v1/chat/completions';

$prompt1 = "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
$prompt = "Testing. Just say hi and then tell us about the recent rise in the stock market indicies, and how Elon Musk helped Trump win the  US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
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
