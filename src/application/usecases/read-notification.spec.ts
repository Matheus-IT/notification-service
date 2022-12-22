import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
    it('should be able to read a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new ReadNotification(repository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova notificação'),
            recipientId: 'example_id_testing',
        });

        await repository.create(notification);
        await usecase.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('should not be able to read a non existing notification', () => {
        const repository = new InMemoryNotificationRepository();
        const cancelNotification = new ReadNotification(repository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
