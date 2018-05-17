import { Observable } from 'rxjs/Observable';
import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import * as firebaseSDK from 'firebase';

import { RecipeService } from '../../common/services/recipe.service';
import { ShoppingListService } from '../../common/services/shopping-list.service';

import * as fromRBReducers from '../../store/rb-store.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private rService: RecipeService,
              private slService: ShoppingListService,
              private store: Store<fromRBReducers.RBState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    firebaseSDK.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');
      if (user) {
        console.log('User logged in');
        this.store.dispatch(new AuthActions.Signin(user));
      } else {
        console.log('User logged out');
        this.store.dispatch(new AuthActions.Logout());
      }
    });
  }

  save () {
    this.rService.saveRecipes();
    this.slService.saveShoppingList();
  }

  fetch () {
    this.rService.fetchRecipes();
    this.slService.fetchShoppingList();
  }

  logout () {
    this.store.dispatch(new AuthActions.TryLogout());
  }
}
