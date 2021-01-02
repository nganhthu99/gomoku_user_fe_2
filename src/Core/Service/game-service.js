import {BOARD_SIZE} from "../../Components/Game/board";

export const getGameHistoryService = (gameId) => {
    return {
        _id: '12321',
        room: 'chicken',
        playedDate: "Fri, 01 Jan 2021 03:54:24 GMT",
        turn:{
            move_x: "anhthu",
            move_o: "duytuan",
        },
        history: [
            Array(BOARD_SIZE * BOARD_SIZE).fill(null),
            [
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, 'X', null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, 'O', null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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
}
