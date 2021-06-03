import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Post[] = [];
  isLoading = false;
  error = null;
  private errorSubs : Subscription;
  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
     this.errorSubs = this.postService.error.subscribe(errorMessage =>{
        this.error = errorMessage;
      });

      this.isLoading = true;
      this.postService.fetchPosts().subscribe(posts =>{
          this.isLoading = false;
          this.loadedPosts = posts;
      }, error =>{
        this.error = error.message;
      });
  }

  //Se envió una petición http, a la url y se le agrega posts.json para generar una carpeta
  //Para ejecutarla se agrega el subscribe, que el mismo devuelve un responseDatas
  onCreatePost(postData: Post) {
        this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isLoading = true;
      this.postService.fetchPosts().subscribe(posts =>{
          this.isLoading = false;
          this.loadedPosts = posts;
      }, error => {
        this.isLoading = false;
        this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(()=>{
        this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubs.unsubscribe();
  }


}
