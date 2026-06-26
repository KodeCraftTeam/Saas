import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { ApplicationModule } from './application/application.module';
import { UserController } from './api/controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './api/controllers/auth.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { LocationController } from './api/controllers/location.controller';
import { BussinessController } from './api/controllers/bussiness.controller';
import { DashboardController } from './api/controllers/dashboard.controller';

@Module({
  imports: [
    ApplicationModule,
    PrismaModule,
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    UserController,
    AuthController,
    LocationController,
    BussinessController,
    DashboardController,
  ],
  providers: [],
})
export class AppModule {}
