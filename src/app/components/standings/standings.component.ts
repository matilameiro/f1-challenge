import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { F1Service } from '../../services/f1.service';
import { DriverStanding, ConstructorStanding } from '../../models/f1.models';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule
  ],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  standingsForm: FormGroup;
  standings: (DriverStanding | ConstructorStanding)[] = [];
  loading = false;
  years: number[] = [];
  selectedType: 'drivers' | 'constructors' = 'drivers';

  constructor(
    private fb: FormBuilder,
    private f1Service: F1Service
  ) {
    this.standingsForm = this.fb.group({
      year: ['', Validators.required],
      type: ['drivers', Validators.required]
    });
  }

  ngOnInit(): void {
    // Generate last 10 years
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    this.standingsForm.patchValue({ year: currentYear.toString() });
  }

  getStandingName(standing: DriverStanding | ConstructorStanding): string {
    if (this.selectedType === 'drivers') {
      const driverStanding = standing as DriverStanding;
      return `${driverStanding.driver.name} ${driverStanding.driver.surname}`;
    } else {
      const constructorStanding = standing as ConstructorStanding;
      return constructorStanding.team.teamName;
    }
  }

  getTeamName(standing: DriverStanding | ConstructorStanding): string {
    if (this.selectedType === 'drivers') {
      const driverStanding = standing as DriverStanding;
      return driverStanding.team.teamName;
    }
    return '';
  }

  loadStandings(): void {
    if (this.standingsForm.valid) {
      this.loading = true;
      const { year, type } = this.standingsForm.value;
      this.selectedType = type;

      if (type === 'drivers') {
        this.f1Service.getDriverStandings(year).subscribe({
          next: (response) => {
            this.standings = response.drivers_championship.slice(0, 5);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading driver standings:', error);
            this.loading = false;
          }
        });
      } else {
        this.f1Service.getConstructorStandings(year).subscribe({
          next: (response) => {
            this.standings = response.constructors_championship.slice(0, 5);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading constructor standings:', error);
            this.loading = false;
          }
        });
      }
    }
  }
} 