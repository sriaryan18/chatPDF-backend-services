import {
  Admin,
  Consumer,
  EachMessageHandler,
  Kafka,
  Producer,
  logLevel,
} from "kafkajs";

type IKafkaClient = {
  brokers: Array<string>;
  clientId: string;
};

class KafkaClient {
  private kafka: Kafka;
  private consumer: Consumer;
  private producer: Producer;
  private admin: Admin;
  constructor({ brokers, clientId }: IKafkaClient) {
    this.kafka = new Kafka({
      clientId,
      brokers,
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: `${clientId}-group` });
    this.admin = this.kafka.admin();
  }
  async ensureTopicExists(topic: string) {
    await this.admin.connect();

    const topics = await this.admin.listTopics();
    console.log("I am topics", topics);
    if (!topics.includes(topic)) {
      await this.admin.createTopics({
        topics: [{ topic, numPartitions: 1, replicationFactor: 1 }],
      });
      console.log(`Topic ${topic} created`);
    } else {
      console.log(`Topic ${topic} already exists`);
    }
    await this.admin.disconnect();
  }

  connectProducer = async () => {
    await this.producer.connect();
    console.log("Consumer started");
  };
  connectConsumer = async () => {
    await this.consumer.connect();
    console.log("Connected");
  };

  disconnectProducer = async () => {
    await this.producer.disconnect();
    console.log("Producer disconnected");
  };
  disconnectConsumer = async () => {
    await this.consumer.disconnect();
    console.log("Consumer disconnected");
  };
  disconnectedConsumerProduer = async () => {
    await this.disconnectConsumer();
    await this.disconnectProducer();
  };

  produceMessage = async ({
    topic,
    messages,
  }: {
    topic: string;
    messages: Array<string>;
  }) => {
    await this.producer.send({
      topic,
      messages: messages.map((message) => ({ value: message })),
    });
    console.log(`Produced message to topic ${topic}`);
  };

  consumeMessage = async ({
    topic,
    eachMessage,
  }: {
    topic: string;
    eachMessage: EachMessageHandler;
  }) => {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({ eachMessage });
  };
}

export default KafkaClient;
