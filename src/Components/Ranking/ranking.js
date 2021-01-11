import React, {useEffect, useState} from 'react';
import {Button, Card, Navbar, Row, Col, Container, Spinner} from "react-bootstrap";
import randomColor from "randomcolor";
import {GiTrophyCup} from "react-icons/gi";
import {useHistory} from "react-router-dom";
import {RouteName} from "../../Constant/route";
import {getUserList} from "../../Core/Service/user-service";

const RankingItem = (props) => {
    const random_color = randomColor({
        luminosity: 'dark'
    })

    const handleOnClick = () => {
        props.handleOnClick(props.item.displayName)
    }

    return (
        <Row style={{justifyContent: 'center', marginLeft: 70, marginRight: 70}} noGutters>
            <Col xs={2} md={1}>
                <Card style={{backgroundColor: random_color, margin: 5}}>
                    <Card.Body style={{padding: 5, backgroundColor: random_color, display: 'flex', justifyContent: 'center'}}>
                        <Button variant='clear' style={{color: 'white', fontWeight: 'bold'}} onClick={handleOnClick}>{`#${Number(props.index) + 1}`}</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={6}>
                <Card style={{backgroundColor: random_color, margin: 5}}>
                    <Card.Body style={{padding: 5, backgroundColor: random_color}}>
                        <Button variant='clear' style={{color: 'white', fontWeight: 'bold'}} onClick={handleOnClick}>{`@${props.item.displayName}`}</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={3} md={2}>
                <Card style={{backgroundColor: random_color, margin: 5}}>
                    <Card.Body style={{padding: 5, backgroundColor: random_color, display: 'flex', justifyContent: 'center'}}>
                        <Button variant='clear' style={{color: 'white', fontWeight: 'bold'}} onClick={handleOnClick}>{`${props.item.cups}`} <GiTrophyCup/></Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

const Ranking = (props) => {
    const history = useHistory()
    const [listUsers, setListUsers] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        getUserList(token)
            .then((response) => {
                if (response.status === 200) {
                    setListUsers(response.data.users)
                }
            })
    }, [])

    const handleOnClickPlayerProfile = (user) => {
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user,
        })
    }

    if (listUsers) {
        return (
            <div>
                <Navbar style={{backgroundColor: '#E5F3FC'}}>
                    <Navbar.Brand style={{color: '#153FF2', fontWeight: 'bold', flexGrow: 1}}>
                        GOMOKU
                    </Navbar.Brand>
                </Navbar>
                <Row style={{justifyContent: 'center'}}>
                    <h5 style={{flexGrow: 1, fontWeight: 'bold', color: '#153FF2', textAlign: 'center', paddingTop: 5}}>Ranking Chart</h5>
                    <Col xs={12}>
                        {listUsers.map((item, index) => <RankingItem item={item} index={index} handleOnClick={handleOnClickPlayerProfile}/>)}
                    </Col>
                </Row>
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

export default Ranking;
