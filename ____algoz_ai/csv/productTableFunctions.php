<?php
require_once "productsTable.php";

function GetProductName($productArray, $amt) {
    // Loop through the product array
    for ($i = 0; $i < count($productArray); $i += 2) {
        // If the current element matches the $amt
        if ($productArray[$i] === $amt) {
            // Return the next element in the array (the product name)
            return $productArray[$i + 1];
        }
    }
    // If the $amt is not found, return 'nil'
    return 'nil';
}

// Example usage
$productTable1 = [
    "50","tp_50",
    "51","tp_51",
    "52","tp_52",
    "53","tp_53",
    "54","tp_54",
    "55","tp_55",
    "56","tp_56",
    "57","tp_57",
    "58","tp_58",
    "59","tp_59",
    "60","tp_60",
    "61","tp_61",
    "62","tp_62",
    "63","tp_63",
    "64","tp_64",
    "65","tp_65",
    "66","tp_66theDevilWearsAdidas",
    "67","tp_67"
];

// Sample call
$amt = "66";
$product = GetProductName( $productTable, $amt );
echo " *for productTable, for $amt found: ". $product;  


$amt = "50000";
$product = GetProductName( $productTable, $amt );
echo " *for productTable, for $amt found: ". $product;  


$amt = "4999";
$product = GetProductName( $productTable, $amt );
echo " *for productTable, for $amt found: ". $product;  
?>
