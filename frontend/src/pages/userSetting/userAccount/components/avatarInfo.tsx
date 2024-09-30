import { useRef, useState } from 'react';

import { Visibility } from '@mui/icons-material';
import { Stack } from '@mui/material';

import stitchAvatar from '@app/assets/stitch_icon.png';
import viteAvatar from '@app/assets/vite.svg';
import { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';

const AvatarInfo = (): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const avatarPopupRef = useRef<IDialogRef>(null);
  const handleMouseEnterAvatar = () => {
    setIsHovering(true);
  };

  const handleMouseLeaveAvatar = () => {
    setIsHovering(false);
  };

  const handleOpenAvatar = () => {
    avatarPopupRef.current?.show();
  };
  return (
    <>
      <Stack
        direction={'row'}
        spacing={8}
        className='border-solid border-y-[0.5px] border-gray-200 border-x-0 py-4'
        alignItems={'center'}>
        <Stack
          className='w-[140px] h-[140px] rounded-full relative shadow-md overflow-hidden cursor-pointer'
          onMouseEnter={handleMouseEnterAvatar}
          onMouseLeave={handleMouseLeaveAvatar}
          onClick={() => handleOpenAvatar()}>
          <img
            src={viteAvatar}
            alt=''
            className='w-[140px] h-[140px] rounded-full border-solid border-gray-200 object-cover border-2 '
          />

          <div
            className={` w-[140px] h-[140px] rounded-full bg-black absolute transition-all duration-300 ease-in-out top-0 left-0 ${isHovering ? 'opacity-15 visible' : 'opacity-0 invisible'}`}></div>

          <Visibility
            className={` z-10 absolute text-white transition-opacity duration-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          />
        </Stack>
        <Stack>
          <input type='file' />
          <p className='text-gray-500 text-md'>Please choose image has size less than 5MB</p>
        </Stack>
      </Stack>
      <PopUp title='Avatar' ref={avatarPopupRef} setClose>
        <Stack>
          <img src={stitchAvatar} alt='' className='object-cover w-full h-full' />
        </Stack>
      </PopUp>
    </>
  );
};

export default AvatarInfo;
