import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './../../model/recipe';
import { Injectable } from '@angular/core';
import { Ingredient } from '../../model/ingredient';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import * as fromRecipeReducers from '../../recipes/store/recipes.reducers';
import * as RecipesActions from '../../recipes/store/recipes.actions';

@Injectable()
export class RecipeService {
  private dbName = 'recipes';
  subRecipeListChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor(private fbSerice: FirebaseService, private store: Store<fromRecipeReducers.RecipesState>) { }

  saveRecipes () {
    this.store.select('recipes')
      .take(1)
      .subscribe((state) => {
        this.fbSerice.saveData(this.dbName, state.recipes)
        .subscribe(
          (response: Response) => console.log(response),
          (error: Response) => console.log(error)
        );
      });
  }

  fetchRecipes () {
    this.fbSerice.fetchData(this.dbName)
      .subscribe(
        (savedRecipes: Recipe[]) => {
          // tslint:disable-next-line:prefer-const
          for (let recipe of savedRecipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          this.store.dispatch(new RecipesActions.SetRecipes(savedRecipes));
        },
        (error: Response) => console.log(error)
      );
  }
}
