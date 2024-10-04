<?php
function ReadRawCSV($fnameIn, $fnameOut, $arrayName) {
    // Open the input file for reading
    $inputFile = fopen($fnameIn, "r");
    if (!$inputFile) {
        die("Cannot open input file: $fnameIn");
    }

    // Open the output file for writing
    $outputFile = fopen($fnameOut, "w");
    if (!$outputFile) {
        fclose($inputFile);
        die("Cannot open output file: $fnameOut");
    }

//$productsArray = [

    $dateTime = date("Y-m-d H:i:s");
    $dummystr = "";


    $formattedLine =  '<?php // created by csvread.php on: '. $dateTime . PHP_EOL;
    fwrite($outputFile, $formattedLine);
    $dummystr.= $formattedLine;

    $formattedLine =  '$'. $arrayName.  ' = [' . PHP_EOL;
    fwrite($outputFile, $formattedLine);
    $dummystr.= $formattedLine;
    
    // Read each line from the input file
    while (($line = fgetcsv($inputFile)) !== false) {
        // Create the formatted output with quotes and a comma
        $formattedLine = '"' . $line[0] . '","' . $line[1] . '",' . PHP_EOL;

        // Write the formatted line to the output file
        fwrite($outputFile, $formattedLine);
        $dummystr.= $formattedLine;

    }

    // insert a dummy $10M product with no ',' at end...
    $formattedLine = '"' . '1000000000' . '","' . 'p_10M' . '"' . PHP_EOL;
    fwrite($outputFile, $formattedLine);
    $dummystr.= $formattedLine;

    $formattedLine =   '];  ?>' . PHP_EOL;
    fwrite($outputFile, $formattedLine);
    $dummystr.= $formattedLine;

    // Close both files
    fclose($inputFile);
    fclose($outputFile);

    $dateTime = date("Y-m-d H:i:s");

    echo "<br /><br />]  At $dateTime, task completed reading $fnameIn and wrote file $fnameOut containing new array: $". $arrayName. "[ ] = <br />". $dummystr ;

}

ReadRawCSV('products.csv','productsTable.php', 'productTable' );

?>
