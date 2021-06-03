import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsService{
  error = new Subject<string>();

    constructor( private http: HttpClient) {}


    createAndStorePost(title: string, content: string){
      const postData: Post = {title: title, content : content};
      this.http.post<{name: string}>(
        'https://ng-laucha-app-default-rtdb.firebaseio.com/posts.json',
         postData,
         {
           observe: 'response'
           //con el observe modifico la manera en que veo la respuesta del servicio
         }
         )
         .subscribe(responseData =>{
           console.log(responseData);
         }, error =>{
            this.error.next(error.message);
         });
    }

    fetchPosts() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
       return this.http.get<{[key: string]: Post}>('https://ng-laucha-app-default-rtdb.firebaseio.com/posts.json',
       {
         headers: new HttpHeaders({'custom-header': 'Hello'}),
         params : searchParams,
         //Se suma a la url print=pretty&custom=key
         responseType: 'json'
         //modifoco el tipo de respuesta a JSON, coincide con el tipo objeto que se define arriba
       }
       )
      .pipe(map(responseData  => {
          const postsArray: Post[] = [];
          for( const key in responseData){
             if( responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key], id: key});
             }
          }
          return postsArray;
      }),
      catchError(errorRes=>{
          return throwError(errorRes);
      })
      )

    }

    deletePosts() {
      return this.http.delete('https://ng-laucha-app-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType:'text'
      })
      .pipe(tap(event=>{
        console.log(event);
        if(event.type === HttpEventType.Sent){

        }
        if(event.type === HttpEventType.Response){
          console.log(event.body);
          //Basicamnete es para manejar la repsuesta al eliminar los datos del backend, no siempre
          //se utiliza, pero es bueno tenerlo en cuenta
        }
      }))
    ;
    }


    }


