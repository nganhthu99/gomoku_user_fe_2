import React, {useEffect, useState} from 'react';
import {Button, Card, OverlayTrigger, Popover} from "react-bootstrap";
import {getUserInfoService} from "../../Core/Service/user-service";
import { FaMedal } from "react-icons/fa"; // gold
import { RiMedalFill } from "react-icons/ri";
import { BiMedal } from "react-icons/bi"; // silver
import { GiCutDiamond } from "react-icons/gi";

const UserInfo = (props) => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        // getUserByUsernameService(props.player)
        //     .then((response) => {
        //         setUserInfo(response)
        //     })
        setUserInfo(getUserInfoService(props.player))
    }, [props.player])

    const popOver = (
        <Popover>
            <Popover.Title as="h3" style={{textAlign: 'center'}}>{`@${props.player}`}</Popover.Title>
            <Popover.Content style={{textAlign: 'center', padding: 5}}>
                Rank:
                {userInfo.rank === 'diamond' && <GiCutDiamond color='#00E4FF' size={36}/>}
                {userInfo.rank === 'gold' && <FaMedal color='#FFAF03' size={36}/>}
                {userInfo.rank === 'silver' && <RiMedalFill color='gray' size={36}/>}
                {userInfo.rank === 'bronze' && <BiMedal color='#562A03' size={36}/>}
            </Popover.Content>
            <Popover.Content>
                Winning Percentage: <strong>{userInfo.winningPercentage}</strong>
            </Popover.Content>
        </Popover>
    )
    return (
        <>
            <OverlayTrigger trigger="click" placement='bottom' overlay={popOver}>
                <Button variant={props.color === 'red' ? "outline-danger" : 'outline-success'}>{`@${props.player}`}</Button>
            </OverlayTrigger>
        </>
    )
};

export default UserInfo;
