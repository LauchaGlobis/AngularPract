import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-comp',
  templateUrl: './main-comp.component.html',
  styles: [`
  
        .styleLetra {
          color: white;
        }
  `]
})
export class MainCompComponent implements OnInit {

  flag: boolean = false;
  clickArr = ['click'];
  constructor() { }

  ngOnInit(): void {
  }

  showMessage() {
    this.flag = !this.flag;
    this.clickArr.push('click');
  }

  getColor() {
    
    return this.clickArr.length > 5 ? 'blue' : 'red';
  }

}
