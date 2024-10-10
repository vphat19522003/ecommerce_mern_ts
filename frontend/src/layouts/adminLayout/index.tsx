import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import AdminHeader from '@app/components/organisms/admin/header';
import AdminSidebar from '@app/components/organisms/admin/sidebar';

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [location]);
  return (
    <Box>
      <AdminHeader />
      <Box className='bg-white'>
        {/* Nội dung trang bên dưới header */}
        <Box sx={{ pt: 18, px: 3 }}>
          {[...Array(10)].map((_, index) => (
            <Typography key={index} variant='body1' paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet pretium leo. Fusce et mi euismod,
              bibendum nisl id, accumsan enim. Cras porta sodales lacus, sit amet viverra augue ullamcorper id.
            </Typography>
          ))}
        </Box>
      </Box>
      <AdminSidebar />
    </Box>
  );
};

export default AdminLayout;
