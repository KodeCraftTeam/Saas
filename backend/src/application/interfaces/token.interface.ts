import { TokenPayloadDto } from '../dto/user/token-payload.dto';

export abstract class ITokenService {
  abstract sign(payload: TokenPayloadDto): Promise<string>;
  abstract verify(token: string): Promise<TokenPayloadDto>;
}
