import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-futebol-upcoming',
  templateUrl: './futebol-upcoming.component.html',
  styleUrls: ['./futebol-upcoming.component.css']
})
export class FutebolUpcomingComponent implements OnInit {
  jogos_upcoming: any = { id: 0, response: { botVersion: 0, result: [] } };
  displayedColumns = ['league', 'clock', 'event']

  // STACKOVERFLOW https://stackoverflow.com/questions/37116619/angular-2-setinterval-keep-running-on-other-component
  intervalId: any;

  showUpcomingEvents = false;

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.futebolService.showLoadingMessage('Loading events...')
  }

  ngOnInit(): void {

    if (this.jogos_upcoming.response.botVersion === 0) {
      console.log('this.jogos.response.botVersion === 0, loading events...')
      this.loadUpcomingEvents()
    }

    this.intervalId = setInterval(() => {
      this.loadUpcomingEvents();
    }, 360000);
  }

  switchShowUpcomingEvents(): void {
    this.showUpcomingEvents = !this.showUpcomingEvents;
    console.log(`showUpcomingEvents set to ${this.showUpcomingEvents}`)
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadUpcomingEvents(): void {
    console.log('auto refresh - loading upcoming events...');
    this.futebolService.readUpComingEvents().subscribe(jogos => {
      this.jogos_upcoming = jogos
      this.futebolService.jogos_upcoming = jogos
      console.log(`total loaded upcoming events = ${this.jogos_upcoming.response.result.length}`)
      //this.futebolService.showMessage('Upcoming events loaded. ✅') // ✅✔
      if (this.jogos_upcoming.response.result.length === 0) {
        this.futebolService.showMessage('No upcoming events.')
        // this.futebolService.showMessage('Sem jogos ao vivo no momento.')
      }
    })
  }

  navigateWithState(): void {
    this.router.navigate(['/futebol/event/2992128'], { state: { hello: 'world' } });
  }


  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  getFlags($code: string) {
    return this.futebolService.getFlags($code);
  }
}