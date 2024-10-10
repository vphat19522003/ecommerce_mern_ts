import { useEffect, useState } from 'react';

import { Menu } from '@mui/icons-material';
import { AppBar, Box, IconButton, Stack } from '@mui/material';

import AdminHeaderAction from '@app/components/molecules/admin/headerAction';

const AdminHeader = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        className='shadow-none'
        sx={{
          backdropFilter: isScrolled ? 'blur(2px)' : 'none',
          backgroundColor: isScrolled ? 'transparent' : '#ffffff',
          transition: 'all 0.3s ease'
        }}>
        <Stack direction={'row'} justifyContent={'space-between'} className='box-border w-full px-2 py-4'>
          <IconButton>
            <Menu />
          </IconButton>
          <AdminHeaderAction />
        </Stack>
      </AppBar>
    </Box>
  );
};

export default AdminHeader;
