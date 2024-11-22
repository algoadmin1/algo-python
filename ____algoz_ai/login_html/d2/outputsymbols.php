<?php
                                        // outputsymbols.php     ver 1.0

date_default_timezone_set('America/New_York');


function GetSymbolsFromTextUrl($urlstr, $currencyStr) {
    // Initialize variables
    $symbolStrArr = [];
    $aiFlag = false;
    $cmpChars = "0123456789@/- ._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Check if the URL exists
    if (($file = @file_get_contents($urlstr)) === false) {
        return []; // Return empty array if URL doesn't exist
    }

    // Split file content into lines
    $lines = explode("\n", $file);

    // Loop through each line
    foreach ($lines as $line) {
        $line = trim($line); // Remove leading/trailing whitespace

        if (strlen($line) < 3) {
            continue; // Skip invalid lines
        }

        // Check if the line starts with '/ai'
        if (substr($line, 0, 3) === '/ai') {
            $symbolStrAI = $line;
            $symbolStrArr[] = $symbolStrAI;
            $aiFlag = true;
        } else {
            // Process symbols that don't start with '/ai'
            $symbolStr = strtoupper($line); // Convert to uppercase
            $symbolStr = str_replace("\r", "", $symbolStr); // Remove carriage return

            // Ensure $symbolStr only contains valid characters
            $validStr = "";
            for ($i = 0; $i < strlen($symbolStr); $i++) {
                if (strpos($cmpChars, $symbolStr[$i]) !== false) {
                    $validStr .= $symbolStr[$i];
                }
            }
            $symbolStr = rtrim($validStr); // Remove trailing spaces

            // If $symbolStr ends with '-', append the currency string
            if (substr($symbolStr, -1) === '-') {
                $symbolStr .= $currencyStr;
            }

            // Add to the array
            $symbolStrArr[] = $symbolStr;
        }
    }

    // Reverse the array
    $symbolStrArr = array_reverse($symbolStrArr);

    // Return the array
    return $symbolStrArr;
}

// // Example usage
// $urlstr = "https://algoz.ai/d2/Symbols.txt";
// $currencyStr = "USD";
// $result = GetSymbols($urlstr, $currencyStr);
// print_r($result);


function PrintSymbols($symbolStrArr) {
    // Check if the array is empty
    if (empty($symbolStrArr)) {
        echo "No symbols to display.<br />";
        return;
    }

    // Loop through the array and print each symbol with its index
    foreach ($symbolStrArr as $i => $symbol) {
        echo "Index $i: $symbol<br />";
    }
}

// Example usage
$symbols1 = [
    "AXP",
    "WYNN",
    "PFE",
    "NKE",
    "BRK.B",
    "GS",
    "F",
    "MSFT",
    "KOBA",
    "SQQQ",
    "TQQQ",
    "AMZN",
    "TSLA",
    "X",
    "JNJ",
    "KO",
    "COP",
    "HAL",
    "MSFT",
    "MSTR",
    "SOL-USD",
    "V"
];



function GetSymbols($fname, $currencyStr) {
    // Initialize variables
    $symbolStrArr = [];
    $aiFlag = false;
    $cmpChars = "0123456789@/- ._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Check if the file exists
    if (!file_exists($fname)) {
        return []; // Return an empty array if the file doesn't exist
    }

    // Read the file into an array of lines
    $lines = file($fname, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Loop through each line in the file
    foreach ($lines as $line) {
        $line = trim($line); // Remove leading and trailing whitespace


        
        // if (strlen($line) < 3) {
        //     continue; // Skip invalid or too short lines
        // }
        if (strlen($line) >= 3) {
            
            if (substr($line, 0, 3) === '/ai') {
                $symbolStrAI = $line;
                $symbolStrArr[] = $symbolStrAI;
                $aiFlag = true;
            }

        }


        // Check if the line starts with '/ai'
        if ($aiFlag == false){

            // Process symbols that don't start with '/ai'
            $symbolStr = strtoupper($line); // Convert to uppercase
            $symbolStr = str_replace("\r", "", $symbolStr); // Remove carriage returns

            // Ensure $symbolStr only contains valid characters
            $validStr = "";
            for ($i = 0; $i < strlen($symbolStr); $i++) {
                if (strpos($cmpChars, $symbolStr[$i]) !== false) {
                    $validStr .= $symbolStr[$i];
                }
            }
            $symbolStr = rtrim($validStr); // Remove trailing spaces

            // If $symbolStr ends with '-', append the currency string
            if (substr($symbolStr, -1) === '-') {
                $symbolStr .= $currencyStr;
            }

            // Add to the array
            $symbolStrArr[] = $symbolStr;
        }
        $aiFlag = false;
    }//for

    // Reverse the array
    $symbolStrArr = array_reverse($symbolStrArr);

    // Return the array
    return $symbolStrArr;
}

// Example usage
$fname = "symbols.txt";
$currencyStr = "USD";
$result = GetSymbols($fname, $currencyStr);

echo "] After G3tSymbols( ... )<br />";

PrintSymbols($result);
echo "<br />";
print_r($result);




?>
