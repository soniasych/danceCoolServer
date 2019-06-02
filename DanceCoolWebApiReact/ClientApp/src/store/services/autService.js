import Axios from "axios";

export const AutorizationService = (email, password) => {
    Axios.post('api/autorize', {
        email: email,
        password: password
    })
        .then(autData => {
            if (autData && autData.data) {
                localStorage.setItem('autData', JSON.stringify(autData.data));
            }
            return autData.data;
        })
}