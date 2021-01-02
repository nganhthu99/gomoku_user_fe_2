import React, {useState} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";
import {Radio, RadioGroup} from "react-radio-group";

const AddRoomModal = (props) => {
    const [isModalShow, setIsModalShow] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [roomType, setRoomType] = useState('public')
    const [roomPassword, setRoomPassword] = useState('')

    const handleCreateRoomButton = () => {
        if (roomName && roomName.length <= 20) {
            if (roomType === 'public' || (roomType === 'private' && roomPassword)){
                props.handleCreateRoom({
                    roomName,
                    roomType,
                    roomPassword
                })
            }
        }
    }

    return (
        <>
            <Button style={{width: '15%', margin: 2}}
                    onClick={() => {setIsModalShow(true)}}>
                Add Room
            </Button>
            <Modal show={isModalShow} onHide={() => {setIsModalShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RadioGroup name="room_type"
                                selectedValue={roomType}
                                style={{marginBottom: 10}}
                                onChange={(value) => {setRoomType(value)}}>
                        <div style={{marginBottom: 5}}>
                            <Radio value="public"/>  Public room
                        </div>
                        <div>
                            <Radio value="private"/>  Private room
                        </div>
                    </RadioGroup>
                    <FormControl placeholder='Room name'
                                 value={roomName}
                                 style={{marginBottom: 10}}
                                 onChange={e => setRoomName(e.target.value)}>
                    </FormControl>
                    {roomName && roomName.length > 20 && <p style={{color: '#BF2F15'}}>Room name should have at most 20 characters</p>}
                    {roomType === 'private' &&
                    <FormControl placeholder='Room password'
                                 value={roomPassword}
                                 onChange={e => setRoomPassword(e.target.value)}>
                    </FormControl>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCreateRoomButton}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default AddRoomModal;
