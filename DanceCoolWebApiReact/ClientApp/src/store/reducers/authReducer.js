import * as actionTypes from '../actions/rootActions';
import * as authenticationService from '../services/autService';

let authData = JSON.parse(localStorage.getItem('authData'));
const initialState =
{
    authEmail: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTORIZE:
            authenticationService.AutorizationService(action.email, action.password);
            return {
                authEmail: authData.name
            }
        case actionTypes.REGISTER:
            return {
            }
        case actionTypes.LOG_OUT:
            authenticationService.logout();
            return {
                name: ''
            }
        default:
            break;
    }
    return state;
}


export default authReducer;
