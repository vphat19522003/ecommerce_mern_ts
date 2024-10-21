import { Box, Stack, Typography } from '@mui/material';

import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import TextArea from '@app/components/atoms/textArea';
import { useDevice } from '@app/hooks/useDevice';

const AddNewProductForm = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <form>
      <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={4}>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-8/12'}`}>
          {/* General Information */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='font-medium mb-4'>
              General Information
            </Typography>
            <Stack direction='column' className='gap-2'>
              <Label title='Product Name' />
              <InputField
                className='w-full border-8'
                variant='outlined'
                borderColorFocus='blue.700'
                backgroundColor='#eeeeee'
              />
            </Stack>
            <Stack direction='column' className='gap-2'>
              <Label title='Description' />
              <TextArea
                className='w-full border-8'
                variant='outlined'
                borderColorFocus='blue.700'
                backgroundColor='#eeeeee'
                resize
              />
            </Stack>
          </Box>
          {/* Pricing and Stock */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='font-medium mb-4'>
              Pricing and Stock
            </Typography>
          </Box>
        </Stack>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-4/12'}`}>
          {/* Upload Images */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4 min-h-96'>
            <Typography variant='subtitle1' className='font-medium mb-4'>
              Upload Images
            </Typography>
          </Box>
          {/* Category */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4 min-h-96'>
            <Typography variant='subtitle1' className='font-medium mb-4'>
              Category
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddNewProductForm;
