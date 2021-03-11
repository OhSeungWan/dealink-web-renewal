import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { WebSocketProvider } from 'lib/Context/WebSocket';
import reportWebVitals from './reportWebVitals';

// Add an import if you installed from npm

ReactDOM.render(
  <BrowserRouter>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
