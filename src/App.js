import 'moment-timezone';

import React, { useContext, useEffect, useState } from 'react';

import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import WebSocketContext from 'lib/Context/WebSocket';
import store from 'Store';
import theme from 'Styles/Theme';

function App() {
  useEffect(() => {
    // openSocket(sessionStorage.getItem('userId'));
    // window.postMessage('안녕하세요');
    if (window.ReactNativeWebView) {
      // alert('message to RN ');
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ_CAMERA_PERMISSION',
          userId: sessionStorage.getItem('userId')
        })
      );
    }
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
