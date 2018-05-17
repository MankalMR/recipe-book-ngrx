import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../common/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }
