# CRON.py
import time  # For adding delays in the loop
import requests  # For making HTTP requests

# Define the URL to be called
stringUrl = "https://algoz.ai/cronit/cronjob.php&loop=0"

# Define the number of seconds to wait between calls
numSeconds = 30

# Number of iterations (set to a specific number or use an infinite loop)
maxLoops = 10  # You can change this to any number, or set it to float('inf') for infinite loops

# Loop to call the URL
for i in range(maxLoops):
    try:
        # Make the HTTP GET request
        response = requests.get(stringUrl)

        # Print the status code and response content for logging
        print(f"Iteration {i + 1}:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except requests.RequestException as e:
        # Handle any exceptions during the HTTP request
        print(f"Iteration {i + 1}: Error occurred - {e}")

    # Wait for the specified number of seconds before the next iteration
    if i < maxLoops - 1:  # Avoid waiting after the last iteration
        time.sleep(numSeconds)
