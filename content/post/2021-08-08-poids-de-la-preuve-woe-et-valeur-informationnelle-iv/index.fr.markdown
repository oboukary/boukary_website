---
title: Poids de la preuve(WOE) et valeur informationnelle(IV) dans les modèles de 
       regression logistique
author: Boukary Ouedraogo
date: '2021-04-28'
slug: poids-de-la-preuve-woe-et-valeur-informationnelle-iv
categories:
  - SAS
  - Python
  - R
tags:
  - Regression logistique
subtitle: ''
summary: ''
authors: []
lastmod: '2021-08-08T18:21:27+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
draft: true
---
## Introduction
Dans ce article, nous allons aborder les concepts de **poids de la preuve** ou **weight of evidence(WOE)** en anglais et de **valeur informationnelle** ou **information value(IV)** en anglais. Nous allons également voir comment de manière pratique ces deux concepts peuvent être implémenter dans les langages **Python**, **R** et **SAS**.

Les concepts de weight of **evidence(WOE)** et de valeur **information value(IV)** sont deux techniques de création de variables utilisées dans les problème de classification binaire avec la regression logistique. Ils sont largement utilisés dans le domaine du risque de crédit pour modéliser la probalilité de défaut des clients.
Ils sont utilisés pour explorer, transformer et selectionner les variables pertinentes qui permettent de bien modéliser le problème de cassification binaire étudié. Bien que prépondérants dans l'univers du risque de crédit, ils restent utiles et intéressants dans n'importe quel problème de classification binaire où la regression logistique est utilisée.C'est le cas des projets d'analyse marketing tels que la modélisation de l'attrition des clients ou churn en anglais.

## Qu'est ce que le poids de la preuve?
Le poids de la preuve indique le pouvoir prédictif d'une variable explicative par rapport à la variable dépendante ou variable cible. IL peut être décrit comme une mesure de séparation des observations ayant l'événement d'intérêt de ceux n'ayant pas subit l'événement. Par exemple dans le cas du risque de crédit, il peut être vu comme une mesure de séparation entre les bons clients et les mauvais client.

$$ WOE = ln\left(\frac{\\%\ événements}{\\%\ non-événements}\right)$$
