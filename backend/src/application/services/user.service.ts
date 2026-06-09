import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User.entity';
import { randomUUID } from 'node:crypto';
import { IGeneratePassword } from '../interfaces/generate-password.interface';
import { UserStatus } from '../../domain/enums';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(IGeneratePassword)
    private readonly generatePassword: IGeneratePassword,
    private readonly prisma: PrismaService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const password = this.generatePassword.generatePassword();

    const user = User.Create(
      randomUUID(),
      userDto.email,
      password,
      userDto.name,
      userDto.lastName,
      userDto.role,
      UserStatus.ACTIVE,
    );

    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        password: user.getPassword(), // ← Necesitas un getter público
      },
    });

    return user;
  }
}
