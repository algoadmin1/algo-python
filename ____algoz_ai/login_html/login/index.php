<?php
session_start();
if (!isset($_SESSION["user"])) {
   header("Location: login.php");
}else{
    $email1=$_SESSION["user"];
    echo "<br />Logged in as: $email1";
 }
require_once "database.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title><?php echo $webName; ?> Dashboard</title>
</head>
<body>
    <div class="container">
    <div style="text-align: center;">
        <div class="logo1">
            <img src="logo.jpg" alt="Logo">
        </div>
    </div>

    <!-- <h1>Welcome to algoz.ai Dashboard</h1> -->
    <h1>Welcome to the <?php echo $webName; ?> Dashboard!</h1>
    <a href="logout.php" class="btn btn-warning">Logout</a>
    </div>
</body>
</html>