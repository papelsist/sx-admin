import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { NotaDeCargo } from '../../../_shared/models/notaDeCargo';
import { NotadecargoService } from '../../services/notadecargo.service';

@Injectable()
export class NotadecargoResolver implements Resolve<NotaDeCargo> {

  constructor(private service: NotadecargoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<NotaDeCargo> {
    return this.service.get(route.paramMap.get('id'));
  }
}
