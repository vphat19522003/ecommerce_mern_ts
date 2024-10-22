import React from 'react';
import { NumericFormat } from 'react-number-format';

const NumberFormatCustom = () => {
  return (
    <NumericFormat
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      prefix=''
      className='w-full'
    />
  );
};
export default NumberFormatCustom;
