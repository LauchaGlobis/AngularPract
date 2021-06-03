
import { Ingredient } from "src/app/shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingService {
   ingredientsChanged = new Subject<Ingredient[]>();
   startEditing = new Subject<number>();

   private ingredients : Ingredient[]= [
        new Ingredient( 'potatoes', 10),
        new Ingredient(' tomatoes', 5)
      ];


    getIngredients() {
        //Se usa el slice para devolver una copia del arreglo
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
      return this.ingredients[index];
    }
    

   addIngredient(ingredient:Ingredient){
       this.ingredients.push(ingredient);
       //En este caso utilizamos next para emitir el evento de que los ingredientes cambiaron
       this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
   }

   updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
   }

   deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
   }
}