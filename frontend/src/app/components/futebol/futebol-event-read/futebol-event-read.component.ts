import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'; // STACKOVERFLOW https://www.youtube.com/watch?v=VaQI0Oo-XzY&t=18s [Angular] Criando gráficos com chart.js
import { Label } from 'ng2-charts';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-futebol-event-read',
  templateUrl: './futebol-event-read.component.html',
  styleUrls: ['./futebol-event-read.component.css']
})
export class FutebolEventReadComponent implements OnInit {
  MAX_GRAPH_YAXIS_VALUE = 3.3;
  jogos: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };
  event: any = {
    id: 0,
    league: { id: 0, name: '', cc: '' },
    home: { image_id: '7411' },
    away: { image_id: '7409' },
    event_odds: {
      odds_summary: {
        end: { home_odd: '', draw_odd: '', away_odd: '', home_prob: '', draw_prob: '', away_prob: '', },
        start: { home_odd: '', draw_odd: '', away_odd: '',home_prob: '', draw_prob: '', away_prob: '', }
      }
    },
    pointsSlices: {
      home_slice_points_array: [],
      away_slice_points_array_reverse: [],
      minutesOfHomeGoalsToShow_array: [],
      minutesOfAwayGoalsToShow_array: [],
      minutesOfHomeRedCardsToShow_array: [],
      minutesOfAwayRedCardsToShow_array: [],
      minutesToShow_array: []
    },
    clock: { brClock: " ", period: " ", minute: 0, second: 0 },
    points: {
      total_shots_home: 2, total_shots_away: 8,
      total_shots_home_ht: 0, total_shots_away_ht: 0,
      shots_off_in: "2-8 [0-4]", shots_off_in_ht: "0-0 [0-0]",
      totalPoints: "18.4",
      points_home: "6.2", points_away: "12.3",
      points_home_ht: "0.0", points_away_ht: "0.0",
      points_home_2t: "6.2", points_away_2t: "12.3",
      table_position_home: "", table_position_away: "",
      round: "3",
      league_name: "Womens International", league_cc: null, league_flag: "🏳",
      placar_ft: "0-2",
      datt_home: 0, datt_away: 0, datt_per_minute: 1.05,
      datt_home_ht: 0, datt_away_ht: 0,
      att_home: 49, att_away: 62,
      att_home_ht: 0, att_away_ht: 0,
      on_target_home: 0, on_target_away: 4, off_target_home: 2, off_target_away: 4, // 👟
      possession_home: 48, possession_away: 52,
      redcards_home: "0", redcards_away: "0", //🟥
      on_target_home_ht: 0, on_target_away_ht: 0, //🎯
      off_target_home_ht: 0, off_target_away_ht: 0,//🥅
      power_index: "A⬅️2.00", power_index_ht: "H➡️NaN", power_index_2t: "A⬅️2.00",
      power_index_side: "A", power_index_factor: 2,
      pointsIndex: "0.33",
      pointsIndexColoredSymbol: "🟡",
      pointsStringedWithBars: "||||||-||||||||||||",
      pointsStringedWithPeriod: "······x············"
    },
    stats: {
      yellowcards: [0, 0],
      corners: [0, 0]
    }
  }
  eventId = 0;
  // STACKOVERFLOR https://stackoverflow.com/questions/28716464/hiding-labels-on-y-axis-in-chart-js
  public barChartOptions: ChartOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        stacked: true,
        display: false,
      }],
      yAxes: [{
        stacked: true,
        display: false,
        ticks: {
          min: -this.MAX_GRAPH_YAXIS_VALUE,
          max: this.MAX_GRAPH_YAXIS_VALUE
        }

      }]
    },
    // STACKOVERFLOW https://stackoverflow.com/questions/38484908/how-can-i-set-the-height-of-a-chart-with-ng2-charts
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 3300
  };


  public barChartLabels: Label[] = [`05'`, `10'`, `15'`, `20'`, `25'`, `30'`, `35'`, `40'`, `45'`, `50'`, `55'`, `60'`, `65'`, `70'`, `75'`, `80'`, `85'`, `90'`];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: this.event.pointsSlices.home_slice_points_array, label: 'home',
      backgroundColor: 'rgba(40,40,155,0.8)',
      hoverBackgroundColor: 'rgba(40,40,155,0.5)',
      borderWidth: 0,
    },
    {
      data: this.event.pointsSlices.away_slice_points_array_reverse, label: 'away',
      backgroundColor: 'rgba(100,100,100,0.9)',
      hoverBackgroundColor: 'rgba(100,100,100,0.5)'
    }
    /*, these settings above insert mini balls in chart
    {
      label: "red-card",
      type: "scatter",
      fill: false,
      showLine: false,
      backgroundColor: "rgba(222,33,0,0.8)",
      data: [, , , { y: 2.8, x: 1 }, , , , , , , , , ,],
      borderWidth: 10,
      borderColor: "rgba(222,33,0,0.8)"
    },
    {
      label: "red-card",
      type: "scatter",
      fill: false,
      showLine: false,
      backgroundColor: "rgba(222,33,0,0.8)",
      data: [, , , , , , , , { y: -2.8, x: 1 },],
      borderWidth: 10,
      borderColor: "rgba(222,33,0,0.8)"
    }
    */
  ];

  intervalId: any;
  eventClock = { date: new Date(), minute: 0, second: 0 };

  bolShowFlagsMatCardBackground = true;
  bolDetailedView = false;
  bolAutoUpdateActive = true;

  constructor(
    private futebolService: FutebolService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    // console.log(`state data from previous view = ${this.router.getCurrentNavigation().extras.state.eventStringed}`);
    // console.log(this.router.getCurrentNavigation().extras.state.eventStringed);

  }

  navigationGoBack() {
    this.location.back();
  }

  ngOnInit(): void {
    // this.futebolService.showLoadingMessage('Loading event...')
    const id = +this.route.snapshot.paramMap.get('id')
    this.eventId = id;
    this.showLoader()
    this.route.data.subscribe(data => {
      console.log('data = ' + JSON.stringify(data))
    })
    /*
    if (this.jogos.botVersion === 0) {
      console.log('this.jogos.botVersion === 0, coletando jogos...')
      this.futebolService.loadEvents().subscribe(jogos => {
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
      this.futebolService.showMessage('Event loaded ✅') // ✅✔
      this.hideLoader()
      // console.log()
    })
    */

    this.event = this.futebolService.readById_fromServiceCache(id);
    this.hideLoader();
    this.updateChart();
    this.updateClock();
    /*
        this.futebolService.readById_cached(id).subscribe(event => { // cached direct from google apps scripts
          // console.log('chegou evento = ' + JSON.stringify(event))
          this.futebolService.event = event
          // this.event = this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
          this.event = event
          //this.futebolService.showMessage('Event loaded ✅') // ✅✔
          this.hideLoader();
          this.updateChart();
          this.updateClock();
        })
        */

    setInterval(() => {
      // console.log(this.eventClock.date)
      if (this.bolAutoUpdateActive) {
        this.eventClock.date = new Date(this.eventClock.date.getTime() + 1000);
      }
    }, 1000);

    this.intervalId = setInterval(() => {
      if (this.bolAutoUpdateActive) {
        this.refreshData(id);
      }
    }, 60000);

  }

  async manualyUpdate(eventId: number) {
    this.showLoader();
    await this.delay(555)
    this.hideLoader();
    await this.refreshData(eventId);
  }

  async refreshData(eventId: number) {
    await this.delay(555)
    this.futebolService.loadEvents().subscribe(jogos => {
      console.log('chegou eventos');
      this.jogos = jogos
      console.log(`data total events on service = ${this.jogos.response.result.inPlayEventsBSF_eventViewInfos.length}`)
      this.futebolService.showMessage('Service reloaded. ✅') // ✅✔
      this.event = this.jogos.response.result.inPlayEventsBSF_eventViewInfos.find((x: { id: string; }) => x.id === eventId.toString())
      this.updateChart();
      this.updateClock();
    })

    /*
    this.futebolService.readById_cached(id).subscribe(event => { // cached direct from google apps scripts
      // console.log('chegou evento = ' + JSON.stringify(event))
      this.futebolService.event = event
      // this.event = this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
      this.event = event
      // this.futebolService.showMessage(' ✅') // ✅✔
      this.updateChart();
      this.updateClock();
    })
   */
  }


  hideLoader(): void {
    // Setting display of spinner element to none 
    //document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('loadingEventComponent_ball').style.display = 'none';
    document.getElementById('teamsLogos').style.display = 'inline';
    // document.getElementById('graphs').style.display = 'inline';
    document.getElementById('eventComponent').style.display = 'inline';
  }

  showLoader(): void {
    // Setting display of spinner element to inline 
    //document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('loadingEventComponent_ball').style.display = 'inline';
    document.getElementById('teamsLogos').style.display = 'none';
    //document.getElementById('graphs').style.display = 'none';
    document.getElementById('eventComponent').style.display = 'none';
  }

  switchShowFlagsMatCardBackground(): void {
    if (this.bolShowFlagsMatCardBackground) {
      this.bolShowFlagsMatCardBackground = false;
    } else {
      this.bolShowFlagsMatCardBackground = true;
    }
    console.log(`this.bolShowFlagsMatCardBackground switched to = ${this.bolShowFlagsMatCardBackground}`)
  }


  async switchBolDetailedView() {
    await this.delay(555)
    this.bolDetailedView = !this.bolDetailedView
    console.log(`this.bolDetailedView switched to = ${this.bolDetailedView}`)
  }

  // STACKOVERFLOW https://medium.com/aprendajs/angular-6-com-uma-fun%C3%A7%C3%A3o-para-delay-192b4562f2b4
  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => { resolve(true); }, ms);
    });
  }


  switchBolAutoUpdateActiveLogMsg(): void {
    console.log(`bolAutoUpdateActive switched to = ${this.bolAutoUpdateActive}`)
  }

  /*
  updateEvents(): void {
    this.futebolService.showLoadingMessage('Updating events list...')
    this.futebolService.loadEvents().subscribe(jogos => {
      this.futebolService.jogos = jogos
      this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == this.eventId)
      this.futebolService.showMessage('Events reloaded. ✅') // ✅✔
    })
  }
  */

  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      2,
      3,
      (Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      this.MAX_GRAPH_YAXIS_VALUE,
      (Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      0.5];
    this.barChartData[1].data = [
      -Math.round(Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      -0.7,
      -1,
      -(Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      -1,
      -(Math.random() * this.MAX_GRAPH_YAXIS_VALUE),
      -4];
  }

  updateChart(): void {
    console.log(`updateChart running`)
    console.log(`points home = ${this.event.pointsSlices.home_slice_points_array}`)
    console.log(`away home = ${this.event.pointsSlices.away_slice_points_array_reverse}`)
    // Only Change 3 values
    this.barChartData[0].data = this.event.pointsSlices.home_slice_points_array;
    this.barChartData[1].data = this.event.pointsSlices.away_slice_points_array_reverse;
  }

  updateClock(): void {
    this.eventClock.date = new Date();
    this.eventClock.date.setMinutes(this.event.clock.minute)
    this.eventClock.date.setSeconds(this.event.clock.second)
  }


  getFlags($code: string) {
    return this.futebolService.getFlags($code);
  }

  getToolTipMsgForEvent(event: any) {
    return this.futebolService.getToolTipMsgForEvent(event);
  }
}