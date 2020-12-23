import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-futebol-event-read',
  templateUrl: './futebol-event-read.component.html',
  styleUrls: ['./futebol-event-read.component.css']
})
export class FutebolEventReadComponent implements OnInit {

  jogos: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };
  event: any = { id: 0 }
  eventId = 0;

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.futebolService.showMessage('Este é um jogo...')
  }

  ngOnInit(): void {
    this.futebolService.showMessage('Carregando jogos')
    const id = +this.route.snapshot.paramMap.get('id')
    this.eventId = id;
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
    this.futebolService.readById(id).subscribe(event => {
      console.log('chegou evento = '+JSON.stringify(event))
      this.futebolService.event = event
      this.event =  this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
      this.futebolService.showMessage('Evento atribuido')
      // console.log()
    })

  }

  updateEvents(): void {
    this.futebolService.showMessage('Atualizando jogos')
    this.futebolService.read().subscribe(jogos => {
      this.futebolService.jogos = jogos
      this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; })=>x.id == this.eventId)
      this.futebolService.showMessage('Jogos atualizados e evento atribuido')
    })
  }

  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  atribuirJogo(): void{
    this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; })=>x.id == this.eventId)
  }
}