import React, {useContext, useEffect, useState} from 'react';
import {Navbar, Dropdown, DropdownButton, Row, Col} from "react-bootstrap";
import RoomList from "./room-list";
import UserList from "./user-list";
import {io} from "socket.io-client"
import {useHistory} from "react-router-dom";
import {SocketContext} from "../../Core/Provider/socket-provider";
import {RouteName} from "../../Constant/route";
import {ENDPOINT} from "../../Constant/ENDPOINT";

const Home = (props) => {
    const history = useHistory()
    const [user, setUser] = useState(localStorage.getItem('username'))
    const {socket, setSocket} = useContext(SocketContext)
    const [listUsers, setListUsers] = useState([])
    const [listRooms, setListRooms] = useState([])

    useEffect(() => {
        if (user === null) {
            history.push(RouteName.SignIn)
        }
    }, [history, user])

    useEffect(() => {
        if (user) {
            setSocket(io(ENDPOINT, {
                transports: ['websocket'],
                query: {
                    username: localStorage.getItem('username')
                }
            }))
        }
    }, [user, setSocket])

    useEffect(() => {
        if (socket !== null) {
            socket.on('Online-Users', (data) => {
                setListUsers(data)
            })

            socket.on('Active-Rooms', (data) => {
                setListRooms(data)
            })
        }
    },[socket])

    const handleProfileButton = () => {
        // history.push(RouteName.Profile)
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user,
        })
    }

    const handleSignOutButton = () => {
        localStorage.clear()
        setUser(null)
        socket.disconnect()
        setSocket(null)
    }

    return (
        <div>
            <Navbar style={{backgroundColor: '#E5F3FC'}}>
                <Navbar.Brand style={{color: '#153FF2', fontWeight: 'bold', flexGrow: 1}}>
                    GOMOKU
                </Navbar.Brand>
                <DropdownButton
                    menuAlign="right"
                    title={user}>
                    <Dropdown.Item onClick={handleProfileButton}>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOutButton}>
                        Sign Out
                    </Dropdown.Item>
                </DropdownButton>
            </Navbar>
            <Row noGutters>
                <Col xs={12} md={9} style={{paddingTop: 10}}>
                    <RoomList items={listRooms}
                              socket={socket}/>
                </Col>
                <Col xs={12} md={3} style={{paddingTop: 10}}>
                    <UserList items={listUsers}/>
                </Col>
            </Row>
        </div>
    )
};

export default Home;
