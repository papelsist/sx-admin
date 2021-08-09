import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-compras-main-page',
  templateUrl: './compras-main-page.component.html',
  styles: [`
    .compras-main-page {
      width: 100%;
      height: 400px;
      background-color: beige;
    }

  `]
})
export class ComprasMainPageComponent implements OnInit {

  navigation: Object[] = [
    {
      path: 'pendientes',
      title: 'Pendientes',
      description: 'Ordenes en transito',
      icon: 'repeat'
    }
  ];

  constructor(
  ) { }

  ngOnInit() {
    // this._titleService.setTitle( 'SX Compras' );
  }
}
