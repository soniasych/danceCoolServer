import * as authenticationService from '../services/autService';

let authData = localStorage.getItem('authData');
const initialState = authData ? { loggedIn: true, authData } : {};

export function authReducer(state = initialState, action) {
  
    return state;
}


export default authReducer;
