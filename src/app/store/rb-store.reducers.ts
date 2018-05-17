import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface RBState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<RBState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};
