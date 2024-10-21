import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const AddNewProductAction = (): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={2}>
      <Button color='primary'>Reset</Button>

      <ButtonForm variant='contained'>
        <Check />
        Publish
      </ButtonForm>
    </Stack>
  );
};

export default AddNewProductAction;
