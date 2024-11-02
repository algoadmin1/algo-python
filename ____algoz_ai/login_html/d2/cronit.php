<?php 

                                                                $ver=  "2.9";
date_default_timezone_set('America/New_York');
$msg=0;

session_start();
if(!isset($_SESSION['cnt'])){
    $_SESSION['cnt']=0;
}else{
    $_SESSION['cnt']++;
}
$cnt=$_SESSION['cnt'];



$symbols  = [   "SPY", "QQQ","SQQQ", "VXX", "AAPL", "META", "NVDA", "AMZN", "NFLX", "GS", "MSTR", "MSFT", "RDDT", "AMD" , "DJT", "JNJ", "X", "GLD", "SLV",
                    "F", "CRM", "GS", "ZM", "M", "TSLA", "PLTR", "KO", "MCD"];

$symbolsCnt = count($symbols);
if($msg==1) echo "<br />] symbolsCnt ==". $symbolsCnt;


function GetBulkQuotes($arr, $urlPrefix, $urlSuffix, $maxSymbols) {
    global $msg;
    // Step 1: Truncate the array if it contains more symbols than $maxSymbols
    if (count($arr) > $maxSymbols) {
        $arr = array_slice($arr, 0, $maxSymbols);
    }

    // Step 2: Build the URL by joining the tickers with a comma
    $symbols = implode(",", $arr);
    $urlNew = $urlPrefix . $symbols . $urlSuffix;
    if($msg==1) echo "<br />] newURL ==". $urlNew;

    $processedBulkSymbols = [];

    try {
        // Step 3: Fetch data from the constructed URL
        $json = file_get_contents($urlNew);

        // Step 4: Decode JSON payload
        $data = json_decode($json, true);

        // Step 5: Check for 'data' in JSON and process each stock quote
        if (isset($data['data'])) {
            foreach ($data['data'] as $quote) {
                $symbol = $quote['symbol'];
                $tstamp = $quote['timestamp'];    // "2024-10-30 19:59:57.644"
                $date0   =  substr($tstamp, 0, 10);  // "2024-10-30"    ( 0, 10, $quote['timestamp']);

                // Organize only required fields
                $processedBulkSymbols[$symbol] = [
                    'timestamp' => $quote['timestamp'],
                    'date' =>    $date0 ,                
                    'open' => $quote['open'],
                    'high' => $quote['high'],
                    'low' => $quote['low'],
                    'close' => $quote['close'],
                    'volume' => $quote['volume'],
                    'previous_close' => $quote['previous_close'],
                    'change' => $quote['change'],
                    'change_percent' => $quote['change_percent'],
                    'extended_hours_quote' => $quote['extended_hours_quote'],
                    'extended_hours_change' => $quote['extended_hours_change'],
                    'extended_hours_change_percent' => $quote['extended_hours_change_percent']
                ];
            }
        }
    } catch (Exception $e) {
        // Log or handle error
        echo "Error fetching data: " . $e->getMessage();
    }

    // Return the processed data
    return $processedBulkSymbols;
}



// function GetBulkQuotes0($arr, $urlPrefix, $urlSuffix) {
//     // Step 1: Build the URL by joining the tickers with a comma
//     $symbols = implode(",", $arr);
//     $urlNew = $urlPrefix . $symbols . $urlSuffix;
    
//     $processedBulkSymbols = [];

//     try {
//         // Step 2: Fetch data from the constructed URL
//         $json = file_get_contents($urlNew);

//         // Step 3: Decode JSON payload
//         $data = json_decode($json, true);

//         // Step 4: Check for 'data' in JSON and process each stock quote
//         if (isset($data['data'])) {
//             foreach ($data['data'] as $quote) {
//                 $symbol = $quote['symbol'];
//                 $tstamp = $quote['timestamp'];    // "2024-10-30 19:59:57.644"
//                 $date0   =  substr($tstamp, 0, 10);  //( 0, 10, $quote['timestamp']);

//                 // Organize only required fields
//                 $processedBulkSymbols[$symbol] = [
//                     'timestamp' => $quote['timestamp'],
//                     'date' =>    $date0 , //$quote['timestamp'],
//                     'open' => $quote['open'],
//                     'high' => $quote['high'],
//                     'low' => $quote['low'],
//                     'close' => $quote['close'],
//                     'volume' => $quote['volume'],
//                     'previous_close' => $quote['previous_close'],
//                     'change' => $quote['change'],
//                     'change_percent' => $quote['change_percent'],
//                     'extended_hours_quote' => $quote['extended_hours_quote'],
//                     'extended_hours_change' => $quote['extended_hours_change'],
//                     'extended_hours_change_percent' => $quote['extended_hours_change_percent']
//                 ];
//             }
//         }
//     } catch (Exception $e) {
//         // Log or handle error
//         echo "Error fetching data: " . $e->getMessage();
//     }

    
//     // Return the processed data
//     return $processedBulkSymbols;
// }//fn

/*

{
    "endpoint": "Realtime Bulk Quotes",
    "message": "success",
    "data": [
        {
            "symbol": "MSTR",
            "timestamp": "2024-10-30 19:59:57.644",
            "open": "246.21",
            "high": "255.8",
            "low": "239.0",
            "close": "247.31",
            "volume": "20592520",
            "previous_close": "258.24",
            "change": "-10.93",
            "change_percent": "-4.2325",
            "extended_hours_quote": "242.9",
            "extended_hours_change": "-4.41",
            "extended_hours_change_percent": "-1.78319"
        },
        {
            "symbol": "AAPL",
            "timestamp": "2024-10-30 19:59:53.814",
            "open": "232.62",
            "high": "233.47",
            "low": "229.56",
            "close": "230.1",
            "volume": "47070807",
            "previous_close": "233.67",
            "change": "-3.57",
            "change_percent": "-1.5278",
            "extended_hours_quote": "230.8",
            "extended_hours_change": "0.7",
            "extended_hours_change_percent": "0.30422"
        },
        {
            "symbol": "TSLA",
            "timestamp": "2024-10-30 19:59:58.242",
            "open": "258.0",
            "high": "263.35",
            "low": "255.8201",
            "close": "257.55",
            "volume": "53993576",
            "previous_close": "259.52",
            "change": "-1.97",
            "change_percent": "-0.7591",
            "extended_hours_quote": "256.13",
            "extended_hours_change": "-1.42",
            "extended_hours_change_percent": "-0.55135"
        },
        {
            "symbol": "IBM",
            "timestamp": "2024-10-30 19:59:57.895",
            "open": "209.53",
            "high": "211.12",
            "low": "204.26",
            "close": "205.04",
            "volume": "6956624",
            "previous_close": "210.43",
            "change": "-5.39",
            "change_percent": "-2.5614",
            "extended_hours_quote": "204.9",
            "extended_hours_change": "-0.14",
            "extended_hours_change_percent": "-0.06828"
        },
        {
            "symbol": "AMD",
            "timestamp": "2024-10-30 19:59:59.981",
            "open": "153.0",
            "high": "153.0",
            "low": "148.105",
            "close": "148.6",
            "volume": "87701673",
            "previous_close": "166.25",
            "change": "-17.65",
            "change_percent": "-10.6165",
            "extended_hours_quote": "147.15",
            "extended_hours_change": "-1.45",
            "extended_hours_change_percent": "-0.97577"
        },
        {
            "symbol": "BA",
            "timestamp": "2024-10-30 19:58:18.420",
            "open": "152.5",
            "high": "156.91",
            "low": "152.5",
            "close": "154.24",
            "volume": "50738028",
            "previous_close": "152.98",
            "change": "1.26",
            "change_percent": "0.8236",
            "extended_hours_quote": "154.1499",
            "extended_hours_change": "-0.0901",
            "extended_hours_change_percent": "-0.05842"
        }
    ]
}
*/




function ReturnNiceTime($timestamp) {
    // Create a DateTime object from the timestamp
    $dateTime = DateTime::createFromFormat('Y-m-d H:i:s.u', $timestamp);
    
    // Format the time as "g:ia" (non-military time with am/pm)
    if ($dateTime) {
        return $dateTime->format('g:ia');
    }
    
    // Return nil if the timestamp format is invalid
    return "nil";
}

// // Example usage
// $timestamp = "2024-11-01 19:59:57.970";
// echo ReturnNiceTime($timestamp); // Output: "7:59pm"




function PrintBulkQuotes1($arr) {
    global $msg;

    foreach ($arr as $symbol => $quote) {
        echo $symbol. " ";  
        $time1 ="nil";
        foreach ($quote as $key => $value) {
            // if($msg==1)  echo " ______________    $key: $value<br />";
            if($key=="timestamp"){
                 $time1 = ReturnNiceTime($value); 
            }

            // if($key=="close") echo "$". $value. " ". $time1.",   "; 
            if($key=="close"){
                $floatval = round((float)$value, 2);
                // echo "$". $value. "   "; 
                echo "$". $floatval. "   "; 

            }

        }
        
    }
}

function PrintBulkQuotes($arr) {
    global $msg;

    foreach ($arr as $symbol => $quote) {
        if($msg==1)  echo "Symbol: $symbol<br />";
        foreach ($quote as $key => $value) {
            if($msg==1)  echo " ______________    $key: $value<br />";
        }
        // echo "\n"; // Add a blank line between symbols for readability
    }
}



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
if($msg==1) echo "<br />] <OLDr> Session cnt==". $cnt. ", datastr====>" .  $datastr ."<====";




// WriteFileData( $fname, $datastr, 0);  // overwrite to the file
// WriteFileData('example.txt', "This will append\n", 1);  // Appends to the file
$urlPrefix="https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=";
$urlSuffix="&apikey=91M7LB7MG3JHY129";

$gBulkQuotes = [];
$gBulkQuotes = GetBulkQuotes($symbols, $urlPrefix, $urlSuffix, 100 );
PrintBulkQuotes1($gBulkQuotes);
// PrintBulkQuotes($gBulkQuotes);



?>
