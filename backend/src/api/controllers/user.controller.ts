import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../domain/user/user.enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() body: CreateUserDto): Promise<string> {
    return await this.userService.createUser(body);
  }
}
