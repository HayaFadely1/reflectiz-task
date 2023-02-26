import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {

  constructor(private dataSrv:UserdataService){}

  ngOnInit(): void {}

  
  getAttemptCount(): number {
    return this.dataSrv.getAttemptCount();
  }

  getSuccessCount(): number {
    return this.dataSrv.getSuccessCount();
  }
}
