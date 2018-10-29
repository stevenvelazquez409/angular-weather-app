import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  dateMessage: string;

  constructor() {
    let currentDate = new Date();
    this.dateMessage = currentDate.toDateString();
  }

  ngOnInit() {

  }

}
