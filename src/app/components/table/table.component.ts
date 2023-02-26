import { Component, OnInit } from '@angular/core';
import { PersonalInfoElement } from 'src/app/data';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataSource: PersonalInfoElement[];

  constructor(private dataSrv: UserdataService) {
    this.dataSource = [];
  }

  tableInfo = [
    { col: 'fullName', title: 'Full name' },
    { col: 'gender', title: 'Gender' },
    { col: 'email', title: 'Email' },
    { col: 'dob', title: 'Birth date' },
    { col: 'address', title: 'address' },
    { col: 'seats', title: 'Seats' },
    { col: 'motorType', title: 'Motor Type' },
    { col: 'favColor', title: 'Favorite color' },
    { col: 'hobbies', title: 'Hobbies' },
  ];
  displayedColumns: string[] = [
    'fullName',
    'gender',
    'email',
    'dob',
    'address',
    'seats',
    'motorType',
    'favColor',
    'hobbies',
  ];

  ngOnInit(): void {}

  getData() {
    return this.dataSrv.getAllData();
  }
}
