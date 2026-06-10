export abstract class IGeneratePassword {
  abstract generatePassword(): string;
}

export abstract class IPasswordHasher {
  abstract hashPassword(password: string): Promise<string>;
  abstract verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
