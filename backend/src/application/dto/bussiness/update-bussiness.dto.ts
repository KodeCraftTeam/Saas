import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { BussinessType } from '../../../domain/Bussiness/bussiness.enum';

export class UpdateBussinessDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(BussinessType)
  type?: BussinessType;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
