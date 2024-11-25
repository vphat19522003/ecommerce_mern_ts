import { useState } from 'react';
import { Link } from 'react-router-dom';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import { useDevice } from '@app/hooks/useDevice';
import { CustomCategoryResponseType } from '@app/types/category';

type CategoryFilterNavigatorProps = {
  subCategoryList: CustomCategoryResponseType[];
  mainPath: string;
};

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
const CategoryFilterNavigator = ({ subCategoryList, mainPath }: CategoryFilterNavigatorProps): JSX.Element => {
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
  return (
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
          {subCategoryList.length > 0 && <KeyboardArrowDown />}
        </Stack>
        {subCategoryList.length > 0 && (
          <Divider
            className={`${toggleNavigator.filterNavigator1.isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}
          />
        )}

        <AnimatePresence initial={false}>
          {toggleNavigator.filterNavigator1.isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}>
              {subCategoryList.map((category, index) => (
                <Link
                  to={
                    mainPath === 'all'
                      ? `/category/${category.name.toLowerCase().replace(/\s+/g, '')}`
                      : `/category/${mainPath}/${category.name.toLowerCase().replace(/\s+/g, '')}`
                  }
                  key={index}
                  className=' hover:text-blue-700 hover:underline cursor-pointer no-underline text-black'>
                  <Typography className='px-4 py-3 text-md '>{category.name}</Typography>
                </Link>
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
  );
};

export default CategoryFilterNavigator;
