import * as actionTypes from './actionTypes';
import axios from 'axios';

export const checkLogInTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(LogOut());
        }, expirationTime);
    };
};

export const LogOut = () => {
    return {
        type: actionTypes.LOG_OUT
    };
};

export const LogInStart = () => {
    return {
        type: actionTypes.LOG_IN_START
    };
};

export const LogInSuccess = (access_token, token_lifeTime, email, firstName, lastName) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        access_token: access_token,
        token_lifeTime: token_lifeTime,
        email: email,
        firstName: firstName,
        lastName: lastName
    };
};

export const LogInFailed = (error) => {
    return {
        type: actionTypes.LOG_IN_FAILED,
        error: error
    };
};

export const LogIn = (email, password) => {
    return dispatch => {
        dispatch(LogInStart());
        const logInData = {
            email: email,
            password: password
        }
        axios.post('api/autorize', logInData)
            .then(response => {
                console.log(response);
                dispatch(LogInSuccess(
                    response.data.access_token,
                    response.data.token_lifeTime,
                    response.data.email,
                    response.data.firstName,
                    response.data.lastName));
                dispatch(checkLogInTimeOut(response.data.token_lifeTime));
            })
            .catch(error => {
                console.log(error);
                dispatch(LogInFailed(error))
            });
    }
};