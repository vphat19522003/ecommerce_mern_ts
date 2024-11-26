import { AttachMoney } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import NumberField from '@app/components/atoms/numberFormatCustom';

const AmountRange = (): JSX.Element => {
  return (
    <Stack>
      <Typography
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px'
        }}>
        Tự nhập khoảng giá
      </Typography>
      <Stack
        direction={'row'}
        spacing={2}
        style={{
          marginTop: '14px',
          marginRight: '2px'
        }}
        alignItems={'center'}>
        <NumberField
          className='w-full border-8'
          variant='outlined'
          borderColorFocus='blue.700'
          backgroundColor='white'
          endAdornment={<AttachMoney />}
          placeholder='From'
          decimalScale={2}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value) || 0;
          }}
        />
        <Typography>~</Typography>
        <NumberField
          className='w-full border-8'
          variant='outlined'
          borderColorFocus='blue.700'
          backgroundColor='white'
          endAdornment={<AttachMoney />}
          placeholder='To'
          decimalScale={2}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value) || 0;
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AmountRange;
