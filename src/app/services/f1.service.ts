import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { 
  Driver, 
  DriverStanding, 
  ConstructorStanding, 
  TeamsResponse, 
  TeamDriversResponse,
  TeamInfoResponse
} from "../models/f1.models"

// TODO: crear modelos separados para cada entidad posible dentro del sistema.
interface DriversResponse {
  api: string;
  url: string;
  total: number;
  limit: number;
  offset: number;
  data: Driver[];
}

interface DriversSearchResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  query: string;
  total: number;
  drivers: Driver[];
}

@Injectable({ providedIn: "root" })
export class F1Service {
  private apiUrl = "https://f1api.dev/api"

  constructor(private http: HttpClient) {}

  getTeams(): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(`${this.apiUrl}/current/teams`)
  }

  getTeamById(id: string): Observable<TeamInfoResponse> {
    return this.http.get<TeamInfoResponse>(`${this.apiUrl}/current/teams/${id}`)
  }

  getDriversByTeam(teamId: string): Observable<TeamDriversResponse> {
    return this.http.get<TeamDriversResponse>(`${this.apiUrl}/current/teams/${teamId}/drivers`)
  }

  getDrivers(): Observable<DriversResponse> {
    return this.http.get<DriversResponse>(`${this.apiUrl}/current/drivers`)
  }

  searchDrivers(params: { year?: number; name?: string; surname?: string }): Observable<DriversResponse> {
    return this.http.get<DriversResponse>(`${this.apiUrl}/current/drivers`, { params: params as any })
  }

  getDriverStandings(year: string): Observable<{ drivers_championship: DriverStanding[] }> {
    return this.http.get<{ drivers_championship: DriverStanding[] }>(`${this.apiUrl}/${year}/drivers-championship`);
  }

  getConstructorStandings(year: string): Observable<{ constructors_championship: ConstructorStanding[] }> {
    return this.http.get<{ constructors_championship: ConstructorStanding[] }>(`${this.apiUrl}/${year}/constructors-championship`);
  }

  searchDriversByName(query: string): Observable<DriversSearchResponse> {
    return this.http.get<DriversSearchResponse>(`${this.apiUrl}/drivers/search`, {
      params: { q: query }
    });
  }
} 