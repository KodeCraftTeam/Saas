import { RecentlyAddedBusinessesReadModel } from '../../read-models/dashboard/recently-added-business.read-model';

export abstract class DashboardBusinessesReader {
  abstract activeBusinesses(): Promise<number>;
  abstract recentlyAddedBusinesses(): Promise<RecentlyAddedBusinessesReadModel>;
}
