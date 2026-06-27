import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../domain/user/user.enums';
import { Roles } from '../decorators/roles.decorator';
import { CreateBussinessDto } from '../../application/dto/bussiness/create-bussiness.dto';
import { BussinessService } from '../../application/services/bussiness.service';
import { ListBussinessReadModel } from '../../application/read-models/bussiness/list-bussiness.read-model';

@ApiTags('Bussiness')
@ApiCookieAuth('token')
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

  @Get('list')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async listBussiness(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ListBussinessReadModel> {
    return await this.bussinessService.listBussiness(search, page, limit);
  }
}
