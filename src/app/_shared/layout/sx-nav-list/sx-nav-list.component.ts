import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sx-nav-list',
  templateUrl: './sx-nav-list.component.html',
  styles: []
})
export class SxNavListComponent implements OnInit, AfterViewInit {

  @Input() navigation: Object[] = [];
  @Input() sectionTitle = 'Titulo';
  @Input() color = 'primary';
  @Input() navigationRoute = '/';

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._titleService.setTitle(this.sectionTitle);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    // this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    // this._changeDetectorRef.detectChanges();
  }
}
