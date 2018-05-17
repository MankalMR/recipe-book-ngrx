import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as firebaseSDK from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authRegister = this.action$
                    .ofType(AuthActions.TRY_REGISTER)
                    .switchMap((action: AuthActions.TryRegister) => {
                        const authData: {username: string, password: string} = action.payload;
                        return fromPromise(firebaseSDK.auth().createUserWithEmailAndPassword(authData.username, authData.password));
                    })
                    .map(() => {
                        this.router.navigate(['/']);
                        return {
                            type: AuthActions.REGISTER,
                            payload: firebaseSDK.auth().currentUser
                        };
                    });

    @Effect()
    authSignin = this.action$
                    .ofType(AuthActions.TRY_SIGNIN)
                    .switchMap((action: AuthActions.TrySignin) => {
                        const authData: {username: string, password: string} = action.payload;
                        return fromPromise(firebaseSDK.auth().signInWithEmailAndPassword(authData.username, authData.password));
                    })
                    .map(() => {
                        this.router.navigate(['/']);
                        return {
                            type: AuthActions.SIGNIN,
                            payload: firebaseSDK.auth().currentUser
                        };
                    });

    @Effect()
    authLogout = this.action$
                    .ofType(AuthActions.TRY_LOGOUT)
                    .switchMap((action: AuthActions.TryLogout) => {
                        return fromPromise(firebaseSDK.auth().signOut());
                    })
                    .map(() => {
                        this.router.navigate(['/']);
                        return {
                            type: AuthActions.LOGOUT
                        };
                    });

    constructor (private action$: Actions, private router: Router) {}
}
