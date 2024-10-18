//          canvas0.js  aka dr@wChart.js                  
//

let                                                                         gVer = "233.54";

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
///                  NOTE !!! draw candles is computing his and lows CIRCLES that DrawLines is NOT !!!
//
//                    CRONjob:  cronit.php : loops thru a list, writes file etc
//                          
//

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');


let gAxesCol0= "#454595" ;

let gGlobalViewportRect = { x: -100 , y: -100 , w: 13 , h: 13 };
let gGlobalChartRect = { x: 50 , y: 75 , w: 160 , h: 34 };
let gGlobalChartRect1 = { x: 150 , y: 275 , w: 60 , h: 134 };
let gGlobalChartRect2 = { x: 150 , y: 275 , w: 60 , h: 134 };

let gGlobalChartVRectCurrent = { x: 150 , y: 275 , w: 60 , h: 134 };   // init w/ dummy values

let gGlobalChartVRect_Xoff_pct  = 0.05;
let gGlobalChartVRect_Yoff_pct  = 0.05;
let gGlobalChartVRect_w_pct  = 0.85;
let gGlobalChartVRect_h_pct  = 0.75;


let gVolumePixelHigh_pct= 0.125;

// col $chemes
let gColScheme =  { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme0 = { bg:'black', tx: 'white', up: 'limegreen', dn:'red', ou:'purple' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };

let gColScheme1 = { bg:'lightslategray',  tx: 'red', up: 'yellow', dn:'blue' , ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme2 = { bg:'black',  tx: 'white', up: '#11ef43', dn:'purple' , ou:'green', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };

let gColScheme3 =  { bg:'white',  tx: 'black', up: 'yellow', dn:'blue', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme4 = { bg:'black',  tx: 'green', up: 'limegreen', dn:'deeppink' , ou:'grey', wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme5 =  { bg:'white',  tx: 'blue', up: 'green', dn:'red', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme6 =  { bg:'antiquewhite',  tx: 'blue', up: 'black', dn:'orange', ou:'orange' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme7 =  { bg:'white',  tx: 'blue', up: 'chocolate', dn:'hotpink', ou:'red' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };
let gColScheme8 =  { bg:'blue',  tx: 'yellow', up: 'black', dn:'orange', ou:'grey' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

let gColScheme9 =  { bg:'black', tx: 'white', up: 'lawngreen', dn:'crimson', ou:'indianred' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme10 = { bg:'black', tx: 'mintcream', up: 'turquoise', dn:'peachpuff', ou:'magenta' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };

// rnd one against black
let gColScheme99 = { bg:'black', tx: 'white', up: 'green', dn:'red', ou:'blue' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'brown', ax: 'lightskyblue' };
let gColScheme100 = { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple' , wi:'#6a6a6a', p:'blue', p3: 'yellow', tx1: 'green', ax: 'lightskyblue' };


let gSupResColors = {  r4: 'darkred', r3: 'darkred', r2: '#9f2222'  , r1: '#ef2222' , s1: 'lawngreen' , s2: 'green', s3: 'darkgreen', s4: 'darkgreen'  };



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
    DrawRoundedRect(ctx, vrect, 20, colScheme.bg, 3, 1);
    // DrawRoundedRect(ctx, vrect, radius, col, wt, fill);
    DrawRoundedRect(ctx, vrect, 20, colScheme.ou, 3, 0);

   // this will test for butt0n1==0
   DrawCandlesChart(ctx,  vrect , colScheme, 2);  /// NOTE !!! draw candles is computing his and lows that DrawLines is NOT !!!
   // this will test for butt0n1==1
   if(typestr=="line")   DrawLineChart(ctx,  vrect , colScheme, 3, "close");  // or P P3 to plot


   // pivot / p3 lines
    if( button5==1 || button5==2  ) DrawSegmentedLine(ctx, processedData, vrect, 2, 'blue',   "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P") ;
    if( button5==2)                 DrawSegmentedLine(ctx, processedData, vrect, 2, 'yellow', "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P3") ;
    
    let fszDyn = parseInt( vrect.w * 0.025 );
    let xoff = 80;
    let yoff = 48;
    let fname ="../img/"+gSymbolStrLower+ ".png";

    DrawGlobalTextInfo( ctx , vrect ,  xoff, yoff ,  fszDyn, colScheme);

    InitAndDrawImage(ctx, vrect, fname, xoff, yoff+20, 0.425 ); 

}
// globals
let gGlobalDrawCol = 'black';
let gChartTextStr ="Welcome!";

let gSymbolStr    ="SPY";
let gSymbolStrLower='spy';

let gPeriodStr = "(Daily)";
let gCurrencyStr="$";
let gLastPriceStr ="0.00";
let gLastDateStr ="1900-01-01";
let gGlobalFont= "Arial";

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
                          priceHighX: 0, priceHighY: 0,  priceLowX: 0, priceLowY: 0   };

let gCandlesMaxes     = { num2render: 1, priceHigh: 0, priceLow: 1000000, priceRange: 0,  
                          srHigh: 0, srLow: 1000000,  srRange: 0,  volHigh: 0, volLow: 1000000,  volRange: 0 ,
                          priceHighX: 0, priceHighY: 0,  priceLowX: 0, priceLowY: 0   };


function DrawChartAxes( ctx,  vrect , colScheme, wt ){
    let yy =0 ;
    let iyOff = 50;  // every 10 pixels
    let yyMax = vrect.h;


    for(iy=yyMax; iy>yy; iy=iy-iyOff){
        let txtStr = "[ # "+iy.toString()+" ]";

        // sr0price = parseFloat( processedData[date]["S1month"] ).toFixed(2);
        // txtStr    = gCurrencyStr+ sr0price.toString() + " (S1)";
        // sr0Y     = GetYCoordFromPrice( sr0price, vrect );
        // DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.s1 ,  "dashed" , txtStr, fsz, xyoff, fontStr);


        DrawHorizontalLine_callout(ctx, vrect.x, vrect.x+vrect.w, iy , gAxesCol0 ,  "dotted" , txtStr, 12, -6, "Helvetica");

    }

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









function DrawCandlesChart( ctx,  vrect , colScheme, wt ){
    let cw= canvas.width;
    let ch= canvas.height;
    let cnt = processedData.length;   /// == NaN ???


//  ##############################################################################
//  ######  MAKE A FUNCTION ...     SetCandleGlobals         #####################
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
            if(hi>gCandlesMaxes.priceHigh ) gCandlesMaxes.priceHigh = hi;  
            if(lo<gCandlesMaxes.priceLow  ) gCandlesMaxes.priceLow  = lo;

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

    gChartTextStr = gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr + " as of "+ datestr0+"    v"+gVer+" php_v"+gVerPHP; 
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

    // console.log(processedData); // This will log the PHP data to the console

    let newcol=RandomColorC();

    let last_date_key="nil";  // DERP




    DrawChartAxes( ctx,  vrect , colScheme, wt );


// ################################################# RENDER CANDLES

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
                        //    DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.r2 ,  "dashed" );
                           DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.r2 , "dashed" , txtStr, fsz, xyoff, fontStr);

                          sr0price = parseFloat( processedData[date]["R1month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (R1)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                        //   DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.r1 ,  "dashed" );
                        DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.r1 , "dashed" , txtStr, fsz, xyoff, fontStr);
                        

                          sr0price = parseFloat( processedData[date]["S1month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (S1)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.s1 ,  "dashed" , txtStr, fsz, xyoff, fontStr);

                          sr0price = parseFloat( processedData[date]["S2month"] ).toFixed(2);
                          txtStr    = gCurrencyStr+ sr0price.toString() + " (S2)";
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                        //   DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.s2 ,  "dashed" );
                          DrawHorizontalLine_callout(ctx, x1m, x2m, sr0Y , gSupResColors.s2 ,  "dashed" , txtStr, fsz, xyoff, fontStr);


                          sr0price = parseFloat( processedData[date]["S3month"] ).toFixed(2);
                          sr0Y     = GetYCoordFromPrice( sr0price, vrect );
                          DrawHorizontalLine(ctx, x1m, x2m, sr0Y , gSupResColors.s3 ,  "dashed" );
                
                    }//if butt0n

            }


            DrawCandlePlus(ctx, vrect, colScheme,  j, datestr, op1, hi1, lo1, cl1, vol1 , eom);    // uses gCandlesMaxes
            // console.log( j+") " + datestr + ":  nextX="+ gCandleXnext  + ";  H, L, Close= " + processedData[date]["high"] + ", " + processedData[date]["low"] + ", "+ processedData[date]["close"] + " "+   processedData[date]["dayOfWeek"]);
            
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
}

// ai-written: Helper function to convert a price into a y-coordinate based on the vrect (viewport)
// function GetYCoordFromPrice(price, vrect) {
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
function GetYCoordFromPrice( priceInput, vrect ){
    // i.e. price range = $15 - $95 = 80,   ie $26-$15 = $11,  11/80 ~= 0.125 * Yrange (300) ~= $32.50
    let yrange = vrect.h;
    // old... // let Ycanvas = yrange - (  ((priceInput - candlesPriceBoundsMin) / candlesPriceRange)  * yrange  ) ;
    //           let Ycanvas = yrange - (  pricePctFloat  * yrange  ) ;

    let yrangeFloat= parseFloat( yrange );

    let pricePctFloat = ((priceInput - gCandlesMaxes.srLow) / gCandlesMaxes.srRange);  // all floats
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
   if(button2==0){ 
    // buy and sell signals
    if(idx%12==0) DrawTriangle(ctx, 20, 3, 'green', gCandleWickX, candlerect.y+candlerect.h, 0, 1, 'limegreen' );
    if(idx%9==0)  DrawTriangle(ctx, 20, 3, 'red', gCandleWickX, candlerect.y, 1, 1, 'hotpink' );
   }

    // let cirOutline = RandomJSColor(colarr);
    // let cirFill    = RandomJSColor(colarr);
    // if(idx%7==0) DrawCircle(ctx, 40, 6, cirOutline, gCandleWickX, (candlerect.y+candlerect.h) , 0, 1, cirFill );


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
    let imgWidth = img.width * scale;  // Scale the width
    let imgHeight = img.height * scale; // Scale the height

    // Draw the image at position (x, y) with the scaled width and height
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
}


function  DrawGlobalTextInfo( ctx , vrect, xoffset, yoffset , fsz, colScheme ){
    // DrawText( ctx, gChartTextStr,  vrect.x+offset, vrect.y+offset, fsz , gGlobalDrawCol , gGlobalFont);
    DrawText( ctx, gChartTextStr,  vrect.x+xoffset, vrect.y+yoffset, fsz , colScheme.tx , gGlobalFont);
}

function DrawText( ctx, txtStr, x, y, fsz , colStr , fontStr){ 

    let vrect = gGlobalChartVRectCurrent;        
    let vectXY  = { x: x,  y: y };
    let vectXY_clipped  = { x: 0,  y: 0  };
    vectXY_clipped   = ClipPoint(ctx, vrect, vectXY);  
    x = vectXY_clipped.x;
    y = vectXY_clipped.y;


    ctx.fillStyle = colStr ; 
    ctx.font =  fsz.toString() + "px "+ fontStr ;        // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( txtStr , x,  y  );   
}
function DrawDateRotated( ctx , vrect, colScheme, rotfl){  // designed to be called during Rendering
    // DrawTextRotated( ctx, gLastDateStr, gCandleWickX, (vrect.y+vrect.h), colScheme.tx, 12, gGlobalFont, -0.275);
    DrawTextRotated( ctx, gLastDateStr, gCandleWickX + 4, (vrect.y+ parseInt(vrect.h *0.90) ), colScheme.tx, 12, gGlobalFont, rotfl );
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
// function DrawTriangle(ctx, size, wt, col, x, y, upDown, fill, fillcol ,     txtStr, xt, yt, fsz , colStr , fontStr) {  
    // DrawText( ctx, txtStr, x, y, fsz , colStr , fontStr)
function DrawTriangle(ctx, size, wt, col, x, y, upDown, fill, fillcol ) {   
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



function DrawCircle(ctx, size, wt, col, x, y, xyOffset, fill, fillcol) {
    // Adjust the x and y positions based on the offset
    var adjustedX = x + xyOffset;
    var adjustedY = y + xyOffset;
    const radius = size / 2;


    let vrect = gGlobalChartVRectCurrent;        
    let vectXY  = { x: adjustedX,  y: adjustedY }; 
    let vectXY_clipped  = { x: 0,  y: 0  };
    vectXY_clipped   = ClipPoint(ctx, vrect, vectXY);  
    adjustedX = vectXY_clipped.x;
    adjustedY = vectXY_clipped.y;


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
}

/*
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a circle with a green border and no fill, offset by 10 pixels
DrawCircle(ctx, 100, 5, 'green', 150, 150, 10, 0, '');

// Draw a filled red circle, offset by 20 pixels, with a black border
DrawCircle(ctx, 100, 3, 'black', 300, 150, 20, 1, 'red');
*/


function DrawHorizontalLine_callout( ctx, x1, x2, y ,col,  style, txtStr, fsz, xyoff, fontStr){
    DrawLine( ctx, x1, y, x2, y, 2, col,  style);

    DrawText( ctx, txtStr, x2+xyoff, y, fsz , col , fontStr);

}


function DrawHorizontalLine( ctx, x1, x2, y ,col,  style){
        DrawLine(ctx, x1, y, x2, y, 2, col,  style);
}
function DrawVerticalLine( ctx, x, y1, y2 , col, style){
        DrawLine(ctx, x, y1, x, y2, 2, col ,  style );
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
 

gAxesCol0=  scheme0.ax ;
gAxesCol0= "#454595" ;  // override  DEL to get .ax

    return scheme0; 
}


// fibonacci  5 incl 50% retracement
// var gFibSeq = [
//       0.236,
//       0.382,
//       0.500,
//       0.618,
//       0.786

//       ];
//
//      drawFibonacci(candles52WeekHigh, candles52WeekLow);

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




/*
function   drawFibonacci(hi,lo){
if(gDrawFib==0) return;

let xoff0 = 500;

var i;
var delta = hi-lo;
var fiblen = gFibSeq.length;
var fiblvl = 0;
var fibpct = 0;
var fiby = 0;
let x1 = 0, x2=0, y1=0,y2=0;
let deltax1=0;
let hiFirst =1;
let fibstr1="";
let fibstr2="";
let fibfntsz=72;

// let fibcol1 = 'rgba(150,150,180,0.65)' ;
// let fibcol2 = 'rgba( 10,210,230,0.65)' ;    // cyan ish
// let fibcol3 = 'rgba(232, 209, 93,0.65)' ;   // yellow ish

// let fibcol1a = 'rgba(150,150,180,1.0)' ;
// let fibcol2a = 'rgba( 10,210,230,1.0)' ;    // cyan ish
// let fibcol3a = 'rgba(232, 209, 93,1.0)' ;   // yellow ish

// console.log("gDrawFib=", gDrawFib);
// console.log("hi,lo,delta=", hi, lo, delta);


  if(gFibLo.x1 < gFibHi.x1){
        x1= gFibLo.x1;
        y1 = gFibLo.y1;

        x2= gFibHi.x1;
        y2= gFibHi.y1;
        hiFirst =0;

    }else{
         x1= gFibHi.x1;
         y1 = gFibHi.y1;

         x2= gFibLo.x1;
         y2= gFibLo.y1;
         hiFirst =1;

    }


ctx.beginPath();
    ctx.setLineDash([ 20, 15]);

  ctx.strokeStyle=fibcol1; // "#9999aa";   
  ctx.lineWidth = 6;
  ctx.moveTo( x1,y1  );
  ctx.lineTo( x2,y2  ) ; 
  ctx.stroke();
    ctx.setLineDash([]);
ctx.closePath(); 



for(i=0;i<fiblen;i++){
    // console.log("Fib",i, gFibSeq[i] );

    fiblvl = ( ( gFibSeq[i] * delta ) + lo ).toFixed(2) ;
    // console.log("Fiblvl_"+i.toString()+"=", fiblvl);

    fiby = mf( GetYCoordFromPrice( fiblvl ) );     //.toFixed(0);
    // console.log("Fib Y"+i.toString()+"=", fiby);
// candlesClamp  ???

    deltax1=(x2-x1)/7;
    if(hiFirst==1)  x1off= x1 + deltax1*(5-i+1) - xoff0;
        else x1off= x1 + deltax1*(i+1) - xoff0 ;


    fibstr2 = "("+((gFibSeq[i]*100).toFixed(1)).toString() +"%)    "+gCurrencyStr+fiblvl.toString();
    fibstr1 =  gCurrencyStr+fiblvl.toString() + "    ("+((gFibSeq[i]*100).toFixed(1)).toString() +"%)" ;


 if(i==1 || i==3){  
    DrawHorizontalLine( x1off, x1off+g52WeekXlen, fibcol3,  fiby  , 8  );
    drawText( fibstr1, x1off+25, fiby-16 , fibfntsz,  fibcol3a );
    drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby-16 , fibfntsz,  fibcol3a );
   

   }else if( i==2 ){  
    DrawHorizontalLine( x1off, x1off+g52WeekXlen, fibcol1,  fiby  , 8  );
    drawText( fibstr1, x1off+25, fiby-16 , fibfntsz,  fibcol1a );
    drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby-16 , fibfntsz,  fibcol1a );
   

   }else{ 
    DrawHorizontalLine( x1off, x1off+g52WeekXlen, fibcol2,  fiby  , 8  );
    drawText( fibstr1, x1off+25, fiby-16 , fibfntsz, fibcol2a  );
    drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby-16 , fibfntsz,  fibcol2a  );
    }

}//for

let tmpvar=0;

// lo
    fiblvl= lo.toFixed(2);
    fibstr2 = "(0%)    "+gCurrencyStr+fiblvl.toString();
    fibstr1 =  gCurrencyStr+fiblvl.toString() + "    (0%)" ;
    fiby = mf( GetYCoordFromPrice( lo ) );   

 // drawText( fibstr1, x1off+25, fiby-16 , fibfntsz,  fibcol1a );
 drawText( fibstr1, x1off-250, fiby-16 , fibfntsz,  fibcol4a );
 drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby-16 , fibfntsz,  fibcol1a );

   tmpvar =gFibLo.x1;
   // if(x1off<tmpvar) DrawHorizontalLine( x1off, tmpvar, fibcol4,  fiby  , 18  );
     DrawHorizontalLine( x1off, tmpvar, fibcol4,  fiby  , 18  );
// hi
    fiblvl= hi.toFixed(2);
    fibstr2 = "(100%)    "+gCurrencyStr+fiblvl.toString();
    fibstr1 =  gCurrencyStr+fiblvl.toString() + "    (100%)" ;

    fiby = mf( GetYCoordFromPrice( hi ) );   
    drawText( fibstr1, x1off+25, fiby+4+fibfntsz , fibfntsz,  fibcol1a );
    drawText( fibstr2, x1off+mf(g52WeekXlen*0.725), fiby+4+fibfntsz , fibfntsz,  fibcol1a );
   


}//fn fib



*/


        // Function to resize canvas and redraw the rectangle
function resizeCanvas() {

    console.log("]  inside .js:  r3sizeCanvas():  button1...10 ==", button1, button2, button3, button4,
         button5, button6, button7, button8, button9, button10 );  

            // Set canvas width and height to match the div's size
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            let colscheme = GetColorScheme();

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
            // let dtstrWidth = ctx.measureText(dtstr).width+ 0;
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
                    window.dispatchEvent(new Event('button4'));
                    break;
                case 5:
                    // button5 = (button5 === 1) ? 0 : 1;
                    if(button5==0) button5=1;
                     else if(button5==1) button5=2;
                      else  if(button5==2) button5=0;
                    window.dispatchEvent(new Event('button5'));
                    break;
                case 6:
                    button6 = (button6 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button6'));
                    break;
                case 7:
                    button7 = (button7 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button7'));
                    break;
                case 8:
                    button8 = (button8 === 1) ? 0 : 1;
                    window.dispatchEvent(new Event('button8'));
                    break;
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
 
        
*/