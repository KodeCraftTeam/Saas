import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import { ITokenService } from '../interfaces/token.interface';
import { IPasswordHasher } from '../../domain/user/user.interface';
import { TokenPayloadDto } from '../dto/user/token-payload.dto';
import { LoginDto } from '../dto/user/login-user.dto';
import { Role, UserStatus } from '../../domain/user/user.enums';
import { User } from '../../domain/user/user.entity';
import { randomUUID } from 'crypto';

type LoginResult = {
  token: string;
  name: string;
  lastName: string;
  role: Role;
};

type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly JwtTokenService: ITokenService,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResult> {
    const user = await this.userRepository.findUserByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const isCorrect = await this.passwordHasher.verifyPassword(
      loginDto.password,
      user.getPassword(),
    );

    const payload: TokenPayloadDto = {
      sub: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role!,
    };

    if (!isCorrect)
      throw new BadRequestException('Email or password incorrect');

    const token = await this.JwtTokenService.sign(payload);

    this.logger.log(`User logged successfully with id: ${user.id}`);
    return {
      token,
      name: user.name,
      lastName: user.lastName,
      role: user.role!,
    };
  }

  async loginGoogle(code: string): Promise<LoginResult> {
    const params = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const responseGoogle: GoogleTokenResponse = await response.json();

    console.log(responseGoogle);

    const payloadToken: any = JSON.parse(
      Buffer.from(
        responseGoogle.id_token.split('.')[1],
        'base64url',
      ).toString(),
    );

    let user = await this.userRepository.findUserByEmail(
      payloadToken.email as string,
    );

    if (!user) {
      user = User.Create(
        randomUUID(),
        payloadToken.email as string,
        payloadToken.name as string,
        payloadToken.lastName as string,
        Role.BUSSINESS_MANAGER,
        UserStatus.ACTIVE,
        null,
      );

      await this.userRepository.create(user);
    }

    const payload: TokenPayloadDto = {
      sub: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role!,
    };

    const token = await this.JwtTokenService.sign(payload);

    this.logger.log(`User logged successfully with id: ${user.id}`);
    return {
      token,
      name: user.name,
      lastName: user.lastName,
      role: user.role!,
    };
  }
}
