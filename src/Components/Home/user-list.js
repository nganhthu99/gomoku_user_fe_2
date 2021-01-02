import React from 'react';
import {Button, Container, Card} from "react-bootstrap";
import randomColor from 'randomcolor'
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";

const UserListItem = (props) => {
    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const random_color = randomColor({
        luminosity: 'dark'
    })

    return (
        <Card style={{backgroundColor: random_color, margin: 5}}>
            <Card.Body style={{padding: 5, backgroundColor: random_color}}>
                <Button variant='clear' style={{color: 'white', fontWeight: 'bold'}} onClick={handleOnClick}>{`@${props.item}`}</Button>
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

    return (
        <Container fluid>
            <h5 style={{fontWeight: 'bold', textAlign: 'center', color: '#153FF2', paddingTop: 5}}>Online Users</h5>
            {props.items.map((item) => <UserListItem key={item} item={item} handleOnClick={handleOnClickPlayerProfile}/>)}
        </Container>
    )
};

export default UserList;
