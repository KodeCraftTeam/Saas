import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../domain/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsEnum(Role)
  role!: Role;
}
