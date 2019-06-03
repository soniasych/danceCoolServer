import * as actionTypes from './actionTypes';
import axios from 'axios';

export const LogInStart = () => {
    return {
        type: actionTypes.LOG_IN_START
    };
};

export const LogInSuccess = (name, access_token) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        email: name,
        access_token: access_token
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
                dispatch(LogInSuccess(response.data.name, response.data.access_token));
            })
            .catch(error => {
                console.log(error);
                dispatch(LogInFailed(error))
            });
    }
};