<?php


$str1= "https://algoz.ai/";
$str2= "/jsonget.php?sym=";


if(isset( $_GET['dir'] )){
    $dir = $_GET['dir'] ;
}else{
    $dir = "d2";
}


function EchoString( $str ){
    // echo $str."<br /><br />";
    echo '<a href="' . $str. '">'. $str. '</a>'."<br /><br />";

}

function Echo_TestCasesForSymbol($sym){
    global $str1, $str2, $dir;

    echo "<br /><br />**** ". $sym." ********<br />" ;
    $str1a = $str1.$dir.$str2. $sym ; 
    EchoString($str1a);


    $str1a = $str1.$dir.$str2. $sym.  "&per=d"; 
    EchoString($str1a);

    $str1a = $str1.$dir.$str2. $sym. "&per=weekly";
    EchoString($str1a);

    $str1a = $str1.$dir.$str2. $sym. "&per=monthly";
    EchoString($str1a);


    $str1a = $str1.$dir.$str2. $sym. "&per=1min";
    EchoString($str1a);

    $str1a = $str1.$dir.$str2. $sym. "&per=5min"; 
    EchoString($str1a);


    $str1a = $str1.$dir.$str2. $sym."&per=15"; 
    EchoString($str1a);


    $str1a = $str1.$dir.$str2. $sym. "&per=30min"; 
    EchoString($str1a);

    $str1a = $str1.$dir.$str2. $sym. "&per=60"; 
    EchoString($str1a);

}

Echo_TestCasesForSymbol("aapl");
Echo_TestCasesForSymbol("mstr");
Echo_TestCasesForSymbol("amzn");
Echo_TestCasesForSymbol("gs");
Echo_TestCasesForSymbol("nflx");
Echo_TestCasesForSymbol("tsla");
Echo_TestCasesForSymbol("googl");
Echo_TestCasesForSymbol("ba");
Echo_TestCasesForSymbol("btc-usd");
Echo_TestCasesForSymbol("sol-usd");




?>