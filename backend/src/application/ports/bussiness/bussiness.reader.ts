import { ListBussinessReadModel } from '../../read-models/bussiness/list-bussiness.read-model';

export abstract class BussinessReader {
  abstract listBussiness(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListBussinessReadModel>;
}
