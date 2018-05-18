import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { RecipeService } from './../services/recipe.service';
import * as fromRecipeReducers from '../../recipes/store/recipes.reducers';
import * as RecipesActions from '../../recipes/store/recipes.actions';

@Injectable()
export class ValidateIdGuardService implements CanActivate {

  constructor(private store: Store<fromRecipeReducers.RecipesState>, private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot)
               : Observable<boolean> | Promise<boolean> | boolean {

    const idAccessed = +route.params['id'];

    return new Observable<boolean>(observer => {
        this.store.select('recipes')
        .take(1)
        .subscribe((recipesState) => {
          if (idAccessed >= 0 && idAccessed < recipesState.recipes.length) {
            return observer.next(true);
          } else {
            this.router.navigate(['']);
            return observer.next(false);
          }
        });
      }
    );
  }

}
