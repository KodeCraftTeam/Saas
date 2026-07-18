import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IMailService,
  SendMailParams,
} from '../../application/interfaces/mail.interface';

@Injectable()
export class HttpMailService implements IMailService {
  constructor(private readonly configService: ConfigService) {}

  async send(params: SendMailParams): Promise<void> {
    const mailServiceUrl =
      this.configService.get<string>('MAIL_SERVICE_URL') ||
      'http://localhost:3001';

    await fetch(`${mailServiceUrl}/mail/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  }
}
