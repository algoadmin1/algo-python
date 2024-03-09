#
# postitloop1.py   version 2.2, for use with TradeSta.'s  !!PivotsPython_MTWTF
#
#       Copyright (c) by John Botti  and Algo Investor Inc
#
#
#
#  postitloop.py:
#
#       Runs in a loop
#
#       This is meant to run on a PC, running in the folder:
#
#          c:\_dev\Projects\algo-python\postit.py
#
#       It will look for the realime, [TradeSta] Updated file to read:
#
#          c:\_dev\Projects\algo-python\intradaytrades.txt  
#
#       which is output by the Tradestation EL Program:  !!PivotsPython_MTWTF  (this appends intradaytrades.txt )
#
#       *** postit.py NEEDs to run in a LOOP so it can sit on the PC where Tradestation( !!PivotsPython_MTWTF ) is running and
#       ***           AND it needs to timeout every 20 secs and shutil.copyfile(source_file, destination_file) to avoid TradeSta AppendFile contention
#       postit.py calls 
#
#           https://algoinvestorr.com/trades/recpost.php 
#
#       which receives the trades for TODAY's DATE intradaytradesYYYY-MM-DD via $_POST and writes them to a text file called (on 12-13-23):
#
#           https://algoinvestorr.com/trades/intradaytrades_2023-12-13.txt
#
#       
#       to run batch file:  ] & "C:\_dev\Projects\algo-python\gobot.bat"
#
#                                    & "C:\_dev\Projects\algo-python\gobot.bat"    ==
#
#                                    Start-Process -FilePath "C:\_dev\Projects\algo-python\gobot.bat"
#
#       Set-Content -Path "C:\_dev\Projects\algo-python\gobot.bat" -Value "cls `ncd c:\_dev\Projects\algo-python `npython postitloop1.py"
#
#       Copy-Item "C:\_dev\Projects\algo-python\gobot.bat" -Destination "C:\Users\rogue\gobot.bat"
#
#
#
#
#import shutil
#source_file      = "intradaytrades.txt"
#destination_file = "intradaytrades1.txt"
# Copy the file
#shutil.copyfile(source_file, destination_file)
#print(f"File '{source_file}' copied to '{destination_file}'")


import requests
import csv
import time
import datetime
import pytz
import shutil
import sys

import os
import random

################################################ for TESTING
#
#             /_dev/Projects/algo-python       cp intradaytradesTest0[0-4].txt intradaytrades.txt
#
#
#
#################################################




#today_date_unix = datetime.datetime.now().timestamp()
#print(today_date_unix )

MAX_Elements=42  # added MonthlyR/S123 (8) gaps(4)+ EOL  # old: 29
# 2023-12-15,1500,fri,15min,3.2152%,BUY,100,TSLA,atLimit,251.41,Pday,buysigcnt,4,R3R2R1_P_P3_S1S2S3=,266.97,261.69,256.42,248.60,237.57,243.33,235.51,230.24,p-S1=,8.08,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,254.61,249.19,235.82,227.87,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,EOL
#
# 2023-12-15,1500,fri,15min,3.2152%,BUY,100,TSLA,atLimit,251.41,
# Pday,buysigcnt,4,R3R2R1_P_P3_S1S2S3=,266.97,261.69,256.42,248.60,237.57,243.33,
# 235.51,230.24,p-S1=,8.08,gap=0.0125,0.00,0.0,0.0,wkR2R1S1S2=,254.61,
# 249.19,235.82,227.87,moR3R2R1PS1S2S3=,-1.00,-1.00,-1.00,-1.00,-1.00,-1.00,
# -1.00,EOL
#
#

dtstr="nydatetime"
dstr="nydate"
tstr="nytime"

urlbase = 'https://algoinvestorr.com/trades/'
url = 'https://algoinvestorr.com/trades/recpost.php'
       
MIN_DATA_STRING_LEN = 32
LOOPMax =  7  * 24 * 60 * 5   
SECSMax =12   # 20 loops * 12 secs



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

colorArray = [ colorRed, colorBlue, colorGreen, colorOrange, colorCyan, colorAqua, colorYellow ,colorPurple, colorMagenta,colorBrown ]
colorArrayLen = len(colorArray)



# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_ny = datetime.datetime.now(new_york_timezone).date()

# Print current date in New York as YYYY-MM-DD
#print(f"Current date in New York: {current_date_ny.strftime('%Y-%m-%d')}")
dstr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
dstr1 = dstr  # dstr1 = doesnt change in code todays DATE in NYC

print("Today's date in New York:",dstr1)


##################################################### FUNCTIONS

def get_udate():
    datestr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
    return datestr

def rand(num):
    return(random.randint(0, (num-1)))

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def print_colored_rnd(text):
    r = rand(colorArrayLen)
    print_colored(text, colorArray[r])
 

def Check_data(array, datastr):
    return datastr in array

# Example usage:
#my_array = [1, 3, 5, 7, 9]
#my_datastr = 7
#result = Check_data( data, data_to_send )
#print(result)  # This will print True or False based on whether my_datastr is in my_array or not



#####################################################  OVERIDING today's date
print("\n] Enter Date Override (", dstr , ")")
dateUser = input()
if dateUser == "":
    print("] * Defaulting Symbol to ", dstr)
else:
    if len(dateUser)==10:
        dstr = dateUser
        print("] OVERIDING dstr(",dstr1,") = ",dstr,"\n")
        #if( len(dstr)<10 or len(dstr)>10 ):
        #    dstr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
        #    print(" Defaulting Symbol to ", dstr)
        #    #dstr= "2023-12-15"
#print("] OVERIDING dstr = "+dstr)
#####################################################



print("\n] Initializing memory and arrays[]...\n")
# Read the CSV file and extract data
file_path = 'intradaytrades.txt'  # Replace with your file path
#file_path = 'intradaytradessm.txt'  # Replace with your file path
dataMaster = []     # called 1st, then each looped call is read into data[], and cmp'd to/insertedIFF into dataMaster[] - the running list of a,b,c,d,...,EOL
dataMasterLen=0
data_to_sendLastMaster =""        


# GET TIME
current_time_ny = datetime.datetime.now(new_york_timezone).time()
current_date_time_ny = datetime.datetime.now(new_york_timezone)
dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
print("Today's Date and Time in NYC (EDT) is:",dtstr)


# Print current time in New York as HH:MM:SS
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
tstrHHMMstart = tstrHHMM
print("\n")
print("Current time in New York is:",tstr)
print("Current time in New York (Tradestation format) is :",tstrHHMM)

tt = int(tstrHHMM)
if(tt<930):
    print("\n] Markets not open yet- time remaining:", (930-tt)," minutes...\n\n\n")
    # uncomment for production
    #sys.exit()
if(tt>1415):
    print("\n] Markets Closed !\n\n\n")
    #sys.exit()
if(tt<930 and tt>1415):
    print("\n] Markets are Open!\n\n\n")


###################################################### 1st dataMaster[] Injest...
#
    
# set this to zero for testing if you do not want dataMaster[] init'd...

data_to_sendLastMaster =""        
dataMasterLen=0

# assume initial file intradaytrades.txt (PC[tradesta]-->c:\...) NOT exists
injest0=0  

if os.path.exists(file_path):
    injest0=1
else:
    print("\n] ",file_path," NOT Found, skipping initial INJEST, records found=0.")

i0=0
if(injest0==1):
    print("\n] ATTEMPTING 1st INJEST...\n")

    i0=0
    print("\n] 1st TIME Opening local csv file:", file_path)
    with open(file_path, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            #print("row=",row) 
            data_to_send = ','.join(row)
            #print("\n] i0=",i0,":  ",data_to_send)
            
            result = Check_data( dataMaster, data_to_send )
           
        
## here we MUST check if the first value, split_values[0], the date == current date dstr (or overridden date)

            dateMatch=False
            str0="nil"
            if(len(data_to_send ) > MIN_DATA_STRING_LEN):       # make sure data_to_send is not null
                split_values = data_to_send.split(",")
                if split_values:
                    str0 = split_values[0]
                    if(str0 == dstr):                            # make sure  dates match & set explicitly
                        dateMatch=True
                    else:   
                        dateMatch=False


            jstr = "] row="+str(i0)+": split_values[0]_DATE="+ str0 +"_today="+dstr+"?="+ str(dateMatch)  +  ". The current string IS FOUND in the dataMaster[] array? "+str(result)    # This will print True or False based on whether my_datastr is in my_array or not
            if(i0%5==0):
                print("\n",jstr) #, end="", flush=True)


            if(result == False ):            # IFF Not in dataMaster[] unique array (note: dates do not have to match)
                dataMaster.append(data_to_send)
                dataMasterLen = dataMasterLen  + 1 
                if( dateMatch==True ):  
                    data_to_sendLastMaster = data_to_sendLastMaster + data_to_send +"\n"


            i0=i0+1   # only num rows read
        #
        # END of For loop
        #################

    print("\n] end of dataMaster["+str(dataMasterLen)+"] 1st INJEST, out of a total of "+str(i0)+" rows read... Closing file.\n")

    # Close the file, read  i0  rows...
    file.close()
    print("\n] LOCAL read FILE " +file_path +" CLOSED.  Here's today's data to send upon INIT data_to_sendLastMaster=\n"+data_to_sendLastMaster)
 


# here send initial data

# check if there is no data
if(len(data_to_sendLastMaster) > MIN_DATA_STRING_LEN):
    print("\n] =====================================================================>>>INIT_SENDING data_to_sendLastMaster (1st TIME) via _POST...\n")

    payload = {'data': data_to_sendLastMaster }
    response = requests.post(url, data=payload)
    print(response.text)
    print("<<<=============================\n\n")

    # print the info line to the console
    tgt = "intradaytradesServer_"+dstr1+".txt"
    print("Called & POSTed "+str(dataMasterLen)+ " lines (Trades) to: ",url, "----> ", urlbase+tgt)
else:
    print("\n] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> *NOT Sending ANY INITIAL data - NO TRADES FOUND in data_to_sendLastMaster.\n") 











keepLooping = LOOPMax # Set keepLooping to a value greater than 0 to enter the loop
timeDelay   = SECSMax    # secs
print("\ndstr=",dstr  ,"len(dstr)=", len(dstr)  )
print("\n] Starting to Loop for ",str((timeDelay*keepLooping)/60), "minutes,\n\n]  *** ENTERING BUY/SELL TRADE ALERT LOOP...\n")
print("\n] currentTradestaionNY_Time=", tt,"\n\n> HH:MM:SS NY EDT_-_-_")

current_time = datetime.datetime.now()
    
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
print(">",tstr, end="", flush=True)
lastminute = tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")


MaxMinutes = (keepLooping * (timeDelay+0 )/60 ) 
# print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:",MaxMinutes," Max HOURS=",MaxMinutes/60,"\n\n" )
attemptStr="\n] Attempting to Loop "+str( keepLooping)+" times, with a " +str(timeDelay)+" second delay between reading the local file, for a \nMax # minutes of:"+str(MaxMinutes)+" Max HOURS="+str(MaxMinutes/60)+"\n\n" 
print_colored_rnd(attemptStr)

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


    # Looping this code now 2023-12-7T19:01:00
    additionalTradesFound=0
    data_lines_to_send=0
    data_to_sendLast=""
    data = []
    dataToday = []

    i=0
    uniques=0
    if os.path.exists(file_path):
        print("\n Opening local csv file:", file_path)
    
        with open(file_path, 'r') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                #print("row=",row) 
                data_to_send = ','.join(row)
                #print("i=",i,":  ",data_to_send)
                #payload = {'data': data_to_send}
                #response = requests.post(urlPost, data_to_send)
                #print(response.text)

                # if [def ]check_str( data_to_send, dataMaster) == false:

                result = Check_data( dataMaster, data_to_send )
                #print("\n]",i,"The current string IS FOUND in the dataMaster[] array?",result)  # This will print True or False based on whether my_datastr is in my_array or not
                if(result==False):
                    print("\n] row=",i,". The current string IS NOT FOUND in dataMaster[], adding:\n",data_to_send)
                    dataMaster.append(data_to_send)
                    arrstrM = dataMaster[dataMasterLen]             # i0  becomes dataMasterLen
                    print("\n] dataMaster["+str(dataMasterLen)+"] :  ADDING:arrstrM=", arrstrM)
                    dataMasterLen=dataMasterLen+1

                    data.append(row)
                    print("] uniques=",uniques,data[uniques])
                    arrstr = data[uniques]
                    #print("\n #0,10,21==",arrstr[0],arrstr[10],arrstr[21])
                    additionalTradesFound=additionalTradesFound+1
                
                    if arrstr and len(arrstr) > 0:
                        if arrstr[0] is not None:
                            if(arrstr[0] == dstr):
                                #if dates match then POST
                                print("\nTrade date (", dstr ,") trade array:  data["+str(uniques)+"] =  ",data[uniques], "  adding to data_to_sendLast...\n")
                                print("uniques=",uniques,":  ",data_to_send)
                                data_to_sendLast=data_to_sendLast+data_to_send+"\n"   #this is the trade data from today to send uo
                                data_lines_to_send = data_lines_to_send+1
                                dataToday.append(row)
                                signalStrength = int(arrstr[12])  # [12]=sigStrength
                                if(signalStrength>=8):
                                    print("*** Strong "+ arrstr[5].upper()+ " signal !!!\n")
                
                    uniques=uniques+1
                #
                #if False
                #########
                
                i=i+1
            # for
        # with open file
        # Close the file, read  i  rows...
        file.close()
        print("\nClosed file.\n Read "+ str(i)+ "rows, UNIQUE lines found:", additionalTradesFound )
    #
    #
    #
    # END OF If file exists...
    ############################



    print("\n]  ***** The LAST ITEM:")
    j=0
    tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
    print("EDT tstrHHMM=",tstrHHMM)
    print("\n\nToday's Trades Extracted today", dstr,": dataToday[][] at time=",tstrHHMM) 
    for row in dataToday:
        if(j<MAX_Elements and j<11):   
            rowstr = row[j]
            diffTime = 1000 #int(rowstr[1]) - tstrHHMM
            print(j,": ",rowstr)
            if(j==1):
                diffTime = int(tstrHHMM) - int(rowstr) 
                print("tstrHHMM - row[1]=", tstrHHMM, " - " ,rowstr, ", ",diffTime,"hrs ago* MAth NOT Correct for time -.")
            j=j+1

    print("\n] END OF Trade Injest. \n] keepLooping==",keepLooping)



    # check if there is no data
    if(len(data_to_sendLast) > MIN_DATA_STRING_LEN):
        print("\n] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-----====>>>SENDING data_to_sendLast via _POST...\n")

        payload = {'data': data_to_sendLast }
        response = requests.post(url, data=payload)
        print(response.text)
        print("\n\n")

        # POST the last line to the PHP script
        tgt = "intradaytradesServer_"+dstr1+".txt"
        print("Called & POSTed "+str(data_lines_to_send)+ " lines (Trades) to: ",url, "----> ", urlbase+tgt)
    else:
        print("\n] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> *NOT Sending ANY data - NO TRADES FOUND.\n") 


    current_date_time_ny = datetime.datetime.now(new_york_timezone)
    dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
    print("\n======================>Today's Date and Time in NYC (EDT) is:",dtstr)
    
#### End of Loop
    # Decrement keepLooping to eventually exit the loop
    keepLooping -= 1  # You might have a condition to break the loop based on a certain condition
    # print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:", (keepLooping * (timeDelay+0 )/60 )," and Max # HOURS=", (keepLooping * (timeDelay+0 )/60 )/60  ,"\n\n" )
    attemptStr="\n] Attempting to Loop "+str( keepLooping)+" times, with a " +str(timeDelay)+" second delay between reading the local file, for a \nMax # minutes of: "+str(MaxMinutes)+" Max HOURS="+str(  (keepLooping * (timeDelay+0 )/60 )/60 )+"\n\n" 
    print_colored_rnd(attemptStr)

    # if abc  dstr = get_udate()
    #
    #END OF THE LOOP

###################### ENDING LOOP **********************************************

print("\n] Exiting LOOP.\n")

print("\n\n")









############################ working _POST to use w/ recpost.php
# sendpost.py sample py => php sender

##import requests

# String data to be sent
##data_to_send = "a,b,c,d,34,554,1.2,g,h,i,j"

# URL to send POST request
##url = 'https://algoinvestorr.com/trades/recpost.php'

# Define data to be sent as a dictionary
##payload = {'data': data_to_send}

# Send POST request 
#response = requests.post(url, data_to_send)

# Print response from the server
##print(response.text)
#
#

        #fname = "myfile.txt"
        ## Open the file in read mode
        #file = open(fname, 'r')
    
            ####-->Perform operations with the file...
        
        # Close the file
        #file.close()    

############################ working _POST to use w/ recpost.php


#
# Check if arrstr exists and arrstr[0] is defined
# if 'arrstr' in locals() and arrstr and len(arrstr) > 0:
#     if arrstr[0] is not None:
#         print("arrstr[0] is defined and not None.")
#     else:
#         print("arrstr[0] is either None or not defined.")
# else:
#     print("arrstr is not defined or is an empty list.")
#
