import { connectRabbitMQ } from "../queue/rabbitmqClient.js";
import { consumeMessage } from "../queue/consumer.js";

const startConsumer = async () => {
  await connectRabbitMQ();
  await consumeMessage();
};

startConsumer();
