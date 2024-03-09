/*
# test dump robinhood from terminal

] GOT TO EXPRESS TRADE...
] Trade Brief: BUY NVDA 735.11 above S1 dist= 14.65
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|755.50|745.86|736.21|730.11|726.03|720.46|714.36|704.71|
] Week Pivots: wkR2R1P_702.05_S1S2=|760.90|741.11|682.26|643.20|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , NVDA )
] result =  {'Cmd_': 'NVDA', 'Action': 'BUY', 'Range': 'ABOVE', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '1', 'NumStrikes': '1', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'NVDA': {
  "Cmd_": "NVDA",
  "Action": "BUY",
  "Range": "ABOVE",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "1",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] FOUND  NVDA  in INI file: BUY NVDA ABOVE S1 LONG_STOCK LIVE
]  *#*#*#*#*#!!!!!   WE FOUND AN INI==Trade MATCH, sending trade to Ex3cuteTrade(  NVDA  , jsonINI, jsonTrade)
] READY TO EXECUTE TRADE:  NVDA 


 
 {
  "Cmd_": "NVDA",
  "Action": "BUY",
  "Range": "ABOVE",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "1",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  BUY NVDA ABOVE S1 LONG_STOCK LIVE
] signal counts (INI,jsonTrades): 4 6
] Prepping:  LONG_STOCK
BUY :   LONG_STOCK 1 shares of NVDA  at Market ( 735.11 ).  Attempting to Place Trade at 1357 on 2024-02-16      - Live? == LIVE

]  INI Trade Match : LONG_STOCK
 
 {
  "Cmd_": "NVDA",
  "Action": "BUY",
  "Range": "ABOVE",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "1",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}

]  INCOMING jsonTRADE:
 
 {
  "tradeDate": "2024-02-16",
  "tradeTime": "1400",
  "tradeType": "BUY",
  "tradeSize": "10",
  "symbol": "NVDA",
  "tradeCond": "atLimit",
  "tradePrice": "735.11",
  "rawtradeId": "2350",
  "tradeCnt": "6",
  "tradeAboveBelow": "above",
  "tradePivot": "S1",
  "priceDist": "14.65",
  "pricePct": "1.9929%",
  "tradeStrong": "0",
  "tradeLeg": "880|845|620|585",
  "timestamp": "2024-02-19T013550",
  "tradeRecTimestamp": "2024-02-16T204050",
  "tradeDateTime": "2024-02-16T140000",
  "tradeDay": "fri",
  "tradeBar": "15min",
  "userId": "Creator",
  "accountId": "12345354911",
  "tradeRAW": "raw38",
  "tradeRawId": "0",
  "tradeSize1": "100",
  "tradePrFilled": "0",
  "tradeDur": "gfd",
  "tradeStopMke": "441.066",
  "tradeLimitExit": "1837.78",
  "optionStrategy": "IronCondor1.15",
  "daySRs": "R3R2R1_P_P3_S1S2S3=|755.50|745.86|736.21|730.11|726.03|720.46|714.36|704.71|",
  "wkSRs": "wkR2R1P_702.05_S1S2=|760.90|741.11|682.26|643.20|",
  "moSRs": "moR3R2R1PS1S2S3=|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|",
  "tradeSpec": "nil",
  "tradeSig": "BUY",
  "tradeGapPct": "0",
  "tradeStatus": "1",
  "tradeAux1": "2",
  "tradeAux2": "3",
  "tradeHash": "nilHash"
}
Ch3ckDatabase(): checking database on raw trade id# 2350 ...   TradeEXIST== False
No Trade # 2350 found in LiveTrade table-database. Sending Trade for LONG_STOCK NVDA  to the market and INSERTING the  LiveTrade table-database.
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    :  LONG_STOCK NVDA 1 735.11 2350 1357 2024-02-16
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logged in.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Account Profile in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Open Stock Positions... 
] *** 3nterP0stionsRobin...base()    : BUYing $ 735.11  dollars worth of  NVDA  stock, shares= 1
BID / ASK price for NVDA =      726.750000   /   727.400000
.robinhood*BUY  sendMarket0rder( BUY 1 NVDA stock ) sent to market.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    :                      AFTER TRADE... 
] delaying  1 second(s)...
] resuming...
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging OUT... 
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    : returning...
*** EX3CUTE Trade HERE ****
]LEAVING EXPRESS TRADE...

*/