import React, { createContext, useRef } from 'react';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  // const webSocketUrl = `wss://192.168.0.102:8080/ws/chat`;
  const webSocketUrl = `wss://rest.dealink.co.kr/ws/chat`;

  let ws = useRef();

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    console.log(ws.current);
    ws.current.onopen = () => {
      console.log('connected to ' + webSocketUrl);
    };

    ws.current.onclose = error => {
      console.log('disconnect from ' + webSocketUrl);
      ws.current.close();
      console.log(error);
    };
    ws.current.onerror = error => {
      console.log('connection error ' + webSocketUrl);
      console.log(error);
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

const { Consumer: WebSocketConsumer } = WebSocketContext;

export { WebSocketProvider, WebSocketConsumer };
export default WebSocketContext;
