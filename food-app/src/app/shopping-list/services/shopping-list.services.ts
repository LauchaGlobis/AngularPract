import {EventEmitter} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingService {
   ingredientsChanged = new EventEmitter<Ingredient[]>();

   private ingredients : Ingredient[]= [
        new Ingredient( 'potatoes', 10),
        new Ingredient(' tomatoes', 5)
      ];


    getIngredients() {
        //Se usa el slice para devolver una copia del arreglo
        return this.ingredients.slice();
    }

    

   addIngredient(ingredient:Ingredient){
       this.ingredients.push(ingredient);
       this.ingredientsChanged.emit(this.ingredients.slice());
   }

   addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
   }

}