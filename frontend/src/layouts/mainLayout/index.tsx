import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import Footer from '@app/components/organisms/footer';
import Header from '@app/components/organisms/header';
import MobileNavigator from '@app/components/organisms/mobileNavigator';
import MobileSideBar from '@app/components/organisms/mobileSidebar';
import SubBanner from '@app/components/organisms/subBanner';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const { isMobile } = useDevice();
  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [location]);
  return (
    <Box>
      <Header />
      {!isMobile && <SubBanner />}
      <Box className={`px-2 lg:px-28  xl:px-80 bg-[#f6f5fa] ${isMobile && 'mt-[80px]'}`}>{children}</Box>
      {/* <Box sx={{ height: '100vh' }} className='bg-[#f6f5fa]'></Box> */}
      {isMobile && <MobileNavigator />}
      {showSidebar && <MobileSideBar />}
      <Footer />
    </Box>
  );
};

export default MainLayout;
