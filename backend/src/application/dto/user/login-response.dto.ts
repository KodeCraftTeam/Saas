import { Role } from '../../../domain/user/user.enums';

export class LoginResponseDto {
  token?: string;
  name!: string;
  lastName!: string;
  role!: Role;
}
