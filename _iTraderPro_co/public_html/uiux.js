/////////////////////////////////////////
//
//    uiux.js  
//
//
var canvasGlobal = document.getElementById("myCanvas");
   // var ctxG = canvasGlobal.getContext("2d");
     var ctxU = canvasGlobal.getContext("2d");
   //          var canvasWidthG  = ctxG.width;
   //          var canvasHeightG = ctxG.height;


                                      var gVersionNum = "v12.331ui";  

 
var screenWidth   =screen.width;
var screenHeight  =screen.height;

var screenWidth0  =ctxU.width;
var screenHeight0 =ctxU.height;

var gCornerPtX=200;
var gCornerPtY=200;

var gTimerBarMultiplier=0.25;

var gConsoleEvents = 0; //1;

var gMouseWheelStatus = 0;

let gCheckUserEmailFlag=0;
var gCheckUserFreq = 1000 *    9 ;   // 9 sec

var gMBTstr=" ";
var gLastCloseStr=" ";


            var gAlphaFullMaxMAX =  Math.round( 252   * 25 ) ;  //25yrs MAX

            var gAnnualTradingDays        =    252 ;
            var gAlphaNumYearsForDailyCSV =    1.25 ;    // # yrs <<=== here 
            var gAlphaFullMax             =    Math.round(  gAnnualTradingDays   * gAlphaNumYearsForDailyCSV  ) ;
            var gAlphaFullMaxCurrent      =    gAlphaFullMax ; 


var gNumDaysPredict=95;
var gCandleWidthMaxTarget= 8;

var gActualCandleXNext =0;

var  gTradingDaysToFOMC =0;
var  gTradingDaysToNextEarnings=0;

var gDrawFib=0; 

var gTrillion    = 1000000 * 1000 *1000 ;
var gTrillionNeg = 1000000 * 1000 *1000 * -1;

var gCrawlSpeed = 0.025; //  1000*gCrwlSpeed ie every 0.125 seconds
var gCrawlFontSize = 48-6; // =38-6;

var gCrawlStr = "  "; // ="...  Welcome to Algo Investor  ...  ";
var gCrawlX   = 0;
var gCrawlInc = 4;
var gCrawlVersionStr ="";
var gCrawlEventStr ="";

var  gLastLineChartDateStr="1910-10-10";
let  gUserStruct =  { validLvl: 0, validStr: "init", ullave: "nil", uemail: "abc@nil.com", uname: "Guest",  uid: 0 , respstr: "nil", datestr: "nil" ,  a: 0, b: 0, c:0  };

var gAssetType = "stocks";   // changes throughout  usage

var gMinMaxIndicatorObj = { min: 100000000, max: -10000000, range:0, idx:0 };

//types
var gAssetTypeBonds          ="bonds";
var gAssetTypeFedData       ="feddata";
var gAssetTypeStocks        ="stocks";
var gAssetTypeForex          ="forex";
var gAssetTypeCommodities   ="commodities";
var gAssetTypeCrypto        ="crypto";

var gNextTradingDayStr="", gNextTradingDayStr1="";

var gEarningsCorpStr    = "";
var gEarningsCorpDateStr = "";
var gEarningsCorpEstStr  = "";
var gFOMCDateStr       ="";


let gStartX900= 900;
// let gGlobalViewportRect = { x: -100 , y: -100 , w: 13 , h: 13 };
let gGlobalViewportRect           = { x: gStartX900 , y: 100 , w: canvasGlobal.width-mf(2*gStartX900) , h: 1300 };
let gGlobalViewportRectRecomputed = { x: gStartX900 , y: 100 , w: canvasGlobal.width-mf(2*gStartX900) , h: 1300 };


// from cndlstix.
var gGlobalViewport0= { x: 2 , y: 2 , w: (canvasGlobal.width*0.065) , h: (canvasGlobal.height * 0.025) *2 };   // timer corner

var gGlobalViewport1= { x: 0 , y: 0 , w: canvasGlobal.width*0.1075 , h: canvasGlobal.height*1.000 };  // switches  <== derived from canvas
var gGlobalViewport2= { x: 10, y: 0 , w: canvasGlobal.width*0.1185 , h: canvasGlobal.height*0.780 };  // overviewdata  <== derived from canvas

var gGlobalViewport3= { x: 0 , y: 0 , w: 160 , h: 90 };   // volume ; mini viewport       <== drived from gGlo balViewportRect
var gGlobalViewport4= { x: 0 , y: 0 , w: 160 , h: 90 };   // 1 under gG lobalViewportRect  <== drived from gGl obalViewportRect
var gGlobalViewport5= { x: 0 , y: 0 , w: 160 , h: 90 };   // 2 under  g GlobalViewportRect  <== drived from g GlobalViewportRect


var gGlobalViewport6= { x: 0 , y: 0 , w: 160 , h: 90 };   //  right of candlestickch

// 7 =upper  buttons,  8 =lower roundedbuttons, set w/  mr( ) in realtime
var gGlobalViewport7= { x: 0 , y: 0 , w: 160 , h: 90 };   //{ x: gRButtonsTopX , y: gRB uttonsTopY , w: gRButtonsTopW , h: gRButtonsTopH };    
var gGlobalViewport8= { x: 0 , y: 0 , w: 160 , h: 90 };   //{ x: gRButtonsBotX , y: gRB uttonsBotY , w: gRButtonsBotW , h: gRButtonsBotH };    



let     gDate_datefullstr;
let     gDate_datefullstr0;
let   gDate_udatestr; 
let   gDate_datestrYrMo; 

let     gDate_timefullstr;
let     gDate_year    ;

let   gDate_month   ;
let   gDate_monthStr   ;

let   gDate_date   ;
let   gDate_day    ;
let   gDate_dayStr    ;

let   gDate_hour   ; 
let   gDate_minute   ; 
let   gDate_seconds ;

var daysofweek = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday" ];
var months     = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];   

let gDateTimeRect     =  {x: 2 , y:2 ,  w: (canvasGlobal.width*0.065) , h: (canvasGlobal.height * 0.025) }
let gDateTimeBoxRect  =  {x: 2 , y:2+(canvasGlobal.height * 0.0225) ,  w: (canvasGlobal.width*0.065) , h: (canvasGlobal.height * 0.025) }

let gFntAdder=2;
let gFntSz =48;
let gFntSzWatchlist =120;

let gDetails_Yoff= 300  + gFntSz + gFntAdder;  // add 1 more row up top + gFntSz + gFntAdder;
let gDetailsEarnings_Xoff = 800;





var gStockStartDateStr ="1910-10-10";
var gStockEndDateStr   ="3910-10-10";
// for click & Drag only
var gInitDateStr= "1910-10-11";
var gStockStartDateClickedStr = gInitDateStr ;
var gStockEndDateClickedStr   = "3910-10-11";
var gStockStartDateClickedX = 0;  // gStockStartDateClickedStrX
var gStockEndDateClickedX   = 500; //canvasWidth;

var  gStockStartMouseUpClickedX =  0;
var gStockStartMouseUpDateStr  =  "3910-10-11";
var gDBClick=0; //){  // 0th time thru

var gDrawAlertWindow=0;
var gSwitchesEndIdx=16;

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



//  **************************************************************************************************
//  **************************************************************************************************
// note:  var numButtons = bTexts.length;   // must match bRects[] and bClickStatus[] & bClickStatusInit[]
//  var bRects = [ , bTexts = [   + var bClickStatus = [  //  + bClickStatusInit
var bTexts= [
                    "Switches",
                    "Fibonacci",            //"Color",
                    "Chart Type",
                    "Buy/Sell",
                    "Sup/Res",  //$ must be in this poisiotn [2] in 0... array
                    

                    "Pivots",
                    "Events", // formerly "Almanac",
                    "MAs&Dojis",     // status button 
                    "Gaps",   // you have
                    "Backtest",  //"Run P&L 🏃",


                    "Earnings",  /// freeing up soon for Earnings
                    "Watchlist",
                   "Indicators",                 // "Color",      // was "Fibonacci",   //"aiGuage",
                    "Crypto",
                    "Color",

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
                    "LESS",         //48
                    "MORE",         //49


                    "1 yr",      // "1min" 50
                    "2.5 yrs",     // "5min"
                    "4 yrs",     // "15min"
                    "7.5 yrs",    // "30min" 53

                    "10 yrs",   // "60min" 54

                    "Weekly",    //   55
                    "Monthly",    //  56
                    // "CYCLE",			   // 56

                    "Candles--",    // 57
                    "Candles++",   //  58
                    "BTC",		// 59

                    "ETH",  //60
 					


 // another 13         61..64
                    "3month",
                    "2year",
                    "5year",
                    "7year",

 //                  65..68
                    "10year",   //65
                    "30year",    //66
                    "FedFunds",
                    "YieldCurve",   // "Unemploy",

//            69..72
                    "CPI",
                    "RetailSales",    // 70 -48 ==22
                    "Unemploy.",           
                    "Inflation",   

//73
                    "GDP",   // close window button?

                    
// 74 ..86
                    ">>>",              // 74    // earnings left & right
                    "I ACCEPT",             // 75
                    "I DECLINE",
                    "10 Shares",
                    "100 Shares",       // 78 

                    "1K Shares",        // 79
                    "10K Shares",
                    "<<<",              //81
                    "X",               //82 

                "reSize[]",             //83

                    "🕺Stripe🕺", 
                    "Extras",           //85
                    "Viewports",  // 86

// 87.. 98
 
                    "RSI",              // 87
                    "Stoch",
                    "OBV",
                    "CCI",               // 90

                    "BBands",           // 91
                    "ADX",              // 92
                    "ATR",
                    "SMA",              //94

                    "Predict",          // "MACD",     // 93
                    "aux96",
                    "aux97",
                    "aux98",
                    "aux99",         // leave room for 5 more IN DICATORS

                    "Crude",        // 100 
                    "Brent",
                    "NatGas",       // 102

                    "Copper",       // 103
                    "Alum.",       // 104

                    "Forex",            // 105
// btnmore
                    "aux106",

                    "aux107",
                    "aux108",
                    "aux109",
                    "aux110",


                    "aux111",
                    "aux112",
                    "aux113",
                    "aux114",
                    "aux115",

                    "aux116",
                    "aux117",
                    "aux118",
                    "aux119",
                    "aux120",
 


                ];

let emojis = "💯 💤 🕺  🏄‍♂‍  🏃 🦋";


var g52WeekXlen=2500;

let  gFibHi = {x1: 0 , x2: 0 ,  y1: 0 , y2: 0  };
let  gFibLo = {x1: 0 , x2: 0 ,  y1: 0 , y2: 0  };

// fibonacci  5 incl 50% retracement
var gFibSeq = [
      0.236,
      0.382,
      0.500,
      0.618,
      0.786

      ];


//  **************************************************************************************************
//  **************************************************************************************************
//  var bRects[]   +  var bClickStatus[]    //  + bClickStatusInit[]
var numButtons = bTexts.length;   // must match bRects[] and bClickStatus[] & bClickStatusInit[]

var gButtonsViewportIdx=85;

var gButtonsIndicatorsIdx =86; 
var gButtonsIndicatorsEndIdx =          96 ;       
var gButtonsIndicatorsIdx1               = 100; 
var gButtonsIndicatorsEndIdx1 =          106;  // =118 ;      

// btnmore


var gButtonsDarkIdx =86;  
var gButtonsDarkIdx0=86;  

var gButtonsOKIdx=  74;   
var gButtonsAcceptIdx=75;    // 
var gButtonsDeclineIdx=76;   

var gButtonsPosSizeIdx   =77;   
var gButtonsPosSizeNumIdx =   4;

var gButtonsCloseWindowIdx=82;


//  ************************************************************************************************** gObjLoaded
//  ************************************************************************************************** gObjLoaded for .state in cndlestix.Js
//
let gLast_gObjLoadedONIdx=0;      // this tracks last one off these turned on for overlay chart and Shutting off


let   gObjLoadedmonthlyIdx=0, gObjLoadedweeklyIdx=1, gObjLoadeddailyIdx=2 ;
let   gObjLoaded60minIdx=3,  gObjLoaded30minIdx=4,   gObjLoaded15minIdx=5 ;
let   gObjLoaded10minIdx=6,  gObjLoaded5minIdx=7,    gObjLoaded1minIdx=8 ;


let  gObjLoaded3moIdx=13, gObjLoaded2yrIdx=14 , gObjLoaded5yrIdx =15, gObjLoaded7yrIdx=16 ,  gObjLoaded10yrIdx=17,  gObjLoaded30yrIdx=18;

let  gObjLoadedfedIdx=19, gObjLoadedgdpIdx=20 , gObjLoadedcpiIdx =21, gObjLoadedinflationIdx=22 ;
let  gObjLoadedunemploymentIdx=23,  gObjLoadedretailIdx=24, gObjLoadedconsumerIdx=25;


let  gObjLoadedcashflowIdx= 26;

// rsi vwap stoch obv cci
let  gObjLoadedrsiIdx= 27, gObjLoadedstochIdx=28 , gObjLoadedobvIdx =29 , gObjLoadedvwapIdx=30, gObjLoadedcciIdx=46  ;
let  gObjLoadedbbandsIdx= 47, gObjLoadedadxIdx=48 , gObjLoadedatrIdx =49 , gObjLoadedsmaIdx=50 , gObjLoadedmacdIdx=51;

// commodities
let  gObjLoadedwtiIdx= 56, gObjLoadedbrentIdx=57 , gObjLoadednatgasIdx =58 , gObjLoadedcopperIdx=59,gObjLoadedaluminumIdx=60,gObjLoadedfxIdx=61 ;
let  gObjLoadedpebandIdx =62 , gObjLoadeddivhistIdx=63; 

 


//
// const gObjsLoadedObjInit = [  
//         "monthly", "weekly" , "daily", 
//         "60min",  "30min",  "15min",
//         "10min", "5min", "1min",
// // note keep earningsall at #9
// //9..12
//         "earningsall", "earnings", "quote" , "overview",

// /////////////////////////////////////////////////// DO NOT CHANGE ORDER

// //13..18
//         "3month", "2year", "5year", "7year", "10year", "30year",
// //19..25
//         "fed", "gdp", "cpi", "inflation",
//         "unemployment", "retailsales", "consumer",
        
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER


// //26..30
//         "cashflow",
//          27,    28,       29     30 
//         "rsi",  "stoch", "obv", "vwap", 

// //31
//         "watchlistearnings", 

//         "dailycsv",              // 32 to preserve the long csv that comes in... the 5733 *16 pieces of data
//         "dailycsvclamp",         // 33

// //34..36
// // should be derivedin real time from dailycsv -
//         "dailycsvweekly",    // 34 to preserve the long csv that comes in... the 5733 *16 pieces of data
//         "dailycsvmonthly",   // 35 to preserve the long csv that comes in... the 5733 *16 pieces of data
//         "dailycsvyearly",    // 36 to preserve the long csv that comes in... the 5733 *16 pieces of data

// /////////////////////////////////////////////////// DO NOT CHANGE ORDER
// //37..45 
//         "monthlycrypto", "weeklycrypto" , "dailycrypto", 
//         "60mincrypto",  "30mincrypto",  "15mincrypto",
//         "10mincrypto", "5mincrypto", "1mincrypto",
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER

// 46
        // "cci",

//         "EOF"
//       ];
// ///
// /////////////////////////////////////////////////// DO NOT CHANGE ORDER
// //


//  ************************************************************************************************** CRYPTO
//  ************************************************************************************************** CRYPTO
//  ************************************************************************************************** CRYPTO
//  ************************************************************************************************** CRYPTO
//  ************************************************************************************************** CRYPTO
//  ********* CRYPTO
//  ********* CRYPTO
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
//  ********* CRYPTO
//  ********* CRYPTO
//  ********* CRYPTO


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

// ht of last top/bot buttons
let y10b1= mf(y10b * 1.35) ; //1.15   // *0.90;  
let y10b1c=mf(y10b * 1.05) ; //1.15   // *0.90; 

let gCornerPtW = y10b1+20;  //  == 64*1.35  +20
let gCornerPtH = y10b1+20;

let y10= 120;   // =70 ;
// let y10b= 90; //128; // y height of 1min, 5min, ... weekly buttons

let yl120=110; 

let yl120a=110; //=146;  // == y height of crypto buttons 1..16, 17..32  

let xl220 = 240;   //=220;  
let xl220a= 256; //192; 


// WIDTH OF 1min 5min ... Weekly buttons
let xl100 =  256;// 208; // 256;   //=220;  

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



// let gViewportRectInset      =    {x: gChartLeftStart+ (canvasWidthG*0.11), y:220, w:2300, h:1400} ;
// let gViewportRectAlpha      =    {x: gChartLeftStart+ (canvasWidthG*0.11), y:220, w:2300, h:1400} ;
let gViewportRectInset      =    {x: gChartLeftStart+ 200, y:220, w:2300, h:1400} ;
let gViewportRectAlpha      =    {x: gChartLeftStart+ 200, y:220, w:2300, h:1400} ;





// let gIntervalButton0 = canvasGlobal.height *0.9978 -  y10b;
let topOff =10;
let botOff = topOff ;// 2;//18;
let gIntervalButton0 = canvasGlobal.height   -  y10b1 - botOff;  // -2;
let gIntervalButton0b= 4 ;// topOff ; //1; ///2; //canvasGlobal.height *0.01;

let gIntervalButton0a= canvasGlobal.height *0.9978 - (3.5* y10b);
// let y10b= 90; //128; // y height of 1min, 5min, ... weekly buttons

// needs to match # in bt3xts[]
var bRects = [     // var bClickStatus = [  //  + bClickStatusInit 
//switches
                      xButOff+gSwitchOffsetX,    4+y10+ 0,        xl220,yl120,
                      xButOff+ gSwitchOffsetX,   4+y10+(120 * 1), xl220,yl120, 

                      xButOff+x50+gSwitchOffsetX,4+y10+(120 * 2), xl220,yl120,        
                      xButOff+x50+gSwitchOffsetX,4+y10+(120 * 3), xl220,yl120,      


                      xButOff+x50+gSwitchOffsetX, 4+y10+(120 * 4), xl220,yl120,        
                      xButOff+x50+ gSwitchOffsetX,4+y10+(120 * 5), xl220,yl120,         

                      xButOff+x50+ gSwitchOffsetX,4+y10+(120 * 6), xl220,yl120,              
                      xButOff+x50+ gSwitchOffsetX,4+y10+(120 * 7), xl220,yl120,    


                      xButOff+x50+ gSwitchOffsetX,4+y10+(120 * 8), xl220,yl120,         
                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 9), xl220,yl120,           

                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 10), xl220,yl120,           
                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 11), xl220,yl120,           


                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 12), xl220,yl120,            
                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 13), xl220,yl120,           
                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 14), xl220,yl120,   
                      xButOff+ gSwitchOffsetX,    4+y10+(120 * 15), xl220,yl120,           

    


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
    






////////////////////////////////////////////////////////////
//
//        TOP ROUNDED BUTTONS
//
// 8 for 1min, 5min, 15min, 30min / day/wk/mo chart buttons 
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 7 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 8 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 9 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                 

                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (10 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (11 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (12 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (13 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,

//56.. 60  [0..60] 
                 0+  650+   xButOff+gSwitchOffsetX -gxIntvOff + (14 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                10+  650+   xButOff+gSwitchOffsetX -gxIntvOff + (15 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                16+  650+   xButOff+gSwitchOffsetX -gxIntvOff + (16 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
			//  btc / eth               
                28+  650+   xButOff+gSwitchOffsetX -gxIntvOff + (17 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,
                28+  650+   xButOff+gSwitchOffsetX -gxIntvOff + (18 *xl100) -  ( 5 *xl100), y10b1c+4+ gIntervalButton0b,        xl100,y10b1c,



////////////////////////////////////////////////////////////
//
//        BOTTOM ROUNDED BUTTONS
//
//
// gStartChartX-200
//  bottom 3mo, 2yr, 5yr, 7yr etc
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



 // [74]...[76] 
 //
 			// [74] ">>>", 
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*1)-6 , xl100,y10b1,
            


            // [75] accept    
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*1) , xl100,y10b1,
            // [76] decline 
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + ( 8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*1) , xl100,y10b1,
                 


              // [77..80]   10,100,1000 , 10k shares   	// BACKTEST BUTTONS					
                  650+    xButOff+gSwitchOffsetX -gxIntvOff +  ( 7 *xl100) -  ( 5 *xl100), (y10b1*1.0) + gIntervalButton0b+16 +48 , xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 8 *xl100) -  ( 5 *xl100), (y10b1*1.0) + gIntervalButton0b +16 +48 , xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + ( 9 *xl100) -  ( 5 *xl100), (y10b1*1.0) + gIntervalButton0b +16 +48 , xl100,y10b1,
                  650+    xButOff+gSwitchOffsetX -gxIntvOff + (10 *xl100) -  ( 5 *xl100), (y10b1*1.0) + gIntervalButton0b +16 +48 ,  xl100,y10b1,
               

               // [81]  "<<<",
                  650+   xButOff+gSwitchOffsetX -gxIntvOff +  (8*xl100) -  ( 5 *xl100), 0+ gIntervalButton0 -(y10b1*1) -6,        xl100,y10b1,



// [82..86]
				    //  gViewportRectInset
                      // 650+   xButOff+gSwitchOffsetX -gxIntvOff + (20 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*0) ,        xl100,y10b1,
                     
                  // (gViewportRectInset.x +gViewportRectInset.w) , gViewportRectInset.y- y10b1-5 ,        y10b1+20,y10b1,   // more square
         // (gViewportRectInset.x + 0 ) , gViewportRectInset.y- y10b1-5 ,        y10b1+20,y10b1,   // more square
                

            // 82
                // [X] closebutton
                  // 650- y10b1+8   + xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100), gViewportRectInset.y- y10b1 -15,        y10b1+20,y10b1+20,   // more square
                  800,                                        - gViewportRectInset.y- y10b1 -15,        y10b1+20,y10b1+20,   // more square
                  // (gG lobalViewportRect.x - y10b1 -20),( gG lobalViewportRect.y- y10b1-20) ,        y10b1+20,y10b1+20,   // more square
                 

                 // [83] resize
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-mf(y10b1*14.5) ,        xl100,y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (21.25 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*0) ,        xl100,y10b1,


  //            // 85 extras     
  //                 650+   xButOff+gSwitchOffsetX -gxIntvOff + (23 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*1) ,        xl100,y10b1,
  // // [86]    viewpts+  
  //                 650+   xButOff+gSwitchOffsetX -gxIntvOff + (19 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*1) ,        xl100,y10b1,
              
             // 85 extras     
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (23 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0  ,        xl100,y10b1,
  // [86]    viewpts+  
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (20 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0  ,        xl100,y10b1,
              
// 87  .. 90
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*5) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*6) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6*xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*7) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*8) ,        mf(0.725*xl100),y10b1,

// 91  .. 94
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*9) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*10) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*11) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*12) ,       mf(0.725*xl100),y10b1,
// 95  .. 98
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*13) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*14) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*15) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*16) ,       mf(0.725*xl100),y10b1,

//NEW
// 99 .. 102
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (6 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*17) ,        mf(0.725*xl100),y10b1,


// 100 crude wti          
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*5) ,       mf(0.725*xl100),y10b1,
                  //brent
                   650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*6) ,          mf(0.725*xl100),y10b1,
                  // 102 natgas
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*7) ,       mf(0.725*xl100),y10b1,
// 103 copper  104 alum   .. 106
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*8) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*9) ,        mf(0.725*xl100),y10b1,
                  
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*10) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*11) ,       mf(0.725*xl100),y10b1,


// 107  ..  110
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (7 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*12) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*5) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*6) ,        mf(0.725*xl100),y10b1,
                  650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*7) ,        mf(0.725*xl100),y10b1,

// 111 .. 120
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*8) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*9) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*10) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*11) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (8 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*12) ,       mf(0.725*xl100),y10b1,

               650+   xButOff+gSwitchOffsetX -gxIntvOff + (9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*5) ,        mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*6) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*7) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*8) ,       mf(0.725*xl100),y10b1,
                650+   xButOff+gSwitchOffsetX -gxIntvOff + (9 *xl100) -  ( 5 *xl100), 0+ gIntervalButton0-(y10b1*9) ,       mf(0.725*xl100),y10b1,
 

//btnmore

//  ****
//  ****
//  ****

// *****
// ***** 


    ];
 
        
////////////
//
// globals
// 
 var gNumButsacrossTop =13    ;                   
 var gNumButsacrossBottom =16 ;   
//                
/////////////////////////////  Define Buttons' Viewport vectors xywh  //////////////////////////////////////////////
//
// from above: 
//
//        TOP ROUNDED BUTTONS
//
// 8 for 1min, 5min, 15min, 30min / day/wk/mo chart buttons 
//         650+ xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100), 0+ gIn tervalButton0b,        xl100,y10b1,
//
 let gRButtonsTopX =  650+ xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100);
 let gRButtonsTopY =   0+ gIntervalButton0b;
 // let gRButtonsTopY =   y10b1c+4+ gIntervalButton0b;

 let gRButtonsTopW =  xl100 * (1+ gNumButsacrossTop) ;     // 13 buttons up top
 let gRButtonsTopH =  y10b1;

//
//        BOTTOM
//gStartChartX-200
//  bottom 6mo, 2yr, 5yr, 7yr etc
//					650+ xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100),  0+ gIntervalButton0, xl100,y10b1,
//
 let gRButtonsBotX =  650+ xButOff+gSwitchOffsetX -gxIntvOff + ( 6 *xl100) -  ( 5 *xl100);
 let gRButtonsBotY =   0+ gIntervalButton0;
 let gRButtonsBotW =  xl100  * ( 1+ gNumButsacrossBottom) ;    // 16 buttons wide, below
 let gRButtonsBotH =  y10b1;
 



// remember  var bClickStatus = [  //  + bClickStatusInit



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
            var gDra wExtras=0;
            var gDraw MinorCrossover=0;
            var gDrawBa cktest=0;
                 var gAllOnOff=0;
            var gDrawDojis=1;
            var gDrawMvgAvgs=1;
            var gDrawCrypto=0;
// used for switches

*/


// for init_Swi tchesVars
var bClickStatus = [  //  + bClickStatusInit 


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
                           0, 0, 0, 0, 0,

// 74..86    ANOTHER 13 (AuxNN)            
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0,

// 87 .. 98
                0, 0,0, 0,
                0, 0,0, 0,
                0, 0,0, 0,

// 99.. 110
            0, 0,0, 0,
                0, 0,0, 0,
                0, 0,0, 0,

// 111 .. 120
                0, 0,0, 0,  0,
                0, 0,0, 0, 0

//btnmore


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
                           0, 0, 0, 0, 0,


// 74..86    ANOTHER 13 (AuxNN)            
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0,


// 87 .. 98
                0, 0,0, 0,
                0, 0,0, 0,
                0, 0,0, 0,

//NEW
// 99.. 110
            0, 0,0, 0,
                0, 0,0, 0,
                0, 0,0, 0,

// 111 .. 120
                0, 0,0, 0, 0,
                0, 0,0, 0, 0
                

//btnmore

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







function mrnd(x){
  return( Math.floor(Math.random()*x) ) ; 
}
function mr(x){
  return(Math.round(x));
}
function mf(x){
  return(Math.floor(x));
}

function drawIdentRect(x,y,w,h, xu,yu){
  ctx.fillStyle="#ff224b";
  ctx.fillRect(x,y,w,h);
}
//
//
//
//
function GetButtonNumClicked(xu,yu){
var i, bOff4=4;

gButtonNumClicked=-1;   // indicate not clicked within button # 0..n

 var tmpstr 	=" ";
 var tmpcol 	= "#8888EE";  //"#00ee00";//  gButColOn;
 var tmpcoloff  = "#555588"; //gButColOff;
 var txtcol     = '#efefef';


//
//JMB 082522
    var xu_min =0;
    var xu_max =0;
    var yu_min =0;
    var yu_max =0;

     for(i=0;i<numButtons;i++){

// if crypto off and not in crypto range :[16..47] inclusve
if( i>=16 && i<48 && gDrawCrypto==0 ){
    ; // do nothing / no checking the buttons pressed
}else{

        xu_min =    bRects[ (i*bOff4) + 0 ];
        xu_max =    bRects[ (i*bOff4) + 0 ] + bRects[ (i*bOff4) + 2 ] ;

        yu_min =   bRects[ (i*bOff4) + 1 ] ;
        yu_max =   bRects[ (i*bOff4) + 1 ] + bRects[ (i*bOff4) + 3 ]  ;

   

        if( i ==gButtonsCloseWindowIdx){   // 82 ){  // close button
            xu_min =   gCornerPtX - gCornerPtW;
            // xu_max =   gCornerPtX + bRects[ (i*bOff4) + 2 ] ;
            xu_max =   gCornerPtX - gCornerPtW + gCornerPtW ; //bRects[ (i*bOff4) + 2 ] ;

            yu_min =   gCornerPtY ;
            // yu_max =   gCornerPtY + bRects[ (i*bOff4) + 3 ]  ;
            yu_max =   gCornerPtY + gCornerPtH ;  //bRects[ (i*bOff4) + 3 ]  ;

        }

//
//
//  NOTE : ** CHECK intercept BUTTONS  here
        // intercept accept/decline here
        if(  gDrawAlertWindow==1  &&  (i==gButtonsAcceptIdx  ||  i==gButtonsDeclineIdx)  ){
          // RESET THEM TO GLOBALS IF INTERCEPT BUTTON 
          //
          // these gButtonX1, etc are set by st0re_gButtons()
                xu_min = gButtonX1;   
                xu_max = gButtonX1+gButtonW1;   

                yu_min =  gButtonY1;   
                yu_max =  gButtonY1+gButtonH1; 

                    // check for 2nd decline button
                    if(i==gButtonsDeclineIdx){
                       xu_min = gButtonX2 ;  
                       xu_max = gButtonX2+gButtonW1;  
                     }

        }//if



// main test if button clicked
        if(  ( xu >=xu_min  )  &&
             ( xu <=xu_max  )  && 

             ( yu >=yu_min  )  &&
             ( yu <=yu_max  ) ) {


                      gButtonNumClicked=i;

                      console.log('gButtonNumClicked=' +i);
                      console.log(gButtonNumClicked);

                      txtcol='#efefef';
                    
            // /// FOR DEBUGGING            
            //                 drawIdentRect(bRects[ (i*bOff4) + 0 ],
            //                               bRects[ (i*bOff4) + 1 ],
            //                               bRects[ (i*bOff4) + 2 ],
            //                               bRects[ (i*bOff4) + 3 ],
            //                               xu,yu  );


// if button status == off , ie we are gonna turn on the right button's fn
            if(bClickStatus[i]==0){

                    let skipButtonPress = 0;
                    // here 2ndcrypto rack of buttons
                    if( gDrawCrypto==2   &&   i > bTextsCutoff    &&   i < bTextIntervalCutoff ) {
                    				  i+=16;
                    	    		gButtonNumClicked=i;

                      				console.log('*** gDrawCrypto=' + gDrawCrypto);
                      				console.log('2nd-gButtonNumClicked=' +i);

                    }else if( gDrawCrypto==0  &&  i > bTextsCutoff    &&   i < bTextIntervalCutoff){
                             // if we are in a crypto button AND gDrawCrypto == off
                                  skipButtonPress = 1;
                                gButtonNumClicked=-1;   // indicate not clicked within button # 0..n
                    }

                    if(skipButtonPress != 1){
                           bClickStatus[i]=1;  // 1== clicked, not representative of button;s state
                           localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );
                           if( ( i==0 || gDrawSwitches==1 )   &&  i<16 )   sfx_serverSwitch1.play(); 
                    }
                        

              }else if(bClickStatus[i]==2){
                          bClickStatus[i]=0;
                          localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );
                          if( ( i==0 || gDrawSwitches==1 )   &&  i<16 )  sfx_serverSwitch2.play();     

              }else{ 
                          bClickStatus[i]=0;
                          localStorageSwitch( "switch"+i.toString(),  bClickStatus[i] );

                          if( ( i==0 || gDrawSwitches==1 )   &&  i<16 )  sfx_serverSwitch0.play();     
 
                }

                          
              return(i);

          }//if inside Rect



        }// else if crypto off and not in crypto rang
    
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
    // HACK to avoid problem with storing 'switch0'
    if(storStr!="switch0")   localStorage.setItem(storStr, storValue);
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
            var gDrawBa cktest=0;
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


  for(i=0;i<gSwitchesEndIdx;i++){

      state01 = bClickStatus[ i ];   // ie 0, 1 or 2
      // * should clamp value to 0..2 here

//         sw, col,cndl, bs,      sr,  p,  gp,  mvg,     doji, PnL,+, -,        gu, cry, extr,  run        
//          0, 0,  1,    1,      1,   1,  1,    1,        1 ,  0, 0,  0,       0,   0,   0,     0 ,
 

    localStorageSwitch( "switch"+i.toString(), state01 ) ;


      switch(i){
        case 0:      // sw
          gDrawSwitches = state01;
        break;
       case 1:      // color
            gDrawFib= state01;
          // gDrawColor = state01;
          // switchColorSet(gDrawColor);
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
       case 7:      // mvg avg &  dojis
            gDrawMvgAvgs  = state01;
            gDrawDojis  = state01;
        break;
       case 8:      // gaps
             gDrawGaps = state01;
        break;
       case 9:      // backtest runPnL  // runtime switch only
//JMB 2022-08-24     uncomment this ==bug!!  
             //gDrawBacktest = state01;
        break;
       case 10:      // EARNINGS    /  runtime switch only
        break;
       case 11:      // [rsvd]
        break;

       case 12:      // now: Indicators   /// color   was guage
            // may need to del this if we don't want to website to remember these are displayed or not
            gDrawIndicatorButtons = state01;

          // gDrawColor = state01;
          // switchColorSet(gDrawColor);
          //   // gDrawGuage = state01;
        break;
       case 13:      // crypto
           // gDrawCrypto= state01;
        break;
       case 14:      // color
        gDrawColor = state01;
          switchColorSet(gDrawColor);
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
       // var jbBut = new jButto nRound( bR ects[  (i*bOff4) + 0 ] ,
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



// cryptobuttons
		ctx.strokeStyle ="#1122fe";
       // ctx.strokeRect( x-genoff, y-genoff,   w0+genoff, h0+genoff );
        let x1 =  x-genoff;
        let y1 =   y-genoff;
        let w1 =  w0+genoff;
        let h1 =  h0+genoff;
        let cr = 36;

        ctx.roundRect2(x1, y1, w1, h1, {upperLeft: cr, upperRight: cr,lowerLeft: cr, lowerRight:  cr}, false, true , 4 , "#22cbcb" );


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
/*

// called every sec
const element = document.getElementById("demo");
setI nterval(function() {element.innerHTML += "Hello"}, 1000);

https://itraderpro.co/userdatapost.php[$_POST]; $_POST == 
uiux.js:1401 [  remove bad CHARs  ] 
uiux.js:1402 Saturday, August 20 2022-08-20 20:45:28 john@abc.com, IP=4.35.39.234
 MacIntel Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Google Inc. undefined 
uiux.js:1391  every 5 seconds

*/

var gIntervalWrite =4;

//JMB
// 2022-08-20
// called every g1ntervalWrite seconds
//
var myfuncWriteCriticals = setInterval( function() {

     let now = new Date().getTime();
 // console.log("] setIntrvl():  every 5 secs: ",now );

  getLocalDate();    // gDate_datefullstr
  getLocalTime();    //sets gDate_timefullstr

let tstr = gDate_datefullstr +" " +gDate_timefullstr+ " "+GetUserData() + " ";

// console.log( "] asyncCall.php[_POST] : POSTstr== ");
// console.log( "https://itraderpro.co/userdatapost.php[$_POST]; $_POST == ");
// console.log( "[  remove bad CHARs  ] ");
// console.log( tstr);


}, (1000 * gIntervalWrite ) );   // ie gIntervalWrite =4; * 1000= 4 sec



//
//  sub 1-sec interval REALLY AUTO 
//
var gColorShiftValue = "#ffeedd" ;  

var gCycleRGB = 0;
let gCycleRGBvector = { r:0.0, g:0.0, b:0.0, a:0.0 };

let gCycleRGBvectorStr = ""; 

var change_gColorShift = setInterval( function() {

  gColorShiftValue = RandomColorC();
  // console.log(gCra wlSpeed, " seconds INTERVAL, colValue==")
  // console.log(gColorShiftValue )

  getAndPrintLocalDateTime();

// let tstr = gDate_datefullstr +" " +gDate_timefullstr; // " "+GetUserData() + " ";
//   console.log( tstr);

let cmax  = 255;
let rnd9r = mrnd(cmax);  // col  
let rnd9g = mrnd(cmax);   
let rnd9b = mrnd(cmax);  
let rnda  = mrnd(100) ;    

 gCycleRGBvector = { r: rnd9r,  g: rnd9g,  b: rnd9b,  a: mf(rnda/100) };

 gCycleRGBvectorStr = 'rgba( r:'+rnd9r.toString()+ ', g:'+rnd9g.toString()+ ', b:'+rnd9b.toString() +', a:'+ (rnda/100).toFixed(2).toString() +' )'  ;

 // cl(gCycleRGBvectorStr);
  

 // }






}, (1000 * gCrawlSpeed ) );   // 0.25 1000= 1 sec


let    gCollimegreen='rgb(202, 255, 0)';
let    gColpurplebright='rgb(202, 128, 255)';
let    gColaqua = 'rgb(0, 253, 203)';


/* colors rgb
gColor_Aqua = 'rgb(0, 253, 203)';
aqua
rgb(0, 253, 203)

hot pink
rgb(255, 0, 203)

fb blue
rgb(64, 79, 202)

pink
rgb(238, 130, 238)

orange
rgb(255, 165, 0)
rgb(255, 167, 0)

purplebright
rgb(202, 128, 255)

purpleblue
rgb(111, 57, 227)

purple,muted
rgb(106, 90, 205)

deep purple
rgb(122, 0, 203)

lime green
rgb(202, 255, 0)

muted greenBlue
rgb(0, 163, 165)

blue-grey
rgb(122, 187, 203)

brown
rgb(122, 67, 22)

orange-brown/copper
rgb(202, 128, 0)


*/

//
//  DEPRICATE
//
// Run myfunc every second
var myfunc = setInterval( function() {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
   	if(gCountdownStopper==1) countdown-=4;
    if (countdown>25) gameLoop(countdown);
        else { countdown = countdownStart; }
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
var gRGBdecColor = "";
function RandomColorC(){
    var rstr = "#";
    var rrnd=0;

    // 'rgba( 30.0, 30.0, 250.0, ' 
    rrnd = RandomNumC(256);
    gRGBdecColor = 'rgba( ' + rrnd.toFixed(2).toString()+', ';
    rstr = rstr + rrnd.toString(16);

    rrnd = RandomNumC(256);
    gRGBdecColor +=   rrnd.toFixed(2).toString()+', ';
    rstr = rstr + rrnd.toString(16);

    rrnd = RandomNumC(256);
    gRGBdecColor +=   rrnd.toFixed(2).toString() +" ";
    rstr = rstr + rrnd.toString(16);
    // sets gRGBdecColor for
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
      ctx.beginPath();
      ctx.strokeStyle=col ; //"#ee8877";   
      ctx.lineWidth = wt ; //=2;

      ctx.moveTo( xf,yf  );
       ctx.lineTo( xt,yt ) ;
      ctx.stroke();

      ctx.closePath();
      
      
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

var jb_pink = "#ff55ee";
var jb_white = "#eaeaff";

function DrawCrosshairCrypto(x,y,col, vrect){
    let sstr ="";

    // DrawTrendLineColored( x-10  ,   y, x+10  ,   y,   col   );
    // DrawTrendLineColored( x ,   y-10,  x  ,   y+10,   col   );

    DrawTrendLineColored( vrect.x ,   y, vrect.x+vrect.w  ,   y,    col   );
    DrawTrendLineColored( x ,   vrect.y,  x  ,  vrect.y+vrect.h,   col   );

let rad0=60;
    drawCircle1( x, y-(1.0*rad0), rad0, jb_yellow );  


    ctx.fillStyle = jb_white;  
    ctx.globalAlpha = 1.0; 

    ctx.font = "120px Arial";
    // ctx.fillText( x.toFixed(1)+","+ y.toFixed(1) , x+30,y+30 );

    if(gDrawCrypto!=0) sstr = gGET_SymbolCryptoStr;
      else sstr = gGET_SymbolStr;

    sstr +=" gCrDrSt=="+ gCryptoDrawState.toString()+" ";

    ctx.fillText( sstr , x+30,y+(2.0*rad0) );

}//fn


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
        //         var message = ' Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      }


//  --> gStockMousemoveDateStr
//  --> gStockMousemoveDateStr
//  --> gStockMousemoveDateStr
//  --> gStockMousemoveDateStr

/*
//JMB011223
addEventListener('dblclick', (event) => {
  console.log( " DOUBLE CLICK DETECTED...");
 // gMouseDown=0;
 //     gMouseUp=1;
//JMB 2022-08-17
var mousePos = getMousePos(canvasGlobal, event);
// var message = ' Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);
let eventClientx = mousePos.x; //adjustClientX( event.pageX );
let eventClienty = mousePos.y;  //adjustClientY( event.pageY );

  if( gDrawBacktest==1 ){
        console.log( "] ** DOUBLE CLICK DETECTED..DrwRubberbandedWindow()., gStockStartDateClickedX=", gStockStartDateClickedX);

      if(gDBClick==0){  // 1st time thru
              // set the mouse up vars
              // added mouse up track separate var for dbclick on mobile for rubberband
              gStockStartMouseUpClickedX = eventClientx;
              gStockStartMouseUpDateStr = gStockStartDateStr;  // should be gStockMousemoveDateStr

//for takeAlgoPos...()

              gStockStartDateClickedX  = eventClientx;
              gStockStartDateClickedStr = gStockStartDateStr;    // ???

              
              console.log("] 'dbclk==0' , gStockStartMouseUpDateStr, gStockStartMouseUpClickedX==",
               gStockStartMouseUpDateStr, gStockStartMouseUpClickedX);


              gDBClick=1;

        }else if(gDBClick==1){  // 2nd time thru
            // grab mouseup specialty vars
            // set to start of window
              gStockStartDateClickedX  = gStockStartMouseUpClickedX;
              gStockStartDateClickedStr = gStockStartMouseUpDateStr;

              console.log("] 'dbclk==1' , gStockStartDateClickedStr, gStockStartDateClickedX==",
               gStockStartDateClickedStr, gStockStartDateClickedX);

               gStockEndDateClickedStr = gStockStartDateStr;  // movestr...
               gStockEndDateClickedX   = eventClientx;
           
              console.log( "] 'dbclk==1'  gStockEndDateClickedStr, gStockEndDateClickedX==",
                gStockEndDateClickedStr,gStockEndDateClickedX) ;
              DrawR ubberbandedWindow( gStockStartDateClickedX  , gStockEndDateClickedX , 64);

  console.log( "] DrwRubberbandedWindow( gStockStartDateClickedX  , gStockEndDateClickedX , 64); called... ");

            gDBClick=0;

        }//else if


      }//if( gDrwBacktest==1 ){





})

*/


 function clearClickNDrag(){
  // gStockStartDateClickedStr= "1910-10-10" ;
  clickNdrag =0 ;
 }     

addEventListener('mouseup', (event) => {
     gMouseDown=0;
     gMouseUp=1;

// JMB2022-05-06
var mousePos = getMousePos(canvasGlobal, event);
// var message = ' Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

let eventClientx = mousePos.x; //adjustClientX( event.pageX );
let eventClienty = mousePos.y;  //adjustClientY( event.pageY );


     if(clickNdrag==1){
      gStockEndDateClickedStr = gStockStartDateStr;
      gStockEndDateClickedX = eventClientx;

          if(gDrawBacktest==1){
            // gTrades.push(gLastAlgoTradeStr);
          // console.log(gTrades);    // from candlesticks
        
          gTrades=[];
          
          }

    }
    //  clearClickNDrag();
     clickNdrag =0 ;



    if(gConsoleEvents==1) console.log( event);



    // let rc = RandomColorC();
    // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCross hairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    

    // if(gDrawEarningsAll!=1)
		  //   DrawCrosshairHorizontalShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );


  
})



addEventListener('auxclick', (event) => {
      cl("] *****>>>>> auxclick ! ");
  console.log( event );

  if (event.button == 1) {
    cl("]  middle button clicked");
  }

})




var uMOUSE_WHEEL_ON =0; // =1; 

addEventListener('wheel', (event) => {

    gMouseWheelStatus =  event.deltaY ;

    if( uMOUSE_WHEEL_ON ==1  ){

        cl("] *****>>>>> WHEEL (x,y) ==");
        console.log( event.deltaX, event.deltaY );


        if( gMouseWheelStatus >1 || gMouseWheelStatus <1 ) ManageClampMax(gMouseWheelStatus);



        cl("]     gMouseWheelStatus =  "+ gMouseWheelStatus.toString() ) ;

        cl("]  0 = pixels  1 = lines    2 = pages ");
        console.log( event.deltaMode );
        // 0 = pixels
      // 1 = lines
      // 2 = pages
        console.log( event );

    
    }


})

//
//  derived from MngClampMx()below
//
//   INPUT
//      whe3lY > 0  ==> ADD to current candle count (gA1phaFullMaxCurrent)
//      whe3lY < 0  ==> SUB to current candle count (gA1phaFullMaxCurrent)
//      amt      ==   how much to -/+
//
//
function CycleClampMax(wheelY, amt ) {
    // let amt = 10;

    // scroll down 
    if(wheelY>0   &&   gAlphaFullMaxCurrent < (gAlphaFullMax-1-amt) )  gAlphaFullMaxCurrent+=amt;
        else if(wheelY>0 ) gAlphaFullMaxCurrent=gAlphaFullMax ;

    // scroll up
    if(wheelY<0   &&   gAlphaFullMaxCurrent > ( 60+amt) ) gAlphaFullMaxCurrent-=amt;

cl("]  gAlphaFullMaxCurrent == "+ gAlphaFullMaxCurrent.toString() );

    redrawCurrentChartNew();
}



function ManageClampMax(wheelY) {
    let amt = 10;

    // scroll down 
    if(wheelY>0   &&   gAlphaFullMaxCurrent < (gAlphaFullMax-1-amt) )  gAlphaFullMaxCurrent+=amt;
        else if(wheelY>0 ) gAlphaFullMaxCurrent=gAlphaFullMax ;

    // scroll up
    if(wheelY<0   &&   gAlphaFullMaxCurrent > ( 60+amt) ) gAlphaFullMaxCurrent-=amt;

cl("]  gAlphaFullMaxCurrent == "+ gAlphaFullMaxCurrent.toString() );

    redrawCurrentChartNew();
}










addEventListener('mousedown', (event) => {
     // console.log('uiux_mousedown '+  '(' +event.clientX +','+  event.clientY +'): ');
     gMouseDown=1;
     gMouseUp=0;
    if(gConsoleEvents==1) console.log( event);
      
      // if we are in the stock grid
    var mousePos = getMousePos(canvasGlobal, event);
        // var message = ' Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);
    let eventClientx = mousePos.x; //adjustClientX( event.pageX );
    let eventClienty = mousePos.y;  //adjustClientY( event.pageY );





// 'wheel' middle butt0n
    if( uMOUSE_WHEEL_ON ==1  ){

                 if (event.button == 1 || event.buttons == 4) {
                      console.log('] middle mouse button clicked !');
                      console.log(event);

                       gAlphaFullMaxCurrent=gAlphaFullMax ;
                       cl("]  gAlphaFullMaxCurrent == "+ gAlphaFullMaxCurrent.toString() );

                           redrawCurrentChartNew();

                   } 
        }



    // let rc = RandomColorC();
    // // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    // DrawCrossh airLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
           // DrawTrendLine( startX   ,   eventClienty,    canvasWidth ,   eventClienty );
           // if( clic kNdrag ==0 ){
           //   clic kNdrag=1;
           //   trendline_startx = eventClientx;
           //   trendline_starty = eventClienty;
           //    }






    if( clickNdrag ==0 ){
             clickNdrag=1;
             if( gDrawBacktest==1) initAlgoVars();

              gStockStartDateClickedStr= gStockStartDateStr ;
              gStockStartDateClickedX = eventClientx;

             
            }else  if(clickNdrag==1){
              gStockEndDateClickedStr = gStockStartDateStr;
          }


         
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
/////  for use with addEven tListener('mou semove',(event) => { 
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
//
//
function DrawCrosshairStock(mx, my, colorch, viewportRect){

let x1= viewportRect.x;
let y1= viewportRect.y;

// let h1= viewportRect.h;
let h1 = (gGlobalViewport5.y + gGlobalViewport5.h) -  y1;
let w1= viewportRect.w;


if(  gDrawAlertWindow>=1 || 
	 mx< gGlobalViewportRect.x  || 
    mx> gGlobalViewportRect.x+gGlobalViewportRect.w  ||
    my< gGlobalViewportRect.y  || 
    my> gGlobalViewportRect.y+gGlobalViewportRect.h 
  ) return;


if(mx <gStartChartX) mx = gStartChartX;
 

    ctx.beginPath();
      ctx.strokeStyle=colorch ; //"#ee8877";   
      ctx.lineWidth = 2;
      ctx.moveTo( mx,y1  );
      ctx.lineTo( mx,y1+h1  ) ;
      ctx.moveTo( x1    , my  );
      ctx.lineTo( x1+w1 , my ) ;
      ctx.stroke();
    ctx.closePath();  


 if(gDrawLineChart==1) return;

     // if(clickNdrag==1  && gDrawBacktest==1 ) return;
 // if(gDrawBacktest==1) return;



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
let myoffbacktestMult0=3.0;
let myoffbacktestMult1=3.5;

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

 gStockStartDateStr = ohlcstr0;
 
 // if( gDrawBacktest==1 ) gROI_StartDateStr = gStockStartDateStr ;


 // ohlcstr1 = "Close:"+ gCurrencyStr + Number(CandlesMaster[idx + C]).toFixed(2).toString() + " " +gGET_SymbolStr;
 ohlcstr1 = "Close:"+ gCurrencyStr + Number(CandlesMaster[idx + C]).toFixed(2).toString() ;
      gLastCloseStr = gCurrencyStr + Number(CandlesMaster[idx + C]).toFixed(2).toString() ;

  ohlcstr1a =" " ;  

 ohlcstr2 =  "Open: "+ gCurrencyStr + Number(CandlesMaster[idx + O]).toFixed(2).toString() ; //+
 ohlcstr3 =  "High: "+  gCurrencyStr +Number(CandlesMaster[idx + H]).toFixed(2).toString(); // +
 ohlcstr4 =  "Low:  "+  gCurrencyStr +Number(CandlesMaster[idx + L]).toFixed(2).toString() ; //+
     
     // let volustr = CandlesMaster[idx + V] ;
     let volustr =  (MBT( Number(CandlesMaster[idx + V]) ).toFixed(1)).toString()+gMBTstr ;
 ohlcstr5 =  "Volume: "+ volustr ;   


let yboxw =470;
let yboxh =600;
let x30 = 30;


     ctx.fillStyle = 'rgba(20.0,20.0,100.0,0.64)' ;  

     if(gDrawBacktest!=1){
         if(myoff>0) ctx.fillRect( mx+mxoff- x30, my+(0.5*myoff),          yboxw, yboxh);
           else ctx.fillRect( mx+mxoff+ x30,      my+(0.5*myoff) -yboxh,    yboxw, yboxh);
        }


}else ohlcstr = " "; // gGET_SymbolStr; // + " *** mx0=="+ mx0.toString()+"*** mx=="+ mx.toString();


// let cstr0 = cstr +", idx="+idxstr + " "+ohlcstr;
let cstr0 = cstr +  " "+ohlcstr;
// let cstr0 = cstr +" "+  gGET_SymbolStr + " ****** "   ;


     // ctx.fillStyle = 'rgba(20,20,80,0.66)' ; //"#333333";
     // if(myoff>0) ctx.fillRect( mx+mxoff, my+myoff,    500, 500);
     //   else ctx.fillRect( mx+mxoff, my+myoff -500,    500, 500);

let exy=4;
     ctx.fillStyle = "#FBEE52";  
     if(gDrawBacktest==0) ctx.fillRect( mx-exy, my-exy,    exy*2, exy*2);
        else  if(gDrawBacktest==1) ctx.fillRect( mx-exy, my-exy ,    exy*2, exy*1);
        // else  if(gDrawBacktest==1) ctx.fillRect( mx-exy, my-exy+(myoffbacktestMult0*myoff),    exy*2, exy*1);


     ctx.fillStyle = "#FFCA37"; //"#33A1E6"; // "#555555";  
     ctx.font ="54px Arial";  



let x21=mx+150;
if( x21 < x1+w1 -50){
//  right displayed price
     // ctx.fillStyle = "#FFCA37"; //"#33A1E6"; // "#555555";  
     // ctx.font ="54px Arial";
      ctx.fillText( cstr0, x21 , my+ (0*myoff) );
     }
 
let x22=mx-500;
if( x22 > x1 ){
// left  displayed price
     // ctx.fillStyle = "#FFCA37"; //"#33A1E6"; // "#FBEE52";  
     ctx.fillText( cstr0, x22 , my+ (0*myoff) );
   }



// tried once delete... depric
 // if(gDrawBacktest==1) return;


     ctx.fillStyle = "#88aaee";
     ctx.font ="72px Arial";
     if(gDrawBacktest==0) ctx.fillText( ohlcstr0, mx+mxoff, my+ (1.0*myoff) );
        // else              ctx.fillText( ohlcstr0, mx+mxoff, my+ (myoffbacktestMult0*myoff) );

     let op0= Number(CandlesMaster[idx + O]).toFixed(2);
     let cl0= Number(CandlesMaster[idx + C]).toFixed(2);

     if(cl0>op0) ctx.fillStyle = "#44ee44";  
       else ctx.fillStyle = "#ee4444";

     ctx.font ="42px Arial";
     if(gDrawBacktest==0) ctx.fillText(gGET_SymbolStr+" "+ ohlcstr1, mx+mxoff, my+(1.5*myoff ));
        // else              ctx.fillText(gGET_SymbolStr+" "+ ohlcstr1, mx+mxoff, my+(myoffbacktestMult1*myoff ));

     ctx.fillStyle = "#88aaee";
     if(gDrawBacktest==0){ 
        ctx.fillText( ohlcstr2, mx+mxoff, my+(2.0*myoff ));
        ctx.fillText( ohlcstr3, mx+mxoff, my+(2.5*myoff ));
        ctx.fillText( ohlcstr4, mx+mxoff, my+(3.0*myoff ));
        ctx.fillText( ohlcstr5, mx+mxoff, my+(3.5*myoff ));
        }
   
}//fn


//
////////////////////////////////////////////////////// a\}dEventListener
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
 
    if(clickNdrag==1){
      gStockEndDateClickedStr = gStockStartDateStr;
      gStockEndDateClickedX   = mousePos.x;
    } 


//
//
//
  if( stillmouse!=0  &&  gLastMousemoveX > gStartChartX ){
    
      redrawCurrentChartNew();

    if(clickNdrag==1  && gDrawBacktest==1 ){
      DrawRubberbandedWindow( gStockStartDateClickedX  , gStockEndDateClickedX , 64);
      
    }

 
    let rc0 = RandomColorC();
    let rc  = jb_yellow; 

    if( gDrawBacktest==1 ) rc= gColaqua; //rc=rc0;


     if(gDrawCrypto==0) DrawCrosshairStock(gLastMousemoveX, gLastMousemoveY, rc,  gGlobalViewportRect  );   // ie stocks
      else DrawCrosshairCrypto(gLastMousemoveX, gLastMousemoveY, rc0,  gGlobalViewportRect  );

     gRedrawnChartWhenX_LT_gStartChartX=0;


  }else   if( stillmouse!=0  &&  gLastMousemoveX < gStartChartX && gRedrawnChartWhenX_LT_gStartChartX!=1 ){
    redrawCurrentChartNew();
    gRedrawnChartWhenX_LT_gStartChartX=1;

  }



})


// *************************************************************************
var gNumRightVRectCandles =30.0;
function resizeCANVAS(){
              c.width  = innerWidth;
              c.height = innerHeight;
            
              canvasWidth  = c.width;
              canvasHeight = c.height;

            screenWidth0   = c.width;   // sort of redundant
            screenHeight0  = c.height;

            let w2=screenWidth0 -gGlobalViewportRect.x  - mr(candleWidth*gNumRightVRectCandles);   // added back in below
            let h2=screenHeight0-gGlobalViewportRect.y;

            SetRealtimeGlobalViewportRect( gGlobalViewportRect.x, gGlobalViewportRect.y , w2 + mr(candleWidth*gNumRightVRectCandles)  , h2 );

}//fn


addEventListener('resize',() => { 
  if(gRESIZE_TEST==1){
    resizeCANVAS();
    redrawCurrentChartNew();
  }
    // initParticles();
    // DrawTable(); 
})

// *************************************************************************







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

                   gBGcol="#bcbcbc";
                   gCandleRedCol= "#FF0000";
                   gCandleGreenCol ="#00FF00";

               }else if(gBGcol=="#bcbcbc"){       // grey bg
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
                   gBGcol="#bcbcbc";
                   gCandleRedCol= "#DD0000";
                   gCandleGreenCol ="#00CC00";
                   // gCandleRedCol= "#FF0000";
                   // gCandleGreenCol ="#00FF00";

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



// from  bTextIntervalCutoff .. numButtons
function   turnOffAllOtherIntervalButtons(bclicked1){
          //turn off all other cryptos except the one just pressed
           let e1=0;
            for(e1=bTextIntervalCutoff;e1<numButtons;e1++){
            if(e1 != bclicked1 ){   
               bClickStatus[e1]=0;
            }
           }//for
           //bClickStatus[ bclicked1 ]=1;

         // drawButtonsForeach_OFF(bclicked1);

}

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

function PostUserEvent( actionstr, typestr){

  let tstr = getDateTime();
   console.log(  "] P0stUserEvent(): ******>");
  console.log( actionstr, typestr, tstr);
  // console.log( typestr, tstr);

}//fn



function SetNumYearsToDisplay(numyrs){

              // gAlphaFullMaxMAX =  Math.round( 252   * 25 ) ;  //25yrs MAX
              // gAnnualTradingDays        =    252 ;

              gAlphaNumYearsForDailyCSV =    numyrs ;    // # yrs <<=== here 
              gAlphaFullMax             =    Math.round(  gAnnualTradingDays   * gAlphaNumYearsForDailyCSV  ) ;
              gAlphaFullMaxCurrent      =    gAlphaFullMax ; 
 
           redrawCurrentChartNew();
}

// *********************************************
//
//
function checkstateidx(idx) {
    return(true);  // check to make sure only buttons that gDrawL1neChart=1
}

//
// Sw1tchButtonStateOffOn(gL ast_gObjLoadedIdx);                  
//
//
function SwitchButtonStateOffOn(idx, onoff0) {
   if(checkstateidx(idx)==true){
        gObjsLoadedObj[ idx ].state =onoff0;  
                      gDrawLineChart=onoff0; 
                }
 }//fn

//
//gLa st_gObjLoadedIdx set
// uses g0bjsLoadedObj[].stat3 set
//
function SwitchButtonState( idx ) {
return(1);

    let rval=0;
    cl("] Sw1tchButtonState( ) BEFORE , idx, gObjsLoadedObj[ idx ].state =="+idx.toString()+" , " +gObjsLoadedObj[ idx ].state.toString()  );

    if(gObjsLoadedObj[ idx ].state ==1){
                gLast_gObjLoadedONIdx = idx;
               gObjsLoadedObj[ idx ].state =0;  
               gDrawLineChart=0;      
               rval=0;
            }else{
                  gObjLoaded1minIdx=0;
                    gObjsLoadedObj[ idx ].state =1;  
                    rval=1; 
            }
    
    cl("] Sw1tchButtonState( ) AFTER*** , idx, gObjsLoadedObj[ idx ].state =="+idx.toString()+" , " +gObjsLoadedObj[ idx ].state.toString()  );

    return(rval);

}// fn




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
    // DrawCrosshai rLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );

    }else{
       
      if( (gDrawSwitches==1) || bclicked==0  || bclicked > 15    ){      // 15 = Run AlgoInvestor


                       console.log("] BEFORE switch(bcl'd)"); //gDrawCrypto, case: bCl icked==");
                       
                       if( bclicked>=bTextIntervalCutoff  &&  bclicked<numButtons    ){
                              turnOffAllOtherIntervalButtons(bclicked);
                       }

                       console.log("gDrawCrypto==");
                       console.log(gDrawCrypto);

                       console.log("] just BEFORE sw1tch(bc1icked){   case: ");
                       console.log( bclicked);



        switch(bclicked){
          case 0:
             if(gDrawSwitches==1){  
                  gDrawSwitches=0;
                  bTexts[0] =   "Switches";

              }else if(gDrawSwitches==0){
                gDrawSwitches=1;
                // bTexts[0] =   "Fundamentals";
                bTexts[0] =   "Financials";
             }

               redrawCurrentChartNew();
              console.log( "after r3drawCurrentChrt()",gDrawSwitches );
          break; 


          case 1:
          // // BG color
          //       switchColor();  // sets  gDrawColor 
          //        redrawCurrentChartNew();

                if(gDrawFib==1) {
                   gDrawFib=0; 
                }else if(gDrawFib==0){
                   gDrawFib=1;
                }

              redrawCurrentChartNew();
            break;


          case 2:  
           // line/candle
            if(gLineOnClose==1)  gLineOnClose=0;
                else if(gLineOnClose==0) gLineOnClose=1; 
                redrawCurrentChartNew(); 
                  //JMB 2023-02-15
                  // gPrintObjs();
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
                redrawCurrentChartNew();

             break;

             
        case 4:   // supp / resist + mv avgs
             // if( gDrawSupRes==1) gDrawSupRes=0; 
             //    else gDrawSupRes=1;
             //      redrawCurrentC hart();

             if( gDrawSupRes==1) gDrawSupRes=2; 
                else if( gDrawSupRes==2) gDrawSupRes=0; 
                   else if( gDrawSupRes==0)  gDrawSupRes=1;

                 bClickStatus[bclicked]=gDrawSupRes;
                 localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])
                redrawCurrentChartNew();

            break;

        case 5:  
            //pivots
            if( gDrawP3Pivots==1) gDrawP3Pivots=2; 
                else if( gDrawP3Pivots==2) gDrawP3Pivots=0; 
                   else if( gDrawP3Pivots==0)  gDrawP3Pivots=1;

                 bClickStatus[bclicked]=gDrawP3Pivots;

                 localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])
              redrawCurrentChartNew();
           
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
              // // Cyc leFintechDataTEST1();


            //  if( gDrawWindowed==1) gDrawWindowed=2;
            //     else if( gDrawWindowed==2) gDrawWindowed=0;
            //       else if( gDrawWindowed==0) gDrawWindowed=1;
            //     bClickStatus[bclicked]=gDrawWindowed;


              if( gDrawAlmanac==1) gDrawAlmanac=0;
              else if( gDrawAlmanac==0) gDrawAlmanac=1;

              // if( gDrawViewports==1) gDrawViewports=0;
              // else if( gDrawViewports==0) gDrawViewports=1;

                // bClickStatus[bclicked]=gDrawAlmanac;
                localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])

                redrawCurrentChartNew();

            break;




          case 7:  
             if(gDrawMvgAvgs ==1) gDrawMvgAvgs=0;
                else gDrawMvgAvgs=1; 
           
             if(gDrawDojis ==1) gDrawDojis=0;
                else gDrawDojis=1;     
             redrawCurrentChartNew();

          break;

          case 8:  /// gaps dojis
             if( gDrawGaps==1) gDrawGaps=0; 
                else gDrawGaps=1;
               // re drawCurrentChart();
            redrawCurrentChartNew();

         break;

// don't change 9: without changing case76 'I decline'
          case 9:  // run PnL
//JMB011223
             clickNdrag =0 ;   // clr flag just like a movseUp
             initAlgoVars();

            console.log("] ** CASE 9: gDrawBacktest==", gDrawBacktest);
           // Backtest   ie run Pnl
            if(gDrawBacktest==0){ 
                  console.log("] ** CASE 9: gDrawBacktest(0)==", gDrawBacktest);
                 gDrawBacktest=1;
                 gDrawAlertWindow=1 ;     // turn off legal windown
              }else if(gDrawBacktest==1){
                  console.log("] ** CASE 9: gDrawBacktest(1)==", gDrawBacktest);
                  gDrawBacktest=0;
	    			      gDrawAlertWindow=0;  // turn off legal windown  
	    		 }
            redrawCurrentChartNew();

          break; 



//draw Earnings
        case 10:
               if(gDrawCrypto==0 && gDrawEarningsAll==0){

                //old way
                // GetEarningsDataGeneric( "earningsall" );
                 GetData( "av", "stocks", gGET_SymbolStr, "earningsall", "day", "legacy" );

                //new way
                  // intstr=  "earningsall";  
                  // Che ckAndGetNewData( intstr, gGET_SymbolStr , gAssetType.toLowerCase() );

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
                  redrawCurrentChartNew();

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
                  redrawCurrentChartNew();

            }else if(gDrawWatchlist==1){
            	gDrawWatchlist=0; 
            	 console.log("gDrawWatchlist==");
            	console.log(gDrawWatchlist);


              console.log("gObjsLoadedObj[ 9].objPost ==");
              console.log(gObjsLoadedObj[ 9].objPost );
                  redrawCurrentChartNew();
            }

            break;






        case 12: 
                // if(gSFX==1)  gSFX=0;
                // else if(gSFX==0) gSFX=1;
         
                // if(gDrawGuage==1) {
                //    gDrawGuage=0; 
                //    // gDrawSwitches=1; 
                // }else if(gDrawGuage==0){
                //    gDrawGuage=1;
                //    // gDrawSwitches=0; 

                //   }


 // BG color
               // switchColor();  // sets  gDrawColor 
               // redrawCurrentChartNew();
 
    //+ indicators
              if( gDrawIndicatorButtons==1) gDrawIndicatorButtons=0;
              else if( gDrawIndicatorButtons==0) gDrawIndicatorButtons=1;

               redrawCurrentChartNew();


              //   if(gDrawFib==1) {
              //      gDrawFib=0; 
              //   }else if(gDrawFib==0){
              //      gDrawFib=1;
              //   }

              // redrawCurrentChartNew();
          break;
 

        case 13:  
// crypto sw
            if(gDrawCrypto==1){  
                 SetAssetType( "crypto",  2 );     // gDrawCrypto=2; // gAssetType="crypto";
                
              }else if(gDrawCrypto==0){              // gDrawCrypto=1; // gAssetType="crypto";
                 SetAssetType( "crypto",  1 );

              }else{
                 SetAssetType("stocks", 0 );        // gDrawCrypto=0; // gAssetType="stocks";

              }

              console.log("gDrawCrypto==");
              console.log(gDrawCrypto);

              bClickStatus[bclicked]=gDrawCrypto;   // ==13
              localStorageSwitch( "switch"+bclicked.toString(), bClickStatus[bclicked])

              redrawCurrentChartNew();

          break;




        case 14:
        //+ indicators
              // if( gDrawIndicatorButtons==1) gDrawIndicatorButtons=0;
              // else if( gDrawIndicatorButtons==0) gDrawIndicatorButtons=1;

 // BG color
               switchColor();  // sets  gDrawColor 
               redrawCurrentChartNew();

            break;


          case 15:  
           // kick off algo investor 
           // CheckAlgoInvestorPremium( );
              gRunAlgoSwitch=1;
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
                  
                  // if( gInterval!="earnings"   &&   gInterval!="earningsall" ) gIntervalCrypto = gInterval;
                  //   else gIntervalCrypto="day";

                  GetData( "av", "crypto", gGET_SymbolCryptoStr,"crypto", gIntervalCrypto, "GetDataIntraday" );


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

// let   gObjLoadedmonthlyIdx=0, gObjLoadedweeklyIdx=1, gObjLoadeddailyIdx=2 ;
// let   gObjLoaded60minIdx=3,  gObjLoaded30minIdx=4,   gObjLoaded15minIdx=5 ;
// let   gObjLoaded10minIdx=6,  gObjLoaded5minIdx=7,    gObjLoaded1minIdx=8 ;
//
//    if(SwitchButtonState(gObjLoaded2yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
//
         case  48: 
                CycleClampMax( -1 , 20 );
              break;
         case  49: 
                CycleClampMax( 1 , 20 );
              break;


          case 50:   
               intstr=  "1min";  
 // if(gAssetType=="stocks")  if(SwitchButtonState(gObjLoaded1minIdx) ==1)   GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                if(gAssetType=="stocks"){ 
                    // GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    // gDrawLineChart=0;
              SetNumYearsToDisplay( 1 );  

                  }else if(gAssetType=="crypto")    GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");

              break;

          case 51:   
              intstr= "5min";   
               if(gAssetType=="stocks"){
                    // GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    // gDrawLineChart=0;
              SetNumYearsToDisplay( 2.5 );

                  }else if(gAssetType=="crypto")    GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");

           break;

          case 52:  
              intstr= "15min";  
               if(gAssetType=="stocks"){  
                    // GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    // gDrawLineChart=0;
                SetNumYearsToDisplay( 4.0 );

                    }else if(gAssetType=="crypto")    GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");
          break;


          case 53:     
             intstr=   "30min";   
               if(gAssetType=="stocks"){  
                    // GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    // gDrawLineChart=0;
                SetNumYearsToDisplay( 7.5 );

                   }else if(gAssetType=="crypto")    GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");
            break;

          case 54:    
             intstr=   "60min";    
             if(gAssetType=="stocks"){
                    //  GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    // gDrawLineChart=0;
                SetNumYearsToDisplay( 10.0 );

                    }else if(gAssetType=="crypto")    GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");
             break;


          // case 53: 
          //     intstr= "daily";  
          //     if(gAssetType=="stocks"){  
          //       GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
          //           gDrawLineChart=0;
          //         }else if(gAssetType=="crypto")   GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");
          // break;


//********************* REFACTOR !!!!
//********************* 

          case 55:  //54:  
              intstr= "weekly";  
              if(gAssetType=="stocks"){  
                  GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                    gDrawLineChart=0;
                  }else if(gAssetType=="crypto")   GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");

 // NEED REFACTORING
            // GetLongTermDataAfter("weekly");   
            //  if( gDrawWindowed==1) gDrawWindowed=0;
            //    else if( gDrawWindowed==0) gDrawWindowed=1;
            //    redrawCurrentChartNew();

       	    break;


          case 56:  //55:
             intstr= "monthly";  
             if(gAssetType=="stocks"){   
                 GetData("av", gAssetType, gGET_SymbolStr, intstr, intstr , "CheckAndGetNewData");
                 gDrawLineChart=0;
                 }else if(gAssetType=="crypto")   GetData("av", gAssetType, gGET_SymbolCryptoStr, intstr, intstr , "GetCryptoData");

 // NEED REFACTORING
            // GetLongTermDataAfter("monthly");  
            //  if( gDrawWindowed==2) gDrawWindowed=0;
            //    else if( gDrawWindowed==0) gDrawWindowed=2;
            //   redrawCurrentChartNew();
       
            break;

//********************* 
//********************* REFACTOR !!!!





        // case 56:  //cycle
        //      if(gDrawCrypto==0){

        //      // https://www.ustreasuryyieldcurve.com/
        //      //  OpenNewBrowserTab( " https://www.ustreasuryyieldcurve.com/");

        //             // dec max candles ? > 0+n
        //         CycleCl ampMax( -1 , 20 );
                


        //     }else{
        //         // crypto hndler
        //         ;
        //     }
        //   break;




          case 57:                      // DEcrease candles 
               if(gDrawCrypto!=0){        //   crypto 

                ChangeNumCandles("-");
                gAssetType="crypto";
              // SetAssetType("crypto",-1);


                 gIntervalCrypto="day";
                // r3drawChartCrypto( "day");
                 redrawCurrentChartNew();

              }else if(gDrawCrypto==0){   // stocks
                   // Subtractor
                  if(gCandlesLenSubtractor < (candlesLen-1) ){
                    gCandlesLenSubtractor++;
                    redrawCurrentChartNew();
                  }  
               }
          break;


         case 58:                      // increase candles // for now crypto
             if(gDrawCrypto!=0){        //   crypto 
                 ChangeNumCandles("+");
                // MAY NEED TO DEL this assettype assumption
                gAssetType="crypto";
                // SetAssetType("crypto",-1);

                gIntervalCrypto="day";
                // r3drawChartCrypto( "day");
                  redrawCurrentChartNew();

           }else if(gDrawCrypto==0){          // stocks
               if(gCandlesLenSubtractor > 1) {
                  gCandlesLenSubtractor--;
                  redrawCurrentChartNew();
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
// **************************************************************************************** Bonds...
//
//
//
//           gObjsLoadedObj[gLasti].state = 0  ?  1  ;

// gButtons3moIdx gButtons2yrIdx ; gButtons5yrIdx ; gButtons7yrIdx ;  gButtons10yrIdx;  gButtons30yrIdx

          case 61: 
             intstr=  "3month";  
             // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

             if(SwitchButtonState(gObjLoaded3moIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
           break;

          case 62: 
              intstr= "2year";    
             // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

            if(SwitchButtonState(gObjLoaded2yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
            break;

          case 63:  
              intstr= "5year";  
             // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

            if(SwitchButtonState(gObjLoaded5yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
            break;

          case 64: 
              intstr=  "7year";   
             // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

            if(SwitchButtonState(gObjLoaded7yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
           break;


          case 65: 
             intstr=   "10year";     
             // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

            if(SwitchButtonState(gObjLoaded10yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
              break;

          case 66: 
              intstr= "30year";  
              // GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
                        gDrawChart=0;                    

            if(SwitchButtonState(gObjLoaded30yrIdx) ==1)    GetData("av", gAssetTypeBonds, gGET_SymbolStr, intstr, "day", "CheckAndGetNewData");
            break;



//hhere



// fed, unempl, cpi, consumer, retailsales, 

//old way
          case 67:    
              intstr= "fed";  
                gDrawChart=0;                    

             if(SwitchButtonState(gObjLoadedfedIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");
            break;

          case 68:
            if(gDrawCrypto==0){
               OpenNewBrowserTab( " https://www.ustreasuryyieldcurve.com/");
            }else{
                // crypto hndler
                ;
            }
            //   intstr ="unemployment";
            //           gDrawChart=0;                    
            // if(SwitchButtonState(gObjLoadedunemploymentIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");
          break;

          case 69:
             intstr= "cpi"; 
                   gDrawChart=0;                    
              if(SwitchButtonState(gObjLoadedcpiIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");

            break;

          case 70:    
                intstr ="retailsales";
              if(SwitchButtonState(gObjLoadedretailIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");
            gDrawChart=0;                    

            break;



          case 71:     

              intstr ="unemployment";
                      gDrawChart=0;                    
            if(SwitchButtonState(gObjLoadedunemploymentIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");
            
            //   intstr= "consumer";    
            //   if(SwitchButtonState(gObjLoadedconsumerIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData"); 
            // gDrawChart=0;                    

            break;

          case 72:            

           intstr= "inflation";    
             if(SwitchButtonState(gObjLoadedinflationIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "yearly", "CheckAndGetNewData");
            gDrawChart=0;                    

          break;

// was CALC   // OpenNewBrowserTab( "https://itraderpro.co/calc");
         case 73:               
               intstr ="gdp";
                           gDrawChart=0;                    

             if(SwitchButtonState(gObjLoadedgdpIdx) ==1) GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "yearly", "CheckAndGetNewData");
         break;   
     




// another 13
        case 74:   	  

               if(gEarningsAllPageCount< gEarningsAllPageCountMax) gEarningsAllPageCount++;
               console.log(gEarningsAllPageCount);
                gDrawAlertWindow=0;


        // was TOS				 
	    //  gDrawAlertWindow=2;  
    	// // GenerateAlertWindow( "legal_tos" );    
     //      redrawCurrentChartNew();

           // intstr= "inflation";    
           //    GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "yearly", "CheckAndGetNewData");
        
        break;   

        case 75:                     //  accept gDrawBacktst should still be ==1
          gDrawAlertWindow=0; 
          redrawCurrentChartNew();
          PostUserEvent("accept","notfinadvice");
        break;   
        case 76:                     //  decline
 		      gDrawAlertWindow=0;         
              gDrawBacktest=0;  
		       redrawCurrentChartNew();    

          //must do this to maintain gDrwBacktest==0/1
          bClickStatus[ 9 ]=0;   // 9 = backtest Sw1tch OFF
          PostUserEvent("decline","notfinadvice");

        break;  








	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///
    //
    //                   "10 Shares",
     //                "100 Shares",       // 78 

     //                "1000 Shares",
     //                "Craps",
     //                "To Do",

        case 77:  
        	AdjustPositionSize(10);
        break;   
        case 78:  
        	AdjustPositionSize(100);
        break;  
        case 79:                       
        	AdjustPositionSize(1000);
       break;   

        case 80:              
         	AdjustPositionSize(10000);
       break;   



        case 81:  
        // case 71:  was                     // <<<
               if(gEarningsAllPageCount>0 ) gEarningsAllPageCount--;
               console.log(gEarningsAllPageCount);

                gDrawAlertWindow=0;
                                
              // intstr= "gdp";    
              // GetData("av", gAssetTypeFedData, gGET_SymbolStr, intstr, "yearly", "CheckAndGetNewData");
        break;  


        // [X] close LinChart
        case 82:  
            gDrawChart=0;                    
            gDrawLineChart=0;  
              SwitchButtonStateOffOn( gLast_gObjLoadedONIdx, 0);            // 0 ==off       
       break;   




        case 83:  
            // OpenNewBrowserTab( "https://itraderpro.co/todo.pdf");

            OpenNewBrowserTab( "https://itraderpro.co/candlesticksr.php?sym=msft&uname=John&email=johnbotti9000@gmail.com&key=8a2b18a0");
        break;  

        case 84:                     // [ stripetest ] 
           OpenNewBrowserTab( "https://itraderpro.co/fire");
        break;




// *************************** EXTRAS
        case 85:                     // [ EXTRAS ] 
          if(gDrawExtras==1){ 
                gDrawExtras=0;
                gButtonsDarkIdx=gButtonsDarkIdx0;
                gDrawGuage=0;

            }else{ 
                gDrawExtras=1;
                gButtonsDarkIdx=numButtons;
                gDrawGuage=1;

            }

             //  mirror end candles
          if(gPredict==1)  gPredict=0;
              else if(gPredict==0) gPredict=1;

        // SPREADS++
          if(gDrawSpreads==1) gDrawSpreads=0;
            else gDrawSpreads=1;
            // prob. should be same flag
          if(gDrawMinorCrossover==1) gDrawMinorCrossover=0;
            else gDrawMinorCrossover=1;
            
           redrawCurrentChartNew();

        break;



        case 86:                   
                // viewports
              if( gDrawViewports==1) gDrawViewports=0;
              else if( gDrawViewports==0) gDrawViewports=1;
        break;   


// gObjLoadedinflationIdx
        case 87:
               intstr ="rsi";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedrsiIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
         break;   
        case 88:                     
           intstr ="stoch";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedstochIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
           break;   
        case 89:                       
            intstr ="obv";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedobvIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
          break;   
        case 90:                       
            intstr ="cci";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedcciIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
          break;   

        case 91:
            intstr ="bbands";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedbbandsIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
                              
        break;   
        case 92:                       
          intstr ="adx";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedadxIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
         break;   

        case 93:     
             intstr ="atr";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedatrIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
               
        break;   


        case 94:                       
         intstr ="sma";
               //gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedsmaIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
        break;
         
        case 95:  
           // intstr ="macd";
           //     //gDrawChart=0; 
           //   if(SwitchButtonState(gObjLoadedmacdIdx) ==1) GetData("av", gAssetTypeStocks , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
            
            if( gPredict==0) gPredict=1;
             else gPredict=0;
             redrawCurrentChartNew();
        break;


        //  expansion iaux96..iaux99
        case 96: 
        break;
        case 97: 
        break;
        case 98: 
        break;
        case 99: 
        break;




// commodities
        case 100: 
        intstr ="wti";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedwtiIdx) ==1) GetData("av", gAssetTypeCommodities , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
        break;

        case 101: 
       intstr ="brent";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedbrentIdx) ==1) GetData("av", gAssetTypeCommodities , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
        break;

//
        case 102: 
        intstr ="natgas";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadednatgasIdx) ==1) GetData("av", gAssetTypeCommodities , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
       break;

        case 103: 
        intstr ="copper";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedcopperIdx) ==1) GetData("av", gAssetTypeCommodities , gGET_SymbolStr, intstr,  "monthly", "CheckAndGetNewData");
       break;

        case 104: 
        intstr ="aluminum";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedaluminumIdx) ==1) GetData("av", gAssetTypeCommodities , gGET_SymbolStr, intstr, "monthly", "CheckAndGetNewData");
       break;


        case 105: 
       intstr ="fx";
               gDrawChart=0; 
             if(SwitchButtonState(gObjLoadedfxIdx) ==1) GetData("av", gAssetTypeForex , gGET_SymbolStr, intstr, "daily", "CheckAndGetNewData");
        break;

//// btnmore

        case 106: 
        break;

        case 107: 
        break;

        case 108: 
        break;

        case 109: 
        break;



//
        case 110: 
        break;

        case 111: 
        break;

        case 112: 
        break;

        case 113: 
        break;

        case 114: 
        break;

        case 115: 
        break;



        case 116: 
        break;

        case 117: 
        break;

        case 118: 
        break;

        case 119: 
        break;

        case 120: 
        break;


    }//switch


          }else{
                redrawCurrentChartNew();

          // if gDrawSw e
          }//else

          redrawCurrentChartNew();


      }//else

     
})
// 

//
//  redraw chart appropriately if stocks or crypto...
//
function redrawChartNew( tInterval ){
// NOW CRYPTO ONLY
    if(gDrawCrypto!=0){
           // r3drawChartCrypto( tInterval );
           gAssetType="crypto";
       // SetAssetType("crypto",-1);

          gIntervalCrypto=tInterval.toLowerCase();   //"day";
          redrawCurrentChartNew();
    }
            
}//fn


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

//
//
//
function cl(item0){
       console.log(item0);
}
//
//  should be called when time value is changed
//
//
//
function GetCryptoData( tInterval ){
// 
// these should be reset here in  a  fn...
// SetAssetType("crypto" ,0 );
// gDrawCrypto
// gCryptoFlag
// gCryptoDrawState
//  gIntervalCrypto
//

        cl("] G3tCryptoData( ) tInterval, gGET_SymbolCryptoStr,gCryptoDrawState ==");
        cl(tInterval);
        cl(gGET_SymbolCryptoStr);
        cl(gCryptoDrawState);

       // if(gAssetType=="crypto"   || gDrawCrypto!=0 ) gIntervalCrypto = tInterval;
       gIntervalCrypto = tInterval;

 

        if( tInterval!="day" && tInterval!="daily" && tInterval!="weekly" && tInterval!="monthly" ){
             //  GetData( "av", gAssetType, gGET_SymbolCryptoStr, gAssetType, gIntervalCrypto, "GetDataIntraday" );
             GetDataIntraday(gAssetType);
         
        }else if( tInterval=="day" || tInterval=="daily"){
            //  GetData( "av", gAssetType, gGET_SymbolCryptoStr, gAssetType, gIntervalCrypto, "GetDataDaily" );
             GetDataDaily(gAssetType);

        }

}//fn



// //
// //
// //
// //
// function Ge tData(src0, asset0, symbol0, datatype0, intrv0, legacy0){

// let src1      = src0.toLowerCase();
// let asset1    = asset0.toLowerCase();
// let symbol1   = symbol0.toLowerCase();
// let datatype1 = datatype0.toLowerCase();
// let intrv1    = intrv0.toLowerCase();
// let legacy1   = legacy0.toLowerCase();


// if(src1=="al"){
// //alpaca
//    return; 

// }else if(src1!="av") return;   // if not alphVantge rturn;


// /////////////////////////////// src1== "av"...
// //
// if(legacy1=="legacy"){

//     if(asset1=="stocks"){

//     }else if(asset1=="crypto"){

//     }if(asset1=="fx"){
//         ;
//     }
// }else{

//     ;
// }

// }//fn



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
        var symstr0="";

         console.log(doKeyDown);

          if(doKeyDown.key == "ArrowDown"){
            console.log("ArrowDown");
            

        }else if(doKeyDown.key == "ArrowUp"){   
            console.log("ArrowUp");

        }
        else if(doKeyDown.key == "ArrowLeft"){
         console.log("ArrowLeft");
        }else if(doKeyDown.key == "ArrowRight"){
          console.log("ArrowRight");

        }

// DONT BUILD gEn tryStr if not a..z (65..90), or space32 or Enter or Backspace
  if(doKeyDown.key == "Enter"){
          DrawEntryStr(gEntryStr, 0);

          console.log('] ATTEMPT FETCH STOCK:' + gEntryStr );
 
           // var symstr0=gEntryStr;
           symstr0=gEntryStr;
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
            // Get DataIntraday("crypto");        // should be  Ge tData("intraday","crypto");
            //Ge tDataDaily("crypto");

      }else if( doKeyDown.key=="5"){
         //   G etDataIntraday("fx");
         redrawCurrentChartNew();

      }else if( doKeyDown.key=="6"){
          // Ge tDataDaily("fx");

            // GetAlphaAdvantageDataFX();         // should be  Get Data("fx","crypto");
      }else if( doKeyDown.key=="0"){
           console.log("] gInterval, gAssetType, candlestickObjects[]==");
           console.log(gInterval, gAssetType);
           Dump_candlestickObjects();

      }else if( doKeyDown.key=="2"){
         // gNumCandlestoRenderOO +=gNumCandlestoRenderInc  ;
         // if(gNumCandlestoRenderOO > 1000) gNumCandlestoRenderOO = 1000;

         // console.log("gNumCandlestoRenderOO ; key ==2");
         // console.log(gNumCandlestoRenderOO);
         // Ren derOOCandles(   );  

 

      }else if( doKeyDown.key=="1"){
         // gNumCandlestoRenderOO -=gNumCandlestoRenderInc ;
         // if(gNumCandlestoRenderOO < gNumCandlestoRenderInc) gNumCandlestoRenderOO = 50;

         // console.log("gNumCandlestoRenderOO ; key ==1");
         // console.log(gNumCandlestoRenderOO);
         // Re nderOOCandles(   );  

  
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


// var gTextEntryRect = { x:2050, y:(190-80) , w:800, h:100 };
var gTextEntryRect = { x:2050, y:(128+0) , w:800, h:100 };


function   DrawEntryStr(estr, grad01){
     console.log(']  Drawg gEntryStr== ==>'+estr+'<==');
     console.log(']       gWatchlistStr, gWatchlistEntry==  ==>'+gWatchlistStr+'<==');
     console.log( gWatchlistEntry) ;

     if(estr=="" || estr==" ") return;

      ctx.fillStyle= gBGcol ;//||  'rgba( 0.0, 0.0, 0.0, 0.70 )' ;
     // ctx.fillStyle= colorconvertAlpha(gBG col , 0.40 ) ;
     ctx.fillRect( gTextEntryRect.x, gTextEntryRect.y, gTextEntryRect.w, gTextEntryRect.h );
      ctx.fillStyle = "#afafaf";// ="#22aaee";

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
         ctx.font ="bolder 100px Times New Roman";
         // ctx.fillText( estr, 2050,190 );
         ctx.fillText( estr, gTextEntryRect.x, gTextEntryRect.y + gTextEntryRect.h );
   
}//fn

//////////////////////////////////////////
//
//        1. init_windowArray();
//        2. populateWindows();   // note make wRects[]  vs bRects[]
//
//
let windowArray;
function init_windowArray(){
    windowArray=[];
}
  
//NOT TESTED  
function populateWindows(){
    var i=0,bOff4=4; 

    // create one or two windows to call up i.e. Large full screen, and a floater
// note this was from Buttons
    for(i=0;i<numButtons;i++){
             windowArray.push(        new WindowModal( (bRects[  (i*bOff4) + 0 ]   +   0 ) ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                      gRound,
                                      bRects[  (i*bOff4) + 2 ]  ,
                                      bRects[  (i*bOff4) + 3 ]*1.0 ,
                                       'green',   "#ffee33" ,  'white',   
                                      bTexts[ i ]+bOffStr,
                                       1.0, 1.0, butTextSize, "0", i  )
            ); 
        }//for
}//fn

// var gDrawAlertWindow=0;

//
// future dev
//
//  to be called if needed during event listener
//
// function Ha ndleWindowsEvents(){

// }
function HandleWindows(vrect){

    // means gLasti_Valid is == gLasti VALID to DRAW
    if(gDrawChart==1){              
        DrawChart( gViewportRectInset);
        
    }else  if(gDrawChart==2){   
        DrawChart( gGlobalViewportRect );
        
    }



    let datatype="";  

    if(gDrawLineChart==1){      
        datatype=gObjsLoadedObj[gLasti].datatype;

// bbands sma 
        if(datatype=="atr" ||   datatype=="rsi" || datatype=="obv" ||  
            datatype=="adx"  || datatype=="cci"|| datatype=="stoch" || datatype=="macd"  ){
                DrawLineChart( gObjsLoadedObj[gLasti].objPost , gGlobalViewport5 , 1  );    
        }else{
           // DrawLineChart( gObjsLoadedObj[gLasti].objPost , gGlobalViewportRect , 0  );
           DrawLineChart( gObjsLoadedObj[gLasti].objPost , gGlobalViewportRectRecomputed , 0  );
        }

     }


    // alert last drawn
     if(gDrawAlertWindow==1){      
        GenerateAlertWindow( "legal_notfinadvice" );    
    	}else if(gDrawAlertWindow==2){ 
          GenerateAlertWindow( "legal_tos" );    
    	}


}//fn



function GenerateAlertWindow( wintypestr ){
  // let vrect3 = {x: 970, y: 400, w:  1800,  h: 1300 };
  let vrect3 = {x: startX+ 100, y: 350, w:  1800,  h: 1300 };

		let rc= RandomColorC();
		rc = "#fe2233";

		if(wintypestr =="legal_notfinadvice"){
		   GenerateWindow( vrect3, rc, 0, 100, "DISCLAIMER", "This is an educational tool and", "not investment advice. Seek", "a licensed investment advisor.",
		                        "I ACCEPT", "I DECLINE", "nil"  , 0.55  );
		  }else if(wintypestr =="legal_tos"){
		   GenerateWindow( vrect3, rc, 0, 100, "AGREEMENT", "I Agree to abide by the Terms of", "Service and Policies & Procedures", "of the Algo Investor Application.",
		                       "I AGREE", "I DECLINE", "nil"  , 0.55  );
		}


}//fn


//

//
var gButtonX1 = 0;
var gButtonX2 = 0;
var gButtonY1 = 0;
var gButtonW1 = 0;
var gButtonH1 = 0;
//
//
//  x2 == horiz st2nd button
function store_gButtons(x1,y1,w1,h1,  x2){

  gButtonX1 = x1;
  gButtonY1 = y1;
  gButtonW1 = w1;
  gButtonH1 = h1;

  gButtonX2 = x2;

}//fn
//
// ctx.(x1, y1, x2, y2, {upperLeft: cr,upperRight: 0,lowerLeft: cr,lowerRight:  0}, true, true);
//
function  GenerateWindow( vrect, oulinecol, Xwinclose, fntsz, headstr, str1, str2, str3,
                        okstr, cancelstr, auxstr  , alpha0  ){

  // console.log("] --> G3nerateWindow() ");
   RenderViewportRectFilled( vrect, oulinecol, alpha0); 
 
  let fnt = fntsz.toString() +"px Arial";
  let hdr20=1.25; // header size rel to fntsz
  let rwoff =0;
  let rwoff0 =0;
  let rhoff = 0.20;
  let rhoff1 = 0.360;  // 0.40
  let rW =0;
//hdr + 3 lines

         // ctx.font ="bolder 120px Times New Roman";

       // ctx.font = (fntsz*hdr20).toString() +"px Times New Roman"; // "px Arial";
       ctx.font = (fntsz*hdr20).toString() +"px Arial";
       rW   = ctx.measureText(headstr).width  /2 ;
      rwoff0 = rW;
      drawText( headstr, vrect.x+(0.5*vrect.w)-rwoff0, vrect.y+(rhoff* vrect.h)   , fntsz*hdr20,  "#a9ffab"  );
    

  ctx.font = (fntsz+0).toString() +"px Arial";
  rW   = ctx.measureText(str1).width  /2 ;
  rwoff = rW;
  drawText( str1, vrect.x+(0.5*vrect.w)-rwoff, vrect.y+(rhoff1* vrect.h) +(1*fntsz)  , fntsz+0,  "#cdcdcd"  );
  

  rW   = ctx.measureText(str2).width  /2 ;
  rwoff = rW;
  drawText( str2, vrect.x+(0.5*vrect.w)-rwoff, vrect.y+(rhoff1* vrect.h)  +(2*fntsz) , fntsz+0,  "#cdcdcd"  );
  
  rW   = ctx.measureText(str3).width  /2 ;
  rwoff = rW;
  drawText( str3, vrect.x+(0.5*vrect.w)-rwoff, vrect.y+(rhoff1* vrect.h) +(3*fntsz)  , fntsz+0,  "#cdcdcd"  );

    // BUTTONS GO HERE
    let cr =30;
    let w1 = ( 0.225 * vrect.w);
    let h1 = ( 0.140 * vrect.h);

    let x1 = vrect.x + (0.330*vrect.w) - w1/2 ;
    let x2 = vrect.x + (0.700*vrect.w) - w1/2 ;
    let x3 = vrect.x + (0.500*vrect.w) - w1/2 ;   //unused

    let y1 = vrect.y + (0.75*vrect.h) ;

    store_gButtons(x1, y1, w1, h1,  x2);  // for but intercept


    // console.log("]  G3enerateWindow() bClicked==");
    // console.log(bClicked);

// there should always be an accept/ok button
     ctx.roundRect2(x1, y1, w1, h1, {upperLeft: cr, upperRight: cr,lowerLeft: cr, lowerRight:  cr}, true, true , 10 , "#22cb33" );
    drawText(  okstr, x1+(0.032 *vrect.w),  y1+(0.085*vrect.h),  64,  "#efefef"  );
 

   if(cancelstr!="nil"){
       ctx.roundRect2(x2, y1, w1, h1, {upperLeft: cr, upperRight: cr,lowerLeft: cr, lowerRight:  cr}, true, true , 10 , "#cb3322" );
      drawText(  cancelstr, x2+(0.032 *vrect.w),  y1+(0.085*vrect.h),  64,  "#efefef"  );
     }

    if(auxstr!="nil"){
   	    // ctx.roundRect1(x3, y1, w1, h1, {upperLeft: cr, upperRight: cr,lowerLeft: cr, lowerRight:  cr}, true, true , 10 );
	    // drawText(  auxstr, x3+(0.05*vrect.w),  y1+(0.05*vrect.h),  40,  "#efefef"  );
				;
	   }
     

// //[X]
  if(Xwinclose==1){
     drawText( "[X]", vrect.x+vrect.w-64-8, vrect.y+64+4, 64, oulinecol   ); //"#ffffff");
  }




}//fn



//////////////////////////////////////////
//
//
class WindowModal {
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
draw(i1,xoff,yoff){ 

  }

}//wm class



/** 
 * Draws a rounded rectangle using the current state of the canvas.  
 * If you omit the last three params, it will draw a rectangle  
 * outline with a 5 pixel border radius  
 * @param {Number} x The top left x coordinate 
 * @param {Number} y The top left y coordinate  
 * @param {Number} width The width of the rectangle  
 * @param {Number} height The height of the rectangle 
 * @param {Object} radius All corner radii. Defaults to 0,0,0,0; 
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false. 
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true. 
 
usage :
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.fillStyle = "blue";
c.ro0undRect(50, 100, 50, 100, {upperLeft:10,upperRight:10}, true, true);

// ;

*/


var gButtonPressedBlue  ="#1111dd";    //         ctx.fillStyle="#33ef33";
var gButtonGrey ="#9a9a9a" ;
var gButtonRed  ="#cf3a4a" ;
var gButtonOutlineWeight=2; //1;
var gTextOffCol="#8888bb";

// for smaller generic rounded button with grey - - no line weight
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if(typeof stroke == "undefined"){
        stroke = true;
    }
    if(typeof radius === "object"){
        for (var side in radius){
            cornerRadius[side] = radius[side];
        }

    }

    this.beginPath();

    this.lineWidth   = gButtonOutlineWeight ; 
      if(    gButtonsCloseWindowACTIVE==1  )   this.lineWidth =12;  
    this.strokeStyle = gButtonGrey;
        if(    gButtonsCloseWindowACTIVE==1  )   this.strokeStyle=gButtonRed;

    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();

    if (fill) {
        this.fillStyle=gButtonPressedBlue;
        this.fill();
    }
      if (stroke) {
        this.fillStyle=gButtonGrey;
        this.stroke();
    }
        

    // if(    gBut tonsCloseWindowACTIVE==1  ){ 
    //         this.beginPath();

    //     this.strokeStyle=gButtonRed;
    //     this.moveTo(x + cornerRadius.upperLeft, y);
    //     this.lineTo(x + width - cornerRadius.lowerRight, y+ height);
    //        this.closePath();

    //     }


}//fn

//
//
var gButtonsCloseWindowACTIVE=0;
//
function displayButton(tmpi){
	let retbool = false;
	let tii=(tmpi+intervalSwitch);  // ie 0+48   , // if( (  (tmpi+intervalSwitch) <gButtonsDarkIdx  )  ||  

if( (tii==74 || tii==81 ) && gDrawEarningsAll==0 ) {
    retbool = false;
      return(retbool);
}

    gButtonsCloseWindowACTIVE=0;

 if(  gDrawChart<1 && gDrawLineChart<1  && ( tii== gButtonsCloseWindowIdx ) ){
      retbool = false;
      return(retbool);
  }else if( tii== gButtonsCloseWindowIdx ) {
    gButtonsCloseWindowACTIVE=1;

  }
 


// // dont' display mini accept/decline buttons
  if(  gDrawAlertWindow==1 &&
      ( tii==gButtonsAcceptIdx || tii==gButtonsDeclineIdx )   ){
      retbool = false;
      return(retbool);
  }
  

  if(  gDrawBacktest==0  &&
      ( tii>=gButtonsPosSizeIdx && tii<gButtonsPosSizeIdx+gButtonsPosSizeNumIdx )   ){
      retbool = false;
      return(retbool);
  }
  

	if(  gDrawAlertWindow==0  &&
	    ( tii>=gButtonsAcceptIdx && tii<gButtonsAcceptIdx+2  )   ){
			retbool = false;
			return(retbool);
	}
	
// viewport button, close to Extras
    if( tii==gButtonsViewportIdx  ) retbool = true;



	if(   tii<gButtonsDarkIdx  ||  (    (gDrawIndicatorButtons==1 && ( tii>=gButtonsIndicatorsIdx && tii<gButtonsIndicatorsEndIdx  ))   ||

         (gDrawIndicatorButtons==1 && ( tii>=gButtonsIndicatorsIdx1 && tii<gButtonsIndicatorsEndIdx1  ))  && gDrawCrypto==0  )

      ){
		retbool = true;
	}

    return(retbool);

}//fn

// this one has wt0
//
CanvasRenderingContext2D.prototype.roundRect1 = function (x, y, width, height, radius, fill, stroke, wt0) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if(typeof stroke == "undefined"){
        stroke = true;
    }
    if(typeof radius === "object"){
        for (var side in radius){
            cornerRadius[side] = radius[side];
        }
    }

    this.beginPath();

    this.lineWidth   = wt0 ; 
    this.strokeStyle = gButtonGrey;

    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (fill) {
        this.fillStyle=gButtonPressedBlue;
        this.fill();
    }
      if (stroke) {
        this.fillStyle=gButtonGrey;
        this.stroke();
    }
    
}//fn

// this one has wt0 & col0
//
CanvasRenderingContext2D.prototype.roundRect2 = function (x, y, width, height, radius, fill, stroke, wt0, col0) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if(typeof stroke == "undefined"){
        stroke = true;
    }
    if(typeof radius === "object"){
        for (var side in radius){
            cornerRadius[side] = radius[side];
        }
    }
// this.save();
    this.beginPath();

    this.lineWidth   = wt0 ; 
    this.strokeStyle = gButtonGrey;

    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (fill) {
        this.fillStyle=col0;
        this.fill();
    }
      if (stroke) {
        this.fillStyle=gButtonGrey;
        this.stroke();
    }
   // this.restore(); 
}//fn


//
//
var gLastRoundButtonClicked =-1;
//
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





//
// draw switches
//
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
        if(this.idx!=0 ){
            ctx.fillText( this.jText+"", this.x+ swoffsetx  +gSwitchOffsetX1+xoff, this.y+swoffsety   );
        }else{ //} if( this.idx==0  ){ 
          //                               ie "Switches" 
          if( bClickStatus[0]==0)  ctx.fillText( bTexts[0], this.x+ swoffsetx  +gSwitchOffsetX1+xoff, this.y+swoffsety   );
            else  if( bClickStatus[0]==1) ctx.fillText( "Financials", this.x+ swoffsetx  +gSwitchOffsetX1+xoff, this.y+swoffsety   );  // Financials
            // else  if( bClickStatus[0]==1) ctx.fillText( "Fundamentals", this.x+ swoffsetx  +gSwitchOffsetX1+xoff, this.y+swoffsety   );  // Financials
       
        }
        


    }//fn dr1


// for 1min, 5min .. weekly
  draw3(xoff,yoff, tmpi){ 

          var sc=0.68;
          let swoffsetx=  16 ; //20;
          let swoffsety=  64 ; //64;
     
          let vrect1 ={ x:this.x , y: this.y, w:this.w , h: this.h }
           
          let x1 = vrect1.x;
          let x2 = vrect1.w;
          let y1 = vrect1.y;
          let y2 = vrect1.h; 

          let x1g = gViewportRectInset.x;
          let x2g = gViewportRectInset.w;
          let y1g = gViewportRectInset.y;
          let y2g = gViewportRectInset.h;

          let pi = Math.PI;
          let cr = 25;            // corner radius

          let st_lessmore  =0 ;
          let end_lessmore =1 ;

          let st_interval  =2 ;
          let end_interval =8 ;
          let st_bonds    =13 ;
          let end_bonds   =25; //22 ;

          let closeWindow = 34;

          let  tmpii = tmpi + intervalSwitch;   // +48


    let outlinecol = gButtonGrey; //"#9a9a9a" ; // = "#dddeff" ;

//   from draw1()
    if(bClickStatus[this.idx]==0){
              // ctx.fillStyle="#eeeeff";  
             ctx.fillStyle=  outlinecol  ;  //"#9a9a9a";   //"#a8a8a8";  

    }else if(bClickStatus[this.idx]==2){
              ctx.fillStyle=  "#effc22";

    }else{   // assume ==1  
                                  ctx.fillStyle=gButtonPressedBlue ;  //"#1111dd";   // "#22ea44";   //           ctx.fillStyle="#33ef33";
                                  
                                  // gLastRoundButtonClicked=tmpi;
                                  // console.log("] gLastRoundButtonClicked== ");
                                  // console.log( gLastRoundButtonClicked);

                                  // ctx.fillRect(vrect1.x, vrect1.y , vrect1.w, vrect1.h);
                                  // ctx.roundRect(x1, y1, x2, y2, {upperLeft: cr,upperRight: cr,lowerLeft: cr,lowerRight: cr}, true, true);


                        // remember -48 has already calc'd upon fn entry...
                                if(tmpi==st_interval || tmpi==st_bonds || tmpi==st_lessmore ){
                                      ctx.roundRect(x1, y1, x2, y2, {upperLeft: cr,upperRight: 0,lowerLeft: cr,lowerRight:  0}, true, true);

                                }else if(  (tmpi>st_interval && tmpi<end_interval )  ||  ( tmpi>st_bonds && tmpi<end_bonds )){
                                       ctx.roundRect(x1, y1, x2, y2, {upperLeft: 0,upperRight: 0,lowerLeft: 0,lowerRight: 0}, true, true);

                                    }else if( tmpi==end_interval || tmpi==end_bonds || tmpi==end_lessmore ) {
                                       ctx.roundRect(x1, y1, x2, y2, {upperLeft: 0,upperRight: cr,lowerLeft: 0,lowerRight: cr}, true, true);

                                 
                                       }else {

                                          // round rects only
                                          if( displayButton(tmpi)==true ){
                                               ctx.roundRect(x1, y1, x2, y2, {upperLeft: cr,upperRight: cr,lowerLeft: cr,lowerRight: cr}, true, true);
                                          }


                                        }//else


          ctx.fillStyle="#ffffff";   // "#22ea44";

    }//e1se

      
          // Draw OutlineRect(vrect1, outlinecol , 2);


// draw text
	    	let txt =this.jText;
        // ctx.fillStyle="#ffffff";
        // ctx.font ="38px Arial";
        let fsz =46;


        ctx.font =getFontString( fsz, "Arial" );


// ie [ X ] CLOSE Btn
        displayButton(tmpi);  // get gButto nsCloseWindowACTIVE
        if(  gButtonsCloseWindowACTIVE==1 ){
            fsz=64;
             ctx.fillStyle="#ef2233";
            // ctx.font='bolder 64px Arial';
        }
       // }else  ctx.font =getFontString( fsz, "Arial" );

        let rW  = ctx.measureText(txt).width;
        let x00 =  this.x    + ( (this.w*0.50)   - (rW *0.50) );

//  HERE***
        let locyoff = mf( ( y10b1*0.33 ) + ( fsz*0.50 ) );

        if( displayButton(tmpi)==true ){
                    if(  gButtonsCloseWindowACTIVE==1 ){
                             ctx.fillText( txt,  gCornerPtX-mf(0.75*x2)  , gCornerPtY-12+   locyoff  );
                     }else   ctx.fillText( txt,  x00 , this.y+   locyoff  );
            }


   /*
// just for Ref
let st_interval  =0 ;
let end_interval =7 ;
let st_bonds    =13 ;
let end_bonds   =22 ;
*/

//  FILL
//  TEXT
//  DRAWS OUTLINE AROUND BUTTON
//
    if(tmpi==st_interval || tmpi==st_bonds){
          ctx.roundRect(x1, y1, x2, y2, {upperLeft: cr,upperRight: 0,lowerLeft: cr,lowerRight:  0}, false, true);

      }else if(  (tmpi>st_interval && tmpi<end_interval )  ||  ( tmpi>st_bonds && tmpi<end_bonds )){
          ctx.roundRect(x1, y1, x2, y2, {upperLeft: 0,upperRight: 0,lowerLeft: 0,lowerRight: 0}, false, true);

      }else if( tmpi==end_interval || tmpi==end_bonds ) {
          ctx.roundRect(x1, y1, x2, y2, {upperLeft: 0,upperRight: cr,lowerLeft: 0,lowerRight: cr}, false, true);

      }else{
                	// round rects only
                if( displayButton(tmpi)==true ){

                      if( gButtonsCloseWindowACTIVE==1 ){
                        //cornerw
                        // ctx.roundRect(gCornerPtX-x2-6 , gCornerPtY-6, x2, y2, {upperLeft: cr,upperRight: cr,lowerLeft: cr,lowerRight: cr}, false, true);
                        ctx.roundRect(gCornerPtX-gCornerPtW , gCornerPtY-6, x2, y2, {upperLeft: cr,upperRight: cr,lowerLeft: cr,lowerRight: cr}, false, true);
                  
                      }else  ctx.roundRect(x1, y1, x2, y2, {upperLeft: cr,upperRight: cr,lowerLeft: cr,lowerRight: cr}, false, true);
                  
                }
 





      }


 

          
    }//drw3






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
var gGET_OLD_SymbolStr="";

function    fetchNewSymbol( symstr1 ){ 
    gGET_OLD_SymbolStr= gGET_SymbolStr ;
     gGET_SymbolStr= symstr1;  
// here must do crypto or not
     initRenderVars(); 
     drawButtons();
     
     // i.e if(gAssetType=="crypto"){}

//     GetAlphaAdvantageData("stocks","day");
       GetData( "av", "stocks", gGET_SymbolStr, "stocks", "day", "GetAlphaAdvantageData"  );

       gCrawlX =0;

}//fn


//
//
//
function redrawCurrentChartNew(   ){  
    let assettype1 = gAssetType.toLowerCase();

    // console.log("] r3drawCurrentChartNew( ): gAss3tType, gCrypt0DrawState==");
    // console.log(assettype1);
    // console.log(gCryptoDrawState);

    // if(assettype1== "stocks"  || assettype1== "crypto"){
    //     gAssetType= assettype1;
    //     redrawCurrentChart(gAssetType, gGl obalViewportRect );
    // }


// reFACTOR TO THIS...
// //
//     if(  (assettype1== "stocks"  &&  gDrawCrypto==0)  ||  (assettype1== "crypto")  ){ 
//             gAssetType= assettype1;  // reassure lowercase thruout system
//             redrawCurrentChart(gAssetType, gGlo balViewportRect );
//     }



    if(assettype1== "stocks"  &&  gDrawCrypto==0 ){
        gAssetType= assettype1;
        redrawCurrentChart(gAssetType, gGlobalViewportRect );

    }else if(assettype1== "crypto"){
        gAssetType= assettype1;
        redrawCurrentChart(gAssetType, gGlobalViewportRect );   //   not needed to get data all over again!   G3tCryptoData( gIntervalCrypto );   // & was r3drawCurrentChartCrypto
        // if(gCryp toDrawState==4) redrawCurrentChart(gAssetType, gGl obalViewportRect );   //   not needed to get data all over again!   Ge3tCryptoData( gIntervalCrypto );   // & was redrawCurrentChartCrypto

    }else if(assettype1== "fx"){
        ;
    }

}//fn

// ORIG
//
//
function redrawCurrentChart(assettype, vrect ){   
//requestAnimationFrame(redrawCu rrentChart);    //     requestAnimationFrame(animateParticles)

    initRenderVars1(gBGcol);  
//
//   we may need to set the crypto draw state for get Daily Data
//
     if( gCryptoDrawState == 4  &&  assettype=="crypto" ){

         RenderOOCandles(  gIntervalCrypto  ); 
         setCryptoDrawState(4);
 
      }else if(assettype=="stocks" ){ 

         RenderAllData_Current();
       
      }

     getAndPrintLocalDateTime();
     HandleWindows(vrect);

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