//blackops.js

let      gInterval="day";   // = intrv0;
let      gIntervalCrypto="day";   // = intrv0;
let      gFetchCandlesStatus ="attempting";
let      gGET_SymbolCryptoStr="BTCUSD";
let      gCurrency="$";

// DAY                                  "day"
function GetAlphaAdvantageDataCrypto(  intrv0 )
{
  gInterval = intrv0;
  gIntervalCrypto = intrv0;
  gFetchCandlesStatus="attempting";
//   setCryptoDrawState(1);

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
//           //   console.log("No Alpha Data - clearing gTicker ExistsAV");
//           //   gTickerExi stsAV = 0;
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
            console.log("No Alpha Data - clearing gTickerExi stsAV");
            gTicker xistsAV = 0;
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


let dummyStr ="blackops.js  is here  this is a signal from beyond Area 51 ahahaha";
console.log(dummystr);