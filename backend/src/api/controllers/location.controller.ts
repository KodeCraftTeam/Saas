import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from '../../application/services/location.service';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly LocationService: LocationService) {}

  @Get('cities')
  async findAllCities(): Promise<any> {
    return await this.LocationService.findAllCities();
  }
}
