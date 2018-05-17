import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from './../../model/ingredient';
import { ShoppingListService } from '../../common/services/shopping-list.service';
import { EditIngredient } from '../../model/edit.ingredient';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromRBReducers from '../../store/rb-store.reducers';

enum WARNING { NONE, SHOW, WARN_ACTION_ADD, WARN_ACTION_EDIT, DISMISS }

@Component({
  selector: 'rb-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // name: string;
  // @ViewChild('amount') amount: ElementRef;
  @ViewChild('slForm') slForm: NgForm;
  private selectedIndex = -1;
  private subscription;
  private warningState = WARNING.NONE;

  constructor(private slService: ShoppingListService, private store: Store<fromRBReducers.RBState>) { }

  ngOnInit () {
    this.subscription = this.store.select('shoppingList')
      .subscribe((data) => {
        const editIngredient = data.editIngredient;
        this.selectedIndex = editIngredient.index;
        if (this.selectedIndex >= 0) { // need to do this, only if edit mode
          this.slForm.setValue({
            name: editIngredient.ingredient.name,
            amount: editIngredient.ingredient.amount
          });
        }
      });
  }

  checkInShoppingList () {
    if (this.selectedIndex === -1 && this.warningState === WARNING.NONE) { // selectedIndex -1 means its not edit mode
      // need to do this only if its 'Add' adding ingredient to the shopping list
      const slItem: FormGroup = this.slForm.form;
      const name: string = (<string>slItem.value.name).trim().toLowerCase();
      const itemFoundIndex = this.slService.findIngredientIndex(name);
      if (itemFoundIndex >= 0) { // item exists in shopping list
        this.selectedIndex = itemFoundIndex;
        this.warningState = WARNING.SHOW;
      }
    }
  }

  addDuplicate () {
    this.warningState = WARNING.WARN_ACTION_ADD;
  }

  editDupicate () {
    this.warningState = WARNING.WARN_ACTION_EDIT;
  }

  dismissWarning () {
    this.warningState = WARNING.DISMISS;
  }

  isAdd () {
    return this.warningState === WARNING.WARN_ACTION_ADD;
  }

  isShowWarning () {
    return this.warningState === WARNING.SHOW;
  }

  onSubmit () {
    const slItem: FormGroup = this.slForm.form;
    const name: string = (<string>slItem.value.name).trim().toLowerCase();
    const amount: number = slItem.value.amount;
    const newIngredient = new Ingredient(name, amount);

    switch (this.warningState) {
      case WARNING.WARN_ACTION_ADD: this.selectedIndex = -1;
                                    break;
      case WARNING.WARN_ACTION_EDIT: this.selectedIndex = this.slService.findIngredientIndex(name);
                                     break;
      default: break;
    }

    if (this.selectedIndex === -1) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.EditIngredient(new EditIngredient(newIngredient, this.selectedIndex)));
    }

    this.clearForm();
  }

  deleteIngredient () {
    this.store.dispatch(new ShoppingListActions.RemoveIngredient(this.selectedIndex));
    // this.slService.removeIngredient(this.selectedIndex);
    this.clearForm();
  }

  clearForm () {
    this.slForm.reset();
    this.selectedIndex = -1; // Reset selectedIndex
    this.slService.eResetSelectedIndex.emit();
    this.warningState = WARNING.NONE; // Reset warning state
  }

  ngOnDestroy () {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
