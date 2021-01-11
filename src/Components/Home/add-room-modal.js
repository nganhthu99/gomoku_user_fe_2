import React, {useState} from 'react';
import {Button, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap";
import {Radio, RadioGroup} from "react-radio-group";

const AddRoomModal = (props) => {
    const [isModalShow, setIsModalShow] = useState(false)
    const [name, setName] = useState('')
    const [time, setTime] = useState(2)
    const [type, setType] = useState('public')
    const [password, setPassword] = useState('')

    const handleCreateRoomButton = () => {
        if (name && name.length <= 20 && time) {
            if (type === 'public' || (type === 'private' && password)){
                props.handleCreateRoom({
                    name,
                    type,
                    password,
                    time
                })
            }
        }
    }

    return (
        <>
            <Button style={{margin: 2, padding: 5}}
                    onClick={() => {setIsModalShow(true)}}>
                Add Room
            </Button>
            <Modal show={isModalShow} onHide={() => {setIsModalShow(false)}}>
                <Modal.Header closeButtoncloseButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RadioGroup name="room_type"
                                selectedValue={type}
                                style={{marginBottom: 10}}
                                onChange={(value) => {setType(value)}}>
                        <div style={{marginBottom: 5}}>
                            <Radio value="public"/>  Public room
                        </div>
                        <div>
                            <Radio value="private"/>  Private room
                        </div>
                    </RadioGroup>
                    <FormGroup>
                        <FormLabel>Room name</FormLabel>
                        <FormControl
                                     value={name}
                                     style={{marginBottom: 10}}
                                     onChange={e => setName(e.target.value)}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Room time-out settings (in minute)</FormLabel>
                        <FormControl
                                     value={time}
                                     style={{marginBottom: 10}}
                                     onChange={e => setTime(Number(e.target.value))}>
                        </FormControl>
                    </FormGroup>
                    {name && name.length > 20 && <p style={{color: '#BF2F15'}}>Room name should have at most 20 characters</p>}
                    {type === 'private' &&
                        <FormGroup>
                            <FormLabel>Room password</FormLabel>
                            <FormControl
                                         value={password}
                                         onChange={e => setPassword(e.target.value)}>
                            </FormControl>
                        </FormGroup>}
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
