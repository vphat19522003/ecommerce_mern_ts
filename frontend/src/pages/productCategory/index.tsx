import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ArrowDropDown, FilterAlt, KeyboardArrowDown } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, Rating, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import { useGetAllLatestProduct } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import FreeShip from '@app/assets/FreeShip.png';
import TopDeal from '@app/assets/TopDeal.png';
import ButtonForm from '@app/components/atoms/button';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import ProductCard from '@app/components/organisms/productCard';
import { useDevice } from '@app/hooks/useDevice';

const arrayListCategory = [
  {
    name: 'English Book'
  },
  {
    name: 'Dictionary'
  },
  {
    name: 'Comic'
  },
  {
    name: 'Life Skill'
  }
];

const ProductCategoryPage = (): JSX.Element => {
  const [toggleNavigator, setToggleNavigator] = useState({
    filterNavigator1: {
      id: 1,
      isActive: true
    },
    filterNavigator2: {
      id: 2,
      isActive: true
    }
  });
  const { isMobile } = useDevice();
  const location = useLocation();
  const { data: AllLatestProducts = [] } = useGetAllLatestProduct(8);

  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} />
      <Stack direction={isMobile ? 'column' : 'row'} className='mb-4' spacing={4}>
        {/* Category Navigator */}
        {!isMobile && (
          <Stack
            className='w-3/12 max-w-[263px] max-h-max'
            spacing={4}
            style={{
              position: isMobile ? 'unset' : 'sticky',
              top: isMobile ? '0px' : '16px'
            }}>
            <Stack
              className='bg-white rounded-lg max-h-max'
              style={{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                className='px-4 py-3 cursor-pointer'
                onClick={() =>
                  setToggleNavigator((prev) => ({
                    ...prev,
                    filterNavigator1: { ...prev['filterNavigator1'], isActive: !prev['filterNavigator1'].isActive }
                  }))
                }>
                <Typography className='font-bold'>Khám phá theo danh mục</Typography>
                <KeyboardArrowDown />
              </Stack>
              <Divider
                className={`${toggleNavigator.filterNavigator1.isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}
              />
              <AnimatePresence initial={false}>
                {toggleNavigator.filterNavigator1.isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}>
                    {arrayListCategory.map((category, index) => (
                      <Typography
                        key={index}
                        className='px-4 py-3 text-md hover:text-blue-700 hover:underline cursor-pointer'>
                        {category.name}
                      </Typography>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>

            <Stack
              className='bg-white rounded-lg max-h-max'
              style={{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                className='px-4 py-3 cursor-pointer'
                onClick={() =>
                  setToggleNavigator((prev) => ({
                    ...prev,
                    filterNavigator2: { ...prev['filterNavigator2'], isActive: !prev['filterNavigator2'].isActive }
                  }))
                }>
                <Typography className='font-bold'>Lọc giá</Typography>
                <KeyboardArrowDown />
              </Stack>
              <Divider
                className={`${toggleNavigator.filterNavigator2.isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}
              />
              <AnimatePresence initial={false}>
                {toggleNavigator.filterNavigator2.isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}>
                    <Stack spacing={4}>
                      {arrayListCategory.map((category, index) => (
                        <FormControlLabel
                          key={index}
                          className='ml-1'
                          control={<Checkbox checked={false} />}
                          label={
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                              <Typography className='text-sm'>Dưới 5.000.000 VND</Typography>
                            </Stack>
                          }
                        />
                      ))}
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>
          </Stack>
        )}

        {/* Banner Category - Product List */}
        <Stack direction={'column'} className={`${isMobile ? 'w-full' : 'w-9/12'} max-h-max`} spacing={4}>
          {/* Category Title */}
          <Stack
            className='bg-white rounded-lg px-4 py-3'
            style={{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}>
            <Typography className='text-3xl font-bold'>
              {path[0].slice(0, 1).toUpperCase() + path[0].slice(1)}
            </Typography>
          </Stack>
          {/* Banner */}
          <Stack className='w-full max-h-[300px]'>
            <img src={BannerCategory} alt='Banner Category' className='object-cover w-full h-full' />
          </Stack>
          {/* Filter */}
          <Stack
            className='bg-white rounded-lg px-4 py-2'
            style={{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='py-2'>
              <Typography className='font-bold'>Tất cả sản phẩm</Typography>
              <ButtonForm variant='outlined' className='rounded-lg'>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <FilterAlt className='text-md' />
                  <Typography className='text-md '>Bộ lọc</Typography>
                </Stack>
              </ButtonForm>
            </Stack>
            <Divider />
            <Stack
              className='py-3'
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              {/* Filter 1 */}
              {!isMobile && (
                <Stack direction={'row'} spacing={2}>
                  <FormControlLabel
                    control={<Checkbox checked={false} />}
                    label={
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <img src={FreeShip} className='object-contain' width='80px' height='auto' />
                      </Stack>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={false} />}
                    label={
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <img src={TopDeal} className='object-contain' width='80px' height='auto' />
                      </Stack>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={false} />}
                    label={
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Rating name='rating' defaultValue={4} precision={0.5} size='small' readOnly />
                        <Typography className='text-sm'>từ 4 sao</Typography>
                      </Stack>
                    }
                  />
                </Stack>
              )}

              {/* Filter 2 */}
              <Stack direction={'row'} spacing={2} alignItems={'center'} className={`${isMobile && 'ml-auto'}`}>
                <Typography className='text-md text-slate-400'>Sắp xếp</Typography>
                <ButtonForm variant='outlined' className='rounded-3xl'>
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Typography className='text-md'>Phổ biến</Typography>
                    <ArrowDropDown className='text-md' />
                  </Stack>
                </ButtonForm>
              </Stack>
            </Stack>
          </Stack>
          {/* Product List */}
          <Stack>
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {AllLatestProducts.map((item, index) => (
                <ProductCard
                  key={index}
                  productId={item._id}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productThumbImg={item.productThumbImg}
                  description={item.description}
                />
              ))}
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
