import * as actionTypes from '../actions/rootActions';
import * as authenticationService from '../services/autService';

let autData = JSON.parse(localStorage.getItem('autData'));
const initialState = autData ?
    {
        loggedIn: true,
        autData,
        email: ''
    } : {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTORIZE:
            authenticationService.AutorizationService(action.email, action.password);
            console.log(autData);
            return {
                ...state,
                email: autData.name
            }
        case actionTypes.REGISTER:
            return {
                autData
            }
        case actionTypes.LOG_OF:
            return {
                userFirstName: ''
            }
        default:
            break;
    }
    return state;
}


export default authReducer;
