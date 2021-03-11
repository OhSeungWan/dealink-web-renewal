import React, { createContext, useRef, useState } from 'react';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const userId = sessionStorage.getItem('userId');
  const webSocketUrl = `ws://192.168.0.102:8080/ws/chat?userId=${userId}`;

  let ws = useRef();

  function waitForSocketConnection(socket, callback) {
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log('Connection is made');
        if (callback != null) {
          callback();
        }
      } else {
        console.log('wait for connection...');
        waitForSocketConnection(socket, callback);
      }
    }, 5); // wait 5 milisecond for the connection...
  }

  function openSocket(userId) {
    // alert('openSocket');
    // alert(userId);
    // alert('userId:');
    // alert(userId);
    const webSocketUrl = `ws://192.168.0.102:8080/ws/chat?userId=${userId}`;
    // alert(webSocketUrl);
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      // alert('open');
      console.log('connected to ' + webSocketUrl);
      ws.current.send(
        JSON.stringify({
          messageType: 'CONNECT',
          roomId: '',
          senderName: '',
          senderId: userId,
          recipientId: '',
          message: ''
        })
      );
    };
    // }

    ws.current.onclose = error => {
      // alert('close');
      console.log('disconnect from ' + webSocketUrl);
      ws.current.close();
      console.log(error);
    };

    ws.current.onerror = error => {
      // alert(error);
      console.log('connection error ' + webSocketUrl);
      console.log(error);
      ws.current.close();
    };

    ws.current.onmessage = e => {
      console.log('asdfasfd');
      const data = JSON.parse(e.data);
      // if (data.message !== '') addItem(data);
      console.log(data);
    };
  }

  if (!ws.current) {
    if (userId && userId != 'undefined' && ws.current?.readyState != 0) {
      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        console.log('connected to ' + webSocketUrl);
        ws.current.send(
          JSON.stringify({
            messageType: 'CONNECT',
            roomId: '',
            senderName: '',
            senderId: userId,
            recipientId: '',
            message: ''
          })
        );
      };
      // }

      ws.current.onclose = error => {
        console.log('disconnect from ' + webSocketUrl);
        ws.current.close();
        console.log(error);
      };
      ws.current.onerror = error => {
        console.log('connection error ' + webSocketUrl);
        console.log(error);
        ws.current.close();
      };

      ws.current.onmessage = e => {
        console.log('asdfasfd');
        const data = JSON.parse(e.data);
        // if (data.message !== '') addItem(data);
        console.log(data);
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
