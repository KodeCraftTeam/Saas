import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBussinessDto } from '../dto/bussiness/create-bussiness.dto';
import { Bussiness } from '../../domain/Bussiness/bussiness.entity';
import { BussinessStatus } from '../../domain/Bussiness/bussiness.enum';
import { randomUUID } from 'crypto';
import { IBussinessRepository } from '../../domain/Bussiness/bussiness.repository';
import { BussinessReader } from '../ports/bussiness/bussiness.reader';
import {
  ListBussinessReadModel,
  BussinessReadModel,
} from '../read-models/bussiness/list-bussiness.read-model';
import { UpdateBussinessDto } from '../dto/bussiness/update-bussiness.dto';

import {
  IGeneratePassword,
  IPasswordHasher,
} from '../../domain/user/user.interface';
import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { UserStatus, Role } from '../../domain/user/user.enums';

import { IMailService } from '../interfaces/mail.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BussinessService {
  constructor(
    private readonly bussinessRepository: IBussinessRepository,
    private readonly bussinessReader: BussinessReader,
    private readonly generatePassword: IGeneratePassword,
    private readonly passwordHasher: IPasswordHasher,
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly configService: ConfigService,
  ) {}

  async createBussiness(
    bussinessDto: CreateBussinessDto,
  ): Promise<{ id: string }> {
    const emailExists = await this.bussinessRepository.findEmailExists(
      bussinessDto.email,
    );
    if (emailExists) throw new Error('Email already exists in business');

    const userEmailExists = await this.userRepository.findEmailExists(
      bussinessDto.email,
    );
    if (userEmailExists) throw new Error('Email already exists in users');

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

    const plainPassword = this.generatePassword.generatePassword();
    const passwordHash = await this.passwordHasher.hashPassword(plainPassword);

    const user = User.Create(
      randomUUID(),
      bussinessDto.email,
      'Admin',
      bussinessDto.name,
      Role.BUSSINESS_MANAGER,
      UserStatus.ACTIVE,
      passwordHash,
      business.id,
    );

    await this.userRepository.create(user);

    try {
      await this.mailService.send({
        to: bussinessDto.email,
        subject: '¡Bienvenido a la Plataforma!',
        template: 'business-welcome',
        context: {
          businessName: bussinessDto.name,
          email: bussinessDto.email,
          password: plainPassword,
          login_url: this.configService.get<string>('LOGIN_URL'),
        },
      });
    } catch (error) {
      console.error('Error enviando peticion al mail-service:', error);
    }

    return { id: business.id };
  }

  async listBussiness(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListBussinessReadModel> {
    return await this.bussinessReader.listBussiness(search, page, limit);
  }

  async updateBussiness(
    bussinessDto: UpdateBussinessDto,
    bussinessId: string,
  ): Promise<BussinessReadModel> {
    const business = await this.bussinessRepository.findById(bussinessId);

    if (!business) throw new NotFoundException('Bussiness not found');

    business.name = bussinessDto.name ?? business.name;
    business.phone = bussinessDto.phone ?? business.phone;
    business.email = bussinessDto.email ?? business.email;
    business.type = bussinessDto.type ?? business.type;
    business.cityId = bussinessDto.cityId ?? business.cityId;
    business.address = bussinessDto.address ?? business.address;

    await this.bussinessRepository.update(business);

    const updatedBusiness =
      await this.bussinessReader.findBussinessById(bussinessId);
    if (!updatedBusiness)
      throw new NotFoundException('Bussiness not found after update');

    return updatedBusiness;
  }
}
