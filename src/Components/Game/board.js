import React from "react";
import Square from "./square";

export const BOARD_SIZE = 20

const Board = (props) => {
    const renderSquare = (i) => {
        let isColored = false
        let line = props.winnerLine
        for (let j = 0; j < line.length; j++) {
            if (i === line[j]) {
                isColored = true
            }
        }
        return <Square key={i}
                       value={props.squares[i]}
                       onClickHandle={() => props.onClickHandle(i)}
                       isColored={isColored}/>;
    }
    const createSquares = (n) => {
        let row = []
        for (let i = 0; i < n; i++) {
            let column = []
            for (let j = 0; j < n; j++) {
                column.push(renderSquare(n * i + j))
            }
            row.push(<div key={i} style={{display: 'flex', margin: 0}}>{column}</div>)
        }
        return row
    }

    return (
        <div>
            {createSquares(BOARD_SIZE)}
        </div>
    )
}

export default Board
