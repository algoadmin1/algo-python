#// pivots.py
study("Algoz.ai Pivots", overlay=true)

tf = timeframe.isintraday ? "D" : timeframe.isdaily ? "W" : timeframe.isweekly ? "M" : ""


d_high   = security(syminfo.tickerid, tf,  high[1], barmerge.gaps_off, barmerge.lookahead_on  )
d_low    = security(syminfo.tickerid, tf,   low[1], barmerge.gaps_off, barmerge.lookahead_on  )
d_close  = security(syminfo.tickerid, tf, close[1], barmerge.gaps_off, barmerge.lookahead_on  )
Pivot    = (d_high+d_low+d_close)/3

# close of the previous day
# prev_high = request.security(syminfo.tickerid, "D", high[1], lookahead=true)
# prev_low = request.security(syminfo.tickerid, "D", low[1], lookahead=true)
# prev_close = request.security(syminfo.tickerid, "D", close[1], lookahead=true)


d_high2   = security(syminfo.tickerid, tf,  high[2], barmerge.gaps_off, barmerge.lookahead_on  )
d_low2    = security(syminfo.tickerid, tf,   low[2], barmerge.gaps_off, barmerge.lookahead_on  )
d_close2  = security(syminfo.tickerid, tf, close[2]], barmerge.gaps_off, barmerge.lookahead_on  )
p_2       = (d_high2+d_low2+d_close2)/3

d_high3   = security(syminfo.tickerid, tf,  high[3], barmerge.gaps_off, barmerge.lookahead_on  )
d_low3    = security(syminfo.tickerid, tf,   low[3], barmerge.gaps_off, barmerge.lookahead_on  )
d_close3  = security(syminfo.tickerid, tf, close[3], barmerge.gaps_off, barmerge.lookahead_on  )
p_3       = (d_high3+d_low3+d_close3)/3

d_high4   = security(syminfo.tickerid, tf,  high[4], barmerge.gaps_off, barmerge.lookahead_on  )
d_low4    = security(syminfo.tickerid, tf,   low[4], barmerge.gaps_off, barmerge.lookahead_on  )
d_close4  = security(syminfo.tickerid, tf, close[4], barmerge.gaps_off, barmerge.lookahead_on  )
p_4       = (d_high4+d_low4+d_close4)/3

Pivot3    = ( p_2 + p_3 + p_4 )/3

colP      =color.blue
colP3     =color.yellow

plot(Pivot, title="p", color=colP )
#//  plot(Pivot3, title="p3", color=colP3 )
