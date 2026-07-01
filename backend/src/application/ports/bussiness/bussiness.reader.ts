import { ListBussinessReadModel, BussinessReadModel } from '../../read-models/bussiness/list-bussiness.read-model';

export abstract class BussinessReader {
  abstract listBussiness(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListBussinessReadModel>;

  abstract findBussinessById(id: string): Promise<BussinessReadModel | null>;
}
