import { UseFormReset } from 'react-hook-form';

import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

import { AddNewProductFormType } from './schemas';

type AddNewProductActionProps = {
  reset: UseFormReset<AddNewProductFormType>;
};

const AddNewProductAction = ({ reset }: AddNewProductActionProps): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={2}>
      <Button color='primary' onClick={() => reset()}>
        Reset
      </Button>

      <ButtonForm variant='contained' type='submit'>
        <Check />
        Publish
      </ButtonForm>
    </Stack>
  );
};

export default AddNewProductAction;
