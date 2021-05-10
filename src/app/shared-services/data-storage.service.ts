import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "src/environments/environment";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
    providedIn: "root"
})
export class DataStorageService {

    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService) { }

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
        this.httpClient
            .get<Recipe[]>(environment.backendUrl + 'recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }), map(recipes => {
                recipes.sort(
                    (recpieOne, recipeTwo) => {
                        return recpieOne.name.localeCompare(recipeTwo.name)
                    });
                return recipes;
            }))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            })
    }
}