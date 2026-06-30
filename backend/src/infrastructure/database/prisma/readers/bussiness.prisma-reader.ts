import { Injectable } from '@nestjs/common';
import { BussinessReader } from '../../../../application/ports/bussiness/bussiness.reader';
import { ListBussinessReadModel, BussinessReadModel } from '../../../../application/read-models/bussiness/list-bussiness.read-model';
import {
  BussinessStatus,
  BussinessType,
} from '../../../../domain/Bussiness/bussiness.enum';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BussinessPrismaReader implements BussinessReader {
  constructor(private readonly prisma: PrismaService) {}

  async listBussiness(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ListBussinessReadModel> {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            {
              city: {
                name: { contains: search, mode: 'insensitive' as const },
              },
            },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prisma.bussinessModel.count({ where }),
      this.prisma.bussinessModel.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { city: true },
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: data.map((business) => ({
        id: business.id,
        name: business.name,
        BussinessType: business.type as BussinessType,
        city: business.city.name,
        address: business.address,
        phone: business.phone,
        email: business.email,
        bussinessStatus: business.status as BussinessStatus,
      })),
    };
  }

  async findBussinessById(id: string): Promise<BussinessReadModel | null> {
    const business = await this.prisma.bussinessModel.findFirst({
      where: { id },
      include: { city: true },
    });

    if (!business) return null;

    return {
      id: business.id,
      name: business.name,
      BussinessType: business.type as BussinessType,
      city: business.city.name,
      address: business.address,
      phone: business.phone,
      email: business.email,
      bussinessStatus: business.status as BussinessStatus,
    };
  }
}
