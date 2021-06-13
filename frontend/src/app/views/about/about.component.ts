import { slideInAnimation } from './../../route-animation';
import { Component, OnInit } from '@angular/core';
import { NavService } from './../../components/template/nav/nav.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideInAnimation]
})
export class AboutComponent implements OnInit {

  constructor(private headerService: NavService) {
    headerService.headerData = {
      title: 'Sobre',
      icon: 'info',
      routeUrl: 'about'
    }
  }

  ngOnInit(): void {
  }

}

