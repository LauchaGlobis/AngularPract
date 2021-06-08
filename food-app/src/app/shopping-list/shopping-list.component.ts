import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from  '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ingredients:Ingredient[]}>;
  newIngredients: Ingredient[];
  private ingchangeSub : Subscription;
  constructor(
               private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    /*this.ingredients = this.shoppingService.getIngredients();

    this.ingchangeSub =  this.shoppingService.ingredientsChanged
              .subscribe((ingredientsAux: Ingredient[])=>{

                    this.ingredients = ingredientsAux;

    });

    */
  }

 onEditItem(index: number){
    //this.shoppingService.startEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
 }


/* ngOnDestroy() {
    this.ingchangeSub.unsubscribe();
  } */


}
