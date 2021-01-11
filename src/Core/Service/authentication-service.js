import axios from "axios";
import {ENDPOINT} from "../../Constant/ENDPOINT";

export const signUpService = (username, email, password, displayName) => {
    return axios.post(ENDPOINT + 'users/signup', {
        username,
        email,
        password,
        displayName
    }, {
        validateStatus: () => true
    })
}

export const signUpSocialAccountService = (id, email, displayName) => {
    return axios.post(ENDPOINT + 'users/signup', {
        username: id,
        email,
        displayName
    }, {
        validateStatus: () => true
    })
}

export const signInService = (username, password) => {
    return axios.post(ENDPOINT + 'users/signin', {
        username,
        password
    })
}

export const checkUsernameEmailService = (id, email) => {
    return axios.post(ENDPOINT + 'users/check', {
        username: id,
        email
    }, {
        validateStatus: () => true
    })
}

export const requestVerificationService = (username) => {
    return axios.post(ENDPOINT + 'users/request-password-reset', {
        username
    }, {
        validateStatus: () => true
    })
}

export const resetPasswordService = (token, password) => {
    return axios.post(ENDPOINT + 'users/reset-password?token=' + token, {
        newPassword: password
    }, {
        validateStatus: () => true
    })
}

export const requestEmailVerification = (token, username) => {
    return axios.post(ENDPOINT + 'users/request-verification', {
        username
    }, {
        headers: {
            Authorization: token
        },
        validateStatus: () => true
    })
}
