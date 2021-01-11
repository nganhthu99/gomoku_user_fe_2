import React from 'react';
import Home from "./Components/Home/home";
import SignIn from "./Components/Authentication/sign-in";
import SignUp from "./Components/Authentication/sign-up";
import { Switch, Route } from 'react-router-dom';
import Game from "./Components/Game/game";
import Profile from "./Components/Profile/profile";
import {SocketProvider} from "./Core/Provider/socket-provider";
import GameHistory from "./Components/GameHistory/game-history";
import Ranking from "./Components/Ranking/ranking";
import ResultResetPassword from "./Components/Authentication/result-reset-password";
import {RouteName} from "./Constant/route";
import ForgetPassword from "./Components/Authentication/forget-password";
import ResetPassword from "./Components/Authentication/reset-password";

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
  return (
      <SocketProvider>
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
            <Route path='/' component={SignIn}/>
        </Switch>
      </SocketProvider>
  );
}

export default App;
