import express from "express";
import upload from "./controller/upload";
import { authenticateRequest } from "./middlewares/userMiddleware";

import KafkaClient from "./libs/KafkaClient";

const topic = process.env.KafkaTopic ?? "document";
const kafkaClient = KafkaClient.getInstance();

const startKafka = async () => {
  await kafkaClient.ensureTopicExists(topic);
  await kafkaClient.connectProducer();
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

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(authenticateRequest)
app.use("/upload", upload);

const port = process.env.PORT;
app.listen(port, () => console.log("app started"));
