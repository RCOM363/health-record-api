import http from "http";

import { app } from "./app.js";
import config from "./config/config.js";
import { connectRedis } from "./db/redisClient.js";
import { connectRabbitMQ } from "./queue/rabbitmqClient.js";
import { initWebsocket } from "./websocket/notificationServer.js";

const startServer = async () => {
  try {
    // connect to redis
    await connectRedis();
    console.log("Connected to Redis");

    // connect to rabbitmq
    await connectRabbitMQ();

    // create server to handle both http + ws
    const server = http.createServer(app);

    // start websocket server
    initWebsocket(server);

    // start http server
    server.listen(config.port, () => {
      console.log(`server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};

startServer();
