import { ListUsersReadModel } from '../../read-models/users/list-users.read-model';

export abstract class UsersReader {
  abstract listUsers(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<ListUsersReadModel>;
}
