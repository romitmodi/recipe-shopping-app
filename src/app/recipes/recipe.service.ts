import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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

    recipeChanged = new Subject<Array<Recipe>>();

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Array<Recipe> {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes);
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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}