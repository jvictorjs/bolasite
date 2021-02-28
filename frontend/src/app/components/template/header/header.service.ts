import { NavData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private _headerData = new BehaviorSubject<NavData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  })

  constructor() { }
  
  get headerData(): NavData{
    return this._headerData.value
  }
  
  set headerData(headerData: NavData){
    this._headerData.next(headerData)
  }
}
