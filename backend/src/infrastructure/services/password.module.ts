import { Module } from '@nestjs/common';
import { GeneratePasswordService } from './generate-password.service';
import { IGeneratePassword } from '../../application/interfaces/generate-password.interface';

@Module({
  providers: [
    {
      provide: IGeneratePassword,
      useClass: GeneratePasswordService,
    },
  ],
  exports: [IGeneratePassword],
})
export class PasswordModule {}
