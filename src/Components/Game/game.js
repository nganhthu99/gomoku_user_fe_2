import React, {useContext, useEffect, useState} from 'react';
import Board from "./board";
import {Spinner, Row, Col, Card, Button} from "react-bootstrap";
import {SocketContext} from "../../Core/Provider/socket-provider";
import {useHistory} from "react-router-dom";
import { FiX, FiCircle } from "react-icons/fi";
import UserInfo from "./user-info";
import { FiFlag } from "react-icons/fi";
import ChatBox from "./chat-box";
import {MemoTimer} from "./CountdownTimer";
import ResultModal from "./result-modal";
import {RouteName} from "../../Constant/route";

const Game = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const history = useHistory()
    const {socket,setSocket} = useContext(SocketContext)

    const [isXTurn, setIsXTurn] = useState(true)
    const [room, setRoom] = useState(props.location.state)
    const [turn, setTurn] = useState(room.game.turn)
    const [squares, setSquares] = useState(room.game.history[room.game.history.length - 1])
    const [messages, setMessages] = useState(room.game.messages)

    const [gameStart, setGameStart] = useState(false)
    const [gameResult, setGameResult] = useState(null)

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect()
                setSocket(null)
            }
        }
    }, [socket, setSocket])

    useEffect(() => {
        if (room.players.length === 2) {
            setGameStart(true)
        }
    }, [room])

    useEffect(() => {
        if (socket === null) {
            history.replace(RouteName.Home)
        } else {
            socket.on('Someone-Join-Room', (data) => {
                console.log(data)
                setRoom(data)
                setTurn(data.game.turn)
                setSquares(data.game.history[data.game.history.length - 1])
                setMessages(data.game.messages)
            })

            socket.on('Move', (data) => {
                setSquares(prev => {
                    const copySquares = prev.slice()
                    copySquares[data.move] = data.letter
                    return copySquares
                })
                setIsXTurn(prev => !prev)

            })

            socket.on('Message', (data) => {
                setMessages(prevMessages => [...prevMessages, data]);
            })

            socket.on('Game-Result', (data) => {
                setGameResult(data)
                setGameStart(false)
                setIsXTurn(true)
            })
        }
    }, [history, socket])

    const handleClick = (i) => {
        if (gameStart && squares[i] === null && isXTurn && user.displayName === turn.move_x) {
            socket.emit('Play-Move', {
                move: i,
                letter: 'X'
            })
        } else if (gameStart && squares[i] === null && !isXTurn && user.displayName === turn.move_o) {
            socket.emit('Play-Move', {
                move: i,
                letter: 'O'
            })
        }
    }

    const handleChatSubmit = (chatMessage) => {
        socket.emit('Send-Message', chatMessage)
    }

    const handleSurrender = () => {
        socket.emit('Request-Surrender')
    }

    const handleTimeOut = (player) => {
        if (user.displayName === player) {
            socket.emit('Time-Out')
        }
    }

    const handleNewGame = () => {
        socket.emit('Request-New-Game')
        setGameResult(null)
    }

    const handleExitGame = () => {
        socket.disconnect()
        setSocket(null)
    }

    return (
        <Row noGutters style={{height: '100vh', padding: 5}}>
            {/*board*/}
            <Col xs={12} md={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Board squares={squares}
                       onClickHandle={(i) => handleClick(i)}
                       winnerLine={gameResult ? gameResult.line : []}/>
            </Col>

            <Col xs={12} md={6} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <p style={{textAlign: 'center', color: '#153FF2', fontWeight: 'bold'}}>{`ROOM ID: ${room.id} - ROOM NAME: ${room.name}`}</p>
                {/*players*/}
                <Row noGutters>
                    <Col xs={6}>
                        {turn.move_x &&
                        <Card>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                    <UserInfo player={turn.move_x} color='green'/>
                                </Card.Title>
                                <div style={{textAlign: 'center'}}><FiX size={30} color='green'/></div>
                                <Card.Text style={{textAlign: 'center', margin: 0}}>
                                    {isXTurn && gameStart &&
                                    <MemoTimer time={room.time} handleTimeOut={() => handleTimeOut(turn.move_x)}/>}
                                    {(!isXTurn || !gameStart) && '00 : 00'}
                                </Card.Text>
                                <div style={{textAlign: 'center'}}>
                                    <Button variant="primary"
                                            disabled={user.displayName !== turn.move_x}
                                            onClick={handleSurrender}>
                                        <FiFlag/>
                                        Surrender
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>}
                        {!turn.move_x && <div style={{textAlign: 'center', paddingTop: 60}}><Spinner animation="border" variant='primary'/></div>}
                    </Col>
                    <Col xs={6}>
                        {turn.move_o &&
                        <Card>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
                                    <UserInfo player={turn.move_o} color='red'/>
                                </Card.Title>
                                <div style={{textAlign: 'center'}}><FiCircle size={30} color='red'/></div>
                                <Card.Text style={{textAlign: 'center', margin: 0}}>
                                    {!isXTurn && gameStart &&
                                    <MemoTimer time={room.time} handleTimeOut={() => handleTimeOut(turn.move_o)}/>}
                                    {(isXTurn || !gameStart) && '00 : 00'}
                                </Card.Text>
                                <div style={{textAlign: 'center'}}>
                                    <Button disabled={user.displayName !== turn.move_o}
                                            onClick={handleSurrender}
                                            variant="primary">
                                        <FiFlag/>
                                        Surrender
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>}
                        {!turn.move_o && <div style={{textAlign: 'center', paddingTop: 60}}><Spinner animation="border" variant='primary'/></div>}
                    </Col>
                </Row>

                {/*chatbox*/}
                <ChatBox messages={messages}
                         handleChatSubmit={handleChatSubmit}/>
                <ResultModal
                    handleNewGame={handleNewGame}
                    handleExitGame={handleExitGame}
                    gameResult={gameResult}/>
            </Col>
        </Row>
    )
};

export default Game;
