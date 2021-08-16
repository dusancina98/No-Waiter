FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/product-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/product-service/target/Product-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8084

CMD ["java", "-jar","Product-Service-0.0.1-SNAPSHOT.jar"]