import React, {useContext, useEffect, useState} from 'react';
import Home from "./Components/Home/home";
import SignIn from "./Components/Authentication/sign-in";
import SignUp from "./Components/Authentication/sign-up";
import {Switch, Route, useHistory} from 'react-router-dom';
import Profile from "./Components/Profile/profile";
import {SocketContext} from "./Core/Provider/socket-provider";
import GameHistory from "./Components/GameHistory/game-history";
import Ranking from "./Components/Ranking/ranking";
import ResultResetPassword from "./Components/Authentication/result-reset-password";
import {RouteName} from "./Constant/route";
import ForgetPassword from "./Components/Authentication/forget-password";
import ResetPassword from "./Components/Authentication/reset-password";
import ResultActivateAccount from "./Components/Profile/result-activate-account";
import Game from "./Components/Game/game";
import InvitationModal from "./Components/Home/invitation-modal";

/*
    SOCKET IO
        play now
        invite
        new game
        disconnect
        time-out

    API CALL:
        ranking
        profile user
*/

function App() {
    const history = useHistory()
    const [invitation, setInvitation] = useState(null)
    const {socket, setSocket} = useContext(SocketContext)

    useEffect(() => {
        if (socket !== null) {
            socket.on('Invitation', (data) => {
                setInvitation(data)
            })
        }
    },[socket])

    const handleReplyInvitation = (accept) => {
        if (socket) {
            setInvitation(null)
            socket.emit('Reply-Invitation', {
                accept: accept,
                id: invitation.id,
                inviter: invitation.inviter
            }, (returnData) => {
                history.push({
                    pathname: '/game',
                    search: '?room=' + returnData.id,
                    state: returnData
                })
            })
        }
    }
    return (
      // <SocketProvider>
        <>
            <Switch>
                <Route path={RouteName.ForgetPassword} component={ForgetPassword}/>
                <Route path={RouteName.Ranking} component={Ranking}/>
                <Route path={RouteName.GameHistory} component={GameHistory}/>
                <Route path={RouteName.Profile} component={Profile}/>
                <Route path={RouteName.Game} component={Game}/>
                <Route path={RouteName.Home} component={Home}/>
                <Route path={RouteName.SignUp} component={SignUp}/>
                <Route path={RouteName.SignIn} component={SignIn}/>
                <Route path={RouteName.ResultResetPassword} component={ResultResetPassword}/>
                <Route path={RouteName.ResetPassword} component={ResetPassword}/>
                <Route path={RouteName.ResultActivateAccount} component={ResultActivateAccount}/>
                <Route path='/' component={SignIn}/>
            </Switch>
            <InvitationModal invitation={invitation}
                             handleReplyInvitation={handleReplyInvitation}/>
        </>
      // </SocketProvider>
  );
}

export default App;
