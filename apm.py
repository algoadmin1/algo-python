#
#    apm.py -  Automated Portfolio Manager by John Botti Jan 2024
#
#
#
from portfolio import Portfolio

#
#  apm should use (1) alphavantage to get HLC for last month, 
#
#  apm should use  udates for upcoming earnings for trading strategies, for example:
#       
#       EARNINGS_RUNUP_DEBIT_CALL_SPREAD,
#       EARNINGS_RUNUP_DEBIT_PUT_SPREAD,
#       BUY_WRITE_WHEEL,
#

    #             def __init__(self, name, accountnumber, pwd, broker, apikey):

portfolio1 = Portfolio("JB", "roguequant1@gmail.com", "354" "Crixus2011", "Robinhood", "E3F266FC2A10034D")

portfolio1.initialize()

portfolio1.authenticate()

portfolio1.getPositions()

portfolio1.print()

