<?php 

                                                                $ver=  "2.1";

session_start();
if(!isset($_SESSION['cnt'])){
    $_SESSION['cnt']=0;
}else{
    $_SESSION['cnt']++;
}
$cnt=$_SESSION['cnt'];


date_default_timezone_set('America/New_York');
                                
$symbols0  = [   "SPY", "QQQ", "VXX", "AAPL", "META", "NVDA", "AMZN" ];  

$symbols  = [   "SPY", "QQQ", "VXX", "AAPL", "META", "NVDA", "AMZN", "NFLX", "GS", "MSTR", "MSFT" ];

$symbols2 = [   "SPY", "QQQ", "VXX", "AAPL", "META", "NVDA", "AMZN", "NFLX", "GS", "MSTR", "MSFT", 
                    "GME", "GD", "TSLA", "INTC", "WBA", "JNJ", "X", "GLD", "SLV",
                    "F", "CRM", "ORCL", "ZM", "M", "F", "K", "KO", "MCD" 
                    ];

$symbolsCnt = count($symbols);

function WriteFileData($fname, $datastr, $appendFlag) {
    // Check if append flag is set to 1, then use 'a' mode for appending, otherwise 'w' mode for overwriting
    $mode = ($appendFlag == 1) ? 'a' : 'w';

    // Open the file with the appropriate mode
    $file = fopen($fname, $mode);

    // Check if the file was opened successfully
    if ($file) {
        // Write the data to the file
        fwrite($file, $datastr);

        // Close the file after writing
        fclose($file);

        return true; // Successfully written
    } else {
        return false; // Failed to open the file
    }
}

// $sym0="AAPL";
// $sym0lower= strtolower($sym0);

$datetimestr   = date('Y-m-d H:i:s');

$cntUp1 = $cnt;
if($cntUp1 > ($symbolsCnt-1)){
   $cntUp1= $cnt % $symbolsCnt;
}

$cntUp=$cntUp1;



$nextSym = $symbols[$cntUp];

$sym0lower= strtolower($nextSym);
$fname = $sym0lower. ".txt";

$datastr= $sym0lower. ",[". $cnt. "],". $datetimestr.  ",50,55.1,45.00,52.50,900123,". $nextSym. ",[". $cntUp. "],EOL" ;

echo "<br />] Session cnt==". $cnt. ", datastr====>" .  $datastr ."<====";
// Example usage:

WriteFileData( $fname, $datastr, 0);  // overwrite to the file

// WriteFileData('example.txt', "This will append\n", 1);  // Appends to the file

?>
