import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Footer from '@app/components/organisms/footer';
import Header from '@app/components/organisms/header';
import MobileNavigator from '@app/components/organisms/mobileNavigator';
import { useDevice } from '@app/hooks/useDevice';

const MainLayout = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Box>
      <Header />
      <Outlet />
      <Box sx={{ height: '500vh' }}></Box>
      {isMobile && <MobileNavigator />}
      <Footer />
    </Box>
  );
};

export default MainLayout;
