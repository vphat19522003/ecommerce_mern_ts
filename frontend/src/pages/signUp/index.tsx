import { useState } from 'react';
import { toast } from 'react-toastify';

import { Step, StepLabel, Stepper } from '@mui/material';
import { motion } from 'framer-motion';

import { useSignUp } from '@app/api/hooks/auth.hook';
import { useDevice } from '@app/hooks/useDevice';

import { SignUpStepType } from './schemas';
import UserInformation from './userInformation';
import { UserInfoValidType } from './userInformation/schema';
import VerifyOTP from './verifyOTP';

const regist_step = ['Regist User Information', 'Verify OTP'];

const SignUpPage = (): JSX.Element => {
  const [step, setStep] = useState<SignUpStepType>('regist_user_information');
  const [userEmail, setUserEmail] = useState<string>('');
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp();

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

  const handleSubmitInformation = (userInfo: UserInfoValidType) => {
    setUserEmail(userInfo.email);

    //signup
    signUp(userInfo, {
      onSuccess: () => {
        toast.success('SignUp successfully');
        handleNextStep();
      },
      onError: (err) => {
        console.log(err);
        toast.error(err as string);
      }
    });
  };

  const handleSubmitOTP = () => {};
  const handleResendOTP = () => {};
  return (
    <>
      {!isMobile && (
        <Stepper className='flex justify-center w-1/4 pt-4 mx-auto mb-2' activeStep={stepIndex[step]} alternativeLabel>
          {regist_step.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {step === 'regist_user_information' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full h-full md:w-[480px] md:h-[620px] md:px-2 bg-white shadow-md backdrop-filter backdrop-blur-xl md:rounded-2xl shadow-black-100'>
          <UserInformation handleSubmitInformation={handleSubmitInformation} />
        </motion.div>
      )}
      {step === 'verify_otp' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full h-full  md:w-[760px] md:h-[520px]  bg-white shadow-md sm:px-8 md:px-8 lg:px-8 backdrop-filter backdrop-blur-xl md:rounded-2xl shadow-black-100 pb-4 '>
          <VerifyOTP userEmail={userEmail} handleResendOTP={handleResendOTP} handleSubmitOTP={handleSubmitOTP} />
        </motion.div>
      )}
    </>
  );
};

export default SignUpPage;
