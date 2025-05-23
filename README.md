# Health Record API

A simple CRUD API with Redis caching, RabbitMQ Queue, Websocket and Server Sent Events

## Built with

- Node.js
- Express
- PostgreSQL
- Prisma
- Docker
- Redis
- RabbitMQ
- Websocket

## Getting started

### Prerequisites

- Node.js
- Docker

### Installation

1. Clone the respository

   ```bash
   git clone https://github.com/RCOM363/health-record-api
   cd health-record-api
   ```

2. Environment variable setup

   Create an `.env` file in root directory & configure the following variables

   ```env
    PORT=3000

    CORS_ORIGIN=*

    DATABASE_URL=<postgreSQL_DB_url>

    REDIS_URL="redis://redis:6379" // docker url

    RABBITMQ_URL="amqp://guest:guest@rabbitmq:5672" // docker url

    TOKEN_SECRET=<secret>
   ```

3. Run the server
   ```bash
   docker-compose up health-record-api
   ```
   `NOTE`: You will get connection error with RabbitMQ but it will connect after few tries

## API Documentation

### Login

- **URL** : `/api/v1/auth/login`
- **Method** : `POST`
- **Body** :
  ```json
  {
    "email": "john@gmail.com",
    "password": "pass#123"
  }
  ```
- **CURL command** :
  ```bash
  curl -X POST http://localhost:PORT/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@gmail.com","password": "pass#123"}'
  ```

### Create a record

- **URL** : `/api/v1/records`
- **Method** : `POST`
- **Body** :
  ```json
  {
    "name": "John Doe",
    "age": 25,
    "status": "Healthy"
  }
  ```
- **CURL command** :
  ```bash
  curl -X POST http://localhost:PORT/api/v1/records \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "age": "25", "status": "Healthy"}'
  ```

### Get a record

- **URL** : `/api/v1/records/:id`
- **Method** : `GET`
- **CURL command** :
  ```bash
  curl http://localhost:PORT/api/v1/records/{id}
  ```

### Update a record

- **URL** : `/api/v1/records/:id`
- **Method** : `PUT`
- **Body** :
  ```json
  {
    "age": 20
  }
  ```
- **CURL command** :
  ```bash
  curl -X POST http://localhost:PORT/api/v1/records/{id} \
  -H "Content-Type: application/json" \
  -d '{"age": "20"}'
  ```

### Delete a record

- **URL** : `/api/v1/records/:id`
- **Method** : `DELETE`
- **CURL command** :
  ```bash
  curl -X DELETE http://localhost:PORT/api/v1/records/{id}
  ```

## Websocket server

Connect to the websocket server

- **Endpoint** : `http://localhost:PORT/ws`
- Visit `https://hoppscotch.io/realtime/websocket` and add `ws://localhost:PORT/ws` as **URL** and hit connect

## Server Sent Events

Connect to the SSE at

- **Endpoint** : `http://localhost:PORT/sse/health-updates`
- Use `CURL` to test 
  ```bash
    curl http://localhost:PORT/sse/health-updates
  ```

## HTML Interface

An HTML file (`public/test.html`) is included to manually test all API endpoints and real-time functionalities using WebSockets and SSE.

## Project structure & Architectural decisions

- Organized the code into separates modules (models, controllers, routes etc)
- Created a separate Notification worker to consume the messages from the queue, keeping the processes decoupled
- Used docker to isolate environments for Node.js server, Redis, RabbitMQ and Worker, each run in their own   container


