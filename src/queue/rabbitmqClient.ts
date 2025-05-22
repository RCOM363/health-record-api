import amqp from "amqplib";

import config from "../config/config.js";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  let retries = 5;
  while (retries) {
    try {
      const connection = await amqp.connect(
        config.rabbitmqUrl || "amqplib://localhost",
      );
      channel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
      break;
    } catch (err) {
      console.error("Waiting for RabbitMQ...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

export const getChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};
