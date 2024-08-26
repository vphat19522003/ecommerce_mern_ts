import { ThemeProvider } from '@emotion/react';

import './App.css';
import AppRoutes from './routes/AppRoutes';
import theme from './theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
