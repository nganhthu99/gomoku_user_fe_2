import React, {useContext, useEffect, useState} from 'react';
import {Navbar, Dropdown, DropdownButton, Row, Col, Button, Container, Spinner} from "react-bootstrap";
import RoomList from "./room-list";
import UserList from "./user-list";
import {io} from "socket.io-client"
import {useHistory} from "react-router-dom";
import {SocketContext} from "../../Core/Provider/socket-provider";
import {RouteName} from "../../Constant/route";
import {ENDPOINT} from "../../Constant/ENDPOINT";
import { GiTrophyCup } from "react-icons/gi";
import InvitationModal from "./invitation-modal";

const Home = (props) => {
    const history = useHistory()
    const {socket, setSocket} = useContext(SocketContext)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [listUsers, setListUsers] = useState([])
    const [listRooms, setListRooms] = useState([])

    const [invitation, setInvitation] = useState(null)

    useEffect(() => {
        if (user === null) {
            history.replace(RouteName.SignIn)
        }
    }, [history, user])

    useEffect(() => {
        if (user) {
            setSocket(io(ENDPOINT, {
                transports: ['websocket'],
                query: {
                    username: user.displayName
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

            socket.on('Invitation', (data) => {
                setInvitation(data)
            })
        }
    },[socket])

    const handleProfileButton = () => {
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user.displayName,
        })
    }

    const handleSignOutButton = () => {
        localStorage.clear()
        setUser(null)
        socket.disconnect()
        setSocket(null)
    }

    const handleRankingButton = () => {
        history.push(RouteName.Ranking)
    }

    const handleReplyInvitation = (accept) => {
        setInvitation(null)
        socket.emit('Reply-Invitation', {
            accept: accept,
            id: invitation.id,
            inviter: invitation.inviter
        }, (returnData) => {
            history.push({
                pathname: '/game',
                search: '?room=' + returnData.id,
                state: returnData
            })
        })
    }

    if (user) {
        return (
            <div>
                <Navbar style={{backgroundColor: '#E5F3FC'}}>
                    <Navbar.Brand style={{color: '#153FF2', fontWeight: 'bold', flexGrow: 1}}>
                        GOMOKU
                    </Navbar.Brand>
                    <Button variant='danger' style={{marginRight: 10}} onClick={handleRankingButton}>
                        Ranking
                        <GiTrophyCup/>
                    </Button>
                    <DropdownButton
                        menuAlign="right"
                        title={user.displayName}>
                        <Dropdown.Item onClick={handleProfileButton}>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleSignOutButton}>
                            Sign Out
                        </Dropdown.Item>
                    </DropdownButton>
                </Navbar>
                <Row noGutters>
                    <Col xs={12} md={8} style={{paddingTop: 10}}>
                        <RoomList items={listRooms}
                                  socket={socket}/>
                    </Col>
                    <Col xs={12} md={4} style={{paddingTop: 10}}>
                        <UserList items={listUsers}
                                  socket={socket}/>
                    </Col>
                </Row>
                <InvitationModal invitation={invitation}
                                 handleReplyInvitation={handleReplyInvitation}/>
            </div>
        )
    } else {
        return (
            <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant='primary'/>
            </Container>
        )
    }
};

export default Home;
