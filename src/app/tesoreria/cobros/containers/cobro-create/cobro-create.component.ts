import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TdLoadingService } from '@covalent/core';

import { CobrosService } from '../../../services/cobros.service';
import { Cobro } from '../../../../_shared/models/cobro';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-cobro-create',
  template: `
    <div layout layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-cobro-form flex="80"
        (cancel)="onCancel($event)"
        (save)="onSave($event)" >
      </sx-cobro-form>
    </div>
  `,
  styles: []
})
export class CobroCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CobrosService,
    private _loadingService: TdLoadingService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSave(cobro: Cobro) {
    console.log('Salvando cobro: ', cobro);
    this._loadingService.register('processing');
    this.service.save(cobro)
    .finally( () => this._loadingService.resolve('processing'))
    .catch( response => this.handleError(response))
    .subscribe( (res: any) => {
      console.log('Res: ', res);
      this.router.navigate(['../'], {relativeTo: this.route});
      // this.router.navigate(['../show', res.id], {relativeTo: this.route});
    });
  }

  handleError(error) {
    console.error(error);
    return Observable.empty();
  }

}
