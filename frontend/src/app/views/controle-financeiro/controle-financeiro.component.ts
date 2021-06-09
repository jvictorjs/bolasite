import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controle-financeiro',
  templateUrl: './controle-financeiro.component.html',
  styleUrls: ['./controle-financeiro.component.css']
})
export class ControleFinanceiroComponent implements OnInit {

  
  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Controle Financeiro',
      icon: 'attach_money',
      routeUrl: 'controle-financeiro'
    }
  }

  ngOnInit(): void {
  }

}
