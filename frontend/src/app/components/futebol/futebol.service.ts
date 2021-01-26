import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // root = singleton, unica instancia
})
export class FutebolService {

  baseUrl = 'https://angularcrudbackend.bolanarede.net.br/live_events/1' // PRODUÇÃO
  // baseUrl = 'http://localhost:3001/live_events/1' // DESENVOLVIMENTO
  baseUrl2 = 'https://script.google.com/macros/s/AKfycbx9YFTSh9GRqZ6TYPirRUWGtIdfqWR7qrLyAa2rdQuvV-Pm15B7qBbt/exec?doLoop=justDoIt'
  jogos: any = { id: 0, response: { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } } };
  event: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 10000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  showLoadingMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 15000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['msg-default']
    });
  }
  /*
    create(product: Product): Observable<Product>{
      return this.http.post<Product>(this.baseUrl, product)
    }
    */

  read(): Observable<Object> {
    this.jogos = this.http.get<Object>(this.baseUrl)
    console.log('jogos serão coletados', true);
    return this.jogos
  }


  readById(id: number): Observable<Object> {
    console.log('vai consultar jogo com o id = ' + id)
    console.log(this.baseUrl2 + '&eventId=' + id)
    return this.http.get<Object>(this.baseUrl2 + '&eventId=' + id)
    // console.log('this.jogos.result.inPlayEventsBSF_eventViewInfos.length = ' + this.jogos.result.inPlayEventsBSF_eventViewInfos.length)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == id)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find( ({ id }) => id === id );
  }

  consolaTotalEvents(): void {
    console.log('this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length = ' + this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length)
  }
}
