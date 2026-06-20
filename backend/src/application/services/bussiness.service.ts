import { Injectable } from '@nestjs/common';
import { CreateBussinessDto } from '../dto/bussiness/create-bussiness.dto';
import { Bussiness } from '../../domain/Bussiness/bussiness.entity';
import { BussinessStatus } from '../../domain/Bussiness/bussiness.enum';
import { randomUUID } from 'crypto';
import { IBussinessRepository } from '../../domain/Bussiness/bussiness.repository';

@Injectable()
export class BussinessService {
  constructor(private readonly bussinessRepository: IBussinessRepository) {}

  async createBussiness(
    bussinessDto: CreateBussinessDto,
  ): Promise<{ id: string }> {
    const business = Bussiness.Create(
      randomUUID(),
      bussinessDto.name,
      bussinessDto.phone,
      bussinessDto.email,
      bussinessDto.type,
      BussinessStatus.PENDING_ONBOARDING,
      bussinessDto.cityId,
      bussinessDto.address,
    );

    await this.bussinessRepository.create(business);

    return { id: business.id };
  }
}
