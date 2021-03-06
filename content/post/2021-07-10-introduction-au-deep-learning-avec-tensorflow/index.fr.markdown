---
title: Introduction au deep learning avec Tensorflow
author: Boukary Ouedraogo
date: '2021-07-10'
slug: introduction-au-deep-learning-avec-tensorflow
categories:
  - IA
tags:
  - Deep Learning
subtitle: ''
summary: ''
authors: []
lastmod: '2021-07-10T12:25:31+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
draft: true
---
## Bref introduction
Le deep learning ou apprentissage profond en français, est un sous-ensemble **du machine learning**(apprentissage automatique en Français) qui utilise des réseaux de neurones artificiels pour apprendre à extraire des patternes dans un jeu de données. Le deep learning est particulièrement puissant dans le domaine du traitement d'images, de la vision par ordinateur(computeur vision) et du traitement automatique du langage naturel(natural language processing).
Si la théorie sous-jacente au deep learning date de très longtemps(depuis les travaux de Allan Turing dans les années 1950), son utilisation pratique par la grande masse est récente. Cette popularisation a été rendue possible grace au progrès dans le domaine de l'informatique et l'augmentation de la capacité de calcul des ordinateurs.
Aussi, les géants du numériques tels que Google, Facebook, Microsoft,... ont contribué à rendre accessible le deep learning grâce notamment à leur frameworks open-source dédiés à son implémentation. 

Tensorflow est l'un des framework les plus utilisés pour la mise en oeuvre des algorithmes de deep-learning au côté de pytorch et Caffe. Développé par google pour son propre usage, tensorflow a été mis à la disposition du grand public à partir de 2015. 

## Un exemple d'algorithme de deep learning
```python
import tensorflow as tf
from tensorflow.keras.datasets import fashion_mnist
train_data, test_data, train_target, test_target = fashion_mnist.load_data()
train_data, test_data = train_data/255.0, test_data/255.0 

model = tf.keras.Sequential([
                            tf.keras.layers.Flatten(input_shape = (28, 28)),
                            tf.keras.layers.Dense(units = 128, activation = "relu"),
                            tf.keras.layers.Dense(units = 64, activation = "relu"),
                            tf.keras.layers.Dense(units = 10, activation = "softmax")
                            ]
                            )
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits = True)                            
model.compile(loss = loss_fn, optimizers = "adam", metrics = ["accuracy"])

model.fit(train_data, train_target, epochs = 5)
```






