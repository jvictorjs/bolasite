import { slideInAnimation } from './../../route-animation';
import { Component, OnInit } from '@angular/core';
import { NavService } from './../../components/template/nav/nav.service';

@Component({
  selector: 'app-bolao-catar22',
  templateUrl: './bolao-catar22.component.html',
  styleUrls: ['./bolao-catar22.component.css'],
  animations: [slideInAnimation]
})
export class BolaoCatar22Component implements OnInit {

  
  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Bolão Catar 2022',
      icon: 'sports_soccer',
      routeUrl: 'bolao-catar22'
    }
  }

  ngOnInit(): void {
  }

}
