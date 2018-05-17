import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipeService } from './../../common/services/recipe.service';
import { ShoppingListService } from './../../common/services/shopping-list.service';
import { Recipe } from './../../model/recipe';
import { Ingredient } from '../../model/ingredient';

import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as fromRBReducers from '../../store/rb-store.reducers';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private recipe: Recipe;
  private recipeIndex: number;

  constructor(private slService: ShoppingListService,
              private rService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRBReducers.RBState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.recipe = this.rService.getRecipe(this.recipeIndex);
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
    this.rService.removeRecipe(this.recipeIndex);
    this.router.navigate(['/recipeList']);
  }

}
