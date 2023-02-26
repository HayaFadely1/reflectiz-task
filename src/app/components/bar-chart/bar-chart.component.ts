import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  mostPickedIngine = { femaleF: 0, maleF: 0, femaleE: 0, maleE: 0 };
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Fuel', 'Electric'],
    datasets: [
      { data: [0, 0], label: 'Female' },
      { data: [0, 0], label: 'Male' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
  };

  constructor(private dataSrv: UserdataService) {}

  ngOnInit(): void {
    this.getMostPickedIngine(this.dataSrv.getAllData());
  }

  getMostPickedIngine(arrayOfInfo: any) {
    arrayOfInfo.map((item: any) => {
      if (item.gender === 'female') {
        if (item.motorType === 'fuel') {
          this.mostPickedIngine.femaleF++;
        } else {
          this.mostPickedIngine.femaleE++;
        }
      }
      if (item.gender === 'male') {
        if (item.motorType === 'fuel') {
          this.mostPickedIngine.maleF++;
        } else {
          this.mostPickedIngine.maleE++;
        }
      }
    });
    this.barChartData.datasets[0].data[0] = this.mostPickedIngine.femaleF;
    this.barChartData.datasets[0].data[1] = this.mostPickedIngine.femaleE;
    this.barChartData.datasets[1].data[0] = this.mostPickedIngine.maleF;
    this.barChartData.datasets[1].data[1] = this.mostPickedIngine.maleE;
  }
}
