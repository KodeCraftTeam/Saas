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
import { UsersReader } from '../ports/users/users.reader';
import { ListUsersReadModel } from '../read-models/users/list-users.read-model';
import { IMailService } from '../interfaces/mail.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly generatePassword: IGeneratePassword,
    private readonly passwordHasher: IPasswordHasher,
    private readonly userRepository: IUserRepository,
    private readonly usersReader: UsersReader,
    private readonly mailService: IMailService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<string> {
    const password = this.generatePassword.generatePassword();

    const passwordHash = await this.passwordHasher.hashPassword(password);

    console.log(password);

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

    // try {
    //   await this.mailService.send({
    //     to: userDto.email,
    //     subject: '¡Bienvenido a la Plataforma!',
    //     template: 'business-welcome',
    //     context: {
    //       businessName: userDto.name,
    //       email: userDto.email,
    //       password: password,
    //       login_url: this.configService.get<string>('LOGIN_URL'),
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error sending welcome mail:', error);
    // }

    await this.userRepository.create(user);

    this.logger.log(`User created successfully with id: ${user.id}`);
    return user.id;
  }

  async listUsers(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListUsersReadModel> {
    return await this.usersReader.listUsers(search, page, limit);
  }
}
