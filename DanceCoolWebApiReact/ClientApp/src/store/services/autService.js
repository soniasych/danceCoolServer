import Axios from "axios";

export const AutorizationService = (email, password) => {
    Axios.post('api/autorize', {
        email: email,
        password: password
    }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
    });
}

export const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}