import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

import { DropdownDataType, IPlainObject } from '@app/types/common';

type ComboBoxProps = Omit<SelectProps, 'error' | 'multiple'> & {
  error?: IPlainObject;
  data: DropdownDataType[];
  labelType?: 'inside' | 'outside';
  isDisabled?: boolean;
  description?: string;
  emptyItem?: boolean;
};

const CustomComboBox = ({
  error,
  data,
  labelType = 'inside',
  isDisabled = false,
  description,
  ...otherProps
}: ComboBoxProps): JSX.Element => {
  return (
    <>
      {labelType === 'outside' && <InputLabel>{otherProps.label}</InputLabel>}
      <FormControl>
        {labelType === 'inside' && <InputLabel>{otherProps.label}</InputLabel>}
        <Select
          defaultValue=''
          label={labelType === 'inside' ? otherProps.label : undefined}
          disabled={isDisabled}
          {...otherProps}
          sx={{
            '.MuiSelect-select': {
              paddingBottom: '8px'
            }
          }}>
          <MenuItem value=''>Choose Option</MenuItem>
          {data.map((item, idx) => (
            <MenuItem key={item.toString() + idx} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className='h-2'>
        <FormHelperText
          error={!!error}
          sx={{
            marginTop: 1
          }}>
          {description ? description : error?.message}
        </FormHelperText>
      </Box>
    </>
  );
};

export default CustomComboBox;
