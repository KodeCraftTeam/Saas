import { Controller, Get } from '@nestjs/common';
import { LocationService } from '../../application/services/location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly LocationService: LocationService) {}

  @Get('cities')
  async findAllCities(): Promise<any> {
    return await this.LocationService.findAllCities();
  }
}
