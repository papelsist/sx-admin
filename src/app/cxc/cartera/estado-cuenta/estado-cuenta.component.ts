import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PeriodoUtilsService } from 'app/_shared/utils/periodo-utils.service';

@Component({
  selector: 'sx-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styles: []
})
export class EstadoCuentaComponent implements OnInit {

  constructor(private periodoUtils: PeriodoUtilsService) { }

  ngOnInit() {
  }

  search(documento) {

  }

  periodo(){
    this.periodoUtils.seleccionarPeriodo().subscribe(val => console.log('Periodo: ', val));
  }

}
