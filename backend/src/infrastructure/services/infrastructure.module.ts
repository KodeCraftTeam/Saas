import { Module } from '@nestjs/common';
import { GeneratePasswordService } from './generate-password.service';
import {
  IGeneratePassword,
  IPasswordHasher,
} from '../../domain/user/user.interface';
import { PasswordHasher } from './password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ITokenService } from '../../application/interfaces/token.interface';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],

  providers: [
    {
      provide: IGeneratePassword,
      useClass: GeneratePasswordService,
    },
    {
      provide: IPasswordHasher,
      useClass: PasswordHasher,
    },
    {
      provide: ITokenService,
      useClass: JwtTokenService,
    },
  ],

  exports: [IGeneratePassword, IPasswordHasher, ITokenService],
})
export class InfrastructureModule {}
