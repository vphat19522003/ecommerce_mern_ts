import { useRef } from 'react';

import { AddCircleOutline } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { useGetListCategory } from '@app/api/hooks/category.hook';
import ButtonForm from '@app/components/atoms/button';
import PageTitle from '@app/components/molecules/admin/pageTitle';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';
import CustomTable from '@app/components/organisms/table';
import { TableFieldType } from '@app/components/organisms/table/type';
import useTableData from '@app/hooks/useTableData';
import { CustomCategoryResponseType } from '@app/types/category';

import CategoryActions from './components/CategoryActions';
import CategoryForm from './components/CategoryForm';

const CategoryPage = (): JSX.Element => {
  const addDialogRef = useRef<IDialogRef>(null);
  const deleteDialogRef = useRef<IDialogRef>(null);

  const { data: listCategory = [] } = useGetListCategory();

  const tableData = useTableData({});

  const fieldTable: TableFieldType[] = [
    { field: 'name', label: 'Name', textAlign: 'center' },
    { field: 'description', label: 'Description', textAlign: 'center' },
    { field: 'createdAt', label: 'Created At', textAlign: 'center' },
    { field: 'action', label: 'Action' }
  ];

  const handleAddMainCategory = () => {
    addDialogRef.current?.show(() => {});
  };

  const handleAddSubCategory = () => {};

  const handleEditCategory = () => {};

  const handleDeleteCategory = (category: CustomCategoryResponseType) => {
    deleteDialogRef.current?.show(() => {});
  };

  const handleCloseDialog = () => {
    addDialogRef.current?.hide();
  };
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className='mb-4'>
        <PageTitle />
        <ButtonForm variant='contained' type='submit' disabled={false} onClick={handleAddMainCategory}>
          <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
            <AddCircleOutline />
            <p className='my-0 '>Create</p>
          </Stack>
        </ButtonForm>
      </Stack>
      <div className='grid grid-cols-1'>
        <CustomTable
          data={listCategory}
          tableData={tableData}
          tableField={fieldTable}
          pagination
          uniqueField='_id'
          collapsed
          CustomAction={CategoryActions({ handleDeleteCategory })}
        />
      </div>
      <PopUp title='Create Category' ref={addDialogRef} size='xl'>
        <CategoryForm handleCloseDialog={handleCloseDialog} />
      </PopUp>

      <ConfirmPopup title='Warning' ref={deleteDialogRef}>
        Do you want to delete this category ?
      </ConfirmPopup>
    </>
  );
};

export default CategoryPage;
