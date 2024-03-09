/*

 record[ rawtradeId ] ==  2765
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2765

] GOT TO EXPRESS TRADE for            =====================>>>>>> ETSY 


] Trade Brief: SELL ETSY 74 above R1 dist= 1.21
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|77.09|74.94|72.78|71.34|76.33|69.18|67.74|65.58|
] Week Pivots: wkR2R1P_76.64_S1S2=|83.92|80.25|72.97|69.36|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , ETSY )
] result =  {'Cmd_': 'ETSY', 'Action': 'SELL', 'Range': 'ABOVE', 'Value': 'R1', 'TradeType': 'LONG_PUTS', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '1', 'NumStrikes': '2', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'ETSY': {
  "Cmd_": "ETSY",
  "Action": "SELL",
  "Range": "ABOVE",
  "Value": "R1",
  "TradeType": "LONG_PUTS",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "2",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] FOUND  ETSY  in INI file: SELL ETSY ABOVE R1 LONG_PUTS LIVE
        if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) SELL SELL ABOVE ABOVE R1 R1
]  >>>>>>>>>>  *  WE FOUND AN INI==Trade MATCH, sending trade to Ex3cuteTrade(  ETSY  , jsonINI, jsonTrade)
] READY TO EX3CUTE TRADE:  ETSY 


 
 {
  "Cmd_": "ETSY",
  "Action": "SELL",
  "Range": "ABOVE",
  "Value": "R1",
  "TradeType": "LONG_PUTS",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "2",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  SELL ETSY ABOVE R1 LONG_PUTS LIVE
] signal counts (INI,jsonTrades): 4 7
] Prepping LIVE Trade:  LONG_PUTS
SELL :   LONG_PUTS 1 shares of ETSY  at Market ( 74 15min ).  Attempting to Place Trade at 1559 on 2024-02-23      - Live? == LIVE
] barstr = , rstr, leftstr = 15min 15 15
SELL :   LONG_PUTS 1 contracts of ETSY  PUTS  at 2 strike(s) ITM  strike,price  14 4  expiring 2024-03-15, with stock at  74 
  Attempting to Place Trade at 1559 on 2024-02-23      - Live? == LIVE

]  INI Trade Match : LONG_PUTS
 
 {
  "Cmd_": "ETSY",
  "Action": "SELL",
  "Range": "ABOVE",
  "Value": "R1",
  "TradeType": "LONG_PUTS",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "1",
  "NumStrikes": "2",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}

]  INCOMING jsonTRADE:
 
 {
  "tradeDate": "2024-02-23",
  "tradeTime": "1515",
  "tradeType": "SELL",
  "tradeSize": "10",
  "symbol": "ETSY",
  "tradeCond": "atLimit",
  "tradePrice": "74",
  "rawtradeId": "2765",
  "tradeCnt": "7",
  "tradeAboveBelow": "above",
  "tradePivot": "R1",
  "priceDist": "1.21",
  "pricePct": "1.6397%",
  "tradeStrong": "1",
  "tradeLeg": "85|85|60|55",
  "timestamp": "2024-02-23T155913",
  "tradeRecTimestamp": "2024-02-23T200010",
  "tradeDateTime": "2024-02-23T151500",
  "tradeDay": "fri",
  "tradeBar": "15min",
  "userId": "Creator",
  "accountId": "12345354911",
  "tradeRAW": "raw50",
  "tradeRawId": "0",
  "tradeSize1": "100",
  "tradePrFilled": "0",
  "tradeDur": "gfd",
  "tradeStopMke": "44.4",
  "tradeLimitExit": "185",
  "optionStrategy": "IronCondor1.15",
  "daySRs": "R3R2R1_P_P3_S1S2S3=|77.09|74.94|72.78|71.34|76.33|69.18|67.74|65.58|",
  "wkSRs": "wkR2R1P_76.64_S1S2=|83.92|80.25|72.97|69.36|",
  "moSRs": "moR3R2R1PS1S2S3=|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|-1.00|",
  "tradeSpec": "nil",
  "tradeSig": "SELL",
  "tradeGapPct": "0",
  "tradeStatus": "1",
  "tradeAux1": "2",
  "tradeAux2": "3",
  "tradeHash": "nilHash"
}
.robinhood *SENDING OPTION Order ETSY 1 -60.0 2024-03-15 14 put BUY
*** Leaving Ex3cuteTrade() Now... 





*/