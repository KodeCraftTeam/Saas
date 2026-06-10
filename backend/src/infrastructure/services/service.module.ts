import { Module } from '@nestjs/common';
import { GeneratePasswordService } from './generate-password.service';
import {
  IGeneratePassword,
  IPasswordHasher,
} from '../../domain/user/user.interface';
import { PasswordHasher } from './password-hasher.service';

@Module({
  providers: [
    {
      provide: IGeneratePassword,
      useClass: GeneratePasswordService,
    },
    {
      provide: IPasswordHasher,
      useClass: PasswordHasher,
    },
  ],
  exports: [IGeneratePassword, IPasswordHasher],
})
export class ServiceModule {}
