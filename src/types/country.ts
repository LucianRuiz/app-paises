export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
  population: number;
  capital?: string[];
}

export interface CountryFilters {
  search: string;
  region: string;
  minPopulation: number;
  maxPopulation: number;
}

export interface FavoritesState {
  countries: string[]; // Array de cca3 codes
}
