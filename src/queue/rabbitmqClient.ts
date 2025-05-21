import amqp from "amqplib";

import config from "../config/config.js";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    config.rabbitmqUrl || "amqplib://localhost",
  );
  channel = await connection.createChannel();
  console.log("Connected to RabbitMQ");
};

export const getChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};
