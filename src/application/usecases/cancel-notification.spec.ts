import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
    it('should be able to send a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(repository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova notificação'),
            recipientId: 'example_id_testing',
        });

        await repository.create(notification);
        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    });

    it('should not be able to cancel a non existing notification', () => {
        const repository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(repository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
