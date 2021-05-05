import { Subject } from "rxjs";
import { Ingredient } from "../shared-model/ingredient.model";

export class ShoppingListService {

    private ingredients: Array<Ingredient> = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ];

    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    updateIngredient(index: number, updateIngredient: Ingredient) {
        this.ingredients[index] = updateIngredient;
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

}