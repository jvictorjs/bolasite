import { slideInAnimation } from './../../../route-animation';

import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-futebol-read-cards',
  templateUrl: './futebol-read-cards.component.html',
  styleUrls: ['./futebol-read-cards.component.css'],
  animations: [slideInAnimation]
})
export class FutebolReadCardsComponent implements OnInit {
  jogos: any = { id: 0, response: { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } } };
  displayedColumns = ['league', 'clock', 'event']

  // STACKOVERFLOW https://stackoverflow.com/questions/37116619/angular-2-setinterval-keep-running-on-other-component
  intervalId: any;

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,) {
    //this.futebolService.showLoadingMessage('Loading events...')
  }

  ngOnInit(): void {

    if (this.jogos.response.botVersion === 0) {
      console.log('this.jogos.response.botVersion === 0, loading events...')
      this.loadEvents()
    }

    this.intervalId = setInterval(() => {
      this.loadEvents();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadEvents(): void {
    this.showLoader1()
    console.log('auto refresh - loading events...');
    this.futebolService.loadEvents().subscribe(jogos => {
      this.jogos = jogos
      this.futebolService.jogos = jogos
      //this.futebolService.showLoadingMessage('Events loaded. ✅') // ✅✔
      this.hideLoader1()
      if (this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length === 0) {
        this.futebolService.showMessage('No live events.')
        // this.futebolService.showMessage('Sem jogos ao vivo no momento.')
      } else {
        for (let event of this.jogos.response.result.inPlayEventsBSF_eventViewInfos) {
          console.log(event.pointsStringedWithFavoriteSymbol)
          event.bolToolTipVisibility = false;
        }
      }
    })
  }

  navigateWithState(): void {
    this.router.navigate(['2992128'], { state: { hello: 'world' } });
  }

  // STACKOVERFLOW https://stackoverflow.com/questions/37252146/angular-2-redirect-on-click
  navigateToEvent(eventId: string) {
    this.router.navigate(['/futebol/event/' + eventId]);
  }


  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  getFlags($code: string) {
    return this.futebolService.getFlags($code);
  }

  getBadgeVisibility(dattPerMinuteValue: Number) {
    return (dattPerMinuteValue >= 1.3) ? false : true;
  }

  switchBolToolTipVisibility(event: any): void {
    console.log(`switchBolToolTipVisibility() to ${!event.bolToolTipVisibility}`)
    event.bolToolTipVisibility = !event.bolToolTipVisibility;
    console.log(event.bolToolTipVisibility)
  }

  getToolTipMsgForEvent(event: any) {
    return this.futebolService.getToolTipMsgForEvent(event);
  }

  getToolTipMsgForEvent_colorSlices(event: any) {
    return this.futebolService.getToolTipMsgForEvent_colorSlices(event)
  }

  
  hideLoader1(): void {
    // Setting display of spinner element to none 
    //document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('loadingEventComponent_ball1').style.display = 'none';
    document.getElementById('loaderBall').style.color = 'red';
    document.getElementById('eventsCardList').style.display = 'inline';
    // document.getElementById('graphs').style.display = 'inline';
    //document.getElementById('eventComponent').style.display = 'inline';
  }

  showLoader1(): void {
    // Setting display of spinner element to inline 
    //document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('loadingEventComponent_ball1').style.display = 'inline';
    //document.getElementById('loaderBall').style.color = 'red';
    document.getElementById('eventsCardList').style.display = 'none';
    //document.getElementById('graphs').style.display = 'none';
    //document.getElementById('eventComponent').style.display = 'none';
  }
}