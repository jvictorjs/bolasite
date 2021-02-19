import { Component, OnInit } from '@angular/core';
import { FutebolService } from './../futebol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'; // STACKOVERFLOW https://www.youtube.com/watch?v=VaQI0Oo-XzY&t=18s [Angular] Criando gráficos com chart.js
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-futebol-event-read',
  templateUrl: './futebol-event-read.component.html',
  styleUrls: ['./futebol-event-read.component.css']
})
export class FutebolEventReadComponent implements OnInit {
  MAX_GRAPH_YAXIS_VALUE = 3;
  jogos: any = { botVersion: 0, result: { loopMsgText: '', inPlayEventsBSF_eventViewInfos: [] } };
  event: any = {
    id: 0, league: {
      id: 0, name: '', cc: ''
    },
    home: {
      image_id: '7411'
    },
    away: {
      image_id: '7409'
    },
    event_odds: {
      odds_summary: {
        end: {
          home_odd: '',
          draw_odd: '',
          away_odd: ''
        },
        start: {
          home_odd: '',
          draw_odd: '',
          away_odd: ''
        }
      }
    },
    pointsSlices: {
      home_slice_points_array: [

      ],
      away_slice_points_array_reverse: [

      ]
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
        display: true,
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
    responsiveAnimationDuration: 1300
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
  ];

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
      this.futebolService.showMessage('Event loaded ✅') // ✅✔
      this.hideLoader()
      // console.log()
    })
    */

    this.futebolService.readById_cached(id).subscribe(event => { // cached direct from google apps scripts
      console.log('chegou evento = ' + JSON.stringify(event))
      this.futebolService.event = event
      // this.event = this.futebolService.event.result.inPlayEventsBSF_eventViewInfos[0]
      this.event = event
      this.futebolService.showMessage('Event loaded ✅') // ✅✔
      this.hideLoader()
      this.updateChart();
    })

  }

  hideLoader(): void {
    // Setting display of spinner element to none 
    document.getElementById('loadingEventComponent').style.display = 'none';
    document.getElementById('teamsLogos').style.display = 'inline';
    // document.getElementById('graphs').style.display = 'inline';
    document.getElementById('eventComponent').style.display = 'inline';
  }

  showLoader(): void {
    // Setting display of spinner element to inline 
    document.getElementById('loadingEventComponent').style.display = 'inline';
    document.getElementById('teamsLogos').style.display = 'none';
    //document.getElementById('graphs').style.display = 'none';
    document.getElementById('eventComponent').style.display = 'none';
  }

  updateEvents(): void {
    this.futebolService.showLoadingMessage('Updating events list...')
    this.futebolService.read().subscribe(jogos => {
      this.futebolService.jogos = jogos
      this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == this.eventId)
      this.futebolService.showMessage('Events reloaded. ✅') // ✅✔
    })
  }

  consolaTotalEvents(): void {
    this.futebolService.consolaTotalEvents();
  }

  atribuirJogo(): void {
    this.event = this.jogos.result.inPlayEventsBSF_eventViewInfos.find((x: { id: number; }) => x.id == this.eventId)
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
}