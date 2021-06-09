import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tremdgol-app',
  templateUrl: './tremdgol-app.component.html',
  styleUrls: ['./tremdgol-app.component.css'],
  animations: [slideInAnimation]
})
export class TremdgolAppComponent implements OnInit {

    constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'TremdGol App',
      icon: 'sports_soccer',
      routeUrl: 'tremdgol-app'
    }
  }

  ngOnInit(): void {
  }

}
