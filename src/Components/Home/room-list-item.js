import React, {useState} from 'react';
import {Modal, Button, FormControl} from "react-bootstrap";
import { MdLockOutline , MdLockOpen} from "react-icons/md";
import { RiParentLine } from "react-icons/ri";

const RoomListItem = (props) => {
    const [isModalShow, setIsModalShow] = useState(false)
    const [roomPassword, setRoomPassword] = useState('')

    const handleJoinRoomButton = () => {
        if (props.item.type === 'private') {
            setIsModalShow(true)
        } else {
            props.handleJoinRoom({
                id: props.item.id,
            })
        }
    }

    const handleJoinPrivateRoomButton = () => {
        if (roomPassword && roomPassword === props.item.password) {
            props.handleJoinRoom({
                id: props.item.id,
            })
        }
    }

    const passwordRoomModal = () => {
        return (
            <Modal show={isModalShow} onHide={() => {setIsModalShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter room password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl placeholder='Room password'
                                 value={roomPassword}
                                 onChange={e => setRoomPassword(e.target.value)}>
                    </FormControl>
                    {roomPassword && roomPassword !== props.item.password && <p style={{color: '#BF2F15'}}>Incorrect room password</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleJoinPrivateRoomButton}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <tr>
            <td>{`#${props.item.id}`}</td>
            <td>{props.item.name}</td>
            <td>{props.item.type === 'private' ? <MdLockOutline/> : props.item.type === 'public' ? <MdLockOpen/> : <RiParentLine/>}</td>
            <td>{props.item.players.length < 2 ? 'waiting' : 'playing'}</td>
            <td>
                {props.item.players.length < 2 && props.item.type !== 'buddy' &&
                <Button onClick={handleJoinRoomButton}>Join</Button>}
            </td>
            {passwordRoomModal()}
        </tr>
    )
};

export default RoomListItem;
