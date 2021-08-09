import { Component, OnInit, Input } from '@angular/core';
import {Application} from '../../models/application';

@Component({
  selector: 'sx-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
