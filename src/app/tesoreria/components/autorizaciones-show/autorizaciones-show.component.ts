import { Component, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TdDialogService } from '@covalent/core';

import { SolicitudDeDeposito } from '../../model/solicitudDeDeposito';
import { SolicitudDeDepositoService } from '../../services/solicitudDeDepositoService';


@Component({
  selector: 'sx-autorizaciones-show',
  templateUrl: './autorizaciones-show.component.html',
  styles: [``]
})
export class AutorizacionesShowComponent implements OnInit {

  solicitud$: Observable<SolicitudDeDeposito>;

  form: FormGroup;

  procesando = false;

  sol: SolicitudDeDeposito;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: SolicitudDeDepositoService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      comentario: ['', Validators.required],
      motivo: [null],
      tipo: ['RECHASADO'],
      aceptaro: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.procesando = true;
    this.solicitud$ = this.route.paramMap.switchMap( params => {
      return this.service
        .get(params.get('id'))
        .delay(200)
        .do(() => this.procesando = true)
        .do( sol => this.sol = sol)
        .catch( error => {
          console.log( 'Error: ', error);
          return Observable.of(error);
        })
        .finally(() => this.procesando = false);
    });
  }

  autorizar() {
    this._dialogService.openConfirm({
      message: 'Autorizar solicitud',
      viewContainerRef: this._viewContainerRef,
      title: 'Autorización de deposito',
      cancelButton: 'Cancelar',
      acceptButton: 'Autorizar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doAutorizar(this.sol);
      }
    });
  }

  rechazar() {
    this._dialogService.openPrompt({
      message: 'Motivo',
      viewContainerRef: this._viewContainerRef,
      title: 'Rechazar solicitud de deposito',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.doRechazar(this.sol, newValue);
      }
    });
  }

  doAutorizar(sol) {
    sol.comentario = null;
    this.service.autorizar(sol)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
      .catch(error2 => Observable.of(error2))
      .subscribe( res => {
        this.router.navigate(['/tesoreria/autorizaciones']);
      });
  }

  doRechazar(sol: SolicitudDeDeposito, comentario: string) {
    sol.comentario = comentario;
    console.log('Rechazando solicitud: ', comentario);
    this.service.update(sol)
      .do( () => this.procesando = true)
      .finally( () => this.procesando = false)
      .catch(error2 => Observable.of(error2))
      .subscribe( res => {
        console.log('Sol rechazada: ', res)
        this.router.navigate(['/tesoreria/autorizaciones']);
      });
  }


}
