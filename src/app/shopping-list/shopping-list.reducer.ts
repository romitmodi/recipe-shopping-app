import { Action } from "@ngrx/store";
import { throws } from "assert";
import { throwError } from "rxjs";
import { Ingredient } from "../shared/model/ingredient.model";

const initalState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ]
};

export function shoppingListReducer(state = initalState, action: Action) {
    switch (action.type) {
        case "ADD_INGREDIENTS":
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
        default:
            console.log('incorrect acction triggered, which is not supported by application');
    }
}