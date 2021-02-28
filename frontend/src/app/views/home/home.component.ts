import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInAnimation]
})
export class HomeComponent implements OnInit {

  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Jogos Ao Vivo',
      icon: 'sports_soccer',
      routeUrl: ''
    }
  }


  ngOnInit(): void {
  }

}
