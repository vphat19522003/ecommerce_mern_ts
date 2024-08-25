import { Outlet } from 'react-router-dom';

import AuthLayout from '@app/layouts/authLayout';

const AuthenticateLayout = (): JSX.Element => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthenticateLayout;
