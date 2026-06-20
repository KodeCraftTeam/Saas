import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BussinessService } from './services/bussiness.service';
import { LocationService } from './services/location.service';

@Module({
  imports: [InfrastructureModule], // ← Importa para recibir IGeneratePassword
  providers: [UserService, AuthService, BussinessService, LocationService], // ← Registra UserService
  exports: [UserService, AuthService, BussinessService, LocationService], // ← Lo exporta para que otros lo usen
})
export class ApplicationModule {}
