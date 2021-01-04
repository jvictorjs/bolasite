import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-futebol-read',
  templateUrl: './futebol-read.component.html',
  styleUrls: ['./futebol-read.component.css']
})
export class FutebolReadComponent implements OnInit {

  jogos: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };
  displayedColumns = ['id', 'clock','name', 'action']

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.futebolService.showMessage('A carregar os jogos...')
  }

  ngOnInit(): void {

    if (this.jogos.botVersion === 0) {
      console.log('this.jogos.botVersion === 0, coletando jogos...')
      this.futebolService.read().subscribe(jogos => {
        this.jogos = jogos
        this.futebolService.jogos = jogos
        this.futebolService.showMessage('Jogos carregados')
        if (this.jogos.result.inPlayEventsBSF_eventViewInfos.length === 0){
          this.futebolService.showMessage('Sem jogos ao vivo no momento.')
        }
      })
    }
  }

  navigateWithState(): void {
    this.router.navigate(['/futebol/event/2992128'], { state: { hello: 'world' } });
  }

  
  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }
}
