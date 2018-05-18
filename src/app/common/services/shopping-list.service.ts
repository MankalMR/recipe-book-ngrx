import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { FirebaseService } from './firebase.service';
import { Ingredient } from './../../model/ingredient';
import { EditIngredient } from '../../model/edit.ingredient';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRBReducers from '../../store/rb-store.reducers';

@Injectable()
export class ShoppingListService {
  private dbName = 'shoppingList';
  private shoppingList$ = this.store.select('shoppingList');
  eResetSelectedIndex = new EventEmitter();

  constructor(private fbSerice: FirebaseService, private store: Store<fromRBReducers.RBState>) { }

  findIngredientIndex (ingredients: Ingredient[], ingredientName: string) {
    return ingredients.findIndex((ingredient: Ingredient) => {
      return ingredient.name === ingredientName;
    });
  }

  saveShoppingList () {
    this.shoppingList$
      .take(1)
      .subscribe((data) => {
        this.fbSerice.saveData(this.dbName, data.ingredients)
          .subscribe(
            (response: Response) => console.log(response),
            (error: Response) => console.log(error)
          );
      });
  }

  fetchShoppingList () {
    this.fbSerice.fetchData(this.dbName)
      .subscribe(
        (savedIngredients: Ingredient[]) => {
          this.store.dispatch(new ShoppingListActions.FetchIngredients(savedIngredients));
        },
        (error: Response) => console.log(error)
      );
  }
}
