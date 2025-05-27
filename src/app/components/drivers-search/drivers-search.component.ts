import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { F1Service } from '../../services/f1.service';
import { Driver } from '../../models/f1.models';
import { Subject, debounceTime, distinctUntilChanged, switchMap, EMPTY, catchError, of } from 'rxjs';

@Component({
  selector: 'app-drivers-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzListModule,
    NzAvatarModule,
    NzSpinModule,
    NzEmptyModule
  ],
  templateUrl: './drivers-search.component.html',
  styleUrls: ['./drivers-search.component.scss']
})
export class DriversSearchComponent implements OnInit {
  searchTerm = '';
  drivers: Driver[] = [];
  loading = false;
  private searchSubject = new Subject<string>();

  constructor(private f1Service: F1Service) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          if (term.length >= 4) {
            this.loading = true;
            return this.f1Service.searchDriversByName(term).pipe(
              catchError(error => {
                console.error('Error searching drivers:', error);
                return of({ drivers: [] });
              })
            );
          } else {
            this.drivers = [];
            return EMPTY;
          }
        })
      )
      .subscribe({
        next: (response) => {
          this.drivers = response.drivers || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error in search subscription:', error);
          this.loading = false;
          this.drivers = [];
        }
      });
  }

  ngOnInit(): void {
    // No cargamos todos los pilotos al inicio
  }

  onSearchInput(term: string): void {
    this.searchSubject.next(term);
  }
} 