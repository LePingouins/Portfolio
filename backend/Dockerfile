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
# We use a robust sed default that handles both http:// and postgresql:// style replacements if needed
ENTRYPOINT ["/bin/sh", "-c", "export SPRING_DATASOURCE_URL=$(echo $SPRING_DATASOURCE_URL | sed 's|^postgresql://|jdbc:postgresql://|'); java -jar app.jar"]
