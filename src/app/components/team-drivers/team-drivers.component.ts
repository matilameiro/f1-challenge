import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { F1Service } from '../../services/f1.service';
import { TeamInfo, Driver, TeamInfoResponse } from '../../models/f1.models';

@Component({
  selector: 'app-team-drivers',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzSpinModule,
    NzAvatarModule,
    NzButtonModule
  ],
  templateUrl: './team-drivers.component.html',
  styleUrls: ['./team-drivers.component.scss']
})
export class TeamDriversComponent implements OnInit {
  team: TeamInfo | null = null;
  drivers: Driver[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private f1Service: F1Service
  ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.loadTeamAndDrivers(teamId);
    } else {
      this.loading = false;
    }
  }

  private loadTeamAndDrivers(teamId: string): void {
    this.loading = true;
    this.f1Service.getTeamById(teamId).subscribe({
      next: (response: TeamInfoResponse) => {
        if (response.team && response.team.length > 0) {
          this.team = response.team[0];
          this.loadDrivers(teamId);
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        // TODO: se podria loguear el error en algun servicio.
        this.loading = false;
      }
    });
  }

  private loadDrivers(teamId: string): void {
    this.f1Service.getDriversByTeam(teamId).subscribe({
      next: (response) => {
        this.drivers = response.drivers.map(d => d.driver);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading drivers:', error);
        this.drivers = [];
        this.loading = false;
      }
    });
  }
} 