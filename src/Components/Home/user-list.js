import React, {useState} from 'react';
import {Button, Container, Card} from "react-bootstrap";
import randomColor from 'randomcolor'
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";

const UserListItem = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const handleInviteButton = () => {
        props.handleInvite(props.item)
    }

    const random_color = randomColor({
        luminosity: 'dark',
        hue: 'blue'
    })

    return (
        <Card style={{backgroundColor: random_color, margin: 5}}>
            <Card.Body style={{padding: 5, backgroundColor: random_color, display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='clear' style={{color: 'white', fontWeight: 'bold'}} onClick={handleOnClick}>{`@${props.item}`}</Button>
                {user.displayName !== props.item &&
                <Button variant='primary' style={{color: 'white'}} onClick={handleInviteButton}>Invite</Button>}
            </Card.Body>
        </Card>
    )
}

const UserList = (props) => {
    const history = useHistory()

    const handleOnClickPlayerProfile = (user) => {
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user,
        })
    }

    const handleInviteButton = (player) => {
        props.socket.emit('Invite-Player', player, (returnData) => {
            history.push({
                pathname: '/game',
                search: '?room=' + returnData.id,
                state: returnData
            })
        })
    }

    return (
        <Container fluid>
            <h5 style={{fontWeight: 'bold', textAlign: 'center', color: '#153FF2', paddingTop: 5}}>Online Users</h5>
            {props.items.map((item) => <UserListItem key={item}
                                                     item={item}
                                                     handleInvite={handleInviteButton}
                                                     handleOnClick={handleOnClickPlayerProfile}/>)}
        </Container>
    )
};

export default UserList;
