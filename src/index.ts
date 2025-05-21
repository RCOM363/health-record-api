import { app } from "./app.js";
import config from "./config/config.js";
import { connectRedis } from "./db/redisClient.js";
import { connectRabbitMQ } from "./queue/rabbitmqClient.js";

const startServer = async () => {
  try {
    await connectRedis();
    await connectRabbitMQ();
    console.log("Connected to Redis");
    app.listen(config.port, () => {
      console.log(`server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};

startServer();
