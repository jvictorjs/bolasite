import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../components/template/header/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  'https://script.google.com/macros/s/AKfycbxkbKS7Wb3nNCb5GJD-IAOT_PFxXvF0GjK56UwkE1jaWhbU6sV4BkTkkg/exec?getSchedule=1'

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Sobre',
      icon: 'home',
      routeUrl: 'about'
    }
  }

  ngOnInit(): void {
  }

}

