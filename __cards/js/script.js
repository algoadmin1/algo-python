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
        let starz =""; 
        let cnt= postData.tradeCnt-3;
        let k=0;
        for(k=0;k<cnt;k++){
            starz = starz + emoji1;
        }



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
        <p class="description">${postData.tradeType} (${starz}) at $${postData.tradePrice} on ${postData.tradeDate} at ${postData.tradeTime} EDT. </p>
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