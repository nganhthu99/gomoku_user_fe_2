import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import Board from "../Game/board";
import {FiCircle, FiX} from "react-icons/fi";
import ChatBox from "../Game/chat-box";
import {getGameService} from "../../Core/Service/game-service";
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
import { GiQueenCrown } from "react-icons/gi";

const GameHistory = (props) => {
    const history = useHistory()
    const [game, setGame] = useState(null)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        getGameService(queryString.parse(props.location.search).game,token)
            .then((response) => {
                if (response.status === 200) {
                    setGame(response.data.game)
                }
            })
    }, [props.location])

    const handleOnClickPlayerProfile = (user) => {
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user,
        })
    }

    if (game) {
        return (
            <Row noGutters style={{height: '100%', padding: 5}}>
                <Col xs={12} style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{
                        textAlign: 'center',
                        color: '#153FF2',
                        fontWeight: 'bold'
                    }}>{`ROOM NAME: ${game.room}`}</p>

                    {/*players*/}
                    <Row noGutters style={{display: 'flex', justifyContent: 'center'}}>
                        <Col md={3} xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                        <Button variant='outline-success' onClick={() => {
                                            handleOnClickPlayerProfile(game.turn.move_x)
                                        }}>
                                            {`@${game.turn.move_x}`} {game.turn.move_x === game.winner && <GiQueenCrown/>}
                                        </Button>
                                    </Card.Title>
                                    <div style={{textAlign: 'center'}}><FiX size={30} color='green'/></div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                        <Button variant='outline-danger' onClick={() => {
                                            handleOnClickPlayerProfile(game.turn.move_o)
                                        }}>
                                            {`@${game.turn.move_o}`} {game.turn.move_o === game.winner && <GiQueenCrown/>}
                                        </Button>
                                    </Card.Title>
                                    <div style={{textAlign: 'center'}}><FiCircle size={30} color='red'/></div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} md={6} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {/*board*/}
                    <Board squares={game.history[step]}
                           onClickHandle={() => {
                           }}
                           winnerLine={[]}/>
                </Col>

                <Col xs={12} md={6} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                    {/*list steps*/}
                    <Card className='card-chat'>
                        <Card.Body className='card-chat-body'>
                            <Card.Title>List Steps</Card.Title>
                            <div className='scroll-view-chat' style={{flexDirection: 'row'}}>
                                {game.history.map((step, index) =>
                                    <div key={index}>
                                        <Button variant='outline-primary'
                                                style={{
                                                    width: '100%',
                                                    padding: 0,
                                                    marginBottom: 2,
                                                    fontSize: 14
                                                }}
                                                onClick={() => {setStep(index)}}>Move {index}
                                        </Button>
                                    </div>)}
                            </div>
                        </Card.Body>
                    </Card>

                    {/*chatbox*/}
                    <ChatBox messages={game.messages}
                             handleChatSubmit={() => {
                             }}/>
                </Col>
            </Row>
        )
    } else {
        return (
            <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant='primary'/>
            </Container>
        )
    }
};

export default GameHistory;
