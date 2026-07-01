import { Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/location/location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async findAllCities() {
    return this.locationRepository.findAllCities();
  }
}
