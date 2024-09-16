import { ArrowBack, Home, Person } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

const MobileNavigator = () => {
  return (
    <Box className='fixed bottom-0 left-0 w-full z-30 bg-white' sx={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.05)' }}>
      <Stack direction={'row'} justifyContent={'space-between'} className='px-4 py-2'>
        <Box>
          <ArrowBack />
        </Box>
        <Box>
          <Home />
        </Box>
        <Box>
          <Person />
        </Box>
      </Stack>
    </Box>
  );
};

export default MobileNavigator;
