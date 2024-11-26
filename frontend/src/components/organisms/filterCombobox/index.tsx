import React, { useEffect, useState } from 'react';

import { ArrowDropDown } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import { useDevice } from '@app/hooks/useDevice';

export const listFilter = [
  {
    name: 'Phổ biến',
    value: 1,
    isActive: false
  },
  {
    name: 'Bán chạy',
    value: 2,
    isActive: false
  },
  {
    name: 'Giá thấp đến cao',
    value: 3,
    isActive: false
  },
  {
    name: 'Giá cao đến thấp',
    value: 4,
    isActive: false
  },
  {
    name: 'Mới nhất',
    value: 5,
    isActive: true
  },
  {
    name: 'Cũ nhất',
    value: 6,
    isActive: false
  },
  {
    name: 'Tên A-Z',
    value: 7,
    isActive: false
  },
  {
    name: 'Tên Z-A',
    value: 8,
    isActive: false
  }
];

const FilterComboBox = (): JSX.Element => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filters, setFilters] = useState(listFilter);
  const { isMobile } = useDevice();

  useEffect(() => {
    console.log({ filters });
  }, [filters]);
  return (
    <>
      <Stack direction={'row'} spacing={2} alignItems={'center'} className={`${isMobile && 'ml-auto'}`}>
        <Typography className='text-md text-slate-400'>Sắp xếp</Typography>
        <Stack
          className='relative'
          onMouseEnter={() => setToggleFilter(true)}
          onMouseLeave={() => setToggleFilter(false)}>
          <ButtonForm variant='outlined' className='rounded-3xl'>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography className='text-md'>{filters.find((filter) => filter.isActive)?.name}</Typography>
              <ArrowDropDown className='text-md' />
            </Stack>
          </ButtonForm>
          {toggleFilter && (
            <Stack
              className='absolute bg-white rounded-lg  min-w-[200px] top-full right-0 z-20 cursor-pointer overflow-hidden'
              style={{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              {filters.map((filter, index) => (
                <Stack
                  key={index}
                  className='px-4 py-2 hover:bg-slate-100'
                  onClick={() =>
                    setFilters((prev) => {
                      const newArr = prev.map((item) => {
                        if (item.name === filter.name) {
                          return { ...item, isActive: true };
                        } else {
                          return { ...item, isActive: false };
                        }
                      });
                      return newArr;
                    })
                  }>
                  <Typography className='text-md'>{filter.name}</Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default FilterComboBox;
