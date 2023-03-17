# An optional custom script to run after Hugo builds your site.
# You can delete it if you do not need it.
list.of.packages <- c("ggplot2", "Rcpp",'tidyverse','flexdashboard','blogdown','rmarkdown')
new.packages <- list.of.packages[!(list.of.packages %in% installed.packages()[,"Package"])]
if(length(new.packages)) install.packages(new.packages)