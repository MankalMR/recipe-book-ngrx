import { Recipe } from './../../model/recipe';
import * as RecipesActions from './recipes.actions';
import * as fromRBReducers from '../../store/rb-store.reducers';

export interface RecipesState extends fromRBReducers.RBState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState = {
    recipes: <Recipe[]>[]
};

export function recipesReducer (state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.ADD_RECIPE: {
            const addRecipe = action.payload;
            return {
                ...state,
                recipes: [...state.recipes, addRecipe]
            };
        }
        case RecipesActions.SET_RECIPES: {
            const recipes = action.payload;
            return {
                ...state,
                recipes: [...recipes]
            };
        }
        case RecipesActions.UPDATE_RECIPE: {
            const editIndex = action.payload.index;
            const updatedRecipe = action.payload.updatedRecipe;
            const recipe = state.recipes[editIndex];
            const editedRecipe = {
                ...recipe,
                ...updatedRecipe
            };
            const editedRecipes = [...state.recipes];
            editedRecipes[editIndex] = editedRecipe;
            return {
                ...state,
                recipes: [...editedRecipes]
            };
        }
        case RecipesActions.DELETE_RECIPE: {
            const deleteIndex = action.payload;
            const recipes = [...state.recipes];
            recipes.splice(deleteIndex, 1);
            return {
                ...state,
                recipes: [...recipes]
            };
        }
        default: return state;
    }
}
