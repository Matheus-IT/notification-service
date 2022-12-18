import { Module } from "@nestjs/common";
import { SendNotification } from "src/application/usecases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "../notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
    ]
})
export class HttpModule {};