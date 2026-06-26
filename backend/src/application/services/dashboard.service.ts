import { Injectable } from '@nestjs/common';
import { GetDashboardDto } from '../dto/dashboard/get-dashboard.dto';
import { DashboardBusinessesReader } from '../ports/dashboard/dashboard-businesses.reader';
import { DashboardCustomersReader } from '../ports/dashboard/dashboard-customers.reader';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardCustomersReader: DashboardCustomersReader,
    private readonly dashboardBusinessesReader: DashboardBusinessesReader,
  ) {}

  async getDashboard(): Promise<GetDashboardDto> {
    const [
      activeBusinesses,
      registeredCustomers,
      recentlyAddedBusinesses,
      recentlyAddedCustomers,
    ] = await Promise.all([
      this.dashboardBusinessesReader.activeBusinesses(),
      this.dashboardCustomersReader.registeredCustomers(),
      this.dashboardBusinessesReader.recentlyAddedBusinesses(),
      this.dashboardCustomersReader.recentlyAddedCustomers(),
    ]);

    return {
      activeBusinesses,
      registeredCustomers,
      recentlyAddedBusinesses,
      recentlyAddedCustomers,
    };
  }
}
