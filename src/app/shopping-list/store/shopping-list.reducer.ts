import { Ingredient } from "../../shared/model/ingredient.model";
import * as ShoppingListActions from "../store/shopping-list.actions";

const initalState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ]
};

export function shoppingListReducer(state = initalState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            console.log('incorrect acction triggered, which is not supported by application');
            return state;
    }
}