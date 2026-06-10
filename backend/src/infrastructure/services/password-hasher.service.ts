import { IPasswordHasher } from '../../domain/user/user.interface';
import * as bcrypt from 'bcrypt';

export class PasswordHasher implements IPasswordHasher {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
