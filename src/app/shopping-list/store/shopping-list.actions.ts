import { Action } from '@ngrx/store';
import { Ingredient } from '../../model/ingredient';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor (public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor (public payload: Ingredient[]) {}
}

export class EditIngredient implements Action {
    readonly type = EDIT_INGREDIENT;
    constructor (public payload: {index: number, ingredient: Ingredient}) {}
}

export class RemoveIngredient implements Action {
    readonly type = REMOVE_INGREDIENT;
    constructor (public payload: number) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor (public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class FetchIngredients implements Action {
    readonly type = FETCH_INGREDIENTS;
    constructor (public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients |
                                  EditIngredient | RemoveIngredient |
                                  StartEdit | StopEdit |
                                  FetchIngredients;
