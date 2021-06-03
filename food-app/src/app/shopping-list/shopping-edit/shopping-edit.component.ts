import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../services/shopping-list.services';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredient;
  
  
  constructor(private shoppingService: ShoppingService){}

  ngOnInit(): void {
    this.subscription = this.shoppingService.startEditing.subscribe((index: number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingService.getIngredient(index);
          this.slForm.setValue({
            name : this.editedItem.name,
            amount: this.editedItem.amount
          })
    })
  }

  onAddItem( form: NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if(!this.editMode){
          this.shoppingService.addIngredient(newIngredient);
        }else{
          this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
        }
        this.editMode = false;
        form.reset();
     }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
