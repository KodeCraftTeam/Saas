// eslint-disable-next-line prettier/prettier
import { Role, UserStatus } from "./user.enums";

export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public lastName: string,
    public role: Role | null,
    public status: UserStatus,
    private password: string | null,
  ) {}

  public static Create(
    id: string,
    email: string,
    name: string,
    lastName: string,
    role: Role | null,
    status: UserStatus,
    password: string | null,
  ): User {
    return new User(id, email, name, lastName, role, status, password);
  }

  getPassword(): string {
    if (!this.password) throw new Error('Password not set');

    return this.password;
  }
}
