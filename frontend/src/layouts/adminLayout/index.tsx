import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

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
  return <Box>{children}</Box>;
};

export default AdminLayout;
