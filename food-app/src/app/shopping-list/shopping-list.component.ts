import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/services/recipe.services';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './services/shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  newIngredients: Ingredient[];
  private ingchangeSub : Subscription;
  constructor( private shoppingService: ShoppingService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    
    this.ingchangeSub =  this.shoppingService.ingredientsChanged
              .subscribe((ingredientsAux: Ingredient[])=>{
      
                    this.ingredients = ingredientsAux;
              
    });
  }

 onEditItem(index: number){
    this.shoppingService.startEditing.next(index);
 }
  
  ngOnDestroy() {
    this.ingchangeSub.unsubscribe();
  }
}
