import React from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {RouteName} from "../../Constant/route";

const ResultResetPassword = (props) => {
    const history = useHistory()
    const handleGoToSignInButton = () => {
        history.replace(RouteName.SignIn)
    }

    return (
        <Row style={{justifyContent: 'center'}}>
            <Col md={6} sx={12}>
                <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                    <Card.Title style={{textAlign: 'center'}}>
                        Reset password successfully
                    </Card.Title>
                    <Row style={{justifyContent: 'center', margin: 5}}>
                        <Button
                            style={{fontWeight:'bold', width: 220}}
                            onClick={handleGoToSignInButton}>
                            Sign In
                        </Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
};

export default ResultResetPassword;
