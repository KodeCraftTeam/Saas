import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import { ITokenService } from '../interfaces/token.interface';
import { IPasswordHasher } from '../../domain/user/user.interface';
import { TokenPayloadDto } from '../dto/user/token-payload.dto';
import { LoginDto } from '../dto/user/login-user.dto';
import { LoginResponseDto } from '../dto/user/login-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly JwtTokenService: ITokenService,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findUserByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    console.log(user.getPassword());

    const isCorrect = await this.passwordHasher.verifyPassword(
      loginDto.password,
      user.getPassword(),
    );

    const payload: TokenPayloadDto = {
      sub: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
    };

    if (!isCorrect)
      throw new BadRequestException('Email or password incorrect');

    const token = await this.JwtTokenService.sign(payload);

    this.logger.log(`User logged successfully with id: ${user.id}`);
    return { token, name: user.name, lastName: user.lastName, role: user.role };
  }
}
