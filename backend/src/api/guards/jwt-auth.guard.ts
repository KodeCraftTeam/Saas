import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ITokenService } from '../../application/interfaces/token.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: ITokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.cookies.token) {
        return false;
      }

      const token = request.cookies.token as string;

      const payload = await this.tokenService.verify(token);

      request.user = payload;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
