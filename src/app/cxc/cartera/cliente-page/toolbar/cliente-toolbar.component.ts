import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sx-cliente-toolbar',
  template: `
  <mat-toolbar>
    <mat-icon class="push-left-xs" 
      [matTooltip]="!miniNav ? '' : 'Dashboards'" matTooltipPosition="after">
      dashboard
    </mat-icon>
    <span *ngIf="!miniNav" class="push-left-sm">
      Consultas
    </span>
  </mat-toolbar>
  `
})

export class ClienteToolbarComponent implements OnInit {

  @Input() miniNav;

  constructor() { }

  ngOnInit() { }
}