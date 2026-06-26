import {
  BussinessStatus,
  BussinessType,
} from '../../../domain/Bussiness/bussiness.enum';

export type ListBussinessReadModel = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: BussinessReadModel[];
};

export type BussinessReadModel = {
  id: string;
  name: string;
  BussinessType: BussinessType;
  city: string;
  address: string;
  phone: string;
  email: string;
  bussinessStatus: BussinessStatus;
};
