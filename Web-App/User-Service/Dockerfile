FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/user-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/user-service/target/User-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8082

CMD ["java", "-jar","User-Service-0.0.1-SNAPSHOT.jar"]