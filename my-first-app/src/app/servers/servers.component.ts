import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
   
  allowNewServer: boolean = false;
  createServer: string = 'No create server';
  serverName: string ='First Name';
  showItem = false;
  servers = ['server1', 'server2'];

  constructor() { 

    setTimeout(() => {
        this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer(){
      this.showItem = true;
      this.servers.push( this.serverName);
      this.createServer = `Actually create server ${ this.serverName }`;
  }
    
  setServerName( event: Event) {
     this.serverName = (<HTMLInputElement>event.target).value;
  }
  
  ngOnInit(): void {
  }

}
