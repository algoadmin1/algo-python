// logfile.js
/*
[ 5 ]  actionstr,  rangestr , valuestr == MinimumBarMins 15 15
actionstr== MinimumBarMins
] CALLINMG CMD_Array1 = r3frshValue( arr, lbl, rng, value ).......**** MinimumBarMins


Index: 5, Stock or Cmd_: GS
[ 6 ]  actionstr,  rangestr , valuestr == BUY ABOVE S1
SYMBOL FOUND: GS


Index: 6, Stock or Cmd_: AAL
[ 7 ]  actionstr,  rangestr , valuestr == BUY BELOW S1
SYMBOL FOUND: AAL


Index: 7, Stock or Cmd_: AAPL
[ 8 ]  actionstr,  rangestr , valuestr == BUY BELOW S1
SYMBOL FOUND: AAPL


Index: 8, Stock or Cmd_: SHOP
[ 9 ]  actionstr,  rangestr , valuestr == BUY ABOVE S1
SYMBOL FOUND: SHOP


Index: 9, Stock or Cmd_: SMCI
[ 10 ]  actionstr,  rangestr , valuestr == BUY BELOW S1
SYMBOL FOUND: SMCI


Index: 10, Stock or Cmd_: NVDA
[ 11 ]  actionstr,  rangestr , valuestr == BUY BELOW S1
SYMBOL FOUND: NVDA
] AFTER R3freshINICmd_Variable()...
] st0ckINIarr[]== ['GS', 'AAL', 'AAPL', 'SHOP', 'SMCI', 'NVDA']


Press ANY KEY to see POST fn json 


[
    {
        "Label": "PositionsMax",
        "Type": "stocks",
        "Value": "999"
    },
    {
        "Label": "PositionsMax",
        "Type": "options",
        "Value": "999"
    },
    {
        "Label": "PositionsMax",
        "Type": "options_spreads",
        "Value": "999"
    },
    {
        "Label": "PositionsMax",
        "Type": "portfolio",
        "Value": "999"
    },
    {
        "Label": "PositionsPct",
        "Type": "portfolio",
        "Value": "0.9990"
    },
    {
        "Label": "MinimumBarMins",
        "Type": "portfolio",
        "Value": "15"
    },
    {
        "Label": "RiskMax",
        "Type": "portfolio",
        "Value": "20000"
    },
    {
        "Label": "RiskMax",
        "Type": "stocks",
        "Value": "6000"
    },
    {
        "Label": "RiskMax",
        "Type": "options",
        "Value": "3000"
    },
    {
        "Label": "RiskPct",
        "Type": "portfolio",
        "Value": "0.9350"
    },
    {
        "Label": "RiskPct",
        "Type": "stocks",
        "Value": "0.9350"
    },
    {
        "Label": "StopPct",
        "Type": "options",
        "Value": "0.950"
    },
    {
        "Label": "StopPct",
        "Type": "stocks",
        "Value": "0.92750"
    },
    {
        "Label": "StopPct",
        "Type": "portfolio",
        "Value": "0.91250"
    },
    {
        "Label": "TradesPerDay",
        "Type": "options",
        "Value": "999"
    },
    {
        "Label": "TradesPerDay",
        "Type": "stocks",
        "Value": "999"
    },
    {
        "Label": "Server",
        "Type": "Poll",
        "Value": "990"
    },
    {
        "Label": "Server",
        "Type": "RefreshINIsecs",
        "Value": "999"
    },
    {
        "Label": "Event",
        "Type": "FOMC",
        "Value": "2024-03-15T143000"
    },
    {
        "Label": "Event",
        "Type": "JOBSREPORT",
        "Value": "2024-03-24T083000"
    },
    {
        "Label": "Event",
        "Type": "CPI",
        "Value": "2024-02-13T083000"
    },
    {
        "Label": "Event",
        "Type": "11YRBottom",
        "Value": "2031-03-10T083000"
    },
    {
        "Label": "Event",
        "Type": "EARNINGS_NVDA",
        "Value": "2024-03-23T141500"
    },
    {
        "Label": "Event",
        "Type": "EARNINGS_ROKU",
        "Value": "2024-02-15T133000"
    },
    {
        "Label": "Aux",
        "Type": "ALL",
        "Value": "0"
    }
]



Attempting Robinhood Access...
CheckPostionsRobinhood() Positions for  roguequant1@gmail.com
********* Open Stock positions:  json= [
          {
                    "url": "https://api.robinhood.com/positions/497177477/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument": "https://api.robinhood.com/instruments/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument_id": "ebab2398-028d-4939-9f1d-13bf38f81c50",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "490.2500",
                    "pending_average_buy_price": "490.2500",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "490.2500",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T16:57:59.358873Z",
                    "created_at": "2022-11-30T21:00:58.469148Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument_id": "450dfc6d-5510-4d40-abfb-f633b7d9be3e",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "182.7800",
                    "pending_average_buy_price": "182.7800",
                    "quantity": "1.00000000",
                    "intraday_average_buy_price": "182.7800",
                    "intraday_quantity": "1.00000000",
                    "shares_available_for_exercise": "1.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:07:08.965015Z",
                    "created_at": "2023-01-19T19:55:21.852160Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument": "https://api.robinhood.com/instruments/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument_id": "7973d19b-db71-4f1c-bf05-7da327f91d34",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "867.4100",
                    "pending_average_buy_price": "867.4100",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "867.4100",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:38:59.594598Z",
                    "created_at": "2024-02-20T15:26:09.705862Z"
          }
]
] Your Holdings  BEFORE TRADE  :
symbol= META    0  
META {'price': '486.900000', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.80', 'percent_change': '-0.68', 'intraday_percent_change': '-0.68', 'equity_change': '-6.700000', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  
AAPL {'price': '182.730000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.73', 'percent_change': '-0.03', 'intraday_percent_change': '-0.03', 'equity_change': '-0.050000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  
SMCI {'price': '860.080600', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1720.16', 'percent_change': '-0.84', 'intraday_percent_change': '-0.84', 'equity_change': '-14.658800', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.27'}
Option OPEN Orders  json= []
] **************************************** optionSymbol =  AAPL  240209P00175
Bid Price: 0.0
Ask Price: 0.0
] Your Holdings  BEFORE TRADE  :
symbol= META    0  )
META {'price': '486.900000', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.80', 'percent_change': '-0.68', 'intraday_percent_change': '-0.68', 'equity_change': '-6.700000', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  )
AAPL {'price': '182.740000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.74', 'percent_change': '-0.02', 'intraday_percent_change': '-0.02', 'equity_change': '-0.040000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  )
SMCI {'price': '860.514600', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1721.03', 'percent_change': '-0.79', 'intraday_percent_change': '-0.79', 'equity_change': '-13.790800', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.27'}
('\n', '2024-02-23', '] ENTER trades Date (default=2024-02-23): ')


] Defaulting Date to  2024-02-23
] Enter  Simulated TIME  in HHSS [default=1358]:  


] Defaulting TIME to  1358
] ************* userSTARTTime, timeNOW, MINS_diff    1358 1358 0
] ************* userSTARTTime, timeNOW, MINS_diff    1358 1358 0
] ************* userSTARTTime, timeNOW, MINS_diff    1358 1358 0

] ReDirecting TIME NOW =   tnowStart, tnow0, simuTime  1358 1358 0
('\n', '2024-02-23', '] ENTER Number Minutes diff for Trade (default=3): ')
60
 user SYMBOL =  AMZN
Today's Date and Time in NYC (EDT) is: 2024-02-23T13:58:46
1358
TIME IN NYC: 1358  mins fromClose =  122

dstr= 2024-02-23 len(dstr)= 10

] Starting to Loop for  10080.0 minutes,

]  *** ENTERING THE WATCHDOG ALERT LOOP...

> 13:58:46
] Attempting to Loop 120960  times, with a 5  second delay between reading the local file, for a 
Max # minutes of: 10080.0  Max HOURS= 168.0 


.] TASK*** BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...
] TASK***   .../Gettrades.php  :  RETURNING:  'buy' or 'sell' signals...
] Attemping live trade retrieval for https://algoinvestorr.com/trades/gettrades.php?u=j&d=2024-02-23  on  2024-02-23
] just hit gettrades.php on server, got todaysTrades[] text.  Attempting to get cuedtrades_2024-02-23
] JSON Payload RECIEVED!!!
] Filtered Records for  any symbol on date, timeNow= 2024-02-23 1358 :
Today's DATE & TIME= 2024-02-23 1358
]  SMCI SELL rawID= 2751 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1400 270   ,   1358 268 2
]  TSLA BUY rawID= 2750 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1345 255   ,   1358 268 13
]  AMZN SELL rawID= 2748 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1330 240   ,   1358 268 28
]  AAPL BUY rawID= 2744 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1358 268 43
]  M SELL rawID= 2745 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1358 268 43
]  AAPL BUY rawID= 2747 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1311 221   ,   1358 268 47
]  QQQ SELL rawID= 2739 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  VXX SELL rawID= 2740 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  GS SELL rawID= 2741 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  META SELL rawID= 2742 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  ETSY SELL rawID= 2743 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  SMCI BUY rawID= 2749 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1358 268 58
]  INTC SELL rawID= 2738 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1245 195   ,   1358 268 73
]  SPY BUY rawID= 2734 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1358 268 103
]  AMZN BUY rawID= 2735 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1358 268 103
]  SMCI BUY rawID= 2736 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1358 268 103
]  NFLX BUY rawID= 2737 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1358 268 103
]  NVDA BUY rawID= 2730 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1358 268 118
]  AMD BUY rawID= 2731 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1358 268 118
]  QQQ BUY rawID= 2732 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1358 268 118
]  META BUY rawID= 2733 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1358 268 118
]  AAPL BUY rawID= 2746 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1153 143   ,   1358 268 125
]  VXX BUY rawID= 2728 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1130 120   ,   1358 268 148
]  @ES SELL rawID= 2729 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1125 115   ,   1358 268 153
]  TSLA BUY rawID= 2727 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1115 105   ,   1358 268 163
]  INTC BUY rawID= 2726 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1101 91   ,   1358 268 177
]  ADBE SELL rawID= 2724 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1358 268 178
]  ETSY BUY rawID= 2725 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1358 268 178
]  NVDA SELL rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1358 268 193
]  NVDA buyToOpen_PUT_ rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1358 268 193
]  SPY SELL rawID= 2722 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1358 268 193
]  GS SELL rawID= 2723 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1358 268 193
]  ROKU SELL rawID= 2720 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1030 60   ,   1358 268 208
]  AMZN SELL rawID= 2717 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1358 268 238
]  META BUY rawID= 2718 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1358 268 238
]  ADBE BUY rawID= 2719 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1358 268 238
]  @ES BUY rawID= 2716 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0705 -145   ,   1358 268 413
]  @ES SELL rawID= 2715 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0245 -405   ,   1358 268 673
] Filtered Records TIME:
] FOUND one or more Trades...
 record[ rawtradeId ] ==  2751
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2751

] GOT TO EXPRESS TRADE for            =====================>>>>>> SMCI 


] Trade Brief: SELL SMCI 872.77 below R1 dist= -168.72
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|1173.08|1107.28|1041.49|937.74|797.59|871.95|768.20|702.41|
] Week Pivots: wkR2R1P_875.34_S1S2=|1208.14|1005.62|672.82|542.54|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , SMCI )
] result =  {'Cmd_': 'SMCI', 'Action': 'BUY', 'Range': 'BELOW', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '5', 'QtyShrCons': '1', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'SMCI': {
  "Cmd_": "SMCI",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "5",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] FOUND  SMCI  in INI file: BUY SMCI BELOW S1 LONG_STOCK LIVE
        if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) SELL BUY BELOW BELOW R1 S1
NO MATCH FOUND FOR THIS SYMBOL:
   if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) SELL BUY BELOW BELOW R1 S1
 record[ rawtradeId ] ==  2750
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2750

] GOT TO EXPRESS TRADE for            =====================>>>>>> TSLA 


] Trade Brief: BUY TSLA 193.7 above S1 dist= 0.64
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|205.28|202.65|200.01|195.69|196.47|193.05|188.73|186.09|
] Week Pivots: wkR2R1P_195.07_S1S2=|216.13|208.04|186.98|174.01|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , TSLA )
] result =  {}
Key 'Cmd_' with value 'TSLA' not found in any INI record.


 record[ rawtradeId ] ==  2748
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2748

] GOT TO EXPRESS TRADE for            =====================>>>>>> AMZN 


] Trade Brief: SELL AMZN 174.66 below R1 dist= -1
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|177.83|176.75|175.66|173.72|168.29|172.63|170.69|169.60|
] Week Pivots: wkR2R1P_170.22_S1S2=|179.86|174.68|165.04|160.58|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , AMZN )
] result =  {}
Key 'Cmd_' with value 'AMZN' not found in any INI record.


 record[ rawtradeId ] ==  2744
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2744

] GOT TO EXPRESS TRADE for            =====================>>>>>> AAPL 


] Trade Brief: BUY AAPL 182.75 below S1 dist= -0.15
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|187.46|186.43|185.40|183.93|182.08|182.90|181.43|180.40|
] Week Pivots: wkR2R1P_184.11_S1S2=|191.43|186.86|179.54|176.79|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , AAPL )
] result =  {'Cmd_': 'AAPL', 'Action': 'BUY', 'Range': 'BELOW', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '2', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'AAPL': {
  "Cmd_": "AAPL",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "2",
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
  "QtyShrCons": "2",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  BUY AAPL BELOW S1 LONG_STOCK LIVE
] signal counts (INI,jsonTrades): 4 18
] Prepping LIVE Trade:  LONG_STOCK
BUY :   LONG_STOCK 2 shares of AAPL  at Market ( 182.75 15min ).  Attempting to Place Trade at 1358 on 2024-02-23      - Live? == LIVE
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
  "QtyShrCons": "2",
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
  "timestamp": "2024-02-23T135851",
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
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    :  LONG_STOCK AAPL 2 182.75 2744 1358 2024-02-23
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logged in.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Account Profile in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Open Stock Positions... 



Open Stock Positions  json= [
          {
                    "url": "https://api.robinhood.com/positions/497177477/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument": "https://api.robinhood.com/instruments/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument_id": "ebab2398-028d-4939-9f1d-13bf38f81c50",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "490.2500",
                    "pending_average_buy_price": "490.2500",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "490.2500",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T16:57:59.358873Z",
                    "created_at": "2022-11-30T21:00:58.469148Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument_id": "450dfc6d-5510-4d40-abfb-f633b7d9be3e",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "182.7800",
                    "pending_average_buy_price": "182.7800",
                    "quantity": "1.00000000",
                    "intraday_average_buy_price": "182.7800",
                    "intraday_quantity": "1.00000000",
                    "shares_available_for_exercise": "1.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:07:08.965015Z",
                    "created_at": "2023-01-19T19:55:21.852160Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument": "https://api.robinhood.com/instruments/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument_id": "7973d19b-db71-4f1c-bf05-7da327f91d34",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "867.4100",
                    "pending_average_buy_price": "867.4100",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "867.4100",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:38:59.594598Z",
                    "created_at": "2024-02-20T15:26:09.705862Z"
          }
]
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : G3tHoldings()  BEFORE TRADE... 
] Your Holdings  BEFORE TRADE  :
symbol= META    0  
META {'price': '486.849200', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.70', 'percent_change': '-0.69', 'intraday_percent_change': '-0.69', 'equity_change': '-6.801600', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  
AAPL {'price': '182.730000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.73', 'percent_change': '-0.03', 'intraday_percent_change': '-0.03', 'equity_change': '-0.050000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  
SMCI {'price': '860.820000', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1721.64', 'percent_change': '-0.76', 'intraday_percent_change': '-0.76', 'equity_change': '-13.180000', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.28'}
] *** 3nterP0stionsRobin...base()    : BUYing $ 365.5  dollars worth of  AAPL  stock, shares= 2
BID / ASK price for AAPL =      182.730000   /   182.740000
.robinhood*BUY  sendMarket0rder( BUY 2 AAPL stock ) sent to market.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    :                      AFTER TRADE... 
] delaying  1 second(s)...
] resuming...
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : G3tHoldings()  AFTER TRADE... 
] Your Holdings  AFTER TRADE  :
symbol= META    0  
META {'price': '486.849200', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.70', 'percent_change': '-0.69', 'intraday_percent_change': '-0.69', 'equity_change': '-6.801600', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  
AAPL {'price': '182.720000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.72', 'percent_change': '-0.03', 'intraday_percent_change': '-0.03', 'equity_change': '-0.060000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  
SMCI {'price': '860.035000', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1720.07', 'percent_change': '-0.85', 'intraday_percent_change': '-0.85', 'equity_change': '-14.750000', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.26'}
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging OUT... 
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    : returning...
]  exiting NOT accessing rawID=  2744 https://algoinvestorr.com/trades/addonetradetoday.php?d=2024-02-23&type=LONG_STOCK&sym=AAPL&qty=2
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


 record[ rawtradeId ] ==  2747
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2747

] GOT TO EXPRESS TRADE for            =====================>>>>>> AAPL 


] Trade Brief: BUY AAPL 182.74 below S1 dist= -0.16
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|187.46|186.43|185.40|183.93|182.08|182.90|181.43|180.40|
] Week Pivots: wkR2R1P_182.86_S1S2=|186.27|184.29|180.88|179.45|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , AAPL )
] result =  {'Cmd_': 'AAPL', 'Action': 'BUY', 'Range': 'BELOW', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '2', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'AAPL': {
  "Cmd_": "AAPL",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "4",
  "QtyShrCons": "2",
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
  "QtyShrCons": "2",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  BUY AAPL BELOW S1 LONG_STOCK LIVE
] signal counts (INI,jsonTrades): 4 5
] Prepping LIVE Trade:  LONG_STOCK
BUY :   LONG_STOCK 2 shares of AAPL  at Market ( 182.74 13min ).  Attempting to Place Trade at 1358 on 2024-02-23      - Live? == LIVE
] barstr = , rstr, leftstr = 13min 13 13
*** Leaving Ex3cuteTrade() Now... 





 record[ rawtradeId ] ==  2739
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2739

] GOT TO EXPRESS TRADE for            =====================>>>>>> QQQ 


] Trade Brief: SELL QQQ 437.88 below R1 dist= -2.39
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|444.53|442.40|440.28|436.99|427.70|434.87|431.58|429.46|
] Week Pivots: wkR2R1P_431.69_S1S2=|445.50|438.04|424.23|417.88|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , QQQ )
] result =  {}
Key 'Cmd_' with value 'QQQ' not found in any INI record.


 record[ rawtradeId ] ==  2740
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2740

] GOT TO EXPRESS TRADE for            =====================>>>>>> VXX 


] Trade Brief: SELL VXX 14.2 below R1 dist= -0.45
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|14.99|14.82|14.64|14.32|14.70|14.14|13.82|13.64|
] Week Pivots: wkR2R1P_14.86_S1S2=|17.28|15.84|13.42|12.44|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , VXX )
] result =  {}
Key 'Cmd_' with value 'VXX' not found in any INI record.


 record[ rawtradeId ] ==  2741
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2741

] GOT TO EXPRESS TRADE for            =====================>>>>>> GS 


] Trade Brief: SELL GS 395.51 above R1 dist= 1.18
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|402.20|398.27|394.33|391.67|384.68|387.73|385.07|381.13|
] Week Pivots: wkR2R1P_385.29_S1S2=|406.44|395.39|374.24|364.14|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , GS )
] result =  {'Cmd_': 'GS', 'Action': 'BUY', 'Range': 'ABOVE', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '4', 'QtyShrCons': '1', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'GS': {
  "Cmd_": "GS",
  "Action": "BUY",
  "Range": "ABOVE",
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
] FOUND  GS  in INI file: BUY GS ABOVE S1 LONG_STOCK LIVE
        if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) SELL BUY ABOVE ABOVE R1 S1
NO MATCH FOUND FOR THIS SYMBOL:
   if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) SELL BUY ABOVE ABOVE R1 S1
 record[ rawtradeId ] ==  2742
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2742

] GOT TO EXPRESS TRADE for            =====================>>>>>> META 


] Trade Brief: SELL META 487.23 below R1 dist= -4.79
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|503.92|497.97|492.02|484.04|470.51|478.09|470.11|464.16|
] Week Pivots: wkR2R1P_472.27_S1S2=|505.80|489.45|455.92|438.74|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , META )
] result =  {}
Key 'Cmd_' with value 'META' not found in any INI record.


 record[ rawtradeId ] ==  2743
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2743

] GOT TO EXPRESS TRADE for            =====================>>>>>> ETSY 


] Trade Brief: SELL ETSY 72.29 below R1 dist= -0.49
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|77.09|74.94|72.78|71.34|76.33|69.18|67.74|65.58|
] Week Pivots: wkR2R1P_76.64_S1S2=|83.92|80.25|72.97|69.36|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , ETSY )
] result =  {}
Key 'Cmd_' with value 'ETSY' not found in any INI record.


 record[ rawtradeId ] ==  2749
] Entering Expr3ssTrade()  HERE, appending RAW_ID= 2749

] GOT TO EXPRESS TRADE for            =====================>>>>>> SMCI 


] Trade Brief: BUY SMCI 863.23 below S1 dist= -8.72
]  Day Pivots: R3R2R1_P_P3_S1S2S3=|1173.08|1107.28|1041.49|937.74|797.59|871.95|768.20|702.41|
] Week Pivots: wkR2R1P_875.34_S1S2=|1208.14|1005.62|672.82|542.54|

NOW check against INI FILE HERE for validation...
]  ABOUT TO CHECK:     result = jsonRecordFind( jsonINImaster,  Cmd_ , SMCI )
] result =  {'Cmd_': 'SMCI', 'Action': 'BUY', 'Range': 'BELOW', 'Value': 'S1', 'TradeType': 'LONG_STOCK', 'Aux': 'COUNT', 'SigCnt': '5', 'QtyShrCons': '1', 'NumStrikes': '0', 'Live': 'LIVE', 'THoriz': '19', 'ExitPref': 'nil'}
The JSON record for key 'Cmd_' with value 'SMCI': {
  "Cmd_": "SMCI",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "5",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] FOUND  SMCI  in INI file: BUY SMCI BELOW S1 LONG_STOCK LIVE
        if( trytype1,trytype2  and   abstr1, abstr2   and   pivstr1 , pivstr2) BUY BUY BELOW BELOW S1 S1
]  >>>>>>>>>>  *  WE FOUND AN INI==Trade MATCH, sending trade to Ex3cuteTrade(  SMCI  , jsonINI, jsonTrade)
] READY TO EX3CUTE TRADE:  SMCI 


 
 {
  "Cmd_": "SMCI",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "5",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}
] Ex3cuteTrade(...)  BUY SMCI BELOW S1 LONG_STOCK LIVE
] signal counts (INI,jsonTrades): 5 5
] Prepping LIVE Trade:  LONG_STOCK
BUY :   LONG_STOCK 1 shares of SMCI  at Market ( 863.23 30min ).  Attempting to Place Trade at 1358 on 2024-02-23      - Live? == LIVE
] barstr = , rstr, leftstr = 30min 30 30

]  INI Trade Match : LONG_STOCK
 
 {
  "Cmd_": "SMCI",
  "Action": "BUY",
  "Range": "BELOW",
  "Value": "S1",
  "TradeType": "LONG_STOCK",
  "Aux": "COUNT",
  "SigCnt": "5",
  "QtyShrCons": "1",
  "NumStrikes": "0",
  "Live": "LIVE",
  "THoriz": "19",
  "ExitPref": "nil"
}

]  INCOMING jsonTRADE:
 
 {
  "tradeDate": "2024-02-23",
  "tradeTime": "1300",
  "tradeType": "BUY",
  "tradeSize": "10",
  "symbol": "SMCI",
  "tradeCond": "atLimit",
  "tradePrice": "863.23",
  "rawtradeId": "2749",
  "tradeCnt": "5",
  "tradeAboveBelow": "below",
  "tradePivot": "S1",
  "priceDist": "-8.72",
  "pricePct": "-1.0098%",
  "tradeStrong": "1",
  "tradeLeg": "1035|990|730|690",
  "timestamp": "2024-02-23T135851",
  "tradeRecTimestamp": "2024-02-23T181551",
  "tradeDateTime": "2024-02-23T130000",
  "tradeDay": "fri",
  "tradeBar": "30min",
  "userId": "Creator",
  "accountId": "12345354911",
  "tradeRAW": "raw34",
  "tradeRawId": "0",
  "tradeSize1": "100",
  "tradePrFilled": "0",
  "tradeDur": "gfd",
  "tradeStopMke": "517.938",
  "tradeLimitExit": "2158.07",
  "optionStrategy": "IronCondor1.15",
  "daySRs": "R3R2R1_P_P3_S1S2S3=|1173.08|1107.28|1041.49|937.74|797.59|871.95|768.20|702.41|",
  "wkSRs": "wkR2R1P_875.34_S1S2=|1208.14|1005.62|672.82|542.54|",
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
Ch3ckDatabase(): checking database on raw trade id# 2749 ...   TradeEXIST== False
<SIMULATED> No Trade # 2749 found in LiveTrade table-database. Sending Trade for LONG_STOCK SMCI  to the market and INSERTING the  LiveTrade table-database.
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    :  LONG_STOCK SMCI 1 863.23 2749 1358 2024-02-23
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logged in.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Account Profile in... 
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Getting Open Stock Positions... 



Open Stock Positions  json= [
          {
                    "url": "https://api.robinhood.com/positions/497177477/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument": "https://api.robinhood.com/instruments/ebab2398-028d-4939-9f1d-13bf38f81c50/",
                    "instrument_id": "ebab2398-028d-4939-9f1d-13bf38f81c50",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "490.2500",
                    "pending_average_buy_price": "490.2500",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "490.2500",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T16:57:59.358873Z",
                    "created_at": "2022-11-30T21:00:58.469148Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
                    "instrument_id": "450dfc6d-5510-4d40-abfb-f633b7d9be3e",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "182.7800",
                    "pending_average_buy_price": "182.7800",
                    "quantity": "1.00000000",
                    "intraday_average_buy_price": "182.7800",
                    "intraday_quantity": "1.00000000",
                    "shares_available_for_exercise": "1.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:07:08.965015Z",
                    "created_at": "2023-01-19T19:55:21.852160Z"
          },
          {
                    "url": "https://api.robinhood.com/positions/497177477/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument": "https://api.robinhood.com/instruments/7973d19b-db71-4f1c-bf05-7da327f91d34/",
                    "instrument_id": "7973d19b-db71-4f1c-bf05-7da327f91d34",
                    "account": "https://api.robinhood.com/accounts/497177477/",
                    "account_number": "497177477",
                    "average_buy_price": "867.4100",
                    "pending_average_buy_price": "867.4100",
                    "quantity": "2.00000000",
                    "intraday_average_buy_price": "867.4100",
                    "intraday_quantity": "2.00000000",
                    "shares_available_for_exercise": "2.00000000",
                    "shares_held_for_buys": "0.00000000",
                    "shares_held_for_sells": "0.00000000",
                    "shares_held_for_stock_grants": "0.00000000",
                    "shares_held_for_options_collateral": "0.00000000",
                    "shares_held_for_options_events": "0.00000000",
                    "shares_pending_from_options_events": "0.00000000",
                    "shares_available_for_closing_short_position": "0.00000000",
                    "ipo_allocated_quantity": "0.00000000",
                    "ipo_dsp_allocated_quantity": "0.00000000",
                    "avg_cost_affected": false,
                    "avg_cost_affected_reason": [],
                    "is_primary_account": true,
                    "updated_at": "2024-02-23T18:38:59.594598Z",
                    "created_at": "2024-02-20T15:26:09.705862Z"
          }
]
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : G3tHoldings()  BEFORE TRADE... 
] Your Holdings  BEFORE TRADE  :
symbol= META    0  
META {'price': '486.849200', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.70', 'percent_change': '-0.69', 'intraday_percent_change': '-0.69', 'equity_change': '-6.801600', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  
AAPL {'price': '182.715000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.72', 'percent_change': '-0.04', 'intraday_percent_change': '-0.04', 'equity_change': '-0.065000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  
SMCI {'price': '860.035000', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1720.07', 'percent_change': '-0.85', 'intraday_percent_change': '-0.85', 'equity_change': '-14.750000', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.27'}
] *** 3nterP0stionsRobin...base()    : BUYing $ 863.23  dollars worth of  SMCI  stock, shares= 1
BID / ASK price for SMCI =      860.020000   /   860.510000
.robinhood*BUY  sendMarket0rder( BUY 1 SMCI stock ) sent to market.
] 3nterP0stionsRobinhoodAndINSERTDatabase()    :                      AFTER TRADE... 
] delaying  1 second(s)...
] resuming...
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : G3tHoldings()  AFTER TRADE... 
] Your Holdings  AFTER TRADE  :
symbol= META    0  
META {'price': '486.760000', 'quantity': '2.00000000', 'average_buy_price': '490.2500', 'equity': '973.52', 'percent_change': '-0.71', 'intraday_percent_change': '-0.71', 'equity_change': '-6.980000', 'type': 'stock', 'name': 'Meta Platforms', 'id': 'ebab2398-028d-4939-9f1d-13bf38f81c50', 'pe_ratio': '32.688000', 'percentage': '9.77'}
symbol= AAPL    1  
AAPL {'price': '182.715000', 'quantity': '1.00000000', 'average_buy_price': '182.7800', 'equity': '182.72', 'percent_change': '-0.04', 'intraday_percent_change': '-0.04', 'equity_change': '-0.065000', 'type': 'stock', 'name': 'Apple', 'id': '450dfc6d-5510-4d40-abfb-f633b7d9be3e', 'pe_ratio': '28.686800', 'percentage': '1.83'}
symbol= SMCI    2  
SMCI {'price': '860.500000', 'quantity': '2.00000000', 'average_buy_price': '867.4100', 'equity': '1721.00', 'percent_change': '-0.80', 'intraday_percent_change': '-0.80', 'equity_change': '-13.820000', 'type': 'stock', 'name': 'Super Micro Computer', 'id': '7973d19b-db71-4f1c-bf05-7da327f91d34', 'pe_ratio': '76.250000', 'percentage': '17.27'}
] 3nterP0stionsRobinhoodAndINSERTDatabase()    : Logging OUT... 
] 3nterP0stionsRobinhoodAndINSERTDatabase( ... )    : returning...
]  exiting NOT accessing rawID=  2749 https://algoinvestorr.com/trades/addonetradetoday.php?d=2024-02-23&type=LONG_STOCK&sym=SMCI&qty=1
*** Leaving Ex3cuteTrade() Now... 





rawIDarr[]== ['2751', '2750', '2748', '2744', '2745', '2747', '2739', '2740', '2741', '2742', '2743', '2749']
rawIDdtarr[]== ['2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800']


] TASK***  IF INI FILE HAS CHANGED IN FILESIZE, Get INI FILE ...


] TASK***  LOOP THRU ALL TRADES FROM GETTRADES 
] TASK***        IF there IS a buy/sell signals within Epsilon minutes from signal'sMinutesFromOpen? 
] TASK*** 
] TASK***          YES,  INI-interpret buy/sell signals into trade and 
] TASK***                SUBMIT TRADE...
] TASK*** 
] TASK***        LOOP THRU ALL INI CSV CMD_   
] TASK***          IF CMD_ VALID FOUND THEN 
] TASK***                SUBMIT TRADE...

==========LOOPING============>Today's Date and Time in NYC (EDT) is: 2024-02-23T13:59:00
] time right now= 1359  g3tMinutesFromClose()= 121
] TIME NOW IN NYC is  1359 , or mins fromClose =  121

] Attempting to Loop 120959  times, with a 5  second delay between reading the local file, for a 
Max # minutes of: 10079.916666666666  and Max # HOURS= 167.9986111111111 



> 13:59:00.] TASK*** BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...
] TASK***   .../Gettrades.php  :  RETURNING:  'buy' or 'sell' signals...
] Attemping live trade retrieval for https://algoinvestorr.com/trades/gettrades.php?u=j&d=2024-02-23  on  2024-02-23
] just hit gettrades.php on server, got todaysTrades[] text.  Attempting to get cuedtrades_2024-02-23
] JSON Payload RECIEVED!!!
] Filtered Records for  any symbol on date, timeNow= 2024-02-23 1359 :
Today's DATE & TIME= 2024-02-23 1359
]  SMCI SELL rawID= 2751 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1400 270   ,   1359 269 1
]  TSLA BUY rawID= 2750 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1345 255   ,   1359 269 14
]  AMZN SELL rawID= 2748 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1330 240   ,   1359 269 29
]  AAPL BUY rawID= 2744 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1359 269 44
]  M SELL rawID= 2745 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1359 269 44
]  AAPL BUY rawID= 2747 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1311 221   ,   1359 269 48
]  QQQ SELL rawID= 2739 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  VXX SELL rawID= 2740 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  GS SELL rawID= 2741 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  META SELL rawID= 2742 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  ETSY SELL rawID= 2743 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  SMCI BUY rawID= 2749 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  INTC SELL rawID= 2738 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1245 195   ,   1359 269 74
]  SPY BUY rawID= 2734 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  AMZN BUY rawID= 2735 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  SMCI BUY rawID= 2736 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  NFLX BUY rawID= 2737 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  NVDA BUY rawID= 2730 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  AMD BUY rawID= 2731 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  QQQ BUY rawID= 2732 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  META BUY rawID= 2733 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  AAPL BUY rawID= 2746 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1153 143   ,   1359 269 126
]  VXX BUY rawID= 2728 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1130 120   ,   1359 269 149
]  @ES SELL rawID= 2729 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1125 115   ,   1359 269 154
]  TSLA BUY rawID= 2727 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1115 105   ,   1359 269 164
]  INTC BUY rawID= 2726 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1101 91   ,   1359 269 178
]  ADBE SELL rawID= 2724 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1359 269 179
]  ETSY BUY rawID= 2725 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1359 269 179
]  NVDA SELL rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  NVDA buyToOpen_PUT_ rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  SPY SELL rawID= 2722 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  GS SELL rawID= 2723 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  ROKU SELL rawID= 2720 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1030 60   ,   1359 269 209
]  AMZN SELL rawID= 2717 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  META BUY rawID= 2718 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  ADBE BUY rawID= 2719 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  @ES BUY rawID= 2716 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0705 -145   ,   1359 269 414
]  @ES SELL rawID= 2715 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0245 -405   ,   1359 269 674
] Filtered Records TIME:
] FOUND one or more Trades...
 record[ rawtradeId ] ==  2751
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2751  exists.
 record[ rawtradeId ] ==  2750
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2750  exists.
 record[ rawtradeId ] ==  2748
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2748  exists.
 record[ rawtradeId ] ==  2744
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2744  exists.
 record[ rawtradeId ] ==  2745
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2745  exists.
 record[ rawtradeId ] ==  2747
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2747  exists.
 record[ rawtradeId ] ==  2739
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2739  exists.
 record[ rawtradeId ] ==  2740
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2740  exists.
 record[ rawtradeId ] ==  2741
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2741  exists.
 record[ rawtradeId ] ==  2742
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2742  exists.
 record[ rawtradeId ] ==  2743
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2743  exists.
 record[ rawtradeId ] ==  2749
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2749  exists.
rawIDarr[]== ['2751', '2750', '2748', '2744', '2745', '2747', '2739', '2740', '2741', '2742', '2743', '2749']
rawIDdtarr[]== ['2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800']


] TASK***  IF INI FILE HAS CHANGED IN FILESIZE, Get INI FILE ...


] TASK***  LOOP THRU ALL TRADES FROM GETTRADES 
] TASK***        IF there IS a buy/sell signals within Epsilon minutes from signal'sMinutesFromOpen? 
] TASK*** 
] TASK***          YES,  INI-interpret buy/sell signals into trade and 
] TASK***                SUBMIT TRADE...
] TASK*** 
] TASK***        LOOP THRU ALL INI CSV CMD_   
] TASK***          IF CMD_ VALID FOUND THEN 
] TASK***                SUBMIT TRADE...

==========LOOPING============>Today's Date and Time in NYC (EDT) is: 2024-02-23T13:59:06
] time right now= 1359  g3tMinutesFromClose()= 121
] TIME NOW IN NYC is  1359 , or mins fromClose =  121

] Attempting to Loop 120958  times, with a 5  second delay between reading the local file, for a 
Max # minutes of: 10079.833333333334  and Max # HOURS= 167.99722222222223 


.] TASK*** BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...
] TASK***   .../Gettrades.php  :  RETURNING:  'buy' or 'sell' signals...
] Attemping live trade retrieval for https://algoinvestorr.com/trades/gettrades.php?u=j&d=2024-02-23  on  2024-02-23
] just hit gettrades.php on server, got todaysTrades[] text.  Attempting to get cuedtrades_2024-02-23
] JSON Payload RECIEVED!!!
] Filtered Records for  any symbol on date, timeNow= 2024-02-23 1359 :
Today's DATE & TIME= 2024-02-23 1359
]  SMCI SELL rawID= 2751 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1400 270   ,   1359 269 1
]  TSLA BUY rawID= 2750 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1345 255   ,   1359 269 14
]  AMZN SELL rawID= 2748 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1330 240   ,   1359 269 29
]  AAPL BUY rawID= 2744 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1359 269 44
]  M SELL rawID= 2745 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1315 225   ,   1359 269 44
]  AAPL BUY rawID= 2747 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1311 221   ,   1359 269 48
]  QQQ SELL rawID= 2739 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  VXX SELL rawID= 2740 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  GS SELL rawID= 2741 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  META SELL rawID= 2742 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  ETSY SELL rawID= 2743 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  SMCI BUY rawID= 2749 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1300 210   ,   1359 269 59
]  INTC SELL rawID= 2738 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1245 195   ,   1359 269 74
]  SPY BUY rawID= 2734 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  AMZN BUY rawID= 2735 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  SMCI BUY rawID= 2736 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  NFLX BUY rawID= 2737 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1215 165   ,   1359 269 104
]  NVDA BUY rawID= 2730 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  AMD BUY rawID= 2731 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  QQQ BUY rawID= 2732 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  META BUY rawID= 2733 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1200 150   ,   1359 269 119
]  AAPL BUY rawID= 2746 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1153 143   ,   1359 269 126
]  VXX BUY rawID= 2728 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1130 120   ,   1359 269 149
]  @ES SELL rawID= 2729 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1125 115   ,   1359 269 154
]  TSLA BUY rawID= 2727 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1115 105   ,   1359 269 164
]  INTC BUY rawID= 2726 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1101 91   ,   1359 269 178
]  ADBE SELL rawID= 2724 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1359 269 179
]  ETSY BUY rawID= 2725 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1100 90   ,   1359 269 179
]  NVDA SELL rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  NVDA buyToOpen_PUT_ rawID= 2721 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  SPY SELL rawID= 2722 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  GS SELL rawID= 2723 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1045 75   ,   1359 269 194
]  ROKU SELL rawID= 2720 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1030 60   ,   1359 269 209
]  AMZN SELL rawID= 2717 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  META BUY rawID= 2718 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  ADBE BUY rawID= 2719 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 1000 30   ,   1359 269 239
]  @ES BUY rawID= 2716 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0705 -145   ,   1359 269 414
]  @ES SELL rawID= 2715 G3tAbsMinutes(): trademins(2), cmpTime(2), absTime= 0245 -405   ,   1359 269 674
] Filtered Records TIME:
] FOUND one or more Trades...
 record[ rawtradeId ] ==  2751
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2751  exists.
 record[ rawtradeId ] ==  2750
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2750  exists.
 record[ rawtradeId ] ==  2748
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2748  exists.
 record[ rawtradeId ] ==  2744
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2744  exists.
 record[ rawtradeId ] ==  2745
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2745  exists.
 record[ rawtradeId ] ==  2747
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2747  exists.
 record[ rawtradeId ] ==  2739
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2739  exists.
 record[ rawtradeId ] ==  2740
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2740  exists.
 record[ rawtradeId ] ==  2741
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2741  exists.
 record[ rawtradeId ] ==  2742
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2742  exists.
 record[ rawtradeId ] ==  2743
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2743  exists.
 record[ rawtradeId ] ==  2749
* DO NOT EXEC TRADE - It has been expressed already. Raw_ID 2749  exists.
rawIDarr[]== ['2751', '2750', '2748', '2744', '2745', '2747', '2739', '2740', '2741', '2742', '2743', '2749']
rawIDdtarr[]== ['2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800', '2024-02-23T13:58:46_sim_2024-02-23T135800']


] TASK***  IF INI FILE HAS CHANGED IN FILESIZE, Get INI FILE ...


] TASK***  LOOP THRU ALL TRADES FROM GETTRADES 
] TASK***        IF there IS a buy/sell signals within Epsilon minutes from signal'sMinutesFromOpen? 
] TASK*** 
] TASK***          YES,  INI-interpret buy/sell signals into trade and 
] TASK***                SUBMIT TRADE...
] TASK*** 
] TASK***        LOOP THRU ALL INI CSV CMD_   
] TASK***          IF CMD_ VALID FOUND THEN 
] TASK***                SUBMIT TRADE...

==========LOOPING============>Today's Date and Time in NYC (EDT) is: 2024-02-23T13:59:11
] time right now= 1359  g3tMinutesFromClose()= 121
] TIME NOW IN NYC is  1359 , or mins fromClose =  121

] Attempting to Loop 120957  times, with a 5  second delay between reading the local file, for a 
Max # minutes of: 10079.75  and Max # HOURS= 167.99583333333334 


.^CTraceback (most recent call last):
  File "/Users/roguequant/_dev/Projects/algo-python/watchdog.py", line 2600, in <module>
    time.sleep(timeDelay) 
    ^^^^^^^^^^^^^^^^^^^^^
KeyboardInterrupt

roguequant@Johns-MacBook-Pro algo-python % 

*/