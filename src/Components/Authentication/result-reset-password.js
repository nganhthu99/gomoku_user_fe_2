import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {RouteName} from "../../Constant/route";
import queryString from "query-string";

const ResultResetPassword = (props) => {
    const history = useHistory()
    const [result, ] = useState(queryString.parse(props.location.search).result)
    const [message, setMessage] = useState('')
    const handleGoToSignInButton = () => {
        history.replace(RouteName.SignIn)
    }

    useEffect(() => {
        if (result === 'success') {
            setMessage('Reset password successfully')
        } else if (result === 'error') {
            setMessage('Error resetting password')
        }
    }, [result])

    return (
        <Row style={{justifyContent: 'center'}}>
            <Col md={6} sx={12}>
                <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                    <Card.Title style={{textAlign: 'center'}}>
                        {message}
                    </Card.Title>
                    <Row style={{justifyContent: 'center', margin: 5}}>
                        <Button
                            style={{fontWeight:'bold', width: 220}}
                            onClick={handleGoToSignInButton}>
                            Go back to Sign In
                        </Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
};

export default ResultResetPassword;
