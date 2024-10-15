  // Get the canvas and the 2D drawing context
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');



let gGlobalViewportRect = { x: -100 , y: -100 , w: 13 , h: 13 };
let gGlobalChartRect = { x: 50 , y: 75 , w: 160 , h: 34 };
let gGlobalChartRect1 = { x: 150 , y: 275 , w: 60 , h: 134 };
let gGlobalChartRect2 = { x: 150 , y: 275 , w: 60 , h: 134 };

let gGlobalChartRectCurrent = { x: 150 , y: 275 , w: 60 , h: 134 };
let gColScheme = { bg:'blue', up: 'green', dn:'red' };


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

function DrawChart(ctx,  vrect , colScheme ) {

    DrawVRect(ctx, vrect, 2, colScheme.bg , "solid");

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

            // Draw the rectangle
            let rcol=RandomColorC();
            DrawRectOutline(ctx, 6, 6,           rectWidth, rectHeight, 2, 'green');
            
            let vr =       { x0: 6 , y0: 6 , w0: rectWidth, h0: rectHeight };
            // DrawVRect(ctx, vr, 2, rcol, "outline");

            gGlobalChartRectCurrent.x = vr.x0 + 100;
            gGlobalChartRectCurrent.y = vr.y0 + 70;
            gGlobalChartRectCurrent.w = parseInt(vr.w0 * 0.75);
            gGlobalChartRectCurrent.h = parseInt(vr.h0 * 0.75);

            console.log( "preDrawChart()", gGlobalChartRectCurrent , gColScheme );
            DrawChart( ctx, gGlobalChartRectCurrent , gColScheme );
            // DrawRectOutline(ctx, 6, 6, rectWidth, rectHeight, 2, rcol );

            // ctx.beginPath();
            // ctx.rect(6, 6, rectWidth, rectHeight);
            // ctx.strokeStyle = 'black';
            // ctx.lineWidth = 2;
            // ctx.stroke();

            let rcol1=RandomColorC();

            DrawVRect(ctx, gGlobalChartRect, 2, 'blue', "solid");

            DrawVRect(ctx, gGlobalChartRect1, 2, rcol1, "solid");

            let wstr = canvas.width.toString();
            let hstr = canvas.height.toString();

            // Draw the canv size w,h
            // let dtstr = "w,h= ["+ canvas.width.toString() +","+ canvas.height.toString() +"]"  ;
            let dtstr = "w,h= ["+ wstr +","+ hstr +"]"  ;
            // console.log(dtstr);
            // let dtstrWidth = ctx.measureText(dtstr).width+ 0;
            let fsz = 24;
            ctx.fillStyle = rcol ; // "#113edd";        
            ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
            ctx.fillText( dtstr , 40, 40  );


/* 



               drawCandlestick(  o0, h0, l0, c0, dateStr, v0, pivotStr, pivot3Str , idx);
            
               drawCandlestickOnly(  o0, h0, l0, c0, nextdatestr, v0, pivotStr, pivot3Str , idx, 1);

               


function drawCandlestickOnly( open, hi, low, close, dateStr, vol, Pstr, P3str , rotFlag){ //}, volume ){
            
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

            drawCandlestickGeometryOnly( candleXnext, y, candleWidth, hCanvas, wHi, wLo, redOrGreen, priceStr, dateStr, Pstr, P3str , rotFlag, 24);
            
            CheckLocalCallouts(dateStr, candleXnext-candleWidth, y+mf(0.5*(wHi-wLo)) );
}//fn
        
        
var gPredictRed = "#551111";     // RED
var gPredictGreen ="#115511";    // GREEN     
        
var binarycnt=0;

function drawCandlestickGeometryOnly( x,y,w,h,wHi,wLo,rG,priceStr, dateStr, Pstr, P3str , rotFlag , fntsz){
        

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
                          if(binarycnt%1==0)  drawTextRotated(  dateStr1,    wickX+2, wHi-8 , "#8888aa", fntsz, "Arial");  //"Helvetica" ) ;
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
        