import { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/model/ingredient.model";
import { ADD_INGREDIENT } from "../store/shopping-list.actions";

const initalState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ]
};

export function shoppingListReducer(state = initalState, action: Action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
        default:
            console.log('incorrect acction triggered, which is not supported by application');
    }
}