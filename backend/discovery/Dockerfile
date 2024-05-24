# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper executable
COPY mvnw .

# Copy the entire project
COPY . .

# Download dependencies and package the application (skip tests to speed up the build)
RUN ./mvnw package -DskipTests

# Expose the port the application runs on
EXPOSE 8761

# Set the entry point to run the jar file
CMD ["java", "-jar", "target/discovery-0.0.1-SNAPSHOT.jar"]
