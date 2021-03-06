import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {
    renderUsernameValidation,
    validateUsernameUtil
} from "./render-validation";
import {requestVerificationService} from "../../Core/Service/authentication-service";

const ForgetPassword = (props) => {
    const [username, setUsername] = useState('')
    const [state, setState] = useState(1)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSendEmailButton = () => {
        if (validateUsernameUtil(username)) {
            setIsLoading(true)
            requestVerificationService(username)
                .then((response) => {
                    if (response.status === 200) {
                        setState(2)
                        setMessage(response.data.message)
                    } else if (response.status === 401) {
                        alert('Email does not exist in the system.')
                    } else {
                        alert('Error sending email. Please try again later.')
                    }
                })
                .catch((error) => {
                    alert('Error sending email. Please try again later.')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    if (isLoading) {
        return (
            <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant='primary'/>
            </Container>
        )
    } else {
        if (state === 1) {
            return (
                <Row style={{justifyContent: 'center'}}>
                    <Col md={6} sx={12}>
                        <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                            <Card.Title style={{textAlign: 'center'}}>
                                Enter you account username to reset password
                            </Card.Title>
                            <Card.Body>
                                <Row style={{marginBottom: 20}}>
                                    <Form.Control
                                        placeholder='Username'
                                        onChange={(e) => setUsername(e.target.value)}/>
                                    <p style={{color: '#BF2F15', fontSize: 14}}>{renderUsernameValidation(username)}</p>
                                </Row>
                                <Row style={{justifyContent: 'center'}}>
                                    <Button
                                        style={{fontWeight: 'bold', width: 220}}
                                        onClick={handleSendEmailButton}>
                                        Send Email
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row style={{justifyContent: 'center'}}>
                    <Col md={6} sx={12}>
                        <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                            <Card.Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 14}}>{message}</Card.Text>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
};

export default ForgetPassword;
