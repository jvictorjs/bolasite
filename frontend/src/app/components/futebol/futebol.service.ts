import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // root = singleton, unica instancia
})
export class FutebolService {

  baseUrl = 'https://angularcrudbackend.bolanarede.net.br/live_events/1' // PRODUÇÃO - live events
  baseUrl_upcomingEvents = 'https://angularcrudbackend.bolanarede.net.br/live_events/2' // PRODUÇÃO - upcoming event
  // baseUrl = 'http://localhost:3001/live_events/1' // DESENVOLVIMENTO
  // the below link is from 
  baseUrl2 = 'https://script.google.com/macros/s/AKfycbx9YFTSh9GRqZ6TYPirRUWGtIdfqWR7qrLyAa2rdQuvV-Pm15B7qBbt/exec?doLoop=justDoIt'
  // mudei o /2/ para /s/ e, 18fev21, parecia nao funcionar com /2/ nao entendi | baseUrl2 = 'https://script.google.com/macros/2/AKfycbx9YFTSh9GRqZ6TYPirRUWGtIdfqWR7qrLyAa2rdQuvV-Pm15B7qBbt/exec?doLoop=justDoIt'
  // https://script.google.com/macros/s/AKfycby7xJZIUEwRVRESF11LKl8xv96JoQLtgBl6KgxUfuQ/dev?doLoop=justDoIt&eventId=2683591&cached=true
  jogos: any = { id: 0, response: { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } } };
  jogos_upcoming: any = { id: 0, response: { botVersion: 0, result: [] } };
  event: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3300,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  showLoadingMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3300,
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

  loadEvents(): Observable<Object> {
    this.jogos = this.http.get<Object>(this.baseUrl)
    console.log('events will be collected');
    return this.jogos
  }


  readUpComingEvents(): Observable<Object> {
    this.jogos_upcoming = this.http.get<Object>(this.baseUrl_upcomingEvents)
    console.log('upcoming events will be collected');
    return this.jogos_upcoming
  }


  readById(id: number): Observable<Object> {
    // console.log('collecting event with id = ' + id)
    // console.log(this.baseUrl2 + '&eventId=' + id)
    return this.http.get<Object>(this.baseUrl2 + '&eventId=' + id)
    // console.log('this.jogos.result.inPlayEventsBSF_eventViewInfos.length = ' + this.jogos.result.inPlayEventsBSF_eventViewInfos.length)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == id)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find( ({ id }) => id === id );
  }

  readById_cached(id: number): Observable<Object> {
    console.log('readById_cached --- START')
    // console.log('collecting event with id  = ' + id)
    // console.log(this.baseUrl2 + '&eventId=' + id + '&cached=true')
    return this.http.get<Object>(this.baseUrl2 + '&eventId=' + id + '&cached=true')
    // console.log('this.jogos.result.inPlayEventsBSF_eventViewInfos.length = ' + this.jogos.result.inPlayEventsBSF_eventViewInfos.length)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == id)
    // return this.jogos.result.inPlayEventsBSF_eventViewInfos.find( ({ id }) => id === id );
  }

  readById_fromServiceCache(eventId: number): any {
    console.log(`total events on service = ${this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length}`)
    let retorno = this.jogos.response.result.inPlayEventsBSF_eventViewInfos.find((x: { id: string; }) => x.id === eventId.toString())
    console.log(`event found in service cache = ${retorno.stringedGameWithRedcards}`)
    return retorno;
  }

  consolaTotalEvents(): void {
    console.log('this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length = ' + this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length)
  }

  getToolTipMsgForEvent(event: any) {
    let retorno = '📊' + event.event_odds.odds_summary.start.home_odd + ' | '
      + event.event_odds.odds_summary.start.draw_odd + ' | '
      + event.event_odds.odds_summary.start.away_odd
      + '  ➕' + event.event_odds.odds_summary.start.handicap
      + '@' + event.event_odds.odds_summary.start.over_odd;
    if (event.textsToShow) {
      if (event.textsToShow.overOdds) {
        retorno += '    ' + event.textsToShow.overOdds.eventOddsSummaryTextMsgParsedToSend_ML
          + '   ' + event.textsToShow.overOdds.eventOddsTextMsgParsedToSend_GoalLine
          + '  ' + event.textsToShow.pointsStringedWithFavoriteSymbol // 🌟·············x···············
          + '  ' + event.points.pointsIndex
          + '' + event.points.pointsIndexColoredSymbol //🔴🟡🟢
          // + '   ' + event.points.pointsStringedWithBars // 
          + '   ' + event.points.total_shots_home + '🥅' + event.points.total_shots_away
          + '   ' + event.points.on_target_home + '🎯' + event.points.on_target_away
          + '   ' + event.points.datt_home + '💥' + event.points.datt_away +
          '  (' + event.points.datt_per_minute + ')'
      }
    }
    return retorno
  }

  getToolTipMsgForEvent_colorSlices(event: any) {
    let retorno = `\n` + event.pointsSlices.minutesToShow_stringed
      + `\n ` + event.pointsSlices.powerIndexToShow_stringed
    return retorno
  }


  parseEpochTimeToTimeToKO(epochTimeString: any) { // 10jun2021 
    const getDateDDMMMhhmmMiniZone = (date: Date) => { // 03/Jun 13:10 GMT-0300
      var dd = date.getDate();
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var MMM = months[date.getMonth()]
      var hh = date.getHours()
      var mm = date.getMinutes()

      if (dd < 10) {
        dd = Number('0' + dd);
      }
      if (hh < 10) {
        hh = Number('0' + hh);
      }
      if (mm < 10) {
        mm = Number('0' + mm);
      }
      let dateStringed = date.toString()
      let timeZone = dateStringed.substring(dateStringed.indexOf('('), dateStringed.length);
      let miniTimeZone = dateStringed.substring(dateStringed.indexOf('GMT'), dateStringed.indexOf(' ('));
      console.log(dateStringed)
      console.log(timeZone)
      console.log(miniTimeZone)
      return dd + '/' + MMM + ' ' + hh + ':' + mm + ' ' + miniTimeZone;
    }

    const msToTimeddHHmm = (msDuration: number) => { // 4h54m | 42m | 1d3h | 10h | -15m | -3h 
      let msDuration_absolute = Math.abs(msDuration)
      var seconds = Math.floor((msDuration_absolute / 1000) % 60),
        minutes = Math.floor((msDuration_absolute / (1000 * 60)) % 60),
        hours = Math.floor((msDuration_absolute / (1000 * 60 * 60)) % 24),
        days = Math.floor((msDuration_absolute / (1000 * 60 * 60)) / 24);

      let retorno = ''
      if (days > 0) {
        retorno += days + 'd'
        if (hours > 0) {
          retorno += hours + "h"
        }
      } else {
        if (hours > 0) {
          if (hours >= 5) {
            retorno += hours + "h"
          } else {
            retorno += hours + "h" + minutes + 'm'
          }
        } else {
          retorno += minutes + 'm'
        }
      }
      return (msDuration > 0) ? retorno : '-' + retorno;
    }

    const getTimeStamps = (epochTimeString: string) => {
      return {
        // NEW TIMESTAMPS properties (correct names)
        time_stringed_ISO_8601: new Date(Number(epochTimeString) * 1000), // The 0 there is the key, which sets the date to the epoch
        time_stringed_withZoneBR: getDateDDMMMhhmmMiniZone(new Date(Number(epochTimeString) * 1000)), // The 0 there is the key, which sets the date to the epoch
        timeUntilKickOff_stringed: msToTimeddHHmm(new Date(Number(epochTimeString) * 1000).getTime() - new Date().getTime()), // The 0 there is the key, which sets the date to the epoch
      }
    }
    // NEW TIMESTAMPS properties (correct names)
    let retorno = getTimeStamps(epochTimeString)
    //console.log('timeStamps = ' + JSON.stringify(retorno))
    return retorno
  }

  getFlags($code: string) {
    if ($code) {
      $code = $code.toUpperCase();
      if ($code == 'AD') return '🇦🇩';
      if ($code == 'AE') return '🇦🇪';
      if ($code == 'AF') return '🇦🇫';
      if ($code == 'AG') return '🇦🇬';
      if ($code == 'AI') return '🇦🇮';
      if ($code == 'AL') return '🇦🇱';
      if ($code == 'AM') return '🇦🇲';
      if ($code == 'AO') return '🇦🇴';
      if ($code == 'AQ') return '🇦🇶';
      if ($code == 'AR') return '🇦🇷';
      if ($code == 'AS') return '🇦🇸';
      if ($code == 'AT') return '🇦🇹';
      if ($code == 'AU') return '🇦🇺';
      if ($code == 'AW') return '🇦🇼';
      if ($code == 'AX') return '🇦🇽';
      if ($code == 'AZ') return '🇦🇿';
      if ($code == 'BA') return '🇧🇦';
      if ($code == 'BB') return '🇧🇧';
      if ($code == 'BD') return '🇧🇩';
      if ($code == 'BE') return '🇧🇪';
      if ($code == 'BF') return '🇧🇫';
      if ($code == 'BG') return '🇧🇬';
      if ($code == 'BH') return '🇧🇭';
      if ($code == 'BI') return '🇧🇮';
      if ($code == 'BJ') return '🇧🇯';
      if ($code == 'BL') return '🇧🇱';
      if ($code == 'BM') return '🇧🇲';
      if ($code == 'BN') return '🇧🇳';
      if ($code == 'BO') return '🇧🇴';
      if ($code == 'BQ') return '🇧🇶';
      if ($code == 'BR') return '🇧🇷';
      if ($code == 'BS') return '🇧🇸';
      if ($code == 'BT') return '🇧🇹';
      if ($code == 'BV') return '🇧🇻';
      if ($code == 'BW') return '🇧🇼';
      if ($code == 'BY') return '🇧🇾';
      if ($code == 'BZ') return '🇧🇿';
      if ($code == 'CA') return '🇨🇦';
      if ($code == 'CC') return '🇨🇨';
      if ($code == 'CD') return '🇨🇩';
      if ($code == 'CF') return '🇨🇫';
      if ($code == 'CG') return '🇨🇬';
      if ($code == 'CH') return '🇨🇭';
      if ($code == 'CI') return '🇨🇮';
      if ($code == 'CK') return '🇨🇰';
      if ($code == 'CL') return '🇨🇱';
      if ($code == 'CM') return '🇨🇲';
      if ($code == 'CN') return '🇨🇳';
      if ($code == 'CO') return '🇨🇴';
      if ($code == 'CR') return '🇨🇷';
      if ($code == 'CU') return '🇨🇺';
      if ($code == 'CV') return '🇨🇻';
      if ($code == 'CW') return '🇨🇼';
      if ($code == 'CX') return '🇨🇽';
      if ($code == 'CY') return '🇨🇾';
      if ($code == 'CZ') return '🇨🇿';
      if ($code == 'DE') return '🇩🇪';
      if ($code == 'DJ') return '🇩🇯';
      if ($code == 'DK') return '🇩🇰';
      if ($code == 'DM') return '🇩🇲';
      if ($code == 'DO') return '🇩🇴';
      if ($code == 'DZ') return '🇩🇿';
      if ($code == 'EC') return '🇪🇨';
      if ($code == 'EE') return '🇪🇪';
      if ($code == 'EG') return '🇪🇬';
      if ($code == 'EH') return '🇪🇭';
      if ($code == 'ER') return '🇪🇷';
      if ($code == 'ES') return '🇪🇸';
      if ($code == 'ET') return '🇪🇹';
      if ($code == 'FI') return '🇫🇮';
      if ($code == 'FJ') return '🇫🇯';
      if ($code == 'FK') return '🇫🇰';
      if ($code == 'FM') return '🇫🇲';
      if ($code == 'FO') return '🇫🇴';
      if ($code == 'FR') return '🇫🇷';
      if ($code == 'GA') return '🇬🇦';
      if ($code == 'GB') return '🇬🇧';
      if ($code == 'GD') return '🇬🇩';
      if ($code == 'GE') return '🇬🇪';
      if ($code == 'GF') return '🇬🇫';
      if ($code == 'GG') return '🇬🇬';
      if ($code == 'GH') return '🇬🇭';
      if ($code == 'GI') return '🇬🇮';
      if ($code == 'GL') return '🇬🇱';
      if ($code == 'GM') return '🇬🇲';
      if ($code == 'GN') return '🇬🇳';
      if ($code == 'GP') return '🇬🇵';
      if ($code == 'GQ') return '🇬🇶';
      if ($code == 'GR') return '🇬🇷';
      if ($code == 'GS') return '🇬🇸';
      if ($code == 'GT') return '🇬🇹';
      if ($code == 'GU') return '🇬🇺';
      if ($code == 'GW') return '🇬🇼';
      if ($code == 'GY') return '🇬🇾';
      if ($code == 'HK') return '🇭🇰';
      if ($code == 'HM') return '🇭🇲';
      if ($code == 'HN') return '🇭🇳';
      if ($code == 'HR') return '🇭🇷';
      if ($code == 'HT') return '🇭🇹';
      if ($code == 'HU') return '🇭🇺';
      if ($code == 'ID') return '🇮🇩';
      if ($code == 'IE') return '🇮🇪';
      if ($code == 'IL') return '🇮🇱';
      if ($code == 'IM') return '🇮🇲';
      if ($code == 'IN') return '🇮🇳';
      if ($code == 'IO') return '🇮🇴';
      if ($code == 'IQ') return '🇮🇶';
      if ($code == 'IR') return '🇮🇷';
      if ($code == 'IS') return '🇮🇸';
      if ($code == 'IT') return '🇮🇹';
      if ($code == 'JE') return '🇯🇪';
      if ($code == 'JM') return '🇯🇲';
      if ($code == 'JO') return '🇯🇴';
      if ($code == 'JP') return '🇯🇵';
      if ($code == 'KE') return '🇰🇪';
      if ($code == 'KG') return '🇰🇬';
      if ($code == 'KH') return '🇰🇭';
      if ($code == 'KI') return '🇰🇮';
      if ($code == 'KM') return '🇰🇲';
      if ($code == 'KN') return '🇰🇳';
      if ($code == 'KP') return '🇰🇵';
      if ($code == 'KR') return '🇰🇷';
      if ($code == 'KW') return '🇰🇼';
      if ($code == 'KY') return '🇰🇾';
      if ($code == 'KZ') return '🇰🇿';
      if ($code == 'LA') return '🇱🇦';
      if ($code == 'LB') return '🇱🇧';
      if ($code == 'LC') return '🇱🇨';
      if ($code == 'LI') return '🇱🇮';
      if ($code == 'LK') return '🇱🇰';
      if ($code == 'LR') return '🇱🇷';
      if ($code == 'LS') return '🇱🇸';
      if ($code == 'LT') return '🇱🇹';
      if ($code == 'LU') return '🇱🇺';
      if ($code == 'LV') return '🇱🇻';
      if ($code == 'LY') return '🇱🇾';
      if ($code == 'MA') return '🇲🇦';
      if ($code == 'MC') return '🇲🇨';
      if ($code == 'MD') return '🇲🇩';
      if ($code == 'ME') return '🇲🇪';
      if ($code == 'MF') return '🇲🇫';
      if ($code == 'MG') return '🇲🇬';
      if ($code == 'MH') return '🇲🇭';
      if ($code == 'MK') return '🇲🇰';
      if ($code == 'ML') return '🇲🇱';
      if ($code == 'MM') return '🇲🇲';
      if ($code == 'MN') return '🇲🇳';
      if ($code == 'MO') return '🇲🇴';
      if ($code == 'MP') return '🇲🇵';
      if ($code == 'MQ') return '🇲🇶';
      if ($code == 'MR') return '🇲🇷';
      if ($code == 'MS') return '🇲🇸';
      if ($code == 'MT') return '🇲🇹';
      if ($code == 'MU') return '🇲🇺';
      if ($code == 'MV') return '🇲🇻';
      if ($code == 'MW') return '🇲🇼';
      if ($code == 'MX') return '🇲🇽';
      if ($code == 'MY') return '🇲🇾';
      if ($code == 'MZ') return '🇲🇿';
      if ($code == 'NA') return '🇳🇦';
      if ($code == 'NC') return '🇳🇨';
      if ($code == 'NE') return '🇳🇪';
      if ($code == 'NF') return '🇳🇫';
      if ($code == 'NG') return '🇳🇬';
      if ($code == 'NI') return '🇳🇮';
      if ($code == 'NL') return '🇳🇱';
      if ($code == 'NO') return '🇳🇴';
      if ($code == 'NP') return '🇳🇵';
      if ($code == 'NR') return '🇳🇷';
      if ($code == 'NU') return '🇳🇺';
      if ($code == 'NZ') return '🇳🇿';
      if ($code == 'OM') return '🇴🇲';
      if ($code == 'PA') return '🇵🇦';
      if ($code == 'PE') return '🇵🇪';
      if ($code == 'PF') return '🇵🇫';
      if ($code == 'PG') return '🇵🇬';
      if ($code == 'PH') return '🇵🇭';
      if ($code == 'PK') return '🇵🇰';
      if ($code == 'PL') return '🇵🇱';
      if ($code == 'PM') return '🇵🇲';
      if ($code == 'PN') return '🇵🇳';
      if ($code == 'PR') return '🇵🇷';
      if ($code == 'PS') return '🇵🇸';
      if ($code == 'PT') return '🇵🇹';
      if ($code == 'PW') return '🇵🇼';
      if ($code == 'PY') return '🇵🇾';
      if ($code == 'QA') return '🇶🇦';
      if ($code == 'RE') return '🇷🇪';
      if ($code == 'RO') return '🇷🇴';
      if ($code == 'RS') return '🇷🇸';
      if ($code == 'RU') return '🇷🇺';
      if ($code == 'RW') return '🇷🇼';
      if ($code == 'SA') return '🇸🇦';
      if ($code == 'SB') return '🇸🇧';
      if ($code == 'SC') return '🇸🇨';
      if ($code == 'SD') return '🇸🇩';
      if ($code == 'SE') return '🇸🇪';
      if ($code == 'SG') return '🇸🇬';
      if ($code == 'SH') return '🇸🇭';
      if ($code == 'SI') return '🇸🇮';
      if ($code == 'SJ') return '🇸🇯';
      if ($code == 'SK') return '🇸🇰';
      if ($code == 'SL') return '🇸🇱';
      if ($code == 'SM') return '🇸🇲';
      if ($code == 'SN') return '🇸🇳';
      if ($code == 'SO') return '🇸🇴';
      if ($code == 'SR') return '🇸🇷';
      if ($code == 'SS') return '🇸🇸';
      if ($code == 'ST') return '🇸🇹';
      if ($code == 'SV') return '🇸🇻';
      if ($code == 'SX') return '🇸🇽';
      if ($code == 'SY') return '🇸🇾';
      if ($code == 'SZ') return '🇸🇿';
      if ($code == 'TC') return '🇹🇨';
      if ($code == 'TD') return '🇹🇩';
      if ($code == 'TF') return '🇹🇫';
      if ($code == 'TG') return '🇹🇬';
      if ($code == 'TH') return '🇹🇭';
      if ($code == 'TJ') return '🇹🇯';
      if ($code == 'TK') return '🇹🇰';
      if ($code == 'TL') return '🇹🇱';
      if ($code == 'TM') return '🇹🇲';
      if ($code == 'TN') return '🇹🇳';
      if ($code == 'TO') return '🇹🇴';
      if ($code == 'TR') return '🇹🇷';
      if ($code == 'TT') return '🇹🇹';
      if ($code == 'TV') return '🇹🇻';
      if ($code == 'TW') return '🇹🇼';
      if ($code == 'TZ') return '🇹🇿';
      if ($code == 'UA') return '🇺🇦';
      if ($code == 'UG') return '🇺🇬';
      if ($code == 'UM') return '🇺🇲';
      if ($code == 'US') return '🇺🇸';
      if ($code == 'UY') return '🇺🇾';
      if ($code == 'UZ') return '🇺🇿';
      if ($code == 'VA') return '🇻🇦';
      if ($code == 'VC') return '🇻🇨';
      if ($code == 'VE') return '🇻🇪';
      if ($code == 'VG') return '🇻🇬';
      if ($code == 'VI') return '🇻🇮';
      if ($code == 'VN') return '🇻🇳';
      if ($code == 'VU') return '🇻🇺';
      if ($code == 'WF') return '🇼🇫';
      if ($code == 'WS') return '🇼🇸';
      if ($code == 'XK') return '🇽🇰';
      if ($code == 'YE') return '🇾🇪';
      if ($code == 'YT') return '🇾🇹';
      if ($code == 'ZA') return '🇿🇦';
      if ($code == 'ZM') return '🇿🇲';
    }
    // return '🏳'; // 🏳 = white flag
    return ' ';
  }
}
