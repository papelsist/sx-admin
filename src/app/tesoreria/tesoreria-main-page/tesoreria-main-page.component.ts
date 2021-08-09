import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { CobrosService } from '../services/cobros.service';
import { RepComisionTarjetasComponent } from '../components/rep-comision-tarjetas/rep-comision-tarjetas.component';

@Component({
  selector: 'sx-tesoreria-main-page',
  templateUrl: './tesoreria-main-page.component.html',
  styles: [
    `
    .tesoreria-page {
      width: 100%;
      height: 100%;
      background-color: beige;
    }

  `
  ]
})
export class TesoreriaMainPageComponent implements OnInit {
  navigation: Object[] = [
    {
      path: 'autorizaciones',
      title: 'Pendientes',
      description: 'Depósitos por autorizar',
      icon: 'repeat'
    },
    {
      path: 'autorizados',
      title: 'Autorizados',
      description: 'Depositos autorizados',
      icon: 'check'
    },
    {
      path: 'transito',
      title: 'Transito',
      description: 'Depositos en transito',
      icon: 'swap_horiz'
    },
    {
      path: 'canceladas',
      title: 'Canceladas',
      descripcion: 'Solicitudes canceladas',
      icon: 'cancel'
    },
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'file_download'
    }
  ];

  sucursales: any[];

  constructor(
    public media: TdMediaService,
    private dialog: MatDialog,
    private service: CobrosService
  ) {}

  ngOnInit() {
    this.service.sucursales().subscribe(data => (this.sucursales = data));
  }

  comisionesTarjeta() {
    const dialogRef = this.dialog.open(RepComisionTarjetasComponent, {
      data: { sucursales: this.sucursales }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service
          .reporteDeComisionesTarjeta(res.sucursal, res.fecha)
          .subscribe(
            res => {
              const blob = new Blob([res], {
                type: 'application/pdf'
              });
              const fileURL = window.URL.createObjectURL(blob);
              window.open(fileURL, '_blank');
            },
            error2 => console.log(error2)
          );
      }
    });
  }
}
