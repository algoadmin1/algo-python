<?php 
                                                           $ver=  "2.7";

date_default_timezone_set('America/New_York');




$secsInADayComputed = 60 * 60 * 24;  
$secsInADay         = 86400;  



$loop=1;  // default loop yes

if(isset( $_GET['loop'] )){
    $loop = $_GET['loop'] ;

    if( $loop !=0  &&  $loop != 1 ){    
          $loop = 1;      
    }

}else{
        $loop = 1;  
    }


if(isset( $_GET['secs'] )){
    $secs = $_GET['secs'] ;
    if( $secs < 0  ||  $secs > (15* $secsInADay)){   

    }
}else{
    $secs = 61; // "SPY";
}
// $sym = strtoupper($sym);

$gSECONDS = $secs;




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


// $filename = 'log.txt';
// $content = $hiStr. "... ". "\n";

$numDaysToRun = 2;

$totalSecondsToRun  = $numDaysToRun * $secsInADay ;
$numSeconds = $gSECONDS ;                            // =7;      //  # seconds Sleep between each call  ie 30 or 60, etc
$secsRem =0;

$MaxLoop            = (int)( $totalSecondsToRun / $numSeconds );

if( $loop ==0 )  $MaxLoop =1;  // if user asks not to loop then set maxloops==1

for ($i = 0; $i < $MaxLoop; $i++) {

    $datestr = date("Y-m-d");
    // Remove the dashes to create "YYYYMMDD" format
    $datestr1 = str_replace("-", "", $datestr);
    $filename = 'cronjobLog_'. $datestr1   . '.txt';


    $time0 = date('D M d H:i:s');
    $hiStr = "cronjob: i, t= ". $i. ",  ". $time0 ;
    $secsRem = ( $MaxLoop - $i  ) * $numSeconds;

    $dayFraction = ( $secsRem / $secsInADay );

    $content = $hiStr. ";  interval=every ". $gSECONDS  ." seconds, remainingSecs = ". $secsRem  . "remaining,  or ". $dayFraction. " days... \n";  


        try {
            WriteFile($filename, $content);

            echo "String appended to the file successfully, ". $secsRem. " remaining,  or ". $dayFraction. " days. <br />";
            echo "loop# " . ($i + 1) . " <br />";

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();        
            echo "  Iteration " . ($i + 1) . " failed: " . $e->getMessage() . "<br />";

        }

    ob_flush();
    flush();

    // If it's not the last iteration, wait for the specified number of seconds
    if ($i < $MaxLoop - 1) {
        sleep($numSeconds);
    }
}

    echo "<br />". "] Finished ". $MaxLoop. " loops.";

    ob_flush();
    flush();


    // try {
    //     // Call your function or code that may throw an exception here
    //     yourFunction();
    //     echo "Iteration " . ($i + 1) . " succeeded.\n";
    // } catch (Exception $e) {
    //     // Handle the exception
    //     echo "Iteration " . ($i + 1) . " failed: " . $e->getMessage() . "\n";
    // }



// try {
//     WriteFile($filename, $content);
//     echo "String appended to the file successfully!";
// } catch (Exception $e) {
//     echo "Error: " . $e->getMessage();
// }



// WriteFile($filename, $content);
// echo "*String appended again  to  file / no tryCatch{}  ,   successfully!";

echo "<br />";
echo "<br />] ". $hiStr;
echo "<br />";
echo "<br />";



?>