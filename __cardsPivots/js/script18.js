// script.js for /search endpoint ui data for user
// const fs = require('fs');


let gCryptoSym="BTC";
let gSecurityType="stocks";
let jb_json = [    {a:"b", c:"d", e:"f"}  ];

const data_today      = { date:"YYYY-MM-DD", sym:"nil_", sectype:"stocks", op:0.0, hi:0.0, lo:0.0, cl:0.0, v:0.0, p:0.0, p3:0.0, s1:0.0, s2:0.0, s3:0.0, s4:0.0, r1:0.0, r2:0.0, r3:0.0, r4:0.0  };
const data_yesterday  = { date:"YYYY-MM-DD", sym:"nil_", sectype:"stocks", op:0.0, hi:0.0, lo:0.0, cl:0.0, v:0.0, p:0.0, p3:0.0, s1:0.0, s2:0.0, s3:0.0, s4:0.0, r1:0.0, r2:0.0, r3:0.0, r4:0.0  };
const data_yesterday1 = { date:"YYYY-MM-DD", sym:"nil_", sectype:"stocks", op:0.0, hi:0.0, lo:0.0, cl:0.0, v:0.0, p:0.0, p3:0.0, s1:0.0, s2:0.0, s3:0.0, s4:0.0, r1:0.0, r2:0.0, r3:0.0, r4:0.0  };
const data_yesterday2 = { date:"YYYY-MM-DD", sym:"nil_", sectype:"stocks", op:0.0, hi:0.0, lo:0.0, cl:0.0, v:0.0, p:0.0, p3:0.0, s1:0.0, s2:0.0, s3:0.0, s4:0.0, r1:0.0, r2:0.0, r3:0.0, r4:0.0  };
const data_yesterday3 = { date:"YYYY-MM-DD", sym:"nil_", sectype:"stocks", op:0.0, hi:0.0, lo:0.0, cl:0.0, v:0.0, p:0.0, p3:0.0, s1:0.0, s2:0.0, s3:0.0, s4:0.0, r1:0.0, r2:0.0, r3:0.0, r4:0.0  };


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
    // .then( y0 => Pro cessFetched( y0 , objTarget , sym007, seriesInterval , "stocks") )    
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

let gJsonPayload="";

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
        gJsonPayload=jsonPayload;
        return jsonPayload;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// // Example usage:
// const url = "https://example.com/data.json"; // Replace with your desired URL

// get JsonUrl(url)
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


function getJsonObj(jsonObj, objstr) {
    // Check if jsonObj is null or undefined
    if (!jsonObj) {
        console.error("Error: JSON object is null or undefined");
        return null;
    }

    // Loop through the keys of the JSON object
    for (let key in jsonObj) {
        // Check if the current key matches objstr
        if (key === objstr) {
            // Return the subobject corresponding to the matched key
            return jsonObj[key];
        } else if (typeof jsonObj[key] === 'object') {
            // Recursively search through nested objects
            const result = getJsonObj(jsonObj[key], objstr);
            if (result) {
                return result;
            }
        }
    }

    // If no matching key is found, return null
    console.error("Error: No subobject found with key:", objstr);
    return null;
}

// // Example usage:
// const jsonData = {
//     "Meta Data": {
//         "Information": "Example",
//         "Symbol": "BTC"
//     },
//     "Time Series (Digital Currency Daily)": {
//         "2024-04-01": {
//             "1a. open (USD)": "1000.00",
//             "1b. open (USD)": "1000.00",
//             "2a. high (USD)": "1100.00",
//             "2b. high (USD)": "1100.00",
//             "3a. low (USD)": "990.00",
//             "3b. low (USD)": "990.00",
//             "4a. close (USD)": "1050.00",
//             "4b. close (USD)": "1050.00"
//         },
//         // More data...
//     }
// };

// const subObject1 = getJsonObj(jsonData, "Meta Data");
// console.log("Subobject with key 'Meta Data':", subObject1);

// const subObject2 = getJsonObj(jsonData, "Time Series (Digital Currency Daily)");
// console.log("Subobject with key 'Time Series (Digital Currency Daily)':", subObject2);

// const subObject3 = getJsonObj(jsonData, "Nonexistent Key");
// console.log("Subobject with key 'Nonexistent Key':", subObject3);



async function getPromiseResult(inputJsonPromise) {
    try {
        // Wait for the promise to resolve and get the result
        const objJson = await inputJsonPromise;
        return objJson;
    } catch (error) {
        // If there's an error, log it and return null
        console.error("Error:", error);
        return null;
    }
}

// // Example usage:
// const inputJsonPromise = fetch('https://api.example.com/data');
// const objJson = await getPromiseResult(inputJsonPromise);
// console.log(objJson); // This will log the resolved value of the inputJsonPromise








async function getJsonPromiseObj(urlstr) {

        // const inputJsonPromise = fetch('https://api.example.com/data');
        const inputJsonPromise = fetch(urlstr);

        const objJson = await getPromiseResult(inputJsonPromise);
        
        console.log(objJson); // This will log the resolved value of the inputJsonPromise

    return objJson;
}


function displayKeys1(jsonObj, indent = 0, count = 0) {
    console.log("] **** inside d1splayKeys1()");

    // Check if jsonObj is an object
    if (typeof jsonObj === 'object' && jsonObj !== null) {
        // Loop through the keys of the object
        for (let key in jsonObj) {
            // Check if the key matches the format "YYYY-MM-DD" and count is less than 4
            // 4 because we need yesterday, plus the last 3 days to compute p/P3
            if (count < 4 && /^\d{4}-\d{2}-\d{2}$/.test(key)) {
                // Display the key-value pair with appropriate indentation
                // let displaystr= ' '.repeat(indent) + key + ': ' + jsonObj[key] ;
                // console.log(displaystr);
                console.log(' '.repeat(indent) + key + ': ' + jsonObj[key]);
                count++; // Increment the count of displayed key-value pairs
            }

            // If the value associated with the key is an object, recursively call displayKeys
            if (typeof jsonObj[key] === 'object' && jsonObj[key] !== null) {
                displayKeys1(jsonObj[key], indent + 2, count);
            }
        }
    }
}

// // Example usage:
// const jsonData = {
//     "Meta Data": {
//         "Information": "Example",
//         "Symbol": "BTC"
//     },
//     "Time Series (Digital Currency Daily)": {
//         "2024-04-01": {
//             "1a. open (USD)": "1000.00",
//             "1b. open (USD)": "1000.00",
//             "2a. high (USD)": "1100.00",
//             "2b. high (USD)": "1100.00",
//             "3a. low (USD)": "990.00",
//             "3b. low (USD)": "990.00",
//             "4a. close (USD)": "1050.00",
//             "4b. close (USD)": "1050.00"
//         },
//         "2024-04-02": {
//             "1a. open (USD)": "1100.00",
//             "1b. open (USD)": "1100.00",
//             "2a. high (USD)": "1200.00",
//             "2b. high (USD)": "1200.00",
//             "3a. low (USD)": "1050.00",
//             "3b. low (USD)": "1050.00",
//             "4a. close (USD)": "1150.00",
//             "4b. close (USD)": "1150.00"
//         },
//         // More data...
//     }
// };

// // Call the function to display the first 4 key-value pairs with keys in "YYYY-MM-DD" format
// displayKeys(jsonData);





function displayKeys(jsonObj, indent = 0) {
    // Check if jsonObj is an object
    if (typeof jsonObj === 'object' && jsonObj !== null) {
        // Loop through the keys of the object
        for (let key in jsonObj) {
            // Display the key with appropriate indentation
            console.log(' '.repeat(indent) + key);

            // If the value associated with the key is an object, recursively call displayKeys
            if (typeof jsonObj[key] === 'object' && jsonObj[key] !== null) {
                displayKeys(jsonObj[key], indent + 2); // Increase the indentation for better visualization
            }
        }
    }
}

// Example usage:
// const jsonData = {
//     "Meta Data": {
//         "Information": "Example",
//         "Symbol": "BTC"
//     },
//     "Time Series (Digital Currency Daily)": {
//         "2024-04-01": {
//             "1a. open (USD)": "1000.00",
//             "1b. open (USD)": "1000.00",
//             "2a. high (USD)": "1100.00",
//             "2b. high (USD)": "1100.00",
//             "3a. low (USD)": "990.00",
//             "3b. low (USD)": "990.00",
//             "4a. close (USD)": "1050.00",
//             "4b. close (USD)": "1050.00"
//         },
//         // More data...
//     }
// };

// // Call the function to display keys recursively
// displayKeys(jsonData);

/*
    R4day = High+ 3*(Pday-Low) ;
    R3day = (Pday-S1day) + R2day;
    R2day = Pday + High - Low;
    R1day = (Pday *2)-Low;
    Pday  = (High + Low + Close )/3 ;
    S1day = (Pday *2)-High;
    S2day = Pday – High + Low;
    S3day = Pday – (R2day-S1day);
    s4day = Low- 3*(High-Pday) ;
*/

function CalculatePivots(){
    

    //calc YESTERDAY's pivot p_1, by using h,l,c from yest-1 =data_yesterday1
    let hi1  = parseFloat(data_yesterday1.hi) ;
    let lo1  = parseFloat(data_yesterday1.lo) ;
    let cl1  = parseFloat(data_yesterday1.cl) ;
    let p_1  = ( hi1 + lo1 + cl1 ) / 3;
    data_yesterday.p = p_1.toString();

    //calc YESTERDAY-1's pivot p_2, by using h,l,c from yest-2 =data_yesterday2
    let hi2  = parseFloat(data_yesterday2.hi) ;
    let lo2  = parseFloat(data_yesterday2.lo) ;
    let cl2  = parseFloat(data_yesterday2.cl) ;
    let p_2  = ( hi2 + lo2 + cl2 ) / 3;
    data_yesterday1.p = p_2.toString(); 

    //calc YESTERDAY-2's pivot p_3, by using h,l,c from yest-3 =data_yesterday3
    let hi3  = parseFloat(data_yesterday3.hi) ;
    let lo3  = parseFloat(data_yesterday3.lo) ;
    let cl3  = parseFloat(data_yesterday3.cl) ;
    let p_3  = ( hi3 + lo3 + cl3 ) / 3;
    data_yesterday2.p = p_3.toString();


  
    //calc TODAY's pivot P3, using above's data
    let P3day = ( p_1 + p_2 + p_3 ) / 3;
    data_today.p3  = P3day.toString();     

    //calc TODAY's pivot P, using yesterday's h, l, c
    let High  = parseFloat(data_yesterday.hi) ;
    let Low   = parseFloat(data_yesterday.lo) ;
    let Close = parseFloat(data_yesterday.cl) ;


    let Pday  = ( High + Low + Close ) / 3;

    let R1day = (Pday *2)-Low;
    let S1day = (Pday *2)-High;

    let R2day = Pday + High - Low;
    let S2day = Pday - High + Low;

    let R3day = (Pday-S1day) + R2day;
    let R4day = High+ 3*(Pday-Low) ;

    let S3day = Pday - (R2day-S1day);
    let S4day = Low- 3*(High-Pday) ;


    data_today.p  = Pday.toString();     //.toFixed(6);
    // data_today.p3 = Pday.toString();  

    data_today.s1 = S1day.toString();
    data_today.r1 = R1day.toString();

    data_today.s2 = S2day.toString();
    data_today.r2 = R2day.toString();

    data_today.s3 = S3day.toString();
    data_today.r3 = R3day.toString();

    data_today.s4 = S4day.toString();
    data_today.r4 = R4day.toString();

}


// function ProcessFetched( arg , objTarget , symstr, seriesInterval, assettype0) {
function ProcessFetched( argJson ){  

    console.log( "] Pr0cessFetched() ... "); 
   
    let objTarget = JSON.parse( argJson );  
    console.log(  "] objTarget ==" );
    console.log(  objTarget );
    console.log(  objTarget );
    //  displayKeys1(objTarget);

    let secsym=gGET_SymbolStr2+"("+gSecurityType+")";
        

    let j=0;
    let k=0;
    let m=0;
    for (let key in objTarget) {
        if(j==1){
            // we're on time series data
            let objTarget1 = objTarget[key];

            k=0;
            for (let keysub in objTarget1) {
 
                if(k<6){
                    console.log( 'k='+k+']    ' + keysub + ': ' + objTarget1[keysub] );


                    let objTarget2 =  objTarget1[keysub] ;  
                    m=0;
                    for (let key2 in objTarget2) {
                        console.log('     m=['+ m+']  '+secsym+ '_'+keysub +'_  ' + key2 + ': ' + objTarget2[key2]  );
                        let udate0=keysub;

                        if(gSecurityType=="stocks"){
                            switch(k){
                                // alphavantage stocks daily hist. data only go til yesterday=[0], vs crypto yest=[1]
                                case 0:  // yesterday    
                                    if(m==1) data_yesterday.hi=objTarget2[key2];
                                    if(m==2) data_yesterday.lo=objTarget2[key2];
                                    if(m==3) data_yesterday.cl=objTarget2[key2];
                                    data_yesterday.date     = udate0;
                                    data_yesterday.sym      = gGET_SymbolStr2;
                                    data_yesterday.sectype  = gSecurityType;

                                    data_today.sym      = gGET_SymbolStr2;
                                    data_today.sectype  = gSecurityType;
                                break;
                                case 1:  // yesterday -1
                                    if(m==1) data_yesterday1.hi=objTarget2[key2];
                                    if(m==2) data_yesterday1.lo=objTarget2[key2];
                                    if(m==3) data_yesterday1.cl=objTarget2[key2];
                                    data_yesterday1.date     = udate0;
                                    data_yesterday1.sym      = gGET_SymbolStr2;
                                    data_yesterday1.sectype  = gSecurityType;
                                break;
                                case 2:  // yesterday -2 
                                    if(m==1) data_yesterday2.hi=objTarget2[key2];
                                    if(m==2) data_yesterday2.lo=objTarget2[key2];
                                    if(m==3) data_yesterday2.cl=objTarget2[key2];
                                    data_yesterday2.date     = udate0;
                                    data_yesterday2.sym      = gGET_SymbolStr2;
                                    data_yesterday2.sectype  = gSecurityType;
                                break;
                                case 3:  // yesterday -3
                                    if(m==1) data_yesterday3.hi=objTarget2[key2];
                                    if(m==2) data_yesterday3.lo=objTarget2[key2];
                                    if(m==3) data_yesterday3.cl=objTarget2[key2];
                                    data_yesterday3.date     = udate0;
                                    data_yesterday3.sym      = gGET_SymbolStr2;
                                    data_yesterday3.sectype  = gSecurityType;
                                break;
                            }//sw

                        }else if(gSecurityType=="crypto"){ 
                                switch(k){
                                    case 0: 
                                        data_today.date = udate0;
                                        data_today.sym      = gGET_SymbolStr2;
                                        data_today.sectype  = gSecurityType;    

                                    break;
                                    case 1:  // yesterday                 ie 7)  SOL(crypto)[2024-04-04]: 4b. close (USD): 184.00000000
                                        if(m==3) data_yesterday.hi=objTarget2[key2];
                                        if(m==5) data_yesterday.lo=objTarget2[key2];
                                        if(m==7) data_yesterday.cl=objTarget2[key2];
                                        data_yesterday.date     = udate0;
                                        data_yesterday.sym      = gGET_SymbolStr2;
                                        data_yesterday.sectype  = gSecurityType;

                                    break;
                                    case 2:  // yesterday -1
                                        if(m==3) data_yesterday1.hi=objTarget2[key2];
                                        if(m==5) data_yesterday1.lo=objTarget2[key2];
                                        if(m==7) data_yesterday1.cl=objTarget2[key2];
                                        data_yesterday1.date     = udate0;
                                        data_yesterday1.sym      = gGET_SymbolStr2;
                                        data_yesterday1.sectype  = gSecurityType;
                                    break;
                                    case 3:  // yesterday -2 
                                        if(m==3) data_yesterday2.hi=objTarget2[key2];
                                        if(m==5) data_yesterday2.lo=objTarget2[key2];
                                        if(m==7) data_yesterday2.cl=objTarget2[key2];
                                        data_yesterday2.date     = udate0;
                                        data_yesterday2.sym      = gGET_SymbolStr2;
                                        data_yesterday2.sectype  = gSecurityType;
                                    break;
                                    case 4:  // yesterday -3
                                        if(m==3) data_yesterday3.hi=objTarget2[key2];
                                        if(m==5) data_yesterday3.lo=objTarget2[key2];
                                        if(m==7) data_yesterday3.cl=objTarget2[key2];
                                        data_yesterday3.date     = udate0;
                                        data_yesterday3.sym      = gGET_SymbolStr2;
                                        data_yesterday3.sectype  = gSecurityType;
                                    break;
                                }//sw

                        }

                        m++;
                    }

                }else if(k==6){    // if k<6

                    // console.log("data_today, yest, yest1, yest2, yest3==");
                    // console.log( data_today );
                    // console.log(data_yesterday );
                    // console.log(data_yesterday1 );
                    // console.log(data_yesterday2 );
                    // console.log(data_yesterday3 );

                    CalculatePivots();

                    console.log("] after CalcPivots() :   data_today, yest, yest1, yest2, yest3==");
                    console.log( data_today );
                    console.log( data_yesterday );
                    console.log( data_yesterday1 );
                    console.log( data_yesterday2 );
                    console.log( data_yesterday3 );

                }

                // if(k<5) console.log( k+']  ' + keysub + ': ' + objTarget1[keysub] );
                k++;
            }
        }

        console.log(' ' + key + ': ' + objTarget[key]);
        j++;
    }



    const subObject1= getJsonObj(objTarget, "Meta Data");    
    console.log("subObject1=", subObject1);

    //                                        Time Series (Digital Currency Daily)
    // const subObject2 = getJsonObj(objTarget, "Time Series (Digital Currency Daily)");
    // console.log("Subobject with key 'Time Series (Digital Currency Daily)':", subObject2);


    return(  objTarget );
}
/*

//stocks
0]  2024-04-04: [object Object]
script17.js:1090      0)  NFLX(stocks)[2024-04-04]: 1. open: 633.21
script17.js:1090          1)  NFLX(stocks)[2024-04-04]: 2. high: 638.0
script17.js:1090          2)  NFLX(stocks)[2024-04-04]: 3. low: 616.58
script17.js:1090          3)  NFLX(stocks)[2024-04-04]: 4. close: 617.14
script17.js:1090      4)  NFLX(stocks)[2024-04-04]: 5. adjusted close: 617.14
script17.js:1090      5)  NFLX(stocks)[2024-04-04]: 6. volume: 3008557
script17.js:1090      6)  NFLX(stocks)[2024-04-04]: 7. dividend amount: 0.0000
script17.js:1090      7)  NFLX(stocks)[2024-04-04]: 8. split coefficient: 1.0
script17.js:1084 1]  2024-04-03: [object Object]
script17.js:1090      0)  NFLX(stocks)[2024-04-03]: 1. open: 612.745
script17.js:1090      1)  NFLX(stocks)[2024-04-03]: 2. high: 630.41
script17.js:1090      2)  NFLX(stocks)[2024-04-03]: 3. low: 611.5
script17.js:1090      3)  NFLX(stocks)[2024-04-03]: 4. close: 630.08
script17.js:1090      4)  NFLX(stocks)[2024-04-03]: 5. adjusted close: 630.08
script17.js:1090      5)  NFLX(stocks)[2024-04-03]: 6. volume: 2913989
script17.js:1090      6)  NFLX(stocks)[2024-04-03]: 7. dividend amount: 0.0000
script17.js:1090      7)  NFLX(stocks)[2024-04-03]: 8. split coefficient: 1.0
script17.js:1084 





//crypto
script17.js:1090 0]  2024-04-05: [object Object]
script17.js:1090      0)  SOL(crypto)[2024-04-05]: 1a. open (USD): 184.00000000
script17.js:1090      1)  SOL(crypto)[2024-04-05]: 1b. open (USD): 184.00000000
script17.js:1090      2)  SOL(crypto)[2024-04-05]: 2a. high (USD): 185.07000000
script17.js:1090           3)  SOL(crypto)[2024-04-05]: 2b. high (USD): 185.07000000
script17.js:1090      4)  SOL(crypto)[2024-04-05]: 3a. low (USD): 182.94000000
script17.js:1090           5)  SOL(crypto)[2024-04-05]: 3b. low (USD): 182.94000000
script17.js:1090      6)  SOL(crypto)[2024-04-05]: 4a. close (USD): 184.16000000
script17.js:1090            7)  SOL(crypto)[2024-04-05]: 4b. close (USD): 184.16000000
script17.js:1090      8)  SOL(crypto)[2024-04-05]: 5. volume: 100135.00000000
script17.js:1090      9)  SOL(crypto)[2024-04-05]: 6. market cap (USD): 100135.00000000
script17.js:1084 1]  2024-04-04: [object Object]
script17.js:1090      0)  SOL(crypto)[2024-04-04]: 1a. open (USD): 185.05000000
script17.js:1090      1)  SOL(crypto)[2024-04-04]: 1b. open (USD): 185.05000000
script17.js:1090      2)  SOL(crypto)[2024-04-04]: 2a. high (USD): 190.13000000
script17.js:1090      3)  SOL(crypto)[2024-04-04]: 2b. high (USD): 190.13000000
script17.js:1090      4)  SOL(crypto)[2024-04-04]: 3a. low (USD): 180.02000000
script17.js:1090      5)  SOL(crypto)[2024-04-04]: 3b. low (USD): 180.02000000
script17.js:1090      6)  SOL(crypto)[2024-04-04]: 4a. close (USD): 184.00000000
script17.js:1090      7)  SOL(crypto)[2024-04-04]: 4b. close (USD): 184.00000000
script17.js:1090      8)  SOL(crypto)[2024-04-04]: 5. volume: 3773747.36000000
script17.js:1090      9)  SOL(crypto)[2024-04-04]: 6. market cap (USD): 3773747.36000000





{
    "Meta Data": {
        "1. Information": "Daily Prices and Volumes for Digital Currency",
        "2. Digital Currency Code": "BTC",
        "3. Digital Currency Name": "Bitcoin",
        "4. Market Code": "USD",
        "5. Market Name": "United States Dollar",
        "6. Last Refreshed": "2024-04-05 00:00:00",
        "7. Time Zone": "UTC"
    },
    "Time Series (Digital Currency Daily)": {
        "2024-04-05": {
            "1a. open (USD)": "68487.80000000",
            "1b. open (USD)": "68487.80000000",
            "2a. high (USD)": "68492.60000000",
            "2b. high (USD)": "68492.60000000",
            "3a. low (USD)": "68169.01000000",
            "3b. low (USD)": "68169.01000000",
            "4a. close (USD)": "68287.40000000",
            "4b. close (USD)": "68287.40000000",
            "5. volume": "659.80878000",
            "6. market cap (USD)": "659.80878000"
        },
        "2024-04-04": {
            "1a. open (USD)": "65963.27000000",
            "1b. open (USD)": "65963.27000000",
            "2a. high (USD)": "69309.91000000",
            "2b. high (USD)": "69309.91000000",
            "3a. low (USD)": "65064.52000000",
            "3b. low (USD)": "65064.52000000",
            "4a. close (USD)": "68487.79000000",
            "4b. close (USD)": "68487.79000000",
            "5. volume": "41510.48453000",
            "6. market cap (USD)": "41510.48453000"
        },
        "2024-04-03": {
            "1a. open (USD)": "65463.99000000",
            "1b. open (USD)": "65463.99000000",
            "2a. high (USD)": "66903.63000000",
            "2b. high (USD)": "66903.63000000",
            "3a. low (USD)": "64493.07000000",
            "3b. low (USD)": "64493.07000000",
            "4a. close (USD)": "65963.28000000",
            "4b. close (USD)": "65963.28000000",
            "5. volume": "39887.21778000",
            "6. market cap (USD)": "39887.21778000"
        },
        "2024-04-02": {
            "1a. open (USD)": "69649.81000000",
            "1b. open (USD)": "69649.81000000",
            "2a. high (USD)": "69674.23000000",
            "2b. high (USD)": "69674.23000000",
            "3a. low (USD)": "64550.00000000",
            "3b. low (USD)": "64550.00000000",
            "4a. close (USD)": "65463.99000000",
            "4b. close (USD)": "65463.99000000",
            "5. volume": "71799.82793000",
            "6. market cap (USD)": "71799.82793000"
        },
        "2024-04-01": {
            "1a. open (USD)": "71280.00000000",
            "1b. open (USD)": "71280.00000000",
            "2a. high (USD)": "71288.23000000",
            "2b. high (USD)": "71288.23000000",
            "3a. low (USD)": "68062.86000000",
            "3b. low (USD)": "68062.86000000",
            "4a. close (USD)": "69649.80000000",
            "4b. close (USD)": "69649.80000000",
            "5. volume": "41445.32039000",
            "6. market cap (USD)": "41445.32039000"
        },
    }
*/

function getJsonUrlJB(urlTarget){

      fetch(urlTarget)
      .then( x0 => x0.text())
      .then( y0 => ProcessFetched( y0 ) )    
      .catch(error => {
          console.error("] g3tJsonUrlJB() The error==", error);
      });
  
}

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

        let urlLocal=urlStocks;
        let ty="stocks";
        ty = GetSecurityType( gGET_SymbolStr2 );
        gSecurityType = ty;


        if(gSecurityType=="crypto"){
            gGET_SymbolStr2 = gCryptoSym ;
            urlCrypto= url7a + gCryptoSym + url7b;
            console.log("] urlCrypto== **** ==>",urlCrypto,"<====");
            urlLocal=urlCrypto;

            // jb_json=getJsonUrl( urlCrypto) ;
        }else{
            console.log("] urlStocks== **** ==>",urlStocks,"<====");
            urlLocal=urlStocks;

            // jb_json=getJsonUrl( urlStocks) ;

        }
        console.log("jb_json=",jb_json);

        // console.log("jb_json[0]=",jb_json[0]);

        // const subObject2 = getJsonObj(jb_json, "Time Series (Digital Currency Daily)");
        // console.log("subObject2=",subObject2);
        // const subObject1= getJsonObj(jb_json, "Meta Data");   // [PromiseResult]
        // console.log("subObject1=",subObject1);


        // // const inputJsonPromise = fetch('https://api.example.com/data');
        // const inputJsonPromise = fetch(urlLocal);
        // const objJson = await getPromiseResult(inputJsonPromise);
        // console.log(objJson); // This will log the resolved value of the inputJsonPromise

        // getJsonPromiseObj(urlLocal);


        let jb_json1=  getJsonUrlJB(urlLocal);
        



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





// Meta Data: [object Object]
// script16.js:1076 0]  2024-04-04: [object Object]
// script16.js:1081 NFLX(stocks)[2024-04-04]: 1. open: 633.21
// script16.js:1081 NFLX(stocks)[2024-04-04]: 2. high: 638.0
// script16.js:1081 NFLX(stocks)[2024-04-04]: 3. low: 616.58
// script16.js:1081 NFLX(stocks)[2024-04-04]: 4. close: 617.14
// script16.js:1081 NFLX(stocks)[2024-04-04]: 5. adjusted close: 617.14
// script16.js:1081 NFLX(stocks)[2024-04-04]: 6. volume: 3008557
// script16.js:1081 NFLX(stocks)[2024-04-04]: 7. dividend amount: 0.0000
// script16.js:1081 NFLX(stocks)[2024-04-04]: 8. split coefficient: 1.0
// script16.js:1076 1]  2024-04-03: [object Object]
// script16.js:1081 NFLX(stocks)[2024-04-03]: 1. open: 612.745
// script16.js:1081 NFLX(stocks)[2024-04-03]: 2. high: 630.41
// script16.js:1081 NFLX(stocks)[2024-04-03]: 3. low: 611.5
// script16.js:1081 NFLX(stocks)[2024-04-03]: 4. close: 630.08
// script16.js:1081 NFLX(stocks)[2024-04-03]: 5. adjusted close: 630.08
// script16.js:1081 NFLX(stocks)[2024-04-03]: 6. volume: 2913989
// script16.js:1081 NFLX(stocks)[2024-04-03]: 7. dividend amount: 0.0000
// script16.js:1081 NFLX(stocks)[2024-04-03]: 8. split coefficient: 1.0
// script16.js:1076 



// // crypto start at [1] for yesterday... (today = 2024-04-05)
//
// Meta Data: [object Object]
// script16.js:1076 0]  2024-04-05: [object Object]
// script16.js:1081 SOL(crypto)[2024-04-05]: 1a. open (USD): 184.00000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 1b. open (USD): 184.00000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 2a. high (USD): 185.07000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 2b. high (USD): 185.07000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 3a. low (USD): 182.94000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 3b. low (USD): 182.94000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 4a. close (USD): 184.16000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 4b. close (USD): 184.16000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 5. volume: 100135.00000000
// script16.js:1081 SOL(crypto)[2024-04-05]: 6. market cap (USD): 100135.00000000
// script16.js:1076 1]  2024-04-04: [object Object]
// script16.js:1081 SOL(crypto)[2024-04-04]: 1a. open (USD): 185.05000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 1b. open (USD): 185.05000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 2a. high (USD): 190.13000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 2b. high (USD): 190.13000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 3a. low (USD): 180.02000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 3b. low (USD): 180.02000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 4a. close (USD): 184.00000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 4b. close (USD): 184.00000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 5. volume: 3773747.36000000
// script16.js:1081 SOL(crypto)[2024-04-04]: 6. market cap (USD): 3773747.36000000
// script16.js:1076 2]  2024-04-03: [object Object]
// script16.js:1081 SOL(crypto)[2024-04-03]: 1a. open (USD): 181.53000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 1b. open (USD): 181.53000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 2a. high (USD): 192.00000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 2b. high (USD): 192.00000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 3a. low (USD): 176.92000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 3b. low (USD): 176.92000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 4a. close (USD): 185.05000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 4b. close (USD): 185.05000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 5. volume: 5010275.57000000
// script16.js:1081 SOL(crypto)[2024-04-03]: 6. market cap (USD): 
