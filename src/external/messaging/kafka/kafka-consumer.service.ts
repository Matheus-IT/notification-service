import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
    extends ServerKafka
    implements OnModuleDestroy
{
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['vocal-serval-11932-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username:
                        'dm9jYWwtc2VydmFsLTExOTMyJEm9QFP5n7pqkkp59i5E-lQVK7W1sARb5MsXGeU',
                    password: '2c814fb0304b4b48866e7ef9f14690f6',
                },
                ssl: true,
            },
        });
    }

    async onModuleDestroy() {
        await this.close();
    }
}
