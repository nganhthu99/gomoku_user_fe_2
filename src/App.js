import React from 'react';
import Home from "./Components/Home/home";
import SignIn from "./Components/Authentication/sign-in";
import SignUp from "./Components/Authentication/sign-up";
import { Switch, Route } from 'react-router-dom';
import Game from "./Components/Game/game";
import Profile from "./Components/Profile/profile";
import {SocketProvider} from "./Core/Provider/socket-provider";
import GameHistory from "./Components/GameHistory/game-history";

function App() {
  return (
      <SocketProvider>
        <Switch>
            <Route path='/history' component={GameHistory}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/game' component={Game}/>
            <Route path='/home' component={Home}/>
            <Route path='/sign-up' component={SignUp}/>
            <Route path='/sign-in' component={SignIn}/>
            <Route path='/' component={SignIn}/>
        </Switch>
      </SocketProvider>
  );
}

export default App;
