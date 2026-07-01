import { Injectable } from '@nestjs/common';
import { DashboardBusinessesReader } from '../../../../application/ports/dashboard/dashboard-businesses.reader';
import { RecentlyAddedBusinessesReadModel } from '../../../../application/read-models/dashboard/recently-added-business.read-model';
import {
  BussinessStatus,
  BussinessType,
} from '../../../../domain/Bussiness/bussiness.enum';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardBusinessesPrismaReader
  implements DashboardBusinessesReader
{
  constructor(private readonly prisma: PrismaService) {}

  async activeBusinesses(): Promise<number> {
    return this.prisma.bussinessModel.count({
      where: { status: BussinessStatus.ACTIVE },
    });
  }

  async recentlyAddedBusinesses(): Promise<RecentlyAddedBusinessesReadModel> {
    const businesses = await this.prisma.bussinessModel.findMany({
      where: { status: BussinessStatus.ACTIVE },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { city: true },
    });

    return {
      total: businesses.length,
      data: businesses.map((business) => ({
        name: business.name,
        city: business.city.name,
        bussinessType: business.type as BussinessType,
        status: business.status as BussinessStatus,
      })),
    };
  }
}
