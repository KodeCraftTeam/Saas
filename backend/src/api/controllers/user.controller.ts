import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { User } from '../../domain/user/user.entity';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body);
  }
}
