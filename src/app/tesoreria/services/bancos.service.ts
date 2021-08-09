import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from 'app/_core/services/config.service';
import { Banco } from 'app/_shared/models';

@Injectable()
export class BancosService {
  
  private apiUrl: string //= environment.apiUrl + '/clientes';

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = config.buildApiUrl('tesoreria/bancos');
   }

   get(id: string): Observable<Banco> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Banco>(url)
  }

  list(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.apiUrl)
  }
}

