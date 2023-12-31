# watchdog.py   by John Botti
#
#

import requests
import csv
import time
import datetime
import pytz
import shutil
import sys

import os

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
# from datetime import datetime 

import robin_stocks as rs





def Check_data(array, datastr):
    return datastr in array

def CheckPositions(name, account):
    print("Checking Positions...", account, " for ", name)
    return True

def ClosePositions(name, account):
    print("Calling CLOSE Positions on ", account)
    return True

# robin_stocks Docs:  https://robin-stocks.readthedocs.io/en/latest/robinhood.html#logging-in-and-out
def CheckPostionsRobinhood( username0, pwd0 ):
    print("CheckPostionsRobinhood() Positions for ", username0)

    # Log in to Robinhood (replace 'username' and 'password' with your credentials)
    rs.robinhood.authentication.login(username=username0, password='Crixus2011', expiresIn=86400, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')

    # Get portfolio information
    rs.robinhood.profiles.load_account_profile(account_number=None, info=None)

    # rs.login(username=username0, password=pwd0)
    # portfolio = rs.account.get_portfolio()
    # Log out from Robinhood
    rs.robinhood.authentication.logout()    
    # print(portfolio)


tstr="nytime"
LOOPMax =  7 * 60 * 12
SECSMax =  5  # 20 loops * 12 secs
pwd0="Crixus"
# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_ny = datetime.datetime.now(new_york_timezone).date()


# Print current date in New York as YYYY-MM-DD
#print(f"Current date in New York: {current_date_ny.strftime('%Y-%m-%d')}")
dstr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
dstr1 = dstr  # dstr1 = doesnt change in code todays DATE in NYC

print("Today's date in New York:",dstr1)



print("\n $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager (APM) $$$")
print("\n\nThis module will call the Brokerage APIs directly.\nPlanned: Robinhood API, Fidelity API, Schwab/TD API, E*Trade API")

print("\n\n\nAttempting Robinhood Access...")
pwd0=pwd0+"2011"
CheckPostionsRobinhood( "roguequant1@gmail.com", pwd0 )


# Starting Balance
startingBalance_default = float(100000.0)
print("\nEnter Starting Balance (", startingBalance_default, "):")
startingBalance = input()
if startingBalance == "":
    print("  Defaulting Starting Balance to ", startingBalance_default)
    startingBalance = startingBalance_default

AcctStart = int(startingBalance)
AcctCurr  = AcctStart
AcctMax   = AcctStart

# Max Dollar Loss
MaxDollarLoss = AcctStart / 2;
print("\nEnter Maximum Loss Allowed $ (", MaxDollarLoss, "): ")
MaxDL = input()
if MaxDL == "":
    print("  Defaulting Max Loss to ", MaxDollarLoss)
    MaxDL = MaxDollarLoss

MaxDollarLoss = int(MaxDL)





# GET TIME
current_time_ny = datetime.datetime.now(new_york_timezone).time()
current_date_time_ny = datetime.datetime.now(new_york_timezone)
dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
print("Today's Date and Time in NYC (EDT) is:",dtstr)



# Print current time in New York as HH:MM:SS
# tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
# tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
# tstrHHMMstart = tstrHHMM
# print("\n")
# print("Current time in New York is:",tstr)
# print("Current time in New York (Tradestation format) is :",tstrHHMM)

# tt = int(tstrHHMM)
# if(tt<930):
#     print("\n] Markets not open yet- time remaining:", (930-tt)," minutes...\n\n\n")
#     # uncomment for production
#     #sys.exit()
# if(tt>1415):
#     print("\n] Markets Closed !\n\n\n")
#     #sys.exit()
# if(tt<930 and tt>1415):
#     print("\n] Markets are Open!\n\n\n")



keepLooping = LOOPMax # Set keepLooping to a value greater than 0 to enter the loop
timeDelay   = SECSMax    # secs
print("\ndstr=",dstr  ,"len(dstr)=", len(dstr)  )
print("\n] Starting to Loop for ",str((timeDelay*keepLooping)/60), "minutes,\n\n]  *** ENTERING THE WATCHDOG ALERT LOOP...\n")
# print("\n] currentTradestaionNY_Time=", tt,"\n\n> HH:MM:SS NY EDT_-_-_")

current_time = datetime.datetime.now()
    
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
print(">",tstr, end="", flush=True)
lastminute = tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")


MaxMinutes = (keepLooping * (timeDelay+0 )/60 ) 
print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:",MaxMinutes," Max HOURS=",MaxMinutes/60,"\n\n" )
###################### STARTING LOOP ****************************************

while keepLooping > 0:
    current_time_ny = datetime.datetime.now(new_york_timezone).time()
    lastminute1 = tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
    if(lastminute1>lastminute):
        lastminute=lastminute1
        #print("\n")
        tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
        print("\n>",tstr, end="", flush=True)


    #current_time = time.strftime("%H:%M:%S")  # Get current time
    #print(f"Current time: {current_time}")
    tstr =(f"{current_time_ny.strftime('%H:%M:%S.%f')}")
    #print(" ",tstr)
    print(".", end="", flush=True)
    #print(">",tstr,".", end="", flush=True)
    time.sleep(timeDelay) 
    
    # Wait for 3 seconds then open local file... (adjust for longer durations like 5 sec+ )

    print("BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...")
    CheckPositions("Gianni", "12345354911")


    current_date_time_ny = datetime.datetime.now(new_york_timezone)
    dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
    print("\n======================>Today's Date and Time in NYC (EDT) is:",dtstr)
   
  
#### End of Loop
    # Decrement keepLooping to eventually exit the loop
    keepLooping -= 1  # You might have a condition to break the loop based on a certain condition
    print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:", (keepLooping * (timeDelay+0 )/60 )," and Max # HOURS=", (keepLooping * (timeDelay+0 )/60 )/60  ,"\n\n" )

    #END OF THE LOOP

###################### ENDING LOOP **********************************************

print("\n] Exiting LOOP.\n")