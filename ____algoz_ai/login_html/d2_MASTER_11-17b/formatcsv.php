<?php
// convert csv from alphavan  crypto



function FormatCSV($fname) {
    // Open the CSV file for reading
    if (($handle = fopen($fname, 'r')) !== false) {
        // Initialize an array to store CSV data
        $crypto_data = [];

        // Loop through each line in the CSV file
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            // Ensure each line has at least two elements (symbol, name)
            if (count($data) >= 2) {
                $symbol = trim($data[0]);
                $name = trim($data[1]);
                // Add to array with quotes and comma formatting
                $crypto_data[] = "\"$symbol\",\"$name\"";
            }
        }
        // Close the file handle
        fclose($handle);

        // Open the new PHP file for writing
        $output = fopen('cryptos.php', 'w');
        if ($output) {
            // Write the PHP opening tag and array assignment
            fwrite($output, "<?php\n\$cryptos_allowed = [\n");
            // Write each line with a line break between each symbol,name pair
            fwrite($output, implode(",\n", $crypto_data));
            // Write the closing brackets and PHP closing tag
            fwrite($output, "\n];\n?>");
            // Close the output file handle
            fclose($output);
        } else {
            echo "Error: Could not create output file.\n";
        }
    } else {
        echo "Error: Could not open input file.\n";
    }
}


$csv_filename = "digital_currency_list.csv";
FormatCSV($csv_filename) ;


?>
