import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Footer from '@app/components/organisms/footer';
import Header from '@app/components/organisms/header';
import MainBanner from '@app/components/organisms/mainBanner';
import MobileNavigator from '@app/components/organisms/mobileNavigator';
import MobileSidebar from '@app/components/organisms/mobileSidebar';
import SubBanner from '@app/components/organisms/subBanner';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

const MainLayout = (): JSX.Element => {
  const { isMobile } = useDevice();
  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);
  return (
    <Box>
      <Header />
      {!isMobile && <SubBanner />}
      <MainBanner />
      {showSidebar && <MobileSidebar />}
      <Outlet />
      <Box sx={{ height: '100vh' }} className='bg-[#f6f5fa]'></Box>
      {isMobile && <MobileNavigator />}
      <Footer />
    </Box>
  );
};

export default MainLayout;
