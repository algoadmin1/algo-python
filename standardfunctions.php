<?php
//standardFunctions.php  ver 2.0

// ******************************************************************** Functions
//
// include 'functions.php'; // Include the file containing functions

function PrintUserInputs($udate0, $utime0, $uname0, $acct0, $msg0){
  // Use the values as needed
  echo "Input msg: $msg0 , ";
  echo "Input Date: $udate0 , ";
  echo "Input Time: $utime0 , ";
  echo "Input Username: $uname0 , ";
  echo "Input Acct#: $acct0 <br>";  
}
function RightString($str0, $numchars) {
    $right_part = substr($str0, -$numchars);
    return $right_part;
}
function LeftString($str0, $numchars) {
    $left_part = substr($str0, 0, $numchars);
    return $left_part;
}
function ConCat($str1, $str2) {
    $concatenated_string = $str1. $str2;
    return $concatenated_string;
}
function NumCSVs( $csvstring ){
  //$csvstring0 = "2,w,3,aal,googl,8,citi,xom"; // Your CSV string
  // Parse the CSV string into an array
  $values_array = str_getcsv($csvstring);
  // Count the number of values
  $num_values = count($values_array);
  //echo "Number of CSV values: $num_values"; // Output the count
  return $num_values;
}
function HashIt($str0){
  //$str0 = "Your string here"; // Replace this with your string
  // Generate SHA-256 hash
  $hashstr = hash('sha256', $str0);
  /*echo "  >>>>Original String: ";
  echo LeftString($str0,32) ."...<<<<  ";
  echo "SHA-256 Hash: >>>$hashstr<<<  ";
  */
  return $hashstr;
}
function PrintArray0( $arrstrs , $arrstrs0 ){
  // Print the resulting array
  echo "<br /><br /><br />] resulting array = ". $arrstrs0. "[] == <br />";
  print_r($arrstrs);
}
function GetEntryNums(){
  $aa=10+11-1;
  $bb=3*8;
  return $aa. $bb. "!";
}
function GetDBSafe_NYCTimeNOW($num0){
      $timeNYCnow0 =  date("Y-m-d\TH:i:s");
      $timeNYCnow1 =  date("Y-m-d\THis");    
      $timeNYCnow  =  date("Y-m-d\TH_i_s");
  if($num0==1) return( $timeNYCnow1 ); 
    else if($num0==0) return( $timeNYCnow0);
    else  return( $timeNYCnow ); 
}
function GetNYDateTime(){
  $timeNYC0 =  date("Y-m-d\TH:i:s");
  return $timeNYC0;
}
function echoColor($printstr, $colorstr){   // colorstr = " red blue  green black white yellow purple orange gray"
  echo '<p style="color: '. $colorstr. ';">'. $printstr. '</p>';
 // echo '<p style="color: green;">The file '. $fname. ' exists.</p>';
}
function RaiseCharacter($str, $num) {
    if ($num >= 0 && $num < strlen($str)) {
        $str[$num] = strtoupper($str[$num]);
        return $str;
    } else {
        return "Invalid position $num  or string length exceeded in: $str at $num .";
    }
}
function LeftInsertString($str0, $strToInsert, $num) {
    if ($num >= 0 && $num <= strlen($str0)) {
        $leftPart = substr($str0, 0, $num);
        $rightPart = substr($str0, $num);
        return $leftPart . $strToInsert . $rightPart;
    } else {
        return "Invalid position $num  or string length exceeded in: $str0 at $num .";
    }
}
function RightInsertString($str0, $strToInsert, $num) {
    if ($num >= 0 && $num <= strlen($str0)) {
        $leftPart = substr($str0, 0, -$num);
        $rightPart = substr($str0, -$num);
        return $leftPart . $strToInsert . $rightPart;
    } else {
        return "Invalid position $num  or string length exceeded in: $str0 at $num .";
    }
}
function DetectCharacter($str0, $char0, $num) {
    if ($num >= 0 && $num < strlen($str0)) {
        return $str0[$num] === $char0;
    } else {
        return false;
    }
}
function RemoveRightCharacter($str0, $num) {
    if ($num >= 0 && $num < strlen($str0)) {
        return substr($str0, 0, -$num - 1) . substr($str0, -$num);
    } else {
        return "Invalid position or string length exceeded";
    }
}
function ReadableDate($datestr,$yrStr) { // returns "December 25th 2023  w/ or w/out the year"
    $timestamp = strtotime($datestr);
    if($yrStr=="year"){
      return date("F jS Y", $timestamp);
    }    else    return date("F jS", $timestamp);

}
function BoldString($str2){
  $str1='<strong>';
  $str3='</strong>';
  return $str1.$str2.$str3;
}

function CheckDate0($datestr0){
    $dateck = DateTime::createFromFormat('Y-m-d', $datestr0);
    //if( strlen($udate0==10) )  $tradedatestr = $udate0 ;
    $tof0=false;
    if ($dateck !== false && $dateck->format('Y-m-d') === $datestr0 &&  strlen($datestr0)==10  ) {
        echo "<br /> ] CheckDate0(): Valid date OK in 'YYYY-MM-DD' format: $datestr0 , strlen()==". strlen($datestr0);
        // $tradedatestr=$datestr;  // override date to read/write
        $tof0= true;
    } else {
        echo "<br /> ] CheckDate0(): Invalid date or not in 'YYYY-MM-DD' format: $datestr ";
        $tof0= false;
    }
    return $tof0;
}

function FloorIt($num, $modulo) {
    return floor($num / $modulo) * $modulo;
}

function SendEmailTo($receiverEmail, $senderEmail, $subject, $msg) {
    $headers = "From: $senderEmail\r\n";
    $headers .= "Reply-To: $senderEmail\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Send the email
    if (mail($receiverEmail, $subject, $msg, $headers)) {
        return "Email sent successfully!";
    } else {
        return "Failed to send email. Check your server's configuration or try again later.";
    }
}
 
 
// function returnStringInside($str, $char0) {
//     // Check if $str exists and is not null
//     if (!isset($str) || is_null($str)) {
//         return "Error: Input string \$str cannot be null or undefined.";
//     }

//     // Check if $char0 is one character only
//     if (strlen($char0) !== 1) {
//         return "Error: Input character \$char0 must be one character only.";
//     }

//     // Find the positions of the first two occurrences of $char0
//     $pos1 = strpos($str, $char0);
//     $pos2 = strpos($str, $char0, $pos1 + 1);

//     // Check if both occurrences are found
//     if ($pos1 === false || $pos2 === false) {
//         return "Error: Unable to find two occurrences of \$char0 in \$str.";
//     }

//     // Extract the string between the first two occurrences of $char0
//     $result = substr($str, $pos1 + 1, $pos2 - $pos1 - 1);

//     return $result;
// }

// // Test the function
// $str = "This is a test string to extract data from.";
// $char0 = "s";

// echo "Original String: $str<br>";
// echo "Character to find: $char0<br>";

// $result = returnStringInside($str, $char0);
// if (substr($result, 0, 5) === "Error") {
//     echo "Error: $result";
// } else {
//     echo "String between first two occurrences of '$char0': $result";
// }

 

?>