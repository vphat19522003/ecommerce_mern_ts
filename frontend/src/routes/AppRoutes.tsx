import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AuthLayout from '@app/layouts/authLayout';
import HomePageLayout from '@app/layouts/homepageLayout';
import AccountVerify from '@app/pages/accountVerify';
import ForgotPasswordPage from '@app/pages/forgotPassword';
import HomePage from '@app/pages/homePage';
import LoginPage from '@app/pages/login';
import SignUpPage from '@app/pages/signUp';
import UserSetting from '@app/pages/userSetting';
import PurchasedHistory from '@app/pages/userSetting/purchasedHistory';
import UserAccount from '@app/pages/userSetting/userAccount';
import UserFavorite from '@app/pages/userSetting/userFavorite';
import UserSecurity from '@app/pages/userSetting/userSecurity';
import UserShare from '@app/pages/userSetting/userShare';
import { RootState } from '@app/store';

import AuthenticateLayout from './guards/authenticateLayout';
import ProtectedLayout from './guards/protectedLayout';
import { paths } from './paths';

const AppRoutes = (): JSX.Element => {
  const userAuthenticated = useSelector((state: RootState) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route element={<AuthenticateLayout />}>
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.signUp} element={<SignUpPage />} />
          <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
        </Route>
        <Route
          path={paths.verifyAccount}
          element={
            userAuthenticated && !userAuthenticated.isVerified ? (
              <AuthLayout>
                <AccountVerify />
              </AuthLayout>
            ) : (
              <Navigate to={paths.login} replace />
            )
          }
        />

        <Route element={<HomePageLayout />}>
          <Route path={paths.index} element={<HomePage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path={paths.user.index} element={<UserSetting />}>
            <Route path={paths.user.account} element={<UserAccount />} />
            <Route path={paths.user.history} element={<PurchasedHistory />} />
            <Route path={paths.user.security} element={<UserSecurity />} />
            <Route path={paths.user.favorite} element={<UserFavorite />} />
            <Route path={paths.user.share} element={<UserShare />} />
          </Route>
        </Route>

        <Route
          path={'*'}
          element={
            userAuthenticated ? <Navigate to={paths.pageNotFound} replace /> : <Navigate to={paths.login} replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
