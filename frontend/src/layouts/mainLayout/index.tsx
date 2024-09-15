import { Outlet } from 'react-router-dom';

import { Stack } from '@mui/material';

import HeaderComponent from '@app/components/organisms/header';

const MainLayout = (): JSX.Element => {
  return (
    <Stack sx={{ height: '500vh' }}>
      <HeaderComponent />
      <Outlet />
      <footer>Footer</footer>
    </Stack>
  );
};

export default MainLayout;
