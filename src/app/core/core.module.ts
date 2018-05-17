import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from '../common/shared.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { FirebaseService } from '../common/services/firebase.service';
import { RecipeService } from '../common/services/recipe.service';
import { ShoppingListService } from '../common/services/shopping-list.service';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  providers: [
    FirebaseService,
    RecipeService,
    ShoppingListService,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
