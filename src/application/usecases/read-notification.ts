import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private repository: NotificationRepository) {}

    async execute(
        request: ReadNotificationRequest,
    ): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.repository.findById(notificationId);

        if (notification === null) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.repository.save(notification);
    }
}
