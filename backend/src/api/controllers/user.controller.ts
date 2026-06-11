import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateUserDto): Promise<string> {
    return await this.userService.createUser(body);
  }
}
