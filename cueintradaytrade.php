<?php
// Read POST data
$post_data = file_get_contents("php://input");

// Separate each line and store comma-separated values into an array
$lines = explode("\n", $post_data);
$csv_array = [];
foreach ($lines as $line) {
    $csv_array[] = explode(",", $line);
}

// Convert array to JSON string
$json_string = json_encode($csv_array);

// Print the JSON string
echo $json_string;
?>