import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Ingredient } from '../model/ingredient';
import { ShoppingListService } from '../common/services/shopping-list.service';
import { EditIngredient } from '../model/edit.ingredient';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromRBReducers from '../store/rb-store.reducers';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-10%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(10%)'}))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subMergeIndexArray;
  private mergeIndexArray = [];

  selectedIndex: number;
  shoppingList$: Observable<{ingredients: Ingredient[]}>;

  constructor(private slService: ShoppingListService, private store: Store<fromRBReducers.RBState>) { }

  ngOnInit () {
    this.shoppingList$ = this.store.select('shoppingList');
    this.mergeIndexArray = this.slService.mergeIndexArray;

    this.subMergeIndexArray = this.slService.subMergeIndexArray.subscribe((mergeIndexArray) => {
      console.log(mergeIndexArray);
      this.mergeIndexArray = mergeIndexArray;
    });

    this.slService.eResetSelectedIndex.subscribe(() => this.selectedIndex = -1);
  }

  canMerge (index: number) {
    return this.mergeIndexArray.find((itemIndex) => {
      return itemIndex === index;
    });
  }

  deleteIngredient (idx: number) {
    this.store.dispatch(new ShoppingListActions.RemoveIngredient(idx));
  }

  editSelection (index: number) {
    this.selectedIndex = index;
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy () {
    this.subMergeIndexArray.unsubscribe();
  }

}
