import { Injectable } from '@nestjs/common';
import { UsersReader } from '../../../../application/ports/users/users.reader';
import { ListUsersReadModel } from '../../../../application/read-models/users/list-users.read-model';
import { Role, UserStatus } from '../../../../domain/user/user.enums';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersPrismaReader implements UsersReader {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ListUsersReadModel> {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            {
              role: { contains: search, mode: 'insensitive' as const },
            },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prisma.userModel.count({ where }),
      this.prisma.userModel.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { bussinessModel: true },
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: data.map((user) => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt.toISOString(),
        bussinessName: user.bussinessModel?.name ?? null,
        status: user.status as UserStatus,
      })),
    };
  }
}
