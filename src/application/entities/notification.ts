import { Content } from "./notification-content";
import { randomUUID } from "crypto";

export interface NotificationAttrs {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    createdAt?: Date;
}


export class Notification {
    private _id: string;
    private attrs: NotificationAttrs

    constructor(attrs: NotificationAttrs) {
        if (attrs.createdAt === undefined) {
            attrs.createdAt = new Date();
        }
        this.attrs = attrs;
        this._id = randomUUID();
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
    
    public set readAt(readAt: Date) {
        this.attrs.readAt = readAt;
    }
    
    public get readAt(): Date {
        return this.attrs.readAt;
    }

    public get createdAt(): Date {
        return this.attrs.createdAt;
    }
}