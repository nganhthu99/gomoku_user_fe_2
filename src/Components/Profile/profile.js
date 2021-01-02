import React, {useState, useEffect} from 'react';
import {Card, Col, Dropdown, DropdownButton, Navbar, Row, Table} from "react-bootstrap";
import {getUserWithGameInfoService} from "../../Core/Service/user-service";
import {RouteName} from "../../Constant/route";
import {useHistory} from "react-router-dom";
import {GiCutDiamond} from "react-icons/gi";
import {FaMedal} from "react-icons/fa";
import {RiMedalFill} from "react-icons/ri";
import {BiMedal} from "react-icons/bi";
import GameListItem from "./game-list-item";

const Profile = (props) => {
    const history = useHistory()
    const [user, setUser] = useState(localStorage.getItem('username'))
    const [profile, ] = useState(props.location)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (user === null) {
            history.push(RouteName.SignIn)
        }
    }, [history, user])

    useEffect(() => {
        setUserInfo(getUserWithGameInfoService(profile))
    }, [profile])

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

    return (
        <div>
            <Navbar style={{backgroundColor: '#E5F3FC'}}>
                <Navbar.Brand style={{color: '#153FF2', fontWeight: 'bold', flexGrow: 1}}>
                    GOMOKU
                </Navbar.Brand>
                {user === profile &&
                <DropdownButton
                    menuAlign="right"
                    title={user}>
                    <Dropdown.Item onClick={handleSignOutButton}>
                        Sign Out
                    </Dropdown.Item>
                </DropdownButton>}
            </Navbar>
            <Row noGutters>
                <Col xs={12} md={4}>
                    <Row style={{justifyContent: 'center'}}>
                        <Col>
                            <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                                <Card.Img variant="top" src="https://i.pinimg.com/originals/47/e0/01/47e001f1be26293d7f8826c5b262d9df.jpg" />
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center', fontWeight: 'bold', color: '#153FF2'}}>{`@${userInfo.username}`}</Card.Title>
                                    <Card.Text style={{textAlign: 'center'}}>
                                        <strong>Rank:</strong>
                                        {userInfo.rank === 'diamond' && <GiCutDiamond color='#00E4FF' size={36}/>}
                                        {userInfo.rank === 'gold' && <FaMedal color='#FFAF03' size={36}/>}
                                        {userInfo.rank === 'silver' && <RiMedalFill color='gray' size={36}/>}
                                        {userInfo.rank === 'bronze' && <BiMedal color='#562A03' size={36}/>}
                                    </Card.Text>
                                    <Card.Text style={{textAlign: 'center'}}>
                                        <strong>Winning Percentage: </strong>{userInfo.winningPercentage}
                                    </Card.Text>
                                    <Card.Text style={{textAlign: 'center'}}>
                                        <strong>Joined Date: </strong>{userInfo.joinedDate}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={8}>
                    <Row style={{justifyContent: 'center'}}>
                        <Col>
                            <Card style={{padding: 20, margin: 10, borderColor: '#153FF2', borderWidth: 1}}>
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center', fontWeight: 'bold', color: '#153FF2'}}>GAME HISTORY</Card.Title>
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            <th>Played Date</th>
                                            <th>Room Name</th>
                                            <th>Rival</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userInfo.games && userInfo.games.map((game) => <GameListItem key={game._id}
                                                                                     item={game}
                                                                                     handleClick={handleClick}/>)}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default Profile;
