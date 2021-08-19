
  

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

## Initial test data

* #### Administration APP
```bash
All password is 123

System admin:
email: example@example.com

Object admin:
email: loftadmin@example.com
email: atinaadmin@example.com
email: petrusadmin@example.com

Waiters:
email: loftwaiter@example.com
email: atinawaiter@example.com
email: petruswaiter@example.com
```

* #### Deliverer APP
```bash
All password is 123

Deliverers:
email: deliverer1@example.com
email: deliverer2@example.com
```

* #### Customer APP
```bash
All password is 123

Deliverers:
email: customer1@example.com
email: customer2@example.com
email: customer3@example.com
```
* #### Self-ordering app - Use token for Loft

## Images

<details>
  <summary>See administration application</summary>
  <img src="https://user-images.githubusercontent.com/57506510/130152494-2057ef3a-4af0-44a1-a3dc-55f68baccc11.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152568-bfe4e9d8-af0f-4f66-bc17-5ba0bf371a9c.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152596-f932886b-a0ef-4ea2-8370-8286c029090e.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152658-5cfcf1e6-111d-4316-9dbc-80b1d8c82f19.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152706-0a706d79-8c48-4bd7-b0f8-226cfdce91ea.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152756-e63db3ef-c021-485e-840f-468cd5c5670b.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152769-e65def73-dd45-4852-9819-e73cd04f3267.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152774-7b5502ba-c1f7-4c74-8e69-91bba1923d9b.png" name="frontend">
</details>
<details>
  <summary>See self-ordering application</summary>
  <img src="https://user-images.githubusercontent.com/57506510/130152824-561c6c4c-98e5-4445-a267-1bdcef8d42c8.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152833-57ed17c3-87b0-432a-a6a2-a7d483324f8f.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152840-6d87518d-ea2a-46c0-a71d-a13f61b07d19.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152848-eb778545-4727-48bc-8b20-e4bea9742f57.png" name="frontend">
<img src="https://user-images.githubusercontent.com/57506510/130152851-435da6ad-90ec-463d-adb1-c6712318ff86.png" name="frontend">
</details>

<details>
  <summary>See customer application</summary>
  <p float="left">
  <img src="https://user-images.githubusercontent.com/57506510/130152873-6d9c78fe-58ce-40aa-a8ff-0f559e0c79ea.jpg" name="frontend" width="500">
  <img src="https://user-images.githubusercontent.com/57506510/130152878-7bf773cf-d1e7-4a71-9b03-b81d5b16d224.jpg" name="frontend"  width="500">
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/57506510/130152881-34d933a3-9975-443d-91b1-07aed031f1ce.jpg" name="frontend"  width="500">
<img src="https://user-images.githubusercontent.com/57506510/130152886-6414d5e4-828d-4c18-aca2-3aa298c970be.jpg" name="frontend" width="500">
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/57506510/130152887-7e90a8cc-411e-4d70-a702-b571db7f3489.jpg" name="frontend" width="500">
<img src="https://user-images.githubusercontent.com/57506510/130152890-41aa2708-e177-4706-8d01-a13db594ef21.jpg" name="frontend" width="500">
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/57506510/130152891-686af51e-147a-4bb8-acf1-d80bdde5cc1d.jpg" name="frontend" width="500">
</p>
</details>

<details>
  <summary>See deliverer application</summary>
  <img src="https://user-images.githubusercontent.com/57506510/130152941-95866e95-869a-4dc2-99b2-107125eb3db6.jpg" name="frontend"  width="500">
</details>
