
  

# No-Waiter

  

Food ordering application for easy food order from home, restaurant, or from restaurants touch screen devices

  

## Technologies

  

* Java Spring Boot

* React JS, React Native

* PostgreSQL

* Eureka Service Discovery

* Netflix Zuul Gateway

* Netflix Eureka Client

* Docker

* Microservice architecture

## Infrastructure

Our infrastructure contains 4 different client apps

* Administration app 

* Self-ordering kiosk app

* Deliverer mobile app

* Ordering mobile app

And 8 microservices

* Eureka Server 

* API Gateway

* Auth service

* User service

* Object service

* Product service
* Order service
* Feedback service


## Running in Docker

This commands starts 8 back-end microservices and 2 React JS applications (Administration app and Self-ordering kiosk app)

#### `docker-compose up`

This commands starts 2 React Native (Expo) applications (Deliverer app and Ordering app)

#### `docker-compose -f docker-compose-mobile.yml up`
