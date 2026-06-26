import { RecentlyAddedBusinessesReadModel } from '../../read-models/dashboard/recently-added-business.read-model';
import { RecentlyAddedCustomersReadModel } from '../../read-models/dashboard/recently-added-customer.read-model';

export class GetDashboardDto {
  activeBusinesses!: number;
  registeredCustomers!: number;
  recentlyAddedBusinesses!: RecentlyAddedBusinessesReadModel;
  recentlyAddedCustomers!: RecentlyAddedCustomersReadModel;
}
