//          canvas0.js  aka dr@wChart.js                  
//

let                                                                         gVer = "270.2";

//              BUGS:   NVDA Split MESSES up chart., SCALE date Print at bottom with vrect size
//
//              TO DO:  
//                      DRAW axes, 
//                      DRAW gridlines,
//
//                      buy/Sell sig's, drawTriangle, 
//                      Weekly Sup/Resistance
//                      Draw Volume
//
//                      Draw price at ChartHigh and at ChartLow
//
//                *****>    End of Month Tracking, 0/1 ==> 0 or Xcoord of gWidthXmiddle (?)
//                *****>    End of Month Tracking: DRAW Vertical Line at month w/ TEXT Date
//                          
//                          BUG:  Monthly Sup/Resistance drawn above/below vrect  if ( checkPt(vrect,x,y)==true)
//
//                          FIX P3/P OFFSET DATA IN PHP
//      
//                          Draw Tri/Circle w/ Generic Text Callout fn
//                          
//                          Find EndOfWeek ['endOfWeek'] component for intraday
//                          
//                          fix volHt = (vol/volmax) etc   DRAW VOLUME
// 
//                          if BuySigPrice < S1month, or IF sellSigPrice > R1month etc...
//                           
//                   NOTE !!! draw candles is computing his and lows CIRCLES that DrawLines is NOT !!!
//
//                    CRONjob:  cronit.php : loops thru a list, writes file etc
//                          
//

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

let gLogoname="logo";
let gAlgozLogo_fname ="../img/"+gLogoname+ ".png";     

let gScalar_init   = -1;
let gScalarFloat_dynamic = 0.0;   // ratio of initial screen hypontenuse to : new hypot 
let gScalar_resize = 1;

let gDrawFinancials =0; 
let gDrawFib        =0; 
let gFib_fntsz=12;

let gBuySignal_thisCandle =0;
let gSellSignal_thisCandle =0;
let gBuySignalCnt_thisCandle =0;
let gSellSignalCnt_thisCandle =0;
let gBuySignalStr_thisCandle ="nil";
let gSellSignalStr_thisCandle ="nil";

let gColorCycleCnt    = 0;
let gColorCycleCntMax = 9;

    
let gGapDir_thisCandle      = 0   ;//  =  parseInt(  processedData[date]["gapdir"]  )   ;
let gGapDirStr_thisCandle   = "noGap" ;//  =  parseInt(  processedData[date]["gapdir_str"]  )   ;
let gGapStartPrice_thisCandle = 0.00;//  =  parseFloat(  processedData[date]["gapstart_price"]  ).toFixed(2)   ;
let gGapEndPrice_thisCandle  =  0.00  ;//  =  parseFloat(  processedData[date]["gapend_price"]  ).toFixed(2)    ;
let gDate_thisCandle         ="nil" ;//    = date_thisCandle; 
let gGapOpened_str           = "" ;// = gDate_thisCandle+" Gap-"+gGapDirStr_thisCandle+ ": "+ gCurrencyStr+ gGapStartPrice_thisCandle+  " - "+ gCurrencyStr+gGapEndPrice_thisCandle;
let gGap_fntsz=gFib_fntsz ; // 12;
let gGapLineCol = 'magenta';
let gGapTextCol = gGapLineCol;
let gGapVrectWidth_pct= 0.20;
let gGaps_On = 0;

let gGlobalFontTitle="Verdana";

let gAxesCol0      = "#454595" ;
let gAxesCol0_init = "#25255A" ;
let gImgScale = 0.15;

let gColor_white_Alpha_50pct= 'rgba( 255,255,255,0.50 )' ;  
let gColor_grey_Alpha_50pct=  'rgba( 128,128,128,0.50 )' ;  
let gColor_red_Alpha_50pct =  'rgba( 248,36,36,  0.50 )' ;  
let gColor_red_Alpha_20pct =  'rgba( 248,36,36,  0.20 )' ;  
let gColor_green_Alpha_50pct= 'rgba( 32,248,48,  0.50 )' ;  
let gColor_green_Alpha_20pct= 'rgba( 32,248,48,  0.20 )' ;  
let gColor_blue_Alpha_50pct=  'rgba( 32,48,248,  0.50 )' ;  


let gGlobalViewportRect = { x: -100 , y: -100 , w: 13 , h: 13 };
let gGlobalChartRect = { x: 50 , y: 75 , w: 160 , h: 34 };
let gGlobalChartRect1 = { x: 150 , y: 275 , w: 60 , h: 134 };
let gGlobalChartRect2 = { x: 150 , y: 275 , w: 60 , h: 134 };

let gGlobalChartVRectCurrent = { x: 150 , y: 275 , w: 60 , h: 134 };   // init w/ dummy values

let gGlobalChartVRect_Xoff_pct  = 0.05;
let gGlobalChartVRect_Yoff_pct  = 0.05;
let gGlobalChartVRect_w_pct  = 0.85;
let gGlobalChartVRect_h_pct  = 0.85;

let gHypotenuse_scalar_init = .0 ;   // c = sqrt(  ( a*a ) + ( b*b )  ) ;   // hypotenuse_scalar
let gHypotenuse_scalar = 0.0 ;

let gVolumePixelHigh_pct= 0.125;

// col $chemes
let gColScheme =  { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme0 = { bg:'black',  tx: 'white', up: 'limegreen', dn:'red', ou:'purple' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme1 = { bg:'white',  tx: 'red',   up: 'darkred', dn:'darkgreen' , ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme2 = { bg:'black',  tx: 'white', up: '#11ef43', dn:'purple' , ou:'green', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme3 = { bg:'white',  tx: 'blue',  up: 'chocolate', dn:'hotpink', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme4 = { bg:'black',  tx: 'green', up: 'limegreen', dn:'deeppink' , ou:'grey', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme5 =  { bg:'white',  tx: 'blue', up: 'green', dn:'red', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme6 =  { bg:'antiquewhite',  tx: 'blue', up: 'black', dn:'orange', ou:'orange' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme7 =  { bg:'white',  tx: 'black', up: 'yellow', dn:'blue', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
// let gColScheme7 =  { bg:'white',  tx: 'blue', up: 'chocolate', dn:'hotpink', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme8 =  { bg:'blue',  tx: 'yellow', up: 'black', dn:'orange', ou:'grey' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme9 =  { bg:'black', tx: 'white', up: 'lawngreen', dn:'crimson', ou:'indianred' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme10 = { bg:'black', tx: 'mintcream', up: 'turquoise', dn:'peachpuff', ou:'magenta' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

// rnd one against black
let gColScheme99 = { bg:'black', tx: 'white', up: 'green', dn:'red', ou:'blue' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme100 = { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gSupResColors = {  r4: 'darkred', r3: 'darkred', r2: '#9f2222'  , r1: '#ef2222' , p: 'deepskyblue', s1: 'lawngreen' , s2: 'green', s3: 'darkgreen', s4: 'darkgreen'  };

let gColSchemeCurrent= { bg:'black', tx: 'white', up: 'limegreen', dn:'red', ou:'purple' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };



// Financial objs
let vector_2strings = { key_str: "abc",  value_str: "xyz" };

let gFinancials = {    

    date:       "2024-10-17",    
    sym:        "AMD",
    name:       "Advanced Micro Devices", 
    last:       100.50, 

    open:       99.56, 
    high:       103.41,
    low:        98.50, 
    close:      100.50, 
    volume:     99040560, 

    beta:       1.1,

    mktcap:       1.47,
    evToRevenue:  109.2,
    pe:           67.97, 
    pegRatio:     2.70, 
    eps:          8.45, 
    bookValue:    33.90, 

    revenue:      98.750, 
    grossprofit:  36.250, 
    ebitda:       100.50, 

    IV:        0.150, 
    atr:       100.50, 
    shortInt:  5.50, 

    gexExpsure: 0.65, 

    p:        0.0, 
    p3:       0.0,  

    r3:       0.0,  
    r2:       0.0,  
    r1:       0.0,  

    s1:       0.0,  
    s2:       0.0, 
    s3:       0.0,  

    eof:        'nil' };





const colarr = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black",
    "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue",
    "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", 
    "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", 
    "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", 
    "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", 
    "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", 
    "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", 
    "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", 
    "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", 
    "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", 
    "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", 
    "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", 
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", 
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", 
    "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", 
    "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", 
    "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", 
    "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", 
    "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", 
    "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
];

function RandomJSColor(arrStandardColors) {    // ie colarr
    // Generate a random index between 0 and the length of the color array
    const randomIndex = Math.floor(Math.random() * arrStandardColors.length);
    // Return the color at the randomly generated index
    return arrStandardColors[randomIndex];
}

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


// function RandomColorC1(rng00){
//     var rstr = "#";
//     var rrnd=0;

//   if(rng00<0)   rng00 =0;
//   if(rng00>255)  rng00=255;

//     rrnd = RandomNumC(rng00);
//     rstr = rstr + rrnd.toString(16);
//     rrnd = RandomNumC(rng00);
//     rstr = rstr + rrnd.toString(16);
//     rrnd = RandomNumC(rng00);
//     rstr = rstr + rrnd.toString(16);
//     return( rstr );
// }

// drawtype = "solid", "outline"
function DrawVRect(ctx, vrect, wt, col, drawtype) {
    let dt ="solid";
    let x = vrect.x; let y=vrect.y;
    let w = vrect.w; let h=vrect.h;

    if(drawtype==dt){
        ctx.fillStyle = col;
        ctx.fillRect(x,y, w,h); // Draw the rectangle
    }else{  // "outline"
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.strokeStyle = col;
        ctx.lineWidth = wt;
        ctx.stroke();
    }

}

function DrawVRectOutline(ctx, vrect, wt, col) {
    let x = vrect.x; let y=vrect.y;
    let w = vrect.w; let h=vrect.h;
    // Draw the rectangle
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.strokeStyle = col;
    ctx.lineWidth = wt;
    ctx.stroke();

}
function DrawRectOutline(ctx, x, y, w, h, wt, col) {
    // Draw the rectangle
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.strokeStyle = col;
    ctx.lineWidth = wt;
    ctx.stroke();
}

function DrawRoundedRect(ctx, vrect, radius, col, wt, fill) {
    // Destructure the vrect object for easier access
    let { x, y, w, h } = vrect;

    // Start the drawing path for the rectangle
    ctx.beginPath();
    ctx.moveTo(x + radius, y); // Move to the starting point (top-left corner with radius)

    // Draw the rounded rectangle
    ctx.lineTo(x + w - radius, y); // Top side
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius); // Top-right corner
    ctx.lineTo(x + w, y + h - radius); // Right side
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h); // Bottom-right corner
    ctx.lineTo(x + radius, y + h); // Bottom side
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius); // Bottom-left corner
    ctx.lineTo(x, y + radius); // Left side
    ctx.quadraticCurveTo(x, y, x + radius, y); // Top-left corner
    ctx.closePath();

    // Set the color
    ctx.strokeStyle = col;
    ctx.fillStyle = col;

    if (fill === 1) {
        // Fill the rectangle if fill is 1
        ctx.fill();
    } else {
        // Otherwise, set the border weight and stroke the rectangle
        ctx.lineWidth = wt;
        ctx.stroke();
    }
}

// // Example usage
// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// let vrect = { x: 30, y: 30, w: 200, h: 300 };
// let radius = 20;
// let color = '#ff4488';
// let borderWeight = 4;
// let fillRect = 1; // 1 to fill, 0 to outline

// // Draw filled rectangle
// DrawRoundedRect(ctx, vrect, radius, color, borderWeight, fillRect);

// // Draw outlined rectangle
// fillRect = 0;
// DrawRoundedRect(ctx, { x: 250, y: 30, w: 200, h: 300 }, radius, color, borderWeight, fillRect);


function DrawChart(ctx,  vrect , colScheme, typestr ) {
    let fntsz0 = 14;
    let wt = 2;  // DrawCandlesChart( ctx,  vrect , colScheme, wt );

    DrawRoundedRect(ctx, vrect, 20, colScheme.bg, 3, 1);
    DrawRoundedRect(ctx, vrect, 20, colScheme.ou, 5, 0);

  PreCalcCandlesChart( ctx,  vrect , colScheme, wt );
    
    DrawChartAxes( ctx,  vrect , colScheme, wt );

    if(gDrawFinancials==0){
        // this will test for butt0n1==0
        DrawCandlesChart(ctx,  vrect , colScheme, wt );  /// NOTE !!! draw candles is computing his and lows that DrawLines is NOT !!!
        // this will test for butt0n1==1
        if(typestr=="line")   DrawLineChart(ctx,  vrect , colScheme, wt+1, "close");  // or P P3 to plot
                        //    DrawChartAxes( ctx,  vrect , colScheme, 2 );
    }else if(gDrawFinancials>0){                
        DrawFinancials(ctx, vrect,       gFinancials,      114,   40,   fntsz0+4,   fntsz0, gGlobalFont, 'blue' );
    }

   drawFibonacci( ctx, vrect , gCandlesMaxes.priceHigh, gCandlesMaxes.priceLow );

   // pivot / p3 lines
    if( button5==1 || button5==2  ) DrawSegmentedLine(ctx, processedData, vrect, 2, 'blue',   "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P") ;
    if( button5==2)                 DrawSegmentedLine(ctx, processedData, vrect, 2, 'yellow', "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P3") ;
    
    let fszDyn = parseInt( vrect.w * 0.025 );
    let xoff = 60;
    let yoff = 54;
    let img_xoff =10;  
    let img_yoff =10 + 20;  
    let fname ="../img/"+gSymbolStrLower+ ".png";

    DrawGlobalTextInfo( ctx , vrect ,  xoff, yoff ,  fszDyn, colScheme);

    InitAndDrawImage(ctx, vrect, fname, img_xoff, img_yoff, gImgScale );   // let gIm gScale = 0.325;

}

// globals
let gGlobalDrawCol = 'black';
let gChartTextStr ="Welcome!";
let gChartTextStr1 ="Welcome!";

let gSymbolStr    ="SPY";
let gSymbolStrLower='spy';

let gPeriodStr = "(Daily)";
let gCurrencyStr="$";
let gLastPriceStr ="0.00";
let gLastDateStr ="1900-01-01";
let gGlobalFont= "Arial";
let gAxesOffset_x = -64;   // go past RIGHT side of canvas
let gAxesOffset_y =  0;    // unused

let gCandleWidthMin = 2;
let gCandleSpaceMin  = 1;

// let gCandleXpos = 0;
let gCandleXnext = 0;
let gCandleXnextStart = 0;
let gCandleXnextLast  = 0;
let gCandleWidth =2;
let gCandleOffset =gCandleSpaceMin; 
let gCandleWidthTotal = gCandleWidthMin + gCandleSpaceMin;
let gNumCandlesToRender =4 ;
let gCandleWickX =0;

let gCandlesMaxesInit = { num2render: 1, priceHigh: 0, priceLow: 1000000, priceRange: 0,  
                          srHigh: 0, srLow: 1000000,  srRange: 0,  volHigh: 0, volLow: 1000000,  volRange: 0 ,
                          priceHighX: 0, priceHighY: 0,  priceLowX: 0, priceLowY: 0 ,
                          priceHigh_date: "nil", priceHigh_idx: 0, priceLow_date: "nil", priceLow_idx: 0 
                         };

let gCandlesMaxes     = { num2render: 1, priceHigh: 0, priceLow: 1000000, priceRange: 0,  
                          srHigh: 0, srLow: 1000000,  srRange: 0,  volHigh: 0, volLow: 1000000,  volRange: 0 ,
                          priceHighX: 0, priceHighY: 0,  priceLowX: 0, priceLowY: 0 , 
                          priceHigh_date: "nil", priceHigh_idx: 0, priceLow_date: "nil", priceLow_idx: 0 
                         };


function DateAbbreviate(datestr, startMonthOnly) {  // 2== Oct 17 vs 17th
    // Create a Date object from the input string
    const date = new Date(datestr);

    // Array of day and month names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the day of the week, month, and day of the month
    const dayOfWeek = days[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const dayOfMonth = date.getUTCDate();

    // Add appropriate suffix for day (st, nd, rd, th)
    let suffix = 'th';
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
        suffix = 'st';
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
        suffix = 'nd';
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
        suffix = 'rd';
    }

    // Return the formatted date string
    if(startMonthOnly==2)  return `${month} ${dayOfMonth}`;
    else if(startMonthOnly==1)  return `${month} ${dayOfMonth}${suffix}`;
    else  return `${dayOfWeek} ${month} ${dayOfMonth}${suffix}`;
   
// Example usage
// console.log(DateAbb reviate("2024-10-17")); // Output: "Thu Oct 17th"

}


function DrawChartAxes( ctx,  vrect , colScheme, wt ){
    let yy =0 ;
    let iy =0 ;
    let y2 = 0;
    let y2a= 0;
    let txtStr = " ";

    let y2f =0.0;
    let price_high =  parseInt( gCandlesMaxes.priceHigh );         // ie  $200.00   hi
    let price_low  =  parseInt( gCandlesMaxes.priceLow  );        //  <    $50.00 > low
    let price_diff  = parseInt( gCandlesMaxes.priceRange  );       //     $150.00   = diff price $                           
    let price_sm_pct = 0.20;                                      //  == 10% * 150 every $15.00, draw horiz Axes w/ $235.16 etc

    let every_dollar_lines = parseInt( price_sm_pct * price_diff) ;  //  == $15.00 

    // make low price  % 5
    y2a = price_low %  5;
    y2a = y2a *5;  // ie $500 = 5 * 100
    price_low = y2a; 

// run price from lowest to highest (integers)
    for( y2=price_low;   y2<=price_high;    y2=y2+every_dollar_lines  ){  

            y2f = parseFloat(y2).toFixed(2); 
            iy     = GetYCoordFromPrice( y2f, vrect );
            txtStr = gCurrencyStr+" "+y2f.toString();      
            DrawHorizontalLine_callout_textcol(ctx, vrect.x, vrect.x+vrect.w+ gAxesOffset_x, iy , gAxesCol0 ,  "dotted" , txtStr, 16, 0 ,gGlobalFont , gAxesCol0 );
    
    }//for

}//fn



let cp_vrect = { x: 0 , y: 0 };

function ClipPoint(ctx, vrect, vectXY) {        //  let vectXY= { x: 100, y:109 };
    // Check if the x-coordinate is outside the rectangle
    if (vectXY.x < vrect.x) {
        vectXY.x = vrect.x; // Clip to the left edge
    } else if (vectXY.x > vrect.x + vrect.w) {
        vectXY.x = vrect.x + vrect.w; // Clip to the right edge
    }

    // Check if the y-coordinate is outside the rectangle
    if (vectXY.y < vrect.y) {
        vectXY.y = vrect.y; // Clip to the top edge
    } else if (vectXY.y > vrect.y + vrect.h) {
        vectXY.y = vrect.y + vrect.h; // Clip to the bottom edge
    }

    cp_vrect = { x: vectXY.x ,   y: vectXY.y } ;

    // Now you can use the clipped point for further drawing or processing
    // ctx.beginPath();
    // ctx.arc(vectXY.x, vectXY.y, 5, 0, 2 * Math.PI); // Example: Draw a small circle at the clipped point
    // ctx.fill();

    return(cp_vrect);

}//fn


// if point is outside,  ret then -1
function ClipPoint1(ctx, vrect, vectXY) {        //  let vectXY= { x: 100, y:109 };
    // Check if the x-coordinate is outside the rectangle
    if (vectXY.x < vrect.x) {
        // vectXY.x = vrect.x; // Clip to the left edge
        vectXY.x = -1;
    } else if (vectXY.x > vrect.x + vrect.w) {
        // vectXY.x = vrect.x + vrect.w; // Clip to the right edge
        vectXY.x = -1;
    }

    // Check if the y-coordinate is outside the rectangle
    if (vectXY.y < vrect.y) {
        // vectXY.y = vrect.y; // Clip to the top edge
        vectXY.y = -1;
    } else if (vectXY.y > vrect.y + vrect.h) {
        // vectXY.y = vrect.y + vrect.h; // Clip to the bottom edge
        vectXY.y = -1;
    }

    cp_vrect = { x: vectXY.x ,   y: vectXY.y } ;

    // Now you can use the clipped point for further drawing or processing
    // ctx.beginPath();
    // ctx.arc(vectXY.x, vectXY.y, 5, 0, 2 * Math.PI); // Example: Draw a small circle at the clipped point
    // ctx.fill();

    return(cp_vrect);

}//fn




//sets globals etc.
function PreCalcCandlesChart( ctx,  vrect , colScheme, wt ){
    let cw= canvas.width;
    let ch= canvas.height;
    let cnt = processedData.length;   /// == NaN ???

//  ##############################################################################

        // let vect2 = { ...vect };   // example
        gCandlesMaxes = { ...gCandlesMaxesInit };      // init the global vector

        let datestr0 = "0000-11-22";
        let i=0;
        for (var date in processedData) {
            if (processedData.hasOwnProperty(date)) {
                // console.log( i+") " + date + ", Close: " + processedData[date]["close"] + " "+   processedData[date]["dayOfWeek"]);
                let hi = parseFloat( processedData[date]["high"] );
                let lo = parseFloat(  processedData[date]["low"] );
                if(hi>gCandlesMaxes.priceHigh ){
                    gCandlesMaxes.priceHigh = hi;
                    gCandlesMaxes.priceHigh_date = date.toString();
                    gCandlesMaxes.priceHigh_idx =  i ; 
    
                }  
                if(lo<gCandlesMaxes.priceLow  ){
                        gCandlesMaxes.priceLow  = lo;
                        gCandlesMaxes.priceLow_date = date.toString();
                        gCandlesMaxes.priceLow_idx =  i ; 
                }
    
                let srhi = parseFloat(  processedData[date]["R3"] );
                let srlo = parseFloat(  processedData[date]["S3"] );
                if(srhi>gCandlesMaxes.srHigh ) gCandlesMaxes.srHigh = srhi;
                if(srlo<gCandlesMaxes.srLow  ) gCandlesMaxes.srLow  = srlo;
    
                // let myNum = '62.3900';
                // let myFloat = parseFloat(parseFloat(myNum).toFixed(2));
                // console.log(myFloat);  // Outputs: 62.39 (as a number)
    
                let vol = parseFloat(  processedData[date]["volume"] );
                if(vol>gCandlesMaxes.volHigh ) gCandlesMaxes.volHigh = vol;
                if(vol<gCandlesMaxes.volLow  ) gCandlesMaxes.volLow  = vol;
    
                gSymbolStr    = processedData[date]["sym"];
                gPeriodStr    = processedData[date]["per"];
    
                let lastPrice0= parseFloat(processedData[date]["close"]) ; 
                // gLastPriceStr  =        processedData[date]["close"];   
                gLastPriceStr  =   lastPrice0.toFixed(2).toString() ;
                
                // let lastDay       = processedData[date]["dayOfWeek"];
                i++;
    
                datestr0 = date.toString();
            }
        }//loop
    
        gNumCandlesToRender = i;
        gCandlesMaxes.num2render = gNumCandlesToRender ;
        gCandlesMaxes.priceRange = gCandlesMaxes.priceHigh - gCandlesMaxes.priceLow;
        gCandlesMaxes.srRange    = gCandlesMaxes.srHigh    - gCandlesMaxes.srLow;
        gCandlesMaxes.volRange   = gCandlesMaxes.volHigh   - gCandlesMaxes.volLow;
        console.log("] POST calcs, gCandlesMaxes   =", gCandlesMaxes );
    
    //  ############################################################################## should be a fn
    
    gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ DateAbbreviate( datestr0 ,0 );   //+"    v"+gVer+" php_v"+gVerPHP; 
    // gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ datestr0;  //+"    v"+gVer+" php_v"+gVerPHP; 
    // gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ datestr0+"    v"+gVer+" php_v"+gVerPHP; 
    gChartTextStr1 = "v"+gVer+" php_v"+gVerPHP; 
    gSymbolStrLower  = gSymbolStr.toLowerCase();
    
    // DETERMINE gCandleOffset
        gCandleOffset = gCandleSpaceMin;
        // gCandleWidthTotal = parseInt( cw / gNumCandlesToRender  );
        gCandleWidthTotal = parseInt(  vrect.w / gNumCandlesToRender  );
        // if(gCandleWidthTotal>4) gCandleOffset=gCandleSpaceMin+1;     // ie 2, set new offset iff candle wide enough
        if(gCandleWidthTotal>5) gCandleOffset=gCandleSpaceMin+1;     // ie 2, set new offset iff candle wide enough
        
        gCandleXnext = vrect.x + gCandleOffset;
        gCandleXnextStart = gCandleXnext;           // SAVE START
        
    // DETERMINE  gCandleWidth
        gCandleWidth      = gCandleWidthTotal - gCandleOffset;
        console.log("] Candles to render, gCandleWidth  =", gNumCandlesToRender, gCandleWidth );
    
    
    //  ##############################################################################  
    //  #######################                       ################################  
    //  #######################  all prep Calcs DONE  ################################  
    //  #######################                       ################################  
    //  ##############################################################################  


}





function DrawCandlesChart( ctx,  vrect , colScheme, wt ){
    let cw= canvas.width;
    let ch= canvas.height;
    let cnt = processedData.length;   /// == NaN ???

    // this is called just before DrawC@ndlesChart()
    // PreCalcCandlesChart( ctx,  vrect , colScheme, wt );


// //  ##############################################################################  DEL
// //  ##############################################################################  DEL
// //  ##############################################################################
// //  ##############################################################################
// //  ##############################################################################
// //  ##############################################################################
// //  ######  MAKE A FUNCTION ...   PrepCandles or  SetCandleGlobals       #########
// //  ##############################################################################
    
//                                                     // let vect2 = { ...vect };   // example
//     gCandlesMaxes = { ...gCandlesMaxesInit };      // init the global vector

//     let datestr0 = "0000-11-22";
//     let i=0;
//     for (var date in processedData) {
//         if (processedData.hasOwnProperty(date)) {
//             // console.log( i+") " + date + ", Close: " + processedData[date]["close"] + " "+   processedData[date]["dayOfWeek"]);
//             let hi = parseFloat( processedData[date]["high"] );
//             let lo = parseFloat(  processedData[date]["low"] );
//             if(hi>gCandlesMaxes.priceHigh ){
//                 gCandlesMaxes.priceHigh = hi;
//                 gCandlesMaxes.priceHigh_date = date.toString();
//                 gCandlesMaxes.priceHigh_idx =  i ; 

//             }  
//             if(lo<gCandlesMaxes.priceLow  ){
//                  gCandlesMaxes.priceLow  = lo;
//                  gCandlesMaxes.priceLow_date = date.toString();
//                  gCandlesMaxes.priceLow_idx =  i ; 
//             }

//             let srhi = parseFloat(  processedData[date]["R3"] );
//             let srlo = parseFloat(  processedData[date]["S3"] );
//             if(srhi>gCandlesMaxes.srHigh ) gCandlesMaxes.srHigh = srhi;
//             if(srlo<gCandlesMaxes.srLow  ) gCandlesMaxes.srLow  = srlo;

//             // let myNum = '62.3900';
//             // let myFloat = parseFloat(parseFloat(myNum).toFixed(2));
//             // console.log(myFloat);  // Outputs: 62.39 (as a number)

//             let vol = parseFloat(  processedData[date]["volume"] );
//             if(vol>gCandlesMaxes.volHigh ) gCandlesMaxes.volHigh = vol;
//             if(vol<gCandlesMaxes.volLow  ) gCandlesMaxes.volLow  = vol;

//             gSymbolStr    = processedData[date]["sym"];
//             gPeriodStr    = processedData[date]["per"];

//             let lastPrice0= parseFloat(processedData[date]["close"]) ; 
//             // gLastPriceStr  =        processedData[date]["close"];   
//             gLastPriceStr  =   lastPrice0.toFixed(2).toString() ;
            
//             // let lastDay       = processedData[date]["dayOfWeek"];
//             i++;

//             datestr0 = date.toString();
//         }
//     }//loop

//     gNumCandlesToRender = i;
//     gCandlesMaxes.num2render = gNumCandlesToRender ;
//     gCandlesMaxes.priceRange = gCandlesMaxes.priceHigh - gCandlesMaxes.priceLow;
//     gCandlesMaxes.srRange    = gCandlesMaxes.srHigh    - gCandlesMaxes.srLow;
//     gCandlesMaxes.volRange   = gCandlesMaxes.volHigh   - gCandlesMaxes.volLow;
//     console.log("] POST calcs, gCandlesMaxes   =", gCandlesMaxes );

// //  ############################################################################## should be a fn

// gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ DateAbbreviate( datestr0 ,0 );   //+"    v"+gVer+" php_v"+gVerPHP; 
// // gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ datestr0;  //+"    v"+gVer+" php_v"+gVerPHP; 
// // gChartTextStr =  gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ datestr0+"    v"+gVer+" php_v"+gVerPHP; 
// gChartTextStr1 = "v"+gVer+" php_v"+gVerPHP; 
// gSymbolStrLower  = gSymbolStr.toLowerCase();

// // DETERMINE gCandleOffset
//     gCandleOffset = gCandleSpaceMin;
//     // gCandleWidthTotal = parseInt( cw / gNumCandlesToRender  );
//     gCandleWidthTotal = parseInt(  vrect.w / gNumCandlesToRender  );
//     // if(gCandleWidthTotal>4) gCandleOffset=gCandleSpaceMin+1;     // ie 2, set new offset iff candle wide enough
//     if(gCandleWidthTotal>5) gCandleOffset=gCandleSpaceMin+1;     // ie 2, set new offset iff candle wide enough
   
//     gCandleXnext = vrect.x + gCandleOffset;
//     gCandleXnextStart = gCandleXnext;           // SAVE START
    
// // DETERMINE  gCandleWidth
//     gCandleWidth      = gCandleWidthTotal - gCandleOffset;
//     console.log("] Candles to render, gCandleWidth  =", gNumCandlesToRender, gCandleWidth );


// //  ##############################################################################  
// //  #######################                       ################################  
// //  #######################  all prep Calcs DONE  ################################  
// //  #######################                       ################################  
// //  ##############################################################################  
// //  ##############################################################################  DEL
// //  ##############################################################################  DEL
// //  ##############################################################################  DEL
// //  ##############################################################################  DEL










    // console.log(processedData); // This will log the PHP data to the console
    let newcol=RandomColorC();
    let last_date_key="nil";  // DERP
 
// ################################################# RENDER CANDLES
// ################################################# RENDER CANDLES

    let  xHigh=0;
    let  yHigh=0;

    let  xLow =0;
    let  yLow =0;


    let j=0;
    for (var date in processedData) {
        if (processedData.hasOwnProperty(date)) {
            let datestr= date;
            let op1 = parseFloat(  processedData[date]["open"] );
            let hi1 = parseFloat(  processedData[date]["high"] );
            let lo1 = parseFloat(  processedData[date]["low"] );
            let cl1 = parseFloat(  processedData[date]["close"] );
            let vol1 = parseFloat(  processedData[date]["volume"] );
            let eom = parseInt(  processedData[date]["endOfMonth"] );

            gLastDateStr    = date;


// END OF MONTH...
            if(eom==1){   // found end of month
                  processedData[date]["X1month"] = gCandleXnext;

                //   // here we may have to pre-loop to set X1,X2month's
                //  if(last_date_key!="nil"){
                //     processedData[last_date_key]["X2month"] = gCandleXnext;  // get new X2 from last month
                //     last_date_key =gLastDateStr;  //== date
                //  }

                  let x1m = gCandleXnext;
                  let x2m = gCandleXnext + ( 10 * ( gCandleWidth + gCandleOffset ) ); 
                //   if(x2m> vrect.x+vrect.h) x2m= vrect.x+vrect.h-1;

                let  sr0price = 0.0;  
                let  sr0Y  =0; 
                let  sr0Ymax = vrect.y+vrect.h;

                let fsz = 16;
                let xyoff = 4;
                let fontStr ="Helvetica";

                if(button3==1){
                          sr0price = parseFloat( processedData[date]["R3month"] ).toFixed(2);
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.r3 ,  "dashed" );

                          sr0price = parseFloat( processedData[date]["R2month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (R2)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                           DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.r2 , "dashed" , txtStr, fsz, xyoff, fontStr);

                          sr0price = parseFloat( processedData[date]["R1month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (R1)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.r1 , "dashed" , txtStr, fsz, xyoff, fontStr);
                        


                          sr0price = parseFloat( processedData[date]["P"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (P)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.p , "dashed" , txtStr, fsz, xyoff, fontStr);
                        


                          sr0price = parseFloat( processedData[date]["S1month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (S1)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.s1 ,  "dashed" , txtStr, fsz, xyoff, fontStr);

                          sr0price = parseFloat( processedData[date]["S2month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (S2)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.s2 ,  "dashed" , txtStr, fsz, xyoff, fontStr);


                          sr0price = parseFloat( processedData[date]["S3month"] ).toFixed(2);
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.s3 ,  "dashed" );
                
                    }//if butt0n

            }

            /* 
                                                            $value['buySignalCnt'] = 0;
                                                            $value['sellSignalCnt'] = 0;
                                                            $value['buySignal'] = 0;
                                                            $value['sellSignal'] = 0;
                                                            $value['buySignalPrice'] = 0;
                                                            $value['sellSignalPrice'] = 0;
            */

            gBuySignal_thisCandle        =  parseInt(  processedData[date]["buySignal"]  )   ;   //$value['buySignal'];
            gSellSignal_thisCandle       =  parseInt(  processedData[date]["sellSignal"]  )   ;   //$value['sellSignal'] = 0;
            gBuySignalCnt_thisCandle     =  parseInt(  processedData[date]["buySignalCnt"]  )    ;
            gSellSignalCnt_thisCandle    =  parseInt(  processedData[date]["sellSignalCnt"]  )   ;
            let buyPrice                 =  parseInt(  processedData[date]["buySignalPrice"]  )    ;
            let sellPrice                =  parseInt(  processedData[date]["sellSignalPrice"]  )   ;
           
            let date_thisCandle         =  DateAbbreviate(date, 2 );  // ie Oct 17
            gDate_thisCandle            = date_thisCandle; 

            gBuySignalStr_thisCandle     =  gCurrencyStr+ buyPrice.toString() +" "+ date_thisCandle +" (" + parseInt(gBuySignalCnt_thisCandle).toString() +")";
            gSellSignalStr_thisCandle    =  gCurrencyStr+ sellPrice.toString()+" "+ date_thisCandle+ " (" + parseInt(gSellSignalCnt_thisCandle).toString()+")";

// from jsonget.php
        // $value['candleX'] = 0;
        // $value['candleY'] = 0;


// from jsonget.php
        // $value['gapstart_price'] = $gapStart_price ;
        // $value['gapend_price']   = $gapEnd_price ;

        // $value['gapstart_date']  = $gapStart_date ;
        // $value['gapend_date']    = $gapEnd_date ;

        // $value['gapdir']         = $gapDir ;
        // $value['gapdir_str']     = $gapDirStr;

        
        gGapDir_thisCandle          =  parseInt(  processedData[date]["gapdir"]  )   ;
        gGapDirStr_thisCandle       =   processedData[date]["gapdir_str"]     ;
        gGapStartPrice_thisCandle   =  parseFloat(  processedData[date]["gapstart_price"]  ).toFixed(2)   ;
        gGapEndPrice_thisCandle     =  parseFloat(  processedData[date]["gapend_price"]  ).toFixed(2)    ;
        gGapOpened_str              =  gDate_thisCandle+" Gap-"+gGapDirStr_thisCandle+ ": "+ gCurrencyStr+ gGapStartPrice_thisCandle+  " - "+ gCurrencyStr+gGapEndPrice_thisCandle;



//  DRAW everything assoc. with that candle , ie volume, buy/sell etc
        DrawCandlePlus(ctx, vrect, colScheme,  j, datestr, op1, hi1, lo1, cl1, vol1 , eom);    // uses gCandlesMaxes
        // console.log( j+") " + datestr + ":  nextX="+ gCandleXnext  + ";  H, L, Close= " + processedData[date]["high"] + ", " + processedData[date]["low"] + ", "+ processedData[date]["close"] + " "+   processedData[date]["dayOfWeek"]);
        


            let cw2 = parseInt( gCandleWidth/2 );
// NEW            
        //  if( gCandlesMaxes.priceHigh_date  == date ){
            if( gCandlesMaxes.priceHigh_idx == j ){
                yHigh = GetYCoordFromPrice( hi1 , vrect );
                xHigh = gCandleXnext +cw2;
                gCandlesMaxes.priceHighX =xHigh ;   // save, not used for now
                gCandlesMaxes.priceHighY =yHigh ;
                let txtstr=gCurrencyStr+ ( hi1.toFixed(2).toString() );
                // DrawCircle(ctx, 36, 6, colScheme.dn, xHigh, yHigh, 0, 1, colScheme.tx, txtstr , 'yellow', 20, "Helvetica", -20 ) ;
                
                DrawCircle(ctx, 30, 4, 'red', xHigh, yHigh, 0, 1, gColor_red_Alpha_20pct ,  txtstr , 'yellow', 20, "Helvetica", -20 ) ;
    //    function DrawCircle(ctx, size, wt, col, x, y, xyOffset, fill, fillcol, txtstr, txtcol, fsz, fontStr, txtoff) {

        }  
    //  if( gCandlesMaxes.priceLow_date  == date ){
        if( gCandlesMaxes.priceLow_idx == j ){
                yLow = GetYCoordFromPrice( lo1 , vrect );
                xLow = gCandleXnext  +cw2;
                gCandlesMaxes.priceLowX =xLow ;      // save, not used for now
                gCandlesMaxes.priceLowY =yLow ;
                let txtstr1=gCurrencyStr+ ( lo1.toFixed(2).toString() );
                // DrawCircle(ctx, 36, 6, colScheme.up, xLow, yLow, 0, 1, colScheme.tx, txtstr1 ,  'yellow', 20, "Helvetica", -25 ) ;
                DrawCircle(ctx, 30, 4, 'darkgreen', xLow, yLow, 0, 1, gColor_green_Alpha_20pct, txtstr1 ,  'yellow', 20, "Helvetica", -25 ) ;
        }



            gCandleXnext =   gCandleXnext +  gCandleWidth + gCandleOffset ;
            j++;
        }
    }//for

    gCandleXnextLast =   gCandleXnext;

// #################################  END OF CANDLESLOOP 


}// fn Dr@wCandlesChart   ################################################################################




//
//   DrawS3gmentedLine(ctx, processedData, vrect, 4, 'hotpink', "solid", gCandleXnextStart,   (  gCandleWidth + gCandleOffset ), "close") ;
//
function DrawSegmentedLine(ctx, processedData, vrect, wt, colLine, style, xstart, xoffset, fieldStr) {
    let xContinuous = xstart + gCandleOffset + parseInt( gCandleWidth /2 );

    ctx.save();

    // Set the style of the line
    if (style === "dashed") {
        ctx.setLineDash([5, 15]); // dashed style
    } else if (style === "dotted") {
        ctx.setLineDash([1, 5]); // dotted style
    } else {
        ctx.setLineDash([]); // solid line
    }

    // Set the line width and color
    ctx.lineWidth = wt;
    ctx.strokeStyle = colLine;
    // Begin the path for the line
    ctx.beginPath();
    // Variable to track if the line should moveTo (for the first point) or lineTo (for subsequent points)
    let isFirstPoint = true;
    let i=0;
    // Loop through the processedData
    for (let date in processedData) {
      if (processedData.hasOwnProperty(date) ) {
            // Get the y-coordinate string for the given fieldStr (e.g. "close", "P", "P3")
            let yCoordStr = processedData[date][fieldStr];
            let yCoordFloat = parseFloat(yCoordStr);
            let yCoordStrP = processedData[date]["P"];   // assume P3 check for triangles
            let yCoordFloatP = parseFloat(yCoordStrP);

            if (fieldStr=="P3" && i<3){
                      // OVERWRITE
                      yCoordFloat = yCoordFloatP ;
                    }// if P3 test , i<3

            // Convert the price into the y-coordinate using the helper function
            let yCoordFinal = GetYCoordFromPrice(yCoordFloat, vrect);
            // Draw the line segment
            if (isFirstPoint) {
                // Move to the first point without drawing a line
                ctx.moveTo(xContinuous, yCoordFinal);
                isFirstPoint = false;
            } else {
                // Draw a line to the next point
                ctx.lineTo(xContinuous, yCoordFinal);
            }
        // Increment the x-coordinate for the next point
        xContinuous += xoffset   ;
        i++;
      }// if exist
    }
    // Complete the path and draw the line
    ctx.stroke();
    ctx.restore();
}//fn 

// ai-written: Helper function to convert a price into a y-coordinate based on the vrect (viewport)
// funct ion GetY CoordFromPrice(price, vrect) {
//     // Example conversion logic, this should map a price to a y-coordinate based on vrect.
//     // You can customize this as needed based on your canvas and viewport configuration.
//     let minPrice = 0;   // replace with your actual minimum price
//     let maxPrice = 100; // replace with your actual maximum price
//     let priceRange = maxPrice - minPrice;
    
//     let yRange = vrect.h;
    
//     // Calculate the percentage position of the price within the price range
//     let pricePercent = (price - minPrice) / priceRange;

//     // Map the percentage to the y-coordinate within the viewport, assuming y increases downward
//     return vrect.y + vrect.h - (pricePercent * yRange);
// }

//
// note:  gCandlesMaxes{} must be set
//
let gGlobalChartMargin_hTop = 0.05;
let gGlobalChartMargin_hBot = 0.05;

let gGlobalChartMargin_w = 0.00;

function GetYCoordFromPrice( priceInput, vrect ){
    // i.e. price range = $15 - $95 = 80,   ie $26-$15 = $11,  11/80 ~= 0.125 * Yrange (300) ~= $32.50
    let yrange = vrect.h;
    // old... // let Ycanvas = yrange - (  ((priceInput - candlesPriceBoundsMin) / candlesPriceRange)  * yrange  ) ;
    //           let Ycanvas = yrange - (  pricePctFloat  * yrange  ) ;

    let yrangeFloat= parseFloat( yrange );

    let prh = gCandlesMaxes.priceHigh;
    let prl = gCandlesMaxes.priceLow;

    // for now only make top 10% higher, for example..
    prh = prh * (1 + gGlobalChartMargin_hTop );   // ie $100 prh = 100 * (1 + 10%) =  100 * 1.1 = $110
    prl = prl * (1 - gGlobalChartMargin_hBot );   // ie $100 prh = 100 * (1 -  5%) =  100 * .95 = $95
    let prrange = prh - prl ; 

    // here we can add margins...
    let pricePctFloat = ((priceInput -  prl ) / prrange );  // all floats
    // let pricePctFloat = ((priceInput - gCandlesMaxes.priceLow) / gCandlesMaxes.priceRange);  // all floats


    // let pricePctFloat = ((priceInput - gCandlesMaxes.srLow) / gCandlesMaxes.srRange);  // BUGGy cause [0].s1... == 0
    let pricePctFloat1 = pricePctFloat * yrangeFloat;
    let pricePctInt1   = parseInt( pricePctFloat1  );
   

    let Ycanvas = yrange - pricePctInt1; // (  pricePctFloat  * yrange  ) ;
    
    Ycanvas +=   vrect.y;
    let Ycanvas1 = parseInt( Ycanvas );  // ensure int
    return( Ycanvas1 ); 

}//fn

function DrawCandlePlus( ctx, vrect,  colScheme, idx, datestr, op1, hi1, lo1, cl1, vol1 , eom ){

    let candleRect = {  x: 0 , y: 0 , w: 4 , h: 12  }; 

    let col1 = colScheme.up ;
    let candleGreen = 1;            // 1== candle up , 0 == candle down
    if(cl1<op1){
         col1 = colScheme.dn;
         candleGreen = 0;
    }

    let yh= 0;  
    let yl= 0;  
    let xwick = gCandleXnext + parseInt( gCandleWidthTotal/2 );
    gCandleWickX = xwick;

    // DRAW CANDLE WICK
    yh = GetYCoordFromPrice( hi1, vrect ) ;   //  high  gCandleMaxes{} must be set by this fn-call
    yl = GetYCoordFromPrice( lo1, vrect ) ;     // low

    if(button1==0) DrawVerticalLine( ctx, xwick, yh, yl, colScheme.wi, "solid");

    candleRect.x = gCandleXnext;
    candleRect.y = vrect.y+50;
    candleRect.w = gCandleWidth;
    candleRect.h = parseInt( idx/2 );


    let y2=0;
    if(candleGreen==1){  // candle UP !
        candleRect.y =  GetYCoordFromPrice( cl1, vrect ) ; 
        y2           =  GetYCoordFromPrice( op1, vrect ) ; 
        candleRect.h =  y2 - candleRect.y ;
    }else{              //  candle DOWN !
        candleRect.y =  GetYCoordFromPrice( op1, vrect ) ;   // down candle, y=open
        y2           =  GetYCoordFromPrice( cl1, vrect ) ; 
        candleRect.h =   y2 - candleRect.y ;
    }


    // draw candle body
    if(button1==0) DrawVRect(ctx, candleRect, 2, col1 , "solid");

    // draw everything else assoc with that candle
    DrawOtherStuff(ctx , vrect , idx, colScheme,  candleRect, candleGreen, vol1 , eom);

}// fn Dr@wCandlePlus(...)

//
// candlestick-based other stuff
//
function  DrawOtherStuff( ctx  , vrect, idx , colScheme , candlerect, candleGreen, vol1 , eom ){   // candleGreen==1 if UP

    // DrawVolume( ctx  ,  vrect, idx , colScheme , candlerect, candleGreen, vol1  ,'solid');   
    DrawVolume( ctx  ,  vrect, idx , colScheme , candlerect, candleGreen, vol1  ,'outline');   

    if(eom==1){  // end of month    let gAxe sCol0= "#454595" ;
        DrawVerticalLine(ctx  , candlerect.x , vrect.y, (vrect.y+vrect.h) , gAxesCol0 , "dotted");
        DrawDateRotated( ctx  , vrect , colScheme, -0.50 );
        DrawMonthlySupportResistance(ctx, vrect,  idx , colScheme , candlerect);
    }

// BUY SELL
   if(button2==1){    
        DrawBuySellSignal( ctx  , vrect, idx , colScheme, candlerect , candleGreen) ;
    }

    // let cirOutline = RandomJSColor(colarr);
    // let cirFill    = RandomJSColor(colarr);
    // if(idx%7==0) Dr awCircle(ctx, 40, 6, cirOutline, gCandleWickX, (candlerect.y+candlerect.h) , 0, 1, cirFill );


    if(gGapDir_thisCandle!=0  &&  gGaps_On==1 ){
        let fromx = candlerect.x+parseInt(candlerect.w/2) ;
        let tox = fromx + parseInt(vrect.h*gGapVrectWidth_pct);   // .20 * .w
        let yprice0 = GetYCoordFromPrice( gGapEndPrice_thisCandle, vrect );
        DrawHorizontalLine_callout_textcol(ctx, fromx , tox ,  yprice0 , gGapLineCol  ,  "dotted" , gGapOpened_str , gGap_fntsz, 0 , gGlobalFont , gGapTextCol );
    }

}//fn

function Hypotenuse(w, h) {
    // Calculate the hypotenuse using the Pythagorean theorem
    let hypotenuse = Math.sqrt(w * w + h * h);

    // Return the hypotenuse rounded to the nearest integer
    return Math.round(hypotenuse);
}

// Example usage
// console.log(Hypotenuse(3, 4)); // Output: 5

function DrawBuySellSignal(ctx  , vrect, idx , colScheme, candlerect , candleGreen ) {
    let sz      = 35; 
    let sz_init  = 2; 
    let sz1      = 11;   // ie cnt 3 == 33 size
    let upcol   = 'blue';   // 'green';
    let dncol   =  'orange' ;   //'darkred';

    let fsz= 24;

    let txt1   = "  ";
    // let txtStr = "  "+ idx.toString();
    let txtStr = "  ";

    let xoff=14;

    let BuyTrianglePos_y  = candlerect.y+candlerect.h+sz*2;
    let SellTrianglePos_y = candlerect.y+candlerect.h-sz*2;

    if( gBuySignal_thisCandle  > 0 ){
        sz1 = sz_init * gBuySignalCnt_thisCandle;
        txt1=gBuySignalStr_thisCandle;
        DrawTriangle_callout(ctx, sz1, 3, upcol, gCandleWickX, BuyTrianglePos_y, 0, 1, 'limegreen' ,  txt1+ txtStr, (-1*xoff) , 0, 16 , colScheme.tx , gGlobalFont  ) ;
        // DrawTriangle_callout(ctx, sz1, 3, upcol, gCandleWickX, candlerect.y+candlerect.h+sz*2, 0, 1, 'limegreen' ,  txt1+ txtStr, (-1*xoff) , 0, 16 , colScheme.tx , gGlobalFont  ) ;

        DrawText(ctx , txt1, gCandleWickX, BuyTrianglePos_y+10, fsz , colScheme.tx , gGlobalFont  );
    }

    if( gSellSignal_thisCandle  > 0 ){
        sz1 = sz_init * gSellSignalCnt_thisCandle;
        txt1=gSellSignalStr_thisCandle;
        DrawTriangle_callout(ctx, sz1, 3, dncol, gCandleWickX, SellTrianglePos_y, 1, 1, 'red' ,   txt1+ txtStr, (-1*xoff), 0, 16 , colScheme.tx , gGlobalFont  ) ;
        // DrawTriangle_callout(ctx, sz1, 3, dncol, gCandleWickX, candlerect.y+candlerect.h-sz*2, 1, 1, 'red' ,   txt1+ txtStr, (-1*xoff), 0, 16 , colScheme.tx , gGlobalFont  ) ;
      
        DrawText(ctx , txt1, gCandleWickX, SellTrianglePos_y-10, fsz , colScheme.tx , gGlobalFont  );
    }



    /*
        gBuySignal_thisCandle        =  parseInt(  processedData[date]["buySignal"]  )   ;   //$value['buySignal'];
            gSellSignal_thisCandle       =  parseInt(  processedData[date]["sellSignal"]  )   ;   //$value['sellSignal'] = 0;
            gBuySignalCnt_thisCandle     =  parseInt(  processedData[date]["buySignalCnt"]  )    ;
            gSellSignalCnt_thisCandle    =  parseInt(  processedData[date]["buySignalCnt"]  )   ;
            let buyPrice                 =  parseInt(  processedData[date]["buySignalPrice"]  )    ;
            let sellPrice                =  parseInt(  processedData[date]["buySignalPrice"]  )   ;

            gBuySignalStr_thisCandle     =  gCurrencyStr+ buyPrice.toString() + "  " + parseInt(gBuySignalCnt_thisCandle).toString();
            gSellSignalStr_thisCandle    =  gCurrencyStr+ sellPrice.toString()+ "  " + parseInt(gSellSignalCnt_thisCandle).toString();

    */
}

function DrawFinancials(ctx, vrect, financials_object, xoff, yoff, yspace, fntsz , fntname, fntcol ) {
    if(gDrawFinancials==0) return;

    let i = 0; 
    let ioff = 2; 


    // DrawText_noclip(ctx,  "FINANCIALS",   vrect.x + vrect.w + parseInt(0.5*xoff), vrect.y + yoff + ( (i+0) * yspace ), fntsz*2,  fntcol,       fntname );
    DrawText_noclip(ctx,  "FINANCIALS",   vrect.x + parseInt(0.5*xoff), vrect.y + yoff + ( (i+0) * yspace ), fntsz*2,  fntcol,       fntname );

            // Loop through every key-value pair in the financials_object
            for (const [key, value] of Object.entries(financials_object)) {
                // Cast key and value to strings
                let key_string   = String(key) + ":  ";
                let value_string = String(value);
                let compString   = key_string + ": " + value_string;


                let rwidth = 0;
                ctx.fillStyle =fntcol;   
                ctx.font = fntsz.toString()+" "+ fntname;
                // ctx.font = "64px Arial";
                // ctx.fillText( key_string , 200 , 200 );
                rwidth = ctx.measureText(key_string).width;
            

                // Call the DrawText function to draw the composed string
                // DrawText_noclip(ctx,  key_string,     vrect.x + vrect.w + xoff - rwidth, vrect.y + yoff + ( (i+ioff) * yspace ), fntsz,  fntcol,       fntname );
                // DrawText_noclip(ctx,  value_string,   vrect.x + vrect.w + xoff         , vrect.y + yoff + ( (i+ioff) * yspace ), fntsz,  fntcol,       fntname );
                DrawText_noclip(ctx,  key_string,     vrect.x   + xoff - rwidth, vrect.y + yoff + ( (i+ioff) * yspace ), fntsz,  fntcol,       fntname );
                DrawText_noclip(ctx,  value_string,   vrect.x   + xoff         , vrect.y + yoff + ( (i+ioff) * yspace ), fntsz,  fntcol,       fntname );

                // Increment the counter
                i++;
            }
}

function DrawMonthlySupportResistance(ctx, vrect,  idx , colScheme , candlerect){
    ;
}


// Call: In1tAndDrawImage(ctx, '../img/pic.png', 50, 50, 0.5); // Example: img at (50, 50) with 50% scale
//
// Function to initialize and load an image, then call DrawImage once it's ready
function InitAndDrawImage(ctx, vrect, imgPath, x, y, scale) {
    let img = new Image(); // Create a new image object
    img.src = imgPath; // Set the source to the image path

    let x1 = vrect.x+x;
    let y1 = vrect.y+y;
    // When the image is fully loaded, draw it on the canvas
    img.onload = function() {
        DrawImage(ctx, img, x1, y1, scale);
    };
}

// Function to draw an image on the canvas at (x, y) with scaling
function DrawImage(ctx, img, x, y, scale) {
    let imgWidth = parseInt(  img.width * scale  );  // Scale the width
    let imgHeight = parseInt( img.height * scale ); // Scale the height

    // Draw the image at position (x, y) with the scaled width and height
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
}


function  DrawGlobalTextInfo( ctx , vrect, xoffset, yoffset , fsz, colScheme ){

    let str = "";
    str =  gScalar_resize.toString()+ " / "+ gScalar_init.toString()+ " == " +  (gScalarFloat_dynamic).toString() +" ";
     // DrawText( ctx, str,  vrect.x+xoffset, vrect.y+yoffset+50, fsz , colScheme.tx , gGlobalFont);

    DrawText( ctx, gChartTextStr+" " +  gScalarFloat_dynamic.toString(),  vrect.x+xoffset, vrect.y+yoffset, fsz , colScheme.tx , gGlobalFont);
    DrawText( ctx, gChartTextStr1,  (vrect.x+vrect.w)-200, vrect.y +vrect.h - yoffset, 12 , gAxesCol0, gGlobalFont);
    

    let welstr = "algoz Charting";  
    // let xposT = parseInt(  vrect.x + (vrect.w/5)*2 );  
    let xposT = parseInt(  vrect.x + 120 );  
    DrawText_noclip( ctx, welstr, xposT, vrect.y - ( yoffset), 10 , 'purple', gGlobalFontTitle);


    let copyRstr = "algoz.ai Copyright (c) 2023-2025 by Algo Investor Inc.";
    // let xpos = parseInt(  vrect.x + (vrect.w/3) );  
    let xpos = vrect.x +  120 ;  //parseInt(  vrect.w/2 );  
    DrawText_noclip( ctx, copyRstr, xpos,  ( vrect.y +vrect.h + yoffset ),    10 , 'black', gGlobalFont);
    
    InitAndDrawImage(ctx, vrect, gAlgozLogo_fname, 10, -30, (gImgScale*1.2) );   // let gIm gScale = 0.325;

}

// function drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby-16 , fibfntsz,  fibcol3a ){
function    drawText( fontStr,  x, y,                                   ftsz,  colStr ){

    DrawText( ctx, txtStr, x, y, fsz , colStr , fontStr);
    
}
function DrawText_noclip( ctx, txtStr, x, y,       fsz , colStr , fontStr){ 

    let vrect = gGlobalChartVRectCurrent;        
    let vectXY  = { x: x,  y: y };
    let vectXY_clipped  = { x: 0,  y: 0  };

    // vectXY_clipped   = ClipPoint1(ctx, vrect, vectXY);  
    // x = vectXY_clipped.x;
    // y = vectXY_clipped.y;
    // if(x<0 || y<0) return;      // if either x or y is offscreen, return & DO NOT DRAW !

    ctx.fillStyle = colStr ; 
    ctx.font =  fsz.toString() + "px "+ fontStr ;        // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( txtStr , x,  y  );   
}

function DrawText( ctx, txtStr, x, y, fsz , colStr , fontStr){ 

    let vrect = gGlobalChartVRectCurrent;        
    let vectXY  = { x: x,  y: y };
    let vectXY_clipped  = { x: 0,  y: 0  };
    vectXY_clipped   = ClipPoint1(ctx, vrect, vectXY);  
    x = vectXY_clipped.x;
    y = vectXY_clipped.y;

    if(x<0 || y<0) return;      // if either x or y is offscreen, return & DO NOT DRAW !

    ctx.fillStyle = colStr ; 
    ctx.font =  fsz.toString() + "px "+ fontStr ;        // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( txtStr , x,  y  );   
}
function DrawDateRotated( ctx , vrect, colScheme, rotfl){  // designed to be called during Rendering
    let datestrAbbrev = DateAbbreviate( gLastDateStr , 1 );
    DrawTextRotated( ctx, datestrAbbrev, gCandleWickX + 4, (vrect.y+ parseInt(vrect.h *0.90) ), colScheme.tx, 14, gGlobalFont, rotfl );
}
function DrawTextRotated( ctx, rstr, xx0, yy0, colstr, px, font0str, rotfloat) {
    ctx.fillStyle = colstr;  
    ctx.font = px.toString()   +"px " + font0str;
    ctx.save();
    ctx.translate(xx0 , yy0 );
    // ctx.rotate(-0.5*Math.PI);
    ctx.rotate(rotfloat*Math.PI);
    ctx.fillText( rstr, 0 ,0  ) ;  
    ctx.restore();
}


function  DrawVolume(  ctx ,  vrect, idx , colScheme , candlerect, candleGreen,  vol , style ){
    // let x0=gCandleWickX;
    let x0 = gCandleXnext    ; //  gCandleWickX;

    let volcol = colScheme.dn;
    if(candleGreen==1){
        volcol = colScheme.up;
    }

    // gCandlesMaxes.volRange   = gCandlesMaxes.volHigh   - gCandlesMaxes.volLow;
    let volht =0; // parseInt(idx/3);  // HERE *** COMPUTE VOLUME based on   :    gCandlesMaxes {  .volrng }

    let vol_pct = vol / gCandlesMaxes.volHigh;

    let volht_MaxPixels  =  parseInt( vrect.h * gVolumePixelHigh_pct );  // gV0lumePixelHigh_pct= 0.125;

    volht = parseInt( vol_pct * volht_MaxPixels );

    let vrectVol = {   x: x0 , y: (( vrect.y+vrect.h ) - volht ),      w: candlerect.w,   h: volht };

    DrawVRect(ctx, vrectVol, 1, volcol, style );

}

function DrawLineChart(ctx,  vrect , colScheme, wt, datastr){
    // let datastr = "close";
    DrawSegmentedLine(ctx, processedData, vrect, wt, colScheme.up, "solid", gCandleXnextStart,   (  gCandleWidth + gCandleOffset ), "close") ;

}
function DrawTriangle_callout(ctx, size, wt, col, x, y, upDown, fill, fillcol ,   txtStr, xt, yt, fsz , colStr , fontStr) {  

    // Calculate the points of the triangle
    const halfSize = size / 2;
    ctx.beginPath();
    
    if (upDown === 0) {
        // Triangle with point up
        ctx.moveTo(x, y); // top point
        ctx.lineTo(x - halfSize, y + size); // bottom left
        ctx.lineTo(x + halfSize, y + size); // bottom right
    } else {
        // Triangle with point down
        ctx.moveTo(x, y + size); // bottom point
        ctx.lineTo(x - halfSize, y); // top left
        ctx.lineTo(x + halfSize, y); // top right
    }
    ctx.closePath(); // Complete the triangle path

    // Set stroke color and width
    ctx.strokeStyle = col;
    ctx.lineWidth = wt;

    if (fill === 1) {
        // Fill the triangle with the fill color
        ctx.fillStyle = fillcol;
        ctx.fill();
    }

    // Draw the triangle outline
    ctx.stroke();

//  DrawTriangle_ callout(ctx, size, wt, col, x, y, upDown, fill, fillcol ,   txtStr, xt, yt, fsz , colStr , fontStr)
    DrawText(            ctx, txtStr,  x+xt, y+yt,  fsz , colStr , fontStr  );




}

function         DrawTriangle(ctx, size, wt, col, x, y, upDown, fill, fillcol ) {   
    // Calculate the points of the triangle
    const halfSize = size / 2;
    ctx.beginPath();
    
    if (upDown === 0) {
        // Triangle with point up
        ctx.moveTo(x, y); // top point
        ctx.lineTo(x - halfSize, y + size); // bottom left
        ctx.lineTo(x + halfSize, y + size); // bottom right
    } else {
        // Triangle with point down
        ctx.moveTo(x, y + size); // bottom point
        ctx.lineTo(x - halfSize, y); // top left
        ctx.lineTo(x + halfSize, y); // top right
    }
    ctx.closePath(); // Complete the triangle path

    // Set stroke color and width
    ctx.strokeStyle = col;
    ctx.lineWidth = wt;

    if (fill === 1) {
        // Fill the triangle with the fill color
        ctx.fillStyle = fillcol;
        ctx.fill();
    }

    // Draw the triangle outline
    ctx.stroke();
}

/*
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw an upward triangle with a blue border, no fill
DrawTriangle(ctx, 100, 5, 'blue', 150, 50, 0, 0, '');

// Draw a downward triangle with a red border and filled with yellow
DrawTriangle(ctx, 100, 3, 'red', 300, 50, 1, 1, 'yellow');

*/



function DrawCircle(ctx, size, wt, col, x, y, xyOffset, fill, fillcol,   txtstr, txtcol, fsz, fontStr, txtoff) {
    // Adjust the x and y positions based on the offset
    var adjustedX = x + xyOffset;
    var adjustedY = y + xyOffset;
    var adjustedXtxt = x + txtoff;
    var adjustedYtxt = y + txtoff;
    const radius = size / 2;


    let vrect = gGlobalChartVRectCurrent;  

    let vectXY  = { x: adjustedX,  y: adjustedY }; 
    let vectXY_clipped  = { x: 0,  y: 0  };
    vectXY_clipped   = ClipPoint(ctx, vrect, vectXY);  
    adjustedX = vectXY_clipped.x;
    adjustedY = vectXY_clipped.y;


    // let  vectXYtxt  = { x: adjustedXtxt,  y: adjustedYtxt }; 
    // let  vectXY_clippedtxt   = { x: 0,  y: 0  };
    //  vectXY_clippedtxt   = ClipPoint(ctx, vrect, vectXYtxt );  
    // adjustedXtxt = vectXY_clippedtxt.x;
    // adjustedYtxt = vectXY_clippedtxt.y;

    // DrawText( ctx, txtstr, adjustedXtxt, adjustedYtxt, fsz , txtcol , fontStr);

    ctx.beginPath();
    
    // Draw the circle at the adjusted position
    ctx.arc(adjustedX, adjustedY, radius, 0, 2 * Math.PI);

    // Set stroke color and line width
    ctx.strokeStyle = col;
    ctx.lineWidth = wt;

    if (fill === 1) {
        // Fill the circle with the fill color
        ctx.fillStyle = fillcol;
        ctx.fill();
    }

    // Draw the circle outline
    ctx.stroke();

    DrawText( ctx, txtstr, adjustedXtxt, adjustedYtxt, fsz , txtcol , fontStr);

}

/*
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a circle with a green border and no fill, offset by 10 pixels
Draw Circle(ctx, 100, 5, 'green', 150, 150, 10, 0, '');

// Draw a filled red circle, offset by 20 pixels, with a black border
Draw ircle(ctx, 100, 3, 'black', 300, 150, 20, 1, 'red');
*/

function ifInside( x_or_y, pixel_margin, coordTypeStr ){  // coordTypeStr="x" or "y"
    let vrect = gGlobalChartVRectCurrent;        
    let tf = true;  // assume pt are inside vrect 

    if(coordTypeStr=="x"){
        if( (x_or_y < vrect.x + pixel_margin )  ||   ( x_or_y > vrect.x + vrect.w - pixel_margin ) ){
            tf = false;
            return(tf);
        }
        
    }else  if(coordTypeStr=="y"){
        if( (x_or_y < vrect.y + pixel_margin )  ||   ( x_or_y > vrect.y + vrect.h - pixel_margin ) ){
            tf = false;
            return(tf);
        }
    }

    return(tf);
}//fn

let gPixelMargin_y = 10;
let gPixelMargin_x = 10;

function DrawHorizontalLine_callout( ctx, x1, x2, y ,col,  style, txtStr, fsz, xyoff, fontStr){
    if(  ifInside( y, gPixelMargin_y, "y" )==true  ){
            DrawLine( ctx, x1, y, x2, y, 2, col,  style);
            DrawText( ctx, txtStr, x2+xyoff, y, fsz , col , fontStr);
    }
}
function DrawHorizontalLine_callout_textcol( ctx, x1, x2, y ,col,  style, txtStr, fsz, xyoff, fontStr, txtcol,){
    if( ifInside( y, gPixelMargin_y, "y" )==true  ){
          DrawLine( ctx, x1, y, x2, y, 2, col,  style);
          DrawText( ctx, txtStr, x2+xyoff, y, fsz , txtcol , fontStr);
    }
}
function DrawHorizontalLine( ctx, x1, x2, y ,col,  style){
    if( ifInside( y, gPixelMargin_y, "y" )==true  )  DrawLine(ctx, x1, y, x2, y, 2, col,  style);
}

function DrawVerticalLine( ctx, x, y1, y2 , col, style){
    if( ifInside( x, gPixelMargin_x, "x" )==true  ){
           DrawLine(ctx, x, y1, x, y2, 2, col ,  style );
    }
}


function DrawLine(ctx, x, y, x1, y1, weight, color, style) {
    let vrect = gGlobalChartVRectCurrent;   //  = {... gGl0balChartVRectCurrent }
    let vectXY  = { x: x,  y:y };
    let vectXY1 = { x: x1, y:y1 };
    let vectXY_clipped  = { x: 0,  y: 0  };
    let vectXY1_clipped = { x: 10, y: 10 };
    vectXY_clipped   = ClipPoint(ctx, vrect, vectXY);  
    x = vectXY_clipped.x;
    y = vectXY_clipped.y;
    vectXY1_clipped  = ClipPoint(ctx, vrect, vectXY1);           
    x1 = vectXY1_clipped.x;
    y1 = vectXY1_clipped.y;

    // Set line properties
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;

    // Set line dash style if any
    if (style === 'dashed') {
        ctx.setLineDash([10, 5]); // 10px dash, 5px space
    } else if (style === 'dotted') {
        ctx.setLineDash([2, 4]);  // 2px dot, 4px space
    } else {
        ctx.setLineDash([]); // Solid line
    }

    // Begin drawing the line
    ctx.beginPath();
    ctx.moveTo(x, y); // Starting point
    ctx.lineTo(x1, y1); // Ending point
    ctx.stroke(); // Draw the line

    // Reset line dash to solid for future drawing
    ctx.setLineDash([]);
}
function GetColorSchemeCycle(){ 
    let scheme0=gColScheme;     // assume wht bg, green/red default

    gColorCycleCnt++;
    if(gColorCycleCnt>gColorCycleCntMax) gColorCycleCnt=0;
    if(gColorCycleCnt< 0 )               gColorCycleCnt=0;


    if(gColorCycleCnt==0)  scheme0=gColScheme0;   // black 1
    if(gColorCycleCnt==1)  scheme0=gColScheme1;   // white 1
    if(gColorCycleCnt==2)  scheme0=gColScheme2;   // black 2 
    if(gColorCycleCnt==3)  scheme0=gColScheme3;   // white 2

    if(gColorCycleCnt==4){
        // scheme0=gColScheme4;   // black rnd
         // 99 is changeable  but with BLACK bg
         scheme0=gColScheme99;
         scheme0.up = RandomJSColor(colarr);
         scheme0.dn = RandomJSColor(colarr);
     }
     if(gColorCycleCnt==5){
        // scheme0=gColScheme5;   // black rnd
         // 99 is changeable  but with BLACK bg
         scheme0=gColScheme99;
         scheme0.up = RandomJSColor(colarr);
         scheme0.dn = RandomJSColor(colarr);
     }
     if(gColorCycleCnt==6){
        // scheme0=gColScheme6;   // black rnd
         // 99 is changeable  but with BLACK bg
         scheme0=gColScheme99;
         scheme0.up = RandomJSColor(colarr);
         scheme0.dn = RandomJSColor(colarr);
     }
     if(gColorCycleCnt==7){
        // scheme0=gColScheme7;   // black rnd
         // 99 is changeable  but with BLACK bg
         scheme0=gColScheme99;
         scheme0.up = RandomJSColor(colarr);
         scheme0.dn = RandomJSColor(colarr);
     }

    if(gColorCycleCnt==8)  scheme0=gColScheme8;     // white 3


    // gAxesCol0=  scheme0.ax ;
    gAxesCol0= gAxesCol0_init;      // "#454595" ;  // override  DEL to get .ax

    gColSchemeCurrent =  scheme0;

    return scheme0; 
}







// DEPR
function GetColorScheme(){ 
    let scheme0=gColScheme;     // assume wht bg, green/red

    // gColSchemeNum = user input from php 
    if(gColSchemeNum==0)  scheme0=gColScheme0;  // flip to black bg, green/red
    if(gColSchemeNum==1)  scheme0=gColScheme1;
    if(gColSchemeNum==2)  scheme0=gColScheme2;
    if(gColSchemeNum==3)  scheme0=gColScheme3;
    if(gColSchemeNum==4)  scheme0=gColScheme4;
    if(gColSchemeNum==5)  scheme0=gColScheme5;
    if(gColSchemeNum==6)  scheme0=gColScheme6;
    if(gColSchemeNum==7)  scheme0=gColScheme7;
    if(gColSchemeNum==8)  scheme0=gColScheme8;
    if(gColSchemeNum==9)  scheme0=gColScheme9;
    if(gColSchemeNum==10) scheme0=gColScheme10;

    if(gColSchemeNum==99){
        // 99 is changeable  but with BLACK bg
        scheme0=gColScheme99;
        scheme0.up = RandomJSColor(colarr);
        scheme0.dn = RandomJSColor(colarr);
}
if(gColSchemeNum==100){
        // 100 is changeable  but with BLACK bg
        scheme0=gColScheme100;
        scheme0.up = RandomJSColor(colarr);
        scheme0.dn = RandomJSColor(colarr);
}
 

    // gAxesCol0=  scheme0.ax ;
    gAxesCol0= gAxesCol0_init; // "#454595" ;  // override  DEL to get .ax

    gColSchemeCurrent =  scheme0;

    return scheme0; 
}










//
// ########################################################################################    
// ########################################################################################    FIBONACCI
// ########################################################################################    
//

function ToggleGaps(){
    if(gGaps_On==0){
        gGaps_On=1;
    }else  if(gGaps_On==1){
        gGaps_On=0;
    }
}

function  ToggleFib(){
    if(gDrawFib==0){
        gDrawFib=1;
    }else  if(gDrawFib==1){
        gDrawFib=0;
    }
}//fn
function  ToggleFinancials(){
    if(gDrawFinancials==0){
        gDrawFinancials=1;
    }else  if(gDrawFinancials==1){
        gDrawFinancials=0;
    }
}//fn


// fibonacci  5 incl 50% retracement
// const gFi bSeq = [
var gFibSeq = [
      0.236,  // low
      0.382,
      0.500,
      0.618,
      0.786   // hi
      ];
//
//      drawFib onacci(candles52WeekHigh, candles52WeekLow);  // old way from cnadlesticks.js to CALL fn
let fibcol1 = 'rgba(150,150,180,0.65)' ;
let fibcol2 = 'rgba( 10,210,230,0.65)' ;    // cyan ish
let fibcol3 = 'rgba(232, 219, 93,0.65)' ;   // yellow ish
let fibcol4 = 'rgba( 22, 242, 33,0.65)' ;   // green ish

let fibcol1a = 'rgba(150,150,180,1.0)' ;
let fibcol2a = 'rgba( 10,210,230,1.0)' ;    // cyan ish
let fibcol3a = 'rgba(232, 219, 93,1.0)' ;   // yellow ish
let fibcol4a = 'rgba( 22, 242, 33,1.0)' ;   // green ish
// Fib
// FIB written at Cliff Lodge, Alta, Utah, Moose '23 Trip      
//

let gFibHi = {x1: 0 , x2: 0 ,  y1: 0, y2: 0  };
let gFibLo = {x1: 0 , x2: 0 ,  y1: 0, y2: 0  };



//                      #############################               DR@wFib
//                      #############################               DR@wFib
//                      #############################               DR@wFib
//
//
function   drawFibonacci(ctx, vrect , hi, lo ){   // hi= price high gloat , lo =same
    // function   dra wFibonacci(hi,lo){   //     call old way :  dr@awFibonacci(candles52WeekHigh, candles52WeekLow);

    if(gDrawFib==0) return;

        var delta = hi-lo;

        var fiblen = gFibSeq.length;

        let xoff0 = 500;

        var i;
        var fiblvl = 0;
        var fibpct = 0;
        var fiby = 0;
        let x1 = 0, x2=0, y1=0,y2=0;
        let deltax1=0;
        let hiFirst =1;
        let fibstr1="";
        let fibstr2="";

        let fibcolline='grey';
        let fibcoltxt='white';
        let fibfntsz=72;  // use gFib_fntsz

        let inset = parseInt(vrect.w * 0.10 );

        // console.log("gDrawFib=", gDrawFib);
        // console.log("hi,lo,delta=", hi, lo, delta);

        // let yh = GetYCoordFromPrice(  gCandlesMaxes.priceHigh, vrect );
        // let yl = GetYCoordFromPrice(  gCandlesMaxes.priceLow,  vrect );

        let yh = GetYCoordFromPrice(  hi,  vrect );
        let yl = GetYCoordFromPrice(  lo,  vrect );

        // unused////
        gFibHi = { x1: inset , x2:  vrect.x+vrect.w- inset ,  y1: yh , y2: yh  };
        gFibLo = { x1: inset , x2:  vrect.x+vrect.w- inset ,  y1: yl , y2: yl  };

        // x1=  gFibLo.x1;
        // y1 = gFibLo.y1;

        // x2= gFibHi.x1;
        // y2= gFibHi.y1;

        console.log("] inside Dr@wFibonacci");

        // if(gFibLo.x1 < gFibHi.x1){
        //         x1= gFibLo.x1;
        //         y1 = gFibLo.y1;

        //         x2= gFibHi.x1;
        //         y2= gFibHi.y1;
        //         hiFirst =0;

        //     }else{
        //         x1= gFibHi.x1;
        //         y1 = gFibHi.y1;

        //         x2= gFibLo.x1;
        //         y2= gFibLo.y1;
        //         hiFirst =1;

        //     }


        // ctx.beginPath();
        //     ctx.setLineDash([ 20, 15]);

        //         ctx.strokeStyle=fibcol1; // "#9999aa";   
        //         ctx.lineWidth = 6;
        //         ctx.moveTo( x1,y1  );
        //         ctx.lineTo( x2,y2  ) ; 
        //         ctx.stroke();

        //     ctx.setLineDash([]);
        // ctx.closePath();

        // gCol SchemeCurrent


        for(i=0;i<fiblen;i++){
            // console.log("Fib",i, gFibSeq[i] );

            fiblvl = ( ( gFibSeq[i] * delta ) + lo ).toFixed(2) ;  //  get price
            // console.log("Fiblvl_"+i.toString()+"=", fiblvl);
            // fiby = mf( GetYCoordFromPrice( fiblvl ) );       // OLD

            fiby = GetYCoordFromPrice( fiblvl, vrect );      

            fibstr2 = "("+((gFibSeq[i]*100).toFixed(1)).toString() +"%)    "+gCurrencyStr+fiblvl.toString();
            fibstr1 =  gCurrencyStr+fiblvl.toString() + "    ("+((gFibSeq[i]*100).toFixed(1)).toString() +"%)" ;

            if(i==1 || i==3){      // == fibcol3 , fibcol3a etc
                fibcolline = fibcol3 ;
                fibcoltxt  = fibcol3a;
            }else if(i==2){    
                fibcolline = fibcol1 ;
                fibcoltxt  = fibcol1a;
            }else{
                fibcolline = fibcol2 ;
                fibcoltxt  = fibcol2a;
            }

            DrawHorizontalLine_callout_textcol(ctx, vrect.x , vrect.x+vrect.w-inset,  fiby , fibcolline  ,  "dashed" , fibstr1 , gFib_fntsz, 0 , gGlobalFont , fibcoltxt );

        }//for


        // FIB COLS FOR 0% AND 100%
        fibcolline = fibcol4 ;
        fibcoltxt  = fibcol4a

        // draw 100%
        fiblvl = ( ( 1.0 * delta ) + lo ).toFixed(2) ;  //  get price
        fiby = GetYCoordFromPrice( fiblvl, vrect );      
        fibstr1 =  gCurrencyStr+fiblvl.toString() + "    (100%)" ;
        DrawHorizontalLine_callout_textcol(ctx, vrect.x+0, vrect.x+vrect.w-inset,  fiby , fibcolline  ,  "dashed" , fibstr1 , gFib_fntsz, 0 , gGlobalFont , fibcoltxt );


        // draw 0%
        fiblvl = ( ( 0.0 * delta ) + lo ).toFixed(2) ;  //  get price
        fiby = GetYCoordFromPrice( fiblvl, vrect );      
        fibstr1 =  gCurrencyStr+fiblvl.toString() + "    (0%)" ;
        DrawHorizontalLine_callout_textcol(ctx, vrect.x+0, vrect.x+vrect.w-inset,  fiby , fibcolline  ,  "dashed" , fibstr1 , gFib_fntsz, 0 , gGlobalFont , fibcoltxt );




}//fn fib









        // Function to resize canvas and redraw the rectangle
function resizeCanvas() {

    console.log("]  inside .js:  r3sizeCanvas():  button1...10 ==", button1, button2, button3, button4,
         button5, button6, button7, button8, button9, button10 );  

            // Set canvas width and height to match the div's size
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            let hy = Hypotenuse( canvas.width, canvas.height); 
            if(gScalar_init==-1){
                gScalar_init = hy;
            }
            gScalar_resize = hy;
            gScalarFloat_dynamic =  ( gScalar_resize/gScalar_init ).toFixed(2) ;


            // Set the rectangle dimensions 6px inside the canvas borders
            const rectWidth = canvas.width - 12; // 6px margin on both sides
            const rectHeight = canvas.height - 12; // 6px margin on both sides

            let rcol=RandomColorC();

            let vr =       { x0: 6 , y0: 6 , w0: rectWidth, h0: rectHeight };
            // DrawV Rect(ctx, vr, 2, rcol, "outline");

            
// let gGloba lCha rtVRectCurrent = { x: 150 , y: 275 , w: 60 , h: 134 };   // init w/ dummy values
            // gGlo balChartVRectCurrent.x = vr.x0 +  parseInt(vr.w0 * 0.05);
            // gGloba lChartVRectCurrent.y = vr.y0 +  parseInt(vr.h0 * 0.05);
            // gGlobal ChartVRectCurrent.w = parseInt(vr.w0 * 0.75);
            // gGlobalC hartVRectCurrent.h = parseInt(vr.h0 * 0.75);

            gGlobalChartVRectCurrent.x = vr.x0 +  parseInt(vr.w0 * gGlobalChartVRect_Xoff_pct );
            gGlobalChartVRectCurrent.y = vr.y0 +  parseInt(vr.h0 * gGlobalChartVRect_Yoff_pct );
            gGlobalChartVRectCurrent.w = parseInt(vr.w0 * gGlobalChartVRect_w_pct );
            gGlobalChartVRectCurrent.h = parseInt(vr.h0 * gGlobalChartVRect_h_pct );



    // HERE MASTER vr3ct is NOW SET: gGl0balChartVRectCurrent={}
    // HERE MASTER vr3ct is NOW SET: gGl0balChartVRectCurrent={}
    // HERE MASTER vr3ct is NOW SET: gGl0balChartVRectCurrent={}
    // HERE MASTER vr3ct is NOW SET: gGl0balChartVRectCurrent={}

            console.log( "preDr@wChart()", gGlobalChartVRectCurrent , gColScheme );

            let colscheme    = gColSchemeCurrent ;   
            // let colscheme = GetColo rScheme();   //gColSch emeCurrent

            let typestr0 = 'candles';
            if(button1==1) typestr0 = 'line';
            DrawChart( ctx, gGlobalChartVRectCurrent , colscheme , typestr0 );   


            let rcol1=RandomColorC();

            let wstr = canvas.width.toString();
            let hstr = canvas.height.toString();

            // Draw the canv size w,h
            // let dtstr = "w,h= ["+ canvas.width.toString() +","+ canvas.height.toString() +"]"  ;
            let dtstr = "w,h= ["+ wstr +","+ hstr +"] CANDLES # =" +gNumCandlesToRender.toString()+" , candleW=" +gCandleWidth.toString() ;
            // console.log(dtstr);
            // let dtstrWidth = ctx.mea sureText(dtstr).width+ 0;
            let fsz = 24;
            // ctx.fillStyle = rcol ; // "#113edd";        
            // ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
            // ctx.fillText( dtstr , 40, 40  );

}//fn  r3sizeCanvas()


        // Function to toggle button state and call resizeCanvas
function toggleButton(buttonNumber) {
            switch (buttonNumber) {
                case 1:
                    button1 = (button1 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button1'));  // Trigger event listener
                    break;
                case 2:
                    button2 = (button2 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button2'));
                    break;
                case 3:
                    button3 = (button3 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button3'));
                    break;
                case 4:
                    button4 = (button4 === 1) ? 0 : 1;
                    ToggleGaps();  //gGaps_On
                    window.dispatchEvent(new Event('button4'));  // rndcolor
                    break;
                case 5:
                    // button5 = (button5 === 1) ? 0 : 1;   // pivots blue, then both blue+yellow, then off
                    if(button5==0) button5=1;
                     else if(button5==1) button5=2;
                      else  if(button5==2) button5=0;
                    window.dispatchEvent(new Event('button5'));
                    break;
                case 6:
                    button6 = (button6 === 1) ? 0 : 1;
                    ToggleFib();  
                    window.dispatchEvent(new Event('button6'));
                    break;
                case 7:
                    button7 = (button7 === 1) ? 0 : 1;
                    ToggleFinancials();
                    window.dispatchEvent(new Event('button7'));
                    break;

                case 8:
                    button8 = (button8 === 1) ? 0 : 1;
                   
                    GetColorSchemeCycle();

                    // gColSchemeNum=99;
                    // GetCol orScheme();
                    window.dispatchEvent(new Event('button8'));
                    break;

// unused
                case 9:
                    button9 = (button9 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button9'));
                    break;
                case 10:
                    button10 = (button10 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button10'));
                    break;

         }
}//fn t0ggle butt






// #############################################################  MAIN CODE  *****
// #############################################################  MAIN CODE  *****
// #############################################################  MAIN CODE  *****

// // Get the button and audio element
// const playButton = document.getElementById('play-button');
// const audio      = document.getElementById('audio');

//         // Add click event listener to the button
//         playButton.addEventListener('click', function() {
//             // Play the audio when the button is clicked
//             audio.play();
//         });


        // Resize/redraw the canvas when a button1-6 is pressed 
        window.addEventListener('button1', resizeCanvas);
        window.addEventListener('button2', resizeCanvas);
        window.addEventListener('button3', resizeCanvas);
        window.addEventListener('button4', resizeCanvas);
        window.addEventListener('button5', resizeCanvas);
        window.addEventListener('button6', resizeCanvas);
        window.addEventListener('button7', resizeCanvas);

        window.addEventListener('button8', resizeCanvas);
        window.addEventListener('button9', resizeCanvas);
        window.addEventListener('button10', resizeCanvas);

        // Resize the canvas when the window is resized
        window.addEventListener('resize', resizeCanvas);

        // Initial resize to set up the canvas
        resizeCanvas();

// #############################################################  MAIN CODE  *****
// #############################################################  MAIN CODE  *****
// #############################################################  MAIN CODE  *****





















        /*

////////////////////////////////////////////////////////////////////////////////////////// BUY / SELL SIGNAL LOGIC HERE...

 
SetPlotColor(1, JBColorMvgAvg );  // yello
SetPlotColor(2, JBColorPivot );  // cyan
// sell signal?
if PtrailingAvg > Pday then begin
 if BuySignal>=0 then begin
 
  SellSignal=SellSignal+1;
  if SellSignal=1 then begin
   if BuySignal > BuyThreshold then begin
    SetPlotWidth(1, JBplotW);     // strong sell

    JBString0 = NumToStr(BuySignal,0);  // print # of candles
   
Value67 = Text_New(Date, Time,PtrailingAvg , JBString0 );
  Text_SetColor(Value67, yellow);
  Text_SetLocation(Value67, Date, Time, (PtrailingAvg +(PtrailingAvg/250) ));
// Text_SetLocation(Value67, Date, Time, (PtrailingAvg +(PtrailingAvg/100) ));


currSellStr= JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusR1pctstr   + ",SELL,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";
//currSellStr= JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+  "intraday,SELL,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+weeklyPivotsStr+",";

// SELL 100 Shares SYMBOL at LIMIT $PtrailingAvg+.01 time = timstr , IFF SHORTing = ON;


If ( BuySignal>= BuyThreshold2   and  ( currSellStr <>  lastSellStr ) and processBar=1  ) then
Begin
  FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine +  currSellStr );  //NewLine +JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+  "intraday,sell,100,"+Symbol+",atLimit,"+NumtoStr( PtrailingAvg ,2) +",P3day,sellsigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusR1str+","+weeklyPivotsStr+"," );
// FileAppend("c:\_dev\DayTrades.txt", NewLine+"|::   SELL 100 Shares  of "+Symbol+" at LIMIT " +"$"+NumtoStr( PtrailingAvg ,2) +"   ::|    "+LeftStr(ELDateToString(Date), 10) +"  "+NumtoStr(Time,0) +"   = "+JBString0 );
lastSellStr = currSellStr ;
end;

    if HardR1>0 and Pday>HardR1 then   // final check for trendline resistance R1 broken
        SetPlotColor(1, white)
       else SetPlotColor(1, yellow);
    end else
     begin
      SetPlotWidth(1, JBplotW-2);  // weak sell  
      SetPlotColor(1, yellow);
     end;
  end else
   begin
     SetPlotWidth(1,JBplotWsm);
//     SetPlotColor(1,red);
  SetPlotColor(1,JBColorMvgAvg);    // rev 5.0
   end;
  BuySignal=0;
  SetPlotWidth(2, JBplotWsm);  //Plot2 = buy line, reset it
 end;
end;
 
 

//********************************************************************************************************************* buy signal?  
if PtrailingAvg < Pday then begin

 if SellSignal>=0 then begin
  BuySignal=BuySignal+1;

  if BuySignal=1 then begin
   if SellSignal > SellThreshold then begin
    SetPlotWidth(2, JBplotW);  
    JBString0 = NumToStr(SellSignal,0);
   
Value66 = Text_New(Date, Time,Pday , JBString0 );
  Text_SetColor(Value66, cyan);
  Text_SetLocation(Value66, Date, Time, (Pday -(Pday/250) ));

//test
str1=  JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,BUY**,100,"+Symbol;
str2=  lastBuyStr ;

//if( str1 <> str2 ) then str3="notEqual";
//if( str1 = str2 ) then  str3="yesEqual";

if( currBuyStr <> lastBuyStr ) then str3="notEqual";
if( currBuyStr = lastBuyStr ) then  str3="yesEqual";

currBuyStr=   JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ priceMinusS1pctstr +",BUY,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+ ","+ gapstr +","+weeklyPivotsStr+","+monthlyPivotsStr+",EOL";




If ( SellSignal>=SellThreshold2      and ( currBuyStr <>  lastBuyStr )    and processBar=1 ) then
//If ( SellSignal>=SellThreshold2      and ( str3="notEqual" )  ) then
begin
  FileAppend("c:\_dev\Projects\algo-python\intradaytrades.txt", NewLine + currBuyStr); // +NewLine + "1>"+currBuyStr +NewLine + "2>"+lastBuyStr +NewLine +"]"+str3 );  // NewLine + JBudate +","+NumtoStr(Time,0)+","+ DayOfWeekNumStr+","+NumtoStr(BarInterval,0)+"min,"+ "intraday,buy,100,"+Symbol+",atLimit,"+NumtoStr( Pday ,2) +",Pday,buysigcnt,"+JBString0+","+pivotsStrOutput+","+priceMinusS1str+","+weeklyPivotsStr+"," );
//FileAppend("c:\_dev\DayTrades.txt", NewLine+"|::   BUY  100 Shares of "+Symbol+" at LIMIT " +"$"+NumtoStr( Pday ,2) +"   ::|    "+LeftStr(ELDateToString(Date), 10) +"  "+NumtoStr(Time,0) +"   = "+JBString0);
lastBuyStr =  currBuyStr ;
end;

    if HardS1>0 and Pday<HardS1 then   // final check for trendline support S1 broken
       SetPlotColor(2, magenta)
       else SetPlotColor(2, cyan);    
    end else
     begin
      SetPlotWidth(2, JBplotW-2);    
      SetPlotColor(2, cyan);    // weak buy
     end;
  end else
   begin
     SetPlotWidth(2,JBplotWsm);
     SetPlotColor(2,JBColorPivot);
   end;
 
  SellSignal=0;  
  SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
 end;


end;




if PtrailingAvg = Pday then begin
  BuySignal=0;
  SellSignal=0;
  SetPlotWidth(2, JBplotWsm);   //Plot2 = buy line, reset it
  SetPlotWidth(1, JBplotWsm);    //Plot1 = sell line, reset it
end;
 

//SetPlotColor(1, red );
//SELL Plot1 red line  
Plot1(PtrailingAvg,"PtrailingAvg");    //SELL this is John Person's red-3 past days Pivot Avg/3  
//BUY  Plot2 blue line
//SetPlotColor(2, darkblue );
Plot2(Pday,"Pday");         //BUY this is John Person's blue-the next day's Pivot based on today
 
  





drawFundamentals


//        draws the text on  the left with fundamental data
//
// local copy
  // let objEarningsData= [];
//   
//
//ctx.rotate(20*Math.PI/180);

function DrawOverviewData( vrect ){


    // deor
  let vrect333 = {x: startX, y: Ytop, w: 320, h:  (Ybottom-Ytop) };
  
if(gDrawAlmanac==1)  DrawAlmanac( "2022-03-23", "2022-08-21", vrect333, "Annual Almanac",  72 );


// for stocks at the moment
if(  gDrawCrypto>0  || gDrawOverview==0  ) return;  // self returning to allow other overlays above, cleaner 1 pipe for lots o data, easier for tracking



// valid entry

        let date0Str = "20010911";
        let date0StrNum = 20010911 ;//date0Str.toFixed(0);   
        // int = 20010911  any currnet earnings' .repdatenum > date0StrNum :)
        let currDateNum = date0StrNum;   // == 20010911


        let ii1=0;
        let cnt1=0;
        let estr="";
        let fntpct = 0.7;
        let column1=1;
        let modulo1=40;

        let rpdate0= 0;



// if(gDrawSwitches==1) {
//   gDrawEarningsAll=0;
//   r3drawCurrentChart();
//   return;

// }


// let jb_yellow1 ="#e5da22";
// let jb_yellow2 ="#c3bc11";
        let yfill1 		=jb_yellow1;  
        let yfill2 		=jb_yellow2; 
        let fill1 		= "#00cc88";
        let fill2 		= "#0b8a59" ;   //"#1a88dc";  //"#1affff";   
        let fillAlert 	= "#a65ed6"; //"#dea524";   
        let  fillRed = "#a10815";
        // let fillBlue = "#6690de";
        let fillBlue = "#6690de";
        let curfill = fill2;

        // let fontsz =gFntSz; // 48; //38; //34;
        let fontcurrent=  gFntSz ; // =  ;
        let fontcurrent1= gFntSzWatchlist; // =  ;

let hlstr = "";
let mastr = "";
let noDividend=0;

let poorFinancials=false;


// draw bg rect
   let x1  = GetDetailsXoff();

//JMB011023
   // if(gDrawSwitches==0    ){    ///  [ ORIG ]

   if(gDrawSwitches==0   ||  gDrawSwitches == 1  ){
        
          ctx.fillStyle =  'rgba(17,17,51,0.80)' ;
      if(gDrawSwitches==0)     ctx.fillRect( x1 , gDetails_Yoff- fontcurrent - 2 , canvasWidth*0.1075, canvasHeight*0.780 );

          //                     quoteElement.innerHTML = `<b>${data[key].t}</b> ${data[key].bp} ${data[key].ap} ${data[key].x} `; // ${data[key].x}`;
          ctx.fillStyle = fill2 ; //"#a256aa";    
          ctx.font = fontcurrent.toString() +"px Arial";
          let ii=0;
          let icnt=0;
          // let x1  = GetDetailsXoff();


        ctx.fillStyle = fill1 ;     
      if(gDrawSwitches==0) 	ctx.fillText(  gEarningsCorpStr , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
      	ii++;
        ctx.fillStyle = fill2 ; 


		  gProperAssetDesc="";



          gObjsLoadedObj[ gObjsLoadedOverviewIDX ].symbol = gGET_SymbolStr.toLowerCase() ;
          gObjsLoadedObj[ gObjsLoadedOverviewIDX ].assettype = "stocks" ;
          gObjsLoadedObj[ gObjsLoadedOverviewIDX ].aux = gEarningsCorpStr ;

          gObjsLoadedObj[ gObjsLoadedOverviewIDX ].obj = objOverview ;



          for(var i in objOverview){

            let strkey = i;
            let strkey1 =strkey.toLowerCase();

            let strvalue =  objOverview[i] ;
            let strvalueNumber  = parseFloat( strvalue ).toFixed(cryptoPrecision);
            let strvalueNumber0 = parseFloat( strvalue );
            let strvalueNumber0MBT = MBT(strvalueNumber0).toFixed(3);   //  returns  1.01 from 1010000000 1,010,000,000

                  let cstr = strvalueNumber0.toLocaleString("en-US");
                  let cstr1 = strvalueNumber0MBT.toLocaleString("en-US")+gMBTstr;

             // console.log ("OVERVIEW : in-loop ", ii); //successfully complt'd.");
            // console.log ( strkey,": ", strvalue  );

            if(curfill==fill2) curfill=  fill1;
              else curfill = fill2;
			     ctx.fillStyle =curfill;

            switch(strkey1) {  	
            	case "exchange":
            	case "sector":
            	case "industry":
            	   gProperAssetDesc +=   strvalue+"  ";
            	break;

            	case "name":
            		gProperAssetName=strvalue;
                    gCorpName=strvalue;
            	break;
            	case "revenuettm":  
            	case "grossprofitttm":  
            	case "ebitda":  
               // if( strvalue.toLowerCase()=="none")  
                       if( Number(strvalue) <  0){ 
                             poorFinancials=true;
                      		 ctx.fillStyle = fillRed;

                            }
                      if( strvalue.toLowerCase()!="none")  strvalue=  gCurrencyStr + cstr1;

            	break;
              	case "sharesoutstanding":
					         strvalue=  cstr1;
              	break;
                case "marketcapitalization":
                 strvalue=  gCurrencyStr +cstr1;
                 // strkey  = gGET_SymbolStr +"'s MarketCap" ;
                 strkey  = "MarketCap" ;
                break;  

                case "quarterlyearningsgrowthyoy":
                 strkey  = "QtrlyEarningsGrowthYOY" ;
                break;
                case "quarterlyrevenuegrowthyoy":
                 strkey  = "QtrlyRevenueGrowthYOY" ;
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
                   if( Number(strvalue) <  0) { 
                            poorFinancials=true;
              		 	    ctx.fillStyle = fillRed;
                        }
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
              		 if( strvalueNumber < 0.0 ){
                         poorFinancials=true;
              		 	 ctx.fillStyle = fillRed;
                        }
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
                         poorFinancials=true;
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


            if(poorFinancials==true){
                let tmpsty = ctx.fillStyle;  

                let fns =140;

                let pfstr =  gPoorFinancialStr ; //"Poor Financials!";
                ctx.font = fns.toString()+    "px Courier New";
                // ctx.font = fns.toString()+ "px Brush Script MT"; //"px Courier New";

            ctx.save();

                let x0=  gGlobalViewportRect.x+50;
                let y0= gGlobalViewportRect.y+ (gGlobalViewportRect.h*0.20) ;
                let y1= gGlobalViewportRect.y+ (gGlobalViewportRect.h*0.750) ;

                ctx.translate(x0*0.35,y1);
                ctx.rotate(-49.0*Math.PI/180);
                let rw = ctx.measureText(pfstr).width ;

                ctx.fillStyle ="rgba(150,150,150,0.25)";  
                 ctx.fillRect(  x0, y0-(fns*0.90) , rw, fns ); 
                // ctx.roundRect2(x0, y0-(fns*0.90) , rw, fns , {upperLeft: cr, upperRight: cr,lowerLeft: cr, lowerRight:  cr}, true, true , 10 , "#777777" );

                ctx.fillStyle = "#111111";
                ctx.fillText( pfstr  ,  x0+6 , y0+6 );
                 ctx.fillStyle = fillRed;
                ctx.fillText( pfstr  ,  x0 , y0 );
                ctx.fillText( pfstr  ,  x0+4 , y0-2 );
                ctx.fillText( pfstr  ,  x0-2 , y0-4 );
            ctx.restore();


                // restore
                ctx.fillStyle = tmpsty;
                ctx.font = fontcurrent.toString() +"px Arial";

            }




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
 
                        if(gDrawSwitches==0)  ctx.fillText(  strkey+": "+strvalue  , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
          	             ii++;       	           

                   }else if(noDividend==1  &&   strkey1!="dividenddate"  &&  strkey1!="exdividenddate"){
// test case if dividend ==0 then do not print div ddate or div exdate
                       if(gDrawSwitches==0)  ctx.fillText(  strkey+": "+strvalue  , x1 ,  gDetails_Yoff + ii* (fontcurrent+ gFntAdder) );
                         ii++;
                   }



              
                }//if icnt>12


             icnt++;
  
          }
          // $('#result').html(JSON.stringify(resultOverivew));
           // console.log ("OVERVIEW : loop successfully complt'd.  Loopcnt=", ii );
          // console.log (    objOverview  );

		let date0Str = "20010911";
		let date0StrNum = 20010911 ;//date0Str.toFixed(0);   
		 // int = 20010911  any currnet earnings' .repdatenum > date0StrNum :)
		let currDateNum = date0StrNum;   // == 20010911

	


          let ii1=0;
          let cnt1=0;
          let estr="";
          let fntpct = 0.7;
          let column1=1;
          let modulo1=40;

          let rpdate0= 0;

    	// do stuff here
      // console.log(  "]  Draw0verviewData(),  date0StrNum=="  );
      // console.log(  date0StrNum  );


//***************************************************************************************
//***************************************************************************************  END OF BIG IF
//***************************************************************************************
//***************************************************************************************


        }//if gDrawSwitch == 0 || ...









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
  // console.log(objEarningsData);

  console.log("] gObjEarningsData [orig]==");
  // console.log(gObjEarningsData);


//////////////////////////////////////////////////////////// LOOP objEarnings
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





///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 
///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 
///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 

// note f0ntcurrent1 for watchlst only

       		ctx.font = mf(fontcurrent1*fntpct).toFixed(0).toString() +"px Arial";

      //
      //			************* FOR LOOPwatchlist
      //
            // curfill="#ddddff"; //"#f5dd42"; // ==jb_yellow2,  //yfill2;
            curfill =jb_yellow2,  //yfill2;
             ctx.fillStyle =curfill;

            ctx.fillText( "Watchlist"  , 290+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff   -  mf(2*(fontcurrent1*fntpct+ 1)) );  
            ctx.fillText( "Earnings"   , 290- mf(6*(fontcurrent1*fntpct+ 1))+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff   -  mf(2*(fontcurrent1*fntpct+ 1)) );  

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

   						if(cnt1>39){
   							if(cnt1==40) ii1=0;
   						    column1=1.5 ;//=2;
   						 }else  column1=1;

              ctx.fillText( estr  ,       290+ x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent1*fntpct+ 1) );
              ctx.fillText( estrBefore  , 290- mf(6*(fontcurrent1*fntpct+ 1)) + x1+ ( column1 * gDetailsEarnings_Xoff) ,  gDetails_Yoff + ii1* (fontcurrent1*fntpct+ 1) );
     	        ii1++;
    					 
				 cnt1++;

			}//for

   }//if

///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 
///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 
///////////////////////////////////////////////////////////////////////////////////////////////////// WATCHLIST 







// additional post process
    let tmprect={ x: gGlobalViewportRect.x +64, 
                  y: gGlobalViewportRect.y +mf(0.50*gGlobalViewportRect.h), 
                  w: gGlobalViewport1.w *2 ,  
                  h: mf(0.33*gGlobalViewport1.h)
                 }; 
    DrawAnalysis( tmprect );


}//fn


function DrawAnalysis(vrect){

return;
// if(gDrawSwitches==1) return;
        DrawOutlinedFilledRectWith2Text(vrect,'rgba(210,220,220,0.65)',jb_blue, 10,  
            gGET_SymbolStr+" Analysis:", 50, "#e5e5e5", 
            "(Not Investment Advice)" );

}











*/