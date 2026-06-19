import { Role } from '../../../domain/user/user.enums';

export type TokenPayloadDto = {
  sub: string;
  name: string;
  lastName: string;
  role: Role;
};
