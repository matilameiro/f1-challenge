import { Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { DriversSearchComponent } from './components/drivers-search/drivers-search.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamDriversComponent } from './components/team-drivers/team-drivers.component';

export const routes: Routes = [
  { path: '', component: TeamsComponent },
  { path: 'teams/:id/drivers', component: TeamDriversComponent },
  { path: 'drivers', component: DriversSearchComponent },
  { path: 'standings', component: StandingsComponent },
  { path: '**', redirectTo: '' }
];
