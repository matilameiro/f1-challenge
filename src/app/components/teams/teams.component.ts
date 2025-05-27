import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { F1Service } from '../../services/f1.service';
import { TeamList } from '../../models/f1.models';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule, NzCardModule, NzButtonModule, NzSpinModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: TeamList[] = [];
  loading = true;
  currentYear = new Date().getFullYear();

  constructor(private f1Service: F1Service) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  private loadTeams(): void {
    this.f1Service.getTeams().subscribe({
      next: (response) => {
        this.teams = response.teams;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading teams:', error);
        this.loading = false;
      }
    });
  }
}