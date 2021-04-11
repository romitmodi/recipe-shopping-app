import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipeSelectedEvent = new EventEmitter<Recipe>();
    
    private recipes: Array<Recipe> = [
        new Recipe('Samosa', 'Indian Traditional Dish', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
        new Recipe('Chole', 'Indian Traditional Dish', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg')
    ];

    constructor() { }

    getRecipes(): Array<Recipe> {
        return this.recipes.slice();
    }
}