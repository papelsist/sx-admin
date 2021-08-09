import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SolicitudDeDepositoService } from '../../services/solicitudDeDepositoService';
import { SolicitudDeDeposito } from '../../model/solicitudDeDeposito';
import { MatDialog, MatList } from '@angular/material';
import { AutorizacionesShowComponent } from '../../components/autorizaciones-show/autorizaciones-show.component';
import { AutorizacionFormComponent } from '../../components/autorizacion-form/autorizacion-form.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  TdVirtualScrollContainerComponent,
  TdDialogService
} from '@covalent/core';

@Component({
  selector: 'sx-autorizacion-depositos-page',
  templateUrl: './autorizacion-depositos-page.component.html',
  styles: [
    `
    .page {
      background-color: lightgray;
      height: 100%;
    }
  `
  ]
})
export class AutorizacionDepositosPageComponent implements OnInit, OnDestroy {
  pendientes$: Observable<SolicitudDeDeposito[]>;

  pendientes: SolicitudDeDeposito[];

  procesando = false;

  _watch = true;
  _dialogOpened = false;
  reload$ = new Subject<boolean>();

  destroy$ = new Subject<boolean>();

  @ViewChild('virtualScroll') list: TdVirtualScrollContainerComponent;

  constructor(
    private service: SolicitudDeDepositoService,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {
    this.reload$
      .takeUntil(this.destroy$)
      .subscribe(val => console.log('Inicar reloadig: ', val));
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.watch = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  load() {
    // console.log('Cargando solicitudes pendientes');
    this.service
      .pendientes()
      .do(() => (this.procesando = true))
      .shareReplay()
      .delay(1000)
      .finally(() => (this.procesando = false))
      .takeUntil(this.destroy$)
      .subscribe(sols => {
        this.pendientes = sols;
        this.autorizarNext();
      });
  }

  search(term: string) {
    console.log('Buscando: ', term);
  }

  autorizarNext() {
    setTimeout(() => {
      if (this.pendientes.length > 0 && this.watch && !this._dialogOpened) {
        this.autorizar(this.pendientes[0], 0);
      } else if (this.watch && !this._dialogOpened) {
        this.load();
      }
    }, 4000);
  }

  autorizar(sol: SolicitudDeDeposito, index: number) {
    this.service.buscarDupicada(sol.id).subscribe(val => {
      console.log('Duplicada: ', val);
      if (val.folio) {
        this.doAutorizar(sol, index, val);
      } else {
        this.doAutorizar(sol, index);
      }
    });
  }

  doAutorizar(
    sol: SolicitudDeDeposito,
    index: number,
    duplicada: SolicitudDeDeposito = null
  ) {
    const dialogRef = this.dialog.open(AutorizacionFormComponent, {
      width: '650px',
      data: { solicitud: sol, duplicada: duplicada }
    });
    dialogRef.afterOpen().subscribe(() => (this._dialogOpened = true));
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        if (val.posponer) {
          this.service.posponer(sol).subscribe(res => {
            // console.log('Solicitud pospuesta: ', res);
            this.pendientes.splice(index, 1);
            this.list.refresh();
          });
        } else if (val.autorizar === true) {
          console.log(' Autorizando: ', sol);
          this.service.autorizar(sol).subscribe(res => {
            this.pendientes.splice(index, 1);
            this.list.refresh();
          });
        } else if (val.autorizar === false) {
          console.log(' Rechazar: ', sol);
          this.service.rechazar(sol, val.comentario).subscribe(res => {
            this.pendientes.splice(index, 1);
            this.list.refresh();
          });
        } else if (val.cancelar === true) {
          console.log(' Cancelar: ', sol);
          this.service.cancelar(sol, val.comentario).subscribe(res => {
            this.pendientes.splice(index, 1);
            this.list.refresh();
          });
        }
      }
      this._dialogOpened = false;
      this.autorizarNext();
    });
  }

  set watch(val) {
    this._watch = val;
    this.autorizarNext();
  }

  get watch() {
    return this._watch;
  }
}
