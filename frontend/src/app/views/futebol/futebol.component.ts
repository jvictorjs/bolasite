import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-futebol',
  templateUrl: './futebol.component.html',
  styleUrls: ['./futebol.component.css']
})
export class FutebolComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Jogos de Futebol Ao Vivo',
      icon: 'sports_soccer',
      routeUrl: ''
    }
  }

  ngOnInit(): void {
  }

}
