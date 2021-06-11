import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub : Subscription;
  isAuthenticated = false;
  constructor(
               private store: Store<fromApp.AppState>
               ) {}

  ngOnInit(){
      this.userSub = this.store.select('auth').pipe(
        map(authUser=>{
          return authUser.user;
        })
      )
      .subscribe( user =>{
         this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveRecipe(){

    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onRestoreRecipes() {
   this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



}
