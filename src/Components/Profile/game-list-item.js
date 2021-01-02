import React from 'react';

const GameListItem = (props) => {
    const user = localStorage.getItem('username')
    const rival = (props.item.turn.move_x === user) ? props.item.turn.move_o : props.item.turn.move_x

    const handleOnClick = () => {
        props.handleClick(props.item._id)
    }

    return (
        <tr onClick={handleOnClick}>
            <td>{props.item.playedDate}</td>
            <td>{props.item.room}</td>
            <td>{rival}</td>
        </tr>
    )
};

export default GameListItem;
