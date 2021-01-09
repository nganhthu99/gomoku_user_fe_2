import React, {useEffect, useState} from 'react';
import {Col, Form, Card, Button, Row} from "react-bootstrap";
import {
    renderPasswordValidation,
    renderUsernameValidation,
    validatePasswordUtil,
    validateUsernameUtil
} from "./render-validation";
import {signInService} from "../../Core/Service/authentication-service";
import { useHistory } from "react-router-dom";
import {RouteName} from "../../Constant/route";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ImFacebook } from "react-icons/im";
import { GrGoogle } from "react-icons/gr";

const SignIn = (props) => {
    const [user, ] = useState(localStorage.getItem('username'))
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user) {
            history.push(RouteName.Home)
        }
    }, [history, user])

    const handleForgetPasswordButton = () => {
    }

    const handleSignUpButton = () => {
        history.push(RouteName.SignUp)
    }

    const handleSignInButton = () => {
        if (validateUsernameUtil(username) && validatePasswordUtil(password)) {
            signInService(username, password)
                .then((response) => {
                    if (response.status === 200 && response.data.success) {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('userId', response.data.userId)
                        localStorage.setItem('username', response.data.username)
                        history.push(RouteName.Home)
                    } else {
                        alert('Sign In Error: Wrong username or password!')
                    }
                })
                .catch((error) => {
                    alert(`Sign In Error: ${error}`)
                })
        }
    }

    const handleSignInFacebookButton = (response) => {
        console.log('FACEBOOK LOGIN: ', response)

    }

    const handleSignInGoogleButton = (response) => {
        console.log('GOOGLE LOGIN: ', response)
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
                        <Form.Group>
                            <Form.Label style={{color: '#153FF2', fontWeight: 'bold'}}>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                            <p style={{color: '#BF2F15', fontSize: 14}}>{renderPasswordValidation(password)}</p>
                        </Form.Group>
                        <Row style={{justifyContent: 'space-between', paddingBottom: 20}}>
                            <Button onClick={handleSignUpButton} variant="link" style={{color: '#153FF2', textDecoration: 'underline'}}>
                                Don't have an account? Sign Up
                            </Button>
                            <Button onClick={handleForgetPasswordButton} variant="link" style={{color: '#153FF2', textDecoration: 'underline'}}>
                                Forget password?
                            </Button>
                        </Row>
                        <Row style={{justifyContent: 'center', margin: 5}}>
                            <Button
                                style={{fontWeight:'bold', width: 220}}
                                onClick={handleSignInButton}>
                                Sign In
                            </Button>
                        </Row>
                        <Row style={{justifyContent: 'center', margin: 5}}>
                            <GoogleLogin
                                clientId="854277147892-qtda7vsh27fu8j4u6eeaotljamqj7gv4.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button variant='outline-danger' onClick={renderProps.onClick} style={{fontWeight:'bold', width: 220}}>
                                        <GrGoogle size={26}/>
                                    </Button>
                                )}
                                onSuccess={handleSignInGoogleButton}
                                onFailure={() => {console.log('ERROR SIGN IN WITH GOOGLE')}}
                            />
                        </Row>
                        <Row style={{justifyContent: 'center', margin: 5}}>
                            <FacebookLogin
                                render={renderProps => (
                                    <Button variant='outline-primary' onClick={renderProps.onClick} style={{fontWeight:'bold', width: 220, padding: 5}}>
                                        <ImFacebook size={26}/>
                                    </Button>
                                )}
                                appId="2439172963055789"
                                callback={handleSignInFacebookButton}
                            />
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
};

export default SignIn;
