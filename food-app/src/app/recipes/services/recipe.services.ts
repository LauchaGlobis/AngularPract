import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { Recipe } from "../recipe.model";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();


   /*private recipes: Recipe[] = [
        new Recipe('A test recipe',
         'this is a sumply Test',
         'https://www.hola.com/imagenes/cocina/noticiaslibros/20210225185056/recetas-faciles-con-queso/0-923-792/portada-queso-adobe-m.jpg',
         [
             new Ingredient('Meat', 1),
             new Ingredient('Cosas ricas', 1)
         ]
        ),

        new Recipe('A burguer recipe',
         'this is a sumply Test',
         'https://i.pinimg.com/originals/82/af/20/82af20976fb7b09e98132f41d48a94b7.jpg',
         [
             new Ingredient('Meat', 1),
             new Ingredient('Cosas ricas', 1)
         ]),
      ];
      */

      private recipes : Recipe[] = [];

      constructor(
                   private store: Store<fromApp.AppState>
        ){}
    getRecipes() {
        //Lo que hago con el slice es obtener una copia del arreglo de recetas
        return this.recipes.slice();
    }

    setRecipes( recipes : Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipeById(id:number) {
        return this.recipes[id];
    }

    sendToShoppingList(ingredient:Ingredient[]) {
       // this.shoppingService.addIngredients(ingredient);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient) );
    }

    addRecipe( recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }


}
