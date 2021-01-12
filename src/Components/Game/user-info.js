import React, {useEffect, useState} from 'react';
import {Button, Container, Image, OverlayTrigger, Popover, Spinner} from "react-bootstrap";
import { FaMedal } from "react-icons/fa"; // gold
import { RiMedalFill } from "react-icons/ri";
import { BiMedal } from "react-icons/bi"; // silver
import { GiCutDiamond } from "react-icons/gi";
import {getUserInfo} from "../../Core/Service/user-service";
import {GiTrophyCup} from "react-icons/gi";

const UserInfo = (props) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        getUserInfo(props.player, token)
            .then((response) => {
                console.log('DASDSADAS: ', response.data)
                if (response.status === 200) {
                    setUserInfo(response.data.user[0])
                }
            })
    }, [props.player])

    const popOver = (userInfo) ? (
        <Popover>
            <Popover.Title as="h3" style={{textAlign: 'center'}}>{`@${props.player}`}</Popover.Title>
            <Popover.Content>
                <Image src={userInfo.avatar} style={{width: 150, height: 150, display: 'flex', alignSelf: 'center'}}/>
            </Popover.Content>
            <Popover.Content style={{textAlign: 'center', padding: 5}}>
                Rank:
                {userInfo.level === 'diamond' && <GiCutDiamond color='#00E4FF' size={36}/>}
                {userInfo.level === 'gold' && <FaMedal color='#FFAF03' size={36}/>}
                {userInfo.level === 'silver' && <RiMedalFill color='gray' size={36}/>}
                {userInfo.level === 'bronze' && <BiMedal color='#562A03' size={36}/>}
            </Popover.Content>
            <Popover.Content style={{textAlign: 'center', padding: 5}}>
                Trophies: {userInfo.cups}<GiTrophyCup/>
            </Popover.Content>
            <Popover.Content style={{textAlign: 'center', padding: 5}}>
                Winning Percentage: {`${(userInfo.wins / userInfo.game_ids.length).toFixed(2) * 100}%`}
            </Popover.Content>
        </Popover>
    ) : (
        <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner animation="border" variant='primary'/>
        </Container>
    )

    return (
        <>
            <OverlayTrigger trigger="click" placement='bottom' overlay={popOver}>
                <Button
                    variant={props.color === 'red' ? "outline-danger" : 'outline-success'}>{`@${props.player}`}</Button>
            </OverlayTrigger>
        </>
    )
};

export default UserInfo;
