import { makeNotification } from '../../test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
    const testNotificationRepository = new InMemoryNotificationRepository();

    it("should count ones' notifications received", async () => {
        const sendNotification = new CountRecipientNotifications(
            testNotificationRepository,
        );

        await makeNotification(
            { recipientId: 'recipient-1' },
            testNotificationRepository,
        );
        await makeNotification(
            { recipientId: 'recipient-1' },
            testNotificationRepository,
        );
        await makeNotification(
            { recipientId: 'recipient-2' },
            testNotificationRepository,
        );

        const { count } = await sendNotification.execute({
            recipientId: 'recipient-1',
        });

        expect(count).toEqual(2);
    });
});
