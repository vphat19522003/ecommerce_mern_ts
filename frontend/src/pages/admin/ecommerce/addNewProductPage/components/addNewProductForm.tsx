import React, { useState } from 'react';

import { AddCircle, UploadFile } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import TextArea from '@app/components/atoms/textArea';
import { useDevice } from '@app/hooks/useDevice';
import { CategoryResponseType } from '@app/types/category';
import { mapCategoryData } from '@app/utils/mapLocationData';

type AddNewProductFormProps = {
  mainCategory: CategoryResponseType[];
};

const AddNewProductForm = ({ mainCategory }: AddNewProductFormProps): JSX.Element => {
  const [productType, setProductType] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [descriptionImages, setDescriptionImages] = useState<string[]>([]);
  const { isMobile } = useDevice();
  console.log({ productType });
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnailImage = e.target.files?.[0];
    if (thumbnailImage) {
      setThumbnailImage(URL.createObjectURL(thumbnailImage));
    }
  };

  const handleChangeDescriptionImage = (e: React.ChangeEvent<HTMLInputElement>, index) => {
    const descriptionImages = e.target.files?.[0];

    if (descriptionImages) {
      const newImageURL = URL.createObjectURL(descriptionImages);
      setDescriptionImages((prev) => {
        const updateImages = [...prev];
        updateImages[index] = newImageURL;
        return updateImages;
      });
    }
  };
  return (
    <form>
      <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={4}>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-8/12'}`}>
          {/* General Information */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              General Information
            </Typography>
            <Stack direction='column' className='gap-2'>
              <Label title='Product Name' />
              <InputField
                className='w-full border-8'
                variant='outlined'
                borderColorFocus='blue.700'
                backgroundColor='#eeeeee'
              />
            </Stack>
            <Stack direction='column' className='gap-2'>
              <Label title='Description' />
              <TextArea
                className='w-full border-8'
                variant='outlined'
                borderColorFocus='blue.700'
                backgroundColor='#eeeeee'
                resize
              />
            </Stack>
          </Box>
          {/* Pricing and Stock */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Pricing and Stock
            </Typography>
            {/*  */}
            <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={2}>
              <Stack className='w-full'>
                <Stack direction='column' className='gap-2'>
                  <Label title='Price' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                  />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <Label title='Stock' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                  />
                </Stack>
              </Stack>
              <Stack className='w-full'>
                <Stack direction='column' className='gap-2'>
                  <Label title='Discount' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                  />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <Label title='Discount Type' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-4/12'}`}>
          {/* Upload Images */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4 min-h-96'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Upload Images
            </Typography>
            <Typography variant='subtitle2' className='mb-4 font-medium'>
              Thumbnail Image
            </Typography>
            <Stack className={'border-[1px] rounded-2xl h-96'} justifyContent={'center'}>
              <input type='file' id='upload-thumbnail' accept='image/*' hidden onChange={handleChangeImage} />
              {!thumbnailImage && (
                <label
                  htmlFor='upload-thumbnail'
                  className='px-2 py-2 text-center transition-all duration-300 bg-white border-2 border-gray-400 border-dashed cursor-pointer h-96 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-white'>
                  <UploadFile className='text-blue-700 mt-36' />
                  <p className='text-blue-700'>Upload product thumbnail</p>
                </label>
              )}
              {thumbnailImage && (
                <label
                  htmlFor='upload-thumbnail'
                  className='relative block overflow-hidden text-center transition-all duration-300 bg-white border-2 border-gray-400 border-solid cursor-pointer h-96 text-slate-400 rounded-2xl hover:border-blue-700'>
                  <img src={thumbnailImage} className='object-cover w-full h-96' />
                </label>
              )}
            </Stack>
            <Typography variant='subtitle2' className='my-4 font-medium'>
              Description Images
            </Typography>
            {/* Description Images */}
            <Stack direction={'row'} gap={2}>
              {[...Array(4)].map((_, index) => (
                <Stack
                  key={'description' + index}
                  className={`border-[1px] rounded-2xl w-1/4 ${isMobile ? 'h-24' : 'h-27'}`}>
                  <input
                    type='file'
                    id={`upload-thumbnail-${index}`}
                    accept='image/*'
                    hidden
                    onChange={(e) => handleChangeDescriptionImage(e, index)}
                  />
                  {!descriptionImages[index] && (
                    <label
                      htmlFor={`upload-thumbnail-${index}`}
                      className={`px-2 py-2 text-center transition-all duration-300 bg-white border-2 border-gray-400 border-dashed cursor-pointer ${isMobile ? 'h-24' : 'h-27'} grow text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-white`}>
                      <AddCircle className='mt-7 text-3xl text-blue-700' />
                    </label>
                  )}
                  {descriptionImages[index] && (
                    <label
                      htmlFor={`upload-thumbnail-${index}`}
                      className={`relative flex overflow-hidden text-center transition-all duration-300 bg-white border-2 border-gray-400 border-solid cursor-pointer ${isMobile ? 'h-24' : 'h-27'} text-slate-400 rounded-2xl hover:border-blue-700`}>
                      <img src={descriptionImages[index]} className='object-cover w-full h-full' />
                    </label>
                  )}
                </Stack>
              ))}
            </Stack>
          </Box>
          {/* Category */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Category
            </Typography>
            <Typography variant='subtitle2' className='my-4 font-medium'>
              Product Category
            </Typography>
            <CustomComboBox
              label='Category'
              data={mapCategoryData(mainCategory)}
              onChange={(e, newValue) => {
                if (React.isValidElement(newValue)) {
                  const label = newValue.props.children;
                  setProductType(label);
                }
              }}
            />
          </Box>
        </Stack>
        {productType === 'Book' && <div>{productType}</div>}
      </Stack>
    </form>
  );
};

export default AddNewProductForm;
