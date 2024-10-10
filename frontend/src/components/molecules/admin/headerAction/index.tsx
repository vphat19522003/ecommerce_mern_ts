import { AccountCircle, Notifications, Settings, WbSunny } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

const AdminHeaderAction = () => {
  return (
    <Box>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <IconButton>
          <WbSunny />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AdminHeaderAction;
