<?php
date_default_timezone_set("America/New_York"); 

/*
echo "Bravo Charlie Alpha, over???!?\n";

echo "Copy that, B*tch, this is the https://algoinvestorr.com server tawlkin' !\n\n\n";

$dotstr=".";
$myString = "Hey Bob! you know what to do with yourself";
for($i=0;$i<7;$i++){
    $dotstr.=".";
    $i0=$i+1;
    echo  "\n". $i0. ":  ". $myString. $dotstr. " - Elon"    ;
}
echo  "\n";
echo  "\n";
echo  "\n";
echo  "\n";

echo  "Trades (Buy or Sell Signals) Generated from Server:\n";
echo  "===================================================\n";
echo  "=\n";
echo  "=\n";
echo  "=   FORMAT:\n";
echo  "=\n";
echo  "=        <tradeID>,<udateTime>,<symbol>,<tradeCmd>,<price>,<numSharesOrContracts>,<duration_uDate>,<signalType>\n";
echo  "=\n";
echo  "=\n";
echo  "=\n";
echo  "=\n";
echo  "=\n";
echo  "===================================================\n";
echo  "=\n";
echo  "=\n";
*/
$t=time();
//echo($t . "<br>");
//echo date("h:i:sa"); 
$d1=  date("Y-m-d"); 
$t12= date("h:i:sa");
$t24= date("H:i:s");


//echo("serverPingDateTime,". date("Y-m-d",$t)."T". $t. ",A,B,C,D,E" );
echo "\n". "server,". $d1. "T". $t24. ",SYMBOL,TRADECMD,PRICE,NUMSH,DUR,". $t12 . "_EDT\n";

$rnd = rand(1,100);
if($rnd<20){
    echo "trade1,2023-12-08T10:01:00,NVDA,buyLimitAt,392.50,10,gtc_2024-02-16,buySignal";
    echo  "\n";
}else if($rnd<40){
    echo "trade1,2023-12-08T10:01:00,AAPL,buyLimitAt,192.50,100,gtc_2024-03-15,buySignal";
    echo  "\n";
    echo "trade2,2023-12-08T10:02:10,AAPL,buyLimitAt,187.25,200,gtc_2024-03-15,buySignal";
    echo  "\n";
}else if($rnd<60){
    echo "trade1,2023-12-08T10:04:00,AAPL240315C190,buyToOpen,12.50,25,day,buySignal";
    echo  "\n";
}else if($rnd<80){
    echo "noTRADE,2023-12-09T10:21:43,NOTRADE,nop,0.00,0,day,noTradeSignal";
    echo  "\n";
}else{
    echo "trade1,2023-12-09T10:21:43,TSLA240315C230,buyToOpen,24.25,5,day,buySignal";
    echo  "\n";
}


?>
