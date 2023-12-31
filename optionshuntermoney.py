#
#       optionshuntermoney.py der'vd from optionshunter.py derv'd from: optionsdataframe.py
#
#            by John Botti     Copyright (c) 2023-2025 by Algo Investor Inc
#
#
# pip install yfinance
# pip install matplotlib
# pip install pandas
#
#
#       also use:
#
#           optionsexpTest.py - goes through different yfinance functions
#
#           optionsexp.py derived from options.py  by John Botti      
#
#           
#
#
#########################################################    imports

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime 


#########################################################    variables

# Define the symbol
symbol_default = "AAPL"
currstr        ="$"
prgname        = "optionshuntermoney.py"
prgvers        =                            "1.60"

# colors 
colorGreen ="32"
colorBlue  ="34"
colorCyan  ="36"
colorOrange  ="33"

colorRed  ="31"
colorMagenta  ="35"
colorYellow  ="33"
colorDarkGreen  ="32;2"
colorDarkRed  ="31;2"
colorPurple  ="35;2"
colorBrown  ="33;2"

colorWhite  ="97"
colorLimeGreen  ="92"
colorAqua  ="96"
colorGray  ="90"

colorArray = [ colorRed, colorBlue, colorGreen, colorOrange, colorCyan]
colorArrayLen = len(colorArray)

call_maxvolumeIdx =0
call_maxvolume0   =0
call_maxoiIdx     =0
call_maxoi0       =0

put_maxvolumeIdx =0
put_maxvolume0   =0
put_maxoiIdx     =0
put_maxoi0       =0

desiredDTE = 65 # 45
spreadPct = 0.15
estBidAskSpread=0.10  # a $3.00 option will have bid $2.85, ask $3.15


# Get today's date 
today_date = datetime.today().strftime('%Y-%m-%d') 
 # Output: e.g., 2023-12-27 (current date)
#
# note: NY Time EST = UTC-5hrs   // EDT =UTC-4hrs                 10:50:10 am NY Time
# 37 TSLA240105P00237500 :  Strike=237.5 ITM? False at 2023-12-27 15:50:10+00:00  last=$0.83  volume=812.0  oi=1417
# 38 TSLA240105P00240000 :  Strike=240.0 ITM? False at 2023-12-27 15:50:01+00:00  last=$1.07  volume=5263.0  oi=11305


#########################################################    def functions

def PrintStrike(optionCallOrPuts, a,descstr):
    #print(descstr)
    print_colored(descstr,colorCyan)
    print("Contract Symbol=",optionCallOrPuts.contractSymbol[a])
    print("Strike         ="+currstr,optionCallOrPuts.strike[a])
    print("Last Trade Date=",optionCallOrPuts.lastTradeDate[a])
    print("Last Price     ="+currstr,optionCallOrPuts.lastPrice[a])
    print("Bid            ="+currstr,optionCallOrPuts.bid[a])
    print("Ask            ="+currstr,optionCallOrPuts.ask[a])
    print("Implied Vol.   =",optionCallOrPuts.impliedVolatility[a])
    print("ITM?           =",optionCallOrPuts.inTheMoney[a])

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def DaysDifference(udate1, udate2):
    date_format = "%Y-%m-%d" 
    parsed_date1 = datetime.strptime(udate1, date_format) 
    parsed_date2 = datetime.strptime(udate2, date_format) 
    difference = parsed_date2 - parsed_date1
    return difference.days


def GetStockPrice(stock_symbol): 
    stock = yf.Ticker(stock_symbol) 
    current_price = stock.history(period="1d")["Close"].iloc[-1] 
    return current_price 
    
# Replace "AAPL" with the symbol of the stock you want to get the price for stock_symbol = "AAPL" 
# Example: Apple Inc. price = GetStockPrice(stock_symbol) 
#                     print(f"The current price of {stock_symbol} is: {price}")

def PrintDollars(prefixstr, amt):
    #prefixstr = "\tTrade #" + str(TradeCount) + ":   WIN!, rnd# = " + str(RandomPct) + " Gain = " + str(RandomPctGain) + "%,    "
    txt = "\t  ${:.2f}"
    print(prefixstr , txt.format(amt, ','))

def round_down(num, modulo):
    return num // modulo * modulo




#############################################################################################    init vars
price0                = 0.0 
priceOfCallSpreadLeg1 = 0.0
priceOfPutSpreadLeg1  = 0.0
priceLegPct           = 0.15
priceCallLegPct       = 0.175
pricePutLegPct        = 0.19


strikeCallLongLeg   = 0
strikeCallShortLeg  = 0
strikeCallShortLegIdx  = 0
strikeCallLongLegIdx  = 0

strikePutShortLeg   = 0
strikePutLongLeg    = 0
strikePutShortLegIdx  = 0
strikePutLongLegIdx  = 0



# modulo
strike1     = 5
strike5     = 5
strike2_5   = 2.5
options100  =100

strikeSize   = strike5
numContracts = 10


print("\n] Variables for ",prgname," have been initialized: prices, spread legs...")


#############################################################################################    main code

#mystr = "WELCOME TO THE WILD WILD WEST..." 
mystr =  "WELCOME to "+prgname+" for Spread Options-hunting to make money.    ver"+prgvers+"..." 

# print_colored(mystr, colorRed ) 
# print_colored(mystr, colorOrange ) 
# print_colored(mystr, colorBrown ) 


# print_colored(mystr, colorGreen ) 
print_colored(mystr, colorBlue ) 
print_colored(mystr, colorYellow) 
print_colored(mystr, colorPurple)
print_colored(mystr, colorMagenta)

print_colored(mystr, colorAqua ) 
print_colored(mystr, colorGray ) 
print_colored(mystr, colorLimeGreen ) 

print_colored(mystr, colorYellow) 
print_colored(mystr, colorBrown ) 
print_colored(mystr, colorDarkRed ) 
print_colored(mystr, colorDarkGreen ) 
print_colored(mystr, colorCyan)


print_colored("\n] TODAY = "+today_date, colorBlue )


# Determine symbol
print("\n\n\n] Enter Symbol (", symbol_default , ")")
symbol = input()
if symbol == "":
    print("] Defaulting Symbol to ", symbol_default)
    symbol = symbol_default

# Create a Ticker object for the symbol
tickerObj = yf.Ticker(symbol)
price0= GetStockPrice(symbol)

pstr= "\n] Price for "+symbol+" = " 
PrintDollars(pstr, price0)
#PrintDollars("\nLong decimals ==", 125999.654981984 )

pstr00 =pstr +currstr +str(price0)
print_colored(pstr00, colorYellow) 

print("\n\n\n")


# Get the options data exp dates
options = tickerObj.options
print(options)

print("\n] Above are the available expiration dates for",symbol,"...\n")


# Determine options DTE
expdate_date = "2024-03-15"
pstr="\n] ENTER a NUMBER for DTE (Days Til Expiration) for "+symbol+" Option's Chain,  [default="+  str(desiredDTE)+ "]:  "
print_colored(pstr,colorCyan)
input0 = input()
if input0 == "":
    pstr="\n] Defaulting ExpirationDate to "+ str(desiredDTE)
    print_colored(pstr,colorOrange)
    input0 = desiredDTE
desiredDTE=int(input0)


pstr ="\n\n] "+today_date+":  DAYS til Options Expiry for "+ symbol+ ": SEARCHING for Option Chains with "+str(desiredDTE)+" DTE or Greater."
print_colored(pstr, colorCyan )

# find DTE YYYY-MM-DD
chainnum=0
firstDateFound="nil"
for option_date in options:
#   if option_date==expdate_dateSelected:
    daystilexp = DaysDifference( today_date, option_date )
    #pstr= "\n"+ str(chainnum)  +  "] Days from now "+today_date+" until "+option_date+": "+str(daystilexp) 
    pstr=  str(chainnum)  +  "] Days from now til "+option_date+": "+str(daystilexp) 
    if(daystilexp < desiredDTE):
        print_colored(pstr, colorGray )
    else:
        print_colored(pstr, colorLimeGreen )
        if firstDateFound=="nil":
            firstDateFound=option_date
    chainnum=chainnum+1


# Determine options Expiry from above DTE determination
expdate_date = "2024-03-15"
if firstDateFound!="nil":
    expdate_date=firstDateFound

mymsg=0
if(mymsg==1):
    pstr= "\n] ENTER options Expiration Date desired ("+ expdate_date + "): "
    print_colored(pstr,colorCyan)
    input0 = input()
    if input0 == "":
        print("\n] Defaulting ExpirationDate to ", expdate_date)
        input0 = expdate_date
    expdate_dateSelected = input0
else:
    expdate_dateSelected=expdate_date


print("\n] Selected Options ExpirationDate is:", expdate_dateSelected)

daysTilExpiry = DaysDifference( today_date, expdate_dateSelected )
pstr= "\n\n] Days from now "+today_date+" until "+symbol+"'s Options Expiration "+expdate_dateSelected+" is "+str(daysTilExpiry) +" days."
print_colored(pstr, colorYellow)



# Determine options Strike Size
strikeSize =  strike5
pstr="\n] ENTER desired STRIKE Size  [default="+  str(strikeSize)+ "]:  "
print_colored(pstr,colorYellow)
input0 = input()
if input0 == "":
    pstr="\n] Defaulting STRIKE Size to "+ str(strikeSize)
    print_colored(pstr,colorOrange)
    input0 = strikeSize
strikeSize=int(input0)










 # Example usage:
# result = round_down(197.50, 5)  # This will return 195
# print(result)



# Print the options chain
print("\n\n] Options Chain for", symbol)
for option_date in options:
    if option_date==expdate_dateSelected:
        option_chain = tickerObj.option_chain(option_date)
        print("\n * Expiration Date:", option_date)
        calls0= option_chain.calls
        puts0 = option_chain.puts


       
##################################### find otm/itm for CALLS
        callsITM=0
        callsOTM=0

        i=0 
        df = pd.DataFrame(calls0)
        max_rows = df.shape[0]
        #print(" max_rows =",max_rows)

        price0= GetStockPrice(symbol)
        # pstr= "\n] Price for "+symbol+" = " 
        # PrintDollars(pstr, price0)



        # round Down here
        priceOfCallSpreadLeg1 = round_down( price0 * (1+priceCallLegPct) , strikeSize )
        priceOfPutSpreadLeg1  = round_down( price0 * (1-pricePutLegPct) , strikeSize )
        
        # rounded down
        strikeCallLongLeg =priceOfCallSpreadLeg1 + strikeSize
        strikeCallShortLeg=priceOfCallSpreadLeg1

        strikePutShortLeg =priceOfPutSpreadLeg1
        strikePutLongLeg  =priceOfPutSpreadLeg1 - strikeSize
    

        zstr=" ***  CALL CREDIT SPREAD "+ symbol+" ***"
        print_colored(zstr,colorCyan )

        c0str= "\n] " +str(priceOfCallSpreadLeg1)+  " STRIKE-Price for Short Call Leg1 of "+symbol #+" trading at " +currstr+str(price0)+" ..."
        c1str= "\n] " +str(priceOfCallSpreadLeg1+strikeSize)+  " STRIKE-Price for Long  Call Leg2 of "+symbol #+" trading at " +currstr+str(price0)+" ..."
        print_colored(c1str,colorDarkGreen )
        print_colored(c0str,colorLimeGreen )

       
        pstr= "\n] Price for "+symbol+" = " 
        PrintDollars(pstr, price0)
       
        print("\n")

        zstr=" ***  PUT CREDIT SPREAD "+ symbol+" ***"
        print_colored(zstr,colorOrange )

        p0str= "\n] " +str(priceOfPutSpreadLeg1)+  " STRIKE-Price for Short Put Leg1 of "+symbol #+" trading at " +currstr+str(price0)+" ..."
        p1str= "\n] " +str(priceOfPutSpreadLeg1-strikeSize)+  " STRIKE-Price for Long  Put Leg2 of "+symbol #+" trading at " +currstr+str(price0)+" ..."
        print_colored(p0str,colorRed )
        print_colored(p1str,colorDarkRed )



        pstr="\n\n\n] ################################################ CALL: max_rows ="+str(max_rows)
        print_colored(pstr,colorGreen )
        
       

#   GRAB MAX VOLUME AND MAX OPEN INTEREST  for CALLS
        call_maxvolumeIdx =0
        call_maxvolume0   =0
        call_maxoiIdx     =0
        call_maxoi0       =0

        i0=0 
        while i0<max_rows:
            pstr =str(i0)+" "+calls0.contractSymbol[i0]+" "  
            p1str= pstr+":  Strike="+str(calls0.strike[i0])+"  volume="+str( calls0.volume[i0])+"  oi="+str( calls0.openInterest[i0])

            if( int( calls0.openInterest[i0] ) > call_maxoi0):
                call_maxoi0 = int(calls0.openInterest[i0])
                call_maxoiIdx = i0
            if( float( calls0.volume[i0] ) > call_maxvolume0):
                call_maxvolume0 = float(calls0.volume[i0])
                call_maxvolumeIdx = i0
            #print_colored(p1str, colorGray )
            i0+=1


        i0=0 
        priceOnce=0
        strikeCallShortLegOnce=0
        strikeCallLongLegOnce=0


        while i0<max_rows:
            pstr =str(i0)+" "+calls0.contractSymbol[i0]+" "  
            p1str= pstr+":  Strike="+str(calls0.strike[i0])+" ITM? "+ str( calls0.inTheMoney[i0] )+  " at "+str( calls0.lastTradeDate[i0]) + "  last="+currstr+str( calls0.lastPrice[i0]) + "  bid="+currstr+str( calls0.bid[i0])+ "  ask="+currstr+str( calls0.ask[i0])+"  volume="+str( calls0.volume[i0])+"  oi="+str( calls0.openInterest[i0])
            if( float(calls0.strike[i0]) > price0  and priceOnce==0):
                estr="\n ***            "+symbol+"    Price = "+ currstr+str(price0)+"\n"
                print_colored(estr, colorGreen )
                priceOnce=1
            

            if( calls0.strike[i0]>strikeCallShortLeg and strikeCallShortLegOnce==0 ):
                print(" CALL SHORT LEG ", strikeCallShortLeg )    
                print_colored(p1str, colorGreen )  
                strikeCallShortLegIdx = i0
                strikeCallShortLegOnce=1

            if( calls0.strike[i0]>strikeCallLongLeg and strikeCallLongLegOnce==0 ):
                print(" CALL LONG LEG ", strikeCallLongLeg )    
                print_colored(p1str, colorGreen )  
                strikeCallLongLegIdx = i0
                strikeCallLongLegOnce=1



            if( i0 == call_maxoiIdx or  i0 == call_maxvolumeIdx ):
                if( i0 == call_maxoiIdx):
                    print_colored(p1str, colorCyan )
                if( i0 == call_maxvolumeIdx ):
                    print_colored(p1str, colorYellow )  
            else:
                print_colored(p1str, colorGray )
 
            i0+=1
       


        callCredit = numContracts * calls0.bid[strikeCallShortLegIdx] *options100
        callDebit  = numContracts *  calls0.ask[strikeCallLongLegIdx] *options100
        totalCredit= callCredit - callDebit  
        totalRisk  = (numContracts * strikeSize * options100 ) - totalCredit
        totalPctGainLoss= totalCredit / totalRisk
        
        print(" CREDIT Collecting (Short CALL Leg)", numContracts, "* [bid]" , calls0.bid[strikeCallShortLegIdx] , " =   -"+currstr+ str( callCredit ) )
        print("  DEBIT Paying      (Long CALL Leg)", numContracts, "* [ask]" , calls0.ask[strikeCallLongLegIdx]  , " =   +"+currstr+ str( callDebit ) )
        print(" =============================")
        print("    = "+currstr+ str(totalCredit) , "  /  Risk ="+currstr+str(totalRisk), "  ratio: ", str(totalPctGainLoss*100)+"%" )
        print("\n    numContracts = ",numContracts)



        p0str="\n] MAX CALLs Open Interest = "+str(call_maxoi0)+ " at Strike "+ currstr+str(calls0.strike[call_maxoiIdx]) +", idx="+str(call_maxoiIdx)  
        print_colored(p0str, colorCyan )
        
        p0str="\n] MAX CALLs Volume        = "+str(call_maxvolume0)+ " at Strike "+ currstr+str(calls0.strike[call_maxvolumeIdx]) +", idx="+str(call_maxvolumeIdx)   
        print_colored(p0str, colorYellow )
   
        print("\n\n\n")



        pPrevStr=" nilPRevStr"
        keepsearching=1
        while i<max_rows and keepsearching==1:
            #print(i," ",calls0.contractSymbol[i], calls0.inTheMoney[i])
            pstr=str(i)+" "+calls0.contractSymbol[i]+" "+str( calls0.inTheMoney[i])
            #print_colored(pstr, colorGreen)


            if( str(calls0.inTheMoney[i])=="False"):
                #print("Found the CALLs ITM/OTM at: ",i-1," / ",i)
                

                print_colored(pPrevStr, colorGreen )
                pstr0="* Found the 50/50 Delta CALLs (OTM/ITM) at: "+str(i-1)+" / "+str(i)
                print_colored(pstr0, colorYellow )

                callsOTM=i
                callsITM=i-1
                keepsearching=0
                print_colored(pstr, colorDarkGreen )
                
                #pstr1=str(i+1)+" "+calls0.contractSymbol[i+1]+" "+str( calls0.inTheMoney[i+1])
                #print_colored(pstr1, colorDarkGreen)
                #pstr1=str(i+2)+" "+calls0.contractSymbol[i+2]+" "+str( calls0.inTheMoney[i+2])
                #print_colored(pstr1, colorDarkGreen)
            else:
                pPrevStr = pstr
                # print_colored(pstr, colorGreen )

            i += 1 
        
        print(symbol.upper(),": CALLS ITM=",callsITM, " OTM=",callsOTM)

        a=callsITM
        #print("\nCalls ITM for [",a,"]:")
        pstr="\nCalls ITM In-The-Money for ["+str(a)+"]:"
        print_colored(pstr, colorGreen)

        cpstr=symbol.upper()+"'s Calls Expiring: "+option_date
        PrintStrike(calls0, a, cpstr)  
        
        a=callsOTM
        #print("\nCalls OTM Out-of-The-Money for [",a,"]:")
        pstr="\nCalls OTM Out-of-The-Money for ["+str(a)+"]:"
        print_colored(pstr, colorDarkGreen)

        cpstr=symbol.upper()+"'s Calls Expiring: "+option_date
        PrintStrike(calls0, a, cpstr)






##################################### find otm/itm for PUTS
        putsITM=0
        putsOTM=0

        i=0 
        df = pd.DataFrame(puts0)
        max_rows = df.shape[0]
        pstr="\n\n\n] ################################################### PUTs: max_rows ="+str(max_rows)
        print_colored(pstr,colorRed)





#   GRAB MAX VOLUME AND MAX OPEN INTEREST  for PUTS
        put_maxvolumeIdx =0
        put_maxvolume0   =0
        put_maxoiIdx     =0
        put_maxoi0       =0

        i0=0 
        while i0<max_rows:
            pstr =str(i0)+" "+puts0.contractSymbol[i0]+" "  
            p1str= pstr+":  Strike="+str(puts0.strike[i0])+"  volume="+str( puts0.volume[i0])+"  oi="+str( puts0.openInterest[i0])

            if( int( puts0.openInterest[i0] ) > put_maxoi0):
                put_maxoi0 = int(puts0.openInterest[i0])
                put_maxoiIdx = i0
            if( float( puts0.volume[i0] ) > put_maxvolume0):
                put_maxvolume0 = float(puts0.volume[i0])
                put_maxvolumeIdx = i0
            #print_colored(p1str, colorGray )
            i0+=1


        i0=0 
        priceOnce=0
        strikePutLongLegOnce =0
        strikePutShortLegOnce = 0
        while i0<max_rows:
            pstr =str(i0)+" "+puts0.contractSymbol[i0]+" "  
            p1str= pstr+":  Strike="+str(puts0.strike[i0])+" ITM? "+ str( puts0.inTheMoney[i0] )+  " at "+str( puts0.lastTradeDate[i0]) + "  last="+currstr+str( puts0.lastPrice[i0])+ "  bid="+currstr+str( puts0.bid[i0])+ "  ask="+currstr+str( puts0.ask[i0])+"  volume="+str( puts0.volume[i0])+"  oi="+str( puts0.openInterest[i0])
            if( float(puts0.strike[i0]) > price0  and priceOnce==0):
                estr="\n ***            "+symbol+"    Price = "+ currstr+str(price0)+"\n"
                print_colored(estr, colorRed )
                priceOnce=1
            


            if( puts0.strike[i0]>strikePutShortLeg and strikePutShortLegOnce==0 ):
                ostr=" PUT SHORT LEG "+currstr+str( strikePutShortLeg )    
                print_colored(ostr, colorYellow )  
                print_colored(p1str, colorRed )  
                strikePutShortLegIdx = i0
                strikePutShortLegOnce=1

            if( puts0.strike[i0]>strikePutLongLeg and strikePutLongLegOnce==0 ):
                ostr=" PUT LONG LEG "+ currstr+str(strikePutLongLeg )    
                print_colored(ostr, colorYellow )  
                print_colored(p1str, colorRed )  
                strikePutLongLegIdx = i0
                strikePutLongLegOnce=1



            if( i0 == put_maxoiIdx or  i0 == put_maxvolumeIdx ):
                if( i0 == put_maxoiIdx):
                    print_colored(p1str, colorCyan )
                if( i0 == put_maxvolumeIdx ):
                    print_colored(p1str, colorYellow )  
            else:
                print_colored(p1str, colorGray )
 
            i0+=1
       

        # estBidAskSpread=0.10  # a $3.00 option will have bid $2.85, ask $3.15
        eststrA=" "
        eststrB=" "

        bid0  = puts0.bid[strikePutShortLegIdx]
        ask0  = puts0.ask[strikePutLongLegIdx]

        # last0 = puts0.last[strikePutShortLegIdx]
        # if(bid0<0.05):
        #     bid0= last0 * (1 - (estBidAskSpread*0.50) )   #  ie  $290 * 0.95
        #     eststrB=" *Estimated bid"
        # if(ask0<0.05):
        #     ask0= last0 * (1 + (estBidAskSpread*0.50) )  #  ie  $290 * 1.05
        #     eststrA=" *Estimated ask"

            
        putCredit = numContracts * bid0 *options100
        putDebit  = numContracts *  ask0 *options100
        totalPutCredit= putCredit - putDebit  
        totalPutRisk  = (numContracts * strikeSize * options100 ) - totalPutCredit
        totalPutPctGainLoss= totalPutCredit / totalPutRisk
        
        print(" CREDIT Collecting (Short PUT Leg)", numContracts, "* [bid]"+eststrB , bid0   , " =   -"+currstr+ str( putCredit ) )
        print("  DEBIT Paying      (Long PUT Leg)", numContracts, "* [ask]"+eststrA , ask0 , " =   +"+currstr+ str( putDebit ) )
        print(" =============================")
        print("    = "+currstr+ str(totalPutCredit) , "  /  Risk ="+currstr+str(totalPutRisk), "  ratio: ", str(totalPutPctGainLoss*100)+"%" )
        print("\n    numContracts = ",numContracts)

        




        p0str="\n] MAX PUTs Open Interest = "+str(put_maxoi0)+ " at Strike "+ currstr+str(puts0.strike[put_maxoiIdx]) +", idx="+str(put_maxoiIdx)  
        print_colored(p0str, colorCyan )
        
        p0str="\n] MAX PUTs Volume        = "+str(put_maxvolume0)+ " at Strike "+ currstr+str(puts0.strike[put_maxvolumeIdx]) +", idx="+str(put_maxvolumeIdx)   
        print_colored(p0str, colorYellow )
   
        print("\n\n\n")






        keepsearching=1
        while i<max_rows and keepsearching==1:
            #print(i," ",puts0.contractSymbol[i], puts0.inTheMoney[i])
            pstr=str(i)+" "+puts0.contractSymbol[i]+" "+str( puts0.inTheMoney[i])
            #print_colored(pstr, colorRed)

            if( str(puts0.inTheMoney[i])=="True"):
                print_colored(pPrevStr, colorDarkRed )

                pstr0="* Found the 50/50 Delta PUTs (OTM/ITM) at: "+str(i-1)+" / "+str(i)
                print_colored(pstr0, colorYellow )

                putsITM=i
                putsOTM=i-1
                keepsearching=0
                print_colored(pstr, colorRed)
                
                #pstr1=str(i+1)+" "+puts0.contractSymbol[i+1]+" "+str( puts0.inTheMoney[i+1])
                #print_colored(pstr1, colorRed)
                #pstr1=str(i+2)+" "+puts0.contractSymbol[i+2]+" "+str( puts0.inTheMoney[i+2])
                #print_colored(pstr1, colorRed)
            
            else:
                pPrevStr = pstr
                # print_colored(pstr, colorDarkRed)
                

            i += 1

        print(symbol.upper(),": PUTS ITM=",putsITM, " OTM=",putsOTM)



        a=putsITM
        #print("\nPuts  data for [",a,"]:")
        pstr="\nPuts ITM In-The-Money data for ["+str(a)+"]:"
        print_colored(pstr, colorRed )
        
        cpstr=symbol.upper()+"'s Puts Expiring: "+option_date
        PrintStrike(puts0, a, cpstr)

        a=putsOTM
        #print("\nPuts  data for [",a,"]:")
        pstr="\nPuts OTM Out-of-The-Money data for ["+str(a)+"]:"
        print_colored(pstr, colorDarkRed )

        cpstr=symbol.upper()+"'s Puts Expiring: "+option_date
        PrintStrike(puts0, a, cpstr)



        print("\n\n\n\n")

        #price0= GetStockPrice(symbol)
        pstr= "\n] Price for "+symbol+" = " 
        PrintDollars(pstr, price0)

        print_colored("CALLS:", colorGreen)
        print(calls0)

        print_colored("PUTS:",colorRed)
        print(puts0)


        #  contractSymbol lastTradeDate  strike  lastPrice    bid   ask  change  percentChange  
        #  volume  openInterest  impliedVolatility  inTheMoney contractSize currency
       
        print_colored("\n\n\n END OF DATAFRAME ANALYSIS.", colorLimeGreen)







# END OF PROGRAM







# Optionally, you can also plot some option data using matplotlib
# option_chain = tickerObj.option_chain(options[0])
# plt.figure(figsize=(10, 6))
# plt.plot(option_chain.calls['strike'], option_chain.calls['lastPrice'], label='Call Last Price', marker='o')
# plt.plot(option_chain.puts['strike'], option_chain.puts['lastPrice'], label='Put Last Price', marker='o')
# plt.xlabel('Strike Price')
# plt.ylabel('Last Price')
# plt.title('Option Prices for ' + symbol)
# plt.legend()
# plt.grid()
# plt.show()
