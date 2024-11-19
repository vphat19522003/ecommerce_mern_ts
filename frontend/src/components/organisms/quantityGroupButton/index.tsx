import { Add, Remove } from '@mui/icons-material';
import { ButtonGroup, TextField } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const QuantityGroupButton = (): JSX.Element => {
  return (
    <ButtonGroup variant='outlined' sx={{ height: '40px' }}>
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '36px', padding: '0' }}>
        <Remove className='text-lg' />
      </ButtonForm>
      <TextField
        variant='outlined'
        defaultValue={1}
        inputProps={{
          min: 1,
          style: { textAlign: 'center', padding: '0', height: '36px', width: '56px' }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            width: '56px',
            height: '36px',
            padding: '0',
            borderRadius: '0px',
            mr: '3px',
            ml: '2px',
            '&:hover fieldset': {
              borderColor: '#cbd5e1' // Màu border slate-200
            },
            '&.Mui-focused fieldset': {
              borderColor: '#cbd5e1' // Màu border slate-200 khi focus
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbd5e1'
          }
        }}
      />
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '36px', padding: '0' }}>
        <Add className='text-lg' />
      </ButtonForm>
    </ButtonGroup>
  );
};

export default QuantityGroupButton;
