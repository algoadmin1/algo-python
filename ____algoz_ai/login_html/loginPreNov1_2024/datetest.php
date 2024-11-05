<?php
function AddDaysToDate($numdays, $udate) {
    // Create a DateTime object from the provided date string in 'YYYY-MM-DD' format
    $date = DateTime::createFromFormat('Y-m-d', $udate);

    if (!$date) {
        // If the date format is invalid, return false or handle the error as needed
        return false;
    }

    // Add or subtract the number of days
    $date->modify("$numdays days");

    // Return the modified date in 'YYYY-MM-DD' format
    return $date->format('Y-m-d');
}

// Example usage
$udate = '2024-10-07';
$numdays = -110;
$newDate = AddDaysToDate($numdays, $udate);
echo "New Date: " . $newDate;
?>
