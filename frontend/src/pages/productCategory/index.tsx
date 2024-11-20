import React from 'react';
import { useLocation } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetAllLatestProduct } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';

import CategoryFilterNavigator from './components/CategoryFilterNavigator';
import ProductCategoryBanner from './components/ProductCategoryBanner';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryTitle from './components/ProductCategoryTitle';
import ProductFilterSection from './components/ProductFilterSection';

const ProductCategoryPage = (): JSX.Element => {
  const { isMobile } = useDevice();
  const location = useLocation();
  const { data: AllLatestProducts = [] } = useGetAllLatestProduct(8);

  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} />
      <Stack direction={isMobile ? 'column' : 'row'} className='mb-4' spacing={4}>
        {/* Category Navigator */}
        {!isMobile && <CategoryFilterNavigator />}

        {/* Banner Category - Product List */}
        <Stack direction={'column'} className={`${isMobile ? 'w-full' : 'w-9/12'} max-h-max`} spacing={4}>
          {/* Category Title */}
          <ProductCategoryTitle title={path[0]} />

          {/* Banner */}
          <ProductCategoryBanner banner_category={BannerCategory} />

          {/* Filter */}
          <ProductFilterSection />

          {/* Product List */}
          <ProductCategoryList listProduct={AllLatestProducts} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
