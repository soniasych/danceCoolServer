import * as actionTypes from '../actions/actionTypes';
import updateObject from '../helpers/updateObject';

const initialState = {
    email: null,
    access_token: null,
    loading: false,
    error: null
};

const logInStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const logInSuccess = (state, action) => {
    return updateObject(state, {
        email: action.email,
        access_token: action.access_token,
        loading: false,
        error: null
    });
}

const logInFailed = (state, action) => {
    return updateObject(state,
        {
            error: action.error,
            loading: false
        });
}

const logOut = (state, action)=>{
    return updateObject(state, {
        token:null, 
        email:null 
    });
}

const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN_START: return logInStart(state, action);
        case actionTypes.LOG_IN_SUCCESS: return logInSuccess(state, action);
        case actionTypes.LOG_IN_FAILED: return logInFailed(state, action);
        case actionTypes.LOG_OUT: return logOut(state, action);
        default:
            return state;
    }
};

export default logInReducer;
