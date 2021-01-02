import axios from "axios";
import {ENDPOINT} from "../../Constant/ENDPOINT";

export const signUpService = (username, email, password) => {
    return axios.post(ENDPOINT + 'user/register', {
        username,
        email,
        password
    })
}

export const signInService = (username, password) => {
    return axios.post(ENDPOINT + 'users/signin', {
        username,
        password
    })
}
