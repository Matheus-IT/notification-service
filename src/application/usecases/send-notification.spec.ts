import { Notification } from "../entities/notification";
import { SendNotification } from "./send-notification";

describe('Send notification', () => {
    const testNotifications: Array<Notification> = [];
    const testNotificationRepository = {
        async create(notification: Notification) {
            testNotifications.push(notification);
        },
    }

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
        expect(testNotifications).toHaveLength(1);
    });
});