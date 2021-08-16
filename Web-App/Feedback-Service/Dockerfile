FROM maven:3.6.3-ibmjava-8-alpine AS appServer

WORKDIR /usr/src/feedback-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/feedback-service/target/Feedback-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8088

CMD ["java", "-jar","Feedback-Service-0.0.1-SNAPSHOT.jar"]