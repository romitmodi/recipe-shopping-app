import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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
            .subscribe(recipes => {
                console.log(recipes);
                this.recipeService.setRecipes(recipes);
            })
    }
}