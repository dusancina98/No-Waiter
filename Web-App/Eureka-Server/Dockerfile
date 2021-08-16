FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/eureka-server
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/eureka-server/target/Eureka-Server-0.0.1-SNAPSHOT.jar ./

EXPOSE 8761

CMD ["java", "-jar","Eureka-Server-0.0.1-SNAPSHOT.jar"]