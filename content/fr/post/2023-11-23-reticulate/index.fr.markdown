---
title: Prévision des cours boursiers avec les modèles ARIMA sous python
author: Boukary Ouedraogo
date: '2023-11-23'
slug: []
categories: []
tags: []
subtitle: ''
summary: ''
authors: []
lastmod: '2023-11-23T23:34:42+01:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
draft: true
---






```python
import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf
import numpy as np
import pandas as pd
import datetime as dt
import yfinance as yf
import matplotlib.pyplot as plt

years = 15

endDate = dt.datetime.now()
startDate = endDate - dt.timedelta(days=365*years)

tickers = ['SPY', 'BND', 'GLD', 'QQQ', 'VTI']

adj_close_df = pd.DataFrame()
for ticker in tickers:
    data = yf.download(ticker, start=startDate, end=endDate)
    adj_close_df[ticker] = data['Adj Close']
```

```
## 
[*********************100%%**********************]  1 of 1 completed
## 
[*********************100%%**********************]  1 of 1 completed
## 
[*********************100%%**********************]  1 of 1 completed
## 
[*********************100%%**********************]  1 of 1 completed
## 
[*********************100%%**********************]  1 of 1 completed
```

```python
print(adj_close_df)
```

```
##                    SPY        BND         GLD         QQQ         VTI
## Date                                                                 
## 2008-11-28   67.422630  48.992603   80.309998   25.472933   33.385235
## 2008-12-01   61.450481  49.282402   75.650002   23.557213   30.400923
## 2008-12-02   63.815407  49.581356   76.949997   24.344492   31.599154
## 2008-12-03   65.349609  49.347404   76.180000   25.035551   32.413063
## 2008-12-04   63.837864  49.561832   75.500000   24.326990   31.448465
## ...                ...        ...         ...         ...         ...
## 2023-11-17  450.790009  70.639999  183.669998  386.040009  223.110001
## 2023-11-20  454.260010  70.739998  183.369995  390.739990  224.789993
## 2023-11-21  453.269989  70.839996  185.350006  388.470001  224.179993
## 2023-11-22  455.019989  70.900002  184.559998  390.059998  225.139999
## 2023-11-24  455.299988  70.559998  185.520004  389.510010  225.380005
## 
## [3773 rows x 5 columns]
```

```python
log_returns = np.log(adj_close_df / adj_close_df.shift(1))
log_returns = log_returns.dropna()
print(log_returns)
```

```
##                  SPY       BND       GLD       QQQ       VTI
## Date                                                        
## 2008-12-01 -0.092749  0.005898 -0.059777 -0.078184 -0.093641
## 2008-12-02  0.037763  0.006048  0.017038  0.032874  0.038657
## 2008-12-03  0.023757 -0.004730 -0.010057  0.027991  0.025431
## 2008-12-04 -0.023405  0.004336 -0.008966 -0.028710 -0.030211
## 2008-12-05  0.030366 -0.007370 -0.013065  0.039829  0.034851
## ...              ...       ...       ...       ...       ...
## 2023-11-17  0.001243  0.001417 -0.000109  0.000233  0.002513
## 2023-11-20  0.007668  0.001415 -0.001635  0.012101  0.007502
## 2023-11-21 -0.002182  0.001413  0.010740 -0.005826 -0.002717
## 2023-11-22  0.003853  0.000847 -0.004271  0.004085  0.004273
## 2023-11-24  0.000615 -0.004807  0.005188 -0.001411  0.001065
## 
## [3772 rows x 5 columns]
```

```python
portfolio_value = 1000000
weights = np.array([1/len(tickers)]*len(tickers))
print(weights)
```

```
## [0.2 0.2 0.2 0.2 0.2]
```

```python
historical_returns = (log_returns * weights).sum(axis =1)
print(historical_returns)
```

```
## Date
## 2008-12-01   -0.063691
## 2008-12-02    0.026476
## 2008-12-03    0.012479
## 2008-12-04   -0.017391
## 2008-12-05    0.016922
##                 ...   
## 2023-11-17    0.001059
## 2023-11-20    0.005410
## 2023-11-21    0.000285
## 2023-11-22    0.001757
## 2023-11-24    0.000130
## Length: 3772, dtype: float64
```

```python
days = 50

range_returns = historical_returns.rolling(window = days).sum()
range_returns = range_returns.dropna()
print(range_returns)
```

```
## Date
## 2009-02-11    0.017958
## 2009-02-12    0.086137
## 2009-02-13    0.052286
## 2009-02-17    0.021598
## 2009-02-18    0.040246
##                 ...   
## 2023-11-17    0.019005
## 2023-11-20    0.019450
## 2023-11-21    0.024930
## 2023-11-22    0.025819
## 2023-11-24    0.021134
## Length: 3723, dtype: float64
```

```python
confidence_interval = 0.99

VaR = -np.percentile(range_returns, 100 - (confidence_interval * 100))*portfolio_value
print(VaR)
```

```
## 110977.02676160404
```

```python
return_window = days
range_returns = historical_returns.rolling(window=return_window).sum()
range_returns = range_returns.dropna()

range_returns_dollar = range_returns * portfolio_value

plt.hist(range_returns_dollar.dropna(), bins=50, density=True)
plt.xlabel(f'{return_window}-Day Portfolio Return (Dollar Value)')
plt.ylabel('Frequency')
plt.title(f'Distribution of Portfolio {return_window}-Day Returns (Dollar Value)')
plt.axvline(-VaR, color='r', linestyle='dashed', linewidth=2, label=f'VaR at {confidence_interval:.0%} confidence level')
plt.legend()
plt.show()
```

<img src="{{< blogdown/postref >}}index.fr_files/figure-html/unnamed-chunk-2-1.png" width="614" />

