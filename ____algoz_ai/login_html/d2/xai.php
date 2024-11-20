<?php
                                                                                        $ver = "2.7";

date_default_timezone_set('America/New_York');

//   SAMPLE USAGE:
//
//              algoz.ai/ai?prompt=what is the market cap and Enterprise value of Tesla?
//
//

$prompt1 = "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
$prompt2 = "Testing. Just say hi and then tell us about the recent rise in the stock market indicies, and how Elon Musk helped Trump win the  US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";

$promptInit = "Say something nice to me and tell me how the NASDAQ and S&P did today, noting a few stocks that moved a lot, and tell me why they moved.";
$prompt0 = $promptInit ; 

$verbose = 0;


if(isset( $_GET['prompt'] )){
    $prompt0 = $_GET['prompt'] ;
}else{
    if(isset( $_GET['pr'] )){
        $prompt0 = $_GET['pr'] ;
    }else{
        $prompt0 = $promptInit ;  
    }
}

$prompt = $prompt0;

echo "<br />] ";
$welcomeStr =  "Thank you for choosing algoz.ai ! ";
echo '<strong style="color: green;">'. $welcomeStr . '</strong>';

//  echo "<br />] One moment, while ai responds to: <br />";
echo "<br />";
echo "<br />] One moment while we get retrieve your ai response to:";
echo "<br />";
echo "<br />";


// Bold and blue text
echo '<strong style="color: blue;">'. $prompt . '</strong>';

// Bold and red text
// echo '<strong style="color: red;">This text is bold and red.</strong>';


ob_flush();
flush();


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


function DecodeResponse_singleNewLine($response, $verbose) {
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
            // echo "<pre>" . htmlentities($contentString) . "</pre>";
            echo "<br />See new window for response.";
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


function DecodeResponse($response, $verbose) {
    // Decode the JSON response
    $data = json_decode($response, true);

    // Initialize content string
    $contentString = '';

    // Check if JSON decoding was successful
    if (json_last_error() === JSON_ERROR_NONE) {
        // Access the 'choices' array where the assistant's content is located
        if (isset($data['choices'][0]['message']['content'])) {
            // Retrieve the content
            $contentString = $data['choices'][0]['message']['content'];
            
            // Replace each "\n" with two newlines for better readability
            $contentString = str_replace("\n", "\n\n", $contentString);
        }

        // Output based on verbosity level
        if ($verbose == 0) {
            // Pretty print the "content" only
            echo "<pre>" . htmlentities($contentString) . "</pre>";
        } else {
            // Pretty print the entire response payload with modified content
            // Update the content in the full JSON data structure
            $data['choices'][0]['message']['content'] = $contentString;
            echo "<pre>" . htmlentities(json_encode($data, JSON_PRETTY_PRINT)) . "</pre>";
        }
    } else {
        echo "Invalid JSON response";
    }

    // Return content string regardless of verbosity
    return $contentString;
}





echo "<br /> ";

// 
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
    if($verbose==1) echo "<br /> Xai Response: ". $response;
    echo "<br /> ";
    echo "<br /> ";
    $replyStr = DecodeResponse($response, $verbose);
    if($verbose==1) echo "<br /> ] replyStr == ". $replyStr;

}


// Close the cURL session
curl_close($ch);



?>





<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- <link rel="stylesheet" href="style_d2.css">
    <link rel="stylesheet" href="style_digital.css"> -->
    <title>/ai</title>


    <!-- <script src="eventstable.js"></script> -->
    

        <script>
            function OpenAndDisplayContents(response1, fontsize1, fontcolor1, windowBGcolor) {
            // Open a new window
            let newWindow = window.open("", "_blank", "width=600,height=400,scrollbars=yes");

            if (newWindow) {
                // Build the full font style
                let gFont0 = "Arial"; // "Helvetica";
                let gFontComplete = parseInt(fontsize1).toString() + "px " + gFont0;

                // Write the HTML content to the new window
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>/ai Response</title>
                        <style>
                            body {
                                font: ${gFontComplete};
                                color: ${fontcolor1};
                                background-color: ${windowBGcolor};
                                margin: 0;
                                padding: 10px;
                                line-height: 1.5;
                                word-wrap: break-word; /* Ensures text wraps within the window */
                                overflow-y: auto; /* Enables vertical scrolling */
                            }
                            pre {
                                white-space: pre-wrap; /* Preserve line breaks while wrapping */
                                word-wrap: break-word; /* Prevent horizontal scrolling */
                            }
                        </style>
                    </head>
                    <body>
                        <pre>${response1}</pre>
                    </body>
                    </html>
                `);

                newWindow.document.close(); // Finish writing content to the window
            } else {
                alert("Popup blocker is preventing the window from opening. Please allow popups for this site.");
            }
        }

        </script>


</head>


    <body>

<?php
        // After decoding the response and getting $replyStr
        echo "<script>
            let response1 = " . json_encode($replyStr) . ";
            let fontsize1 = '18'; // Set your desired font size
            let fontcolor1 = '#000000'; // Black text color
            let windowBGcolor = '#ffffff'; // White background color
            OpenAndDisplayContents(response1, fontsize1, fontcolor1, windowBGcolor);
        </script>";
?>

    </body>


</html>