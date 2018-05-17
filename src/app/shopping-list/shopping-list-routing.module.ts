import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
    // this is commented to make lazy loading work
    { path: 'shoppingList', component: ShoppingListComponent },
    // { path: '', component: ShoppingListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [RouterModule]
})

export class ShoppingListRoutingModule {

}
