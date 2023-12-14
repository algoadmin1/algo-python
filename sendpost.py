# sendpost.py sample py => php sender

import requests

# String data to be sent
#data_to_send = "a,b,c,d,34,554,1.2,g,h,i,j"
data_to_send = "2023-12-13,1145,wed,15min,intraday,sell,100,AMGN,atLimit,275.43,P3day,sellsigcnt,7,R3R2R1_P_P3_S1S2S3=,281.24,278.82,276.41,274.83,271.06,272.42,270.84,268.43,p3-R1=,-0.97,wkR2R1S1S2=,276.50,272.78,265.98,262.90,"

# URL to send POST request
url = 'https://algoinvestorr.com/trades/recpost.php'

# Define data to be sent as a dictionary
payload = {'data': data_to_send}

# Send POST request
response = requests.post(url, data=payload)

# Print response from the server
print(response.text)
