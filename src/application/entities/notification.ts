import { Content } from './notification-content';
import { randomUUID } from 'crypto';

export interface NotificationAttrs {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt?: Date;
}

export class Notification {
    private _id: string;
    private attrs: NotificationAttrs;

    constructor(attrs: NotificationAttrs, id?: string) {
        if (attrs.createdAt === undefined) {
            attrs.createdAt = new Date();
        }
        this.attrs = attrs;
        this._id = id ?? randomUUID();
    }

    public get id() {
        return this._id;
    }

    public set recipientId(recipientId: string) {
        this.attrs.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.attrs.recipientId;
    }

    public set content(content: Content) {
        this.attrs.content = content;
    }

    public get content(): Content {
        return this.attrs.content;
    }

    public set category(category: string) {
        this.attrs.category = category;
    }

    public get category(): string {
        return this.attrs.category;
    }

    public read() {
        this.attrs.readAt = new Date();
    }

    public unread() {
        this.attrs.readAt = null;
    }

    public get readAt(): Date | null | undefined {
        return this.attrs.readAt;
    }

    public cancel() {
        this.attrs.canceledAt = new Date();
    }

    public get canceledAt(): Date | null | undefined {
        return this.attrs.canceledAt;
    }

    public get createdAt(): Date | null | undefined {
        return this.attrs.createdAt;
    }
}
