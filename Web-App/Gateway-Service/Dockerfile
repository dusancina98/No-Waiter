FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/gateway-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/gateway-service/target/Gateway-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8090

CMD ["java", "-jar","Gateway-Service-0.0.1-SNAPSHOT.jar"]