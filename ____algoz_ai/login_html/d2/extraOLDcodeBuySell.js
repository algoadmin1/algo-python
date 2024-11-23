



















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

function DrawO verviewData( vrect ){


    // deor
  let vrect333 = {x: startX, y: Ytop, w: 320, h:  (Ybottom-Ytop) };
  
if(gDrawAlmanac==1)  DrawAlmanac( "2022-03-23", "2022-08-21", vrect333, "Annual Almanac",  72 );


// for stocks at the moment
if(  gDrawCrypto>0  || gDrawO verview==0  ) return;  // self returning to allow other overlays above, cleaner 1 pipe for lots o data, easier for tracking



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




// ###############################################






*/