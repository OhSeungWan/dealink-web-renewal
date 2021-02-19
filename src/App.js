import 'moment-timezone';

import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { WebSocketProvider } from 'lib/Context/WebSocket';
import store from 'Store';
import theme from 'Styles/Theme';

function App() {
  console.log(navigator.platform);
  return (
    <Provider store={store}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <WebSocketProvider>
            <MainRouter />
          </WebSocketProvider>
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
