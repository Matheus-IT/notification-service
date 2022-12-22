import { makeNotification } from '../../test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../test/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count recipients notifications', () => {
    const testNotificationRepository = new InMemoryNotificationRepository();

    it("should count ones' notifications received", async () => {
        const getRecipientNotifications = new GetRecipientNotifications(
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

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'recipient-1',
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'recipient-1' }),
                expect.objectContaining({ recipientId: 'recipient-1' }),
            ]),
        );
    });
});
