import axios from "axios";
import {ENDPOINT} from "../../Constant/ENDPOINT";

export const getGameService = (gameId, token) => {
    if (token.substring(0, 3) !== 'JWT') {
        token = 'Bearer ' + token
    }
    return axios.get(ENDPOINT + 'users/user/game?id=' + gameId, {
        headers: {
            Authorization: token
        }
    })
}
