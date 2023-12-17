<?php
// Database connection parameters
/*
// schema
//
// plug this into PHP Admin
//
CREATE TABLE u151710353_algotrades.trades (
    tradeId INT AUTO_INCREMENT PRIMARY KEY,
    tradeDTstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tradeDateTime VARCHAR(32),
    userId VARCHAR(128),
    accountId VARCHAR(256),
    tradeType VARCHAR(128),
    tradeSize INT,
    tradePrice FLOAT,
    tradePrExec FLOAT,
    tradeCond VARCHAR(32),
    tradeDur VARCHAR(128),
    tradeSpec VARCHAR(512),
    tradeSig VARCHAR(512),
    tradeDistPct VARCHAR(32),
    tradeGapPct VARCHAR(32),
    tradeStatus VARCHAR(128),
    tradeAux1 VARCHAR(1024),
    tradeAux2 VARCHAR(1024),
    tradeAux3 VARCHAR(1024)
);

*/
$servername = "localhost"; // Replace with your server name
$username = "roguequant1";
$password = "Vegas2024!";
$dbname = "u151710353_algotrades";

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    // Set PDO to throw exceptions for errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert a sample trade into the 'trades' table
    $insertQuery = "INSERT INTO trades (tradeDateTime, userId, accountId, tradeType, tradeSize, tradePrice) 
                    VALUES ('2023-12-31 23:59:59', 'sampleUser', 'sampleAccount', 'Buy', 100, 50.25)";
    $conn->exec($insertQuery);
    $lastInsertedId = $conn->lastInsertId();

    echo "Sample trade inserted. Last inserted ID: $lastInsertedId <br>";

    // Query the table for a specific tradeId
    $tradeIdToQuery = 1; // Replace with the desired tradeId to query
    $query = "SELECT * FROM trades WHERE tradeId = :tradeId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':tradeId', $tradeIdToQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo "Trade found for tradeId $tradeIdToQuery: <pre>" . print_r($result, true) . "</pre>";
    } else {
        echo "No trade found for tradeId $tradeIdToQuery";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
