import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
})
export class RadarChartComponent implements OnInit {
  constructor(private dataSrv: UserdataService) {}

  ngOnInit(): void {
    // this.getChartData();
  }

  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = this.dataSrv.getHobbiesList();

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.getChartDataMale(), label: 'Male' },
      { data: this.getChartDataFemale(), label: 'Female' },
    ],
  };
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  getChartDataMale() {
    const resMale = this.dataSrv.getHobbiesCountDict('male');
    const maleArr = Object.values(resMale);
    return maleArr;
  }
  getChartDataFemale() {
    const resFemale = this.dataSrv.getHobbiesCountDict('female');
    const femaleArr = Object.values(resFemale);
    return femaleArr;
  }
}
