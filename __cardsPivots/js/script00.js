// script.js for /search endpoint ui data for user
let gCryptoSym="BTC";
let gSecurityType="stocks";


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

function checkForGraphix(symL){
    // if(symL != arr[]){
//          symL  = "ai_.png"
    // }

    return(symL);
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


        let ty="stocks";
        ty = GetSecurityType( gGET_SymbolStr2 );
        gSecurityType = ty;


        if(gSecurityType=="crypto"){
            gGET_SymbolStr2 = gCryptoSym ;
            urlCrypto= url7a + gCryptoSym + url7b;
            console.log("] urlCrypto==**==>",urlCrypto,"<====");
        }


        const postElement = document.createElement('div');
        postElement.classList.add('card');
        let symbolLower = postData.symbol;
        symbolLower= symbolLower.toLowerCase();
        // <h2 class="name">${postData.symbol}</h2>   ${symbolLower}

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
//             <img src="img/${symbolLower}.png" alt="" class="card-img">
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
//         <img src="img/${symbolLower}.png" alt="" class="card-img">
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

let sym0=gGET_SymbolStr2;
symbolLower= sym0.toLowerCase();
let symbolLower1=checkForGraphix(symbolLower);
//             <img src="img/${symbolLower1}.png" alt="" class="card-img">


if( p_day_num < p3_day_num ){
    postElement.innerHTML=`
    <div class="card">   
    <div class="image-content">
        <span class="overlay"></span>
        <div class="card-image">
            <img src="img/${symbolLower}.png" alt="" class="card-img">
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
        <img src="img/${symbolLower}.png" alt="" class="card-img">
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