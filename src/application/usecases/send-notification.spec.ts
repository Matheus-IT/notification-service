import { SendNotification } from "./send-notification";
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';

describe('Send notification', () => {
    const testNotificationRepository = new InMemoryNotificationRepository();

    it('should be able to snd a notification', async () => {
        const sendNotification = new SendNotification();

        const { notification } = await sendNotification.execute(
            {
            content: 'notifying',
            category: 'warning',
            recipientId: 'example-recipient-id'
            },
            testNotificationRepository
        );

        expect(testNotificationRepository.notifications).toHaveLength(1);
        expect(testNotificationRepository.notifications[0]).toEqual(notification);
    });
});