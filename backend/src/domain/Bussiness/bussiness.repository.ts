import { Bussiness } from './bussiness.entity';

export abstract class IBussinessRepository {
  abstract create(bussiness: Bussiness): Promise<void>;
  abstract findEmailExists(email: string): Promise<boolean>;
  abstract findById(id: string): Promise<Bussiness | null>;
  abstract update(bussiness: Bussiness): Promise<void>;
}
