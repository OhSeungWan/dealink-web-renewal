import { CookiesProvider } from 'react-cookie';
import MainRouter from 'Routers/MainRouter';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/Theme';
function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </div>
    </CookiesProvider>
  );
}

export default App;
