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

$uTimestamp = $d1. "T". $t24 ;

//echo "\n". "server,". $uTimestamp. ",SYMBOL,TRADECMD,PRICE,NUMSH,DUR,". $t12 . "_EDT\n";
 
$rnd = rand(1,100);


if($rnd<10){
    $trade0 = array("tradeId"=>"trade99", "date"=>"2023-12-09T09:22:54", "symbol"=>"nil",
            "tradeCmd"=>"killBot","price"=>"0.00","tradeSize"=>"0","dur"=>"nop","signalType"=>"stopTrading",
            "reqTimestamp"=>$uTimestamp);
    echo json_encode($trade0);
   
}else if($rnd<25){
    $trade0 = array("tradeId"=>"trade11", "date"=>"2023-12-13T13:03:54", "symbol"=>"NFLX",
           "tradeCmd"=>"sellIronCondor","price"=>"54.35","wings"=>["340","350","490","500"],"tradeSize"=>"5","dur"=>"day","signalType"=>"neutralMkt",
           "reqTimestamp"=>$uTimestamp);
   echo json_encode($trade0);
    
}else if($rnd<35){
    $trade0 = array("tradeId"=>"trade12", "date"=>"2023-12-13T13:03:54", "symbol"=>"NFLX",
           "tradeCmd"=>"sellCallCreditSpread","price"=>"485.50","wings"=>["490","500"],"tradeSize"=>"13","dur"=>"day","signalType"=>"bearishMkt",
           "reqTimestamp"=>$uTimestamp);
   echo json_encode($trade0);
    
}else if($rnd<45){
    $trade0 = array("tradeId"=>"trade13", "date"=>"2023-12-13T13:03:54", "symbol"=>"AAPL",
           "tradeCmd"=>"sellPutCreditSpread","price"=>"194.35","wings"=>["160","170"],"tradeSize"=>"17","dur"=>"day","signalType"=>"bullishMkt",
           "reqTimestamp"=>$uTimestamp);
   echo json_encode($trade0);
    
}else if($rnd<55){
    $trade0 = array("tradeId"=>"trade5", "date"=>"2023-12-08T09:22:54", "symbol"=>"ESTY",
           "tradeCmd"=>"buyStop","price"=>"54.35","tradeSize"=>"400","dur"=>"gtc","signalType"=>"buySignal",
           "reqTimestamp"=>$uTimestamp);
   echo json_encode($trade0);
    
}else if($rnd<65){
    $trade0 = array("tradeId"=>"trade3", "date"=>"2023-12-09T09:22:54", "symbol"=>"GS240315C230",
            "tradeCmd"=>"buyToOpen","price"=>"34.50","tradeSize"=>"4","dur"=>"day","signalType"=>"buySignal",
            "reqTimestamp"=>$uTimestamp);
    echo json_encode($trade0);
   
}else if($rnd<75){
    $trade0 = array("tradeId"=>"trade13", "date"=>"2023-12-14T13:03:54", "symbol"=>"AAPL",
           "tradeCmd"=>"buyButterfly","price"=>"194.35","wings"=>["192.50","195","197.50"],"tradeSize"=>"6","dur"=>"day","signalType"=>"neutralMkt",
           "reqTimestamp"=>$uTimestamp);
   echo json_encode($trade0);
    
}else if($rnd<90){
    $trade0 = array("tradeId"=>"trade2", "date"=>"2023-12-10T12:21:43", "symbol"=>"AMZN240315C130",
            "tradeCmd"=>"buyToOpen","price"=>"14.50","tradeSize"=>"12","dur"=>"day","signalType"=>"buySignal",
            "reqTimestamp"=>$uTimestamp);
    echo json_encode($trade0);
   
}else{
    $trade0 = array("tradeId"=>"trade1", "date"=>"2023-12-09T10:21:43", "symbol"=>"TSLA240315C230",
            "tradeCmd"=>"buyToOpen","price"=>"24.50","tradeSize"=>"5","dur"=>"day","signalType"=>"buySignal",
            "reqTimestamp"=>$uTimestamp);
    echo json_encode($trade0);
   
}


?>
