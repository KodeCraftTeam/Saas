import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BussinessType } from '../../../domain/Bussiness/bussiness.enum';

export class CreateBussinessDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(BussinessType)
  type!: BussinessType;

  @IsString()
  cityId!: string;

  @IsString()
  address!: string;
}
