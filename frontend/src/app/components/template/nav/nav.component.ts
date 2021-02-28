import { slideInAnimation } from './../../../route-animation';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavService } from './nav.service'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({  // DECORATOR é o @
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [slideInAnimation]
})
export class NavComponent implements OnInit {

  events: string[] = [];
  opened: boolean = true;

  ngOnInit(): void {
    if (this.mobileQuery.matches) {
      this.opened = false;
    }
  }




  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private NavService: NavService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  ifMobileAndClosesSideNav(): void {
    if (this.mobileQuery.matches) {
      this.opened = false;
    }
    console.log('clicou ')
    console.log('this.mobileQuery.matches = ' + this.mobileQuery.matches)
    console.log('this.opened = ' + this.opened)
  }


  get title(): string {
    if (this.mobileQuery.matches) {
      this.opened = false;
    } else {
      this.opened = true;
    }
    return this.NavService.headerData.title
  }

  get icon(): string {
    return this.NavService.headerData.icon
  }

  get routeUrl(): string {
    return this.NavService.headerData.routeUrl
  }
}