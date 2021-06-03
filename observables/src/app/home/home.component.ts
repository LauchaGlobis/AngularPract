import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import {map, filter} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  /*
  
    //Establecemos en una variable el contador del observable para poder destruirlo luego
    this.firstSubscription = interval(1000).subscribe(count =>{
      console.log(count);
    });

    */

    //construimos un observable a mano
    /*Acá construimos un observable a mano, dentro del create en na function anónima nosotros le mandamos
    como parámetro el observable que nos da rxjs, el se encarga de observar los eventos que pasen
    en este paso le mandamos un next, que observa el proximo cambio del contador, que luego de 1 seg suma
    1  */
    const customIntervalObservable = Observable.create(observer=>{
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          if(count ===2) {
            observer.complete();
          }
          if( count > 3){
            observer.error( new Error('Count is greater 3 !!'));
          }
          count++;
        },1000);
    });

    this.firstSubscription = customIntervalObservable.pipe(filter((data)=>{
      return data >0;
    }),map((data:number)=>{
      return 'Round:' + (data +1);
    })).subscribe(data =>{
      console.log(data);
    },error => {
      console.log(error);
      alert(error.message);
    
    },()=>{
      console.log("complete!!");
    }
    
    );


  }
  
  ngOnDestroy():void {

    //La variable que contiene el contador del observable, se destruye cada vez que se abandona el componente
    //ya que sino estamos perdiendo mucha memoria, es decir, sino se destruye, se acumulan contadores
    this.firstSubscription.unsubscribe();
  }

}
