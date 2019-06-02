import * as actionTypes from '../actions/rootActions';
import * as authenticationService from '../services/autService';

let autData = JSON.parse(localStorage.getItem('autData'));
const initialState = autData ?
    {
        loggedIn: true,
        autData,
        name: ''
    } : {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTORIZE:
            authenticationService.AutorizationService(action.email, action.password);
            console.log(autData);
            return {
                ...state,
                name: autData
            }
        case actionTypes.REGISTER:
            return {
                autData
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
