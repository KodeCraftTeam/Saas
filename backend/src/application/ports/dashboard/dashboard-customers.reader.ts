import { RecentlyAddedCustomersReadModel } from '../../read-models/dashboard/recently-added-customer.read-model';

export abstract class DashboardCustomersReader {
  abstract registeredCustomers(): Promise<number>;
  abstract recentlyAddedCustomers(): Promise<RecentlyAddedCustomersReadModel>;
}
