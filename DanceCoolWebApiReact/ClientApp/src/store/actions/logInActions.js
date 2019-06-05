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
    localStorage.removeItem('authData');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.LOG_OUT
    };
};

export const LogInStart = () => {
    return {
        type: actionTypes.LOG_IN_START
    };
};

export const LogInSuccess = (access_token, token_lifeTime, email, firstName, lastName, roleName) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        access_token: access_token,
        token_lifeTime: token_lifeTime,
        email: email,
        firstName: firstName,
        lastName: lastName,
        roleName: roleName
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
                const expirationDate = new Date(new Date().getTime() + response.data.token_lifeTime);
                localStorage.setItem('authData', JSON.stringify(response.data));
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(LogInSuccess(
                    response.data.access_token,
                    response.data.token_lifeTime,
                    response.data.email,
                    response.data.firstName,
                    response.data.lastName,
                    response.data.role));
                dispatch(checkLogInTimeOut(response.data.token_lifeTime));
            })
            .catch(error => {
                console.log(error);
                dispatch(LogInFailed(error))
            });
    }
};

export const CheckLogInState = () => {
    return dispatch => {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (!authData) {
            dispatch(LogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                dispatch(LogInSuccess(authData.access_token,
                    authData.token_lifeTime,
                    authData.email,
                    authData.firstName,
                    authData.lastName));
                dispatch(checkLogInTimeOut(authData.token_lifeTime));
            } else {
                dispatch(LogOut());
            }

        }

    };
};