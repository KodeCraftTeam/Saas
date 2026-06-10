import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/user/user.entity';
import { IUserRepository } from '../../../../domain/user/user.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEmailExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: { email: email },
    });

    return emailAlreadyExists !== null;
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
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
}
