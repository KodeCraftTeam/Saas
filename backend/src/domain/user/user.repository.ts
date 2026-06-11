import { User } from './user.entity';

export abstract class IUserRepository {
  abstract findEmailExists(email: string): Promise<boolean>;
  abstract create(user: User): Promise<void>;
  abstract findUserByEmail(email: string): Promise<User | null>;
}
