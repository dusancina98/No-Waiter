FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/order-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/order-service/target/Order-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8086

CMD ["java", "-jar","Order-Service-0.0.1-SNAPSHOT.jar"]