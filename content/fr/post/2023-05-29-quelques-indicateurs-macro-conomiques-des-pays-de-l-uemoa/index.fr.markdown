---
title: Quelques indicateurs macroéconomiques des pays de l'UEMOA
author: Boukary Ouedraogo
date: '2023-05-29'
slug: []
categories:
  - Economie
tags:
  - Macroéconomie
subtitle: ''
summary: ''
authors: []
lastmod: '2023-05-29T22:08:43+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
---
<meta charset="utf-8">

## Les indicateurs de la banque mondiale
La Banque mondiale a été créée en 1944 avec pour objectif de contribuer à travers ses différents programme, à réduire la pauvreté dans le monde. Elle comprend cinq agences et presque tous les pays en sont membres. L'une de ses fonctions est de suivre le développement économique de nombreux pays. Les indicateurs de développement de la banque mondiale ou "world development indicators (WDI)" sont une collection de données pour différents pays sur une période aussi longue que possible. Ces indicateurs sont accessibles en ligne sur le site [world development indicators](https://databank.worldbank.org/source/world-development-indicators).


## Le package WDI

Le paquet `WDI` permet de rechercher et de télécharger des données à partir de plus de 40 ensembles de données hébergés par la Banque mondiale, y compris les indicateurs du développement ("WDI"), les statistiques de la dette internationale, le climat des affaires ("Doing Business"), l'indice du capital humain etc.


```r
library(WDI)
library(dplyr)
library(ggplot2)
library(tidyquant)
```


### Rechercher des indicateurs à partir d'un mot clé.
La fonction `WDIsearch` permet de rechercher les informations sur un ou plusieurs indicateurs à partir d'un mot clé. Par exemple ici, nous allons afficher la liste de 10 indicateurs correspondant au mot-clé `gdp`.  


```r
indicateurs_gdp <- WDIsearch('gdp')
print(indicateurs_gdp[1:10,])
```

```
##                 indicator                                                 name
## 712        5.51.01.10.gdp                                Per capita GDP growth
## 714       6.0.GDP_current                                      GDP (current $)
## 715        6.0.GDP_growth                                GDP growth (annual %)
## 716           6.0.GDP_usd                                GDP (constant 2005 $)
## 717    6.0.GDPpc_constant GDP per capita, PPP (constant 2011 international $) 
## 1557    BG.GSR.NFSV.GD.ZS                         Trade in services (% of GDP)
## 1558 BG.KAC.FNEI.GD.PP.ZS          Gross private capital flows (% of GDP, PPP)
## 1559    BG.KAC.FNEI.GD.ZS               Gross private capital flows (% of GDP)
## 1560 BG.KLT.DINV.GD.PP.ZS      Gross foreign direct investment (% of GDP, PPP)
## 1561    BG.KLT.DINV.GD.ZS           Gross foreign direct investment (% of GDP)
```
On peut également utiliser des expressions régulières avec la fonction `WDIsearch` pour affiner notre recherche.  Par exemple ici on cherche tous les indicateurs contenant le `gdp` mais pas que. On veut uniquement le `gdp per capita` en dollars `constant`.

```r
WDIsearch('gdp.*capita.*constant')
```

```
##                  indicator                                                 name
## 717     6.0.GDPpc_constant GDP per capita, PPP (constant 2011 international $) 
## 11431       NY.GDP.PCAP.KD                   GDP per capita (constant 2015 US$)
## 11433       NY.GDP.PCAP.KN                        GDP per capita (constant LCU)
## 11435    NY.GDP.PCAP.PP.KD  GDP per capita, PPP (constant 2017 international $)
## 11436 NY.GDP.PCAP.PP.KD.87  GDP per capita, PPP (constant 1987 international $)
```

### Télécharger les donner avec la fonction `WDI`
Pour télécharger les données on fait appelle à la fonction `WDI` du package de même nom en passant à la fonction les arguments suivants:

- **indicator**: Le code de l'indicateur. Par exemple `NY.GDP.PCAP.KD` pour le PIB par habitant ou PIB per capita.
- **country**: Un code ou une liste de codes de pays pour lesquels on souhaite télécharger les données. Il s'agit ici du code de désignation de la norme ISO sur deux caractères alphanumériques.  Vous pouvez trouver la liste des pays et leurs codes iso [ici](https://www.atlas-monde.net/codes-iso/).</br>
Par exemple `'BF'` pour le Burkina Faso ou `c('BF', 'CI')` pour le Burkina Faso et la Côte d'Ivoire.
- **start**: La date de début de la série. Cette date peut être en `annee` en `trimestre` ou en `mois` selon la série. Pour une date en `mois` la valeur de l'argument **start** est sous la forme `2022M01` pour janvier 2022 par exemple.
- **end**: La date de fin de la série.

### Exemple d'application avec le PIB per capita des pays de l'UEMOA.

L'UEMOA est zone monétaire constitué de 8 pays de l'Afrique de l'Ouest qui partage en commum une monnaie appelée `Franc de la Communauté Financière Afrique (Franc CFA)`. La banque centrale des Etats de l'Afrique de l'Ouest (BCEAO) est l'autorité qui gère cette monnaie. Nous allons télécharger les données sur le PIB par habitant de ces 8 pays et les visualiser graphiquement.


```r
gdp_uemoa<- WDI(indicator="NY.GDP.PCAP.KD", 
                country = c("BJ","BF","CI","GW","ML","NE","SN","TG"), 
                start=1990, 
                end=2021)
gdp_uemoa <- gdp_uemoa |>
  rename(gdp_per_capita=NY.GDP.PCAP.KD)
head(gdp_uemoa)
```

```
##   country iso2c iso3c year gdp_per_capita
## 1   Benin    BJ   BEN 2021       1214.078
## 2   Benin    BJ   BEN 2020       1164.706
## 3   Benin    BJ   BEN 2019       1153.726
## 4   Benin    BJ   BEN 2018       1111.227
## 5   Benin    BJ   BEN 2017       1072.362
## 6   Benin    BJ   BEN 2016       1045.151
```

```r
p <- ggplot(data=gdp_uemoa) + 
  geom_line( aes( x=year,y=gdp_per_capita, colour=country)) +
  facet_wrap(~country, ncol = 2, scale = "free") +
  scale_color_tq() +
  theme_tq() +
  theme(legend.position="none",
        strip.text  = element_text(size = 12),
        axis.title = element_text(size=12),
        axis.title.x = element_text(margin =)
        ) + 
  labs(title = "", x = "Année", y = "GDP per Capita") 
p
```

<img src="{{< blogdown/postref >}}index.fr_files/figure-html/unnamed-chunk-5-1.png" width="960" />

Sans suprise, la Côte d'Ivoire est le PIB par habitant de la Côte d'Ivoire est le plus élevé de l'UEMOA. C'est le pays le plus riche de cette zone économique et monétaire. On remarque que le PIB par habitant a baissé entre la fin des années 90 et 2010. Cette période coïncide avec la crise socio-politique qu'a connu le pays.
Depuis 2010, profitant de la stabilité politique, le pays a renoué avec la croissance et le développement.

