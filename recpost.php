// recpost.php
<?php
echo "] recpost.php is running...\n";



//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

//$searchQuery = $_POST["post_query"];
$searchQuery = $_POST["data"];

$filePath="";
$filePath1 = "intradaytrades"; 
$todaysdate = date('Y-m-d');
$filePath.= $filePath1."_". $todaysdate. ".txt";


//$con = mysqli_connect("localhost", "jb_jackabeejohn", "jackabee66", "jb_jackabee_Users1");
//	if (!$con) die('Could not connect: ' . mysqli_error($con));
//	mysqli_select_db($con, "jb_jackabee_Users1" ) or die ("DB select failed - " . mysqli_error($con));
 
echo "] fn= $filePath , reading searchQuery... \n";  //= $searchQuery \n";

$splitChars = ",";
//$afterAdrsee = strpbrk($searchQuery,$splitChars);
//$avName      =  strtok($searchQuery,$splitChars);    // userName trying to sign in, above, pwd

$i=0;

$params = explode (",", $searchQuery);
echo "\n params = ". $params[0]. "|". $params[1]. "|". $params[2]. "|".  $params[3]. "|". $params[4]. "|". $params[5]. "|". $params[6]. "|". $params[7]. "|". $params[8]. "|". $params[9];
$cnt=count($params);
echo "\nFound $cnt params[] (all lines)...\n";
//for($i=0;$i<$cnt;$i++){
//    if($i%50==0) echo $i. ") ". $params[$i]."\n";
//}

//echo "  userNewsignin.php:   avName = $avName,  afterAdrsee = $afterAdrsee\n";

//$password = $afterAdrsee;
/*
$params = explode (",", $afterAdrsee);
$password= $params[1];
$passwordSHA1 = sha1( $password );
$lastIP  = $params[2];
*/

$name = $searchQuery;
// chatGPT's version...
//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//  $name = $_POST['fname'];

  //
  if (empty($name)) {
    echo "Name is empty\n";
  } else {
    echo $name. "\n\n msg rec'd OK!\n";
  }

//}



echo "\n\n] Writing/appending  searchQuery  to file: ". $filePath. "\n";

// Check if the searchQuery is set and not empty
if (isset($searchQuery) && !empty($searchQuery)) {
    // File path
   // $filePath = "todaystrades.txt";

    // Open the file in append mode
    $file = fopen($filePath, "a");

    // Append the searchQuery to the file
    fwrite($file, $searchQuery. PHP_EOL); // Appends the query and adds a new line

    // Close the file
    fclose($file);

    echo "\n] Search  searchQuery  has been successfully appended to ". $filePath." ...\n\n";
} else {
    echo "\nNo valid search query provided.";
}

?>