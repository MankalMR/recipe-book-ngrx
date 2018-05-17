import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ValidateIdGuardService } from './../common/guards/validate-id-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { NoRecipeDetailComponent } from './no-recipe-detail/no-recipe-detail.component';
import { RecipesComponent } from './recipes.component';

const recipesRoutes: Routes = [
    // this is commented to make lazy loading work
    // { path: 'recipeList', component: RecipesComponent, children: [
    { path: '', component: RecipesComponent, children: [
        { path: '', component: NoRecipeDetailComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: 'edit/:id', canActivate: [ValidateIdGuardService], component: RecipeEditComponent },
        { path: ':id', canActivate: [ValidateIdGuardService], component: RecipeDetailComponent },
        // { path: '**', component: NoRecipeDetailComponent }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule],
    providers: [ValidateIdGuardService]
})

export class RecipesRoutingModule {

}
