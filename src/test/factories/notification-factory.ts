import {
    Notification,
    NotificationAttrs,
} from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { NotificationRepository } from '@application/repositories/notifications-repository';

type Override = Partial<NotificationAttrs>;

export async function makeNotification(
    override: Override = {},
    repository: NotificationRepository,
) {
    return await repository.create(
        new Notification({
            recipientId: 'recipient-1',
            content: new Content('test content'),
            category: 'social',
            ...override,
        }),
    );
}
