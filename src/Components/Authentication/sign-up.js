import React, {useState} from 'react';
import {Col, Form, Card, Button, Row} from "react-bootstrap";
import {
    renderConfirmPasswordValidation,
    renderEmailValidation, renderPasswordValidation,
    renderUsernameValidation,
    validateConfirmPasswordUtil,
    validateEmailUtil,
    validatePasswordUtil,
    validateUsernameUtil
} from "./render-validation";
import {signUpService} from "../../Core/Service/authentication-service";
import {useHistory} from "react-router-dom";
import {RouteName} from "../../Constant/route";

const SignUp = (props) => {
    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory()

    const handleSignInButton = () => {
        history.push(RouteName.SignIn)
    }

    const handleSignUpButton = () => {
        if (validateUsernameUtil(username) &&
            // validateEmailUtil(email) &&
            validatePasswordUtil(password) &&
            validateConfirmPasswordUtil(confirmPassword, password)) {
            signUpService(username, password, username)
                .then((response) => {
                    if (response.data.success) {
                        alert('Signing up successfully.')
                        history.push('/sign-in')
                    } else if (!response.data.success) {
                        alert('Error signing up. Username already existed.')
                    }
                })
                .catch((error) => {
                    alert('Error signing up. Please try again later.')
                })
        }
    }

    return (
        <Row style={{justifyContent: 'center'}}>
            <Col md={6} sx={12}>
                <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                    <Form style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Form.Group>
                            <Form.Label style={{color: '#153FF2', fontWeight: 'bold'}}>Username</Form.Label>
                            <Form.Control onChange={(e) => setUsername(e.target.value)}/>
                            <p style={{color: '#BF2F15', fontSize: 14}}>{renderUsernameValidation(username)}</p>
                        </Form.Group>
                        {/*<Form.Group>*/}
                        {/*    <Form.Label style={{color: '#153FF2', fontWeight: 'bold'}}>Email</Form.Label>*/}
                        {/*    <Form.Control onChange={(e) => setEmail(e.target.value)}/>*/}
                        {/*    <p style={{color: '#BF2F15', fontSize: 14}}>{renderEmailValidation(email)}</p>*/}
                        {/*</Form.Group>*/}
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
                        <Row style={{justifyContent: 'flex-end', paddingBottom: 20}}>
                            <Button onClick={handleSignInButton} variant="link" style={{color: '#153FF2', textDecoration: 'underline'}}>
                                Already have an account? Sign In
                            </Button>
                        </Row>
                        <Row style={{justifyContent: 'center', margin: 2}}>
                            <Button
                                style={{fontWeight:'bold', width: 220}}
                                onClick={handleSignUpButton}>
                                Sign Up
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
};

export default SignUp;
