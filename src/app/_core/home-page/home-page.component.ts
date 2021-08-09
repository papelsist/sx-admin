import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import {Application} from '../models/application';

@Component({
  selector: 'sx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  application$: Observable<Application>;
  toolbarTitle$: Observable<string>;

  constructor(
    private  store: Store<fromRoot.State>
  ) {
    this.application$ = this.store.select(fromRoot.getApplication);
    this.toolbarTitle$ = this.application$.pluck('name');
  }

  ngOnInit() {
  }

}
