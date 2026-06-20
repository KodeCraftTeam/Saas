import { Bussiness } from './bussiness.entity';

export abstract class IBussinessRepository {
  abstract create(business: Bussiness): Promise<void>;
  // abstract findById(id: string): Promise<Bussiness | null>;
  // abstract findAll(): Promise<Bussiness[]>;
  // abstract update(business: Bussiness): Promise<void>;
  // abstract changeStatus(id: string, status: string): Promise<void>;
}
