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

## API Documentation

### Create a record

- **URL** : `/api/v1/records`
- **Method** : `POST`
- **Body**
  ```json
  {
    "name": "John Doe",
    "age": 25,
    "status": "Healthy"
  }
  ```

### Get a record

- **URL** : `/api/v1/records/:id`
- **Method** : `GET`

### Update a record

- **URL** : `/api/v1/records/:id`
- **Method** : `PUT`
- **Body**
  ```json
  {
    "age": 20
  }
  ```

### Delete a record

- **URL** : `/api/v1/records/:id`
- **Method** : `DELETE`

## Websocket server

Connect to the websocket server

- At `http://localhost:PORT/ws` on frontend or
- Visit `https://hoppscotch.io/realtime/websocket` and add `ws://localhost:PORT/ws` as **URL** and hit connect
