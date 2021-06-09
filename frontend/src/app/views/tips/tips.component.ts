import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  
  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'TIPS',
      icon: 'sports_soccer',
      routeUrl: 'tips'
    }
  }

  ngOnInit(): void {
  }

}
