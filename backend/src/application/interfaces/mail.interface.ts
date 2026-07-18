export interface SendMailParams {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
}

export abstract class IMailService {
  abstract send(params: SendMailParams): Promise<void>;
}
