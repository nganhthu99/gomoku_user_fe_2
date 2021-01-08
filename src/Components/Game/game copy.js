// import React, {useContext, useEffect, useState} from 'react';
// import Board from "./board";
// import {Spinner, Row, Col, Card, Button, Container} from "react-bootstrap";
// import {SocketContext} from "../../Core/Provider/socket-provider";
// import {useHistory} from "react-router-dom";
// import { FiX, FiCircle } from "react-icons/fi";
// import UserInfo from "./user-info";
// import { FiFlag } from "react-icons/fi";
// import ResultModal from "./result-modal";
// import ChatBox from "./chat-box";
// import {RouteName} from "../../Constant/route";
// import Countdown from 'react-countdown';
// import GameStartModal from "./game-start-modal";
//
// const Game = (props) => {
//     const user = localStorage.getItem('username')
//     const room = props.location.state
//     const history = useHistory()
//     const {socket,setSocket} = useContext(SocketContext)
//
//     // room
//     const [roomInfo, setRoomInfo] = useState(room.roomInfo)
//
//     // game
//     const [gameStart, setGameStart] = useState(false)
//     const [gameResult, setGameResult] = useState(null)
//     const [squares, setSquares] = useState(room.currentGame.history[0])
//
//     const [xPlayer, setXPlayer] = useState(room.currentGame.turn.move_x)
//     const [oPlayer, setOPlayer] = useState(room.currentGame.turn.move_o)
//     const [isXTurn, setIsXTurn] = useState(true)
//
//     // messages
//     const [messages, setMessages] = useState(room.currentGame.messages)
//
//     useEffect(() => {
//         // window.addEventListener("beforeunload", (e) => {
//         //     e.preventDefault();
//         //     return e.returnValue = 'Are you sure you want to close?';
//         // });
//     }, [])
//
//     console.log('PLAYER: ', xPlayer, oPlayer)
//
//     useEffect(() => {
//         if (socket === null) {
//             history.push(RouteName.Home)
//         } else {
//             socket.on('Game-Start', (data) => {
//                 console.log('Start thui')
//                 setGameStart(true)
//             })
//
//             socket.on('Game-State', (data) => {
//                 setGameResult(data)
//             })
//
//             socket.on('Update-Room', (data) => {
//                 setRoomInfo(data.roomInfo)
//                 setXPlayer(data.currentGame.turn.move_x)
//                 setOPlayer(data.currentGame.turn.move_o)
//                 setMessages(data.currentGame.messages)
//             })
//
//             socket.on('Update-Game', (data) => {
//                 setRoomInfo(data.roomInfo)
//                 setXPlayer(data.currentGame.turn.move_x)
//                 setOPlayer(data.currentGame.turn.move_o)
//                 setMessages(data.currentGame.messages)
//                 setSquares(data.currentGame.history[0])
//                 setGameResult(null)
//             })
//
//             socket.on('Move', (data) => {
//                 setSquares(prev => {
//                     const copySquares = prev.slice()
//                     copySquares[data.move] = data.letter
//                     return copySquares
//                 })
//                 // setIsYourTurn(prev => !prev)
//                 setIsXTurn(prev => !prev)
//             })
//
//             socket.on('Message', (data) => {
//                 setMessages(prevMessages => [...prevMessages, data]);
//             })
//         }
//
//     }, [history, socket])
//
//     const handleClick = (i) => {
//         // if (isYourTurn &&
//         //     squares[i] === null &&
//         //     room.roomInfo.players.find(findUser => findUser === user))  {
//         //     socket.emit('Play-Move', {
//         //         roomId: room.roomInfo.roomId,
//         //         move: i,
//         //         letter: letter
//         //     })
//         // }
//         if (isXTurn && user === xPlayer) {
//             socket.emit('Play-Move', {
//                 roomId: room.roomInfo.roomId,
//                 move:i,
//                 letter: 'X'
//             })
//         } else if (!isXTurn && user === oPlayer) {
//             socket.emit('Play-Move', {
//                 roomId: room.roomInfo.roomId,
//                 move:i,
//                 letter: 'O'
//             })
//         }
//     }
//
//     const handleChatSubmit = (chatMessage) => {
//         socket.emit('Send-Message', {
//             roomId: room.roomInfo.roomId,
//             message: chatMessage
//         })
//     }
//
//     const handleNewGame = () => {
//         socket.emit('New-Game', {
//             roomId: room.roomInfo.roomId,
//             join_as: (user === xPlayer || user === oPlayer ? 'player' : 'watcher')
//         })
//     }
//
//     const handleExitGame = () => {
//         socket.disconnect()
//         setSocket(null)
//     }
//
//     const handleSurrender = () => {
//         socket.emit('Request-Surrender', {
//             roomId: room.roomInfo.roomId
//         })
//     }
//
//     const handleTimeOut = () => {
//         socket.emit('Time-Out', {
//             roomId: room.roomInfo.roomId
//         })
//     }
//
//     const renderer = ({ minutes, seconds, completed }) => {
//         if (completed) {
//             // Render a completed state
//             return <span>Time out!</span>;
//         } else {
//             // Render a countdown
//             return <span>{`0${minutes} : ${seconds}`}</span>;
//         }
//     };
//
//     return (
//         <Row noGutters style={{height: '100vh', backgroundColor: '#E5F3FC', justifyContent: 'center', alignItems: 'center', padding: 5}}>
//             {/*board*/}
//             <Col xs={12} md={6}>
//                 <Board squares={squares}
//                        onClickHandle={(i) => handleClick(i)}
//                        winnerLine={gameResult ? gameResult.line : []}/>
//             </Col>
//
//             <Col xs={12} md={6} >
//                 <p style={{textAlign: 'center', color: '#153FF2', fontWeight: 'bold'}}>{`ROOM ID: ${roomInfo.roomId} - ROOM NAME: ${roomInfo.roomName}`}</p>
//
//                 {/*players*/}
//                 <Row noGutters style={{justifyContent: 'center'}}>
//                     <Col xs={6}>
//                         {xPlayer &&
//                         <Card>
//                             <Card.Body style={isXTurn ? {backgroundColor: '#71C6FF'} : {}}>
//                                 <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
//                                     <UserInfo player={xPlayer} color='green'/>
//                                 </Card.Title>
//                                 <div style={{textAlign: 'center'}}><FiX size={30} color='green'/></div>
//                                 <Card.Text style={{textAlign: 'center', margin: 0}}>
//                                     {/*{isXTurn &&*/}
//                                     {/*<Countdown*/}
//                                     {/*    onComplete={handleTimeOut}*/}
//                                     {/*    date={Date.now() + 119000}*/}
//                                     {/*    renderer={renderer}*/}
//                                     {/*/>}*/}
//                                     {/*{!isXTurn && '00 : 00'}*/}
//                                     00 : 00
//                                 </Card.Text>
//                                 <div style={{textAlign: 'center'}}>
//                                     <Button variant="primary"
//                                             disabled={user !== xPlayer}
//                                             onClick={handleSurrender}>
//                                         <FiFlag/>
//                                         Surrender
//                                     </Button>
//                                 </div>
//                             </Card.Body>
//                         </Card>}
//                         {!xPlayer && <div style={{textAlign: 'center', paddingTop: 60}}><Spinner animation="border" variant='primary'/></div>}
//                     </Col>
//                     <Col xs={6}>
//                         {oPlayer &&
//                         <Card>
//                             <Card.Body style={!isXTurn ? {backgroundColor: '#71C6FF'} : {}}>
//                                 <Card.Title style={{textAlign: 'center', color: '#153FF2'}}>
//                                     <UserInfo player={oPlayer} color='red'/>
//                                 </Card.Title>
//                                 <div style={{textAlign: 'center'}}><FiCircle size={30} color='red'/></div>
//                                 <Card.Text style={{textAlign: 'center', margin: 0}}>
//                                     {/*{!isXTurn &&*/}
//                                     {/*<Countdown*/}
//                                     {/*    onComplete={handleTimeOut}*/}
//                                     {/*    date={Date.now() + 119000}*/}
//                                     {/*    renderer={renderer}*/}
//                                     {/*/>}*/}
//                                     {/*{isXTurn && '00 : 00'}*/}
//                                     00 : 00
//                                 </Card.Text>
//                                 <div style={{textAlign: 'center'}}>
//                                     <Button disabled={user !== oPlayer}
//                                             onClick={handleSurrender}
//                                             variant="primary">
//                                         <FiFlag/>
//                                         Surrender
//                                     </Button>
//                                 </div>
//                             </Card.Body>
//                         </Card>}
//                         {!oPlayer && <div style={{textAlign: 'center', paddingTop: 60}}><Spinner animation="border" variant='primary'/></div>}
//                     </Col>
//                 </Row>
//
//                 {/*chatbox*/}
//                 <ChatBox messages={messages}
//                          handleChatSubmit={handleChatSubmit}/>
//             </Col>
//             <ResultModal
//                 handleNewGame={handleNewGame}
//                 handleExitGame={handleExitGame}
//                 gameResult={gameResult}/>
//             {gameStart && <GameStartModal/>}
//         </Row>
//     )
// };
//
// export default Game;
