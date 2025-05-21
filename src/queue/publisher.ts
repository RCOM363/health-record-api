import { getChannel } from "./rabbitmqClient.js";

const QUEUE_NAME = "health_updates";

export const publishMessage = async (msg: string) => {
  const channel = getChannel();

  await channel.assertQueue(QUEUE_NAME);

  channel.sendToQueue(QUEUE_NAME, Buffer.from(msg));
  console.log(`Published Message: "${msg}"`);
};
