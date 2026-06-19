import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UserStatus } from '../../domain/user/user.enums';
import {
  IGeneratePassword,
  IPasswordHasher,
} from '../../domain/user/user.interface';
import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly generatePassword: IGeneratePassword,
    private readonly passwordHasher: IPasswordHasher,
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<string> {
    const password = this.generatePassword.generatePassword();

    console.log(password, 'password');

    const passwordHash = await this.passwordHasher.hashPassword(password);

    const emailAlreadyExists = await this.userRepository.findEmailExists(
      userDto.email,
    );

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = User.Create(
      randomUUID(),
      userDto.email,
      userDto.name,
      userDto.lastName,
      userDto.role,
      UserStatus.ACTIVE,
      passwordHash,
    );

    await this.userRepository.create(user);

    this.logger.log(`User created successfully with id: ${user.id}`);
    return user.id;
  }
}
