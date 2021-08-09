import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { ConfigService } from 'app/_core/services/config.service';
import { Cliente, Sucursal } from 'app/_shared/models';


@Injectable()
export class ClienteService {

  private apiUrl: string //= environment.apiUrl + '/clientes';
  private sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = config.buildApiUrl('clientes');
   }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url)
  }

  list(term: string = '%'): Observable<Cliente[]> {
    const params = new HttpParams()
      .set('term', term);
    return this.http.get<Cliente[]>(this.apiUrl, {params: params})
  }

  busarClientes(filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    return this.http.get<Cliente[]>(this.apiUrl, {params: params}).shareReplay();
  }

  save(com: Cliente) {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.post(this.apiUrl, com, {params: params});
  }

  update(com: Cliente) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

