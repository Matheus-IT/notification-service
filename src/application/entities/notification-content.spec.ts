import { Content } from "./notification-content";

describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('Você recebeu uma notificação de amizade');
        expect(content).toBeTruthy();
    });
    
    it('should NOT be able to create a notification content with less than 5 characters', () => {
        expect(() => new Content('aaaa')).toThrow();
    });
    
    it('should NOT be able to create a notification content with more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});
