FROM maven:3.6.3-openjdk-17-slim AS appServer

WORKDIR /usr/src/object-service
COPY . .
RUN ["mvn", "package", "-DskipTests"]

FROM openjdk:13-jdk-alpine
WORKDIR /app
COPY --from=appServer /usr/src/object-service/target/Object-Service-0.0.1-SNAPSHOT.jar ./

EXPOSE 8081

CMD ["java", "-jar","Object-Service-0.0.1-SNAPSHOT.jar"]