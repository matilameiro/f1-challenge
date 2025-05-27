import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeMenu(): void {
    this.isCollapsed = true;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
} 