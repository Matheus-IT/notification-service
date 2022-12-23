import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationsRequest {
    recipientId: string;
}

interface GetRecipientNotificationsResponse {
    notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
    constructor(private repository: NotificationRepository) {}

    async execute(
        request: GetRecipientNotificationsRequest,
    ): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.repository.findManyByRecipientId(
            recipientId,
        );

        return {
            notifications,
        };
    }
}
