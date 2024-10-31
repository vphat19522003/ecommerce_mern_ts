import { useForm } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Divider, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import ButtonForm from '@app/components/atoms/button';
import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';

import { TableFilterPropsType } from './type';

const TableFilter = <TData,>({
  filterField,
  isLoading,
  onSubmit,
  canClear = true,
  initialFilterData
}: TableFilterPropsType<TData>): JSX.Element => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  return (
    <>
      <div className='grid grid-cols-2 gap-4 my-4 xl:grid-cols-3 max-w-5xl'>
        {filterField?.map((field) => {
          if (field.type === 'input') {
            return <InputField key={field.id} variant='outlined' backgroundColor='transparent' hideHelperText />;
          }
          if (field.type === 'combobox') {
            return <CustomComboBox key={field.id} data={[]} />;
          }
          if (field.type === 'date-picker') {
            return <DatePicker key={field.id} />;
          }
          if (field.type === 'date-range-picker') {
            return <></>;
          }
        })}

        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          {canClear && (
            <ButtonForm
              className='max-h-10'
              color='secondary'
              disabled={isLoading}
              onClick={() => {
                if (initialFilterData) {
                  reset(initialFilterData);
                } else {
                  reset();
                }
              }}>
              Reset
            </ButtonForm>
          )}
          <ButtonForm variant='contained' className='max-h-10 px-3'>
            <Stack direction={'row'} alignItems={'center'}>
              <Search />
              <p>Search</p>
            </Stack>
          </ButtonForm>
        </Stack>
      </div>
      <Divider />
    </>
  );
};

export default TableFilter;
