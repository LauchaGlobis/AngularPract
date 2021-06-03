import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/services/recipe.services";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
//Esta es otra forma de importar el servicio a toda la app
export class DataStorageService {
    constructor( private http : HttpClient,
                 private recipeService : RecipeService,
                 private authService: AuthService
                 ){}

    storeRecipes(){
       const recipes = this.recipeService.getRecipes();
       this.http.put('https://food-app-base-default-rtdb.firebaseio.com/recipes.json',
       recipes
       )
       .subscribe( response => {
          console.log(response);
       })
    }
    //Con el put lo que hace es sobreescribir la base de datos, es diferente al Post que suma data


    fetchRecipes() {

       return this.http.get<Recipe[]>('https://food-app-base-default-rtdb.firebaseio.com/recipes.json',)
        .pipe(
         map(recipes => recipes
            ? recipes.map( recipe =>({ingredients: [], ...recipe}))
            :[]
            ),
         tap(recipes => {
           this.recipeService.setRecipes(recipes);
           })
        );
     //Con el pipe map mpodificamos la repsuesta del servicio
     //Al agregar el pipe con take(1) estamos tomando primero un emisor de evento, y luego en el exhaust map
     //Sumamos el resto de los emisores sea map y tap en torno a la repsueta del servicio




    }


}

