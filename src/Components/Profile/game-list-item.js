import React from 'react';

const GameListItem = (props) => {
    const handleOnClick = () => {
        props.handleClick(props.item._id)
    }

    return (
        <tr onClick={handleOnClick}>
            <td>{props.item.playedDate}</td>
            <td>{props.item.room}</td>
            <td>{props.item.winner}</td>
        </tr>
    )
};

export default GameListItem;
