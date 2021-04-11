import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared-model/ingredient.model";

export class ShoppingListService {

    ingredientsUpdated = new EventEmitter<Ingredient[]>();

    private ingredients: Array<Ingredient> = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ];

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.emit(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(element => {
            this.ingredients.push(element);
        });
        this.ingredientsUpdated.emit(this.ingredients);
    }

}