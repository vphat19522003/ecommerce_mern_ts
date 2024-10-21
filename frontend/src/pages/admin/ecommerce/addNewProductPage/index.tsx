import { Stack } from '@mui/material';

import PageTitle from '@app/components/molecules/admin/pageTitle';

import AddNewProductAction from './components/addNewProductAction';
import AddNewProductForm from './components/addNewProductForm';

const AddNewProductPage = (): JSX.Element => {
  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className='mb-4'>
        <PageTitle />
        <AddNewProductAction />
      </Stack>
      <AddNewProductForm />
    </Stack>
  );
};

export default AddNewProductPage;
