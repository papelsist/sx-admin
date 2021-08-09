import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SolicitudDeDepositoService } from 'app/tesoreria/services/solicitudDeDepositoService';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { SolicitudDeDeposito } from 'app/tesoreria/model/solicitudDeDeposito';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sx-solicitud-edit',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-solicitud-form [cartera]="cartera" flex="80" [solicitud]="solicitud"
        (cancel)="onCancel($event)"
        (save)="onSave($event)">
      </sx-solicitud-form>
    </div>
  `,
  styles: [``]
})
export class SolicitudEditComponent implements OnInit {

  cartera = '';

  solicitud: SolicitudDeDeposito;

  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SolicitudDeDepositoService,
    private _loadingService: TdLoadingService
  ) {
    this.subscription = this.route.data.subscribe( data => {
      if (data) {
        this.solicitud = data.solicitud;
      }
    });
  }

  ngOnInit() {
    this.cartera = this.route.snapshot.data.cartera;
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onSave(sol) {
    console.log('Actualizando: ', sol);
    this._loadingService.register('processing');
    this.service.update(sol)
    .finally( () => this._loadingService.resolve('processing'))
    .subscribe(res => {
      console.log('Res: ', res);
      this.router.navigate(['../../'], {relativeTo: this.route});
    });
  }

}
