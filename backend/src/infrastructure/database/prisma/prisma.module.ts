import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from '../../../domain/user/user.repository';
import { IBussinessRepository } from '../../../domain/Bussiness/bussiness.repository';
import { ILocationRepository } from '../../../domain/location/location.repository';
import { BussinessRepository } from './repositories/bussiness.repository';
import { LocationRepository } from './repositories/location.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IBussinessRepository,
      useClass: BussinessRepository,
    },
    {
      provide: ILocationRepository,
      useClass: LocationRepository,
    },
  ],
  exports: [
    PrismaService,
    IUserRepository,
    IBussinessRepository,
    ILocationRepository,
  ],
})
export class PrismaModule {}
