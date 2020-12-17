import './App.css';

import MainRouter from 'Routers/MainRouter';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/Theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
