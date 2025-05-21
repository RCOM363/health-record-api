import { getChannel } from "./rabbitmqClient.js";

const QUEUE_NAME = "health_updates";

export const consumeMessage = async () => {
  const channel = getChannel();
  await channel.assertQueue(QUEUE_NAME);

  console.log(`Listening to Queue: ${QUEUE_NAME}`);

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg) {
      const message = msg?.content.toString();
      console.log(message);
      console.log(`Consumed Message: "${message}"`);
      channel.ack(msg);
    }
  });
};
