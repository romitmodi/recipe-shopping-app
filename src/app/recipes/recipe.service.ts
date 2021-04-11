import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipeSelectedEvent = new EventEmitter<Recipe>();

    private recipes: Array<Recipe> = [
        new Recipe(
            'Samosa',
            'Indian Traditional Dish',
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
            [
                {
                    name: 'white flour',
                    quantity: 1
                },
                {
                    name: 'potatoes',
                    quantity: 2
                }
            ]),
        new Recipe(
            'Chole',
            'Indian Traditional Dish',
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
            [
                {
                    name: 'Chole',
                    quantity: 100
                },
                {
                    name: 'salt',
                    quantity: 1
                }
            ])
    ];

    constructor() { }

    getRecipes(): Array<Recipe> {
        return this.recipes.slice();
    }
}