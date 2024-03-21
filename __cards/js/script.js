// script.js
// let johnie=1;


const cardData = [
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








//
//  https://www.youtube.com/watch?v=j6mKJjguA-8
// const postContainer = document.querySelector('.card-container');
const postContainer = document.querySelector('.card-wrapper');

const postMethods = () =>{
    cardData.map((postData)=>{
        console.log(postData);

        
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



        let pctstr = removeChar(postData.pricePct, "-", 0);  
        // console.log(pctstr);

        // let infostr ="";
        // let infostr =  postData.pricePct+" " +postData.tradeAboveBelow +" "+ postData.tradePivot;
        let infostr = pctstr+" " +postData.tradeAboveBelow +" "+ postData.tradePivot;

        let pivotstr = postData.daySRs;
        let  p_day= chopString(pivotstr, "|", 4 ) ;
        let s1_day= chopString(pivotstr, "|", 6 ) ;
        let r1_day= chopString(pivotstr, "|", 3 ) ;

//                      [0]         R3           [3]     P [4]        [6]           [8]
//                      [0]         [1]          [3]    [4]            [6]           [8]
// "daySRs": "R3R2R1_P_P3_S1S2S3=|427.79|425.65|423.51|419.53|419.44|417.39|413.41|411.27|",


        let dateSimple = "";
        udateStr =  postData.tradeDate ;  //"2024-03-21";
        dateSimple= convertDate(udateStr);   // Output: "Mar 21"
        // console.log(dateSimple);





//         <p class="description">${postData.tradeType} (${starz}) at $${postData.tradePrice}, ${infostr} at ${postData.tradeTime} on ${postData.tradeDate}. Pivot:$${p_day} S1:$${s1_day} R1:$${r1_day}  </p>



        postElement.innerHTML=`
        <div class="card">   
        <div class="image-content">
            <span class="overlay"></span>
            <div class="card-image">
                <img src="img/${symbolLower}.png" alt="" class="card-img">
            </div>
        </div>
        <div class="card-content">
        <h2 class="name">${postData.symbol}</h2>
        <p class="description">${postData.tradeType} Signal (${starz}) at $${postData.tradePrice}, ${infostr} at ${postData.tradeTime} on ${dateSimple}. Pivot:$${p_day} S1:$${s1_day} R1:$${r1_day}  </p>
            <button class="button">Get Chart</button>
        </div>
        </div>  
        `
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

    console.log("cardData0==");
    console.log(cardData0[0]);
    console.log(cardData0[1]);
    console.log(cardData0);

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