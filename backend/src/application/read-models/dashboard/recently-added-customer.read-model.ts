import { Role, UserStatus } from '../../../domain/user/user.enums';

export type RecentlyAddedCustomerReadModel = {
  name: string;
  lastName: string;
  email: string;
  role: Role | null;
  status: UserStatus;
};

export type RecentlyAddedCustomersReadModel = {
  total: number;
  data: RecentlyAddedCustomerReadModel[];
};
