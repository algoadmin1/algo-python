// PivotsPython.el   , .txt
{
  //  !!PivotsPython_MTWTF(_Weekly)  ver 10.4.3   jb 2023-12-13, 12-16-23  2024-01-27
  //    
  //     derived from:
  //        !!PivotsMTWTF_Weekly ver 8.0
  //
  //   was !!Pivots5DayTRENDLN5
  //  
  // - by John Botti - includes R3, R2, R1, P, S1, S2, S3  new + sss + weekly
  //
  //  
  // rev 5.5  Weekly S1, P, P3, R1  drawn...
  //
  //
  // rev 5.4  Monthly R3-P-S3 - Placed (works over 15 min)  - **** Need to verify data...
  //
  // rev 5.3  gold line error Claim Fixed... for tomorrow too 6/9/09
  //
  // rev 5.2  w/ tomorrow's 3-day mving average
  //
  // rev 5.1  w/ fixes on pivot line color
  //
  // rev 5.0
  //
  //  rev 7.0 12/22/12 - botti fixes tomorrow's r2, s2, r3, s3 to display on today's data, staggered...
  //                             merry Christmas!!!
  //
  //
  //  THIS used to be !!Pivots5DayTRENLNp, is now ver 5.2 ()
  //  
  //       to incorporate stuff from J Person course, notably:
  //
  //       RED    resistance
  //       GOLD   3-day moving Pivot Average
  //       BLUE   Pivot (H+L+C)/3 from Yesterday
  //       GREEN  support
  //
  //   also see 'new 5.0' comments      
  //      
  //  --------------------------------------------------
  //       (4.2 included)
  //       w/  Trendline support AND    Tomorrow's Trendlines plus R3, R2, R1, P, S1, S2, S3 printed
  //       Drawing PHARD, S1HARD, R1HARD  - weekly 15min INTRADAY TRENDLINES
  //       with monday tuesday ...friday
  //
  //   version  4.3 includes
  //
  //  fri->mon correction/ DayOffset[5] table.
  //
  //  trendlines fixed to Exchange Time, Date-DayOffset[d]
  //
  //
  // j.person's Pivots Defined
  //Pday  = (High + Low + Close )/3 ;
  //S1day = (Pday *2)-High;
  //S2day = Pday - High + Low;
  //R1day = (Pday *2)-Low;
  //R2day = Pday + High - Low;
  //S3day = Pday - (R2day-S1day);
  //R3day = (Pday-S1day) + R2day;
//
//
//m burke stuff
As far as the whether the High came before the Low, or Low before the High,
you would need to add a finer bar interval to the chart and calculate
that from the second data stream. Insert a 15min bar into the chart.
 
Vars: DayHigh(0, DATA2), HighTime(0, DATA2);
If Time  = SessionFirstBarTime(1,1) DATA2 then begin
DayHigh  = High DATA2;
End else begin
If High DATA2 > DayHigh then begin
DayHigh  = High DATA2;
HighTime = Time DATA2;
End;
End;

//arrays ...
Array: int WeeklyHighs[52](0), int WeeklyLow[52](0), MyIntArray[5](0);
MyIntArray[2] = 54 ;
 }
vars:
 Pday(0), S1day(0), S2day(0), R1day(0), R2day(0), S3day(0), R3day(0),
 PHARDday(0),P3HARDday(0), S1HARDday(0), S2HARDday(0), R1HARDday(0), R2HARDday(0), S3HARDday(0), R3HARDday(0),S4HARDday(0), R4HARDday(0),
  PHARDday0(0), S1HARDday0(0), S2HARDday0(0), R1HARDday0(0), R2HARDday0(0), S3HARDday0(0), R3HARDday0(0), //PavgHARDday0(0),
 PHARDday1(0), S1HARDday1(0), S2HARDday1(0), R1HARDday1(0), R2HARDday1(0), S3HARDday1(0), R3HARDday1(0),
 PHARDday2(0), S1HARDday2(0), S2HARDday2(0), R1HARDday2(0), R2HARDday2(0), S3HARDday2(0), R3HARDday2(0),
 PHARDday3(0), S1HARDday3(0), S2HARDday3(0), R1HARDday3(0), R2HARDday3(0), S3HARDday3(0), R3HARDday3(0),
 PHARDday4(0), S1HARDday4(0), S2HARDday4(0), R1HARDday4(0), R2HARDday4(0), S3HARDday4(0), R3HARDday4(0),
 PHARDday5(0), PHARDday6(0),  PHARDday7(0),  // new 5.1
 PHARD3dayAvg(0),  // new 5.0  TODAY
 PHARD3dayAvg0(0),  // new 5.0  TOMORROW
  PHARD3dayAvg1(0),  // new 5.0  YESTERDAY
   PHARD3dayAvg2(0),  // new 5.0  2 DAYS AGO
    PHARD3dayAvg3(0),  // new 5.0  3 DAYS AGO
  PHARD3dayAvg4(0),  // new 5.0  4 DAYS AGO
 PivotHARDBarsBack(120), Yesterdy(Date),
 
 DayOfWeekNum(0), JBString0("?jb"),JBudate("2023-12-13"),JBudate1("2023-12-13"),JBudate2("2023-12-13"),JBudate3("2023-12-13"),
 
 DayOfWeekNum1(0),DayOfWeekNumStr("sun"),pivotsStrOutput("0"),priceMinusR1str("0"),priceMinusS1str("0"),   priceMinusR1pctstr("0"),   priceMinusS1pctstr("0"),
 datestr1("0000-11-22"), datestr2("0000-11-22"),yesterdateNum(0),
 
 daysBackToCompute(-8), processBar(0),
 
 weeklyPivotsStr("wkR2R1S1S2="),monthlyPivotsStr("moR3R2R1PS1S2S3="), currBuyStr("==="), currSellStr("==="),
 gapstr("GAP="), gappct(0.0),

 gapThreshold(0.0125),
 
  intrabarpersist  lastBuyStr("==="),
  intrabarpersist lastSellStr("==="),
 
  buyStrEqual(0), sellStrEqual(0),
 
 str1("n"),  str2("n"),  str3("n"),  str4("n"),
 
 DayOfWeekString0("?DAY"),  // today
 DayOfWeekString1("?DAY"),  // yesterday
 DayOfWeekString2("?DAY"),  // 2 days ago
 DayOfWeekString3("?DAY"),  // 3 days ago
 DayOfWeekString4("?DAY"),  // 4 days ago
 PivotAvgDash(3),  
 PivotDash(2), SupDash(2), ResDash(2),  // FOR 5-DAY INTRADY  new 5.0 was PivotDash(3)
  PivotDash0(4), SupDash0(4), ResDash0(4),  // FOR TODAY
 
 Pweek(0), P3week(0), S1week(0), S2week(0), S3week(0), R1week(0), R2week(0), R3week(0), weekSize(6),  // WEEKLY
 
 PNweek(0), P3Nweek(0), S1Nweek(0), S2Nweek(0), S3Nweek(0), R1Nweek(0), R2Nweek(0), R3Nweek(0),   // NEXT WEEKLY
 
 Pmonth(0), S1month(0), S2month(0), R1month(0), R2month(0),
 
 PdayLess1(0), PdayLess2(0), PdayLess3(0), PtrailingAvg(0),
 BuySignal(0), SellSignal(0),
 TLV(0), TLID(0), TLColor(green),TLColorSELL(RED),
 SupportColor(Green),ResistanceColor(Red), PivotColor(Blue), Avg3DayPivotColor(Yellow), // new 5.0
 JBColorPivot(cyan), JBColorMvgAvg(yellow),  // Pivot line, 3-day avg(Ps)
 JBplotW(13), JBplotWsm(.5),
 SellThreshold(3), BuyThreshold(3),
 
 
 SellThreshold2(4), BuyThreshold2(4), // here THIS ONE
 
 
 HardPivot(-1), HardS1(-1), HardR1(-1),

 
 MonthPivot(0), MonthS1(0), MonthS2(0), MonthS3(0), MonthR1(0), MonthR2(0), MonthR3(0),MonthDateOffset(30),
//
// NextMonth
//
 NMonthPivot(0), NMonthS1(0), NMonthS2(0), NMonthS3(0), NMonthR1(0), NMonthR2(0), NMonthR3(0),NMonthDateOffset(15),

 dayOff(0),

 dummyNum(0);
 // MaxBarsBack;

 
 
 Array: int DayOffset[5](0);
//  THIS ALL ASSUMES THE  SYMBOL IS SET TO 'DAILY' IN TRADESTATION 'FORMAT ANALYSIS TECHNIQUE'
// note this works on all bar types so above assumption is NOT necessary - ver 5.0
//
{
Pday  = (High + Low + Close )/3 ;
PdayLess1  = (High[1] + Low[1] + Close[1] )/3 ;
PdayLess2  = (High[2] + Low[2] + Close[2] )/3 ;
PdayLess3  = (High[3] + Low[3] + Close[3] )/3 ;
PtrailingAvg = (PdayLess1 + PdayLess2 + PdayLess3)/3;
//
//  PtrailingAvg =  the SMOOTHED red line  of the Pivot Pts of the last 3 Days (bars) averaged
 
S1day = (Pday *2)-High;
S2day = Pday - High + Low;
R1day = (Pday *2)-Low;
R2day = Pday + High - Low;
S3day = Pday - (R2day-S1day);
R3day = (Pday-S1day) + R2day;
Pweek = ( Highest(High,5) + Lowest(Low,5) + Close )/3 ;
Pmonth = ( Highest(High,30) + Lowest(Low,30) + Close )/3 ;
}
 



//
//    **** comment out  ??
//
 
Pday  = (High[1] + Low[1] + Close[1] )/3 ;
PdayLess1  = (High[2] + Low[2] + Close[2] )/3 ;
PdayLess2  = (High[3] + Low[3] + Close[3] )/3 ;
PdayLess3  = (High[4] + Low[4] + Close[4] )/3 ;
PtrailingAvg = (PdayLess1 + PdayLess2 + PdayLess3)/3;
//  PtrailingAvg =  the SMOOTHED red line  of the Pivot Pts of the last 3 Days (bars) averaged
//
S1day = (Pday *2)-High[1];
S2day = Pday - High[1] + Low[1];
R1day = (Pday *2)-Low[1];
R2day = Pday + High[1] - Low[1];
S3day = Pday - (R2day-S1day);
R3day = (Pday-S1day) + R2day;
// day's calc's done
//
 
{
Pday  = (High+Low+Close)/3;

S1day = (Pday *2)-High;
S2day = Pday - High + Low;
S3day = Pday - (R2day-S1day);

R1day = (Pday *2)-Low;
R2day = Pday + High - Low;
R3day = (Pday-S1day) + R2day;
}



//
//  Calculate Monthly Pivots
//
 MonthPivot =  ( HighM(1) + LowM(1) + CloseM(1) ) / 3;

 MonthS1    =  (MonthPivot * 2)- HighM(1);
 MonthS2    =  MonthPivot - HighM(1) + LowM(1);
 MonthS3    =  MonthPivot - ( MonthR2- MonthS1 ) ;

 MonthR1    =  (MonthPivot * 2)- LowM(1);
 MonthR2    =  MonthPivot + HighM(1) - LowM(1);
 MonthR3    =  (MonthPivot - MonthS1) + MonthR2 ;


//
//  Calculate Next Monthly Pivots
//
 NMonthPivot =  ( HighM(0) + LowM(0) + CloseM(0) ) / 3;

 NMonthS1    =  (NMonthPivot * 2)- HighM(0);
 NMonthS2    =  NMonthPivot - HighM(0) + LowM(0);


 NMonthR1    =  (NMonthPivot * 2)- LowM(0);
 NMonthR2    =  NMonthPivot + HighM(0) - LowM(0);
 
  NMonthS3    =  NMonthPivot - ( NMonthR2- NMonthS1 ) ;
 NMonthR3    =  (NMonthPivot - NMonthS1) + NMonthR2 ;






//
//  Calculate Weekly Pivots
//

 Pweek =  ( HighW(1) + LowW(1) + CloseW(1) ) / 3;

 P3week = (
               ( ( HighW(2) + LowW(2) + CloseW(2) ) / 3 ) +      
               ( ( HighW(3) + LowW(3) + CloseW(3) ) / 3 ) +
               ( ( HighW(4) + LowW(4) + CloseW(4) ) / 3 )     )/3;



 S1week    =  (Pweek * 2)- HighW(1);
 S2week    =  Pweek - HighW(1) + LowW(1);

 R1week    =  (Pweek * 2)- LowW(1);
 R2week    =  Pweek + HighW(1) - LowW(1);
 

 S3week    =  Pweek - ( R2week - S1week );
 R3week    =  (Pweek - S1week) + R2week ;


// 08.06.14 jb
//
//  Calculate NEXT Weekly Pivots
//

 PNweek =  ( HighW(0) + LowW(0) + CloseW(0) ) / 3;

 P3Nweek = (
               ( ( HighW(1) + LowW(1) + CloseW(1) ) / 3 ) +      
               ( ( HighW(2) + LowW(2) + CloseW(2) ) / 3 ) +
               ( ( HighW(3) + LowW(3) + CloseW(3) ) / 3 )     )/3;



 S1Nweek    =  (PNweek * 2)- HighW(0);
 S2Nweek    =  PNweek - HighW(0) + LowW(0);

 R1Nweek    =  (PNweek * 2)- LowW(0);
 R2Nweek    =  PNweek + HighW(0) - LowW(0);
 

 S3Nweek    =  PNweek - ( R2Nweek - S1Nweek );
 R3Nweek    =  (PNweek - S1Nweek) + R2Nweek ;

 
//  "Pp3_"+ NumtoStr(Pweek, 2) +"_"+ NumtoStr(P3week, 2)

// weeklyPivotsStr = "wkR2R1"+  "PP3_"+ NumtoStr(Pweek, 2) +"_"+ NumtoStr(P3week, 2)  +"_S1S2=,"+ NumtoStr(R2week, 2) +","+ NumtoStr(R1week, 2) +","+ NumtoStr(S1week, 2) +","+ NumtoStr(S2week, 2) ;

weeklyPivotsStr = "wkR2R1"+  "P_"+ NumtoStr(Pweek, 2)   +"_S1S2=,"+ NumtoStr(R2week, 2) +","+ NumtoStr(R1week, 2) +","+ NumtoStr(S1week, 2) +","+ NumtoStr(S2week, 2) ;


monthlyPivotsStr = "moR3R2R1PS1S2S3=,"+ NumtoStr(MonthR3,2) + ","+ NumtoStr(MonthR2,2) + ","+ NumtoStr(MonthR1,2) + ","+ NumtoStr(MonthPivot,2) + ","+ NumtoStr(MonthS1,2) + ","+ NumtoStr(MonthS2,2) + ","+ NumtoStr(MonthS3,2)  ;



// ************************** PREP VARS for output to intradaytrades.txt




 DayOfWeekNum1 = DayOfWeek(Date);
 DayOfWeekNumStr ="sun";
 Switch(DayOfWeekNum1)
Begin
  Case 0:
    Begin
  DayOfWeekNumStr = "sun";
  end;
  Case 1:    
    Begin
DayOfWeekNumStr = "mon";
  end;
  Case 2:    
    Begin
  DayOfWeekNumStr = "tue";
  end;
  Case 3:    
    Begin
  DayOfWeekNumStr = "wed";
  end;
  Case 4:    
    Begin
DayOfWeekNumStr = "thu";
  end;
  Case 5:    
    Begin
DayOfWeekNumStr = "fri";
  end;
  Case 6:    
    Begin
DayOfWeekNumStr = "sat";
  end;
  end;
 
JBudate3 = LeftStr(ELDateToString(Date), 10) ;

JBudate1 = LeftStr(ELDateToString(Date),5) ;

JBudate= RightStr(JBudate3, 4)+"-"+ LeftStr(JBudate1, 2)+"-"+RightStr(JBudate1, 2) ;




// CALCULATE TODAY'S LINES FROM YESTERDAY
PHARDday  = (HighD(1) + LowD(1) + CloseD(1) )/3 ;  // P == yesterday (H+L+C)/3

P3HARDday  =(  ( (HighD(2) + LowD(2) + CloseD(2) )/3 ) +   ( (HighD(3) + LowD(3) + CloseD(3) )/3 )+  ( (HighD(4) + LowD(4) + CloseD(4) )/3 )     )/3;

S1HARDday = (PHARDday *2)-HighD(1);
S2HARDday = PHARDday - HighD(1) + LowD(1);
R1HARDday = (PHARDday *2)-LowD(1);
R2HARDday = PHARDday + HighD(1) - LowD(1);
// New ** jb
S3HARDday = PHARDday - (R2HARDday - S1HARDday);
R3HARDday = (PHARDday - S1HARDday) + R2HARDday;
  //S3day = Pday - (R2day-S1day);
  //R3day = (Pday-S1day) + R2day;
 
 
 /////////////////////////////////////////////////////////////////////////////////////// yesterdateNum = CalcDate(Date,  -8 );   //  calc's 8 days before BarDate in TradeSta's YYYMMDD weird format
 
// SET UP TOP, comment out for testing: (set to -8)
// daysBackToCompute= -8;
 
 yesterdateNum = CalcDate(Currentdate,  daysBackToCompute );   //  calc's 8 days before CurrentDate (today) in TradeSta's YYYMMDD weird format
 
 processBar =0;   // default to do not process
 if(Date=CurrentDate )   then processBar=1;
 if(Date>=yesterdateNum) then processBar=1;  // if current bar's date >=  CurrentDate-daysBackToComp  ie IF BAR is within window
 
 
 datestr1 = "CurrDate="+ NumtoStr(Currentdate,0) +"_"+ NumtoStr(daysBackToCompute,0) +"_daysAgo="+   NumtoStr( yesterdateNum, 0)  +"_"  ;
 datestr2 =  datestr1 + "processBar="+ NumtoStr(processBar,0) +"_";     //+ NumtoStr(Date,0) +"_"  ;
 
 // uncomment below line for testing
 datestr2 = "";
  //datestr2 = "_prBar="+ NumtoStr(processBar,0) +"_";  
 
 
 gapstr="GAP=,";
 pivotsStrOutput =datestr2+ "R3R2R1_P_P3_S1S2S3=,"+ NumtoStr(R3HARDday ,2)+","+NumtoStr(R2HARDday ,2)+","+NumtoStr(R1HARDday ,2)+","+NumtoStr( PHARDday,2)+","+NumtoStr(P3HARDday ,2)+","+NumtoStr(S1HARDday ,2)+","+NumtoStr(S2HARDday ,2)+","+NumtoStr(S3HARDday ,2) ;
 
 // for Sell sig we use PtrailingAvg for P3 for Price
 priceMinusR1str    =  "p3-R1=,"+ NumtoStr( ( PtrailingAvg - R1HARDday  ) , 2);
 priceMinusR1pctstr =    NumtoStr( ( PtrailingAvg - R1HARDday  )/PtrailingAvg*100 , 4)+"%";
 
 priceMinusS1str    =  "p-S1=,"+ NumtoStr( ( Pday         - S1HARDday  ) , 2);
 priceMinusS1pctstr =    NumtoStr( ( Pday         - S1HARDday  )/Pday*100 , 4)+"%";


// gap calc
//
//   gapstr("GAP="), gappct(0.0), gapThreshold(0.015),


gappct = ( OpenD(0) -  CloseD(1) )  / CloseD(1);
gapstr = "gap="+ NumtoStr(gapThreshold,4)  +","+ "0.00,0.0,0.0" ;
if(AbsValue(gappct) > gapThreshold) then
Begin
gapstr = "GAP="+   NumtoStr(gapThreshold,4)  +","+    NumtoStr(gappct ,4)  +","+  NumtoStr(CloseD(1), 2 )  + ","+   NumtoStr(OpenD(0), 2 )   ;

end;

///////////////////////////////////////////////////////////////////////////////////////////////// END CALC OF VARS FOR intradaytrades.txt

//
// get Hand-drawn Trendline   - need MELS.ELD -teacher's TL_FindColor routine
TLV=0;
TLID=0;
{
TLID=TL_FindColor(7,TLColor);      
if TLID>-1 then TLV = TL_GetValue( TLID, Date, Time);
if TLV<0 then HardS1=-1
 else HardS1 = TLV;
TLV=0;
TLID=0;
TLID=TL_FindColor(7,TLColorSELL);      // resistance R1 or SELL
if TLID>-1 then TLV = TL_GetValue( TLID, Date, Time);
if TLV<0 then HardR1=-1
 else HardR1 = TLV;
}



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
 
//
//
//


if lastbaronchart then begin
 DayOfWeekNum = DayOfWeek(Date);
// DayOfWeekString0 = NumToStr(DayOfWeekNum,2);
 
 DayOfWeekString0 = "?day0";
 DayOfWeekString1 = "?day1";
 DayOfWeekString2 = "?day2";
 DayOfWeekString3 = "?day3";
 DayOfWeekString4 = "?day4";
 
 Switch(DayOfWeekNum)
Begin
  Case 0:
   Begin
 DayOfWeekString0 = "?Sun";
 end;
  Case 1:    // monday
   Begin
  DayOfWeekString0 = "Mon    ";
  DayOfWeekString1 = "Fri    ";
  DayOfWeekString2 = "Thu  ";
  DayOfWeekString3 = "Wed ";
  DayOfWeekString4 = "Tue  ";
  DayOffset[1]     = 0;
  DayOffset[2]     = 3;   // ie monday-2 =friday
  DayOffset[3]     = 4;
  DayOffset[4]     = 5;
  DayOffset[5]     = 6;
  dayOff = 5; // go 5 days back for Weekly Pivots IFF Monday
 
 end;
  Case 2:    // tuesday
   Begin
  DayOfWeekString0 = "Tue  ";
  DayOfWeekString1 = "Mon  ";
  DayOfWeekString2 = "Fri   ";
  DayOfWeekString3 = "Thu  ";
  DayOfWeekString4 = "Wed ";
  DayOffset[1]     = 0;
  DayOffset[2]     = 1;   // ie tue-1 =friday
  DayOffset[3]     = 4;
  DayOffset[4]     = 5;
  DayOffset[5]     = 6;
  dayOff = 4; // go 4 days back for Weekly Pivots IFF Tuesday
 
 end;
  Case 3:    // wednesday
   Begin
  DayOfWeekString0 = "Wed ";
  DayOfWeekString1 = "Tue  ";
  DayOfWeekString2 = "Mon  ";
  DayOfWeekString3 = "Fri    ";
  DayOfWeekString4 = "Thu  ";
  DayOffset[1]     = 0;
  DayOffset[2]     = 1;  
  DayOffset[3]     = 2;
  DayOffset[4]     = 5;
  DayOffset[5]     = 6;
  dayOff = 3; // go 3 days back for Weekly Pivots IFF Wenesday
 
 end;
  Case 4:      
   Begin
  DayOfWeekString0 = "Thu  ";
  DayOfWeekString1 = "Wed y";
  DayOfWeekString2 = "Tue   ";
  DayOfWeekString3 = "Mon    ";
  DayOfWeekString4 = "Fri   ";
  DayOffset[1]     = 0;
  DayOffset[2]     = 1;  
  DayOffset[3]     = 2;
  DayOffset[4]     = 3;
  DayOffset[5]     = 6;
  dayOff = 2; // go 2 days back for Weekly Pivots IFF Thursday
 
 
  end;
  Case 5:
 Begin      
  DayOfWeekString0 = "Fri    ";
  DayOfWeekString1 = "Thu  ";
  DayOfWeekString2 = "Wed ";
  DayOfWeekString3 = "Tue   ";
  DayOfWeekString4 = "Mon    ";
  DayOffset[1]     = 0;
  DayOffset[2]     = 1;  
  DayOffset[3]     = 2;
  DayOffset[4]     = 3;
  DayOffset[5]     = 4;
  dayOff = 1; // go 1 days back for Weekly Pivots IFF Friday
 
 
 end;
  Case 6:
 Begin      
 DayOfWeekString0 = "?Sat";
 end;
  Default:      
 DayOfWeekString0 = "?day";
End;      
       
       
//CALCULATE Pivot, Sx, Ry (HARD) from Yesterday, vs. previous bar, but ONLY ONCE!
//
//PHARDday  = (HighD(0) + LowD(0) + CloseD(0) )/3 ;
//S1HARDday = (PHARDday *2)-HighD(0);
//S2HARDday = PHARDday - HighD(0) + LowD(0);
//R1HARDday = (PHARDday *2)-LowD(0);
//R2HARDday = PHARDday + HighD(0) - LowD(0);


{ // MOVED TO ABOVE BUY/SELL LOGIC 2023-12-13
//
// CALCULATE TODAY'S LINES FROM YESTERDAY
PHARDday  = (HighD(1) + LowD(1) + CloseD(1) )/3 ;  // P == yesterday (H+L+C)/3

P3HARDday  =(  ( (HighD(2) + LowD(2) + CloseD(2) )/3 ) +   ( (HighD(3) + LowD(3) + CloseD(3) )/3 )+  ( (HighD(4) + LowD(4) + CloseD(4) )/3 )     )/3;

S1HARDday = (PHARDday *2)-HighD(1);
S2HARDday = PHARDday - HighD(1) + LowD(1);
R1HARDday = (PHARDday *2)-LowD(1);
R2HARDday = PHARDday + HighD(1) - LowD(1);
// New ** jb
S3HARDday = PHARDday - (R2HARDday - S1HARDday);
R3HARDday = (PHARDday - S1HARDday) + R2HARDday;
  //S3day = Pday - (R2day-S1day);
  //R3day = (Pday-S1day) + R2day;
}



// CALCULATE YESTERDAY'S LINES FROM THE DAY BEFORE, THEN 2,3,4 BACK
PHARDday1  = (HighD(2) + LowD(2) + CloseD(2) )/3 ;
S1HARDday1 = (PHARDday1 *2)-HighD(2);
S2HARDday1 = PHARDday1 - HighD(2) + LowD(2);
R1HARDday1 = (PHARDday1 *2)-LowD(2);
R2HARDday1 = PHARDday1 + HighD(2) - LowD(2);
PHARDday2  = (HighD(3) + LowD(3) + CloseD(3) )/3 ;
S1HARDday2 = (PHARDday2 *2)-HighD(3);
S2HARDday2 = PHARDday2 - HighD(3) + LowD(3);
R1HARDday2 = (PHARDday2 *2)-LowD(3);
R2HARDday2 = PHARDday2 + HighD(3) - LowD(3);
 
PHARDday3  = (HighD(4) + LowD(4) + CloseD(4) )/3 ;
S1HARDday3 = (PHARDday3 *2)-HighD(4);
S2HARDday3 = PHARDday3 - HighD(4) + LowD(4);
R1HARDday3 = (PHARDday3 *2)-LowD(4);
R2HARDday3 = PHARDday3 + HighD(4) - LowD(4);
PHARDday4  = (HighD(5) + LowD(5) + CloseD(5) )/3 ;
S1HARDday4 = (PHARDday4 *2)-HighD(5);
S2HARDday4 = PHARDday4 - HighD(5) + LowD(5);
R1HARDday4 = (PHARDday4 *2)-LowD(5);
R2HARDday4 = PHARDday4 + HighD(5) - LowD(5);
//
// CALCULATE TOMORROW
PHARDday0  = (HighD(0) + LowD(0) + CloseD(0) )/3 ;
S1HARDday0 = (PHARDday0 *2)-HighD(0);
S2HARDday0 = PHARDday0 - HighD(0) + LowD(0);
R1HARDday0 = (PHARDday0 *2)-LowD(0);
R2HARDday0 = PHARDday0 + HighD(0) - LowD(0);
S3HARDday0 = PHARDday0 - (R2HARDday0-S1HARDday0);
R3HARDday0 = (PHARDday0-S1HARDday0) + R2HARDday0;
//old
//PavgHARDday0 =  (PHARDday0 +PHARDday1+PHARDday2)/3 ;
PHARD3dayAvg0 =  (PHARDday  + PHARDday1 + PHARDday2)/3 ;
//
// PtrailingAvg = (PdayLess1 + PdayLess2 + PdayLess3)/3;
//
//
 
// rev 5.0
//
//  we need these for 4 & 5 days ago to draw GOLD lines
//
  PHARDday5  = (HighD(6) + LowD(6) + CloseD(6) )/3 ;
  PHARDday6  = (HighD(7) + LowD(7) + CloseD(7) )/3 ;
  PHARDday7  = (HighD(8) + LowD(8) + CloseD(8) )/3 ;
//
//  calculate 3-day moving avg
//
  PHARD3dayAvg  = ( PHARDday1 + PHARDday2 + PHARDday3 )/3;
  PHARD3dayAvg1 = ( PHARDday2 + PHARDday3 + PHARDday4 )/3;
  PHARD3dayAvg2 = ( PHARDday3 + PHARDday4 + PHARDday5 )/3;
 
  PHARD3dayAvg3 = ( PHARDday4 + PHARDday5 + PHARDday6 )/3;
  PHARD3dayAvg4 = ( PHARDday5 + PHARDday6 + PHARDday7 )/3;
//
//
 
 
//S3day = Pday - (R2day-S1day);
//R3day = (Pday-S1day) + R2day;
// j.person's Pivots Defined
//Pday  = (High + Low + Close )/3 ;
//S1day = (Pday *2)-High;
//S2day = Pday - High + Low;
//R1day = (Pday *2)-Low;
//R2day = Pday + High - Low;
//S3day = Pday - (R2day-S1day);
//R3day = (Pday-S1day) + R2day;
 
 
 if BarType = 1 then     // BarType = Interval Chart ; BarInterval returns intraday time/bar
  PivotHARDBarsBack = ( 60/BarInterval )* 6.45   // 6.75 hrs in a trading day ie. SnP 9:30a-4:15p
 else  
  PivotHARDBarsBack = 120;  
 
 
 
 
 
 
 
// ****
// ****   calculate TODAY
// ****
//
 Value1 = TL_New(Date, 0930,  PHARDday, Date, 1615, PHARDday);
 Value2 = TL_New(Date, 0930, S1HARDday, Date, 1615, S1HARDday);
 Value3 = TL_New(Date, 0930, R1HARDday, Date, 1615, R1HARDday);
 
 TL_SetColor(Value1, PivotColor);
 TL_SetColor(Value2, SupportColor);
 TL_SetColor(Value3, ResistanceColor);
 TL_SetStyle(Value1, PivotDash);
 TL_SetStyle(Value2, SupDash);
 TL_SetStyle(Value3, ResDash);
//
// R2, S2, & S3 printed for TODAY
//
 Value22 = TL_New(Date, 0930, S2HARDday, Date, 1615, S2HARDday);
 Value23 = TL_New(Date, 0930, R2HARDday, Date, 1615, R2HARDday);
 Value24 = TL_New(Date, 0930, S3HARDday, Date, 1615, S3HARDday);
   Value25 = TL_New(Date, 0930, R3HARDday, Date, 1615, R3HARDday);
 TL_SetColor(Value25, ResistanceColor);

   //Value26 = TL_New(Date, 0930, P3HARDday, Date, 1615, P3HARDday);
 //TL_SetColor(Value26,JBColorMvgAvg);   //yellow

 TL_SetColor(Value22, SupportColor);
 TL_SetColor(Value23, ResistanceColor);
 TL_SetColor(Value24, SupportColor);
 TL_SetStyle(Value22, SupDash+3);
 TL_SetStyle(Value24, SupDash+1);
 TL_SetStyle(Value23, ResDash+3);  
 TL_SetStyle(Value25, ResDash+1);
   
// TL_SetStyle(Value26, ResDash+2);
 
//
// today's PHARD3dayAvg
//
   
 Value30 = TL_New(Date, 0930,  PHARD3dayAvg, Date, 1615, PHARD3dayAvg);
 TL_SetColor(Value30, Avg3dayPivotColor);
 TL_SetStyle(Value30, PivotAvgDash);
 
 
// Yesterday = CalcDate(Date, -1);
// Value4 = TL_New(Date[PivotHARDBarsBack*2], 0930, PHARDday1 , Date[PivotHARDBarsBack],1615,  PHARDday1);
// Value5 = TL_New(Date[PivotHARDBarsBack*2], 0930, S1HARDday1, Date[PivotHARDBarsBack],1615, S1HARDday1);
// Value6 = TL_New(Date[PivotHARDBarsBack*2], 0930, R1HARDday1, Date[PivotHARDBarsBack],1615, R1HARDday1);
//
// with DayOffset[] and Modify SYMBOL set to EXCHANGE this seems to lineup on the day..,
 Value4 = TL_New(Date-DayOffset[2], 0930,  PHARDday1, Date-DayOffset[2], 1615,  PHARDday1);
 Value5 = TL_New(Date-DayOffset[2], 0930, S1HARDday1, Date-DayOffset[2], 1615, S1HARDday1);
 Value6 = TL_New(Date-DayOffset[2], 0930, R1HARDday1, Date-DayOffset[2], 1615, R1HARDday1);
 TL_SetColor(Value4, PivotColor);
 TL_SetColor(Value5, SupportColor);
 TL_SetColor(Value6, ResistanceColor);
 TL_SetStyle(Value4, PivotDash);
 TL_SetStyle(Value5, SupDash);
 TL_SetStyle(Value6, ResDash);
//
// yesterday's PHARD3dayAvg1
//    
 Value31 = TL_New(Date-DayOffset[2], 0930,  PHARD3dayAvg1, Date-DayOffset[2], 1615, PHARD3dayAvg1);
 TL_SetColor(Value31, Avg3dayPivotColor);
 TL_SetStyle(Value31, PivotAvgDash);
//
//
// with DayOffset[] and Modify SYMBOL set to EXCHANGE this seems to lineup on the day..,
 Value7 = TL_New(Date-DayOffset[3], 0930,  PHARDday2, Date-DayOffset[3], 1615,  PHARDday2);
 Value8 = TL_New(Date-DayOffset[3], 0930, S1HARDday2, Date-DayOffset[3], 1615, S1HARDday2);
 Value9 = TL_New(Date-DayOffset[3], 0930, R1HARDday2, Date-DayOffset[3], 1615, R1HARDday2);
 TL_SetColor(Value7, PivotColor);
 TL_SetColor(Value8, SupportColor);
 TL_SetColor(Value9, ResistanceColor);
 TL_SetStyle(Value7, PivotDash);
 TL_SetStyle(Value8, SupDash);
 TL_SetStyle(Value9, ResDash);
//
// 2 Days ago PHARD3dayAvg2
//    
 Value32 = TL_New(Date-DayOffset[3], 0930,  PHARD3dayAvg2, Date-DayOffset[3], 1615, PHARD3dayAvg2);
 TL_SetColor(Value32, Avg3dayPivotColor);
 TL_SetStyle(Value32, PivotAvgDash);
//
//
// with DayOffset[] and Modify SYMBOL set to EXCHANGE this seems to lineup on the day..,
 Value10 = TL_New(Date-DayOffset[4], 0930,  PHARDday3, Date-DayOffset[4], 1615,  PHARDday3);
 Value11 = TL_New(Date-DayOffset[4], 0930, S1HARDday3, Date-DayOffset[4], 1615, S1HARDday3);
 Value12 = TL_New(Date-DayOffset[4], 0930, R1HARDday3, Date-DayOffset[4], 1615, R1HARDday3);
 TL_SetColor(Value10, PivotColor);
 TL_SetColor(Value11, SupportColor);
 TL_SetColor(Value12, ResistanceColor);
 TL_SetStyle(Value10, PivotDash);
 TL_SetStyle(Value11, SupDash);
 TL_SetStyle(Value12, ResDash);
//
// 3 Days ago PHARD3dayAvg3
//    
 Value33 = TL_New(Date-DayOffset[4], 0930,  PHARD3dayAvg3, Date-DayOffset[4], 1615, PHARD3dayAvg3);
 TL_SetColor(Value33, Avg3dayPivotColor);
 TL_SetStyle(Value33, PivotAvgDash);
 
//
//
// with DayOffset[] and Modify SYMBOL set to EXCHANGE this seems to lineup on the day..,
 Value13 = TL_New(Date-DayOffset[5], 0930,  PHARDday4, Date-DayOffset[5], 1615,  PHARDday4);
 Value14 = TL_New(Date-DayOffset[5], 0930, S1HARDday4, Date-DayOffset[5], 1615, S1HARDday4);
 Value15 = TL_New(Date-DayOffset[5], 0930, R1HARDday4, Date-DayOffset[5], 1615, R1HARDday4);
 
 TL_SetColor(Value13, PivotColor);
 TL_SetColor(Value14, SupportColor);
 TL_SetColor(Value15, ResistanceColor);
 TL_SetStyle(Value13, PivotDash);
 TL_SetStyle(Value14, SupDash);
 TL_SetStyle(Value15, ResDash);
//
//
// 4 Days ago PHARD3dayAvg4
//    
 Value34 = TL_New(Date-DayOffset[5], 0930,  PHARD3dayAvg4, Date-DayOffset[5], 1615, PHARD3dayAvg4);
 TL_SetColor(Value34, Avg3dayPivotColor);
 TL_SetStyle(Value34, PivotAvgDash);
 
 
//
// PLOT  TOMORROW
//
//
 Value16 = TL_New(Date, 1100,  PHARDday0, Date, 1615, PHARDday0);
 Value17 = TL_New(Date, 1100, S1HARDday0, Date, 1615, S1HARDday0);
 Value18 = TL_New(Date, 1100, R1HARDday0, Date, 1615, R1HARDday0);
 
 
 Value70 = TL_New(Date, 1115, S2HARDday0, Date, 1615, S2HARDday0);
 Value71 = TL_New(Date, 1115, R2HARDday0, Date, 1615, R2HARDday0);
 
  Value72 = TL_New(Date, 1130, S3HARDday0, Date, 1615, S3HARDday0);
  Value73 = TL_New(Date, 1130, R3HARDday0, Date, 1615, R3HARDday0);
 
 
 
// rev 9.0  
 Value19 = TL_New(Date, 1100, PHARD3dayAvg0, Date, 1615, PHARD3dayAvg0);
// TL_SetColor(Value19, yellow);  // rev 5.0
 TL_SetColor(Value19, darkbrown);  // rev 5.0
 TL_SetStyle(Value19, PivotDash0);
 
 // for tomorrow's 3 line color and style
 TL_SetColor(Value16, DarkBlue);  // rev 5.0
 TL_SetColor(Value17, DarkGreen);
 TL_SetColor(Value18, DarkRed);   // was white, rev 5.0
 TL_SetStyle(Value16, PivotDash0);
 TL_SetStyle(Value17, SupDash0);
 TL_SetStyle(Value18, ResDash0);
 
  TL_SetColor(Value70, DarkGreen);  // rev 7.0
 TL_SetColor(Value71, DarkRed);
 
  TL_SetColor(Value72, DarkGreen);  // rev 7.0
 TL_SetColor(Value73, DarkRed);
 
// TL_SetStyle(Value70, ResDash0);
// TL_SetStyle(Value71, SupDash0);

 TL_SetStyle(Value70, 3);
 TL_SetStyle(Value71, 3);
 
 TL_SetStyle(Value72, 2);
 TL_SetStyle(Value73, 2);
 
 
//
// PLOT  WEEKLY
//
//

// with DayOffset[] and Modify SYMBOL set to EXCHANGE this seems to lineup on the day..,
 Value13 = TL_New(Date-DayOffset[dayOff], 0930,  Pweek, Date, 1615,  Pweek);
 Value14 = TL_New(Date-DayOffset[dayOff], 0930, S1week, Date, 1615, S1week);
 Value15 = TL_New(Date-DayOffset[dayOff], 0930, R1week, Date, 1615, R1week);
 
 
 
 Value16 = TL_New(Date-DayOffset[dayOff], 0930, P3week, Date, 1615, P3week);
 
 Value17 = TL_New(Date-DayOffset[dayOff], 0930, R2week, Date, 1615, R2week);
 Value18 = TL_New(Date-DayOffset[dayOff], 0930, S2week, Date, 1615, S2week);
 
   
 TL_SetColor(Value13, PivotColor);
 TL_SetColor(Value14, SupportColor);
 TL_SetColor(Value15, ResistanceColor);
 TL_SetColor(Value16, yellow);
 
 TL_SetColor(Value17, darkRed);
 TL_SetColor(Value18, darkGreen);
 
 
 TL_SetStyle(Value13, 1);
 TL_SetStyle(Value14, 1);
 TL_SetStyle(Value15, 1);
 TL_SetStyle(Value16, 1);
 TL_SetStyle(Value17, 1);
  TL_SetStyle(Value18, 1);
 
 weekSize= 3;
 
  Tl_setsize(Value13,weekSize);
  Tl_setsize(Value14,weekSize);
  Tl_setsize(Value15,weekSize);
Tl_setsize(Value16,weekSize);


Tl_setsize(Value17,weekSize-1);
Tl_setsize(Value18,weekSize-1);
 
 
 
 
 
 
//
// PLOT NEXT WEEKLY
//
//  iff Friday ONLY  R1, P S1, P3

If (dayOff = 1) then Begin
 
 Value13 = TL_New(Date , 0930,  PNweek, Date, 1615,  PNweek);
 Value14 = TL_New(Date , 0930, S1Nweek, Date, 1615, S1Nweek);
 Value15 = TL_New(Date , 0930, R1Nweek, Date, 1615, R1Nweek);
 
 Value16 = TL_New(Date , 0930, P3Nweek, Date, 1615, P3Nweek);
 
   
 TL_SetColor(Value13, PivotColor);
 TL_SetColor(Value14, SupportColor);
 TL_SetColor(Value15, ResistanceColor);
 TL_SetColor(Value16, yellow);
   
 
 TL_SetStyle(Value13, 2);
 TL_SetStyle(Value14, 2);
 TL_SetStyle(Value15, 2);
 TL_SetStyle(Value16, 2);
   
  Tl_setsize(Value13,weekSize-3);
  Tl_setsize(Value14,weekSize-3);
  Tl_setsize(Value15,weekSize-3);
Tl_setsize(Value16,weekSize-3);

end; // IFF Friday...
 
 
 
 
 
//
//
//  Draw MONTHLY R3-P-S3   Resistance & Support #'s
//
//  Date
//  1091016.00  -  1091000.00 = 16.00 = MonthDateOffset
//

{
  MonthDateOffset = ( Date - IntPortion((Date/100)) *100  ) -1 ;


  Value96 = TL_New(Date-MonthDateOffset, 0930,  MonthR3, Date, 1600,  MonthR3);
   TL_SetColor(Value96, red);
   TL_SetSize(Value96, 3);
   TL_SetStyle(Value96, PivotDash0);

  Value95 = TL_New(Date-MonthDateOffset, 0930,  MonthR2, Date, 1600,  MonthR2);
   TL_SetColor(Value95, red);
   TL_SetSize(Value95, 2);
   TL_SetStyle(Value95, PivotDash0);

  Value94 = TL_New(Date-MonthDateOffset, 0930,  MonthR1, Date, 1600,  MonthR1);
   TL_SetColor(Value94, red);
   TL_SetSize(Value94, 1);
   TL_SetStyle(Value94, PivotDash0);

 
 Value91 = TL_New(Date-MonthDateOffset, 0930,  MonthPivot, Date, 1600,  MonthPivot);
   TL_SetColor(Value91, blue);
   TL_SetSize(Value91, 0);
   TL_SetStyle(Value91, PivotDash0);


   Value93 = TL_New(Date-MonthDateOffset, 0930,  MonthS1, Date, 1600,  MonthS1);
   TL_SetColor(Value93, green);
   TL_SetSize(Value93, 1);
   TL_SetStyle(Value93, PivotDash0);

   Value92 = TL_New(Date-MonthDateOffset, 0930,  MonthS2, Date, 1600,  MonthS2);
   TL_SetColor(Value92, green);
   TL_SetSize(Value92, 2);
   TL_SetStyle(Value92, PivotDash0);

   Value90 = TL_New(Date-MonthDateOffset, 0930,  MonthS3, Date, 1600,  MonthS3);
   TL_SetColor(Value90, green);
   TL_SetSize(Value90, 3);
   TL_SetStyle(Value90, PivotDash0);

}  


//
//
//  Draw NEXT MONTHLY R3-P-S3   Resistance & Support #'s
//
//  Date
//  1091016.00  -  1091000.00 = 16.00 = MonthDateOffset
//


  NMonthDateOffset = ( Date - IntPortion((Date/100)) *100  ) -10 ;
{
  Value86 = TL_New(Date-NMonthDateOffset, 0930,  NMonthR3, Date+5, 1600,  NMonthR3);
   TL_SetColor(Value86, yellow);
   TL_SetSize(Value86, 3);
   TL_SetStyle(Value86, PivotDash0);

  Value85 = TL_New(Date-MonthDateOffset, 0930,  NMonthR2, Date+5, 1600,  NMonthR2);
   TL_SetColor(Value85, yellow);
   TL_SetSize(Value85, 2);
   TL_SetStyle(Value85, PivotDash0);
}


   
{

   Value94 = TL_New(Date-MonthDateOffset, 0930,  MonthR1, Date, 1600,  MonthR1);
   TL_SetColor(Value94, red);
   TL_SetSize(Value94, 1);
   TL_SetStyle(Value94, PivotDash0);

   Value91 = TL_New(Date-MonthDateOffset, 0930,  MonthPivot, Date, 1600,  MonthPivot);
   TL_SetColor(Value91, blue);
   TL_SetSize(Value91, 0);
   TL_SetStyle(Value91, PivotDash0);

   Value93 = TL_New(Date-MonthDateOffset, 0930,  MonthS1, Date, 1600,  MonthS1);
   TL_SetColor(Value93, green);
   TL_SetSize(Value93, 1);
   TL_SetStyle(Value93, PivotDash0);

   Value92 = TL_New(Date-MonthDateOffset, 0930,  MonthS2, Date, 1600,  MonthS2);
   TL_SetColor(Value92, green);
   TL_SetSize(Value92, 2);
   TL_SetStyle(Value92, PivotDash0);

   Value90 = TL_New(Date-MonthDateOffset, 0930,  MonthS3, Date, 1600,  MonthS3);
   TL_SetColor(Value90, green);
   TL_SetSize(Value90, 3);
   TL_SetStyle(Value90, PivotDash0);

// end next month   -----------------

}





//  Print(Date,"   ", IntPortion((Date/100))*100," ", (Date-MonthDateOffset)-1, "C=",Close, newline );
//
//
//
//   day of the week TEST STRING Printing  
//
//
// set a TEXT string to print day of week: mon, tue, wed, thu, fri on screen
 Value50 = Text_New(Date-DayOffset[1], Time, R1HARDday0 , DayOfWeekString0+" Py" );
 Text_SetColor(Value50, white);
 Text_SetLocation(Value50, Date-DayOffset[1], Time-300, (PHARDday0 +( (PHARDday0-S1HARDday0)/4  )  ));
 Value51 = Text_New(Date-DayOffset[2], Time, R1HARDday0 , DayOfWeekString1 );
 Text_SetColor(Value51, white);
 Text_SetLocation(Value51, Date-DayOffset[2], Time-300, (PHARDday0 -( (PHARDday0-S1HARDday0)/4  )  ));
 Value52 = Text_New(Date-DayOffset[3], Time, R1HARDday0 , DayofWeekString2 );
 Text_SetColor(Value52, white);
 Text_SetLocation(Value52, Date-DayOffset[3], Time-300, (PHARDday0 -( (PHARDday0-S1HARDday0)/4  )  ));  
 Value53 = Text_New(Date-DayOffset[4], Time, R1HARDday0 , DayOfWeekString3 );
 Text_SetColor(Value53, white);
 Text_SetLocation(Value53, Date-DayOffset[4], Time-300, (PHARDday0 +( (PHARDday0-S1HARDday0)/4  )   ));
 
 Value54 = Text_New(Date-DayOffset[5], Time, R1HARDday0 , DayOfWeekString4+" Py" );
 Text_SetColor(Value54, white);
 Text_SetLocation(Value54, Date-DayOffset[5], Time-300, (PHARDday0 -( (PHARDday0-S1HARDday0)/4  )  ));
 
{  
// set a TEXT number to print S1, P, R1 values on screen
 Value60 = Text_New(Date, Time, R1HARDday0 , "R1="+ NumToStr(R1HARDday0, 2) );
 Text_SetColor(Value60, white);
 Text_SetLocation(Value60, Date, Time-500, (PHARDday0 +( (PHARDday0-S1HARDday0)/3  )   ));
 Value61 = Text_New(Date, Time, S1HARDday0 , "S1="+ NumToStr(S1HARDday0, 2) );
 Text_SetColor(Value61, Green);
 Text_SetLocation(Value61, Date, Time-500, (PHARDday0 -( (PHARDday0-S1HARDday0)/3  )  ));
 Value62 = Text_New(Date, Time, PHARDday0 , " P="+ NumToStr(PHARDday0, 2) );
 Text_SetColor(Value62, blue);
 Text_SetLocation(Value62, Date, Time-500, (PHARDday0+0)  );
 
 
// set a TEXT number to print R2, S2 values on screen
 Value63 = Text_New(Date, Time, R2HARDday0 , "R2="+ NumToStr(R2HARDday0, 2) );
 Text_SetColor(Value63, lightgray);
 Text_SetLocation(Value63, Date, Time-500, (PHARDday0 +( (PHARDday0-S1HARDday0)/2  )   ));
 Value64 = Text_New(Date, Time, S2HARDday0 , "S2="+ NumToStr(S2HARDday0, 2) );
 Text_SetColor(Value64, DarkGreen);
 Text_SetLocation(Value64, Date, Time-500, (PHARDday0 -( (PHARDday0-S1HARDday0)/2  )  ));
 
 
 
// set a TEXT number to print R3, S3 values on screen
 Value65 = Text_New(Date, Time, R3HARDday0 , "R3="+ NumToStr(R3HARDday0, 2) );
 Text_SetColor(Value65, darkgray);
 Text_SetLocation(Value65, Date, Time-500, (PHARDday0 +( (PHARDday0-S1HARDday0)/1.5  )   ));
 Value66 = Text_New(Date, Time, S3HARDday0 , "S3="+ NumToStr(S3HARDday0, 2) );
 Text_SetColor(Value66, DarkGreen);
 Text_SetLocation(Value66, Date, Time-500, (PHARDday0 -( (PHARDday0-S1HARDday0)/1.5  )  ));
 
}
 
 
// S1avgDayWeek = (S1day + S1week)/2;
// Value5 = TL_New(Date[5], Time[5], S1avgDayWeek , Date, Time, S1avgDayWeek );
// TL_SetColor(Value5, Magenta);
// Value6 = Text_New(Date, Time, S1avgDayWeek , NumToStr(S1avgDayWeek, 2) );
// Text_SetColor(Value6, Magenta);
// Text_SetLocation(Value6, Date, Time, (Pweek+S1avgDayWeek)/2 );
 end;    // if lastbaronchart
 
//Value1=Text_SetString(1,"c:pvts.txt");
// Print(File("c:\pivots.txt"),Symbol,":day:", ELDateToString(Date), "  R1="+NumtoStr(R1day,2),
//     "  P="+NumtoStr(Pday,2), "  S1="+NumtoStr(S1day,2),"  S2="+NumtoStr(S2day,2),
//   " |  High, Low, Close=",High,Low,Close );
// this is the one...
//FileAppend("c:\PivotsDay.txt", NewLine+Symbol+" (Day)  "+ ELDateToString(Date)+
//   " | Open, High, Low, Close=  "+NumtoStr(Open,2)+ ", "+ NumtoStr(High,2)+ ", "+NumtoStr(Low,2)+", "+NumtoStr(Close,2)+
//   NewLine +
//   "  R3="+NumtoStr(R3day,2)+
//   "  R2="+NumtoStr(R2day,2)+
//    "  R1="+NumtoStr(R1day,2)+
//     "  P="+NumtoStr(Pday,2)+
//   "  S1="+NumtoStr(S1day,2)+
//   "  S2="+NumtoStr(S2day,2)+
//   "  S3="+NumtoStr(S3day,2)+
//         NewLine);
// FileAppend("c:\pivots.txt",  "APPENDED:day1:"+NumtoStr( Date,0)+ "  R1="+NumtoStr(R1day,2)+
//    "  P="+NumtoStr(Pday,2)+ "  S1="+NumtoStr(S1day,2)+"  S2="+NumtoStr(S2day,2)+
//   " |  High, Low, Close=");
//   ,High,Low,Close );
//if lastbaronchart then begin
 
// Value3 = TL_New(Date[60], Time[60], Pday, Date, Time, Pday);
// TL_SetColor(Value3, Cyan);
//  Value4 = TL_New(Date[90], Time[90], Pweek, Date, Time, Pweek);
// TL_SetColor(Value4, Blue);
// end;
//end;


//FileAppend("c:\PivotsDay.txt", NewLine+Symbol+" (Day)  "+ ELDateToString(Date)+
//   " | Open, High, Low, Close=  "+NumtoStr(Open,2)+ ", "+ NumtoStr(High,2)+ ", "+NumtoStr(Low,2)+", "+NumtoStr(Close,2)+
//   NewLine +
//   "  R3="+NumtoStr(R3day,2)+
//   "  R2="+NumtoStr(R2day,2)+
//    "  R1="+NumtoStr(R1day,2)+
//     "  P="+NumtoStr(Pday,2)+
//   "  S1="+NumtoStr(S1day,2)+
//   "  S2="+NumtoStr(S2day,2)+
//   "  S3="+NumtoStr(S3day,2)+
//         NewLine);
// FileAppend("c:\pivots.txt",  "APPENDED:day1:"+NumtoStr( Date,0)+ "  R1="+NumtoStr(R1day,2)+
//    "  P="+NumtoStr(Pday,2)+ "  S1="+NumtoStr(S1day,2)+"  S2="+NumtoStr(S2day,2)+
//   " |  High, Low, Close=");
//   ,High,Low,Close );

{

if lastbaronchart then begin

FileAppend("c:\_dev\Projects\algo-python\tradestation.txt", NewLine+Symbol+"  "+ ELDateToString(Date)+" "+Timetostring(time)+ " | Open, High, Low, Close=  "+NumtoStr(Open,2)+ ", "+ NumtoStr(High,2)+ ", "+NumtoStr(Low,2)+", "+NumtoStr(Close,2)+ NewLine );

end;
}



