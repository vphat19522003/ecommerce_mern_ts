import { useState } from 'react';

import { Stack, Step, StepLabel, Stepper } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';

import { SignUpStepType } from './schemas';
import UserInformation from './userInformation';
import VerifyOTP from './verifyOTP';

const regist_step = ['Regist User Information', 'Verify OTP'];

const SignUpPage = (): JSX.Element => {
  const [step, setStep] = useState<SignUpStepType>('regist_user_information');

  const { isMobile } = useDevice();

  const stepIndex: Record<SignUpStepType, number> = {
    regist_user_information: 0,
    verify_otp: 1
  };

  const nextStepMap: Record<SignUpStepType, SignUpStepType> = {
    regist_user_information: 'verify_otp',
    verify_otp: 'regist_user_information'
  };

  const handleNextStep = () => {
    setStep((prev) => nextStepMap[prev]);
  };
  return (
    <>
      {!isMobile && (
        <Stepper className='flex justify-center w-1/4 pt-8 mx-auto' activeStep={stepIndex[step]} alternativeLabel>
          {regist_step.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {step === 'regist_user_information' && (
        <Stack
          alignItems='center'
          justifyContent='center'
          className='w-full h-full md:w-[504px] md:h-[720px] sm:pt-4 md:pt-8 md:pb-16'>
          <UserInformation />
        </Stack>
      )}
      {step === 'verify_otp' && (
        <Stack alignItems='center' justifyContent='center' className='sm:pt-4 md:pt-8 md:pb-16'>
          <VerifyOTP />
        </Stack>
      )}
    </>
  );
};

export default SignUpPage;
