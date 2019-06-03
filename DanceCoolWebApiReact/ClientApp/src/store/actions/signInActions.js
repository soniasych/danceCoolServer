import * as actionTypes from './actionTypes';
import axios from 'axios';

export const SignInStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    };
};

export const SignInSuccess = (authData) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        authData: authData
    };
};

export const SignInFailed = (error) => {
    return {
        type: actionTypes.SIGN_IN_FAILED,
        error: error
    };
};

export const SignIn = (email, password) => {
    return dispatch => {
        const signUpData = {
            email: email,
            password: password
        }
        dispatch(SignInStart());
        axios.post('api/register', signUpData)
            .then(response => {
                console.log(response);
                dispatch(SignInSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(SignInFailed(error))
            });
    }
};