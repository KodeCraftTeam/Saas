import { Role, UserStatus } from '../../../domain/user/user.enums';

export type ListUsersReadModel = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: UserReadModel[];
};

export type UserReadModel = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  bussinessName: string | null;
  status: UserStatus;
};
