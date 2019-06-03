import Axios from "axios";

export const AutorizationService = (email, password) => {
    Axios.post('api/autorize', {
        email: email,
        password: password
    }).then(response => {
        let authData = response.data;
        if(response && authData){
            let authData = response.data;
            localStorage.setItem('authData', authData)
        }
        return authData;
    });
}

export const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}