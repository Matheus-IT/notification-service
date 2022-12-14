import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private prismaService: PrismaService) {}

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return await this.prismaService.notification.count({
            where: {
                recipientId,
            },
        });
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const rawNotifications = await this.prismaService.notification.findMany(
            {
                where: {
                    recipientId,
                },
            },
        );

        return rawNotifications.map(PrismaNotificationMapper.toDomain);
    }

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data: PrismaNotificationMapper.toPrisma(notification),
        });
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id: notificationId,
            },
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }
}
