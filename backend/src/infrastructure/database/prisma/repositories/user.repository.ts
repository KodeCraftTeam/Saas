import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/user/user.entity';
import { IUserRepository } from '../../../../domain/user/user.repository';
import { PrismaService } from '../prisma.service';
import { Role, UserStatus } from '../../../../domain/user/user.enums';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const userModel = await this.prisma.userModel.findFirst({
      where: { email: email },
    });

    if (!userModel) return null;

    return User.Create(
      userModel.id,
      userModel.email,
      userModel.password,
      userModel.name,
      userModel.lastName,
      userModel.role as Role,
      userModel.status as UserStatus,
    );
  }

  async findEmailExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.prisma.userModel.findFirst({
      where: { email: email },
    });

    return emailAlreadyExists !== null;
  }

  async create(user: User): Promise<void> {
    await this.prisma.userModel.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        password: user.getPassword(),
      },
    });
  }

  async;
}
