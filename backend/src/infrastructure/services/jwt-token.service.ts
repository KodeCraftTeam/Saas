import { Injectable } from '@nestjs/common';
import { ITokenService } from '../../application/interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../../application/dto/user/token-payload.dto';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: TokenPayloadDto): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<TokenPayloadDto> {
    return this.jwtService.verifyAsync(token);
  }
}
