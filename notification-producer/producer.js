const { Kafka } = require("kafkajs");

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'kafka-producer',
        brokers: ['vocal-serval-11932-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username:
                'dm9jYWwtc2VydmFsLTExOTMyJEm9QFP5n7pqkkp59i5E-lQVK7W1sARb5MsXGeU',
            password: '2c814fb0304b4b48866e7ef9f14690f6',
        },
        ssl: true,
    });

    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação',
                    category: 'social',
                    recipientId: 'e8899fa9-c5f1-41ea-a5ea-349a8d53ce1e',
                })
            }
        ]
    });

    await producer.disconnect();
}

bootstrap();
