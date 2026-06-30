import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../domain/user/user.enums';
import { Roles } from '../decorators/roles.decorator';
import { CreateBussinessDto } from '../../application/dto/bussiness/create-bussiness.dto';
import { BussinessService } from '../../application/services/bussiness.service';
import { ListBussinessReadModel, BussinessReadModel } from '../../application/read-models/bussiness/list-bussiness.read-model';
import { UpdateBussinessDto } from '../../application/dto/bussiness/update-bussiness.dto';

@ApiTags('Bussiness')
@ApiCookieAuth('token')
@Controller('bussiness')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Post('create')
  @HttpCode(201)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async createBussiness(
    @Body()
    bussinessDto: CreateBussinessDto,
  ): Promise<{ id: string }> {
    const { id } = await this.bussinessService.createBussiness(bussinessDto);
    return { id };
  }

  @Put('update/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async updateBussiness(
    @Body()
    bussinessDto: UpdateBussinessDto,
    @Param('id') id: string,
  ): Promise<BussinessReadModel> {
    return await this.bussinessService.updateBussiness(bussinessDto, id);
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
