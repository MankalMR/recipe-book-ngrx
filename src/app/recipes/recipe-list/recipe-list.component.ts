import { Recipe } from './../../model/recipe';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../../common/services/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'rb-recipe-list',
    templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[];
    private recipeListSubscription;

    constructor (private recipeService: RecipeService,
                 private router: Router,
                 private route: ActivatedRoute) {  }

    ngOnInit () {
        this.recipes = this.recipeService.getRecipes();

        this.recipeListSubscription = this.recipeService.subRecipeListChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
        });
    }

    openNewRecipe () {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    ngOnDestroy () {
        this.recipeListSubscription.unsubscribe();
    }
}
