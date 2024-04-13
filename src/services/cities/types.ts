export type City = {
  id: number;
  cityName: string;
  country: string;
  numVisits: number;
  population: number;
  numHotels: number;
  certifications: number;
};

export type InputCreateCity = {
  id: number;
  cityName: string;
  country: string;
  numVisits: number;
  population: number;
  numHotels: number;
  certifications: number;
};

export type InputUpdateCity = {
  // id: number;
  cityName: string;
  country: string;
  numVisits: number;
  population: number;
  numHotels: number;
  certifications: number;
};