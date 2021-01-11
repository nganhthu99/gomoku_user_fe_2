import React, {useEffect, useState} from 'react';
import {Col, Form, Card, Button, Row} from "react-bootstrap";
import {
    renderPasswordValidation,
    renderUsernameValidation,
    validatePasswordUtil,
    validateUsernameUtil
} from "./render-validation";
import {
    checkUsernameEmailService,
    signInService,
    signUpSocialAccountService
} from "../../Core/Service/authentication-service";
import { useHistory } from "react-router-dom";
import {RouteName} from "../../Constant/route";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ImFacebook } from "react-icons/im";
import { GrGoogle } from "react-icons/gr";

const SignIn = (props) => {
    const [user, ] = useState(localStorage.getItem('user'))
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user) {
            history.push(RouteName.Home)
        }
    }, [history, user])

    const handleForgetPasswordButton = () => {
        history.push(RouteName.ForgetPassword)
    }

    const handleSignUpButton = () => {
        history.push(RouteName.SignUp)
    }

    const handleSignInButton = () => {
        if (validateUsernameUtil(username) && validatePasswordUtil(password)) {
            signInService(username, password)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.success) {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        // localStorage.setItem('userId', response.data.userId)
                        // localStorage.setItem('username', response.data.username)
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
        const accessToken = response.accessToken
        const fbid = response.id
        const email = response.email
        const username = email.split("@")[0]
        checkUsernameEmailService(fbid, email)
            .then((response) => {
                if (response.data.status === 'old_user') {
                    alert('old_user')
                    console.log('RECIEVE: ',response.data)
                    localStorage.setItem('token', accessToken)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    history.push(RouteName.Home)
                } else if (response.data.status === 'new_user') {
                    alert('new_user')
                    signUpSocialAccountService(fbid, email, username)
                        .then((response) => {
                            if (response.data.success) {
                                localStorage.setItem('token', accessToken)
                                localStorage.setItem('user', JSON.stringify(response.data.user))
                                history.push(RouteName.Home)
                            } else if (!response.data.success) {
                                alert('Error signing in with Facebook.')
                            }
                        })
                        .catch((error) => {
                            alert(`Error signing in with Facebook. ${error}`)
                        })
                } else {
                    alert('invalid')
                    // alert('Error signing in with Facebook.')
                }
            })
            .catch((error) => {
                alert(`Error signing in with Facebook hahaha. ${error}`)
            })
    }

    const handleSignInGoogleButton = (response) => {
        console.log('GOOGLE LOGIN: ', response)
        const accessToken = response.accessToken
        const ggid = response.googleId
        const email = response.profileObj.email
        const username = email.split("@")[0]
        checkUsernameEmailService(ggid, email)
            .then((response) => {
                if (response.data.status === 'old_user') {
                    alert('old_user')
                    console.log('RECIEVE: ',response.data)
                    localStorage.setItem('token', accessToken)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    history.push(RouteName.Home)
                } else if (response.data.status === 'new_user') {
                    alert('new_user')
                    signUpSocialAccountService(ggid, email, username)
                        .then((response) => {
                            if (response.data.success) {
                                localStorage.setItem('token', accessToken)
                                localStorage.setItem('user', JSON.stringify(response.data.user))
                                history.push(RouteName.Home)
                            } else if (!response.data.success) {
                                alert('Error signing in with Facebook.')
                            }
                        })
                        .catch((error) => {
                            alert(`Error signing in with Facebook. ${error}`)
                        })
                } else {
                    alert('invalid')
                    // alert('Error signing in with Facebook.')
                }
            })
            .catch((error) => {
                alert(`Error signing in with Facebook hahaha. ${error}`)
            })
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
                                clientId="846280586932-oabrjoonglegin6tf7q1qn6jm192g0qn.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button variant='outline-danger' onClick={renderProps.onClick} style={{fontWeight:'bold', width: 220}}>
                                        <GrGoogle size={26}/>
                                    </Button>
                                )}
                                onSuccess={handleSignInGoogleButton}
                                onFailure={(error) => {console.log('ERROR SIGN IN WITH GOOGLE: ', error)}}
                            />
                        </Row>
                        <Row style={{justifyContent: 'center', margin: 5}}>
                            <FacebookLogin
                                render={renderProps => (
                                    <Button variant='outline-primary' onClick={renderProps.onClick} style={{fontWeight:'bold', width: 220, padding: 5}}>
                                        <ImFacebook size={26}/>
                                    </Button>
                                )}
                                fields="name,email,picture"
                                appId="4166090010091919"
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
