import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetMainCategory, useGetSubCategory } from '@app/api/hooks/category.hook';
import { useGetAllLatestProduct } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';
import { paths } from '@app/routes/paths';
import { CustomCategoryResponseType } from '@app/types/category';

import CategoryFilterNavigator from './components/CategoryFilterNavigator';
import ProductCategoryBanner from './components/ProductCategoryBanner';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryTitle from './components/ProductCategoryTitle';
import ProductFilterSection from './components/ProductFilterSection';

const ProductCategoryPage = (): JSX.Element => {
  const [listSubCategory, setListSubCategory] = useState<CustomCategoryResponseType[]>([]);
  const { isMobile } = useDevice();

  const location = useLocation();
  const navigate = useNavigate();

  const { data: AllLatestProducts = [] } = useGetAllLatestProduct(8);

  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  const { data: mainCategoryList = [] } = useGetMainCategory();

  const { mutate: getSubCategory } = useGetSubCategory();

  useEffect(() => {
    if (!mainCategoryList.length) return;

    const categoryId =
      mainCategoryList.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[0])?._id || null;

    if (path[0] !== 'all' && categoryId) {
      getSubCategory(categoryId, {
        onSuccess: (data) => {
          setListSubCategory(data.length > 0 ? data : []);

          if (path[0] !== 'all' && path[1]) {
            const subCategoryId =
              listSubCategory.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[1])?._id ||
              null;

            if (!subCategoryId) navigate('/category/all', { replace: true });
          }
        }
      });
    } else if (path[0] === 'all' && !path[1]) {
      setListSubCategory(mainCategoryList);
    } else if (path[0] === 'all' && path[1]) {
      navigate(paths.pageNotFound, { replace: true });
    }
  }, [path[0], mainCategoryList, getSubCategory]);

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} isCategory />
      <Stack direction={isMobile ? 'column' : 'row'} className='mb-4' spacing={4}>
        {/* Category Navigator */}
        {!isMobile && <CategoryFilterNavigator subCategoryList={listSubCategory} mainPath={path[0]} />}

        {/* Banner Category - Product List */}
        <Stack direction={'column'} className={`${isMobile ? 'w-full' : 'w-9/12'} max-h-max`} spacing={4}>
          {/* Category Title */}
          <ProductCategoryTitle title={path[path.length - 1]} />

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
