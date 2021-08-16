FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/auth-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/auth-service/target/Auth-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8083

CMD ["java", "-jar","Auth-Service-0.0.1-SNAPSHOT.jar"]