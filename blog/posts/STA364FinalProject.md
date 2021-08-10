---
title: "Customer Segmentation of Citibike Users"
author: "Steven Crouch & Ian Sulley"
---

### Executive Summary
For this project, we sought to discover different rider types within the population of bike rentals. We were looking to see if there were any identifiable patterns in the data that might relate to different ride types, such as individuals commuting to work, going for a weekend leisure ride, going shopping or going out for an evening on the town, or simply using Citibikes as a connection between other forms of mass transit. From our subject matter knowledge all of these different types of riders seemed likely to be in the dataset and identifiable within the data we had. As one example, rides that take place early in the morning going from a residential to commercial area would likely correlate to workers on their morning commute, while a late-night evening trip to a neighborhood with lots of restaurants and nightlife would most likely represent an individual going out for entertainment. However, when attempting to apply K-means clustering the vast number of station locations made the results very difficult to decipher. Using four clusters, there was no discernible difference between each start stations effect (0.000 values for every cluster). Only duration, starting hour, and user-type were registered as significantly different between clusters. Due to the fact that these three regressor variables were factors with a low number of levels, we felt that k-means clustering was not well suited for this dataset without additional information that we did not have access to, such as city planning zones to separate commercial and residential areas. For these reasons, we decided to pursue this as a classification problem, rather than as a unsupervised clustering problem.

Our initial ambitions when approaching this project was to classify different market segments in order to improve the Citibike experience of different types of customers. If we were successfully able to identify different clusters of Citibike users who use the system in a similar way or for a similar purpose, that data could be used to identify untapped segments of the population that were systematically not using the Citibike system. Additionally, if we could use the clusters to determine an individual rider's purpose for using the system, we could provide customized features and recommendations for those customers. For example, if we could cluster riders who were using the Citibike system for their morning commute to a job in the financial district, that information could be used to create new features such as priority or reserved bike parking for an added fee. Another cluster may be students going home from school, who we would want to offer more affordable alternatives. As researchers, we disagree with this type of usage but we see it as a potential use case that could easily be exploited by a company willing to do so. A more positive use case would be using this clustering to identify segments of the population that are not using the Citibike system by comparing cluster sizes. With the aggregation of additional data on public transit usage, K-means clustering could identify certain neighborhoods that have high public transportation usage and low Citibike participation rates. This could inform what neighborhoods could befit from expanded Citibike service, or where a targeted promotional discount could incentivize new riders to join the service. Unfortunately, due to the limited scope of our data, it was not possible to identify segments of the population that were not using the Citibike system. However, within the data we have clustering could still provide useful insight into who is using the system and for what purpose. For this type of analysis to be realized, additional work needs to be done to avoid “the curse of dimensionality”.

```{r}
library(tidyverse)
library(lubridate)
library(caret)
library(ROCR)
bike = read.csv('JC-201706-citibike-tripdata.csv')
bike=filter(bike, tripduration<mean(tripduration)+(3*sd(tripduration)))
bike$hour = hour(bike$starttime)
```

### Subject Matter Knowledge

We both are enthusiastic cyclists which was a primary motivation in choosing the CitiBike NYC data. We believe in the positive impact that cycling can have on human health, environmental wellbeing, and overall community betterment. Ian has first-hand experience renting CitiBikes for the day in New York City. Therefore, we had a solid understanding of this particular bike sharing system.

In short, bike sharing systems are in use across the nation in several cities. The main idea behind the system is that users can rent bikes from stations across the city, ride the bikes for the allotted time or distance, and then return the bike to any docking station in the city. For CitiBike NYC specifically, users can rent on annual memberships or day passes. From our knowledge of the CitiBike program and New York City in general, we believe that subscribers on annual memberships are likely residents that use the bikes to commute while customers on the day passes are more likely to be tourists. Our understanding of these tendencies was useful in classifying or segmenting users of the bike sharing program.

### Data Pedigree
The data are publicly available on CitiBike's website on a monthly basis. We decided to use data from the month of June in 2017. The variables in the dataset have information on start and end times, start and end stations, trip duration, the bike ID numbers, user types, birth years, and genders of users in the bike sharing program. The list below shows the complete set of variables in the dataset. (Note: For user type Customer indicates a 1-day or 3-day pass user while Subscriber indicates an annual member. For gender, 0 is unknown, 1 is male, and 2 is female.)

```{r}
str(bike)
```

The data appear to be accurate and reliable according to CitiBike's website. There is a short synopsis of their data cleaning procedures. In short, they remove any service rides from the data files. That is, when staff ride the bikes for maintenance purposes, the rides are removed from the data. Another note on the data cleaning on CitiBike's end of operations is that they remove rides under 60 seconds as well. They do this to ensure that false starts or issues re-docking bikes are not entered as negligible records.

We also performed some data cleaning on our end. We decided to remove any observations with outlier ride lengths. These were rides in excess of 3 standard deviations from the mean of trip duration. Of these rides some were several days long. After cleaning the data, the only remaining rides were no more than a single day in length. The multi-day rides would have clouded our ability to segment and/or classify different rider types.

### Plotting Data

The first plot shown below compares the trip duration of customers versus subscribers. As the box plot indicates, customers tend to take longer rides than subscribers do. The median customer ride is around 1000 seconds (about 16 minutes) while subscribers had a median ride of less than 500 seconds (about 8 minutes). The wider spread of customer rides is also worth noting. Customers had a greater range of trip duration from the 25th to the 75th quartiles compared to subscribers. We expected this kind of result based on our subject matter knowledge of the bike sharing system. The subscribers are taking shorter rides because they are likely commuting straight to work or straight back home. Bike commutes in New York City are often quite short, even shorter than most other modes of public transportation depending on the specific location. Tourists are more likely to use the bikes to get across the city or ride for leisure, explaining their longer ride times.

The second plot shows the density of ride start times by the two different user types. The information here also confirms our expectations about customers versus subscribers. As the density plot shows, customers have a peak usage time of mid-day while subscribers peak once in the morning and again at the end of the work day. This is further evidence that commuters tend to be subscribers in the CitiBike systems while tourists typically opt for the day pass.

```{r}
ggplot(bike, aes(x=usertype, y=tripduration)) + geom_boxplot() +ylim(0,3000)
ggplot(bike, aes(x=hour, color=usertype)) + geom_density()
```

```{r}
stations = bike %>% 
  group_by(start.station.name) %>%
  summarise(long=mean(start.station.longitude), lat=mean(start.station.latitude))
```

```{r}
normalize = function(x) {(x - min(x)) / (max(x) - min(x))}
dummyBike = as.data.frame(model.matrix(~ start.station.name+tripduration+hour+usertype+gender, data = bike))
dummyBike_n = as.data.frame(lapply(dummyBike, FUN=normalize))
dummyBike_n = dummyBike_n[,2:55]
set.seed(364, sample.kind="Rounding") 
#bikeclusters=kmeans(dummyBike_n, 4)
#bikeclusters$centers
```

```{r}
set.seed(364)
oursample <- sample(nrow(bike),floor(nrow(bike)*0.8))

bike$tripduration_cat = cut(bike$tripduration, breaks = c(0, 247, 379, 652, 100000000), labels = c("Shortest", "Short", "Long", "Longest"))
train <- bike[oursample,] 
test <- bike[-oursample,]
```

### Classification

One aim of the project is to successfully classify user types. That is, we would like to build a model that can distinguish between customers and subscribers based on the riding patterns in the data. We explored three different modes of classification: Naive Bayes, CART, and logistic regression. Additionally, we evaluated the classification performance of a neural network to compare to these other three methods.

Train-test splits were created for each of the classification models. The models were trained on a random sample of 80% of the data and then the model was used to classify the remaining 20% of the data. Our primary measures of classification performance were accuracy, kappa, and area under the curve (AUC). Accuracy is a simple measure of correct classifications divided by total classifications. Kappa measures the model's performance over a random classifier. AUC provides a measure of classification ability with regards to any possible probability cut-off values. 

In terms of accuracy, CART is the best classifier of user type at 94.4%. Naive Bayes produced an accuracy of about 91% while logistic regression had an accuracy of 93.8%. However, since the majority of users in the dataset are subscribers, accuracy is likely not the best measure of classification performance. In other words, we could achieve a fairly high accuracy by simply classifying every user as a subscriber. In terms of kappa, logistic regression had the highest value at 0.25. Naive Bayes produced a kappa of 0.24 and CART had a kappa of 0.21. These kappa values show that the classification abilities of the three models are weak. In other terms, logistic regression which had the highest kappa value, only captures about 25% of the potential improvement over a random classifier. Using AUC as an indicator of model performance shows how well each model predicts regardless of the chosen probability cut-off. Naive Bayes had the highest AUC value at about 0.81 while CART had an AUC of 0.76 and logistic regression had an AUC of 0.77. Oddly enough, each model was dominant in one of accuracy, kappa, or AUC. However, each of these statistics need not be treated equally. In fact, we argue that AUC is the best indicator of classification performance followed by kappa and then by accuracy. AUC is the best measure of classification strength because it considers all possible cut-off values unlike the kappa statistic which is cut-off dependent. Therefore, we conclude that Naive Bayes was the best classifier of user types.

```{r}
library(e1071)
train_bayes = select(train, usertype, hour, tripduration_cat, start.station.name)
test_bayes = select(test,  usertype, hour, tripduration_cat, start.station.name)

classifier = naiveBayes(usertype ~ hour + tripduration_cat + start.station.name, train_bayes, laplace = 1)
pred = predict(classifier, test_bayes[,2:4], type = "raw")

test_bayes$pred = as.factor(ifelse(pred[, "Subscriber"] > 0.75, "Subscriber", "Customer"))
confusionMatrix(test_bayes$pred, test_bayes$usertype)

predict_s = as.vector(pred[, "Subscriber"])
usertype = test_bayes$usertype
predROC = prediction(predict_s, usertype)
AUC=performance(predROC, measure="auc")
unlist(AUC@y.values)
```


```{r}
library(C50)
tree = C5.0(x=select(train, tripduration, hour, start.station.name),y=train$usertype)
summary(tree)

pred = predict(tree, data.frame(select(test, tripduration, hour, start.station.name)))
prob = predict(tree, data.frame(select(test, tripduration, hour, start.station.name)), type = "prob")
confusionMatrix(pred, test$usertype)

predict = as.vector(prob[,"Subscriber"])
predROC = prediction(predict, test$usertype)
AUC=performance(predROC, measure="auc")
unlist(AUC@y.values)
```

```{r}
logit1 = glm(usertype ~ tripduration + hour + start.station.name, data = train, family = "binomial")
#round(exp(coef(logit1)), 3)
test$pred_logit <- predict(logit1, test, type="response")
test$userpred <- as.factor(ifelse(test$pred_logit > 0.75, "Subscriber", "Customer"))
confusionMatrix(test$userpred, test$usertype)

predROC = prediction(test$pred_logit, test$usertype)
AUC=performance(predROC, measure="auc")
unlist(AUC@y.values)
```

### Neural Network for Classification

We ran a neural network for classification of user types by first creating dummy variables for the categorical factors on the normalized data. We expected neural network to be the strongest classifier out of CART, logistic regression, and Naive Bayes. Typically, black box methods like neural network classify data better than more transparent models. 

The neural network classified user types with an accuracy of 92.3% which is middle of the road in comparison to the other three models. However, as previously explained, accuracy is not the best measure of classification performance due to the skew in user types in the data. The neural network did produce the highest kappa value at 0.2691 of all the methods considered in this project. We maintained a consistent probability cut-off value throughout to ensure comparable results. Although we kept the cut-off values consistent, kappa remains sensitive to the choice of cut-off value. We attempted to calulate AUC for the neural network model, but we ran into "Error: $ operator is invalid for atomic vectors". The AUC would have given us a better means of comparison to the other classification models. Overall, judging by the kappa value produced by this neural network, we are fairly confident in concluding that neural network was the best classifier of user type.

```{r}
library(neuralnet)
dummyBike = as.data.frame(model.matrix(~start.station.name+tripduration+hour+usertype, data = bike))
dummyBike_n = as.data.frame(lapply(dummyBike, FUN=normalize))
nn_train = dummyBike_n[oursample,] 
nn_test = dummyBike_n[-oursample,] 
names=names(dummyBike_n[,2:53])
formula=as.formula(paste("usertypeSubscriber ~", paste(names, collapse = "+")))
nn1 = neuralnet(formula, nn_train, linear.output = FALSE)
nn_test_noy = nn_test[,2:53]
Temp = (neuralnet::compute(nn1, nn_test_noy))

test$predictions = as.vector(Temp$net.result)
user_pred = as.factor(ifelse(test$predictions>0.75, "Subscriber", "Customer"))
confusionMatrix(user_pred, as.factor(test$usertype))

#test = as.data.frame(test)
#test$usertype = as.vector(as.list(test$usertype))
#testpreds = as.vector(as.list(test$predictions))
#predROC = prediction(testpreds, test$usertype)
#AUC=performance(predROC, measure="auc")
#unlist(AUC@y.values)
```

### Conclusions

Of the various classification models that we applied to this dataset, the neural network model had the best performance for predicting usertype. Using the neural network, we are able to successfully predict a usertype from trip information such as duration, starting time and starting station. This model can provide valuable insights into how users with different payment plans choose to use the service. From these insights, Citibike could make a variety of different choices for payment structures and more personalized service. For example, if a rider’s habits are predicted to be a subscriber, but they are using the system as a customer, it may make sense to recommend that they upgrade their usage plan. This information can also be used to identify disparities in the pricing plan; if a user is choosing to pay on the customer plan because it is more financially viable despite their usage being closer to a subscriber this might signal the pricing of a subscriber is not ideal. Being able to accurately determine usertype has a real impact on the reliability of the Citibike service. Subscribers generate reliable and consistent income that can be reinvested into the system, whereas customers could vanish without explanation. Ultimately it would make sense for Citibike to incentivize the transition from customer to subscriber to ensure they have a predictable revenue stream and therefore are less reliant on one-time riders who may never use the service again.