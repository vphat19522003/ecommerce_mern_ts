import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ForgotPasswordPage from '@app/pages/forgotPassword';
import LoginPage from '@app/pages/login';
import SignUpPage from '@app/pages/signUp';

import AuthenticateLayout from './guards/authenticateLayout';
import { paths } from './paths';

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthenticateLayout />}>
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.signUp} element={<SignUpPage />} />
          <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
