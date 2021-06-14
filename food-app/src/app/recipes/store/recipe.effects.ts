import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";


@Injectable()

export class RecipeEffects {

  fetchRecipes = createEffect(
    ()=>  this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(()=>{
      return this.http.get<Recipe[]>('https://food-app-base-default-rtdb.firebaseio.com/recipes.json')
    }),
    /*map(recipes => recipes
      ? recipes.map( recipe =>({ingredients: [], ...recipe}))
      :[]
      ),*/
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
    map(recipes =>{
      return new RecipesActions.SetRecipes(recipes);
    }),
    ),
    {dispatch: false}
  );

  storeRecipes = createEffect(
    ()=> this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState])=>{
        return this.http.put('https://food-app-base-default-rtdb.firebaseio.com/recipes.json',
       recipesState.recipes
       )
      })
    ),
    {dispatch: false}
  );



  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}
}
