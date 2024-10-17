<!-- sample buttons under -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $sym0str ; ?></title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        .chartjb {
            width: 100%;
            height: 100vh; /* Full viewport height */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #f0f0f0;
        }
        canvas {
            width: 100%;
            height: 80%; /* Adjust for the buttons below */
        }
        .buttons-container {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
        }
        .buttons-container button {
            flex-grow: 1;
            padding: 10px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="chartjb">
        <canvas id="myCanvas"></canvas>
    </div>

    <!-- Add buttons in a flex container -->
    <div class="buttons-container">
        <button id="button1" onclick="toggleButton(1)">Button 1</button>
        <button id="button2" onclick="toggleButton(2)">Button 2</button>
        <button id="button3" onclick="toggleButton(3)">Button 3</button>
        <button id="button4" onclick="toggleButton(4)">Button 4</button>
        <button id="button5" onclick="toggleButton(5)">Button 5</button>
        <button id="button6" onclick="toggleButton(6)">Button 6</button>
    </div>

    <!-- Embed the PHP-generated JSON into the page using a script tag -->
    <script>
        // Store the PHP data/vars in a JavaScript variables
        var gColSchemeNum = <?php echo $sch; ?>;
        var processedData = <?php echo $processedDataJson; ?>;
        
        // Initialize button states from PHP
        var button1 = <?php echo $button1; ?>;
        var button2 = <?php echo $button2; ?>;
        var button3 = <?php echo $button3; ?>;
        var button4 = <?php echo $button4; ?>;
        var button5 = <?php echo $button5; ?>;
        var button6 = <?php echo $button6; ?>;

        // Function to toggle button state and call resizeCanvas
        function toggleButton(buttonNumber) {
            switch (buttonNumber) {
                case 1:
                    button1 = (button1 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button1'));  // Trigger event listener
                    break;
                case 2:
                    button2 = (button2 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button2'));
                    break;
                case 3:
                    button3 = (button3 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button3'));
                    break;
                case 4:
                    button4 = (button4 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button4'));
                    break;
                case 5:
                    button5 = (button5 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button5'));
                    break;
                case 6:
                    button6 = (button6 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button6'));
                    break;
            }
        }

        // Example listener for button1 toggle
        window.addEventListener('button1', resizeCanvas);

        // You can add similar listeners for other buttons if needed
        window.addEventListener('button2', resizeCanvas);
        window.addEventListener('button3', resizeCanvas);
        window.addEventListener('button4', resizeCanvas);
        window.addEventListener('button5', resizeCanvas);
        window.addEventListener('button6', resizeCanvas);

        // Resize canvas function (example)
        function resizeCanvas() {
            // Your canvas resize logic here
            console.log("Canvas resized based on button toggle.");
        }
    </script>
    <!-- Link to your external JavaScript file -->
    <script src="canvas0.js"></script>
    
</body>
</html>
