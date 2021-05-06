import { Injectable } from "@angular/core";
import { Ingredient } from "../shared-model/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipes: Array<Recipe> = [
        new Recipe(
            'Samosa',
            'Indian Traditional Dish',
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
            [
                { name: 'white flour', quantity: 1 },
                { name: 'potatoes', quantity: 2 }
            ]),
        new Recipe(
            'Chole',
            'Indian Traditional Dish',
            'https://www.zeelskitchen.com/wp-content/uploads/2014/12/Chole-1.jpg',
            [
                { name: 'Chole', quantity: 100 },
                { name: 'salt', quantity: 1 }
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Array<Recipe> {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipeByName(name: string): Recipe {
        return this.recipes.find(
            (recipe: Recipe) => {
                if (name === recipe.name) {
                    return recipe;
                }
            }, null
        );
    }

    getRecipeByIndex(index: number) {
        return this.recipes[index];
    }
}