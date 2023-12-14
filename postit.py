# postit.py   i.e. postIntradayTrades.py
#
#
#
#  postit.py:
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
#       
#       postit.py calls 
#
#           https://algoinvestorr.com/trades/recpost.php 
#
#       which receives the trades for TODAY's DATE intradaytradesYYYY-MM-DD via $_POST and writes them to a text file called (on 12-13-23):
#
#           https://algoinvestorr.com/trades/intradaytrades_2023-12-13.txt
#
#



import requests
import csv
import datetime
import pytz

#today_date_unix = datetime.datetime.now().timestamp()
#print(today_date_unix )

MAX_Elements=29
dtstr="nydatetime"
dstr="nydate"
tstr="nytime"
url = 'https://algoinvestorr.com/trades/recpost.php'


# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_time_ny = datetime.datetime.now(new_york_timezone)
current_date_ny = datetime.datetime.now(new_york_timezone).date()
current_time_ny = datetime.datetime.now(new_york_timezone).time()

#print (f"Current date and time in New York: {current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
print("Today's Date and Time in NYC (EDT) is:",dtstr)


# Print current date in New York as YYYY-MM-DD
#print(f"Current date in New York: {current_date_ny.strftime('%Y-%m-%d')}")
dstr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
print("Today's date in New York:",dstr)

#####################################################  OVERIDING today's date
#dstr= "2023-12-13"
#print("] OVERIDING dstr = "+dstr)
#####################################################


# Print current time in New York as HH:MM:SS
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
tstrHHMMstart = tstrHHMM
print("\n")
print("Current time in New York is:",tstr)
print("Current time in New York (Tradestation format) is :",tstrHHMM)


# Print today's date as a Unix timestamp
#print(f"Today's date as Unix timestamp: {int(today_date_unix)}")
 
print("\n")
# Read the CSV file and extract data
file_path = 'intradaytrades.txt'  # Replace with your file path
#file_path = 'intradaytradessm.txt'  # Replace with your file path
data = []
dataToday = []



#
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

data_lines_to_send=0
data_to_sendLast=""
i=0
with open(file_path, 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        #print("row=",row) 
        data_to_send = ','.join(row)
        #print("i=",i,":  ",data_to_send)
        #payload = {'data': data_to_send}
        #response = requests.post(urlPost, data_to_send)
        #print(response.text)

        data.append(row)
        #print("i=",i,data[i])
        arrstr = data[i]
        #print("\n #0,10,21==",arrstr[0],arrstr[10],arrstr[21])
        

        if arrstr and len(arrstr) > 0:
            if arrstr[0] is not None:
                if(arrstr[0] == dstr):
                    #if dates match then POST
                    print("Today's (", dstr ,") trade data[",i,"] =  ",data[i], "  adding to data_to_sendLast...\n")
                    print("i=",i,":  ",data_to_send)
                    data_to_sendLast=data_to_sendLast+data_to_send+"\n"   #this is the trade data from today to send uo
                    data_lines_to_send = data_lines_to_send+1
                    dataToday.append(row)
                    signalStrength = int(arrstr[12])  # [12]=sigStrength
                    if(signalStrength>=8):
                        print("*** Strong "+ arrstr[5].upper()+ " signal !!!\n")
            
        #j=0
        #tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
        #print("EDT tstrHHMM=",tstrHHMM)
        #print("\n\nToday's Trades Extracted today", dstr,": dataToday[][] at time=",tstrHHMM) 
        #for row1 in dataToday:
        #    if(j<MAX_Elements):  ## ie last rowstr[]=''
        #        rowstr = row1[j]
        #        diffTime = 1000 #int(rowstr[1]) - tstrHHMM
        #        print(j,": ",rowstr)
        #        if(j==1):
        #            diffTime = int(tstrHHMM) - int(rowstr) 
        #            print("tstrHHMM - row1[1]=", tstrHHMM, " - " ,rowstr, ", ",diffTime,"hrs ago.")
        #        j=j+1
        # end of j loop

        i=i+1



print("\n\n Read "+ str(i)+ "rows. ")
print("  - The LAST ITEM:")
j=0
tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
print("EDT tstrHHMM=",tstrHHMM)
print("\n\nToday's Trades Extracted today", dstr,": dataToday[][] at time=",tstrHHMM) 
for row in dataToday:
    if(j<MAX_Elements):  ## ie last rowstr[]=''
        rowstr = row[j]
        diffTime = 1000 #int(rowstr[1]) - tstrHHMM
        print(j,": ",rowstr)
        if(j==1):
            diffTime = int(tstrHHMM) - int(rowstr) 
            print("tstrHHMM - row[1]=", tstrHHMM, " - " ,rowstr, ", ",diffTime,"hrs ago* MAth NOT Correct for time -.")
        j=j+1


print("\nEND OF Trade Injest.")

print("\n\n")


payload = {'data': data_to_sendLast }
response = requests.post(url, data=payload)
print(response.text)

print("\n\n")


# POST the last line to the PHP script
url = 'https://algoinvestorr.com/trades/recpost.php'
tgt = "intradaytrades"+dstr+".txt"
print("Called & POSTed "+str(data_lines_to_send)+ " lines (Trades) to: ",url, "----> ", tgt)

print("\n\n")
print("\n\n")
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
##
############################ working _POST to use w/ recpost.php
