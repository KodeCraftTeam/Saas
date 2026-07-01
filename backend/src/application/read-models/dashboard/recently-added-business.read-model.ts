import {
  BussinessStatus,
  BussinessType,
} from '../../../domain/Bussiness/bussiness.enum';

export type RecentlyAddedBusinessesReadModel = {
  total: number;
  data: RecentlyAddedBusinessReadModel[];
};

export type RecentlyAddedBusinessReadModel = {
  name: string;
  city: string;
  bussinessType: BussinessType;
  status: BussinessStatus;
};
