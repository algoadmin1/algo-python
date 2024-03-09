import requests

# class TryCatch():

#     def trycatch1:

url = "your_api_endpoint"
data_to_send_last_master = {"key": "value"}

# Wrap the request in a try-except block
try:
    payload = {'data': data_to_send_last_master}
    response = requests.post(url, data=payload)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        print("Request successful")
        print(response.text)
    else:
        print(f"Request failed with status code: {response.status_code}")

except Exception as e:
    print(f"An error occurred: {str(e)}")
