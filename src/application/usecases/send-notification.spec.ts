import { SendNotification } from "./send-notification";
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';

describe('Send notification', () => {
    const testNotificationRepository = new InMemoryNotificationRepository();

    it('should be able to snd a notification', async () => {
        const sendNotification = new SendNotification();

        const notification = await sendNotification.execute(
            {
            content: 'notifying',
            category: 'warning',
            recipientId: 'example-recipient-id'
            },
            testNotificationRepository
        );

        expect(notification).toBeTruthy();
        expect(testNotificationRepository.notifications).toHaveLength(1);
    });
});