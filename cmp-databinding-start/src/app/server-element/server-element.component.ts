import { Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input() element: {
    type: string,
    name: string,
    content: string
  };

  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() { 
    console.log('constructor is on!');
  }

  ngOnInit(): void {
    console.log('ngOnOnInit funcion');
    //console.log(this.header.nativeElement.textContent);
    console.log(this.paragraph.nativeElement.textContent);
  }

}
