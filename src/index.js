import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {SocketProvider} from "./Core/Provider/socket-provider";

ReactDOM.render(
      <BrowserRouter>
          <SocketProvider>
            <App />
          </SocketProvider>
      </BrowserRouter>,
  document.getElementById('root')
);

