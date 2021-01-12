import React, {useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {
    renderConfirmPasswordValidation,
    renderPasswordValidation, validateConfirmPasswordUtil,
    validatePasswordUtil
} from "./render-validation";
import {resetPasswordService} from "../../Core/Service/authentication-service";
import {useHistory} from "react-router-dom";
import {RouteName} from "../../Constant/route";
import queryString from "query-string";

const ResetPassword = (props) => {
    const history = useHistory()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleUpdatePassword = () => {
        if (validatePasswordUtil(password) &&
            validateConfirmPasswordUtil(confirmPassword, password)) {
            const token = queryString.parse(props.location.search).token
            resetPasswordService(token, password)
                .then((response) => {
                    if (response.status === 200) {
                        history.push({
                            pathname: RouteName.ResultResetPassword,
                            search: '?result=success',
                        })
                    } else {
                        history.push({
                            pathname: RouteName.ResultResetPassword,
                            search: '?result=error',
                        })
                    }
                })
                .catch((error) => {
                    history.push({
                        pathname: RouteName.ResultResetPassword,
                        search: '?result=error',
                    })
                })
        }
    }

    return (
        <Row style={{justifyContent: 'center'}}>
            <Col md={6} sx={12}>
                <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                    <Card.Title style={{textAlign: 'center'}}>
                        Reset password
                    </Card.Title>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label style={{color: '#153FF2', fontWeight: 'bold'}}>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                            <p style={{color: '#BF2F15', fontSize: 14}}>{renderPasswordValidation(password)}</p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{color: '#153FF2', fontWeight: 'bold'}}>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <p style={{color: '#BF2F15', fontSize: 14}}>{renderConfirmPasswordValidation(confirmPassword, password)}</p>
                        </Form.Group>
                        <Row style={{justifyContent: 'center'}}>
                            <Button
                                style={{fontWeight: 'bold', width: 220}}
                                onClick={handleUpdatePassword}>
                                Update
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

export default ResetPassword;
