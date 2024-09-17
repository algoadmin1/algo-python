<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
////date_default_timezone_set('America/Los_Angeles');
date_default_timezone_set('America/New_York');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sidebar with Canvas Drawing</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        .items {
            cursor: pointer; /* Indicate clickable items */
            padding: 10px;
        }

        .sidebar {
            width: 200px;
            float: left; /* Position sidebar to the left */
        }

        .content {
            margin-left: 210px; /* Leave space for the sidebar */
        }

        .canvas-container {
            text-align: center; /* Center canvas */
            margin-top: 20px; /* Add some space at the top */
        }

        canvas {
            border: 1px solid #ddd; /* Optional border for canvas */
        }
    </style>
</head>
<body>

<div class="sidebar">
    <ul>
        <li class="items" id="settings-item">
            <i class="fa-solid fa-gear"></i>
            <p class="para">Settings</p>
        </li>
        <li class="items logout-btn" id="logout-item">
            <i class="fa-solid fa-right-from-bracket"></i>
            <p class="para">Logout</p>
        </li>
    </ul>
</div>

<div class="content">
    <div class="canvas-container">
        <canvas id="myCanvas" width="500" height="400"></canvas> <!-- Canvas added here -->
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Handle click event for Settings
        document.querySelector("#settings-item .para").addEventListener("click", function () {
            // Draw on the canvas when "Settings" is clicked
            drawRectangles();
            // Redirect to settings.php
            window.location.href = "settings.php";
        });

        // Function to draw two vertical rectangles on the canvas
        function drawRectangles() {
            var canvas = document.getElementById("myCanvas");
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");

                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Canvas dimensions
                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height;

                // Rectangle dimensions
                var rectWidth = 16;
                var rectHeight = 280;
                var offset = 8;

                // Calculate the x-coordinates to center the rectangles and apply offset
                var centerX = (canvasWidth / 2);
                var redRectX = centerX - (rectWidth + offset / 2);  // Left of the center
                var greenRectX = centerX + (offset / 2);  // Right of the center

                // Y-coordinate to center the rectangles vertically
                var centerY = (canvasHeight - rectHeight) / 2;

                // Draw the red rectangle
                ctx.fillStyle = "red";
                ctx.fillRect(redRectX, centerY, rectWidth, rectHeight);

                // Draw the green rectangle
                ctx.fillStyle = "green";
                ctx.fillRect(greenRectX, centerY, rectWidth, rectHeight);
            }
        }
    });
</script>

</body>
</html>

<?php

echo "end of pg";

?>
