import axios from "axios";
import {ENDPOINT} from "../../Constant/ENDPOINT";

export const getUserInfo = (username, token) => {
    if (token.substring(0, 3) !== 'JWT') {
        token = 'Bearer ' + token
    }
    return axios.get(ENDPOINT + 'users/user/user-info?name=' + username, {
        headers: {
            Authorization: token
        }
    })
}

export const getUserByDisplayName = (username, token) => {
    if (token.substring(0, 3) !== 'JWT') {
        token = 'Bearer ' + token
    }
    return axios.get(ENDPOINT + 'users/user/display-name?name=' + username, {
        headers: {
            Authorization: token
        }
    })
}

export const getUserList = (token) => {
    if (token.substring(0, 3) !== 'JWT') {
        token = 'Bearer ' + token
    }
    return axios.get(ENDPOINT + 'users/leaderboard', {
        headers: {
            Authorization: token
        }
    })
}

export const updateUserAvatar = (username, imageUrl, token) => {
    if (token.substring(0, 3) !== 'JWT') {
        token = 'Bearer ' + token
    }
    return axios.put(ENDPOINT + 'users/update', {
        username,
        avatar: imageUrl
    }, {
        headers: {
            Authorization: token
        }
    })
}
