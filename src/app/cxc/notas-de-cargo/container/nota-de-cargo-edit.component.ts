import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { TdDialogService } from '@covalent/core';

import { NotadecargoService } from 'app/cxc/services/notadecargo.service';
import { NotaDeCargo } from '../../../_shared/models/notaDeCargo';

@Component({
  selector: 'sx-nota-de-cargo-edit',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-notadecargo-form [nota]="nota" flex
        (cancel)="onCancel($event)"
        (timbrar)="timbrar($event)"
        (save)="onSave($event)">
      </sx-notadecargo-form>
    </div>
  `,
  styles: []
})
export class NotaDeCargoEditComponent implements OnInit {

  cartera = '';

  nota: NotaDeCargo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService,
    private _loadingService: TdLoadingService,
    private dialogService: TdDialogService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.nota = this.route.snapshot.data.nota;
    console.log('Editando nota de cargo: ', this.nota);
  }

  onCancel() {
    this.router.navigate(['../../show', this.nota.id], {relativeTo: this.route});
  }

  onSave(nota) {
    console.log('Actualizando nota de cargo: ', nota);
    this._loadingService.register('processing');
    this.service.update(nota)
    .finally( () => this._loadingService.resolve('processing'))
    .subscribe(res => {
      console.log('Res: ', res);
      // this.nota = res;
      this.router.navigate(['../../show', this.nota.id], {relativeTo: this.route});
      // this.router.navigate([''], {relativeTo: this.route});
    });
  }


  timbrar(nota) {
    if (!nota.cfdi) {
      console.log('Timbrando: ', nota);
      this._loadingService.register('processing');
      this.service.timbrar(nota)
      .catch( error2 => this.handelError2(error2))
      .finally( () => this._loadingService.resolve('processing'))
      .subscribe(res => {
        console.log('Nota timbrada: ', res);
        this.router.navigate(['../../show', this.nota.id], {relativeTo: this.route});
        // this.reload();
      });
    }
  }

  handelError2(response) {
    const message = response.error ? response.error.message : 'Error en servidor';
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return Observable.empty();
  }

  toast(message: string, action: string){
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

}

