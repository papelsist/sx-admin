import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sx-cliente-info-page',
  templateUrl: './cliente-info-page.component.html',
  styles: []
})
export class ClienteInfoPageComponent implements OnInit {

  cliente: any;

  constructor(private route: ActivatedRoute) { 
    route.parent.data.subscribe(data => {
      this.cliente = data.cliente;
      console.log('Cliente seleccionado: ', this.cliente);

  });
  }

  ngOnInit() {
  }

}
