import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BussinessService } from './services/bussiness.service';

@Module({
  imports: [InfrastructureModule], // ← Importa para recibir IGeneratePassword
  providers: [UserService, AuthService, BussinessService], // ← Registra UserService
  exports: [UserService, AuthService, BussinessService], // ← Lo exporta para que otros lo usen
})
export class ApplicationModule {}
