import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    maintainAspectRatio: false,
  };
  public pieChartLabels = ['18-25', '25-35', '35-45', '45-55', '55+'];
  public pieChartDatasets = [
    {
      data: [0, 0, 0, 0, 0],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  ageCounter = [0, 0, 0, 0, 0];

  constructor(private dataSrv: UserdataService) {}

  ngOnInit(): void {
    this.getAgeCount(this.dataSrv.getAllData());
  }

  getAgeCount(arrayOfInfo: any) {
    arrayOfInfo.map((item: any) => {
      let age = new Date().getFullYear() - new Date(item.dob).getFullYear();

      if (age > 17 && age < 25) this.ageCounter[0]++;
      else if (age > 24 && age < 35) this.ageCounter[1]++;
      else if (age > 34 && age < 45) this.ageCounter[2]++;
      else if (age > 44 && age < 55) this.ageCounter[3]++;
      else if (age > 55) this.ageCounter[4]++;
    });
    this.pieChartDatasets[0].data = this.ageCounter;
  }
}
