import { Injectable } from '@nestjs/common';
import {
  CityOption,
  ILocationRepository,
} from '../../../../domain/location/location.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllCities(): Promise<CityOption[]> {
    return this.prisma.city.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
