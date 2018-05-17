import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from './../../model/ingredient';
import { EditIngredient } from '../../model/edit.ingredient';

export interface State {
    ingredients: Ingredient[];
    editIngredient: EditIngredient;
}

const initialState = {
    ingredients: <Ingredient[]>[],
    editIngredient: new EditIngredient(null, -1)
};

export function shoppingListReducer (state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            const addIngredient = action.payload;
            return {
                ...state,
                ingredients: [...state.ingredients, addIngredient]
            };
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            const addIngredients = action.payload;
            return {
                ...state,
                ingredients: [...state.ingredients, ...addIngredients]
            };
        }
        case ShoppingListActions.EDIT_INGREDIENT: {
            const editIndex = action.payload.index;
            const newIngredient = action.payload.ingredient;
            const ingredient = state.ingredients[editIndex];
            const editedIngredient = {
                ...ingredient,
                ...newIngredient
            };
            const editedIngredients = [...state.ingredients];
            editedIngredients[editIndex] = editedIngredient;
            return {
                ...state,
                ingredients: [...editedIngredients],
                editIngredient: {
                    ingredient: null,
                    index: -1
                }
            };
        }
        case ShoppingListActions.REMOVE_INGREDIENT: {
            const deleteIndex = action.payload;
            const ingredients = [...state.ingredients];
            ingredients.splice(deleteIndex, 1);
            return {
                ...state,
                ingredients: [...ingredients],
                editIngredient: {
                    ingredient: null,
                    index: -1
                }
            };
        }
        case ShoppingListActions.START_EDIT: {
            const editIndex = action.payload;
            const editIngredient = {...state.ingredients[editIndex]};
            return {
                ...state,
                editIngredient: {
                    ingredient: editIngredient,
                    index: editIndex
                }
            };
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                editIngredient: {
                    ingredient: null,
                    index: -1
                }
            };
        }
        case ShoppingListActions.FETCH_INGREDIENTS: {
            const ingredients = action.payload;
            return {
                ...state,
                ingredients: [...ingredients]
            };
        }
        default: return state;
    }
}
