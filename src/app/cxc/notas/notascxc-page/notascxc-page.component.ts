import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotascxcService } from 'app/cxc/services/notascxc.service';

@Component({
  selector: 'sx-notascxc-page',
  templateUrl: './notascxc-page.component.html',
  styles:[]
})
export class NotascxcPageComponent implements OnInit {

  filteredData = [];

  cartera

  constructor(
    private service: NotascxcService,
    private route: ActivatedRoute
  ) {
    this.cartera = this.route.parent.snapshot.data.cartera;
  }

  ngOnInit() {
    // this.service.list()
    // .subscribe( notas => this.filteredData = notas);
  }
  

  search(term) {
    
  }


}
