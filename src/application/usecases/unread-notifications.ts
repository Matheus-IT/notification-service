import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@application/repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
    notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
    constructor(private repository: NotificationRepository) {}

    async execute(
        request: UnreadNotificationRequest,
    ): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.repository.findById(notificationId);

        if (notification === null) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.repository.save(notification);
    }
}
