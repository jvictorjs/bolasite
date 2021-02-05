import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-futebol-event-read',
  templateUrl: './futebol-event-read.component.html',
  styleUrls: ['./futebol-event-read.component.css']
})
export class FutebolEventReadComponent implements OnInit {

  jogos: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };
  event: any = { id: 0, league: { id: 0, name: '', cc: '' }, }
  eventId = 0;

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

  }

  navigationGoBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.futebolService.showLoadingMessage('Loading event...')
    const id = +this.route.snapshot.paramMap.get('id')
    this.eventId = id;
    this.showLoader()
    this.route.data.subscribe(data => {
      console.log('data = ' + JSON.stringify(data))
    })
    /*
    if (this.jogos.botVersion === 0) {
      console.log('this.jogos.botVersion === 0, coletando jogos...')
      this.futebolService.read().subscribe(jogos => {
        this.jogos = jogos
        this.futebolService.jogos = jogos
        this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; })=>x.id == this.eventId)
        this.futebolService.showMessage('Jogos carregados e evento atribuido')
      })
    }
    */

    /*
    this.futebolService.readById(id).subscribe(event => {
      console.log('chegou evento = ' + JSON.stringify(event))
      this.futebolService.event = event
      this.event = this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
      this.futebolService.showMessage('Event loaded.')
      this.hideLoader()
      // console.log()
    })
    */

    this.futebolService.readById_cached(id).subscribe(event => { // cached direct from google apps scripts
      console.log('chegou evento = ' + JSON.stringify(event))
      this.futebolService.event = event
      // this.event = this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
      this.event = event
      this.futebolService.showMessage('Event loaded.')
      this.hideLoader()
      // console.log()
    })

  }

  hideLoader(): void {
    // Setting display of spinner element to none 
    document.getElementById('loadingEventComponent').style.display = 'none';
    document.getElementById('eventComponent').style.display = 'inline';
  }

  showLoader(): void {
    // Setting display of spinner element to inline 
    document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('eventComponent').style.display = 'none';
  }

  updateEvents(): void {
    this.futebolService.showLoadingMessage('Updating events list...')
    this.futebolService.read().subscribe(jogos => {
      this.futebolService.jogos = jogos
      this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == this.eventId)
      this.futebolService.showMessage('Events list reloaded.')
    })
  }

  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  atribuirJogo(): void {
    this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == this.eventId)
  }
}