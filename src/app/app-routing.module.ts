import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';

const rbRoutes: Routes = [
    { path: '', component: HomeComponent },
    // lazy loading example
    { path: 'recipeList', loadChildren: './recipes/recipes.module#RecipesModule' },
    // lazy loading example
    // { path: 'shoppingList', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    { path: 'notFound', component: NotFoundComponent },
    // { path: '**', redirectTo: 'notFound' }
];

@NgModule({
    imports: [
        // preloading all lazy loaded module
        RouterModule.forRoot(rbRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
