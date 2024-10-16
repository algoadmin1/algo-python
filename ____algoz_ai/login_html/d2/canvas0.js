//
//          canvas0.js  aka dr@wChart.js                   ver 202.4
//
//              BUGS:   NVDA Split MESSES up chart., SCALE date Print at bottom with vrect size
//
//
//              TO DO:  axes, gridlines,
//                      buy/Sell sig's, drawTriangle, 
//                      Monthly Sup/Resistance
//                      Weekly Sup/Resistance
//                      Draw Volume
//
//                      Draw price at high and at low
//
//                       white/blackFlip &scheme=, Black/WhiteText: gChartTextCol =
//
//                  **  End of Month Tracking, 0/1 ==> 0 or Xcoord of gWidthXmiddle (?)
//
                    //  ()  
//



    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');



let gGlobalViewportRect = { x: -100 , y: -100 , w: 13 , h: 13 };
let gGlobalChartRect = { x: 50 , y: 75 , w: 160 , h: 34 };
let gGlobalChartRect1 = { x: 150 , y: 275 , w: 60 , h: 134 };
let gGlobalChartRect2 = { x: 150 , y: 275 , w: 60 , h: 134 };

let gGlobalChartRectCurrent = { x: 150 , y: 275 , w: 60 , h: 134 };
let gColScheme =  { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple' };
let gColScheme0 = { bg:'black', tx: 'white', up: 'limegreen', dn:'red', ou:'purple' };

let gColScheme1 = { bg:'lightslategray',  tx: 'red', up: 'yellow', dn:'blue' , ou:'red' };

let gColScheme2 = { bg:'black',  tx: 'white', up: '#11ef43', dn:'purple' , ou:'green'};

let gColScheme3 =  { bg:'white',  tx: 'black', up: 'yellow', dn:'blue', ou:'red' };
let gColScheme4 = { bg:'black',  tx: 'green', up: 'limegreen', dn:'deeppink' , ou:'grey'};

let gColScheme5 =  { bg:'white',  tx: 'blue', up: 'green', dn:'red', ou:'red' };
let gColScheme6 =  { bg:'antiquewhite',  tx: 'blue', up: 'black', dn:'orange', ou:'orange' };

let gColScheme7 =  { bg:'white',  tx: 'blue', up: 'chocolate', dn:'hotpink', ou:'red' };
let gColScheme8 =  { bg:'blue',  tx: 'yellow', up: 'black', dn:'orange', ou:'grey' };

let gColScheme9 =  { bg:'black', tx: 'white', up: 'lawngreen', dn:'crimson', ou:'indianred' };
let gColScheme10 = { bg:'black', tx: 'mintcream', up: 'turquoise', dn:'peachpuff', ou:'magenta' };

// rnd one against black
let gColScheme99 = { bg:'black', tx: 'white', up: 'green', dn:'red', ou:'blue' };
let gColScheme100 = { bg:'white', tx: 'black', up: 'green', dn:'red', ou:'purple' };


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
    }else{
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










// '#ff4488'

function DrawChart(ctx,  vrect , colScheme, typestr ) {

    // DrawVRect(ctx, vrect, 2, colScheme.bg , "solid");
    DrawRoundedRect(ctx, vrect, 20, colScheme.bg, 3, 1);

    // DrawRoundedRect(ctx, vrect, radius, col, wt, fill);
    DrawRoundedRect(ctx, vrect, 20, colScheme.ou, 3, 0);

    if(typestr=="candles")   DrawCandlesChart(ctx,  vrect , colScheme, 2);
      else if(typestr=="line")   DrawLineChart(ctx,  vrect , colScheme, 3, "close");  // or P P3 to plot

}
/*

*/
//globals
let gGlobalDrawCol = 'black';
let gChartTextStr ="Welcome!";
let gSymbolStr    ="SPY";
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


        
function DrawCandlesChart( ctx,  vrect , colScheme, wt ){
    let cw= canvas.width;
    let ch= canvas.height;
    let cnt = processedData.length;   /// == NaN ???


//  ##############################################################################
//  ######  MAKE A FUNCTION ...     SetCandleGlobals         #####################
//  ##############################################################################
    
                                                    // let vect2 = { ...vect };   // example
    gCandlesMaxes = { ...gCandlesMaxesInit };      // init the global vector

    
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
            gLastPriceStr  = processedData[date]["close"];
            // let lastDay       = processedData[date]["dayOfWeek"];
            i++;
        }
    }
    gNumCandlesToRender = i;
    gCandlesMaxes.num2render = gNumCandlesToRender ;
    gCandlesMaxes.priceRange = gCandlesMaxes.priceHigh - gCandlesMaxes.priceLow;
    gCandlesMaxes.srRange    = gCandlesMaxes.srHigh    - gCandlesMaxes.srLow;
    gCandlesMaxes.volRange   = gCandlesMaxes.volHigh   - gCandlesMaxes.volLow;
    console.log("] POST calcs, gCandlesMaxes   =", gCandlesMaxes );

//  ############################################################################## should be a fn

    gChartTextStr = gSymbolStr +" "+ gPeriodStr+" Last: "+gCurrencyStr +gLastPriceStr ; 


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

    

//
//  DEL, depricate
//
// Draw the  SAMPLE rectangle
    // let newcol=RandomColorC();
// newcol = 'black';
    // DrawRectOutline(ctx, gCandleXnext, vrect.y+20,  gCandleWidth, (vrect.h/3), 2, newcol );
    // // DrawVRect(ctx, vrect, 4, colScheme.ou , "outline");
   
    


    let newcol=RandomColorC();



    let j=0;
    for (var date in processedData) {
        if (processedData.hasOwnProperty(date)) {
            let datestr= date;
            let op1 = parseFloat(  processedData[date]["open"] );
            let hi1 = parseFloat(  processedData[date]["high"] );
            let lo1 = parseFloat(  processedData[date]["low"] );
            let cl1 = parseFloat(  processedData[date]["close"] );
            let vol1 = parseFloat(  processedData[date]["volume"] );

            gLastDateStr    = date;

            DrawCandlePlus(ctx, vrect, colScheme,  j, datestr, op1, hi1, lo1, cl1, vol1 );    // uses gCandlesMaxes

            // console.log( j+") " + datestr + ":  nextX="+ gCandleXnext  + ";  H, L, Close= " + processedData[date]["high"] + ", " + processedData[date]["low"] + ", "+ processedData[date]["close"] + " "+   processedData[date]["dayOfWeek"]);
            
            gCandleXnext =   gCandleXnext +  gCandleWidth + gCandleOffset ;
            j++;
        }
    }//for

    gCandleXnextLast =   gCandleXnext;

// #################################  END OF CANDLESLOOP 


    // DrawSegmentedLine(ctx, processedData, vrect, 3, 'green', "solid", gCandleXnextStart,   (  gCandleWidth + gCandleOffset ), "close") ;

    DrawSegmentedLine(ctx, processedData, vrect, 2, 'cyan',   "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P") ;
    DrawSegmentedLine(ctx, processedData, vrect, 2, 'yellow', "solid", gCandleXnextStart, (  gCandleWidth + gCandleOffset ), "P3") ;

    // ie AAPL Last: $xxx
    DrawTextInfo( ctx , vrect , 48 ,  24, colScheme);


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

function DrawCandlePlus( ctx, vrect,  colScheme, idx, datestr, op1, hi1, lo1, cl1, vol1  ){

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
    DrawVerticalLine( ctx, xwick, yh, yl, 'grey');
    // DrawVerticalLine( ctx, xwick, yh, yl, colScheme.wi);  // wick col scheme

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
    DrawVRect(ctx, candleRect, 2, col1 , "solid");

    // draw everything else assoc with that candle
    DrawOtherStuff(ctx , vrect , idx, colScheme,  candleRect, candleGreen);

}// fn Dr@wCandlePlus(...)


function  DrawOtherStuff( ctx  , vrect, idx , colScheme , candlerect, candleGreen ){   // candleGreen==1 if UP
    if(idx%4==0) DrawDate( ctx  , vrect , colScheme);
    DrawVolume( ctx  ,  vrect, idx , colScheme , candlerect, candleGreen  );   

    
    if(idx%12==0) DrawTriangle(ctx, 20, 3, 'green', gCandleWickX, candlerect.y+candlerect.h, 0, 1, 'limegreen' );
    if(idx%9==0)  DrawTriangle(ctx, 20, 3, 'red', gCandleWickX, candlerect.y, 1, 1, 'hotpink' );
    

    // let cirOutline = RandomJSColor(colarr);
    // let cirFill    = RandomJSColor(colarr);
    // if(idx%7==0) DrawCircle(ctx, 40, 6, cirOutline, gCandleWickX, (candlerect.y+candlerect.h) , 0, 1, cirFill );


}



function  DrawTextInfo( ctx , vrect, offset , fsz, colScheme ){
    // DrawText( ctx, gChartTextStr,  vrect.x+offset, vrect.y+offset, fsz , gGlobalDrawCol , gGlobalFont);
    DrawText( ctx, gChartTextStr,  vrect.x+offset, vrect.y+offset, fsz , colScheme.tx , gGlobalFont);
}
function DrawText( ctx, txtStr, x, y, fsz , colStr , fontStr){    
    ctx.fillStyle = colStr ; 
    ctx.font =  fsz.toString() + "px "+ fontStr ;        // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( txtStr , x,  y  );   
}
function DrawDate( ctx , vrect, colScheme){  // designed to be called during Rendering
    DrawTextRotated( ctx, gLastDateStr, gCandleWickX, (vrect.y+vrect.h), colScheme.tx, 12, gGlobalFont, -0.275);
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

function  DrawVolume(  ctx ,  vrect, idx , colScheme , candlerect, candleGreen  ){
    // let x0=gCandleWickX;
    let x0 = gCandleXnext    ; //  gCandleWickX;

    let volcol = colScheme.dn;
    if(candleGreen==1){
        volcol = colScheme.up;
    }
    let volht = parseInt(idx/3);  // HERE *** COMPUTE VOLUME based on   :    gCandlesMaxes {  .volrng }

    let vrectVol = {   x: x0 , y: (( vrect.y+vrect.h ) - volht ),      w: candlerect.w,   h: volht };

    DrawVRect(ctx, vrectVol, 1, volcol, "solid" );

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
    const adjustedX = x + xyOffset;
    const adjustedY = y + xyOffset;
    const radius = size / 2;

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


function DrawHorizontalLine( ctx, x1, x2, y ,col){
    DrawLine(ctx, x1, y, x2, y, 2, col, "solid");
}
function DrawVerticalLine( ctx, x, y1, y2 , col){
    DrawLine(ctx, x, y1, x, y2, 2, col , "solid");
}

function DrawLine(ctx, x, y, x1, y1, weight, color, style) {
    // DEL:   //  const ctx = c.getContext('2d');
    
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

    return scheme0; 
}










        // Function to resize canvas and redraw the rectangle
function resizeCanvas() {
            // Set canvas width and height to match the div's size
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set the rectangle dimensions 6px inside the canvas borders
            const rectWidth = canvas.width - 12; // 6px margin on both sides
            const rectHeight = canvas.height - 12; // 6px margin on both sides

            let rcol=RandomColorC();

            // DEL depr
            // // Draw rnd rectangle
            // DrawRectOutline(ctx, 6, 6,           rectWidth, rectHeight, 2, 'green');
            

            let vr =       { x0: 6 , y0: 6 , w0: rectWidth, h0: rectHeight };
            // DrawVRect(ctx, vr, 2, rcol, "outline");

            gGlobalChartRectCurrent.x = vr.x0 +  parseInt(vr.w0 * 0.05);
            gGlobalChartRectCurrent.y = vr.y0 +  parseInt(vr.h0 * 0.05);
            gGlobalChartRectCurrent.w = parseInt(vr.w0 * 0.75);
            gGlobalChartRectCurrent.h = parseInt(vr.h0 * 0.75);

            console.log( "preDr@wChart()", gGlobalChartRectCurrent , gColScheme );

            let colscheme = GetColorScheme();
            DrawChart( ctx, gGlobalChartRectCurrent , colscheme , "candles" );   
            // DrawChart( ctx, gGlobalChartRectCurrent , colscheme , "line" );  


            // DrawRectOutline(ctx, 6, 6, rectWidth, rectHeight, 2, rcol );

            // Dra wLine(ctx, 6, 6, rectWidth, rectHeight, 5, 'red', 'dotted' );   //'dashed');

            // ctx.beginPath();
            // ctx.rect(6, 6, rectWidth, rectHeight);
            // ctx.strokeStyle = 'black';
            // ctx.lineWidth = 2;
            // ctx.stroke();

            let rcol1=RandomColorC();

            // DrawVRect(ctx, gGlobalChartRect, 2, 'blue', "solid");
            // DrawVRect(ctx, gGlobalChartRect1, 2, rcol1, "solid");

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







//   DrawTriangle( xx1, yy1, 28, arrowgreenColor, SellSignalOO , arrayitem.udate, arrayitem.p.toFixed(2).toString()+" "+ arrayitem.udate.substring(5,10), "" );
/*

// note direction of triangle is based on     if(grStr==arrowgreenColor  ||  grStr==arrowgreenColor1  ){
//
//
function DrawTriangle( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr ){
  let specialstr="";
  
  // specialstr="silver";
  // DrawTriangle1( x0, y0, size0*1.532, grStr, numcandles0, dateStr0  , pricestr, dateStr, specialstr );


   specialstr="";   // normal
  DrawTriangle1( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr, specialstr );

}

function DrawTriangle1( x0, y0, size0, grStr, numcandles0, dateStr0  , pricestr, dateStr, specialstr ){
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

        if(specialstr=="silver") y0 -=50;
        y0 = y0+(size0_753* 2);
        
        ctx.moveTo(xx1, y0-(size0_753* 0) );
        ctx.lineTo(xx2, y0-(size0_753* 0) );
        
        ctx.lineTo(x0,  y0-(size0_753* 1) );
        
        ctx.lineTo(xx1, y0); //+(size0_753* 2) );

    }else{   // ie Red , ==  SELL SIGNAL

       bearishBullish =-1;   //set it explicitly again -1 = bearish
       
       if(specialstr=="silver") y0 +=50;
       y0 = y0-(size0_753* 2);

        ctx.moveTo(xx1, y0+(size0_753* 0) );
        ctx.lineTo(xx2, y0+(size0_753* 0) );
        
        ctx.lineTo(x0,  y0-(size0_753* -1) );
        
        ctx.lineTo(xx1, y0+(size0_753* 0) );

    }
    
//    ctx.lineTo(xx1, y0 );
    ctx.lineWidth = 10;
    ctx.strokeStyle = grStr;
   if(specialstr=="silver") ctx.strokeStyle = "#99ffee"; // = grStr;

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



*/
/* 

               draw Candlestick(  o0, h0, l0, c0, dateStr, v0, pivotStr, pivot3Str , idx);
            
               draw CandlestickOnly(  o0, h0, l0, c0, nextdatestr, v0, pivotStr, pivot3Str , idx, 1);

function drawC andlestickOnly( open, hi, low, close, dateStr, vol, Pstr, P3str , rotFlag){ //}, volume ){
            
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
            priceStr = gCurre ncyStr+close.toString( );    // close str

            drawCan dlestickGeometryOnly( candleXnext, y, candleWidth, hCanvas, wHi, wLo, redOrGreen, priceStr, dateStr, Pstr, P3str , rotFlag, 24);
            
            CheckLocalCallouts(dateStr, candleXnext-candleWidth, y+mf(0.5*(wHi-wLo)) );
}//fn
        
        
var gPredictRed = "#551111";     // RED
var gPredictGreen ="#115511";    // GREEN     
        
var binarycnt=0;

function drawC andlestickGeometryOnly( x,y,w,h,wHi,wLo,rG,priceStr, dateStr, Pstr, P3str , rotFlag , fntsz){
        

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
                if (rG==0) ctx.fillStyle =gPredictRed;  //"#a82222";     // RED
                else ctx.fillStyle =gPredictGreen;      //"#22a822";          // GREEN

             if(dateStr==gFOMCDateStr) ctx.fillStyle = jb_purple; 
             if(dateStr==gEarningsCorpDateStr ) ctx.fillStyle =jb_orange ;

// then fill the   rectangle    -  candlestick drawn !
                ctx.fillRect(x,y, w,h);
    
//    ctx.fillStyle = "#ff9966";
  //  ctx.fillRect(x,Ybottom-200, w,h);
    
                ctx.fillStyle = "#555566";
                ctx.font = "12px Arial";
                
                var priceY = (y+h+10 );
                if( rG==1 ) priceY = ( y - 6 );
       // ctx.fillText( priceStr,wickX+4, priceY );   // price at close
                
                //ctx.rotate(20*Math.PI/180);

                binarycnt++;

                var dateStr1 = dateStr.substring(5, 10);
      // ctx.fillText( dateStr1, wickX+2, Ybottom*1.015 );  // date
                if( GetDayOfWeek(dateStr).toLowerCase()=="mon"){
                    if(rotFlag==0){     

                            ctx.fillText( dateStr1, wickX+2, wHi-8 );  // date
                        
                        }else{
                          if(binarycnt%1==0)  draw TextRotated(  dateStr1,    wickX+2, wHi-8 , "#8888aa", fntsz, "Arial");  //"Helvetica" ) ;
                        }
                }

// update master X for next candlestick
                candleXnext = candleXnext + candleWidth + candleOffset ;
               
                
// // set globals on the way out for predictive 'next month's S1-R3'
//                 gLastMonthNum = lastMonth;
//                 gThisMonthX = thisMonthX;
//                 gDiffM = diffM; 

  }//fn


function GetYCoordFromPrice( priceInput ){
            // i.e. price range = $15 - $95 = 80,   ie $26-$15 = $11,  11/80 ~= 0.125 * Yrange (300) ~= $32.50
            
            var Ycanvas = YRange - (  ((priceInput - candlesPriceBoundsMin) / candlesPriceRange)  * YRange  ) ;
            
            Ycanvas += gGlobalViewportRect.y;
            return( Ycanvas ); 

 }//fn

*/

        }

        // Resize the canvas when the window is resized
        window.addEventListener('resize', resizeCanvas);

        // Initial resize to set up the canvas
        resizeCanvas();
        