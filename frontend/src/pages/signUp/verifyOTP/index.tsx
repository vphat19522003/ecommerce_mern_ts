import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormHelperText, Link, Stack, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import ButtonForm from '@app/components/atoms/button';
import { paths } from '@app/routes/paths';

import { VerifyOTPSchemaType, VerifyOTPValidateSchema, VerifyOTPValidateType } from './schema';

const secondsCountdown = 120;

const VerifyOTP = ({ userEmail, handleResendOTP, handleSubmitOTP }: VerifyOTPSchemaType): JSX.Element => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors, isLoading },
    handleSubmit
  } = useForm<VerifyOTPValidateType>({
    resolver: zodResolver(VerifyOTPValidateSchema),
    defaultValues: { code: ' '.repeat(6), email: userEmail }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full h-full max-w-2xl overflow-y-auto bg-white shadow-md sm:px-8 md:px-8 lg:px-8 backdrop-filter backdrop-blur-xl md:rounded-2xl shadow-black-100 '>
      <Link
        className='self-start block mt-6 ml-2 text-pink-500 no-underline cursor-pointer hover:underline'
        href={paths.login}>
        {'< Login '}
        {userEmail}
      </Link>
      <form>
        <Stack direction='column' className='mt-10' alignItems='center' gap={3}>
          <Typography variant='h4' component='h4' className='font-bold text-center text-blue-600 '>
            OTP Verification
          </Typography>
          <Typography className='text-sm text-center text-blue-600'>
            An OTP has been sent to your email. <br />
            Please enter the OTP to verify your account
          </Typography>
          <Stack direction='column' alignItems={'center'} gap='8px'>
            <Controller
              control={control}
              name='code'
              render={({ field: { onChange, value } }) => (
                <Stack direction='row' className='w-11/12 gap-4 mt-8 md:gap-6 md:w-150' justifyContent='space-around'>
                  {Array.from({ length: 6 }, (_, index) => (
                    <TextField
                      key={index}
                      variant='standard'
                      type='tel'
                      autoComplete='off'
                      inputProps={{ maxLength: 1 }}
                      sx={{ input: { fontWeight: '500', fontSize: { xs: '40px', md: '64px' }, textAlign: 'center' } }}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </Stack>
              )}
            />

            <FormHelperText className='mt-4' error={!!errors.code}>
              {errors.code?.message}
            </FormHelperText>
            {false && (
              <Typography component='span' className='text-sm text-center text-red-500'>
                Your OTP has expired. Please click resend OTP and try again
              </Typography>
            )}
          </Stack>
        </Stack>
        <Box className='mt-4 text-center'>
          <Typography component='span' className='text-4xl font-bold'>
            00:00
            {/* {`${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`} */}
          </Typography>
        </Box>
        <Stack alignItems='center' flexDirection='column' gap='8px' className='mt-4'>
          <ButtonForm color='primary' variant='contained' className='h-12 w-80 md:w-120'>
            Verify
          </ButtonForm>
          <ButtonForm variant='text' className='text-pink-500'>
            Resend OTP
          </ButtonForm>
        </Stack>
      </form>
    </motion.div>
  );
};

export default VerifyOTP;
