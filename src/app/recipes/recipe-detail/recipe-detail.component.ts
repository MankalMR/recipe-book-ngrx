import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipeService } from './../../common/services/recipe.service';
import { ShoppingListService } from './../../common/services/shopping-list.service';
import { Recipe } from './../../model/recipe';
import { Ingredient } from '../../model/ingredient';

import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as fromRecipeReducers from '../store/recipes.reducers';
import * as RecipesActions from './../store/recipes.actions';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private recipeIndex: number;
  private recipesStateSubscription;

  constructor(private slService: ShoppingListService,
              private rService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipeReducers.RecipesState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.store.select('recipes')
        .take(1)
        .subscribe((recipesState) => {
          this.recipe = recipesState.recipes[this.recipeIndex];
        });
    });
  }

  toShoppingList () {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    // now route to shopping list view
    this.router.navigate(['/shoppingList']);
  }

  openEditRecipe () {
    this.router.navigate(['../', 'edit', this.recipeIndex], {relativeTo: this.route});
  }

  deleteRecipe () {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeIndex));
    this.router.navigate(['/recipeList']);
  }

}
