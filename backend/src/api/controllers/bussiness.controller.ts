import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../domain/user/user.enums';
import { Roles } from '../decorators/roles.decorator';

@Controller('bussiness')
export class BussinessController {
  constructor() {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async createBussiness() {}
}
