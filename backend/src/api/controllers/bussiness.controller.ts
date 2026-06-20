import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../domain/user/user.enums';
import { Roles } from '../decorators/roles.decorator';
import { CreateBussinessDto } from '../../application/dto/bussiness/create-bussiness.dto';
import { BussinessService } from '../../application/services/bussiness.service';

@Controller('bussiness')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async createBussiness(
    @Body()
    bussinessDto: CreateBussinessDto,
  ): Promise<{ id: string }> {
    const { id } = await this.bussinessService.createBussiness(bussinessDto);
    return { id };
  }
}
