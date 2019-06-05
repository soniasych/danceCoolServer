import * as actionTypes from '../actions/actionTypes';
import updateObject from '../helpers/updateObject';

const initialState = {
    access_token: null,
    token_lifeTime: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
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
        access_token: action.access_token,
        token_lifeTime: action.token_lifeTime,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
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

const logOut = (state, action) => {
    return updateObject(state, {
        access_token: null,
        email: null,
        firstName: null,
        lastName: null
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
