import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/services/infrastructure.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [InfrastructureModule], // ← Importa para recibir IGeneratePassword
  providers: [UserService, AuthService], // ← Registra UserService
  exports: [UserService, AuthService], // ← Lo exporta para que otros lo usen
})
export class ApplicationModule {}
