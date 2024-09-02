<?php 

function ReturnQuotedFields($str) {
    // Use a regular expression to match all strings enclosed in double quotes
    preg_match_all('/"(.*?)"/', $str, $matches);

    // Return the array of matched strings
    return $matches[1];
}


//
//   $geoip= "http://ip-api.com/php/2600:8801:3500:7160:51b5:f0eb:bc22:728c";
//      
//
// Example usage
// $str = 'a:14:{s:6:"status";s:7:"success";s:7:"country";s:13:"United States";s:11:"countryCode";s:2:"US";s:6:"region";s:2:"NV";s:10:"regionName";s:6:"Nevada";s:4:"city";s:9:"Las Vegas";s:3:"zip";s:5:"89108";s:3:"lat";d:36.2038;s:3:"lon";d:-115.2255;s:8:"timezone";s:19:"America/Los_Angeles";s:3:"isp";s:23:"Cox Communications Inc.";s:3:"org";s:22:"Cox Communications Inc";s:2:"as";s:31:"AS22773 Cox Communications Inc.";s:5:"query";s:39:"2600:8801:3500:7160:3ddb:1575:1a1f:6177";}';
// $result = ReturnQuotedFields($str);

// // Print the result
// print_r($result);


function FixLonLat($str) {
    // Use a regular expression to find all occurrences of d: followed by a float number and wrap them in quotes
    $fixedStr = preg_replace('/d:([-+]?\d*\.\d+);/', 'd:"$1";', $str);

    return $fixedStr;
}




function getJsonFromUrl($httpSite) {
    // Get the JSON response from the URL
    $response = file_get_contents($httpSite);

    // Check if the response was successful
    if ($response === FALSE) {
        return "Error: Unable to fetch data from the URL.";
    }else return $response;


    // // Decode the JSON response into a PHP associative array
    // $jsonData = json_decode($response, true);

    // // Check for JSON decoding errors
    // if (json_last_error() !== JSON_ERROR_NONE) {
    //     return "Error: JSON decoding failed - " . json_last_error_msg();
    // }

    // return $jsonData; // Return the decoded JSON data

    /* 

    write a php function ReturnQuotedFields( $str ) which takes a $str similar to "a:14:{s:6:"status";s:7:"success";s:7:"country";s:13:"United States";s:11:"countryCode";s:2:"US";s:6:"region";s:2:"NV";s:10:"regionName";s:6:"Nevada";s:4:"city";s:9:"Las Vegas";s:3:"zip";s:5:"89108";s:3:"lat";d:36.2038;s:3:"lon";d:-115.2255;s:8:"timezone";s:19:"America/Los_Angeles";s:3:"isp";s:23:"Cox Communications Inc.";s:3:"org";s:22:"Cox Communications Inc";s:2:"as";s:31:"AS22773 Cox Communications Inc.";s:5:"query";s:39:"2600:8801:3500:7160:3ddb:1575:1a1f:6177";}"
    and returns an array of strings found enclosed in quotes , i.e. $result[0]="status" $result[1]="success" $result[2]="country" etc
    


    2nd one handle datad d: for lon lat
    write a php function FixLonLat( $str ) which takes a string $str similiar to '{s:6:"status";s:7:"success";s:7:"country";s:13:"United States";s:11:"countryCode";s:2:"US";s:6:"region";s:2:"NV";s:10:"regionName";s:6:"Nevada";s:4:"city";s:9:"Las Vegas";s:3:"zip";s:5:"89108";s:3:"lat";d:36.2038;s:3:"lon";d:-115.2255;s:8:"timezone";s:19:"America/Los_Angeles";s:3:"isp";s:23:"Cox Communications Inc.";s:3:"org";s:22:"Cox Communications Inc";s:2:"as";s:31:"AS22773 Cox Communications Inc.";s:5:"query";s:39:"2600:8801:3500:7160:3ddb:1575:1a1f:6177";}'
    and finds the 'd:' and inserts double quotes around the number after the d: before the next ';' character.  The number will be a float  and can be positive of negative , i.e  d:36.2038; becomes d:"36.2038";
    
    
    
    
    
    ] GEO jsonResponse1= a:14:{s:6:"status";s:7:"success";s:7:"country";s:13:"United States";s:11:"countryCode";s:2:"US";s:6:"region";s:2:"NV";s:10:"regionName";s:6:"Nevada";s:4:"city";s:9:"Las Vegas";s:3:"zip";s:5:"89108";s:3:"lat";d:"36.2038";s:3:"lon";d:"-115.2255";s:8:"timezone";s:19:"America/Los_Angeles";s:3:"isp";s:23:"Cox Communications Inc.";s:3:"org";s:22:"Cox Communications Inc";s:2:"as";s:31:"AS22773 Cox Communications Inc.";s:5:"query";s:39:"2600:8801:3500:7160:3ddb:1575:1a1f:6177";}Array ( [0] => status [1] => success [2] => country [3] => United States [4] => countryCode [5] => US [6] => region [7] => NV [8] => regionName [9] => Nevada [10] => city [11] => Las Vegas [12] => zip [13] => 89108 [14] => lat [15] => 36.2038 [16] => lon [17] => -115.2255 [18] => timezone [19] => America/Los_Angeles [20] => isp [21] => Cox Communications Inc. [22] => org [23] => Cox Communications Inc [24] => as [25] => AS22773 Cox Communications Inc. [26] => query [27] => 2600:8801:3500:7160:3ddb:1575:1a1f:6177 )
0 ] status
1 ] success
2 ] country
3 ] United States
4 ] countryCode
5 ] US
6 ] region
7 ] NV
8 ] regionName
9 ] Nevada
10 ] city
11 ] Las Vegas
12 ] zip
13 ] 89108
14 ] lat
15 ] 36.2038
16 ] lon
17 ] -115.2255
18 ] timezone
19 ] America/Los_Angeles
20 ] isp
21 ] Cox Communications Inc.
22 ] org
23 ] Cox Communications Inc
24 ] as
25 ] AS22773 Cox Communications Inc.
26 ] query
27 ] 2600:8801:3500:7160:3ddb:1575:1a1f:6177



    
    */
}

?>