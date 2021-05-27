import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLinkActive } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router
    ) { }

  ngOnInit(): void {

    //Utilizo el subscribe para estar pendiente de cualquier cambio que ssufra el path
      this.route.params.subscribe((param: Params)=>{

          this.id = +param['id'];
          this.recipe = this.recipeService.getRecipeById(this.id);
      })
  }

  sendToShopping(){
      this.recipeService.sendToShoppingList(this.recipe.ingredients);
      
  }

  onEditRecipe(){
        this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
