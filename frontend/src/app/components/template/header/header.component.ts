import { NavService } from './header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private NavService: NavService) { }

  ngOnInit(): void {
  }

  get title(): string{
    return this.NavService.headerData.title
  }

  get icon(): string{
    return this.NavService.headerData.icon
  }

  get routeUrl(): string{
    return this.NavService.headerData.routeUrl
  }
}
