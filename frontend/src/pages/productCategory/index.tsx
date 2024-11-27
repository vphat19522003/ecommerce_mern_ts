import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetMainCategory, useGetSubCategory } from '@app/api/hooks/category.hook';
import { useGetProductByFilter } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';
import { initialFilterStateType, setFilter, setFilterPrice } from '@app/redux/filterSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';
import { CustomCategoryResponseType } from '@app/types/category';

import { getProductTypeCustom } from '../admin/ecommerce/addNewProductPage/components/schemas';
import CategoryFilterNavigator from './components/CategoryFilterNavigator';
import ProductCategoryBanner from './components/ProductCategoryBanner';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryTitle from './components/ProductCategoryTitle';
import ProductFilterSection from './components/ProductFilterSection';

const ProductCategoryPage = (): JSX.Element => {
  const [listProduct, setListProduct] = useState<getProductTypeCustom[]>([]);
  const [listSubCategory, setListSubCategory] = useState<CustomCategoryResponseType[]>([]);
  const [mainCategoryId, setMainCategoryId] = useState<string>('');
  const [subCategoryId, setSubCategoryId] = useState<string>('');

  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  const { data: mainCategoryList = [] } = useGetMainCategory();

  const { mutate: getSubCategory } = useGetSubCategory();

  const { mutate: getProductByFilter } = useGetProductByFilter();

  useEffect(() => {
    if (!mainCategoryList.length) return;

    const categoryId =
      mainCategoryList.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[0])?._id || null;

    setMainCategoryId(categoryId || '');

    if (path[0] !== 'all' && categoryId) {
      getSubCategory(categoryId, {
        onSuccess: (data) => {
          setListSubCategory(data.length > 0 ? data : []);

          if (!path[1]) {
            setSubCategoryId('');
          } else {
            const subCategoryId =
              data.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[1])?._id || null;

            if (!subCategoryId) navigate('/category/all', { replace: true });
            else setSubCategoryId(subCategoryId);
          }
        }
      });
    } else if (path[0] === 'all' && !path[1]) {
      setListSubCategory(mainCategoryList);
    } else if (path[0] === 'all' && path[1]) {
      navigate(paths.pageNotFound, { replace: true });
    }
  }, [path[0], path[1], mainCategoryList]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const parseQueryParam = (param: string | null, defaultValue: number) =>
      param ? parseInt(param, 10) : defaultValue;

    const minPrice = parseQueryParam(searchParams.get('minPrice'), 0);
    const maxPrice = parseQueryParam(searchParams.get('maxPrice'), 0);
    const sort = parseQueryParam(searchParams.get('sort'), 5);
    const rating = parseQueryParam(searchParams.get('rating'), 0);

    dispatch(
      setFilter({
        minPrice,
        maxPrice,
        sort,
        mainCategory: mainCategoryId || '',
        subCategory: subCategoryId || '',
        rating
      })
    );

    getProductByFilter(
      {
        mainCategory: mainCategoryId,
        subCategory: subCategoryId,
        sort,
        minPrice,
        maxPrice,
        rating,
        page: 1,
        pageSize: 8
      },
      {
        onSuccess: (data) => {
          setListProduct(data.result);
        }
      }
    );
  }, [location.search, mainCategoryId, subCategoryId]);

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

  const handleFilterChange = (filterData: initialFilterStateType) => {
    const { sort, maxPrice, minPrice, rating } = filterData;

    dispatch(setFilter(filterData));

    const searchParams = new URLSearchParams(location.search);

    if (sort) searchParams.set('sort', sort.toString());

    if (minPrice) searchParams.set('minPrice', minPrice.toString());

    if (maxPrice) searchParams.set('maxPrice', maxPrice.toString());

    if (rating) searchParams.set('rating', rating.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`);
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
          <ProductFilterSection listSubCategory={listSubCategory} handleFilterChange={handleFilterChange} />

          {/* Product List */}
          <ProductCategoryList listProduct={listProduct} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
