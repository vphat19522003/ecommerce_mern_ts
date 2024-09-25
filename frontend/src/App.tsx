import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import AppRoutes from './routes/AppRoutes';
import { RootState } from './store';
import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

function App(): JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);
  // const location = window.location.pathname;

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0
  //   });
  // }, [location]);
  console.log({ user });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
