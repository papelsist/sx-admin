import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-notacxc-create-page',
  templateUrl: './notacxc-create-page.component.html',
  styles: []
})
export class NotacxcCreatePageComponent implements OnInit {

  procesando = false;

  tipoCartera: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotascxcService,
    private dialogService: TdDialogService
  ) { 
    route.data.subscribe( data => {
      this.tipoCartera = data.tipoCartera
      console.log('Route data: ', data);
    });
  }

  ngOnInit() {
  }

  onCancelar() {
    this.router.navigate(['cxc/notas']);
  }

  onSave(nota) {
    console.log('Salvando nota: ', nota);
    this.procesando = true;
    this.service
      .save(nota)
      .delay(2000)
      .finally( ()=> this.procesando = false)
      .catch( error2 =>  this.handelError2(error2))
      .subscribe( 
        res => {
          console.log('Nota persistida: ', res);
        });
  }

  handelError(response) {
    const message = response.error ? response.error.message : 'Error en servidor'
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
  }

  handelError2(response) {
    const message = response.error ? response.error.message : 'Error en servidor'
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return Observable.empty();
  }

}
