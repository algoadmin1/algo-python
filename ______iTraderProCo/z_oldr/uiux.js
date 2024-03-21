//
//    uiux.js  
//

var canvasGlobal = document.getElementById("myCanvas");

var gVersionNum = "v12.78ui";

var gTimerBarMultiplier=0.25;

var gConsoleEvents = 0; //1;


var gBGcol = "#000000";

var gButtonNumClicked=-1;
var gRound= 14;
var n; 							// should change event listener # times
var gPlayerUserIDstr="jb";
var gPlayerUserIDNumstr="13";

var gButColOff= "#882222";   //"#33ff8a"; //"#d4f5f5"; //"#aa3322";
var gButColOn = "#22aa33";

var bOff = 4;
var bOffStr=""; 
  
var gSFX=1;

var gCountdownStopper=1 ;

 
var gComputeAndRenderCandlesStatus=0;
var gSendAlgoEmail=0;

var gDrawEarningsAll=0;
var gDrawWatchlist=0; 


var imgcryptopath = "img/crypto/";

var imgpath ="img/";
var imgbuttonpath ="img/buttons/";
var imgSwitchButtons= [
                    "sw0", "sw1", "sw2" 
                    ];

var  numImgSwitchButtons= imgSwitchButtons.length;



let butTextSize="32";
// buttons on top
var bTextsCutoff= 15;   // cutoff for stnd buttons
var bTextIntervalCutoff = 48;  // interval, earnings+ switches at end of list

// note:  var numButtons = bTexts.length;   // must match bRects[] and bClickStatus[] & bClickStatusInit[]
var bTexts= [
                    "Switches",
                    "Color",
                    "Chart Type",
                    "Buy/Sell",
                    "Sup/Res",  //$ must be in this poisiotn [2] in 0... array
                    

                    "Pivots",
                    "LongTerm",
                    "MAs&Dojis",     // status button 
                    "Gaps",   // you have
                    "Run P&L",


                    "Earnings",  /// freeing up soon for Earnings
                    "Watchlist",
                    "aiGuage",
                    "Crypto",
                    "Extras",

                    "Run algoInvestor!",

                    //0..15  ends here

// top 16 crypto

//  16..31
                    "BTC_Bitcoin",
                    "ETH_Ethereum",
                    "XRP_Ripple",
                    "LTC_Litecoin",
                    "ADA_Cardano", 

                    "DOGE_Dogecoin",
                    "ALGO_Algorand",
                    "ENJI_EnjiCoin",     // **
                    "BNB_BinanceCoin",    
                    // "USDT_Tether",      // **
                    "SHIB_ShibaInu",      // **

                    "XLM_Stellar",
                    "DOT_Polkadot",
                    "LUNA_Terra",
                    "BCH_BitcoinCash",
                    "FIL_FileCoin",

                    "SOL_Solana",

//32 ..47

                    "TRON_TronCoin",
                    "ETH2_Ethereum2",
                    "THETA_Theta",
                    "BUSD_BinanceUSD",
                    "ADA_Cardano", 

                    "ATOM_Cosmos",
                    "ICP_InternetComputerPrice",
                    "MATIC_Polygon",     
                    "VET_VeChain",    
                    "LINK_ChainLink",

                    "EGR_Egoras",
                    "XMR_Moreno",
                    "CAKE_PancakeSwap",
                    "MANA_Decentraland",
                    "SUSHI_SushiSwap",

                    "HNT_Helium",


      // 8 more 48..55 buttons for  1min 5min 15min 30min  60min Daily Weekly

// 13 buttons
                    "1min",     // 48
                    "5min",
                    "15min",
                    "30min",

                    "60min",
                    "Daily", 
                    "Weekly",    // 54
                    "Monthly",    //  55

                    "Quote",			   // 56
                    "Candles++",    // 57
                    "Candles--",   //  58
                    "BTC Live",		// 59

                    "ETH Live",  //60
 					


 // another 13         61..64
                    "  3month",
                    "  2year",
                    "  5year",
                    "  7year",

 //                  65..68
                    " 10year",
                    " 30year",
                    "    fed",
                    "    gdp",

//            69..72
                    "    cpi",
                    "inflation",
                    "   << ",   // earnings left & right
                    "   >> ",

//73
                    "Calculator",   // close window button?


                ];

var numButtons = bTexts.length;   // must match bRects[] and bClickStatus[] & bClickStatusInit[]


//matches bT3xts[ 16.. ] 
var imgButtons= [
      "BTC",  "ETH", "XRP", "LTC", "ADA",     "DOGE", "ALGO", "ENJI", "BNB", "SHIB", 
      "XLM",  "DOT", "LUNA", "BCH", "FIL",     "SOL",

      "TRON",  "ETH2", "THETA", "BUSD", "ADA",     "ATOM", "ICP", "MATIC", "VET", "LINK", 
      "EGR",  "XMR",   "CAKE", "MANA", "SUSHI",    "HNT"

                    ];
                    
//blank at 7,3
var imgButtonsUV= [
//                                      DOGE  ALGO
     // 0,0,  1,0,  6,0,  2,0,  3,0 ,      4,0,  0,1,  1,1,  5,0,  2,1,
     0,0,  1,0,  6,0,  2,0,  3,0 ,      4,0,  0,1,  1,1,  5,0,  7,3,
     1,3,  5,1,  3,1,  1,2,  6,1,      7,1 ,             

//   TRON  CAKE                         COS
     0,2,  7,3,  7,3,  7,3,  7,3,      1,4,  7,3,  7,3,  7,3,  5,2,
     7,3,  7,3,  4,3,  4,2,  3,3,      7,3,               


                    ];

var  numImgButtons= imgButtons.length;  // note imgButtons.len ====imgButtonsUV.len !!! MUST==
let  imgButtonArray;   // crypto buttons stored here


// top 20 crypto April 13, 2021 02:51:30 AM
// Cryptocurrency Price List
// # Name  Price (USD) Chg (24h) Chg (7d)  Chg (30d) Price (BTC) Market Cap  Volume (24h)  Price Graph (7d)
//  1  Bitcoin $62,625.03  4.64% 5.93% 2.36% 1 $1,169.93B  $1.38B  
//  2  Ethereum  $2,206.25 3.20% 4.67% 14.84%  0.0352  $254.71B  $369.80M  
//  3  XRP $1.62 10.01%  76.68%  252.70% 0.00002569  $161.48B  $298.33M  
//  4  Binance Coin  $543.82 -8.92%  47.65%  97.01%  0.008653  $92.74B $70.12M 
//  5  Tether  $1.00 -0.05%  -0.06%  -0.06%  0.00001591  $45.47B $158.58M  
//  6  Polkadot  $41.04  1.36% -10.43% 10.47%  0.0006547 $43.71B $8.28M  
//  7  Cardano $1.32 0.15% 8.66% 19.62%  0.00002092  $42.18B $26.86M 
//  8  Uniswap Protocol Token  $34.40  -6.29%  11.62%  5.85% 0.0005475 $34.40B $30.14M 
//  9  Stellar $0.63 6.49% 17.23%  54.50%  0.00000996  $31.44B $87.50M 
// 10  Litecoin  $263.82 7.88% 19.17%  16.64%  0.004204  $17.79B $114.80M  
// 11  Terra $16.10  10.08%  -8.31%  10.36%  0.0002603 $15.43B $23.74M 
// 12  TRON  $0.13 4.42% -1.61%  154.44% 0.00000214  $13.57B $11.23M 
// 13  Solana  $26.89  -5.65%  16.96%  75.87%  0.0004273 $13.25B $10.66M 
// 14  Bitcoin Cash  $700.88 4.43% 8.27% 18.07%  0.01118 $13.11B $27.99M 
// 15   Avalanche $32.27  -4.70%  3.13% 4.50% 0.000513  $12.35B $122,131  
// 16   Theta $11.96  -1.35%  2.94% 75.03%  0.0001906 $11.96B $35.83M 
// 17   VeChain $0.13 2.56% 29.30%  95.86%  0.0000021 $11.38B $12.48M 
// 18  USD Coin  $1.00 0.00% 0.00% 0.02% 0.00001591  $11.00B $10.74M 
// 19  FileCoin  $164.18 -2.27%  -6.97%  232.15% 0.0026  $10.90B $19.19M 
// 20  Dogecoin  $0.07 5.26% 24.30%  18.83%  0.00000119  $9.61B  $15.49M 





let xClickOff = 0; 
let yClickOff = 182; 



let xButOff = 120; 
let yButOff = 200; 

let y10a= 10;  //yoffset down from topn for 1min.. etc buttons
let y10b= 64; //=90; // y height of 1min, 5min, ... weekly buttons
 let y10b1= y10b * 0.90;  

let y10= 120;   // =70 ;
// let y10b= 90; //128; // y height of 1min, 5min, ... weekly buttons

let yl120=110; 

let yl120a=110; //=146;  // == y height of crypto buttons 1..16, 17..32  

let xl220 = 240;   //=220;  
let xl220a= 256; //192; 


// WIDTH OF 1min 5min ... Weekly buttons
let xl100 = 208; // 256;   //=220;  

let jbBut;
var gSwitchOffsetX  = -120; // -100; // =390; x50+
var gSwitchOffsetX1 = 0; // =390;
var x50=40;

// var x111=220;
var x111=0;

var gCryptoOffsetX  =350;
var gCryptoOffsetX1 = 64;

//                =       + 350  + 256
let gChartLeftStart = xButOff+ gCryptoOffsetX + xl220a ;
let gxIntvOff = 146;  // - 

let gIntervalButton0 = canvasGlobal.height *0.9978 -  y10b;
let gIntervalButton0b= canvasGlobal.height *0.01;

let gIntervalButton0a= canvasGlobal.height *0.9978 - (3.5* y10b);
// let y10b= 90; //128; // y height of 1min, 5min, ... weekly buttons

// needs to match # in bt3xts[]
var bRects = [
//switches
                      xButOff+gSwitchOffsetX, y10+ 0,        xl220,yl120,
                      // xButOff+gSwitchOffsetX+200, y10+ 0,        xl220,yl120,
                      xButOff+ gSwitchOffsetX,y10+(120 * 1), xl220,yl120, 

                      xButOff+x50+gSwitchOffsetX,y10+(120 * 2), xl220,yl120,        
                      xButOff+x50+gSwitchOffsetX,y10+(120 * 3), xl220,yl120,      


                      xButOff+x50+gSwitchOffsetX,y10+(120 * 4), xl220,yl120,        
                      xButOff+x50+ gSwitchOffsetX,y10+(120 * 5), xl220,yl120,         

                      xButOff+x50+ gSwitchOffsetX,y10+(120 * 6), xl220,yl120,              
                      xButOff+x50+ gSwitchOffsetX,y10+(120 * 7), xl220,yl120,    


                      xButOff+x50+ gSwitchOffsetX,y10+(120 * 8), xl220,yl120,         
                      xButOff+ gSwitchOffsetX,y10+(120 * 9), xl220,yl120,           

                      xButOff+ gSwitchOffsetX,y10+(120 * 10), xl220,yl120,           
                      xButOff+ gSwitchOffsetX,y10+(120 * 11), xl220,yl120,           


                      xButOff+ gSwitchOffsetX,y10+(120 * 12), xl220,yl120,            
                      xButOff+ gSwitchOffsetX,y10+(120 * 13), xl220,yl120,           
// "Crypto" moved here to #1 from #14 ( / 0..15)
                      xButOff+ gSwitchOffsetX,y10+(120 * 14), xl220,yl120,   
                    // xButOff+gSwitchOffsetX, y10+ 0,        xl220,yl120,
                      xButOff+ gSwitchOffsetX,y10+(120 * 15), xl220,yl120,           

    


//crypto 1..16
                      xButOff+ gCryptoOffsetX, y10+ 0,       xl220a,yl120a,
                      xButOff+ gCryptoOffsetX,y10+(120 * 1), xl220a,yl120a, 
                      xButOff+gCryptoOffsetX,y10+(120 * 2), xl220a,yl120a,        
                      xButOff+gCryptoOffsetX,y10+(120 * 3), xl220a,yl120a,  


                      xButOff+gCryptoOffsetX,y10+(120 * 4), xl220a,yl120a,        
                      xButOff+ gCryptoOffsetX,y10+(120 * 5), xl220a,yl120a,         
                      xButOff+ gCryptoOffsetX,y10+(120 * 6), xl220a,yl120a,              
                      xButOff+ gCryptoOffsetX,y10+(120 * 7), xl220a,yl120a,    


                      xButOff+ gCryptoOffsetX,y10+(120 * 8), xl220a,yl120a,         
                      xButOff+ gCryptoOffsetX,y10+(120 * 9), xl220a,yl120a,           
                      xButOff+ gCryptoOffsetX,y10+(120 * 10), xl220a,yl120a,           
                      xButOff+ gCryptoOffsetX,y10+(120 * 11), xl220a,yl120a,           


                      xButOff+ gCryptoOffsetX,y10+(120 * 12), xl220a,yl120a,            
                      xButOff+ gCryptoOffsetX,y10+(120 * 13), xl220a,yl120a,           
                      xButOff+ gCryptoOffsetX,y10+(120 * 14), xl220a,yl120a,           
                      xButOff+ gCryptoOffsetX,y10+(120 * 15), xl220a,yl120a,           
    

//2nd set crypto

     x111+                 xButOff+ gCryptoOffsetX, y10+ 0,       xl220a,yl120a,
     x111+                 xButOff+ gCryptoOffsetX,y10+(120 * 1), xl220a,yl120a, 
      x111+                xButOff+gCryptoOffsetX,y10+(120 * 2), xl220a,yl120a,        
       x111+               xButOff+gCryptoOffsetX,y10+(120 * 3), xl220a,yl120a,  


        x111+              xButOff+gCryptoOffsetX,y10+(120 * 4), xl220a,yl120a,        
        x111+              xButOff+ gCryptoOffsetX,y10+(120 * 5), xl220a,yl120a,         
         x111+             xButOff+ gCryptoOffsetX,y10+(120 * 6), xl220a,yl120a,              
          x111+            xButOff+ gCryptoOffsetX,y10+(120 * 7), xl220a,yl120a,    


          x111+            xButOff+ gCryptoOffsetX,y10+(120 * 8), xl220a,yl120a,         
           x111+           xButOff+ gCryptoOffsetX,y10+(120 * 9), xl220a,yl120a,           
              x111+         xButOff+ gCryptoOffsetX,y10+(120 * 10), xl220a,yl120a,           
              x111+         xButOff+ gCryptoOffsetX,y10+(120 * 11), xl220a,yl120a,           


              x111+         xButOff+ gCryptoOffsetX,y10+(120 * 12), xl220a,yl120a,            
               x111+        xButOff+ gCryptoOffsetX,y10+(120 * 13), xl220a,yl120a,           
                x111+       xButOff+ gCryptoOffsetX,y10+(120 * 14), xl220a,yl120a, 
                 x111+       xButOff+ gCryptoOffsetX,y10+(120 * 15), xl220a,yl120a,           
    



// 8 for min / day/wk/mo chart buttons 
//
//  
 

                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                 

                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (10 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (11 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (12 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (13 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,

//56.. 60  [0..60]
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (14 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (15 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (16 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (17 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,
  
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (18 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0b,        xl100,y10b1,

//gStartChartX-200



                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                 

                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (10 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (11 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (12 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (13 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,

//56.. 60  [0..60]
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (14 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (15 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (16 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (17 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,
  
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (18 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0,        xl100,y10b1,

 
                ];
 
// note:
/*

// used for switches
            var gLineOnClose=0;
            var gDrawP3Pivots=2;
            var gDrawGaps=1;
            var gDrawSupRes=1;
            var gDrawBuySell=1;

               var gDrawSpreads=0;
            var gDrawGuage=0;

                 var gDrawTraderText=1;
            var gDrawExtras=0;
            var gDraw MinorCrossover=0;
            var gDrawBacktest=0;
                 var gAllOnOff=0;
            var gDrawDojis=1;
            var gDrawMvgAvgs=1;
            var gDrawCrypto=0;
// used for switches

*/


// for init_Swi tchesVars
var bClickStatus = [


//Switches          line/
//         sw, *col,cndl, bs,      sr,  p,  win,  mvg,  Gspdoji, *PnL,+, -,        gu, cry, *extr,  *run        
          // 0, 0,  1,    1,      0,   0,  0,    0,        0 ,     0, 0,  0,       0,   0,   0,      0 ,
             0, 0,  0,    1,      1,   0,  0,    0,        0 ,     0, 0,  0,       0,   0,   0,      0 ,
 

//                  2nd 16 for top crypto  
                        0,0,  0,0, 0,0,   0,0,    0,0,        0,0,   0,0,   0,0,

//                  3rd 16 for top crypto  
                        0,0,  0,0, 0,0,   0,0,    0,0,        0,0,   0,0,   0,0,



 //                  4th  8 for 1, 5, 15, 30, 60, day, week chart selection
                        // 48 49   50 51     52  53  54
                        0,0,  0,0,             0,0,   0,

// month  chart         55
                          0,
                        // additionals 56..60  
                           0, 0, 0, 0, 0,



// ANOTHER 13 , SO 61..73               // 60+13= 73
                   // 61 62   63,64         65, 66,  67
                        0,0,  0,0,             0,0,   0,

// month  chart         68
                          0,
                        // additionals 69..73  
                           0, 0, 0, 0, 0

                ];
  
 

// for init_Swi tchesVars
var bClickStatusInit = [


//Switches          line/
//         sw, *col,cndl, bs,      sr,  p,  win,  mvg,  Gspdoji, *PnL,+, -,        gu, cry, *extr,  *run        
          // 0, 0,  1,    1,      0,   0,  0,    0,        0 ,     0, 0,  0,       0,   0,   0,      0 ,
             0, 0,  0,    1,      1,   0,  0,    0,        0 ,     0, 0,  0,       0,   0,   0,      0 ,
 

//                  2nd 16 for top crypto  
                        0,0,  0,0, 0,0,   0,0,    0,0,        0,0,   0,0,   0,0,

//                  3rd 16 for top crypto  
                        0,0,  0,0, 0,0,   0,0,    0,0,        0,0,   0,0,   0,0,

 //                  4th  8 for 1, 5, 15, 30, 60, day, week chart selection
                        // 48 49   50 51     52  53  54
                        0,0,  0,0,             0,0,   0,

// month  chart         55
                          0,
                        // additionals 56..60  
                           0, 0, 0, 0, 0,





// ANOTHER 13 , SO 61..73               // 60+13= 73
                   // 61 62   63,64         65, 66,  67
                        0,0,  0,0,             0,0,   0,

// month  chart         68
                          0,
                        // additionals 69..73  
                           0, 0, 0, 0, 0


                ];
  
 


 var countdownStart=1000;
 var countdown =1000;
 var countdownH=400;

var gMouseDown=0;
 var    gMouseUp=0;
 
var countDownDate = new Date("Oct 12, 2022 01:00:00").getTime();

let clickNdrag = 0;
let clickNdrag1 = 0;



 var    xAdderButtonTest=0;

var gDrawSwitches = 0;
var gDrawColor = 0;

let gStartChartX1 = 200   ; //900 - 200;


// image rq logo 
// const imgLogo = new Image()
// imgLogo.src = "logo.png"  // 180x144


const imgSwitches = new Image();
imgSwitches.src   =  imgbuttonpath +   "switchesblue.png"  ;
 
const imgCryptos = new Image();
imgCryptos.src   =  imgcryptopath +   "cryptogrid.png"  ;
     


// var     sfx_explosion;
 //   sfx_explosion = new sound("mp3/bomb.mp3");
 //            sfx_explosion.play();

/*

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}



// let particles
// function SpawnFireworks(typestr, max, grEpsilon){
//   //  gravity *= grEpsilon;
//     var pMax0= max;
//     gravity = gravitySt;
//     const particleAngle =pMax0
//     const angleIncrement= ( Math.PI * 2 )/ particleAngle  
//     for(let i=0;i<pMax0;i++){
//           particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
//             {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
//             } )     )
//     }//FOR
// }//fn
//
// class Particle{
//     constructor(x,y, radius, color, a, velocity){
//         this.x =x
//         this.y =y
//         this.radius=radius
//         this.color= color 
//         this.alpha= a 
//         this.velocity = velocity 
//     }
//     draw(){
//         ctx.save()
//             ctx.globalAlpha  = this.alpha
//             ctx.beginPath()
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
//             ctx.fillStyle=this.color   
//             ctx.fill()
//             ctx.closePath()
//         ctx.restore()
//      }
//      update(){
//         this.draw()
//         this.velocity.x *= friction
//         this.velocity.y += gravity
//         this.alpha      -= alphaChange
//         this.x += this.velocity.x * velocityXmult  
//         this.y += this.velocity.y * velocityYmult  
//      }
// }
// function initParticles(){
//     particles=[]
// }


// from craps


function UndoAllBets(){

    playerBets.forEach( (bet, i) => {
          if(!(bet.masterId==13 && PointIsOff!="OFF")){
        var chipval = bet.chipvalue;
          
          gPlayerChips += chipval; //playerBets[l].chipvalue;
          gHouseChips -= chipval; 

              playerBets.splice( i, 1);
          }
      })
          
}//fn

function UndoLastBet(){
  
   var l= playerBets.length-1;
  var chipval =playerBets[l].chipvalue;
    
   if(  playerBets[l].masterId == 13  && thepointIs!="OFF"){
    while(l>=0 &&  playerBets[l].masterId == 13 ){
        l--;
      }//while
    }
if(l>=0){
  gPlayerChips += chipval; //playerBets[l].chipvalue;
  gHouseChips -= chipval; 

  playerBets.splice(l,1);
  DrawTable();
  AddCountdownTime(0.450);
  return(l);
 }else AddCountdownTime(0.2);

}//fn


*/



// const imgdice1 = new Image();
// imgdice1.src = "imgcraps/dice1.png";
// c.drawImage(imgdice1, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );



//
// img.onload = () => { 
//     // ctx.fillStyle = 'rgba(0,0,0,0.05)' 
//     // ctx.fillRect(0,0, canvas.width, canvas.height)
   
//      ctx.drawImage(img, 0, 0,  180,144,  0,700, 180,144)
//     // initParticles();   //DrawTable();
// }

function drawIdentRect(x,y,w,h, xu,yu){
  ctx.fillStyle="#ff224b";
  ctx.fillRect(x,y,w,h);
}

function GetButtonNumClicked(xu,yu){
var i, bOff4=4;

gButtonNumClicked=-1;   // indicate not clicked within button # 0..n

 var tmpstr 	=" ";
 var tmpcol 	= "#8888EE";  //"#00ee00";//  gButColOn;
 var tmpcoloff  = "#555588"; //gButColOff;
 var txtcol     = '#efefef';


     for(i=0;i<numButtons;i++){
      
        if(  ( xu >=    bRects[ (i*bOff4) + 0 ] )                              &&
             ( xu <=    bRects[ (i*bOff4) + 0 ] + bRects[ (i*bOff4) + 2 ]   )  &&

             ( yu >=    bRects[ (i*bOff4) + 1 ] )                              &&
             ( yu <=    bRects[ (i*bOff4) + 1 ] + bRects[ (i*bOff4) + 3 ]   )) {

                      gButtonNumClicked=i;

                      console.log('gButtonNumClicked=' +i);
                      // console.log(gButtonNumClicked);

                      txtcol='#efefef';
                    
            /// FOR DEBUGGING            
                            drawIdentRect(bRects[ (i*bOff4) + 0 ],
                                          bRects[ (i*bOff4) + 1 ],
                                          bRects[ (i*bOff4) + 2 ],
                                          bRects[ (i*bOff4) + 3 ],
                                          xu,yu  );


// if button status == off , ie we are gonna turn on the right button's fn
                  if(bClickStatus[i]==0){
                    		//                 if(i1<16 && gDrawCrypto!=2) {



                    let skipButtonPress = 0;

// here 2ndcrypto rack of buttons
                    if( gDrawCrypto==2   &&   i > bTextsCutoff    &&   i <= bTextIntervalCutoff ) {

                    				i+=16;

                    	    		gButtonNumClicked=i;

                      				console.log('*** gDrawCrypto=' + gDrawCrypto);
                      				console.log('2nd-gButtonNumClicked=' +i);

                    		  }else if( gDrawCrypto==0  &&  i > bTextsCutoff    &&   i <= bTextIntervalCutoff){

                             // if we are in a crypto button AND gDrawCrypto == off
                                  skipButtonPress = 1;
                                gButtonNumClicked=-1;   // indicate not clicked within button # 0..n

                                }



        if(skipButtonPress != 1){

                         bClickStatus[i]=1;  // 1== clicked, not representative of button;s state
                         localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );

                         if( i==0 || gDrawSwitches==1)   sfx_serverSwitch1.play(); 
          }
                        




                          //      jbBut = new jButt onRound(        bRects[  (i*bOff4) + 0 ]  ,
                          //                           bRects[  (i*bOff4) + 1 ] ,
                          //                            gRound,
                          //                           bRects[  (i*bOff4) + 2 ] ,
                          //                           bRects[  (i*bOff4) + 3 ] ,
                          //                           'green',  tmpcol, txtcol,
                          //                           // 'green',  gButColOn,  'white',
                          //                           bTexts[ i ]+ tmpstr,           // "but#"+gButtonNumClicked.toString() 
                          //                         1.0, 1.0, butTextSize, ""
                          // );

                      }else if(bClickStatus[i]==2){
                          bClickStatus[i]=0;
                          localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );
                          if( i==0 || gDrawSwitches==1)  sfx_serverSwitch2.play();     


                      }else{ 
                          bClickStatus[i]=0;
                          localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );

                          if( i==0 || gDrawSwitches==1)  sfx_serverSwitch0.play();     
 
                      }

                          
                      return(i);

          }//if inside Rect


    }//for

    return(gButtonNumClicked);

}//fn

function localStorageGet(key) {
        let value = localStorage.getItem(key);
        // test validity here
        return(value);
}
//same as below depricate l0calStorageSwitch...
function localStorageSet( storStr, storValue){
          localStorage.setItem(storStr, storValue);
}
function localStorageSwitch( storStr, storValue){
          localStorage.setItem(storStr, storValue);
}

//
//
/*

init:
  for
    = new()
    .push
    .draw

draw: 
  for each
     .draw

// from craps

function UndoAllBets(){

    playerBets.forEach( (bet, i) => {
          if(!(bet.masterId==13 && PointIsOff!="OFF")){
        var chipval = bet.chipvalue;
          
          gPlayerChips += chipval; //playerBets[l].chipvalue;
          gHouseChips -= chipval; 

              playerBets.splice( i, 1);
          }
      })
          
}//fn

function UndoLastBet(){
  
   var l= playerBets.length-1;
  var chipval =playerBets[l].chipvalue;
    
   if(  playerBets[l].masterId == 13  && thepointIs!="OFF"){
    while(l>=0 &&  playerBets[l].masterId == 13 ){
        l--;
      }//while
    }
if(l>=0){
  gPlayerChips += chipval; //playerBets[l].chipvalue;
  gHouseChips -= chipval; 

  playerBets.splice(l,1);
  DrawTable();
  AddCountdownTime(0.450);
  return(l);
 }else AddCountdownTime(0.2);

}//fn

*/






// *************************************
/*

// used for switches
            var gLineOnClose=0;
      var gDrawP3Pivots=2;
            var gDrawGaps=1;
            var gDrawSupRes=1;
            var gDrawBuySell=1;

               var gDrawSpreads=0;
            var gDrawGuage=0;

                 var gDrawTraderText=1;
            var gDrawExtras=0;
            var gDra wMinorCrossover=0;
            var gDrawBacktest=0;
                 var gAllOnOff=0;
            var gDrawDojis=1;
            var gDrawMvgAvgs=1;
            var gDrawCrypto=0;
// used for switches


var bCli ckStatus = [
//switches
//         sw, col,cndl, bs,      sr,  p,  gp,  mvg,     doji, PnL,+, -,        gu, cry, extr,  run        
//          0, 0,  1,    1,      1,   1,  1,    1,        1 ,  0, 0,  0,       0,   0,   0,     0 ,
 
  ...

  ];


*/

// read  bClickStatus[0..15] to init vars - note should be an obj/arr

function init_SwitchesVars(){
  let i=0;
  let state01 = 0;
 

// IF localStorage (swtiches )==NULL 
//   ELSE grab local storage and put it in bClickedStatus[ i ]
let swNum=-1;
let swMAX =9;   // 0..8 switches0..8 can be loaded...
let a=0;

  for(i=0; i< localStorage.length ; i++){
        const key   = localStorage.key(i);  
        const value = localStorage.getItem(key);

        // isOutput.innerHTML += `${key}: ${value}<br />`;
        if( key.substring(0,6)=="switch"){
               swNum = Number( key.substring(6) ).toFixed(0);    // iw switch12
               if(swNum>=0 && swNum<swMAX) {
 
                       a=  parseInt(  value  );
 
                // init switches 
                      bClickStatus[ swNum ] = a;  
               }

               // console.log("] localStorage LOOP: swNum, key, value, bC1ickStatus[]=="); 
               // console.log(key);
               // console.log(swNum);
               // console.log(value);
               // console.log(bClickStatus);
               
            }// if 
        }




//
//
//    ORIG CODE
//

  for(i=0;i<16;i++){

      state01 = bClickStatus[ i ];   // ie 0, 1 or 2
      // * should clamp value to 0..2 here

//         sw, col,cndl, bs,      sr,  p,  gp,  mvg,     doji, PnL,+, -,        gu, cry, extr,  run        
//          0, 0,  1,    1,      1,   1,  1,    1,        1 ,  0, 0,  0,       0,   0,   0,     0 ,
 

    localStorageSwitch( "switch"+i.toString(), state01 ) ;


      switch(i){
        case 0:      // sw
          gDrawSwitches = state01;
        break;
       case 1:      // col
          gDrawColor = state01;
          switchColorSet(gDrawColor);
        break;
       case 2:      // line/cndl
          gLineOnClose  = state01;
          
        break;
       case 3:      // buy/sell
           gDrawBuySell = state01;
        break;

       case 4:      // sup/res
            gDrawSupRes = state01;
        break;
       case 5:      // pivots
            gDrawP3Pivots =state01 ;
        break;

       case 6:      // windowed  /gaps
            gDrawWindowed = state01;
        break;
       case 7:      // mvg avg
            gDrawMvgAvgs  = state01;
            gDrawDojis  = state01;
        break;
       case 8:      // dojis
             gDrawGaps = state01;
        break;
       case 9:      // runPnL  // runtime switch only
        break;
       case 10:      // EARNINGS    /  runtime switch only
        break;
       case 11:      // [rsvd]
        break;

       case 12:      // guage
            gDrawGuage = state01;
        break;
       case 13:      // crypto
           // gDrawCrypto= state01;
        break;
       case 14:      // extr
        break;
       case 15:      // run algo
        break;

      }//switches


  }//for

}//fn

function init_imgButtons(){
    imgButtonArray=[];

    init_SwitchesVars();
}
  
function populateButtons(){
    var i=0,bOff4=4;  

// push/populate array
    for(i=0;i<numButtons;i++){

       // var jbBut = new jButto nRound( bRects[  (i*bOff4) + 0 ] ,
             imgButtonArray.push(        new jButtonRound( (bRects[  (i*bOff4) + 0 ]   +   0 ) ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                      gRound,
                                      bRects[  (i*bOff4) + 2 ]  ,
                                      bRects[  (i*bOff4) + 3 ]*1.0 ,
//                                      bRects[  (i*bOff4) + 3 ]*0.7 ,
                                       'green',   "#ffee33" ,  'white',   
                                      // 'green',    RandomColorC() ,  'black',   
                                      bTexts[ i ]+bOffStr,
                                       1.0, 1.0, butTextSize, "0", i  )
            ); 
 
        }//for
}//fn

let intervalSwitch = 48;

let Crypto2ndXoffset=0;// = 80;



function drawButtonsForeach(){
// note: initDrawButtonsFirstTime() must be called first
 
 

 // ctx.fillStyle = "#232334";
 // ctx.fillRect(70,10, 400, canvasHeight*0.90 );

let yoff00=60;
let x1off=0;

    imgButtonArray.forEach( (but, i) => {
         // var butstate = but.statevalue;
         //imgButtonArray.splice( i, 1);
        
          if(i>bTextsCutoff){
               // var i1=  RandomNumC(numImgButtons);   // ie. 0..10 for 11 buttons
               var i1= i - (bTextsCutoff+1);

                    if(i1<16)  x1off=0;
                       else  x1off=Crypto2ndXoffset; //80;     // 2nd row move over right
                       //else  x1off=20;     // =80  2nd row move over right

                    if(i1<16 && gDrawCrypto!=2) {
                          // reads gDrawCrypto =2 state for xtra 16 crypto
                           but.draw2(i1, gCryptoOffsetX1+x1off , ((i%16)+1)*-80);
           
                       }else if(i1>=16 && gDrawCrypto==2) {  // 2ND SET
                          // reads gDrawCrypto==2 state for xtra 16 crypto
                           but.draw2(i1, gCryptoOffsetX1+x1off , ((i%16)+1)*-80);
          
                       }


               if(i >= intervalSwitch ){   // > 48   48-48=0, 49-48=1 etc
//  48..60,    61..73
                  
                         but.draw3(0, 0 , (i- intervalSwitch) ) ;
                       } 

//    Draw MAIN 16 Switches HERE
          }else{

                     if( gDrawSwitches==1 || bTexts[i]=="Switches" ){   
                            but.draw1(0,yoff00);
                           // if(gDrawGuage==0  ) but.draw1(0,yoff00);
 
                      }

                      if(gDrawGuage==1  ){
 
                                  if( bTexts[i]=="aiGuage"){
                                     but.draw1(0,yoff00);
                                   }

                                   ;   // don't draw switch in either state !
                       }



            }//else


        })

}


//
//  turn 
//
function drawButtonsForeach_OFF(bclicked2){
// note: initDrawButtonsFirstTime() must be called first

 // ctx.fillStyle = "#232334";
 // ctx.fillRect(70,10, 400, canvasHeight*0.90 );

let yoff00=60;
let x1off=0;


// TURN ALL BUTTONS OFF
// a) turn text to OFF Color
// b) turn flags in array[] =0
//
    imgButtonArray.forEach( (but, i) => { 
        
        // ie 16..47 []
          // if(i>bTextsCutoff    ){                  // check if clicked, don't turn off
          if(i>bTextsCutoff && (i < intervalSwitch )  ){
                var i1= i - (bTextsCutoff+1);

                    if(i1<16)  x1off=0;
                       else  x1off=Crypto2ndXoffset;     // =80 2nd row move over right
                       //else  x1off=80;     // =80  2nd row move over right
     

                 if( bclicked2==i ){
                           but.draw2(i1, gCryptoOffsetX1+x1off , ((i%16)+1)*-80);


                 }else{

                    if(i1<16  && gDrawCrypto!=2 ) {
                           but.draw2clr(i1, gCryptoOffsetX1+x1off , ((i%16)+1)*-80);
           
                       }else if(i1>=16 && gDrawCrypto==2) {
                          // reads gDrawCrypto==2 state for xtra 16 crypto
                           but.draw2clr(i1, gCryptoOffsetX1+x1off , ((i%16)+1)*-80);

                       }
                       
                 }// else  if( bcli cked2==i ){

 
    
          }//if
          
          // }else if( gDrawGuage==0   ){   
          //               but.draw1(0,yoff00);

          //           }else{

          //               if( bTexts[i]=="DEV_GUAGE"){
          //                  but.draw1(0,yoff00);
          //                }

          //         }



        })

}//fn




// DEPRICATE
//
// refactor to do a 1-sheet of crypto icons  DEPRICATE
//
function drawCrypto(){
    var i;
    var xspace=80;
    var sc=1;

    // draw logo
   //   ctx.drawImage( imgLogo, 0, 0, 256, 256, 722, 1800, (256*sc), (256*sc) );

    // draw crypto  
      for(i=0;i<numImgButtons;i++){
          var img0 = new Image();
          img0.src =  imgcryptopath + imgButtons[i] + ".png"  ;
          ctx.drawImage( img0, 0, 0, 200,200, 780+(xspace*i), 30, (64*sc), (64*sc) );
      }

     // imgButtonArray.push(img0);

}

// draw crypto buttons
//  i  ; imgButtons[i]
function drawCrypto1(i,x,y, w0, h0){

var xspace=80;
var sc= 1.5;

var imgW =256;
var imgH =256;
var iconWH = imgW / 8;    // 256x256 w/ 8 across and down  64 total possible

var imgU; // = imgButtonsUV[ (i*2) + 0 ]  *iconWH ;
var imgV; // = imgButtonsUV[ (i*2) + 1 ]  *iconWH ;

let genoff=6;


 imgU = imgButtonsUV[ (i*2) + 0 ]  *iconWH ;
 imgV = imgButtonsUV[ (i*2) + 1 ]  *iconWH ;

         // var img0 = new Image();
          // img0.src =  imgcryptopath + imgButtons[i] + ".png"  ;
          // ctx.drawImage( img0, 0, 0, 200,200, x,y, (64*sc), (64*sc) );

     // single icon
           ctx.drawImage( imgCryptos, imgU, imgV, iconWH,iconWH, x,y, (64*sc), (64*sc) );

// crhere
			
		ctx.strokeStyle ="#1122fe";
        // ctx.strokeRect( x-genoff,y-genoff, (128*sc)+genoff, (64*sc)+genoff );
        // ctx.strokeRect( x-genoff,y-genoff, (192*sc)+genoff, (64*sc)+genoff );
        ctx.strokeRect( x-genoff, y-genoff,   w0+genoff, h0+genoff );


if(gDrawGuage!=0){
 // whole sheet - REMOVE
          ctx.drawImage( imgCryptos, 0, 0, 256,256, 1500,500, 256*2.5, 256*2.5 );
  
}

           // market icons
           // bottom row - markets stuff
                      // drawMarketsStuff();

           //           ctx.drawImage( imgCryptos, 0, 7*32, 256,32, 1420,24, 256*2.5, 32*2.5 );

      //    ctx.drawImage( imgCryptos, 0, 7*iconWH, 256,iconWH, 1420,24, 256*2.5, iconWH*2.5 );
  
}


function initAndDrawButtonsFirstTime(){

   init_imgButtons();
   populateButtons();
   // this can be called each time to draw
   drawButtonsForeach();
  
           // bottom row - markets stuff
       //drawMarketsStuff();
          // ctx.drawImage( imgCryptos, 0, 7*32, 256,32, 1420,24, 256*2.5, 32*2.5 );
  

}//


function drawMarketsStuff(){
          ctx.drawImage( imgCryptos, 0, 7*32, 256,32, 1420,24, 256*2.5, 32*2.5 );

}
///////////////////////////////////////////////////////////////// new stufff



// OLD DEPRICATE!!!
function drawButtons(){
  return;  // depricated due to overcomplexit
var i=2,bOff4=4;  
    
var x0= 12, y0=24, w0=170, h0=50, sc=1;

var xspace=80;

//draw logo
//   ctx.drawImage( imgLogo, 0, 0, 256, 256, 722, 1800, (256*sc), (256*sc) );

 ;

// }





// run thru buttons, create them, push them onto stack itr_buttons[]
     for(i=0;i<numButtons;i++){
       // var jbBut = new jButtonR ound( bRects[  (i*bOff4) + 0 ] ,
          jbBut = new jButtonRound( bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                      gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',   "#555588" ,  'white',  // gButColOff
                                      bTexts[ i ]+bOffStr,
                                       1.0, 1.0, butTextSize, "0", i

            );
 
        jbBut.draw()
 
        }//for

    // // added
    // //UpdateBetButton( "Let's Play some Craps! "); // Table Refreshed.");
    // UpdateBetButton( gLastEventButtonStr  ); //"Let's Play some Craps! "); // Table Refreshed.");
    // DrawDenomButton();

}// fn

function initButtonsListeners(){
   // initButtons();
    drawButtons();
    // startSound();
 }
 

    // Run myfunc every second
var myfunc = setInterval( function() {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;
   


   	if(gCountdownStopper==1) countdown-=4;

    if (countdown>25) gameLoop(countdown);
        else {
            // console.log(countdown);
            countdown = countdownStart;
                }
   }, (1000 *gTimerBarMultiplier) );   // 0.25 1000= 1 sec


 
//
///////////////////////////////////////////  
//
var gCnt9=0;
var gRunAlgoSwitch=0;

var watchlist = [
                    'SPY','DIA','QQQ','VXX','GLD','APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD','NFLX','RCL','SNAP',
                    'PLTR','X',
                  
                     'SLV','USO','TBT','PTON','GBTC','BYND','F', 
                    'SHOP','ADT','NVDA','NIO','TSLA', 'BA', 'FB','M','BABA',
'UBER','LYFT','L','K','PINS','MCD','ETSY','GS','BAC','C','WFC','JPM','AXP',
'V','T','HAL','U','MGM','WYNN','LVS','XOM',

                ];


var gArryLen = watchlist.length;
var gAIcatIndicatorStrLONG="";
var  gAIcatIndicatorStrLONG1="";
var  gAIcatIndicatorStrLONG1_JSON="";

//  see candlessticks.js  getNextSymbol1()  staticWatchlist
function getNextSymbol(){
		var symstr2="";

		if(gCnt9>=gArryLen) return;
	
		symstr2=watchlist[gCnt9] ;
	
		//console.log(symstr2);

	    fetchNewSymbol( symstr2 ); 
	    gAIcatIndicatorStrLONG +=  "|"+symstr2+"|"+gAIcatIndicatorStr;  // cat all ai stock strings
		gCnt9++;

				//console.log(gAIcatIndicatorStrLONG);

		// if(gCnt9>=gArryLen){

		// 		gCnt9=0;

		// 	}

}


function gameLoop(cntdn){
	
  if( gSendAlgoEmail==1 ) {

    gSendAlgoEmail=0;
    fileWrite(gAIcatIndicatorStrLONG);  // send email
  }



	if(gRunAlgoSwitch==1){

		if(cntdn%30==0){
      // getNextSymbol();
      //  see candlessticks.js  getNextSymbol1()  staticWatchlist

      getNextSymbol1();   
		}
	}
 

}//fn 

 


function RandomNumC( num ){
   return(   Math.floor(Math.random()*num)   ) ; 
}
function RandomColorC(){
    var rstr = "#";
    var rrnd=0;
    rrnd = RandomNumC(256);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumC(256);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumC(256);
    rstr = rstr + rrnd.toString(16);
    return( rstr );
}


function RandomColorC1(rng00){
    var rstr = "#";
    var rrnd=0;

  if(rng00<0)   rng00 =0;
  if(rng00>255)  rng00=255;

    rrnd = RandomNumC(rng00);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumC(rng00);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumC(rng00);
    rstr = rstr + rrnd.toString(16);
    return( rstr );
}
function DrawTrendLineColored1(xf,yf,xt,yt, col, wt){
// return;
      ctx.beginPath();
      ctx.strokeStyle=col ; //"#ee8877";   
      ctx.lineWidth = wt ; //=2;

      ctx.moveTo( xf,yf  );
       ctx.lineTo( xt,yt ) ;
      ctx.stroke();

      
      
}
function DrawTrendLineColored(xf,yf,xt,yt, col){
// return;
      ctx.beginPath();
      ctx.strokeStyle=col ; //"#ee8877";   
      ctx.lineWidth = 2;

      ctx.moveTo( xf,yf  );
       ctx.lineTo( xt,yt ) ;
      ctx.stroke();

      
      
}
function DrawTrendLine(xf,yf,xt,yt){
// return;
      ctx.beginPath();
      ctx.strokeStyle="#ee8877";   
      ctx.lineWidth = 2;

      ctx.moveTo( xf,yf  );
       ctx.lineTo( xt,yt ) ;
      ctx.stroke();
 
      
}


function DrawCrosshair(x,y,col){

           DrawTrendLineColored( x-10  ,   y, x+10  ,   y,   col   );
           DrawTrendLineColored( x ,   y-10,  x  ,   y+10,   col   );

    ctx.fillStyle = "#ff55ee";
    ctx.globalAlpha = 1.0; 

    ctx.font = "24px Arial";
    ctx.fillText( x.toFixed(1)+","+ y.toFixed(1) , x+30,y+30 );
   
}

function adjustClientY(num ){
  return( num - yClickOff );

}

function adjustClientX( num ){
   return( num - xClickOff );
 
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          // x: (evt.clientX - rect.left) * (1/gInitScaleX),
          // y: (evt.clientY - rect.top) * (1/gInitScaleY)
          x: (evt.clientX - rect.left), //* (1/gInitScaleX),
          y: (evt.clientY - rect.top)  //* (1/gInitScaleY)
        };
        // usage:  var mousePos = getMousePos(canvasGlobal, event);
        //         var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      }

addEventListener('mouseup', (event) => {
     gMouseDown=0;
     gMouseUp=1;
     clickNdrag =0;

    if(gConsoleEvents==1) console.log( event);



// JMB2022-05-06
   var mousePos = getMousePos(canvasGlobal, event);
        // var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      let eventClientx = mousePos.x; //adjustClientX( event.pageX );
      let eventClienty = mousePos.y;  //adjustClientY( event.pageY );

        
    let rc = RandomColorC();
    // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    

    // if(gDrawEarningsAll!=1)
		  //   DrawCrosshairHorizontalShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );


  
})


addEventListener('mousedown', (event) => {
     // console.log('uiux_mousedown '+  '(' +event.clientX +','+  event.clientY +'): ');
     gMouseDown=1;
     gMouseUp=0;
    if(gConsoleEvents==1) console.log( event);
      
      // if we are in the stock grid
    var mousePos = getMousePos(canvasGlobal, event);
        // var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      let eventClientx = mousePos.x; //adjustClientX( event.pageX );
      let eventClienty = mousePos.y;  //adjustClientY( event.pageY );



    // let rc = RandomColorC();
    // // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );


           // DrawTrendLine( startX   ,   eventClienty,    canvasWidth ,   eventClienty );
           // draw small +

       // DrawCros shair(  eventClientx   ,   eventClienty, "#22ee33");

           // if( clickNdrag ==0 ){
           //   clickNdrag=1;
           //   trendline_startx = eventClientx;
           //   trendline_starty = eventClienty;

           //    }


         
})


let gNumHorizontalLinePresses=0;
let mx1=-1;
let my1=-1;

function     DrawCrosshairHorizontalShort(mx, my, colorch, viewportRect){

// if(gNumHorizontalLinePresses<2){ 

// 	if(mx1 < 0){

// 		mx1=mx;
// 		my1=my;


// 	}
// 	gNumHorizontalLinePresses++;
// 	return;

// }else 

let x1= viewportRect.x;
let y1= viewportRect.y;

let h1= viewportRect.h;
let w1= viewportRect.w;

if(mx <gStartChartX) mx = gStartChartX;


    ctx.beginPath();
      ctx.strokeStyle=colorch ; //"#ee8877";   
      ctx.lineWidth = 2;

      // ctx.moveTo( mx,0  );
      // ctx.lineTo( mx,h1  ) ;
      ctx.moveTo( mx,my-30  );
      ctx.lineTo( mx,my+30  ) ;
      // ctx.lineTo( mx,canvasGlobal.height ) ;

      // ctx.moveTo( 0, my  );
      ctx.moveTo( gStartChartX, my  );
      ctx.lineTo( w1 , my ) ;
      // ctx.lineTo( canvasGlobal.width , my ) ;
 
    ctx.stroke();

}
//
/////  for use with addEventListener('mou semove',(event) => { 
//

function     DrawCrosshairShort(mx, my, colorch, viewportRect){

let x1= viewportRect.x;
let y1= viewportRect.y;

let h1= viewportRect.h;
let w1= viewportRect.w;

if(mx <gStartChartX) mx = gStartChartX;


    ctx.beginPath();
      ctx.strokeStyle=colorch ; //"#ee8877";   
      ctx.lineWidth = 2;

      ctx.moveTo( mx,0  );
      ctx.lineTo( mx,h1  ) ;
      // ctx.lineTo( mx,canvasGlobal.height ) ;

      ctx.moveTo( 0, my  );
      ctx.lineTo( w1 , my ) ;
      // ctx.lineTo( canvasGlobal.width , my ) ;
 
    ctx.stroke();

}
// 
function     DrawCrosshairLong(mx, my, colorch, viewportRect){

let x1= viewportRect.x;
let y1= viewportRect.y;

let h1= viewportRect.h;
let w1= viewportRect.w;

if(mx <gStartChartX) mx = gStartChartX;


    ctx.beginPath();
      ctx.strokeStyle=colorch ; //"#ee8877";   
      ctx.lineWidth = 2;

      ctx.moveTo( mx,0  );
      ctx.lineTo( mx,h1  ) ;
      // ctx.lineTo( mx,canvasGlobal.height ) ;

      ctx.moveTo( 0, my  );
      ctx.lineTo( w1 , my ) ;
      // ctx.lineTo( canvasGlobal.width , my ) ;
 
    ctx.stroke();





    ctx.fillStyle = "#ff55ee";
    ctx.globalAlpha = 1.0; 

    ctx.font = "18px Arial";
    ctx.fillText(  ( mx.toFixed(1)+","+ my.toFixed(1) )  , mx+10,my+32 );
   
let pr0 =   GetPriceFromYCoordOO( my , viewportRect );
pr0=pr0.toFixed(2);

    // ctx.fillStyle = "#33efef";
    // ctx.font = "36px Arial";
    // ctx.fillText(  gCurrencyStr +pr0.toString() +"  ?-" , mx+30,my-22 );
   

// BELOW ASSUME CSV-style stock legacy array access so we test for crypto drawn:

  if(gCryptoDrawState==4) return;


let y2 = y1+h1;  // i.e.  y1=10, h1= 900 , y2 =910
let  yrng = y2-y1;   // ie 900
 
let  YPricePct = (yrng - my )  / yrng;    // ie  my=30,   ( 900-30 ) / 900  == 870/900

//             candlesPriceRange = candlesPriceBoundsMax - candlesPriceBoundsMin ;

let YPriceMin =  candlesPriceBoundsMin;
let YPriceRange =  candlesPriceRange;

  gLastCrosshairYPrice = YPriceMin +( YPriceRange * YPricePct );
  // let cstr = "y="+my.toString()+ ", $"+ gLastCrosshairYPrice.toFixed(2).toString() ;
  let cstr = " $"+ gLastCrosshairYPrice.toFixed(2).toString() ;


// let cstr = "y="+my.toFixed(0).toString() ;
let myoff=175;
let mxoff =50;
if(my> (y1+ (h1*0.66) ) ) {
  myoff=-175;
}
if(mx> x1+(w1*0.45) ){
    // mxoff=-280;
    mxoff=-440;

}


//       gPixelArrayStatic[ i ] = value0;

// let idx =    gPixelArray[mx].idx ;


let idx =-1;

let mx0 = mx.toFixed(0);
 idx    =   gPixelArrayStatic[ mx0 ];  
let idxstr =   idx.toString();

// if(mx>0 && mx < canvasGlobal.width){
//   idx    =  gPixelArrayStatic[ mx ];  
//   idxstr =  idx.toString();
// } else {
//   console.log( "BAD var mx ==" , mx);

// }

//
// var O=0, H=1, L=2, C=3, V=4, DATE=5, P=6, P3=7,   MTWTF=8, SYMB=9
var ohlcstr = " ";
var ohlcstr0 = " ";
var ohlcstr1a = " ";
var ohlcstr1 = " ";
var ohlcstr2 = " ";
var ohlcstr3 = " ";
var ohlcstr4 = " ";
var ohlcstr5 = " ";

if(idx>=0){
   /* && crypto=0  */
 // ohlcstr = gGET_SymbolStr + " "+ CandlesMaster[idx + DATE] ;
 ohlcstr =   " "; //+ CandlesMaster[idx + DATE] ;
 ohlcstr0 =  CandlesMaster[idx + DATE] ;

 // ohlcstr1 = "Close:"+ gCurrencyStr + Number(CandlesMaster[idx + C]).toFixed(2).toString() + " " +gGET_SymbolStr;
 ohlcstr1 = "Close:"+ gCurrencyStr + Number(CandlesMaster[idx + C]).toFixed(2).toString() ;
  ohlcstr1a =gGET_SymbolStr;

    // " o="+ Number(CandlesMaster[idx + O]).toFixed(2).toString() +
    //  ", h="+ Number(CandlesMaster[idx + H]).toFixed(2).toString() +
    //  ", l="+ Number(CandlesMaster[idx + L]).toFixed(2).toString() +
    //  ", c="+ Number(CandlesMaster[idx + C]).toFixed(2).toString() +
    //  ", v:"+ CandlesMaster[idx + V];

 ohlcstr2 =  "Open: "+ gCurrencyStr + Number(CandlesMaster[idx + O]).toFixed(2).toString() ; //+
 ohlcstr3 =  "High: "+  gCurrencyStr +Number(CandlesMaster[idx + H]).toFixed(2).toString(); // +
 ohlcstr4 =  "Low:  "+  gCurrencyStr +Number(CandlesMaster[idx + L]).toFixed(2).toString() ; //+
     
 ohlcstr5 =  "Volume: "+ CandlesMaster[idx + V]; 


let yboxw =470;
let yboxh =600;
let x30 = 30;

     ctx.fillStyle = 'rgba(20,20,80,0.54)' ;  

     if(myoff>0) ctx.fillRect( mx+mxoff- x30, my+(0.5*myoff),          yboxw, yboxh);
       else ctx.fillRect( mx+mxoff+ x30,      my+(0.5*myoff) -yboxh,    yboxw, yboxh);

}else ohlcstr = " "; // gGET_SymbolStr; // + " *** mx0=="+ mx0.toString()+"*** mx=="+ mx.toString();


// let cstr0 = cstr +", idx="+idxstr + " "+ohlcstr;
let cstr0 = cstr +  " "+ohlcstr;
// let cstr0 = cstr +" "+  gGET_SymbolStr + " ****** "   ;


     // ctx.fillStyle = 'rgba(20,20,80,0.66)' ; //"#333333";
     // if(myoff>0) ctx.fillRect( mx+mxoff, my+myoff,    500, 500);
     //   else ctx.fillRect( mx+mxoff, my+myoff -500,    500, 500);

let exy=4;
     ctx.fillStyle = "#FBEE52";  
     ctx.fillRect( mx-exy, my-exy,    exy*2, exy*2);

// Left price
     ctx.fillStyle = "#FFCA37"; //"#33A1E6"; // "#555555";  
     ctx.font ="54px Arial";
      ctx.fillText( cstr0, mx+150 , my+ (0*myoff) );
     
// right displayed price
     ctx.fillStyle = "#FFCA37"; //"#33A1E6"; // "#FBEE52";  
     //ctx.font ="76px Arial";
     ctx.fillText( cstr0, mx-700 , my+ (0*myoff) );




     ctx.fillStyle = "#88aaee";
     ctx.font ="72px Arial";
     ctx.fillText( ohlcstr0, mx+mxoff, my+ (1.0*myoff) );


     let op0= Number(CandlesMaster[idx + O]).toFixed(2);
     let cl0= Number(CandlesMaster[idx + C]).toFixed(2);

     if(cl0>op0) ctx.fillStyle = "#44ee44";  
       else ctx.fillStyle = "#ee4444";


     ctx.font ="48px Arial";
     ctx.fillText( ohlcstr1a, mx+mxoff, my+(1.25*myoff ));
     ctx.fillText( ohlcstr1, mx+mxoff, my+(1.65*myoff ));



     ctx.fillStyle = "#88aaee";
     ctx.fillText( ohlcstr2, mx+mxoff, my+(2.0*myoff ));
   
     ctx.fillText( ohlcstr3, mx+mxoff, my+(2.5*myoff ));

     ctx.fillText( ohlcstr4, mx+mxoff, my+(3.0*myoff ));
   
     ctx.fillText( ohlcstr5, mx+mxoff, my+(3.5*myoff ));
   
}//fn


//
////////////////////////////////////////////////////// addEventListener
//
var  gLastMousemoveX =-90000;
var  gLastMousemoveY =-91000;
var  gRedrawnChartWhenX_LT_gStartChartX=0;
var  gLastCrosshairYPrice =0;

var   gDailyCandlesMax        = 365*2;
var   gDailyCandlesStart      =100; // 4*7 * 3;  

var   gDailyCandlesToDisplayInc  =120 ;
var   gDailyCandlesToDisplay  = gDailyCandlesStart  ;   //= 4*7 * 3;


addEventListener('mousemove',(event) => { 


 if( gComputeAndRenderCandlesStatus < 2) return;

var mousePos = getMousePos(canvasGlobal, event);

    mouse.x = mousePos.x ; //event.clientX 
    mouse.y = mousePos.y ; //event.clientY

let stillmouse = 0;

    if( mousePos.x != gLastMousemoveX ){
        gLastMousemoveX = mousePos.x ;
        stillmouse++;
    }
    
    if( mousePos.y != gLastMousemoveY ){
        gLastMousemoveY = mousePos.y ;
        stillmouse++;
    }

  getLocalDateTime();


/*
  if( stillmouse!=0  &&  gLastMousemoveX > gStartChartX ){

    red rawCurrentChart();

    let rc = RandomColorC();
    DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    
    gRedrawnChartWhenX_LT_gStartChartX=0;

  }else   if( stillmouse!=0  &&  gLastMousemoveX < gStartChartX && gRedrawnChartWhenX_LT_gStartChartX!=1 ){
    red rawCurrentChart();
    gRedrawnChartWhenX_LT_gStartChartX=1;

  }

*/



  // if (  clickNdrag==1  && gMouseDown==1){
  //   red rawCurrentChart();
  //   // let ccol = RandomColorP();
  //   DrawTrendLineColored( trendline_startx, trendline_starty , mouse.x, mouse.y, RandomColorC() );

  //    // DrawTrendLineColored( trendline_starty, trendline_starty , mouse.x, mouse.y, "#2244ff");

  // }


})

// addEventListe ner('resize',() => { 
//     canvas.width        = innerWidth
//     canvas.height       = innerHeight
//     // initParticles(); DrawTable(); 
// })

/*
canvas.addEvent Listener("click", function (event) {
    var b = canvas.getBoundingClientRect();
    var scale = canvas.width / parseFloat(b.width);
    var x = (event.clientX - b.left) * scale;
    var y = (event.clientY - b.top) * scale;
    // Marks mouse position
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
});


// another example
 <script type="text/javascript"> 
        function getMousePosition(canvas, event) { 
            let rect = canvas.getBoundingClientRect(); 
            let x = event.clientX - rect.left; 
            let y = event.clientY - rect.top; 
            console.log("Coordinate x: " + x,  
                        "Coordinate y: " + y); 
        } 
      
        let canvasElem = document.querySelector("canvas"); 
          
        canvasElem.addEven tListener("mousedown", function(e) 
        { 
            getMousePosition(canvasElem, e); 
        }); 
    </script> 

*/

//
//  sets gDrawColor = 0..3
//
function switchColor(){

               if(gBGcol=="#000000"){
                    gDrawColor=1;

                    gBGcol="#2222AA";
                   gCandleRedCol= "#DD0000";
                   gCandleGreenCol ="#00CC00";

               }else if(gBGcol=="#2222AA"){         // blue bg
                    gDrawColor=2;

                        gBGcol=  "#555555";
                        
                     gCandleRedCol= "#aa2222";
                   gCandleGreenCol ="#22aa22"; 

               }else if(gBGcol=="#555555"){       // white bg
                   gDrawColor=3;

                   gBGcol="#EFEFEF";
                   gCandleRedCol= "#FF0000";
                   gCandleGreenCol ="#00FF00";

               }else if(gBGcol=="#555555"){       // grey bg
                    gDrawColor=0;
                    gBGcol="#000000";
                   gCandleRedCol= "#BB0000"; 
                   gCandleGreenCol ="#00BB00";

               }else{
                   gDrawColor=0;
                   gBGcol="#000000";
                   gCandleRedCol= "#DD0000";
                   gCandleGreenCol ="#00CC00";
               }
console.log("gDrawColor==");
console.log(gDrawColor);

}//fn



function switchColorSet(col){

          switch(col){

            case 0:
                  gBGcol="#000000";
                  gCandleRedCol= "#DD0000";
                  gCandleGreenCol ="#00CC00";
            break;
            case 1:            
                   gBGcol="#2222AA";
                   gCandleRedCol= "#DD0000";
                   gCandleGreenCol ="#00CC00";
            break;
            case 2:
                    gBGcol=  "#555555"; 
                    gCandleRedCol= "#aa2222";
                    gCandleGreenCol ="#22aa22"; 
            break;
            case 3:
                   gBGcol="#EFEFEF";
                   gCandleRedCol= "#FF0000";
                   gCandleGreenCol ="#00FF00";

            break;
            default:
                  gDrawColor=0;
                  gBGcol="#000000";
                  gCandleRedCol= "#DD0000";
                  gCandleGreenCol ="#00CC00";
            break;

          }//sw


               // if(gBGcol=="#000000"){
               //      gDrawColor=1;

               //     gBGcol="#2222AA";
               //     gCandleRedCol= "#DD0000";
               //     gCandleGreenCol ="#00CC00";

               // }else if(gBGcol=="#2222AA"){         // blue bg
               //      gDrawColor=2;

               //      gBGcol=  "#555555"; 
               //      gCandleRedCol= "#aa2222";
               //      gCandleGreenCol ="#22aa22"; 

               // }else if(gBGcol=="#555555"){       // white bg
               //     gDrawColor=3;

               //     gBGcol="#EFEFEF";
               //     gCandleRedCol= "#FF0000";
               //     gCandleGreenCol ="#00FF00";

               // }else if(gBGcol=="#555555"){       // grey bg
               //      gDrawColor=0;
               //      gBGcol="#000000";
               //     gCandleRedCol= "#BB0000"; 
               //     gCandleGreenCol ="#00BB00";

               // }else{
               //   gDrawColor=0;
               //   gBGcol="#000000";
               //    gCandleRedCol= "#DD0000";
               //     gCandleGreenCol ="#00CC00";
               // }

console.log("gDrawColor==");
console.log(gDrawColor);

}///fn


function   turnOffAllOtherCryptoButtons(bclicked1){
          //turn off all other cryptos except the one just pressed
           let e1=0;
           for(e1=16;e1<48;e1++){
            if(e1 != bclicked1 ){   
               bClickStatus[e1]=0;
            }
           }//for
           bClickStatus[ bclicked1 ]=1;

          drawButtonsForeach_OFF(bclicked1);

}

var g_n=0;
addEventListener('click', (event) => {
  var mousePos = getMousePos(canvasGlobal, event);
  let intstr="nil";

	 // console.log('uiux_c lick: '+ event)
	var xx = mousePos.x ; // event.pageX ; //event.clientX 
	var yy = mousePos.y ; //event.pageY ;   // event.clientY 

  // xx = adjustClientY( xx );
  // yy = adjustClientY( yy );
  //      console.log('uiux_cli ck == '+  '(' +event.clientX +','+  event.clientY +'): ');

    if(gConsoleEvents==1)  console.log('uiux_clik Adjusted  xx,yy =='+  '(' +xx +','+  yy +'): ');
    if(gConsoleEvents==1)  console.log( event);


    // global
 	 g_n++; 

    var bclicked = GetButtonNumClicked(xx,yy );

    console.log( '] bclicked:'+bclicked );

//gButtonNumCli cked
//var jrnd= RandomNum( 3 );
    if(bclicked==-1 ){  
            ;
           // skip

    // let rc = RandomColorC();
    // // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );

    }else{
       
      if( (gDrawSwitches==1) || bclicked==0  || bclicked > 15    ){      // 15 = Run AlgoInvestor


       console.log("] BEFORE switch(bcl'd)"); //gDrawCrypto, case: bCl icked==");
       console.log("gDrawCrypto, case: bclicked==");
              console.log(gDrawCrypto, bclicked);

        switch(bclicked){
          case 0:

             if(gDrawSwitches==1)  gDrawSwitches=0;
              else if(gDrawSwitches==0) gDrawSwitches=1;
               redrawCurrentChart();

              console.log( "after r3drawCurrentChrt()",gDrawSwitches );

          break; 

          case 1:
          // BG color
                switchColor();  // sets  gDrawColor 
                redrawCurrentChart();

            break;

          case 2:  
           // line/candle
            if(gLineOnClose==1)  gLineOnClose=0;
                else if(gLineOnClose==0) gLineOnClose=1; 
                redrawCurrentChart(); 

                  gPrintObjs();

          break; 


          case 3: 
            // buy sell
             // if( gDrawBuySell==1) gDrawBuySell=0; 
             //    else gDrawBuySell=1;

            if( gDrawBuySell==1) gDrawBuySell=2; 
                else if( gDrawBuySell==2) gDrawBuySell=0; 
                   else if( gDrawBuySell==0)  gDrawBuySell=1;

                 bClickStatus[bclicked]=gDrawBuySell;
                 localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])
                redrawCurrentChart();

             break;

             
        case 4: 
            // supp / resist + mv avgs
             if( gDrawSupRes==1) gDrawSupRes=0; 
                else gDrawSupRes=1;
                  redrawCurrentChart();

            break;

        case 5:  
            //pivots
            if( gDrawP3Pivots==1) gDrawP3Pivots=2; 
                else if( gDrawP3Pivots==2) gDrawP3Pivots=0; 
                   else if( gDrawP3Pivots==0)  gDrawP3Pivots=1;

                 bClickStatus[bclicked]=gDrawP3Pivots;

                 localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])
              redrawCurrentChart();
           
            break; 

              // InitLastDataObjLoaded();
        case 6:
            // windowed 
              console.log("windowed  case 6:");
            // console.log("] gAssetType==");
            // console.log(gAssetType);
            
            // Che ckAndGetNewData("fed", gGET_SymbolStr , gAssetType.toLowerCase() );

// DEL ME TESTING FETCH
             // let lastval = CheckLastDataObjLoaded( "15min", gGET_SymbolStr , "stocks") ;
             // console.log("] lastval = Ch3ckLastDataObjLoaded( a, b ) ");
             // console.log(lastval);

// DEL ME TESTING FETCH
              // Get AlphaAdvantageStockDataNewTESTfetch("quote", fetchedObj , "nil")
              // console.log("] fetchedObj (after)==");
              // console.log( fetchedObj); 

 // DEL ME TESTING FETCH
             // GetLongTermDataAfter("weekly");   
              // GetLongTermDataAfter("monthly");  
              
// DEL ME TESTING FETCH
              // // Cyc leFintechDataTEST1();


             if( gDrawWindowed==1) gDrawWindowed=2;
                else if( gDrawWindowed==2) gDrawWindowed=0;
                  else if( gDrawWindowed==0) gDrawWindowed=1;
                bClickStatus[bclicked]=gDrawWindowed;
                localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])

               redrawCurrentChart();

            break;




          case 7:  
          
             if(gDrawMvgAvgs ==1) gDrawMvgAvgs=0;
                else gDrawMvgAvgs=1; 
           
             if(gDrawDojis ==1) gDrawDojis=0;
                else gDrawDojis=1;     
             redrawCurrentChart();

          break;

          case 8:  /// gaps dojis

             if( gDrawGaps==1) gDrawGaps=0; 
                else gDrawGaps=1;
               // redrawCurrentChart();

            redrawCurrentChart();

         break;






          case 9:  
           // Backtest   ie run Pnl
              if(gDrawBacktest==1)  gDrawBacktest=0;
                  else if(gDrawBacktest==0) gDrawBacktest=1;
                redrawCurrentChart();

          break; 



//draw Earnings
        case 10:
               if(gDrawCrypto==0 && gDrawEarningsAll==0){

                //old way
                GetEarningsDataGeneric( "earningsall" );
                //new way
                  // intstr=  "earningsall";  
                  // CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );

              console.log( "] case 10: gObjsLoadedObj[ 9 ].objPost, length ==" );
              console.log(  gObjsLoadedObj[ gEarningsAllIdx ].objPost );
              console.log(  gObjsLoadedObj[ gEarningsAllIdx ].objPost.length );

                  if(gObjsLoadedObj[ gEarningsAllIdx ].objPost.length>0){ 
                       ProcessEarningsAllToWatchlist();
                      }

                  gDrawEarningsAll=2;  // ==2  == getting data for all upcoming corp earnings & wait for final sort
	
	           	    gDrawWatchlist=0; 
                  bClickStatus[11]=gDrawWatchlist;      //note harddCoded...
                  // localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])
                  localStorageSwitch( "switch11" , bClickStatus[11])


              }else if(gDrawEarningsAll==1){
                  gDrawEarningsAll=0;
                  redrawCurrentChart();

              console.log( "] case 10: gObjsLoadedObj[ 9 / gEarningsAllIdx ].objPost ==" );
              console.log(  gObjsLoadedObj[ gEarningsAllIdx ].objPost );
              if(gObjsLoadedObj[ gEarningsAllIdx ].objPost.length>0){ 
                       ProcessEarningsAllToWatchlist();
                      }


              }

            break;

//draw Watchlist
         case 11:
            
            if(gDrawCrypto==0 && gDrawWatchlist==0){
            	gDrawWatchlist=1; 
            	
                gDrawEarningsAll=0;
                bClickStatus[10]=gDrawEarningsAll;     //note harddCoded...

            	console.log("gDrawWatchlist==");
              console.log(gDrawWatchlist);

              console.log("gObjsLoadedObj[ 9].objPost ==");
              console.log(gObjsLoadedObj[ 9].objPost );
                  redrawCurrentChart();

            }else if(gDrawWatchlist==1){
            	gDrawWatchlist=0; 
            	 console.log("gDrawWatchlist==");
            	console.log(gDrawWatchlist);


              console.log("gObjsLoadedObj[ 9].objPost ==");
              console.log(gObjsLoadedObj[ 9].objPost );
                  redrawCurrentChart();
            }

            break;


        case 12: 
                // if(gSFX==1)  gSFX=0;
                // else if(gSFX==0) gSFX=1;
         
                if(gDrawGuage==1) {
                   gDrawGuage=0; 
                   // gDrawSwitches=1; 
                }else if(gDrawGuage==0){
                   gDrawGuage=1;
                   // gDrawSwitches=0; 

                  }
              redrawCurrentChart();
          break;
 

        case 13:  
// crypto sw
            if(gDrawCrypto==1){  
                 gDrawCrypto=2;
                 gAssetType="crypto";
              }else if(gDrawCrypto==0){

                 gDrawCrypto=1;
                 gAssetType="crypto";

              }else{
                 gDrawCrypto=0;
                 gAssetType="stocks";

              }

              console.log("gDrawCrypto==");
              console.log(gDrawCrypto);


              bClickStatus[bclicked]=gDrawCrypto;
              localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])

              redrawCurrentChart();

          break;




        case 14:
        // EXTRAS
             
             //  mirror end candles
           if(gPredict==1)  gPredict=0;
              else if(gPredict==0) gPredict=1;


            // SPREADS++
              if(gDrawSpreads==1) gDrawSpreads=0;
                else gDrawSpreads=1;
                // redrawCurrentChart();
          
           // EXTRAS
              if(gDrawExtras==1) gDrawExtras=0;
                else gDrawExtras=1;
                // prob. should be same flag
              if(gDrawMinorCrossover==1) gDrawMinorCrossover=0;
                else gDrawMinorCrossover=1;
                
               redrawCurrentChart();

             // if (gTimerBarMultiplier == gTimerBarMultiplierStart)  gTimerBarMultiplier = 0.025;
             //  else gTimerBarMultiplier = 0.125;
            break;



          case 15:  
           // F
              gRunAlgoSwitch=1;
              // *sfx.
          break;



// crypto set 1 
          case 16: 
          case 17: 
          case 18: 
          case 19: 
          case 20: 
          case 21: 
          case 22: 
          case 23: 
          case 24: 
          case 25: 
          case 26: 
          case 27: 
          case 28: 
          case 29: 
          case 30: 
          case 31: 

// crypto set 2          
          case 32:
          case 33: 
          case 34: 
          case 35: 
          case 36: 
          case 37: 
          case 38: 
          case 39: 
          case 40: 
          case 41: 
          case 42: 
          case 43: 
          case 44: 
          case 45: 
          case 46: 
          case 47: 
          console.log("gDrawCrypto, case: bClicked==");
          console.log(gDrawCrypto, bclicked);

            if(gDrawCrypto==1 || gDrawCrypto==2 ){
                  // crypto
                  // gGET_SymbolCryptoStr    =  imgButtons[bclicked-  16];                 // bTextsCutoff  "ETH"  or "LTC"   ??gCryptoOffset
                  gGET_SymbolCryptoStr    =  imgButtons[ bclicked-  (bTextsCutoff+1) ];   // bTextsCutoff  "ETH"  or "LTC"   ??gCryptoOffsetX
                  gGET_SymbolCryptoNameStr=  bTexts[     bclicked -  0 ];                    //"ETH_Ethereum"  or "LTC"   ??gCryptoOffsetX
                  // gGET_SymbolCryptoNameStr=  gGET_SymbolCryptoNameStr.substring( gGET_SymbolCryptoNameStr.indexOf("_")+1 );
          
                  // turn off all other cryptos except the one just pressed
                  turnOffAllOtherCryptoButtons(bclicked);
                  
                  if( gInterval!="earnings"   &&   gInterval!="earningsall" ) gIntervalCrypto = gInterval;
                    else gIntervalCrypto="day";

                  GetDataIntraday( "crypto" );

                  if(gFetchCandlesStatus=="success"){

                    ; // redrawCurrentChartOO( candlestickObjects )

                  }
                }
          break; 



//
//      buttons for  1min 5min 15min 30min  60min Daily Weekly
//
// note: should be used for stock or crypto or...
//
          case 48: 
             intstr=  "1min"; //"consumer"; //"1min"; // "3month"  
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             redrawChartNew( intstr );
              break;

          case 49: 
              intstr= "5min";   //  "5year";  //
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             redrawChartNew( intstr );
           break;

          case 50:  
          intstr= "15min"; // "10year"; //  "15min"
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             redrawChartNew( intstr );
 
					  break;

          case 51: 
          intstr=   "30min";  //"30year"; //  "30min"
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             redrawChartNew( intstr ); 
             break;

          case 52: 
             intstr=   "60min";    // "fed"
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             redrawChartNew( intstr ); 
             break;

          case 53: 
              intstr= "daily";  
              CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
              redrawChartNew( intstr );
          break;



          case 54:     
              CheckAndGetNewData("weekly", gGET_SymbolStr , gAssetType.toLowerCase() );
 // NEED REFACTORING
     GetLongTermDataAfter("weekly");   
              // GetLongTermDataAfter("monthly");  
             if( gDrawWindowed==1) gDrawWindowed=0;
               else if( gDrawWindowed==0) gDrawWindowed=1;
               redrawCurrentChart();


       	    break;

          case 55:
             CheckAndGetNewData("monthly", gGET_SymbolStr , gAssetType.toLowerCase() );
 // NEED REFACTORING
    GetLongTermDataAfter("monthly");  
             if( gDrawWindowed==2) gDrawWindowed=0;
               else if( gDrawWindowed==0) gDrawWindowed=2;
              redrawCurrentChart();
       
            break;


        case 56:
             if(gDrawCrypto==0){
                CheckAndGetNewData("quote", gGET_SymbolStr , gAssetType.toLowerCase() );
                // Get EarningsDataGeneric("quote");
            }
          break;









         case 57:                      // increase candles // for now crypto
             if(gDrawCrypto!=0){        //   crypto 
                 ChangeNumCandles("+");
                // MAY NEED TO DEL this assettype assumption
                gAssetType="crypto";
                redrawChartCrypto( "day");
           }else if(gDrawCrypto==0){          // stocks
               if(gCandlesLenSubtractor > 1) {
                  gCandlesLenSubtractor--;
                  redrawCurrentChart();
                    }
             }

          break;

          case 58:                      // DEcrease candles 
           if(gDrawCrypto!=0){        //   crypto 

            ChangeNumCandles("-");
            gAssetType="crypto";
            redrawChartCrypto( "day");

          }else if(gDrawCrypto==0){   // stocks
               // Subtractor
              if(gCandlesLenSubtractor < (candlesLen-1) ){
                gCandlesLenSubtractor++;
                redrawCurrentChart();
              }  
           }
          break;

         case 59:
               OpenNewBrowserTab( "https://itraderpro.co/btc");
         break;

         case 60:
               OpenNewBrowserTab( "https://itraderpro.co/eth");
         break;        
 	



//
//
//
          case 61: 
             intstr=  "3month";  
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
           break;

          case 62: 
              intstr= "2year";    
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
            break;

          case 63:  
              intstr= "5year"; // "10year"; //  "15min"
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() ); 
            break;

          case 64: 
              intstr=  "7year";   
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
             break;



          case 65: 
             intstr=   "10year";    // "fed"
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
              break;

          case 66: 
              intstr= "30year";  
              CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
           break;

          case 67:    
              intstr= "fed";  
              CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
              // redrawCurrentChart();
            break;

          case 68:
              intstr= "gdp";    
              CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );
              // redrawCurrentChart();
            break;





          case 69:
             intstr= "cpi";    
             CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );

            break;

          case 70:    
              intstr= "inflation";    
              CheckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );

            break;


          case 71:                      // <<<
               if(gEarningsAllPageCount>0 ) gEarningsAllPageCount--;
               console.log(gEarningsAllPageCount);
            break;

          case 72:                      // >>> 
               if(gEarningsAllPageCount< gEarningsAllPageCountMax) gEarningsAllPageCount++;
               console.log(gEarningsAllPageCount);
           break;



         case 73:                     // [ calc] 
 
                OpenNewBrowserTab( "https://itraderpro.co/calc");
         break;   
     




            }//switch

          }else{
                redrawCurrentChart();

          // if gDrawSw e
          }//else

          redrawCurrentChart();


      }//else

     
})


//
//  redraw chart appropriately if stocks or crypto...
//
function redrawChartNew( tInterval ){
// NOW CRYPTO ONLY
    if(gDrawCrypto!=0) redrawChartCrypto( tInterval );
      // else if(gDrawCrypto==0) GetDataSetGeneric("stocks", tInterval );
            
}


function OpenNewBrowserTab(jburl){
	window.open( jburl , "_blank");
}


function ChangeNumCandles(addsub0){
  if(addsub0=="-"){

// quick += 30 candles for example
            if(gDailyCandlesToDisplay >  (gDailyCandlesToDisplayInc *2)  ){

                gDailyCandlesToDisplay-= gDailyCandlesToDisplayInc ;  // ie 10

            }          

  }else if(addsub0=="+"){
          gDailyCandlesToDisplay+= gDailyCandlesToDisplayInc ;  // ie 10
            if(gDailyCandlesToDisplay > gDailyCandlesMax ) gDailyCandlesToDisplay = gDailyCandlesStart;
          
  }
}

function showResolution(x1,y1, pxsize)
{
        ctx.fillStyle="#33fe8a";
        // ctx.font ="bolder "+ pxsize.toString() +"px Arial";
        ctx.font =  pxsize.toString() +"px Arial";
        // ctx.fillText( screen.width + "x" + screen.height+": Weekly Coming Soon !", x1,y1 );
        ctx.fillText( screen.width + "x" + screen.height, x1,y1 );
}

function redrawChartCrypto( tInterval ){
        // set global
          gInterval= tInterval;

       if(gAssetType=="crypto"   || gDrawCrypto!=0 ) gIntervalCrypto = tInterval;
 

        if( tInterval!="day" && tInterval!="weekly" && tInterval!="monthly" ){
             GetDataIntraday(gAssetType);
         
        }else if( tInterval=="day"){
             GetDataDaily(gAssetType);

        }

}



function setAllOnOff(onOff0){
  
  gLineOnClose  = onOff0;
//  gDrawGuage  = onOff0;
  gDrawGaps  = onOff0;
  gDrawP3Pivots = onOff0;
  gDrawSupRes = onOff0;
  gLineOnClose = onOff0;
 
     
}//fn

function RandomNumber( x ){
  return(Math.floor(Math.random() * x));
}

// const myPromise - new Promise((resolve,reject) => {
//   const rand =  RandomNumber(2);
//     grab_data(url);
//
//   if(rand=== 0){
//     resolve();
//   }else{
//     reject();
//   }

// });
//
 // myPromise.then(() => console.log("suc")).catch(() => console.log("fail"));

// fetch w/ promises
 // fetch("https://pokeapi.co/api/v2/pokemon/ditto')
          // .then((res) =>  res.json())
          // .then((data) => console.log(data))
          // .catch((err) => console.log(err));
//
// const loadFile = async () =>{
//   const data = await fs.promises.readFile('./text.txt', {encoding: 'utf-8', });
//   console.log(data);

// };
// loadFile();
//
//

function GetUserID() {
  //
  // ASYNC CALL 
  return("ABCDEF0123456789");

}

var gWatchlistEntry =0;
let gWatchlistStr ="";

var gEntryStr= "";

let gEntryLenMax=2048;   // =22;


function  InitWatchlistStr(entryStr){             
                  if(gWatchlistEntry==0) gWatchlistStr=entryStr;
                  gWatchlistEntry =1;
}
function ClearWatchlistStr(){
//   gWatchlistStr="";
// gWatchlistEntry=0;
}
function  ProcessWatchlistStrToDynamicWatchlist( ){             
                  if(gWatchlistEntry==0)  return ; //gWatchlistStr=entryStr;
                  if(gWatchlistStr.length<1)  return ; // 
 
 let i, q, q1=0;
let wstr = gWatchlistStr;
let wstr0, wstr1;

//  i.e wstr = "F M WYNN HAL GS C BAC K V AAPL F SNAP TSLA"
//  i.e wstr1=   "M WYNN HAL GS C BAC K V AAPL F SNAP TSLA"
//  i.e wstr1=     "WYNN HAL GS C BAC K V AAPL F SNAP TSLA"

    q = wstr.indexOf(" ");
    i=0;

// careful, trap infinite loop potentially...
    while( q!=-1 ){
      wstr0 = wstr.substring(i, q);
      dynamicWatchlist_PUSH( wstr0.toUpperCase(), " " );  

      wstr = wstr.substring(q+1);
      q = wstr.indexOf(" ");
      console.log("]  ********  q, wstr==");
      console.log(q, wstr);

    }//whil
    formStaticWatchlist();
  
    ClearWatchlistStr();

}//fn



addEventListener( "keydown", (doKeyDown ) => {
   
 console.log(doKeyDown);

// DONT BUILD gEn tryStr if not a..z (65..90), or space32 or Enter or Backspace
  if(doKeyDown.key == "Enter"){
          DrawEntryStr(gEntryStr, 0);

          console.log('] ATTEMPT FETCH STOCK:' + gEntryStr );
 
           var symstr0=gEntryStr;
           gEntryStr="";

// let result = text.includes("world");
// let result1 = text.indexOf("welcome"); // -1 iff not exist

           // if symstr0.substring( ' ') == 1
           // remove spaces 
           //   if len> 1 then f3tchNewSymbol()

    let syn =symstr0.indexOf(" ");
    if( syn !=-1 ) {  // there  is a space
        let symstr00 = symstr0;
        // symstr0 = symstr00.substring(0, symstr00.indexof(" ") );
        symstr0 = symstr00.substring(0, syn ); //mstr00.indexof(" ") );
        console.log("] symstr0, gWatchlistStr== ");
        console.log(symstr0);
        console.log(gWatchlistStr);

        ProcessWatchlistStrToDynamicWatchlist();


    }


    if(symstr0.length > 0){

            console.log(symstr0);

            fetchNewSymbol(symstr0);    // should decypher cr-btc-eur
           
            gAIcatIndicatorStrLONG1 +=  "|"+symstr0+"|"+gAIcatIndicatorStr+ "," ;  // cat all ai stock strings

            gAIcatIndicatorStrLONG1_JSON += '{'+ '"sym": "'+ gGET_SymbolStr +'", '+ ' "aiCatInd": '+ '"'+gAIcatIndicatorStr+'"  },';   

            localStorageSwitch( "aiCat", `${gAIcatIndicatorStrLONG1_JSON}` ) ;

            console.log("] *AFTER  FETCH  STOCK: gAIcatIndicatorStrLONG1_JSON=="   );
            console.log(gAIcatIndicatorStrLONG1_JSON);

      }





/*


aiCat: "{\"sym\": \"F\",  \"aiCatInd\": \"Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=24%|+[Bullish Pennant][7]=22.5%|+Hi-Close Doji[9]=90%|-[Bearish Wedge][12]=10%|-Low-Close Doji[14]=40%|\"  },{\"sym\": \"BA\",  \"aiCatInd\": \"Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=14%|+[Bullish Pennant][7]=24.75%|+Buy Signal[8]=29%|+Hi-Close Doji[9]=70%|\"  },{\"sym\": \"NFLX\",  \"aiCatInd\": \"Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=38%|\"  },"


gAIcatIndicatorStrLONG1_JSON += '{'+ '"sym": '+ gGET_SymbolStr +','+
      '"aiCatInd": '+ '"'+ +'"'+gAIcatIndicatorStr+'" },';
        {
            "sym":      "2021-01-01",
            "aiCatInd": "4.69785886363739"
        },
        {
            "date": "2020-01-01",
            "value": "1.23358439630637"
        },
        {
            "date": "2019-01-01",
            "value": "1.81221007526015"
        },



// actual
{"sym": "X",  "aiCatInd": "Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=20%|+[Bullish Pennant][7]=5%|+Hi-Close Doji[9]=20%|-[Bearish Wedge][12]=17.5%|-Low-Close Doji[14]=70%|"  },{"sym": "BA",  "aiCatInd": "Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=6%|+[Bullish Pennant][7]=1.75%|+Buy Signal[8]=7%|-[Bearish Wedge][12]=5.25%|-Sell Signal[13]=21%|"  },{"sym": "NFLX",  "aiCatInd": "Stock Trending[0]=99%|Almanac Long S&P[1]=40%|52-Week[2]=37%|+[Bullish Pennant][7]=1.75%|+Buy Signal[8]=7%|"  },{"sym": "M",  "aiCatInd": "Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=11%|+[Bullish Pennant][7]=5%|+Hi-Close Doji[9]=20%|-[Bearish Wedge][12]=15%|-Low-Close Doji[14]=60%|"  },{"sym": "K",  "aiCatInd": "Stock Trending[0]=1%|Almanac Long S&P[1]=40%|52-Week[2]=6%|"  },

*/

    }else if(doKeyDown.key == "Backspace"){
        let ui;  
        let glen0 = gEntryStr.length;
        var gstr = gEntryStr;

         if(glen0>0){   
           gEntryStr= "";
            for(ui=0;ui< glen0-1 ;ui++){
              gEntryStr+=gstr[ui];
            }
          }
             

          if(gWatchlistEntry==1){

               let glen0 = gWatchlistStr.length;
                var gstr = gWatchlistStr;

                 if(glen0>0){   
                   gWatchlistStr= "";
                    for(ui=0;ui< glen0-1 ;ui++){
                      gWatchlistStr+=gstr[ui];
                    }
                  }
                  console.log(gWatchlistStr);

          }




   //   }else if( doKeyDown.key=="Space"){
      }else if( doKeyDown.key=="`"){
      
          fileWrite( gAIcatIndicatorStrLONG1 ); // "xyz.txt");
           
      }else if( doKeyDown.key=="/"){
      
          gRunAlgoSwitch=1;
 
      }else if( doKeyDown.key=="?"){
      
           gRunAlgoSwitch=0;
 
      }else if( doKeyDown.key=="-"){  // OO only
           ChangeNumCandles("-");

      }else if( doKeyDown.key=="="  || doKeyDown.key=="+" ){
           ChangeNumCandles("+");

      }else if( doKeyDown.key=="3"){
            // Get DataIntraday("crypto");        // should be  GetData("intraday","crypto");
            //Ge tDataDaily("crypto");

      }else if( doKeyDown.key=="5"){
         //   G etDataIntraday("fx");
         redrawCurrentChart()

      }else if( doKeyDown.key=="6"){
          // Ge tDataDaily("fx");

            // GetAlphaAdvantageDataFX();         // should be  GetData("fx","crypto");
      }else if( doKeyDown.key=="0"){
           console.log("] gInterval, gAssetType, candlestickObjects[]==");
           console.log(gInterval, gAssetType);
           Dump_candlestickObjects();

      }else if( doKeyDown.key=="2"){
         gNumCandlestoRenderOO +=gNumCandlestoRenderInc  ;
         if(gNumCandlestoRenderOO > 1000) gNumCandlestoRenderOO = 1000;

         console.log("gNumCandlestoRenderOO ; key ==2");
         console.log(gNumCandlestoRenderOO);
         // RenderOOCandles( gInterval );  
         RenderOOCandles(   );  

 

      }else if( doKeyDown.key=="1"){
         gNumCandlestoRenderOO -=gNumCandlestoRenderInc ;
         if(gNumCandlestoRenderOO < gNumCandlestoRenderInc) gNumCandlestoRenderOO = 50;

         console.log("gNumCandlestoRenderOO ; key ==1");
         console.log(gNumCandlestoRenderOO);
        // RenderOOCandles( gInterval );  
         RenderOOCandles(   );  

  
      }else if(gEntryStr.length < gEntryLenMax && 
               doKeyDown.which >=65 && doKeyDown.which <=90 || 
               doKeyDown.key=="." ||  doKeyDown.key==" " ||  doKeyDown.key=="," ){
              
              if(  doKeyDown.key==" " ||  doKeyDown.key=="," ){
                  InitWatchlistStr(gEntryStr);                
                  // if(gWatchlistEntry==0) gWatchlistStr=gEntryStr;
                  // gWatchlistEntry =1;
                 }

               gEntryStr+=doKeyDown.key;
              
              if(gWatchlistEntry==1){
                  gWatchlistStr+=doKeyDown.key;
                  }
                  
      }
      gEntryStr = gEntryStr.toUpperCase();
      gWatchlistStr = gWatchlistStr.toUpperCase();
      console.log( "] gWatchlistStr ==");
      console.log(  gWatchlistStr );

  	  DrawEntryStr(gEntryStr, 0);

})// addlistener

function colorconvertAlpha(color, transparency) {
        var r = parseInt(color.substring(0,2),16);
        var g = parseInt(color.substring(2,4),16);
        var b = parseInt(color.substring(4,6),16);
        var a = parseInt(transparency);
        // return ('rgba(r, g, b, a)');
  return ('rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
}


var gTextEntryRect = { x:2050, y:(190-80) , w:800, h:100 };


function   DrawEntryStr(estr, grad01){
     console.log(']  Drawg gEntryStr== ==>'+estr+'<==');
     console.log(']       gWatchlistStr, gWatchlistEntry==  ==>'+gWatchlistStr+'<==');
     console.log( gWatchlistEntry) ;

     if(estr=="" || estr==" ") return;

      ctx.fillStyle= gBGcol ;//||  'rgba( 0.0, 0.0, 0.0, 0.70 )' ;
     // ctx.fillStyle= colorconvertAlpha(gBG col , 0.40 ) ;
     ctx.fillRect( gTextEntryRect.x, gTextEntryRect.y, gTextEntryRect.w, gTextEntryRect.h );
      ctx.fillStyle = "#22aaee";

      // if(grad01==1){
      //    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
      // gradient.addColorStop("0", "blue");
      // gradient.addColorStop("0.5", "magenta");
      // gradient.addColorStop("1.0", "cyan");
      // // Fill with gradient
      // ctx.fillStyle = gradient;
      // }

         // ctx.font ="bolder 120px Times New Roman";
         // ctx.font ="bolder 100px Veranda"; // Times New Roman
         ctx.font ="bolder 120px Times New Roman";
         // ctx.fillText( estr, 2050,175 );
         ctx.fillText( estr, 2050,190 );
   
}//fn



var gTextOffCol="#8888bb";

////////////////////////////////////////////
//
class jButtonRound {
    constructor(x,y,radius, w,h, colorOn , colorOff,colorText, jText , jAlpha, rndCorner, pxStr, keystr, idx){
        this.x =x
        this.y =y 
        this.radius =radius
        this.w =w
        this.h =h 
        this.colorOn =colorOn 
        this.colorOff=colorOff
        this.colorText=colorText
        this.jText   =jText

        this.jAlpha   =jAlpha
        this.rndCorner   =rndCorner
        this.pxStr = pxStr
        this.keystr = keystr


        this.switchStateStr = keystr
        this.idx = idx

    }

 
//  
// for crypto
draw2(i1,xoff,yoff){ 

if(gDrawCrypto==0) return;

      var sc=0.68;
      let swoffsetx=  64  ;
      let swoffsety=  64;
 
// original 
// if(bClickStatus[this.idx]==0){
//     // if( this.switchStateStr=="1" ) {
//              drawCrypto1(i1,this.x +gSwitchOffsetX1 +xoff,  this.y,  this.w, this.h );
//             // button off
//              ctx.fillStyle=gTextOffCol;  
//     }else if(bClickStatus[this.idx]==2){
//              drawCrypto1(i1,this.x +gSwitchOffsetX1 +xoff,  this.y , this.w, this.h );
//             // button ==2 state
//              ctx.fillStyle=  "#e3fc03";
//     } else{   // if( bClickStatus[this.idx]==1 )
//           drawCrypto1(i1,this.x +gSwitchOffsetX1 +xoff,  this.y,  this.w, this.h );
//          //  button  On
//          //   ctx.fillStyle="#44ef44";
//           ctx.fillStyle="#33ef33";
//     }




//
// draw crypto icon   and strokeRect
//
if(bClickStatus[this.idx]==0){
    // if( this.switchStateStr=="1" ) {
             drawCrypto1(i1,this.x  ,  this.y,  this.w, this.h );
            // button off
             ctx.fillStyle=gTextOffCol;  
    }else if(bClickStatus[this.idx]==2){
             drawCrypto1(i1,this.x  ,  this.y , this.w, this.h );
            // button ==2 state
             ctx.fillStyle=  "#e3fc03";
    } else{   // if( bClickStatus[this.idx]==1 )
          drawCrypto1(i1,this.x  ,  this.y,     this.w, this.h );
         //  button  On
         //   ctx.fillStyle="#44ef44";
          ctx.fillStyle="#33ef33";
    }



//
// draw text
//
let text1 = this.jText;    // BTC_Bitcoin
let text2 =text1.substring(0, (text1.indexOf("_") ) );    //  BTC
let text3 =text1.substring(   (text1.indexOf("_") )+1);      // Bitcoin

        ctx.font = this.pxStr +"px Arial";   
        if(this.pxStr=="")  ctx.font ="24px Arial";

// original 
        // ctx.font ="50px Arial";
        // ctx.fillText( text2, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-46, this.y+swoffsety-10   );
        // ctx.font ="32px Arial";
        // ctx.fillText( text3, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-46, this.y+swoffsety-10 +45    );
   
        ctx.font ="50px Arial";
        ctx.fillText( text2, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-26, this.y+swoffsety-10   );
        ctx.font ="32px Arial";
        ctx.fillText( text3, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-16, this.y+swoffsety-10 +45    );
   

 }// draw2()



// for crypto clr
  draw2clr(i1,xoff,yoff){ 
if(gDrawCrypto==0) return;

// console.log("got to dra w2clr !!!! *********");
      var sc=0.68;
      let swoffsetx=  64;
      let swoffsety=  64;
 
          ctx.fillStyle=gTextOffCol ;             


// draw text
let text1 = this.jText;    // BTC_Bitcoin
let text2 =text1.substring(0, (text1.indexOf("_") ) );    //  BTC
let text3 =text1.substring(   (text1.indexOf("_") )+1);      // Bitcoin

        ctx.font = this.pxStr +"px Arial";   //"24px
        if(this.pxStr=="")  ctx.font ="24px Arial";

        ctx.font ="50px Arial";
         // ctx.fillText( this.jText+"", this.x+ swoffsetx  +gSwitchOffsetX1+xoff-30, this.y+swoffsety   );
        ctx.fillText( text2, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-26, this.y+swoffsety-10   );
        
        ctx.font ="32px Arial";
        ctx.fillText( text3, this.x+ swoffsetx  +gSwitchOffsetX1+xoff-16, this.y+swoffsety-10 +45    );

    }// draw 2clr







  draw1(xoff,yoff){ 

      var sc=0.68;
      let swoffsetx=  176;
      let swoffsety=  64;

           // corner radius

        // cr     = this.radius;
        // rect[0]= this.x;
        // rect[1]= this.y;
        // rect[2]= this.w;
        // rect[3]= this.h;
    
 // draw image of switch off state


// figure out state

    // var rnd01 =  Math.floor( Math.random() * 2 );   // 0..18

    // if(rnd01==0)  ctx.drawImage( imgSw0a, 0, 0, 128,78, this.x, this.y, 256*sc ,156*sc  );
    //  else    ctx.drawImage( imgSw1, 0, 0,  128,78, this.x , this.y, 256*sc ,156*sc  );
      // else                  ctx.drawImage( imgSw2a, 0, 0, 255,155, this.x , this.y, 256*sc ,156*sc );
      // else  if(rnd01==1) ctx.drawImage( imgSw1, 0, 0, 255,155, this.x , this.y, 256*sc ,156*sc  );
      // else                  ctx.drawImage( imgSw2a, 0, 0, 255,155, this.x , this.y, 256*sc ,156*sc );

if(bClickStatus[this.idx]==0){
             ctx.drawImage( imgSwitches, 0,0 , 128,78, this.x +gSwitchOffsetX1 +xoff, this.y, 256*sc ,156*sc  );
             ctx.fillStyle="#8888bb";  

    }else if(bClickStatus[this.idx]==2){
             ctx.drawImage( imgSwitches,  0, 160, 128,78, this.x +gSwitchOffsetX1+xoff, this.y, 256*sc ,156*sc  );
             ctx.fillStyle=  "#e3fc03";

    } else{  // assume ==1 
         ctx.drawImage( imgSwitches,  0, 80,  128,78, this.x  +gSwitchOffsetX1+xoff, this.y, 256*sc ,156*sc  );
         ctx.fillStyle="#88ef88";

    }

// draw text

        ctx.font = this.pxStr +"px Arial";   //"24px
        if(this.pxStr=="")  ctx.font ="24px Arial";

        ctx.font ="46px Arial";
        // ctx.fillText( (this.x).toString() , this.x, this.y );
        ctx.fillText( this.jText+"", this.x+ swoffsetx  +gSwitchOffsetX1+xoff, this.y+swoffsety   );
   



    }


// for 1min, 5min .. weekly
  draw3(xoff,yoff, tmpi){ 

      var sc=0.68;
      let swoffsetx=  16 ; //20;
      let swoffsety=  64 ; //64;
 
// draw rect inside box for 1min 5min... weekly

         // ctx.fillStyle= RandomColorC();      //RandomColorC1(208);
         let intervalSwitchOff =13 ;

         if(tmpi>=intervalSwitchOff){  // chk for fed > buttons
             ctx.fillStyle="#2288ee"; 
             if(tmpi%2==0) ctx.fillStyle= "#2266aa";  
          }else  {
             // ctx.fillStyle="#eeddee"; 
             // if(tmpi%2==0) ctx.fillStyle= "#ccbbcc"; 
             ctx.fillStyle="#22ee88"; 
             if(tmpi%2==0) ctx.fillStyle= "#22aa66";  
          }

         ctx.fillRect(this.x, this.y+10, this.w, this.h);


//   from draw1()

if(bClickStatus[this.idx]==0){
              // ctx.fillStyle="#eeeeff";  
             ctx.fillStyle="#232323";  

    }else if(bClickStatus[this.idx]==2){
              ctx.fillStyle=  "#effc03";

    } else{   // assume ==1  
          ctx.fillStyle="#ffffff";

    }
// draw text
		let txt =this.jText;
          // ctx.fillStyle="#ffffff";
        ctx.font ="38px Arial";
        // if(txt == bTexts[54] && gDrawCrypto==0 )  txt = "Weekly";
        // 	else if(txt == bTexts[55]  && gDrawCrypto==0 )  txt = "Monthly";

        // ctx.fillText( this.jText+"", this.x+swoffsetx , this.y+swoffsety   );
        ctx.fillText( txt, this.x+swoffsetx , this.y+swoffsety -10  );
   
          
    }


//ole3
    draw(){ 
// ctx.save();

    var rect = [20, 20, 300, 300],
    cr = 25;            // corner radius

    cr     = this.radius;
    rect[0]= this.x;
    rect[1]= this.y;
    rect[2]= this.w;
    rect[3]= this.h;

// if(this.rndCorner){}
//
//

    var pi = Math.PI,       // cache it here to make code more readable
    x1 = rect[0],       // cache points
    y1 = rect[1],
    x2 = rect[2] + x1,
    y2 = rect[3] + y1;

// create a rounded rectangle path
    ctx.beginPath();

    ctx.arc(x1 + cr, y1 + cr, cr, pi, 1.5 * pi);  // upper left corner
    ctx.arc(x2 - cr, y1 + cr, cr, 1.5 * pi, 0);   // upper right corner
    ctx.arc(x2 - cr, y2 - cr, cr, 0, 0.5 * pi);   // lower right corner
    ctx.arc(x1 + cr, y2 - cr, cr, 0.5 * pi, pi);  // lower left corner

    ctx.closePath();
    ctx.globalAlpha =this.jAlpha; // 0.50; 

    ctx.fillStyle=this.colorOff;
    ctx.fill()

    ctx.stroke();
    ctx.globalAlpha = 1.0; 


        ctx.beginPath()
        ctx.arc(this.x-5, this.y-5, this.radius/2, 0, Math.PI*2, false) 
         ctx.closePath();

        ctx.fillStyle=this.colorOff;  //On ; //Off
        ctx.fill()


        ctx.fillStyle=this.colorText ; //'yellow'
        ctx.font = this.pxStr +"px Arial";   //"24px
        if(this.pxStr=="")  ctx.font ="24px Arial";
        // ctx.fillText( (this.x).toString() , this.x, this.y );
        ctx.fillText( this.jText+"**", this.x+this.radius*0.8, this.y+(0.65* this.h ) );
   

      if(this.keystr!=""){
         ctx.fillStyle=this.colorText ; 
         ctx.font ="18px Arial";
         ctx.fillText( this.keystr, this.x+this.radius*0.6, this.y+ 0  +(0.695* this.h ) );
   
      }


      // ctx.restore();
    }//fn

}

//do we need a class?
//ie particles
//for(let i=0;i<pMax0;i++){
//           particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
//             {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
//             } )     )
//     }//FOR
// }//fn
//
// class Particle{
//     constructor(x,y, radius, color, a, velocity){
//         this.x =x
//         this.y =y
//     } }


class PixelArray{
    constructor( x, idx   ){
        this.x = x
        this.idx = idx

        // this.velocity = velocity 
    }
}

let gPixelArray;
let gPixelArrCalled=0;

function initPixelArray(){
      gComputeAndRenderCandlesStatus = 0;

     gPixelArrCalled++;
     gPixelArray = [];
  console.log("gPixelArray, initPixlArray() x Called=",gPixelArrCalled );
}//fn



//
// usage:
// pushPixelArraySet(0,gStartX, -1);
function pushPixelArraySet(i0,i1,value0){

let i;
 // for(i=i;i<canvasGlobal.width;i++){

 for( i=i0; i<i1; i++ ){
 // dynamic push
     gPixelArray.push(  new PixelArray( Number(i).toFixed(0), value0  )  );

// static (stocks)
      gPixelArrayStatic[ i ] = value0;
 }
      //console.log("in pushPixelArraySet(), arr=", gPixelArray);

}//fn


// STATIC ARR =
//  gPixelArrayStatic[] 8*1024 IN LEN
//
function insertNewPixelArray( xpixel, w0 , idx0 ){
  // if(gPixelArray.length >(canvasGlobal.width-1)  ||  xpixel>(canvasGlobal.width-1) )   return;
  if(   xpixel>(canvasGlobal.width-1) )   return;

  // if(xpixel>(canvasGlobal.width-1) || (xpixel+w0)> (canvasGlobal.width-1) ){
  //   return;
  // }

  pushPixelArraySet(xpixel.toFixed(0), (xpixel+w0).toFixed(0) , idx0 );


   // let i;
   // for(i=xpixel; i<(xpixel+w0) ;i++){
   //      gPixelArray[ i ]= {idx: idx0, x: i} ;
   //      // gPixelArray[ i ].x   =  i;     /// the index i ==x
   // }


      // console.log("] AFTER pushPixelArraySet(), STATIC gPixelArrayStatic[] =", gPixelArrayStatic );

}




//
//  remember to modify crypto draw state
//
function    fetchNewSymbol( symstr1 ){ 
     gGET_SymbolStr= symstr1;  

// gCryptoDrawState=0;
     initRenderVars(); 
     drawButtons();
     

     // i.e if(gAssetType=="crypto"){}

     // GetAlphaAdvantageDa ta();
     GetAlphaAdvantageData("stocks","day");


}

//
function redrawCurrentChart(){ // } symstr1 ){ 
   //same //  gGET_SymbolStr= symstr1;  
//     requestAnimationFrame(animateParticles)
     //requestAnimationFrame(redrawCu rrentChart);


      initRenderVars1(gBGcol);  

      // RenderAllData_Current();
//
//
//   we may need to set the crypto draw state for get Daily Data
//
      if(gCryptoDrawState == 4 ){
         

         // crypto
         RenderOOCandles(   );  

      }else{ 

          // stocks
         RenderAllData_Current();
       
      }

}//fn

//
//
///////////////////////// Sound
//
function startSound() { 

   //   sfx_2  = new sound("mp3/numbers/sfx_2.mp3"); 

   //  sfx_button1 = new sound("mp3/button1.mp3");
   //  sfx_button2 = new sound("mp3/button2.mp3"); 

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
		if(gSFX==1)    this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


let particles
const velocityXmult = 35
const velocityYmult =32
var gravitySt = 0.005
var gravity = gravitySt
const friction = 0.99 
const alphaChange = 0.010  //0.005 
const mouse={
  x: innerWidth/2,
  y: innerHeight/2
}






//const half = Math.floor(length / 2);
let gPixelArrayStatic = [

// i=0
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=256
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=512
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=768
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=1024
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=1280
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=1536
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=1792
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=2048
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=2304
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=2560
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=2816
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=3072
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=3328
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=3584
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=3840
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=4096
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=4352
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=4608
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=4864
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=5120
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=5376
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=5632
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=5888
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=6144
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=6400
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=6656
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=6912
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=7168
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=7424
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=7680
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
// i=7936
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
];

// let particles
// function SpawnFireworks(typestr, max, grEpsilon){
//   //  gravity *= grEpsilon;
//     var pMax0= max;
//     gravity = gravitySt;
//     const particleAngle =pMax0
//     const angleIncrement= ( Math.PI * 2 )/ particleAngle  
//     for(let i=0;i<pMax0;i++){
//           particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
//             {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
//             } )     )
//     }//FOR
// }//fn
//
// class Particle{
//     constructor(x,y, radius, color, a, velocity){
//         this.x =x
//         this.y =y
//         this.radius=radius
//         this.color= color 
//         this.alpha= a 
//         this.velocity = velocity 
//     }
//     draw(){
//         ctx.save()
//             ctx.globalAlpha  = this.alpha
//             ctx.beginPath()
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
//             ctx.fillStyle=this.color   
//             ctx.fill()
//             ctx.closePath()
//         ctx.restore()
//      }
//      update(){
//         this.draw()
//         this.velocity.x *= friction
//         this.velocity.y += gravity
//         this.alpha      -= alphaChange
//         this.x += this.velocity.x * velocityXmult  
//         this.y += this.velocity.y * velocityYmult  
//      }
// }
// function initParticles(){
//     particles=[]
// }
// let sillycnt =0
// function animateParticles(){
//   if(sillycnt++ <400 ){
//     requestAnimationFrame(animateParticles)
//     ctx.fillStyle = 'rgba(0,0,0,0.05)' 
//     ctx.fillRect(0,0, canvas.width, canvas.height)
//     sillycnt++; 
//     if(sillycnt%10==0) DrawTable();
//     particles.forEach( (particle, i) => {
//         if(particle.alpha >0){                particle.update() }else{
//                  particles.splice(i, 1)    
//             }
//     })
//   }else{
//     ctx.fillStyle = 'rgba(1,1,1,0.05)' 
//     ctx.fillRect(0,0, canvas.width, canvas.height)

//         }
// }//fn
// function RandomNumP( num ){
//    return(   Math.floor(Math.random()*num)   ) ; 
// }
// function RandomColorP(){
//     var rstr = "#";
//     var rrnd=0;
//     rrnd = RandomNumP(256);
//     rstr = rstr + rrnd.toString(16);
//     rrnd = RandomNumP(256);
//     rstr = rstr + rrnd.toString(16);
//     rrnd = RandomNumP(256);
//     rstr = rstr + rrnd.toString(16);
//     return( rstr );
// }
// // ********************************************* 
// //initParticles()
// // animateParticles()


/*


//     ctx.fillStyle = 'rgba(1,1,1,0.05)' 
//     ctx.fillRect(0,0, canvas.width, canvas.height)




// Create gradient
var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "red");
// Fill with gradient
ctx.fillStyle = gradient;
ctx.fillText("Big smile!", 10, 90);

30px Arial
30px Verdana
30px Times New Roman
30px Courier New
30px serif
30px sans-serif


normal 30px Arial
italic 30px Arial
oblique 30px Arial


normal 30px Arial
bold 30px Arial
bolder 30px Arial
lighter 30px Arial
100 30px Arial
200 30px Arial
300 30px Arial
400 30px Arial
500 30px Arial
600 30px Arial
700 30px Arial
800 30px Arial
900 30px Arial

Canvas:
Code:
var c=document.getElementById('myCanvas');
var ctx=c.getContext('2d');
ctx.font='bolder 30px Arial';
ctx.fillText('Hello World', 10,30);


 //////////////////////////////////////////////////// CRAPS BUTTONS foreach

function DrawActiveBets(){

        playerBets.forEach( (bet, i) => {

           var playerchip = new Chip(bet.chipx, bet.chipy, gChipRadius, bet.chipcolor ,1, gChipAlpha, gPlayerChipColor );
           playerchip.draw();


        })//forEach

}
function UndoLastBet(){
  
   var l= playerBets.length-1;
  var chipval =playerBets[l].chipvalue;
    
   if(  playerBets[l].masterId == 13  && thepointIs!="OFF"){
    while(l>=0 &&  playerBets[l].masterId == 13 ){
        l--;
      }//while
    }
if(l>=0){
  gPlayerChips += chipval; //playerBets[l].chipvalue;
  gHouseChips -= chipval; 

  playerBets.splice(l,1);
  DrawTable();
  AddCountdownTime(0.450);
  return(l);
 }else AddCountdownTime(0.2);

}//fn

*/






//
// 