import { Injectable } from '@nestjs/common';
import { IBussinessRepository } from '../../../../domain/Bussiness/bussiness.repository';
import { Bussiness } from '../../../../domain/Bussiness/bussiness.entity';
import { PrismaService } from '../prisma.service';
import {
  BussinessStatus,
  BussinessType,
} from '../../../../domain/Bussiness/bussiness.enum';

@Injectable()
export class BussinessRepository implements IBussinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Bussiness | null> {
    const businessModel = await this.prisma.bussinessModel.findFirst({
      where: { id: id },
    });

    if (!businessModel) return null;

    return Bussiness.Create(
      businessModel.id,
      businessModel.name,
      businessModel.phone,
      businessModel.email,
      businessModel.type as BussinessType,
      businessModel.status as BussinessStatus,
      businessModel.cityId,
      businessModel.address,
    );
  }

  async update(business: Bussiness): Promise<void> {
    await this.prisma.bussinessModel.update({
      where: { id: business.id },
      data: {
        name: business.name,
        phone: business.phone,
        email: business.email,
        type: business.type as string,
        status: business.status,
        cityId: business.cityId,
        address: business.address,
      },
    });
  }

  async create(business: Bussiness): Promise<void> {
    await this.prisma.bussinessModel.create({
      data: {
        id: business.id,
        name: business.name,
        phone: business.phone,
        email: business.email,
        type: business.type as string,
        status: business.status,
        cityId: business.cityId,
        address: business.address,
      },
    });
  }

  async findEmailExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.prisma.bussinessModel.findFirst({
      where: { email: email },
    });

    return emailAlreadyExists !== null;
  }
}

// findById(id: string): Promise<Bussiness | null> {
//   throw new Error('Method not implemented.');
// }
// findAll(): Promise<Bussiness[]> {
//   throw new Error('Method not implemented.');
// }
// update(business: Bussiness): Promise<void> {
//   throw new Error('Method not implemented.');
// }
// changeStatus(id: string, status: string): Promise<void> {
//   throw new Error('Method not implemented.');
// }
