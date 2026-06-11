import { Module } from '@nestjs/common';
import { ServiceModule } from '../infrastructure/services/service.module';
import { UserService } from './services/user.service';

@Module({
  imports: [ServiceModule], // ← Importa para recibir IGeneratePassword
  providers: [UserService], // ← Registra UserService
  exports: [UserService], // ← Lo exporta para que otros lo usen
})
export class ApplicationModule {}
