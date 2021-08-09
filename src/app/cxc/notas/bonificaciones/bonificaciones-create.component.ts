import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TdDialogService } from '@covalent/core';

import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';


@Component({
  selector: 'sx-bonificaciones-create',
  template: `
    <div  *tdLoading="'procesando'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-bonificacion-form 
        (save)="onSave($event)"
        (cancelar)="onCancel()"  [cartera]="tipoCartera">
      </sx-bonificacion-form>
    </div>
  `,
  styles: []
})
export class BonificacionesCreateComponent implements OnInit {

  tipoCartera: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotascxcService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService
  ) { 
    route.data.subscribe( data => {
      this.tipoCartera = data.tipoCartera
      console.log('Route data: ', data);
    });
  }

  ngOnInit() {
  }

  onCancel(){
    this.router.navigate(['cxc/notas/bonificaciones'])
  }

  onSave(nota) {
    console.log('Salvando nota: ', nota);
    
    this.loadingService.register('procesando');
    this.service
      .save(nota)
      // .delay(2000)
      .finally( ()=> this.loadingService.resolve('procesando'))
      .catch( error2 =>  this.handelError2(error2))
      .subscribe( 
        (res: any) => {
          console.log('Nota persistida: ', res);
          this.router.navigate(['cxc/notas/bonificaciones/show', res.id])
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
