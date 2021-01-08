import { Auth } from 'auth';
import { CookiesProvider } from 'react-cookie';
import HelmetMetaData from 'Utils/helmet-utils';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from 'Store';
import theme from 'Styles/Theme';

function App() {
  return (
    <Provider store={store}>
      <Auth>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <MainRouter />
          </ThemeProvider>
        </CookiesProvider>
      </Auth>
    </Provider>
  );
}

export default App;
