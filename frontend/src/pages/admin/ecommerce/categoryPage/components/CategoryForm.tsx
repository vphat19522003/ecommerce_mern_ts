import { useState } from 'react';

import { UploadFile } from '@mui/icons-material';
import { Button, Stack, Switch } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import TextArea from '@app/components/atoms/textArea';

type CategoryFormPropsType = {
  handleCloseDialog: () => void;
};

const CategoryForm = ({ handleCloseDialog }: CategoryFormPropsType): JSX.Element => {
  const [image, setImage] = useState<string>('');
  return (
    <form>
      <Stack direction={'column'} spacing={3}>
        <Stack direction='column' spacing={2}>
          <Label title='Name' />
          <InputField
            className='w-full border-8'
            variant='outlined'
            borderColorFocus='blue.700'
            backgroundColor='white'
            placeholder='Enter category name'
            autoFocus
          />
        </Stack>
        <Stack direction='column' spacing={2}>
          <Label title='Description' />
          <TextArea
            className='w-full border-8 text-md'
            variant='outlined'
            borderColorFocus='blue.700'
            backgroundColor='white'
            placeholder='Enter category description'
            resize
          />
        </Stack>

        <Label title='Category Image' />
        <Stack className={'border-[1px] rounded-2xl h-96 w-full'} justifyContent={'center'}>
          <input
            type='file'
            id='upload-thumbnail'
            accept='image/*'
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const thumbnailImage = URL.createObjectURL(e.target.files?.[0]);
                setImage(thumbnailImage);
              }
            }}
          />
          {!image && (
            <label
              htmlFor='upload-thumbnail'
              className='border-1 border-dashed border-gray-400  text-center transition-all duration-300 bg-white cursor-pointer h-8 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-white'>
              <UploadFile />
            </label>
          )}

          {image && (
            <label
              htmlFor='upload-thumbnail'
              className='relative block overflow-hidden text-center transition-all duration-300 bg-white border-2 border-gray-400 border-solid cursor-pointer h-96 text-slate-400 rounded-2xl hover:border-blue-700'>
              <img src={image} className='object-cover w-full h-96' />
            </label>
          )}
        </Stack>

        {/* PENDING - NOT USE AT THIS TIME */}
        <Stack direction='column'>
          <Label title='Enabled' />
          <Switch />
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button color='secondary' onClick={handleCloseDialog}>
            Cancel
          </Button>

          <ButtonForm variant='contained' type='submit'>
            Add
          </ButtonForm>
        </Stack>
      </Stack>
    </form>
  );
};

export default CategoryForm;
