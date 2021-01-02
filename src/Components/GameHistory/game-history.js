import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import Board from "../Game/board";
import {FiCircle, FiX} from "react-icons/fi";
import ChatBox from "../Game/chat-box";
import {getGameHistoryService} from "../../Core/Service/game-service";
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";

const GameHistory = (props) => {
    const history = useHistory()
    const [game, setGame] = useState(null)
    const [step, setStep] = useState(0)

    useEffect(() => {
        setGame(getGameHistoryService(props.location))
    }, [props.location])

    const handleOnClickPlayerProfile = (user) => {
        history.push({
            pathname: RouteName.Profile,
            search: '?user=' + user,
        })
    }

    if (game === null) {
        return (
            <Spinner animation="border" variant='primary'/>
        )
    } else return (
        <Row noGutters style={{height: '100%', backgroundColor: '#E5F3FC', justifyContent: 'center', alignItems: 'center', padding: 5}}>
            {/*board*/}
            <Col xs={12} md={6}>
                <Board squares={game.history[step]}
                       onClickHandle={() => {}}
                       winnerLine={[]}/>
            </Col>

            <Col xs={12} md={6} >
                <p style={{textAlign: 'center', color: '#153FF2', fontWeight: 'bold'}}>{`ROOM NAME: ${game.room}`}</p>

                {/*players*/}
                <Row noGutters style={{justifyContent: 'center'}}>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                    <Button variant='outline-success' onClick={() => {handleOnClickPlayerProfile(game.turn.move_x)}}>{`@${game.turn.move_x}`}</Button>
                                </Card.Title>
                                <div style={{textAlign: 'center'}}><FiX size={30} color='green'/></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                    <Button variant='outline-danger' onClick={() => {handleOnClickPlayerProfile(game.turn.move_o)}}>{`@${game.turn.move_o}`}</Button>
                                </Card.Title>
                                <div style={{textAlign: 'center'}}><FiCircle size={30} color='red'/></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/*list steps*/}
                <Card className='card-chat'>
                    <Card.Body className='card-chat-body'>
                        <Card.Title>List Steps</Card.Title>
                        <div className='scroll-view-chat' style={{flexDirection: 'row'}}>
                            {game.history.map((step, index) => <div key={index}><Button variant='outline-primary' style={{width: 120, padding: 0, margin: 2, fontSize: 12}} onClick={() => {setStep(index)}}>Move {index}</Button></div>)}
                        </div>
                    </Card.Body>
                </Card>

                {/*chatbox*/}
                <ChatBox messages={game.messages}
                         handleChatSubmit={() => {}}/>
            </Col>
        </Row>
    )
};

export default GameHistory;
