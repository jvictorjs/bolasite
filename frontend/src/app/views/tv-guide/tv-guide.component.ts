import { slideInAnimation } from './../../route-animation';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { NavService } from './../../components/template/nav/nav.service';

@Component({
  selector: 'app-tv-guide',
  templateUrl: './tv-guide.component.html',
  styleUrls: ['./tv-guide.component.css'],
  animations: [slideInAnimation]
})
export class TvGuideComponent implements OnInit {

  baseUrl = 'https://script.google.com/macros/s/AKfycbxkbKS7Wb3nNCb5GJD-IAOT_PFxXvF0GjK56UwkE1jaWhbU6sV4BkTkkg/exec?getSchedule=1'

  // products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action']
  json_response: any = {}

  constructor(private http: HttpClient, private headerService: NavService) {
    headerService.headerData = {
      title: 'Jogos na TV',
      icon: 'tv',
      routeUrl: '/tv-guide'
    }
  }

  ngOnInit(): void {
    this.read().subscribe(response => {
      this.json_response = response
      console.log(response)
    })
  }

  read(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }
}



