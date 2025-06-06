export interface TeamList {
  teamId: string;
  teamName: string;
  teamNationality: string;
  firstAppeareance: number;
  constructorsChampionships: number | null;
  driversChampionships: number | null;
  url: string;
}

export interface TeamsResponse {
  api: string;
  url: string;
  limit: number;
  total: number;
  season: string;
  championshipId: string;
  teams: TeamList[];
}

export interface TeamDetail {
  teamId: string;
  teamName: string;
  country: string;
  firstAppearance: number;
  constructorsChampionships: number | null;
  driversChampionships: number | null;
  url: string;
}

export interface TeamDriversResponse {
  api: string;
  url: string;
  limit: number;
  total: number;
  season: string;
  championshipId: string;
  team: TeamDetail;
  drivers: Array<{ driver: Driver }>;
}

// Interfaces para pilotos
export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
  points?: number;
  position?: number;
  wins?: number;
}

export interface DriverStanding {
  classificationId: number;
  driverId: string;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  driver: Driver;
  team: TeamDetail;
}

export interface ConstructorStanding {
  classificationId: number;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  team: TeamDetail;
}

export interface DriversResponse {
  api: string;
  url: string;
  total: number;
  limit: number;
  offset: number;
  data: Driver[];
}

export interface DriversSearchResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  query: string;
  total: number;
  drivers: Driver[];
}

export interface TeamInfo {
  teamId: string;
  teamName: string;
  teamNationality: string;
  firstAppeareance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface TeamInfoResponse {
  api: string;
  season: number;
  team: TeamInfo[];
  total: number;
  url: string;
}
