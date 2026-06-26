import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../../application/services/dashboard.service';
import { GetDashboardDto } from '../../application/dto/dashboard/get-dashboard.dto';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../domain/user/user.enums';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  getDashboard(): Promise<GetDashboardDto> {
    return this.dashboardService.getDashboard();
  }
}
