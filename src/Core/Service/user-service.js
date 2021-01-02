// import axios from "axios";
// import {ENDPOINT} from "../../Constant/ENDPOINT";
import {BOARD_SIZE} from "../../Components/Game/board";

export const getUserInfoService = (username) => {
    return {
        username: 'nganhthu',
        joinedDate: '2020/12/20',
        rank: 'diamond',
        winningPercentage: '34%'
    }
}

export const getUserWithGameInfoService = (username) => {
    return {
        username: 'nganhthu',
        joinedDate: 'Fri, Jan 01 2021',
        rank: 'diamond',
        winningPercentage: '34%',
        games: [
            {
                _id: '12321',
                room: 'chicken',
                playedDate: "Fri, 01 Jan 2021 03:54:24 GMT",
                turn:{
                    move_x: "anhthu",
                    move_o: "duytuan",
                },
                history: [
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null)
                ],
                messages: [
                    {
                        sender: "admin",
                        message: "anhthu has joined room"
                    },
                    {
                        sender: "admin",
                        message: "duytuan has joined room"
                    }
                ]
            },
            {
                _id: '12351',
                room: 'duck',
                playedDate: "Fri, 01 Jan 2021 03:54:24 GMT",
                turn:{
                    move_x: "anhthu",
                    move_o: "duytuan",
                },
                history: [
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
                    Array(BOARD_SIZE * BOARD_SIZE).fill(null)
                ],
                messages: [
                    {
                        sender: "admin",
                        message: "anhthu has joined room"
                    },
                    {
                        sender: "admin",
                        message: "duytuan has joined room"
                    }
                ]
            }
        ]
    }
}
