import { Action } from '@ngrx/store';

import * as firebaseSDK from 'firebase';

import { Ingredient } from '../../model/ingredient';

export const TRY_REGISTER = 'TRY_REGISTER';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const TRY_LOGOUT = 'TRY_LOGOUT';
export const REGISTER = 'REGISTER';
export const SIGNIN = 'SIGNIN';
export const UPDATEAUTH = 'UPDATEAUTH';
export const LOGOUT = 'LOGOUT';

export class TryRegister implements Action {
    readonly type = TRY_REGISTER;
    constructor (public payload: { username: string, password: string }) {}
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;
    constructor (public payload: { username: string, password: string }) {}
}

export class TryLogout implements Action {
    readonly type = TRY_LOGOUT;
}

export class Register implements Action {
    readonly type = REGISTER;
    constructor (public payload: firebaseSDK.User) {}
}

export class Signin implements Action {
    readonly type = SIGNIN;
    constructor (public payload: firebaseSDK.User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = TryRegister | TrySignin | TryLogout | Register | Signin | Logout;
