<?php
// hit this link for full tutorial
$youtubeUrl="https://youtu.be/9_kQ2bjqSzk?si=vLISSejcsXVqQNVc";

$hostName = "localhost";  
$website="https://algoz.ai";
$dbUser="u184668114_algozai";
 $dbUserOrig = "root";
$dbPassword = "Vegas202";
$dbName = "u184668114_users";
$dbPassword.="4"."!";
$conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
if (!$conn) {
    die("Something went wrong;");
}

?>