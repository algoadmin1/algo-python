////////////////////////////////////////////
//
//
//          candlesticks.js - by John Botti for aiTrader.me / Jackabee Inc Copyright (C) 2010-2023	
//
//
////////////////////////////////////////////
 
            // var canvasGlobal = document.getElementById("myCanvas");
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var canvasWidth  = c.width;
            var canvasHeight = c.height;
            var gInitScaleX =  0.75; //0.50;
            var gInitScaleY =  0.75; //0.50;

             var gVersionStr = "v12.76";

            var copyrightStr= "Copyright (c) 2010-2023 by algoInvestor LLC and BlackOps.com" ;
 			      const apikeyStr0 = '&apikey=';
            const apikeyStrMASTER =apikeyStr0+ '4A7CD1CE46F15671A';    
            var gFillStr = '-1.1';

            var gLogs = 0;
            var gTickerExists = 1;	// for historical data
            var gTickerExistsAV = 1;  // for alpha advantage
            
let gRenderInsetFlag =0;
let gIntervalCrypto = "day";
  let gDontCare="dontcare";
  var gObjsLoadedWatchEarnIDX = 31 ;
let gObjsLoadedEarningsAll = 9;

let gEarningsAllPageCount = 0;            // << >> on earnings
let gEarningsAllPageCountMax = 1000;

let g_Rdate  ="1700-01-01";

            var g_startY =  canvasHeight * (0.10 *0.25 );

            var historicalNumDaysOO =  300;  

            var historicalNumDays =  6 *20;   // 120 + 100
      			var gSplitDetected = 0;				// must init on each pass

      			var gClock =0; //0;  // =1 ;
            var gFirstTimeThru=1;

            var gMaxCandles=999;

           var gUncontestedBuySignal =0; 

//uiux.js usage 
			     var gPredict=0;

// used for switches
            var gLineOnClose=0;
			      var gDrawP3Pivots=2;
            var gDrawWindowed=0;
            var gDrawGaps=1;
            var gDrawSupRes=1;
            var gDrawBuySell=1;

			      var gDrawSpreads=0;
            var gDrawGuage=0;

         			   var gDrawTraderText=1;
            var gDrawExtras=0;

// note this should be init'd w/ signals
            var gDrawMinorCrossover=1;
            var gDrawMinorCrossoverBuySignal=0;
            var gDrawBacktest=0;
     			       var gAllOnOff=0;
            var gDrawDojis=1;
            var gDrawMvgAvgs=1;
            var gDrawCrypto=0;
// used for switches

			var gProperAssetName = "nil";
			var gProperAssetDesc ="";
			var gProperAssetDetail ="";
      let gClosedUpDnStr ="";
      let gClosedUpDnStr1 ="";
      let gLastCandleColor ="";


  let    gLastXPos  = 500; 
   let    gLastYPos = 500;
    let      gLastYoff= -20;
    let      gLastXoff = 20;


   let gSYMBOLCloseStrX =  canvasWidth* 0.80;

	let gFailAsyncData = 0;
	let gStatus = ""; //status;

	var gEarningsCorpStr = "";



            var gDrawOverview=1;  
            var gCueSFX_Welcome = 1;

var gCandleXStartOO = 0; 
var gCandleXWidthOO = 5; 


var gWedgeTrailingCandles=20;

var gCandle_startXOff=200;  // subtractor from 900
var gStartChartX = 0;  // subtractor from 900
var gStartChartTextX=400;

var gStartCandlestoRenderOO =0;     // set auto
var gCandleXinBetweenWidthOO=1;
var gNumCandlestoRenderOO =400;      
var gGreetings=0; 

var gNumCandlestoRenderInc = 20 ;

 
var gGET_SymbolCryptoStr ="ETH";
var gGET_SymbolCryptoNameStr="Ethereum";
var gFetchCandlesStatus="nil";

var gDayinQtr = "";
var gDayinYr  = "";
var gCurrency="USD";
var gCurrencyStr="$";
var gCurrency0="nil";

var gInterval ="60min"; //"15min"; //"day";     //= day, 1min,5min, 10min, 15min

let jb_orange ="#f8ad25";
let jb_green  ="#05fa98";
let jb_red    ="#ff0024";
let jb_purple ="#a506f9";
let jb_blue   ="#040efb";
let jb_yellow ="#f5ff00";
let jb_yellow1 ="#e5da22";
let jb_yellow2 ="#c3bc11";

// var gSendAlgoEmail=0;

var gCandlesLenAdder =0;
var gCandlesLenSubtractor=0;
var gDrawFutureOppositeChart=0;

var gCandleRedCol= "#DD0000";
var gCandleGreenCol ="#00CC00";

var gCryptoDrawState =0;
// var gComputeAndRenderCandlesStatus=0;


//  Algo Trading
var gStartCash = 20000;

var gPositionSize=100;

var gPositionCash = 0;
var gPositionCash1 = 0;
var gPositionShares = 0;
var gBuyState = 0;
var gSellState = 0;

var gPosition2Mult=2;
var gPositionInit3=0;
var  gFirstBuyPrice=0;
var gFirstDate="YYYY-MM-DD";

var gBuyEpsilon = 0.02 ;
var gPreviousBuyPrice=-1;
var gAlgoTradeStr="";
var gLastUDate ="2092-12-13";
var gAlgoStop=0;

//
//  DeleteThis comment
//  5B4L3BMV41G6BCDH,3,1,2,3,4,5,6,7outNewShooter,2021-03-31,itrpr9.3_2021_2022
//
// SAMPLE CANDLESTICK DATA stnd ARRAY
//var candlesOffset1 = 8;  // UNUSED
//
//   ie
//
// var candlesAAPL = [
//
//                   '167.64','168.50','165.28','168.11','41393373','2017-11-02','167.48','165.50','Thu','AAPL','10','11','12','13','14','15',
//                   '174.00','174.26','171.12','172.50','59398631','2017-11-03','167.30','167.40','Fri','AAPL','10','11','12','13','14','15',
//                   '172.37','174.99','171.72','174.25','35026306','2017-11-06','172.63','167.77','Mon','AAPL','10','11','12','13','14','15',
//
           let apikeyStr08 = '&apikey=' + '4LED330DA9FHW23V';    
           let apikeyStr   = '&apikey=' + '5B4L3BMV41G6BCDH';    
//4A7CD1CE46F15671A
//
//	var  gGreenGapUp = "#33ffff", gPinkGapDown = "#ff33cc";  
//

		var todoStr =" "; // = "TO DO: weeklyChart, loopThruStocks, latestVIX_10Yr minMaxTimes1.25, nextMonthPivots, loginRegister, avantageAPI, printAvgVolume, ";

/*

TO DO LIST:
===========
2022-05-07:

html bigchart (current) vs smaller /fire-like chart
html bigchart should scale/snap automatically on mobile phone

SFX install click

buttons_time interval  move to bottom of screen
BUG_interval buttons fixed

15MIN - 60MIN intraday chart for stocks with supp/resistance - new OO path?

WEEKLY / MONTHLY chart 

earnings calendar button  - import to array, sort, search for earningsStocks in next month, form earningsCloseWatchList


_runPnL print watchlist
BUG_runPnL investigate

BUG too slow redraw

BUG can still click on crypto button

BUG if nil stock name (none found), it screws up subsequent ones
BUG_PnL/Algo un countered buy/sell

inevitable refactoring OO of stock candles

BUG monthly support 

BUG run PnL

BUG run algoInvestor!
** expand aitrader_vars to FUND DATA

BUG DOUBLE CANDLESTICK IN FROM jb's database

BUG

BUG




















2021:

  - UI/UX Cleanup

  - RVOL
  - VOL / PRICE DIVERGE {hooks}

  - ES6 OO  CandleObj.push() etc, implement for indicator expansion
  - 
  - 
  - 
  - 


2020:
- re-write stock trending p3/p into candleArray[ idx + P3 ]

                    if( Number( candleArray[ idx + P3 ] )   <  Number( candleArray[idx+P] )  ){
                        stockTrending = "UP";
                        gIndicators[  gAIstockTrending  ]  = "99" ;

 -- print avg volume
--  VWAP field
-- corp name string [ in dev ]
-- 

-- 1st audio sfx

-- 1st png up


-- buy/sell signal logic - keep sell signal in sights for 10 trading days??
-- GAP LOGIC

-- MONTHLY R3 CORRECT, NOT R2-R1,P, S1-S3 [bug ]
-- verify gap #'s - bug


-- date array [] with holidays  [ted L]

--scrape   AlphaVantage to grab dji, s&p500 futures data



-- loop thru stock names [ CLAIM FIXED ]
-- aiTrader SCAN== CLR, run next stock, etc. [ CLAIM FIXED ]
-- clean up axes ? [ CLAIM FIXED ]
--xignite, AlphaVantage [ CLAIM FIXED ]
--login to mysql [CLAIM FIXED]

-- graph rsi data on #14
-- stock name array []

-- *** EARNINGS ARRAY !!!!!
-- earnings meter


--'NEXT' Month's S3-R3's
--true 52-week hi/lo

-- nearStr not printing!!!

-- the bigger the sell / buy %, the bigger the FONT !?? higher candle # == bigger ARROW
-- render volume bars 1st, behind candle data, now it is overlapping / obfuscating

 ---- with session ids
 ---- with ajax sweep up keystokes


-verify monthly s1/r2's - 

//JMB 2020-10-09

//WCB 2020-09-25
API Parameters
Required: function
The time series of your choice. In this case, function=TIME_SERIES_DAILY_ADJUSTED

Required: symbol
The name of the equity of your choice. For example: symbol=IBM
Optional: outputsize
By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points; full returns the full-length time series of 20+ years of historical data. The "compact" option is recommended if you would like to reduce the data size of each API call.

Optional: datatype
By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the daily time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

Required: apikey
Your premium API key for 30 API calls per minute is: old =XAE6386LR9QZG0HU  // new 5B4L3BMV41G6BCDH


//END TODO


//get canvas/context
const canvas = document.getElementById("myCanvas")
const context = canvas.getContext("2d")

//create your shape data in a Path2D object
const path = new Path2D()
path.rect(250, 350, 200, 100)
path.rect(25,72,32,32)
path.closePath()

//draw your shape data to the context
context.fillStyle = "#FFFFFF"
context.fillStyle = "rgba(225,225,225,0.5)"
context.fill(path)
context.lineWidth = 2
context.strokeStyle = "#000000"
context.stroke(path)

function getXY(canvas, event){ //adjust mouse click to canvas coordinates
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return {x:x, y:y}
}

document.addEventListener("click",  function (e) {
  const XY = getXY(canvas, e)
  //use the shape data to determine if there is a collision
  if(context.isPointInPath(path, XY.x, XY.y)) {
    // Do Something with the click
    alert("clicked in rectangle")
  }
}, false)
 
*/


var candlesOffset = 16; // 10;   // 16- word data size ie:
//                    '1938.39','1946.68','1927.59','1932.29','342509','2017-10-24','1941.94','1939.79','Tue','BKNG','10','11','12','13','14','15',

//alpha advantage: 100 data points * 16
var numCandlesFromAlpha = 100;
 //var CandlesFromAlpha = new Array(numCandlesFromAlpha * candlesOffset).fill('-1.1');    
 var CandlesFromAlpha = new Array(numCandlesFromAlpha * candlesOffset).fill(gFillStr);   

//native: 252 * 16 * num_years
//var CandlesFromHistorical = new Array(252*16*21).fill('0.54');

//const historicalNumDays = 2 * 252;
//const historicalNumDays = 152;
//const historicalSize = historicalNumDays * 16;   // years * trading days * 16
const historicalSize = historicalNumDays * candlesOffset;   // years * trading days * 16

var CandlesFromHistorical = new Array(historicalSize).fill(gFillStr);

// var CandlesMerged = new Array(historicalSize + (numCandlesFromAlpha * candlesOffset) ).fill('0.33');
var CandlesMerged = new Array(historicalSize + (numCandlesFromAlpha * candlesOffset) ).fill(gFillStr);
//
//
// OPEN  HIGH LOW CLOSE VOL  DATE   PIVT PIVT3day  DAY     SYMBOL   BUY SELL
var O=0, H=1, L=2, C=3, V=4, DATE=5, P=6, P3=7,   MTWTF=8, SYMB=9 , BUYSELL=9 , LCDHCD=10, HILO=11, VOLRANGE=12, MVAVG50=12, MVAVG200=13, MVAVG100=14, CORPNAME=15 , SPLIT_COEF=15 ;    
var volLow = 100000000000, volHigh=-1, gPctNear=0.015;

                



  
var candlesLen = 32 ;   // dummy candles array len 
 
var candlesPriceMax  = 0, candlesPriceBoundsMax=0, candlesPriceRange=0;

var candlesPriceMin  = 1000000, candlesPriceBoundsMin=1000000 ;
var candles52WeekHigh, candles52WeekLow;
            
var titleStr = "iTraderPro.co" ;





var candleMonthCnt=0, thisMonthX=0, lastMonthX=0;
var monthP = 0, monthP3=0;
var monthS1= 0, monthS2=0, monthS3=0, monthS4=0, monthR1=0, monthR2=0, monthR3=0, monthR4=0;
            
//            var arrowgreenColor = "#2222EE", arrowredColor = "#FF8000";
var arrowgreenColor = "#009900", arrowredColor = "#990000", arrowgreenColor1 = "#85e085", arrowredColor1 = "#ff9999", arrowgreenColor2 = "#adebad", arrowredColor2 = "#ffb3b3" ;
var gPivotColor = "#3333EE", gR1Color = "#EE3333", gS1Color = "#33EE33", gR2Color = "#AA1111", gS2Color = "#11AA11" ;
// var color50dayMvAvg  ="#3333ff",    color200dayMvAvg  = "#cc00ff",    color100dayMvAvg  = "#cccccc";
var color50dayMvAvg  ="#ee3333",    color200dayMvAvg  =jb_yellow,    color100dayMvAvg  = "#ee9933"; //jb_orange; //"#cccccc";


var g52WeekHIGHColor = "#ffaf0f", g52WeekLOWColor = "#7bff09";


var g50DayMovingAvg=0 , g200DayMovingAvg = 0 , g100DayMovingAvg = 0 ;  //             var candles52WeekHigh, candles52WeekLow;
var gDateStrLast ="";


var BuySignal = 0;
var SellSignal=0;
var gBThresh = 3;
//var SellThresh  =3 ;

var gSThresh = 3;

var gStockNum =0;


var monthsArr = [ 'zeroDummy', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' , '13thDummy'  ];
                 
var rel1 = 0.05;

//  var PhPdata = <?php echo json_encode("johnb is styring and nuimber float....", JSON_HEX_TAG); ?>; //Don't forget the extra semicolon!
var PhPdata = ""; //<?php echo "johnb is styring and nuimber float....";  ?>; //Don't forget the extra semicolon!

var BuySigCnt = 0, SellSigCnt =0;
var longShort = 0; // -1 for short, 1 for long, 0 n/a
var longShortPrior =0;  // keep track of previous state
var CrossOverMin = 3;

var currentMonth = "none";
var lastMonth = "nil";

// candlestick stuff

var Ytop    = 0 ; //star tY;
var Ybottom = 0 ;  // canvasHeight * 0.975 ;
var YRange  = 0;

//          <canvas id="myCanvas" width="950" height="540" style="border:1px solid #d3d3d3;">

//  initial condition variables
var candleWidth  =9; // =11;  //  =15;  // =20;
var candleOffset = candleWidth * 0.50;
var XendOfCandles = 0;
var gLastClose =0;

// startX in Canvas = pixels from left of screen to start drawing candles etc...
var startX       = 900;  // =500;    900 assume guage===1
var dateStartStr ="2018-01-01" , dateEndStr = "2018-12-31";

var candleXnext  = startX - gCandle_startXOff;  // note this gets updated
var gStartChartX =startX - gCandle_startXOff; 

//var PivotBlueColor = "#1A75FF";
var PivotBlueColor = "#1ac6ff"; //"#002db3";   ///"#80ccff";
var PivotGoldColor = "#ffcc00";


//   TEXT
//   var iStr = "TSLA Stock"+ canvasWidth.toString() + "," + canvasHeight.toString();
var iStr =  "w,h="+canvasWidth.toString() + "," + canvasHeight.toString() +", numCandles="+ candlesLen.toString();
var symbolStr = "" ;   //candlesXXXX[0+SYMB];

var stockTrending = "";
var gStockListIndex = -1;  // init to -1

var gTodaysDate="", gNEARSTR="";


var gEarningsGraphY = canvasHeight * 0.0125 ;
var gEarningsGraphW=3000, gEarningsGraphH = 40, gDaysDataStr="nil_99";


//let arrays[]
let buttonObjects;     // of class buttons 
let candlestickObjects;     // of class CandlestickObj{
let candlestickWeeklyObjects;   // weekly candles
 

//let arrays[]
let vol10day;               // first one array[] 10 push-pop, then take avg of all 10 anytime for 10day vol avg
var gVol10dayAvg=-2;

let vol10dayOO;

let    p3day;

let    mvg50day;
let    mvg100day;
let    mvg200day;
let    mvg500day;
let    mvg1000day;

let    WedgeNdayHighs;
let    WedgeNdayLows;


var     p3dayAvg=-1;

var     mvg50dayAvg=-1;
var     mvg100dayAvg=-1;
var     mvg200dayAvg=-1;
var     mvg500dayAvg=-1;
var     mvg1000dayAvg=-1;

var    WedgeNdayHigh=-1;
var    WedgeNdayLow=-1;

 
var     high52week =-1;
var     low52week  =100000000;  // should be lower than 100M
var     highAllTime=-1;
var     lowAllTime =100000000;  // should be lower than 100M
var range52week=0;
var rangeAllTime=0;

var     high52weekIdx =-1;
var     low52weekIdx  =-1;  // should be lower than 100M
var     highAllTimeIdx=-1;
var     lowAllTimeIdx =-1;  // should be lower than 100M

var  gCryptoFlag=0;
var  gGET_SymbolCryptoStr0="" ;
var  numDashPos=-1;
 


// for new intraday, weekly monthly stock & compact (100) & full (1000) 
let objCandleDataBig = [];

let gObjEarningsData     = [];
let gObjEarningsCorpData = [];
let gObjCandleDataSmall  = [];

let gObjQuoteData        = [];
let gObjCashflowData     = [];

let gObjsLoadedObj = [];   
let  gLasti=-1;
let gLastSymbolStr_ObjLoaded="000";       // depricate

let gEarningsAllIdx=9;

///
///
/////////////////////////////////////////////////// DO NOT CHANGE ORDER
///
const gObjsLoadedObjInit = [  
        "monthly", "weekly" , "daily", 
        "60min",  "30min",  "15min",
        "10min", "5min", "1min",
// note keep earningsall at #9
        "earningsall", "earnings", "quote" , "overview",

        "3month", "2year", "5year", "7year", "10year", "30year",

        "fed", "gdp", "cpi", "inflation",
        "unemployment", "retailsales", "consumer",

        "cashflow",
        "rsi",  "stoch", "obv", "vwap", 

        "watchlistearnings", 

        "EOF"
      ];
///
/////////////////////////////////////////////////// DO NOT CHANGE ORDER
//
//

// ie global default inset rect is xL 5% in, xR 20% in, yTop 5%down yBottom 15% up
var    gInsetPctRect = { x1: 0.05, y1: 0.05,  w1: 0.90, h1: 0.90 }  ;
var    gDrawingRect  = { x:0,y:0,w:0,h:0 } ;

var     sfx_recharge1, sfx_serverPreAccess, sfx_serverComplete, sfx_serverComplete2;

var     sfx_serverAhhh, sfx_serverSwitch0, sfx_serverSwitch1, sfx_serverSwitch2;
var     sfx_serverFailed, sfx_serverReturnCrypto;  ;
var     sfx_serverGreetings0,sfx_serverGreetings1,sfx_serverGreetings2,sfx_serverGreetings3,sfx_serverGreetings4;


sfx_recharge1     = new sound("mp3/recharge1.mp3");    // sfx_recharge1.play()
sfx_serverPreAccess   = new sound("mp3/sting_server5.mp3"); 
sfx_serverComplete    = new sound("mp3/sting_server3.mp3");  

sfx_serverComplete2    = new sound("mp3/welcomeback.mp3"); //
sfx_serverGreeting0   = new sound("mp3/greetings.mp3"); 
sfx_serverGreeting1   = new sound("mp3/ShallITurnOnTradeHunter.mp3"); 
sfx_serverGreeting2   = new sound("mp3/LookingToMakeSomeMoney.mp3"); 
sfx_serverGreeting3   = new sound("mp3/WouldYouLikeToRunAI.mp3"); 
sfx_serverGreeting4   = new sound("mp3/VolatilityIsRising.mp3"); 
 

sfx_serverAhhh      = new sound("mp3/switch-3.mp3");  // stocks
sfx_serverSwitch0      = new sound("mp3/switch-9.mp3");   
sfx_serverSwitch1      = new sound("mp3/switch-3.mp3");   
sfx_serverSwitch2      = new sound("mp3/switch-7.mp3");   

sfx_serverFailed =    new sound("mp3/cosmicsting.mp3");

sfx_serverReturnCrypto        = new sound("mp3/sting_server2.mp3");



// fi nancilData Global Objects
let findata_TREASURYObj=[];
let findata_FEDObj=[];
let findata_GDPObj=[];
let findata_CPIObj=[];

let findata_RSIObj=[];
let findata_STOCHObj=[];
let findata_OBVObj=[];
let findata_VWAPObj=[];       // intraday only

let findata_CASHFLOWObj=[];        









////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////  START OF MAIN CODE
////////////////////////////////////////////////////////////

      
     
            console.log ("] START of candlesticks.js for ==>" + gGET_SymbolStr+"<==,intrv==, noDashPos:"+gInterval+ numDashPos);

            PreCheckUserInputTextForCrypto();
            console.log ("] POST pre-CHECK of candlesticks.js for gGET_SymbolCryptoStr0, gCurrency, assettype: " + gGET_SymbolCryptoStr0, gCurrency , gAssetType);

            GetCurrentDate();				// sets gTodaysDate  2020-03-17 format
            initOneTimeMethods();
       			initPixelArray();

            // INITIALIZATION IS DONE, time to enter: EnterApplicationL00p()


//  STOCK: gAIcatIndicatorStrLONG1_JSON==

            EnterApplicationLoop();      //  used to be GetAlphaAdvantageDat a();  // calls Rende rAllData()


                       // if(gFailAsyncData==1){
                       //        console.log("] ** AFTER EnterApplicationL00p() FAILED CALL, NOW Forcing sym=GOOGL, day.  Unknown SYMBOL:");
                       //         gGET_SymbolStr="GOOGL";   // should == new var ie  gLastWorkingSymbol ?
                       //        console.log("] gGET_SymbolStr , gLastWorkingSymbol == " );
                       //        console.log(gGET_SymbolStr , gLastWorkingSymbol );
                       //         //sfx_serverFailed.play();
                       //         // call it
                       //        GetAlphaAdvantageData("stocks","day");

                       //  }else  if(gFailAsyncData==0){
                       //        console.log("] AFTER EnterApplicationL00p() CALL, SUCCESS !!"); 

                       //  }


            console.log ("] END of candlesticks.js, AFTER enterAppLoop call");

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////  END OF MAIN CODE
////////////////////////////////////////////////////////////








//////
//
// 			RenderClock
//
// 		Note: needs to be on 1st level not w/in a fn

      var radiusClock = 85; //canvas.height / 2;
      var radiusClock1 = 160; //canvas.height / 2; 

if(gClock==1){
      ctx.save();
        ctx.moveTo(200,200);

          ctx.translate(radiusClock1*3.80, radiusClock1*0.80 );
          radiusClock1 = radiusClock1 * 0.90; //  0.90
          setInterval(drawClockNYC, 1000);

          ctx.fillStyle = "#ffffff";   //gBlueBGColorStr; //"#3333FF";
          ctx.font = "26px Arial";

          ctx.fillText(  "NYC", -70,  canvasHeight * 0.06    );
    ctx.restore();
      
}

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////  END OF MAIN CODE
  ////////////////////////////////////////////////////////////



let     gDate_datefullstr;
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

// for time, ie 7:0:23 --> 07:00:23
function AddLeadingZero( str){

  if(str.length==1) return ("0"+str);
  else return ( str);

}
function getLocalTime(){
  var d = new Date();
  gDate_hour    = d.getHours(); 
  gDate_minute  = d.getMinutes(); 
  gDate_seconds = d.getSeconds();

  // new
  let dhr = AddLeadingZero(    gDate_hour.toString() );
  let dmin= AddLeadingZero(  gDate_minute.toString() );
  let dsec= AddLeadingZero( gDate_seconds.toString() );

  gDate_timefullstr = dhr +":"+dmin +":"+ dsec;
  // gDate_timefullstr = gDate_hour.toString()+":"+gDate_minute.toString() +":"+ gDate_seconds.toString();
}

function getLocalDate(){
  var d = new Date();
  gDate_year   = d.getFullYear();
  gDate_month  = d.getMonth();

  if(gDate_month<0 || gDate_month>11 ) gDate_month=0;
  gDate_monthStr = months[ gDate_month ] ;

  gDate_date   = d.getDate();
  gDate_day    = d.getDay();
  if(gDate_day<0 || gDate_day>6 ) gDate_day=0;
  gDate_dayStr = daysofweek[ gDate_day] ;


  let dmo = AddLeadingZero(    (gDate_month+1).toString() );
  let dday= AddLeadingZero(    gDate_date.toString() );


  gDate_datefullstr = gDate_dayStr+", "+gDate_monthStr+" " + gDate_date.toString()+" " +gDate_year.toString()+"-"+dmo  +"-"+dday ;
  // gDate_datefullstr = gDate_monthStr+" " +gDate_year.toString()+"-"+dmo  +"-"+dday+"  "+gDate_dayStr ;
  // gDate_datefullstr = gDate_monthStr+" " +gDate_year.toString()+"-"+(gDate_month+1).toString() +"-"+gDate_date.toString()+"  "+gDate_dayStr ;
}

let gDateTimeRect =  {x: 10 , y:40 , w: (canvasGlobal.width*0.065) , h: (canvasGlobal.height * 0.025) }


function printLocalDateTime( vrect , fsz){ // gDateTimeRect
  // console.log("] gDate_datefullstr, gDate_timefullstr ==");
  // console.log( gDate_datefullstr, gDate_timefullstr );
  
   let rc = RandomColorC();
   let dtstr = gDate_datefullstr+" "+ gDate_timefullstr;

    // ctx.fillStyle = 'rgba( 20.0, 20.0, 20.0,  0.80 )' ;   // 1.0 )'; 
    ctx.fillStyle = "#ee2222"; 
     ctx.fillRect( vrect.x , vrect.y ,  vrect.w, fsz +4 ); //vrect.h );
 

    ctx.fillStyle = "#11ffdd" ;//rc ;   //"#03fcfc";   
    ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( dtstr , vrect.x , vrect.y+fsz  );
    let rWidth = ctx.measureText(dtstr).width+ 0;

    ctx.fillStyle = "#2222ee"; 
    // ctx.fillRect( vrect.x , vrect.y ,  vrect.w, vrect.h );
    ctx.fillRect( vrect.x , vrect.y-2 ,  rWidth, fsz +4+2 ); //vrect.h );
  
    ctx.fillStyle = "#11ffdd"; //rc;   //"#03fcfc";   
    ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( dtstr , vrect.x , vrect.y+fsz-2-2  );
   



/*

    ctx.fillStyle = "#03fcfc";  //'rgba( 30.0, 30.0, 250.0,  1.0)' ;
    ctx.font = "bolder "+"124px Arial";
    ctx.fillText( textstr2 , txtx , txty-112 -40 );

 rWidth = ctx.measureText(textstr2).width+ 48;
 
    ctx.fillStyle = 'rgba( 80.0, 90.0, 120.0,  0.35 )' ;
    ctx.fillRect( txtx - 32, txty-104-142-32-8-0,  rWidth, (8+142+104+8 + 16+130 ));

*/

}

function getLocalDateTime(){
  
  getLocalDate();
  getLocalTime();

   printLocalDateTime( gDateTimeRect , 38 );   


}


// var dailyAlerts = [
//         // sun
//         //  dummy
//         "Dumbday", "Saturday", 

//         "1442",  "firstreversal",

//         "1440",  "secondreversal",

//         "Monday", 

//         "1435",

//         "Tuesday", 
        
//         "Wednesday",

//         "Thursday",

//         "Friday",
         

//         // sat
//         //  dummy
//         ];
// var dailyAlertsLen = dailyAlerts.length;

// function checkAlerts(){
//   var i;
//   var istr ="no Alerts.";

//   getLocalDateTime();

//   for(i=0; i< dailyAlertsLen;  i++){
//     if( dailyAlerts[i]==gDate_day ){
//       return( dailyAlerts[i+1] + " "+ dailyAlerts[i+2]  ) ;

//     }

//   }

//   return(istr);

// }






function PreCheckUserInputTextForCrypto()
{
// note: all global vars

// if BTC-EUR == crypto, 
          numDashPos = gGET_SymbolStr.indexOf("-");

      //crypto detected
       if( numDashPos>0 ) {
              gCryptoFlag=1;
              gGET_SymbolCryptoStr0 = gGET_SymbolStr.substring(0, numDashPos); // gGET_SymbolStr.indexOf("-") );
        // get mkt here
          
             gCurrency0 = gGET_SymbolStr.substring( numDashPos+1 );

              if(gCurrency0.length>1){
                gCurrency= gCurrency0;
              }else{

                 gCurrency="USD";
              }

              gGET_SymbolCryptoStr      =gGET_SymbolCryptoStr0;
              gGET_SymbolCryptoNameStr  =gGET_SymbolCryptoStr0;

             gInterval="day"; 
             gIntervalCrypto="day"; 
             gAssetType="crypto";
// turn on 1st bank crypto buttons
              gDrawCrypto=1;

          }else{

            // not crypto via URL browser cmdline
             gInterval="day"; 

            gAssetType="stocks";
          }


}




/*
var candlesObjsLen = candlesti ckObjects.length -1;    // push'd candle objs

  constructor(  idx, sym, symtype, corpname , udate, utime,  uday,
                  open, high, low, close, volume, p, p3, splitcoeff, divcoeff,
                  buysell, dojitype, dojinum , hilo, volrange,
                   mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
                  gaprange, gapstart, rvol, vwap,
                  canvasx, canvasy, canvasw, canvash ){

*/


// Derived from pushCandle0bj() below
//
function pushCandleObjGeneric(tgtObj, open, high, low, close, vol, 
  idx, sym, symtype, corpname , udate,  utime    ){

let p0= (high+low+close)/3;
p0=Number(p0).toFixed(5);

let p3=p0;
 
p3=Number(p3).toFixed(5);

// also sets gDayinQtr, gDayinYr
dayofwk = GetDayOfWeek(udate);

// candlestickObjects.push(  new CandlestickObj( idx, sym, symtype, gCurrency, corpname , udate, utime,  
tgtObj.push(  new CandlestickObj( idx, sym, symtype, gCurrency, corpname , udate, utime,  
    dayofwk,
open, high, low, close, vol, 
p0, p3, 
'splitcoeff','divcoeff',
'buysell','dojitype','dojinum','hilo','volrange', 

0,0,0,0,0, 
'gaprange','gapstart',-1,-1, 'mktcap',gDayinQtr, gDayinYr,
gInterval,
'canvasx','canvasy','canvasw','canvash',

'nil','nil','nil','nil'  )  


) ;
 

}//fn



function pushCandleObj( open, high, low, close, vol, 
                        idx, sym, symtype, corpname , udate,  utime    ){

    let p0= (high+low+close)/3;
    p0=Number(p0).toFixed(5);

    let p3=p0;

    //  [0], [1], [2],   [3]
    // // this is wrong, due to  reverse data in incoming data:av is rev order
    // if(idx>=3){
    //   p3 = (candlestickObjects[idx-1].p +candlestickObjects[idx-2].p +candlestickObjects[idx-3].p )/3;
    // }else p3=p0;

    p3=Number(p3).toFixed(5);

// also sets gDayinQtr, gDayinYr
    dayofwk = GetDayOfWeek(udate);

   candlestickObjects.push(  new CandlestickObj( idx, sym, symtype, gCurrency, corpname , udate, utime,  
                  dayofwk,
                  open, high, low, close, vol, 
                  p0, p3, 
                  'splitcoeff','divcoeff',
                  'buysell','dojitype','dojinum','hilo','volrange', 

                    0,0,0,0,0, 
                  'gaprange','gapstart',-1,-1, 'mktcap',gDayinQtr, gDayinYr,
                  gInterval,
                   'canvasx','canvasy','canvasw','canvash',

                   'nil','nil','nil','nil'  )  


              ) ;

   // candlestic kObjects.push(      new CandlestickObj( idx, sym, symtype, corpname , udate, utime,  
   //                uday,
   //                open, high, low, close, vol , 

   //                p, p3, splitcoeff, divcoeff,
   //                buysell, dojitype, dojinum , hilo, volrange,

   //                 mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
   //                gaprange, gapstart, rvol, vwap, mktcap, dayinqtr,dayinyr,
   //                canvasx, canvasy, canvasw, canvash  ) );
 /*

class CandlestickObj{
    constructor(  idx, sym, symtype,   currency,    corpname , udate, utime,  uday,

                  open, high, low, close, volume, 

                  p, p3, splitcoeff, divcoeff,
                  buysell, dojitype, dojinum , hilo, volrange,
                   mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
                   gaprange, gapstart, rvol, vwap, mktcap, dayinqtr,dayinyr,
                  canvasx, canvasy, canvasw, canvash ){

 */

}//fn



// for BACKTEST OPTION
function initAlgoVars(){

         gPositionShares = 0;
         gPositionCash = 0;
         gPositionCash1 = 0;
         gBuyState = 0;   // 0 = haven't bought. 1= bought once, 2 = bought 2nd & final time
         gSellState = 0;  // 0 = haven't sold. 1= sold position

        gStartCash = 20000;

        gPositionSize=100;
       
        gPosition2Mult=2;

        gPositionInit3=0; // 0 == not init'd  , uup to 1x + 2x == 3x 300 #s hares * share price
       gFirstBuyPrice=0;

      gBuyEpsilon=0.02;
      gAlgoTradeStr="[clr]";
      gPreviousBuyPrice=-1;
       gLastUDate ="2092-12-13";
      gAlgoStop=0;


       //RVOL vars []
      initMovingAvgArrays();

      gCryptoDrawState=0;

}//fn

////////////////////////////////////////////////////////////
//
//
//      ie.  var  cmp = compateUnixDates( "2020-04-30", "2020-05-01" );
//
//           if (cmp==-1)  then  "2020-04-30" < "2020-05-01"
//  etc
//
//  unix date format only YYYY-MM-DD  
//
//   returns -1, 0, 1  for LT, ==, GT   ,, -10 == invalid date format
//
function compareUnixDates( udate1, udate2){
  var udate1_udate2_cmp= 0;

if( udate1.length!=10  &&  udate2.length!=10 ) return(-10); // -10 == invalid
// valid unix date format 10 len ea

console.log(" udate1 ? udate2 : ");
console.log( udate1 , udate2 );


  let yr1Str = udate1.substring(0,4);       // YYYY -MM-DD
  let yr2Str = udate2.substring(0,4);

  let mo1Str = udate1.substring(5,7);     // YYYY- MM -DD
  let mo2Str = udate2.substring(5,7);

  let day1Str = udate1.substring(8,10);      // YYYY-MM- DD
  let day2Str = udate2.substring(8,10); 


console.log(" yr1Str, yr2Str, mo1Str, mo2Str, day1Str, day2Str ==");
console.log( yr1Str, yr2Str, mo1Str, mo2Str, day1Str, day2Str);

if(udate1 != udate2){ 
  // ie "2020-04-30" != "2020-05-01"

  var yr1 = Number( yr1Str ).toFixed(0);
  var yr2 = Number( yr2Str ).toFixed(0);

  if(yr1<yr2) return(-1);    // LT
  if(yr1>yr2) return( 1);    // GT

// years are ==
// go to months
var m1 = Number( mo1Str ).toFixed(0);
var m2 = Number( mo2Str ).toFixed(0);

  if(m1<m2) return(-1);    // LT   2020-09-xx   v  2020-11-xx
  if(m1>m2) return( 1);    // GT   2020-09-xx   v  2020-03-xx

// months are ==
// go to days
var d1 = Number( day1Str ); //.toFixed(0);
var d2 = Number( day2Str ); //.toFixed(0);

  if(d1<d2) return(-1);    // LT   2020-09-02   v  2020-09-28
  if(d1>d2) return( 1);    // GT   2020-03-14   v  2020-03-08

// here they are ==, theoretically an impossible case to get here...

}else udate1_udate2_cmp= 0;   // force ==

  return(udate1_udate2_cmp);
}



/*
 udate1 ? udate2 : 
candlesticks.js:717 2021-03-10 2021-03-09
candlesticks.js:730  yr1Str, yr2Str, mo1Str, mo2Str, day1Str, day2Str ==
candlesticks.js:731 2021 2021 03 03 10 09
candlesticks.js:6278 -1
candlesticks.js:716 
*/


//////////////////////////////////////////////////////////

class volumeObj{
 constructor(  idx, volume, datestr  ){
  
        this.idx        =idx
         this.volume     =volume
    this.udate      =datestr
//         this.utime      =timestr  // 4pm EDT  16:00:00
 }
}
class avgObj{
 constructor(  idx, val, datestr  ){
  
        this.idx        =idx
         this.val      =val 
        this.udate      =datestr
//         this.utime      =timestr  // 4pm EDT  16:00:00
 }
}

 /*
const sheeps = ['🐑', '🐑', '🐑'];

const fakeSheeps = sheeps;
const cloneSheeps = [...sheeps];

console.log(sheeps === fakeSheeps);
// true --> it's pointing to the same memory space

console.log(sheeps === cloneSheeps);
// false --> it's pointing to a new memory space

 */

// function initVolume10day(){
function initMovingAvgArrays(){
	// should likely init or flush here []
   
 

     high52week =-1;
     low52week  =100000000;  // should be lower than 100M
     highAllTime=-1;            // Alltime for the SET
     lowAllTime =100000000;  // should be lower than 100M

      high52weekIdx =-1;
      low52weekIdx  =-1;  // should be lower than 100M
      highAllTimeIdx=-1;
      lowAllTimeIdx =-1;  // should be lower than 100M


    vol10day=[];
    vol10dayOO=[];
    gVol10dayAvg=-1;

    p3day=[];
    p3dayAvg=-1;

    mvg50day=[];
    mvg50dayAvg=-1;

    mvg100day=[];
    mvg100dayAvg=-1;
 
    mvg200day=[];
    mvg200dayAvg=-1;
 
    mvg500day=[];
    mvg500dayAvg=-1;

    mvg1000day=[];
    mvg1000dayAvg=-1;
     

     // for bullish/bearish wedge analysis
    WedgeNdayHighs=[];
    WedgeNdayHigh=-1;

    WedgeNdayLows=[];
    WedgeNdayLow=-1;


 console.log("] initMvingAvgArrays(): * =[]")

}

 
function processVolume10day(idx, volumeToday, udate ){
// pudh cur volume onto stack
	vol10day.push( new volumeObj( idx, volumeToday, udate ) ); //, "16:00:00"  ) );

	if(vol10day.length>10){
		// vol10day.shift();   // remove 1st obj only, & shift 'em down
		 vol10day.splice(0,1);
		// vol10day.splice(11,1);
	}

	//acc
	let volsum =-1;
	gVol10dayAvg = volsum;   // init it each time to -1

// vol10day now cannot be >10, as 11th is spliced off
//   and make sure len==10, not 9 so we have a good calc
if(vol10day.length==10){
	volsum=0;
	vol10day.forEach( (volitem,i) => {
		volsum+=volitem.volume;
	})
	gVol10dayAvg = volsum*0.10;
}

  // console.log(gVol10dayAvg);
  // console.log(vol10day);

// if -1, then invalid volume10dayAvg
return(gVol10dayAvg);

}//fn



//
//
function processNdayAvg(arrayAvg , lenAvg , idx, valueToday, udate ){
// push cur volume onto stack
  arrayAvg.push( new avgObj( idx, valueToday, udate ) ); //, "16:00:00"  ) );

  if(arrayAvg.length>(lenAvg+1)) {  // ie > 10, remove oldest item
      arrayAvg.splice(0,1);
      // should we use pop?  we need [0]th elemn gone in .length size
   }

  //accum
  let avgsum =-1;
  let NdayAvg = -1; // =avgsum;   // init it each time to -1
  let lastItem=0;
 
          if(arrayAvg.length==(lenAvg+1) ){
            avgsum=0;
            arrayAvg.forEach( (avgitem,i) => {
              avgsum+= avgitem.val ;
              lastItem=avgitem.val ;

            })


            avgsum= avgsum- lastItem;   // remove the 11th element in lenAvg=10  from sum

            NdayAvg = avgsum / lenAvg;    // do orig calc for trailing N CANDLES / lenAvg  


            }//if  11 captured w/ len=10, then subtract/back out last valuw


  //  console.log("procesNdayAvg(): [idx]=", idx);
  //  console.log("procesNdayAvg(): [lenAvg]=", lenAvg);
  //  console.log("procesNdayAvg(): NdayAvg, arrrayavg==");
  //  console.log(NdayAvg);
  // console.log(arrayAvg);

// if -1, then invalid  NdayAvg ie volume10dayAvg
	return( Number(NdayAvg.toFixed(5))  );

}//fn




////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////  Called 1st time thru, clean from php
////////////////////////////////////////////////////////////
function initOneTimeMethods(){
  initAlgoVars();
  initAndDrawButtonsFirstTime();
  initCandleObjects();

  load_dynamicWatchlist_fromlocalStorage();

}

function initCandleObjects(){
    candlestickObjects=[];
    candlestickWeeklyObjects=[];
    InitLastDataObjLoaded();
    // buttonObjects=[];
}

//depricate
function Set_startXOff(){
   // if(gDrawGuage==0) gCandle_startXOff = 800;    // subtractor
   // if(gDrawGuage==0) gCandle_startXOff = 0;    // subtractor
   //    else gCandle_startXOff = 0;

    // gCandle_startXOff = 400; 
    ;  

}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// this is init'd once at beginning of code ie 
////////////////////////////////////////////////////////////
function initRenderVars(){
    // ctx.fillStyle = 'rgba(0,0,0,1)' ;
    // initRen derVarsCommon();
    // gComputeAndRenderCandlesStatus = 0;
    initPixelArray();

    initRenderVars1( gBGcol ); // 'rgba(0,0,0,1)'  );
}//fn

// original
//function initRen derVars(){
// ctx.fillStyle = 'rgba(0,0,0,1)' ;
//     ctx.fillRect(0,0, canvasWidth, canvasHeight);     
//     drawButto nsForeach();
//     candleXnext  = startX - gCandle_startXOff;  
// 	initPixe lArray();
//     candlesPriceMax  = 0;
//     candlesPriceBoundsMax=0;
//     candlesPriceRange=0;
//     candlesPriceMin  = 1000000;
//     candlesPriceBoundsMin=1000000 ;
//   // candles52WeekHigh, candles52WeekLow;           
// }//fn

// these 2 following functions go together
// init'd each time in the loop 
// 
function initRenderVars1(col){
    ctx.fillStyle = col; //'rgba(0,0,0,1)' ;
	  initRenderVarsCommon();
}

function initRenderVarsCommon(){
	// style is set coming in, other stuff is all common w/ global vars...
    ctx.fillRect(0,0, canvasWidth, canvasHeight);

    drawButtonsForeach();
    candleXnext  = startX - gCandle_startXOff;  

    candlesPriceMax  = 0;
    candlesPriceBoundsMax=0;
    candlesPriceRange=0;

    candlesPriceMin  = 1000000;
    candlesPriceBoundsMin=1000000 ;
            
}//fn



let CandlesMaster;

function RenderAllData() {
  //JMB 2020-09-26
   //RenderEarningsGraph( startX , gTodaysDate );

    LoadLocalStorageVars();

    
    if (gTickerExists == 1 && gTickerExistsAV == 1)
    {
      //we have both data types.
      CandlesMaster = CandlesFromHistorical.concat(CandlesFromAlpha);
      ComputeAndRenderCandles( CandlesMaster ); // this works stadalone
    }
    else
    {
      //we only have alpha advantage data, no historical
		      if (gTickerExistsAV == 1){
		      	 	CandlesMaster = CandlesFromAlpha;
		         	ComputeAndRenderCandles(CandlesFromAlpha);
		    	}
    }


    RenderChartText( startX );
    Print_gIndicatorsTogAIcatIndicatorStr();
    if(gDrawGuage==1) RenderGaugeJB();



    if(gFirstTimeThru==1){
       gFirstTimeThru=0;
       initDynamicWatchlist();
       GetWatchlistDynamic();

      }else{
       dynamicWatchlist_PUSH(gGET_SymbolStr, " ");
  	   if(gDrawOverview==1)  DrawOverviewData();

      }

}//fn
 

// 
function RenderAllData_Current() {
  //
  //
  //JMB 2020-09-26
   //RenderEarningsGraph( startX , gTodaysDate );

    LoadLocalStorageVars();

    if (gTickerExists == 1 && gTickerExistsAV == 1)
    {
      //we have both data types.
     
     // this concat step was already done 1st time thru
  // CandlesMaster = CandlesFromHistorical.concat(CandlesFromAlpha);
      ComputeAndRenderCandles( CandlesMaster ); // this works stadalone
    }
    else
    {
      //we only have alpha advantage data, no historical
      if (gTickerExistsAV == 1)
        ComputeAndRenderCandles(CandlesFromAlpha);
    }

    RenderChartText( startX );
    Print_gIndicatorsTogAIcatIndicatorStr();
   if(gDrawGuage==1) RenderGaugeJB();


   if(gDrawOverview==1)  DrawOverviewData();

   // if(gDrawWatchlist==1) drawDynamicWatchlist();   // debug console only

    // if(gFirstTimeThru==1){
    //    gFirstTimeThru=0;
    //    initDynamicWatchlist();
    //    GetWatch listDynamic();
    //   }

}//fn










// ***************************************************************************************************************************************
//
//          END OF JAVASCRIPT CODE PRIOR TO FUNCTIONS (methods)
//
// ***************************************************************************************************************************************


function  fileWrite(fname1){
//function  fileWrite(){

    console.log("GOT to fileWrite()");

 var fname2 = fname1.replace(/&/g, "-");
    dataPOST(fname2);

    // dataPOST(fname1+",john,will[1]=23[4]=go[5]=9,ted=[1],sdfa,asd,asdasdasdfasdfweqrer3evasdvads,asd,vr2eqsd,a,ds,3,4g,3erg,ergsdfgsdfg,rrg,245,,245,gw,etrg,wedt,hfbs,dfg,vwe,rg,4vwe5,rg,4we5r,dgfvfw,esdfg,vr,dtf,");

  return;


//     var fso = new ActiveXObject("Scripting.FileSystemObject");
//     var fname = "/output/abc.txt";
//     // var fname = fname1;

//     fso.CreateTextFile(fname);
//     var file = fso.GetFile(fname);

//     var streamWrite = file.OpenAsTextStream(2);

//     streamWrite.WriteLine("I lovvve Coding");
//     streamWrite.Write("This is the ALGO Report");
//     streamWrite.Write(" that was output");
//     streamWrite.Write(" from iTraderPro");
//     streamWrite.Close();

}

function GetCurrentDate(){

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) dd='0'+dd;
	if(mm<10) mm='0'+mm;
 
	gTodaysDate = yyyy+'-'+mm+'-'+dd ;

//  gTodayDaysinQuarter = GetDaysInQuarter (gTodaysDate); 
}

function GetDaysInQuarter( datestr ){

}


function RenderGaugeJB(){
    
    var x1 = gGaugeXStartArc; //250; // canvasGaugeWidth /2 ;   // canvasWidth / 2;
    var y1 =  400; //120;   //canvasHeight *0.200;
    var pct0 = 0.13;
    var pct1 = 0.33;  //LONG
    var pct2 = 0.14;  //short

 
    // if(gDrawGuage==1){   
    //    ctx.fillStyle = "#232334";
    //    ctx.fillRect(60,10, 400, canvasHeight*0.90 );
    // }

    gDashboardPctX = x1-75;
    gDashboardPctY = y1;
    
    // computes final meter % for all, long and short  see vars below
    
    if(gDrawGuage==1) RenderIndicatorMeters( ctx );
    
    //original - all indicators avg - will be depricated due to inactivity
    pct0 = gPercentIndicatorAvg / 100;
    
    // only LONG, THEN SHORT...
    pct1 = gPercentIndicatorAvgLONG / 100;
    pct2 = gPercentIndicatorAvgSHORT / 100;

    
    
    if(gDrawGuage==1) RenderGuage( x1, y1, gGET_SymbolStr,  pct1, pct2, c, ctx );

    
}// fn




function LoadLocalStorageVars(){
    

    // Check browser support
//    if (typeof(Storage) !== "undefined") {
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("stockTrending", gStockTrending);
        
        Print_gIndicatorsTogAIcatIndicatorStr();
        
        var isthere="notInDatabase";

        if( CheckStockInDatabase(gGET_SymbolStr) == true ) isthere = "STOCKinDATABASE!";
         
        // Retrieve
        document.getElementById("result").innerHTML = "AI_algos==" + localStorage.getItem("stockTrending") + "__" + gAIcatIndicatorStr+ "__gGET_SymbolStr == "+
         gGET_SymbolStr+ "__inOut:" + isthere ;
  			 


    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    

}//fn


function CheckStockInDatabase( symstr ){

	var tf0 = false;
    var ij;
    var tstr="";

    for(ij=0; ij< stocksMax; ij++){
		    tstr = stocksList[ ij ] ;

    		if( symstr.toUpperCase() == tstr.toUpperCase()  )  tf0 = true;  

    }

    return(tf0);

}//fn


//
// var res = str.substring(0,3);

//
//
// derived from LoadLocalStorageVars() above...
//
//
//   CALLED  from the bottom of Scan CandlesticksForAI()...
//
//
function PrintLocalStorageIndicators(){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
         Print_gIndicatorsTogAIcatIndicatorStr();

          var isthere="notInDatabase";

        if( CheckStockInDatabase(gGET_SymbolStr) == true ) isthere= "STOCKinDATABASE!";
        
        
        // Retrieve
        document.getElementById("result").innerHTML = "AI_algos==" + localStorage.getItem("stockTrending") + "__" + gAIcatIndicatorStr+ "__gGET_SymbolStr == "+ gGET_SymbolStr + "__inOut:" +isthere;
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    
}//fn



function SetCandlestickRenderWidth (len){

    // default to 11 width for 12-18 months (20 bars / mof)
    candleWidth = 13;

    if(len < (20 *  9))  candleWidth = 15;
    if(len < (20 *  6))  candleWidth = 21;
   
    if(len > (20 * 19))  candleWidth =  9;

    
}

function ClampCandlesLen(cArray){
  var k=0;
  for(k=0;k<100;k+=candlesOffset){
      if(cArray[k+0]==gFillStr ) {
         return( k / candlesOffset );
      }
    }

    return( cArray.length / candlesOffset );
}



 // apikey

function ComputeAndRenderCandles( cArray ){

    // reset Len each time
    candlesLen = cArray.length / candlesOffset ;
    // candlesLen = ClampCandlesLen(cArray);

    SetCandlestickRenderWidth( candlesLen );
   
    symbolStr = cArray[0+SYMB];
    
//  GET LAST CLOSE PRICE from cArray LAST candle
     gLastClose_PreScanAI = cArray[ ((candlesLen-1) * candlesOffset) + C ];


  	//  get candlesPriceMin, Max  NOTE: MUST BE CALLED 1st before Draw Axes
    scanCandlesticksForAI( cArray );

    
    
    if(gDrawEarningsAll!=1){
		    // this computes XendOfCandles for RIGHT side, end of candles
		    drawAxes( 0.330, 0.10 );
		    drawCandlesticks( cArray );  // note jmb 063019 = candlestick ai still computed here ...
	}


    if(gDrawExtras==1) drawRightAxis( 0.035, 0.035 );   // draw a right axis close to last candlestick

    if( gDrawP3Pivots==2){
    drawPivotLines( cArray, PivotGoldColor, P3 ,1 ) ;
    drawPivotLines( cArray, PivotBlueColor, P  ,1 ) ;
} else if( gDrawP3Pivots==1){
      drawPivotLines( cArray, PivotBlueColor, P  ,1 ) ;

}

// line on close
      if( gLineOnClose==1){
      	   if(gDrawEarningsAll!=1)  drawPivotLines( cArray, jb_purple, C  ,4 ) ;
      }
    if(gDrawMvgAvgs==1){  
    drawPivotLines( cArray, color50dayMvAvg , MVAVG50  , 3 ) ;  // note: MV AVG50 / VOLRANGE after [0],[1] holds [50] day mv avg
    drawPivotLines( cArray, color200dayMvAvg, MVAVG200 , 6 ) ;  // note: MV AVG200   holds [200] day mv avg
    drawPivotLines( cArray, color100dayMvAvg, MVAVG100 , 5 ) ;  // note: MV AVG200   holds [200] day mv avg
 // mv4
  }   

	//ComputeAndRenderWeelklyInsetGraph();



gComputeAndRenderCandlesStatus = 2;


}//fn



function ComputeAndRenderWeelklyInsetGraph()
{
	var sc1080 = 0.75, cnvh=0.250, cnvw=0.30;

	ctx.fillStyle = "#9999bb"; 
	ctx.globalAlpha = 0.750; 
	ctx.fillRect( canvasWidth*cnvh ,  canvasHeight * cnvw    ,	1920*sc1080 , 1080*sc1080  );  


	ctx.fillStyle = "#ffdf00";
	ctx.globalAlpha = 1.0; 

    ctx.font = "48px Arial";
    ctx.fillText( gGET_SymbolStr + " Weekly Chart", canvasWidth*cnvh , (canvasHeight * cnvw)+(1080*sc1080) - 20 );
   
}


var gEarningsList = [
 "2020-04-28","AAPL",
 ];


var gEarningsOffset = 2; 
var gEarningsLen    = gEarningsList.length  / gEarningsOffset ;


//var gNewEarningsArray = gEarningsList.slice(0);
var gEarningsBAR_Xwidth = 1500;
var gEarningsBAR_Yheight = 50;
//
//
//
//
var quarterColor =[

	// '#65e6d0',             // jan 1-7
 //    '#7b65e6',              // jan 8-15
 //    '#f00576',              
 //    '#ba020b',

 //    '#f05b05',
 //    '#ebb328',
 //    '#e6ed0c',
 //    '#23ed0c',

 //    '#0cedaa',
 //    '#f00576',              // mar 8-14
 //    '#7b65e6',
 //    '#65e6d0',

    '#e6ed0c',              // jan 1-7
    '#ebb328',              // jan 8-15
    '#f05b05',              
    '#ba020b',

    '#ba020b',
    '#ba020b',
    '#f00576',
    '#f00576',

    '#ba020b',
    '#f05b05',              // mar 8-14
    '#ebb328',
    '#e6ed0c',

   ];

 
function GetStockNameFromSymbol(symstr1){
	var ii=0, ilen=0;
	var retstr00 ="name unavailable";
  var symstr2 = symstr1.toLowerCase();

	ilen = stocknameslist.length;
	for(ii=0; ii<ilen; ii+=2){

			if(symstr2 == stocknameslist[ii].toLowerCase()){
			 
					retstr00 = stocknameslist[ii+1]; 
					// should while loop , brk
          return( retstr00 );
			}

	}

	return( retstr00 );

}//fn


function RenderEarningsBarGraphic(startx000){
	var b=0, rw=250, rh = 40;
	var fillstr ="";

    var currentQtr =0 ; // assume 1st quarter jan, feb, mar
    var qtrStr1 = "*", qtrStr2 = "**", qtrStr3 = "***";


	// for(b=0; b<12; b++){
	// 	fillstr = quarterColor[b];
	//  	ctx.fillStyle = fillstr ;  
	//  	ctx.fillRect( (startx000-50 +(250*b) ),  canvasHeight * 0.0125    ,	250, 40 );  
	// }
	// b--;

	// b++;
	// ctx.fillStyle = quarterColor[b];


// Month 1
	ctx.fillStyle ="#f05b05" ; // "#e6ed0c";
	ctx.fillRect(startx000-50+ 0    ,  canvasHeight * 0.0125    ,	rw, rh );  
	
    // ctx.fillStyle = "#444444"; 
    // ctx.font = "40px Arial";
    // ctx.fillText(  "APRIL 2020 EARNINGS" , startx000-50+  0 , canvasHeight * 0.0125 + rh  );
  

	ctx.fillStyle = "#f05b05"; //"#ebb328";
	ctx.fillRect(startx000-50+ 250  ,  canvasHeight * 0.0125    ,	rw, rh );  
	
	ctx.fillStyle = "#f05b05";
	ctx.fillRect(startx000-50+ 500  ,  canvasHeight * 0.0125    ,	rw, rh );  
	
	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50 + 750 ,  canvasHeight * 0.0125    ,	rw, rh );  
	



// Month 2
	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50+ 1000 ,  canvasHeight * 0.0125    ,	rw, rh );  
	
    // ctx.fillStyle = "#444444"; 
    // ctx.font = "40px Arial";
    // ctx.fillText(  "MAY 2020 EARNINGS" , startx000-50+  1000 , canvasHeight * 0.0125 + rh  );
  

	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50+ 1250  ,  canvasHeight * 0.0125    ,	rw, rh );  
	
	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50+ 1500  ,  canvasHeight * 0.0125    ,	rw, rh );  
	
	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50 + 1750 ,  canvasHeight * 0.0125    ,	rw, rh );  



// Month 3
	ctx.fillStyle = "#f00576";
	ctx.fillRect(startx000-50 + 2000,  canvasHeight * 0.0125    ,	rw, rh );  
 
    // ctx.fillStyle = "#444444"; 
    // ctx.font = "40px Arial";
    // ctx.fillText(  "JUNE 2020 EARNINGS" , startx000-50+ 2000 , canvasHeight * 0.0125 + rh  );
   
	ctx.fillStyle = "#f05b05";
	ctx.fillRect(startx000-50 + 2250,  canvasHeight * 0.0125    ,	rw, rh );  

	ctx.fillStyle = "#f05b05"; //"#ebb328";
	ctx.fillRect(startx000-50 + 2500,  canvasHeight * 0.0125    ,	rw, rh );  

	ctx.fillStyle ="#f05b05";// "#e6ed0c";
	ctx.fillRect(startx000-50 + 2750,  canvasHeight * 0.0125    ,	rw, rh );  
    


    currentQtr = gCurrentQuarter ;           // FROM datearrayserial.js

    switch(currentQtr){
        case 0:
            qtrStr1 = "JANUARY"; qtrStr2 = "FEBRUARY"; qtrStr3 = "MARCH";        
            break;
        case 1:
            qtrStr1 = "APRIL"; qtrStr2 = "MAY"; qtrStr3 = "JUNE";        
        break;
        case 2:
            qtrStr1 = "JULY"; qtrStr2 = "AUGUST"; qtrStr3 = "SEPTEMBER";        
        break;
        case 3:
            qtrStr1 = "OCTOBER"; qtrStr2 = "NOVEMBER"; qtrStr3 = "DECEMBER";        
        break;
        default:
            qtrStr1 = "JANUARY"; qtrStr2 = "FEBRUARY"; qtrStr3 = "MARCH";        
        break;
    }//sw

// FIX FOR NON APR-JUN
    var earningsCol = "#ffffff";

    // ctx.fillStyle = earningsCol; //"#666666"; 
    // ctx.font = "40px Arial";
    // ctx.fillText( "  "+ qtrStr1 +" EARNINGS" , startx000-50+  0 , canvasHeight * 0.0125 + rh  );


    ctx.fillStyle = earningsCol; // "#666666"; 
    ctx.font = "40px Arial";
  //  ctx.fillText( "  "+ qtrStr2 +" EARNINGS" , startx000-50+  1000 , canvasHeight * 0.0125 + rh  );
//    ctx.fillText( qtrStr1 + "-"+ qtrStr2+ "-" +qtrStr3 +" Q"+ (currentQtr+1).toString()  +" EARNINGS" , startx000-50+  1000 , canvasHeight * 0.0125 + rh  );
    ctx.fillText( qtrStr1 + "-"+ qtrStr2+ "-" +qtrStr3 +" Q"+ (currentQtr+1).toString()  +" EARNINGS" , startx000-50+  1000 , canvasHeight * 0.0105 + rh  );  // 0.0125 + rh 
  

    // ctx.fillStyle = earningsCol; // "#666666"; 
    // ctx.font = "40px Arial";
    // ctx.fillText( "  "+ qtrStr3 +" EARNINGS" , startx000-50+ 2000 , canvasHeight * 0.0125 + rh  );
 
   
}



 
//JMB 2020-04-18
//
// 
// var gEarningsGraphY = canvasHeight * 0.0125 ;
// var gEarningsGraphW=2750, gEarningsGraphH = 40;

function DrawEarningsDate( stX, stY, xwidth, symstr, datestr0, xaux, yaux){   // xaux = -1 for compute dayinqtr

    var blastr = symstr; //+" "+datestr0 ;
    var dayinqtr = 23, stX0 = 0, yoff1 = 50, txt0ff=16;
    //   dayinqtr = getDayInQuarter(datestr);

    stX0 =   stX   + ( ( dayinqtr / 90 ) * xwidth );
    if (xaux>0) stX0 = xaux;  // for now , depricate

    if (yaux<0) yaux =0;  // for now , depricate
// gDaysDataStr

// draw vertical white line down
    ctx.moveTo(  stX0, stY   );
    ctx.lineTo(  stX0, stY -4 + yoff1+yaux  );
        
    ctx.lineWidth = 1;
      // if(yaux==0) ctx.strokeStyle = "#aaaaff"; 
      //   else  
      ctx.strokeStyle = "#777777";
    ctx.stroke();


// draw Text
    if(yaux==0) ctx.fillStyle = "#aaaaff"; 
        else  ctx.fillStyle = "#555599";
    ctx.font = "26px Arial";
    ctx.fillText(  blastr , stX0-8, stY  + yoff1 +txt0ff+yaux   );
   
   datestr0 = datestr0.substring( 5, 10 );

// draw Text
  //  ctx.fillStyle = "#aaaaff"; 
  // if(yaux==0) ctx.fillStyle = "#aaaaff"; 
  //       else  ctx.fillStyle = "#555599";
   
    ctx.font = "18px Arial";
    ctx.fillText(  datestr0 , stX0-8, stY  + yoff1 +txt0ff+yaux +20  );
   

}// fn




function RenderEarningsGraph(startx00 , todaystr){
    var startx0  =  startx00 + 50;
 	var i,d,e;
 	var jbstr="nil*";

	// RenderEarningsBarGraphic(startx0);
	

	var udatestr = "2019-10-30";
	var meestr ="2"; //="87";     // =udatestr.substring(5,2);
    var namestr0 = "";
    //namestr0 = stocknames[10];

    // DEPRICATE !!! this doesn't work
 	d = GetDayInQuarter( meestr );  /// testing this function but using it quick as a hack for 'ver 2.0 below'

     //DrawEarningsDate( startx0, gEarningsGraphY, gEarningsGraphW, gGET_SymbolStr, udatestr, -1, -1) ;
    DrawEarningsDates( startx0 );
   //DrawTodaysDate( startx0 , gTodaysDate);
    RenderEarningsBarGraphic(startx0);



    ///meestr = dateArray[4];
  
	//ctx.fillStyle =   "#FF3121"; // gBlueBGColorStr; //"#3333FF";
	ctx.fillStyle =   "#a9ecec"; // gBlueBGColorStr; //"#3333FF";
    ctx.font = "38px Arial";
   // ctx.fillText( d.toString()+"*GetDayInQtr("+meestr+")*" ,  startx0 +30,  canvasHeight * 0.086     );
    ctx.fillText(namestr0+ " aiTrader "+gVersionStr+"   Today is: "+gTodaysDate+ namestr0+" "+gNEARSTR ,  startx0 +250,  canvasHeight * 0.155     );

    // ctx.fillStyle =   "#a9ecec"; // gBlueBGColorStr; //"#3333FF";  // gCorpN ame
    // ctx.font = "38px Arial";
    // ctx.fillText(namestr0+ "   Designed/Coded by John Botti" ,  startx0 +150,  canvasHeight * 0.0926     );


    var k=0;
    var kstr="";
    var symstr = ""; 
    
 
   //// symstr = GetStoc kNameFromSymbol( gGET_SymbolStr );

    for(k=0; k<stocksMax; k++){
        
        kstr = kstr + stocksList[k]+ "  ";
    
    }
    ctx.fillStyle = "#AAAAEE"; //"#1111AA";
    ctx.font = "18px Arial";
    ctx.fillText(  "Stocks in Database: "+ kstr,   startx0  -50,   canvasHeight * 0.81    );   //  canvasHeight * 0.155   
   
  

     var tstr ="Earnings Date Unavail.****";
   //var ti=21;
   // tstr =    gEarningsSorted[ ti ] + " Earnings Call on " + gEarningsSorted[ ti-1 ] +   "."; 
    
    tstr = GetEarningsDate( gGET_SymbolStr );
    ctx.fillStyle = "#EEAA88"; 
    ctx.font = "64px Arial";
//    ctx.fillText(  tstr +stocknameslist[9] , 1150,  800    );
    ///ctx.fillText(  tstr +" "+symstr , 1150,  800    );
    ctx.fillText(  tstr   , 1150,  800    );
   

 


}//fn

  


function DrawEarningsDates( stx ){
    var t=0, tx=0, tyM=50, ty=0;
    var tstr ="*nil*", dstr ="nil*";
    var len9 = gEarningsSorted.length ;

 
//Note should be a while loop for speed...
    for(t=0; t < len9; t+=2){
        tstr = gEarningsSorted[ t+1 ];   // sym
        dstr = gEarningsSorted[ t+0 ];   // date

        // tx = substitute for now for daysinqtr/width...
        tx =  stx + ( (t/2) / (len9/2) *   gEarningsGraphW );
        DrawEarningsDate( stx, gEarningsGraphY, gEarningsGraphW, tstr, dstr  , tx, ty) ;

        if(ty==tyM) ty =0;
            else if(ty==0) ty = tyM;

    }
    

 
}


//JMB 2020-04-10
//
//   for now, gEarningsSorted[] in datearrayserial.js !
//
function GetEarningsDate( tickerStr ){
    var t=0;
    var tstr ="*nil*";
    var len9 = gEarningsSorted.length ;

    var earningsDateReturned = "Earnings Date Unavail.";

//Note should be a while loop for speed...
    for(t=0; t < len9; t+=2){
        tstr = gEarningsSorted[ t+1 ];

        if( tickerStr.toLowerCase() == tstr.toLowerCase() ){
            gEarningsUnixDate = gEarningsSorted[ t+0 ] ;

            earningsDateReturned =  gEarningsSorted[ t+1 ] + " earnings on "+ gEarningsSorted[ t+0 ] ;

        }
    }
    

    return( earningsDateReturned ) ;

}



//
//  input: unixDateStr  =  2019-10-30 format
//
//
function GetDayInQuarter( unixDateStr ){
	var dayinqtr=-366, dd=0;
 	var monthstr="mo";
	var daystr="da";

// 2019-10-30
// 0123456789
//      ^  ^

// check unix date str len== 10 else bounce a neg #
	// if(unixDateStr.length  != 10 ) return( unixDateStr.length*-1  ); 

	  monthstr =unixDateStr;// "125"; //unixDateStr.substring(5,2);
	// daystr   = unixDateStr.substring(8,2);

	  dayinqtr = Number( monthstr );


	// ctx.fillStyle =   "#FF3121"; // gBlueBGColorStr; //"#3333FF";
 //     ctx.font = "100px Arial";
 //     ctx.fillText( d.toString()+"++**++" ,  startx0 +30,  canvasHeight * 0.086     );



	return(dayinqtr);

}//FN 


// earnings  need to copy array, then join   DATE_SYMBOL then do array().sort
//
//													"2019-10-30_AAPL"






/*


   		  ctx.fillStyle = gBlueBGColorStr; //"#3333FF";
          ctx.font = "12px Arial";
          ctx.fillText(  "EST TIME - NYC",   30,  canvasHeight * 0.06    );

//
//
// global def : var newEarningsArray = gEarningsList.slice();
//

	var i=0;

	for(  i=0; i < gEarningsList.length ; i=i+gEarningsOffset  ){
	//
	//
	//  need to build sortable array "2019-10-30_AAPL"  i.e. "<unix datestamp>_<symbol>"
	//
	//    and replace the first date 
		gNewEarningsArray[i] = gEarningsList[ i + 0 ] + "_" + gEarningsList[ i + 1 ];

	}

	gNewEarningsArray.sort();

//	for(i=0;  i< gEarningsLen; i++  =gEarningsOffset ){
//			gNewEarningsArray[i] = gEarningsList[ i + 0 ] + "_" + gEarningsList[ i + 1 ];
//	}


*/

 
// var dateArray2 = {
// d2015_01_01 : "1_1_Thu_!New Year's Day",
// d2015_01_02 : "2_2_Fri_*",
// d2015_01_03 : "3_3_Sat_*",
// d2015_01_04 : "4_4_Sun_*",
// d2015_01_05 : "5_5_Mon_*",
// d2015_01_06 : "6_6_Tue_*",
// d2015_01_07 : "7_7_Wed_*",
// d2015_01_08 : "8_8_Thu_*",
// d2015_01_09 : "9_9_Fri_*",
// d2015_01_10 : "10_10_Sat_SpartyBday",
// d2015_01_11 : "11_11_Sun_*",
// d2015_01_12 : "12_12_Mon_*",
 
// };

// highlights: [
//                                              {
//                                              "from": 160,
//                                              "to": 220,
//                                              "color": "rgba(200, 50, 50, .75)"
//                                              }
//
/*

var cars = new Array("Saab", "Volvo", "BMW");
*/                      
//
//  can DELETE
//                        
var jmbdata0 = [
'2015-01-01' , '1_1_Thu_!New Years Day', // 1420156800
'2015-01-02' , '2_2_Fri_*',
'2015-01-03' , '3_3_Sat_*',
'2015-01-04' , '4_4_Sun_*',
'2015-01-05' , '5_5_Mon_*',
'2015-01-06' , '6_6_Tue_*',
'2015-01-07' , '7_7_Wed_*',
'2015-01-08' , '8_8_Thu_*',
'2015-01-09' , '9_9_Fri_*',
'2015-01-10' , '10_10_Sat_*',
'2015-01-11' , '11_11_Sun_*',
'2015-01-12' , '12_12_Mon_*',
'2015-01-13' , '13_13_Tue_*',
'2015-01-14' , '14_14_Wed_*',
'2015-01-15' , '15_15_Thu_*',
'2015-01-16' , '16_16_Fri_*',
'2015-01-17' , '17_17_Sat_*',
'2015-01-18' , '18_18_Sun_*',
'2015-01-19' , '19_19_Mon_!MLK Day',
'2015-01-20' , '20_20_Tue_*',
'2015-01-21' , '21_21_Wed_*',
'2015-01-22' , '22_22_Thu_*',
'2015-01-23' , '23_23_Fri_*',
'2015-01-24' , '24_24_Sat_*',
'2015-01-25' , '25_25_Sun_*',
'2015-01-26' , '26_26_Mon_*',
'2015-01-27' , '27_27_Tue_*',
'2015-01-28' , '28_28_Wed_*',
'2015-01-29' , '29_29_Thu_*'
];

var jmbkeyvalue = { first:"johnnie", last:"b_last", age:"33"};


//
//    same as RenderChartTevxt() below but takes x start pixel arg
//
function RenderChartText( startx00 ){
    var startx0  =  startx00 + 50;

 	var ddstr="";
    var dystr="2020-07-04";
    
    let tmpstr1 = "type="+gAssetType+",intr="+gInterval+",intrCry="+gIntervalCrypto+",DrCry="+gDrawCrypto  ;
    // ddstr =  GetDaysEventData( gTodaysDate );
    ddstr =" Welcome "+gGET_uname+", "+  GetDaysEventData( gTodaysDate )  +", debug=[ "+ tmpstr1+" ] ";


   gCorpName=  GetStockNameFromSymbol(gGET_SymbolStr);
    //    var nameStr = gCorpName;
        var namelen = gCorpName.length;
     if(gProperAssetName=="nil") gProperAssetName=gCorpName;

    titleStr += PhPdata;
    ctx.fillStyle = "#5555aD";
    ctx.font = "32px Arial";
    ctx.fillText( "algoInvestor and " +titleStr+" "+ gVersionStr  +copyrightStr , 
       startx0 -128 + 2800, canvasHeight * 0.9950    );   //0.9250 
    


    // ctx.fillStyle =   "#e3fc03";  
    // ctx.font = "72px Arial";
    // ctx.fillText(     gCorpName    ,  gStartChartX+gStartChartTextX   ,  canvasHeight * 0.135     );

// welcome msg w/ debug info  + events
    ctx.fillStyle = "#f7d34f"; // "#48c2ba";// "#e3fc03";  
    let sz=34;
    ctx.font = sz.toString()+"px Arial";   // "54px Arial";
       ctx.fillText( ddstr   ,  gStartChartX+ 20 ,  canvasHeight-  2.1*sz  );  // ,  (sz/2) + sz +2     );    


//substring(0,3) 

    // ctx.fillStyle = "#881111";
    // ctx.font = "18px Arial";
    // ctx.fillText( "ALGOs To Do: Tomorrow's Pivots, 52-weekDateCheckBUG, VOL-$ DIVERG, S3-R3 near Price$, Bull/Bear Pennants, RSI, SlowSto, 50/200_Trending-bug" ,   startx0 , canvasHeight * 0.250    );
    
    
    // ctx.fillStyle = "#ff88ff";
    // ctx.font = "22px Arial";
    // ctx.fillText(  ("Active Algos=="+gAIcatInd icatorStr) ,   startx0 , canvasHeight * 0.150    );
    
    // // jmb 063019
    // ctx.fillStyle = "#ff88ff";
    // ctx.font = "22px Arial";
    // ctx.fillText(  "NOTE! These Indicator Values are Randomized for TESTING NOW..." ,   startx0 , canvasHeight * 0.1950    );
   

    // ctx.fillStyle = "#ff88ff";
    // ctx.font = "22px Arial";
    // ctx.fillText(  "] "+gTestString +"  "+gTestStringLCD,   startx0 , canvasHeight * 0.0450    );   // 0.1950
    
    
    var week52 = "52wk H..L = ($"  +candles52WeekLow +"..$"+ candles52WeekHigh + ")";
     var iStr007 = " iTraderPro - Copyright (c) 2011-2021    by Black Ops Entertainment"; // + ddstr ;
  
   if(gDrawExtras==1){
 
    ctx.fillStyle = "#881111";
    ctx.font = "24px Arial";
    ctx.fillText( week52,  startx0 , canvasHeight * 0.8550    );
    
    
    ctx.fillStyle = "#118888";
    ctx.font = "24px Arial";
    ctx.fillText( "# Candles="+candlesLen + "/256*52 ="+(candlesLen/256*52), startx0 , canvasHeight * 0.780    );
    
    
    ctx.fillStyle = "#00ffff"; //#1111AA";
    ctx.font = "30px Arial";
    ctx.fillText( gGET_SymbolStr+" ",   startx0, canvasHeight * 0.90    );
    
   
 
    iStr = iStr +";  " +  candlesPriceMin.toString() + "," +  candlesPriceMax.toString() + ";  bounds=" +  candlesPriceBoundsMin.toString() + "," +  candlesPriceBoundsMax.toString()   ;
    // var iStr007 = "Copyright (c) 2018 by Jackabee Inc., iTrader Pro (c) 2010-2013 by Black Ops Entertainment"; // + ddstr ;
   // var iStr007 = "Copyright (c) 2018 by Jackabee Inc., iTrader Pro (c) 2010-2013 by Black Ops Entertainment"  ;
    ctx.fillStyle = "#1111AA";
    ctx.font = "15px Arial";
    //ctx.fillText(  iStr007,   startx0,  canvasHeight * 0.95    );
    ctx.fillText(  ddstr,   startx0,  canvasHeight * 0.95    );
    
}

    /*


var stocksList = [ 'SPY','DIA','QQQ','GLD','VXX','AAPL','AMZN','BABA','NFLX','TSLA','GM','F','FB','TWTR','FB','SNAP','AMRN','X','AA','USO','ROKU','S','BA','NKE','MCD','YUM','DIS','V','GS','C','PFE','GOOGL','NKE','T','M','JNJ','GBTC','K','IBM','INTC','NVDA','UBER','LYFT','L','SLV','TBT','PG','MGM','WYNN','EA','TTWO','ATVI','HAL','MSFT','KO','WFC','MMM','MRK','XOM'];

var stocksMax = 59; 


    */


// jmb 070319

    // var k=0;
    // var kstr="";

    // for(k=0; k<stocksMax; k++){
        
    //     kstr = kstr + stocksList[k]+ "  ";
    
    // }
    // ctx.fillStyle = "#AAAAEE"; //"#1111AA";
    // ctx.font = "28 Arial";
    // ctx.fillText(  kstr,   startx0  -50,  canvasHeight * 0.045    );
   




 

    // new jb 04.23.19
    //
 
//
//              Fill out the gPday first from the scan-ai fn
// candleXnext
//

     if( gDrawP3Pivots > -1){
    // PrintTomorrowSupportResista nce(startx0,   gOPENday,  gCLOSEday, gHIday, gLOWday,   gS3day, gS2day, gS1day,   gPday, gP3day,   gR1day, gR2day, gR3day );
      PrintTomorrowSupportResistance(candleXnext+200,   gOPENday,  gCLOSEday, gHIday, gLOWday,   gS3day, gS2day, gS1day,   gPday, gP3day,   gR1day, gR2day, gR3day );
      PrintTomorrowSupportResistanceOverview(candleXnext+200,   gOPENday,  gCLOSEday, gHIday, gLOWday,   gS3day, gS2day, gS1day,   gPday, gP3day,   gR1day, gR2day, gR3day );
    
    }

}//fn


// 
//   ie udstr = "2015-02-14" u datestr  NOTE MUST BE IN UNIX YYYY-MM-DD DATE FORMAT !
//



function  GetDayOfWeek( udstr  ){

  var elen = gEventCalendar.length;

  var daysdatastr="nil";
  var daysdatastr2="nil";
  var daysdatastr0="nil";
  var daysdatastr1="nil";
  var nexteventstr=" ";   // key to init in this to  ' '
  var ttstr ="nil", t1str ="nil";
  var g4=0, p=0, foundTodayFlag = 0, pastToday = 0, tlen=0;

 
  // for(p=0;p<elen;p+=2){
  p=0;
  while(foundTodayFlag == 0  &&   p<elen ){

      if(udstr     == gEventCalendar[p]   ){
        daysdatastr = gEventCalendar[p+1] ;
        foundTodayFlag= 1;
      }

      p+=2;    // array 2x wide

    }//while

//  30_180_Wed_*   daysdatastr
//     180_Wed_*   daysdatastr0   80
//        Wed_*   daysdatastr1
gDayinQtr   = daysdatastr.substring(0, daysdatastr.indexOf("_") );   // ie 30

daysdatastr0= daysdatastr.substring(daysdatastr.indexOf("_") +1);
daysdatastr1=daysdatastr0.substring(daysdatastr0.indexOf("_") +1);
gDayinYr   = daysdatastr0.substring(0, daysdatastr0.indexOf("_") );   // ie 180
daysdatastr2=daysdatastr1.substring(0, daysdatastr1.indexOf("_") );   // Wed

 return(daysdatastr2);

}//fn



function  GetDaysEventData( udstr  ){

    var elen = gEventCalendar.length;

	var daysdatastr="No Events today.";
	var nexteventstr=" ";   // key to init in this to  ' '
	var ttstr ="nil", t1str ="nil";

    var g4=0, p=0, pastTodayFlag = 0, pastToday = 0, tlen=0;

//
// should be while(nexteventstr != " ") loop
//
 	for(p=0;p<elen;p+=2){

 		if(udstr == gEventCalendar[p] ){
 			daysdatastr = gEventCalendar[p+1] ;
 			pastTodayFlag= 1;
 		}


 		if(pastTodayFlag==1){
 			if(nexteventstr==" "){

 				ttstr = gEventCalendar[p+1];
 				tlen = ttstr.length ;
 				t1str = ttstr.substring( (tlen-1)  ); 
 				if( t1str != "*" ){

 					nexteventstr = gEventCalendar[p+1] +" in "+ pastToday.toString() +" days, on "+ gEventCalendar[p] +"." ;
 					// this turns off this conditional rest of loop...

 				}
 			}
 			pastToday++;

 		}

 	}//for
    gDaysDataStr = daysdatastr;
 //	daysdatastr = "dayInQtr_Yr: "+      daysdatastr + " "+ nexteventstr ;''
 let nexteventstr1= "";
 let nexteventstr2= "";
 let nxt = nexteventstr.indexOf("_");
 nexteventstr1 =nexteventstr.substring(nxt+1);
 nxt = nexteventstr1.indexOf("_");
 nexteventstr2 =nexteventstr1.substring(nxt+1);

 	daysdatastr = "Event: "+       nexteventstr2  +"  "+gVersionStr+" "+ gVersionNum;
     return(daysdatastr) ;
}


/*
R4day = High+ 3*(Pday-Low) ;
R3day = (Pday-S1day) + R2day;
R2day = Pday + High – Low;
R1day = (Pday *2)-Low;
igh + Low + Close )/3 ;
S1day = (Pday *2)-High;
S2day = Pday – High + Low;
S3day = Pday – (R2day-S1day);
s4day = Low- 3*(High-Pday) ;
*/


function PrintTomorrowSupportResistance( startx00, openday, closeday, hiday, lowday, sup1, sup2, sup3,   piv, piv3,  res1, res2, res3 ){

//closeday, hiday, lowday,
var vertoffset= 0.30;
var vertoffset1= 0.20;
var vertoffset0=  0.10;   //0.0750;
var jb=0;
var jb3=0;
var xoff_startx0= 0 ;  //180; //110;  // 200;
var jboff7=0.055; //0.065;
var jboff71=0.035; 

var res123=0, sup123=900;

var fontstr = "48px Arial";
var fontBigstr = "80px Arial";

var redstr ="#ee2222", greenstr = "#22ee22";



var spaceStr="      " , putStr="" , putStrA="" ,  putStrA0="" , putStr1  =  gGET_SymbolStr;
var callStr="", callStrA="",callStrA0="", callStr1 =    gGET_SymbolStr ;

var res123a=0;

var genFridayStr        = gNextFridayStr.slice(  0, gNextFridayStr.indexOf("+")  );    //     gNextFridayStr =  "190920+191015~"  ---->   190920;

var nextFridayStr       = genFridayStr;   


var nextMonthFridayStr  = gNextFridayStr.slice(   (gNextFridayStr.indexOf("+")+1), gNextFridayStr.indexOf("~") ) ;    // gNextFridayStr.length  );  // "190920+191015~" -->191015



xoff_startx0=0;// candleXnext;



// DAILY  CL HI LO

//    ctx.fillStyle = "#ff33dd";
    // if(closeday < openday){
    //     ctx.fillStyle = redstr;
    // }else{
    //     ctx.fillStyle = greenstr;
    // }
     // ctx.font = fontstr;  
    // ctx.fillText( "Last Close=$"+closeday.toString(),   startx00-xoff_startx0 , canvasHeight * (vertoffset0 +(3* jboff71 ) )    );


    // ctx.fillStyle = "#ff33dd";
    // ctx.font = fontstr;  
    // ctx.fillText( "Last High =$"+hiday.toString(),   startx00-xoff_startx0 , canvasHeight * (vertoffset0 +(1* jboff71 ) )    );


    // ctx.fillStyle = "#ff33dd";
    // ctx.font = fontstr;  
    // ctx.fillText( "Last Low  =$"+lowday.toString(),   startx00-xoff_startx0 , canvasHeight * (vertoffset0 +(2* jboff71 ) )    );


if(gDrawExtras ==1){
    ctx.fillStyle = "#AAAAEE";
    ctx.font ="48px Arial"; // fontstr;  
    ctx.fillText( "TOMORROW'S PIVOTS:",   startx00-xoff_startx0 , canvasHeight * (vertoffset0 -10 +(5* jboff71 ) )    );

// draw vertical white line
    ctx.moveTo(startx00-xoff_startx0-8 , canvasHeight * (vertoffset0 +(4.50 * jboff71 ) )    );
    ctx.lineTo(startx00-xoff_startx0-8,  canvasHeight * (vertoffset0 +(18.0 * jboff71 ) )    );
        
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#AAAAEE"; 
    ctx.stroke();
}

// draw horiz white line
    // ctx.moveTo(startx00-xoff_startx0-8 ,      canvasHeight * (vertoffset0 +(5.50 * jboff71 ) )    );
    // ctx.lineTo(startx00-xoff_startx0-8 +450,  canvasHeight * (vertoffset0 +(5.50 * jboff71 ) )    );
        
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = "#AAAAEE"; 
    // ctx.stroke();

 

 

// DAILY RESISTANCE NUMBERS

for (jb=0;jb<3;jb++){
    jb3 = 3-jb;


    switch(jb){
    	case 0:
    		res123 = res3 ;
    	break;
    	case 1:
    	    res123 = res2 ;
    	break;
    	case 2:
    		res123 = res1 ;
    	break;

    }// sw jb

    res123 = res123.toFixed(2);


  
     res123a = Math.ceil( res123 / 10 ) * 10    ;   //  167.23 --> 16.723 --> 17 --> 170

     putStr  = putStr1 + nextFridayStr + "p"+ res123a.toString()  ;   //  +  "   " + nextMonthFridayStr+"p"+ res123a.toString();
     putStrA0 = putStr1 +  nextFridayStr+"p"+ res123a.toString();
     putStrA = putStr1 +" "+  nextMonthFridayStr+"p"+ res123a.toString();


// if(gDrawTraderText==1){
    if(jb!=0){ 
            ctx.fillStyle = "#EEAA99";  //   Red

            ctx.font = fontstr; 
  if(gDrawExtras ==1)             ctx.fillText( " R" + jb3.toString()+"=$"+res123.toString()    ,   startx00-xoff_startx0 , canvasHeight * (vertoffset +(jb* jboff7) )    );
    
        }else{
            ctx.fillStyle = "#EEAA99";  //   Red
            ctx.font = fontstr; 
      if(gDrawExtras ==1)         ctx.fillText( " R" + jb3.toString()+"=$"+res123.toString()    ,   startx00-xoff_startx0 , canvasHeight * (vertoffset +(jb* jboff7) )    );




          if(gDrawSpreads==1){

            ctx.fillStyle = "#FF88CC";  // slightly lighter Red
            ctx.font = fontBigstr; 
            ctx.fillText(    putStr ,                                     startx00-xoff_startx0 + 350 , canvasHeight * (vertoffset +(jb* jboff7) )    );


            ctx.fillStyle = "#FF88CC";  // even slightly lighter Red
            ctx.font = fontBigstr; 
            ctx.fillText(    putStrA,                                     startx00-xoff_startx0 + 350 , canvasHeight * (vertoffset + ((jb+0.75)* jboff7) )    );
          }

        }
//} 



}//for



// DAILY PIVOT NUMBERS

    piv  = piv.toFixed(2);
    piv3 = piv3.toFixed(2);

// this simply calc's y offset for putting P3 over P or P over P3 dep on whch one is greater JMB 2021-03-16
let p3_3 = 3;
let p3_4 = 4;

if(piv3 > piv){
	p3_4 = 3;
	p3_3 = 4;
}


// if(gDrawTraderText==1){

    ctx.fillStyle = "#ffdf00";
    ctx.font = fontstr;  
    // ctx.fillText(  " P3=$" +piv3.toString(),               startx00-xoff_startx0 , canvasHeight * (vertoffset +(4* jboff7))    )    ;
  if(gDrawExtras ==1)     ctx.fillText(  " P3=$" +piv3.toString(),   startx00-xoff_startx0 , canvasHeight * (vertoffset +(p3_4* jboff7))    )    ;
   
    ctx.fillStyle = "#3355DD";
    ctx.font = fontstr;  
    // ctx.fillText( " P =$" +  piv.toString() ,    startx00-xoff_startx0 , canvasHeight * (vertoffset +(3* jboff7))    )    ;
  if(gDrawExtras ==1)     ctx.fillText( " P =$" +  piv.toString() ,    startx00-xoff_startx0 , canvasHeight * (vertoffset +(p3_3* jboff7))    )    ;
    

   // ctx.fillText( gGET_SymbolStr+" closeENDOF LINE: $" +  gCLOSEday.toString() ,    startx00-xoff_startx0 , canvasHeight * (vertoffset +(p3_3* jboff7)) -150   )    ;
    


// }

let         diffday0 = ( closeday - openday).toFixed(2)  ;
let         diffday1 = ( ( closeday - openday) /   openday*100).toFixed(2);
let diffdaystr = "($"+ diffday0.toString()+", "+ diffday1.toString() +"%)"  ;
let diffdaystr1 =  diffday1.toString() +"%"  ;

    ctx.fillStyle = "#ffdf00";

let udstr0="up";

    if(closeday < openday){
        ctx.fillStyle    = jb_red;
        gLastCandleColor = jb_red;
        udstr0="down";

    }else{
        ctx.fillStyle    = jb_green;
        gLastCandleColor = jb_green;
    }


    let fsz=60;

    let fszmultMAX= 8;  // =30; // ie multiply the font size by 3x max ie 30/10 = 3.0
    let fszmult = Math.abs( diffday1 );
    if(fszmult > 1){
      // daily abs change is > 1%
      if(fszmult > fszmultMAX ) fszmult=fszmultMAX;
       // fszmult is now 1.0001  .. 30.0 so make font size 60pt + 60 * (1+chng/10) 
       fszmult /=10;
       // fszmult is now 0.10001 .. 0.87 .. 3.00 so add 1, ie.  1.87 *60pt
       // add 1
        fszmult +=1 ;
        fsz*= fszmult;   //  ie 60pt  * 1.87  = fsz
    }


    
    ctx.font =  fsz.toString()+"px Arial";//"32";//fontstr;  
    // ctx.fillText( gGET_SymbolStr+ " closed "+udstr0 + " " +diffdaystr1+" $"+closeday.toString()+" on "+gDateStrLast+"." ,    startx00-xoff_startx0+350 , canvasHeight * (vertoffset1 +(2* jboff7)) +  (8+  fsz)*1    );
   
    // ctx.fillText( gGET_SymbolStr+ " closed $"+closeday.toString()+", " +udstr0 + " " +diffdaystr1+" on "+gDateStrLast+"." ,   gStartChartX+gStartChartTextX, canvasHeight * (vertoffset1 +(1* jboff7)) - (8+  fsz)*1    );
    
     gClosedUpDnStr=  gGET_SymbolStr+"'s"+ " close: $"+closeday.toString()+" ("+    gDateStrLast +"), " +udstr0 + " " +diffdaystr1+"." ,   gStartChartX+gStartChartTextX, canvasHeight * (vertoffset1 +(1* jboff7)) - (8+  fsz)*1  ;
      gClosedUpDnStr1=  "Close: "+ gCurrencyStr +closeday.toString()+" ("+    gDateStrLast +"), " +udstr0 + " " +diffdaystr1+"." ,   gStartChartX+gStartChartTextX, canvasHeight * (vertoffset1 +(1* jboff7)) - (8+  fsz)*1  ;

    let xx22  =   GetDetailsXoff(); 


// set this explicitly and remove the blue 'AAPL close: $abc.cd'
    gSYMBOLCloseStrX =startx00-xoff_startx0 -500;


// draw FAR RIGHT, way off to the RIGHT of scr // this has scaled font size based on up/dwn magnitude
    if(gDrawEarningsAll!=1 && gDrawExtras==1) ctx.fillText(  gClosedUpDnStr ,   gSYMBOLCloseStrX , canvasHeight * (vertoffset1 +(1* jboff7)) - (8+  fsz)*1    );
    DrawPriceAtLastCandlestick1();


 // draw this one on LEFT with Details data.
     ctx.font =  gFntSz.toString()+"px Arial";   
    if(gDrawEarningsAll!=1 && gDrawCrypto==0)  ctx.fillText(  gClosedUpDnStr ,   xx22,  gDetails_Yoff- gFntSz- gFntAdder   );


 
let fsz_1=fsz -20;

    ctx.font =  fsz_1.toString()+"px Arial";//"32";//fontstr;  

    let trendstr="UP";
    ctx.fillStyle = jb_green;
    if( piv3 > piv ){
          ctx.fillStyle = jb_red;   
          trendstr="DOWN";
    }

    let xdeets = GetDetailsXoff(); 
    // if(gDrawEarningsAll!=1) ctx.fillText( "NextDay's Trend: " + trendstr+" (est.)",   gSYMBOLCloseStrX, canvasHeight * (vertoffset1*0.5 +(0* jboff7)) +  (8+  fsz )*0  );
    if(gDrawEarningsAll!=1 && gDrawCrypto==0) ctx.fillText( "Est.Day+1 Trend: " + trendstr , 180+  xdeets, 90 +canvasHeight * (vertoffset1*0.40 +(0* jboff7)) +  (8+  fsz )*0  );
    






if(gDrawBacktest==1){
    if(gPositionCash1>0)      ctx.fillStyle = "#33de33";
      else      ctx.fillStyle = "#dd3333";
     ctx.fillText( "Algo Investor (Gain/Loss): $" + gPositionCash1.toFixed(2).toString(),    gStartChartX+gStartChartTextX, canvasHeight * (vertoffset1 +(2.65* jboff7)) +  (8+  fsz )*1  );
       

  console.log(gAlgoTradeStr);
    // ctx.font  =  "64px Arial";  //"32";//fontstr;  
    // ctx.fillText( "ROI on Risk Est: "+(gPositionCash1/ gPositionInit3*100).toFixed(2).toString()+"% since "+gFirstDate+".",     startx00-xoff_startx0+350 , canvasHeight * (vertoffset1 +(3.5* jboff7)) +  (8+  fsz )*3  );

    // ctx.font  =  "32px Arial";  //"32";//fontstr;  
    // ctx.fillText( "MAX Risk Est = 300 shares @ $"+gFirstBuyPrice.toString()  + ", or $" + gPositionInit3.toFixed(2).toString(),     startx00-xoff_startx0+350 , canvasHeight * (vertoffset1 +(4* jboff7)) +  (8+  fsz )*3  );

}


// DAILY SUPPORT NUMBERS 

for (jb=0;jb<3;jb++){
    jb3 = jb+1;


     switch(jb){
     	case 0:
     		sup123 = sup3 ;
     	break;
     	case 1:
     	    sup123 = sup2 ;
     	break;
     	case 2:
     		sup123 = sup1 ;
     	break;


    }// sw jb
    //sup123 = sup123.toFixed(2);

 /*
Math.round(3.5)      // 4
 Math.floor(3.8)      // 3
Math.ceil(3.2)       // 4
*/


     res123a =    Math.floor( sup123 / 10  )  *10 ;   //214.73 --> 21.473 --> 21  -- 210

      callStr  = callStr1  + nextFridayStr + "c"+ res123a.toString();
      callStrA  = callStr1  + " "+ nextMonthFridayStr + "c"+ res123a.toString();

    sup123 = sup123.toFixed(2);


    // ctx.fillStyle = "#22dd22";
    // ctx.font = fontstr; 
    
    // if(gDrawTraderText==1){

      if(jb!=1){ 

        ctx.fillStyle = "#22dd22";
        ctx.font = fontstr; 
    
    if(gDrawExtras ==1)       ctx.fillText( " S"+jb3.toString()+"=$"+ sup123.toString(),    startx00-xoff_startx0 , canvasHeight * (vertoffset + ((jb+5)* jboff7))   );
    
        }else{
    
        ctx.fillStyle = "#22dd22";
        ctx.font = fontstr; 
   if(gDrawExtras ==1)      ctx.fillText( " S"+jb3.toString()+"=$"+ sup123.toString()   ,    startx00-xoff_startx0, canvasHeight * (vertoffset + (  (jb+5)* jboff7))   );
        


        if(gDrawSpreads==1){

        ctx.fillStyle = "#88EE88";
        ctx.font = fontBigstr; 
        ctx.fillText(   callStr,                                      startx00-xoff_startx0 + 350, canvasHeight * (vertoffset + (  (jb+5 )* jboff7))     );
        
        ctx.fillStyle = "#88EE88";
        ctx.font = fontBigstr; 
        ctx.fillText(   callStrA,                                      startx00-xoff_startx0 + 350, canvasHeight * (vertoffset + (  (jb+5.75)* jboff7))     );
          }

        }

    // }// gDrawTraderText


}//for




}//fn
 






function ComputeAndRenderCandlesticksCLEAR(){
     ctx.clearRect(0, 0, canvasWidth, canvasHeight );
    
    candleXnext  = startX;  // note this gets updated
    
    gStockNum++;
    if(gStockNum > 19) gStockNum = 0;
    
    ComputeAndRenderCandlesticks( gStockNum );
    
}

//
//  local storage test fns
//
//// Store
//localStorage.setItem("lastname", "Smith");
//// Retrieve
//document.getElementById("result").innerHTML = localStorage.getItem("lastname");


//// Store
//localStorage.lastname = "Smith";
//// Retrieve
//document.getElementById("result").innerHTML = localStorage.lastname;


// localStorage.removeItem("lastname");



/////////////////////////////////////////////////////////////////////////////////////////////

// globals
//var stocksList = [ 'AAPL','AA','AMZN','BKNG','C','DBX','DIA','F','GBTC','GOOGL','GS','GLD','M','ROKU','SNAP','TSLA','USO','X','EXG','PCN','FB','NKE','SBUX','EA','TTWO','NFLX','NVDA','PCG','EQT','AMRN','ARRS','UNG','SYMC','MSFT','CSCO','ORCL','K','L','JNJ'];

//var stocksMax = 39;
// WCB - replacing AA with APPL to avoid exception

var stocksListArrays=[
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,candlesAAPL,
                        // DUMMY EXTRA ONE AT END...

];


function ComputeAndRenderCandlesticksFromList0(){
    var rnd1 =  Math.floor( Math.random() *  (stocksMax-1)  );   // 0..38
    var sstr1= stocksList[ rnd1 ];
    
    gStockListIndex = ComputeAndRenderCandlesticksFromList( sstr1 );
    
}//fn



function ComputeAndRenderCandlesticksFromList( stockSymbol ){

    var stockSymbolStrUpper = stockSymbol.toUpperCase();
    var k=0;
    var matchNum = -1;
    
    // while( stockSymbolStrUpper != stocksList[k] ){
    //  k++;
    // }  matchNum = k;
    //
    for( k=0; k < stocksMax; k++){
        if(stockSymbolStrUpper == stocksList[k]){
            matchNum = k;
        }
    }//for
    
    
    if(matchNum > -1){
        var candles0 = stocksListArrays[ matchNum ];
        ComputeAndRenderCandles( candles0 );
    }else{
        ComputeAndRenderCandles( candlesAAPL );
       
    }
    
    return(matchNum);  //in case we need the master index for now, prior to mysql grab data...
    
}//fn

//
//
//  
//   var stocksList = [ 'AAPL','AA','SPY','DIA','FB','GOOGL','M','BAC','GS','F','GE','GM','K','C','V','AXP','GLD','USO','SLV','GES','ROKU','S','BABA','L','GBTC','BKNG','AMZN','MCD','YUM','MGM','WYNN','BA','WMT','NFLX','EXG','PCN','BLW','EVV','ETY','RYN','IBM','CSCO','MSFT','TTWO','ATVI','TBT','EA','QQQ','X','SNAP','TWTR','JWN'];
//
//   var stocksMax = 52; 
//
//
function GetStockNumber( stockstr ){

    var stockn = -1;
    var tmpstockstr ="";
    var i5=0;

//    if(gGET_SymbolStr == "NIL*"){
    if(stockstr == "NIL*"){
		gPrevStockNum++;
		if( gPrevStockNum >= stocksMax )  gPrevStockNum=0;
		gGET_SymbolStr = stocksList[ gPrevStockNum ];    // assign the string symbol
		return(gPrevStockNum);
    }

// stocknumber 
    for(i5=0; i5 < stocksMax; i5++){

           tmpstockstr = stocksList[ i5 ];

           if( tmpstockstr.toLowerCase() == stockstr.toLowerCase() ){
// GOT A HIT!!!
                stockn = i5;

           }

    }//for
    
	if(stockn < 0){
		stockn = 0;
	}
	gPrevStockNum = stockn;

    return( stockn ); 

}//fn




function ComputeAndRenderCandlesticksRND(  ){
    
    var rnd01 =  Math.floor( Math.random() * stocksMax );   // 0..18
 	var rnd00 =  GetStockNumber( gGET_SymbolStr );

 	if(gGET_SymbolStr =="*" || gGET_SymbolStr ==" " || gGET_SymbolStr =="/")  rnd00 = rnd01;

   	//	ctx.fillStyle = "#66ff33";   // arrowgreenColor ;
     //   ctx.font = "80px Arial";
      //  ctx.fillText( ( "==>"+gGET_SymbolStr+"<=="+rnd00.toString() ) , XendOfCandles*0.575,  175  );

    ComputeAndRenderCandlesticks1(rnd00);
 //   ComputeAndRenderCandlesticks1( 2 );

    // pickup name of stock from wildcard...
    if(gGET_SymbolStr =="*" || gGET_SymbolStr ==" " || gGET_SymbolStr =="/")  gGET_SymbolStr = symbolStr ;

}//fn

//
//
// original function  - DEPRICATED
//
function ComputeAndRenderCandlesticks( stockNum ){

// randomize SYMBOL for testing prior to hooking up whole backend...

	   var rnd0 =  Math.floor( Math.random() * 18 );   // 0..18

       if(stockNum < 0) stockNum = rnd0;   // if init, then rndize
    

         //   switch( rnd0 ){
        switch( stockNum ){

          	case 0:
              ComputeAndRenderCandles( candlesAAPL );
          	break;
          	case 1:
              ComputeAndRenderCandles( candlesSPY );
          	break;
          	case 2:
              ComputeAndRenderCandles( candlesTSLA );
          	break;
          	case 3:
              ComputeAndRenderCandles( candlesAMZN );
          	break;
          	case 4:
              ComputeAndRenderCandles( candlesGS );
          	break;
          	case 5:
                  ComputeAndRenderCandles( candlesDIA );
          	break;
          	case 6:
              ComputeAndRenderCandles( candlesBKNG );
          	break;
             case 7:
                  ComputeAndRenderCandles( candlesDBX );
                 break;
             case 8:
                 ComputeAndRenderCandles( candlesSNAP );
                 break;
             case 9:
                 ComputeAndRenderCandles( candlesAA );
                 break;
             case 10:
                 ComputeAndRenderCandles( candlesX );
                 break;
             case 11:
                 ComputeAndRenderCandles( candlesUSO );
                 break;
             case 12:
                 ComputeAndRenderCandles( candlesGLD );
                 break;
             case 13:
                 ComputeAndRenderCandles( candlesGOOGL );
                 break;
             case 14:
                 ComputeAndRenderCandles( candlesROKU );
                 break;
             case 15:
                 ComputeAndRenderCandles( candlesF );
                 break;
             case 16:
                 ComputeAndRenderCandles( candlesC );
                 break;
             case 17:
                 ComputeAndRenderCandles( candlesM );
                 break; 

          	default:
              ComputeAndRenderCandles( candlesSPY  );
            break;
	}//sw

	
}//fn
 


function zGuage(){
    
    var gauge = new RadialGauge({
                                renderTo: 'canvas-id',
                                width: 300,
                                height: 300,
                                units: "Km/h",
                                minValue: 0,
                                startAngle: 90,
                                ticksAngle: 180,
                                valueBox: false,
                                maxValue: 220,
                                majorTicks: [
                                             "0",
                                             "20",
                                             "40",
                                             "60",
                                             "80",
                                             "100",
                                             "120",
                                             "140",
                                             "160",
                                             "180",
                                             "200",
                                             "220"
                                             ],
                                minorTicks: 2,
                                strokeTicks: true,
                                highlights: [
                                             {
                                             "from": 160,
                                             "to": 220,
                                             "color": "rgba(200, 50, 50, .75)"
                                             }
                                             ],
                                colorPlate: "#fff",
                                borderShadowWidth: 0,
                                borders: false,
                                needleType: "arrow",
                                needleWidth: 2,
                                needleCircleSize: 7,
                                needleCircleOuter: true,
                                needleCircleInner: false,
                                animationDuration: 1500,
                                animationRule: "linear"
                                }).draw();
    
}


// note direction of triangle is based on     if(grStr==arrowgreenColor  ||  grStr==arrowgreenColor1  ){
//
//
function DrawTriangle( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr ){
   let dstr0 = dateStr0.substring(5,7) ;   // 2020-03-12
   let dstr1 = dateStr0.substring(5,10) ;

 if(gDrawBuySell==0) return;
 if(numcandles0<4 && gAssetType=="crypto") return;

  let monthNum0=Number(dstr0);

    // NOT JAN OR FEB where BUY SIGNAL SHOULD BE SURPRESSED
    if(  numcandles0 < 6)  size0*= 1.0;
      else  if(  numcandles0 <9 )  size0*=1.6;
        else   size0*=2.10;
   
    var size0half = size0 / 2;
    var size0_75  = size0 * 0.75;
    
    var size0_753 = size0 * 0.75 * 1.10 ;
    
    var xx1 = x0 - size0half;
    var xx2 = x0 + size0half;


// the triangle
    ctx.beginPath();
    
    let bearishBullish =-1;  /// -1 bearish, 1 = bullsh
    if(grStr==arrowgreenColor  ||  grStr==arrowgreenColor1  ){
      //  BUY SIGNAL
      bearishBullish =1;

      if(monthNum0 == 1 || monthNum0 == 2  ){
        // IF   JAN OR FEB, SURPRESS BUY SIGNAL
          grStr=jb_orange ;// size0_753 *= 0.5 ;  // surpress buy signals IN JAN/FEB
        } 

        y0 = y0+(size0_753* 2);
        
        ctx.moveTo(xx1, y0-(size0_753* 0) );
        ctx.lineTo(xx2, y0-(size0_753* 0) );
        
        ctx.lineTo(x0,  y0-(size0_753* 1) );
        
        ctx.lineTo(xx1, y0); //+(size0_753* 2) );

    }else{   // ie Red , ==  SELL SIGNAL
      bearishBullish =-1;   //set it explicitly again -1 = bearish
        y0 = y0-(size0_753* 2);

        ctx.moveTo(xx1, y0+(size0_753* 0) );
        ctx.lineTo(xx2, y0+(size0_753* 0) );
        
        ctx.lineTo(x0,  y0-(size0_753* -1) );
        
        ctx.lineTo(xx1, y0+(size0_753* 0) );

    }
    
//    ctx.lineTo(xx1, y0 );
    ctx.lineWidth = 10;
    ctx.strokeStyle = grStr;
    ctx.stroke();


// let jb_orange ="#f8ad25";
// let jb_green  ="#05fa98";
// let jb_red    ="#ff0024";
// let jb_purple ="#a506f9";
// let jb_blue   ="#040efb";
// let jb_yellow ="#f5ff00";

 let dstr2 = numcandles0.toString();
let fudge =0;

// PRINT MONTH # ON TOP
  if(gDrawBuySell==2){


    ctx.fillStyle = jb_yellow; //grStr ; //jb_purple; //"#b1dd03"; //"#55ddff";
   ctx.font = "28px Arial";
   // let dstr0 = dateStr0.substring(5,7) ;
   // ctx.fillText( dateStr0,  x0,  y0+(size0_753* 0) );
//   ctx.fillText( dstr1,  xx1,  y0+(size0_75 * bearishBullish) );
   ctx.fillText(  dstr2,  x0-8, 8+ y0 - (size0_753* (0.5  * bearishBullish) )  );  //+(size0_75 * bearishBullish) );
 // } 

   ctx.fillStyle = jb_yellow; //jb_blue; //grStr ; //jb_purple; //"#b1dd03"; //"#55ddff";
   ctx.font = "32px Arial";
   if(bearishBullish!= -1){
// bearish

        ctx.fillText(  dateStr,       x0-28,  y0 - (size0_753* (2.55  * bearishBullish*-1) )  );  //+(size0_75 * bearishBullish) );
        ctx.fillText(  "$"+pricestr,  x0-28,  y0 - (size0_753* (1.25  * bearishBullish*-1) )  );  //+(size0_75 * bearishBullish) );
    }else{
// bullish

            ctx.fillText(       dateStr,  x0-28,  y0 - (size0_753* (1.5  * bearishBullish*-1) )  );   
            ctx.fillText(  "$"+pricestr,  x0-28,  y0 - (size0_753* (0.5  * bearishBullish*-1) )  );   
         }



        }//if()
}//fn




function ProcessMovingAvg(candleArray, numDays, i6, arrayOffset){
    var z, adderClose=0;
    
    if( (i6-numDays) <0 ){  //not enough data to go back...
        return(-1);
    }
    for(z= i6-numDays; z<i6; z++  ){
        adderClose += Number( candleArray[  (z*candlesOffset)+ C  ] ) ;   // add up all the closing prices
        
    }
    
    adderClose = adderClose / numDays;  // get the numDays Mving avg
    
     candleArray[  (i6 * candlesOffset) + arrayOffset  ] = adderClose.toString();  // pop the 50-day mv avg back into + VOLRANGE
    return(adderClose);
    
}



//
//		INDICATOR STRING LOGIC
//
//
//
function Clear_gIndicators(){
    
    var i88 =0;
    
    for(i88=0; i88 < gIndicatorsLen; i88++){
        gIndicators[ i88 ] = "nil#" + i88.toString();
        
    }

    // clear global vars candleNum of indicator detected...



gHCD_candleNum            = -1;
gLCD_candleNum            = -1;

gBuySig_candleNum         = -1;
gSellSig_candleNum        = -1;

gAtR1_candleNum            = -1;
gAtS1_candleNum            = -1;

gAboveGapDown_candleNum    = -1;
gBelowGapUp_candleNum      = -1;

gBullishPennant_candleNum   = -1;
gBearishPennant_candleNum   = -1;

gTestString = "*** ";
gTestStringLCD = "*** ";


    
}//fn


//
//  tests to see if the indicator has been 'programmed up'...
//
function TestIndicatorStr( i80 ){
		if(i80 >= gNumIndicators) return(false);

        if( gIndicators[ i80 ].substring(0,3) != "nil" ) return(true);
          else return(false);

}//fn


function Print_gIndicatorsTogAIcatIndicatorStr(){
    
    var i88 =0;
    var str8="";
    
   gAIcatIndicatorStr="";
    
    for(i88=0; i88 < gNumIndicators; i88++){
        if( gIndicators[ i88 ].substring(0,3) != "nil" ){
            
            str8= timetotrade3a[  (i88*3)+1  ];

            if(  Number(  gIndicators[ i88 ]  ) !=0 )    gAIcatIndicatorStr = gAIcatIndicatorStr  +str8+ "["+ i88.toString() +"]="+ gIndicators[ i88 ]  + "%|" ;
      
        }//if
        
        
    }//for
    
}//fn



// Write_gIndicator( gAI52weekHiLo  , "95%"  );
//
function Write_gIndicator(num, pctStr){
    if (num<0  ||  num> gNumIndicators) return;
    
    gIndicators[ num ] = pctStr;
    
    
}//fn





// MAIN AI FUNCTION
function scanCandlesticksForAI( candleArray ){
    
    var i=0, j=0, idx=0, idx_1=0, idx_2=0, idx_3=0, price0=0, p1dayAgo=0, p2dayAgo=0, p3dayAgo=0   ;
    var voltmp=0;

            gCorpName = "{Corp Name Here}";

            BuySignal = 0;
            SellSignal = 0;
            
            BuySigCnt = 0;
            SellSigCnt =0;

            longShort = 0; // -1 for short, 1 for long, 0 n/a
            longShortPrior = 0; // to keep track of previous state
    
   // nov 23rd 2018
   // june 30th 2019  jmb clear globals like gHCD_candleNum =-1; ...
            Clear_gIndicators();
    
    
// HERE WE REDEFINE THE GLOBAL VAR candlesLen
            candlesLen = candleArray.length / candlesOffset ;
            candlesLen = ClampCandlesLen(candleArray);






      // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
  // ************************************************************************************ SPLIT_HANDLER
    //
    // JMB 2020-10-09
    // handle  if(gSplitDetected==1);
    	var spl=0;
    	var tmpj=0;
    	var splitDivideFactor=1.0 ;

		if(gSplitDetected==1){

			for(i=(candlesLen-1); i>=0; i--){  // reverse
		        	 idx= i * candlesOffset;  

		             spl = Number( candleArray[ idx + SPLIT_COEF ] );
		             if(spl!=1.0){
		             	splitDivideFactor *= spl;   // handled multiple splits in same array
		             	// console.log("i=="+i+") splitDivideFactor="+splitDivideFactor+" starting split on next candle...");
		             }else{
		             		// ie if we encounter splitcoeff in Avantage data, then don't split that line.
	 		             tmpj =   Number(candleArray[ idx + O ]) / splitDivideFactor   ;
			             candleArray[ idx + O ] = ( tmpj.toFixed(4) ).toString() ;
						 
						 tmpj =   Number(candleArray[ idx + H ]) / splitDivideFactor   ;
			             candleArray[ idx + H ] = ( tmpj.toFixed(4) ).toString() ;
						 
						 tmpj =   Number(candleArray[ idx + L ]) / splitDivideFactor   ;
			             candleArray[ idx + L ] = ( tmpj.toFixed(4) ).toString() ;
						 
						 tmpj =   Number(candleArray[ idx + C ]) / splitDivideFactor   ;
			             candleArray[ idx + C ] = ( tmpj.toFixed(4) ).toString() ;
			         
			         // volume * split factor
						 tmpj =   Number(candleArray[ idx + V ]) * splitDivideFactor   ;
			             candleArray[ idx + V ] = ( tmpj.toFixed(4) ).toString() ;
			         }//else
		             	 

		        }// for 

		}//if
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER
    // ************************************************************************************ SPLIT HANDLER










    //
    //
    //      BEGINNING OF CANDLESTICK LOOP !! *************************************************************************
    //
    //
    var lastval = 0;
    
            for(i=0+gCandlesLenAdder;i<candlesLen-gCandlesLenSubtractor;i++){
            // for(i=0;i<candlesLen-gCandle sLenSubtractor;i++){
                idx= i * candlesOffset;      // ie 0 * 16,   1* 16     
                
                if(i==0) dateStartStr = candleArray[ idx + DATE ];
               
               //JMB CORPNAME 
                 // if(i==4) gCorpName = candleArray[ idx + CORPNAME ];
              


                 // arr.splice(0, arr.length)

// OPEN  HIGH LOW CLOSE VOL  DATE   PIVT PIVT3day  DAY     SYMBOL   BUY SELL
// var O=0, H=1, L=2, C=3, V=4, DATE=5, P=6, P3=7,   MTWTF=8, SYMB=9 , BUYSELL=9 , LCDHCD=10, HILO=11, VOLRANGE=12, MVAVG50=12, MVAVG200=13, MVAVG100=14, CORPNAME=15 , SPLIT_COEF=15 ;    
// var volLow = 100000000000, volHigh=-1, gPctNear=0.015;

                
                 let ca0 = candleArray[ idx + 0 ];  // 0..4  O H L C V
                 let ca1 = candleArray[ idx + 1 ];
                 let ca2 = candleArray[ idx + 2 ];
                 let ca3 = candleArray[ idx + 3 ];
                 let ca4 = candleArray[ idx + 4 ];

                 let ca5 = candleArray[ idx + 5 ];  // DATE
                 let ca6 = candleArray[ idx + 9 ];  // SYMB

///pus hCandleObj( open, high, low, close, vol, 
///                        idx, sym, symtype, corpname , udate,  utime    ){

// if close of stock for this candle is >=0 push it to obj stack
// if(Number( candleArray[ idx + 3 ]) >= 0  ){  
//          pushCa ndleObj( 
//                 Number(ca0).toFixed(2), 
//                 Number(ca1).toFixed(2), 
//                 Number(ca2).toFixed(2), 
//                 Number(ca3).toFixed(2), 
//                 Number(ca4).toFixed(0), 
//                 // ca1, 
//                 // ca2, 
//                 // ca3,  
//                 // ca4,   
//                   i,  ca6, 'stock', 'corpname', ca5, '16:00:00' );

// }

              // ASSUMES this data has P3 P intact  --CHECK
                // LAST CANDLESTICK CHECKs
                if(i==(candlesLen-1)){
                   // gLastClose
                    dateEndStr = candleArray[ idx + DATE ];
                    if( Number( candleArray[ idx + P3 ] )   <  Number( candleArray[idx+P] )  ){
                        stockTrending = "UP";
                        gIndicators[  gAIstockTrending  ]  = "99" ;

                    }else{
                        stockTrending = "DOWN";
                        gIndicators[  gAIstockTrending  ]  = "1" ;

                    }
                
                    
                    // if buy signal at last candle, or candle-1, or candle-2
                    if( gLastBuySignal_i == i  || gLastBuySignal_i == (i-1)  ||  gLastBuySignal_i == (i-2)  ){
                        lastval = gLastBuySignalValue;
                        if(gLastBuySignalValue > 14){
                            lastval = 14;
                        }
                        lastval = (lastval / 14 * 100).toFixed(0);
                        gIndicators[ gAIbuySignal  ] = lastval.toString();
                    }else gIndicators[ gAIbuySignal  ] = "0";  
                    

                    
                    // if sell signal at last candle, or candle-1, or candle-2
                    if( gLastSellSignal_i == i  || gLastSellSignal_i == (i-1)  ||  gLastSellSignal_i == (i-2)  ){
                         lastval = gLastSellSignalValue;
                        if(gLastSellSignalValue > 14){
                            lastval = 14;
                        }
                        lastval = (lastval / 14 * 100).toFixed(0);
                        gIndicators[ gAIsellSignal  ] = lastval.toString();
                    }else gIndicators[ gAIsellSignal  ] = "0";
                    
                    
                    
                    
                    
                }
              
                // VOL
                      voltmp = Number( candleArray[ idx + V  ] );
                      if(voltmp > volHigh) volHigh = voltmp ;
                      if(voltmp < volLow ) volLow  = voltmp ;
                
                
                
                // 50/20 DAY MV AVG
                if(i>50)  ProcessMovingAvg( candleArray,  50, i, MVAVG50 );
                 if(i>100) ProcessMovingAvg( candleArray, 100, i, MVAVG100 );  // mv1
                   if(i>200) ProcessMovingAvg( candleArray, 200, i, MVAVG200 );
 

                
                
                // must init Pivot = 0 before loop
                var Pivot = 0, Pivot3 = 0, price0_1dayAgo=0 ;
                
          // NOTE this should be  price0 = Number(    candleArray[ ( (i-1)*candlesOffset)  + j ]       );
          
                for(j=0;j<4;j++){   // 1st 4 are OHLC price data so we are getting the max or min [0]..[3]
                    price0 = Number( candleArray[ idx + j ]  );
                    
                    if(price0 > candlesPriceMax ) candlesPriceMax = price0;
                    if(price0 < candlesPriceMin ) candlesPriceMin = price0;

                    //  MODIFY TO CHECK FOR 52-WEEK LOW/HIGHT

                    
                    // make sure at least 1 candlestick exists in the 0th column
                    if(i>0){
                        price0_1dayAgo = Number( candleArray[ ((i-1)*candlesOffset) + j ]  );   //  ie idx-1     ,  idx= i * candlesOffset;
                        if( j>0 )  Pivot += price0_1dayAgo;   // skip O, but add H + L + C
                    }


                }// for j


                //
                //    Pivot = ( H + L + C ) / 3  ;   == avg of High + Low + Close
                //
                Pivot = Pivot / 3;
                candleArray[ idx + P ]  = ( Pivot.toFixed(2) ).toString()  ;     ///  num.toFixed(2)
                
                
                // Pivot3day avg
                
                if(i > 3){
                    // then we have 0x  [1],[2],[3] to compute P3 = avg of last 3 days' pivots
                    
                    idx_1 = (i-1) * candlesOffset;
                    idx_2 = (i-2) * candlesOffset;
                    idx_3 = (i-3) * candlesOffset;
                   

                    p1dayAgo = Number(  candleArray[ idx_1 + P ]  );           //  idx= i * candlesOffset;      // ie 0 * 16,   1* 16
                    p2dayAgo = Number(  candleArray[ idx_2 + P ]  );
                    p3dayAgo = Number(  candleArray[ idx_3 + P ]  );

                    Pivot3 = ( p1dayAgo + p2dayAgo + p3dayAgo ) / 3;
                    
                    // keep updating gP3day, so at end of loop, it will be populated with last P3
                    gP3day = Pivot3;
                    
                    candleArray[ idx + P3 ]  = ( Pivot3.toFixed(2) ).toString()  ;     ///  num.toFixed(2)




 // ALGO BUY/SELL GUTS HERE...  code logic taken from J. Botti's Tradestation Algos (c) 2009-2018 by John Botti
//
                    // here we have Pivot and Pivot3 computed, after min 3 candlesticks
                     var dumb=0;
                    
                     if(Pivot3 > Pivot){   // ie Gold Higher than Blue SHORT              ===== SELL SIGNAL
                      longShort = -1;
                      
                      SellSignal++;
                      if( SellSignal == 1){
                        if(BuySignal=>3){
                              
                          candleArray[ idx + BUYSELL ] = "sel" + BuySignal.toString();
                          
                         if(BuySignal=>4){
                          //record algo #s for later  only after 4 candlesticks
                          gLastSellSignal_i   = i ;
                          gLastSellSignalValue = BuySignal;   // > 3 for # of candles before  crossover p to p3
                          gLastSellSignalPrice = Number(  candleArray[ idx + C ]  );   // grab closing price
                          }
                        
                        }
                        
                          
                      }
                      BuySignal=0;
                      gUncontestedBuySignal =0;   // also look at gDrawMi norCrossover
    
    
    //      if( BuySignal >= 0){
     //          SellSignal++;
      //        if( SellSignal == 1){
       //           if(BuySignal > gBThresh){
        //              dumb=0; //   candleArray[ idx + BUYSELL ]  = "SELL"; //  draw Strong Sell
         //        }else{
      //               dumb=0; //  draw Weak Sell
       //        }
      //    }
     //       BuySignal=0;
     //     }// if
 
 
                    }else if(Pivot3 < Pivot){     // ie Gold lower than Blue ie LONG  ===== BUY SIGNAL
                      longShort = 1;
 
                        BuySignal++;
                        if( BuySignal == 1){
                          if(SellSignal=>3){
                                
                            candleArray[ idx + BUYSELL ] = "buy"  + SellSignal.toString();
                          
                            if(SellSignal=>4){
                              //record algo #s for later only after 4 candlesticks
                              gLastBuySignal_i   = i;
                              gLastBuySignalValue = SellSignal;   // > 3 for # of candles before  crossover p3 to p
                              gLastBuySignalPrice = Number(  candleArray[ idx + C ]  );   // grab closing price
                            }
                          
                          }
                            
                            
                        }
                        SellSignal =0;
 
 
          //           if( SellSignal >= 0){
           //             BuySignal++;
            //           if( BuySignal == 1){
             //             if(SellSignal > gSThresh ){
              //                dumb=0; //   candleArray[ idx + BUYSELL ]  = "BUY";  //  draw Strong BUY
               //         }else{
              //              dumb=0; //  draw Weak BUY
              //        }
               //        }
              //          SellSignal=0;
              //       }// if
 
 
                     }else if(Pivot3 == Pivot){
                        longShort =0;
                        
                        BuySignal=0;
                        SellSignal=0;
                       
                    }
 
                }else{   // if 1st 3  [0], [1], [2] then use set Pivot3 = Pivot
                    candleArray[ idx + P3 ] =  candleArray[ idx + P ] ;
                }//else
                



            }// for i
    
    

// console.log( i + "]");
// console.log( candlestickObj ects );

    //
    // END OF CANDLESTICK LOOP ****************************************************************
    //
    
    
    
    
    // fill in Volume Low & high in 12th spot [ idx + VOLRANGE]
    //                 idx= i * candlesOffset;      // ie 0 * 16,   1* 16
    // basically #0 & #1 + VOLRANGE == VOL LOW, HIGH
    candleArray[ (0 * candlesOffset) + VOLRANGE  ]  =  volLow.toString() ;
    candleArray[ (1 * candlesOffset) + VOLRANGE  ]  = volHigh.toString();

    
//  52-week HIGH / LOW CALCULATION
    
    candles52WeekLow  =  candlesPriceMin;

    candles52WeekHigh =  candlesPriceMax;
    
    
    
    var pct1Str ="81", closeStr = "", loStr = "", hiStr = "";

    var open1 = 0;
    var close1 = 0;
    var hi1 = 0;
    var lo1 = 0;
    var deltaRange = 0;
    var pct00 = 0.0;


//
//  GRAB END DATA FROM candleArray for Printing Next day Sup/Res Daily #s
//    * and store in global vars from candleglobals.js
//
//

// Start the global vars initiation to  avg(hi,low,close)=P etc...
/*
gHIday                   =482;
gLOWday                   =483;
gCLOSEday                =484;
gOPENday                 =484;
 

// var O=0, H=1, L=2, C=3, V=4,
*/
    // Grab the open ( as a string )
    openStr = candleArray[ idx + O ];
    // convert it to a Number
    open1   = Number(  openStr );
    gOPENday = open1;


    // Grab the close ( as a string )
    closeStr = candleArray[ idx + C ];
    // convert it to a Number
    close1   = Number(  closeStr );
    gCLOSEday = close1;

    // Grab the HI ( as a string )
    hiStr = candleArray[ idx + H ];
    // convert it to a Number
    hi1   = Number(  hiStr );
    gHIday = hi1;

    // Grab the LOW ( as a string )
    loStr = candleArray[ idx + L ];
    // convert it to a Number
    lo1   = Number(  loStr );
    gLOWday = lo1;





  /*
R4day = High+ 3*(Pday-Low) ;
R3day = (Pday-S1day) + R2day;
R2day = Pday + High – Low;
R1day = (Pday *2)-Low;
Pday  = (High + Low + Close )/3 ;
S1day = (Pday *2)-High;
S2day = Pday – High + Low;
S3day = Pday – (R2day-S1day);
s4day = Low- 3*(High-Pday) ;
  */  

// daily pivot = (close + hi + lo ) / 3 avg
// note gCLOSEday == close1

    gPday= ( gCLOSEday + gHIday + gLOWday ) / 3;

    gR1day= ( gPday*2 ) - gLOWday ;
    gS1day= ( gPday*2 ) - gHIday ;

    gR2day=  gPday + gHIday - gLOWday ;
    gS2day=  gPday - gHIday + gLOWday ;

    gR3day= ( gPday - gS1day ) + gR2day ;
    gS3day= gPday   - ( gR2day - gS1day ) ;



    deltaRange = candles52WeekHigh -  candles52WeekLow;

    pct00 = ( close1 - candles52WeekLow )  / deltaRange ;
    pct01 = ( pct00 * 100 ).toFixed(0);
    
    pct1Str = pct01.toString();
    
  //  gIndicators[ gAI52weekHiLo ] = "52wkHL=" + pct1Str + "%" ;
    gIndicators[ gAI52weekHiLo ] = pct1Str ;













    
    // BUY / SELL SIGNAL CALCULATION
    
//    gLastBuySignalIDX
    
    
    
    
            
            //
            // Min = 33.14 - 5 == 28.14,   parseInt( 28.14 / 5 ) == (5.628)== 5 * 5 == 25
            //
            candlesPriceBoundsMin = parseInt( (candlesPriceMin-2).toString() );     // orig
            var c1 =  parseInt(   ((candlesPriceBoundsMin / 5 )).toString()   );
            candlesPriceBoundsMin = c1 * 5;  //
            
            //
            // Max = 97.4 + 5 == 102.45,   parseInt( 102.45/5 ) == 25
            //
            candlesPriceBoundsMax = parseInt( (candlesPriceMax+6).toString() );     // orig
            var c2 =  parseInt(   ((candlesPriceBoundsMax / 5 )).toString()   );
            candlesPriceBoundsMax = c2 * 5;
            
            // $80 = $95  -  $15
            candlesPriceRange = candlesPriceBoundsMax - candlesPriceBoundsMin ;
    
    
  //
  //
  //
  //

    // put in month here
    let monthca5 = candleArray[ idx + DATE ];   // idx should be on  last element

    let monthstr5 = monthca5.substring(5,7) ;//= candleArray[ idx + 5 ];  // DATE 2020-09-23

    var monthnum = Number(monthstr5);  // 01 .. 12
    if(monthnum<1  || monthnum>12) monthnum = 1;  //default = jan
     
    var pct111Str  =  Almanac_LongSnP[ monthnum - 1 ];

    gIndicators[ gAIyearlyAlmanac ] = pct111Str ;




    
    
    // PRINT INDICATORS TO STRING
    PrintLocalStorageIndicators();
    
    
            
}//fn
     
     
     
     //         if( BuySignal >= 0){
     //              SellSignal++;
     //             if( SellSignal == 1){
     //                 if(BuySignal > BuyThreshold){
     //                     dumb=0; //   candleArray[ idx + BUYSELL ]  = "SELL"; //  draw Strong Sell
     //                }else{
     //                    dumb=0; //  draw Weak Sell
     //              }
     //         }
     //        BuySignal=0;
     //                      }// if
     
     
     
        //                    if( SellSignal >= 0){
        //                       BuySignal++;
        //                      if( BuySignal == 1){
        //                         if(SellSignal > SellThreshold){
        //                             dumb=0; //   candleArray[ idx + BUYSELL ]  = "BUY";  //  draw Strong BUY
        //                       }else{
        //                           dumb=0; //  draw Weak BUY
        //                     }
        //                }
        //               SellSignal=0;
        
        //         }// if
        
// let gBigSymBG_X = canvasWidth*0.225;
let gBigSymBG_X = canvasWidth*0.180;

function drawAssetNameinBG( bigstr, smstr, ssmstr){

// *should extend to crypto

let bigSymBG_X =gBigSymBG_X; 
if( gDrawSwitches==1) bigSymBG_X+= gDetails_Xoff;

// uniq1 large gsymb
	ctx.globalAlpha = 0.45 ;

      ctx.fillStyle = "#444488";
      ctx.font = "700px Helvetica";
      ctx.fillText( bigstr, bigSymBG_X, canvasHeight * 0.5850 );

      ctx.font = "90px Helvetica";
      ctx.fillText( smstr,  bigSymBG_X, canvasHeight * 0.650   );

      ctx.font = "54px Helvetica";
      ctx.fillText( ssmstr, bigSymBG_X, canvasHeight * 0.650 + 60   );


if(	gProperAssetDetail!="" ){   
	ctx.globalAlpha = 0.40 ;

      ctx.font = "34px Helvetica";
      ctx.fillText( gProperAssetDetail.substring(0,100),   bigSymBG_X, canvasHeight * 0.650 + 60+40   );
      ctx.fillText( gProperAssetDetail.substring(100,200), bigSymBG_X, canvasHeight * 0.650 + 60+40+40  );
      ctx.fillText( gProperAssetDetail.substring(200,300), bigSymBG_X, canvasHeight * 0.650 + 60+40+40+40  );
      ctx.fillText( gProperAssetDetail.substring(300,400) +" ...", bigSymBG_X, canvasHeight * 0.650 + 60+40+40+40+40  );

}

	ctx.globalAlpha = 1.0;



   }     
  
  function drawAxes( xPct, yPct ){
      
      var startX0 = canvasWidth*(xPct*0.25);
      var startX0a = canvasWidth*(xPct*0.005);
      var startX1 =  canvasWidth - 2*startX0;
      
      var startY =  canvasHeight * yPct *0.25 ;
      let startX0_a = startX0+120;

      Ytop    = startY;  // 10; //canvasHeight * yPct;  //*0.25);  //  Y top
      //  Ybottom = canvasHeight * 0.975 ;  //(canvasHeight * yPct ); //0.975 ;                // Y bottom
      
      Ybottom = canvasHeight - startY ;  ///* 0.975 ;  //(canvasHeight * yPct ); //0.975 ;                // Y bottom
      YRange  = Ybottom - Ytop;
      
      
      var pStrBot = "$", pStrTop = "$";
      

       drawAssetNameinBG(gGET_SymbolStr , gProperAssetName+ " -  "+"day"+" chart", gProperAssetDesc);



    if(gDrawExtras==1){  
 
      ctx.beginPath();
      ctx.strokeStyle="#444444";   // make wicks  grey vs black
      

      // LEFT AXIS
      ctx.moveTo( startX0_a,  startY  );
      //ctx.lineTo( startX0,  ( canvasHeight - st artY) ) ;
      ctx.lineTo( startX0_a,  Ybottom  ) ;
      ctx.stroke();
      
      //ctx.moveTo( startX,  sta rtY  );
      //ctx.lineTo( canvasWidth - 2*startX0,  ( canvasHeight- sta rtY) ) ;
   
   // RIGHT AXIS
      ctx.lineTo( canvasWidth - 2*startX0,  Ybottom ) ;
      ctx.stroke();
      
      ctx.lineTo( canvasWidth - 2*startX0,   startY ) ;
      ctx.stroke();
      }
      
      
      pStrBot = pStrBot + candlesPriceBoundsMin.toString();
      pStrTop = pStrTop + candlesPriceBoundsMax.toString();
      
      ctx.fillStyle = "#7777DD";
      ctx.font = "15px Arial";
   
      
      
      var k=0, y1=0, sstr="$";
      var kinc = (candlesPriceBoundsMax- candlesPriceBoundsMin)*0.05;
    if(gDrawExtras==1){  
      for(k=candlesPriceBoundsMin; k < candlesPriceBoundsMax; k+= kinc){
          
          // y1 =  YRange - (   ((k - candlesPriceBoundsMin) / candlesPriceRange)  * YRange  ) ;
          y1 = GetYCoordFromPrice( k );
          
          sstr = "$"+k.toString();
         /// ctx.fillText( sstr, startX1*1.015,  y1 );
          //ctx.fillText( sstr, 1.0,  y1 );
          ctx.fillText( sstr, startX0_a-30,  y1 );


       //   ctx.moveTo( startX1*0.995,  y1  );
       //   ctx.lineTo( startX1*1.005,  y1  ) ;
       //   ctx.stroke();
          
        //  ctx.moveTo( startX0*0.85,  y1  );
        //  ctx.lineTo( startX0*1.15,  y1  ) ;
          
          ctx.moveTo( startX0_a-20 ,  y1  );
          ctx.lineTo( startX0_a+20,  y1  ) ;
          ctx.stroke();
          
      }//for
     }//if


  }//fn
        


function drawRightAxis( xPct, yPct ){
    
    var startX0 = canvasWidth*(xPct*0.25);
    var startX0a = canvasWidth*(xPct*0.005);
    var startX1 =  canvasWidth - 2*startX0;
    
    var startY =  canvasHeight * yPct *0.25 ;
    
    Ytop    = startY;  // 10; //canvasHeight * yPct;  //*0.25);  //  Y top
    //  Ybottom = canvasHeight * 0.975 ;  //(canvasHeight * yPct ); //0.975 ;                // Y bottom
    
    Ybottom = canvasHeight - startY ;  ///* 0.975 ;  //(canvasHeight * yPct ); //0.975 ;                // Y bottom
    YRange  = Ybottom - Ytop;
    
    
    var pStrBot = "$", pStrTop = "$";
    
    
    ctx.beginPath();
    ctx.strokeStyle="#444444";   // make boundaries  grey vs black
    
//
//    ctx.moveTo( startX0,  sta rtY  );
//    ctx.lineTo( startX0,  Ybottom  ) ;
//    ctx.stroke();
//    ctx.lineTo( canvasWidth - 2*startX0,  Ybottom ) ;
//    ctx.stroke();
//
    
     ctx.moveTo( XendOfCandles,  Ybottom ) ;

    ctx.lineTo( XendOfCandles,   startY ) ;
    ctx.stroke();
    
    
    
    pStrBot = pStrBot + candlesPriceBoundsMin.toString();
    pStrTop = pStrTop + candlesPriceBoundsMax.toString();
    
    ctx.fillStyle = "#333333";
    ctx.font = "10px Arial";
    
    
    
    var k=0, y1=0, sstr="$";
    var kinc = (candlesPriceBoundsMax-candlesPriceBoundsMin)*0.05;
    for(k=candlesPriceBoundsMin; k<candlesPriceBoundsMax; k+=kinc){
        
        // y1 =  YRange - (   ((k - candlesPriceBoundsMin) / candlesPriceRange)  * YRange  ) ;
        y1 = GetYCoordFromPrice( k );
        
        sstr = "$"+k.toString();
        ctx.fillText( sstr, startX1*1.015,  y1 );
     //   ctx.fillText( sstr, 1.0,  y1 );
        
        ctx.fillText( sstr, XendOfCandles*1.010,  y1 );

        
        
        ctx.moveTo( XendOfCandles*0.995,  y1  );
        ctx.lineTo( XendOfCandles*1.005,  y1  ) ;
        ctx.stroke();
        
    }//for
    
    var str50200 = "";
    
    if(g50DayMovingAvg > g200DayMovingAvg){
        str50200 = "/UP";
    } else{
        str50200 = "/DOWN";
    }
    
    str50200 = ""; //"/ [ ]";

 
	var tmp_x =  XendOfCandles*0.575; 
	var tmp_y = 170;

//
//  STOCK TRENDING
//
   //   sstr =gGET_SymbolStr+ " Day-Trending: " + stockTrending.toUpperCase();
   // if(stockTrending == "UP"){
   //      ctx.fillStyle = "#33ee33";   // arrowgreenColor ;
   //      ctx.font = "80px Arial";
   //       ctx.fillText( sstr+str50200, tmp_x,  tmp_y );

   //  }else  if(stockTrending == "DOWN"){
   //      ctx.fillStyle = "#EE3333";   // arrowredColor ;
   //      ctx.font = "80px Arial";
   //       ctx.fillText( sstr+str50200, tmp_x,  tmp_y );
   //  }
 //
 //
    
    
    
    // SHOULD BE MOVED TO WRAP TEXT FN  LASTDATE 
    //
    ctx.fillStyle =  "#cccccc" ;
    ctx.font = "32px Arial";
  //  ctx.fillText( "Last Close: $"+gLastClose.toString()+" as of: "+gDateStrLast,  tmp_x,  tmp_y+40 );

    
    //check near stuff
    var pct2= gPctNear;
    var nearStr="", retStr="";
    
    retStr = CheckPriceNear("R3", gLastClose, monthR3, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("R2", gLastClose, monthR2, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("R1", gLastClose, monthR1, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("Pivot", gLastClose, monthP, pct2 );
    nearStr = nearStr + retStr;
    
    
    retStr = CheckPriceNear("S3", gLastClose, monthS3, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("S2", gLastClose, monthS2, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("S1", gLastClose, monthS1, pct2 );
    nearStr = nearStr + retStr;
    
//    var g50DayMovingAvg=0 , g200DayMovingAvg = 0 ;  //             var candles52WeekHigh, candles52WeekLow;

    retStr = CheckPriceNear("50-day MA", gLastClose, g50DayMovingAvg, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("200-day MA", gLastClose, g200DayMovingAvg, pct2 );
    nearStr = nearStr + retStr;
    
    
    retStr = CheckPriceNear("52-week LOW", gLastClose, candles52WeekLow, pct2 );
    nearStr = nearStr + retStr;
    
    retStr = CheckPriceNear("52-week HIGH", gLastClose, candles52WeekHigh, pct2 );
    nearStr = nearStr + retStr;
    
    
	gNEARSTR = gGET_SymbolStr+"'s Close is"+nearStr;

    if(nearStr != ""){
        
        ctx.fillStyle =  "#888888" ;
        // ctx.font = "24px Arial";
        ctx.font = "36px Arial";

       ctx.fillText( gGET_SymbolStr+"'s Close is"+nearStr ,  XendOfCandles*0.5,  230 );
        //ctx.fillText( gNEARSTR,  100,  230 );

    }
    // check if price is near
    //
    //    R3, R2, R1, P, S1, S2, S3
    //    52-wk Low, 52-wk High
    //
    
}//fn

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


function CheckAllNearPrices(){
    
    
    
}

function CheckPriceNear( lvlStr, closePrice, number, pct00){
    var retstr1= "";
    var retstr2= "";

    if(  ( Math.abs(closePrice-number) / closePrice ) < pct00 ){
        //WCB Sat 9/26/20 exception:  candlesticks.js:2909 Uncaught TypeError: number.toFixed is not a function
        //   so i removed the toFixed
        //retstr1 = lvlStr+"= $"+number.toFixed(2).toString()+" ;  " ;
        retstr1 = lvlStr+"= $"+number.toString()+" ;  " ;
        
        if(closePrice> number){
            retstr2 = " slightly above ";
        }else if(closePrice< number){
            retstr2 =  " slightly below ";
        }else  retstr2 =  " near ";
        
    }
    return( retstr2 + retstr1 );
}




        //orig
function GetYCoordFromPrice( priceInput ){
            // i.e. price range = $15 - $95 = 80,   ie $26-$15 = $11,  11/80 ~= 0.125 * Yrange (300) ~= $32.50
            
            var Ycanvas = YRange - (  ((priceInput - candlesPriceBoundsMin) / candlesPriceRange)  * YRange  ) ;
            
            return( Ycanvas ); 
}
        

function GetPriceFromYCoordOO( y0 , viewportRect ){

let price0=0;
  let y1 = 0;

//ratio
y1 = (y0-viewportRect.y) ;
y1 = y1 /viewportRect.h ;

y1 = y1 *rangeAllTime;
// price0 = lowAllTime +y1;
price0 = highAllTime  -y1;

    return(price0);

}


// 2nd gen. Called from above; needs lowAllTime, rangeAllTime
function GetYCoordFromPriceOO( priceInput , viewportRect ){
    let ypix=  GetYCoordFromPriceOO_2nd( priceInput ,viewportRect.y, viewportRect.h, lowAllTime, rangeAllTime );
    return(ypix);
}//fn


function GetYCoordFromPriceOO_2nd( priceInput, y1, YRange0 , PriceBoundsMin, PriceBoundsRange ){
            // i.e. price range = $15 - $95 = 80,   ie $26-$15 = $11,  11/80 ~= 0.125 * Yrange (300) ~= $32.50
            
// console.log(highAllTime, lowAllTime, high52week, low52week);
// console.log(highAllTimeIdx, lowAllTimeIdx, high52weekIdx, low52weekIdx);
// console.log(" (range alltime, range52week)==");
// console.log(rangeAllTime, range52week );

            // var Ycanvas = YRange - (  ((priceInput - candlesPriceBoundsMin) / candlesPriceRange)  * YRange  ) ;

// ie rect (200, 100 ,  2000=w, 850 =h )
//
//                      100+850 //950  -  ((price-min)/pricerange) * 850
            var Ycanvas = (y1+YRange0) - (  ((priceInput -  PriceBoundsMin) /  PriceBoundsRange)  * YRange0  ) ;
            
            return( Ycanvas );
            
}//fn




        
        
        
        
        
        
//
//  called after scan CandlesticksForAI();
//
//   note: ai is still computed bewow...
//
//
function drawCandlesticks( candleArray ){
    var i=0, j=0, idx=0, o0= 0, h0=0, l0=0, c0=0, v0=0 ;
    var idx_1=0, h0_1=0, l0_1=0, c0_1=0  ;
    
    var dateStr="", dateNoYrStr="", pivotStr="", pivot3Str="", symDataStr = "";
    var a52weekLowReached = -1, a52weekHighReached=-1;

    // init
    gNumGapsDOWN_Open     =0;    
    gNumGapsDOWN_Closed   =0;

    gNumGapsUP_Open     =0;    
    gNumGapsUP_Closed   =0;

// clear the gap up / down indicators
    gIndicators[  gAIbelowGapDown  ]  = "0"; 
    gIndicators[  gAIaboveGapUp    ]  = "0"; 


var currentmonthNum0="*^";

var candlesObjsLen = candlestickObjects.length -1;    // push'd candle objs


	insertNewPixelArray( 0, candleXnext,   -1 );


//**********************************************************************************
//**********************************************************************************
//****************************   for    LOOP START    ******************************
//**********************************************************************************
//**********************************************************************************
//





      for(i=0+gCandlesLenAdder; i<(candlesLen-gCandlesLenSubtractor); i++){
            // for(i=0; i<candlesObjsLen; i++){
                idx = i * candlesOffset;
              
                idx_1 = idx;
                h0_1  = h0 ;
                l0_1  = l0 ;
                c0_1  = c0 ;

                if( i > 0 ){
                    //  compute yesterday's index idx_1 and high and low
                    idx_1 = (i-1) * candlesOffset;
                    
                    h0_1  = Number( candleArray[ idx_1 + H ]  );
                    l0_1  = Number( candleArray[ idx_1 + L ]  );
                    c0_1  = Number( candleArray[ idx_1 + C ]  );
                }
                
                
                o0 = Number( candleArray[ idx + O ]  );
                h0 = Number( candleArray[ idx + H ]  );
                l0 = Number( candleArray[ idx + L ]  );
                c0 = Number( candleArray[ idx + C ]  );
                
                v0 = Number( candleArray[ idx + V ]  );
                
                dateStr   =  candleArray[ idx + DATE ] ;
                 dateNoYrStr=dateStr.substring(5, dateStr.length);

                pivotStr  = ""+ candleArray[ idx + P  ] ;
                pivot3Str = ""+ candleArray[ idx + P3 ] ;
                
                symDataStr =  candleArray[ idx + BUYSELL ] ;


//  '293.70','293.73','290.64','290.76','82028656','2019-06-25','293.90','293.90','Tue','SPY','10','11','12','13','50.00','_*_*1',
// ie 02, 11, 09, 12 etc off 2020-04-01
    // currentmonthNum0 = dateStr; //Number( dateStr.substring(5, 2) );
    currentmonthNum0 =  dateStr+"?"; //.substring(5, 5) ;

var xg0 = candleXnext,  yg1 =0, yg2 = 0;

var xg007 = candleXnext + candleOffset ;      // move arrow pointint directly in line w/ Y of Candle's WICK

var numCandlesChannel;
 
var yClose    =  GetYCoordFromPrice( c0 );
var yClose_1  =  GetYCoordFromPrice( c0_1 );

var resultStr="false";

var epsilon = 0.0025;   // .25%  = 52-week hi/low
var cmp_52;
                

// var GapUpPct = 0.015, GapDownPct = 0.015;
var GapUpPct = 0.0075, GapDownPct = 0.0075;

var yy2   = GetYCoordFromPrice( h0 );
var yy2_1 = GetYCoordFromPrice( h0_1 );
var yy3   = GetYCoordFromPrice( l0 );
var yy3_1 = GetYCoordFromPrice( l0_1 );

                
var deltaHCD = 0;                
var deltaLCD = 0;                
 





////////////////////////////////////////////////////////////////////////////////
//
//        GAP UP / GAP DOWN
//
//
//   //	var  gGreenGapUp = "#33ffff", gPinkGapDown = "#ff33cc";  
//

// gNumGapsOpen         
// gNumGapsClosed  
	var  greenGapUp = "#8cff1a", greenGapUp1 = "#00cc99", pinkGapDown = "#ff33cc", pinkGapDown1="#cc6699";  
	var  gapClosedX = -1;

// note: should only affect rendering, vs here skippng all computations...
if( gDrawGaps==1) {

// gap down
            
          //      if( high[today] < low[yesterday] )...
                if( h0 < l0_1 ){
                    if(  ( ( l0_1 - h0 ) / l0_1 ) > GapDownPct  ){

                        gapClosedX = DetectAndDrawGapClosed( "down", candleXnext, yy3_1 , l0_1, i , candleArray ,  arrowredColor , pinkGapDown);			// from above def:	var yy3_1 = GetYCoordFromPrice( l0_1 );
                    	if(gapClosedX>0){
                    	 	DrawVerticalLine( gapClosedX ,  pinkGapDown1, yy3_1 , yy2 , 24);
                    	 	DrawHorizontalLine( candleXnext,  gapClosedX , pinkGapDown,  yy2  , 8 );
	                        DrawHorizontalLine( candleXnext-candleWidth,  gapClosedX , pinkGapDown,  yy3_1  , 5 );
	                        
                            gNumGapsDOWN_Closed++;

                    	 }else{  // ie not closed
	                        DrawHorizontalLine( candleXnext,  (candleXnext+500) , pinkGapDown,  yy2  , 8 );
	                        DrawHorizontalLine( candleXnext-candleWidth,  (candleXnext+1250) , pinkGapDown,  yy3_1  , 5 );
	                        
                            gNumGapsDOWN_Open++;

                            if(gLastClose_PreScanAI < l0_1 )   gIndicators[  gAIbelowGapDown  ]  = "99" ;

                            }

                        drawText("GAP DOWN: $"+h0, (candleXnext+100) , yy2-4 , 24,  arrowredColor  );
                        drawText("GAP-FILL: $"+l0_1+"; -$"+(l0_1-h0).toFixed(2), (candleXnext+75) , yy3_1-4 , 24,  arrowredColor  );

 
                    }
                }

// gap up
                
                if( l0 > h0_1   &&   i!=0   ){   // && i!=0  for 1st gap up anomaly case..
                    if(( ( l0 - h0_1 ) / h0  ) > GapUpPct ){

                    gapClosedX = DetectAndDrawGapClosed( "up",     candleXnext, yy2_1 , h0_1, i , candleArray  , arrowgreenColor, greenGapUp );       /// from above definition   var yy2_1 = GetYCoordFromPrice( h0_1 );
                    if(gapClosedX>0){ 
                    		DrawVerticalLine( gapClosedX ,  greenGapUp1, yy2_1 , yy3 , 24);
                    		DrawHorizontalLine( candleXnext,  gapClosedX , greenGapUp,  yy3  , 8 );
			                DrawHorizontalLine( candleXnext-candleWidth,  gapClosedX , greenGapUp,  yy2_1  , 5 );
								
                                gNumGapsUP_Closed++;

                    		}else{
			                    DrawHorizontalLine( candleXnext,  (candleXnext+500) , greenGapUp,  yy3  , 8 );
			                    DrawHorizontalLine( candleXnext-candleWidth,  (candleXnext+1250) , greenGapUp,  yy2_1  , 5 );

                                gNumGapsUP_Open++;

                                if(gLastClose_PreScanAI > h0_1 )   gIndicators[  gAIaboveGapUp  ]  = "99" ;


                            }
                    drawText("GAP UP: $"+l0, (candleXnext+100) , yy3-4 , 24,  arrowgreenColor  );
                    drawText("GAP-FILL: $"+l0_1+"; +$"+(l0-h0_1).toFixed(2), (candleXnext+75) , yy2_1-4 , 24,  arrowgreenColor  );

 

                    }
                }

}//if( gDrawGaps==1) {

 








////////////////////////////////////////////////////////////////////////////////
//
//        VOLUME BARS HISTORAM RENDERED
//
//			RVOL CHK

                var pct = ( v0 * 100 ) / volHigh  * 3;
                
                let gcol= "#335544";
                let rcol= "#554433";
                var volavg10day = processVolume10day(i , v0, dateStr );
                if(   volavg10day>0   &&   v0 > (2*volavg10day) ){

                		 gcol= "#11ff22";
                         rcol= "#ff1122";
                         //register RVOL  AlgoString
                }

                if(o0 < c0)  ctx.fillStyle =gcol;    // if open > close, GREEN else RED
                 else  ctx.fillStyle = rcol ;
                //ctx.fillStyle = "#ff9966";
                //    Ybottom = canvasHeight - star tY ;  ///* 0.975 ;  //(canvasHeight * yPct ); //0.975 ;                // Y bottom
// quick hack
                let Ybottom1 =canvasHeight - g_startY -140 ;
                ctx.fillRect( candleXnext, Ybottom1-pct, candleWidth, pct );
                
                //
                // RVOL CALL OUT
                // if (avg10-day Vol *  5) < Todays vol
                //
                //
                





                
////////////////////////////////////////////////////////////////////////////////
//
//        52-wk HIGH / LOW  REACHED...
//
                
                
//      52-wk HIGH
                
 var weeks52 =      (candlesLen/256*52).toFixed(1);
          
if(a52weekHighReached<0){

cmp_52 = Math.abs(  candles52WeekHigh - h0  )   /  candles52WeekHigh ;

if(cmp_52 < epsilon){
 
  drawText( weeks52 +"-week HIGH: $"+candles52WeekHigh, candleXnext+250, yy2+28 , 28,  g52WeekHIGHColor  );
//  DrawHorizontalLine( candleXnext,  (candleXnext+1500) , arrowgreenColor,  yy2  , 4 );  // 
  DrawHorizontalLine( candleXnext,  (candleXnext+2500) , arrowredColor,  yy2+6  , 4 );  // 
  DrawHorizontalLine( candleXnext,  (candleXnext+2500) , g52WeekHIGHColor,  yy2  , 4 );  // 

    a52weekHighReached= i ;
    }

}

                
//      52-wk LOW  DRAW52   var g52WeekHIGHColor = "#ffaf0f", g52WeekLOWColor = "#7bff09";


if(a52weekLowReached<0){

cmp_52 = Math.abs(  candles52WeekLow - l0  )   /  candles52WeekLow;

if(cmp_52 < epsilon){

  drawText( weeks52 +"-week LOW: $"+candles52WeekLow, candleXnext+250, yy3 , 28,  g52WeekLOWColor  );
//  DrawHorizontalLine( candleXnext,  (candleXnext+1500) , arrowredColor,  yy3  , 4 );
  DrawHorizontalLine( candleXnext,  (candleXnext+2500) , arrowgreenColor,  yy3+6  , 4 );
  DrawHorizontalLine( candleXnext,  (candleXnext+2500) , g52WeekLOWColor,  yy3  , 4 );

    a52weekLowReached= i ;
    
    }

    
    
}







////////////////////////////////////////////////////////////////////////////////
//
//        BUY / SELL SIGNALS   + HCD / LCD
//

if(typeof symDataStr === "undefined"){
  ;
}else  if(symDataStr.substring(0, 3) =="buy"){
    
	numCandlesChannel = Number(  symDataStr.substring(3, symDataStr.length) );
    
    let priceNow =  Number( pivotStr );
    yg1 =GetYCoordFromPrice( priceNow    );
    // yg1 =GetYCoordFromPrice(  Number( pivotStr )    );


    if(numCandlesChannel > 3){
          TakeAlgoPosition(priceNow, "long" , dateStr);
          if(gDrawBacktest==0)   DrawTriangle( xg007,  yg1*1.05, 28, arrowgreenColor, numCandlesChannel, currentmonthNum0, pivotStr, dateNoYrStr  );
            else   DrawTriangle( xg007,  yg1*1.05, 28, arrowgreenColor, numCandlesChannel, currentmonthNum0, pivotStr, dateNoYrStr+" $"+gPositionCash.toFixed(0).toString()+", "+gPositionShares.toString()+  " #sh" );
        
      // TakeAl goPosition(priceNow, "long" );

      

     if(gDrawMinorCrossover==1 && gDrawMinorCrossoverBuySignal==1 )  drawText( symDataStr.substring(3, symDataStr.length), xg0+12, (yg1*1.05)+0,  34,  arrowgreenColor);



//old single-day HCD check with no prior day check
                //resultStr =  DetectIndicator( "HighCloseDoji", i , xg007,  yClose  , candleArray, idx ) ;

                //// write the HCD into the Array
                //if(resultStr=="true"){
                //    candleArray[ idx + LCDHCD ] = "HCD";
                //    }


        
//      HCD
        // here we check for possible HCD 1 day BEFORE the BUY Signal, to strengthen the case of the buy signal
        resultStr =  DetectIndicator( "HighCloseDoji", (i-1) , (xg007-candleOffset-candleWidth),  yClose_1  , candleArray, (idx-candlesOffset) ) ;
 
        // write the HCD into the Array, one day back
       if(resultStr=="true"){
             candleArray[ (idx-candlesOffset) + LCDHCD ] = "HCD";

             //jmb 063019
             gHCD_candleNum = (i-1) ;
             deltaHCD = ((candlesLen-1) - gHCD_candleNum);
             if( deltaHCD < 10 )  gIndicators[ gAIHCD ] = ( (10 - deltaHCD  ) *10 ).toString();
		             	else gIndicators[ gAIHCD ] = ( 0 ).toString() ;

             gTestString =  "HCDi=="+ gHCD_candleNum.toString() +" lastCandle==" + (candlesLen-1).toString()+ " delta = "+ deltaHCD.toString()  +" gIndHCD=="+gIndicators[ gAIHCD ];
        

         }else{

                 resultStr =  DetectIndicator( "HighCloseDoji", i , xg007,  yClose  , candleArray, idx ) ;

                // write the HCD into the Array
                if(resultStr=="true"){
                    candleArray[ idx + LCDHCD ] = "HCD";
//jmb 063019
                    gHCD_candleNum = i ;
                    deltaHCD = ((candlesLen-1) - gHCD_candleNum);
		             if( deltaHCD < 10 )  gIndicators[ gAIHCD ] = ( (10 - deltaHCD  ) *10 ).toString() ;
		             	else gIndicators[ gAIHCD ] = ( 0 ).toString() ;

                    gTestString =  "HCDi=="+ gHCD_candleNum.toString() +" lastCandle==" + (candlesLen-1).toString() + " delta = "+ deltaHCD.toString() +" gIndHCD=="+gIndicators[ gAIHCD ];


                    }
            }//else
          
        

    }else{  // minor crossover - likely not a Sell signal
       if(gDrawMinorCrossover==1){		 //  || gUncontestedBuySignal==1 ){
          ;
// BUY SIGNAL MINOR 
              if(gDrawMinorCrossoverBuySignal==1){
                   DrawTriangle( xg007,  yg1*1.05, 10, arrowgreenColor1, numCandlesChannel ,currentmonthNum0, pivotStr, dateStr );
                   if(gDrawMinorCrossover==1) drawText( symDataStr.substring(3, symDataStr.length), xg0+12, (yg1*1.05)-0,  16,   arrowgreenColor);
                  }
        }
	}






      
}else if(symDataStr.substring(0, 3)  =="sel"){
    
   	numCandlesChannel = Number(  symDataStr.substring(3, symDataStr.length)  );
    let priceNow1 =  Number( pivot3Str );
    yg2 = GetYCoordFromPrice(  Number( pivot3Str )    );


      if(numCandlesChannel >3 ){
          TakeAlgoPosition(priceNow1, "short", dateStr );

      	    if(gDrawBacktest==0) DrawTriangle( xg007,  yg2*0.95, 28, arrowredColor , numCandlesChannel , currentmonthNum0, pivot3Str, dateNoYrStr );
		            else DrawTriangle( xg007,  yg2*0.95, 28, arrowredColor , numCandlesChannel , currentmonthNum0, pivot3Str, dateNoYrStr+" $"+gPositionCash.toFixed(0).toString()+", "+gPositionShares.toString()+  " #sh" );
                
 
          // if(gDrawMinorCrossover==1) drawText( symDataStr.substring(3, symDataStr.length), xg0+12, (yg2*0.95)-0 , 32,  arrowredColor  );



//      LCD
    // original code
   //      resultStr =  DetectIndicator( "LowCloseDoji", i , xg007,  yClose , candleArray, idx  );
  //       // write the LCD into the Array
 //        if(resultStr=="true"){
//             candleArray[ idx + LCDHCD ] = "LCD";
//         }

        //  FIRST CHECK FOR PRIOR DAY
        resultStr =  DetectIndicator( "LowCloseDoji", (i-1),  (xg007-candleOffset-candleWidth),  yClose_1  , candleArray, (idx-candlesOffset)  );
        // write the LCD into the Array
        if(resultStr=="true"){
             candleArray[ (idx-candlesOffset) + LCDHCD ] = "LCD";


  			//jmb 063019
             gLCD_candleNum = (i-1) ;

  				deltaLCD = ((candlesLen-1) - gLCD_candleNum);
		        if( deltaLCD < 10 )  gIndicators[ gAILCD ] = ( (10 - deltaLCD  ) *10 ).toString() ;
		             	else gIndicators[ gAILCD ] = ( 0 ).toString() ;

                gTestStringLCD =  "LCDi=="+ gLCD_candleNum.toString() +" lastCandle==" + (candlesLen-1).toString() + " deltaLCD = "+ deltaLCD.toString() +" gIndLCD=="+gIndicators[ gAILCD ];


         }else{


            resultStr =  DetectIndicator( "LowCloseDoji", i , xg007,  yClose , candleArray, idx  );
            // write the LCD into the Array
            if(resultStr=="true"){
                candleArray[ idx + LCDHCD ] = "LCD";


                  //jmb 063019
                gLCD_candleNum = i ;

  				deltaLCD = ((candlesLen-1) - gLCD_candleNum);
		        if( deltaLCD < 10 )  gIndicators[ gAILCD ] = ( (10 - deltaLCD  ) *10 ).toString() ;
		             	else gIndicators[ gAILCD ] = ( 0 ).toString() ;

                gTestStringLCD =  "LCDi=="+ gLCD_candleNum.toString() +" lastCandle==" + (candlesLen-1).toString() + " deltaLCD = "+ deltaLCD.toString() +" gIndLCD=="+gIndicators[ gAILCD ];


            }


         }//else





          
		}else{  // minor crossover - likely not a Sell signal
       if(gDrawMinorCrossover==1){
            	 DrawTriangle( xg007,  yg2*0.95, 10, arrowredColor1 , numCandlesChannel, currentmonthNum0, pivot3Str, dateStr);
      		     // drawText( symDataStr.substring(3, symDataStr.length), xg0+12, (yg2*0.95)-0 , 16,  arrowredColor  );
          }

		}


}


// monthly sup/res calc
// 2 calls down the last vs current month is handled
                if(currentMonth == lastMonth){
                            // we are inside 1 month, so calc H, L & C for month
                    if(h0>monthHigh) monthHigh = h0;  // grab the h0 candle's high IFF it is high
    
                    if(l0<monthLow) monthLow = l0;
    
                    monthClose = c0;
                    candleMonthCnt ++;
    
                }// if
                
                

          drawCandlestick(  o0, h0, l0, c0, dateStr, v0, pivotStr, pivot3Str , idx);

             
            }// for i


///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// END OF  drawCandlest ick( ...)  LOOP  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

      insertNewPixelArray( candleXnext, canvasGlobal.width , -1 );

      // console.log("] AFTER DRAW CANDLESTICKS-loop gPixelArray=");
      // console.log(gPixelArray);





// predict!
if(gPredict==1){


	var p=0;
	var o0a=0, h0a=0, l0a=0, c0a=0, v0a=0 ;
	var depthback =45;//= 10;
	var idxp=0;
//          drawCandlestickOnly(  c0, h0, l0, o0, dateStr, v0, pivotStr, pivot3Str );

            for(p=i-1; p>(candlesLen-depthback); p--){
                
                idxp = p * candlesOffset;
                 
                o0a = Number( candleArray[ idxp + O ]  );
                h0a = Number( candleArray[ idxp + H ]  );
                l0a = Number( candleArray[ idxp + L ]  );
                c0a = Number( candleArray[ idxp + C ]  );
                v0a = Number( candleArray[ idxp + V ]  );

		          drawCandlestickOnly(  c0a, h0a, l0a, o0a, dateStr, v0a, pivotStr, pivot3Str );


            }//for p
}

if(gDrawFutureOppositeChart==1){
  ;

// // DRAW future opposite chart **************************************
// //
//  	var ii0=1,  i2=0,  i3=0,  idx3=0;
// //
// ////f0r(i=0; i<candlesLen; i++){
// //
//  	for( i2 = candleslen; i2 < (candlesLen + 20); i2++ ){

// 		// i3 ~= i to count backwards...

// 		 i3 	= i2 - ii0;
//          idx3   = i3 * candlesOffset;

// 		o0 = Number( candleArray[ idx3 + O ]  );
// 		h0 = Number( candleArray[ idx3 + H ]  );
// 		l0 = Number( candleArray[ idx3 + L ]  );
// 		c0 = Number( candleArray[ idx3 + C ]  );
                
// 		v0 = Number( candleArray[ idx3 + V ]  );
           
                
// ////    drawCandlest ick(  o0, h0, l0, c0, dateStr, v0, pivotStr, pivot3Str );
//      // swap open and close so opposite candle color/price occurs
//         drawCan dlestick(  c0, h0, l0, o0, dateStr, v0, pivotStr, pivot3Str );


// 		 ii0++;

// 	}//for i2             
}


    //
    //
    //		END OF CANDLE i loop
    //
    ////////////////////////////////////////////////////////////////////////////////




// place DRAW S1-R3 NEXT-MONTH  CODE HERE...

//gThisMonthX 



    ////////////////////////////////////////////////////////////////////////////////
    //
    //        GRAB THE LAST CLOSE,  // update Global vars
    //
    
    gLastClose  = c0;
    
    XendOfCandles  = candleXnext + candleWidth + candleOffset ;


 SetPriceToLastXYPos( gLastClose ); 


    CheckAIatS1_R3Indicators();

    ProcessReservedIndicators();

// by now the data should be there... 
  if(gDrawWindowed==1){
      RenderWindowOOCandles( gCandleMonthlyObj,  gViewportRectInset, "monthly" , "stocks" );
    }else if(gDrawWindowed==2){
      RenderWindowOOCandles( gCandleWeeklyObj,  gViewportRectInset, "weekly" , "stocks" );
    }
            
            
}//fn drawCandlesti cks()
  


 
function SetPriceToLastXYPos( price0 ) {
    let yCls = GetYCoordFromPrice( price0 );
    gLastXPos =  candleXnext + gLastXoff;
    gLastYPos =  yCls + gLastYoff;
}

function DrawPriceAtLastCandlestick1(   ){
    drawText( gClosedUpDnStr1, gLastXPos, gLastYPos , 48, gLastCandleColor);   
}









function LogAlgoPosition(price0, longShortStr , udateStr, buyst ){
  if(longShortStr=="short") longShortStr='SOLD';
  if(longShortStr=="init") gAlgoTradeStr+="<h2>[ Algo Investor Starts Trading: "+gGET_SymbolStr+" ]</h2>";


    gAlgoTradeStr+= "<p>"+"["+  buyst.toString() +"]"+ udateStr +": "+longShortStr+" "+gPositionShares.toString()+ " shares of "  +gGET_SymbolStr +" at $"+price0.toString()+"; PositionCash=$"+
           gPositionCash.toFixed(0).toString()  + "; Profit=$"+
           gPositionCash1.toFixed(0).toString()      +"</p>";
  
}

// NOTE: Now it only does YEAR!!!
function compareDateYEARStrs(date1,date2){
  let y1str = date1.substring(0,4);
  let y2str = date2.substring(0,4);
  let y1 = Number(y1str);
  let y2 = Number(y2str);
  // return -1 date1<date2, 0 date1==date2, 1 date1>date2
  let retval=0;

if(y1<y2) retval=-1;
 else if(y1>y2) retval=1;

// console.log("retval");
// console.log(retval);


  return(retval);
}
// 
//  2 things: 1 gBuyEpsilon, 2 = reject & stop algo if date<last date [data bug]
// 
function TakeAlgoPosition(price0, longShortStr , udateStr){
 
// if( gAlgoStop==1 ) return;
 
 if (compareDateYEARStrs(  gLastUDate, udateStr )==-1) {  // if next udate < lastdate abort,dataBUG!

 gAlgoStop=1;
 // return;

}else gLastUDate = udateStr;

// 1st time thru ?
if(gPositionInit3 == 0){
  gPositionInit3 = price0* 300 ;  // TOTAL INIT SIZE
  gFirstBuyPrice = price0;
  gFirstDate = udateStr ;

   LogAlgoPosition(-1.00, "init" , udateStr, -1 );

}

 if(longShortStr=="long"){
// try to go long

    if(gBuyState==0){

      gBuyState=1;
      gPositionCash += ( price0 * gPositionSize * -1);
      gPositionShares += gPositionSize;

      gPreviousBuyPrice = price0;  // gBuyEpsilon=0.02 ie must be 2%lower

      LogAlgoPosition(price0, longShortStr , udateStr, gBuyState );


    }else if(gBuyState==1){
      // here it has 100 shares already, let's make sure that BUY#2 is Epsilon LOWER in price
      // if(price0 < (1.0-gBuyEpsilon)* gPreviousBuyPrice ){
          // // buy twice as much on 2nd buy signal, then don't buy any more until ALL SOLD
          // gBuyState=2;
          // gPositionCash += ( price0 * gPositionSize * gPosition2Mult * -1);
          // gPositionShares += gPositionSize* gPosition2Mult;

      // }
          // CONCAT  ^^^^      // buy twice as much on 2nd buy signal, then don't buy any more until ALL SOLD
          gBuyState=2;
          gPositionCash += ( price0 * gPositionSize * gPosition2Mult * -1);
          gPositionShares += gPositionSize* gPosition2Mult;





      LogAlgoPosition(price0, longShortStr , udateStr, gBuyState );


    }


 }else if(longShortStr=="short"){
  // try to go short
    if(gBuyState > 0){
      // if state==1 or 2, then add to cash price * our position
              gPositionCash += ( price0 * gPositionShares * 1);


              gPositionCash1 = gPositionCash;

                   LogAlgoPosition(price0, longShortStr , udateStr, gBuyState );

      // reset buy state  & zero out position
             gPositionShares = 0;
             gBuyState=0;
                   LogAlgoPosition(price0, "flat" , udateStr, gBuyState );


    }

 }


}//fn








/*

var gAIbuySignal            = 8;
var gAIHCD                  = 9;
var gAIatMonthlyS1          =10;
var gAIbelowGapDown         =11;   // bullish

// Bearish Indicators
var gAIbearishWedge         =12;
var gAIsellSignal           =13;
var gAILCD                  =14;
var gAIatMonthlyR1          =15;
var gAIaboveGapUp           =16;   // bearish


*/

function ProcessReservedIndicators(){

	var v1=0, v2=0, v3=0, v4=0, v5=0;




	//
	//
	// 
	//  FIRST WE do BULLISH    ********************
	gIndicators[ gAIbullishPennant ] = "0";

	v1 = Number(  gIndicators[ gAIbuySignal    ]  );  //.toFixed(2)          ;
	v2 = Number(  gIndicators[ gAIHCD          ]  );  //.toFixed(2)          ;
	v3 = Number(  gIndicators[ gAIatMonthlyS1  ]  );  //.toFixed(2)          ;
	v4 = Number(  gIndicators[ gAIbelowGapDown ]  );  //.toFixed(2) 		 ;   

	v5 = (v1+v2+v3+v4)/4 ;

// set this reserved indicator to the avg of the Bullish 4
	gIndicators[ gAIbullishPennant ] =  (  v5  ).toString() ;

	 
	//
	//
	//
	//   SECOND, WE do BEARISH ********************
	gIndicators[ gAIbearishWedge ] =  "0";

	v1 = Number( gIndicators[ gAIsellSignal   ] );  //.toFixed(2)          ;
	v2 = Number( gIndicators[ gAILCD          ] );  //.toFixed(2)          ;
	v3 = Number( gIndicators[ gAIatMonthlyR1  ] );  //.toFixed(2)         ;
	v4 = Number( gIndicators[ gAIaboveGapUp   ] );  //.toFixed(2) 		   ;   

	v5 = (v1+v2+v3+v4)/4 ;

// set this reserved indicator to the avg of the Bearish 4
	gIndicators[ gAIbearishWedge ] =  (  v5  ).toString() ;


	//
	//
	//


}



function CheckAIatS1_R3Indicators(){


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//			TEST   gAIatMonthlyS1  and  gAIatMonthlyR1
//
//
//   ***************  90   95   100
//   ***************  S1   S2    S3
//
//
// gIndicators[ gAIatMonthlyS1/R1 ]  =    ;
//
//    if(  ( Math.abs(gCLOSEday -number) / closePrice ) < pct00 ){
// 
// linear hack: >=90% == we're at/nearEpsilon Support S1; 95% S2, 100% >=S3 

	var pct00 = 0.02;


// check day's cl ose vs Monthly  SUPPORT  S1-S3 (note: set in DrawCandleStickGeo...() ) 

// BUT 1st default it to 0
   gIndicators[ gAIatMonthlyS1 ]  =    "0";

    if(  ( Math.abs(gCLOSEday - gS1month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyS1 ]  =    "90";

    }else  if(  ( Math.abs(gCLOSEday - gS2month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyS1 ]  =    "95";

    }else  if(  ( Math.abs(gCLOSEday - gS3month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyS1 ]  =    "100";
    }  


//gIndicators[ gAIatMonthlyS1 ]  =    "95";


	if(gIndicators[ gAIatMonthlyS1 ]  ==  "95"){
			timetotrade3[ (gAIatMonthlyS1* 3)+1 ] = "+at S2 Support";

	}else if(gIndicators[ gAIatMonthlyS1 ]  ==  "100"){
			timetotrade3[ (gAIatMonthlyS1* 3)+1 ] = "+at S3 Support";

//	}else if(gIndicators[ gAIatMonthlyS1 ]  ==  "90"){
	}else {
			timetotrade3[ (gAIatMonthlyS1* 3)+1 ] = "+at S1 Support";

	}







//   check day's cl ose vs Monthly  RESISTANCE  R1-R3 (note: set in DrawCandleStickGeo...() ) 

// BUT 1st default it to 0
	gIndicators[ gAIatMonthlyR1 ]  =   "0";

    if(  ( Math.abs(gCLOSEday - gR1month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyR1 ]  =    "90";

    }else  if(  ( Math.abs(gCLOSEday - gR2month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyR1 ]  =    "95";

    }else  if(  ( Math.abs(gCLOSEday - gR3month) / gCLOSEday ) <= pct00 ){

            gIndicators[ gAIatMonthlyR1 ]  =    "100";
    }  

   
//	gIndicators[ gAIatMonthlyR1 ]  =    "100";    // ie 90 == R1, 95 == R2, 100 == R3



	if(gIndicators[ gAIatMonthlyR1 ]  ==  "95"){
			timetotrade3[ (gAIatMonthlyR1* 3)+ 1 ] = "-at R2 Resistance";

	}else if(gIndicators[ gAIatMonthlyR1 ]  ==  "100"){
			timetotrade3[ (gAIatMonthlyR1* 3)+ 1 ] = "-at R3 Resistance";

	//}else if(gIndicators[ gAIatMonthlyR1 ]  ==  "90"){
	}else {
            timetotrade3[ (gAIatMonthlyR1* 3)+1 ] = "-at R1 Resistance";

    }








/*

// check S1,S2,S3 first

		if(( Math.abs( gCLOSEday - gS1month ) / gCLOSEday ) <= epsilon )  {
			
			gIndicators[ gAIatMonthlyS1 ]  =   "90" ;
		

		}else  if(( Math.abs( gCLOSEday - gS2month ) / gCLOSEday ) <= epsilon ) {

			gIndicators[ gAIatMonthlyS1 ]  =   "95" ;

		}else  if(( Math.abs( gCLOSEday - gS3month ) / gCLOSEday ) <= epsilon ) {

			gIndicators[ gAIatMonthlyS1 ]  =   "100" ;

		}



// check R1,R2,R3 first

		if(( Math.abs( gCLOSEday - gMonthlyR1?? ) / gCLOSEday ) <= epsilon )  {
	
		}






*/






}//fn




//
// candlesLen
//
// DetectAndDrawGa pClosed( "up", candleXnext, yy2_1 , h0_1, i , idx , col  );       /// from above definition   var yy2_1 = GetYCoordFromPrice( h0_1 );
//
//
//      Note: Still need to DELETE 1st faulty GAP UP Anomaly !!
//
//

function DetectAndDrawGapClosed(  upDnStr, candleX, candleY, price00, i0, candleArray00, color00 , color01 ){

var h00, l00, j, j00, jdx =0;

var gapClosed = false;
var candleXlocal=0;

//	if( upDnStr!="down"  &&  upDnStr!="up" ) return;

	j   = i0 +1;  // start at next candlestick
	j00 = 0 ;

	//for( j = i0+1 ; j < candlesLen ; j++){
	while(  (j < candlesLen)  &&  (!gapClosed)  ){

		jdx = j * candlesOffset ;   // note: candlesOffset is for the array

        h00 = Number(  candleArray00[ jdx + H ]  );
        l00 = Number(  candleArray00[ jdx + L ]  );


        candleXlocal = candleX  +  ( j00 * (candleWidth + candleOffset)  );    // note: candleOffset is for X pixels BETWEEN drawn candles


		if(upDnStr=="up" ){
	      //  drawText("GAP-UP****UP", (candleX+450) , candleY-4 , 36,  color00 );

	        if (l00 <= price00){
	        	// GapUP closed down at this jdx
	        	drawText("****GAP-UP CLOSED", candleXlocal , candleY-14 , 24,  color01 );

				//DrawVerticalLine( candleXlocal,  color01, candleY , candleY+50 , 12);

	        	gapClosed=true;
	        }


		}else if(upDnStr=="down" ){ 
	      //  drawText("GAP-DOWN****DOWN", (candleX+450) , candleY-4 , 36,  color00  );

			if (h00 >= price00){
	        	// GapDOWN closed down at this jdx
	        	drawText("****GAP-DOWN CLOSED", candleXlocal , candleY-14 , 24,  color01 );

	        	//function DrawVerticalLine( xa1,  col, Yval ,Yval2 , thick){
				//DrawVerticalLine( candleXlocal,  color01, candleY , candleY+50 , 12);

	        	gapClosed=true;

	        }

		}//if


		j++;  	
		j00++;


	}//for  / while


	if(gapClosed){
        //return(  (candleXlocal+candleWidth+candleOffset)  );
        return(  (candleXlocal+candleWidth+candleWidth)  );

	}else return(-1);



}// fn











// LCD – take index ( I ) and count 3 back from Current Candlestick, and check for LCD
// HCD – take index ( I ) and count 3 back from Current Candlestick, and check for HCD
// 52-week HIGH Check
// 52-week LOW Check
// GAP DETECTION  - UP
// GAP DETECTION  - DOWN
// VOLUME DOWN- ON LOW VOLUME




function DetectIndicator( indicatorStr , candleNo , x07,  y07  , candleArray, idx  ){
    
    var retStr="false";   // assume false

    var dojiCount = 0;
    var circleRadius = 30, fff=1.15 ;

// if(gDrawBuySell==1){

        if(indicatorStr=="HighCloseDoji"){

            dojiCount = 0;
            dojiCount +=  CheckHCD( candleNo, idx, (candleNo-1),  candleArray  );
            dojiCount +=  CheckHCD( candleNo, idx, (candleNo-2),  candleArray  );
            dojiCount +=  CheckHCD( candleNo, idx, (candleNo-3),  candleArray  );

            if( dojiCount == 3 ){
		      retStr="true";
	
	 if(gDrawDojis ==1){
              drawCircle1( x07, y07-circleRadius, circleRadius, "#3333CC" );             // GREEN UP
              drawCircle1( x07, y07-(circleRadius*fff), circleRadius*fff,  arrowgreenColor  );             // GREEN UP

              drawText( "HCD", x07-candleOffset-candleWidth, y07-circleRadius, 34 , arrowgreenColor );
              	}
            }

        }else if(indicatorStr=="LowCloseDoji"){

			 dojiCount = 0;
            dojiCount +=  CheckLCD( candleNo, idx, (candleNo-1),  candleArray   );
            dojiCount +=  CheckLCD( candleNo, idx, (candleNo-2),  candleArray   );
            dojiCount +=  CheckLCD( candleNo, idx, (candleNo-3),  candleArray   );

            if( dojiCount == 3 ){
				retStr="true";
	 if(gDrawDojis ==1){
                drawCircle1( x07, y07-circleRadius, circleRadius, "#3333CC" );             // RED DOWN
                drawCircle1( x07, y07-(circleRadius*fff), circleRadius*fff,  arrowredColor  );             // GREEN UP

              drawText( "LCD", x07-candleOffset-candleWidth, y07+ (2*circleRadius), 34 , arrowredColor  );
              	}


            } 
        }
// }//if(gDrawBuySell==1){



    
   return( retStr );
    
}


function CheckLCD( i0, idx0, i0n , candleArray0 ){

	var validLCD =0;
  var currentLow= 0;
  var compareLow= 0;

  var idx0n = i0n * candlesOffset;       //  idx= i * candlesOffset;      // ie 0 * 16,   1* 16

// check the close of candlestick #i0 vs candlestick #i0n
    currentLow = Number(  candleArray0[ idx0  + C ]  );          
    compareLow = Number(  candleArray0[ idx0n + C ]  );          

    if( currentLow < compareLow) validLCD =1;


	return( validLCD );


}


function CheckHCD( i0, idx0, i0n , candleArray0 ){

	var validHCD = 0;
  var currentHigh= 0;
  var compareHigh= 0;

  var idx0n = i0n * candlesOffset;       //  idx= i * candlesOffset;      // ie 0 * 16,   1* 16

// check the close of candlestick #i0 vs candlestick #i0n
   currentHigh = Number(  candleArray0[ idx0  + C ]  );          
   compareHigh = Number(  candleArray0[ idx0n + C ]  );          

   if( currentHigh > compareHigh) validHCD =1;




	return( validHCD );


}











function drawCircle1(xxx, yyy, r1, colStr1){

    ctx.beginPath();
    ctx.fillStyle ="transparent";
    ctx.lineWidth = r1 * 0.10;
    ctx.arc(  xxx, yyy + r1, r1, 0,2*Math.PI );
    ctx.fill()
    ctx.strokeStyle =  colStr1;
    ctx.stroke();
    

}


  
function initMonthlyPivotVars(){
            
            monthHigh = -1;
            monthLow = 100000000;
            monthClose = 0;
            candleMonthCnt = 0;
            
 }//fn
        
    

function drawText( txtStr, x09, y09, fontSze , colStr ){


                //ctx.beginPath();

	 			ctx.fillStyle = colStr ; //  "#555566";
                ctx.font =  fontSze.toString() + "px Arial";

          
                 ctx.fillText( txtStr , x09,  y09  );   


            
}



    
function drawCandlestick( open, hi, low, close, dateStr, vol, Pstr, P3str , idx0){ //}, volume ){
            
            var redOrGreen = 0, y0=0, y=0, x=0,  hCanvas=0, priceStr="", wHi=0, wLo=0;   //   redOrGreen  0== red, 1=green
            var closeYCanvas = 0, openYCanvas=0;   // open, close in Y canvas coords
            
            openYCanvas  =  GetYCoordFromPrice( open  ) ;
            closeYCanvas =  GetYCoordFromPrice( close ) ;
            
            hCanvas = Math.abs( openYCanvas  -  closeYCanvas );
            
            if (close > open){             // GREEN
                redOrGreen = 1;         // Close > open, green candle
                y0 = close;             // y0 is in Price coords
             }else{                      // RED
                redOrGreen = 0;
                y0 = open;              // Open > close  then y = open
             }
            
            y = GetYCoordFromPrice( y0 );  // y in Canvas =  either open or close ,  y0 is in Price format
            
            wHi = GetYCoordFromPrice(  hi );
            wLo = GetYCoordFromPrice( low );
            
            priceStr = "$"+close.toString( );    // close str

            drawCandlestickGeometry( candleXnext, y, candleWidth, hCanvas, wHi, wLo, redOrGreen, priceStr, dateStr, Pstr, P3str,  idx0 );
            
}//fn
        
        
        
        

function drawCandlestickGeometry( x,y,w,h,wHi,wLo,rG,priceStr, dateStr, Pstr, P3str, idx0 ){
        
// [x]..[x+w] = idx0
//put idx into candlew
        		insertNewPixelArray( x, w ,idx0 );
// inbetween
        		insertNewPixelArray( (x+w), candleOffset , -1 );

                //candleXnext = candleXnext + candleWidth + candleOffset ;



                var wickX = x + (w/2);
 
   if( gLineOnClose==0){
       
                ctx.beginPath();
                ctx.strokeStyle="#999999";   // make wicks  grey vs black
                ctx.lineWidth=1;

// TOP WICK
                ctx.moveTo(wickX,wHi);
                ctx.lineTo(wickX,y);
                ctx.stroke();
// BOTTOM WICK
                ctx.moveTo(wickX,(y+h));
                ctx.lineTo(wickX,wLo);
                ctx.stroke();
                
// this determines rG red =0 or Green=1
                if (rG==0) ctx.fillStyle = gCandleRedCol; //gCandleRedCol= "#DD0000";
                else ctx.fillStyle = gCandleGreenCol ; //gCandleGreenCol ="#00CC00";
// then fill the   rectangle awl-ready !!  -  candlestick drawn !
                ctx.fillRect(x,y, w,h);
    
//    ctx.fillStyle = "#ff9966";
  //  ctx.fillRect(x,Ybottom-200, w,h);

    }//if gLi neOnClose
    
                ctx.fillStyle = "#555566";
                ctx.font = "8px Arial";
                
                var priceY = (y+h+10 );
                if( rG==1 ) priceY = ( y - 6 );
                // ctx.fillText( priceStr,wickX+4, priceY );   // price at close
      if(gDrawExtras==1)  ctx.fillText( priceStr,wickX+4, priceY );   // price at close
                
                //ctx.rotate(20*Math.PI/180);

               // var dateStr1 = dateStr;
               var dateStr1 = dateStr.substring(5, 10);
         //bottomdweller 
              // ctx.fillText( dateStr1, wickX+2, Ybottom*1.015 );  // date
               
               gDateStrLast  = dateStr1;

               currentMonth = dateStr1.substring(0,2);   // ie "08-02" ---> "08"
               
               
              
               
   if(currentMonth != lastMonth){

                  lastMonth = currentMonth ;

                  //  ie     March 2019 SPY               March  2019  SPY   
                  var currentMonth1 = "    "+monthsArr[ Number(currentMonth) ]   +"  "+ dateStr.substring(0, 4);

///  getting here means we've begun a NEW MONTH...
                   ctx.beginPath();

                  // DRAW in BG "AUGUST 2018"
                  ctx.fillStyle = "#CDCDCD" ;  // ="#1A75ff";
                  ctx.font = "28px Arial";

                  if(rel1==0.050) rel1 = 0.0;
                  else rel1 = 0.050;

// PRINT MONTH
       //       ctx.fillText( currentMonth1,  wickX+2, Ybottom*(0.25+rel1)  );  // date
       var  currentMonth2 = currentMonth1 + "  " +  gGET_SymbolStr;
       ctx.fillText( currentMonth2,  wickX+8, 22);  //100 );   
       //bottomdweller 
       //ctx.fillText( currentMonth2,  wickX+8, 1930);  //100 );    

            thisMonthX = wickX;

            if(candleMonthCnt > 12){     //  5 x 4 = 20 trading days/ month

                // still some discrepancies here...  #'s don't seem to match Tradestation !!PivotsMonthlySnR
                ComputeMonthlyPivots();
                
                var monthP_Y  = GetYCoordFromPrice( monthP  );
                var monthS1_Y = GetYCoordFromPrice( monthS1 );
                var monthR1_Y = GetYCoordFromPrice( monthR1 );
                var monthS2_Y = GetYCoordFromPrice( monthS2 );
                var monthR2_Y = GetYCoordFromPrice( monthR2 );
                var monthS3_Y = GetYCoordFromPrice( monthS3 );
                var monthR3_Y = GetYCoordFromPrice( monthR3 );

                var diffM = thisMonthX - lastMonthX;
                var pct11 = 0.625;


   var monthPivotStrs =   "P=$"+(monthP.toFixed(2)).toString()+",L=$"+   monthLow.toString() +",H=$"+   monthHigh.toString() +",C0=$"+ monthClose.toString(); 


 if( gDrawSupRes==1) {
                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gPivotColor, monthP_Y,  1  , 5 );
                
                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gS1Color,    monthS1_Y, 2  , 5 );
//  ie if(thismonth == last_estMonth)            
                drawText("S1= $"+(monthS1.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS1_Y-4 , 22,  arrowgreenColor2  );
        
//        
//JMB 2022-01-21        
        //   drawText(monthPivotStrs , thisMonthX+(diffM *pct11)-50,  monthS1_Y+20 , 32,  "#CDCDFF"  );


                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gR1Color,    monthR1_Y, 2  , 5 );
                drawText("R1= $"+(monthR1.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR1_Y-4 , 22,  arrowredColor2   );

                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gS2Color,    monthS2_Y, 3  , 9 );
                drawText("S2= $"+(monthS2.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS2_Y-4 , 25,  arrowgreenColor2   );
                
                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gR2Color,    monthR2_Y, 3 , 9 );
                drawText("R2= $"+(monthR2.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR2_Y-4 , 25,  arrowredColor2   );

                
                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gS2Color,    monthS3_Y, 5  , 13 );
                drawText("S3= $"+(monthS3.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS3_Y-4 , 28,  arrowgreenColor2  );
                
                DrawHorizontalDashedLine( thisMonthX,  thisMonthX+diffM , gR2Color,    monthR3_Y, 5  , 13 );
                drawText("R3= $"+(monthR3.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR3_Y-4 , 28,  arrowredColor2  );
}
                
                
                lastMonthX = thisMonthX;
                
            }else{
                lastMonthX = thisMonthX;

            }
 
            
            // RE- init global vars H L C for monthly Pivots...
                    initMonthlyPivotVars();

                   ctx.beginPath();
                   // ctx.strokeStyle="#8a8a8a";
                   ctx.strokeStyle="#3333f8";
                   ctx.lineWidth=1;
                   ctx.moveTo(wickX, Ybottom*0.050 );
 				ctx.lineTo(wickX, Ybottom*1.01 );
                ctx.stroke();

     }else{   // if(currentMonth != lastMonth){
                   ;
                //    // unneeded
                //    ctx.beginPath();
                //    ctx.strokeStyle="#11FFED";
                //    ctx.lineWidth=1;
                //    ctx.moveTo(wickX, Ybottom*0.99 );
                // ctx.lineTo(wickX, Ybottom*1.01 );
                // ctx.stroke();

     }
 
                // ctx.lineTo(wickX, Ybottom*1.01 );
                // ctx.stroke();

// update master X for next candlestick
                candleXnext = candleXnext + candleWidth + candleOffset ;
               
                
// set globals on the way out for predictive 'next month's S1-R3'
                gLastMonthNum = lastMonth;
                gThisMonthX = thisMonthX;
                gDiffM = diffM; 


  }//fn
        




 
 // R4day = High+ 3*(Pday-Low) ;
 // R3day = (Pday-S1day) + R2day;
 // R2day = Pday + High – Low;
 // R1day = (Pday *2)-Low;
 // Pday  = (High + Low + Close )/3 ;
 // S1day = (Pday *2)-High;
 // S2day = Pday – High + Low;
 // S3day = Pday – (R2day-S1day);
 // S4day = Low- 3*(High-Pday) ;
 






// var gCurrencyStr ="$";

function drawCandlestickOnly( open, hi, low, close, dateStr, vol, Pstr, P3str ){ //}, volume ){
            
            var redOrGreen = 0, y0=0, y=0, x=0,  hCanvas=0, priceStr="", wHi=0, wLo=0;   //   redOrGreen  0== red, 1=green
            var closeYCanvas = 0, openYCanvas=0;   // open, close in Y canvas coords
            
            openYCanvas  =  GetYCoordFromPrice( open  ) ;
            closeYCanvas =  GetYCoordFromPrice( close ) ;
            
            hCanvas = Math.abs( openYCanvas  -  closeYCanvas );
            
            if (close > open){             // GREEN
                redOrGreen = 1;         // Close > open, green candle
                y0 = close;             // y0 is in Price coords
             }else{                      // RED
                redOrGreen = 0;
                y0 = open;              // Open > close  then y = open
             }
            
            y = GetYCoordFromPrice( y0 );  // y in Canvas =  either open or close ,  y0 is in Price format
            
            wHi = GetYCoordFromPrice(  hi );
            wLo = GetYCoordFromPrice( low );
            
            // priceStr = "$"+close.toString( );    // close str
            priceStr = gCurrencyStr+close.toString( );    // close str

            drawCandlestickGeometryOnly( candleXnext, y, candleWidth, hCanvas, wHi, wLo, redOrGreen, priceStr, dateStr, Pstr, P3str );
            
}//fn
        
        
        
        

function drawCandlestickGeometryOnly( x,y,w,h,wHi,wLo,rG,priceStr, dateStr, Pstr, P3str ){
        

                var wickX = x + (w/2);
                
                ctx.beginPath();
                ctx.strokeStyle="#555555";   // make wicks  grey vs black
                ctx.lineWidth=1;
// TOP WICK
                ctx.moveTo(wickX,wHi);
                ctx.lineTo(wickX,y);
                ctx.stroke();
// BOTTOM WICK
                ctx.moveTo(wickX,(y+h));
                ctx.lineTo(wickX,wLo);
                ctx.stroke();
                
// this determines rG red =0 or Green=1
                if (rG==0) ctx.fillStyle ="#330101";   //="#f542ad"; //= "#aa5555";    // RED
                else ctx.fillStyle ="#013301";  //= "#b0f542"; //="#55aa55";		  // GREEN
// then fill the   rectangle awl-ready !!  -  candlestick drawn !
                ctx.fillRect(x,y, w,h);
    
//    ctx.fillStyle = "#ff9966";
  //  ctx.fillRect(x,Ybottom-200, w,h);

    
    
                ctx.fillStyle = "#555566";
                ctx.font = "8px Arial";
                
                var priceY = (y+h+10 );
                if( rG==1 ) priceY = ( y - 6 );
                ctx.fillText( priceStr,wickX+4, priceY );   // price at close
                
                //ctx.rotate(20*Math.PI/180);

               // var dateStr1 = dateStr;
                var dateStr1 = dateStr.substring(5, 10);
                ctx.fillText( dateStr1, wickX+2, Ybottom*1.015 );  // date
       



               // gDateStrLast  = dateStr1;

               // currentMonth = dateStr1.substring(0,2);   // ie "08-02" ---> "08"
               
//    if(currentMonth != lastMonth){

//                   lastMonth = currentMonth ;
//                   var currentMonth1 = "    "+monthsArr[ Number(currentMonth) ]   +"  "+ dateStr.substring(0, 4);

// ///  getting here means we've begun a NEW MONTH...
//                    ctx.beginPath();

//                   // DRAW in BG "AUGUST 2018"
//                   ctx.fillStyle = "#CDCDCD" ;  // ="#1A75ff";
//                   ctx.font = "28px Arial";

//                   if(rel1==0.050) rel1 = 0.0;
//                   else rel1 = 0.050;

// // PRINT MONTH
//        //       ctx.fillText( currentMonth1,  wickX+2, Ybottom*(0.25+rel1)  );  // date
//        var  currentMonth2 = currentMonth1 + "  " +  gGET_SymbolStr;
//      //  ctx.fillText( currentMonth2,  wickX+8, 25 );    
//        ctx.fillText( currentMonth2,  wickX+8, 100 );    

//             thisMonthX = wickX;

//             if(candleMonthCnt > 12){     //  5 x 4 = 20 trading days/ month

//                 // still some discrepancies here...  #'s don't seem to match Tradestation !!PivotsMonthlySnR
//                 ComputeM onthlyPivots();
                
//                 var monthP_Y  = GetYCoordFromPrice( monthP  );
//                 var monthS1_Y = GetYCoordFromPrice( monthS1 );
//                 var monthR1_Y = GetYCoordFromPrice( monthR1 );
//                 var monthS2_Y = GetYCoordFromPrice( monthS2 );
//                 var monthR2_Y = GetYCoordFromPrice( monthR2 );
//                 var monthS3_Y = GetYCoordFromPrice( monthS3 );
//                 var monthR3_Y = GetYCoordFromPrice( monthR3 );

//                 var diffM = thisMonthX - lastMonthX;
//                 var pct11 = 0.625;

//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gPivotColor, monthP_Y,  1 );
                
//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gS1Color,    monthS1_Y, 2 );
//                 drawText("S1= $"+(monthS1.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS1_Y-4 , 22,  arrowgreenColor2  );

//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gR1Color,    monthR1_Y, 2 );
//                 drawText("R1= $"+(monthR1.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR1_Y-4 , 22,  arrowredColor2  );

//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gS2Color,    monthS2_Y, 3 );
//                 drawText("S2= $"+(monthS2.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS2_Y-4 , 25,  arrowgreenColor2  );
                
//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gR2Color,    monthR2_Y, 3 );
//                 drawText("R2= $"+(monthR2.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR2_Y-4 , 25,  arrowredColor2  );

                
//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gS2Color,    monthS3_Y, 5 );
//                 drawText("S3= $"+(monthS3.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthS3_Y-4 , 28,  arrowgreenColor2  );
                
//                 DrawHorizontalLine( thisMonthX,  thisMonthX+diffM , gR2Color,    monthR3_Y, 5 );
//                 drawText("R3= $"+(monthR3.toFixed(2)).toString(), thisMonthX+(diffM *pct11),  monthR3_Y-4 , 28,  arrowredColor2  );

                
                
//                 lastMonthX = thisMonthX;
                
//             }else{
//                 lastMonthX = thisMonthX;

//             }
 
            
//             // RE- init global vars H L C for monthly Pivots...
//                     initMonthlyPivotVars();

//                    ctx.beginPath();
//                    ctx.strokeStyle="#8a8a8a";
//                    ctx.lineWidth=1;
//                    ctx.moveTo(wickX, Ybottom*0.050 );


//      }else{   // if(currentMonth != lastMonth){
                   
//                    ctx.beginPath();
//                    ctx.strokeStyle="#DDDDDD";
//                    ctx.lineWidth=1;
//                    ctx.moveTo(wickX, Ybottom*0.99 );
                
//      }
 
//                 ctx.lineTo(wickX, Ybottom*1.01 );
//                 ctx.stroke();


// update master X for next candlestick
                candleXnext = candleXnext + candleWidth + candleOffset ;
               
                
// // set globals on the way out for predictive 'next month's S1-R3'
//                 gLastMonthNum = lastMonth;
//                 gThisMonthX = thisMonthX;
//                 gDiffM = diffM; 


  }//fn
        












//function DrawMonthlyPivotLine( xa1,  xa2,  col, Yval , thick){
function DrawHorizontalDashedLine( xa1,  xa2,  col, Yval , thick, dashSize){

        ctx.beginPath();
        ctx.setLineDash([dashSize, 15]);
        
        ctx.strokeStyle= col;
        ctx.lineWidth=thick;
 
        ctx.moveTo(  xa1, Yval   );
 
        ctx.lineTo(  xa2 , Yval  );
        ctx.stroke();
        ctx.setLineDash([]);
 
 }
//function DrawMonthlyPivotLine( xa1,  xa2,  col, Yval , thick){
function DrawHorizontalLine( xa1,  xa2,  col, Yval , thick){

        ctx.beginPath();
        //ctx.setLineDash([5, 15]);
        ctx.strokeStyle= col;
        ctx.lineWidth=thick;
 
        ctx.moveTo(  xa1, Yval   );
 
        ctx.lineTo(  xa2 , Yval  );
        ctx.stroke();
 
 }

function DrawVerticalLine( xa1,  col, Yval ,Yval2 , thick){

        ctx.beginPath();
        ctx.strokeStyle= col;
        ctx.lineWidth=thick;
 
        ctx.moveTo(  xa1, Yval   );
 
        ctx.lineTo(  xa1 , Yval2  );
        ctx.stroke();
 
 }
        

//
// note their may be a bug here - whereas the pivots SHOULD be computed for NEXT month...
//
//
 function ComputeMonthlyPivots(){
     
     monthP = ( monthLow + monthHigh + monthClose )/3;
     monthS1= (monthP *2) - monthHigh;
     monthR1= (monthP *2) - monthLow;
     
     monthS2= monthP - monthHigh  + monthLow;
     monthR2= monthP + monthHigh  - monthLow;
    
     // derive from dailies
     // S3day = Pday – (R2day-S1day);
     monthS3= monthP - (monthR2 -  monthS1);
     // R3day = (Pday-S1day) + R2day;
     monthR3= (monthP - monthS1)  + monthR2;

	SetGlobalMonthlyPivots();
	
}


function SetGlobalMonthlyPivots(){

// copy to official candleglobals.js global vars
//
	 gR3month                   =monthR3;
	 gR2month                   =monthR2;
	 gR1month                   =monthR1;

	 gPmonth                    =monthP;
	 gP3month                   =33.54;

	 gS1month                   =monthS1;
	 gS2month                   =monthS2;
	 gS3month                   =monthS3;

 
 }
 
 
 function drawPivotLines( candleArray, colorStr, Poffset, linewidth){
            
            var i=0, j=0, y0=0, idx=0, o0= 0, h0=0, l0=0, c0=0, v0=0,  wickX=0 , pivotPrice=0;
            var dateStr="", pivotStr="", pivot3Str="";
            var candleNxt = 0;
            var start_i = 0;
     
     if(  Poffset==MVAVG50 ){
         start_i=50;
 
     }  else if( Poffset==MVAVG200   ){
         start_i=200;
 
     } 	else if( Poffset==MVAVG100   ){    //  mv2
         start_i=100;
 
     }
     
            // Set_startXOff();
            candleNxt = startX - gCandle_startXOff  + (candleWidth * 0.50 );
            //candleNxt = startX  + (candleWidth * 0.50 );
     
           for(i=0+gCandlesLenAdder; i<(candlesLen-gCandlesLenSubtractor); i++){
          //for(i=0; i<candlesLen; i++){
                idx = i * candlesOffset;
                pivotPrice = Number( candleArray[ idx + Poffset  ] );   //   ie  + P  ,  + P3
                
                y0 = GetYCoordFromPrice( pivotPrice );
                
 
                if(i == (start_i+1) ){
                    ctx.beginPath();
                    ctx.lineWidth= linewidth;

                    ctx.strokeStyle = colorStr;   // make wicks  grey vs black
                    ctx.moveTo( candleNxt, y0  );
                   
                }else if(i >= (start_i+1) ){
                    ctx.lineTo( candleNxt, y0  );
                    ctx.stroke();
                }
                
                
                candleNxt = candleNxt + candleWidth + candleOffset ;

            }//for
     
     var y0s = pivotPrice.toFixed(2);
     if(  Poffset==MVAVG50 ){
         str1= "50-day MA: $"+y0s;
         g50DayMovingAvg = y0s;
         
         ctx.fillStyle = color50dayMvAvg;  // color50dayMvAvg  ="#3333ff";     color200dayMvAvg  = "#ff3399";
         ctx.font = "30px Arial";
         
         ctx.fillText( str1, (candleNxt - 3*(candleWidth + candleOffset)),   y0*0.95  );
         
 
     }  else if( Poffset==MVAVG200   ){
         str1= "200-day MA: $"+y0s;
         g200DayMovingAvg = y0s;

         ctx.fillStyle = color200dayMvAvg ;    //  color200dayMvAvg  = "#ff3399";
         ctx.font = "30px Arial";
    
         ctx.fillText( str1, (candleNxt - 3*(candleWidth + candleOffset)),   y0*0.95  );

     } else if( Poffset==MVAVG100   ){
         str1= "100-day MA: $"+y0s;
         g100DayMovingAvg = y0s;

         ctx.fillStyle = color100dayMvAvg ;     
         ctx.font = "30px Arial";
    
         ctx.fillText( str1, (candleNxt - 3*(candleWidth + candleOffset)),   y0*0.95  );

     }// mv3
}


/// ************************************************************** w3schools clock
/// ************************************************************** w3schools clock
function drawClock() {
    drawFace(ctx, radiusClock);
    drawNumbers(ctx, radiusClock);
    drawTime(ctx, radiusClock);
}
        
function drawClockNYC() {
    drawFace(ctx, radiusClock);
    drawNumbers(ctx, radiusClock);
    drawTimeNYC(ctx, radiusClock);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}


function drawTimeNYC(ctx, radius){
    var now = new Date();
    var hour = now.getHours()+3;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}
function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

//
// ************************************************************** w3schools clock



//
//  not called 
//
function gPrintObjs(){

      console.log( "1. objCandleDataBig[]" );
      console.log(  objCandleDataBig );
      console.log( "2. gObjEarningsData[]  * Earnings *" );
      console.log(  gObjEarningsData );

  console.log( "3. gObjEarningsCorpData[]  * CORP Earnings *" );
      console.log(  gObjEarningsCorpData );

}


var gAssetType = "stocks";


/*
const list = [
  { color: 'white', size: 'XXL' },
  { color: 'red', size: 'XL' },
  { color: 'black', size: 'M' }
]
list.sort((a, b) => (a.color > b.color) ? 1 : -1)

You can use the sort() method of Array, which takes a callback function, which takes as parameters 2 objects contained in the array (which we call a and b):
When we return 1, the function communicates to sort() that the object b takes precedence in sorting over the object a. Returning -1 would do the opposite.

The callback function could calculate other properties too, to handle the case where the color is the same, and order by a secondary property as well:

list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )

// another
employees.sort(function(a, b){
    return a.age-b.age
})

*/

// var gEarningsCorpStr = "";

/*
0:
curr: "USD"
est: "1.16"
fde: "2022-06-30"
name: "Apple Inc"
repdate: "2022-07-25"
repdatenum: 20220725
symbol: "AAPL"
*/
function  ProcessEarningsCorp(){


	 // console.log( "] Process3arningsCorp,  processingx global gEarningsCorpStr;   g0bjEarningsData= ");
	// console.log( gObjEarningsCorpData );


if(gObjEarningsCorpData.length==0)   gEarningsCorpStr = "NextEarnings: n/a" ;
	 else if(gObjEarningsCorpData[0].est!=""){

	  // gEarningsCorpStr = "NextEarnings: " + gObjEarningsCorpData[0].repdate + ", est $" + gObjEarningsCorpData[0].est ;
	  gEarningsCorpStr = "NextEarnings: " + gObjEarningsCorpData[0].repdate + ", est $" + gObjEarningsCorpData[0].est ;
	
  // }else  gEarningsCorpStr = "NextEarnings: " + gObjEarningsCorpData[0].repdate ; //+ ", est $" + gObjEarningsCorpData[0].est ;
  }else  gEarningsCorpStr = "NextEarnings: " + gObjEarningsCorpData[0].repdate ; //+ ", est $" + gObjEarningsCorpData[0].est ;

	 console.log( gEarningsCorpStr );

	//return;

}

/*
0:
curr: "USD"
est: "1.42"
fde: "2022-03-31"
name: "Aercap Holdings N.V."
repdate: "2022-05-17"
repdatenum: 20220517
symbol: "AER"
*/

// function DrawEarningsAll(){
// 	let estr="";
// 	let ii=0;
// // for i in gObjEarningsData
// // estr = gObjEarningsData.symbol +" "+ gObjEarningsData.repdate + " "+ gObjEarningsData.name; 

// 	return;
// }

function  SortEarningsAll(){
	// sort the global EarningsAll Obj here based on .datenum (sp?)
	 gObjEarningsData.sort(function(a, b){
   		 return a.repdatenum-b.repdatenum 
	})

   gObjsLoadedObj[ gEarningsAllIdx ].objPost   =gObjEarningsData;

	 console.log( "] Sort3arningsAll , post SORT, gObjsLoadedObj[ gEarningsAllIdx ].objPost, , gObjsLoadedObj= ");
	 console.log( gObjsLoadedObj[ gEarningsAllIdx ].objPost  , gObjsLoadedObj );

  	gDrawEarningsAll=1;   // ok to draw earnings now

		redrawCurrentChart();

	 // if(gDrawEarningsAll==1 && gObjEarningsData.length!=0){
	 // 		DrawEarningsAll();
	 // }

}//fn

//
//
//    SHOULD BE DELETED 
//
//
// Entry function for Intraday
// function GetE arningsData( interval0,  typestr ){
function GetEarningsData( typestr ){
// assume earnings for stocks

	 // gInterval ="quote";
         lInterval ="earningsAll";  // = interval0
       // gInterval ="earnings";

        GetAlphaAdvantageStockDataNew( lInterval, gObjEarningsData ,"nil" );

}

//
//   NEW ONE   
//
function GetEarningsDataGeneric(  earingstype    ){
  let e0 = earingstype.toLowerCase();

  switch(e0){

    case "earnings":
    case "earningsall":

        GetAlphaAdvantageStockDataNew(earingstype , gObjEarningsData ,"nil" );
    break;
    case "quote":
        GetAlphaAdvantageStockDataNew(earingstype , gObjQuoteData ,"nil" );
    break;


  }
}//fn



//
//   usage: 
//			GetDataS3t_gInterval("stocks", "15min") ;   // sets gInterval ="15min";
// 
//
        // gInterval ="1min";
        // gInterval ="5min";
        //  gInterval ="15min";
        // gInterval ="30min";
        // gInterval ="60min";

         // gInterval ="day"  // "daily";
         // gInterval ="dailyCompact";
         // gInterval ="weekly";
         // gInterval ="monthly";
         // // gInterval ="quote";
       //   lInterval ="earningsAll";
       // // gInterval ="earnings";

       //  Get AlphaAdvantageStockData( lInterval, gObjEarningsData );
//
//         
// 			note: * SETS gInterval  !!!
//
/*
Ge tDataSetGeneric("stocks","earnings");
Ge tDataSetGeneric("stocks","earningsAll");
Get DataSetGeneric("stocks","quote");
*/
function GetDataSetGeneric( typestr, intervalStr ){
// was function GetDataSet_gInterval( typestr, intervalStr ){
	
  gInterval = intervalStr;

  if(typestr=="crypto") gIntervalCrypto=  intervalStr ;  // "15min";
	// *should clamp string to set of 1min, 5min, 15min ,etc
    GetDataIntraday( typestr ) ;

}//fn 



//
// sets gAssetType, ( see above) assumes gInterval is set !
//
//		note: called by uiux.js
//
function GetDataIntraday( typestr ){

    var typestr0=typestr.toLowerCase();
    var lInterval;   // used for local interval ie 1min 60min

    gAssetType = typestr0;

    if(typestr0=="stocks"){
    	// should check into passing this around
        GetAlphaAdvantageStockDataNew( gInterval, objCandleDataBig ,"nil");

    }else if(typestr0=="crypto"){

        if(gIntervalCrypto=="day") gIntervalCrypto=   "60min";
        GetAlphaAdvantageDataCryptoIntraday();

    }else if(typestr=="fx"){
        GetAlphaAdvantageDataFXIntraday();
    }

} 


//
//  * NEED TO REMASTER:
//
//              GetDataIntraday(gAssetType);    // uiux.js call
//              GetDataDaily(gAssetType);
//
//
//
//
//
// Treasury Yield ie "10year"  //3month, 2year, 5year, 7year, 10year, and 30year  //interval=monthly. Strings daily, weekly, and monthly
//     https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=10year&apikey=  
//     https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=30year&apikey= 
//
//  FED FUNDS RATE   // daily, weekly, and monthly
//     https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=demo
//
//
//  REAL_GDP  // quarterly and annual/yearly
//     https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=
//
//
//  CPI   // monthly and semiannual 
//      https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=demo
//
//  INFLATION
//   https://www.alphavantage.co/query?function=INFLATION&apikey=demo
//
//  RETAIL_SALES
//    https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo
//
//   UNEMPLOYMENT
//    https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo
//
//   CONSUMER_SENTIMENT
//    https://www.alphavantage.co/query?function=CONSUMER_SENTIMENT&apikey=demo
//
//
//
//
//  RSI  // 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
//     https://www.alphavantage.co/query?function=RSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo
//
//
//  VWAP  // intraday ONLY* 1min, 5min, 15min, 30min, 60min
//      https://www.alphavantage.co/query?function=VWAP&symbol=IBM&interval=15min&apikey=demo
//
//
//  STOCH  //1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
//       https://www.alphavantage.co/query?function=STOCH&symbol=IBM&interval=daily&apikey=demo
//
//
//  OBV   //  1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
//       https://www.alphavantage.co/query?function=OBV&symbol=IBM&interval=weekly&apikey=demo
//
//
//  CASH_FLOW   // yearly
//       https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo
//   
//  graham's formula    Vintrinsic Value  =  ( EPS  *  ( 8.5+ 2*g )   * 4.4 )   /   Y
//  graham's adjformula Vintrinsic Value  =  ( EPS  *  ( 7.0+ 1*g )   * 4.4 )   /   Y
//
//    where Y =    and g = growthRate
//
//
//


let  gSampleFindataCount = 0;
var gSampleFindata =[
'cashflow','yearly',
'10year','daily',

'gdp','annual',

'30year','daily',
'30year','monthly',
'30year','annual',

'10year','monthly',
'10year','annual',

'3month','daily',

'rsi','daily',


];


function CycleFintechDataTEST(   ){
 
 let arg1 = gSampleFindata[  gSampleFindataCount ];
 let arg2 = gSampleFindata[  gSampleFindataCount+1 ];
 
 console.log("] Cycl3FintechDataTEST(), gSampleFindataCount== ",gSampleFindataCount );
 console.log("] gSampleFindata.length ==" );
 console.log( gSampleFindata.length  );
 
 console.log("]  arg1, arg2  ==");
 console.log(arg1, arg2);

 GetFinancialDataMaster(  arg1, arg2 );

gSampleFindataCount= gSampleFindataCount+2;

if(gSampleFindataCount> gSampleFindata.length ) gSampleFindataCount=0;

}//fn





//                                fi nancilData Global Objects
// let findata_TREASURYObj=[];
// let findata_FEDObj=[];
// let findata_GDPObj=[];
// let findata_CPIObj=[];

// let findata_RSIObj=[];
// let findata_STOCHObj=[];
// let findata_OBVObj=[];
// let findata_VWAPObj=[];       // intraday only

// let findata_CASHFLOWObj=[];       // cashflow

//
//   ie    G3tFinancialDataMaster( "30year", "10yr" ); 
//
function GetFinancialDataMaster( datatype,  seriesInterval ){   // assume any symbol  = gGET_SymbolStr

  let urlTarget="";
  let objTarget=[];

  console.log("] inside G3tFinancialDataMaster( ),  datatype,  seriesInterval== ");
  console.log( datatype,  seriesInterval );

  datatype = datatype.toLowerCase();

const Http = new XMLHttpRequest();



 //  3month, 2year, 5year, 7year, 10year, and 30year    // interval=monthly. Strings == daily, weekly, and monthly
const urltreas  =  'https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=' +seriesInterval +'&maturity='+datatype + apikeyStr;
// interval=monthly. Strings daily, weekly, and monthly a
const urlfed   =  'https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval='+seriesInterval+ apikeyStr ;
const urlgdp   ='https://www.alphavantage.co/query?function=REAL_GDP&interval='+seriesInterval+ apikeyStr ;

const urlcpi   =  'https://www.alphavantage.co/query?function=CPI&interval='+seriesInterval+ apikeyStr ;
// annual yearly only
const urlinflation   =  'https://www.alphavantage.co/query?function=INFLATION'+apikeyStr;


const urlretailsales   =  'https://www.alphavantage.co/query?function=RETAIL_SALES' +apikeyStr;
const urlunemployment   =  'https://www.alphavantage.co/query?function=UNEMPLOYMENT' +apikeyStr;
const urlconsumer   =  'https://www.alphavantage.co/query?function=CONSUMER_SENTIMENT' +apikeyStr;
//

const urlrsi    = 'https://www.alphavantage.co/query?function=RSI&symbol='    + gGET_SymbolStr + '&interval='+seriesInterval+ '&time_period=10&series_type=open'+ apikeyStr ;
const urlstoch  = 'https://www.alphavantage.co/query?function=STOCH&symbol='  + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
const urlobv    = 'https://www.alphavantage.co/query?function=OBV&symbol='    + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
const urlvwap    = 'https://www.alphavantage.co/query?function=VWAP&symbol='  + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
 
const urlcashflow ='https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;
const urlsample ='https://itraderpro.co/jsonsample.php'; //https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;
 

  switch( datatype ){

    // treasuries
     case "30year":
     case "10year":
     case "7year":
     case "5year":
     case "2year":
     case "3month":
       urlTarget= urltreas;
      break;
      case "jsonsample":
       urlTarget= urlsample;
      break;


      // fed data
     case "fed":
      urlTarget= urlfed;
      break;
     case "gdp":
      urlTarget= urlgdp;
      break;
     case "cpi":
       urlTarget= urlcpi;
     break;   
     case "inflation":
       urlTarget= urlinflation;
     break;
     case "retailsales":
       urlTarget= urlretailsales;
     break;
     case "consumer":
       urlTarget= urlconsumer;
     break;
     case "unemployment":
       urlTarget= urlunemployment;
     break;



// stock-specific
     case "rsi":
      urlTarget= urlrsi;
      break;
     case "stoch":
       urlTarget= urlstoch;
     break;
     case "obv":
      urlTarget= urlobv;
      break;
     case "vwap":
       urlTarget= urlvwap;
     break;

    case "cashflow":
      urlTarget= urlcashflow;
      break;



  }//sw



// remove... !!! has k3y !!!    
    console.log (urlTarget);

    Http.open("GET", urlTarget);
    Http.send();

    console.log ("] G3tFinancialDataMaster(): after http.send() ");
var numLines=0;
var lines;

    Http.onreadystatechange = (e) => {
        lines = Http.responseText.split("\n");
         numLines = lines.length;
        // if (numLines %10 ==0 ) console.log("num lines = " + numLines);

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("] G3tFinancialDataMaster(): The request has been completed successfully!");
            } else {
              console.log("] G3tFinancialDataMaster(): - oh no! status = " + status);
              return;
            }
        }else{
          console.log("response not ready..  ");
          return;
        }
    // }//     Http.onreadystatechange = (e) => {

//
//
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//
          // console.log(Http.responseText);
          console.log("] G3tFinancialDataMaster(): Http.responseText FINISHED [below], numLines=");
          console.log(numLines);

                      // **** KEY NEW Converter multi-interval times
                        // St ringToCandlestickObject( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;
                      // function Stri ngToCandlestickObject( httpStr, objTarget , numLines , intervalExpectedStr, jsonOk ){
                        // console.log ( "] StringToCandlestick0bject() fn entry..."   );
                        // if(jsonOk!=1 && jsonOk!=0) return;
                        // if(jsonOk==1){
                                // console.log ( "] StringToCandlestick0bject() jsonOk== 1  !!!!"   );

            let httpStr= Http.responseText ; 
            objTarget = JSON.parse( httpStr  ); 

            // console.log ( httpStr   );
             console.log (  "] datatype, interval=="  );
             console.log (  datatype  );
             console.log (  seriesInterval  );
            console.log (  "] objTarget=="  );
            console.log (  objTarget  );
            //          ///Po stProcessCandleObj(objTarget, intervalExpectedStr );

            // return(objTarget);
    
     }//     Http.onreadystatechange = (e) => {

  
}//fn




function CycleFintechDataTEST1(   ){


    // GetFinancialDataMaster( "10year", "daily" ); 
    // GetFinancialDataMaster( "rsi", "daily" ); 
    // GetFinancialDataMaster( 'cashflow','yearly' ); 

    // GetFinancialDataMaster( 'fed','daily' ); 
    // GetFinancialDataMaster( "fed","monthly" ); 
    // GetFinancialDataMaster( "fed","weekly" ); 

        // GetFinancialDataMaster( "10year", "monthly" ); 
        // GetFinancialDataMaster( "vwap", "15min" ); 

// not working yet =  }, ]  , comma bad char?  see console err when running this
        // GetFinancialDataMaster( "jsonsample", "monthly" );  // https://itraderpro.co/jsonsample.php

        GetFinancialDataMaster( "10year", "daily" ); 


}


function GetFintechDataTESTER(){

   GetFinancialDataMaster( "30year", "daily" ); 

   // GetFinancialDataMaster( "30year", "weekly" ); 
   // GetFinancialDataMaster( "30year", "monthly" ); 

   // GetFinancialDataMaster( "unemployment", "monthly" ); 


 /*
    // treasuries
     case "30year":
     case "10year":
     case "7year":
     case "5year":
     case "2year":
     case "3month":
       urlTarget= urltreas;
      break; 
     case "fed":
      urlTarget= urlfed;
      break;
     case "gdp":
      urlTarget= urlgdp;
      break;
     case "cpi":
       urlTarget= urlcpi;
     break;   
     case "inflation":
       urlTarget= urlinflation;
     break;
     case "retailsales":
       urlTarget= urlretailsales;
     break;
     case "consumer":
       urlTarget= urlconsumer;
     break;
     case "unemployment":
       urlTarget= urlunemployment;
     break; 
     case "rsi":
      urlTarget= urlrsi;
      break;
     case "stoch":
       urlTarget= urlstoch;
     break;
     case "obv":
      urlTarget= urlobv;
      break;
     case "vwap":
       urlTarget= urlvwap;
     break;
    case "cashflow":
      urlTarget= urlcashflow;
      break;
*/



}//fn 



/*


 function G tAlphaAdvantageStockDataNew(seriesInterval, objTarget , insetFlagStr)
{
  let urlTarget;     
gRenderInsetFl ag =0;

// this is the incoming target, so it is nullified
  objTarget=[];

      console.log("G3tAlphaAdvantageStockData()  interval=, obj, insetFlagStr=");
      console.log(seriesInterval);
      console.log(insetFlagStr);
      
      if(insetFlagStr=="insert"){
         gRenderI nsetFlag =1;

      }

const Http = new XMLHttpRequest();
 

 // stocks intraday
const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
    apikeyStr+'&datatype=csv';

const urlcsvFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr+'&datatype=csv';

const urlIntradayFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr ;

    // &interval=5min&outputsize=full&apikey=demo

// stocks monthly
   const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
   // const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks weekly
  const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
  // const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks daily
   // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
  const urlDailyCompact= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + apikeyStr ; 
  // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo
  const urlDailyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr+ '&outputsize=full'+ apikeyStr ; 

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
const urlQuote = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ gGET_SymbolStr + apikeyStr  ;
    
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo
const urlEarningsAll = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month' + apikeyStr  ;
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=IBM&horizon=12month&apikey=demo
const urlEarnings = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol='+ gGET_SymbolStr +'&horizon=12month' + apikeyStr  ;


let JSONok = 1;


      switch(seriesInterval){
        case "earningsAll":
        case "earningsall":
           urlTarget =  urlEarningsAll; 
           JSONok = 0;
 
          break;
        case "earnings":
           urlTarget =  urlEarnings;  
           JSONok = 0;

          break;
        case "quote":
           urlTarget =  urlQuote;  
          break;

   // timeseries data here       
        case "m":
        case "mo":
        case "month":
        case "mon":
        case "monthly":
           urlTarget =  urlMonthlyFull;  
          break;
        case "w":
        case "wk":
        case "week":
        case "weekly":
           urlTarget =  urlWeeklyFull;
          break;

       case "dailyCompact":
       case "dailycompact":
       case "dailysmall":
          urlTarget = urlDailyCompact;
          break;
       case "daily":
       case "day":
       case "d":
           urlTarget = urlDailyFull;
          break;
       case "1min":
           urlTarget = urlIntradayFull;
          break;
       case "5min":
           urlTarget = urlIntradayFull;
          break;
       case "10min":
           urlTarget = urlIntradayFull;
          break;
       case "15min":
           urlTarget = urlIntradayFull;
          break;
       case "30min":
           urlTarget = urlIntradayFull;
          break;
       case "60min":    
          urlTarget = urlIntradayFull;
          break;
       default:
       // re-assign global & local var here...
          break;
     
        }//sw
z
// remove... !!! has k3y !!!    
    // console.log (urlTarget);

    Http.open("GET", urlTarget);
    Http.send();

    console.log ("GetAlphaAdvantagStockData: after http.send() ");
    

    Http.onreadystatechange = (e) => {
        // console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;
        if (numLines %100 ==0 ) console.log("num lines = " + numLines);


        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlphaAdvantagStockData: The request has been completed successfully!");
            } else {
              console.log("GetAlphaAdvantagStockData: - oh no! status = " + status);
              return;
            }
    }
    else
    {
      //console.log("response not ready..  ");
      return;
    }


//
//
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//
//

          if (gLogs > 0)  console.log(Http.responseText);

          // console.log(Http.responseText);
          console.log("GetAlphaAdvantagStockData: Http.responseText read numLines=");
          console.log(numLines);

// **** KEY NEW Converter multi-interval times
          StringToC andlestickObject( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;

          // if(JSONok ==1){ 
          //       StringToCandlestick0Object( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;
          // }else if(JSONok ==0){
          //       StringToCandlestick0Object( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;
          //       // console.log ( Http.responseText );
          //      }





        if (numLines < 4)
        {
          console.log ("GetAlphaAdvantagStockData: first 10 char: " + Http.responseText.substring(0,10) );

          // if (lines[0].substring(0,1) == "{")
          // {
          //   console.log("No Alpha Data - clearing gTickerExistsAV");
          //   gTickerExistsAV = 0;
          // }
        }else{
          ;
               // console.log ("f(15000) Http.responseText: " + Http.responseText.substring(0,15000) );

        }

    }//     Http.onreadystatechange = (e) => {


}//fn  



*/






//
// currently not called in candlesticx.js,
// but IS called from uiux.js
function GetDataDaily( typestr ){

    var typestr0=typestr.toLowerCase();
    gAssetType = typestr0;

    if(typestr0=="stocks"){
    	// need to failsafe like other cases
        GetAlphaAdvantageDataStocks("day");
      

    }else if(typestr0=="crypto"){
        gIntervalCrypto=   "day";

       GetAlphaAdvantageDataCrypto("day");    // get daily data for crypto

    }else if(typestr=="fx"){
        GetAlphaAdvantageDataFX("day");
    }
}//fn

/*
timestamp open  high  low close volume
2021-04-23 03:40:00 2277.49000  2278.26000  2275.20000  2277.58000  965
2021-04-23 03:35:00 2257.16000  2278.15000  2250.00000  2277.50000  9157
2021-04-23 03:30:00 2247.61000  2260.68000  2234.74000  2257.15000  8662
2021-04-23 03:25:00 2244.74000  2256.68000  2227.00000  2247.50000  11447
*/
 

//
// 0= no crypto (likely stock daily or intraday displayed)
// 1= requested incoming data // top of GetAlphaAdvantageDataCry ptoIntraday
// 2= data incoming
// 3= data rec'd attempting to DRAW
// 4= drawing complete, after Render call
//
// 10 = error reading data from server
//
//


// DEPRICATE
var cryptoDrawStates = [
                    "no_Crypto_STATE",            // 0
                    "PRE-GET Crypto_DATA",
                    "GETTING Crypto_DATA",
                    "Crypto_DATA RECEIVED",

                    "Crypto_CHART RENDERED.",
                    "EOF5",
                    "EOF6",
                    "EOF7"
                    ];


var cryptoDrawStateMax = 11;
 
function setCryptoDrawState( i0 ){

  gCryptoDrawState = i0;

//cap it
if (i0<0){
  i0=0;
}else if (i0>cryptoDrawStateMax){
  i0=0;

} 


 // let cstr = cryptoDrawStates[ i0 ];

 

// console.log( "] gCryptoDrawState, gInterval ==");
// console.log( gCryptoDrawState, gInterval  );

          switch(i0){
              case 0:
                console.log( "] gCrypt0DrawState = NO_STATE", gCryptoDrawState);
              break;
              case 1:
                 console.log( "] gCrypt0DrawState = PRE-GET DATA", gCryptoDrawState);
             break;
              case 2:
                 console.log( "] gCrypt0DrawState = GETTING DATA", gCryptoDrawState);
             break;
              case 3:
                 console.log( "] gCrypt0DrawState = DATA RECEIVED.", gCryptoDrawState);
             break;
              case 4:
                 console.log( "] gCrypt0DrawState = crypto CHART RENDERED.", gCryptoDrawState);
             break;



              case 5:
                 console.log( "] gCrypt0DrawState = NO_STATE", gCryptoDrawState);
             break;



              case 10:
                 console.log( "] gCrypt0DrawState = NO DATA REC'd ERROR_STATE");
             break;

              case 11:
                 console.log( "] STOCK DrawState = NO DATA REC'd ERROR_STATE");
             break;

          }

}// fn



//
function GetAlphaAdvantageDataCryptoIntraday()
{
  gFetchCandlesStatus="attempting";

  setCryptoDrawState(1);

    ctx.fillStyle = "#33dd8e";   // arrowgreenColor ;
    ctx.font = "80px Arial";
    ctx.fillText( ( " Running AlgosCrypto on: "+gGET_SymbolCryptoStr  +" " + gEntryStr ) ,  2200,  250  );
 
    // ClearCandles(CandlesFromAlpha);
    // gSplitDetected = 0;

    const Http = new XMLHttpRequest();



  //gInterval="30min";
  // gInterval="day";
  
 //note: this defaults to compact, use outputsize=full
    // const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + 
    // apikeyStr+'&datatype=csv';

// daily
// https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo&datatype=csv

  // const urlcsvDay = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=' +gGET_SymbolCryptoStr+'&market='+gCurrency +
  //    apikeyStr+'&datatype=csv';


 const urlcsv = 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=' 
    +gGET_SymbolCryptoStr+ '&market='+gCurrency + '&interval=' +gIntervalCrypto+
    apikeyStr+'&datatype=csv';

  





// if(gInterval=="day")    Http.open("GET", urlcsvDay );
//   else   Http.open("GET", urlcsv);

// if(gInterval=="day")    Http.open("GET", urlcsvDay );
//   else if(gInterval=="1min" || gInterval=="5min" || gInterval=="15min" ||
//           gInterval=="30min" || gInterval=="60min"   )    Http.open("GET", urlcsv);


    Http.open("GET", urlcsv);

    Http.send();

    Http.onreadystatechange = (e) => {
        // console.log ("HTTP: in ready av crypto callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("num lines = " + numLines);
        if (numLines > 2)
        {
        	  setCryptoDrawState(2);

          // console.log ("first line: ===>" + lines[0])+"<===";
          // console.log ("second line: ===>" + lines[1]+"<===");
          // console.log ("3 line: " + lines[2]);
          // console.log ("4 line: " + lines[3]);
        }
/*
The XMLHttpRequest has a abort method, which cancels the request, but if the request has already been sent to the server then the server will process the request even if we abort the request but the client will not wait for/handle the response.

The xhr object also contains a readyState which contains the state of the request(UNSENT-0, OPENED-1, HEADERS_RECEIVED-2, LOADING-3 and DONE-4). we can use this to check whether the previous request was completed.

*/
        if(Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlpha: The request has been completed successfully!");

            } else {
              console.log("GetAlpha - oh no! status = " + status);
              return;
            }

       }else{
           //console.log("response not ready..  ");
            return;
        }

if( lines[0]=="{"){
  // error msg - do not populate
      gFetchCandlesStatus="failed";
  setCryptoDrawState(10);  //== fail

  console.log("FAILED TO RECV DATA FOR ", gGET_SymbolCryptoStr );
    sfx_serverFailed.play();

    console.log("] G3tAlphaAdvantageDataCryptoIntraday() :  urlcsv==");
    // console.log();
    console.log(urlcsv);

//new 5B4L3BMV41G6BCDH
// https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=demo&datatype=csv
//error: 
// https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=USD&interval=earnings&apikey=5B4L3BMV41G6BCDH&datatype=csv


}else{
    gFetchCandlesStatus="success";

  setCryptoDrawState(3);  // data rec'd, drawing attempt {pre-render}

     PopulateRawDataOO("crypto", Http.responseText ); 
 }



    // var jj=0;

    // var lines = Http.responseText.split("\n");
    // var numLines = lines.length;

 
    // console.log( "*** !!!GETTING HERE MEANS we have whole response"+numLines);
    
    // sfx_serverReturnCrypto.play();
     
    // initOneTimeM ethods();

    // for(jj=0;jj<numLines;jj++){
    //      console.log (gGET_SymbolCryptoStr);
    //        console.log (jj);
    //      //console.log (  lines[jj]  );

       
                  
                  
    //       var elems = lines[jj].split(",");
    //       var numElems = elems.length;

    //       var timestamp = elems[0];
    //       var op = elems[1];
    //       var high = elems[2];
    //       var low = elems[3];
    //       var cl = elems[4];
    //       var mktcap = elems[10];
    //       var vol = elems[9];
    //            // push 

    //       console.log (timestamp);
    //       console.log (op);
    //       console.log (high);
    //       console.log (low);
    //       console.log (cl);
    //       console.log (vol);


    //             }//for



    //GETTING HERE MEANS we have whole response
//          if (gLogs > 0)  console.log(Http.responseText);

//         if (numLines < 4)
//         {
//           console.log ("first char: " + Http.responseText.substring(0,1) );

//           // if (lines[0].substring(0,1) == "{")
//           // {
//           //   console.log("No Alpha Data - clearing gTickerExistsAV");
//           //   gTickerExistsAV = 0;
//           // }
//         }else{

// // more than 4
//         }






    }//     Http.onreadystatechange = (e) => {
 

}//fn



/*  this is the error that comes  back
{
    "Error Message": "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY_ADJUSTED."
}
*/

//
//
// called once .then after fetch()
function ProcessFetched( arg , objTarget , symstr, seriesInterval) {

  let symstr0 = symstr.toLowerCase();
  let seriesInterval0 = seriesInterval.toLowerCase();

  // console.log( "] Pr0cessFetched()  arg, symstr0, objTarget {before obj-assignment} ==");
  console.log( "] Pr0cessFetched() ... "); //arg, symstr0, objTarget {before obj-assignment} ==");
  // console.log(  arg, symstr0, objTarget  );


  objTarget = JSON.parse( arg );  
  // console.log(  "] objTarget ==" );
  // console.log(  objTarget );
  
  gObjsLoadedObj[gLasti].symbol  = gDontCare;// "dontcare";  // assume NOT stock/crypto data
  // gObjsLoadedObj[gLasti].symbol  =  symstr0;
  gObjsLoadedObj[gLasti].obj     =  objTarget;

  console.log("] Pr0cessFetched()  gObjsLoadedObj ==");
  console.log(  gObjsLoadedObj );

        if(  seriesInterval0=="weekly"  ||  seriesInterval0=="monthly" ||  seriesInterval0=="daily" 
          ||  seriesInterval0=="1min"   ||  seriesInterval0=="5min"    ||  seriesInterval0=="10min"  
          ||  seriesInterval0=="15min"  ||  seriesInterval0=="30min"   ||  seriesInterval0=="60min"  ){
     
          // ie if we are NOT viewing fed,gdp, etc, then .symbol " stock/crypto name"
           gObjsLoadedObj[gLasti].symbol  =  symstr0;

           PostProcessCandleObj(gObjsLoadedObj[gLasti].obj , seriesInterval0 , gCandlesObjPost ); //gObjsLoadedObj[gLasti].objPost );

// check if post processed obj is valid data gCandlesObjPost
 
         console.log("]  Pr0cessFetched():  gObjsLoadedObj[gLasti].objPost== ");
         console.log(gObjsLoadedObj[gLasti].objPost);

       }


  
 
}//fn

 
function InitLastDataObjLoaded(   ) {
  console.log("]  In1tLastDataObjLoaded() called... ");

// copy from array & push on to obj
  gObjsLoadedObj =[]; //{ };  // init global
  let obj1={};
  let obj2={};
  let obj3={};
  let i=0;
  let len0= gObjsLoadedObjInit.length;

  for( i=0; i<len0; i++ ){
     let a= gObjsLoadedObjInit[i];
     obj1={
            "datatype":         a,
            "symbol":          "000", 
            "assettype":       "000", 
            "aux":             "nil", 
            "obj":             obj2,    // pre process
            "objPost":         obj3,    // post process ready for renderOO...()
 
     };
     // console.log("i, a, obj1 ==");
     // console.log(i, a,  obj1);
     gObjsLoadedObj.push(obj1);
 
   }//for

       console.log("] after for(), gObjsLoadedObj ==");
       console.log(gObjsLoadedObj);
     
}//fn


function CheckAndGetNewData( datatype0, symstr, assettype0 ) {
          let symstr0;
          let assettype1 = assettype0.toLowerCase();

          console.log("] inside Ch3ckAndGetNewData() ...");

// auto detect crypto & switch
          if(assettype1=="crypto"){
              symstr0= gGET_SymbolCryptoStr.toLowerCase();
              console.log("] Ch3eckAndGetNewData():  SWITCHING TO crypto, datatype0==");
              console.log( datatype0   );

          }else symstr0= symstr.toLowerCase();  //assume stocks, but here is where we'd FOREX

//////////////////////////////////

           console.log("datatype0, symstr0,  assettype0==");
           console.log(datatype0, symstr0 ,  assettype0 );

           let retval = CheckLastDataObjLoaded( datatype0, symstr , assettype0 ) ;
           console.log("] retval = Ch3ckLastDataObjLoaded(datatype0, symstr , assettype0) ");
           console.log( retval );

         if(gLasti>=0){  // this var comes from Ch3ckLastDataObjLoaded()
            // mark .assettype (even though loading will occur soon...)
            gObjsLoadedObj[gLasti].assettype =assettype1; 
            // found data type
            console.log("] gLasti,    gObjsLoadedObj[gLasti].symbol, .datatype, .assettype , .obj  =="  );

            console.log( gLasti   );
            console.log(gObjsLoadedObj[gLasti].symbol   );
            console.log(gObjsLoadedObj[gLasti].datatype );
            console.log(gObjsLoadedObj[gLasti].assettype );
            console.log(gObjsLoadedObj[gLasti].obj      );

                if(  retval==0  ){   // ie not found
                  // fetchError=
                  GetAlphaAdvantageStockDataNewTESTfetch(datatype0, gObjsLoadedObj[gLasti].obj, "nil" );
                  // this to be set in Pr0cessedFetched()
                  // gObjsLoadedObj[gLasti].symbol  =  symstr0;
                }
          }// if

           console.log("] EXITING Ch3eckAndGetNewData() ...");

}//fn


function CheckLastDataObjLoaded( datatype0, symstr ,  assettype0) {

  let retval  = 0;
   let lasti   =-1;
  let symstr0 = symstr.toLowerCase();
  let datatype1 = datatype0.toLowerCase();

   lasti=-1; 
  gLasti=-1;

  console.log("] Ch3ckLastDataObjLoaded() datatype0, symstr0, gObjsLoadedObj[] ==");
  console.log(datatype1);
 
  console.log(symstr0);
  // console.log(gObjsLoadedObjInit);
  console.log(gObjsLoadedObj);

  let i=0;
 
  gObjsLoadedObj.forEach((arrayitem , i) => {

      // console.log(i, arrayitem);
      if(arrayitem.datatype == datatype0){
        // ie "weekly" DATA TYPE IS CORRECT
              lasti = i;
              gLasti = i;
              console.log(i, arrayitem);

              if( arrayitem.symbol == symstr0 || arrayitem.symbol == gDontCare ){ // && (arrayitem.assettype== assettype0)
                  retval = 1;
                  console.log("] FOUND .symbol ==  ");
                  console.log(arrayitem.symbol);
                  console.log(retval);
              }else{
                  retval=0;
                  console.log("] NOT FOUND .symbol != symstr0");
                  console.log(retval);
              }


      }//if

  })

  console.log("] after forEach"); 

  console.log("] Ch3ckLastDataObjLoaded()   retval, , gLasti, gObjsLoadedObj[] ==");
  console.log(retval, gLasti);
  console.log(gObjsLoadedObj);

  return(retval);

}//fn




//
//
  let fetchedObj=[];
//
//  note : seriesInterval is like datatype  TESTer fn !!!!
//function G3tAlphaAdvantageStockDataNewTES Tfetch("quote", fet chedObj , "nil")
//
function GetAlphaAdvantageStockDataNewTESTfetch(seriesInterval, objTarget  , insetFlagStr)
{
  let urlTarget;     
  gRenderInsetFlag =0;

// this is the incoming target, so it is nullified
  objTarget=[];

      console.log("G3tAlphaAdvantageStockData()  interval/datatype=, obj, insetFlagStr=");
      console.log(seriesInterval);
      console.log(insetFlagStr);
      
      if(insetFlagStr=="insert"){
         gRenderInsetFlag =1;

      }
 

 // stocks intraday
const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
    apikeyStr+'&datatype=csv';

const urlcsvFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr+'&datatype=csv';

const urlIntradayFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr ;

    // &interval=5min&outputsize=full&apikey=demo

// stocks monthly
   const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
   // const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks weekly
  const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
  // const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks daily
   // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
  const urlDailyCompact= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + apikeyStr ; 
  // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo
  const urlDailyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr+ '&outputsize=full'+ apikeyStr ; 

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
const urlQuote = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ gGET_SymbolStr + apikeyStr  ;
    
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo
const urlEarningsAll = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month' + apikeyStr  ;
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=IBM&horizon=12month&apikey=demo
const urlEarnings = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol='+ gGET_SymbolStr +'&horizon=12month' + apikeyStr  ;


//
//
// new fed, gdp, etc
let maturitytype = seriesInterval;     // &maturity= 3month, 2year, 5year, 7year, 10year, and 30year in the case of treasuries
   // interval=monthly. Strings == daily, weekly, and monthly
const urltreas  =  'https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily' +'&maturity='+maturitytype + apikeyStr;

//
//   FED '7'
//
// interval=monthly. Strings daily, weekly, and monthly 
const urlfed   =  'https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval='+seriesInterval+ apikeyStr ;
const urlgdp   =  'https://www.alphavantage.co/query?function=REAL_GDP&interval='+seriesInterval+ apikeyStr ;
const urlcpi   =  'https://www.alphavantage.co/query?function=CPI&interval='+seriesInterval+ apikeyStr ;
// annual yearly only
const urlinflation     =  'https://www.alphavantage.co/query?function=INFLATION'+apikeyStr;
const urlretailsales   =  'https://www.alphavantage.co/query?function=RETAIL_SALES' +apikeyStr;
const urlunemployment   =  'https://www.alphavantage.co/query?function=UNEMPLOYMENT' +apikeyStr;
const urlconsumer       =  'https://www.alphavantage.co/query?function=CONSUMER_SENTIMENT' +apikeyStr;
//
//
//

const urlrsi    = 'https://www.alphavantage.co/query?function=RSI&symbol='    + gGET_SymbolStr + '&interval='+seriesInterval+ '&time_period=10&series_type=open'+ apikeyStr ;
const urlstoch  = 'https://www.alphavantage.co/query?function=STOCH&symbol='  + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
const urlobv    = 'https://www.alphavantage.co/query?function=OBV&symbol='    + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
const urlvwap   = 'https://www.alphavantage.co/query?function=VWAP&symbol='  + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 
//
// 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
const urlcci    =  'https://www.alphavantage.co/query?function=CCI'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesInterval+ '&time_period=10'  + apikeyStr ; 

const urlcashflow ='https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;
const urlsample ='https://itraderpro.co/jsonsample.php'; //https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;
 

  
 
let JSONok = 1;

// seriesInterval="earningsAll" "10year",  "15min" "consumer" ;
      seriesInterval= seriesInterval.toLowerCase();
      console.log("seriesInterval==");
      console.log(seriesInterval);

      switch(seriesInterval){
        case "earningsAll":
        case "earningsall":
           urlTarget =  urlEarningsAll; 
           JSONok = 0;
 
          break;
        case "earnings":
           urlTarget =  urlEarnings;  
           JSONok = 0;

          break;
        case "quote":
           urlTarget =  urlQuote;  
          break;

   // timeseries data here       
        case "m":
        case "mo":
        case "month":
        case "mon":
        case "monthly":
           urlTarget =  urlMonthlyFull;  
          break;
        case "w":
        case "wk":
        case "week":
        case "weekly":
           urlTarget =  urlWeeklyFull;
          break;

       case "dailyCompact":
       case "dailycompact":
       case "dailysmall":
          urlTarget = urlDailyCompact;
          break;
       case "daily":
       case "day":
       case "d":
           urlTarget = urlDailyFull;
          break;
       case "1min":
           urlTarget = urlIntradayFull;
          break;
       case "5min":
           urlTarget = urlIntradayFull;
          break;
       case "10min":
           urlTarget = urlIntradayFull;
          break;
       case "15min":
           urlTarget = urlIntradayFull;
          break;
       case "30min":
           urlTarget = urlIntradayFull;
          break;
       case "60min":    
          urlTarget = urlIntradayFull;
          break;


// new
    // treasuries
     case "30year":
     case "10year":
     case "7year":
     case "5year":
     case "2year":
     case "3month":
       urlTarget= urltreas;
      break;
      // case "jsonsample":
      //  urlTarget= urlsample;
      // break;

      // fed data
     case "fed":
      urlTarget= urlfed;
      break;
     case "gdp":
      urlTarget= urlgdp;
      break;
     case "cpi":
       urlTarget= urlcpi;
     break;   
     case "inflation":
       urlTarget= urlinflation;
     break;
     case "retailsales":
       urlTarget= urlretailsales;
     break;
     case "consumer":
       urlTarget= urlconsumer;
     break;
     case "unemployment":
       urlTarget= urlunemployment;
     break;



// stock-specific
     case "rsi":
      urlTarget= urlrsi;
      break;
     case "stoch":
       urlTarget= urlstoch;
     break;
     case "obv":
      urlTarget= urlobv;
      break;
     case "vwap":
       urlTarget= urlvwap;
     break;
    case "cashflow":
      urlTarget= urlcashflow;
      break;

     case "cci":
       urlTarget= urlcci;
     break;

 




       default:
       // re-assign global & local var here...
        console.log("// default: reached,  urlTarget = daily //")
          urlTarget = urlDailyFull;
          break;
     
        }//sw


 
// remove... !!! has k3y !!!    
    console.log ("]   G3tAlphaAdvantageStockDataNewTESTfetch( ); urlTarget == ");  //seriesInterval, objTarget , insetFlagStr) ");

    console.log (urlTarget);
    console.log ("]  fetch-testing...");

    let x0, y0;

    fetch(urlTarget)
    .then( x0 => x0.text())
    .then( y0 => ProcessFetched(y0 , objTarget , gGET_SymbolStr, seriesInterval ) )
    .catch(error => {
        // element.parentElement.innerHTML = `Error: ${error}`;
        console.error("] The error==", error);
    });



// // OLD CODE BELOW /////////////////////////////////////////////////////////
// // OLD CODE BELOW /////////////////////////////////////////////////////////
// // OLD CODE BELOW /////////////////////////////////////////////////////////

//     const Http = new XMLHttpRequest();
//     Http.open("GET", urlTarget);
//     Http.send();

//     console.log ("GetAlphaAdvantagStockData: after http.send() ");

//     Http.onreadystatechange = (e) => {
//         // console.log ("HTTP: in ready callback");

//         var lines = Http.responseText.split("\n");
//         var numLines = lines.length;
//         if (numLines %100 ==0 ) console.log("num lines = " + numLines);


//         if(Http.readyState === XMLHttpRequest.DONE) {
//         var status = Http.status;
//             if (status === 0 || (status >= 200 && status < 400)) {
//               console.log ("GetAlphaAdvantagStockData: The request has been completed successfully!");
//             } else {
//               console.log("GetAlphaAdvantagStockData: - oh no! status = " + status);
//               return;
//             }
//     }
//     else
//     {
//       //console.log("response not ready..  ");
//       return;
//     }

// //
// //   *******************  GETTING HERE MEANS we have whole response    *******************  
// //   *******************  GETTING HERE MEANS we have whole response    *******************  
// //   *******************  GETTING HERE MEANS we have whole response    *******************  
// //

//           if (gLogs > 0)  console.log(Http.responseText);

//           // console.log(Http.responseText);
//           console.log("GetAlphaAdvantagStockData: Http.responseText read numLines=");
//           console.log(numLines);

// // **** KEY NEW Converter multi-interval times
//           Stri ngToCandlestickObject( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;
 

//         if (numLines < 4)
//         {
//           console.log ("GetAlphaAdvantagStockData: first 10 char: " + Http.responseText.substring(0,10) );

//           // if (lines[0].substring(0,1) == "{")
//           // {
//           //   console.log("No Alpha Data - clearing gTickerExistsAV");
//           //   gTickerExistsAV = 0;
//           // }
//         }else{
//           ;
//                // console.log ("f(15000) Http.responseText: " + Http.responseText.substring(0,15000) );

//         }

//     }//     Http.onreadystatechange = (e) => {

// // OLD CODE ABOVE /////////////////////////////////////////////////////////
// // OLD CODE ABOVE /////////////////////////////////////////////////////////
// // OLD CODE ABOVE /////////////////////////////////////////////////////////




// EOFn


}//fn G3tAlphaAdvantagStockDataTESTfetch !!!



// let gEarni ngsAllIdx=9;
////////////////////////////
 //
 //  note : seriesInterval is like datatype
 //
function GetAlphaAdvantageStockDataNew(seriesInterval, objTarget , insetFlagStr)
{
  let urlTarget;     
gRenderInsetFlag =0;


  // here check 
  if( seriesInterval.toLowerCase()=="earningsall" &&  gObjsLoadedObj[ gEarningsAllIdx ].symbol!="000"){
    
      console.log("] G3tAlphaAdvantageStockData(): returning,  seriesInterval=, gObjsLoadedObj[ gEarningsAllIdx ].symbol=, gObjsLoadedObj=");
      console.log(seriesInterval, gObjsLoadedObj[ gEarningsAllIdx ].symbol );
      console.log(gObjsLoadedObj);
      
//       gDrawEarningsAll=1;   // ok to draw earnings now
//       redrawCurrentChart();
// // skip the load
//       return;

  }//else NOT loaded

// this is the incoming target, so it is nullified
  objTarget=[];

      console.log("] G3tAlphaAdvantageStockData()  interval=, obj, insetFlagStr=");
      console.log(seriesInterval);
      console.log(insetFlagStr);
      
      if(insetFlagStr=="insert"){
         gRenderInsetFlag =1;

      }

const Http = new XMLHttpRequest();
 

 // stocks intraday
const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
    apikeyStr+'&datatype=csv';

const urlcsvFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr+'&datatype=csv';

const urlIntradayFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
   '&outputsize=full'+ apikeyStr ;

    // &interval=5min&outputsize=full&apikey=demo

// stocks monthly
   const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
   // const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks weekly
  const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
  // const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// stocks daily
   // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
  const urlDailyCompact= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + apikeyStr ; 
  // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo
  const urlDailyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr+ '&outputsize=full'+ apikeyStr ; 

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
const urlQuote = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ gGET_SymbolStr + apikeyStr  ;
    
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo
const urlEarningsAll = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month' + apikeyStr  ;
//https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=IBM&horizon=12month&apikey=demo
const urlEarnings = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol='+ gGET_SymbolStr +'&horizon=12month' + apikeyStr  ;


let JSONok = 1;


      switch(seriesInterval){
        case "earningsAll":
        case "earningsall":
           urlTarget =  urlEarningsAll; 
           JSONok = 0;
 
          break;
        case "earnings":
           urlTarget =  urlEarnings;  
           JSONok = 0;

          break;
        case "quote":
           urlTarget =  urlQuote;  
          break;

   // timeseries data here       
        case "m":
        case "mo":
        case "month":
        case "mon":
        case "monthly":
           urlTarget =  urlMonthlyFull;  
          break;
        case "w":
        case "wk":
        case "week":
        case "weekly":
           urlTarget =  urlWeeklyFull;
          break;

       case "dailyCompact":
       case "dailycompact":
       case "dailysmall":
          urlTarget = urlDailyCompact;
          break;
       case "daily":
       case "day":
       case "d":
           urlTarget = urlDailyFull;
          break;
       case "1min":
           urlTarget = urlIntradayFull;
          break;
       case "5min":
           urlTarget = urlIntradayFull;
          break;
       case "10min":
           urlTarget = urlIntradayFull;
          break;
       case "15min":
           urlTarget = urlIntradayFull;
          break;
       case "30min":
           urlTarget = urlIntradayFull;
          break;
       case "60min":    
          urlTarget = urlIntradayFull;
          break;
       default:
       // re-assign global & local var here...
                  urlTarget = urlDailyFull;

          break;
     
        }//sw

// remove... !!! has k3y !!!    
    // console.log (urlTarget);

    Http.open("GET", urlTarget);
    Http.send();

    console.log ("GetAlphaAdvantagStockData: after http.send() ");
    

    Http.onreadystatechange = (e) => {
        // console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;
        if (numLines %100 ==0 ) console.log("num lines = " + numLines);


        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlphaAdvantagStockData: The request has been completed successfully!");
            } else {
              console.log("GetAlphaAdvantagStockData: - oh no! status = " + status);
              return;
            }
    }
    else
    {
      //console.log("response not ready..  ");
      return;
    }


//
//
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//   *******************  GETTING HERE MEANS we have whole response    *******************  
//
//

          if (gLogs > 0)  console.log(Http.responseText);

          // console.log(Http.responseText);
          console.log("GetAlphaAdvantagStockData: Http.responseText read numLines=");
          console.log(numLines);

// **** KEY NEW Converter multi-interval times
          StringToCandlestickObject( Http.responseText, objTarget, numLines , seriesInterval, JSONok  ) ;





        if (numLines < 4)
        {
          console.log ("GetAlphaAdvantagStockData: first 10 char: " + Http.responseText.substring(0,10) );

          // if (lines[0].substring(0,1) == "{")
          // {
          //   console.log("No Alpha Data - clearing gTickerExistsAV");
          //   gTickerExistsAV = 0;
          // }
        }else{
          ;
               // console.log ("f(15000) Http.responseText: " + Http.responseText.substring(0,15000) );

        }

    }//     Http.onreadystatechange = (e) => {


}//fn GetAlphaAdvantagStockData



/*
symbol,name,reportDate,fiscalDateEnding,estimate,currency
A,Agilent Technologies Inc,2022-05-24,2022-04-30,1.12,USD
AA,Alcoa Corp,2022-07-13,2022-06-30,3.2,USD
AACG,ATA Creativity Global,2022-05-11,2022-03-31,-0.25,CNY
AADI,Aadi Bioscience Inc,2022-05-12,2022-03-31,-0.71,USD
AAIC,Arlington Asset Investment Corp - Class A,2022-08-01,2022-06-30,,USD
AAL,American Airlines Group Inc,2022-07-20,2022-06-30,0.53,USD
AAME,Atlantic American Corp,2022-05-09,2022-03-31,,USD
AAN,Aarons Company Inc (The),2022-07-25,2022-06-30,0.66,USD
AAOI,Applied Optoelectronics Inc,2022-08-03,2022-06-30,-0.25,USD
AAON,AAON Inc,2022-08-03,2022-06-30,,USD
AAP,Advance Auto Parts Inc,2022-05-23,2022-03-31,3.56,USD
AAPL,Apple Inc,2022-07-25,2022-06-30,1.16,USD


// let abc = '{"symbol":"AAPL", "name":"Apple Inc", "reportDate":"2022-07-25",  "fde":"2022-06-30", "est":"1.16", "curr":"USD"    }'  ; 
// objTarget.push( abc);

// let obj1 ={};   // obj
 // let gSampleEarnings=[];   // target obj
 // let objSampleEarningsStr = '{"symbol":"AAPL", "name":"Apple Inc", "reportDate":"2022-07-25",  "fde":"2022-06-30", "est":"1.16", "curr":"USD"    }'  ;
 // gSampleEarnings.push();

var elems = lines[jj].split(",");
var numElems = elems.length;

if(gInterval=="day"){
          // var timestamp = elems[0];
            datestamp = elems[0];
            op =    Number(elems[1]);
            high =  Number(elems[2]);
            low =   Number(elems[3]);
            cl =    Number(elems[4]);


            {1. open: '148.6800', 2. high: '153.1650', 3. low: '146.4128', 4. close: '149.8000', 5. adjusted close: '149.1737', …}1. open: "148.6800"2. high: "153.1650"3. low: "146.4128"4. close: "149.8000"5. adjusted close: "149.1737"6. volume: "392739936"7. dividend amount: "0.0000"[[Prototype]]: Object
candlesticks.js:6775 2021-10-22
candlesticks.js:6776 {1. open: '143.4450', 2. high: '150.1800', 3. low: '143.1600', 4. close: '148.6900', 5. adjusted close: '148.0683', …}
candlesticks.js:6775 2021-10-15
candlesticks.js:6776 {1. open: '142.2700', 2. high: '144.8950', 3. low: '139.2000', 4. close: '144.8400', 5. adjusted close: '144.2344', …}
candlesticks.js:6775 2021-10-08
candlesticks.js:6776 {1. open: '141.7600', 2. high: '144.2150', 3. low: '138.2700', 4. close: '142.9000', 5. adjusted close: '142.3025', …}
candlesticks.js:6775 2021-10-01


*/



let gDailyCandlesMaxJB  = 5 * 252;  // 5yrs * 252 trading days/yr 
let gCandleDailyObjTmp =[];
let gCandleDailyObj    =[];

let gWeeklyCandlesMax  = 12 * 52;  // 12yrs * 52mos
let gCandleWeeklyObjTmp =[];
let gCandleWeeklyObj    =[];


let gMonthlyCandlesMax  = 25 * 12;  // 25yrs * 12mos
let gCandleMonthlyObjTmp =[];
let gCandleMonthlyObj    =[];


let gIntradayCandlesMax  = 1000;  // 1000 * 1min or 60min
let gCandleIntradayObjTmp =[];  
let gCandleIntradayObj  =[];  //2022-05-20 20:00:00: {1. open: '137.2300', 2. high: '137.6800', 3. low: '137.2000', 4. close: '137.5600', 5. volume: '144144'}
 
let gCandlesObjPost =[];
//
// outputs to: gCandleWeeklyObj[], gCandleMonthlyObj[] or gCandleIntradayObj[]
//
function PostProcessCandleObj( objTarget, intervalstr , objTargetPost ){

  console.log( intervalstr );
  console.log ( "]  PostProcessCandle0bj( ): for(var key0 in objTarget ) ==" );

  let op, hi,lo,cl,adjcl,vol, divamt, cnt0, splcoef, spl=0;
  let tmpobj=[];

  // console.log( objTarget );
   
      for(var key0 in objTarget ){
        console.log (  key0 );
        console.log (  objTarget[key0] );

        if(key0=="Weekly Adjusted Time Series"){
          gCandleWeeklyObjTmp = objTarget[key0] ;
          gCandleWeeklyObj=[];
          cnt0=0;
          for (var key1 in gCandleWeeklyObjTmp ){
            // console.log (   key1 );
            // console.log (  gCandleWeeklyObjTmp[key1] );

            if(cnt0 < gWeeklyCandlesMax){
              tmpobj = gCandleWeeklyObjTmp[key1];

              for (var key2 in tmpobj ){
                // console.log (   "key2, tmpobj[key2]" );
                // console.log (   key2 );
                // console.log (    tmpobj[key2] );

                switch(key2){
                  case "1. open":
                    op=Number(tmpobj[key2]).toFixed(4);
                    break;
                  case "2. high":
                    hi=Number( tmpobj[key2]).toFixed(4);
                    break;
                  case "3. low":
                    lo=Number( tmpobj[key2]).toFixed(4);
                    break;
                 case "4. close":
                    cl=Number(tmpobj[key2]).toFixed(4);
                    break;
                case "5. adjusted close":
                    adjcl=Number(tmpobj[key2]).toFixed(4);
                    if( (cl/adjcl) > 1.24){
                      // console.log("5 . adj Close < close  SPLIT DETECTED!, cl/adjcl=");
                      // console.log(cl/adjcl);
// if(cl!=adjcl){
                          spl =Math.floor(cl/adjcl);    
                          cl = cl / spl  ;
                          op = op / spl;
                          hi = hi / spl;
                          lo = lo / spl;
// }
                     }//else if(cl!=adjcl) cl=adjcl;

                    break;
                case "6. volume":
                     vol=Number(tmpobj[key2]).toFixed(0);
                    break;
                case "7. dividend amount":
                    divamt=Number(tmpobj[key2]).toFixed(4);

                      break;
                      
                }//sw

              }//for
             
// note need to handle stock splits via adjusted close vs close !!!
                pushCandleObjGeneric(gCandleWeeklyObj,op,hi,lo,cl,vol ,  cnt0, 
                // pushCandleObjGeneric(gCandleWeeklyObj,op,hi,lo,adjcl,vol ,  cnt0, 
                  gGET_SymbolStr , "stock", gCorpName+ "(Weekly)"   , key1, "weekly"  );

     
            }//if(cnt0
            cnt0++;

          }//for key1
 


          // reverse obj
console.log("gCandleWeeklyObj = objTargetPost, =="); 
          gCandleWeeklyObj= gCandleWeeklyObj.reverse();
          // properly reversed obj

          gObjsLoadedObj[gLasti].objPost = gCandleWeeklyObj ;
          // console.log("] gObjsLoadedObj[gLasti].objPost==");
          // console.log(gObjsLoadedObj[gLasti].objPost);

      if( gRenderInsetFlag==1 ){ 
       CandlesticksLongTermObj=gCandleWeeklyObj;     
       // Re nderWindowOOCandles( CandlesticksLongTermObj,  gViewportRectInset, "weekly" , "stocks");
      }


///////////// MONTHLY

        }else if(key0=="Monthly Adjusted Time Series"){
 // process monthly here...
          gCandleMonthlyObjTmp = objTarget[key0] ;
          gCandleMonthlyObj=[];
 
         cnt0=0;
          for (var key1 in gCandleMonthlyObjTmp ){
            // console.log (   key1 );
            // console.log (  gCandleMonthlyObjTmp[key1] );

            if(cnt0 < gMonthlyCandlesMax){
              tmpobj = gCandleMonthlyObjTmp[key1];



// each candlestick  - use adjclose here  if()
///
//
              for (var key2 in tmpobj ){
                // console.log (   "key2, tmpobj[key2]" );
                // console.log (   key2 );
                // console.log (    tmpobj[key2] );

                switch(key2){
                  case "1. open":
                    op=Number(tmpobj[key2]).toFixed(4);
                    break;
                  case "2. high":
                    hi=Number( tmpobj[key2]).toFixed(4);
                    break;
                  case "3. low":
                    lo=Number( tmpobj[key2]).toFixed(4);
                    break;
                 case "4. close":
                    cl=Number(tmpobj[key2]).toFixed(4);
                    break;
                case "5. adjusted close":
                    adjcl=Number(tmpobj[key2]).toFixed(4);
                    if( (cl/adjcl) > 1.24){
                      // console.log("5 . adj Close < close  SPLIT DETECTED!, cl/adjcl=");
                      // console.log(cl/adjcl);
                  if(cl!=adjcl){                     
                          spl =Math.floor(cl/adjcl);    
                          cl = cl /spl ;
                          op = op / spl;
                          hi = hi / spl;
                          lo = lo / spl;
                  }
                    }//else if(cl!=adjcl) cl=adjcl;

                    break;
                case "6. volume":
                     vol=Number(tmpobj[key2]).toFixed(0);
                    break;
                case "7. dividend amount":
                    divamt=Number(tmpobj[key2]).toFixed(4);

                      break;
                      
                }//sw

              }//for
             
// note need to handle stock splits via adjusted close vs close !!!
                pushCandleObjGeneric(gCandleMonthlyObj,op,hi,lo,cl,vol ,  cnt0, 
                // pushCandleObjGeneric(gCandleMonthlyObj,op,hi,lo,adjcl,vol ,  cnt0, 
                  gGET_SymbolStr , "stock", gCorpName +" (Monthly)"  , key1, "monthly"  );

     
            }//if(cnt0
            cnt0++;

          }//for key1




          // reverse obj
console.log("gCandleMonthlyObj, objTargetPost=="); 
          gCandleMonthlyObj= gCandleMonthlyObj.reverse();
 
          // HERE WE have a properly reversed obj
          gObjsLoadedObj[gLasti].objPost = gCandleMonthlyObj ;


      if( gRenderInsetFlag==1 ){ 
       CandlesticksLongTermObj= gCandleMonthlyObj;  
       // Re nderWindowOOCandles( CandlesticksLongTermObj,  gViewportRectInset, "monthly" , "stocks" );
      }




          
        }else if(key0.substring(0,13)=="Time Series ("){  
           console.log(" Time Series (Day) [incld], Time Series (30min), Time Series (5min), Time Series (60min), Time Series (5min), etc");
//  NEEDS DAILY ADJ ULTIMATELY HERE
          // process   here...
                   gCandleIntradayObjTmp = objTarget[key0] ;
                   gCandleIntradayObj=[];
          
                  cnt0=0;
                   for (var key1 in gCandleIntradayObjTmp ){
                     // console.log (   key1 );
                     // console.log (  gCandleIntradayObjTmp[key1] );
         
                     if(cnt0 < gIntradayCandlesMax){
                       tmpobj = gCandleIntradayObjTmp[key1];
         
                       for (var key2 in tmpobj ){
                         // console.log (   "key2, tmpobj[key2]" );
                         // console.log (   key2 );
                         // console.log (    tmpobj[key2] );
         
                         switch(key2){
                           case "1. open":
                             op=Number(tmpobj[key2]).toFixed(4);
                             break;
                           case "2. high":
                             hi=Number( tmpobj[key2]).toFixed(4);
                             break;
                           case "3. low":
                             lo=Number( tmpobj[key2]).toFixed(4);
                             break;
                          case "4. close":
                             cl=Number(tmpobj[key2]).toFixed(4);
                             break;
                         
                          case "5. volume":
                            vol=Number(tmpobj[key2]).toFixed(0);
                             break; 
                               
                         }//sw
         
                       }//for
                      
         // note need to handle stock splits via adjusted close vs close !!!
                         pushCandleObjGeneric(gCandleIntradayObj,op,hi,lo,cl,vol ,  cnt0, 
                           gGET_SymbolStr , "stock", gCorpName +" "+ key0.substring(12)  , key1.substring(0,10), key1.substring(11)  );
         
              
                     }//if(cnt0
                     cnt0++;
         
                   }//for key1
         
                   // reverse obj
    console.log("gCandleIntradayObj=="); 
                   gCandleIntradayObj= gCandleIntradayObj.reverse();
                    // properly reversed obj
                    gCandleMonthlyObj=gCandleIntradayObj;
                   console.log("gCandleIntradayObj==");
                   console.log(gCandleIntradayObj);
                   gObjsLoadedObj[gLasti].objPost = gCandleIntradayObj ;

                  if( gRenderInsetFlag==1 ){ 
                   CandlesticksLongTermObj= gCandleIntradayObj;  
                   // Re nderWindowOOCandles( CandlesticksLongTermObj,  gViewportRectInset, "monthly" , "stocks" );
                  }


                   
          }else if(key0=="Time Series (Daily)"){
            console.log(" Time Series (Daily)"); 
            gCandleDailyObjTmp = objTarget[key0] ;
             gCandleDailyObj=[];


             cnt0=0;
             for (var key1 in gCandleDailyObjTmp ){
               // console.log (   key1 );
               // console.log (  gCandleDailyObjTmp[key1] );
   
               if(cnt0 < gDailyCandlesMaxJB){
                 tmpobj = gCandleDailyObjTmp[key1];
   
                 for (var key2 in tmpobj ){
                   // console.log (   "key2, tmpobj[key2]" );
                   // console.log (   key2 );
                   // console.log (    tmpobj[key2] );
   
                   switch(key2){
                     case "1. open":
                       op=Number(tmpobj[key2]).toFixed(4);
                       break;
                     case "2. high":
                       hi=Number( tmpobj[key2]).toFixed(4);
                       break;
                     case "3. low":
                       lo=Number( tmpobj[key2]).toFixed(4);
                       break;
                    case "4. close":
                       cl=Number(tmpobj[key2]).toFixed(4);
                       break;
                   case "5. adjusted close":
                       adjcl=Number(tmpobj[key2]).toFixed(4);
                       break;
                   case "6. volume":
                        vol=Number(tmpobj[key2]).toFixed(0);
                       break;
                 case "7. dividend amount":
                        divamt=Number(tmpobj[key2]).toFixed(4);
    
                       break;
                 case "8. split coefficient":
                        splcoef=Number(tmpobj[key2]).toFixed(4);
        
                       break;
                               
                   }//sw
   
                 }//for
                
   // note need to handle stock splits via adjusted close vs close !!!
                   pushCandleObjGeneric(gCandleDailyObj,op,hi,lo,cl,vol ,  cnt0, 
                   // pushCandleObjGeneric(gCandleMonthlyObj,op,hi,lo,adjcl,vol ,  cnt0, 
                     gGET_SymbolStr , "stock", gCorpName +" (Day)"   , key1, "daily"  );
   
        
               }//if(cnt0
               cnt0++;
   
             }//for key1
   
             // reverse obj
             console.log("gCandleDailyObj=="); 
             gCandleDailyObj= gCandleDailyObj.reverse();
             gObjsLoadedObj[gLasti].objPost = gCandleDailyObj;
            
             gCandleMonthlyObj=gCandleDailyObj;

             // properly reversed obj
             console.log("gCandleDailyObj==");
             console.log(gCandleDailyObj);
   


          }//if daily
      

      }//for key0

  



}//fn






function StringToCandlestickObject( httpStr, objTarget , numLines , intervalExpectedStr, jsonOk ){
  console.log ( "] StringToCandlestick0bject() fn entry..."   );

  if(jsonOk!=1 && jsonOk!=0) return;


  if(jsonOk==1){
          console.log ( "] StringToCandlestick0bject() jsonOk== 1  !!!!"   );

          // const obj1 = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
          objTarget = JSON.parse( httpStr  ); 

            // console.log ( httpStr   );
            console.log ( intervalExpectedStr   );
            console.log (  "] objTarget=="  );
            console.log (  objTarget  );
            PostProcessCandleObj(objTarget, intervalExpectedStr , gCandlesObjPost );

            // console.log (  numLines   );

  }else  if(jsonOk==0){
    //ie earnings || earningsall
    //ie earnings || earningsall
    //ie earnings || earningsall
    //ie earnings || earningsall
    //ie earnings || earningsall
            console.log ( "] StringToCandlestick0bject() jsonOk==  0, gotta push csv to obj array"   );
             console.log ( intervalExpectedStr   );

            // console.log ( httpStr   );
            // console.log ( numLines   );

            var linesHttp    = httpStr.split("\n");
            var numLinesHttp = linesHttp.length;
            // console.log ( "] numLinesHttp  " );
            // console.log ( numLinesHttp   );


        let obj1 = {};      // obj vs array =[];
        let elemsnum =0;
        let elems;
        let elemsStr0;
        let elemsStr;
        let elemsStrDefault="2199-12-31";
        let numElems=0;
        let jj=0;
        let elemscurr;

        // symbol,name,reportDate,fiscalDateEnding,estimate,currency
        // AAPL,Apple Inc,2022-07-25,2022-06-30,1.16,USD
        //  0     1         2          3         4    5
            // for(jj=1;jj<numLinesHttp-1 ;jj++){               // skip 0th line == symbol,name,reportDate,fiscalDateEnding,estimate,currency
            for(jj=1;jj<numLinesHttp ; jj++){               // skip 0th line == symbol,name,reportDate,fiscalDateEnding,estimate,currency
              if(linesHttp[jj]!=""){
                  elems    = linesHttp[jj].split(",");
                  numElems = elems.length;    // ==6 ??

                                                 //             0123456789
                  elemsStr0 =  elems[2];         // repDate     2022-07-25   ==>  20220725

                  // ck for unix date len==10  ie "2022-07-25"
                  if(elemsStr0.length !=10 )  elemsStr=elemsStrDefault;  // sorted til the end of time iff no udate
                    else elemsStr  =  elemsStr0.substring(0,4)  + elemsStr0.substring(5,7)  + elemsStr0.substring(8)    ;
                  
                  elemsnum  =  Number( elemsStr );  //.toFixed(0);   // 20220725  ie sortable easier, faster


                  elemscurr = elems[5].split("\r");
                  obj1={
                    "symbol":        elems[0], 
                    "name":          elems[1], 
                    "repdate":       elems[2], 
                    "repdatenum":    elemsnum, 
                    "fde":           elems[3], 
                    "est":           elems[4], 
                    "curr":          elemscurr[0], 
                  };

                  if(jj%500==0){
                     
                            // console.log( linesHttp[jj] );
                              // console.log( obj1 );
                            // console.log( "jj==",jj );
                  }


                  objTarget.push(obj1);


                }// if(linesHttp[]!="")

              }//for
        //// ************** END OF Loop building obj

      console.log ( "] StringToCandlestick0bject() final checks & exiting..."   );

        // console.log( "] objTarget=" );
        // console.log(  objTarget );

 



        if( intervalExpectedStr.toLowerCase() =="earningsall"){
        	console.log( "] Wait ! earningsAll DETECTED!  Assigning to global EaringsOBJ " );
        	  gObjEarningsData = objTarget ;

            // new
            gObjsLoadedObj[ gEarningsAllIdx ].symbol=gDontCare;
            gObjsLoadedObj[ gEarningsAllIdx ].obj   =objTarget;

	        // console.log("] gObjEarningsData____3=");
	        // console.log(gObjEarningsData);

	        SortEarningsAll();   // draws too

	        // console.log("] gObjEarningsData____4=");
	        // console.log(gObjEarningsData);

        }else if( intervalExpectedStr.toLowerCase() =="earnings" ){

        	console.log( "] Wait ! earnings Corp DETECTED!  Assigning to global EaringsCorpOBJ " );
        	  gObjEarningsCorpData = objTarget ;

	        // console.log("] gObjEarningsCorpData____5=");
	        // console.log(gObjEarningsCorpData);

	        ProcessEarningsCorp();  // build the global string

        }


  }// if(jsonOk==0)


}//fn



function GetAlphaAdvantageDataFXIntraday()
{
    ctx.fillStyle = "#3366ff";   // arrowgreenColor ;
    ctx.font = "80px Arial";
      ctx.fillText( ( " Running Algos FXIntraday  on: "+gGET_SymbolStr  +" " + gEntryStr ) , 1000,  250  );
 
    // ClearCandles(CandlesFromAlpha);
    // gSplitDetected = 0;

    const Http = new XMLHttpRequest();

  
 //note: this defaults to compact, use outputsize=full
    // const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + 
    // apikeyStr+'&datatype=csv';
    //new = 5B4L3BMV41G6BCDH  

// const urlcsv = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=' + gGET_SymbolStr + '&interval=15min'+
const urlcsv = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min'+
    apikeyStr+'&datatype=csv';
//https://www.alphavantage.co/documentation/
// https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo&datatype=csv


    // 
//      https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo&datatype=csv


// https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo&datatype=csv

   Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetAlphaAdvantage Data FXIntraday: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("num lines = " + numLines);
        if (numLines > 2)
        {
          console.log ("first line: " + lines[0]);
          console.log ("second line: " + lines[1]);
          console.log ("3 line: " + lines[2]);
          console.log ("4 line: " + lines[3]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlpha: The request has been completed successfully!");
            } else {
              console.log("GetAlpha - oh no! status = " + status);
              return;
            }
    }
    else
    {
      //console.log("response not ready..  ");
      return;
    }

    //GETTING HERE MEANS we have whole response
        if (gLogs > 0)  console.log(Http.responseText);

        if (numLines < 4)
        {
          console.log ("first char: " + Http.responseText.substring(0,1) );

          // if (lines[0].substring(0,1) == "{")
          // {
          //   console.log("No Alpha Data - clearing gTickerExistsAV");
          //   gTickerExistsAV = 0;
          // }
        }

    }

}//fn

function GetAlphaAdvantageDataFX(intrv0)
{
    ctx.fillStyle = "#3366ff";   // arrowgreenColor ;
    ctx.font = "80px Arial";
      ctx.fillText( ( " Running Algos FX  on: "+gGET_SymbolStr  +" " + gEntryStr ) , 1000,  250  );
 
    // ClearCandles(CandlesFromAlpha);
    // gSplitDetected = 0;

    const Http = new XMLHttpRequest();

  
 //note: this defaults to compact, use outputsize=full
    // const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + 
    // apikeyStr+'&datatype=csv';
    //new = 5B4L3BMV41G6BCDH  

// const urlcsv = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=' + gGET_SymbolStr + '&interval=15min'+
const urlcsv = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD'+
    apikeyStr+'&datatype=csv';

    // 
//      https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo&datatype=csv


// https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo&datatype=csv

   Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetAlphaAdvantage Data FX: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("num lines = " + numLines);
        if (numLines > 2)
        {
          console.log ("first line: " + lines[0]);
          console.log ("second line: " + lines[1]);
          console.log ("3 line: " + lines[2]);
          console.log ("4 line: " + lines[3]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlpha: The request has been completed successfully!");
            } else {
              console.log("GetAlpha - oh no! status = " + status);
              return;
            }
    }
    else
    {
      //console.log("response not ready..  ");
      return;
    }

    //GETTING HERE MEANS we have whole response
        if (gLogs > 0)  console.log(Http.responseText);

        if (numLines < 4)
        {
          console.log ("first char: " + Http.responseText.substring(0,1) );

          // if (lines[0].substring(0,1) == "{")
          // {
          //   console.log("No Alpha Data - clearing gTickerExistsAV");
          //   gTickerExistsAV = 0;
          // }
        }

    }

}//fn




/*
daily data crypto from alpha van.
timestamp,open (USD),high (USD),low (USD),close (USD),open (USD),high (USD),low (USD),close (USD),volume,market cap (USD)

candlesticks.js:5661 

second line:
 2021-04-16,2514.04000000,2540.70000000,2514.04000000,2539.17000000,2514.04000000,2540.70000000,2514.04000000,2539.17000000,18907.35637000,18907.35637000


candlesticks.js:5662 

3 line:
 2021-04-15,2432.59000000,2543.47000000,2400.00000000,2514.04000000,2432.59000000,2543.47000000,2400.00000000,2514.04000000,681950.96645000,681950.96645000


candlesticks.js:5663 

4 line:
 2021-04-14,2299.19000000,2447.29000000,2281.33000000,2432.60000000,2299.19000000,2447.29000000,2281.33000000,2432.60000000,972931.60866000,972931.60866000
 
candlesticks.js:5652 
*/




// DAY                                  "day"
function GetAlphaAdvantageDataCrypto(  intrv0 )
{
  gInterval = intrv0;
  gIntervalCrypto = intrv0;
  gFetchCandlesStatus="attempting";
  setCryptoDrawState(1);


    ctx.fillStyle = "#33dd8e";   // arrowgreenColor ;
    ctx.font = "80px Arial";
    ctx.fillText( ( " Running AlgosCrypto on: "+gGET_SymbolCryptoStr  +" " + gEntryStr ) ,
         2200,  250  );
 
     
    const Http = new XMLHttpRequest(); 
  const urlcsv = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=' +gGET_SymbolCryptoStr+'&market='+gCurrency +
    apikeyStr+'&datatype=csv';
 
    Http.open("GET", urlcsv);
    Http.send();

 
    Http.onreadystatechange = (e) => {
        // console.log ("HTTP: in ready av crypto callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        // console.log("num lines = " + numLines);
        if (numLines > 2)
        {
            setCryptoDrawState(2);
          // console.log ("first line: ===>" + lines[0])+"<===";
          // console.log ("second line: ===>" + lines[1]+"<===");
          // console.log ("3 line: " + lines[2]);
          // console.log ("4 line: " + lines[3]);
        }
/*
The XMLHttpRequest has a abort method, which cancels the request, but if the request has already been sent to the server then the server will process the request even if we abort the request but the client will not wait for/handle the response.

The xhr object also contains a readyState which contains the state of the request(UNSENT-0, OPENED-1, HEADERS_RECEIVED-2, LOADING-3 and DONE-4). we can use this to check whether the previous request was completed.

*/
        if(Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlpha: The request has been completed successfully!");

            } else {
              console.log("GetAlpha - oh no! status = " + status);
              return;
            }

       }else{
           //console.log("response not ready..  ");
            return;
        }

if( lines[0]=="{"){
  // error msg - do not populate
      gFetchCandlesStatus="failed";
  setCryptoDrawState(10);
  console.log("FAILED TO RECV DATA FOR ", gGET_SymbolCryptoStr );
    sfx_serverFailed.play();

    console.log("] G3tAlphaAdvantageDataCrypto() : intrv0,urlcsv==");
    console.log(intrv0);
    console.log(urlcsv);

}else{
    gFetchCandlesStatus="success";
    setCryptoDrawState(3);
     PopulateRawDataOO("crypto", Http.responseText ); 
 }



    // var jj=0;

    // var lines = Http.responseText.split("\n");
    // var numLines = lines.length;

 
    // console.log( "*** !!!GETTING HERE MEANS we have whole response"+numLines);
    
    // sfx_serverReturnCrypto.play();
     
    // initOneTimeMe thods();

    // for(jj=0;jj<numLines;jj++){
    //      console.log (gGET_SymbolCryptoStr);
    //        console.log (jj);
    //      //console.log (  lines[jj]  );

       
                  
                  
    //       var elems = lines[jj].split(",");
    //       var numElems = elems.length;

    //       var timestamp = elems[0];
    //       var op = elems[1];
    //       var high = elems[2];
    //       var low = elems[3];
    //       var cl = elems[4];
    //       var mktcap = elems[10];
    //       var vol = elems[9];
    //            // push 

    //       console.log (timestamp);
    //       console.log (op);
    //       console.log (high);
    //       console.log (low);
    //       console.log (cl);
    //       console.log (vol);


    //             }//for



    //GETTING HERE MEANS we have whole response
//          if (gLogs > 0)  console.log(Http.responseText);

//         if (numLines < 4)
//         {
//           console.log ("first char: " + Http.responseText.substring(0,1) );

//           // if (lines[0].substring(0,1) == "{")
//           // {
//           //   console.log("No Alpha Data - clearing gTickerExistsAV");
//           //   gTickerExistsAV = 0;
//           // }
//         }else{

// // more than 4
//         }






    }//     Http.onreadystatechange = (e) => {





    /*

    //GETTING HERE MEANS we have whole response
        if (gLogs > 0)
          console.log(Http.responseText);

        if (numLines < 4)
        {
          console.log ("first char: " + Http.responseText.substring(0,1) );

          if (lines[0].substring(0,1) == "{")
          {
            console.log("No Alpha Data - clearing gTickerExistsAV");
            gTickerExistsAV = 0;
          }
        }

        var i,j;
        var entry = 0;
        var dateStart = '2020-05-01'; // default date
        j = 0;
        for (i = numLines-2; i > 0; i--) {

          // data from CSV
         // var timestamp,op,high,low,cl,adjusted_close,volume,dividend_amount,split_coefficient;

          //data for Candles
          //,6.97','7.11','6.93','7.04','43517662','2020-08-14','7.07','7.16','Fri','F','10','11','12','13','58.39','15_*286',

          var elems = lines[i].split(",");
          var numElems = elems.length;

          var timestamp = elems[0];
          var op = elems[1];
          var high = elems[2];
          var low = elems[3];
          var cl = elems[4];
          var adjClose = elems[5];
          var vol = elems[6];

//JMB 2020-10-09
          var divamt = elems[7];
          var splitcoef = elems[8];
    */

}//fn

 

var gLatestPopulatedAssetTextStr  = "";
var gLatestPopulatedAssetTextStr1 = "";
var gLatestPopulatedAssetTextStr2 = "";

function PopulateRawDataOO( typestr, responseText){   //, numCandles ){

    var jj=0;
    var lines =  responseText.split("\n");   // csv data from server
    var numLines = lines.length;

      console.log( "] *** Popula teRawDataOO( ) : gInterval, gAssetType==" );
      console.log( gInterval , gAssetType );

      console.log( "___GETTING HERE MEANS we have whole response"+numLines);
    
if(typestr=="crypto"){
 sfx_serverReturnCrypto.play();
 gAssetType =typestr;
}else if(typestr=="stocks"){
  ;
  //
   gAssetType =typestr;   //"day"

}

// this should init the array
    initOneTimeMethods();

// cap it
    // if( numLines > numCandles ) numLines= numCandles;

    if( numLines > 999 ) numLines= gMaxCandles;   // alphavantage gives 1000 lines incl 1st headeroftext

console.log ("timestamp, op, high, low,cl, vol, mktcap==");

    for(jj=1;jj<numLines;jj++){
         // console.log(gGET_SymbolCryptoStr);
         var c1 = gGET_SymbolCryptoNameStr.indexOf("_")+1;
         var c2 = gGET_SymbolCryptoNameStr.length;

         // gGET_SymbolCryptoNameStr=  gGET_SymbolCryptoNameStr.substring( c1, c2 );
         gGET_SymbolCryptoNameStr=  gGET_SymbolCryptoNameStr.substring( c1 );

         // console.log("gGET_SymbolCryptoNameStr ==", gGET_SymbolCryptoNameStr);

//console.log (jj);
         //console.log (  lines[jj]  ); 
           
var datestamp="yyy-mm-dd";
var datestamp0="yyy-mm-dd";
var  timestamp="23:59:59"  ;  

var op =   -1; 
var high =   -1; // Number(elems[2]);
var low =  -1; //  Number(elems[3]);
var cl =   -1; //  Number(elems[4]);
var mktcap= -1; // Number(elems[10]);
var vol =   -1; // Number(elems[9]);


var elems = lines[jj].split(",");
var numElems = elems.length;

if(gInterval=="day"){
          // var timestamp = elems[0];
            datestamp = elems[0];
            op =    Number(elems[1]);
            high =  Number(elems[2]);
            low =   Number(elems[3]);
            cl =    Number(elems[4]);
            mktcap= Number(elems[10]);
            vol =   Number(elems[9]);

 }else {  // intraday 1min, 5min, etc
            datestamp0 = elems[0];                  // ie on intraday =="2021-04-21 08:23:45" (UTC time)
            datestamp=  datestamp0.substring(0,10);  //  =="2021-04-21"
            timestamp=  datestamp0.substring(11);;     //            =="08:23:45"
           op =    Number(elems[1]);
           high =  Number(elems[2]);
           low =   Number(elems[3]);
           cl =    Number(elems[4]);
           vol =   Number(elems[5]);


 } 
           // console.log (" lines[jj] ");
           // console.log ( lines[jj] );
           // console.log ("timestamp, op, high, low,cl, vol, mktcap==");
          if(jj%90==0) console.log (timestamp, op, high, low,cl, vol, mktcap);
  
//need mkt cap but it does not come in from AlphaVantage
      pushCandleObj( op , high, low, cl , vol,  (jj-1), gGET_SymbolCryptoStr, typestr, gGET_SymbolCryptoNameStr , datestamp, timestamp  );


    }//for

/////////////////// end of For loop - here we should have all arry objs pushed...
// 

  gLatestPopulatedAssetTextStr2  = candlestickObjects[0].corpname +" $"+ candlestickObjects[0].close;
  gLatestPopulatedAssetTextStr   = candlestickObjects[0].sym +"-"+gCurrency +  " ; "+ gInterval +" chart";   //   " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;

  // gLatestPopulatedAssetTextStr2  = candlestickObjects[0].corpname;
  // gLatestPopulatedAssetTextStr  = candlestickObjects[0].sym +": $"+ candlestickObjects[0].close +  " ("+ gInterval +" chart)";   //   " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
  gLatestPopulatedAssetTextStr1 =  "at "+candlestickObjects[0].utime+" UTC on "+ candlestickObjects[0].udate ;//
  
  // below in render path
  //gLatestPopulatedAssetTextStr1+=" #cndls_"+candlestickObjects.length ;

// prior to render, lets clip some early candles...
if(gInterval=="day"){
       // ClipOOCandles( 7 * 4   * 3 );    
       ClipOOCandles( gDailyCandlesToDisplay );   //  
     }

// by here, gAssetType and gInterval should be set.
    RenderOOCandles(   );  

    setCryptoDrawState(4);			// drawn, back from render call


}// Popu lateRawData

/*
var arr = ['A', 'B', 'C', 'D'];
var removed = arr.splice(1, arr.length-1);
console.log('Original Array: ', arr)
console.log('Removed Elements: ', removed)

// arr is ['A'] 
// removed is ['B', 'C', 'D']
*/

/*

get data in 1-min, 5, 15, 30, 60-min, day week or monthly data

loop thru data
  switch interval type:
    if weekly then bounds are 30th, 31st, etc
    if monthly then boudns are 'quarterly?'
    if 1,5,15-min, 30, 60, bounds are daily
  push candle from bigCandleObjDAta obj --> candleOO 
 then call Render00Candles()

*/
function formCandlestickObjs(){
	;

}



function Dump_candlestickObjects(){
   console.log( candlestickObjects );
} 

function ClipOOCandles(  clippt){
  // if( Math.abs(clippt) > candlestickObjects.length ) return;

  candlestickObjects.splice( clippt,  (candlestickObjects.length- clippt)  );

  // console.log("candlestickObjectsclipped crypto: ", clippt);
  // console.log( candlestickObjects );
}

// gChartLeftStart
let gViewportRect      =  {x: gChartLeftStart, y:500, w:4800, h:1500} ;
let gViewportRectCLEAR =  {x: gChartLeftStart, y: 100, w:canvasWidth, h:canvasHeight*0.85 } ;

//depricate
// let intradayRrect = gViewportRect; //{x:1050,y:100, w:4800, h:1800} ; 



function RenderOOCandles(  ){
  if(gInterval=="day"){ 
       RenderOOCandlesDaily(   candlestickObjects, gViewportRect); //  {x:900,y:240, w:5200, h:1300} );
     }else{
       RenderOOCandlesIntraday(candlestickObjects, gViewportRect); //   {x:1100,y:100, w:4800, h:1800} );
    }
}//fn



// America/Los Angeles (PDT) Apr 27 2021 00:15:00  GMT -07:00  DST -25200
// America/New York (EDT) Apr 27 2021 03:15:00  GMT -04:00  DST -14400


function RenderInfoWindow( viewportRect , textstr2 ){  

var rWidth; 
let textstr  = ""; //gLatestPopulatedAssetTextStr; //arrayOO[0].sym +": $"+ arrayOO[0].close +  " ("+ gInterval +" chart)";   //   " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
let textstr1 = ""; //gLatestPopulatedAssetTextStr1; // " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
// let textstr2 = ""; //gLatestPopulatedAssetTextStr2;

// get a center position
let txtx = viewportRect.x + (viewportRect.w * 0.35 );
let txty = viewportRect.y + (viewportRect.h * 0.125 );

    ctx.fillStyle = "#dddddd";  //'rgba( 30.0, 30.0, 250.0,  1.0)' ;
    // ctx.font = "bolder "+"64px Arial";
    ctx.font = "64px Arial";
    ctx.fillText( textstr2 , txtx , txty );

 rWidth = ctx.measureText(textstr2).width+ 48;
 

    // ctx.fillStyle = 'rgba( 80.0, 90.0, 120.0,  0.35 )' ;
    // ctx.fillRect( txtx - 32, txty-104-142-32-8-0,  rWidth, (8+142+104+8 + 16+130 ));

    // ctx.fillStyle = 'rgba( 200.0, 200.0, 240.0,  1.0)' ;
    // ctx.font = "64px Tahoma";
    // ctx.fillText( textstr + " "+gDailyCandlesToDisplay.toString() , txtx , txty-40  );

    // //ctx.fillStyle = 'rgba( 160.0, 160.0, 210.0,  1.0)' ;
    // ctx.font = "56px Tahoma";
    // ctx.fillText( textstr1 , txtx , txty+35  );


    // showResolution(txtx , txty+110,36 );

}//fn



//
//
//
function RenderInfo( viewportRect  ){  
var rWidth;
// let textstr = arrayOO[0].sym +": $"+ arrayOO[0].close +  " ("+ gInterval +" chart)";   //   " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
// let textstr1 =  " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;

let textstr  = gLatestPopulatedAssetTextStr; //arrayOO[0].sym +": $"+ arrayOO[0].close +  " ("+ gInterval +" chart)";   //   " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
let textstr1 = gLatestPopulatedAssetTextStr1; // " at "+arrayOO[0].utime+" UTC on "+ arrayOO[0].udate ;
let textstr2 = gLatestPopulatedAssetTextStr2;

// get a center position
let txtx = viewportRect.x + (viewportRect.w * 0.025 );
// let txty = viewportRect.y + (viewportRect.h * 0.225 );
let txty = viewportRect.y + (viewportRect.h * 0.0225 );



    // ctx.fillStyle = 'rgba( 80.0, 90.0, 120.0,  0.35 )' ;
    // ctx.fillRect( txtx - 32, txty-104-142-32-8-0,  1600, (8+142+104+8 + 16+130 ));

    ctx.fillStyle = "#03fcfc";  //'rgba( 30.0, 30.0, 250.0,  1.0)' ;
    ctx.font = "bolder "+"124px Arial";
    ctx.fillText( textstr2 , txtx , txty-112 -40 );

 rWidth = ctx.measureText(textstr2).width+ 48;
 
    ctx.fillStyle = 'rgba( 80.0, 90.0, 120.0,  0.35 )' ;
    ctx.fillRect( txtx - 32, txty-104-142-32-8-0,  rWidth, (8+142+104+8 + 16+130 ));


    ctx.fillStyle = 'rgba( 200.0, 200.0, 240.0,  1.0)' ;
    ctx.font = "64px Tahoma";
    ctx.fillText( textstr + " "+gDailyCandlesToDisplay.toString() , txtx , txty-40  );

    //ctx.fillStyle = 'rgba( 160.0, 160.0, 210.0,  1.0)' ;
    ctx.font = "56px Tahoma";
    ctx.fillText( textstr1 , txtx , txty+35  );


    showResolution(txtx , txty+110,36 );


}//fn 

/*
R4day = High+ 3*(Pday-Low) ;
R3day = (Pday-S1day) + R2day;
R2day = Pday + High – Low;
R1day = (Pday *2)-Low;
Pday  = (High + Low + Close )/3 ;
S1day = (Pday *2)-High;
S2day = Pday – High + Low;
S3day = Pday – (R2day-S1day);
s4day = Low- 3*(High-Pday) ;   //R4day = High+ 3*(Pday-Low) ;

*/

var g_hi0 =-1000;
var g_lo0 =90000000;
var g_cl0 =0;

 var g_hi0_x = 0;
 var g_hi0_y = 0;
 var g_hi0_idx = -1;

 var g_lo0_x = 0;
 var g_lo0_y = 0;
 var g_lo0_idx = -1;


function ResetHiLoCloseNOP(){
 ; // make these for inset window
  // g_hi0 =-1000;
  // g_lo0 =90000000;
  // g_cl0 =0;

  //  g_hi0_x = -400;
  //  g_hi0_y = 0;
  //  g_hi0_idx = -1;

  //  g_lo0_x = -400;
  //  g_lo0_y = 0;
  //  g_lo0_idx = -1;

}

function ResetHiLoClose(){

  g_hi0 =-1000;
  g_lo0 =90000000;
  g_cl0 =0;

   g_hi0_x = -400;
   g_hi0_y = 0;
   g_hi0_idx = -1;

   g_lo0_x = -400;
   g_lo0_y = 0;
   g_lo0_idx = -1;

}

function AssignHiLoClose(h0,l0,c0, idx0, x0 ){
   g_cl0 =c0;  // force close

  if(h0>g_hi0){
   g_hi0=h0;
   g_hi0_x = x0;
   g_hi0_y = GetYCoordFromPriceOO(h0, gRenderViewportRect);
   g_hi0_idx = idx0;

  }

  if(l0<g_lo0){ 
    g_lo0=l0;
    g_lo0_x = x0;
    g_lo0_y = GetYCoordFromPriceOO(l0, gRenderViewportRect);
    g_lo0_idx = idx0;

  }
}//fn

//
//                                   pivotPer== "day" "month" "week"
function DrawPivotsOO( xx0, arritem0, pivotPer  , predictFlag){
  let yy1;
  let w30=600;
  let xx01= xx0;
  xx0-= w30;

let r1,p,s1,s2,s3,s4,r2,r3,r4;

// hi lo close for testing
        //  ctx.setLineDash([]);
        // //   // ctx.setLineDash([8, 25]);

        //         ctx.beginPath();
        //         ctx.lineWidth=2;
        //         yy1= GetYCoordFromPriceOO(  g_hi0 , gRenderViewportRect ) ;
        //         ctx.moveTo(xx0,       yy1 );
        //         ctx.lineTo(xx0+w30,   yy1 );  

        //         ctx.strokeStyle = jb_orange ;      
        //         ctx.stroke();
                
 if( gDrawSupRes==1) {
     if( predictFlag==0) {

                ctx.fillStyle =jb_orange ;  
                ctx.font = "34px Arial";
                // ctx.fillText( "hi="+g_hi0.toFixed(2).toString(), xx0+(0.4*w30 ), yy1);
                ctx.fillText( "hi="+g_hi0.toFixed(2).toString(),  g_hi0_x+200,  g_hi0_y );
//
                ctx.fillStyle =jb_green  ;  
                ctx.font = "34px Arial";
                // ctx.fillText( "hi="+g_hi0.toFixed(2).toString(), xx0+(0.4*w30 ), yy1);
                ctx.fillText( "lo="+g_lo0.toFixed(2).toString(),  g_lo0_x+200,  g_lo0_y );
//
  }
}



        //         ctx.beginPath();

        //         ctx.lineWidth=5;
   
        //         yy1= GetYCoordFromPriceOO(  g_lo0 , gRenderViewportRect ) ;
        //         ctx.moveTo(xx0,   yy1 );
        //         ctx.lineTo(xx0+w30,   yy1 ); 
        //         ctx.strokeStyle= "#113311"; 
        //         ctx.stroke();

        //         ctx.beginPath();
        //           yy1= GetYCoordFromPriceOO(  g_cl0 , gRenderViewportRect ) ;
        //         ctx.moveTo(xx0,   yy1 );
        //         ctx.lineTo(xx0+w30,   yy1 );  
        //         ctx.strokeStyle= "#111123"; //"#6666ef";    
        //         ctx.stroke();
               
        // ctx.setLineDash([]);



 
  p = (g_hi0 + g_lo0 +  g_cl0 )/3 ;

 r1 = (p*2 ) - g_lo0;
 s1 = (p*2 ) - g_hi0

 r2 = p+ g_hi0 - g_lo0;
 s2 = p- g_hi0 + g_lo0; 

// R3day = (Pday-S1day) + R2day;
r3 = p - s1 +r2;

// S3day = Pday – (R2day-S1day);
s3 = p-  r2 - s1;

//R4day = High+ 3*(Pday-Low) ;
r4 = g_hi0 +    3*(p - g_lo0) ;
// s4day = Low- 3*(High-Pday) ; 
s4 = g_lo0 -    3*(g_hi0- p ) ;


// r4 = r4.toFixed(2);
// r3 = r3.toFixed(2);
// r2 = r2.toFixed(2);
// r1 = r1.toFixed(2);

// p  = p.toFixed(2);

// s1 = s1.toFixed(2);
// s2 = s2.toFixed(2);
// s3 = s3.toFixed(2);
// s4 = s4.toFixed(2);


if(pivotPer==  "month" ){
// for daily charting
  arritem0.SupResMonthly.r4 =r4;
  arritem0.SupResMonthly.r3 =r3;
  arritem0.SupResMonthly.r2 =r2;
  arritem0.SupResMonthly.r1 =r1;
  arritem0.SupResMonthly.p  =p;
  arritem0.SupResMonthly.s1 =s1;
  arritem0.SupResMonthly.s2 =s2;
  arritem0.SupResMonthly.s3 =s3;
  arritem0.SupResMonthly.s4 =s4;

}else if(pivotPer=="day"){
// for intraday charting

  arritem0.SupResDaily.r4 =r4;
  arritem0.SupResDaily.r3 =r3;
  arritem0.SupResDaily.r2 =r2;
  arritem0.SupResDaily.r1 =r1;
  arritem0.SupResDaily.p  =p;
  arritem0.SupResDaily.s1 =s1;
  arritem0.SupResDaily.s2 =s2;
  arritem0.SupResDaily.s3 =s3;
  arritem0.SupResDaily.s4 =s4;

}else if(pivotPer=="week"){

  arritem0.SupResWeekly.r4 =r4;
  arritem0.SupResWeekly.r3 =r3;
  arritem0.SupResWeekly.r2 =r2;
  arritem0.SupResWeekly.r1 =r1;
  arritem0.SupResWeekly.p  =p;
  arritem0.SupResWeekly.s1 =s1;
  arritem0.SupResWeekly.s2 =s2;
  arritem0.SupResWeekly.s3 =s3;
  arritem0.SupResWeekly.s4 =s4;
}
  // arritem0.xpixel =xx01;

// console.log("] ** arritem0 AFTER r4..r1,p,s1..s4 assignment");
// console.log(arritem0);
var rcol = "#ee4455" ;
var gcol = "#44ee55" ;
var bcol = "#4455ee";


             /*
//
// red/pink   #fc03ce
//
// blue        #03ebfc
//
// green/aqua  #03fca9

             */

if(predictFlag==1){
  rcol = "#fc03ce" ;
  bcol = "#03ebfc";
  gcol = "#03fca9" ;


}

 if( gDrawSupRes==1) {


// fix into FUNCTion...
          ctx.setLineDash([12, 24]);

                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  r4 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle=rcol;// "#ee4455";   
                ctx.stroke();

                  ctx.fillStyle =rcol;//"#ee4455";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "36px Arial";
               ctx.fillText( "R4="+r4.toFixed(2).toString(), xx01+60 , yy1);

                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  r3 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle= rcol;//"#ee4455";   
                ctx.stroke();

                  ctx.fillStyle =rcol;//"#ee4455";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "40px Arial";
               ctx.fillText( "R3="+r3.toFixed(2).toString(), xx01+60 , yy1);


                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  r2 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle=rcol;// "#ee4455";   
                ctx.stroke();

                  ctx.fillStyle =rcol;//"#ee4455";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "44px Arial";
               ctx.fillText( "R2="+r2.toFixed(2).toString(), xx01+60 , yy1);


                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  r1 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle= rcol;//"#ee4455";   
                ctx.stroke();

                  ctx.fillStyle =rcol;//"#ee4455";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "48px Arial";
               ctx.fillText( "R1="+r1.toFixed(2).toString(), xx01+60 , yy1);




                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  p , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle=  bcol;//"#4455ee";   
                ctx.stroke();

                  ctx.fillStyle = bcol;//"#4455ee";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "42px Arial";
               ctx.fillText( "P="+p.toFixed(2).toString(), xx01+40 , yy1);





                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  s1 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle= gcol;//"#44ee55";   
                ctx.stroke();

                  ctx.fillStyle = gcol;//"#44ee55";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "48px Arial";
                ctx.fillText( "S1="+ s1.toFixed(2).toString(), xx01+40 , yy1);



                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  s2 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle=  gcol;//"#44ee55";   
                ctx.stroke();

                  ctx.fillStyle = gcol;//"#44ee55";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "44px Arial";
                ctx.fillText( "S2="+ s2.toFixed(2).toString(), xx01+40 , yy1);



                ctx.beginPath();
                yy1= GetYCoordFromPriceOO(  s3 , gRenderViewportRect ) ;
                ctx.moveTo(xx01,   yy1 );
                ctx.lineTo(xx01+w30,   yy1 );  
                ctx.strokeStyle=  gcol;//"#44ee55";   
                ctx.stroke();

                  ctx.fillStyle = gcol;//"#44ee55";  // "#66ff33";   // arrowgreenColor ;
                  ctx.font = "40px Arial";
                ctx.fillText( "S3="+ s3.toFixed(2).toString(), xx01+40 , yy1);


                // ctx.beginPath();
                // yy1= GetYCoordFromPriceOO(  s4 , gRenderViewportRect ) ;
                // ctx.moveTo(xx01,   yy1 );
                // ctx.lineTo(xx01+w30,   yy1 );  
                // ctx.strokeStyle=  gcol;//"#44ee55";   
                // ctx.stroke();

                //   ctx.fillStyle = gcol;//"#44ee55";  // "#66ff33";   // arrowgreenColor ;
                //   ctx.font = "36px Arial";
                // ctx.fillText( "S4="+ s4.toFixed(2).toString(), xx01+40 , yy1);



}
          ctx.setLineDash([]);

               

}//fn
 





 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
//
//
//            RENDER INTRADAY OO  CRYPTO !
//
//
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////


var gRenderViewportRect;

function RenderOOCandlesIntraday( arrayOO,  viewportRect ){  
  var xx0;
  var xx0_last=0;
  var xx0delta;
  let lastarrayitem;

        gRenderViewportRect=viewportRect;
        ctx.fillStyle = gBGcol; // 'rgba( 10.0, 10.0, 150.0,  1.0 )' ;
        // ctx.fillStyle =  'rgba( 10.0, 10.0, 200.0,  0.50 )' ;
        // ctx.fillRect(viewportRect.x, viewportRect.y, viewportRect.w, viewportRect.h );
       ctx.fillRect(gViewportRectCLEAR.x, gViewportRectCLEAR.y, gViewportRectCLEAR.w, gViewportRectCLEAR.h );


// bigsym
         gProperAssetDetail="";      
       drawAssetNameinBG(gGET_SymbolCryptoStr , gGET_SymbolCryptoNameStr+ " -  "+gInterval.toString() +" chart", "CRYPTOCURRENCY");

        //arrayOO.splice(numcandles);
        // only reverse data if we are 1st downloading
   if(gCryptoDrawState!=4) arrayOO.reverse();   // put array in chronological order
  
        PreprocessOOCandlesEntry(arrayOO, gInterval , "crypto" );  // ,gAssetType );
       
        ResetHiLoClose();

        gLastCandle_udate="1776-12-13";

        gNumCandlestoRenderOO = arrayOO.length;
        gStartCandlestoRenderOO = arrayOO.length - gNumCandlestoRenderOO;
        
        gCandleXinBetweenWidthOO = 1; 

        gCandleXWidthOO = Math.floor( viewportRect.w / gNumCandlestoRenderOO ) /2 *0.85; 
        gCandleXStartOO = viewportRect.x+ gCandleXWidthOO + gCandleXinBetweenWidthOO  ;
  

        // if( gLineO nClose!=0 )  ctx.beginPath();
        arrayOO.forEach( (arrayitem, i) => {

        gCandleXStartOO += gCandleXWidthOO + gCandleXinBetweenWidthOO  ;
        RenderCandlestickOO(arrayitem,  gCandleXStartOO, gCandleXWidthOO,  viewportRect ); 
        

// after render candle, for daily here check daily delineations
// CHECK   date / time delinations
  
//  day chart preprocess
// here on a daily chart we need to know Monthly delineations
let udate0= arrayitem.udate;   //  2021-04-09  
 
if(gLastCandle_udate != udate0){
    gLastCandle_udate = udate0;
// attempting to write .newDay  ==> was NOT working
    arrayitem.newDay =  gLastCandle_udate  ;
      xx0= gCandleXStartOO - gCandleXinBetweenWidthOO ;
      if(xx0_last!=xx0){
        xx0delta = xx0-xx0_last;
        xx0_last=xx0;
      }
    DrawTimeDelineation(arrayitem.sym+" - "+udate0,  xx0,  canvasHeight*0.2450,  "#55ef44", "#70709a" , 44, 12,36);
    DrawPivotsOO( xx0 , arrayitem , "day" , 0);  // "day" --> designates SupResDaily.r1..s1 etc
    ResetHiLoClose();

}else{

      AssignHiLoClose( arrayitem.high, arrayitem.low, arrayitem.close , arrayitem.idx, xx0  );

}

    lastarrayitem = arrayitem;

        })

// draw next period's  sup res  PREDICT next mo
        xx0 = xx0_last;
        xx0 += xx0delta; // = xx0-xx0_last;

    DrawTimeDelineation(lastarrayitem.sym +" - Est. Tomorrow",  xx0,  canvasHeight*0.2450,  "#55ef44", "#70709a" , 44, 24,72);
    DrawPivotsOO( xx0 , lastarrayitem , "day" , 1);  // "day" --> designates SupResDaily.r1..s1 etc
    // ResetHiLoClose();

    if(gDrawP3Pivots==2){
        drawContinuousLinesOO(arrayOO,  jb_blue , "p");   
        drawContinuousLinesOO(arrayOO,  jb_yellow, "p3");  
    }else if(gDrawP3Pivots==1){
        drawContinuousLinesOO(arrayOO,  jb_blue , "p");   

    }

    if(gLineOnClose==1) drawContinuousLinesOO(arrayOO,jb_purple, "close");  
    
    runBuySellSignalsOO(arrayOO, gMasterMaxCrossover  );
    
    RenderInfo(  viewportRect  );

}//fn
 


 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
//
//
//            RENDER  DAILY OO
//
//
//
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////

var   udateDay0;
var udateDaysRemaining ;

var gMaxPixelCandleWith =21;

function  DrawOutlineRect(viewportRect, col0 , wt0){
  DrawTrendLineColored1(viewportRect.x, viewportRect.y, viewportRect.x+viewportRect.w, viewportRect.y, col0 , wt0);
  DrawTrendLineColored1(viewportRect.x, viewportRect.y+viewportRect.h, viewportRect.x+viewportRect.w, viewportRect.y+viewportRect.h, col0 ,wt0 );

  DrawTrendLineColored1(viewportRect.x, viewportRect.y, viewportRect.x, viewportRect.y+viewportRect.h, col0 , wt0);
  DrawTrendLineColored1(viewportRect.x+viewportRect.w, viewportRect.y , viewportRect.x+viewportRect.w, viewportRect.y+viewportRect.h, col0 , wt0);
}

////////////////////////////////////////////////////////
// 
//
//  CALLED WHEN CANDLE DATA IS PRESENT
//
//////////////////////////////////////////////////////
// 
//
function RenderWindowOOCandles( array00,  viewportRect00, interval0  , assettype0 ){ 
  let array01=[];
if(gDrawWindowed==0)  return;

  var xx0;
  var xx0_last=0;
  var xx0delta;
  let lastarrayitem;

  var  viewportRect = { x: viewportRect00.x, y: viewportRect00.y ,w: viewportRect00.w, h:viewportRect00.h };

  viewportRect.w = 0.85 *  viewportRect.w;
  let viewportRect1=viewportRect;
  let candlesToDisplay = array00.length ;  
   
  // let numYearsMonthlyStr =  (candlesToDisplay / 12).toFixed(2).toString() + " years ";
  // let numYearsWeeklyStr  =  (candlesToDisplay / 52).toFixed(2).toString() + " years ";
  // let numYearStr = numYearsMonthlyStr;   // numYearsWeeklyStr

  let candleXWidthOO = 3 ;  //= Math.floor( viewportRect.w / gDailyCandlesToDisplay );
  gCandleXinBetweenWidthOO = 1; 

   let  candlesToDisplayProjectedMax = viewportRect.w  / (candleXWidthOO+  gCandleXinBetweenWidthOO  ); 
console.log("] *** R3nderWindowOOCandles() candlesToDisplayProjectedMax=");
console.log(candlesToDisplayProjectedMax);

if(candlesToDisplay > candlesToDisplayProjectedMax){
   console.log("] *****  !! candlesToDisplay > candlesToDisplayProjectedMax");
   console.log(candlesToDisplay  );

   array01 = array00.slice( (candlesToDisplay-candlesToDisplayProjectedMax) , candlesToDisplay);
   candlesToDisplay= candlesToDisplayProjectedMax;
}else array01=array00;

   candleXWidthOO = Math.floor( (viewportRect.w*0.90) / candlesToDisplay );
   if(candleXWidthOO> gMaxPixelCandleWith) gCandleXWidthOO=gMaxPixelCandleWith;
      

  let numYearsMonthlyStr =  (candlesToDisplay / 12).toFixed(2).toString() + " years ";
  let numYearsWeeklyStr  =  (candlesToDisplay / 52).toFixed(2).toString() + " years ";
  let numYearStr = numYearsMonthlyStr;   // numYearsWeeklyStr

  let candleXStartOO = Math.floor(viewportRect.x);

  // ctx.fillStyle =  'rgba( 10.0, 180.0, 150.0, 0.450 )' ;
  // ctx.fillStyle =  'rgba( 60.0, 60.0, 80.0, 1.0 )' ;
  ctx.fillStyle =  'rgba( 60.0, 60.0, 80.0, 0.900 )' ;
  ctx.fillRect(viewportRect00.x, viewportRect00.y, viewportRect00.w, viewportRect00.h );
  // ctx.fillRect(viewportRect.x, viewportRect.y, viewportRect.w, viewportRect.h );

let wt0=6;
let col0 = "#3399df";//cyan; jb_purple; // RandomColorC1(255);

   DrawOutlineRect(viewportRect00, col0 , wt0);

  // DrawTrendLineColored1(viewportRect.x, viewportRect.y, viewportRect.x+viewportRect.w, viewportRect.y, col0 , wt0);
  // DrawTrendLineColored1(viewportRect.x, viewportRect.y+viewportRect.h, viewportRect.x+viewportRect.w, viewportRect.y+viewportRect.h, col0 ,wt0 );

  // DrawTrendLineColored1(viewportRect.x, viewportRect.y, viewportRect.x, viewportRect.y+viewportRect.h, col0 , wt0);
  // DrawTrendLineColored1(viewportRect.x+viewportRect.w, viewportRect.y , viewportRect.x+viewportRect.w, viewportRect.y+viewportRect.h, col0 , wt0);


  console.log("] inside *** Rend3rWindowOOCandles(), array01.len, array01=");
  console.log(array01.length);
  console.log(array01);

 
   // PreprocessOOCandlesEntry( array00, interval0 ,assettype0 );    
  PreprocessOOCandlesEntry( array01, interval0 ,assettype0 );    
  console.log("]  *** RnderWindowOOCandles(), after Pr3processOOCandlesEntry");

  ResetHiLoCloseNOP();
// gLastCandle_udateMonth="2010-12";

   array01.forEach( (arrayitem, i) => {
       if(i%100==0){
        console.log("] ***>> in arr.forEach LOOP: candleXStartOO, arrayitem==");
        console.log(candleXStartOO);
        // console.log(arrayitem);
      }

        candleXStartOO += candleXWidthOO + gCandleXinBetweenWidthOO  ;

        candleXStartOO = Math.floor( candleXStartOO );
        //??  do we need 2nd one? 'stringed?'
        //   RenderCandlestickOO(arrayitem,  candleXStartOO, candleXWidthOO,  viewportRect ); 
        RenderCandlestickOOStringed(arrayitem,  candleXStartOO, candleXWidthOO,  viewportRect ); 

     }) 

// default to monthly
     if(interval0=="weekly")    numYearStr = numYearsWeeklyStr ;
       RenderInfoWindow(  viewportRect , numYearStr + " ("+interval0 +")" );
 

/*

/////// THIS SHOULD BE INSIDE LOOP FROM OTHER FN

// after render candle, for daily here check monthly delineations
// CHECK   date / time delinations
  
//  day chart preprocess
// here on a daily chart we need to know Monthly delineations
let udateMonth= arrayitem.udate;
//  2021-04-09  ==> 2021-04

      udateDay0=udateMonth.substring(8,10);  
     udateDaysRemaining = 31- Number(udateDay0);


// console.log("] ** udateDay0, udateDaysRemaining ==");
// console.log(  udateDay0, udateDaysRemaining  );



     udateMonth=udateMonth.substring(0,7); // ie exclude day == "=$"){


if(gLastCandle_udateMonth!= udateMonth){
    gLastCandle_udateMonth= udateMonth;

    //   /// attempting to write .newMonht  ==> was NOT working
         arrayitem.newMonth =  gLastCandle_udateMonth;
    let month0 = udateMonth.substring(5,7); 
    let month00 = Number(month0)-1;
    let monthstr = "na";
    monthstr = gMonths0[month00];

       xx0= gCandleXStartOO - gCandleXinBetweenWidthOO ;
      if(xx0_last!=xx0){
        xx0delta = xx0-xx0_last;
        xx0_last=xx0;
      }
    DrawTimeDelineation(arrayitem.sym+" - "+ monthstr.substring(0,3)+" "+gLastCandle_udateMonth.substring(0,4), 
                       xx0,  canvasHeight*0.20,  "#55efe8", "#70709a" , 44, 15,25 );
    DrawPivotsOO( xx0, arrayitem , "month" , 0);
    ResetHiLoClose();

    // console.log("] lined_NEW MONTH! <render> gLastCandle_udateMonth=",gLastCandle_udateMonth);



 //     //ie  candlestickObjects.push(  new CandlestickObj( idx, sym, symtype, gCurrency, corpname , udate, utime, dayofwk,
 //  console.log("] **** arrayitem.idx, arrayOO "); //" .udate, .utime ");
 // console.log( arrayitem.idx );
 // console.log( arrayOO);  // arrayitem.udate, arrayitem.utime); //, arrayitem.dayofwk );

  }else{ 
            AssignHiLoClose( arrayitem.high, arrayitem.low, arrayitem.close , arrayitem.idx, xx0);

  }//if
 
    lastarrayitem = arrayitem;

         }) 


// draw next period's  sup res  PREDICT next mo  ie lastarrayitem
         xx0 = xx0_last;
         xx0 += xx0delta; // = xx0-xx0_last;

    DrawTimeDelineation(lastarrayitem.sym  +" - Est. Next Month",  xx0,  canvasHeight*0.2450,  "#55ef44", "#70709a" , 44, 24,72);
    DrawPivotsOO( xx0 , lastarrayitem , "month",  1);  // "day" --> designates SupResDaily.r1..s1 etc
    // ResetHiLoClose();





if(gDrawP3Pivots==2){
    drawContinuousLinesOO(arrayOO,  jb_blue , "p");   
    drawContinuousLinesOO(arrayOO,  jb_yellow, "p3");  
}else if(gDrawP3Pivots==1){
    drawContinuousLinesOO(arrayOO,  jb_blue , "p");   

}

    if(gLineOnClose==1) drawContinuousLinesOO(arrayOO,jb_purple, "close");  
 
      runBuySellSignalsOO(arrayOO, gMasterMaxCrossover  );

//
//    THIS ONE IS FOR A CROSSOVER/  BUY /  SELL 
//
// D rawTriangle( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr ){
//


//
//   BE SURE TO PREDICT NEXT MONTH/PER ONE HERE
//
// console.log("] ENDOFLOOP ** udateDay0, udateDaysRemaining ==");
// console.log(  udateDay0, udateDaysRemaining  );


  // below in render path
  // gLatestPopulatedAssetTextStr1+=" #cndls="+candlestickObjects.length ;

     RenderInfo(  viewportRect  );



*/





}//fn


function PlayRandomGreeting(){

var rrnd=0;
    rrnd = RandomNumC(6);

      switch(rrnd){
         case 0:
                  sfx_serverGreeting0.play();
        break; 
        case 1:
                  sfx_serverGreeting1.play();
        break;
          case 2:  
              sfx_serverGreeting2.play();
        break;
          case 3:
              sfx_serverGreeting3.play();

        break;
          case 4:
              sfx_serverGreeting4.play();

        break;
          case 5:
              sfx_serverComplete2.play();

        break;
          default:
        break;
      }
        


}


/////////////////////////////////
//
//          RENDER OO CRYPTO !
//
function RenderOOCandlesDaily( arrayOO,  viewportRect){  


  gRenderViewportRect=viewportRect;
  var xx0;

  var xx0_last=0;
  var xx0delta;
  let lastarrayitem;

  ctx.fillStyle = gBGcol;    // 'rgba( 40.0, 40.0, 160.0,  0.80 )' ;
    // ctx.fillRect(viewportRect.x, viewportRect.y, viewportRect.w, viewportRect.h );
  ctx.fillRect(gViewportRectCLEAR.x, gViewportRectCLEAR.y, gViewportRectCLEAR.w, gViewportRectCLEAR.h );
  
  gProperAssetDetail="";

       drawAssetNameinBG(gGET_SymbolCryptoStr , gGET_SymbolCryptoNameStr+ " -  "+gInterval.toString()+" chart" , "CRYPTOCURRENCY");

  let viewportRect1=viewportRect;
 
        //arrayOO.reverse();   // put array in chronological order
        // if we've already rendered this one...
        if(gCryptoDrawState!=4) arrayOO.reverse();   // put array in chronological order
        PreprocessOOCandlesEntry(arrayOO ,"day" , "crypto" );  // , gAssetType );
 
        // console.log ("] inside to RendrOOCandlesDaily() viewportRect,1{}==", viewportRect, viewportRect1);
        // console.log (arrayOO);

        if(gGreetings==0){
         PlayRandomGreeting();
         gGreetings=1;
       }

        // testUnixDates();

//              400                   1000      -       600
        gStartCandlestoRenderOO = arrayOO.length - gNumCandlestoRenderOO;
       // arrayOO.splice(gStartCandlestoRenderOO, arrayOO.length);
       // arrayOO.splice(400, arrayOO.length);


        gCandleXinBetweenWidthOO = 1; 
        // gCandleXWidthOO = 4; 
        // gDa ilyCandlesToDisplay
        // gCandleXWidthOO = Math.floor( viewportRect.w / gNumCandlestoRenderOO );
        gCandleXWidthOO = Math.floor( viewportRect.w / gDailyCandlesToDisplay );

        if(gCandleXWidthOO> gMaxPixelCandleWith) gCandleXWidthOO=gMaxPixelCandleWith;
        // ( gCandleXWidthOO + gCandleXinBetweenWidthOO ); 
 

        gCandleXStartOO = viewportRect.x;

// main draw loop
// to shorten loop
//     arrayOO.splice(100,arrayOO.length).forEach( (arrayitem, i) => {
  //
       // arrayOO.splice(400, arrayOO.length);

// array00.slice(gNumCandlestoRenderOO,  arrayOO.length ).forEach( )
      ResetHiLoClose();
gLastCandle_udateMonth="2010-12";

       // arrayOO.splice(gStartCandlestoRenderOO, arrayOO.length);
        // if( gLine OnClose!=0 )  ctx.beginPath();

       arrayOO.forEach( (arrayitem, i) => {

          gCandleXStartOO += gCandleXWidthOO + gCandleXinBetweenWidthOO  ;

          // alternate but OO_1 needs to re-scan array for pricemin, bounds
         // RenderCan dlestickOO_1(arrayitem.splice(200,arrayitem.length),  gCandleXStartOO, gCandleXWidthOO,  viewportRect ); 

          RenderCandlestickOO(arrayitem,  gCandleXStartOO, gCandleXWidthOO,  viewportRect1 ); 
          // RenderC andlestickOO(arrayitem,  gCandleXStartOO, gCandleXWidthOO,  viewportRect ); 
 


// after render candle, for daily here check monthly delineations
// CHECK   date / time delinations
  
//  day chart preprocess
// here on a daily chart we need to know Monthly delineations
let udateMonth= arrayitem.udate;
//  2021-04-09  ==> 2021-04

      udateDay0=udateMonth.substring(8,10);  
     udateDaysRemaining = 31- Number(udateDay0);


// console.log("] ** udateDay0, udateDaysRemaining ==");
// console.log(  udateDay0, udateDaysRemaining  );



     udateMonth=udateMonth.substring(0,7); // ie exclude day == "=$"){


if(gLastCandle_udateMonth!= udateMonth){
    gLastCandle_udateMonth= udateMonth;

    //   /// attempting to write .newMonht  ==> was NOT working
         arrayitem.newMonth =  gLastCandle_udateMonth;
    let month0 = udateMonth.substring(5,7); 
    let month00 = Number(month0)-1;
    let monthstr = "na";
    monthstr = gMonths0[month00];

       xx0= gCandleXStartOO - gCandleXinBetweenWidthOO ;
      if(xx0_last!=xx0){
        xx0delta = xx0-xx0_last;
        xx0_last=xx0;
      }
    DrawTimeDelineation(arrayitem.sym+" - "+ monthstr.substring(0,3)+" "+gLastCandle_udateMonth.substring(0,4), 
                       xx0,  canvasHeight*0.20,  "#55efe8", "#70709a" , 44, 15,25 );
    DrawPivotsOO( xx0, arrayitem , "month" , 0);
    ResetHiLoClose();

    // console.log("] lined_NEW MONTH! <render> gLastCandle_udateMonth=",gLastCandle_udateMonth);



 //     //ie  candlestickObjects.push(  new CandlestickObj( idx, sym, symtype, gCurrency, corpname , udate, utime, dayofwk,
 //  console.log("] **** arrayitem.idx, arrayOO "); //" .udate, .utime ");
 // console.log( arrayitem.idx );
 // console.log( arrayOO);  // arrayitem.udate, arrayitem.utime); //, arrayitem.dayofwk );

  }else{ 
            AssignHiLoClose( arrayitem.high, arrayitem.low, arrayitem.close , arrayitem.idx, xx0);

  }//if
 
    lastarrayitem = arrayitem;

         }) 


// draw next period's  sup res  PREDICT next mo  ie lastarrayitem
         xx0 = xx0_last;
         xx0 += xx0delta; // = xx0-xx0_last;

    DrawTimeDelineation(lastarrayitem.sym  +" - Est. Next Month",  xx0,  canvasHeight*0.2450,  "#55ef44", "#70709a" , 44, 24,72);
    DrawPivotsOO( xx0 , lastarrayitem , "month",  1);  // "day" --> designates SupResDaily.r1..s1 etc
    // ResetHiLoClose();





if(gDrawP3Pivots==2){
    drawContinuousLinesOO(arrayOO,  jb_blue , "p");   
    drawContinuousLinesOO(arrayOO,  jb_yellow, "p3");  
}else if(gDrawP3Pivots==1){
    drawContinuousLinesOO(arrayOO,  jb_blue , "p");   

}

    if(gLineOnClose==1) drawContinuousLinesOO(arrayOO,jb_purple, "close");  
 
      runBuySellSignalsOO(arrayOO, gMasterMaxCrossover  );

//
//    THIS ONE IS FOR A CROSSOVER/  BUY /  SELL 
//
// Dr awTriangle( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr ){
//


//
//   BE SURE TO PREDICT NEXT MONTH/PER ONE HERE
//
// console.log("] ENDOFLOOP ** udateDay0, udateDaysRemaining ==");
// console.log(  udateDay0, udateDaysRemaining  );


  // below in render path
  // gLatestPopulatedAssetTextStr1+=" #cndls="+candlestickObjects.length ;

     RenderInfo(  viewportRect  );




}//fn


/*

 // ALGO BUY/SELL GUTS HERE...  code logic taken from J. Botti's Tradestation Algos (c) 2009-2018 by John Botti
//
                    // here we have Pivot and Pivot3 computed, after min 3 candlesticks
                     var dumb=0;
                    
                     if(Pivot3 > Pivot){   // ie Gold Higher than Blue SHORT              ===== SELL SIGNAL
                      longShort = -1;
                      
                      SellSignal++;
                      if( SellSignal == 1){
                        if(BuySignal=>3){
                              
                          candleArray[ idx + BUYSELL ] = "sel" + BuySignal.toString();
                          
                         if(BuySignal=>4){
                          //record algo #s for later  only after 4 candlesticks
                          gLastSellSignal_i   = i ;
                          gLastSellSignalValue = BuySignal;   // > 3 for # of candles before  crossover p to p3
                          gLastSellSignalPrice = Number(  candleArray[ idx + C ]  );   // grab closing price
                          }
                        
                        }
                        
                          
                      }
                      BuySignal=0;
  
 
 
                    }else if(Pivot3 < Pivot){     // ie Gold lower than Blue ie LONG  ===== BUY SIGNAL
                      longShort = 1;
 
                        BuySignal++;
                        if( BuySignal == 1){
                          if(SellSignal=>3){
                                
                            candleArray[ idx + BUYSELL ] = "buy"  + SellSignal.toString();
                          
                            if(SellSignal=>4){
                              //record algo #s for later only after 4 candlesticks
                              gLastBuySignal_i   = i;
                              gLastBuySignalValue = SellSignal;   // > 3 for # of candles before  crossover p3 to p
                              gLastBuySignalPrice = Number(  candleArray[ idx + C ]  );   // grab closing price
                            }
                          
                          }
                            
                            
                        }
                        SellSignal =0;

 
                     }else if(Pivot3 == Pivot){
                        longShort =0;
                        
                        BuySignal=0;
                        SellSignal=0;
                       
                    }
 
                }else{   // if 1st 3  [0], [1], [2] then use set Pivot3 = Pivot
                    candleArray[ idx + P3 ] =  candleArray[ idx + P ] ;
                }//else
                


*/

var   gMasterMinCrossoverINIT =3;
var   gMasterMaxCrossoverINIT= 4;

var   longShortOO  = 0 ;
var   SellSignalOO = 0 ;
var   BuySignalOO  = 0 ;
var   gMasterMinCrossover =gMasterMinCrossoverINIT;
var   gMasterMaxCrossover= gMasterMaxCrossoverINIT;


function initBuySellSignalsOO(){

    gMasterMinCrossover =gMasterMinCrossoverINIT;
    gMasterMaxCrossover= gMasterMaxCrossoverINIT;

    SellSignalOO = 0 ;
    BuySignalOO  = 0 ;
    longShortOO  = 0 ;
}

function runBuySellSignalsOO( arrayOO,  ct0 ){  // ie 4 ct0 ==crossoverthreshold
let  yy1,xx1;
      
    initBuySellSignalsOO();
    gCandleXStartOO = gRenderViewportRect.x;

      arrayOO.forEach( (arrayitem, i) => {
         
        gCandleXStartOO += gCandleXWidthOO + gCandleXinBetweenWidthOO  ;

        // start tracking i-1 p3, p

        if(i>= ct0){ 

                 // if(linetype=="p")  yy1= GetYCoordFromPriceOO(  arrayitem.p , gRenderViewportRect ) ;
                 //    else if(linetype=="p3")   yy1= GetYCoordFromPriceOO(  arrayitem.p3 , gRenderViewportRect ) ;
                 //      else  if(linetype=="close") yy1= GetYCoordFromPriceOO(  arrayitem.close , gRenderViewportRect ) ;
                 // ctx.lineTo(gCandleXStartOO +cwhalf,   yy1 );  
                 
                 xx1 =  gCandleXStartOO + gCandleXWidthOO*0.5 ;

                 // if blue > gold == trend UP
                 if(arrayitem.p > arrayitem.p3){
                        longShortOO = 1;
 
                        BuySignalOO++;
                        if( BuySignalOO == 1){
                          if(SellSignalOO => gMasterMinCrossover){

                             ; 
                             // here we put the buy info arrayitem.buysign...   
                            //candleArray[ idx + BUYSELL ] = "buy"  + SellSignal.toString();
                          
                                    // if(SellSignalOO => 4){  // ct0
                                    if(SellSignalOO => ct0){  // ct0

                                      yy1= GetYCoordFromPriceOO(  arrayitem.p , gRenderViewportRect ) ;
                                      yy1+=60;
                                      DrawTriangle( xx1, yy1, 28, arrowgreenColor, SellSignalOO , arrayitem.udate, arrayitem.p.toFixed(2).toString()+" "+ arrayitem.udate.substring(5,10), "" );


                                      //record algo #s for later only after 4 candlesticks
                                      gLastBuySignal_i   = i;
                                      gLastBuySignalValue = SellSignalOO;   // > 3 for # of candles before  crossover p3 to p
                                      gLastBuySignalPrice = Number(  arrayitem.close );   // grab closing price
                                    }
                                  
                          }
                        
                        }//if( BuySignalOO == 1)
                        SellSignalOO =0;

                 // if gold > blue == trend DOWN
                 }else if(arrayitem.p3 > arrayitem.p){
 
                      longShortOO = -1;
                      
                      SellSignalOO++;
                      if( SellSignalOO == 1){  ///first time around again
                        if(BuySignalOO =>gMasterMinCrossover ){  // gMas terMinCrossover
                          ;
                         //      set arrayitem.SellSignal  etc HERE  
                         // candleArray[ idx + BUYSELL ] = "sel" + BuySignal.toString();
                              
                                     // if(BuySignalOO => 4 ){   
                                     if(BuySignalOO => ct0 ){ //ct0  


                                      yy1= GetYCoordFromPriceOO( Number( arrayitem.p3 ), gRenderViewportRect ) ;
                                      yy1-=30;
                                      DrawTriangle( xx1, yy1, 28, arrowredColor, BuySignalOO , arrayitem.udate, Number(arrayitem.p3).toFixed(2).toString()+" "+ arrayitem.udate.substring(5,10), "" );

                                        //record algo #s for later  only after 4 candlesticks
                                      gLastSellSignal_i   = i ;
                                      gLastSellSignalValue = BuySignalOO;   // > 3 for # of candles before  crossover p to p3
                                      gLastSellSignalPrice = Number(  arrayitem.close );   // grab closing price
                                      }
                        }   
                      }
                      BuySignalOO=0; 
                 }else if(arrayitem.p3  ==  arrayitem.p){
                    initBuySellSignalsOO();
                 }


// function DrawTriangle( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr ){
//       DrawTriangle( xg007,  yg1*1.05, 28, arrowgreenColor, numCandlesChannel, currentmonthNum0, pivotStr, dateNoYrStr+" $"+gPositionCash.toFixed(0).toString()+", "+gPositionShares.toString()+  " #sh" );






           }// if (i>= ct0){

         })// arr loop

}//fn


function drawContinuousLinesOO(arrayOO,   lcol , linetype){

    gCandleXStartOO = gRenderViewportRect.x;
      // if(gInterval!="day"){
      if(linetype!="close"){
        gCandleXStartOO += gCandleXWidthOO + gCandleXinBetweenWidthOO  ;
     }

let cwhalf = gCandleXWidthOO * 0.5;
let yy1;
      ctx.beginPath();

      arrayOO.forEach( (arrayitem, i) => {

            // if(linetype!="p3" && i==3 ) ctx.moveTo( gCandleXStartOO+cwhalf,   GetYCoordFromPriceOO( arrayitem.close , gRenderViewportRect ) );
            if(linetype!="p3" && i==3 ) ctx.moveTo( gCandleXStartOO+cwhalf,   GetYCoordFromPriceOO( arrayitem.p , gRenderViewportRect ) );
              else if(linetype=="p3" && i<3 ){ ; } //ctx.moveTo( gCandleXStartOO+cwhalf,   GetYCoordFromPriceOO( arrayitem.close , gRenderViewportRect ) );

              gCandleXStartOO += gCandleXWidthOO + gCandleXinBetweenWidthOO  ;
   //          RenderCandlestick OO(arrayitem,  gCandleXStartOO, gCandleXWidthOO,  viewportRect1 ); 
                 if(linetype=="p")  yy1= GetYCoordFromPriceOO(  arrayitem.p , gRenderViewportRect ) ;
                    else if(linetype=="p3")   yy1= GetYCoordFromPriceOO(  arrayitem.p3 , gRenderViewportRect ) ;
                      else  if(linetype=="close") yy1= GetYCoordFromPriceOO(  arrayitem.close , gRenderViewportRect ) ;
                 ctx.lineTo(gCandleXStartOO +cwhalf,   yy1 );  
                ctx.strokeStyle= lcol;  //"#6789ef";  
                ctx.stroke();

         })


}




var gMonths0 = [ 'January','February','March','April','May','June','July','August',
                 'September','October','November','December' ];


function DrawTimeDelineation( txtstr, xx0, yy0, colline, coltext , px , dash1, dash2){

                ctx.beginPath();
 
                ctx.strokeStyle= colline; //"#339aee";    
                ctx.lineWidth=2;

                // ctx.setLineDash([8, 25]);
                ctx.setLineDash([dash1, dash2]);
                ctx.moveTo(xx0,0);
                ctx.lineTo(xx0,canvasHeight ); //1000);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = coltext; //"#70709a";  //"#9a9ade";   // arrowgreenColor ;
                // ctx.font = "64px Arial";
                ctx.font = px.toString()+"px Arial";

                ctx.save();
                ctx.translate(xx0 +px , yy0 );
                ctx.rotate(-0.5*Math.PI);

                // ctx.fillText( monthstr.substring(0,3)+" "+gLastCandle_udateMonth.substring(0,4), 0 ,0  ) ; //arrayitem.uday+" "+arrayitem.udate ,0 ,0);
                ctx.fillText(txtstr, 0 ,0  ) ; //arrayitem.uday+" "+arrayitem.udate ,0 ,0);
                ctx.restore();

}






// sample rotation text

/*

ctx.font = '30pt Arial';
ctx.fillText('Regular 222', 100, 50);

ctx.save();
ctx.translate(100,300);
ctx.rotate(-0.5*Math.PI);

var rText = 'Rotated Text';
ctx.fillText(rText , 0, 0);
ctx.restore();

var rWidth = ctx.measureText(rText).width;
ctx.fillText('Regular 111', 100, rWidth  + 120);

*/




//
//   draw from lower left   , // ,       o0,h0,l0,c0
//
function RenderCandlestickOOStringed( arrayitem, xc , xw, viewportRect  ){

let rG=0;   // assume RED Candle,where cl < op
// rG=0 for red candle, rG=1 for Green
 
let y1 = arrayitem.open;      // assume UL Y y1 coord is the open // RED candle
let y2 = arrayitem.close;
let y1a = Number(y1);
let y2a = Number(y2);

// let hc = math.abs(arrayitem.close- arrayitem.close )
// console.log("] ** R3nderCandlestickOOStringed( y1, y1a ...) : y1,y2, y1+y2, y1*y2=");
// console.log(y1,y2, y1+y2, y1*y2);
// console.log(y1a,y2a , y1a+y2a ,  y1a*y2a);

//assume RED
    if( y2a > y1a ){
    // if(arrayitem.close > arrayitem.open){
      // then GREEN candle
      rG=1;
      // swap y1,y2
      let ytmp = y1a;
       y1a = y2a; //arrayitem.close;
       y2a = ytmp; //arrayitem.open;
    }//if

 // console.log( "y1, y2==");
 // console.log( y1, y2);


let y1pix =  GetYCoordFromPriceOO(  y1a , viewportRect ) ;   // top
let y2pix =  GetYCoordFromPriceOO(  y2a , viewportRect ) ;   // bottom
// console.log("] y1pix,y2pix=");
// console.log(y1pix,y2pix);

// console.log( "y1pix,y2pix ==" );
// console.log( y1pix,y2pix  );


let hpix  =   (y2pix - y1pix);                                // height in pixels
 
// console.log( "hpix  ==" );
// console.log( hpix );

let wHi   =  GetYCoordFromPriceOO( Number(arrayitem.high), viewportRect );
let wLo   =  GetYCoordFromPriceOO( Number(arrayitem.low ), viewportRect );
// console.log( " wHi , wLo  ==" );
// console.log( wHi , wLo  );

    if(gLineOnClose==0){
              drawCandlestickGeometryOO( xc, y1pix ,xw,  hpix   ,wHi,wLo,rG,  arrayitem.close.toString(), arrayitem.idx );  
     }else if(gLineOnClose==1){
              drawCandlestickGeometryOOLineOnly( xc, y1pix ,xw,  hpix   ,wHi,wLo,rG,  arrayitem.close.toString(), arrayitem.idx ); 
    }


}//fn


//
//   draw from lower left   , // ,       o0,h0,l0,c0
//
function RenderCandlestickOO( arrayitem, xc , xw, viewportRect  ){

let rG=0;   // assume RED Candle,where cl < op
// rG=0 for red candle, rG=1 for Green
 
let y1 = arrayitem.open;      // assume UL Y y1 coord is the open // RED candle
let y2 = arrayitem.close;
// let hc = math.abs(arrayitem.close- arrayitem.close )

//assume RED
    if(arrayitem.close > arrayitem.open){
      // then GREEN candle
      rG=1;
      // swap y1,y2
       y1 = arrayitem.close;
       y2 = arrayitem.open;
    }//if

 // console.log( "y1, y2==");
 // console.log( y1, y2);


let y1pix =  GetYCoordFromPriceOO(  y1 , viewportRect ) ;   // top
let y2pix =  GetYCoordFromPriceOO(  y2 , viewportRect ) ;   // bottom

// console.log( "y1pix,y2pix ==" );
// console.log( y1pix,y2pix  );


let hpix  =   (y2pix - y1pix);                                // height in pixels
 
// console.log( "hpix  ==" );
// console.log( hpix );

let wHi   =  GetYCoordFromPriceOO( arrayitem.high, viewportRect );
let wLo   =  GetYCoordFromPriceOO( arrayitem.low , viewportRect );
// console.log( " wHi , wLo  ==" );
// console.log( wHi , wLo  );

    if(gLineOnClose==0){
              drawCandlestickGeometryOO( xc, y1pix ,xw,  hpix   ,wHi,wLo,rG,  arrayitem.close.toString(), arrayitem.idx );  
     }else if(gLineOnClose==1){
              drawCandlestickGeometryOOLineOnly( xc, y1pix ,xw,  hpix   ,wHi,wLo,rG,  arrayitem.close.toString(), arrayitem.idx ); 
    }


}//fn


//
// draw from bottom up x,y UL coord h down w across L-->R
//
function drawCandlestickGeometryOO( x,y,w,h ,  wHi,wLo,rG,  closeStr0, idx0 ){ //,   priceStr, dateStr, Pstr, P3str ){
        
    var wickX = x + (w/2);

    if( gLineOnClose==0){
                ctx.beginPath();
                ctx.strokeStyle= "#aaefff";   //="#999999";   // make wicks  grey vs black
                ctx.lineWidth=3;
// TOP WICK
                ctx.moveTo(wickX,wHi);
                ctx.lineTo(wickX,y);
                ctx.stroke();
// BOTTOM WICK
                ctx.moveTo(wickX,(y+h));
                ctx.lineTo(wickX,wLo);
                ctx.stroke();
                
// this determines rG red =0 or Green=1
                if (rG==0){ 
                  ctx.fillStyle = gCandleRedCol; //gCandleRedCol= "#DD0000";
                }else{
                 ctx.fillStyle = gCandleGreenCol ; //gCandleGreenCol ="#00CC00";
               }
// then fill the   rectangle awl-ready !!  -  candlestick drawn !
                ctx.fillRect(x,y, w,h);
    
//    ctx.fillStyle = "#ff9966";
  //  ctx.fillRect(x,Ybottom-200, w,h);

    }else{  //if(gLineO nClose==1){//if gLin eOnClose==1
      // determine close based on red or green candle
;

            // let ydest = y;
            // if (rG==0){ // ie ==0 ==red
            //   ydest = y+h;
            //  }

            //     ctx.beginPath();
            //     ctx.strokeStyle="#992299";   // make wicks  grey vs black
            //     ctx.lineWidth=3;
            //     //ctx.moveTo(wickX,wHi);   
            //     ctx.lineTo(wickX,ydest);
            //     ctx.stroke();

    }

}//fn

// RenderCandlestickOO
//
// draw from bottom up x,y UL coord h down w across L-->R
//
function drawCandlestickGeometryOOLineOnly( x,y,w,h ,  wHi,wLo,rG, closeStr0, idx0 ){ //,   priceStr, dateStr, Pstr, P3str ){
        
    var wickX = x + (w/2);

    if( gLineOnClose==0){
                ctx.beginPath();
                ctx.strokeStyle="#999999";   // make wicks  grey vs black
                ctx.lineWidth=1;
// TOP WICK
                ctx.moveTo(wickX,wHi);
                ctx.lineTo(wickX,y);
                ctx.stroke();
// BOTTOM WICK
                ctx.moveTo(wickX,(y+h));
                ctx.lineTo(wickX,wLo);
                ctx.stroke();
                
// this determines rG red =0 or Green=1
                if (rG==0){ 
                  ctx.fillStyle = gCandleRedCol; //gCandleRedCol= "#DD0000";
                }else{
                 ctx.fillStyle = gCandleGreenCol ; //gCandleGreenCol ="#00CC00";
               }
// then fill the   rectangle awl-ready !!  -  candlestick drawn !
                ctx.fillRect(x,y, w,h);
     

    }else{  //if(gLineOnCl ose==1){//if gLineO nClose==1
      // determine close based on red or green candle

            let ydest = y;

            if (rG==0){ // ie ==0 ==red
              ydest = y+h;
             }



  if(idx0==0){
console.log("***<.*** ydest==" , ydest);

                ctx.beginPath();
                ctx.strokeStyle="#992299";   // make wicks  grey vs black
                ctx.lineWidth=3;
                ctx.moveTo(wickX,ydest);   
                ctx.lineTo(wickX,ydest);
                ctx.stroke();
      }else{

                //ctx.beginPath();
                ctx.strokeStyle="#992299";   // make wicks  grey vs black
                ctx.lineWidth=3;
                //ctx.moveTo(wickX,wHi);   
                ctx.lineTo(wickX,ydest);
                ctx.stroke();

      }//else

    }

}//fn






function testUnixDates(){
        let v0= compareUnixDates("2021-04-30", "2021-04-29");
         console.log (v0);

         v0= compareUnixDates("2021-03-30", "2021-03-31");
         console.log (v0);

        v0=compareUnixDates("2021-03-09", "2021-04-09");
         console.log (v0);


        let v2 =compareUnixDates("2020-12-10", "2020-12-10");
         console.log (v2);

          v2 =compareUnixDates("2020-12-10", "2021-12-10");
         console.log (v2);



        let v3 =compareUnixDates("1980-12-10", "1980-12-09");
         console.log (v3);

        let v1=compareUnixDates("2025-03-10", "2021-03-09");
         console.log (v1);

          v1=compareUnixDates("2021-05-10", "2091-05-09");
         console.log (v1);

          v1=compareUnixDates("2021-05-11", "2021-05-10");
         console.log (v1);

          v1=compareUnixDates("2021-03-09", "2021-03-10");
         console.log (v1);

          v1=compareUnixDates("2021-03-09", "2021-03-08");
         console.log (v1);

          v1=compareUnixDates("2021-03-11", "2021-03-10");
         console.log (v1);
}//fn


 

///////////////////////////////////////////////////
///////////////////////////////////////////////////
//
function PreprocessOOCandlesIntraday(arrayOO){

let arraylen = arrayOO.length;

// check valid [0]th data
// console.log("arrayOO[0].symtype=");
// console.log(arrayOO[0].symtype);
// console.log(arrayOO[0].sym );

let symtype=arrayOO[0].symtype.toLowerCase();

// if( symtype== "crypto")                                         startIdx52weeks = crypto52weeks;
//   else if( symtype== "stocks"  || arrayOO[0].symtype== "stock") startIdx52weeks = stocks52weeks;
//     else if( symtype== "forex")                                 startIdx52weeks = forex52weeks;
 
// highAllTime    lowAllTime
//  LOOP
//
arrayOO.forEach( (arrayitem, i) => {
        // AllTime  HI / LO
      if(arrayitem.high > highAllTime){
         highAllTimeIdx= i;
         highAllTime  = arrayitem.high ;
      }
      if(arrayitem.low < lowAllTime){
        lowAllTimeIdx =i;
        lowAllTime = arrayitem.low ;
      }

 

// working but must do today==[0], so p3 = (  [-1] +  [-2] +  [-3] )/3
// same w/ volume and mvg avgs

// p3 p3calc0
   arrayitem.p3 = Number( processNdayAvg(p3day , 3 , i, arrayitem.p, arrayitem.udate ) ).toFixed(5);
       if(arrayitem.p3 <0){ 
        arrayitem.p3 = -1; //  arrayitem.p;
      }else {// valid 3 set
             arrayitem.p3vector.p_1= Number(   p3day[0].val).toFixed(5);  // yesterday, 1 day ago
             arrayitem.p3vector.p_2= Number(  p3day[1].val).toFixed(5);   // 2  days ago
             arrayitem.p3vector.p_3= Number(  p3day[2].val).toFixed(5);   //[3] is #4 current to be dropped off
      }


// wedge 20-day trail  BULLISH WEDGE
   arrayitem.wedgehigh = processNdayAvg(WedgeNdayHighs , gWedgeTrailingCandles ,  i, arrayitem.high,  arrayitem.udate );
   // if(arrayitem.wedgehigh <0) arrayitem.wedgehigh = -1; // arrayitem.close;

// wedge 20-day trail  BEARISH WEDGE
   arrayitem.wedgelow = processNdayAvg(WedgeNdayLows , gWedgeTrailingCandles ,  i, arrayitem.low,  arrayitem.udate );
   // if(arrayitem.wedgelow <0) arrayitem.wedgelow = -1; // arrayitem.close;

 
// need to do volume
  arrayitem.vol10day = processNdayAvg(vol10dayOO ,10, i, arrayitem.volume, arrayitem.udate );
   // if(arrayitem.vol10day <0) arrayitem.vol10day =  -1; // arrayitem.close;
 


 

      })// forEach


 rangeAllTime =   highAllTime - lowAllTime;
  

// console.log("] arrayOO.length==", arrayOO.length);

//  console.log("] END OF forEach LOOP: highAllTime, lowAllTime :");

// console.log(highAllTime, lowAllTime );
 


// console.log("p3day=="); 
// console.log(p3day); 



}//fn

var gLastCandle_udate="2010-12-13";
var gLastCandle_utime="nil";

var gLastCandle_udateMonth="2010-12";
 


function PreprocessOOCandlesEntry( arrayOO, intrv0, assettype0 ){     
// set global delinations
  gLastCandle_udate="1776-12-13";
  gLastCandle_utime="nil";

// crypto path
  if(assettype0=="crypto"){
      if(intrv0=="day"){
        PreprocessOOCandlesDay(arrayOO);
      }else{  // assume intraday
        PreprocessOOCandlesIntraday(arrayOO);
      }

// stock path
  }else if(assettype0=="stocks"){
    //assume WINDOWed stock chart
          console.log("] ** BEFORE  Pr3processOOCandlesWindow( ) :  rangeAllTime , highAllTime , lowAllTime=") ;

        PreprocessOOCandlesWindow( arrayOO, intrv0, assettype0 );
   }

}//fn

//
function PreprocessOOCandlesWindow( arrayOO, interval0, assettype0){
      let arraylen = arrayOO.length;
      // if(assettype0=="stocks"){
      //   if(interval0=="monthly"){
      //   }else if(interval0=="weekly"){
      //   }
      // }//else if(assettype0=="crypto"){ ; }


// '90.12' vs 90.12
//
// ********* highAllTime    lowAllTime
      //               LOOP
      arrayOO.forEach( (arrayitem, i) => {
          // AllTime  HI / LO
        if(Number(arrayitem.high) > highAllTime){
           highAllTimeIdx= i;
           highAllTime  = Number(arrayitem.high) ; //arrayitem.high ;
        }
        if(Number(arrayitem.low) < lowAllTime){
          lowAllTimeIdx = i;
          lowAllTime = Number(arrayitem.low); //arrayitem.low ;
        }

    // // p3 p3calc0
    //    arrayitem.p3 = Number( processNdayAvg(p3day , 3 , i, arrayitem.p, arrayitem.udate ) ).toFixed(5);
    //       if(arrayitem.p3 <0){ 
    //          arrayitem.p3 = -1; //  arrayitem.p;
    //       }else {// valid 3 set
    //              arrayitem.p3vector.p_1= Number(   p3day[0].val).toFixed(5);  // yesterday, 1 day ago
    //              arrayitem.p3vector.p_2= Number(  p3day[1].val).toFixed(5);   // 2  days ago
    //              arrayitem.p3vector.p_3= Number(  p3day[2].val).toFixed(5);   //[3] is #4 current to be dropped off
    //       }

     
      })// forEach

      rangeAllTime =   highAllTime - lowAllTime;

      console.log("] ** Pr3processOOCandlesWindow( ) :  rangeAllTime , highAllTime , lowAllTime=") ;
      console.log(rangeAllTime , highAllTime , lowAllTime) ;

}//fn


//
// array must be in chronological order 
//                          Daily
function PreprocessOOCandlesDay(arrayOO){    // Daily
 
let arraylen = arrayOO.length;
 
let startIdx52weeks = 0;

// should be GLOBALs
let stocks52weeks = 52 * 5 ; //DailyCandles = 5days / week 
let crypto52weeks = 52 * 7 ; //DailyCandles = 7 days/ week
let forex52weeks  = 52 * 6 ; //DailyCandles = 6 days/week

// note symtype == assettype
let symtype=arrayOO[0].symtype.toLowerCase();
if( symtype== "crypto")                                         startIdx52weeks = crypto52weeks;
  else if( symtype== "stocks"  || arrayOO[0].symtype== "stock") startIdx52weeks = stocks52weeks;
    else if( symtype== "forex" || symtype== "fx")                startIdx52weeks = forex52weeks;

//  ie       -66  =            299     - 364
let array52weekMarker = arraylen - startIdx52weeks;    // ie  len = 399, last year 

// highAllTime    lowAllTime
//
//  LOOP
//
  arrayOO.forEach( (arrayitem, i) => {
        // AllTime  HI / LO
      if(arrayitem.high > highAllTime){
         highAllTimeIdx= i;
         highAllTime  = arrayitem.high ;
      }
      if(arrayitem.low < lowAllTime){
        lowAllTimeIdx =i;
        lowAllTime = arrayitem.low ;
      }


// REALLY SHOULD BE DONE BY DATE
// 52 WEEK HI/lo  if we are in the last 52 weeks for said asset : cr,st,fx
      if(i > array52weekMarker){
               if(arrayitem.high > high52week ){
                  high52weekIdx=i;
                 high52week   = arrayitem.high ;
               }

               if(arrayitem.low < low52week){
                  low52weekIdx =i;
                  low52week      = arrayitem.low ;
             }

      }


// console.log("] arrayOO.length==", arrayOO.length);
// console.log("] array52weekMarker==", array52weekMarker);
// console.log("] END OF forEach LOOP: highAllTime, lowAllTime, high52week, low52week==");
// console.log(highAllTime, lowAllTime, high52week, low52week);
// console.log(highAllTimeIdx, lowAllTimeIdx, high52weekIdx, low52weekIdx);

// MOVING AVGS
/*
let    p3day;
let    mvg50day;
let    mvg100day;
let    mvg200day;
let    mvg500day;
let    mvg1000day;
*/

// working but must do today==[0], so p3 = (  [-1] +  [-2] +  [-3] )/3
// same w/ volume and mvg avgs

// p3 p3calc0
   arrayitem.p3 = Number( processNdayAvg(p3day , 3 , i, arrayitem.p, arrayitem.udate ) ).toFixed(5);
   if(arrayitem.p3 <0){ 
    arrayitem.p3 = -1; //  arrayitem.p;
  }else {// valid 3 set
         arrayitem.p3vector.p_1= Number(   p3day[0].val).toFixed(5);  // yesterday, 1 day ago
         arrayitem.p3vector.p_2= Number(  p3day[1].val).toFixed(5);   // 2  days ago
         arrayitem.p3vector.p_3= Number(  p3day[2].val).toFixed(5);   //[3] is #4 current to be dropped off
  }


// wedge 20-day trail  BULLISH WEDGE
   arrayitem.wedgehigh = processNdayAvg(WedgeNdayHighs , gWedgeTrailingCandles ,  i, arrayitem.high,  arrayitem.udate );
   // if(arrayitem.wedgehigh <0) arrayitem.wedgehigh = -1; // arrayitem.close;

// wedge 20-day trail  BEARISH WEDGE
   arrayitem.wedgelow = processNdayAvg(WedgeNdayLows , gWedgeTrailingCandles ,  i, arrayitem.low,  arrayitem.udate );
   // if(arrayitem.wedgelow <0) arrayitem.wedgelow = -1; // arrayitem.close;



// mvg avgs  ; returns -1 if not enough trailing candles
   arrayitem.mvavg50 = processNdayAvg(mvg50day ,50 ,  i, arrayitem.close,  arrayitem.udate );
   // if(arrayitem.mvavg50 <0) arrayitem.mvavg50 = -1; // arrayitem.close;
 
   arrayitem.mvavg100 = processNdayAvg(mvg100day ,100, i, arrayitem.close, arrayitem.udate );
   // if(arrayitem.mvavg100 <0) arrayitem.mvavg100 =  -1; // arrayitem.close;
 
   arrayitem.mvavg200 = processNdayAvg(mvg200day ,200, i, arrayitem.close, arrayitem.udate );
   // if(arrayitem.mvavg200 <0) arrayitem.mvavg200 =  -1; // arrayitem.close;
 
   arrayitem.mvavg500 = processNdayAvg(mvg500day ,500, i, arrayitem.close, arrayitem.udate );
   // if(arrayitem.mvavg500 <0) arrayitem.mvavg500 =  -1; // arrayitem.close;

   // arrayitem.mvavg1000 = processNdayAvg(mvg1000day ,100, i, arrayitem.close, arrayitem.udate );
   // if(arrayitem.mvavg1000 <0) arrayitem.mvavg1000 = arrayitem.mvavg1000;

// need to do volume
  arrayitem.vol10day = processNdayAvg(vol10dayOO ,10, i, arrayitem.volume, arrayitem.udate );
   // if(arrayitem.vol10day <0) arrayitem.vol10day =  -1; // arrayitem.close;


  // date / time delinations
//  day chart preprocess
// here on a daily chart we need to know Monthly delineations
let udateMonth= arrayitem.udate;
//  2021-04-09  ==> 2021-04

     udateMonth=udateMonth.substring(0,7); // ie exclude day == "=$"){


if(gLastCandle_udateMonth!= udateMonth){
    gLastCandle_udateMonth= udateMonth;

//   /// attempting to write .newMonht  ==> was NOT working
     arrayitem.newMonth =  gLastCandle_udateMonth;
 
  }

//more for intraday
if(gLastCandle_udate!=arrayitem.udate){
    gLastCandle_udate=arrayitem.udate;
 
  }

  // ***************************************** END OF forEach  LOOP
  // ***************************************** END OF forEach  LOOP

      })// forEach



 rangeAllTime =   highAllTime - lowAllTime;
 range52week  =    high52week- low52week;
 


}//fn



// **************************************************************  
// **************************************************************  
// **************************************************************  

function ClearCandles( cArray ){
    var i;
    var ll= cArray.length/candleOffset;   //   /16

    for(i=0;i<( ll*candleOffset); i++ ){
      cArray[i]=gFillStr;
    }
}

 

// **************************************************************  
// **************************************************************  
// **************************************************************  

function EnterApplicationLoop()
{
  // IF STOCKS IE NOT CRYPTO
  if(gCryptoFlag==0){

                              	// failsafe it
                              	/*
                            if(symtype=="stocks"){
                                 G3tAlphaAdvantageDataStocks(intrv);

                                 if(gFailAsyncData==1){
                                 		console.log("GetAlphaAdvantagData(): Forcing =SPY, day.  Unknown SYMBOL:");
                            			console.log(gGET_SymbolStr);
                                 		gGET_SymbolStr="SPY";
                                 		sfx_serverFailed.play();

                                 	    G3tAlphaAdvantageDataStocks("day"); //(intrv);  

                                 } 

                             	}
                              	*/

            	 console.log("] EnterApplicationL00p(): Before GetAlphaVantageData()   gGET_SymbolStr==");
          	   console.log(gGET_SymbolStr);

               GetAlphaAdvantageData("stocks","day");
          
                       // if(gFailAsyncData==1){
                       //     		console.log("EnterApplicationL00p(): Forcing =SPY, day.  Unknown SYMBOL:");
                      	// 		  console.log(gGET_SymbolStr);
                       //     		gGET_SymbolStr="SPY";   // should == new var ie  gLastWorkingSymbol ?
                       //     		 //sfx_serverFailed.play();
                       //     		 // call it
                       //    		GetAlphaAdvantageData("stocks","day");

                       //  } 

            }else  if(gCryptoFlag==1){
                GetAlphaAdvantageData("crypto",gInterval);
            }

}//fn




function GetAlphaAdvantageData(symtype, intrv){

  if(symtype=="stocks"){
  	 // failsafe  
     GetAlphaAdvantageDataStocks(intrv);

     if(gFailAsyncData==1) return;

                 //   if(gFailAsyncData==1){
                 //   		console.log("GetAlphaAdvantagData(): Forcing =SPY, day.  Unknown SYMBOL:");
              			// console.log(gGET_SymbolStr);
                 //   		gGET_SymbolStr="SPY";   // should == new var ie  gLastWorkingSymbol ?
                 //   		sfx_serverFailed.play();

                 //   	    Ge tAlphaAdvantageDataStocks("day"); //(intrv);  

                 //   } 

 	}else if(symtype=="crypto"){

      GetAlphaAdvantageDataCrypto(intrv);

     
    }

}//fn

// **************************************************************  
// **************************************************************  
// **************************************************************  









// **************************************************************  
// **************************************************************  
// **************************************************************  O V E R V I E W    R E Q
// **************************************************************  
// **************************************************************  


let resptextdata = '{  "a":  "987" , "b": "123"  } ';
let resptextdata1 = '{  "z":  "332" , "y": "665"  } ';
let resultOverivew = [];
let objOverview = [];

// // for new intraday, weekly monthly stock & compact (100) & full (1000) 
// let objCandleDataBig = [];

// let gObjEarningsData    = [];
// let gObjEarningsCorpData    = [];
// let gObjCandleDataSmall = [];



function  GetAlphaAdvantageDataStocksOverview(   ) //  was GetAlphaAdvantageDat a()
{
    // sfx_serverPreAccess.play();
   
   if(gCueSFX_Welcome ==1) { 
  PlayRandomGreeting();
	gCueSFX_Welcome=0;
   }

    // ctx.fillStyle = "#b266fa";    
    // ctx.font = "64px Arial";
    // ctx.fillText( ( "OVERVIEW for: "+gGET_SymbolStr   ) , gStartChartX+1400,  235  );
  
    const Http = new XMLHttpRequest();

    // https://www.alphavantage.co/query?function=OVERVIEW&symbol=TSLA&apikey=5B4L3BMV41G6BCDH
    const urlcsv = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + gGET_SymbolStr +  apikeyStr ;
    Http.open("GET", urlcsv);
    Http.send();
    console.log ("G3tAlphaAdvantageDataStocks0verview : after OVERVIEW_REQ http.send() ");


  Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

       // console.log("num lines = " + numLines);
       //  if (numLines > 2)
       //  {
       //     console.log ("first line: " + lines[0]);
       //     console.log ("second line: " + lines[1]);
       //  }

       if(Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetAlpha OVERVIEW: The request has been completed successfully!");
              console.log("num lines = " + numLines);

            } else {
              console.log("GetAlpha OVERVIEW- oh no! status = " + status);
              return;
            }
        }else{
          //console.log("response not ready..  ");
          return;
        }


    //GETTING HERE MEANS we have whole response, successful or not -
        // if (gLogs > 0)
          console.log("GetAlpha OVERVIEW-****************************");
          console.log( Http.responseText );

          resptextdata = Http.responseText ;
          // resptextdata1 = `${Http.responseText}` ;
          // ctx.fillText(  resptextdata  , gStartChartX+15,  246 );


          // const obj1 = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
          objOverview = JSON.parse( resptextdata  );  // '{"name":"John", "age":30, "city":"New York"}'   );

        //   //                     quoteElement.innerHTML = `<b>${data[key].t}</b> ${data[key].bp} ${data[key].ap} ${data[key].x} `; // ${data[key].x}`;
        //   ctx.fillStyle = "#a256aa";    
        //   ctx.font = "28px Arial";
        //   let ii=0;

        //   for(var i in objOverview){

        //     //resultOverivew.push([i,obj1[i]]);
            
        //     let strkey = i;
        //     let strvalue =  objOverview[i] ;
        //     // let strvalue =  `${obj1[i]}` ;

        //     console.log ("OVERVIEW : in-loop ", ii); //successfully complt'd.");
        //     console.log ( strkey,": ", strvalue  );

        //      ctx.fillText(  strkey+": "+strvalue  , gStartChartX+50,  235 + ii*30 );
        //     ii++;
  
        //   }
        //   // $('#result').html(JSON.stringify(resultOverivew));
        //   console.log ("OVERVIEW : loop successfully complt'd.  Loopcnt=", ii );
        //   // console.log (    resultOverivew  );



        if (numLines < 4)
        {
          console.log ("OVERVIEW first char: " + Http.responseText.substring(0,1) );

          if (lines[0].substring(0,1) == "{")
          {
            console.log("No Alpha Data OVERVIEW- clearing gTickerExistsAV");
             // gTickerExistsAV = 0;
          }
        }else{
          DrawOverviewData();
        }
 
 }// end ready state change
 
}//fn




var gSampleKeys =[

'0e9378433e6857cdb34d9b32d0b35a6f',
'5e01a3556ee04cac44507be55cec12f4',
'8100f16b30e5e8a317f3165f4ae22503',
'7437272559cf087594967421ba773762',
'5b0ee4a4e0813cb946b1a0bbffde5e4a',
'18d8654c1328e0a6fd30190bbd70e96d',
'69ff0d0ff3feed5f74eea774f08e2f9d',
'37b5f00099a4444456109cc8ffd43334',
'07683cd49375fafaf50782113a59bf7f',
'947a332b1bde0345fdf6225d136ceb3c',
'a5eda8b820408411b1d1eeeb611fd56b',
'fb0ac2c4678d21e6c314e1446aeb2419',
'6e3489121f91f92b9d0ccfd04abbbdc2',
'a4ce3595059a5ac844090e2fe7cd14ce',
'41c3888ee69e5930c3bcb84e40724444',
'af0489841f0d42587ff0ac749ff331f5',
'a69f68c1173964a6e06dc54364fcfd87',
'585064019ebaf2a3a861606dc45c76e9',
'dc74a829d8a2b18a0438ca907ceb9e11',
'55f5b5434e94e66ba46a9406b06c50e7',
'944cca987518815f1f624d4ff3e3880e',
'ef55eaef159f93258fc5a034999147ad',
'7c19d35ec1f711a8a38102a9f3eafb8b',
'7b2c669b9b2b982e042f43272f1d7f73',
'77330766f1a4d49f0c0e7451c5899a20',
'e883949434c9c9641c74a87a410f1f2a',
'd08618aca53a665f12ed179d096ce794',
'c822f17c7cab23e74e2fca82d4599438',
'10722fd313033d92391e7e5841475f7b',
'72d1593fecef3d2b112faf5900223a52',
'9481796daa68c188fe99094b6268a246',
'1e36cc76291a84e61d1e8e2e62194623',
'e8ee0b3408a25ebba0ed5b59d9f09804',
'379f5abb75afe136f2d9b59ee7b240b9',
'b60dca243544d24a9753a8e2f8f01f76',
'd84ab5508cbfaf6cf8b5bbd4c65dd12b',
'7b4575655b710383c6f0bdc8d63e0c2f',
'7248db2bd1e5715e3e089e0c15551933',
'9129c484bcea57128e11cc55d8a52d36',
'94a4f36c6d9a8bd09902e05bacbfe5a4',

];

/*
{
    "Symbol": "AMD",
    "AssetType": "Common Stock",
    "Name": "Advanced Micro Devices Inc",
    "Description": "Advanced Micro Devices, Inc. (AMD) is an American multinational semiconductor company based in Santa Clara, California, that develops computer processors and related technologies for business and consumer markets. AMD's main products include microprocessors, motherboard chipsets, embedded processors and graphics processors for servers, workstations, personal computers and embedded system applications.",
    "CIK": "2488",
    "Exchange": "NASDAQ",
    "Currency": "USD",
    "Country": "USA",
    "Sector": "MANUFACTURING",
    "Industry": "SEMICONDUCTORS & RELATED DEVICES",
    "Address": "2485 AUGUSTINE DRIVE, SANTA CLARA, CA, US",
    "FiscalYearEnd": "December",
    "LatestQuarter": "2022-03-31",
    "MarketCapitalization": "148301316000",
    "EBITDA": "4055000000",
    "PERatio": "35.46",
    "PEGRatio": "1.09",
    "BookValue": "6.21",
    "DividendPerShare": "0",
    "DividendYield": "0",
    "EPS": "2.57",
    "RevenuePerShareTTM": "13.55",
    "ProfitMargin": "0.192",
    "OperatingMarginTTM": "0.222",
    "ReturnOnAssetsTTM": "0.213",
    "ReturnOnEquityTTM": "0.474",
    "RevenueTTM": "16434000000",
    "GrossProfitTTM": "7929000000",
    "DilutedEPSTTM": "2.57",
    "QuarterlyEarningsGrowthYOY": "-0.454",
    "QuarterlyRevenueGrowthYOY": "0.488",
    "AnalystTargetPrice": "145.88",
    "TrailingPE": "35.46",
    "ForwardPE": "21.1",
    "PriceToSalesRatioTTM": "9.02",
    "PriceToBookRatio": "18.56",
    "EVToRevenue": "8.29",
    "EVToEBITDA": "32.7",
    "Beta": "1.805",
    "52WeekHigh": "164.46",
    "52WeekLow": "72.5",
    "50DayMovingAverage": "105.5",
    "200DayMovingAverage": "117.8",
    "SharesOutstanding": "1627360000",
    "DividendDate": "None",
    "ExDividendDate": "1995-04-27"
}

//earnings CORP
curr: "USD"
est: "1.16"
fde: "2022-06-30"
name: "Apple Inc"
repdate: "2022-07-25"
repdatenum: 20220725
symbol: "AAPL"

0: {symbol: 'AAPL', name: 'Apple Inc', repdate: '2022-07-25', repdatenum: 20220725, fde: '2022-06-30', …}
1: {symbol: 'AAPL', name: 'Apple Inc', repdate: '2022-10-26', repdatenum: 20221026, fde: '2022-09-30', …}
2: {symbol: 'AAPL', name: 'Apple Inc', repdate: '2023-01-25', repdatenum: 20230125, fde: '2022-12-31', …}

length: 3

NextEarnings :2022-06-30 $1.16est

*/

//              // if(gDrawSwitches==0) GetDat aSet_gInterval("stocks", "earn ings");


let gDrawCrawlCount =0;

let gFntAdder=2;
let gFntSz =48;

let gDetails_Yoff= 300  + gFntSz + gFntAdder;  // add 1 more row up top + gFntSz + gFntAdder;
let gDetailsEarnings_Xoff = 800;

let spos =0;
 


let CandlesticksLongTermObj=[];
let CandlesticksShortTermObj=[];

let gViewportRectInset      =  
    {x: gChartLeftStart+ (canvasWidth*0.11), y:220, w:2300, h:1400} ;
 
function VerifyUser( pubKey ){
  if(pubKey== GetUserID() ){
    return(1);
  }else return(0);

}

function DrawOverviewDataAfter(){

        console.log("]  **** inside Draw0verviewDataAfter()");

        // GetL ongTermDataAfter("weekly");   
        // GetL ongTermDataAfter("monthly");  
        
         // DEL ME
        // Cyc leFintechDataTEST1();


}//fn

function GetLongTermDataAfter(intervalStr0){
    // assume stocks for now, but switch it eventually...

    if(intervalStr0=="monthly" || intervalStr0=="weekly" )
        GetAlphaAdvantageStockDataNew( intervalStr0, CandlesticksLongTermObj , "insert");
    else GetAlphaAdvantageStockDataNew( intervalStr0, CandlesticksShortTermObj , "insert");

        console.log("]  **** AFTER   GetAlphaAdvantageSt0ckData(  intervalStr0 ==");
        console.log(intervalStr0);

        console.log("]    CandlesticksLongTermObj == "); 
        console.log( CandlesticksLongTermObj );

}

//
//        draws the text on  the left with fundamental data
//
// local copy
  // let objEarningsData= [];

function DrawOverviewData(){
// for stocks at the moment
if(gDrawCrypto>0) return;


// let jb_yellow1 ="#e5da22";
// let jb_yellow2 ="#c3bc11";
        let yfill1 		=jb_yellow1;  
        let yfill2 		=jb_yellow2; 
        let fill1 		= "#00cc88";
        let fill2 		= "#1a88dc";  //"#1affff";   
        let fillAlert 	= "#a65ed6"; //"#dea524";   
        let  fillRed = "#a10815";
        // let fillBlue = "#6690de";
        let fillBlue = "#6690de";
        let curfill = fill2;

        let fontsz =gFntSz; // 48; //38; //34;
        let fontcurrent = fontsz;

let hlstr = "";
let mastr = "";
let noDividend=0;

// draw bg rect
          let x1  = GetDetailsXoff();
          ctx.fillStyle = "#111133";
          ctx.fillRect( x1 , gDetails_Yoff- fontcurrent - 2 , canvasWidth*0.1275, canvasHeight*0.780 );


          //                     quoteElement.innerHTML = `<b>${data[key].t}</b> ${data[key].bp} ${data[key].ap} ${data[key].x} `; // ${data[key].x}`;
          ctx.fillStyle = fill2 ; //"#a256aa";    
          // ctx.font = "28px Arial";
          ctx.font = fontcurrent.toString() +"px Arial";
          let ii=0;
          let icnt=0;
          // let x1  = GetDetailsXoff();

          ctx.fillStyle = fill1 ; //"#a256aa";    
          	// ctx.fillText(  strkey+": "+strvalue  , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
          	ctx.fillText(  gEarningsCorpStr , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
          	ii++;
          ctx.fillStyle = fill2 ; //"#a256aa";    


		  gProperAssetDesc="";









          for(var i in objOverview){

            let strkey = i;
            let strkey1 =strkey.toLowerCase();

            let strvalue =  objOverview[i] ;
            let strvalueNumber = parseFloat( strvalue ).toFixed(5);
            let strvalueNumber0 = parseFloat( strvalue );
			      let cstr = strvalueNumber0.toLocaleString("en-US");

             // console.log ("OVERVIEW : in-loop ", ii); //successfully complt'd.");
            // console.log ( strkey,": ", strvalue  );

            if(curfill==fill2) curfill=  fill1;
              else curfill = fill2;
			     ctx.fillStyle =curfill;

            switch(strkey1) {  	
            	case "exchange":
            	case "sector":
            	case "industry":
            	   gProperAssetDesc +=   strvalue+"   ";
            	break;

            	case "name":
            		gProperAssetName=strvalue;
            	break;
            	case "revenuettm":  
            	case "grossprofitttm":  
            	case "ebitda":  
               // if( strvalue.toLowerCase()=="none")  
               if( Number(strvalue) <  0)  
              		 ctx.fillStyle = fillRed;
               if( strvalue.toLowerCase()!="none")  strvalue=  gCurrencyStr + cstr;

            	break;
              	case "sharesoutstanding":
					         strvalue=  cstr;
              	break;
              	case "marketcapitalization":
                 strvalue=  gCurrencyStr +cstr;
                 // strkey  = gGET_SymbolStr +"'s MarketCap" ;
                 strkey  = "MarketCap" ;
              	break;
              	case "beta":  
              		 if( strvalueNumber>1.125   ) 
              		 	 ctx.fillStyle = fillAlert;
              		 // if( strvalueNumber>1.375   ) 
              		 // 	 ctx.fillStyle = fillRed;
              	break;
              	case "pegratio":  
              		 if( strvalueNumber>0.6  &&  strvalueNumber<3.34  ) 
              		 	 ctx.fillStyle = fillAlert;
              	break;
              	case "dividendyield":  
              		 if( strvalueNumber>0.00000    ) 
              		 	 ctx.fillStyle = fillAlert;

                    let strvalue04 = strvalue;
                    strvalueNumber*=100;
                    strvalue = strvalueNumber.toFixed(2).toString() + "% ("+ strvalue04 +")" ;
              	break;
              	case "dividendpershare":  
              		 if( strvalueNumber>0.00000    ) 
              		 	 ctx.fillStyle = fillAlert;
              		  strvalue = gCurrencyStr+strvalue;	

                 if( strvalueNumber== 0.00   ){
                  noDividend=1;
                 }

              	break;

               


              	case "description":      	
			        gProperAssetDetail= strvalue;     // gProperAssetDesc
					// ctx.fillStyle = fillBlue;
					// let strvalue2 = strvalue.substring(spos, 25);
					// spos++;	
			  //       if(spos>strvalue.length) spos=0;
			  //       strvalue = strvalue2;

              	break;
              	case "peratio":  
              		 // if( strvalue.toLowerCase()=="none")  
                   if( Number(strvalue) <  0)  
              		 	    ctx.fillStyle = fillRed;
				 break;

              	// case "_Xpansion_":  
              	// 	 if( strvalueNumber < 0.0 ) 
              	// 	 	 ctx.fillStyle = fillRed;
              	// break;
              	case "returnonassetsttm":  
              	case "returnonequityttm":  
              	case "operatingmarginttm":  
              	case "profitmargin":  
              	// case "eps":  
              		 if( strvalueNumber < 0.0 ) 
              		 	 ctx.fillStyle = fillRed;
              	break;
                case  "revenuepersharettm":
                // case  "50daymovingaverage":
                // case  "200daymovingaverage":
                // case  "52weeklow":
                // case  "52weekhigh":
                case  "dilutedepsttm":
                case  "dilutedepsttm":
                case  "analysttargetprice":
                  if( strvalueNumber < 0.0 ) {
                     ctx.fillStyle = fillRed;
                     strvalue = gCurrencyStr+strvalue;
                   }else{

                   // let roi1 = 1  *  (strvalueNumber / gCLOSEday) ;  // take EPS/LastPrice = ROI as of today's cl ose
                   // let roi = roi1.toFixed(3);
                   strvalue = gCurrencyStr+strvalue; // + "    ( " + roi.toString() +"% )";

                  }
                break;
                case  "52weekhigh":
                	hlstr =gCurrencyStr+strvalue+ "/" ;  //+gCurrencyStr+objOverview[i+1];
                  break;
                case  "52weeklow":
					strvalue    =    hlstr   +gCurrencyStr+strvalue; 
                   strkey  = "52WeekHi/Lo" ;

                 break;


 				case  "50daymovingaverage":
 				     mastr =gCurrencyStr+strvalue+ "/" ;   

            if(curfill==fill2) curfill=  fill1;
              else curfill = fill2;
			     ctx.fillStyle =curfill;
			     
                 break;

                case  "200daymovingaverage":
					strvalue    =    mastr   +gCurrencyStr+strvalue; 
                    strkey  = "50/200DayMAvg" ;

                 break;


                case  "eps":
              		 if( strvalueNumber < 0.0 ) {
              		 	 ctx.fillStyle = fillRed;
              		 	 strvalue = gCurrencyStr+strvalue;
              		 }else{

                        // *** NOTE ERRORS HERE Dont wanna chase  look for alt. gCLOSEday
              		 let roi1 = (strvalueNumber / gCLOSEday) ;  // take EPS/LastPrice = ROI as of today's clo se
              		 let roi = roi1.toFixed(3)  * 100  ;
              		 strvalue = gCurrencyStr+strvalue ;   //+ "    ( " + roi.toString() +"% )_";

              		}
              	break;

              }//sw

              //  let x0 = gStartChartX-200;
              // let draw0 = 0;
              // draw0 = gDrawSwitches;
              // if(gDrawGuage==1) draw0=1; 

              // let x1 = ( draw0 * x0 ) + 10;

                // let x1  = GetDetailsXoff();
                x1  = GetDetailsXoff();

       	        if(icnt> 12  ){



       	         if(strkey1.substring(0,9)!="quarterly"   &&  
                    strkey1.substring(0,10)!= "52weekhigh"  &&   
                    strkey1.substring(0,18)!="50daymovingaverage"  &&  noDividend==0 ){
 
                         ctx.fillText(  strkey+": "+strvalue  , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
          	             ii++;       	           

                   }else if(noDividend==1  &&   strkey1!="dividenddate"  &&  strkey1!="exdividenddate"){
// test case if dividend ==0 then do not print div ddate or div exdate
                         ctx.fillText(  strkey+": "+strvalue  , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
                         ii++;
                   }



              
                }//if icnt>12


             icnt++;
  
          }
          // $('#result').html(JSON.stringify(resultOverivew));
           console.log ("OVERVIEW : loop successfully complt'd.  Loopcnt=", ii );
          // console.log (    objOverview  );

		let date0Str = "20010911";
		let date0StrNum = 20010911 ;//date0Str.toFixed(0);   
		 // int = 20010911  any currnet earnings' .repdatenum > date0StrNum :)
		let currDateNum = date0StrNum;   // == 20010911

		// do stuff here
			 console.log(  "]  Draw0verviewData(),  date0StrNum=="  );
			 console.log(  date0StrNum  );



          let ii1=0;
          let cnt1=0;
          let estr="";
          let fntpct = 0.7;
          let column1=1;
          let modulo1=40;

          let rpdate0= 0;

    




    if(gDrawEarningsAll==1){
          	     
//new
           // if(gObjsLoadedObj[ gEarningsAllIdx ].symbol==gDontCare){
           //  ;
           // }


          	  ctx.font = ((fontcurrent*fntpct).toFixed(0)).toString() +"px Arial";

//
//			************* FOR LOOP
//
// local copy
  // const cloneSheeps = [...sheeps];
  const objEarningsData = [...gObjEarningsData];   // clone it

  console.log("] objEarningsData.splice(0,  gEarningsAllPageCount * modulo1 ) ==");
  console.log(gEarningsAllPageCount * modulo1);

  objEarningsData.splice(0, gEarningsAllPageCount * modulo1 );
  console.log(objEarningsData);

  console.log("] gObjEarningsData [orig]==");
  console.log(gObjEarningsData);


//////////////////////////////////////////////////////////// LOOP
//////////////////////////////////////////////////////////// LOOP
//////////////////////////////////////////////////////////// LOOP
//////////////////////////////////////////////////////////// LOOP


              for(var i1 in objEarningsData){   

                    if(curfill==fill2) curfill=  fill1;
                      else curfill = fill2;
                    ctx.fillStyle =curfill;

                    if(cnt1< (modulo1*4)) {
                        ii1%=modulo1;

                          if(cnt1>modulo1){
                             if(cnt1>(modulo1*3))  column1=4;
                               else  if(cnt1>(modulo1*2))  column1=3;
                                 else  column1=2;
                           }

//  new code here for only displaying yyyy-mm-dd  in earnings rep.
      //  
      //            let currDateNum = date0StrNum;   // == 20010911
                   if(   objEarningsData[i1].repdatenum > currDateNum ){// || (cnt1%modulo1==0) ){
                     currDateNum = objEarningsData[i1].repdatenum;
                     estr = objEarningsData[i1].repdate +" Earnings:" ; 

                  // ctx.fillText( estr  , x1+ gDetailsEarnings_Xoff ,  gDetails_Yoff + ii1* (fontcurrent*0.75+ gFntAdder) );
                  ctx.font = ((fontcurrent*fntpct * 1.035 ).toFixed(0)).toString() +"px Arial";
                  // wnite-ish 22 -07-21
      // lil BUG    // yellow-ish  08-04
                  ctx.fillStyle =jb_yellow2; /// "#88bbcc";  //
                  ctx.fillText( estr  , x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
                  // reset color/size
                  ctx.fillStyle =curfill;
                          ctx.font = ((fontcurrent*fntpct).toFixed(0)).toString() +"px Arial";

                        ii1++;

                   }//if


            estr ="   "+ objEarningsData[i1].symbol + "  "+ objEarningsData[i1].name; 
             
            if(  checkDynamicWatchlist( objEarningsData[i1].symbol )==1 ){

              ctx.fillStyle =  jb_yellow2 ;  
                estr += " "+objEarningsData[i1].repdate;
            }// else ctx.fillStyle =curfill;


            // ctx.fillText( estr  , x1+ gDetailsEarnings_Xoff ,  gDetails_Yoff + ii1* (fontcurrent*0.75+ gFntAdder) );
            ctx.fillText( estr , x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
                  ii1++;


          }else return;
          cnt1++;

                 }//for


//
//  OLD LOOP
//

//               for(var i1 in gObjEarningsData){   // or gObjsLoadedObj[ gEarningsAllIdx ].objPost

//                     if(curfill==fill2) curfill=  fill1;
//                       else curfill = fill2;
//                     ctx.fillStyle =curfill;

//                     if(cnt1< (modulo1*4)) {
//                         ii1%=modulo1;

//                           if(cnt1>modulo1){
//                              if(cnt1>(modulo1*3))  column1=4;
//                                else  if(cnt1>(modulo1*2))  column1=3;
//                                  else  column1=2;
//                            }


// //  new code here for only displaying yyyy-mm-dd  in earnings rep.
//       //  
//       //            let currDateNum = date0StrNum;   // == 20010911
//                    if(   gObjEarningsData[i1].repdatenum > currDateNum ){// || (cnt1%modulo1==0) ){
//                      currDateNum = gObjEarningsData[i1].repdatenum;
//                      estr = gObjEarningsData[i1].repdate +" Earnings:" ; 

//                   // ctx.fillText( estr  , x1+ gDetailsEarnings_Xoff ,  gDetails_Yoff + ii1* (fontcurrent*0.75+ gFntAdder) );
//                   ctx.font = ((fontcurrent*fntpct * 1.035 ).toFixed(0)).toString() +"px Arial";
//                   // wnite-ish 2202-07-21
//                   ctx.fillStyle = "#88bbcc";  //
//                   ctx.fillText( estr  , x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
//                   // reset color/size
//                   ctx.fillStyle =curfill;
//                           ctx.font = ((fontcurrent*fntpct).toFixed(0)).toString() +"px Arial";

//                         ii1++;

//                    }//if


//             estr ="   "+ gObjEarningsData[i1].symbol + "  "+ gObjEarningsData[i1].name; 
             
//             if(  checkDynamicWatchlist( gObjEarningsData[i1].symbol )==1 ){

//               ctx.fillStyle =  jb_yellow2 ; // jb_yellow1; //jb_purple;
//                 estr += " "+gObjEarningsData[i1].repdate;
//             }// else ctx.fillStyle =curfill;


//             // ctx.fillText( estr  , x1+ gDetailsEarnings_Xoff ,  gDetails_Yoff + ii1* (fontcurrent*0.75+ gFntAdder) );
//             ctx.fillText( estr , x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
//                   ii1++;


//           }else return;
//           cnt1++;

//                  }//for

//////////////////////////////////////////////////////////// LOOPEND 
//////////////////////////////////////////////////////////// LOOPEND 
//////////////////////////////////////////////////////////// LOOPEND 



       }else   if(gDrawWatchlist==1){

       			ctx.font = ((fontcurrent*fntpct).toFixed(0)).toString() +"px Arial";

      //
      //			************* FOR LOOPwatchlist
      //
            // curfill="#ddddff"; //"#f5dd42"; // ==jb_yellow2,  //yfill2;
            curfill =jb_yellow2,  //yfill2;
             ctx.fillStyle =curfill;

            ctx.fillText( "Watchlist"  , 290+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff   -(2*(fontcurrent*fntpct+ 1)) ); // + ii1* (fontcurrent*fntpct+ 1) );
            ctx.fillText( "Earnings"   , 290- (6*(fontcurrent*fntpct+ 1))+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff   -(2*(fontcurrent*fntpct+ 1)) ); // + ii1* (fontcurrent*fntpct+ 1) );
            // ctx.fillText( estrBefore   , 290- (6*(fontcurrent*fntpct+ 1))+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );

           let estrBefore="2000-12-31";
            curfill=  yfill1;
            for(var i1 in dynamicWatchlist){

			        if(curfill==yfill2) curfill=  yfill1;
			              else curfill = yfill2;

						  ctx.fillStyle =curfill;

        // estrBefore = GetEarningsDat e_gObjsLoaded(dynamicWatchlist[i1].symbolst);
						  estr =" "+ dynamicWatchlist[i1].symbolstr ; 

// if (myVar !== undefined) {
// if (typeof(myVar) !== 'undefined') {

              let dstr00=" "; //gObjsLoadedObj[31].objPost[i1].date;
              if (gObjsLoadedObj[31]   !== undefined)  
                     if (gObjsLoadedObj[31].objPost[i1]  !== undefined) {
                           dstr00= gObjsLoadedObj[31].objPost[i1].date;
                          }


              //ck for nil case
              if(dstr00.length>0){
                  if(gObjsLoadedObj[31].objPost[i1] !== undefined)  
                        estrBefore= gObjsLoadedObj[31].objPost[i1].date;
                            else estrBefore= " ";
                }else estrBefore= " ";

    					// ctx.fillText( estr  , x1+ gDetailsEarnings_Xoff ,  gDetails_Yoff + ii1* (fontcurrent*0.75+ gFntAdder) );
   						if(cnt1>39){
   							if(cnt1==40) ii1=0;
   						    column1=1.5 ;//=2;
   						 }else  column1=1;

              ctx.fillText( estr  ,       290+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
              ctx.fillText( estrBefore  , 290- (6*(fontcurrent*fntpct+ 1))+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent*fntpct+ 1) );
     	        ii1++;
    					 
					    cnt1++;


			}//for

   }//if



 // DrawOverviewDataAfter ();

}
// let text = "How are you Maya doing today?";
// const myArray = text.split(" ");


function checkDynamicWatchlist( cmpstr ){

let estr="";
let cstr=cmpstr.toLowerCase() ; 

	     for(var i1 in dynamicWatchlist){
 
			estr = dynamicWatchlist[i1].symbolstr.toLowerCase() ; 
			if(estr==cstr) return(1);				 

		 }//for

		return(0);

}//fn

/*

let i1;
	console.log("] form StaticWatchlst() FORMING Watchlist");
	dynamicWatchlist.forEach( (watchsym, i) => {
        		//console.log(watchsym.symbolstr +" "+ i  )
 				  i1=i;
 				  if(i1<staticWatchlist.length){
        				staticWatchlist[i1] = watchsym.symbolstr ;   //== symbolstr0){
        				 console.log( staticWatchlist[i1] );  //watchsym.symbolstr +" found DUPLICATE:"+symbolstr0+ " "+ i  )
        		  }
			})
*/

function GetDetailsXoff(){
  let retvar =0;


// from DrwOverv1ewDat() above
  let x0 = gStartChartX-200;
  let draw0 = 0;
  draw0 = gDrawSwitches;
  if(gDrawGuage==1) draw0=1; 

  let x1 = ( draw0 * x0 ) + 10;

  retvar=x1;

  return(retvar);

}//fn




var gDetails_Xoff = 750;
var gNextDayPivots_Yoff = 270; //canvasHeight * 0.725;

function PrintTomorrowSupportResistanceOverview(  startx00, openday, closeday, hiday, lowday, sup1, sup2, sup3,   piv, piv3,  res1, res2, res3 ){
// function DrawOver viewData(){
 
 if(gDrawEarningsAll==1) return;


        let fill1a     ="#00cc88";  //"""#00ef44";
        let  fillRed1  = "#bf4366"; //"#a82c3e";
        let fillYellow ="#a38e05";


        let fill1     = "#00cc88";
        let fill2     = "#1a88dc";   
        let fillAlert   = "#a65ed6";  
        let  fillRed = "#a10815";
         let fillBlue = "#6690de";

        let curfill = fill2;

        let fontsz =gFntSz +4;         // 48; //38; //34;
        let fontcurrent = fontsz;

        let strkey  = "";
        let strvalue = "";

        ctx.fillStyle = fill2 ;   
        ctx.font = fontcurrent.toString() +"px Arial";

        let ii=0;
        let icnt=0;



        let x0 =  gStartChartX-200;
        let draw0 = 0;
        draw0 = gDrawSwitches;
        if(gDrawGuage==1) draw0=1; 

        // let x1 = ( draw0 * x0 ) + 10  +   gDetails_Xoff ; //   + 750;   // add 200 for r3...s3
        let x1 = ( draw0 * x0 ) + 10  +   gDetails_Xoff  + 70;  // for next day piv's
        ii =18;

          ctx.fillStyle ="#111133";
          ctx.fillRect( x1-2, gNextDayPivots_Yoff+ ii* (fontcurrent+2) , 300, 450 ); 



          // strkey = "R3";
          // strvalue = gR3day.toFixed(2).toString();

          if(curfill==fill2) curfill=  fill1;
              else curfill = fill2;
          ctx.fillStyle =curfill;
          ctx.fillText(  "NextDay Pivots:"  , x1 ,  gNextDayPivots_Yoff  + ii* (fontcurrent+2) );

          ii++;
          icnt++;





          strkey = "R3";
          strvalue = gR3day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fillRed1;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "R2";
          strvalue = gR2day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fillRed1;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "R1";
          strvalue = gR1day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fillRed1;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "P3";
          strvalue = gP3day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fillYellow;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "  P";
          strvalue = gPday.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fill2;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "S1";
          strvalue = gS1day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fill1a;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "S2";
          strvalue = gS2day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fill1a;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;

          strkey = "S3";
          strvalue = gS3day.toFixed(2).toString();

          // if(curfill==fill2) curfill=  fill1;
          //     else curfill = fill2;
          ctx.fillStyle =fill1a;
          ctx.fillText(  strkey+": $"+strvalue  , x1 ,  270 + ii* (fontcurrent+2) );

          ii++;
          icnt++;







}//fn

//       PrintTomorrowSupportResistanceOverview(candleXnext+200,   gOPENday,  gCLOSEday, gHIday, gLOWday, 
//                gS3day, gS2day, gS1day,   gPday, gP3day,   gR1day, gR2day, gR3day );




//
// const d = new Date();
// let time = d.getTime();
/*
const str = 'Mozilla';

console.log(str.substring(1, 3));
// expected output: "oz"

console.log(str.substring(2));
// expected output: "zilla"
*/
//
function GlobalFail(str, fnnamestr){
	gFailAsyncData = 1;
	gStatus = status;
	console.log("] "+fnnamestr+"() - oh no! gFailAsyncData = 1; status = " + status);
	console.log("] "+fnnamestr+"() - EOF");      
}


/*

https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=

https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=10year&apikey=demo


https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo

*/



/// ************************************************************** alphaVantage
// JMB  changed all occurrences of 16 to the global  candlesOffest
// function GetAlphaAdvantageStock©1332Data()
function  GetAlphaAdvantageDataStocks(intrv0) //  was GetAlphaAdvantageDat a()
{
    sfx_serverPreAccess.play();

 	  gFailAsyncData = 0;    // assume no Fail at start
 
// this is stock data , so it will go thru legacy pathway at this point
    setCryptoDrawState(0);

    ClearCandles(CandlesFromAlpha);

    gSplitDetected = 0;

    const Http = new XMLHttpRequest();

    //note: this defaults to compact, use outputsize=full
    const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + 
    apikeyStr+'&datatype=csv';
    //new = 5B4L3BM V41G6BCDH  oold ==XAE6386LR9QZG0HU 

    const urlfull = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' 
      + gGET_SymbolStr + '&outputsize=full' + apikeyStr ; //'&apikey=XAE6386LR9QZG0HU';

    Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetAlphaAdvantage Data: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

       // console.log("num lines = " + numLines);
       //  if (numLines > 2)
       //  {
       // 		console.log ("first line: " + lines[0]);
       // 		console.log ("second line: " + lines[1]);
       //  }

 if(Http.readyState === XMLHttpRequest.DONE) {
		    var status = Http.status;
		    if (status === 0 || (status >= 200 && status < 400)) {
		      console.log ("GetAlpha: The request has been completed successfully!");
         	  console.log("num lines = " + numLines);

		    } else {
		    	GlobalFail(status,"GetAlphaAdvantagDataStocks" );
		    	// gFailAsyncData = 1;
		    	// gStatus = status, ;
		     //  console.log("] GetAlphaAdvantagDataStocks() - oh no! gFailAsyncData = 1; status = " + status);
		      return;
		    }
		}else{
			//console.log("response not ready..  ");
			 
			return;
		}

		//GETTING HERE MEANS we have whole response
        if (gLogs > 0)
        	console.log(Http.responseText);

        if (numLines < 4)
        {
        	console.log ("first char: " + Http.responseText.substring(0,1) );

        	if (lines[0].substring(0,1) == "{")
        	{
        		console.log("] GetAlphaAdvantagDataStocks()  *No Alpha Data - clearing gTickerExistsAV");
        		gTickerExistsAV = 0;
				    GlobalFail(status,"GetAlphaAdvantagDataStocks" );
				    return;
        	}
        }

        var i,j;
        var entry = 0;
        var dateStart = '2020-05-01'; // default date
        j = 0;
        for (i = numLines-2; i > 0; i--) {

          // data from CSV
         // var timestamp,op,high,low,cl,adjusted_close,volume,dividend_amount,split_coefficient;

          //data for Candles
          //,6.97','7.11','6.93','7.04','43517662','2020-08-14','7.07','7.16','Fri','F','10','11','12','13','58.39','15_*286',

          var elems = lines[i].split(",");
          var numElems = elems.length;

          var timestamp = elems[0];
          var op = elems[1];
          var high = elems[2];
          var low = elems[3];
          var cl = elems[4];
          var adjClose = elems[5];
          var vol = elems[6];

//JMB 2020-10-09
          var divamt = elems[7];
          var splitcoef = elems[8];
 
 			if( Number(splitcoef) != 1.0 ) gSplitDetected =1;

        //  entry = j * 16;     // candlesOffset
          entry = j *  candlesOffset;
          CandlesFromAlpha[ entry] = op;  
          CandlesFromAlpha[ entry + 1] = high;  
          CandlesFromAlpha[ entry + 2] = low;  
          CandlesFromAlpha[ entry + 3] = cl;  
          CandlesFromAlpha[ entry + 4] = vol; // dummy ??
          CandlesFromAlpha[ entry + 5] = timestamp;
          if (entry == 0)
          	dateStart = timestamp;						//save this for next Query to historical
          CandlesFromAlpha[ entry + 6] = '7.07';
          CandlesFromAlpha[ entry + 7] = '7.16';
          CandlesFromAlpha[ entry + 8] = 'Fri';         //TODO: get day of week from date
          CandlesFromAlpha[ entry + 9] = gGET_SymbolStr;
          CandlesFromAlpha[ entry + 10] = '10';
          CandlesFromAlpha[ entry + 11] = '11';
          CandlesFromAlpha[ entry + 12] = '12';
          CandlesFromAlpha[ entry + 13] = '13';
          CandlesFromAlpha[ entry + 14] = '58.39';
          CandlesFromAlpha[ entry + 15] =  splitcoef ;

          //if (entry < 5 * 16)
          if (entry < 5 * candlesOffset )
	           console.log ("Candles[" + entry + "] : " + CandlesFromAlpha[ entry + 5] + " ohlc split " +   CandlesFromAlpha[ entry] + " " + 
	              CandlesFromAlpha[ entry + 1]   + " " + 
	              CandlesFromAlpha[ entry + 2] + " " +  
	              CandlesFromAlpha[ entry + 3] + " " +  
	              CandlesFromAlpha[ entry + 15]) ;

          j++;
        }//for 

		console.log("CandlesFromAlpha[]: gSplitDetected ="+ gSplitDetected);

        if (numLines < 100)
        {



           // j is j+1 now   -- insert one gFillStr at end
          entry = j *  candlesOffset;
          CandlesFromAlpha[ entry + 0] = gFillStr;
          /*
          CandlesFromAlpha[ entry + 1] = gFillStr;
          CandlesFromAlpha[ entry + 2] = gFillStr;
          CandlesFromAlpha[ entry + 3] = gFillStr;
*/


        	// no need to call historical, clear flag
        	gTickerExists = 0;
            sfx_serverComplete.play();

        	RenderAllData();
        }
        else
        {
        	GetHistoricalCandles(dateStart, historicalNumDays);
        }
     }// end ready state change
  //   push ea stock looked up to the watchlist.

  // dynamicWatchlist_PUSH( gGET_SymbolStr , " "); 

// go get overview data automatically
// & 1st get next earnings for gGET_SymbolsStr...

     GetEarningsDataGeneric( "earnings"    );

    GetAlphaAdvantageDataStocksOverview();

}//fn


// 
function GetHistoricalCandles(dateStart, numCandles)
{
	console.log("GetHistoricalCandles:  " + dateStart + "  " + numCandles);
    const Http = new XMLHttpRequest();

    const urlcsv = 'https://itraderpro.co/getdailydata.php?sym=' + gGET_SymbolStr + 
    	'&ds=' + dateStart + '&num= ' + numCandles.toString() + '&msgs=0';

    ClearCandles(CandlesFromHistorical);

    Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetHistoricalCandles: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        // console.log("num lines = " + numLines);
        // if (numLines > 1)
        // {
       	// 	console.log ("first line: " + lines[0]);
       	// 	console.log ("second line: " + lines[1]);
        // }

        if(Http.readyState === XMLHttpRequest.DONE) {
		    var status = Http.status;
		    if (status === 0 || (status >= 200 && status < 400)) {
		      console.log ("GetHistoricalCandles: The request has been completed successfully!");
          console.log("num lines = " + numLines);

		    } else {
		      console.log("GetHistoricalCandles - oh no! status = " + status);
		      return;
		    }
		}else{
			//console.log("response not ready..  ");
			return;
		}

    // console.log("********* GetHistoricalCandles  ***********************" );
    // console.log(Http.responseText);



		//log the whole response.
		if (gLogs > 0)
        	console.log(Http.responseText);

        // if only 2 lines we have no ticker data
        if (numLines > 1)
        {
      if (gLogs > 0)  	console.log ("first char: " + Http.responseText.substring(0,1) );

        	if (lines[0].substring(0,1) == "!")
        	{
        	if (gLogs > 0)	console.log("No Historical Data - clearing gTickerExists");
        		gTickerExists = 0;
        	}
        }




        if (gTickerExists == 1)
        {

	        var i,j;
	        var entry = 0;

	        j = 0;
	        for (i = numLines-2; i > 0; i--) {

	          // data from CSV
	         // var timestamp,op,high,low,cl,adjusted_close,volume,dividend_amount,split_coefficient;

	          //data for Candles
	          //'6.97','7.11','6.93','7.04','43517662','2020-08-14','7.07','7.16','Fri','F','10','11','12','13','58.39','15_*286',

	          var elems = lines[i].split(",");
	          var numElems = elems.length;

	          var timestamp = elems[0];
	          var op = elems[1];
	          var high = elems[2];
	          var low = elems[3];
	          var cl = elems[4];
	          var adjClose = elems[5];
	          var vol = elems[6];
	 
	 //JMB 2020-10-09
         	  var divamt = elems[7];
        	  var splitcoef = elems[8];
 
  			  if( Number(splitcoef) != 1.0 ) gSplitDetected =1;


	         // entry = j * 16;   // candlesOffset
	          entry = j *   candlesOffset;
	          CandlesFromHistorical[ entry] = op;  
	          CandlesFromHistorical[ entry + 1] = high;  
	          CandlesFromHistorical[ entry + 2] = low;  
	          CandlesFromHistorical[ entry + 3] = cl;  
	          CandlesFromHistorical[ entry + 4] = vol; // dummy ??
	          CandlesFromHistorical[ entry + 5] = timestamp;
	          CandlesFromHistorical[ entry + 6] = '7.07';
	          CandlesFromHistorical[ entry + 7] = '7.16';
	          CandlesFromHistorical[ entry + 8] = 'Fri';         // get day of week from date
	          CandlesFromHistorical[ entry + 9] = gGET_SymbolStr;
	          CandlesFromHistorical[ entry + 10] = '10';
	          CandlesFromHistorical[ entry + 11] = '11';
	          CandlesFromHistorical[ entry + 12] = '12';
	          CandlesFromHistorical[ entry + 13] = '13';
	          CandlesFromHistorical[ entry + 14] = '58.39';
	          CandlesFromHistorical[ entry + 15] = splitcoef ;//'15_*286';

	         // if (entry < 5 * 16) // candlesOffset
	          if (entry < 5 *  candlesOffset )
//		          console.log ("CandlesFromHistorical[" + entry + "] : " +  CandlesFromHistorical[ entry] + " " + 
		if (gLogs > 0)          console.log ("CandlesFromHistorical[" + entry + "] : " + CandlesFromHistorical[ entry + 5] + " ohlc split " +   CandlesFromHistorical[ entry] + " " + 
		              CandlesFromHistorical[ entry + 1]   + " " + 
		              CandlesFromHistorical[ entry + 2] + " " +  
		              CandlesFromHistorical[ entry + 3] + " " +  
		              CandlesFromHistorical[ entry + 15]) ;   // splitcoef
	          j++;
	        }

		}
	if (gLogs > 0)	console.log("CandlesFromHistorical[]: gSplitDetected ="+ gSplitDetected);

        sfx_recharge1.play();

        RenderAllData();
    }// end ready state change
}


// watchlistjb



//
//  THIS IS THE PROTOTYPE FOR READING THE POST-PROCESSED MARKET REBELLION NARJARIAN'S OUTPUT...
//
// JMB 2020-11-13,  oldr unused
// 
function GetWatchlist_Dynamic1() 
{

    console.log("GetWatchlistDyn amic1:  starting...");
    const Http = new XMLHttpRequest();

    const urlcsv = 'https://itraderpro.co/uoa/readuoa.php?msgs=0&comma=2';

    Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetWatchlis Dynamic: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("] GetWatchlis tDynamic num lines = " + numLines);
        if (numLines > 1)
        {
            console.log ("first line: " + lines[0]);
            console.log ("second line: " + lines[1]);
            console.log ("10th line: " + lines[10]);
            console.log ("15th line: " + lines[15]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("GetWat chlistDynamic1: The request has been completed successfully!");
            } else {
              console.log("GetWatch listDynamic1 - oh no! status = " + status);
              return;
            }
        }
        else
        {
            //console.log("response not ready..  ");
            return;
        }

        //log the whole response.
    // if (gLogs > 0)
                            //console.log(Http.responseText);

        let li=0;
        for(li=0;li<numLines;li++){

                if(lines[li].substring(0,2) == "=$"){

                    let reststr  =  lines[li].substring( 2   );  // skip past =$

                    let symbolstr1 =  reststr.substring( 0  , reststr.indexOf("$") );
                    let reststr2   =  reststr.substring(  reststr.indexOf("$") );

                    
                     dynamicWatchlist_PUSH( symbolstr1, reststr2 );  
                    // console.log( symbolstr1 ) ;  //lines[li] );

                }

        }//for

         //Rend erAllData();

         // PRINT TEXT ON SCREEN NOW:  ie.  Dynamic Watchlist Generated for today, Algo Run Ready
        formStaticWatchlist();

    }// end ready state change
}//fn




function GetWatchlistDynamic() 
{

    console.log("GetWatchlistDynamic():  starting...");

  //   dynamicWatchlist_PUSH( "SPY", " " );  
  //   dynamicWatchlist_PUSH( "QQQ", " " );  
  //   dynamicWatchlist_PUSH( "DIA", " " );  
  //   dynamicWatchlist_PUSH( "VXX", " " );  
  //   dynamicWatchlist_PUSH( "AAPL", " " );  
  //   dynamicWatchlist_PUSH( "GS", " " );  
  //   dynamicWatchlist_PUSH( "FB", " " );  
  //   dynamicWatchlist_PUSH( "TWTR", " " );  
  //   dynamicWatchlist_PUSH( "GOOGL", " " );  
  //   dynamicWatchlist_PUSH( "NFLX", " " );  
  //   dynamicWatchlist_PUSH( "AA", " " );  
  //   dynamicWatchlist_PUSH( "AAL", " " );  
  //   dynamicWatchlist_PUSH( "X", " " );  
  //   dynamicWatchlist_PUSH( "DAL", " " );  
  //   dynamicWatchlist_PUSH( "SQ", " " );  
  //   dynamicWatchlist_PUSH( "SHOP", " " );  
  //   dynamicWatchlist_PUSH( "ETSY", " " );  
  //   dynamicWatchlist_PUSH( "AMZN", " " );  
  //   dynamicWatchlist_PUSH( "M", " " );  
  //   dynamicWatchlist_PUSH( "F", " " );  
  //   dynamicWatchlist_PUSH( "TSLA", " " );  
  //   dynamicWatchlist_PUSH( "NVDA", " " );  
  //   dynamicWatchlist_PUSH( "BAC", " " );  
  //   dynamicWatchlist_PUSH( "HAL", " " );  
  //   dynamicWatchlist_PUSH( "tlt", " " );   
  //   dynamicWatchlist_PUSH( "SQQQ", " " );  
  //   dynamicWatchlist_PUSH( "ARKK", " " );  
  //   dynamicWatchlist_PUSH( "V", " " );  
  //   dynamicWatchlist_PUSH( "GBTC", " " );  
  //   dynamicWatchlist_PUSH( "BA", " " );  
  //   dynamicWatchlist_PUSH( "AMD", " " );  
  //  dynamicWatchlist_PUSH( "TLT", " " );   

  //   dynamicWatchlist_PUSH( "KO", " " );  
  //   dynamicWatchlist_PUSH( "K", " " );  
  //   dynamicWatchlist_PUSH( "L", " " );  
  //   dynamicWatchlist_PUSH( "ALB", " " );  
  //  dynamicWatchlist_PUSH( "MA", " " );  
  //   dynamicWatchlist_PUSH( "JPM", " " );  
  //   dynamicWatchlist_PUSH( "AXP", " " );  
  //   dynamicWatchlist_PUSH( "C", " " );  
  //   dynamicWatchlist_PUSH( "UBER", " " );  
  //   dynamicWatchlist_PUSH( "BABA", " " );  
  //   dynamicWatchlist_PUSH( "WFC", " " );  
  //   dynamicWatchlist_PUSH( "COP", " " );  
  //   dynamicWatchlist_PUSH( "WE", " " );  
  //   dynamicWatchlist_PUSH( "SNAP", " " );  
  //   dynamicWatchlist_PUSH( "NFLX", " " );  
  //   dynamicWatchlist_PUSH( "BTC-", " " );  
  //   dynamicWatchlist_PUSH( "SOL-", " " );  
  //   dynamicWatchlist_PUSH( "ETH-", " " );  



  // dynamicWatchlist_PUSH( "NFLX", " " );  
  // dynamicWatchlist_PUSH( "WBD", " " );  
  // dynamicWatchlist_PUSH( "T", " " );  
  // dynamicWatchlist_PUSH( "DIS", " " );  
  // dynamicWatchlist_PUSH( "AMZN", " " );  
  // dynamicWatchlist_PUSH( "AAPL", " " );  
  // dynamicWatchlist_PUSH( "ROKU", " " );  
  // dynamicWatchlist_PUSH( "TWX", " " );  
  // dynamicWatchlist_PUSH( "VIAC", " " );  
  // dynamicWatchlist_PUSH( "CMCSA", " " );  
  // dynamicWatchlist_PUSH( "SNE", " " );  
  // dynamicWatchlist_PUSH( "FB", " " );  


  dynamicWatchlist_PUSH( "AMZN", " " );  
  dynamicWatchlist_PUSH( "AAPL", " " );  
    dynamicWatchlist_PUSH( "TSLA", " " );  
   dynamicWatchlist_PUSH( "GOOGL", " " ); 
     dynamicWatchlist_PUSH( "MSFT", " " );     
     dynamicWatchlist_PUSH( "META", " " );  
  
   dynamicWatchlist_PUSH( "SPY", " " );  

    dynamicWatchlist_PUSH( "QQQ", " " );  
    dynamicWatchlist_PUSH( "VXX", " " );  


  //   dynamicWatchlist_PUSH( "SPY", " " );  
  //   dynamicWatchlist_PUSH( "SQQQ", " " );  
  //   dynamicWatchlist_PUSH( "DIA", " " );  
  //   dynamicWatchlist_PUSH( "VXX", " " );  
  //   dynamicWatchlist_PUSH( "GLD", " " );  
  //   dynamicWatchlist_PUSH( "CPER", " " );  

  // dynamicWatchlist_PUSH( "ROKU", " " );  
  // dynamicWatchlist_PUSH( "META", " " );  

  //   dynamicWatchlist_PUSH( "NVDA", " " ); 

  //   dynamicWatchlist_PUSH( "SHOP", " " );  
  //   dynamicWatchlist_PUSH( "ETSY", " " ); 

  // dynamicWatchlist_PUSH( "T", " " );  
  // dynamicWatchlist_PUSH( "DIS", " " );  


  //  dynamicWatchlist_PUSH( "SNE", " " );  
  //  dynamicWatchlist_PUSH( "GOOGL", " " );  

  

  //   dynamicWatchlist_PUSH( "TWTR", " " );  
  //   dynamicWatchlist_PUSH( "NFLX", " " );  
  //   dynamicWatchlist_PUSH( "C", " " );  
  //   dynamicWatchlist_PUSH( "DAL", " " );  
  //   dynamicWatchlist_PUSH( "X", " " );  
  //   dynamicWatchlist_PUSH( "DAL", " " );  
  //   dynamicWatchlist_PUSH( "SQ", " " );  
  //   dynamicWatchlist_PUSH( "SHOP", " " );  
  //   dynamicWatchlist_PUSH( "ETSY", " " );  
  //   dynamicWatchlist_PUSH( "M", " " );  
  //   dynamicWatchlist_PUSH( "F", " " );  
  //    dynamicWatchlist_PUSH( "NVDA", " " );  
  //   dynamicWatchlist_PUSH( "BAC", " " );  
  //   dynamicWatchlist_PUSH( "HAL", " " );  
  //   dynamicWatchlist_PUSH( "TLT", " " );   
  //   dynamicWatchlist_PUSH( "SQQQ", " " );  
  //   dynamicWatchlist_PUSH( "ARKK", " " );  
  //   dynamicWatchlist_PUSH( "V", " " );  
  //   // dynamicWatchlist_PUSH( "GBTC", " " );  
  //   // dynamicWatchlist_PUSH( "ETHE", " " );  
  //   dynamicWatchlist_PUSH( "BA", " " );  
  //   dynamicWatchlist_PUSH( "AMD", " " );  

    formStaticWatchlist();



}//fn

//
// JMB 2020-11-13
/*

var http = new XMLHttpRequest();
var url = 'get_data.php';
var params = 'orem=ipsum&name=binny';
http.open('POST', url, true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
http.send(params);

 

function da taPOST1(userstr){


    var xhttp = new XMLHttpRequest();
    var url = 'https://itraderpro.co/data post.php';
    var params = 'id=3&astr='+ algostr;
    xhttp.open('POST', url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }
    }
    xhttp.send(params);

}
*/

var gUserName1="John";

function dataPOST(userstr) {

    console.log("] dataPOST:  starting... " + userstr);
    const Http = new XMLHttpRequest();

    const url = 'https://itraderpro.co/datapost.php';
    var params = 'id=3&un='+ gUserName1 +'&astr='+ userstr;

        // old
        // Http.open("POST", url);
        // Http.send();
    Http.open('POST', url, true);
    //Send the proper header information along with the request
    Http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    Http.send(params);



    console.log ("] dataPOST: after Http.send(params) ");

    Http.onreadystatechange = (e) => {
        console.log ("dataPOST HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("] dataPOST numlines = " + numLines);
        if (numLines > 0)
        {
            console.log ("first line: " + lines[0]);
            for (ii=1;ii<numLines;ii++){
                console.log ( lines[ii]);
             }
            
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              console.log ("] dataPOST: The request has been completed successfully!");
            } else {
              console.log("] dataPOST - oh no! Err status = " + status);
              return;
            }
        }
        else
        {
            //console.log("response not ready..  ");
            return;
        }

        //log the whole response.
    // if (gLogs > 0)
                            //console.log(Http.responseText);

        // let li=0;
        // for(li=0;li<numLines;li++){

                // if(lines[li].substring(0,2) == "=$"){

                //     // let reststr  =  lines[li].substring( 2   );  // skip past =$

                //     // let symbolstr1 =  reststr.substring( 0  , reststr.indexOf("$") );
                //     // let reststr2   =  reststr.substring(  reststr.indexOf("$") );

                //     // console.log( symbolstr1 ) ;  //lines[li] );

                // }

       // }//for
 

    }// end ready state change
}//fn



 
//WCB simple moving average.  TODO: pass in period
// 50 gives us 5218  lines.
function GetSMA(period)
{
    const Http = new XMLHttpRequest();
    var periodStr= period.toString();
    const url = 'https://www.alphavantage.co/query?function=SMA&symbol=' + gGET_SymbolStr + 
    	'&interval=daily&time_period=' + periodStr + '&series_type=close' + apikeyStr+ '&datatype=csv';
    	//'&apikey=XAE6386LR9QZG0HU&datatype=csv';

    Http.open("GET", url);
    Http.send();

    console.log ("GetSMA: after http.send() ");

    Http.onreadystatechange = (e) => {
        //console.log ("HTTP: in SMA callback");

        if(Http.readyState === XMLHttpRequest.DONE) {
		    var status = Http.status;
		    if (status === 0 || (status >= 200 && status < 400)) {
		      console.log ("SMA: The request has been completed successfully!");
		      //console.log(xhr.responseText);
		    } else {
		      console.log("SMA - oh no! status = " + status);
		      return;
		    }
		}
		else
		{
			//console.log("SMA: not done yet");
			return;
		}

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("SMA num lines = " + numLines);
        if (numLines < 2)
        {
        	console.log("SMA not enough data");
        	return;
        }

        var entry=0;
        var i = 0;
        for (i = numLines - 2 ; i > 0; i--, entry++) {

          var elems = lines[i].split(",");
          var timestamp = elems[0];
          var price = elems[1];
          var numElems = elems.length;

          if (i >= numLines - 4)
          	console.log ("SMA[" + entry + "] : " + timestamp + " " + price);		//log a few sma prices

          //JB question stuff data in array?
        }

        //now we have the data, render it
        console.log("TODO: render SMA");
    }// end ready state change
}//fn
 



// old key don't use
            // let apikeyStr = '&apikey=' + '5B4L3BMV41G6BCDH';    

var staticWatchlist = [

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 

                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'SPY','DIA','QQQ','VXX','GLD',     'APVO','ROKU','ZM','AAPL','AMZN',
                    'RCL','NIO','TSLA', 'BA', 'AMD',   'NFLX','RCL','SNAP', 'PLTR','X',
                     'SLV','USO','TBT','PTON','GBTC',   'BYND','F',   'SHOP','ADT','NVDA',
 						'UBER','LYFT','L','K','PINS',    'MCD','ETSY','GS','BAC','C', 
 


                ];

var masterIdx=0;

function getNextSymbol1(){
	console.log(" In getNextSymbol1()");

	if(watchlistWellFormed!=1) return;
		
	var symstr2="";	

    if(gCnt9>=staticWatchlistLen){

       gRunAlgoSwitch=0;

       gSendAlgoEmail=1;

	   return;
	}


		symstr2=staticWatchlist[gCnt9] ;
	
		//console.log(symstr2);

	    fetchNewSymbol( symstr2 ); 
	    gAIcatIndicatorStrLONG +=  "|"+symstr2+"|"+gAIcatIndicatorStr+ "," ;  // cat all ai stock strings
		gCnt9++;

		 //console.log(gAIcatIndicatorStrLONG);

		 
}



//////// ***********************************************
//////// ***********************************************  WATCHLIST STUFF
//////// ***********************************************

let   watchlistWellFormed=0;
let   dynamicWatchlist 						//  array
let   staticWatchlistLen =0;

function initDynamicWatchlist(){
    dynamicWatchlist=[]
    watchlistWellFormed=0;
}

function ProcessEarningsAllToWatchlist( ) {
    // if(gObjsLoadedObj[ gEarningsAllIdx ].objPost.length>0){ 
             console.log("]  ProcessEarningsAllToWatchlist(): ");
              formStaticWatchlist();
                      
}//fn



function GetEarningsDate_gObjsLoaded( sym ) {
  let retdate=g_Rdate ; //="1700-01-01";
  let sym0 =sym.toLowerCase();

  console.log("] G3tEarningsDate_gObjsLoaded() :sym0,  gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost ==") ;  
  console.log(sym0);
  // console.log(  gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost ) ; 




//  {symbol: 'AAIC', name: 'Arlington Asset Investment Corp - Class A', repdate: '2022-08-01', repdatenum: 20220801, fde: '2022-06-30', …}
//    let obj0= gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost ;

//   // dynamicWatchlist.forEach( (watchsym, i) => {
//     // repdate: "2022-08-01"
//     // symbol: "AAIC"
// console.log("] obj0==");
// console.log(obj0);
    // if(obj0.length > 0){
             // obj0.forEach( (watchsym, i) => {
 for( i=0;i<gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost.length; i++){
     if(gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].symbol.toLowerCase()==sym0){
        retdate = gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].repdate ;

        console.log( "] **FOUND!  i, watchsym.symbol, watchsym.name, .repdate ==");
        console.log( i);
        console.log( gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].symbol );
        console.log( gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].repdate );

        return(retdate);
     }
                // console.log( "]  i, watchsym.symbol, watchsym.name, .repdate ==");
                // console.log( i);
                // console.log( gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].symbol );
                // console.log( gObjsLoadedObj[ gObjsLoadedEarningsAll ].objPost[i].repdate );


                // , watchsym.symbol, watchsym.name, watchsym.repdate );
                    // if( watchsym.symbol.toLowerCase()==sym.toLowerCase() ){
                    //     retdate =obj0[i].repdate;
                    //     return(retdate);

                    // }
}//for
                    // })

                  // }//if

  return(retdate);
}//fn


function formStaticWatchlist(){
	let i1;
	console.log("] formStaticWatchlst() FORMING Watchlist");
  //
  //  first check if localStorge has "watchlist" & attempt to form it
let catstr = localStorageGet("watchlist");
if(catstr.length > 0){

  console.log("] f0rmStaticWatchlist():  catstr== here ...");
  console.log(catstr);
}
let watchEarns={ symbol: "000" , earningsdate: "1910-10-10"} ;

let objPre=[];
let objPost=[];
  /*
 let a= gObjsLoadedObjInit[i];
     obj1={
            "datatype":         a,
            "symbol":          "000", 
            "assettype":       "000", 
            "aux":             "nil", 
            "obj":             obj2,    // pre process
            "objPost":         obj3,    // post process ready for renderOO...()
 
     };
     // console.log("i, a, obj1 ==");
     // console.log(i, a,  obj1);
     gObjsLoadedObj.push(obj1);
  */ 
	dynamicWatchlist.forEach( (watchsym, i) => {
        		//console.log(watchsym.symbolstr +" "+ i  )

 				  i1=i;
 				  if(i1<staticWatchlist.length){
        				staticWatchlist[i1] = watchsym.symbolstr ;   //== symbolstr0){
        				  //console.log( staticWatchlist[i1] );  //watchsym.symbolstr +" found DUPLICATE:"+symbolstr0+ " "+ i  )
        		  
            let rdate = "1999-12-31";
            rdate  =GetEarningsDate_gObjsLoaded(watchsym.symbolstr);
            if(rdate==g_Rdate )   rdate =" " ;//"n/a";

            console.log("]rdate == ");
            console.log( rdate );

            let  objPrep={
                    "date":            rdate,
                    "symbol":           watchsym.symbolstr,
                    // "assettype":       "000", 
                    "aux":             "nil"
                  }
          objPre.push( objPrep );    // works - prior to prep'd obj
          
// here     objPost GET EARNINGS DATE
         // objPrep.date = Get EarningsDate_gObjsLoaded(watchsym.symbolstr);
          objPost.push( objPrep ); 

            }
			})

  gObjsLoadedObj[ gObjsLoadedWatchEarnIDX ].obj = objPre ;
  gObjsLoadedObj[ gObjsLoadedWatchEarnIDX ].objPost = objPost ;

 


//oldr
	staticWatchlistLen=i1+1;

    watchlistWellFormed=1;
    // console.log("Now, staticWatchlistLen ="+staticWatchlistLen);
    // console.log("OK, watchlistWellFormed=1");
    // console.log(staticWatchlist);
}//fn


//
// derived from below

/*
let i1;
	console.log("] fo rmStaticWatchlst() FORMING Watchlist");
	dynamicWatchlist.forEach( (watchsym, i) => {
        		//console.log(watchsym.symbolstr +" "+ i  )
 				  i1=i;
 				  if(i1<staticWatchlist.length){
        				staticWatchlist[i1] = watchsym.symbolstr ;   //== symbolstr0){
        				 console.log( staticWatchlist[i1] );  //watchsym.symbolstr +" found DUPLICATE:"+symbolstr0+ " "+ i  )
        		  }
			})

*/
function drawDynamicWatchlist( ){

	let symbolstr0,auxstr ="";
let wlstr="";
	// forEach on the watchlist to check if this symbolstr exist - IF YES, return; ELSE continue;
 		dynamicWatchlist.forEach( (watchsym, i) => {
        		//console.log(watchsym.symbolstr +" "+ i  )

        		if (watchsym.symbolstr != ""){
        		 wlstr=watchsym.symbolstr;   
        	     console.log( wlstr); 
// draW HERE

        		}
			})
  
}

function load_dynamicWatchlist_fromlocalStorage( ){

    let catstr= localStorageGet( "watchlist" );
    console.log("] l0ad_dynamicWatchlist_fromlocalStorage() : catstr =");
    console.log(catstr);
}

//
//  orig, still called
//
function dynamicWatchlist_PUSH(symbolstr0, auxstr){
	// forEach on the watchlist to check if this symbolstr exist - IF YES, return; ELSE continue;
		let uniquesym=1;
    let catstr  ="";
		dynamicWatchlist.forEach( (watchsym, i) => {
        		//console.log(watchsym.symbolstr +" "+ i  )
            catstr+= watchsym.symbolstr.toUpperCase()+" ";
        		if (watchsym.symbolstr.toLowerCase() == symbolstr0.toLowerCase()){
        		 uniquesym=0;  // off == not unique
        		// console.log(watchsym.symbolstr +" found DUPLICATE:"+symbolstr0+ " "+ i  )

        		}
			})

	if(uniquesym==1) {
		dynamicWatchlist.push(      new WatchlistSymbol( symbolstr0.toUpperCase() , auxstr)  )
	       // console.log("dynamicWatchlist_PUSH: SUCCESS "+ symbolstr0 );
         catstr+=symbolstr0.toUpperCase() +" ";
	    }
    // console.log("] dynmicWatchlist_PUSH(): Saving to localStorage: dynamicWatchlist==");
    // console.log(dynamicWatchlist);

     localStorageSet( "watchlist", catstr);

	return;

}//fn

class WatchlistSymbol{
    constructor(symbolstr, auxstr ){
        this.symbolstr = symbolstr
        this.auxstr    = auxstr
        // this.radius=radius
        // this.color= color 
        // this.alpha= a 
        // this.velocity = velocity 
    }
    // draw(){
    	
    //     // ctx.save()
    //     //     ctx.globalAlpha  = this.alpha
    //     //     ctx.beginPath()
    //     //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
    //     //     ctx.fillStyle=this.color   
    //     //     ctx.fill()
    //     //     ctx.closePath()
    //     // ctx.restore()
    //  }
    //  update(){

    //     // this.draw()
    //     // this.velocity.x *= friction
    //     // this.velocity.y += gravity
    //     // this.alpha      -= alphaChange
    //     // this.x += this.velocity.x * velocityXmult  
    //     // this.y += this.velocity.y * velocityYmult  
    //  }
}




//////////////////////////////////////////////////////////////////////
// JMB 2020-11-27
// from candleglobals.js
/*
class volumeObj{
 constructor(  idx, sym, volume, datestr, timestr){
	
        this.idx        =idx
        this.sym        =sym
        this.volume     =volume
 		this.udate      =datestr
        this.timestr      =timestr  // 4pm EDT
       

 }

}

//JMB 2020-11-27
class CandlestickObj{
    constructor(  idx, sym, symtype, corpname , udate, utime,  uday,
                  open, high, low, close, volume, p, p3, splitcoeff, divcoeff,
                  buysell, dojitype, dojinum , hilo, volrange,
                   mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
                  gaprange, gapstart, rvol, vwap,
                  canvasx, canvasy, canvasw, canvash ){

        this.idx        =idx
        this.sym        =sym
        this.symtype    =symtype    // ie stock crypto options futures
        this.corpname   =corpname
        this.udate      =udate
        this.utime      =utime
        this.uday       = uday  // mon tue fri etc

        this.open       =open
        this.high       =high
        this.low        =low
        this.close      =close
        this.volume     =volume
        this.p          =p
        this.p3         =p3
        this.splitcoeff =splitcoeff
        this.divcoeff   =divcoeff
            
         this.buysell   = buysell
         this.dojitype    = dojitype
         this.dojinum    = dojinum
         this.hilo      = hilo
         this.volrange  = volrange

         this.mvavg50  = mvavg50
         this.mvavg100 = mvavg100
         this.mvavg200 = mvavg200
         this.mvavg500 = mvavg500 
         this.mvavg1000= mvavg1000 

         this.gaprange   = gaprange           // ie +12.50 = gap up from  // or -9.50 = game DOWN from 
         this.gapstart   = gapstart           //             gapstart of $100.00  = $112.50   // = 90.50
         this.rvol       = rvol
         this.vwap       = vwap

         this.canvasx       = canvasx
         this.canvasy       = canvasy
         this.canvasw       = canvasw
         this.canvash       = canvash



    }
}
    
var pMax0= max;
//     gravity = gravitySt;
//     const particleAngle =pMax0
//     const angleIncrement= ( Math.PI * 2 )/ particleAngle  
//     for(let i=0;i<pMax0;i++){
//           particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
//             {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
//             } )     )
//     }//FOR

*/


// GC SALES 6-steps for SUCCESS!
// GREET
// QUALIFY
// DEMONSTRATE
// PROPOSE
// close
// FOLLOW-UP
//