import { Injectable } from '@nestjs/common';
import { CreateBussinessDto } from '../dto/bussiness/create-bussiness.dto';
import { Bussiness } from '../../domain/Bussiness/bussiness.entity';
import { BussinessStatus } from '../../domain/Bussiness/bussiness.enum';
import { randomUUID } from 'crypto';
import { IBussinessRepository } from '../../domain/Bussiness/bussiness.repository';
import { BussinessReader } from '../ports/bussiness/bussiness.reader';
import { ListBussinessReadModel } from '../read-models/bussiness/list-bussiness.read-model';

@Injectable()
export class BussinessService {
  constructor(
    private readonly bussinessRepository: IBussinessRepository,
    private readonly bussinessReader: BussinessReader,
  ) {}

  async createBussiness(
    bussinessDto: CreateBussinessDto,
  ): Promise<{ id: string }> {
    const emailExists = await this.bussinessRepository.findEmailExists(
      bussinessDto.email,
    );

    if (emailExists) throw new Error('Email already exists');

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

  async listBussiness(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListBussinessReadModel> {
    return await this.bussinessReader.listBussiness(search, page, limit);
  }
}
