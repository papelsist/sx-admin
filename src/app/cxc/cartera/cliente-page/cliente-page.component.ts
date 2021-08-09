import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdMediaService, TdLayoutManageListComponent,  } from '@covalent/core';
import { TdRotateAnimation } from '@covalent/core/common/animations/rotate/rotate.animation';
import { MatDialog } from '@angular/material';
import { ClienteSelectorComponent } from './cliente-selector.component';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sx-cliente-page',
  templateUrl: './cliente-page.component.html',
  styles: [],
  animations: [
    TdRotateAnimation(),
  ],
})
export class ClientePageComponent implements OnInit {

  cliente: any;
  
  miniNav: boolean = false;

  @ViewChild('manageList') manageList: TdLayoutManageListComponent;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public media: TdMediaService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {

    this.subscription = this.route.data.subscribe( data => {
      if (data) {
        this.cliente = data.cliente;
      }
    });
   }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

  toggleMiniNav(): void {
    this.miniNav = !this.miniNav;
    setTimeout(() => {
      //this.manageList.sidenav._animationStarted.emit()
    });
  }

  // Theme toggle
  get activeTheme(): string {
    return localStorage.getItem('theme');
  }
  theme(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  cambiarCliente() {
    const dialogRef = this.dialog.open(ClienteSelectorComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log('Cliente: ', val.nombre);
        this.router.navigate(['cxc/cliente/', val.id])
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Insert' ) {
    }
    if (event.code === 'F2') {
      this.cambiarCliente();      
    }
  }

}
