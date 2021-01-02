import React, {useState} from 'react';
import {Dropdown, DropdownButton, Modal, Button, FormControl} from "react-bootstrap";
import { MdLockOutline , MdLockOpen, MdShuffle} from "react-icons/md";

const RoomListItem = (props) => {
    const [isModalShow, setIsModalShow] = useState(false)
    const [roomPassword, setRoomPassword] = useState('')
    const [joinAs, setJoinAs] = useState('')

    const handleAsPlayerButton = () => {
        if (props.item.roomType === 'private') {
            setIsModalShow(true)
            setJoinAs('player')
        } else {
            props.handleJoinRoom({
                roomId: props.item.roomId,
                join_as: 'player',
            })
        }
    }

    const handleAsWatcherButton = () => {
        if (props.item.roomType === 'private') {
            setIsModalShow(true)
            setJoinAs('watcher')
        } else {
            props.handleJoinRoom({
                roomId: props.item.roomId,
                join_as: 'watcher',
            })
        }
    }

    const handleJoinRoomButton = () => {
        if (roomPassword && roomPassword === props.item.roomPassword) {
            props.handleJoinRoom({
                roomId: props.item.roomId,
                join_as: joinAs,
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
                    {roomPassword && roomPassword !== props.item.roomPassword && <p style={{color: '#BF2F15'}}>Incorrect room password</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleJoinRoomButton}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <tr>
            <td>{`#${props.item.roomId}`}</td>
            <td>{props.item.roomName}</td>
            <td style={{textAlign: 'center'}}>{props.item.roomType === 'private' ? <MdLockOutline/> : props.item.roomType === 'public' ? <MdLockOpen/> : <MdShuffle/> }</td>
            <td>{props.item.players.length < 2 ? 'waiting' : 'playing'}</td>
            <td style={{textAlign: 'center'}}>{`${props.item.players.length}`}</td>
            <td style={{textAlign: 'center'}}>{`${props.item.watchers.length}`}</td>
            <td>
                {props.item.roomType !=='random' &&
                <DropdownButton
                    disabled={props.item.roomType==='random'}
                    title="Join">
                    {props.item.players.length < 2 &&
                        <Dropdown.Item onClick={handleAsPlayerButton}>
                        As player
                        </Dropdown.Item>}
                        <Dropdown.Item onClick={handleAsWatcherButton}>
                            As watcher
                        </Dropdown.Item>
                </DropdownButton>}
            </td>
            {passwordRoomModal()}
        </tr>
    )
};

export default RoomListItem;
