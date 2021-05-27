import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/services/recipe.services';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './services/shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  newIngredients: Ingredient[];
  constructor( private shoppingService: ShoppingService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    
    this.shoppingService.ingredientsChanged.subscribe((ingredientsAux: Ingredient[])=>{
      
                    this.ingredients = ingredientsAux;
              
    });

    

    
  }

 
  
}
