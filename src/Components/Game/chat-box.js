import React, {useState} from 'react';
import {Card, FormControl} from "react-bootstrap";

const ChatBox = (props) => {
    const [chatMessage, setChatMessage] = useState('')

    const handleChatSubmit = (e) => {
        e.preventDefault()
        if (chatMessage) {
            props.handleChatSubmit(chatMessage)
            setChatMessage('')
        }
    }

    return(
        <Card className='card-chat'>
            <Card.Body className='card-chat-body'>
                <Card.Title>Chat Box</Card.Title>
                <div className='scroll-view-chat'>
                    {props.messages.map((msg) => {
                        if (msg.sender === localStorage.getItem('username')) {
                            return <p style={{textAlign: 'right'}}>{`${msg.message} :`}<mark style={{backgroundColor: 'blue', color: 'white'}}>{`${msg.sender}`}</mark></p>
                        } else {
                            return <p style={{textAlign: 'left'}}><mark style={{backgroundColor: 'green', color: 'white'}}>{`${msg.sender}`}</mark>{`: ${msg.message}`}</p>
                        }
                    })}
                </div>
                <form onSubmit={e => handleChatSubmit(e)}>
                    <FormControl type='chatMessage'
                                 className='input-message'
                                 placeholder='Type and enter message'
                                 value={chatMessage}
                                 onChange={e => setChatMessage(e.target.value)}
                                 style={{height: 30, fontSize: 14}}>
                    </FormControl>
                </form>
            </Card.Body>
        </Card>
    )
};

export default ChatBox;
