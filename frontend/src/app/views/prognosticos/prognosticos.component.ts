import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-prognosticos',
  templateUrl: './prognosticos.component.html',
  styleUrls: ['./prognosticos.component.css']
})
export class PrognosticosComponent implements OnInit {

  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Prognósticos',
      icon: 'sports_soccer',
      routeUrl: 'prognosticos'
    }
  }

  ngOnInit(): void {
  }

}
