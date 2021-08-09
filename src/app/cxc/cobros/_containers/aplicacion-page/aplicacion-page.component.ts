import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cobro } from 'app/_shared/models/cobro';
import { Observable } from 'rxjs/Observable';
import { CobrosService } from '../../../../tesoreria/services/cobros.service';

@Component({
  selector: 'sx-aplicacion-page',
  templateUrl: './aplicacion-page.component.html',
  styles: []
})
export class AplicacionPageComponent implements OnInit {

  cobro$: Observable<Cobro>;

  constructor(private route: ActivatedRoute, private service: CobrosService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe( map => console.log(map));

    this.cobro$ = this.route.paramMap
      .switchMap( params => this.service.get(params.get('id')));

  }

  agregarAplicacion() {
  }

}
