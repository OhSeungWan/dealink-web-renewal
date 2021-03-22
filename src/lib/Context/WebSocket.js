import React, { createContext, useRef } from 'react';

import { WebSocketUrl } from 'Constants/server';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const userId = sessionStorage.getItem('userId');
  const webSocket = `${WebSocketUrl}/ws/chat?userId=${userId}`;

  let ws = useRef();

  // function waitForSocketConnection(socket, callback) {
  //   setTimeout(function () {
  //     if (socket.readyState === 1) {
  //       console.log('Connection is made');
  //       if (callback != null) {
  //         callback();
  //       }
  //     } else {
  //       console.log('wait for connection...');
  //       waitForSocketConnection(socket, callback);
  //     }
  //   }, 5); // wait 5 milisecond for the connection...
  // }

  function openSocket(userId) {
    const webSocket = `${WebSocketUrl}/ws/chat?userId=${userId}`;
    // const webSocketUrl = `wss://rest.dealink.co.kr/ws/chat?userId=${userId}`;
    console.log(ws.current);
    ws.current = new WebSocket(webSocket);
    ws.current.onopen = () => {
      console.log('connected to ' + webSocket);
    };
    // }

    ws.current.onclose = error => {
      // alert('close');
      console.log('disconnect from ' + webSocket);
      ws.current.close();
      console.log(error);
    };

    ws.current.onerror = error => {
      // alert(error);
      console.log('connection error ' + webSocket);
      console.log(error);
      ws.current.close();
    };
  }

  if (!ws.current) {
    if (userId && userId != 'undefined' && ws.current?.readyState != 0) {
      ws.current = new WebSocket(webSocket);

      ws.current.onopen = () => {
        console.log('connected to ' + webSocket);
      };
      // }

      ws.current.onclose = error => {
        console.log('disconnect from ' + webSocket);
        ws.current.close();
        console.log(error);
      };
      ws.current.onerror = error => {
        console.log('connection error ' + webSocket);
        console.log(error);
        ws.current.close();
      };
    }
  }

  return (
    <WebSocketContext.Provider value={{ ws: ws, openSocket: openSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const { Consumer: WebSocketConsumer } = WebSocketContext;

export { WebSocketProvider, WebSocketConsumer };
export default WebSocketContext;
