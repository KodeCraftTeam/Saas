import { Bussiness } from './bussiness.entity';

export abstract class IBussinessRepository {
  abstract create(bussiness: Bussiness): Promise<void>;
  abstract findEmailExists(email: string): Promise<boolean>;
}
