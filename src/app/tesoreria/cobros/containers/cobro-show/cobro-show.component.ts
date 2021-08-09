import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';

import { Cobro } from 'app/_shared/models/cobro';

import { CobrosService } from '../../../services/cobros.service';

@Component({
  selector: 'sx-cobro-show',
  templateUrl: './cobro-show.component.html',
  styles: []
})
export class CobroShowComponent implements OnInit {

  cobro: Cobro;

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private service: CobrosService,
    private loadingService: TdLoadingService,
    private router: Router
  ) { }

  ngOnInit() {

    this.cobro = this.route.snapshot.data.cobro;
  }

  cancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  delete() {
    this.dialogService.openConfirm({
      title: 'Eliminar cobro? ',
      message: 'Total: ' + this.cobro.importe,
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar'
    }).afterClosed().subscribe( val => {
      if (val) {
        this.loadingService.register('processing');
        this.service.delete(this.cobro.id)
          .finally( () => this.loadingService.resolve('processing'))
          .subscribe(data => {
            this.router.navigate(['../../'], {relativeTo: this.route});
          });
      }
    });
  }

}
