# Plateforme de blogs touristiques

This project is a tourism blog application where each user can add a blog and access all blogs. The application uses a microservices architecture for better scalability and maintainability. The main components of the application are developed using Spring Boot for the backend and Angular for the frontend.

**Frameworks used:**
- <span> Backend: Spring Boot 3.2.4 <img alt="Spring" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" /> , Maven <img alt="Maven" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg" />, Java 17  <img alt="Java" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" /></san>
- <span> Frontend: Angular 16.1.2 <img alt="Spring" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" /></span>

<span> **Server:** Apache web server <img alt="Apache" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg" /></span>

<span> **Database:** PostgreSQL <img alt="Apache" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" /></span>

**IDEs:**

- <img align="left" alt="Eclipse" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg" /> **Eclipse**: for the Java-based backend.

- <img align="left" alt="VSCode" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" /> **VSCode**: for the frontend.

**Additional tools:**

- <img align="left" alt="Docker" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" /> **Docker**: for containerizing the services.

- <img align="left" alt="Postman" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" /> **Postman**: For backend Http requests test.

## Diagrams

* Global architecture:

<img src="assets/global_architecture.PNG" alt="global architecture" width="700" height="300">

## Content

- [0. Setting Up Microservices](#0-setup-up-microservices)
    - [1. Setup the backend application](#1-setup-the-backend-application)
    - [2. MVC design pattern](#2-mvc-design-pattern)
    - [3. File system](#2-file-system)
- [1. Database connexion & configuration](#1-database-connexion--configuration)
- [2. Frontend application](#2-setup-frontend-application)
    - [1. Setup the frontend application](#1-setup-the-frontend-application)
    - [2. App layout](#2-app-layout)
    - [3. Views](#2-views)

## 0. Setting Up Microservices
In this section, we will set up the initial structure for our microservices. 

This project consists of multiple microservices : **blog**, **user**, **comments** that communicate with each other via REST APIs. The microservices include:

### Prequeries

Before you begin, ensure you have the following installed on your machine:

- Java Development Kit (JDK) 11 or later
- Apache Maven 3.6.0 or later
- Docker (for running databases and other services)


### Postgres & PGAdmin on docker
- Configure docker-compose file by adding Postgres and PGAdmin (GUI) images.
- Connecting to DB using PGAdmin

### Create new microservices
Create new microservices: blog, user and comments.

- **Blog** : The Blog Service is responsible for managing blog-related operations. This includes creating, reading and updating blog posts. Each blog post contains information such as the destination, title, details and images.

- **User** : The User Service handles user-related operations, including user registration, authentication, and profile management. This service is crucial for managing the users who can create and comment on blog posts.

- **Comments** : The Comments Service is responsible for managing comments on blog posts. Users can add comments to blog posts, which can then be retrieved or updated. Each comment is associated with a specific blog post and user.


### Communication between microservices using restTemplate

After creating all microservices, we're supposed to send requests (Http requests) between them via restTemplate to get data from other microservices.

1. Make a configuration file for restTemplate
2. Add restTemplate in the service class using dependency injection
3. Call the microservice using restTemplate

```bash
ResponseEntity<user> response = restTemplate.getForEntity("http://gateway:8222/users/getuser/{userId}", user.class, userId);
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            // Gérer les erreurs
            return null;
        }
```

### Service Discovery using Eureka

#### 1. Quick summary
#### What is Service Discovery?
In a microservices architecture, each microservice is a standalone application with specific business functionality. Since these microservices need to communicate with each other to function as a complete application, they need to know each other’s network locations. Service Discovery comes into play here, maintaining a record of these services’ locations, helping them find each other, and enabling communication.

#### What is Spring Cloud Eureka?
Spring Cloud Eureka, part of the Spring Cloud Netflix project, is a service registry that allows microservices to register themselves and discover other services. In essence, it acts like a phone directory for your microservices, providing a mechanism for service-to-service discovery and registration.

#### Architecture
Steps :
- microservices register to eureka server.
- look up the service using eureka server.
- eureka server will return the service information.

<img src="docs\images\eureka-service-discovery.jpeg" alt="spring mvc layers" width="800" height="300">  

#### 2. How do I get set up?

In order to transform a common Spring Boot application into an Eureka Server, only three steps are needed:

- Add Spring Cloud dependency:
```bash
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

- Enable Eureka initialization during Spring Boot startup using the annotation @EnableEurekaServer on the main class:
```bash
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

- Add some configuration : 

*application.yml*

```bash
spring:
  application:
    name: discovery

eureka:
  instance:
    hostname: discovery
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://discovery:8761/eureka/
server:
  port: 8761
```
- Enable eureka in microservices
```bash
@SpringBootApplication
@EnableEurekaClient
public class ExampleMicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExampleMicroserviceApplication.class, args);
    }
}
```


