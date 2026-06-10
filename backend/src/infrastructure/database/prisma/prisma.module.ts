import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from '../../../domain/user/user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [PrismaService, IUserRepository],
})
export class PrismaModule {}
