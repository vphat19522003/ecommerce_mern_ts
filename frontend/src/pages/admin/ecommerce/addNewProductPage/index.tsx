import { Stack } from '@mui/material';

import { useGetMainCategory } from '@app/api/hooks/category.hook';
import PageTitle from '@app/components/molecules/admin/pageTitle';

import AddNewProductAction from './components/addNewProductAction';
import AddNewProductForm from './components/addNewProductForm';

const AddNewProductPage = (): JSX.Element => {
  const { data: mainCategory = [] } = useGetMainCategory();

  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className='mb-4'>
        <PageTitle />
        <AddNewProductAction />
      </Stack>
      <AddNewProductForm mainCategory={mainCategory} />
    </Stack>
  );
};

export default AddNewProductPage;
