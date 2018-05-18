import { Action } from '@ngrx/store';
import { Recipe } from './../../model/recipe';

export const ADD_RECIPE = 'ADD_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor (public payload: Recipe) {}
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor (public payload: Recipe[]) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor (public payload: {updatedRecipe: Recipe, index: number}) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor (public payload: number) {}
}

export type RecipesActions = AddRecipe | SetRecipes | UpdateRecipe | DeleteRecipe;
