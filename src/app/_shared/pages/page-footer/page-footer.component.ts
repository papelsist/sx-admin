import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/_shared/models/user';

@Component({
  selector: 'sx-page-footer',
  template: `
    <div layout="row" layout-align="start center" >
      <span class="md-caption" matTooltip="Luxsoft México">Copyright &copy; 2017 Luxsoft Mex. All rights reserved</span>
      <span flex></span>
      <span matTooltip="API: {{apiUrl}}" mdTooltipPosition="left">Usuario: {{(user$ | async).username}}</span>
    </div>

  `,
  styles: []
})
export class PageFooterComponent implements OnInit {

  user$: Observable<User>;

  apiUrl = 'localhost';

  constructor() { }

  ngOnInit() {
    this.user$ = Observable.of(new User('admin', []));
  }

}
