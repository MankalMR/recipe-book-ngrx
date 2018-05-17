import { RecipeService } from './../services/recipe.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ValidateIdGuardService implements CanActivate {

  constructor(private rService: RecipeService, private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot)
               : Observable<boolean> | Promise<boolean> | boolean {

    const idAccessed = +route.params['id'];

    if (idAccessed >= 0 && idAccessed < this.rService.noOfRecipes) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }

}
