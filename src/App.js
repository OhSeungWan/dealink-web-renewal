import 'moment-timezone';

import React, { useContext, useEffect, useState } from 'react';

import { ChatProvider } from 'domain/Chat/ChatContext';
import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import WebSocketContext from 'lib/Context/WebSocket';
import store from 'Store';
import theme from 'Styles/Theme';

// var userAgent = navigator.userAgent.toLowerCase();
// console.log(userAgent);
// alert(userAgent);

function App() {
  useEffect(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          userId: '1'
        })
      );
    }
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <ChatProvider>
            <MainRouter />
          </ChatProvider>
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
