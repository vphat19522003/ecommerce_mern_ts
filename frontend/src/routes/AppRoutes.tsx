import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AuthLayout from '@app/layouts/authLayout';
import HomePageLayout from '@app/layouts/homepageLayout';
import AccountVerify from '@app/pages/accountVerify';
import HomePage from '@app/pages/homePage';
import { RootState } from '@app/store';
import { USER_ROLE } from '@app/types/user';

import generateRoute from './generate-route';
import AdminProtectedLayout from './guards/adminProtectedLayout';
import AuthenticateLayout from './guards/authenticateLayout';
import ProtectedLayout from './guards/protectedLayout';
import { adminRoute, authenticationRoute, paths, shopRoute } from './paths';

const AppRoutes = (): JSX.Element => {
  const userAuthenticated = useSelector((state: RootState) => state.auth.user);

  return (
    <Router>
      <Routes>
        {/* AUTHENTICATE PAGE */}
        <Route element={<AuthenticateLayout />}>{generateRoute(authenticationRoute)}</Route>
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

        {/* HOMEPAGE */}
        <Route element={<HomePageLayout />}>
          <Route path={paths.index} element={<HomePage />} />
        </Route>

        {/* SHOP PAGE */}
        <Route element={<ProtectedLayout allowRoles={[USER_ROLE.ADMIN, USER_ROLE.USER]} />}>
          {generateRoute(shopRoute)}
        </Route>

        {/* MANAGEMENT PAGE */}
        <Route element={<AdminProtectedLayout allowRoles={[USER_ROLE.ADMIN]} />}>{generateRoute(adminRoute)}</Route>

        {/* PAGE NOT FOUND */}
        <Route
          path={'*'}
          element={
            userAuthenticated ? <Navigate to={paths.pageNotFound} replace /> : <Navigate to={paths.login} replace />
          }
        />
        <Route path={paths.pageNotFound} element={'PAGE NOT FOUND'} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
