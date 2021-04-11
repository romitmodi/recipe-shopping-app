import { Injectable } from "@angular/core";
import { Ingredient } from "../shared-model/ingredient.model";

export class ShoppingListService {
    private ingredients: Array<Ingredient> = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ];

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    addIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

}