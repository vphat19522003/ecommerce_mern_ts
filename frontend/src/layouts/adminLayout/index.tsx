import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import AdminHeader from '@app/components/organisms/admin/header';
import AdminSidebar from '@app/components/organisms/admin/sidebar';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const showAdminSidebar = useSelector((state: RootState) => state.ui.showAdminSidebar);
  const location = useLocation();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (window.scrollY !== 0) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }, [location]);
  return (
    <Stack direction={'row'}>
      {/* Sidebar */}
      {showAdminSidebar && <AdminSidebar />}
      {/* Main content */}
      <Stack
        direction={'column'}
        className={`bg-[#f3f7fa] transition-all duration-200 ease-in-out block w-full px-6 ${showAdminSidebar ? (isMobile ? 'ml-0' : 'ml-64') : 'ml-0'}`}>
        <AdminHeader />
        <Box>
          {/* Nội dung trang bên dưới header */}
          <Box sx={{ pt: 18, px: 3 }}>
            {[...Array(30)].map((_, index) => (
              <Typography key={index} variant='body1' paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet pretium leo. Fusce et mi
                euismod, bibendum nisl id, accumsan enim. Cras porta sodales lacus, sit amet viverra augue ullamcorper
                id.
              </Typography>
            ))}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
