<?php 

                                    $ver=  "1.4";
// 

date_default_timezone_set('America/New_York');


$time0 = date('D M d H:i:s');


$hiStr = "cronjob: t= ". $time0 ;

function WriteFile($fname, $str) {
    // Open the file in append mode. Create the file if it doesn't exist.
    $fileHandle = fopen($fname, 'a');

    if ($fileHandle === false) {
        // Handle file opening error.
        throw new Exception("Unable to open or create the file: $fname");
    }

    // Write the string to the file.
    if (fwrite($fileHandle, $str) === false) {
        fclose($fileHandle); // Ensure the file handle is closed on error.
        throw new Exception("Unable to write to the file: $fname");
    }

    // Close the file after writing.
    fclose($fileHandle);
}

$filename = 'log.txt';
$content = $hiStr. "... ". "\n";

try {
    WriteFile($filename, $content);
    echo "String appended to the file successfully!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

WriteFile($filename, $content);
echo "*String appended again  to  file / no tryCatch{}  ,   successfully!";

echo "<br />";
echo "<br />] ". $hiStr;
echo "<br />";
echo "<br />";



?>