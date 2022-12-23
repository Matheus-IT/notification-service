import { SendNotification } from '@application/usecases/send-notification';
import { DatabaseModule } from '@external/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
    imports: [DatabaseModule],
    providers: [KafkaConsumerService, SendNotification],
    controllers: [NotificationsController],
})
export class MessagingModule {}
