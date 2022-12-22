import { CancelNotification } from '@application/usecases/cancel-notification';
import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notifications';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationBody } from '../../dtos/create-notification-body';
import { HttpNotificationMapper } from '../mappers/notification-mapper';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
        private countRecipientNotifications: CountRecipientNotifications,
        private getRecipientNotifications: GetRecipientNotifications,
    ) {}

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string) {
        await this.cancelNotification.execute({
            notificationId: id,
        });
    }

    @Get('count/from/:recipientId')
    async countFromRecipient(@Param('recipientId') recipientId: string) {
        const { count } = await this.countRecipientNotifications.execute({
            recipientId,
        });

        return { count };
    }

    @Get('from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
        const { notifications } = await this.getRecipientNotifications.execute({
            recipientId,
        });

        return {
            notifications: notifications.map(HttpNotificationMapper.toHttp),
        };
    }

    @Patch(':id/read')
    async read(@Param('id') id: string) {
        await this.readNotification.execute({
            notificationId: id,
        });
    }

    @Patch(':id/unread')
    async unread(@Param('id') id: string) {
        await this.unreadNotification.execute({
            notificationId: id,
        });
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { recipientId, content, category } = body;

        const { notification } = await this.sendNotification.execute({
            recipientId,
            content,
            category,
        });
        return {
            notification: HttpNotificationMapper.toHttp(notification),
        };
    }
}
