import { Kafka } from "kafkajs";

//Define connection
//Connecting to kafka instance running on docker
const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

//Define consumer which takes in a group id
const consumer = kafka.consumer({ groupId: "test-app" });

// Consuming data from the producer
const consume = async () => {
  consumer.connect();
  consumer.subscribe({ topic: "create_post" });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};

consume();
