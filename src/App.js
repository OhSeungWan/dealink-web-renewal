import { Auth } from 'auth';
import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from 'Store';
import theme from 'Styles/Theme';
function App() {
  console.log('certification');
  return (
    <Provider store={store}>
      <Auth>
        <CookiesProvider>
          <div className="App">
            <ThemeProvider theme={theme}>
              <MainRouter />
            </ThemeProvider>
          </div>
        </CookiesProvider>
      </Auth>
    </Provider>
  );
}

export default App;
