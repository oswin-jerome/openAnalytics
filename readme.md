# OpenAnalytics

OpenAnalytics is an analytics platform that tracks web page traffic and custom events, similar to Google Analytics. It provides an API to track user sessions, page views, user actions, and other custom events such as CPU/Memory usage. It’s designed for scalability and supports integration with any web application, with a focus on providing meaningful insights into user interactions.

## Tech Stack

- **Backend**: Spring Boot (Java)
- **Frontend**: Next.js (React)
- **Database**: PostgreSQL (with Flyway for migrations)
- **Authentication**: JWT-based authentication
- **Logging**: Logback for logging (stored in a file)
- **Security**: Spring Security with JWT and API Key support

## API

http://localhost:8080/swagger-ui/index.html

## Project Setup

- ### Requirements
  - PostGres
  - Kafka
  - Java 21
  - NodeJS
- ### Frontend
  1.  cd `/frontend`
  2.  `npm install`
  3.  `npm run dev`
- ### Backend
  1.  Just run it using any IDE (for dev)
