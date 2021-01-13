import React, {useState, useEffect} from 'react';
import {
    Tooltip,
    OverlayTrigger,
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Navbar,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";
import {
    getUserByDisplayName,
    updateUserAvatar
} from "../../Core/Service/user-service";
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";
import {GiCutDiamond} from "react-icons/gi";
import {FaMedal} from "react-icons/fa";
import {RiMedalFill} from "react-icons/ri";
import {BiMedal} from "react-icons/bi";
import GameListItem from "./game-list-item";
import ImageUploader from 'react-images-upload';
import {imgurUploadImageService} from "../../Core/Service/image-upload-service";
import queryString from 'query-string'
import {GiTrophyCup} from "react-icons/gi";
import {requestEmailVerification} from "../../Core/Service/authentication-service";
import { FcApproval, FcHighPriority } from "react-icons/fc";

const Profile = (props) => {
    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [profile, ] = useState(queryString.parse(props.location.search).user)
    const [userInfo, setUserInfo] = useState(null)
    const [image, setImage] = useState(null)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [isActivateLoading, setIsActivateLoading] = useState(false)

    useEffect(() => {
        if (user === null) {
            history.replace(RouteName.SignIn)
        }
    }, [history, user])

    useEffect(() => {
        if (user === null) {
            history.push(RouteName.SignIn)
        }
    }, [history, user])

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('token')
            getUserByDisplayName(profile, token)
                .then((response) => {
                    if (response.status === 200) {
                        setUserInfo(response.data.user[0])
                        setImage(response.data.user[0].avatar)
                    }
                })
        }
    }, [user, profile])

    const handleSignOutButton = () => {
        localStorage.clear()
        setUser(null)
    }

    const handleClick = (gameId) => {
        history.push({
            pathname: '/history',
            search: '?game=' + gameId
        })
    }

    const handleUploadAvatar = (file, picture) => {
        setIsImageLoading(true)
        const token = localStorage.getItem('token')
        const separated = picture[0].split("base64,")
        imgurUploadImageService(separated[1])
            .then((response) => {
                console.log('IMGUR RESPONSE: ', response)
                const imageUrl = response.data.data.link
                updateUserAvatar(user.username, imageUrl, token)
                    .then((response) => {
                        console.log('API RESPONSE: ', response)
                        if (response.status === 200) {
                            setImage(imageUrl)
                        }
                    })
                    .finally(() => {
                        setIsImageLoading(false)
                    })
            })
            .catch((error) => {
                console.log('IMGUR ERROR: ', error)
            })
    }

    const handleActivateButton = () => {
        setIsActivateLoading(true)
        const token = localStorage.getItem('token')
        requestEmailVerification(token, user.username)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message)
                } else if (response.status === 401) {
                    alert('Email does not exist in the system.')
                } else {
                    alert('Error sending email. Please try again later.')
                }
            })
            .catch((error) => {
                alert('Email does not exist in the system.')
            })
            .finally(() => {
                setIsActivateLoading(false)
            })
    }

    if (userInfo && user) {
        return (
            <div>
                <Navbar style={{backgroundColor: '#E5F3FC'}}>
                    <Navbar.Brand
                        onClick={() => {history.push('/home')}}
                        style={{color: '#153FF2', fontWeight: 'bold', flexGrow: 1}}>
                        GOMOKU
                    </Navbar.Brand>
                    {user.displayName === profile &&
                    <DropdownButton
                        menuAlign="right"
                        title={user.displayName}>
                        <Dropdown.Item onClick={handleSignOutButton}>
                            Sign Out
                        </Dropdown.Item>
                    </DropdownButton>}
                </Navbar>
                <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
                    <Col xs={12} md={5}>
                        <Row style={{display: 'flex', justifyContent: 'center'}}>
                            <Col>
                                <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                                    {!isImageLoading &&
                                    <Card.Img variant="top" src={image}
                                              style={{width: 250, height: 250, display: 'flex', alignSelf: 'center'}}/>}
                                    {isImageLoading &&
                                    <Container style={{height: 250, width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Spinner animation="border" variant='primary'/>
                                    </Container>}
                                    {profile === user.displayName &&
                                    <ImageUploader
                                        fileContainerStyle={{padding: 0}}
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                        buttonText='Choose Image'
                                        onChange={(files, pictures) => {
                                            handleUploadAvatar(files, pictures)
                                        }}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}/>}
                                    <Card.Body>
                                        <Card.Title style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#153FF2'
                                        }}>{`@${userInfo.displayName}`}</Card.Title>
                                        <Card.Text style={{textAlign: 'center'}}>
                                            <strong>Rank:</strong>
                                            {userInfo.level === 'diamond' && <GiCutDiamond color='#00E4FF' size={36}/>}
                                            {userInfo.level === 'gold' && <FaMedal color='#FFAF03' size={36}/>}
                                            {userInfo.level === 'silver' && <RiMedalFill color='gray' size={36}/>}
                                            {userInfo.level === 'bronze' && <BiMedal color='#562A03' size={36}/>}
                                        </Card.Text>
                                        <Card.Text style={{textAlign: 'center'}}>
                                            <strong>Trophies: </strong>{userInfo.cups} <GiTrophyCup/>
                                        </Card.Text>
                                        <Card.Text style={{textAlign: 'center'}}>
                                            <strong>Winning Percentage: </strong>{`${((userInfo.wins / userInfo.game_ids.length) * 100).toFixed(2)}%`}
                                        </Card.Text>
                                        <Card.Text style={{textAlign: 'center'}}>
                                            <strong>Joined
                                                Date: </strong>{userInfo.createdAt.substring(0, 10)}
                                        </Card.Text>
                                        {profile === user.displayName &&
                                        <Card.Text style={{textAlign: 'center'}}>
                                            <strong>Email: </strong>{userInfo.email}
                                            {userInfo.verified &&
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip>
                                                        Verified email. Account has been activated.
                                                    </Tooltip>
                                                }>
                                                <FcApproval style={{marginLeft: 3}}/>
                                            </OverlayTrigger>}
                                            {!userInfo.verified &&
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip>
                                                        Unverified email. Account has not been activated.
                                                    </Tooltip>
                                                }>
                                                <FcHighPriority style={{marginLeft: 3}}/>
                                            </OverlayTrigger>}
                                        </Card.Text>}
                                        {(profile === user.displayName) && !userInfo.verified &&
                                        <Card.Text style={{textAlign: 'center'}}>
                                            {!isActivateLoading &&
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip>
                                                        Highly recommend you to activate your account by verifying email. In case you forget your password, we can use email to help you reset password.
                                                    </Tooltip>
                                                }>
                                                <Button variant="primary" onClick={handleActivateButton}>Activate Account</Button>
                                            </OverlayTrigger>}
                                            {isActivateLoading &&
                                            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Spinner animation="border" variant='primary'/>
                                            </Container>}
                                        </Card.Text>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    {profile === user.username &&
                    <Col xs={12} md={7}>
                        <Row style={{justifyContent: 'center'}}>
                            <Col>
                                <Card style={{padding: 20, margin: 10, borderWidth: 0}}>
                                    <Card.Body>
                                        <Card.Title style={{textAlign: 'center', fontWeight: 'bold', color: '#153FF2'}}>GAME
                                            HISTORY</Card.Title>
                                        <Table hover>
                                            <thead>
                                            <tr>
                                                <th>Played Date</th>
                                                <th>Room Name</th>
                                                <th>Winner</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {userInfo.game_ids.map((game) => <GameListItem
                                                key={game._id}
                                                item={game}
                                                handleClick={handleClick}/>)}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>}
                </Row>
            </div>
        )
    } else {
        return (
            <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant='primary'/>
            </Container>
        )
    }
};

export default Profile;
