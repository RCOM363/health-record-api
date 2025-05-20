import { app } from "./app.js";
import config from "./config/config.js";
import { connectRedis } from "./db/redisClient.js";

const startServer = async () => {
  try {
    await connectRedis();
    console.log("Connected to Redis");
    app.listen(config.port, () => {
      console.log(`server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};

startServer();
