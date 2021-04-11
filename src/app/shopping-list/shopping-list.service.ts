import { Injectable } from "@angular/core";
import { Ingredient } from "../shared-model/ingredient.model";

@Injectable()
export class ShoppingListService {
    ingredients: Array<Ingredient> = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ];
}