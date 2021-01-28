import 'moment-timezone';

import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from 'Store';
import theme from 'Styles/Theme';
function App() {
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
