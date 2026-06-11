import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../../application/dto/user/login-user.dto';
import { LoginResponseDto } from '../../application/dto/user/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }
}
