import { Module } from '@nestjs/common';
import { AppController } from './api/controllers/app.controller';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { ApplicationModule } from './application/application.module';
import { UserController } from './api/controllers/user.controller';

@Module({
  imports: [ApplicationModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}
