import { Module } from '@nestjs/common';
import { PasswordModule } from '../infrastructure/services/password.module';
import { UserService } from './services/user.service';
import { AppService } from './services/app.service';

@Module({
  imports: [PasswordModule], // ← Importa para recibir IGeneratePassword
  providers: [UserService, AppService], // ← Registra UserService
  exports: [UserService, AppService], // ← Lo exporta para que otros lo usen
})
export class ApplicationModule {}
