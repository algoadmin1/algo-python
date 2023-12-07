# roi.py
# Copyright (c) 2022-2024 by Algo Investor Inc.  All Rights Reserved
# created by john botti 2023-11-26
# updated by will botti 2023-12-06

import random

AcctStart = float(100000.0)
AcctCurr  = AcctStart
AcctMax   = AcctStart
AcctGainMaxPct = 700.0
AcctGainMaxPct_default = AcctGainMaxPct

PctStopLossPerTrade = 0.25
PctGainMin       = 0.05
PctGainMax       = 0.40

PctStopLossPerTrade100 = 25
PctStopLossPerTradeMin100 = 10
PctStopLossPerTradeMax100 = 25

PctGainMin100    = 5
PctGainMax100    = 30

RandomPctGain    = 0

WinPct           = 65
RandomPct        = 0

TradeCount       = 1
TradeMax         = 1000  
GainLoss         = 0

txt = "defined"

# rnd 1..9
# print(random.randrange(1,10))

# price = 49
# txt = "The price is {:.2f} dollars"
# print(txt.format(price))
# output = The price is 49.00 dollars

# print("Enter # of Max Trades:")
# mt = input()
# TradeMax = int(mt) +1

print("\n $$$ Welcome to the AlgoInvestor Monte Carlo ROI Simulation $$$")

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

# Win Percent
wpct_default = 65
print("\nEnter Win % (", wpct_default , ")")
wpct = input()
if wpct == "":
    print(" Defaulting Win % to ", wpct_default)
    wpct = wpct_default

WinPct = int(wpct)

# Max Dollar Loss
MaxDollarLoss = AcctStart / 2;
print("\nEnter Maximum Loss Allowed $ (", MaxDollarLoss, "): ")
MaxDL = input()
if MaxDL == "":
    print("  Defaulting Max Loss to ", MaxDollarLoss)
    MaxDL = MaxDollarLoss

MaxDollarLoss = int(MaxDL)

# Max Gain Percent
print("\nEnter Maximum Percent Gain % (", AcctGainMaxPct_default, "): ")
MaxGainPct = input()
if MaxGainPct == "":
    print("  Defaulting Max Gain % to ", AcctGainMaxPct_default)
    MaxGainPct = AcctGainMaxPct_default

AcctGainMaxPct = float(MaxGainPct)


print("\nMax # Trades: " , TradeMax, "    Max Gain Percentage: ", AcctGainMaxPct,"%")
print("    Win Percentage: ", WinPct,"%")
print("Gain Percent Range: ", PctGainMin100, PctGainMax100, "%")
print("Loss Percent Range: ", PctStopLossPerTradeMin100, PctStopLossPerTradeMax100, "%")


# START LOOP
print("\n ****************** ROI SIM START *********************** \n")

while TradeCount < TradeMax:

    RandomPct     = random.randrange(0,100)
    RandomPctGain = random.randrange(PctGainMin100,PctGainMax100)
 
    RandomPctLoss = random.randrange(PctStopLossPerTradeMin100,PctStopLossPerTradeMax100)
 
    # print("Current Account _PRE TRADE = $",AcctCurr)
    # print(RandomPct)
    txt = "Account PRE-Trade  = ${:.2f}"
    print(txt.format(AcctCurr, ','))
    #print(txt.format(AcctCurr)   )

    # TODO:  format gain / loss

    if RandomPct > WinPct:
        # LOSS
        GainLoss = -1
        dollars = AcctCurr * (float(RandomPctLoss) / 100.0)
        AcctCurr *= float(1.0 - float(RandomPctLoss) / 100.0)
        prefix = "\tTrade # " + str(TradeCount) + ":   LOSS, rnd# = " + str(RandomPct) + " Loss = " + str(RandomPctLoss) + "%,    "
        txt = "\t< ${:.2f} >"
        print(prefix , txt.format(dollars, ','))

    else:
        # GAIN
        GainLoss = 1
        dollars = AcctCurr * (float(RandomPctGain) / 100.0)
        AcctCurr *= float(1.0 + float(RandomPctGain) / 100.0) 
        prefix = "\tTrade #" + str(TradeCount) + ":   WIN!, rnd# = " + str(RandomPct) + " Gain = " + str(RandomPctGain) + "%,    "
        txt = "\t  ${:.2f}"
        print(prefix , txt.format(dollars, ','))

    # print("Current Account POST TRADE = $",AcctCurr)
    txt = "Account POST trade = ${:.2f}"
    print(txt.format(AcctCurr, ','))
 
    if AcctCurr > AcctMax:
        AcctMax = AcctCurr
        txt = "\n NEW Account High !  ${:.2f} "
        print(txt.format(AcctMax, ','))

    if AcctMax > (float(AcctGainMaxPct)*0.01*AcctStart):
        TradeCount = TradeMax
        txt = " !!! You MAXED your Gains. Your Account = ${:.2f}"
        print(txt.format(AcctCurr, ',')) 
        #print(" !!! You MAXED your Gains. Your Account = $",AcctCurr) 

    if (AcctMax-AcctCurr) >= float(MaxDollarLoss):
        # we hit our Max Allowed Loss - decide if we won or lost $   
        if(AcctCurr < AcctStart):
            prefix = " * You crapped out at Trade # " + str(TradeCount)
            txt = "and lost < ${:.2f} >"
            diff = AcctStart - AcctCurr
            print(prefix, txt.format(diff, ','))
            print(" * NO MORE TRADING; PICK A BETTER ALGO *\n") 
        else:
            # we won $ but we stopped out from our Max
            prefix = "* You stopped out at Trade # " + str(TradeCount)
            txt = " winning ${:.2f} "
            diff = AcctCurr - AcctStart
            print(prefix, txt.format(diff, ','))
            print(" * ALGO INVESTOR IS PROTECTING YOUR PROFITS *") 

        TradeCount = TradeMax

    TradeCount+=1
    print(" ")

# END LOOP

print(" >>>>>>>>>>>>>>>>> ROI SIM END <<<<<<<<<<<<<<<<<<<<<< \n")



# END OF PRG

# x = int(1)   # x will be 1
# y = int(2.8) # y will be 2
# z = int("3") # z will be 3
# x = str("s1") # x will be 's1'
# y = str(2)    # y will be '2'
# z = str(3.0)  # z will be '3.0'
# x = float(1)     # x will be 1.0
# y = float(2.8)   # y will be 2.8
# z = float("3")   # z will be 3.0
# w = float("4.2") # w will be 4.2

# a = 200 
# b = 33
# if b > a:
#   print("b is greater than a")
# elif a == b:
#  print("a and b are equal")
# else:
#   print("a is greater than b")

# i = 1
# while i < 6:
#   print(i)
#   i += 1

# thisdict = {
#   "brand": "Ford",
#   "model": "Mustang",
#   "year": 1964
# }
# thisdict.update({"color": "red"})
# 
# print(thisdict)

# print("The title of the article is, How to print in the same line")
# print("The author of this article is: Dev Kumar")
# print("Title of the article is, How to print in the same line", end = " ")
# print("The author of this article is: Dev Kumar")
# print("Title of the article is, How to print in same line", end = "\n\n\n")
# print("The author of this article is: Dev Kumar")
