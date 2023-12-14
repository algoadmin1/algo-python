# sendpost.py sample py => php sender

import requests

# String data to be sent
data_to_send = "a,b,c,d,34,554,1.2,g,h,i,j"

# URL to send POST request
url = 'https://algoinvestorr.com/trades/recpost.php'

# Define data to be sent as a dictionary
payload = {'data': data_to_send}

# Send POST request
response = requests.post(url, data=payload)

# Print response from the server
print(response.text)
