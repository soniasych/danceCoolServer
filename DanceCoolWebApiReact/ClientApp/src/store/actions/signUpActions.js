import * as actionTypes from './actionTypes';
import axios from 'axios';

export const SignUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START
    };
};

export const SignUpSuccess = (signUpData) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        signUpData: signUpData
    };
};

export const SignUpFailed = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAILED,
        error: error
    };
};

export const SignUp = (firstName, lastName, phoneNumber, email, password) => {
    return dispatch => {
        const signUpData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        }
        dispatch(SignUpStart());
        axios.post('api/register', signUpData)
            .then(response => {
                console.log(response);
                dispatch(SignUpSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(SignUpFailed(error))
            });
    }
};