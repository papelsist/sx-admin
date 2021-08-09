import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';


@Component({
  selector: 'sx-cxc-page',
  templateUrl: './cxc-page.component.html',
  styles: [``]
})
export class CxcPageComponent implements OnInit {

  navigation: Object[] = [];

  cartera: {tipo: string, descripcion: string};

  constructor(
    public media: TdMediaService,
    private route: ActivatedRoute
  ) {
    this.cartera = this.route.snapshot.data.cartera; 
    
  }

  ngOnInit() {
    this.buildNavigation();
  }

  buildNavigation() {
    switch (this.cartera.tipo) {
      case  'CRE': {
        this.creditoNavigation();
        break;
      }
      case 'CON': {
        this.contadoNavigation();
        break;
      }
    }
  }

  creditoNavigation(){
    this.navigation = [
      {
        path: 'notas',
        title: 'Notas de crédito',
        description: 'Bonificaciones y Devoluciones',
        icon: 'repeat'
      },
      {
        path: 'credito',
        title: 'Clientes',
        description: 'Cartera de crédito ',
        icon: 'group'
      },
      {
        path: 'solicitudes',
        title: 'Solicitudes',
        descripcion: 'Autorizaciones de depositos',
        icon: 'check_circle'
      },
      {
        path: 'cobros',
        title: 'Cobros',
        descripcion: 'Cobros registrados',
        icon: 'attach_money'
      },
      {
        path: 'notasDeCargo',
        title: 'Cargos',
        descripcion: 'Notas de cargo',
        icon: 'reply_all'
      }
    ];
  }

  contadoNavigation(){
    this.navigation = [
      {
        path: 'credito',
        title: 'Clientes',
        description: 'Cartera de crédito ',
        icon: 'group'
      },
      {
        path: 'notas',
        title: 'Notas de crédito',
        description: 'Bonificaciones y Devoluciones',
        icon: 'repeat'
      },
      {
        path: 'cobros',
        title: 'Cobros',
        descripcion: 'Cobros registrados',
        icon: 'attach_money'
      },
      {
        path: 'notasDeCargo',
        title: 'Cargos',
        descripcion: 'Notas de cargo',
        icon: 'reply_all'
      }
    ];
  }

}

