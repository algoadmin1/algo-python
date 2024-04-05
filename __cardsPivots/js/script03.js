// script.js for /search endpoint ui data for user
// const fs = require('fs');


let gCryptoSym="BTC";
let gSecurityType="stocks";
let jb_json = [
    {a:"b", c:"d", e:"f"}
];

const cardDataADBE = [
    {
        tradeDate:  "2024-03-20",
        tradeTime:  "1300",
        tradeType:  "BUY",
        tradeSize:  "10",
        symbol:  "ADBE",
        tradeCond:  "atLimit",
        tradePrice:  "515.02",
        rawtradeId:  "3703",
        tradeCnt:  "4",
        tradeAboveBelow:  "above",
        tradePivot:  "S1",
        priceDist:  "2.58",
        pricePct:  "0.5016%", 
        daySRs:  "R3R2R1_P_P3_S1S2S3=|536.37|531.25|526.13|517.56|525.03|512.44|503.87|498.75|",
   }
];

const cardDataOrig = [
    {
        tradeDate: "2024-03-20",
        tradeTime: "1600",
        tradeType: "SELL",
        tradeSize: "10",
        symbol: "MSFT",
        tradeCond: "atLimit",
        tradePrice: "425.04",
        rawtradeId: "3720",
        tradeCnt: "6",
        tradeAboveBelow: "above",
        tradePivot: "R1",
        priceDist: "1.53",
        pricePct: "0.3600%",
        daySRs: "R3R2R1_P_P3_S1S2S3=|427.79|425.65|423.51|419.53|419.44|417.39|413.41|411.27|",
    },
    {
        tradeDate: "2024-03-20",
        tradeTime: "1600",
        tradeType: "SELL",
        tradeSize: "10",
        symbol: "AMZN",
        tradeCond: "atLimit",
        tradePrice: "177.95",
        rawtradeId: "3721",
        tradeCnt: "6",
        tradeAboveBelow: "above",
        tradePivot: "R1",
        priceDist: "1.14",
        pricePct: "0.6406%",
        daySRs: "R3R2R1_P_P3_S1S2S3=|178.66|177.74|176.81|175.17|176.28|174.24|172.60|171.67|",
    },
    {
        tradeDate: "2024-03-20",
        tradeTime: "1600",
        tradeType: "SELL",
        tradeSize: "10",
        symbol: "NVDA",
        tradeCond: "atLimit",
        tradePrice: "901.01",
        rawtradeId: "3723",
        tradeCnt: "8",
        tradeAboveBelow: "below",
        tradePivot: "R1",
        priceDist: "-15.25",
        pricePct: "-1.6928%",
        daySRs: "R3R2R1_P_P3_S1S2S3=|960.78|938.52|916.26|883.18|885.41|860.92|827.84|805.58|",
    },
    {
         tradeDate: "2024-03-20",
         tradeTime: "1500",
         tradeType: "BUY",
         tradeSize: "10",
         symbol: "SPY",
         tradeCond: "atLimit",
         tradePrice: "517.17",
         rawtradeId: "3719",
         tradeCnt: "5",
         tradeAboveBelow: "above",
         tradePivot: "S1",
         priceDist: "4.57",
         pricePct: "0.8837%",
         daySRs: "R3R2R1_P_P3_S1S2S3=|520.88|519.18|517.48|514.30|512.72|512.60|509.42|507.72|",
    },
    {
         tradeDate:  "2024-03-20",
         tradeTime:  "1300",
         tradeType:  "BUY",
         tradeSize:  "10",
         symbol:  "ADBE",
         tradeCond:  "atLimit",
         tradePrice:  "515.02",
         rawtradeId:  "3703",
         tradeCnt:  "4",
         tradeAboveBelow:  "above",
         tradePivot:  "S1",
         priceDist:  "2.58",
         pricePct:  "0.5016%", 
         daySRs:  "R3R2R1_P_P3_S1S2S3=|536.37|531.25|526.13|517.56|525.03|512.44|503.87|498.75|",
    },
    {
         tradeDate: "2024-03-20",
         tradeTime: "1430",
         tradeType: "BUY",
         tradeSize: "10",
         symbol: "ROKU",
         tradeCond: "atLimit",
         tradePrice: "64.03",
         rawtradeId: "3716",
         tradeCnt: "8",
         tradeAboveBelow: "above",
         tradePivot: "S1",
         priceDist: "0.59",
         pricePct: "0.9214%",
         daySRs: "R3R2R1_P_P3_S1S2S3=|68.53|67.19|65.85|64.78|64.26|63.44|62.37|61.03|",
    }
    // end ...
];


async function readJsonUrl(jsonUrl) {
    try {
        // Fetch JSON data from the provided URL
        const response = await fetch(jsonUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse JSON data
        const jsonData = await response.json();

        // Convert JSON data to the proper JavaScript format
        const convertedData = jsonData.map(trade => {
            // Remove double quotes around each field
            const convertedTrade = {};
            for (const key in trade) {
                const trimmedKey = key.trim();
                const value = trade[key].trim();
                convertedTrade[trimmedKey] = value;
            }
            return convertedTrade;
        });

        // Return the converted JSON array
        return convertedData;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

// // Example usage
// const jsonUrl = 'https://algoinvestorr.com/trades/rawtrades/cuedtrades.json';
// readJsonUrl(jsonUrl)
//     .then(data => {
//         console.log(data); // Output the converted JSON array
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });





async function readJsonUrl1(jsonUrlStr) {
    try {
        // Fetch JSON data from the provided URL
        // const response = await fetch(jsonUrlStr);
        const response = await fetch(jsonUrlStr, {
            mode: 'no-cors'
        });
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse JSON response
        const jsonData = await response.json();

        // Return the array of JSON records
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}


async function readBigStringUrl(urlStr) {
    try {
        // Fetch data from the provided URL
        const response = await fetch(urlStr);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Read the response body as text
        const textData = await response.text();

        // Return the string data
        return textData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


function chopString(string0, char0, elemNum) {
    // Check if string0 is null, empty, or undefined
    if (!string0) {
        console.error('Error: string0 is null or empty.');
        return null;
    }

    // Check if char0 is null, empty, or not a single character
    if (!char0 || char0.length !== 1) {
        console.error('Error: char0 is null, empty, or not a single character.');
        return null;
    }

    // Parse the string using the character char0
    const parsed = string0.split(char0);

    // Check if elemNum is in range
    if (elemNum < 0 || elemNum >= parsed.length) {
        console.error('Error: elemNum is out of range.');
        return null;
    }

    // Return the parsed element at index elemNum
    return parsed[elemNum];
}

// // Example usage
// const string0 = "apple,banana,cherry,date";
// const char0 = ",";
// const elemNum = 2;
// console.log(chopString(string0, char0, elemNum)); // Output: "cherry"



function convertDate(udateStr) {
    // Check if the input string is in the correct format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(udateStr)) {
        console.error('Error: udateStr is not in the correct format ("YYYY-MM-DD").');
        return null;
    }

    // Parse the date string
    const [year, month, day] = udateStr.split('-');

    // Get the month abbreviation
    const monthAbbreviation = new Date(udateStr).toLocaleString('en-us', { month: 'short' });

    // Construct the converted date string
    const convertedDate = `${monthAbbreviation} ${parseInt(day, 10)}`;

    return convertedDate;
}

// // Example usage
// const udateStr = "2024-03-21";
// console.log(convertDate(udateStr)); // Output: "Mar 21"



function removeChar(string0, char0, charNum) {
    // Check if charNum is out of range
    if (charNum < 0 || charNum >= string0.length) {
        console.error('Error: charNum is out of range.');
        return null;
    }

    // Check if string0 is null or empty
    if (!string0) {
        console.error('Error: string0 is null or empty.');
        return null;
    }

    // Extract the character at charNum position in string0
    const charAtIndex = string0[charNum];

    // Check if charAtIndex is equal to char0
    if (charAtIndex === char0) {
        // Remove the character at charNum position from string0
        const modifiedString = string0.slice(0, charNum) + string0.slice(charNum + 1);
        return modifiedString;
    } else {
        // Return the original string if characters are not the same
        return string0;
    }
}

// // Example usage
// const string0 = "hello";
// const char0 = "l";
// const charNum = 2;
// console.log(removeChar(string0, char0, charNum)); // Output: "helo"



function testStringForChar(str0, char0) {

     // Check if str0 or char0 is null or empty
     if (!str0 || str0 === "" || !char0 || char0 === "") {
        return -1;
    }
    // Loop through each character of the string
    for (let i = 0; i < str0.length; i++) {
        // Check if the current character matches the target character
        if (str0[i] === char0) {
            // If found, return the position/index of the character
            return i;
        }
    }
    // If not found, return -1
    return -1;
}


function GetSecurityType( sym0 ){
    // Example usage:
    const position = testStringForChar(  sym0, "-" );
    let sectype = "stocks";
    let slen = sym0.length;

    console.log("position==",position); // Output will be 4, as 'o' is at index 4 in the string "Hello World"
    console.log("sym0 len==",slen);  

    if(position>1){
        gCryptoSym = removeChar(sym0, "-", position );  

    }

    if( (slen-1) == position ){
        sectype = "crypto";
    }
    return(sectype);

}


function checkForGraphixReturnFname(symL, extstr, defaultstr){
    // if(symL != arr[])  symL  = defaultstr;  //"ai_.png"
    let fname=symL;
    let fname1=fname+extstr;        // ie  aapl.png or doge.png 
    let tf01=CheckFileExist( fname1 );

    if(tf01==0){
        fnamestr= defaultstr ;   // ie ai_.png logo img
        // fnamestr= "blank.gif" ;  // test
    }else if(tf01==1){
        fnamestr=fname1;  
    }
    return(fnamestr);
}

let gGeoPoliticalEvents=[
    // an array of obj's
    
    { udate: "2009-03-17", ev:"11-yr Cycle: Stock Market Bottoms: Housing Crash", tag:"tag" },
    { udate: "2009-03-17", ev:"11-yr Cycle: Stock Market Bottoms: Housing Crash", tag:"tag" },
    { udate: "2009-03-17", ev:"11-yr Cycle: Stock Market Bottoms: Housing Crash", tag:"tag" }
];
        
 
// const fs = require('fs');
function checkArray(arr, filenamestr) {
    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
        // Check if the current element matches filenamestr
        if (arr[i] === filenamestr) {
            // If found, return true
            return true;
        }
    }
    // If not found, return false
    return false;
}

// // Example usage:
// const filenames = ["file1.txt", "file2.txt", "file3.txt"];
// const filenameToCheck = "file2.txt";
// console.log(checkArray(filenames, filenameToCheck)); // Output: true
// const filenameToCheck2 = "file4.txt";
// console.log(checkArray(filenames, filenameToCheck2)); // Output: false

function CheckFileExist(filenamestr){
    let tf=checkArray( gImgFiles, filenamestr );
    return(tf);
}

// function Che ckFileExist(filenamepathstr){
//         try {
//         // Check if the file exists
//         fs.accessSync(filenamepathstr, fs.constants.F_OK);
//         // If the file exists, return 1
//         return 1;
//     } catch (err) {
//         // If the file does not exist or there is an error, return 0
//         return 0;
//     }
// }

// Example usage:
// const result1 = Chec  kFileExist("path/to/your/file.txt");
// console.log(result1); // Output will be 1 if the file exists, otherwise 0

// const result2 = Check FileExist("nonexistentfile.txt");
// console.log(result2); // Output will be 0 as the file does not exist



// ###########################################
// ###########################################
// ###########################################

// let fetchedObj=[];
// //
// //  note : seriesInterval is like datatype  TESTer fn !!!!
// //function G3tAlphaAdvantageStockDataNewTES Tfetch("quote", fet chedObj , "nil")
// //
// function GetAlphaVantageStockDataNewTESTfetch(seriesInterval, objTarget, insetFlagStr)
// {
//   let urlTarget;     
//   gRenderInsetFlag =0;

// // this is the incoming target, so it is nullified
//   objTarget=[];

//       console.log("G3tAlphaAdvantageStockData()  interval/datatype=, obj, insetFlagStr=");
//       console.log(seriesInterval);
//       console.log(insetFlagStr);
      
//       if(insetFlagStr=="insert"){
//          gRenderInsetFlag =1;

//       }
 
//  // default for indicators (e.g., RSI, STOCH) & some commodities
// let seriesIntervalTime = "daily";

// const urlsample ='https://itraderpro.co/jsonsample.php'; //https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;

//  // stocks intraday
// const urlcsv = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
//     apikeyStr+'&datatype=csv';

// const urlcsvFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
//    '&outputsize=full'+ apikeyStr+'&datatype=csv';

// const urlIntradayFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + gGET_SymbolStr + '&interval='+seriesInterval+
//    '&outputsize=full'+ apikeyStr ;

//     // &interval=5min&outputsize=full&apikey=demo

// // stocks monthly
//    const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
//    // const urlMonthlyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// // stocks weekly
//   const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=' + gGET_SymbolStr+  apikeyStr ; 
//   // const urlWeeklyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + gGET_SymbolStr+  apikeyStr ; 

// // stocks daily
//    // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
//   const urlDailyCompact= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr + apikeyStr ; 
//   // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo
//   const urlDailyFull = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + gGET_SymbolStr+ '&outputsize=full'+ apikeyStr ; 

// // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
// const urlQuote = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ gGET_SymbolStr + apikeyStr  ;
    
// //https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo
// const urlEarningsAll = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month' + apikeyStr  ;
// //https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=IBM&horizon=12month&apikey=demo
// const urlEarnings = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol='+ gGET_SymbolStr +'&horizon=12month' + apikeyStr  ;


// //
// //
// // new fed, gdp, etc
// let maturitytype = seriesInterval;     // &maturity= 3month, 2year, 5year, 7year, 10year, and 30year in the case of treasuries
//    // interval=monthly. Strings == daily, weekly, and monthly
// const urltreas  =  'https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily' +'&maturity='+maturitytype + apikeyStr;

// //
// //   FED '7'
// //
// // interval=monthly. Strings daily, weekly, and monthly 
// const urlfed   =  'https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval='+seriesInterval+ apikeyStr ;
// const urlgdp   =  'https://www.alphavantage.co/query?function=REAL_GDP&interval='+seriesInterval+ apikeyStr ;
// const urlcpi   =  'https://www.alphavantage.co/query?function=CPI&interval='+seriesInterval+ apikeyStr ;
// // annual yearly only
// const urlinflation     =  'https://www.alphavantage.co/query?function=INFLATION'+apikeyStr;
// const urlretailsales   =  'https://www.alphavantage.co/query?function=RETAIL_SALES' +apikeyStr;
// const urlunemployment   =  'https://www.alphavantage.co/query?function=UNEMPLOYMENT' +apikeyStr;
// const urlconsumer       =  'https://www.alphavantage.co/query?function=CONSUMER_SENTIMENT' +apikeyStr;
// //
// //
// //

// const urlcashflow ='https://www.alphavantage.co/query?function=CASH_FLOW&symbol='+ gGET_SymbolStr +  apikeyStr;

// const urlrsi    = 'https://www.alphavantage.co/query?function=RSI&symbol='    + gGET_SymbolStr + '&interval='+seriesIntervalTime+ '&time_period=10&series_type=open'+ apikeyStr ;
// // https://www.alphavantage.co/query?function=RSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo

// const urlstoch  = 'https://www.alphavantage.co/query?function=STOCH&symbol='  + gGET_SymbolStr +'&interval='+seriesIntervalTime+ apikeyStr ; 
// const urlobv    = 'https://www.alphavantage.co/query?function=OBV&symbol='    + gGET_SymbolStr +'&interval='+seriesIntervalTime+ apikeyStr ; 

// // intraday only
// const urlvwap   = 'https://www.alphavantage.co/query?function=VWAP&symbol='  + gGET_SymbolStr +'&interval='+seriesInterval+ apikeyStr ; 

// //
// // 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly
// const urlcci    =  'https://www.alphavantage.co/query?function=CCI'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+   '&time_period=10'  + apikeyStr ; 

// const urladx    =  'https://www.alphavantage.co/query?function=ADX'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+   '&time_period=10'  + apikeyStr ; 
// // https://www.alphavantage.co/query?function=ADX&symbol=IBM&interval=daily&time_period=10&apikey=demo

// const urlbbands =  'https://www.alphavantage.co/query?function=BBANDS'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+'&time_period=5&series_type=close&nbdevup=3&nbdevdn=3'  + apikeyStr ; 
// //https://www.alphavantage.co/query?function=BBANDS&symbol=IBM&interval=weekly&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=demo



// const urlatr    =  'https://www.alphavantage.co/query?function=ATR'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+   '&time_period=14'  + apikeyStr ; 
// // https://www.alphavantage.co/query?function=ATR&symbol=IBM&interval=daily&time_period=14&apikey=demo

// const urlsma    =  'https://www.alphavantage.co/query?function=SMA'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+   '&time_period=200&series_type=open'  + apikeyStr ; 
// //https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo

// const urlmacd    =  'https://www.alphavantage.co/query?function=MACD'+ '&symbol=' + gGET_SymbolStr  +'&interval='+seriesIntervalTime+   '&series_type=open'  + apikeyStr ; 
// // https://www.alphavantage.co/query?function=MACD&symbol=IBM&interval=daily&series_type=open&apikey=demo

// // const urlpeband =""; 
// // const urldivhist =""; 

// // commodities
// const urlwti      =  'https://www.alphavantage.co/query?function=WTI&interval='+seriesIntervalTime+  apikeyStr ; 
// //https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=demo

// const urlbrent    =  'https://www.alphavantage.co/query?function=BRENT&interval='+seriesIntervalTime+   apikeyStr ; 
// //https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=demo

// const urlnatgas    =  'https://www.alphavantage.co/query?function=NATURAL_GAS&interval='+seriesIntervalTime+   apikeyStr ; 
// // https://www.alphavantage.co/query?function=NATURAL_GAS&interval=monthly&apikey=demo

// const urlcopper       =  'https://www.alphavantage.co/query?function=COPPER&interval=monthly' +  apikeyStr ; 
// // https://www.alphavantage.co/query?function=COPPER&interval=monthly&apikey=demo

// const urlaluminum       =  'https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly' +  apikeyStr ; 
// // https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=demo
 
//  // resrvd
//  const urlnews = "";

// //
// // forex
// //
// let fxFrom = "EUR",  fxTo   = "USD";
// const urlfx        =  'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=' + fxFrom+'&to_symbol=' + fxTo +  apikeyStr ; 
// // const urlfx        =  'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD' +  apikeyStr ; 
// // https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo


// // btnmore
  
 
// let JSONok = 1;

// // seriesInterval="earningsAll" "10year",  "15min" "consumer" ;
//       seriesInterval= seriesInterval.toLowerCase();
//       console.log("seriesInterval==");
//       console.log(seriesInterval);

//       switch(seriesInterval){
//         case "earningsAll":
//         case "earningsall":
//            urlTarget =  urlEarningsAll; 
//            JSONok = 0;
 
//           break;
//         case "earnings":
//            urlTarget =  urlEarnings;  
//            JSONok = 0;

//           break;
//         case "quote":
//            urlTarget =  urlQuote;  
//           break;

//    // timeseries data here       
//         case "m":
//         case "mo":
//         case "month":
//         case "mon":
//         case "monthly":
//            urlTarget =  urlMonthlyFull;  
//           break;
//         case "w":
//         case "wk":
//         case "week":
//         case "weekly":
//            urlTarget =  urlWeeklyFull;
//           break;

//        case "dailyCompact":
//        case "dailycompact":
//        case "dailysmall":
//           urlTarget = urlDailyCompact;
//           break;
//        case "daily":
//        case "day":
//        case "d":
//            urlTarget = urlDailyFull;
//           break;
//        case "1min":
//            urlTarget = urlIntradayFull;
//           break;
//        case "5min":
//            urlTarget = urlIntradayFull;
//           break;
//        case "10min":
//            urlTarget = urlIntradayFull;
//           break;
//        case "15min":
//            urlTarget = urlIntradayFull;
//           break;
//        case "30min":
//            urlTarget = urlIntradayFull;
//           break;
//        case "60min":    
//           urlTarget = urlIntradayFull;
//           break;

// // new
//     // treasuries
//      case "30year":
//      case "10year":
//      case "7year":
//      case "5year":
//      case "2year":
//      case "3month":
//        urlTarget= urltreas;
//       break;
//       // case "jsonsample":
//       //  urlTarget= urlsample;
//       // break;

//       // fed data
//      case "fed":
//       urlTarget= urlfed;
//       break;
//      case "gdp":
//       urlTarget= urlgdp;
//       break;
//      case "cpi":
//        urlTarget= urlcpi;
//      break;   
//      case "inflation":
//        urlTarget= urlinflation;
//      break;
//      case "retailsales":
//        urlTarget= urlretailsales;
//      break;
//      case "consumer":
//        urlTarget= urlconsumer;
//      break;
//      case "unemployment":
//        urlTarget= urlunemployment;
//      break;

// // stock-specific
//      case "rsi":
//       urlTarget= urlrsi;
//       break;
//      case "stoch":
//        urlTarget= urlstoch;
//      break;
//      case "obv":
//       urlTarget= urlobv;
//       break;
//      case "vwap":
//        urlTarget= urlvwap;
//      break;

//     case "cashflow":
//       urlTarget= urlcashflow;
//       break;

//      case "cci":
//        urlTarget= urlcci;
//      break;

//      case "adx":
//        urlTarget= urladx;
//      break;

//      case "bbands":
//        urlTarget= urlbbands;
//      break;


//      case "atr":
//        urlTarget= urlatr;
//      break;

//      case "sma":
//        urlTarget= urlsma;
//      break;

//      case "macd":
//        urlTarget= urlmacd;
//      break;

//      case "wti":
//        urlTarget= urlwti;
//      break;

 
//      case "brent":
//        urlTarget= urlbrent;
//      break;

 
//      case "natgas":
//        urlTarget= urlnatgas;
//      break;



//      case "copper":
//        urlTarget= urlcopper ;
//      break;

//      case "aluminum":
//        urlTarget= urlaluminum ;
//      break;


 
//      case "fx":
//        urlTarget= urlfx ;
//      break;


//        default:
//        // re-assign global & local var here...
//         console.log("// default: reached,  urlTarget = daily //")
//           urlTarget = urlDailyFull;
//           break;
     
//         }//sw


//     console.log ("]  fetch-testing... seriesInterval, urlTarget== ");
//     console.log(seriesInterval, urlTarget);

//     let x0, y0;
//     // assume stocks for now
//     let sym007 = gGET_SymbolStr;
//     // if(datatype0=="crypto") 

    // fetch(urlTarget)
    // .then( x0 => x0.text())
    // .then( y0 => ProcessFetched( y0 , objTarget , sym007, seriesInterval , "stocks") )    
    // .catch(error => {
    //     // element.parentElement.innerHTML = `Error: ${error}`;
    //     console.error("] The error==", error);
    // });


// // EOFn


// }//fn G3tAlphaAdvantagStockDataTESTfetch !!!


// ###########################################
// ###########################################
// ###########################################
// ###########################################
// ###########################################



async function getJsonUrl(urlstr) {
    // Check if urlstr is null or an empty string
    if (!urlstr || urlstr.trim() === "") {
        console.error("Error: URL is null or empty");
        return null;
    }

    try {
        // Fetch the JSON data from the provided URL
        const response = await fetch(urlstr);
        
        // If response is not successful, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract JSON payload
        const jsonPayload = await response.json();
        
        // Return the JSON payload
        return jsonPayload;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// // Example usage:
// const url = "https://example.com/data.json"; // Replace with your desired URL

// getJsonUrl(url)
//     .then(jsonData => {
//         if (jsonData) {
//             console.log("Received JSON data:", jsonData);
//             // Further processing of the JSON data can be done here
//         } else {
//             console.log("No JSON data received.");
//         }
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });




//
//  https://www.youtube.com/watch?v=j6mKJjguA-8
// const postContainer = document.querySelector('.card-container');
const postContainer = document.querySelector('.card-wrapper');

const postMethods = () =>{

    singlecard.map((postData)=>{
    // cardData.map((postData)=>{
    // from https  *.js    
    // cardData0.map((postData)=>{
        console.log(postData);
        console.log("jbs url9=", url9);
        console.log("] gGET_SymbolStr=",gGET_SymbolStr);

        console.log("] gGET_SymbolStr2====>",gGET_SymbolStr2,"<====");
        console.log("] urlStocks====>",urlStocks,"<====");


        let ty="stocks";
        ty = GetSecurityType( gGET_SymbolStr2 );
        gSecurityType = ty;


        if(gSecurityType=="crypto"){
            gGET_SymbolStr2 = gCryptoSym ;
            urlCrypto= url7a + gCryptoSym + url7b;
            console.log("] urlCrypto==*** ==>",urlCrypto,"<====");
            jb_json=getJsonUrl( urlCrypto) ;
        }else{
            console.log("] urlStocks==*** ==>",urlStocks,"<====");
            jb_json=getJsonUrl( urlStocks) ;

        }
        console.log("jb_json=",jb_json);


        const postElement = document.createElement('div');
        postElement.classList.add('card');
        let symbolLower = postData.symbol;
        symbolLower= symbolLower.toLowerCase();
        // <h2 class="name">${postData.symbol}</h2>   ${sym bolLower}

        let emoji0 ="⭐"; 
        let emoji1 ="👍"; 
        let emojidn="🔻";
        let emojiup="💚";
        let emojiup1="💚";

        let upordownemoji = emojidn;
        if(postData.tradeType=="BUY") upordownemoji = emojiup;

        let starz =""; 
        let cnt= postData.tradeCnt-3;
        let k=0;
        for(k=0;k<cnt;k++){
            // starz = starz + emoji1;
            starz = starz + upordownemoji;
        }


        let symstr = removeChar(postData.symbol, "@", 0);  
        symstr = symstr.toLowerCase();
        
        let pctstr = removeChar(postData.pricePct, "-", 0);  
        // console.log(pctstr);

        // let infostr ="";
        // let infostr =  postData.pricePct+" " +postData.tradeAboveBelow +" "+ postData.tradePivot;
        let infostr = pctstr+" " +postData.tradeAboveBelow +" "+ postData.tradePivot;


//                      [0]         R3           [3]     P [4]        [6]           [8]
//                      [0]         [1]          [3]    [4]            [6]           [8]
// "daySRs": "R3R2R1_P_P3_S1S2S3=|427.79|425.65|423.51|419.53|419.44|417.39|413.41|411.27|",

        let pivotstr = postData.daySRs; 
        let   p_day= chopString(pivotstr, "|", 4 ) ;
        let  p3_day= chopString(pivotstr, "|", 5 ) ;
        let  p_day1= p_day+"  (P3: "+p3_day+")";

          let s1_day= chopString(pivotstr, "|", 6 ) ;
        let s2_day= chopString(pivotstr, "|", 7 ) ;
        let s3_day= chopString(pivotstr, "|", 8 ) ;
        
          let r1_day= chopString(pivotstr, "|", 3 ) ;
        let r2_day= chopString(pivotstr, "|", 2 ) ;
        let r3_day= chopString(pivotstr, "|", 1 ) ;

        let  p_day_num = parseInt(p_day);
        let p3_day_num = parseInt(p3_day);
        let trendingstr = "Daily Trend: ";
        let trendingStylestr = "trendingDown";

        if( p_day_num < p3_day_num ){
            trendingstr=trendingstr+"DOWN";
            trendingStylestr = "trendingDown";
        }else { //if( p_day_num > p3_day_num ) {
            trendingstr=trendingstr+"UP";
            trendingStylestr = "trendingUp";

        }
        // else{
        //      trendingstr=trendingstr+"Flat";
        //     trendingStylestr = "trendingFlat";
        // }
 


        let dateSimple = "";
        udateStr =  postData.tradeDate ;  //"2024-03-21";
        dateSimple= convertDate(udateStr);   // Output: "Mar 21"
        // console.log(dateSimple);





//         <p class="description">${postData.tradeType} (${starz}) at $${postData.tradePrice}, ${infostr} at ${postData.tradeTime} on ${postData.tradeDate}. Pivot:$${p_day} S1:$${s1_day} R1:$${r1_day}  </p>

        // <p class="description">${postData.tradeType} Signal (${starz}) at $${postData.tradePrice}, ${infostr} at ${postData.tradeTime} on ${dateSimple}. Pivot:$${p_day} S1:$${s1_day} R1:$${r1_day}  </p>

        // <h3class="description">Price: $${postData.tradePrice} (at ${postData.tradeTime} hrs):</h3>

let urlbase=  "https://itraderpro.co/candlesticks.php?sym=";
let sym1    = postData.symbol ;
let urlbase1= "&uname=guest&email=johnbotti9000@gmail.com&key=8a2b18a0";
let urlfinal = urlbase+ sym1 +urlbase1;
// <button class="button" onclick="window.open('https://algoinvestorr.com/fire')">Get Chart</button>
//      <h2 class="name">trending! </h2>

   //     <h2 class="trendingDown">${trendingstr} </h2>
// 






// if( p_day_num < p3_day_num ){
//     postElement.innerHTML=`
//     <div class="card">   
//     <div class="image-content">
//         <span class="overlay"></span>
//         <div class="card-image">
//             <img src="img/${symb olLower}.png" alt="" class="card-img">
//         </div>
//     </div>
//     <div class="card-content">
//     <h2 class="name2">${postData.symbol} Pivots for ${dateSimple}</h2>
//     <h2 class="${trendingStylestr}">${trendingstr} </h2>
//     <p class="descriptionR1">Resistance R3: $${r3_day}  </p>
//     <p class="descriptionR1">Resistance R2: $${r2_day}  </p>
//     <p class="descriptionR">Resistance R1: $${r1_day}  </p>
//     <p class="descriptionB1">Pivot 3-day:   $${p3_day}   </p>
//     <p class="descriptionB">Pivot:         $${p_day}   </p>
//     <p class="descriptionG">Suppport S1:   $${s1_day}  </p>
//     <p class="descriptionG1">Suppport S2:   $${s2_day}  </p>
//     <p class="descriptionG1">Suppport S3:   $${s3_day}  </p>
//         <button class="button" onclick="window.open('${urlfinal}')">Get Chart</button>
//     </div>
//     </div>  
//     `
// }else{
// postElement.innerHTML=`
// <div class="card">   
// <div class="image-content">
//     <span class="overlay"></span>
//     <div class="card-image">
//         <img src="img/${sym bolLower}.png" alt="" class="card-img">
//     </div>
// </div>
// <div class="card-content">
// <h2 class="name2">${postData.symbol} Pivots for ${dateSimple}</h2>
// <h2 class="${trendingStylestr}">${trendingstr} </h2>
// <p class="descriptionR1">Resistance R3: $${r3_day}  </p>
// <p class="descriptionR1">Resistance R2: $${r2_day}  </p>
// <p class="descriptionR">Resistance R1: $${r1_day}  </p>
// <p class="descriptionB">Pivot:         $${p_day}   </p>
// <p class="descriptionB1">Pivot 3-day:   $${p3_day}   </p>
// <p class="descriptionG">Suppport S1:   $${s1_day}  </p>
// <p class="descriptionG1">Suppport S2:   $${s2_day}  </p>
// <p class="descriptionG1">Suppport S3:   $${s3_day}  </p>
//     <button class="button" onclick="window.open('${urlfinal}')">Get Chart</button>
// </div>
// </div>  
// `

// }


// override
let sym0=gGET_SymbolStr2;
symbolLower= sym0.toLowerCase();
let symbolLowerFname=checkForGraphixReturnFname(symbolLower, ".png", "ai_.png");

//             <img src="img/${symb olLowerFname}" alt="" class="card-img">
//      <img src="img/${symbolLower}.png" alt="" class="card-img">






if( p_day_num < p3_day_num ){
    postElement.innerHTML=`
    <div class="card">   
    <div class="image-content">
        <span class="overlay"></span>
        <div class="card-image">
            <img src="img/${symbolLowerFname}" alt="" class="card-img">
        </div>
    </div>
    <div class="card-content">
    <h2 class="name2">${sym0} Pivots for ${dateSimple}</h2>
    <h2 class="${trendingStylestr}">${trendingstr} </h2>
    <p class="descriptionR1">R3: $${r3_day}  </p>
    <p class="descriptionR1">R2: $${r2_day}  </p>
    <p class="descriptionR">Resistance R1: $${r1_day}  </p>
    <p class="descriptionB1">P3:   $${p3_day}   </p>
    <p class="descriptionB">Pivot:         $${p_day}   </p>
    <p class="descriptionG">Support S1:   $${s1_day}  </p>
    <p class="descriptionG1">S2:   $${s2_day}  </p>
    <p class="descriptionG1">S3:   $${s3_day}  </p>
        <button class="button" onclick="window.open('${urlfinal}')">Get Chart</button>
    </div>
    </div>  
    `
}else{
postElement.innerHTML=`
<div class="card">   
<div class="image-content">
    <span class="overlay"></span>
    <div class="card-image">
        <img src="img/${symbolLowerFname}" alt="" class="card-img">
    </div>
</div>
<div class="card-content">
<h2 class="name2">${sym0} Pivots for ${dateSimple}</h2>
<h2 class="${trendingStylestr}">${trendingstr} </h2>
<p class="descriptionR1">R3: $${r3_day}  </p>
<p class="descriptionR1">R2: $${r2_day}  </p>
<p class="descriptionR">Resistance R1: $${r1_day}  </p>
<p class="descriptionB">Pivot:         $${p_day}   </p>
<p class="descriptionB1">P3:   $${p3_day}   </p>
<p class="descriptionG">Support S1:   $${s1_day}  </p>
<p class="descriptionG1">S2:   $${s2_day}  </p>
<p class="descriptionG1">S3:   $${s3_day}  </p>
    <button class="button" onclick="window.open('${urlfinal}')">Get Chart</button>
</div>
</div>  
`

}



        postContainer.appendChild(postElement)
        
    })
}



// Example usage
const jsonUrl = 'https://algoinvestorr.com/trades/rawtrades/cuedtrades.json';

// readJsonUrl(jsonUrl)
//     .then(data => {
//         console.log(data); // Output the converted JSON array
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

    // Example usage
    // const jsonUrl = 'your_json_url_here';
    
    // readJsonUrl1(jsonUrl)
    //     .then(data => {
    //         console.log(data); // Output the array of JSON records
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });


    // let str0=   readBigStringUrl(jsonUrl);
    // console.log(str0);

    // console.log("cardData0==");
    // console.log(cardData0[0]);
    // console.log(cardData0[1]);





    console.log("PRE postM3thods()");

postMethods();











// // Swiper 
// var swiper = new Swiper(".slide-content", {
//             slidesPerView: 3,
//             spaceBetween: 30,
//             slidesPerGroup: 3,
//             loop: true,
//             loopFillGroupWithBlank: true,
//             pagination:{
//                 el: ".swiper-pagination",
//                 clickable: true,
//             },
//             navigation:{
//                 nextEl: ".swiper-button-next", 
//                 prevEl: ".swiper-button-prev", 
//             },

// });