//
// gridbot.js
//
//                      by John Botti via p/tLarry
//
//
// alert ('gridbotti');

const url0= "wss://stream.data.alpaca.markets/v1beta1/crypto";
const socket = new WebSocket(url0);
// console.log (socket);

// var cryptoType = 'ETHUSD';  //   'SOLUSD';
var cryptoType = 'BTCUSD';  

var exchangeType ='CBSE';
var epsilon2 = 0.0075;

var sfx_serverComplete2 ; 
// sfx_serverComplete2    =  new Audio("../mp3/ahhh.mp3");    // ahhh.mp3
// sfx_serverGreetings
  sfx_serverComplete2  = new Audio("../mp3/greetings.mp3");    // ahhh.mp3

//var audio = new Audio('audio_file.mp3');
// audio.play();

// const auth       = {"action": "auth", "key": API_KEY, "secret": SECRET_KEY }
// const auth       = {"action": "auth", "key": "PKHJ5U3GO23VV22CAJ3M", "secret": "H3zN3p1kCZgFhuS9eG8AIK2Xi9Tkfd027XCjHxCb"}
// const SECRET_KEY = 'H3zN3p1kCZgFhuS9eG8AIK2Xi9Tkfd027XCjHxCb';
// for module.export()
const API_KEY ='PKHJ5U3GO23VV22CAJ3M';
const SECRET_KEY = 'H3zN3p1kCZgFhuS9eG8AIK2Xi9Tkfd027XCjHxCb';
//

const auth       = {"action": "auth", "key": API_KEY , "secret": SECRET_KEY  }
const subscribe  = {"action":"subscribe", "trades":[cryptoType], "quotes":[cryptoType], "bars":[cryptoType] }

const quotesElement = document.getElementById('quotes');
const tradesElement = document.getElementById('trades');
const barsElement   = document.getElementById('bars');
const chartsElement = document.getElementById('chart');
const ordersElement = document.getElementById('orders');

let gAtPriceTarget = 'not';
let gPivotsTarget  = 'not';

let currentBar = {};  // object
let trades = [];         // array


var numHoursBack = 3;
var secondsBack = 60 * 60 * numHoursBack;
// var start = new Date(Date.now() - (7200 *1000)).toISOString();  // secondsBack
var start = new Date(Date.now() - (secondsBack *1000)).toISOString();  

var timeFrame = '1Min'; 
var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/'+ cryptoType + '/bars?exchanges='+ exchangeType + '&timeframe='+ timeFrame+ '&start=' + start; 
// https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE,timeframe=1Min,start=2022-04-11T19:00:52.585Z



fetch(bars_url, {
    headers: {
        'APCA-API-KEY-ID': API_KEY,
        'APCA-API-SECRET-KEY': SECRET_KEY
    }
}).then((r) =>  r.json())
     .then((response) => {
         console.log(response);

            const data = response.bars.map(bar => (
                {
                    open: bar.o,
                    high: bar.h,
                    low: bar.l,
                    close: bar.c,
                    time: Date.parse(bar.t) /1000
                }
            ));
            currentBar = data[data.length-1] ;

            console.log(data);

            candleSeries.setData(data);

     })



var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 700,
    height: 700,
	layout: {
		backgroundColor: '#000000',
		textColor: '#ffffff',
	},
	grid: {
		vertLines: {
			color: '#404040',
		},
		horzLines: {
			color: '#404040',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: '#cccccc',
	},
	timeScale: {
		borderColor: '#cccccc',
		timeVisible: true,
	},
});

var candleSeries = chart.addCandlestickSeries();

var pivots = [

    { sym: 'ETHUSD', udate: '2022-04-13', type: 'day',      // 'week', 'month'
      r4: 3190 , r3: 3150 , r2: 3100 , r1: 3050 ,  p: 3000 ,  p3: 2970 ,
      s1: 2970 , s2: 2930 , s3: 2890 , s4:  2830   },

    { sym: 'BTCUSD', udate: '2022-04-13', type: 'day',      // 'week', 'month'
      r4: 43300 , r3: 42200 , r2: 41000 , r1: 40500 ,  p: 39000 ,  p3: 37400 ,
      s1: 39500 , s2: 39200 , s3: 38500 , s4:  38000   },
      
];

console.log(pivots);

var e1 = [
    { sym: 'DAL', udate: '2022-04-13', datenum: 20220413 },
    { sym: 'GS', udate: '2022-04-14', datenum: 20220414 },
    { sym: 'LVS', udate: '2022-04-19', datenum: 20220419 },
    { sym: 'HAL', udate: '2022-04-19', datenum: 20220419 },
    { sym: 'AA', udate: '2022-04-20', datenum: 20220420 },
    { sym: 'TSLA', udate: '2022-04-20', datenum: 20220420 },
    { sym: 'AAL', udate: '2022-04-21', datenum: 20220421 },
    { sym: 'SNAP', udate: '2022-04-21', datenum: 20220421 },
    { sym: 'AMD', udate: '2022-04-25', datenum: 20220425 },
    { sym: 'MSFT', udate: '2022-04-25', datenum: 20220425 },
    { sym: 'F', udate: '2022-04-26', datenum: 20220426 },
    { sym: 'GOOGL', udate: '2022-04-26', datenum: 20220426 },
    { sym: 'SHOP', udate: '2022-04-26', datenum: 20220426 },
    { sym: 'AMZN', udate: '2022-04-27', datenum: 20220427 },
    { sym: 'FB', udate: '2022-04-27', datenum: 20220427 },
    { sym: 'PYPL', udate: '2022-04-27', datenum: 20220427 },
    { sym: 'AAPL', udate: '2022-04-28', datenum: 20220428 },
    { sym: 'MCD', udate: '2022-04-28', datenum: 20220428 },
    { sym: 'MGM', udate: '2022-05-02', datenum: 20220502 },
    { sym: 'AMC', udate: '2022-05-04', datenum: 20220504 },
    { sym: 'NCLH', udate: '2022-05-04', datenum: 20220504 },
    { sym: 'SQ', udate: '2022-05-05', datenum: 20220505 },
    { sym: 'WYNN', udate: '2022-05-09', datenum: 20220509 },
    { sym: 'WMT', udate: '2022-05-17', datenum: 20220517 },
    { sym: 'NVDA', udate: '2022-05-25', datenum: 20220525 },
    { sym: 'CCL', udate: '2022-06-22', datenum: 20220622 },
    { sym: 'SBUX', udate: '2022-06-27', datenum: 20220627 },
    { sym: 'WE', udate: 'na', datenum: NaN },
    { sym: 'WBA', udate: '2022-06-29', datenum: 20220629 }

];


var earnings = [
    { sym: 'AAPL', udate: '2022-04-28', exp: 0.013 },
    { sym: 'AMZN', udate: '2022-04-27', exp: 0.013 },
    { sym: 'AMC', udate: '2022-05-04', exp: 0.013 },
    { sym: 'AMD', udate: '2022-04-25', exp: 0.013 },
    { sym: 'AAL', udate: '2022-04-21', exp: 0.013 },
    { sym: 'DAL', udate: '2022-04-13', exp: 0.013 },
    { sym: 'CCL', udate: '2022-06-22', exp: 0.013 },
    { sym: 'NCLH', udate: '2022-05-04', exp: 0.013 },
    { sym: 'AA',  udate: '2022-04-20', exp: 0.013 },

    { sym: 'F',   udate: '2022-04-26', exp: 0.013 },
    { sym: 'FB',  udate: '2022-04-27', exp: 0.013 },
    { sym: 'GOOGL', udate: '2022-04-26', exp: 0.013 },
    { sym: 'GS',  udate: '2022-04-14', exp: 0.013 },
    { sym: 'HAL',  udate: '2022-04-19', exp: 0.013 },
    
    { sym: 'LVS', udate: '2022-04-19', exp: 0.013 },
    { sym: 'MSFT', udate: '2022-04-25', exp: 0.013 },
    { sym: 'MCD', udate: '2022-04-28', exp: 0.013 },
    { sym: 'MGM', udate: '2022-05-02', exp: 0.013 },
    { sym: 'NVDA', udate: '2022-05-25', exp: 0.013 },
    { sym: 'PYPL', udate: '2022-04-27', exp: 0.013 },

    { sym: 'SQ',   udate: '2022-05-05', exp: 0.013 },
    { sym: 'SBUX', udate: '2022-06-27', exp: 0.013 },
    { sym: 'SNAP', udate: '2022-04-21', exp: 0.013 },
    { sym: 'SHOP', udate: '2022-04-26', exp: 0.013 },
    { sym: 'TSLA', udate: '2022-04-20', exp: 0.013 },


    { sym: 'WE', udate: 'na', exp: 0.013 },
    { sym: 'WBA', udate: '2022-06-29', exp: 0.013 },
    { sym: 'WMT', udate: '2022-05-17', exp: 0.013 },
    { sym: 'WYNN', udate: '2022-05-09', exp: 0.013 },

];   

// var candleSeries = chart.addCandlestickSeries();
// var data = [
//     { time: '2018-10-19', open: 54.32, high: 55.16, low: 52.22 , close: 54.8 },
// ];
// candleSeries.setData(data); 



// MAIN event
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const  msgjb = data[0]['msg'];
    var ii=0;


    if(msgjb =='connected') {
        console.log('Data for: earnings[]:'); 
        console.log( earnings); 

        // sfx_serverComplete2.play();
        console.log('pivots:'); 
        console.log(pivots);

        console.log('Doing authentication...'); 
        socket.send(JSON.stringify(auth));      

    }

    if(msgjb =='authenticated'){
       console.log('Authenticated!'); 
       socket.send(JSON.stringify(subscribe));
     ii=0;

    }
    
// LOOP

    for(var key in data){

        if(ii< (earnings.length+0) ){
            for( var key1 in e1){

                const earnElement = document.createElement('div');
                earnElement.className = 'bar';
                earnElement.innerHTML = `<b> ${e1[key1].udate} ${e1[key1].sym}</b> reports earnings.  `; 
                barsElement.appendChild(earnElement);
                ii++;

                var elements0 = document.getElementsByClassName('bar');
                if(elements0.length> e1.length+0){
                    barsElement.removeChild(elements0[0]);
                }
            }
        }


        const type = data[key].T;
        switch(type){
                case 't':
                    // console.log('got a Trade' );
                    const tradeElement = document.createElement('div');
                    tradeElement.className = 'trade';
                    tradeElement.innerHTML = `<b>${data[key].S} ${data[key].t}</b> ${data[key].p} ${data[key].s} <b> ${data[key].x} </b>`; // ${data[key].x}`;
                    tradesElement.appendChild(tradeElement);

                    var elements = document.getElementsByClassName('trade');
                    if(elements.length>10){
                        tradesElement.removeChild(elements[0]);
                    }

                    trades.push(data[key].p);
                    // console.log(trades);
 

                    var open  = trades[0];
                    var high  = Math.max(...trades);
                    var low   = Math.min(...trades);
                    var close = trades[trades.length - 1];
        
                    //console.log(open, high, low, close);
        
                    candleSeries.update({
                        time: currentBar.time + 60,
                        open: open,
                        high: high,
                        low: low,
                        close: close
                    })
 
                    // after building the realtime candle, check against pivots array obj
                    gAtPriceTarget ='not';
                    CheckPivots(close, currentBar.time + 60 );
                    if(gAtPriceTarget != 'not'){
                        console.log('gAtPriceTarget');
                        console.log(gAtPriceTarget);
// orders
                            const orderElement = document.createElement('div');
                            orderElement.className = 'order';
                            orderElement.innerHTML = `<b> ${gAtPriceTarget} </b>.`; 
                            ordersElement.appendChild(orderElement);

                            var elements01 = document.getElementsByClassName('order');
                            if( elements01.length > 10){
                                ordersElement.removeChild(elements01[0]);
                            }                        
                    }

                    break;

                case 'q':
                    // console.log('got a Quote' );
                    const quoteElement = document.createElement('div');
                    quoteElement.className = 'quote';
                    //  
                    //   .ap .bp .t .x
                    //
                    quoteElement.innerHTML = `<b>${data[key].S} ${data[key].t}</b> ${data[key].bp} ${data[key].ap} ${data[key].x} `; // ${data[key].x}`;
                    quotesElement.appendChild(quoteElement);

                    var elements1 = document.getElementsByClassName('quote');
                    if(elements1.length>10){
                        quotesElement.removeChild(elements1[0]);
                    }
                    break;
                    
                case 'b':
                    // console.log('got a Bar' );
                    const barElement = document.createElement('div');
                    barElement.className = 'bar';
                    barElement.innerHTML = `<b>${data[key].S} ${data[key].t}</b> ${data[key].x} ${data[key].o} ${data[key].h} ${data[key].l} ${data[key].c} ${data[key].v} `; 
                    barsElement.appendChild(barElement);

                    // barElement.innerHTML = `<b>**** BAR = ${data[key].t}</b> ${data[key].x} ${data[key].o} ${data[key].h} ${data[key].l} ${data[key].c} ${data[key].v} `; 
                    // tradesElement.appendChild(barElement);


                    var elements2 = document.getElementsByClassName('bar');
                    if(elements2.length>10){
                        barsElement.removeChild(elements2[0]);
                    }

                    var bar = data[key];
                    var timestamp = new Date(bar.t).getTime()/1000;

                    if(data[key].x == 'CBSE' ){ //|| data[key].x == 'FTXU'){
                        currentBar = {
                            time: timestamp, 
                            open: bar.o,
                            high: bar.h,
                            low:  bar.l,
                            close: bar.c
                        }
                        candleSeries.update(currentBar);
                        trades =[];
                    }

                    break;
                default:
                    console.log( data[key]);
                    break;
        }//sw

    }//for


}//onmessage


/*
// sample
var pivots = [
    { sym: 'ETHUSD', udate: '2022-04-13', type: 'day',      // 'week', 'month'
      r4: 3300 , r3: 3200 , r2: 3100 , r1: 3050 ,  p: 3000 ,  p3: 2970 ,
      s1: 2970 , s2: 2930 , s3: 2890 , s4:  2830   } 
    ];
*/

// var epsilon2 = 0.003;  // pPrice == target price
// function CheckTargetPriceCloseness(ttime, price, eps, tgtPrice, pStr){
function CheckPivot(ttime, price, eps, pPrice, pStr){
    gPivotsTarget='not';   //init local global passed back to CheckPivo ts()

    var retStr = 'notnear';  // 'at' 'below'   'above'   'equal' 
                                        //  ie eps = 2% 0.02
    var ppricehi =  pPrice * (1+eps);   // ie 1.02
    var ppricelo =  pPrice * (1-eps);   //    0.98 
    if(price <= ppricehi && price >= ppricelo){
        // price within +/- epsilon of pPrice (pivotPrice = target price)
        retStr = 'at'; 
        pStr = pStr + ' : '+  (epsilon2*100).toString()  +'%';
        // console.log( 'at ' , pStr);

        let nearstr = 'near';
        if(price <= ppricehi  && price > pPrice ) nearstr = 'above';
          else if( price >= ppricelo  && price < pPrice ) nearstr = 'below';

        gPivotsTarget = 'Price: $'+ price + ' '+  nearstr + ' '+ pStr +' $' + ppricelo.toFixed(2) + ' >< $' + ppricehi.toFixed(2) + ' t=' +ttime ;
        gAtPriceTarget = gPivotsTarget;

        //console.log( gPivotsTarget );

    }
    return(retStr);
}
function CheckPivots( closePrice, t )
{
    // console.log('close: $');
    // console.log( closePrice  , t);

    for(var key in pivots){
        if(pivots[key].sym=='BTCUSD' || pivots[key].sym=='ETHUSD' ){
           ;
           // console.log('found',pivots[key].sym );
        // }
        // if(pivots[key].sym=='ETHUSD'){
          //  console.log('found',pivots[key].sym );
            CheckPivot(t, closePrice, epsilon2, pivots[key].r4, `r4= ${pivots[key].r4}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].r3, `r3= ${pivots[key].r3}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].r2, `r2= ${pivots[key].r2}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].r1, `r1= ${pivots[key].r1}` );
           
            CheckPivot(t, closePrice, epsilon2, pivots[key].p , `p=  ${pivots[key].p}` );
           
            CheckPivot(t, closePrice, epsilon2, pivots[key].s1, `s1= ${pivots[key].s1}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].s2, `s2= ${pivots[key].s2}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].s3, `s3= ${pivots[key].s3}` );
            CheckPivot(t, closePrice, epsilon2, pivots[key].s4, `s4= ${pivots[key].s4}` );

            // gAtPriceTarget = gPivotsTarget;


        }

    }

    
}


