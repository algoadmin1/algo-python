# usage:
#   from portfolio import Portfolio
#
#
#
class Portfolio:
    def __init__(self, name, accountnumber, pwd, broker, apikey):
        self.name = name
        self.accountnumber = accountnumber
        self.pwd = pwd
        self.broker = broker
        self.apikey = apikey

    def initialize(self):
        print("Portfolio.initialize() called...")

    def print(self):
        print("Portfolio.print() called...")
        print("    name, #, pwd, broker, apikey==" )
        print(self.name, self.accountnumber, self.pwd, self.broker, self.apikey)

    def authenticate(self):
        print("Portfolio.authenticate() called...")

    def getAssets(self):
        print("Portfolio.getAssets() called...")
    
    def sendTrade(self):
        print("Portfolio.sendTrade() called...")
    
        
