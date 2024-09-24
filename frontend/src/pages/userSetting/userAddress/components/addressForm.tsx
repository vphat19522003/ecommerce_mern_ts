import { Stack } from '@mui/material';

import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';

const AddressForm = (): JSX.Element => {
  return (
    <form className='w-full'>
      <Stack spacing={4}>
        <CustomComboBox label='City' data={[]} size='small' />
        <CustomComboBox label='District' data={[]} size='small' />
        <Stack direction={'row'} spacing={2} alignItems={'center'} className='w-full'>
          <CustomComboBox label='Ward' data={[]} size='small' />
          <CustomComboBox
            label='Place'
            data={[
              { label: 'Home', value: 'Home', name: 'Home' },
              { label: 'Company', value: 'Company', name: 'Company' },
              { label: 'Private', value: 'Private', name: 'Private' }
            ]}
            size='small'
          />
        </Stack>

        <InputField variant='outlined' backgroundColor='transparent' placeholder='Your home number, street name' />
      </Stack>
    </form>
  );
};

export default AddressForm;
