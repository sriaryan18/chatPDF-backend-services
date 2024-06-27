import {handleKafkaEvent} from "./handlers/handleKafkaEvent";
import KafkaClient from "./libs/KafkaClient";

const topic = "document";
const kafkaClient = new KafkaClient({
  brokers: [process.env.KafkaBroker as string],
  clientId: process.env.KafkaClientId as string,
});

const startKafka = async () => {
  console.log("I am here");
  await kafkaClient.ensureTopicExists(topic);
  await kafkaClient.connectConsumer();
  kafkaClient.consumeMessage({
    topic,
    eachMessage: handleKafkaEvent
  });
};

startKafka().catch((reason) => {
  console.log("Error in starting kafka" + reason);
  process.exit(0);
});

const shutdown = () => {
  console.info("Shutting down kafka");
  //   kafkaClient.disconnectedConsumerProduer();
};
process.on("SIGINT", shutdown);
