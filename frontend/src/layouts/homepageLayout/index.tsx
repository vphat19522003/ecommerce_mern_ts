import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import Footer from '@app/components/organisms/footer';
import Header from '@app/components/organisms/header';
import MobileNavigator from '@app/components/organisms/mobileNavigator';
import MobileSidebar from '@app/components/organisms/mobileSidebar';
import ProductDetailSideBar from '@app/components/organisms/productDetailSidebar';
import ScrollToTopButton from '@app/components/organisms/scrollToTopButton';
import SubBanner from '@app/components/organisms/subBanner';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

const HomePageLayout = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useDevice();
  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);
  const showProductSidebar = useSelector((state: RootState) => state.ui.showProductDetailSidebar);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Box>
      <Header />
      {!isMobile && <SubBanner />}
      <Box className={`px-2 lg:px-28 xl:px-80 bg-white ${isMobile && 'mt-[80px]'}`}>
        <Outlet />
      </Box>
      {isMobile && <MobileNavigator />}
      {showSidebar && <MobileSidebar />}
      {showProductSidebar && <ProductDetailSideBar />}
      <Footer />
      {isVisible && <ScrollToTopButton />}
    </Box>
  );
};

export default HomePageLayout;
