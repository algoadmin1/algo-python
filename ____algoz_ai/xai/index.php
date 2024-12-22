<?php
                                                                                        $ver = "1.5";      // algoz.ai/xai/index.php

date_default_timezone_set('America/New_York');


$prompt1 = "Testing. Just say hi and then tell us about Elon and his help in the recent US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";
$prompt2 = "Testing. Just say hi and then tell us about the recent rise in the stock market indicies, and how Elon Musk helped Trump win the  US Election, and how it impacted TSLA stock and Bitcoin both fundamentally and technically.";

$promptInit = "Say something nice to me and tell me how the NASDAQ and S&P did today, noting a few stocks that moved a lot, and tell me why they moved.";
$prompt0 = $promptInit ; 


if(isset( $_GET['prompt'] )){
    $prompt0 = $_GET['prompt'] ;
}else{
    if(isset( $_GET['pr'] )){
        $prompt0 = $_GET['pr'] ;
    }else{
        $prompt0 = $promptInit ;  
    }
}
$prompt = $prompt0;

// echo "<br />] Thank you for choosing algoz.ai - ";
// echo "<br />";
// echo "<br />]  One moment while we get retrieve an ai response...";


$headerStr= "Location: ./xai.php?prompt=". $prompt;

// header("Location: ./xai.php?prompt=". $prompt );
header(  $headerStr  );

?>
