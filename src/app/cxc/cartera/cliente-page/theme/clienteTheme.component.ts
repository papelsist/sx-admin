import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-cliente-theme',
  template:`
  <span>
    <button mat-icon-button matTooltip="More" [mat-menu-trigger-for]="more">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu xPosition="before" #more="matMenu">
        <button mat-menu-item *ngIf="activeTheme === 'theme-dark'" (click)="theme('theme-light')">
          <mat-icon>brightness_high</mat-icon>
          <span>Light Mode</span>
        </button>
        <button mat-menu-item *ngIf="activeTheme != 'theme-dark'" (click)="theme('theme-dark')">
          <mat-icon>brightness_low</mat-icon>
          <span>Dark </span>
        </button>
    </mat-menu>
  </span>
  `
})

export class ClienteThemeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

   // Theme toggle
  get activeTheme(): string {
    return localStorage.getItem('theme');
  }

  theme(theme: string): void {
    localStorage.setItem('theme', theme);
  }
}