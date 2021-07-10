---
title: Macro Variables Avec SAS
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
---
## Qu'est ce qu'une macro-variable ?
> Les macro-variables dans **SAS** permettent de substituer du texte dans un programme SAS.
Ils facilitent ainsi la programmation en évitant la répétition du code et le copier-coller.
Ils facilent aussi la maintenance des programmes SAS ainsi que la lecture.
Il existe trois façons de créer des macro-variables dans un programme SAS:
<ol classe="list_ord">
<li> Dans un code ouvert avec l'instruction <strong>%let </strong></li>
<li> Avec la routine <strong>call symputx </strong></li>
<li> Dans une procédure <strong>PROC SQL </strong> </li>
</ol>

## Examples 
### Dans une procédure SQL

```sas
proc sql noprint;
select distinct make into :cars from sashelp.cars;
bibi.data;
quit;
/****************/
proc print data=sashelp.cars;
var test;
title 'bonjour';
run;
***********************************************************************************;
*                          MACRO PROGRAMME                                        *;
***********************************************************************************;
%macro test;
%do i=1 %to 10;
proc print data= sashelp.cars;
var make&i;
run;
%mend;
%test
```







