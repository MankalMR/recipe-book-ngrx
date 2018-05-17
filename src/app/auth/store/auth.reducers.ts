import * as AuthActions from './auth.actions';

export interface State {
    authenticated: boolean;
    displayName: string;
}

const initialState = {
    authenticated: false,
    displayName: null
};

export function authReducer (state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.REGISTER:
        case AuthActions.SIGNIN: {
            const currUser = action.payload;
            const displayName = currUser.displayName ? currUser.displayName : 'User';
            return {
                ...state,
                authenticated: true,
                displayName: displayName
            };
        }
        case AuthActions.LOGOUT: {
            return {
                ...state,
                authenticated: false,
                displayName: null
            };
        }
        default: return state;
    }
}
