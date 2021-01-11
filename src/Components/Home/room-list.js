import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, FormControl, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import RoomListItem from "./room-list-item";
import AddRoomModal from "./add-room-modal";

const RoomList = (props) => {
    const history = useHistory()
    const [listRooms, setListRooms] = useState(props.items)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (searchInput) {
            setListRooms(prev => prev.filter(room => room.name.includes(searchInput)))
        } else {
            setListRooms(props.items)
        }
    }, [props.items, searchInput])

    const handlePlayNow = () => {
        props.socket.emit('Find-Random-Room', (returnData) => {
            history.push({
                pathname: '/game',
                search: '?room=' + returnData.id,
                state: returnData
            })
        })
    }

    const handleCreateRoom = (data) => {
        props.socket.emit('Create-Room', data, (returnData) => {
            history.push({
                pathname: '/game',
                search: '?room=' + returnData.id,
                state: returnData
            })
        });
    }

    const handleJoinRoom= (data) => {
        props.socket.emit('Join-Room', data, (returnData) => {
            history.push({
                pathname: '/game',
                search: '?room='+ returnData.id,
                state: returnData
            })
        })
    }

    return (
        <Container fluid>
            <Row>
                <h5 style={{flexGrow: 1, fontWeight: 'bold', color: '#153FF2', textAlign: 'center', paddingTop: 5}}>List Rooms</h5>
                <FormControl
                    onChange={(e) => {setSearchInput(e.target.value)}}
                    type="text"
                    placeholder="Search room"
                    style={{width: '30%', margin: 2}}/>
                <AddRoomModal handleCreateRoom={handleCreateRoom}/>
                <Button variant="success"
                        style={{margin: 2, marginRight: 30, padding: 5}}
                        onClick={handlePlayNow}>
                    Play Now
                </Button>
            </Row>
            <Table hover>
                <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Room Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {listRooms.map((item) => <RoomListItem key={item.id}
                                                           item={item}
                                                           handleJoinRoom={handleJoinRoom}/>)}
                </tbody>
            </Table>
        </Container>
    )
};

export default RoomList;
