export type CityOption = {
  id: string;
  name: string;
};

export abstract class ILocationRepository {
  abstract findAllCities(): Promise<CityOption[]>;
}
