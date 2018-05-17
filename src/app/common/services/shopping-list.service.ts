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
  private _ingredients: Ingredient[] = [];
  private _mergeIndexArray: number[] = [];
  subIngredientListChanged = new Subject<Ingredient[]>();
  subEditIngredient = new Subject<EditIngredient>();
  subMergeIndexArray = new Subject<number[]>();
  eResetSelectedIndex = new EventEmitter();
  // subIngredientListChanged = new EventEmitter<Ingredient[]>();
  constructor(private fbSerice: FirebaseService, private store: Store<fromRBReducers.RBState>) { }

  get ingredients () {
    return this._ingredients.slice();
  }

  get mergeIndexArray () {
    return this._mergeIndexArray.slice();
  }

  setIngredients (ingredients: Ingredient[]) {
    this._ingredients = ingredients;
    this.subIngredientListChanged.next(this.ingredients);
  }

  /**
   * gives back the element at passed index
   * @param idx index of the element to be fetched
   */
  getIngredient (idx: number): Ingredient {
    return this.ingredients[idx];
  }

  get noOfIngredients () {
    return this.ingredients.length;
  }

  findIngredientIndex (ingredientName: string) {
    return this._ingredients.findIndex((ingredient: Ingredient) => {
      return ingredient.name === ingredientName;
    });
  }

  saveShoppingList () {
    this.store.select('shoppingList')
      .subscribe((data) => {

      });
    this.fbSerice.saveData(this.dbName, this.ingredients)
      .subscribe(
        (response: Response) => console.log(response),
        (error: Response) => console.log(error)
      );
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
