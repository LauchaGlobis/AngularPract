import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { Recipe } from "./recipes/recipe.model";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [

    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children:[
        {path:'', component: RecipeStartComponent},
        {path:'new', component: RecipeEditComponent},
        //Primero va el new, ya que depsués angular pide que se mande un id para que funcione el path
        {path:':id', component: RecipeDetailComponent},
        //Se pasa el id y el /edit que indica que estamos en modo edición de la receta
        {path:':id/edit', component: RecipeEditComponent}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}