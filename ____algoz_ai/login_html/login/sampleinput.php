<!-- sampleinput.php<!DOCTYPE html> -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Input with Toggle Visibility</title>
    <style>
        /* Basic styling for the form and button */
        .form-group {
            position: relative; /* Position relative to contain the eye icon */
            width: 250px; /* Set a width for the form group */
            margin-bottom: 15px; /* Spacing at the bottom of the input field */
        }

        .form-control {
            width: 100%; /* Make the input full width within the form group */
            padding-right: 40px; /* Add padding on the right to avoid overlap with the eye icon */
        }

        .toggle-password {
            position: absolute; /* Position absolute to place it over the input */
            top: 50%; /* Center vertically */
            right: 10px; /* Position it near the right edge */
            transform: translateY(-50%); /* Center it vertically within the input field */
            cursor: pointer; /* Show pointer cursor on hover */
        }
    </style>
</head>
<body>

<div class="form-group">
    <input type="password" placeholder="Password:" name="password" class="form-control" id="password">
    <!-- Eye icon for toggling password visibility -->
    <i class="toggle-password" onclick="togglePasswordVisibility()">👁️</i>
</div>

<script>
    // JavaScript function to toggle password visibility
    function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password");
        // Toggle between password and text input types
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
</script>

</body>
</html>
