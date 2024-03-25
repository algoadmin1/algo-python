
// this is the actual array whose strings are displayed
//
var timetotrade3 = [
//0
                    "-Bearish",         "Stock Trending", "+Bullish",

                    "-Short",            "Almanac Long S&P",     "+Long",
                    "-High",             "52-Week",     "+Low",

//4  gIndicatorsOffsetLONGreserved =3;
                    "-Bad",             "Rsrvd[Earnings]",     "+Good",
                    "-Street Bearish",   "Rsrvd[YieldCrv]",     "+Street Bullish",
                  

                    "-Normal",         "RVOL",        "+Breakout",
                    "-OverBOUGHT",        "Rsrvd[RSI]",        "+OverSOLD",

 
//7  gIndicatorsOffsetLONG =7;
                 //   "No",         "+[*Bullish Pennant*]", "+Formed",
                    "No",         "+***[AVG BULL]***", "+Bullish",
                    "No",         "+Buy Signal", "+Yes",
                    "No",            "+Hi-Close Doji", "+Yes",
                    "No",     "+at S1 Support","+Yes",
                    "No",     "+below GAP down","+Yes",

                    
// 12  gIndicatorsOffsetSHORT=12;                 
              //      "No",         "-[*Bearish Wedge*]", "-Formed",
                    "No",         "-***[AVG BEAR]***", "-Bearish",
                    "No",         "-Sell Signal", "-Yes",
                    "No",             "-Low-Close Doji", "-Yes",
                    "No",         "-at R1 Resistance", "-Yes",
                    "No",     "-above GAP Up","-Yes",
                    
                    "Low",             "END",     "High",
                    
                    ];



var tttCols = [ '#EE1111', '#ffff00', '#40ff00' ];

var ttt3Len = timetotrade3.length;
var ttt3Offset = 3;

var gDashboardPctX = 0;
var gDashboardPctY = 0;

var  gPercentIndicatorAvg=0;
var  gPercentIndicatorAvgLONG=0;
var  gPercentIndicatorAvgSHORT=0;

var  gNumberOfIndicators=0;      // computed in loop (==ii  at end of loop)

var  gNumberOfIndicatorsLONG =(12 - 4);  // 4 reserved
var  gNumberOfIndicatorsSHORT=(12 - 4);  // 4 reserved

var  gIndicatorsOffsetALL  =0;    // timetotrade3 idx/3
var    gIndicatorsOffsetLONGreserved=3;     // offset to reserved (4)
var    gIndicatorsOffsetLONG =7;    // timetotrade3 idx/3
var  gIndicatorsOffsetSHORT=12;   // timetotrade3 idx/3
 
var  gDummy=0;

// this is the w for the gauge
var canvasGaugeWidth = 500;

var gLinewidth = 100;


var gGaugeXStartArc= 250;   // x start of arc meter
var gGaugeXStart= 100;       // x start of horiz meters

var gIndicatorMeterWidth =300;


//
//  to be called from candlesticks.js   or for now, dashboard.php
//  // note pct = long%
function RenderGuage(x,y, stockStr, pct, pctShort, canvas, context ){
    var z=0;
   
    if( pct <0.00 ||   pct > 1.00) return;
    if( pctShort <0.00 ||   pctShort > 1.00) return;

    var pctShortInv = (1.0-pctShort);

    //dummy rnd one for self-testing
    var pct1 = Math.floor(Math.random() * 100);
   
    
    var radius = canvasGaugeWidth / 3;
    var radius1 = canvasGaugeWidth / 3;

    var startAngle = 1.0 * Math.PI;
      var endAngle1 = 1.20 * Math.PI;
      var endAngle2 = 1.40 * Math.PI;
      var endAngle3 = 1.60 * Math.PI;
      var endAngle4 = 1.80 * Math.PI;
      var endAngle5 = 1.9999 * Math.PI;
      var counterClockwise = false;
      //var gLinewidth = 100;
      var arcdist = 0.0050;

var pct2=0.0;
var eStr="-";
// these 2 are like defines..
var arcLarge = 1.65;
var arcSmall = 1.25;

var arcLong  = 1.3;
var arcShort = 1.6;

var greenArcColStr ="#33cc33"; // "#66ff33";

//LONG %
      var endAngle0      = ( 1.00 + pct ) * Math.PI;
//SHORT %      
      var endAngle0short = ( 1.00 + pctShortInv ) * Math.PI;
      //ie if %short ==68%, we need to Draw from 100% back down to 32%  (1.00- 0.68 =0.32)

 
// make dominant long or short the WIDER ARC...
//    if long > short the long = large arc
      if(pct > pctShort){  // long
         arcLong  = arcLarge;
         arcShort = arcSmall;


      //LONG arc on Gauge
      context.beginPath();
      context.arc(x, y, radius, startAngle+(0*Math.PI), endAngle0 ,counterClockwise);
      context.lineWidth = gLinewidth*arcLong; //1.3;
      context.strokeStyle = greenArcColStr; // 'green'; 
      context.stroke();
 

      //SHORT arc on Gauge
      context.beginPath();
     // context.arc(x, y, radius, startAngle+(0*Math.PI), endAngle0short ,counterClockwise);
      context.arc(x, y, radius, endAngle0short, endAngle5, counterClockwise);
      context.lineWidth = gLinewidth*arcShort; //1.6;
      context.strokeStyle = 'red'; 
      context.stroke();




      }else{ // short
         arcLong  = arcSmall ;
         arcShort = arcLarge ;



      //SHORT arc on Gauge
      context.beginPath();
     // context.arc(x, y, radius, startAngle+(0*Math.PI), endAngle0short ,counterClockwise);
      context.arc(x, y, radius, endAngle0short, endAngle5, counterClockwise);
      context.lineWidth = gLinewidth*arcShort; //1.6;
      context.strokeStyle = 'red'; 
      context.stroke();


      //LONG arc on Gauge
      context.beginPath();
      context.arc(x, y, radius, startAngle+(0*Math.PI), endAngle0 ,counterClockwise);
      context.lineWidth = gLinewidth*arcLong; //1.3;
      context.strokeStyle = greenArcColStr; // 'green'; 
      context.stroke();
 

      }//if long/short  , draw arc order...





      context.beginPath();
      context.arc(x, y, radius, startAngle, endAngle1, counterClockwise);
      context.lineWidth = gLinewidth;
     // context.strokeStyle = 'red';
      context.strokeStyle = greenArcColStr;
      context.stroke();

        context.beginPath();
      context.arc(x, y, radius, endAngle1+(arcdist*Math.PI), endAngle2 ,counterClockwise);
      context.lineWidth = gLinewidth;
   //   context.strokeStyle = "#ff5500"; //'orange';
      context.strokeStyle =  "#77ff33"; // 'lime'
      context.stroke();

      context.beginPath();
      context.arc(x, y, radius, endAngle2+(arcdist*Math.PI), endAngle3 ,counterClockwise);
      context.lineWidth = gLinewidth;
      context.strokeStyle = 'yellow';
      context.stroke();

      context.beginPath();
      context.arc(x, y, radius, endAngle3+(arcdist*Math.PI), endAngle4 ,counterClockwise);
      context.lineWidth = gLinewidth;
     // context.strokeStyle ="#77ff33"; // 'lime';
      context.strokeStyle = "#ff5500"; //'orange';
      context.stroke();

      context.beginPath();
      context.arc(x, y, radius, endAngle4+(arcdist*Math.PI), endAngle5 ,counterClockwise);
      context.lineWidth = gLinewidth;
   //   context.strokeStyle = greenArcColStr; //'green';
      context.strokeStyle = 'red';
      context.stroke();
 



// LONG Needle
      context.beginPath();
      context.arc(x, y, radius1, endAngle0+(0.00*Math.PI), endAngle0+(0.01*Math.PI)  ,counterClockwise);
      context.lineWidth = gLinewidth*2.70;
      context.strokeStyle = greenArcColStr; //'green';  
      context.stroke();

// SHORT Needle
      context.beginPath();
      context.arc(x, y, radius1, endAngle0short+(0.00*Math.PI), endAngle0short+(0.01*Math.PI)  ,counterClockwise);
      context.lineWidth = gLinewidth*2.70;
      context.strokeStyle = 'red';   
      context.stroke();



    // DRAW STOCK NAME
    context.fillStyle = "#ff00ff"; //"#1111EE";
    context.font = "78px Arial";
    context.fillText( stockStr ,  40, 100 );

    context.fillStyle = "#ff00ff"; //"#1111EE";
    context.font = "78px Arial";
    context.fillText( stockStr ,  (canvas.width-200), 100 );

    context.fillStyle = "#ff00ff"; //"#1111EE";
    context.font = "78px Arial";
    context.fillText( stockStr ,  (canvas.width/2), 100 );



    //  DRAW PCT LONG
    pct2 = (pct * 100).toFixed(0);
    eStr = pct2.toString() +"%"; 
  //  DrawTextJB( "#EEEEEE", eStr, canvasGaugeWidth*0.75, gDashboardPctY-20, "44", context );
    DrawTextJB( "#EEEEEE", eStr, canvasGaugeWidth*0.085, gDashboardPctY-20, "44", context );


    //  DRAW PCT SHORT
    pct2 = (pctShort * 100).toFixed(0);
    eStr = pct2.toString() +"%"; 
 //   DrawTextJB( "#EEEEEE", eStr, canvasGaugeWidth*0.085, gDashboardPctY-20, "44", context );
    DrawTextJB( "#EEEEEE", eStr, canvasGaugeWidth*0.75, gDashboardPctY-20, "44", context );
 

    
    //  BUY SELL HOLD
    var bshStr ="HOLD";

    if(pct >= 0.51){
        bshStr = "BUY";
        context.fillStyle = "#22DD22";
        
    }else if((pct < 0.41 && pctShort >= 0.51)  ||  pctShort >= 0.51) {
        bshStr = "SELL";
        context.fillStyle = "#EE2222";
        
    }else {
        bshStr = "HOLD";
        context.fillStyle =  gBlueBGColorStr; //; "#111111";


    }
//    context.fillStyle = "#1111EE";
    context.font = "54px Arial";
    context.fillText( bshStr ,   x+85, 100  );


   // return( );
}//fn



function RenderIndicatorMeters( context)
{
    var ii=0;
    var iloop=0;
    var yH = gIndicatorMeterWidth, Yspacer = 90;
    var percentjb=0;
    var gstr="";
    var gstr1="";
    var i81 = 0;

      dormantIndicators = 0;
      dormantIndicatorsLONG  = 0;
      dormantIndicatorsSHORT = 0;



// build two  gPercentIndicatorAvg here...  gPercentIndicatorAvgSHORT  gPercentIndicatorAvgLONG

    gPercentIndicatorAvg=0;
    gPercentIndicatorAvgLONG=0;
    gPercentIndicatorAvgSHORT=0;


// main loop to compute long and short %
    ii=0;  
    for(iloop=0; iloop < (ttt3Len-ttt3Offset); iloop+=ttt3Offset){
       gstr = timetotrade3[ iloop + 1 ];
       
      // note this should be passed in as array of indicator #'s, even if randomized...
      //  = gIndicators[ii];
    //  percentjb =   Math.floor(Math.random() * 100);




      // get # from   0 < gIndicatorsLen;  iloop 0..3..6..9..12...  / 3 == 0 1 2 3       
      i81 = iloop / ttt3Offset;
      if( TestIndicatorStr(i81) ){
          percentjb = Number( gIndicators[ i81 ]   );
          if( gstr =="52-Week") {
            percentjb = 100- percentjb;

          }


        }else{
        // decrease max # indicators here... so UN-CODED algos do NOT factor into the Gauge Meter...  
        // was =50;
          percentjb =  0;  // dummy data should be =0 
          dormantIndicators++;

// BAD didn't work  jmb 063019 11:30pm

// indicator dormant
// check long first then short to adjust dormantIndicatorsLONG/SHORT var
// remember to zero 0-out the pct value  - was 2%
//      
 
////    if(i81  > 6              && i81 <= 11 )
//        if( i81 > timetotradeGEN && i81 <= timetotradeLONG ){ 
//         dormantIndicatorsLONG++;

// //     else if( i81 > 11              && i81 <= 16 )
//       }else if( i81 > timetotradeLONG && i81 <= timetotradeSHORT ){
//         dormantIndicatorsSHORT++;
//       }


        }//else



/*
// note IMPORTANT - in timetotrade3[], the GENERAL indicators MUST come first FOLLOWED by the LONGs, then the SHORTS
var  gNumberOfIndicatorsLONG  = (12-4);
var  gNumberOfIndicatorsSHORT = (12-4);
var 	 gIndicatorsOffsetALL  		=0;    // timetotrade3 idx/3
			gIndicatorsOffsetLONGreserved =3 ;
var 	 gIndicatorsOffsetLONG 		=7;    // timetotrade3 idx/3
var 	 gIndicatorsOffsetSHORT		=12;   // timetotrade3 idx/3
*/

//	******** LONG AVG COMPUTATION
//
// **** NOTE:  This seems to work perfectly for the LONGs
//     if(ii < 12) ... all interpreted as LONGs (keep 4 reserved=0 !!!)
       if(ii < gIndicatorsOffsetSHORT) gPercentIndicatorAvgLONG += percentjb;
// **** 


//	******** SHORT AVG COMPUTATION
//
       // here IF we are on GENERAL indicators (< 3 _LONGs) OR || we are on the SHORT indicators
       if(ii < gIndicatorsOffsetLONGreserved || ii >= gIndicatorsOffsetSHORT){
        //here we need to test if we are in the first 7 GENERAL indicators, in which case we do 100-%
           if(ii < gIndicatorsOffsetLONGreserved) gPercentIndicatorAvgSHORT += (100- percentjb); // long generic meter needs reversing
             else  gPercentIndicatorAvgSHORT +=  percentjb ;  // short meters need NO reversing
       }



      // depricate all avgs
       gPercentIndicatorAvg += percentjb;

       RenderIndicatorMeter(gGaugeXStart,  gDashboardPctY+(ii * Yspacer)+(100) , gIndicatorMeterWidth, gstr,   percentjb, iloop, context);

       ii++;
       
    }//for



    gstr1 = "SHORT";
    DrawTextJB( "#AA4477", gstr1, canvasGaugeWidth*0.75, gDashboardPctY+20, "24", context );
//  
    gstr1 = gPercentIndicatorAvgSHORT.toString()+"% / "+gNumberOfIndicatorsSHORT.toString();
    DrawTextJB( "#AA4477", gstr1, canvasGaugeWidth*0.75, gDashboardPctY+40, "20", context );



    gstr1 = "LONG";
    DrawTextJB( "#44AA77", gstr1, canvasGaugeWidth*0.075, gDashboardPctY+20, "24", context );
//depricating the original total summation
//    gstr1 = gPercentIndicatorAvg.toString()+" / "+ii.toString();
    gstr1 = gPercentIndicatorAvgLONG.toString()+"% / "+gNumberOfIndicatorsLONG.toString();
    DrawTextJB( "#44AA77", gstr1, canvasGaugeWidth*0.075, gDashboardPctY+40, "20", context );

    




    gNumberOfIndicators = ii;
    gPercentIndicatorAvg /= gNumberOfIndicators ;   
    //gPercentIndicatorAvg /= gNumberOfIndicators   - dormantIndicators ;  // subtract off dormants


    gPercentIndicatorAvgLONG /= gNumberOfIndicatorsLONG;   // longs /8
   // gPercentIndicatorAvgLONG /= gNumberOfIndicatorsLONG- dormantIndicatorsLONG;    

    gPercentIndicatorAvgSHORT /=gNumberOfIndicatorsSHORT;  //  shorts/8
   // gPercentIndicatorAvgSHORT /=gNumberOfIndicatorsSHORT- dormantIndicatorsSHORT;





    
}//fn




function RenderIndicatorMeter(x2, y2, w2,  nameStr, pct, iloopidx, context)
{
    var pctStr = pct.toString()+"%";
    var nstr0="",nstr0a="",gstr0="",gstr0a="", gstr2="", gstr2a="";
    var colorstr0="";
    var colorstr0dormant = "#777799";
    var indicatorDormant = 0;

 
 // first test to see if indicator ="nil"  ie scanning found NO indicator setup
     var i82 = iloopidx / ttt3Offset;
      if( TestIndicatorStr(i82) ){
          //DrawHorizontalMeter(  "#ff00ff"  , nameStr, x2, y2, w2, pct, context );  // old pink
          DrawHorizontalMeter(  gBlueBGColorStr  , nameStr, x2, y2, w2, pct, context );
          
          //jmb 063019
          // indicator NOT dormant !!!
          indicatorDormant =1;
      }else{
        
      // if( x <= timetotradeLONG )  // check long first then short to adjust dormantIndicatorsLONG/SHORT var
        DrawHorizontalMeter( colorstr0dormant  , nameStr, x2, y2, w2, pct, context );

      }
    

    // middle - name of indicator
    nstr0= nameStr;
    nstr0a = nstr0.substring(0,1);
    colorstr0 = gBlueBGColorStr; //"#111111" ; // "#AA77AA";
    if(nstr0a=="-"){
        colorstr0 = "#CC2222";      nstr0 = nstr0.substring(1);
    }else if(nstr0a=="+"){
        colorstr0 = "#11AA11";      nstr0 = nstr0.substring(1);
    }
    
    if(indicatorDormant==0) colorstr0 = colorstr0dormant;
    DrawTextJB( colorstr0 , nstr0, canvasGaugeWidth/2.75, y2+26, "26", context );


    // left text    
    gstr0 = timetotrade3[ iloopidx + 0 ];
    gstr0a = gstr0.substring(0,1);
    colorstr0 = gBlueBGColorStr; // "#444444";  //#993399";
    if(gstr0a=="-"){
        colorstr0 = "#EE3333";      gstr0 = gstr0.substring(1);
    }else if(gstr0a=="+"){
        colorstr0 = "#22CC22";      gstr0 = gstr0.substring(1);
    }

    if(indicatorDormant==0) colorstr0 = colorstr0dormant;
    DrawTextJB( colorstr0 , gstr0, canvasGaugeWidth/10, y2+20, "16", context );

    

    // right text    
    gstr2 = timetotrade3[ iloopidx + 2 ];
    gstr0a = gstr2.substring(0,1);
    colorstr0 =  gBlueBGColorStr; //"#444444";  //#993399";
    if(gstr0a=="-"){
        colorstr0 = "#EE3333";      gstr2 = gstr2.substring(1);
    }else if(gstr0a=="+"){
        colorstr0 = "#22CC22";      gstr2 = gstr2.substring(1);
    }

    if(indicatorDormant==0) colorstr0 = colorstr0dormant;
    DrawTextJB( colorstr0, gstr2, canvasGaugeWidth*0.80, y2+20, "16", context );
 



// ?? Depricate / Delete?

    // var i82 = iloopidx / ttt3Offset;
    //   if( TestIndicatorStr(i82) ){
    //       //DrawHorizontalMeter(  "#ff00ff"  , nameStr, x2, y2, w2, pct, context );  // old pink
    //       DrawHorizontalMeter(  gBlueBGColorStr  , nameStr, x2, y2, w2, pct, context );
  
    //   }else DrawHorizontalMeter(  "#555577" , nameStr, x2, y2, w2, pct, context );



}//fn



function DrawHorizontalMeter( colStr, str8, x8, y8, w2, pct, ctx1 ){
    var w3 = canvasGaugeWidth ;
    var w4 =  w3-(x8*2);
    var w4a =  w4 * 0.33;
    var x9 = 0;

    
    ctx1.beginPath();
    ctx1.fillStyle = colStr;
    // horiz line
    ctx1.fillRect(x8, y8, w4,  4 );
    
    
    ctx1.beginPath();
    ctx1.fillStyle = colStr;
    // left vert line + circ
    ctx1.fillRect(x8,    y8-16, 2, 20 );
   // drawCircle2(x8, y8, 10, "#BB2222");
 //   DrawTextJB( "#999999",  "0%" , x8-5, y8-16, "10", ctx1 );
    DrawTextJB( colStr,  "0%" , x8-5, y8-16, "10", ctx1 );

    
    ctx1.beginPath();
    ctx1.fillStyle = colStr;
    // right vert line + circ
    ctx1.fillRect(x8+w4, y8-16, 2, 20 );
   // drawCircle2(x8+w4, y8, 10, "#22DD22");
    DrawTextJB( colStr,  "100%" , x8+w4-8, y8-16, "10", ctx1 );

    
    
   // pct /100 = x9 / w4
    x9 = pct * w4  /100;

    // METER vert line
    ctx1.beginPath();
    ctx1.fillStyle = "#ff00ff";   //"#DD2222";  //purple
    ctx1.fillRect(x8+x9, y8-24, 2, 48 );

    ctx1.beginPath();
    ctx1.fillStyle =  colStr ; //"#222222";
    ctx1.fillRect(x8+x9-2, y8-24, 6, 8 );
    
    ctx1.fillRect(x8+x9-2, y8+24, 6, 8 );
    
   // DrawTextJB( "#2222AF", ( pct.toString()+"%" ), x8+x9-16, y8-24, "28", ctx1 );
    DrawTextJB( colStr, ( pct.toString()+"%" ), x8+x9-16, y8-24, "28", ctx1 );

    
}//fn


function DrawTextJB( colStr, str8, x8, y8, sizeStr, ctx1 ){
    
    ctx1.beginPath();
    ctx1.fillStyle = colStr;
    ctx1.font =   sizeStr + "px Arial";
    ctx1.fillText( str8 ,  x8, y8   );
    
}//fn






function RenderTrafficLights()
{
    
    var ii=0;
    var ir=0;
    
    for(ii=0; ii<10; ii++){
        ir =   Math.floor(Math.random() * 100);
        if(ir<33)   DrawTrafficLight(500,480+(ii*100), 50, 90, "RSI", "red", 36, "#2222FF", 64 );
          else if(ir<66)  DrawTrafficLight(500,480+(ii*100), 50, 90, "HCD", "yellow", 36, "#2222FF", 64 );
            else  DrawTrafficLight(500,480+(ii*100), 50, 90, "52-wkLo", "green", 36, "#2222FF", 64 );

    }//for
    
}//fn
    
    
function DrawTrafficLight( x, y, w, h, str, ryg, val1, color1, fontsize1) {
    
    var roff= h/3;
    
    
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect( x, y, w, h );
    
    if (ryg=="red") {
        drawCircle2( x + w/2, y + 3 , w/3, "#ff3333" );
        drawCircle2( x + w/2, y + 3 + roff, w/3, "#777333" );
        drawCircle2( x + w/2, y + 3 + roff + roff, w/3, "#337733" );
        
        
        
    } else   if (ryg=="yellow"){
        
        drawCircle2( x + w/2, y + 3 , w/3, "#773333" );
        drawCircle2( x + w/2, y + 3 + roff, w/3, "#fff333" );
        drawCircle2( x + w/2, y + 3 + roff + roff, w/3, "#337733" );
        
    } else   if (ryg=="green") {
        
        drawCircle2( x + w/2, y + 3 , w/3, "#773333" );
        drawCircle2( x + w/2, y + 3 + roff, w/3, "#777333" );
        drawCircle2( x + w/2, y + 3 + roff + roff, w/3, "#33ff33" );
        
    }
    
    // draw text
    
    ctx.fillStyle = color1;
    ctx.font = fontsize1.toString()+"px Arial";
    ctx.fillText(  str, x, y + h + fontsize1 );
    
}//fn




function drawCircle2(xxx, yyy, r1, colStr1){
    
    ctx.beginPath();
    //ctx.fillStyle ="transparent";
    ctx.fillStyle =colStr1  ;
    ctx.lineWidth = r1 * 0.10;
    ctx.arc(  xxx, yyy + r1, r1, 0,2*Math.PI );
    ctx.fill()
    ctx.strokeStyle =  colStr1;
    ctx.stroke();
    
}//fn



// depricate this...

// should have same # of elements as array above/3, and this array can be written-OVER as new ALGO QUANTITATIVE DATA COMES IN Asynx..
var timetotradeArray = [
                    "-Bearish",
                    "-Bad",
                    "-Street Bearish",
                    "-Short",
                    "+Low",
                    
                    "+OverSOLD",
                    "+OverSOLD",
                    
                    
                    "No",
                    "No",
                    "No",
                    "No",
                    "No",
                    
                    
                    "No",
                    "No",
                    "No",
                    "No",
                    "No",
                    
                     "Low",
                    
                     ];










