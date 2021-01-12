import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {RouteName} from "../../Constant/route";
import queryString from "query-string";

const ResultActivateAccount = (props) => {
    const history = useHistory()
    const [result, ] = useState(queryString.parse(props.location.search).result)
    const [message, setMessage] = useState('')
    const handleGoToHomeButton = () => {
        history.replace(RouteName.Home)
    }

    useEffect(() => {
        if (result === 'success') {
            setMessage('Verify email successfully')
        } else if (result === 'error') {
            setMessage('Error verifying email')
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
                            onClick={handleGoToHomeButton}>
                            Go to home
                        </Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
};

export default ResultActivateAccount;
