import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetMainCategory, useGetSubCategory } from '@app/api/hooks/category.hook';
import { useGetAllLatestProduct } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';
import { setFilter, setFilterPrice } from '@app/redux/filterSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';
import { CustomCategoryResponseType } from '@app/types/category';

import CategoryFilterNavigator from './components/CategoryFilterNavigator';
import ProductCategoryBanner from './components/ProductCategoryBanner';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryTitle from './components/ProductCategoryTitle';
import ProductFilterSection from './components/ProductFilterSection';

const ProductCategoryPage = (): JSX.Element => {
  const [listSubCategory, setListSubCategory] = useState<CustomCategoryResponseType[]>([]);
  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  const { data: AllLatestProducts = [] } = useGetAllLatestProduct(8);

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
              data.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[1])?._id || null;

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    const rating = searchParams.get('rating');

    dispatch(
      setFilter({
        minPrice: minPrice ? parseInt(minPrice, 10) : 0,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : 0,
        sort: sort ? parseInt(sort, 10) : 5,
        mainCategory: path[0] || '',
        subCategory: path[1] || '',
        rating: rating ? parseInt(rating, 10) : 0
      })
    );

    console.log({ filter });
  }, [location.search, path[0], path[1], dispatch]);

  const handleChangeFilterPrice = (minPrice: number, maxPrice: number) => {
    const isChecked = filter.minPrice === minPrice && filter.maxPrice === maxPrice;

    if (isChecked) {
      dispatch(setFilterPrice({ minPrice: 0, maxPrice: 0 }));

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('minPrice');
      searchParams.delete('maxPrice');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      dispatch(setFilterPrice({ minPrice, maxPrice }));

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('minPrice', minPrice.toString());
      searchParams.set('maxPrice', maxPrice.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} isCategory />
      <Stack direction={isMobile ? 'column' : 'row'} className='mb-4' spacing={4}>
        {/* Category Navigator */}
        {!isMobile && (
          <CategoryFilterNavigator
            subCategoryList={listSubCategory}
            mainPath={path[0]}
            handleChangeFilterPrice={handleChangeFilterPrice}
          />
        )}

        {/* Banner Category - Product List */}
        <Stack direction={'column'} className={`${isMobile ? 'w-full' : 'w-9/12'} max-h-max`} spacing={4}>
          {/* Category Title */}
          <ProductCategoryTitle title={path[path.length - 1]} />

          {/* Banner */}
          <ProductCategoryBanner banner_category={BannerCategory} />

          {/* Filter */}
          <ProductFilterSection listSubCategory={listSubCategory} />

          {/* Product List */}
          <ProductCategoryList listProduct={AllLatestProducts} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
