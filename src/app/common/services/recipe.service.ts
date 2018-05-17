import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './../../model/recipe';
import { Injectable } from '@angular/core';
import { Ingredient } from '../../model/ingredient';
import { Response } from '@angular/http';

@Injectable()
export class RecipeService {
  private dbName = 'recipes';
  subRecipeListChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor(private fbSerice: FirebaseService) { }

  getRecipes () {
    console.log(this.recipes.slice());
    return this.recipes.slice();
  }

  setRecipes (recipes: Recipe[]) {
    this.recipes = recipes;
    this.subRecipeListChanged.next(this.recipes);
  }

  getRecipe (index: number) {
    return this.recipes[index];
  }

  get noOfRecipes () {
    return this.recipes.length;
  }

  addRecipe (recipe: Recipe) {
    this.recipes.push(recipe);
    this.subRecipeListChanged.next(this.recipes);
  }

  updateRecipe (recipe: Recipe, index: number) {
    this.recipes.splice(index, 1, recipe);
    this.subRecipeListChanged.next(this.recipes);
  }

  removeRecipe (index: number) {
    this.recipes.splice(index, 1);
    this.subRecipeListChanged.next(this.recipes);
  }

  saveRecipes () {
    this.fbSerice.saveData(this.dbName, this.recipes)
      .subscribe(
        (response: Response) => console.log(response),
        (error: Response) => console.log(error)
      );
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
          this.setRecipes(savedRecipes);
        },
        (error: Response) => console.log(error)
      );
  }
}
