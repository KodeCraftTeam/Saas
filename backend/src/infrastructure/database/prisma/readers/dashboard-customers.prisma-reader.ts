import { Injectable } from '@nestjs/common';
import { DashboardCustomersReader } from '../../../../application/ports/dashboard/dashboard-customers.reader';
import { RecentlyAddedCustomersReadModel } from '../../../../application/read-models/dashboard/recently-added-customer.read-model';
import { Role, UserStatus } from '../../../../domain/user/user.enums';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardCustomersPrismaReader
  implements DashboardCustomersReader
{
  constructor(private readonly prisma: PrismaService) {}

  async registeredCustomers(): Promise<number> {
    return this.prisma.userModel.count({
      where: { role: Role.CUSTOMER },
    });
  }

  async recentlyAddedCustomers(): Promise<RecentlyAddedCustomersReadModel> {
    const users = await this.prisma.userModel.findMany({
      where: {
        status: UserStatus.ACTIVE,
        role: Role.CUSTOMER,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      total: users.length,
      data: users.map((user) => ({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role as Role | null,
        status: user.status as UserStatus,
      })),
    };
  }
}
