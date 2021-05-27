import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/services/shopping-list.services';
import { Recipe } from "../recipe.model";

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    

    private recipes: Recipe[] = [
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

      constructor( private shoppingService: ShoppingService){}
    getRecipes() {
        //Lo que hago con el slice es obtener una copia del arreglo de recetas
        return this.recipes.slice();
    }

    getRecipeById(id:number) {
        return this.recipes[id];
    }

    sendToShoppingList(ingredient:Ingredient[]) {
        this.shoppingService.addIngredients(ingredient);
    }
}