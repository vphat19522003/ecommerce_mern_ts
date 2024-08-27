import { forwardRef, type Ref } from 'react';

import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  type TextFieldProps,
  TextFieldPropsSizeOverrides,
  type TextFieldVariants
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { type IPlainObject } from '@app/types/common';

type InputFieldProps = Omit<TextFieldProps, 'helperText' | 'error'> & {
  error?: IPlainObject;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: TextFieldVariants;
  readOnly?: boolean;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
};

const InputField = forwardRef(
  (
    {
      error,
      startAdornment,
      endAdornment,
      readOnly,
      variant = 'filled',
      size = 'small',
      ...otherProps
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <Box>
        <TextField
          fullWidth
          {...otherProps}
          ref={ref}
          error={!!error}
          size={size}
          variant={variant}
          sx={({ palette }) => ({
            '.MuiInputBase-root': {
              backgroundColor: palette.black[100]
            },
            'input::placeholder': {
              fontSize: '14px'
            },
            input: {
              paddingTop: '12px'
            }
          })}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position='start' sx={{ color: 'inherit' }}>
                <>{startAdornment}</>
              </InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position='end' sx={{ color: 'inherit' }}>
                <>{endAdornment}</>
              </InputAdornment>
            ) : undefined,
            readOnly: readOnly
          }}
        />
        <Box className='h-2'>
          <FormHelperText
            error={!!error}
            sx={{
              marginTop: 1
            }}>
            {error?.message}
          </FormHelperText>
        </Box>
      </Box>
    );
  }
);

export default InputField;
