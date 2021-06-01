import { Kafka } from "kafkajs";

//Define connection
//Connecting to kafka instance running on docker
const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

//Define producer which does not necessarily take any argument by default.
const producer = kafka.producer();

const produce = async () => {
  // Producing
  await producer.connect();
};

export { producer, produce };
