import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { useGetCart } from '@app/api/hooks/cart.hook';
import { useGetMainCategory } from '@app/api/hooks/category.hook';
import Footer from '@app/components/organisms/footer';
import Header from '@app/components/organisms/header';
import ImageViewer from '@app/components/organisms/imageViewer';
import MobileNavigator from '@app/components/organisms/mobileNavigator';
import MobileSideBar from '@app/components/organisms/mobileSidebar';
import ProductDetailSideBar from '@app/components/organisms/productDetailSidebar';
import ScrollToTopButton from '@app/components/organisms/scrollToTopButton';
import SubBanner from '@app/components/organisms/subBanner';
import { useDevice } from '@app/hooks/useDevice';
import { setCategories } from '@app/redux/categorySlice';
import { closeImageViewer } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

type MainLayoutPropsType = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useDevice();
  const { data: mainCategory = [] } = useGetMainCategory();
  const { data } = useGetCart(user ? true : false);
  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);
  const showProductSidebar = useSelector((state: RootState) => state.ui.showProductDetailSidebar);
  const isViewerOpen = useSelector((state: RootState) => state.ui.showImageViewer);
  const imageViewers = useSelector((state: RootState) => state.ui.viewerImages);
  const viewerIndex = useSelector((state: RootState) => state.ui.viewerIndex);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log({ CART: data });
    dispatch(setCategories(mainCategory));
  });

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
      {showSidebar && <MobileSideBar />}
      {showProductSidebar && <ProductDetailSideBar />}
      <Footer />
      {isVisible && <ScrollToTopButton />}
      {isViewerOpen && (
        <ImageViewer images={imageViewers} initialIndex={viewerIndex} onClose={() => dispatch(closeImageViewer())} />
      )}
    </Box>
  );
};

export default MainLayout;
