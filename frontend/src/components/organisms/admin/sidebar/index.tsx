import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

import HeaderLogo from '@app/components/molecules/headerLogo';
import { useDevice } from '@app/hooks/useDevice';
import { toggleAdminSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

const AdminSidebar = (): JSX.Element => {
  const showAdminSidebar = useSelector((state: RootState) => state.ui.showAdminSidebar);
  const dispatch = useDispatch();
  const { isMobile } = useDevice();

  return (
    <>
      {showAdminSidebar && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-10 bg-black'
          onClick={() => dispatch(toggleAdminSidebar())}
        />
      )}
      <Stack
        className={`shadow-sm fixed top-0 h-full bg-white w-64 z-40 duration-300 ease-in-out overflow-hidden ${showAdminSidebar ? 'left-0' : 'left-[-100%]'}`}>
        <Box className='w-full px-4 pt-6 mx-auto'>
          <HeaderLogo font_size='32px' />
        </Box>

        <ul>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
        </ul>
      </Stack>
    </>
  );
};

export default AdminSidebar;
