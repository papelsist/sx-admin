import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { SolicitudDeDepositoService } from 'app/tesoreria/services/solicitudDeDepositoService';
import { SolicitudDeDeposito } from 'app/tesoreria/model/solicitudDeDeposito';


@Injectable()
export class SolicitudResolver implements Resolve<SolicitudDeDeposito> {

  constructor(private service: SolicitudDeDepositoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SolicitudDeDeposito> {
    return this.service.get(route.paramMap.get('id'));
  }
}