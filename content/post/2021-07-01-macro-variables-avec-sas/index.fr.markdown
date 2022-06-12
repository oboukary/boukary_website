---
title: Macro variables avec SAS
author: Boukary Ouedraogo
date: '2021-07-01'
slug: macro-variables-avec-sas
categories:
  - SAS
tags:
  - programmation
  - macro-variables
subtitle: ''
summary: ''
authors: []
lastmod: '2021-07-01T23:37:20+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
output:
  blogdown::html_page:
    toc: true
editor_options: 
  markdown: 
    wrap: 72
---

## Qu'est ce qu'une macro-variable ?

Les macro-variables dans **SAS** permettent de stocker et de substituer
du texte dans un programme SAS. Ils facilitent ainsi la programmation en
évitant la répétition du code et le copier-coller. Ils facilent aussi la
maintenance des programmes SAS ainsi que la lecture. Il existe trois
façons de créer des macro-variables dans un programme SAS:
<ol classe="list_ord"> <li> Dans un code ouvert avec l'instruction
<strong>%let </strong></li> <li> Avec la routine <strong>call symputx
</strong></li> <li> Dans une procédure <strong>PROC SQL </strong> </li>
</ol>

## Exemples

### Macro-variables à partir d'une rêquete SQL.

La variabe **make** de la table **cars** présente dans la library
**sashelp** de SAS contient enregistre différentes marques de voitures.
Supposons que l'on souhaite créer une table pour chaque marque de
voiture à partir de la table **cars**. Supposons en outre que la table
**cars** est mise à jour régulièrement et que de nouvelles marques
s'ajoutent souvent lors de ces mises à jour. Si l'on veut pouvoir créer
des sous-tables pour chaque marque à partir des informations de la table
**sashelp.cars**, on peut créer une liste de macro-variables qui prend
pour valeurs, les différentes marques renseignées par la variable
**make**. Pour cela on va procéder

``` sas
proc sql noprint;
  select distinct make into :cars  separated by " " from sashelp.cars;
quit;
```

L'option `noprint` évite d'afficher le résultat de la rêquete `select`.
<br> Avec la clause `select distinct`, on selectionne les valeurs
distinctes de la variable `make` à savoir les différentes marques. La
clause `into` indique à sas que l'on souhaite stocker le résultat de la
requête dans une macro-variable. Après `into` on indique le nom que l'on
souhaite donner à notre macro-variable précédé de **:** (par exemple ici
`:cars`). <br> Le `separated by` permet de mettre un séparateur entre
les différentes valeurs de la variable utilisée pour créer la
macro-variable, en occurrence ici l'espace est utilisé comme séparateur.

``` sas
%put &=cars;
```

La macro instruction `%put &=cars` permet d'afficher le résultat de
l'évaluation de la macro-variable `cars` dans le log.
![cars](/img/sas_img/macros_var/mcvar_cars.png) On voit que la
macro-variable `cars` contient les valeurs `Acura`, `Audi`, `BMW`, ...
On peut maintenant créer un petit macro-programme qui permet de
parcourir la liste des marques stockées dans la macro-variabe `cars`
pour filtrer la table `sashelp.cars` et créer ainsi des sous-tables pour
chaque marque.<br> Voilà le code de ce macro-programme:

``` sas
***********************************************************************************;
*                          MACRO PROGRAMME                                      *;
***********************************************************************************;
%macro split();
  %do i = 1 %to %sysfunc(countw(&cars));
  %local var;
  %let var = %scan(&cars,&i);
  data &var;
    set sashelp.cars;
    where make="&var";
  run;
  %end;
%mend;
```

Pour utiliser la macro-programme on procède simplement comme suit:

``` sas
%split()
```


