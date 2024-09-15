import { SearchSharp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import InputField from '@app/components/atoms/inputField';

const CustomIconButton = ({ children }: { children: React.ReactNode }) => (
  <IconButton
    sx={{
      fontSize: '14px',
      borderLeft: '2px solid',
      borderRadius: 0,
      borderColor: 'grey.300',
      '&:hover': {
        color: 'pink.500',
        borderColor: 'pink.500',
        borderRadius: 0,
        backgroundColor: 'transparent'
      }
    }}>
    {children}
  </IconButton>
);

const HeaderSearch = (): JSX.Element => {
  return (
    <Box>
      <InputField
        className='w-full border-8'
        startAdornment={<SearchSharp />}
        endAdornment={<CustomIconButton>Search</CustomIconButton>}
        description='Enter the product name you want to search'
        variant='outlined'
        borderColorFocus='blue.700'
        backgroundColor='transparent'
      />
    </Box>
  );
};

export default HeaderSearch;
