/*


] GOT TO EXPRESS TRADE for            =====================>>>>>> AAPL 


] Trade Brief: BUY AAPL 182.75 below S1 dist= -0.15
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|187.46|186.43|185.40|183.93|182.08|182.90|181.43|180.40|
] Week Pivots: wkR2R1P_184.11_S1S2=|191.43|186.86|179.54|176.79|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , AAPL )
] result =  {'Cmd_': 'AAPL', 'Action': 'BUY', 'Range': 'BELOW', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '1', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'AAPL': {
  "Cmd_": "AAPL",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] FOUND  AAPL  in INI file: BUY AAPL BELOW S1 LONG_STOCK LIVE
        if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) BUY BUY BELOW BELOW S1 S1
]  >>>>>>>>>>  *  WE FOUND AN INI==Trade MATCH, sending trade to Ex3cuteTrade(  AAPL  , jsonINI, jsonTrade)
] READY TO EX3CUTE TRADE:  AAPL 


 
 {
  "Cmd_": "AAPL",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  BUY AAPL BELOW S1 LONG_STOCK LIVE
] signal counts (INI,jsonTrades): 4 18
] Prepping LIVE Trade:  LONG_STOCK
BUY :   LONG_STOCK 1 shares of AAPL  at Market ( 182.75 15min ).  Attempting to Place Trade at 1251 on 2024-02-23      - Live? == LIVE
] barstr = , rstr, leftstr = 15min 15 15

]  INI Trade Match : LONG_STOCK
 
 {
  "Cmd_": "AAPL",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}

]  INCOMING jsonTRADE:
 
 {
  "tradeDate": "2024-02-23",
  "tradeTime": "1315",
  "tradeType": "BUY",
  "tradeSize": "10",
  "symbol": "AAPL",
  "tradeCond": "atLimit",
  "tradePrice": "182.75",
  "rawtradeId": "2744",
  "tradeCnt": "18",
  "tradeAboveBelow": "below",
  "tradePivot": "S1",
  "priceDist": "-0.15",
  "pricePct": "-0.0839%",
  "tradeStrong": "1",
  "tradeLeg": "215|210|155|145",
  "timestamp": "2024-02-23T130457",
  "tradeRecTimestamp": "2024-02-23T180009",
  "tradeDateTime": "2024-02-23T131500",
  "tradeDay": "fri",
  "tradeBar": "15min",
  "userId": "Creator",
  "accountId": "12345354911",
  "tradeRAW": "raw29",
  "tradeRawId": "0",
  "tradeSize1": "100",
  "tradePrFilled": "0",
  "tradeDur": "gfd",
  "tradeStopMke": "109.65",
  "tradeLimitExit": "456.875",
  "optionStrategy": "IronCondor1.15",
  "daySRs": "R3R2R1_P_P3_S1S2S3=|187.46|186.43|185.40|183.93|182.08|182.90|181.43|180.40|",
  "wkSRs": "wkR2R1P_184.11_S1S2=|191.43|186.86|179.54|176.79|",
  "moSRs": "moR3R2R1PS1S2S3=|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|",
  "tradeSpec": "nil",
  "tradeSig": "BUY",
  "tradeGapPct": "0",
  "tradeStatus": "1",
  "tradeAux1": "2",
  "tradeAux2": "3",
  "tradeHash": "nilHash"
}
] TRADES Today= 1 , MAX == 3  todaysDate0, simudate0 ==  2024-02-23 2024-02-23
Ch3ckDatabase(): checking database on raw trade id# 2744 ...   TradeEXIST== False
<SIMULATED> No Trade # 2744 found in LiveTrade table-database. Sending Trade for LONG_STOCK AAPL  to the market and INSERTING the  LiveTrade table-database.
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    :  LONG_STOCK AAPL 1 182.75 2744 1251 2024-02-23
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logged in.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Account Profile in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Open Stock Positions... 
] *** 3nterP0stionsRobin...base()    : BUYing $ 182.75  dollars worth of  AAPL  stock, shares= 1
BID / ASK price for AAPL =      182.770000   /   182.780000
.robinhood*BUY  sendMarket0rder( BUY 1 AAPL stock ) sent to market.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    :                      AFTER TRADE... 
] delaying  1 second(s)...
] resuming...
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging OUT... 
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    : returning...
]  exiting NOT accessing rawID=  2744 https://algoinvestorr.com/trades/addonetradetoday.php?d=2024-02-23&type=LONG_STOCK&sym=AAPL&qty=1
*** Leaving Ex3cuteTrade() Now... 





 record[ rawtradeId ] ==  2745
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2745

] GOT TO EXPRESS TRADE for            =====================>>>>>> M 


] Trade Brief: SELL M 19.56 above R1 dist= 0.33
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|19.41|19.32|19.23|19.08|19.23|18.99|18.84|18.75|
] Week Pivots: wkR2R1P_19.26_S1S2=|20.57|20.03|18.72|17.95|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , M )
] result =  {}
Key 'Cmd_' with value 'M' not found in any INI record.



*/