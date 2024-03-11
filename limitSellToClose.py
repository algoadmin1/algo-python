# Price Calculator: Limit Sell To Close (c) 2024 by Level Blest, LLC
# This can be generalized, but for now we are specifically focusing on closing long options positions.
# Perfect for the 'Thursday afternoon RogueQuant Special Snipe setup" - where we go long an options contract one week out,
# but are looking to close the next morning if price moves favorably
# This calculator also accounts for an after-hours price move, which is common on volatile stocks like SMCI

import tkinter as tk
from datetime import datetime, timedelta
from math import exp, log, sqrt

def calculate_option_price(ticker, option_type, strike_price, expiration_date, buy_price, theta, last_bid, last_ask, after_hours_change):
    # Black-Scholes Formula
    S = after_hours_change if after_hours_change else buy_price  # Stock price
    K = strike_price  # Strike price
    T = (expiration_date - datetime.now()).days / 365.0  # Time to expiration in years
    r = 0.02  # Risk-free interest rate (adjust as needed)
    sigma = 0.2  # Volatility of the underlying stock (adjust as needed)

    d1 = (log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * sqrt(T))
    d2 = d1 - sigma * sqrt(T)

    if option_type.lower() == 'call':
        option_price = S * exp(-theta * T) * N(d1) - K * exp(-r * T) * N(d2)
    elif option_type.lower() == 'put':
        option_price = K * exp(-r * T) * N(-d2) - S * exp(-theta * T) * N(-d1)
    else:
        raise ValueError("Invalid option type. Use 'call' or 'put'.")

    return option_price

def N(x):
    # Standard normal cumulative distribution function
    from scipy.stats import norm
    return norm.cdf(x)

def calculate_and_display():
    try:
        ticker = ticker_entry.get()
        option_type = option_type_var.get()
        strike_price = float(strike_price_entry.get())
        expiration_date = datetime.strptime(expiration_date_entry.get(), "%Y-%m-%d")
        buy_price = float(buy_price_entry.get())
        theta = float(theta_entry.get())
        last_bid = float(last_bid_entry.get())
        last_ask = float(last_ask_entry.get())
        after_hours_change = float(after_hours_change_entry.get())

        option_price = calculate_option_price(ticker, option_type, strike_price, expiration_date, buy_price, theta, last_bid, last_ask, after_hours_change)

        result_label.config(text=f"Estimated Option Price: {option_price:.2f} USD")
    except ValueError as e:
        result_label.config(text=f"Error: {e}")

# GUI Setup
app = tk.Tk()
app.title("Option Price Calculator")

# GUI Components
ticker_label = tk.Label(app, text="Ticker:")
ticker_entry = tk.Entry(app)

option_type_label = tk.Label(app, text="Option Type:")
option_type_var = tk.StringVar(value="Call")
option_type_menu = tk.OptionMenu(app, option_type_var, "Call", "Put")

strike_price_label = tk.Label(app, text="Strike Price:")
strike_price_entry = tk.Entry(app)

expiration_date_label = tk.Label(app, text="Expiration Date (YYYY-MM-DD):")
expiration_date_entry = tk.Entry(app)

buy_price_label = tk.Label(app, text="Buy Price:")
buy_price_entry = tk.Entry(app)

theta_label = tk.Label(app, text="Theta:")
theta_entry = tk.Entry(app)

last_bid_label = tk.Label(app, text="Last Bid:")
last_bid_entry = tk.Entry(app)

last_ask_label = tk.Label(app, text="Last Ask:")
last_ask_entry = tk.Entry(app)

after_hours_change_label = tk.Label(app, text="After-hours Price Change:")
after_hours_change_entry = tk.Entry(app)

calculate_button = tk.Button(app, text="Calculate", command=calculate_and_display)

result_label = tk.Label(app, text="Estimated Option Price:")

# Layout
ticker_label.grid(row=0, column=0)
ticker_entry.grid(row=0, column=1)

option_type_label.grid(row=1, column=0)
option_type_menu.grid(row=1, column=1)

strike_price_label.grid(row=2, column=0)
strike_price_entry.grid(row=2, column=1)

expiration_date_label.grid(row=3, column=0)
expiration_date_entry.grid(row=3, column=1)

buy_price_label.grid(row=4, column=0)
buy_price_entry.grid(row=4, column=1)

theta_label.grid(row=5, column=0)
theta_entry.grid(row=5, column=1)

last_bid_label.grid(row=6, column=0)
last_bid_entry.grid(row=6, column=1)

last_ask_label.grid(row=7, column=0)
last_ask_entry.grid(row=7, column=1)

after_hours_change_label.grid(row=8, column=0)
after_hours_change_entry.grid(row=8, column=1)

calculate_button.grid(row=9, column=0, columnspan=2)

result_label.grid(row=10, column=0, columnspan=2)

app.mainloop()


