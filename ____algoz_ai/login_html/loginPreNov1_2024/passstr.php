<?php



ini_set('display_errors', 1);
error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
date_default_timezone_set('America/New_York');



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the string passed from HTML
    $string1 = $_POST['string1'];

    // Output the string or use it for further processing
    echo "The string passed is: " . htmlspecialchars($string1);
}
?>