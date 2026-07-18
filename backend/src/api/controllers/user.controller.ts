import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../domain/user/user.enums';
import { ListUsersReadModel } from '../../application/read-models/users/list-users.read-model';

@ApiTags('Users')
@ApiCookieAuth('token')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() body: CreateUserDto): Promise<{ userId: string }> {
    const userId = await this.userService.createUser(body);
    return { userId };
  }

  @Get('list')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async listUsers(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ListUsersReadModel> {
    return await this.userService.listUsers(search, page, limit);
  }
}
