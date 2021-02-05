import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../components/template/header/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Sobre',
      icon: 'home',
      routeUrl: ''
    }
  }

  ngOnInit(): void {
  }

}

