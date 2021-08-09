import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SolicitudDeDepositoService } from 'app/tesoreria/services/solicitudDeDepositoService';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';

@Component({
  selector: 'sx-solicitudes-create-page',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-solicitud-form [cartera]="cartera" flex="80" 
        (cancel)="onCancel($event)"
        (save)="onSave($event)">
      </sx-solicitud-form>
    </div>
  `,
  styles: []
})
export class SolicitudesCreatePageComponent implements OnInit {

  cartera = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SolicitudDeDepositoService,
    private _loadingService: TdLoadingService
  ) { }

  ngOnInit() {
    this.cartera = this.route.snapshot.data.cartera
    
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSave(sol) {
    console.log('Salvando solicitud: ', sol);
    this._loadingService.register('processing');
    this.service.save(sol)
    .finally( () => this._loadingService.resolve('processing'))
    .subscribe(res => {
      console.log('Res: ', res);
      this.router.navigate(['../'], {relativeTo: this.route})
    });
  }

}
