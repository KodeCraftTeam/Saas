import { randomInt } from 'node:crypto';
import { IGeneratePassword } from '../../application/interfaces/generate-password.interface';
import { PASSWORD_CONSTANTS } from '../../domain/constants/password.constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratePasswordService implements IGeneratePassword {
  generatePassword(): string {
    const length = randomInt(
      PASSWORD_CONSTANTS.MIN_LENGTH,
      PASSWORD_CONSTANTS.MAX_LENGTH + 1,
    );

    const password = Array.from<string>({ length });

    password[0] = this.getRandomChar(PASSWORD_CONSTANTS.UPPER_CHARS);
    password[1] = this.getRandomChar(PASSWORD_CONSTANTS.NUMBERS);
    password[2] = this.getRandomChar(PASSWORD_CONSTANTS.SPECIAL_CHARACTERS);

    for (let index = 3; index < length; index++) {
      password[index] = this.getRandomChar(PASSWORD_CONSTANTS.ALL_CHARS);
    }

    this.shuffle(password);

    return password.join('');
  }

  private getRandomChar(chars: string): string {
    const index = randomInt(chars.length);
    return chars[index];
  }

  private shuffle(array: string[]): void {
    for (let index = array.length - 1; index > 0; index--) {
      const indexAux = randomInt(index + 1);
      [array[index], array[indexAux]] = [array[indexAux], array[index]];
    }
  }
}
