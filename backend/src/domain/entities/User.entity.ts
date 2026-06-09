// eslint-disable-next-line prettier/prettier
import { Role, UserStatus } from "../enums";

export class User {
  constructor(
    public id: string,
    public email: string,
    private readonly password: string,
    public name: string,
    public lastName: string,
    public role: Role,
    public status: UserStatus,
  ) {}

  public static Create(
    id: string,
    email: string,
    password: string,
    name: string,
    lastName: string,
    role: Role,
    status: UserStatus,
  ): User {
    return new User(id, email, password, name, lastName, role, status);
  }

  getPassword(): string {
    return this.password;
  }
}
