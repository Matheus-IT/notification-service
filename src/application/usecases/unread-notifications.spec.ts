import { makeNotification } from '../../test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notifications';

describe('Unread notification', () => {
    it('should be able to read a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new UnreadNotification(repository);

        const notification = await makeNotification(
            {
                readAt: new Date(),
            },
            repository,
        );

        await usecase.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].readAt).toEqual(null);
    });

    it('should not be able to unread a non existing notification', () => {
        const repository = new InMemoryNotificationRepository();
        const cancelNotification = new UnreadNotification(repository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
