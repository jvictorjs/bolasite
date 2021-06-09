import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-futebol',
  templateUrl: './futebol.component.html',
  styleUrls: ['./futebol.component.css'],
  animations: [slideInAnimation]
})
export class FutebolComponent implements OnInit {

  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Jogos Ao Vivo',
      icon: 'sports_soccer',
      routeUrl: 'futebol'
    }
  }

  ngOnInit(): void {
  }

}
