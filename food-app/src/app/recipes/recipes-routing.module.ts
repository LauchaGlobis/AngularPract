import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve:[RecipesResolverService] ,
    canActivate:[AuthGuard],
    children:[
              {path:'', component: RecipeStartComponent},
              {path:'new', component: RecipeEditComponent},
              //Primero va el new, ya que depsués angular pide que se mande un id para que funcione el path
              {path:':id', component: RecipeDetailComponent},
              //Se pasa el id y el /edit que indica que estamos en modo edición de la receta
              {path:':id/edit', component: RecipeEditComponent}
            ]},
  ];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipesRoutingModule{}
