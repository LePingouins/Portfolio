# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src src

# Make gradlew executable
RUN chmod +x gradlew

# Build the application
RUN chmod +x gradlew
RUN ./gradlew build --no-daemon -x test

# Use a smaller image for running the app
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the builder image
COPY --from=0 /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
# Use a more explicit string replacement that properly escapes special characters
ENTRYPOINT ["/bin/sh", "-c", "export SPRING_DATASOURCE_URL=\"jdbc:${SPRING_DATASOURCE_URL}\"; java -jar app.jar"]
