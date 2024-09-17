import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';

const ProtectedLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to={paths.login} replace />;

  if (!user.isVerified) return <Navigate to={paths.verifyAccount} replace />;

  return <Outlet />;
};

export default ProtectedLayout;
