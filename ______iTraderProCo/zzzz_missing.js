//missing.js



  // var gObjsLoadedOverviewIDX = 12 ;
  // var gObjsLoadedWatchEarnIDX = 31 ;
  // const gDailyStockCSVIdx = 32;





//  function DrawOverviewData(){

//       gObjsLoadedObj[ gObjsLoadedOverviewIDX ].symbol = gGET_SymbolStr.toLowerCase() ;
//       gObjsLoadedObj[ gObjsLoadedOverviewIDX ].assettype = "stocks" ;
//       gObjsLoadedObj[ gObjsLoadedOverviewIDX ].aux = gEarningsCorpStr ;

//       gObjsLoadedObj[ gObjsLoadedOverviewIDX ].obj = objOverview ;

// //....
// }








 // apikey
let delCandles;
function ComputeAndRenderCandles( cArray ){

        // reset Len each time
        candlesLen = cArray.length / candlesOffset ;
        // candlesLen = ClampC andlesLen(cArray);

        let newstart = 0; 
        let candlesClamp = gAlphaFullMax ;  //252 * 2.5 ;          
        let origLen = candlesLen;

//////////////////////////////////////////////////////// CLAMPING
//////////////////////////////////////////////////////// CLAMPING
//////////////////////////////////////////////////////// CLAMPING

// // 32: {datatype: 'dailycsv', symbol: '000', assettype: '000', aux: 'nil', obj: {…}, …}

// // we could check here ; fn() to ck 1st
//     gObjsLoadedObj[ gDailyStockCSVIdx ].obj        = [...cArray];     // orig csv 20year 5733 candles
//     gObjsLoadedObj[ gDailyStockCSVIdx ].symbol     = gGET_SymbolStr.toLowerCase();
//     gObjsLoadedObj[ gDailyStockCSVIdx ].assettype  = "stocks";        // .datatype is hard set by prg at init
//     console.log(  gObjsLoadedObj[ gDailyStockCSVIdx ]  );

//.... 

}






function formStaticWatchlist(){


  gObjsLoadedObj[ gObjsLoadedWatchEarnIDX ].obj = objPre ;
  gObjsLoadedObj[ gObjsLoadedWatchEarnIDX ].objPost = objPost ;
///....
}






