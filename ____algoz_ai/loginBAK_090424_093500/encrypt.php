<?php

// encrypt.php

// Function to hash a password using SHA-256 with a salt
function hashWithSHA256($password) {
    // Generate a random salt
    $salt = bin2hex(random_bytes(16)); // 32 characters (128 bits)

    // Combine the password with the salt
    $saltedPassword = $salt . $password;

    // Hash the salted password using SHA-256
    $hash = hash('sha256', $saltedPassword);

    // Return the salt and hash together (you need to store both)
    return $salt . ':' . $hash;
}

// Function to verify the password against the stored hash
function verifySHA256Hash($password, $storedHash) {
    // Separate the salt and hash from the stored value
    list($salt, $hash) = explode(':', $storedHash);

    // Hash the input password with the extracted salt
    $hashToVerify = hash('sha256', $salt . $password);

    // Compare the computed hash with the stored hash
    return hash_equals($hash, $hashToVerify);
}


// // Example usage
// $password = "abcdefg";

// // Hash the password
// $hashedPassword = hashWithSHA256($password);
// echo "Stored Hash: " . $hashedPassword . "\n";

// // Verify the password
// $isPasswordCorrect = verifySHA256Hash($password, $hashedPassword);
// echo $isPasswordCorrect ? "Password is correct!" : "Password is incorrect!";


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