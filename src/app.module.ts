import { MessagingModule } from '@external/messaging/kafka/messaging.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@external/database/database.module';
import { HttpModule } from '@external/http/http.module';

@Module({
    imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
