import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRecipeReducers from '../store/recipes.reducers';
import * as RecipesActions from './../store/recipes.actions';

import { Recipe } from './../../model/recipe';

@Component({
    selector: 'rb-recipe-list',
    templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
    recipes$: Observable<any>;
    private recipeListSubscription;

    constructor (private router: Router,
                 private route: ActivatedRoute,
                 private store: Store<fromRecipeReducers.RecipesState>) {  }

    ngOnInit () {
        this.recipes$ = this.store.select('recipes');
    }

    openNewRecipe () {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
