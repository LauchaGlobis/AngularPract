import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-bind',
  templateUrl: './data-bind.component.html',
  styleUrls: ['./data-bind.component.css']
})
export class DataBindComponent implements OnInit {

  userName: string = "Lautaro";
  buttonEnable: boolean = true;
  constructor() { }


 

  ngOnInit(): void {
  }

}
