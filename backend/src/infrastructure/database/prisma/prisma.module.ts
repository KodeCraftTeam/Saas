import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from '../../../domain/user/user.repository';
import { IBussinessRepository } from '../../../domain/Bussiness/bussiness.repository';
import { ILocationRepository } from '../../../domain/location/location.repository';
import { BussinessRepository } from './repositories/bussiness.repository';
import { LocationRepository } from './repositories/location.repository';
import { DashboardBusinessesReader } from '../../../application/ports/dashboard/dashboard-businesses.reader';
import { DashboardCustomersReader } from '../../../application/ports/dashboard/dashboard-customers.reader';
import { DashboardBusinessesPrismaReader } from './readers/dashboard-businesses.prisma-reader';
import { DashboardCustomersPrismaReader } from './readers/dashboard-customers.prisma-reader';
import { BussinessReader } from '../../../application/ports/bussiness/bussiness.reader';
import { BussinessPrismaReader } from './readers/bussiness.prisma-reader';
import { UsersPrismaReader } from './readers/users.prisma-reader';
import { UsersReader } from '../../../application/ports/users/users.reader';

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
    {
      provide: DashboardBusinessesReader,
      useClass: DashboardBusinessesPrismaReader,
    },
    {
      provide: DashboardCustomersReader,
      useClass: DashboardCustomersPrismaReader,
    },
    {
      provide: BussinessReader,
      useClass: BussinessPrismaReader,
    },
    {
      provide: UsersReader,
      useClass: UsersPrismaReader,
    },
  ],
  exports: [
    PrismaService,
    IUserRepository,
    IBussinessRepository,
    ILocationRepository,
    DashboardBusinessesReader,
    DashboardCustomersReader,
    BussinessReader,
    UsersReader,
  ],
})
export class PrismaModule {}
