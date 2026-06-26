import { Injectable } from '@nestjs/common';
import { IBussinessRepository } from '../../../../domain/Bussiness/bussiness.repository';
import { Bussiness } from '../../../../domain/Bussiness/bussiness.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BussinessRepository implements IBussinessRepository {
  constructor(private readonly prisma: PrismaService) {}

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
