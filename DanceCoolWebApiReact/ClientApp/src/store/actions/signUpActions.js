import * as actionTypes from './actionTypes';
import axios from 'axios';

export const SignUpStart = () => {
    return {
        type: actionTypes.AUTHORIZE_START
    };
};

export const SignUpSuccess = (authData) => {
    return {
        type: actionTypes.AUTHORIZE_SUCCESS,
        authData: authData
    };
};

export const SignUpFailed = (error) => {
    return {
        type: actionTypes.AUTHORIZE_FAILED,
        error: error
    };
};

export const SignUp = (firstName, lastName, phoneNumber, email, password) => {
    return dispatch => {
        const signUpData={
            firstName:firstName,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            password
        }
        dispatch(SignUpStart());
        axios.post('api/register', signUpData)
            .then(response=>{
                console.log(response);
                dispatch(SignUpSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(SignUpFailed(error))
            });
    }
};