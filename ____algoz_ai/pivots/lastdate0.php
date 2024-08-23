
<?php

/**
 * Determines the last trading date based on the given frequency.
 *
 * @param string $frequency The frequency: "yearly", "weekly", "quarterly", or "monthly".
 * @return string|false The last trading date in "YYYY-MM-DD" format, or false if invalid frequency.
 */
function DetermineLastDate($frequency) {
    // Convert frequency to lowercase for case-insensitive comparison
    $frequency = strtolower($frequency);

    // Check if the input is valid
    $validFrequencies = ['yearly', 'weekly', 'quarterly', 'monthly'];
    if (!in_array($frequency, $validFrequencies)) {
        return false;
    }

    // Get the current date
    $currentDate = new DateTime();

    switch ($frequency) {
        case 'yearly':
            // Set to December 31st of the previous year
            $lastDate = $currentDate->modify('last day of december last year');
            break;
        
        case 'weekly':
            // Set to the previous Friday
            $lastDate = $currentDate->modify('last friday');
            break;
        
        case 'quarterly':
            // Determine the last day of the previous quarter
            $currentMonth = (int)$currentDate->format('n');
            $lastQuarterEnd = $currentMonth - ($currentMonth % 3) - 1;
            if ($lastQuarterEnd <= 0) {
                $lastQuarterEnd = 12 + $lastQuarterEnd;
                $currentDate->modify('-1 year');
            }
            $lastDate = $currentDate->setDate($currentDate->format('Y'), $lastQuarterEnd, 1)->modify('last day of this month');
            break;
        
        case 'monthly':
            // Set to the last day of the previous month
            $lastDate = $currentDate->modify('last day of last month');
            break;
    }

    // Adjust to the last Friday if not already a Friday
    while ($lastDate->format('N') != 5) {
        $lastDate->modify('-1 day');
    }

    // Return the date in YYYY-MM-DD format
    return $lastDate->format('Y-m-d');
}

?>
