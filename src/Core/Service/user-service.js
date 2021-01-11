import axios from "axios";
import {ENDPOINT} from "../../Constant/ENDPOINT";

export const getUserInfo = (username, token) => {
    return axios.get(ENDPOINT + 'users/user/user-info?name=' + username, {
        headers: {
            Authorization: token
        }
    })
}

export const getUserByUsername = (username, token) => {
    console.log('token: ', token)
    console.log('username: ', username)
    return axios.get(ENDPOINT + 'users/user?username=' + username, {
        headers: {
            Authorization: token
        }
    })
}

export const getUserByDisplayName = (username, token) => {
    return axios.get(ENDPOINT + 'users/user/display-name?name=' + username, {
        headers: {
            Authorization: token
        }
    })
}

export const getUserList = (token) => {
    return axios.get(ENDPOINT + 'users/leaderboard', {
        headers: {
            Authorization: token
        }
    })
}

export const updateUserAvatar = (username, imageUrl, token) => {
    return axios.put(ENDPOINT + 'users/update', {
        username,
        avatar: imageUrl
    }, {
        headers: {
            Authorization: token
        }
    })
}
