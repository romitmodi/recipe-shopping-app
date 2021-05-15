import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "src/environments/environment";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class DataStorageService {

    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient
            .put(environment.backendUrl + 'recipes.json',
                recipes)
            .subscribe(
                response => console.log(response)
            );
    }

    fetchRecipe() {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.httpClient.get<Recipe[]>(
                    environment.backendUrl + 'recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    });
            }),
            map(recipes => {
                return recipes
                    .map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    })
                    .sort((recpieOne, recipeTwo) => {
                        return recpieOne.name.localeCompare(recipeTwo.name);
                    });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}