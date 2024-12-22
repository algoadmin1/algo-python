<?php
                                                                                        $ver = "1.0";
// API URL
$url = 'https://api.x.ai/v1/chat/completions';

$prompt = "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
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
            // "content" => $prompt  
            "content" => "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically."
        ]
    ],
    "model" => "grok-beta",
    "stream" => false,
    "temperature" => 0
];

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
}

// Close the cURL session
curl_close($ch);
?>
