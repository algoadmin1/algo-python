// acessaa.js

var gAlgoTradeStr="";
var gTestString ="1G6BCDH"; 
var gTestString0="1G63EDD"; 
var gTestString1="1G255FA"; 
var gLastUDate ="2092-12-13";

let apikeyStrPremium   = '&apikey=' + '5B4L3BMV2' + gTestString;  
let apikeyStr   = '&apikey=' + '5B4L3BMV4' + gTestString;  
let llavestr = apikeyStr;  
let apikeyStr5  = '&apikey=' + '5B4L3BMW3' + gTestString;    


 let url_aa_stocks0="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
 let url_aa_stocks2="&outputsize=compact&datatype=json"+ llavestr ;   
let url_aa_stocks3="NIL";
let url_aa_stocks_fundamentals="https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM"+ llavestr ;   
let Feed_aa = "alphavantage";

  //



  async function access_readJsonUrl(jsonUrl) {
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





async function access_readJsonUrl1(jsonUrlStr) {
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




//
// usage:
//
//  G3tSecuritiesData("alphavantage", "AMZN", "stocks", "day");
//  G3tSecuritiesData("alphavantage", "BTC", "crypto", "day");
//
function GetSecuritiesData( datafeedstr, symbolstr, sectypestr, intervalstr ){

	if( datafeedstr != Feed_aa ){
		return("Error_wrongDataFeedService_"+datafeedstr);
	}

	
	if(intervalstr=="day" && sectypestr=="stocks"){

		let result = "";
		let urlstr= url_aa_stocks0 + symbolstr + url_aa_stocks2 ;

		// let url_aa_stocks0="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
		// let url_aa_stocks2="&outputsize=compact&datatype=json"+ llavestr ;   
		let result = access_readJsonUrl(urlstr);


		console.log("] result=", result);
		return(result);

	}

	//GetAlphaAdvantageData(sectypestr,intervalstr);
	
	// GetAlphaAdvantageData("stocks","day");
	// GetAlphaAdvantageData("crypto","day");

}


// MAIN CODE

// let result0 = GetSecuritiesData( "alphavantage", "AMZN", "stocks", "day");
console.log("] result0 =", result0 );


