import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationsRequest {
    recipientId: string;
}

interface CountRecipientNotificationsResponse {
    count: number;
}

@Injectable()
export class CountRecipientNotifications {
    constructor(private repository: NotificationRepository) {}

    async execute(
        request: CountRecipientNotificationsRequest,
    ): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.repository.countManyByRecipientId(recipientId);

        return { count };
    }
}
