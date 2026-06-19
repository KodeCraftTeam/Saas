import { BussinessStatus, BussinessType } from './bussiness.enum';

export class Bussiness {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
    public email: string,
    public type: BussinessType,
    public status: BussinessStatus,
    public cityId: string,
  ) {}

  public static Create(
    id: string,
    name: string,
    phone: string,
    email: string,
    type: BussinessType,
    status: BussinessStatus,
    cityId: string,
  ): Bussiness {
    return new Bussiness(id, name, phone, email, type, status, cityId);
  }
}
