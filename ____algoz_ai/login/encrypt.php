<?php

// encrypt.php


// Function to hash a password string
function encryptPassword($password) {
    // Use bcrypt or Argon2 for hashing
    $hash = password_hash($password, PASSWORD_DEFAULT); // PASSWORD_DEFAULT will use bcrypt or Argon2 based on the PHP version
    return $hash;
}

// Function to verify a password against a stored hash
function verifyPassword($password, $hash) {
    // Verify that the given password matches the stored hash
    return password_verify($password, $hash);
}

        // // Example usage
        // $password = "abcdefg";
        
        // // Hash the password
        // $hashedPassword = encryptPassword($password);
        // echo "Hashed Password: " . $hashedPassword . "\n";
        
        // // Verify the password
        // $isPasswordCorrect = verifyPassword($password, $hashedPassword);
        // echo $isPasswordCorrect ? "Password is correct!" : "Password is incorrect!";
        
        

?>