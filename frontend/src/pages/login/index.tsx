import { Box, Button, Input, Link, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import StitchLogo from '../../assets/stitch_icon.png';

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full h-full md:w-[980px] md:h-[616px] overflow-hidden bg-white shadow-md backdrop-filter backdrop-blur-xl md:rounded-2xl shadow-black-100'>
      <Box className='grid w-full h-full grid-cols-1 md:grid-cols-2'>
        <Box className='z-0 hidden h-full md:flex md:items-center md:justify-center bg-gradient-to-br from-blue-500 to-pink-300 opacity-90 rounded-es-2xl rounded-ss-2xl'>
          <img src={StitchLogo} className='z-10 w-52 h-52' alt='Login banner' />
        </Box>
        <Stack justifyContent='center' alignItems='center' className='h-full px-8'>
          <form className='w-full'>
            <Stack flexDirection='column' className='h-full'>
              <Stack justifyContent='center' alignItems='center' className='mb-16'>
                <Box
                  className='flex md:hidden'
                  sx={{
                    width: {
                      xs: '80px'
                    },
                    height: {
                      xs: '80px'
                    }
                  }}>
                  <img src={StitchLogo} alt='Logo' className='object-cover w-20 h-20' />
                </Box>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography
                    variant='h1'
                    component='h1'
                    className='font-bold tracking-wider text-center text-blue-700 md:m-auto'
                    sx={(theme) => ({
                      [theme.breakpoints.down(400)]: {
                        fontSize: '40px'
                      },
                      fontSize: {
                        xs: '48px',
                        md: '64px'
                      }
                    })}>
                    Stitch
                  </Typography>
                  <Typography
                    variant='h1'
                    component='h1'
                    className='font-bold tracking-wider text-center text-pink-500 md:m-auto'
                    sx={(theme) => ({
                      [theme.breakpoints.down(400)]: {
                        fontSize: '40px'
                      },
                      fontSize: {
                        xs: '48px',
                        md: '64px'
                      }
                    })}>
                    Shop
                  </Typography>
                </Stack>
              </Stack>

              <Box className='grid gap-4 mt-4'>
                <Stack direction='column' className='gap-2'>
                  <label>User ID</label>
                  <Input />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <label>Password</label>
                  <Input />
                </Stack>
              </Box>

              <Stack marginTop={4} justifyContent='center' alignItems='flex-start'>
                <Link href={'/forgot-password'} className='no-underline text-md'>
                  Forgot Password?
                </Link>
              </Stack>

              <Button variant='contained' fullWidth className='mt-4 text-lg' type='submit'>
                Login
              </Button>

              <hr className='w-full my-4 opacity-20' />
              <Stack flexDirection={'row'} alignItems={'center'}>
                <Typography component='span' fontSize='13px'>
                  No account yet?&nbsp;
                </Typography>
                <Link href={'/sign-up'} className='text-sm text-pink-400 no-underline '>
                  Sign Up
                </Link>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default LoginPage;
