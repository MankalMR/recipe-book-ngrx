import { RecipeService } from './../common/services/recipe.service';
import { Recipe } from './../model/recipe';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'rb-recipes',
    templateUrl: './recipes.component.html'
})

export class RecipesComponent implements OnInit {

    constructor(private recipeService: RecipeService) { }

    ngOnInit () {
    }
}
