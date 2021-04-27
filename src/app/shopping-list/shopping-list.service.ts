import { Subject } from "rxjs";
import { Ingredient } from "../shared-model/ingredient.model";

export class ShoppingListService {

    private ingredients: Array<Ingredient> = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ];

    ingredientsUpdated = new Subject<Ingredient[]>();

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next(this.ingredients);
    }

}